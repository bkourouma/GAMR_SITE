/**
 * BillingToggle Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Toggle between monthly and annual billing periods (15% discount for annual)
 */

'use client';

import type { BillingPeriod } from '@/types/pricing';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface BillingToggleProps {
  /** Current selected billing period */
  value: BillingPeriod;

  /** Callback when billing period changes */
  onChange: (period: BillingPeriod) => void;

  /** Show savings badge for annual (default: true) */
  showSavingsBadge?: boolean;

  /** Custom savings text (default: "Économisez 15%") */
  savingsText?: string;

  /** Disable the toggle */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Toggle switch for Monthly vs Annual billing
 *
 * Accessible with ARIA radiogroup pattern
 */
export function BillingToggle({
  value,
  onChange,
  showSavingsBadge = true,
  savingsText = 'Économisez 15%',
  disabled = false,
  className,
}: BillingToggleProps) {
  const isMonthly = value === 'monthly';

  return (
    <div
      role="radiogroup"
      aria-labelledby="billing-toggle-label"
      className={cn('billing-toggle', className)}
    >
      <span id="billing-toggle-label" className="sr-only">
        Période de facturation
      </span>

      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 p-1.5 rounded-xl shadow-inner">
        {/* Monthly Option */}
        <button
          role="radio"
          aria-checked={isMonthly}
          disabled={disabled}
          onClick={() => onChange('monthly')}
          className={cn(
            'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            isMonthly
              ? 'bg-white text-gray-900 shadow-md scale-105'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          📅 Mensuel
        </button>

        {/* Annual Option */}
        <button
          role="radio"
          aria-checked={!isMonthly}
          disabled={disabled}
          onClick={() => onChange('annual')}
          className={cn(
            'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative',
            !isMonthly
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md scale-105'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span>💎 Annuel</span>
          {showSavingsBadge && !isMonthly && (
            <span className="ml-2 text-xs bg-white/30 px-2 py-0.5 rounded-full">{savingsText}</span>
          )}
          {showSavingsBadge && isMonthly && (
            <Badge variant="default" className="ml-2 bg-green-600 text-white text-xs animate-pulse">
              {savingsText}
            </Badge>
          )}
        </button>
      </div>
    </div>
  );
}
