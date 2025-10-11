/**
 * E2E Tests for Features Page
 * Feature: Page Fonctionnalités
 */

import { test, expect } from '@playwright/test';

test.describe('Features Page - /fonctionnalites', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/fonctionnalites');
  });

  test('should load page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Fonctionnalités GAMR/);
  });

  test('should display hero section with CTAs', async ({ page }) => {
    // Check hero title
    await expect(
      page.getByRole('heading', {
        name: /toutes vos analyses de risques/i,
      })
    ).toBeVisible();

    // Check both CTAs are visible
    await expect(
      page
        .getByRole('button', {
          name: /demander une démo/i,
        })
        .first()
    ).toBeVisible();

    await expect(
      page
        .getByRole('button', {
          name: /essayer gratuitement/i,
        })
        .first()
    ).toBeVisible();
  });

  test('should display all 7 feature cards', async ({ page }) => {
    // Check for feature titles
    await expect(page.getByText('Cartographie des menaces')).toBeVisible();
    await expect(page.getByText('Évaluation automatisée des risques')).toBeVisible();
    await expect(page.getByText(/Priorités d'action/)).toBeVisible();
    await expect(page.getByText('Indicateurs de performance')).toBeVisible();
    await expect(page.getByText('Collaboration & validation')).toBeVisible();
    await expect(page.getByText('Rapports & audits intelligents')).toBeVisible();
    await expect(page.getByText('Sécurité & traçabilité')).toBeVisible();
  });

  test('should display comparison table', async ({ page }) => {
    // Check section title
    await expect(
      page.getByRole('heading', {
        name: /bénéfices pour les utilisateurs/i,
      })
    ).toBeVisible();

    // Check for key comparison dimensions
    await expect(page.getByText('Productivité')).toBeVisible();
    await expect(page.getByText('Conformité')).toBeVisible();
    await expect(page.getByText('Gouvernance')).toBeVisible();

    // Check for improvement metrics
    await expect(page.getByText('+70%')).toBeVisible();
    await expect(page.getByText('-95% temps')).toBeVisible();
  });

  test('should display ASPCI partner section', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: /ASPCI.*partenaire de confiance/i,
      })
    ).toBeVisible();

    await expect(page.getByText(/Depuis plus d'une dizaine d'années/)).toBeVisible();
  });

  test('should display final conversion CTA', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: /Adoptez la méthodologie GAMR/i,
      })
    ).toBeVisible();
  });

  test('should show tooltips on hover', async ({ page }) => {
    // Find a term with tooltip
    const gamrTerm = page.getByText('GAMR').first();

    // Hover over it
    await gamrTerm.hover();

    // Tooltip should appear
    await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 2000 });
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Hero should still be visible
    await expect(
      page.getByRole('heading', {
        name: /toutes vos analyses de risques/i,
      })
    ).toBeVisible();

    // Features should be stacked
    const featureCards = page.locator('article, [class*="Card"]');
    await expect(featureCards.first()).toBeVisible();
  });

  test('should track CTA clicks', async ({ page }) => {
    // Listen for console logs
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    // Click primary CTA
    await page
      .getByRole('button', { name: /demander une démo/i })
      .first()
      .click();

    // Verify analytics logged
    expect(consoleLogs.some((log) => log.includes('demo_request'))).toBeTruthy();
  });
});
