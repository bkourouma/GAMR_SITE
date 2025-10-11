/**
 * E2E Tests: User Stories 3 & 4
 * Feature: 005-g-n-re - Page Tarifs
 *
 * User Story 3: View Cloud Plan Details and Features
 * User Story 4: Explore Add-on Options
 */

import { test, expect } from '@playwright/test';

test.describe('Tarifs Page - User Story 3: Plan Details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
  });

  // T033: Verify plan details completeness
  test('Starter plan shows correct details', async ({ page }) => {
    const starterCard = page.locator('article', {
      has: page.getByRole('heading', { name: /^starter$/i }),
    });

    // Verify price
    await expect(starterCard.getByText(/100[.\s]000.*F CFA/)).toBeVisible();

    // Verify limits
    await expect(starterCard.getByText(/1.*utilisateur/i)).toBeVisible();
    await expect(starterCard.getByText(/1.*norme/i)).toBeVisible();
    await expect(starterCard.getByText(/5.*actions/i)).toBeVisible();

    // Count features (should be 8)
    const featureItems = await starterCard.locator('ul li').count();
    expect(featureItems).toBeGreaterThanOrEqual(8);
    expect(featureItems).toBeLessThanOrEqual(10);

    // Verify CTA
    await expect(starterCard.getByRole('link', { name: /essayer/i })).toBeVisible();
  });

  test('Pro plan shows correct details', async ({ page }) => {
    const proCard = page.locator('article', { has: page.getByRole('heading', { name: /^pro$/i }) });

    // Verify price
    await expect(proCard.getByText(/250[.\s]000.*F CFA/)).toBeVisible();

    // Verify limits
    await expect(proCard.getByText(/5.*utilisateurs/i)).toBeVisible();
    await expect(proCard.getByText(/3.*normes/i)).toBeVisible();
    await expect(proCard.getByText(/10.*actions/i)).toBeVisible();

    // Count features (should be 10)
    const featureItems = await proCard.locator('ul li').count();
    expect(featureItems).toBeGreaterThanOrEqual(8);
    expect(featureItems).toBeLessThanOrEqual(10);
  });

  test('Business plan shows correct details', async ({ page }) => {
    const businessCard = page.locator('article', {
      has: page.getByRole('heading', { name: /business/i }),
    });

    // Verify price
    await expect(businessCard.getByText(/500[.\s]000.*F CFA/)).toBeVisible();

    // Verify limits
    await expect(businessCard.getByText(/25.*utilisateurs/i)).toBeVisible();
    await expect(businessCard.getByText(/10.*normes/i)).toBeVisible();
    await expect(businessCard.getByText(/25.*actions/i)).toBeVisible();

    // Count features (should be 10)
    const featureItems = await businessCard.locator('ul li').count();
    expect(featureItems).toBeGreaterThanOrEqual(8);
    expect(featureItems).toBeLessThanOrEqual(10);

    // Verify "Plus populaire" badge
    await expect(businessCard.getByText(/plus populaire/i)).toBeVisible();
  });

  test('Enterprise plan shows correct details', async ({ page }) => {
    const enterpriseCard = page.locator('article', {
      has: page.getByRole('heading', { name: /enterprise/i }),
    });

    // Verify custom pricing
    await expect(enterpriseCard.getByText(/sur devis/i)).toBeVisible();

    // Count features (should be 10)
    const featureItems = await enterpriseCard.locator('ul li').count();
    expect(featureItems).toBeGreaterThanOrEqual(8);
    expect(featureItems).toBeLessThanOrEqual(10);

    // Verify special CTA
    await expect(enterpriseCard.getByRole('link', { name: /parler à un expert/i })).toBeVisible();
  });

  test('features are readable on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const starterCard = page.locator('article', {
      has: page.getByRole('heading', { name: /^starter$/i }),
    });

    // Features should still be visible and readable
    const firstFeature = starterCard.locator('ul li').first();
    await expect(firstFeature).toBeVisible();

    // Check text is not cut off (font size should be readable)
    const fontSize = await firstFeature.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    // Should be at least 14px on mobile
    const fontSizeValue = parseInt(fontSize);
    expect(fontSizeValue).toBeGreaterThanOrEqual(14);
  });
});

test.describe('Tarifs Page - User Story 4: Add-ons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
    // Scroll to add-ons section (if exists)
    // Note: Add-ons will be implemented in this task
  });

  test('displays add-ons section (placeholder test)', async ({ page }) => {
    // This test will be updated once add-ons section is implemented
    // For now, just verify page loads
    await expect(page.getByRole('heading', { name: /des tarifs simples/i })).toBeVisible();
  });
});
