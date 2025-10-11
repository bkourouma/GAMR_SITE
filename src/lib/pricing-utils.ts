/**
 * Pricing Calculation Utilities
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Utilities for annual discount calculation and ROI computation
 */

import type { BillingPeriod } from '@/types/pricing';
import type { PricingPlan } from '@/types/pricing';
import type { ROIInputs, ROIResults, ROIConstants } from '@/types/roi';

/**
 * Annual discount percentage (15%)
 */
export const ANNUAL_DISCOUNT_RATE = 0.15;

/**
 * Calculate annual price with 15% discount
 *
 * Formula: monthlyPrice × 12 × 0.85
 *
 * @param monthlyPrice - Monthly price in FCFA
 * @returns Annual price with discount applied
 *
 * @example
 * calculateAnnualPrice(100000) // 1020000 (100k × 12 × 0.85)
 * calculateAnnualPrice(250000) // 2550000 (250k × 12 × 0.85)
 */
export function calculateAnnualPrice(monthlyPrice: number): number {
  return Math.round(monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT_RATE));
}

/**
 * Calculate annual savings amount
 *
 * @param monthlyPrice - Monthly price in FCFA
 * @returns Savings amount in FCFA
 *
 * @example
 * calculateAnnualSavings(100000) // 180000 (15% of 1.2M)
 */
export function calculateAnnualSavings(monthlyPrice: number): number {
  const fullYearlyPrice = monthlyPrice * 12;
  const discountedYearlyPrice = calculateAnnualPrice(monthlyPrice);
  return fullYearlyPrice - discountedYearlyPrice;
}

/**
 * Get price for a plan based on billing period
 *
 * @param plan - Pricing plan
 * @param billingPeriod - Billing period (monthly or annual)
 * @returns Price in FCFA or null for custom pricing
 *
 * @example
 * getPlanPrice(starterPlan, 'monthly') // 100000
 * getPlanPrice(starterPlan, 'annual') // 1020000
 * getPlanPrice(enterprisePlan, 'monthly') // null (custom pricing)
 */
export function getPlanPrice(plan: PricingPlan, billingPeriod: BillingPeriod): number | null {
  if (plan.basePrice === null) return null;

  if (billingPeriod === 'annual') {
    return plan.annualPrice ?? calculateAnnualPrice(plan.basePrice);
  }

  return plan.basePrice;
}

/**
 * Calculate ROI based on user inputs
 *
 * Formula:
 * - Monthly savings = (users × hours/week × 4.33 × hourlyRate) + (incidents × costPerIncident)
 * - Monthly ROI = monthlySavings - planCost
 * - Annual ROI = monthlyROI × 12
 * - Break-even = setupCost / monthlyROI (if positive ROI)
 *
 * @param inputs - ROI input parameters
 * @param planCost - Monthly plan cost in FCFA
 * @param constants - ROI calculation constants
 * @returns Calculated ROI results
 *
 * @example
 * calculateROI(
 *   { numberOfUsers: 10, incidentsAvoidedPerMonth: 5, timeSavedPerUserPerWeek: 2 },
 *   500000,
 *   defaultROIConstants
 * )
 */
export function calculateROI(
  inputs: ROIInputs,
  planCost: number,
  constants: ROIConstants
): ROIResults {
  // Monthly time savings value
  const timeSavingsValue =
    inputs.numberOfUsers *
    inputs.timeSavedPerUserPerWeek *
    constants.weeksPerMonth *
    constants.hourlyRate;

  // Monthly incident prevention value
  const incidentPreventionValue = inputs.incidentsAvoidedPerMonth * constants.costPerIncident;

  // Total monthly savings
  const monthlySavings = timeSavingsValue + incidentPreventionValue;

  // Monthly ROI (savings minus plan cost)
  const monthlyROI = monthlySavings - planCost;

  // Annual ROI
  const annualROI = monthlyROI * 12;

  // Break-even calculation
  let breakEvenMonths: number | null = null;
  if (monthlyROI > 0 && constants.setupCost > 0) {
    breakEvenMonths = Math.ceil(constants.setupCost / monthlyROI);
  } else if (monthlyROI > 0) {
    breakEvenMonths = 0; // Immediate ROI (no setup cost)
  }
  // If monthlyROI <= 0, breakEvenMonths stays null (never breaks even)

  return {
    monthlySavings,
    monthlyROI,
    annualROI,
    breakEvenMonths,
    planCost,
  };
}

/**
 * Calculate percentage discount
 *
 * @param originalPrice - Original price
 * @param discountedPrice - Discounted price
 * @returns Discount percentage (0-100)
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  const discount = (originalPrice - discountedPrice) / originalPrice;
  return Math.round(discount * 100);
}
