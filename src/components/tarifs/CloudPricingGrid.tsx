/**
 * CloudPricingGrid Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Grid of Cloud pricing plan cards
 */

'use client';

import { cloudPlans } from '@/lib/pricing-data';
import { getPlanPrice } from '@/lib/pricing-utils';
import { PricingCard } from './PricingCard';
import type { BillingPeriod } from '@/types/pricing';

export interface CloudPricingGridProps {
  /** Billing period to determine pricing display */
  billingPeriod: BillingPeriod;

  /** Callback when any plan CTA is clicked */
  onPlanSelect?: (planId: string) => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Grid displaying all Cloud pricing plans
 */
export function CloudPricingGrid({
  billingPeriod,
  onPlanSelect,
  className,
}: CloudPricingGridProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {cloudPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            price={getPlanPrice(plan, billingPeriod)}
            billingPeriod={billingPeriod}
            {...(onPlanSelect ? { onCtaClick: onPlanSelect } : {})}
          />
        ))}
      </div>
    </div>
  );
}
