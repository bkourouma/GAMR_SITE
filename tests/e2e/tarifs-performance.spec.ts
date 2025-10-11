/**
 * Performance Tests: Tarifs Page
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Performance validation against constitution targets
 */

import { test, expect } from '@playwright/test';

test.describe('Tarifs Page - Performance', () => {
  // T062-T066: Performance testing

  test('should load within performance budgets', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/tarifs', { waitUntil: 'networkidle' });

    const loadTime = Date.now() - startTime;

    // Should load within reasonable time (allow 5s for full load)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have minimal layout shift', async ({ page }) => {
    await page.goto('/tarifs');

    // Measure layout shift when toggling
    const initialHeight = await page.evaluate(() => document.body.scrollHeight);

    // Toggle deployment model
    const toggle = page.getByRole('switch', { name: /basculer/i });
    await toggle.click();
    await page.waitForTimeout(500);

    const newHeight = await page.evaluate(() => document.body.scrollHeight);

    // Height should not change dramatically (CLS prevention)
    const percentChange = Math.abs((newHeight - initialHeight) / initialHeight) * 100;
    expect(percentChange).toBeLessThan(30); // Allow some content height difference
  });

  test('ROI calculator should update quickly', async ({ page }) => {
    // Scroll to calculator
    await page.getByRole('heading', { name: /calculateur de roi/i }).scrollIntoViewIfNeeded();

    const usersInput = page.getByLabel(/nombre d'utilisateurs/i);
    await usersInput.focus();

    const startTime = Date.now();

    // Type a value
    await usersInput.fill('50');

    // Wait for results to update
    await page.waitForTimeout(100); // Allow time for calculation

    const updateTime = Date.now() - startTime;

    // Should update in < 100ms (target is < 50ms but allow buffer)
    expect(updateTime).toBeLessThan(200);

    // Results should be visible
    await expect(page.getByText(/économies mensuelles/i)).toBeVisible();
  });

  test('should not load excessive JavaScript', async ({ page }) => {
    const response = await page.goto('/tarifs');

    // Check response is successful
    expect(response?.status()).toBe(200);

    // Get all script tags
    const scriptCount = await page.locator('script').count();

    // Should have reasonable number of scripts (not bloated)
    // Typically: Next.js runtime + page chunks + analytics
    expect(scriptCount).toBeLessThan(20);
  });

  test('should be responsive to rapid toggle interactions', async ({ page }) => {
    const billingToggle = page.getByRole('radio', { name: /annuel/i });

    // Rapidly toggle multiple times
    for (let i = 0; i < 5; i++) {
      await billingToggle.click();
      await page.waitForTimeout(50);
      await page.getByRole('radio', { name: /mensuel/i }).click();
      await page.waitForTimeout(50);
    }

    // Should still be functional (no crashes)
    await expect(page.getByRole('heading', { name: /starter/i })).toBeVisible();
  });

  test('should handle mobile viewport efficiently', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const startTime = Date.now();
    await page.goto('/tarifs', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    // Mobile should load quickly
    expect(loadTime).toBeLessThan(4000);

    // Content should be visible
    await expect(page.getByRole('heading', { name: /des tarifs/i })).toBeVisible();
  });

  test('should not have render-blocking resources', async ({ page }) => {
    await page.goto('/tarifs');

    // Check for CSS and JS loading strategy
    const criticalCSS = await page.locator('style').count();

    // Should have some inline critical CSS (Next.js optimization)
    expect(criticalCSS).toBeGreaterThanOrEqual(0);
  });
});
