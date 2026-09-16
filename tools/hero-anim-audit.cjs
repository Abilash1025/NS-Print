const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'hero-check');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = { desktop: null, mobile: null, issues: [], notes: [] };

  async function audit(label, viewport, isMobile) {
    const context = await browser.newContext({
      viewport,
      isMobile: !!isMobile,
      hasTouch: !!isMobile,
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference'
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4300/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(800);

    const press = page.locator('.hero__press');
    await press.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Multi-frame capture across one sheet cycle (~6.4s)
    const frames = [];
    for (let i = 0; i < 5; i++) {
      const file = path.join(OUT, `${label}-frame-${i}.png`);
      await press.screenshot({ path: file });
      frames.push(file);
      if (i < 4) await page.waitForTimeout(1400);
    }

    await page.locator('.hero').screenshot({ path: path.join(OUT, `${label}-hero-full.png`) });

    const data = await page.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const qa = (s) => [...document.querySelectorAll(s)];
      const box = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          w: Math.round(r.width),
          h: Math.round(r.height),
          top: Math.round(r.top),
          left: Math.round(r.left),
          bottom: Math.round(r.bottom),
          right: Math.round(r.right)
        };
      };

      const machine = q('.sim__machine');
      const rollers = q('.sim__rollers');
      const rollersImg = q('.sim__rollers img');
      const hood = q('.sim__hood');
      const deck = q('.sim__deck');
      const pathEl = q('.sim__path');
      const sheets = qa('.sim__sheet');
      const faces = qa('.sim__face');
      const feed = q('.sim__feed');
      const delivery = q('.sim__delivery');
      const units = qa('.sim__units span');
      const fountains = qa('.sim__fountains span');
      const grippers = qa('.sim__grippers i');

      const imgs = qa('.hero__press img');
      const broken = imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.getAttribute('src'));

      const animating = [];
      [
        '.sim__rollers img',
        '.sim__sheet',
        '.sim__nip',
        '.sim__scan',
        '.sim__belt i',
        '.sim__cylinder span',
        '.sim__live i',
        '.sim__feed',
        '.sim__delivery'
      ].forEach((sel) => {
        const el = q(sel);
        if (!el) return;
        const a = getComputedStyle(el).animationName;
        if (a && a !== 'none') animating.push({ sel, animation: a, duration: getComputedStyle(el).animationDuration });
      });

      const m = box(machine);
      const r = box(rollers);
      const h = box(hood);
      const d = box(deck);
      const p = box(pathEl);

      // Blank region estimates: space above rollers / below path inside machine
      let topGap = null;
      let bottomGap = null;
      if (m && h && r) topGap = r.top - h.top;
      if (m && d && p) bottomGap = d.bottom - p.bottom;

      // Overlap / clipping: sheets should stay roughly within machine
      const sheetBoxes = sheets.map((s) => box(s));
      const sheetsOutside = sheetBoxes.filter((s) => {
        if (!s || !m) return false;
        return s.top < m.top - 4 || s.bottom > m.bottom + 4;
      }).length;

      // Empty-looking zones: hood height vs deck height ratio
      const hoodH = h?.h || 0;
      const deckH = d?.h || 0;
      const rollersH = r?.h || 0;
      const pathH = p?.h || 0;

      return {
        machine: m,
        rollers: r,
        hood: h,
        deck: d,
        path: p,
        feed: box(feed),
        delivery: box(delivery),
        sheetCount: sheets.length,
        faceCount: faces.length,
        units: units.length,
        fountains: fountains.length,
        grippers: grippers.length,
        rollersSrc: rollersImg?.getAttribute('src') || null,
        rollersNatural: rollersImg
          ? { w: rollersImg.naturalWidth, h: rollersImg.naturalHeight }
          : null,
        broken,
        animating,
        topGap,
        bottomGap,
        sheetsOutside,
        fillRatio: m
          ? Math.round(((hoodH + rollersH + pathH + deckH) / m.h) * 100)
          : null,
        aspect: m ? Number((m.w / m.h).toFixed(2)) : null
      };
    });

    // Compare frame 0 vs frame 2 pixel difference (motion happening?)
    const motion = await page.evaluate(async () => {
      const el = document.querySelector('.sim__machine');
      if (!el) return { moved: false };
      const canvas = document.createElement('canvas');
      const rect = el.getBoundingClientRect();
      canvas.width = Math.min(400, Math.floor(rect.width));
      canvas.height = Math.min(280, Math.floor(rect.height));
      // can't draw DOM easily without html2canvas — use sheet transform instead
      const sheet = document.querySelector('.sim__sheet');
      if (!sheet) return { moved: false };
      const t1 = getComputedStyle(sheet).transform;
      await new Promise((r) => setTimeout(r, 900));
      const t2 = getComputedStyle(sheet).transform;
      return { moved: t1 !== t2, t1, t2 };
    });

    report[label] = { ...data, motion, frames: frames.length };
    await context.close();
    return data;
  }

  const desktop = await audit('desktop', { width: 1440, height: 900 }, false);
  const mobile = await audit('mobile', { width: 390, height: 844 }, true);

  function judge(label, d) {
    if (!d) {
      report.issues.push(`${label}: no data`);
      return;
    }
    if (d.broken?.length) report.issues.push(`${label}: broken images ${d.broken.join(', ')}`);
    if (d.sheetCount < 3) report.issues.push(`${label}: only ${d.sheetCount} sheets`);
    if (!d.rollersSrc || !/realistic/i.test(d.rollersSrc)) {
      report.issues.push(`${label}: rollers not using realistic asset (${d.rollersSrc})`);
    }
    if (d.rollersNatural && d.rollersNatural.w < 100) {
      report.issues.push(`${label}: rollers image tiny/unloaded`);
    }
    if (!d.hood) report.issues.push(`${label}: missing hood`);
    if (!d.deck) report.issues.push(`${label}: missing deck`);
    if ((d.units || 0) < 4) report.issues.push(`${label}: CMYK units incomplete`);
    if ((d.fountains || 0) < 4) report.issues.push(`${label}: ink fountains incomplete`);
    if (d.sheetsOutside > 0) report.issues.push(`${label}: ${d.sheetsOutside} sheets clipping outside machine`);
    if (d.fillRatio != null && d.fillRatio < 55) {
      report.issues.push(`${label}: machine looks sparse (fill ~${d.fillRatio}%)`);
    }
    if (d.machine && d.machine.h < 280) {
      report.issues.push(`${label}: machine quite short (${d.machine.h}px)`);
    }
    if (d.machine && d.machine.w < 260) {
      report.issues.push(`${label}: machine narrow (${d.machine.w}px)`);
    }
  }

  judge('desktop', desktop);
  judge('mobile', mobile);

  if (!report.desktop?.motion?.moved && !report.mobile?.motion?.moved) {
    report.issues.push('Sheet transform did not change — animation may be stalled');
  } else {
    report.notes.push('Sheet motion confirmed across frames');
  }

  if (desktop?.fillRatio >= 70) report.notes.push(`Desktop fill looks dense (~${desktop.fillRatio}%)`);
  if (desktop?.hood && desktop?.deck) report.notes.push('Hood + deck hardware present');
  if (desktop?.animating?.length >= 5) report.notes.push(`${desktop.animating.length} animated layers active`);

  fs.writeFileSync(path.join(OUT, 'hero-audit.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  console.log(report.issues.length ? 'NEEDS_ATTENTION' : 'LOOKS_GOOD');
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
