/**
 * Accessibility Tests: Tarifs Page
 * Feature: 005-g-n-re - Page Tarifs
 *
 * WCAG 2.1 AA Compliance Validation
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Tarifs Page - Accessibility (WCAG 2.1 AA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tarifs');
  });

  // T058: Automated accessibility testing with axe-core
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    // Deployment toggle
    const deploymentToggle = page.getByRole('switch', {
      name: /basculer entre cloud et on-premise/i,
    });
    await expect(deploymentToggle).toHaveAttribute('aria-checked');

    // Billing toggle (if cloud selected)
    const monthlyRadio = page.getByRole('radio', { name: /mensuel/i });
    await expect(monthlyRadio).toHaveAttribute('aria-checked');

    // FAQ accordion items
    const faqSection = page.getByRole('heading', { name: /questions fréquentes/i });
    await faqSection.scrollIntoViewIfNeeded();

    // First FAQ should have aria-expanded
    const firstFAQButton = page.locator('button[aria-expanded]').first();
    await expect(firstFAQButton).toBeVisible();
  });

  test('should have accessible form labels in ROI calculator', async ({ page }) => {
    // Scroll to ROI calculator
    await page.getByRole('heading', { name: /calculateur de roi/i }).scrollIntoViewIfNeeded();

    // All inputs should have associated labels
    const usersInput = page.getByLabel(/nombre d'utilisateurs/i);
    await expect(usersInput).toBeVisible();
    await expect(usersInput).toHaveAttribute('aria-required', 'true');

    const incidentsInput = page.getByLabel(/incidents évités/i);
    await expect(incidentsInput).toBeVisible();

    const timeInput = page.getByLabel(/temps gagné/i);
    await expect(timeInput).toBeVisible();
  });

  // T059: Keyboard navigation testing
  test('should support full keyboard navigation', async ({ page }) => {
    // Start from top
    await page.keyboard.press('Tab');

    // Should be able to tab through all interactive elements
    const focusableElements = await page.locator('a, button, input, [tabindex="0"]').all();
    expect(focusableElements.length).toBeGreaterThan(10);

    // Test that focus indicators are visible
    for (let i = 0; i < Math.min(5, focusableElements.length); i++) {
      await page.keyboard.press('Tab');

      // Check if any element has focus
      const hasFocus = await page.evaluate(() => {
        const activeEl = document.activeElement;
        return activeEl && activeEl.tagName !== 'BODY';
      });

      expect(hasFocus).toBe(true);
    }
  });

  test('should allow Space/Enter to activate toggles', async ({ page }) => {
    const deploymentToggle = page.getByRole('switch', {
      name: /basculer entre cloud et on-premise/i,
    });

    // Focus the toggle
    await deploymentToggle.focus();

    // Press Space to toggle
    await page.keyboard.press('Space');

    // Wait for toggle
    await page.waitForTimeout(200);

    // Should have toggled state
    const ariaChecked = await deploymentToggle.getAttribute('aria-checked');
    expect(ariaChecked).toBe('false'); // Toggled from default 'true'

    // Press Enter to toggle back
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    const ariaCheckedAfter = await deploymentToggle.getAttribute('aria-checked');
    expect(ariaCheckedAfter).toBe('true');
  });

  test('should support keyboard navigation in FAQ accordion', async ({ page }) => {
    // Scroll to FAQ
    await page.getByRole('heading', { name: /questions fréquentes/i }).scrollIntoViewIfNeeded();

    // Tab to first FAQ button
    const firstFAQButton = page.locator('button[aria-expanded]').first();
    await firstFAQButton.focus();

    // Press Enter to expand
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    // Should be expanded
    expect(await firstFAQButton.getAttribute('aria-expanded')).toBe('true');

    // Press Enter again to collapse
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    // Should be collapsed
    expect(await firstFAQButton.getAttribute('aria-expanded')).toBe('false');
  });

  // T060: Screen reader support (simulated)
  test('should announce toggle state changes', async ({ page }) => {
    const deploymentToggle = page.getByRole('switch');

    // Check for screen reader text
    const srText = await deploymentToggle.locator('.sr-only').textContent();
    expect(srText).toMatch(/sélectionné/i);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // H1 should exist and be unique
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);

    // H2 elements should exist for major sections
    const h2Elements = await page.locator('h2').count();
    expect(h2Elements).toBeGreaterThan(3); // Multiple sections

    // H3 for plan names and FAQ questions
    const h3Elements = await page.locator('h3').count();
    expect(h3Elements).toBeGreaterThan(4); // At least 4 plans + some FAQs
  });

  // T061: Color contrast validation
  test('should have sufficient color contrast', async ({ page }) => {
    // Run axe with specific color contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('should have visible focus indicators', async ({ page }) => {
    // Focus first interactive element
    await page.keyboard.press('Tab');

    // Get computed styles of focused element
    const focusStyles = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el.tagName === 'BODY') return null;

      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
      };
    });

    // Should have visible focus indicator (outline or box-shadow)
    expect(
      focusStyles?.outline !== 'none' ||
        focusStyles?.outlineWidth !== '0px' ||
        focusStyles?.boxShadow !== 'none'
    ).toBe(true);
  });
});
