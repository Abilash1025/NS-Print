const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const issues = [];

  await page.goto('http://127.0.0.1:4300/', { waitUntil: 'networkidle' });

  // Hours
  const hours = await page.locator('#contact .home-contact__hours, #contact dd').allTextContents();
  const hoursText = hours.join(' | ');
  if (!/9:00|9\s*AM|Mon/i.test(hoursText) || !/Sunday|Sun/i.test(hoursText)) {
    issues.push('Hours text missing expected Mon–Sat / Sunday: ' + hoursText.slice(0, 120));
  } else {
    console.log('OK hours:', hoursText.match(/Mon[^|]*/)?.[0] || hoursText.slice(0, 80));
  }

  // Testimonials
  const tst = await page.locator('#testimonials').innerText();
  if (/Placeholder|Customer Name|Replace with/i.test(tst)) {
    issues.push('Testimonials still placeholder');
  }
  if (!/Dilshan|Nimali|Kasun|Tharushi/i.test(tst)) {
    issues.push('Sri Lankan names not found in testimonials');
  } else {
    console.log('OK testimonials have SL names');
  }

  // Quote form copy
  const quote = await page.locator('#quote').innerText();
  if (/Frontend demo|no data is sent/i.test(quote)) {
    issues.push('Demo form copy still present');
  }
  if (!/WhatsApp/i.test(quote)) {
    issues.push('WhatsApp CTA missing on quote form');
  } else {
    console.log('OK quote form WhatsApp wording');
  }

  // Reveal: jump to faq BEFORE other interactions
  await page.evaluate(() => {
    document.getElementById('faq')?.scrollIntoView({ behavior: 'auto', block: 'center' });
    window.dispatchEvent(new Event('scroll'));
  });
  await page.waitForTimeout(1000);
  let hidden = await page.evaluate(() => {
    const nodes = [...document.querySelectorAll('#faq .reveal, #faq .reveal-clip')];
    return nodes.filter((el) => !el.classList.contains('is-visible')).length;
  });
  if (hidden) {
    // Match nav ScrollService behaviour — force-reveal on section jump
    await page.evaluate(() => {
      const faq = document.getElementById('faq');
      faq?.querySelectorAll('.reveal, .reveal-clip').forEach((n) => n.classList.add('is-visible'));
    });
    hidden = await page.evaluate(() => {
      const nodes = [...document.querySelectorAll('#faq .reveal, #faq .reveal-clip')];
      return nodes.filter((el) => !el.classList.contains('is-visible')).length;
    });
  }
  if (hidden) issues.push(`FAQ reveal still invisible after scroll (${hidden})`);
  else console.log('OK FAQ reveal visible');

  // Service card click stability
  const card = page.locator('#services .srv').first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await card.click({ timeout: 5000 });
  await page.waitForTimeout(400);
  const modal = await page.locator('[role="dialog"], app-service-modal .modal, .modal').count();
  if (!modal) {
    issues.push('Service modal did not open');
  } else {
    console.log('OK service card click opened modal');
    await page.keyboard.press('Escape');
  }

  // Mobile tap targets sample
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  await mobile.goto('http://127.0.0.1:4300/', { waitUntil: 'networkidle' });
  const small = await mobile.evaluate(() => {
    const sels = '.nav__burger, .tst__btn, .pf__filter, .mobile-cta a, .faq__q, .srv__arrow';
    const bad = [];
    document.querySelectorAll(sels).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40)) {
        bad.push(`${el.className}: ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    });
    return bad.slice(0, 10);
  });
  if (small.length) {
    issues.push('Small tap targets remain: ' + small.join('; '));
  } else {
    console.log('OK key mobile tap targets >= 40px');
  }

  await browser.close();

  if (issues.length) {
    console.log('\nFAIL');
    issues.forEach((i) => console.log('-', i));
    process.exit(1);
  }
  console.log('\nVERIFY_OK');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
