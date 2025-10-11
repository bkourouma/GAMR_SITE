/**
 * E2E Tests: Tarifs Page
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Tests for User Story 1: Compare Cloud and On-Premise Pricing
 */

import { test, expect } from '@playwright/test';

test.describe('Tarifs Page - User Story 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
  });

  // T019: Navigate to /tarifs and verify hero section
  test('displays hero section with title and CTAs', async ({ page }) => {
    // Check hero title
    const heroTitle = page.getByRole('heading', {
      name: /des tarifs simples et transparents/i,
      level: 1,
    });
    await expect(heroTitle).toBeVisible();

    // Check subtitle
    await expect(
      page.getByText(/choisissez le mode qui correspond à votre gouvernance/i)
    ).toBeVisible();

    // Check primary CTA
    const primaryCTA = page.getByRole('link', { name: /essai gratuit 30 jours/i });
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', '/inscription');

    // Check secondary CTA
    const secondaryCTA = page.getByRole('link', { name: /demander une démo/i });
    await expect(secondaryCTA).toBeVisible();
    await expect(secondaryCTA).toHaveAttribute('href', '/contact?type=demo');
  });

  // T020: Toggle Cloud/On-Premise deployment models
  test('toggles between Cloud and On-Premise deployment models', async ({ page }) => {
    // Verify default is Cloud (4 plans should be visible)
    await expect(page.getByRole('heading', { name: /starter/i, level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^pro$/i, level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /business/i, level: 3 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /enterprise/i, level: 3 })).toBeVisible();

    // Find and click the deployment toggle
    const toggle = page.getByRole('switch', { name: /basculer entre cloud et on-premise/i });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-checked', 'true'); // Cloud is default

    // Toggle to On-Premise
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'false');

    // Verify On-Premise content appears
    await expect(page.getByRole('heading', { name: /on-premise/i, level: 2 })).toBeVisible();
    await expect(page.getByText(/licence perpétuelle/i)).toBeVisible();
    await expect(page.getByText(/maintenance annuelle/i)).toBeVisible();
    await expect(page.getByText(/20%/)).toBeVisible();

    // Toggle back to Cloud
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    // Verify Cloud plans are back
    await expect(page.getByRole('heading', { name: /starter/i, level: 3 })).toBeVisible();
  });

  // T020 continued: Verify no layout shift
  test('prevents layout shift when toggling deployment models', async ({ page }) => {
    // Get initial page height
    const initialHeight = await page.evaluate(() => document.body.scrollHeight);

    // Toggle to On-Premise
    const toggle = page.getByRole('switch', { name: /basculer entre cloud et on-premise/i });
    await toggle.click();

    // Wait for transition
    await page.waitForTimeout(500);

    // Get new page height
    const newHeight = await page.evaluate(() => document.body.scrollHeight);

    // Height difference should be reasonable (not a drastic layout shift)
    // Allow some variance but flag major changes
    const heightDifference = Math.abs(newHeight - initialHeight);
    const percentageChange = (heightDifference / initialHeight) * 100;

    // Expect less than 50% height change (generous for content swap)
    expect(percentageChange).toBeLessThan(50);
  });

  // T021: View comparison table on desktop and mobile
  test('displays comparison table with all dimensions', async ({ page }) => {
    // Scroll to comparison table
    await page
      .getByRole('heading', { name: /cloud vs on-premise.*comparaison/i, level: 2 })
      .scrollIntoViewIfNeeded();

    // Verify comparison table title
    await expect(
      page.getByRole('heading', { name: /cloud vs on-premise.*comparaison/i })
    ).toBeVisible();

    // Check for all 6 dimensions (visible in either table or cards)
    const dimensions = [
      /mises à jour/i,
      /sécurité.*conformité/i,
      /time-to-value/i,
      /capex.*opex/i,
      /sla.*disponibilité/i,
      /personnalisation/i,
    ];

    for (const dimension of dimensions) {
      await expect(page.getByText(dimension).first()).toBeVisible();
    }
  });

  test('renders comparison table responsively on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate and scroll to comparison
    await page
      .getByRole('heading', { name: /cloud vs on-premise.*comparaison/i, level: 2 })
      .scrollIntoViewIfNeeded();

    // On mobile, content should be in cards (not table rows)
    // Check that at least one dimension card is visible
    await expect(page.getByText(/mises à jour/i).first()).toBeVisible();

    // Verify no horizontal scroll needed
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.viewportSize();
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth!.width + 5); // Allow 5px margin
  });

  test('displays Cloud plan prices in FCFA', async ({ page }) => {
    // Verify Starter plan
    await expect(page.getByRole('heading', { name: /starter/i, level: 3 })).toBeVisible();
    await expect(page.getByText(/100[.\s]000.*F CFA/)).toBeVisible();

    // Verify Pro plan
    await expect(page.getByRole('heading', { name: /^pro$/i, level: 3 })).toBeVisible();
    await expect(page.getByText(/250[.\s]000.*F CFA/)).toBeVisible();

    // Verify Business plan
    await expect(page.getByRole('heading', { name: /business/i, level: 3 })).toBeVisible();
    await expect(page.getByText(/500[.\s]000.*F CFA/)).toBeVisible();

    // Verify Enterprise shows custom pricing
    await expect(page.getByRole('heading', { name: /enterprise/i, level: 3 })).toBeVisible();
    await expect(page.getByText(/sur devis/i)).toBeVisible();
  });

  test('all plan cards have proper features and CTAs', async ({ page }) => {
    // Starter plan
    const starterCard = page
      .locator('article', { has: page.getByRole('heading', { name: /starter/i }) })
      .first();
    await expect(starterCard.getByText(/1.*utilisateur/i)).toBeVisible();
    await expect(starterCard.getByText(/1.*norme/i)).toBeVisible();
    await expect(starterCard.getByRole('link', { name: /essayer gratuitement/i })).toBeVisible();

    // Enterprise plan
    const enterpriseCard = page
      .locator('article', { has: page.getByRole('heading', { name: /enterprise/i }) })
      .first();
    await expect(enterpriseCard.getByRole('link', { name: /parler à un expert/i })).toBeVisible();
  });
});

