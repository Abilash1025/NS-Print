const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.join(__dirname, 'hero-check');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://127.0.0.1:4300/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const press = page.locator('.hero__press');
  await press.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await press.screenshot({ path: path.join(outDir, 'hero-press-full.png') });

  const rollers = page.locator('.sim__rollers');
  if (await rollers.count()) {
    await rollers.screenshot({ path: path.join(outDir, 'hero-rollers-only.png') });
  }

  const info = await page.evaluate(() => {
    const rollersEl = document.querySelector('.sim__rollers img');
    const lineEl = document.querySelector('.sim__line');
    const machine = document.querySelector('.sim__machine');
    const sheets = document.querySelectorAll('.sim__sheet');
    return {
      rollersSrc: rollersEl?.getAttribute('src') || null,
      rollersNatural: rollersEl ? { w: rollersEl.naturalWidth, h: rollersEl.naturalHeight } : null,
      lineSrc: lineEl?.getAttribute('src') || null,
      machineSize: machine
        ? {
            w: Math.round(machine.getBoundingClientRect().width),
            h: Math.round(machine.getBoundingClientRect().height)
          }
        : null,
      sheetCount: sheets.length,
      rollersBox: (() => {
        const el = document.querySelector('.sim__rollers');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
      })()
    };
  });

  fs.writeFileSync(path.join(outDir, 'hero-press-info.json'), JSON.stringify(info, null, 2));
  console.log(JSON.stringify(info, null, 2));
  console.log('SHOTS_OK');
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
