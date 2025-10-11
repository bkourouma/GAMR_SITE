/**
 * useROICalculator Hook
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Client-side ROI calculation with validation
 */

import { useMemo } from 'react';
import { calculateROI } from '@/lib/pricing-utils';
import { validateROIInputs } from '@/types/roi';
import { roiConstants, cloudPlans } from '@/lib/pricing-data';
import type { ROIInputs, ROIResults } from '@/types/roi';

export interface UseROICalculatorReturn {
  /** Calculated ROI results */
  results: ROIResults | null;

  /** Validation errors for inputs */
  errors: Partial<Record<keyof ROIInputs, string>>;

  /** Whether inputs are valid */
  isValid: boolean;
}

/**
 * Hook for real-time ROI calculation with validation
 *
 * @param inputs - ROI input parameters
 * @param planId - Optional plan ID to determine plan cost (defaults to Business)
 * @returns Calculated results, validation errors, and validity status
 *
 * @example
 * const { results, errors, isValid } = useROICalculator(inputs, 'cloud-business');
 */
export function useROICalculator(inputs: ROIInputs, planId?: string): UseROICalculatorReturn {
  // Validation
  const { isValid, errors } = useMemo(() => validateROIInputs(inputs), [inputs]);

  // Get plan cost (default to Business plan if not specified)
  const planCost = useMemo(() => {
    if (planId) {
      const plan = cloudPlans.find((p) => p.id === planId);
      if (plan && plan.basePrice) {
        return plan.basePrice;
      }
    }
    // Default to Business plan (most popular)
    const businessPlan = cloudPlans.find((p) => p.tier === 'business');
    return businessPlan?.basePrice ?? 500000;
  }, [planId]);

  // Calculate ROI
  const results = useMemo(() => {
    if (!isValid) return null;
    return calculateROI(inputs, planCost, roiConstants);
  }, [inputs, planCost, isValid]);

  return { results, errors, isValid };
}