// User Story 2 Tests: Annual vs Monthly Pricing
test.describe('Tarifs Page - User Story 2: Annual vs Monthly Pricing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
  });

  // T025: Toggle between monthly and annual billing
  test('displays billing toggle for Cloud plans', async ({ page }) => {
    // Verify billing toggle is visible (Cloud is default)
    const monthlyButton = page.getByRole('radio', { name: /mensuel/i });
    const annualButton = page.getByRole('radio', { name: /annuel/i });

    await expect(monthlyButton).toBeVisible();
    await expect(annualButton).toBeVisible();

    // Monthly should be selected by default
    await expect(monthlyButton).toHaveAttribute('aria-checked', 'true');
    await expect(annualButton).toHaveAttribute('aria-checked', 'false');

    // Verify savings badge on annual button
    await expect(page.getByText(/économisez 15%/i)).toBeVisible();
  });

  test('toggles between monthly and annual billing with correct prices', async ({ page }) => {
    // Verify monthly prices initially
    await expect(page.getByText(/100[.\s]000.*F CFA/).first()).toBeVisible(); // Starter monthly

    // Click annual toggle
    const annualButton = page.getByRole('radio', { name: /annuel/i });
    await annualButton.click();
    await expect(annualButton).toHaveAttribute('aria-checked', 'true');

    // Wait for price updates
    await page.waitForTimeout(300);

    // Verify annual prices (with 15% discount)
    // Starter: 100k × 12 × 0.85 = 1,020,000
    await expect(page.getByText(/1[.\s]020[.\s]000.*F CFA/)).toBeVisible();

    // Verify savings badge appears on plan cards
    await expect(page.getByText(/économisez.*par an/i).first()).toBeVisible();

    // Toggle back to monthly
    const monthlyButton = page.getByRole('radio', { name: /mensuel/i });
    await monthlyButton.click();
    await expect(monthlyButton).toHaveAttribute('aria-checked', 'true');

    // Verify monthly prices return
    await expect(page.getByText(/100[.\s]000.*F CFA/).first()).toBeVisible();
  });

  test('billing toggle hidden when On-Premise selected', async ({ page }) => {
    // Billing toggle should be visible initially (Cloud mode)
    await expect(page.getByRole('radio', { name: /mensuel/i })).toBeVisible();

    // Switch to On-Premise
    const deploymentToggle = page.getByRole('switch', {
      name: /basculer entre cloud et on-premise/i,
    });
    await deploymentToggle.click();

    // Billing toggle should be hidden
    await expect(page.getByRole('radio', { name: /mensuel/i })).not.toBeVisible();
    await expect(page.getByRole('radio', { name: /annuel/i })).not.toBeVisible();
  });

  // T026: Verify price calculations are correct
  test('verifies 15% discount calculation for all plans', async ({ page }) => {
    // Click annual toggle
    const annualButton = page.getByRole('radio', { name: /annuel/i });
    await annualButton.click();

    // Wait for updates
    await page.waitForTimeout(300);

    // Verify annual prices match formula: monthly × 12 × 0.85
    // Starter: 100,000 × 12 × 0.85 = 1,020,000
    await expect(page.getByText(/1[.\s]020[.\s]000.*F CFA/)).toBeVisible();

    // Pro: 250,000 × 12 × 0.85 = 2,550,000
    await expect(page.getByText(/2[.\s]550[.\s]000.*F CFA/)).toBeVisible();

    // Business: 500,000 × 12 × 0.85 = 5,100,000
    await expect(page.getByText(/5[.\s]100[.\s]000.*F CFA/)).toBeVisible();

    // Enterprise still shows "Sur devis"
    const enterpriseCard = page.locator('article', {
      has: page.getByRole('heading', { name: /enterprise/i }),
    });
    await expect(enterpriseCard.getByText(/sur devis/i)).toBeVisible();
  });
});

