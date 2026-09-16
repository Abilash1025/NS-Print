const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://127.0.0.1:4300/', { waitUntil: 'networkidle' });
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const metrics = await page.evaluate(() => {
    const intro = document.querySelector('.faq__intro');
    const lead = document.querySelector('.faq__lead');
    const meta = document.querySelector('.faq__aside-meta');
    const count = document.querySelector('.faq__count');
    const cta = document.querySelector('.faq__cta');
    const h2 = document.querySelector('.faq__intro .display-md');
    const list = document.querySelector('.faq__list');
    if (!intro || !lead || !meta || !count || !cta || !h2 || !list) {
      return { error: 'missing' };
    }
    const ir = intro.getBoundingClientRect();
    const lr = lead.getBoundingClientRect();
    const mr = meta.getBoundingClientRect();
    const cr = count.getBoundingClientRect();
    const ctar = cta.getBoundingClientRect();
    const hr = h2.getBoundingClientRect();
    const listR = list.getBoundingClientRect();
    const style = getComputedStyle(meta);
    return {
      introH: Math.round(ir.height),
      listH: Math.round(listR.height),
      h2ToLead: Math.round(lr.top - hr.bottom),
      leadToMeta: Math.round(mr.top - lr.bottom),
      countToCta: Math.round(ctar.top - cr.bottom),
      metaPaddingTop: style.paddingTop,
      metaMarginTop: style.marginTop,
      introPadding: getComputedStyle(intro).padding,
      leadMarginTop: getComputedStyle(lead).marginTop
    };
  });

  console.log(JSON.stringify(metrics, null, 2));
  const box = await page.locator('#faq').boundingBox();
  if (box) {
    await page.screenshot({ path: 'faq-spacing-check.png', clip: box });
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
