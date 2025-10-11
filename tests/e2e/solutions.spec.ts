import { test, expect } from '@playwright/test';

test.describe('Solutions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions');
  });

  test.describe('Hero Section', () => {
    test('displays hero title and subtitle', async ({ page }) => {
      await expect(page.locator('h1')).toContainText('Des solutions adaptées à chaque secteur');
      await expect(page.getByText(/GAMR s'aligne sur vos normes/i)).toBeVisible();
    });

    test('shows both CTA buttons', async ({ page }) => {
      const primaryCTA = page.getByRole('link', { name: /Découvrir les fonctionnalités/i });
      const secondaryCTA = page.getByRole('link', { name: /Demander une démo/i });

      await expect(primaryCTA).toBeVisible();
      await expect(secondaryCTA).toBeVisible();
    });

    test('primary CTA navigates to fonctionnalites page', async ({ page }) => {
      await page.click('text=Découvrir les fonctionnalités');
      await expect(page).toHaveURL('/fonctionnalites');
    });
  });

  test.describe('Introduction Section', () => {
    test('displays introduction text', async ({ page }) => {
      await expect(
        page.getByText(/Chaque secteur fait face à des risques spécifiques/i)
      ).toBeVisible();
    });
  });

  test.describe('Sector Cards', () => {
    test('displays all 5 sector cards', async ({ page }) => {
      const cards = page.locator('.solution-card');
      await expect(cards).toHaveCount(5);
    });

    test('each sector card has required elements', async ({ page }) => {
      const firstCard = page.locator('.solution-card').first();

      // Check for heading
      await expect(firstCard.locator('h2')).toBeVisible();

      // Check for normes section
      await expect(firstCard.getByText('Normes et référentiels')).toBeVisible();

      // Check for defis section
      await expect(firstCard.getByText('Défis majeurs')).toBeVisible();

      // Check for solutions section
      await expect(firstCard.getByText('Solutions GAMR')).toBeVisible();
    });

    test('banking sector displays correct norms', async ({ page }) => {
      const bankingCard = page.locator('#secteur-bancaire');

      await expect(bankingCard).toBeVisible();
      await expect(bankingCard.getByText('Bâle III')).toBeVisible();
      await expect(bankingCard.getByText('ISO 27001')).toBeVisible();
      await expect(bankingCard.getByText('AML/CFT (LBC/FT)')).toBeVisible();
    });

    test('healthcare sector displays correct norms', async ({ page }) => {
      const healthCard = page.locator('#sante');

      await expect(healthCard).toBeVisible();
      await expect(healthCard.getByText('ISO 9001')).toBeVisible();
      await expect(healthCard.getByText('OMS Patient Safety')).toBeVisible();
    });
  });

  test.describe('Comparison Table', () => {
    test('displays comparison table with correct structure', async ({ page }) => {
      const table = page.locator('table');
      await expect(table).toBeVisible();

      // Check headers
      const headers = table.locator('th');
      await expect(headers).toHaveCount(3);
      await expect(headers.nth(0)).toContainText('Secteur');
      await expect(headers.nth(1)).toContainText('Normes clés');
      await expect(headers.nth(2)).toContainText('Modules GAMR');
    });

    test('table contains 5 rows (one per sector)', async ({ page }) => {
      const rows = page.locator('tbody tr');
      await expect(rows).toHaveCount(5);
    });

    test('table is scrollable on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const tableWrapper = page.locator('.overflow-x-auto');
      await expect(tableWrapper).toBeVisible();
    });
  });

  test.describe('Conversion CTA', () => {
    test('displays final CTA section with headline', async ({ page }) => {
      await expect(page.getByText(/Découvrez comment GAMR s'intègre/i)).toBeVisible();
    });

    test('shows demo and signup CTAs', async ({ page }) => {
      const demoCTA = page.getByRole('link', { name: /Demander une démo/i }).last();
      const signupCTA = page.getByRole('link', { name: /Essayer gratuitement/i });

      await expect(demoCTA).toBeVisible();
      await expect(signupCTA).toBeVisible();
    });
  });

  test.describe('Anchor Navigation', () => {
    test('navigates to banking sector via anchor link', async ({ page }) => {
      await page.goto('/solutions#secteur-bancaire');

      const bankingCard = page.locator('#secteur-bancaire');
      await expect(bankingCard).toBeInViewport();
    });

    test('navigates to healthcare sector via anchor link', async ({ page }) => {
      await page.goto('/solutions#sante');

      const healthCard = page.locator('#sante');
      await expect(healthCard).toBeInViewport();
    });

    test('anchor navigation accounts for scroll margin', async ({ page }) => {
      await page.goto('/solutions#secteur-bancaire');

      // Wait for smooth scroll to complete
      await page.waitForTimeout(500);

      const bankingCard = page.locator('#secteur-bancaire');
      const boundingBox = await bankingCard.boundingBox();

      // Card should not be hidden behind header (should have top margin)
      expect(boundingBox?.y).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('page has proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);

      const h2Elements = page.locator('h2');
      await expect(h2Elements.first()).toBeVisible();

      const h3Elements = page.locator('h3');
      await expect(h3Elements.first()).toBeVisible();
    });

    test('all images have alt text', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt?.length).toBeGreaterThan(0);
      }
    });

    test('CTA buttons are keyboard accessible', async ({ page }) => {
      const primaryCTA = page.getByRole('link', { name: /Découvrir les fonctionnalités/i });

      await primaryCTA.focus();
      await expect(primaryCTA).toBeFocused();
    });

    test('table has proper semantic structure', async ({ page }) => {
      const table = page.locator('table');
      const caption = table.locator('caption');
      const thead = table.locator('thead');
      const tbody = table.locator('tbody');

      await expect(caption).toBeAttached();
      await expect(thead).toBeVisible();
      await expect(tbody).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('desktop: displays 2-column grid', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const grid = page.locator('.grid');
      await expect(grid).toHaveClass(/lg:grid-cols-2/);
    });

    test('mobile: displays single column', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const cards = page.locator('.solution-card');
      await expect(cards.first()).toBeVisible();
    });

    test('tablet: displays correctly', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const hero = page.locator('h1');
      await expect(hero).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('page loads within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/solutions', { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      // Should load in less than 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('images load progressively', async ({ page }) => {
      const images = page.locator('img');
      const firstImage = images.first();

      await expect(firstImage).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('full page screenshot matches baseline', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot('solutions-full-page.png', {
        fullPage: true,
      });
    });

    test('hero section screenshot matches baseline', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toHaveScreenshot('solutions-hero.png');
    });

    test('sector card screenshot matches baseline', async ({ page }) => {
      const firstCard = page.locator('.solution-card').first();
      await expect(firstCard).toHaveScreenshot('solutions-sector-card.png');
    });

    test('comparison table screenshot matches baseline', async ({ page }) => {
      const table = page.locator('table');
      await expect(table).toHaveScreenshot('solutions-comparison-table.png');
    });
  });
});
