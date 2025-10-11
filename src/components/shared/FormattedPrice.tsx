/**
 * FormattedPrice Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Displays prices in FCFA with proper formatting and accessibility
 */

import { formatFCFA, type CurrencyLocale } from '@/lib/currency-formatter';
import { cn } from '@/lib/utils';

export interface FormattedPriceProps {
  /** Price value in FCFA */
  value: number;

  /** Locale for formatting (default: 'es-CI') */
  locale?: CurrencyLocale;

  /** Display mode: full currency or symbol only */
  displayMode?: 'full' | 'symbol';

  /** Additional CSS classes */
  className?: string;

  /** Accessibility: Announce currency to screen readers */
  'aria-label'?: string;
}

/**
 * Component to format and display prices in FCFA
 *
 * @example
 * <FormattedPrice value={100000} /> // "100.000 F CFA"
 * <FormattedPrice value={250000} className="text-2xl font-bold" />
 */
export function FormattedPrice({
  value,
  locale = 'es-CI',
  className,
  'aria-label': ariaLabel,
}: FormattedPriceProps) {
  const formatted = formatFCFA(value, locale);

  // Generate default aria-label if not provided
  const accessibleLabel = ariaLabel ?? `Prix : ${formatted}`;

  return (
    <span className={cn('formatted-price', className)} aria-label={accessibleLabel}>
      {formatted}
    </span>
  );
}
