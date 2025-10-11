/**
 * Currency Formatting Utilities for FCFA
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Uses Intl.NumberFormat with es-CI locale for West African CFA Franc (XOF)
 */

/**
 * Locale for currency formatting
 */
export type CurrencyLocale = 'es-CI' | 'fr-FR';

/**
 * Currency code for West African CFA Franc
 */
export type CurrencyCode = 'XOF';

/**
 * Format an amount in FCFA using es-CI locale
 *
 * @param amount - The amount to format in FCFA
 * @param locale - The locale to use (default: 'es-CI')
 * @returns Formatted string (e.g., "100.000 F CFA")
 *
 * @example
 * formatFCFA(100000) // "100.000 F CFA"
 * formatFCFA(250000) // "250.000 F CFA"
 * formatFCFA(0) // "0 F CFA"
 */
export function formatFCFA(amount: number, locale: CurrencyLocale = 'es-CI'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price range for display
 *
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @param locale - The locale to use
 * @returns Formatted range string (e.g., "100.000 - 500.000 F CFA")
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  locale: CurrencyLocale = 'es-CI'
): string {
  const min = formatFCFA(minPrice, locale);
  const max = formatFCFA(maxPrice, locale);

  // Remove currency symbol from first value to avoid repetition
  const minValue = min.replace(/\s*F\s*CFA\s*$/, '');

  return `${minValue} - ${max}`;
}

/**
 * Parse a formatted FCFA string back to a number
 *
 * @param formattedAmount - Formatted amount string
 * @returns Numeric value
 *
 * @example
 * parseFCFA("100.000 F CFA") // 100000
 * parseFCFA("250.000") // 250000
 */
export function parseFCFA(formattedAmount: string): number {
  // Remove currency symbols, spaces, and dots (thousand separators)
  const cleaned = formattedAmount
    .replace(/F\s*CFA/gi, '')
    .replace(/\s/g, '')
    .replace(/\./g, '');

  return parseInt(cleaned, 10);
}
