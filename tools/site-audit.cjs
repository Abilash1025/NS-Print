const { chromium, devices } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://127.0.0.1:4300';
const OUT = path.join(__dirname, 'site-audit');
const SECTIONS = [
  'top',
  'services',
  'featured',
  'finishes',
  'work',
  'process',
  'about',
  'why',
  'testimonials',
  'faq',
  'contact',
  'quote'
];

fs.mkdirSync(OUT, { recursive: true });

function severityRank(s) {
  return { critical: 0, high: 1, medium: 2, low: 3, info: 4 }[s] ?? 9;
}

async function auditViewport(browser, label, viewport, isMobile) {
  const context = await browser.newContext({
    viewport,
    isMobile: !!isMobile,
    hasTouch: !!isMobile,
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  const issues = [];
  const consoleErrors = [];
  const failed = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => pageErrors.push(err.message));
  page.on('requestfailed', (req) => {
    failed.push({ url: req.url(), error: req.failure()?.errorText || 'unknown' });
  });

  const t0 = Date.now();
  const response = await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 });
  const loadMs = Date.now() - t0;
  const status = response?.status() ?? 0;

  if (status >= 400) {
    issues.push({ severity: 'critical', area: 'load', message: `HTTP ${status} on home` });
  }
  if (loadMs > 4000) {
    issues.push({
      severity: 'medium',
      area: 'performance',
      message: `Slow networkidle load: ${loadMs}ms`
    });
  }

  // Force lazy images + scroll through page for reveals
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.setAttribute('loading', 'eager');
    });
    const step = Math.max(400, Math.floor(window.innerHeight * 0.7));
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  // Horizontal overflow
  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth;
    const winW = window.innerWidth;
    const offenders = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > winW + 2 && r.right > winW + 2) {
        const tag = el.tagName.toLowerCase();
        const cls = (el.className && typeof el.className === 'string'
          ? el.className.split(/\s+/).slice(0, 3).join('.')
          : '');
        offenders.push(`${tag}${cls ? '.' + cls : ''}`);
      }
    });
    return {
      px: docW - winW,
      offenders: [...new Set(offenders)].slice(0, 12)
    };
  });
  if (overflow.px > 2) {
    issues.push({
      severity: 'high',
      area: 'layout',
      message: `Horizontal overflow ${overflow.px}px`,
      detail: overflow.offenders
    });
  }

  // Section presence + empty-ish detection
  const sectionReport = await page.evaluate((ids) => {
    return ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, present: false };
      const r = el.getBoundingClientRect();
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
      const imgs = el.querySelectorAll('img');
      const broken = [...imgs].filter((i) => !i.complete || i.naturalWidth === 0).length;
      const links = el.querySelectorAll('a[href]');
      const buttons = el.querySelectorAll('button');
      return {
        id,
        present: true,
        height: Math.round(r.height),
        textLen: text.length,
        imgCount: imgs.length,
        brokenImgs: broken,
        linkCount: links.length,
        buttonCount: buttons.length,
        preview: text.slice(0, 120)
      };
    });
  }, SECTIONS);

  for (const s of sectionReport) {
    if (!s.present) {
      issues.push({ severity: 'high', area: 'structure', message: `Missing section #${s.id}` });
    } else if (s.height < 80) {
      issues.push({
        severity: 'medium',
        area: 'structure',
        message: `Section #${s.id} very short (${s.height}px)`
      });
    }
    if (s.brokenImgs > 0) {
      issues.push({
        severity: 'high',
        area: 'assets',
        message: `#${s.id}: ${s.brokenImgs} broken image(s)`
      });
    }
  }

  // Images without alt / empty alt
  const imgA11y = await page.evaluate(() => {
    const imgs = [...document.images];
    const missingAlt = imgs.filter((i) => !i.hasAttribute('alt')).length;
    const emptyAlt = imgs.filter((i) => i.getAttribute('alt') === '').length;
    const decorativeOk = imgs.filter(
      (i) => i.getAttribute('alt') === '' && (i.getAttribute('aria-hidden') === 'true' || i.closest('[aria-hidden="true"]'))
    ).length;
    return { total: imgs.length, missingAlt, emptyAlt, decorativeOk };
  });
  if (imgA11y.missingAlt > 0) {
    issues.push({
      severity: 'medium',
      area: 'a11y',
      message: `${imgA11y.missingAlt} images missing alt attribute`
    });
  }

  // Buttons without accessible name
  const badButtons = await page.evaluate(() => {
    return [...document.querySelectorAll('button')].filter((b) => {
      const name = (b.getAttribute('aria-label') || b.innerText || '').trim();
      return !name;
    }).length;
  });
  if (badButtons > 0) {
    issues.push({
      severity: 'medium',
      area: 'a11y',
      message: `${badButtons} buttons without accessible name`
    });
  }

  // Focusable elements too small (mobile)
  if (isMobile) {
    const smallTargets = await page.evaluate(() => {
      const sels = 'a, button, input, select, textarea, [role="button"]';
      let n = 0;
      document.querySelectorAll(sels).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40)) n += 1;
      });
      return n;
    });
    if (smallTargets > 8) {
      issues.push({
        severity: 'medium',
        area: 'mobile-ux',
        message: `${smallTargets} tap targets under ~40px`
      });
    }
  }

  // Interactive smoke: FAQ accordion
  let faqWorks = false;
  try {
    const faqBtn = page.locator('#faq button, #faq [aria-expanded]').first();
    if (await faqBtn.count()) {
      const before = await faqBtn.getAttribute('aria-expanded');
      await faqBtn.click({ timeout: 3000 });
      await page.waitForTimeout(250);
      const after = await faqBtn.getAttribute('aria-expanded');
      faqWorks = before !== after || (await page.locator('#faq .is-open, #faq [aria-hidden="false"]').count()) > 0;
      if (!faqWorks && before === after) {
        issues.push({
          severity: 'medium',
          area: 'interaction',
          message: 'FAQ accordion click did not change expanded state'
        });
      }
    } else {
      issues.push({ severity: 'low', area: 'interaction', message: 'No FAQ toggle found' });
    }
  } catch (e) {
    issues.push({ severity: 'medium', area: 'interaction', message: `FAQ click failed: ${e.message}` });
  }

  // Nav dropdown (desktop) / burger (mobile)
  let navWorks = false;
  try {
    if (isMobile) {
      const burger = page.locator('.nav__burger');
      await burger.click({ timeout: 3000 });
      await page.waitForTimeout(300);
      const open = await page.locator('.nav__mobile.is-open, #mobile-menu.is-open').count();
      navWorks = open > 0;
      if (!navWorks) {
        issues.push({ severity: 'high', area: 'interaction', message: 'Mobile menu did not open' });
      } else {
        await burger.click();
        await page.waitForTimeout(200);
      }
    } else {
      const menuBtn = page.locator('.nav__link--menu').first();
      if (await menuBtn.count()) {
        await menuBtn.hover({ timeout: 3000 });
        await page.waitForTimeout(350);
        const drop = await page.locator('.nav__item--has-menu.is-open .nav__dropdown, .nav__dropdown[aria-hidden="false"]').count();
        navWorks = drop > 0;
        if (!navWorks) {
          // try click
          await menuBtn.click();
          await page.waitForTimeout(250);
          navWorks =
            (await page.locator('.nav__item--has-menu.is-open, .nav__dropdown[aria-hidden="false"]').count()) > 0;
        }
        if (!navWorks) {
          issues.push({
            severity: 'high',
            area: 'interaction',
            message: 'Desktop Print/Company dropdown did not open on hover/click'
          });
        }
      }
    }
  } catch (e) {
    issues.push({ severity: 'high', area: 'interaction', message: `Nav interaction failed: ${e.message}` });
  }

  // Service card / modal if present
  let modalWorks = null;
  try {
    const card = page.locator('#services .svc-card, #services button, #services [data-cursor], #services .services__card').first();
    if (await card.count()) {
      await card.scrollIntoViewIfNeeded();
      await card.click({ timeout: 4000 });
      await page.waitForTimeout(400);
      modalWorks =
        (await page.locator('.modal.is-open, app-service-modal .is-open, [role="dialog"]').count()) > 0;
      if (!modalWorks) {
        issues.push({
          severity: 'low',
          area: 'interaction',
          message: 'Service card click did not open a dialog (may be intentional inline)'
        });
      } else {
        // close with Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
      }
    }
  } catch (e) {
    issues.push({ severity: 'low', area: 'interaction', message: `Service click: ${e.message}` });
  }

  // Quote form validation
  let formValidation = false;
  try {
    await page.locator('#quote').scrollIntoViewIfNeeded();
    const submit = page.locator('#quote button[type="submit"]');
    if (await submit.count()) {
      await submit.click();
      await page.waitForTimeout(300);
      const errs = await page.locator('#quote small, #quote .ng-invalid, #quote [aria-invalid="true"]').count();
      formValidation = errs > 0;
      if (!formValidation) {
        issues.push({
          severity: 'medium',
          area: 'forms',
          message: 'Quote submit with empty fields showed no visible validation errors'
        });
      }
    }
  } catch (e) {
    issues.push({ severity: 'medium', area: 'forms', message: `Quote form: ${e.message}` });
  }

  // Dead / hash-only CTAs that don't match sections
  const badHashes = await page.evaluate((ids) => {
    const set = new Set(ids);
    const bad = [];
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const hash = a.getAttribute('href').slice(1);
      if (!hash || hash === 'main') return;
      if (!set.has(hash) && !document.getElementById(hash)) {
        bad.push({ text: (a.innerText || '').trim().slice(0, 40), href: '#' + hash });
      }
    });
    return bad.slice(0, 20);
  }, SECTIONS);
  if (badHashes.length) {
    issues.push({
      severity: 'high',
      area: 'navigation',
      message: `${badHashes.length} in-page links point to missing ids`,
      detail: badHashes
    });
  }

  // Content richness signals
  const richness = await page.evaluate(() => {
    const text = document.body.innerText || '';
    const words = text.trim().split(/\s+/).length;
    const h1 = document.querySelectorAll('h1').length;
    const h2 = document.querySelectorAll('h2').length;
    const forms = document.querySelectorAll('form').length;
    const videos = document.querySelectorAll('video').length;
    const maps = document.querySelectorAll('iframe[src*="google"], iframe[src*="maps"]').length;
    const whatsapp = [...document.querySelectorAll('a[href]')].filter((a) =>
      /wa\.me|whatsapp/i.test(a.href)
    ).length;
    const tel = [...document.querySelectorAll('a[href^="tel:"]')].length;
    const mailto = [...document.querySelectorAll('a[href^="mailto:"]')].length;
    const demoNotes = (text.match(/frontend demo|no data is sent|demo confirmation/gi) || []).length;
    const ctaCount = [...document.querySelectorAll('a, button')].filter((el) =>
      /quote|whatsapp|call|contact|request/i.test(el.innerText || '')
    ).length;
    return { words, h1, h2, forms, videos, maps, whatsapp, tel, mailto, demoNotes, ctaCount };
  });

  if (richness.h1 !== 1) {
    issues.push({
      severity: 'low',
      area: 'seo',
      message: `Expected 1 h1, found ${richness.h1}`
    });
  }
  if (richness.demoNotes > 0) {
    issues.push({
      severity: 'high',
      area: 'conversion',
      message: `Quote form still shows ${richness.demoNotes} "demo / not sent" messages — weakens trust`
    });
  }
  if (richness.maps === 0) {
    issues.push({
      severity: 'info',
      area: 'richness',
      message: 'No embedded map on contact — local print shops usually benefit from one'
    });
  }
  if (richness.videos === 0) {
    issues.push({
      severity: 'info',
      area: 'richness',
      message: 'No video content — press/process video would raise perceived quality'
    });
  }

  // Meta / SEO basics
  const seo = await page.evaluate(() => {
    const title = document.title || '';
    const desc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const og = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    return { title, descLen: desc.length, hasOg: !!og, hasCanonical: !!canonical, desc };
  });
  if (!seo.title || seo.title.length < 10) {
    issues.push({ severity: 'medium', area: 'seo', message: 'Title missing or too short' });
  }
  if (seo.descLen < 50) {
    issues.push({
      severity: 'medium',
      area: 'seo',
      message: `Meta description weak/missing (${seo.descLen} chars)`
    });
  }
  if (!seo.hasOg) {
    issues.push({ severity: 'low', area: 'seo', message: 'Missing Open Graph title' });
  }

  // Contrast-ish: very light text on light bg heuristic for lead text
  const lowContrastHints = await page.evaluate(() => {
    const suspects = [];
    document.querySelectorAll('p, span, a, li, small, .lead, .eyebrow').forEach((el) => {
      const cs = getComputedStyle(el);
      const color = cs.color;
      const bg = cs.backgroundColor;
      const opacity = parseFloat(cs.opacity || '1');
      if (opacity < 0.45 && (el.innerText || '').trim().length > 8) {
        suspects.push({
          text: (el.innerText || '').trim().slice(0, 40),
          opacity,
          color,
          bg
        });
      }
    });
    return suspects.slice(0, 8);
  });
  if (lowContrastHints.length) {
    issues.push({
      severity: 'low',
      area: 'a11y',
      message: `${lowContrastHints.length} elements with opacity < 0.45`,
      detail: lowContrastHints
    });
  }

  // Screenshots: full page + key sections
  await page.screenshot({
    path: path.join(OUT, `${label}-full.png`),
    fullPage: true
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, `${label}-hero.png`) });

  for (const id of ['services', 'featured', 'work', 'faq', 'contact', 'quote']) {
    const loc = page.locator(`#${id}`);
    if (await loc.count()) {
      await loc.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      try {
        await loc.screenshot({ path: path.join(OUT, `${label}-${id}.png`) });
      } catch {
        // section taller than viewport — crop viewport
        await page.screenshot({ path: path.join(OUT, `${label}-${id}.png`) });
      }
    }
  }

  // Sticky mobile CTA presence
  let mobileCta = null;
  if (isMobile) {
    mobileCta = await page.locator('.mobile-cta, app-mobile-cta').count();
    if (!mobileCta) {
      issues.push({
        severity: 'info',
        area: 'mobile-ux',
        message: 'No sticky mobile CTA bar detected'
      });
    }
  }

  for (const e of consoleErrors) {
    issues.push({ severity: 'high', area: 'console', message: e.slice(0, 200) });
  }
  for (const e of pageErrors) {
    issues.push({ severity: 'critical', area: 'runtime', message: e.slice(0, 200) });
  }
  for (const f of failed) {
    // ignore chrome-extension / analytics noise
    if (/chrome-extension|favicon|hot-update/i.test(f.url)) continue;
    issues.push({
      severity: 'high',
      area: 'network',
      message: `Failed request: ${f.url.slice(0, 120)} (${f.error})`
    });
  }

  issues.sort((a, b) => severityRank(a.severity) - severityRank(b.severity));

  await context.close();

  return {
    label,
    viewport,
    loadMs,
    status,
    overflowPx: overflow.px,
    sections: sectionReport,
    imgA11y,
    richness,
    seo,
    faqWorks,
    navWorks,
    modalWorks,
    formValidation,
    mobileCta,
    issueCount: issues.length,
    issues
  };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  results.push(
    await auditViewport(browser, 'desktop', { width: 1440, height: 900 }, false)
  );
  results.push(
    await auditViewport(browser, 'mobile', { width: 390, height: 844 }, true)
  );

  // Extra: tablet
  results.push(
    await auditViewport(browser, 'tablet', { width: 768, height: 1024 }, true)
  );

  await browser.close();

  const allIssues = results.flatMap((r) =>
    r.issues.map((i) => ({ viewport: r.label, ...i }))
  );

  const summary = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    viewports: results.map((r) => ({
      label: r.label,
      loadMs: r.loadMs,
      overflowPx: r.overflowPx,
      issueCount: r.issueCount,
      navWorks: r.navWorks,
      faqWorks: r.faqWorks,
      formValidation: r.formValidation,
      words: r.richness.words,
      seo: r.seo
    })),
    issues: allIssues,
    richness: results[0]?.richness,
    sections: results[0]?.sections
  };

  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  console.log('\nAUDIT_OK shots in', OUT);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
