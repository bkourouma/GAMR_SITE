import { test } from '@playwright/test';

test('visual verification of features page', async ({ page }) => {
  await page.goto('http://localhost:3000/fonctionnalites');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  // Take full page screenshot
  await page.screenshot({
    path: 'fonctionnalites-page-screenshot.png',
    fullPage: true,
  });

  // Log console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`Browser error: ${msg.text()}`);
    }
  });

  // Wait a bit to catch any runtime errors
  await page.waitForTimeout(2000);
});
