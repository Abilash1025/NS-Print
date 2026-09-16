const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://127.0.0.1:4300';
const OUT = path.join(__dirname, 'shots');

const pages = [
  { name: 'home', url: '/' },
  { name: 'services', url: '/services' },
  { name: 'work', url: '/work' },
  { name: 'about', url: '/about' },
  { name: 'contact', url: '/contact' },
  { name: 'service-detail', url: '/services/business-cards' }
];

const viewports = [
  { label: 'desktop', width: 1440, height: 1000 },
  { label: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1']
  });

  const errors = [];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    // Reveal-on-scroll elements render immediately under reduced motion
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`[${vp.label}] console: ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => errors.push(`[${vp.label}] pageerror: ${err.message}`));
    page.on('requestfailed', (req) =>
      errors.push(`[${vp.label}] requestfailed: ${req.url()} ${req.failure()?.errorText}`)
    );

    for (const p of pages) {
      await page.goto(BASE + p.url, { waitUntil: 'networkidle2', timeout: 60000 });
      // trigger scroll reveals and force lazy images to load for full-page shots
      await page.evaluate(async () => {
        document
          .querySelectorAll('img[loading="lazy"]')
          .forEach((img) => img.setAttribute('loading', 'eager'));

        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 90));
        }
        window.scrollTo(0, 0);

        await Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((res) => {
                  img.onload = res;
                  img.onerror = res;
                })
            )
        );
        await new Promise((r) => setTimeout(r, 500));
      });

      // horizontal overflow check
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      if (overflow > 2) {
        errors.push(`[${vp.label}] ${p.url} horizontal overflow: ${overflow}px`);
      }

      await page.screenshot({
        path: path.join(OUT, `${p.name}-${vp.label}.png`),
        fullPage: true
      });
      console.log(`shot ${p.name}-${vp.label} (overflow ${overflow})`);
    }
    await page.close();
  }

  await browser.close();

  if (errors.length) {
    console.log('\n--- ISSUES ---');
    errors.forEach((e) => console.log(e));
  } else {
    console.log('\nNo console errors, failed requests, or overflow detected.');
  }
})();
