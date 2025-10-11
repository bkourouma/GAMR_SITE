/**
 * PricingCard Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Individual pricing plan card with features and CTA
 */

'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import type { PricingPlan, BillingPeriod } from '@/types/pricing';
import { FormattedPrice } from '@/components/shared/FormattedPrice';
import { calculateAnnualSavings } from '@/lib/pricing-utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface PricingCardProps {
  /** Pricing plan data */
  plan: PricingPlan;

  /** Display price (can differ from plan.basePrice for annual) */
  price: number | null;

  /** Billing period for display context */
  billingPeriod?: BillingPeriod;

  /** Callback when CTA is clicked */
  onCtaClick?: (planId: string) => void;

  /** Override CTA text */
  ctaText?: string;

  /** Override CTA href */
  ctaHref?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Pricing plan card component
 *
 * Displays plan name, price, limits, features, and CTA
 */
export function PricingCard({
  plan,
  price,
  billingPeriod,
  onCtaClick,
  ctaText,
  ctaHref,
  className,
}: PricingCardProps) {
  const isCustomPricing = price === null;
  const isHighlighted = plan.isHighlighted ?? false;
  const periodText = billingPeriod === 'annual' ? '/ an' : '/ mois';

  return (
    <Card
      className={cn(
        'pricing-card relative flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl',
        isHighlighted && 'border-blue-500 border-2 shadow-xl ring-2 ring-blue-100',
        !isHighlighted && 'border border-gray-200 hover:border-blue-300',
        className
      )}
      aria-labelledby={`plan-${plan.id}-title`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <Badge
            variant="default"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 shadow-md"
          >
            {plan.badge}
          </Badge>
        </div>
      )}

      <CardHeader
        className={cn(
          'text-center pb-6 pt-8',
          isHighlighted && 'bg-gradient-to-br from-blue-50 to-purple-50'
        )}
      >
        <h3 id={`plan-${plan.id}-title`} className="text-2xl font-bold text-gray-900 mb-4">
          {plan.name}
        </h3>

        <div
          className="price-container"
          aria-label={isCustomPricing ? 'Prix sur devis' : `Prix : ${price} FCFA ${periodText}`}
        >
          {isCustomPricing ? (
            <div className="text-xl font-semibold text-blue-600">Sur devis</div>
          ) : (
            <>
              <div className="flex items-baseline justify-center gap-1">
                <FormattedPrice
                  value={price!}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                />
              </div>
              <span className="text-sm text-gray-500 mt-2 block font-medium">{periodText}</span>

              {/* Annual Savings Indicator */}
              {billingPeriod === 'annual' && plan.basePrice && (
                <div className="mt-3 animate-slide-in">
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1"
                  >
                    💰 Économisez{' '}
                    <FormattedPrice
                      value={calculateAnnualSavings(plan.basePrice)}
                      className="font-bold"
                    />{' '}
                    /an
                  </Badge>
                </div>
              )}
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Limits */}
        {!isCustomPricing && (
          <div className="limits mb-6 pb-6 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-2 rounded-lg bg-blue-50 transition-colors hover:bg-blue-100">
                <div className="font-bold text-2xl text-blue-600">{plan.userLimit ?? '∞'}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {plan.userLimit === 1 ? 'utilisateur' : 'utilisateurs'}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-purple-50 transition-colors hover:bg-purple-100">
                <div className="font-bold text-2xl text-purple-600">
                  {plan.standardsLimit ?? '∞'}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {plan.standardsLimit === 1 ? 'norme' : 'normes'}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-green-50 transition-colors hover:bg-green-100">
                <div className="font-bold text-2xl text-green-600">
                  {plan.actionPrioritiesLimit ?? '∞'}
                </div>
                <div className="text-xs text-gray-600 mt-1">actions/an</div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <ul className="features space-y-3" aria-label="Fonctionnalités incluses">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-6">
        <Link
          href={ctaHref ?? plan.ctaDestination}
          aria-label={`${ctaText ?? plan.ctaText} - Plan ${plan.name}`}
          onClick={() => onCtaClick?.(plan.id)}
          className="w-full"
        >
          <Button
            variant={isHighlighted ? 'primary' : 'secondary'}
            size="lg"
            className={cn(
              'w-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg',
              isHighlighted &&
                'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
              !isHighlighted && 'bg-gray-800 text-white hover:bg-gray-900'
            )}
          >
            {ctaText ?? plan.ctaText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
