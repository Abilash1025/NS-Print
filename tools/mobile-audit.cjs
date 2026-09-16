const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'https://abilash1025.github.io/NS-Print/';
const OUT = path.join(__dirname, 'mobile-fix');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(1800);

  const report = await page.evaluate(() => {
    const issues = [];
    const nav = document.querySelector('app-navbar header, .nav');
    const burger = document.querySelector('.nav__burger');
    const mcta = document.querySelector('.mobile-cta');
    const heroCard = document.querySelector('.hero__card');
    const machine = document.querySelector('.sim__machine');

    function box(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        top: Math.round(r.top),
        left: Math.round(r.left),
        right: Math.round(r.right),
        cls: (el.className || '').toString().slice(0, 50)
      };
    }

    document.querySelectorAll('h1,h2,h3,p,.home-contact__value,.why__title').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 3) {
        issues.push({
          type: 'text-overflow',
          text: (el.innerText || '').slice(0, 60),
          sw: el.scrollWidth,
          cw: el.clientWidth
        });
      }
    });

    const vw = innerWidth;
    document.querySelectorAll('.sim__machine, .hero__press, .fin__stage, .why__bento').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2 || r.left < -2) {
        issues.push({
          type: 'edge-clip',
          cls: (el.className || '').toString().slice(0, 40),
          left: Math.round(r.left),
          right: Math.round(r.right)
        });
      }
    });

    return {
      vw,
      vh: innerHeight,
      nav: box(nav),
      burger: box(burger),
      mcta: box(mcta),
      heroCard: box(heroCard),
      machine: box(machine),
      bodyPadBottom: getComputedStyle(document.body).paddingBottom,
      scrollPadTop: getComputedStyle(document.documentElement).scrollPaddingTop,
      issues
    };
  });

  fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  await page.screenshot({ path: path.join(OUT, '01-hero.png') });

  const burgerBtn = page.locator('.nav__burger');
  if (await burgerBtn.count()) {
    await burgerBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, '02-menu.png') });
    await burgerBtn.click();
  }

  for (const id of ['featured', 'finishes', 'why', 'contact', 'quote']) {
    const el = page.locator('#' + id).first();
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(OUT, `sec-${id}.png`) });
    }
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
