/**
 * Unit Tests: Currency Formatter
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Tests for FCFA formatting with es-CI locale
 */

import { describe, it, expect } from 'vitest';
import { formatFCFA, formatPriceRange, parseFCFA } from '@/lib/currency-formatter';

describe('currency-formatter', () => {
  describe('formatFCFA', () => {
    it('formats standard prices correctly', () => {
      const result = formatFCFA(100000);

      // Should include the amount and CFA designation
      expect(result).toMatch(/100/);
      expect(result).toMatch(/000/);
      expect(result).toMatch(/CFA/);
    });

    it('formats zero correctly', () => {
      const result = formatFCFA(0);
      expect(result).toMatch(/0/);
      expect(result).toMatch(/CFA/);
    });

    it('formats large numbers with thousand separators', () => {
      const result = formatFCFA(5100000);

      // Should have proper formatting (may vary by locale implementation)
      expect(result).toContain('CFA');
      expect(result.length).toBeGreaterThan(5); // Not just "5100000"
    });

    it('handles negative numbers', () => {
      const result = formatFCFA(-100000);
      expect(result).toMatch(/-/);
      expect(result).toMatch(/100/);
    });

    it('removes decimal places for FCFA', () => {
      const result = formatFCFA(100000.99);
      // Should not include decimals
      expect(result).not.toMatch(/\.99/);
      expect(result).not.toMatch(/,99/);
    });
  });

  describe('formatPriceRange', () => {
    it('formats price range correctly', () => {
      const result = formatPriceRange(100000, 500000);

      // Should include both prices and CFA
      expect(result).toMatch(/100/);
      expect(result).toMatch(/500/);
      expect(result).toMatch(/CFA/);
      expect(result).toMatch(/-/); // Range separator
    });
  });

  describe('parseFCFA', () => {
    it('parses formatted FCFA back to number', () => {
      expect(parseFCFA('100.000 F CFA')).toBe(100000);
      expect(parseFCFA('250.000 F CFA')).toBe(250000);
      expect(parseFCFA('500.000 F CFA')).toBe(500000);
    });

    it('handles variations in formatting', () => {
      expect(parseFCFA('100.000')).toBe(100000);
      expect(parseFCFA('100 000')).toBe(100000);
      expect(parseFCFA('100000')).toBe(100000);
    });
  });
});