// User Story 7 Tests: Access Free Trial and Demo CTAs
test.describe('Tarifs Page - User Story 7: CTAs Throughout Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
  });

  // T030: Verify CTA presence and destinations
  test('displays CTAs in hero section with correct links', async ({ page }) => {
    // Hero CTAs
    const heroPrimaryCTA = page.getByRole('link', { name: /essai gratuit 30 jours/i }).first();
    const heroSecondaryCTA = page.getByRole('link', { name: /demander une démo/i }).first();

    await expect(heroPrimaryCTA).toBeVisible();
    await expect(heroPrimaryCTA).toHaveAttribute('href', '/inscription');

    await expect(heroSecondaryCTA).toBeVisible();
    await expect(heroSecondaryCTA).toHaveAttribute('href', '/contact?type=demo');
  });

  test('displays CTAs in final CTA section', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for CTA section to be visible
    await expect(page.getByRole('heading', { name: /prêt à commencer/i })).toBeVisible();

    // Verify final CTAs
    const finalPrimaryCTA = page.getByRole('link', { name: /démarrez votre essai gratuit/i });
    const finalSecondaryCTA = page.getByRole('link', { name: /demander une démo/i }).last();

    await expect(finalPrimaryCTA).toBeVisible();
    await expect(finalPrimaryCTA).toHaveAttribute('href', '/inscription');

    await expect(finalSecondaryCTA).toBeVisible();
    await expect(finalSecondaryCTA).toHaveAttribute('href', '/contact?type=demo');
  });

  test('plan cards have correct CTA destinations', async ({ page }) => {
    // Starter plan CTA
    const starterCard = page.locator('article', {
      has: page.getByRole('heading', { name: /starter/i }),
    });
    const starterCTA = starterCard.getByRole('link', { name: /essayer/i });
    await expect(starterCTA).toBeVisible();
    await expect(starterCTA).toHaveAttribute('href', /\/inscription\?plan=starter/);

    // Pro plan CTA
    const proCard = page.locator('article', { has: page.getByRole('heading', { name: /^pro$/i }) });
    const proCTA = proCard.getByRole('link', { name: /essayer/i });
    await expect(proCTA).toBeVisible();
    await expect(proCTA).toHaveAttribute('href', /\/inscription\?plan=pro/);

    // Business plan CTA
    const businessCard = page.locator('article', {
      has: page.getByRole('heading', { name: /business/i }),
    });
    const businessCTA = businessCard.getByRole('link', { name: /essayer/i });
    await expect(businessCTA).toBeVisible();
    await expect(businessCTA).toHaveAttribute('href', /\/inscription\?plan=business/);

    // Enterprise plan CTA (different text and destination)
    const enterpriseCard = page.locator('article', {
      has: page.getByRole('heading', { name: /enterprise/i }),
    });
    const enterpriseCTA = enterpriseCard.getByRole('link', { name: /parler à un expert/i });
    await expect(enterpriseCTA).toBeVisible();
    await expect(enterpriseCTA).toHaveAttribute('href', /\/contact\?type=enterprise/);
  });

  test('all CTAs are keyboard accessible', async ({ page }) => {
    // Tab through page and verify CTAs receive focus
    await page.keyboard.press('Tab'); // First focusable element

    // Hero primary CTA should eventually receive focus
    const heroPrimaryCTA = page.getByRole('link', { name: /essai gratuit 30 jours/i }).first();

    // Tab until we reach the CTA (max 20 tabs)
    for (let i = 0; i < 20; i++) {
      const isFocused = await heroPrimaryCTA.evaluate((el) => el === document.activeElement);
      if (isFocused) break;
      await page.keyboard.press('Tab');
    }

    // Verify focus indicator is visible (check outline or box-shadow)
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow,
      };
    });

    // Should have either outline or box-shadow (focus indicator)
    expect(focusedElement?.outline !== 'none' || focusedElement?.boxShadow !== 'none').toBeTruthy();
  });
});
