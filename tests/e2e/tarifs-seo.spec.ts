/**
 * SEO Tests: Tarifs Page
 * Feature: 005-g-n-re - Page Tarifs
 *
 * SEO metadata and structured data validation
 */

import { test, expect } from '@playwright/test';

test.describe('Tarifs Page - SEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
  });

  // T067: Verify meta tags
  test('should have proper title tag', async ({ page }) => {
    const title = await page.title();

    // Should have specific title
    expect(title).toContain('Tarifs GAMR');
    expect(title).toContain('Cloud');
    expect(title).toContain('On-Premise');

    // Should be within character limit (50-60 chars)
    expect(title.length).toBeGreaterThanOrEqual(40);
    expect(title.length).toBeLessThanOrEqual(65);
  });

  test('should have meta description', async ({ page }) => {
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');

    expect(metaDescription).toBeTruthy();
    expect(metaDescription).toContain('GAMR');
    expect(metaDescription).toContain('100.000 FCFA');

    // Should be within character limit (150-160 chars)
    expect(metaDescription!.length).toBeGreaterThanOrEqual(140);
    expect(metaDescription!.length).toBeLessThanOrEqual(165);
  });

  test('should have complete OpenGraph tags', async ({ page }) => {
    // og:title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).toContain('Tarifs GAMR');

    // og:description
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute('content');
    expect(ogDescription).toBeTruthy();

    // og:image
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
    expect(ogImage).toMatch(/\/images\/tarifs\/og-image\.png/);

    // og:url
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBeTruthy();
    expect(ogUrl).toMatch(/\/tarifs/);

    // og:type
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');
  });

  test('should have Twitter Card meta tags', async ({ page }) => {
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toBeTruthy();

    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toBeTruthy();
  });

  test('should have canonical URL', async ({ page }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');

    expect(canonical).toBeTruthy();
    expect(canonical).toMatch(/\/tarifs$/);
  });

  // T067: Structured data validation
  test('should have Product structured data', async ({ page }) => {
    // Find JSON-LD script with Product schema
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();

    expect(jsonLdScripts.length).toBeGreaterThanOrEqual(2); // Product + FAQPage

    // Parse and validate Product schema
    let foundProduct = false;
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (!content) continue;

      const data = JSON.parse(content);

      if (data['@type'] === 'Product') {
        foundProduct = true;

        // Validate Product schema
        expect(data.name).toContain('GAMR');
        expect(data.offers).toBeDefined();
        expect(data.offers['@type']).toBe('AggregateOffer');
        expect(data.offers.priceCurrency).toBe('XOF');
        expect(data.offers.lowPrice).toBe('100000');
        expect(data.offers.highPrice).toBe('500000');
        expect(data.offers.offers).toHaveLength(3); // Starter, Pro, Business
      }
    }

    expect(foundProduct).toBe(true);
  });

  test('should have FAQPage structured data', async ({ page }) => {
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();

    let foundFAQ = false;
    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (!content) continue;

      const data = JSON.parse(content);

      if (data['@type'] === 'FAQPage') {
        foundFAQ = true;

        // Validate FAQPage schema
        expect(data.mainEntity).toBeDefined();
        expect(data.mainEntity.length).toBeGreaterThanOrEqual(6);
        expect(data.mainEntity.length).toBeLessThanOrEqual(8);

        // Check first FAQ structure
        const firstFAQ = data.mainEntity[0];
        expect(firstFAQ['@type']).toBe('Question');
        expect(firstFAQ.name).toBeTruthy();
        expect(firstFAQ.acceptedAnswer).toBeDefined();
        expect(firstFAQ.acceptedAnswer['@type']).toBe('Answer');
        expect(firstFAQ.acceptedAnswer.text).toBeTruthy();
      }
    }

    expect(foundFAQ).toBe(true);
  });

  test('should have semantic HTML structure', async ({ page }) => {
    // Should use semantic elements
    const mainElement = await page.locator('main').count();
    expect(mainElement).toBe(1);

    const sectionElements = await page.locator('section').count();
    expect(sectionElements).toBeGreaterThan(3); // Multiple sections

    const articleElements = await page.locator('article').count();
    expect(articleElements).toBeGreaterThanOrEqual(4); // Pricing cards
  });

  // T068: Internal linking
  test('should have links to other pages', async ({ page }) => {
    // Links should exist to other pages
    const inscriptionLinks = await page.locator('a[href*="/inscription"]').count();
    expect(inscriptionLinks).toBeGreaterThan(0);

    const contactLinks = await page.locator('a[href*="/contact"]').count();
    expect(contactLinks).toBeGreaterThan(0);
  });

  // T069: Robots and indexability
  test('should be indexable (no noindex)', async ({ page }) => {
    const noindex = await page.locator('meta[name="robots"][content*="noindex"]').count();
    expect(noindex).toBe(0);

    // Should have positive robots meta
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
    if (robotsMeta) {
      expect(robotsMeta).toMatch(/index/i);
      expect(robotsMeta).toMatch(/follow/i);
    }
  });
});
