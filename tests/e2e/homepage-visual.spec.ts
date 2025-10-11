import { test } from '@playwright/test';

test('visual verification of homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  // Take full page screenshot
  await page.screenshot({
    path: 'homepage-screenshot-updated.png',
    fullPage: true,
  });
});
