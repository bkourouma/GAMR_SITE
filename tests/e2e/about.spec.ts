import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/a-propos');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/À Propos de GAMR/);
  });

  test('displays all sections', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Simplifier');
    await expect(page.locator('h2:has-text("Notre Histoire")')).toBeVisible();
    await expect(page.locator('h2:has-text("Notre Équipe")')).toBeVisible();
    await expect(page.locator('h2:has-text("Nos Valeurs")')).toBeVisible();
    await expect(page.locator('h2:has-text("Nos Réalisations")')).toBeVisible();
  });

  test('team member cards render', async ({ page }) => {
    const cards = page.locator('[data-testid="team-member-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Check first card has expected content
    const firstCard = cards.first();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('p').first()).toBeVisible(); // Role
  });

  test('CTA buttons are clickable', async ({ page }) => {
    const demoButton = page.locator('text=Demander une Démo').first();
    await expect(demoButton).toBeVisible();

    // Click and verify navigation (or just verify href)
    const href = await demoButton.evaluate((el) => el.closest('a')?.getAttribute('href'));
    expect(href).toBe('/demander-demo');
  });

  test('mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2:has-text("Notre Équipe")')).toBeVisible();

    // Verify team cards stack in single column
    const cards = page.locator('[data-testid="team-member-card"]');
    if ((await cards.count()) > 1) {
      const firstCard = await cards.first().boundingBox();
      const secondCard = await cards.nth(1).boundingBox();

      // Cards should be vertically stacked (second card Y > first card bottom Y)
      if (firstCard && secondCard) {
        expect(secondCard.y).toBeGreaterThan(firstCard.y + firstCard.height - 50);
      }
    }
  });

  test('values section displays with icons', async ({ page }) => {
    const valuesSection = page.locator('h2:has-text("Nos Valeurs")').locator('..');

    // Check that at least 3 value cards exist
    const valueCards = valuesSection.locator('div.bg-white');
    const count = await valueCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('stats section displays numbers', async ({ page }) => {
    const statsSection = page.locator('h2:has-text("Nos Réalisations")').locator('..');

    // Check stats are visible
    const stats = statsSection.locator('.text-primary-600');
    const count = await stats.count();
    expect(count).toBeGreaterThan(0);
  });

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy(); // All images should have alt text
    }
  });
});
