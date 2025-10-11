/**
 * Unit Tests: Pricing Utilities
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Tests for pricing calculations and ROI formulas
 */

import { describe, it, expect } from 'vitest';
import {
  calculateAnnualPrice,
  calculateAnnualSavings,
  getPlanPrice,
  calculateROI,
  ANNUAL_DISCOUNT_RATE,
} from '@/lib/pricing-utils';
import type { PricingPlan } from '@/types/pricing';
import type { ROIInputs, ROIConstants } from '@/types/roi';

describe('pricing-utils', () => {
  describe('calculateAnnualPrice', () => {
    it('calculates annual price with 15% discount', () => {
      expect(calculateAnnualPrice(100000)).toBe(1020000); // 100k * 12 * 0.85
      expect(calculateAnnualPrice(250000)).toBe(2550000); // 250k * 12 * 0.85
      expect(calculateAnnualPrice(500000)).toBe(5100000); // 500k * 12 * 0.85
    });

    it('returns rounded values', () => {
      const result = calculateAnnualPrice(123456);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('handles edge case of 0', () => {
      expect(calculateAnnualPrice(0)).toBe(0);
    });
  });

  describe('calculateAnnualSavings', () => {
    it('calculates savings amount correctly', () => {
      // Starter: 100k * 12 = 1,200,000 full price
      // Annual: 1,020,000 (with 15% discount)
      // Savings: 180,000
      expect(calculateAnnualSavings(100000)).toBe(180000);

      // Pro: 250k * 12 = 3,000,000 full price
      // Annual: 2,550,000
      // Savings: 450,000
      expect(calculateAnnualSavings(250000)).toBe(450000);
    });

    it('savings equals 15% of annual full price', () => {
      const monthlyPrice = 100000;
      const fullYearPrice = monthlyPrice * 12;
      const savings = calculateAnnualSavings(monthlyPrice);

      expect(savings).toBe(fullYearPrice * ANNUAL_DISCOUNT_RATE);
    });
  });

  describe('getPlanPrice', () => {
    const mockPlan: PricingPlan = {
      id: 'test-plan',
      tier: 'pro',
      name: 'Test Plan',
      deploymentModel: 'cloud',
      basePrice: 250000,
      annualPrice: 2550000,
      userLimit: 5,
      standardsLimit: 3,
      actionPrioritiesLimit: 10,
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
        'Feature 6',
        'Feature 7',
        'Feature 8',
      ],
      ctaText: 'Try it',
      ctaDestination: '/signup',
    };

    it('returns monthly price when billing period is monthly', () => {
      expect(getPlanPrice(mockPlan, 'monthly')).toBe(250000);
    });

    it('returns annual price when billing period is annual', () => {
      expect(getPlanPrice(mockPlan, 'annual')).toBe(2550000);
    });

    it('calculates annual price if not provided', () => {
      const planWithoutAnnual: Partial<PricingPlan> = { ...mockPlan };
      delete planWithoutAnnual.annualPrice; // Remove property completely
      expect(getPlanPrice(planWithoutAnnual as PricingPlan, 'annual')).toBe(2550000);
    });

    it('returns null for custom pricing plans', () => {
      const customPlan = { ...mockPlan, basePrice: null, annualPrice: null };
      expect(getPlanPrice(customPlan, 'monthly')).toBe(null);
      expect(getPlanPrice(customPlan, 'annual')).toBe(null);
    });
  });

  describe('calculateROI', () => {
    const mockInputs: ROIInputs = {
      numberOfUsers: 10,
      incidentsAvoidedPerMonth: 5,
      timeSavedPerUserPerWeek: 2,
    };

    const mockConstants: ROIConstants = {
      hourlyRate: 15000,
      costPerIncident: 500000,
      setupCost: 0,
      weeksPerMonth: 4.33,
    };

    const planCost = 500000; // Business plan

    it('calculates ROI correctly with typical inputs', () => {
      const results = calculateROI(mockInputs, planCost, mockConstants);

      // Time savings: 10 users * 2 hrs/week * 4.33 weeks * 15,000 = 1,299,000
      // Incident prevention: 5 incidents * 500,000 = 2,500,000
      // Monthly savings: 3,799,000
      // Monthly ROI: 3,799,000 - 500,000 = 3,299,000

      expect(results.monthlySavings).toBe(1299000 + 2500000);
      expect(results.monthlyROI).toBe(3799000 - 500000);
      expect(results.annualROI).toBe(results.monthlyROI * 12);
      expect(results.planCost).toBe(500000);
    });

    it('calculates break-even months when setup cost exists', () => {
      const constantsWithSetup = { ...mockConstants, setupCost: 1000000 };
      const results = calculateROI(mockInputs, planCost, constantsWithSetup);

      // Break-even = setupCost / monthlyROI
      if (results.monthlyROI > 0) {
        expect(results.breakEvenMonths).toBe(Math.ceil(1000000 / results.monthlyROI));
      }
    });

    it('returns immediate break-even (0 months) when no setup cost', () => {
      const results = calculateROI(mockInputs, planCost, mockConstants);

      if (results.monthlyROI > 0) {
        expect(results.breakEvenMonths).toBe(0); // Immediate
      }
    });

    it('returns null break-even when negative ROI', () => {
      const lowInputs: ROIInputs = {
        numberOfUsers: 1,
        incidentsAvoidedPerMonth: 0,
        timeSavedPerUserPerWeek: 0,
      };

      const results = calculateROI(lowInputs, planCost, mockConstants);

      // Should have negative ROI
      expect(results.monthlyROI).toBeLessThan(0);
      expect(results.breakEvenMonths).toBe(null);
    });

    it('handles edge case: maximum inputs', () => {
      const maxInputs: ROIInputs = {
        numberOfUsers: 1000,
        incidentsAvoidedPerMonth: 50,
        timeSavedPerUserPerWeek: 40,
      };

      const results = calculateROI(maxInputs, planCost, mockConstants);

      // Should have very high ROI
      expect(results.monthlyROI).toBeGreaterThan(0);
      expect(results.monthlySavings).toBeGreaterThan(planCost);
    });

    it('handles edge case: zero inputs', () => {
      const zeroInputs: ROIInputs = {
        numberOfUsers: 0,
        incidentsAvoidedPerMonth: 0,
        timeSavedPerUserPerWeek: 0,
      };

      const results = calculateROI(zeroInputs, planCost, mockConstants);

      expect(results.monthlySavings).toBe(0);
      expect(results.monthlyROI).toBe(-planCost);
      expect(results.breakEvenMonths).toBe(null);
    });
  });
});
