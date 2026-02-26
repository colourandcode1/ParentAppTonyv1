/**
 * Playwright script to screenshot the app at http://localhost:8081
 * Run: npx playwright install chromium && node scripts/screenshot.js
 */
const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    const port = process.env.PORT || '8081';
  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    const outPath = path.join(__dirname, '..', 'screenshot-prototype.png');
    await page.screenshot({ path: outPath, fullPage: true });
    console.log('Screenshot saved to', outPath);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
