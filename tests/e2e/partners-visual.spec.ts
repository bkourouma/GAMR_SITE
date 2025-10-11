import { test, expect } from '@playwright/test';

test('partners section with logos', async ({ page }) => {
  await page.goto('http://localhost:3000/fonctionnalites');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  // Scroll to partners section
  await page.locator('text=Nos Partenaires').scrollIntoViewIfNeeded();

  // Wait for images to load
  await page.waitForTimeout(2000);

  // Verify partners section is visible
  await expect(page.getByRole('heading', { name: /Nos Partenaires/i })).toBeVisible();

  // Take screenshot of just the partners section
  const partnersSection = page.locator('section:has(h2:text("Nos Partenaires"))');
  await partnersSection.screenshot({ path: 'partners-section-screenshot.png' });

  // Take full page screenshot
  await page.screenshot({
    path: 'fonctionnalites-with-partners.png',
    fullPage: true,
  });
});
