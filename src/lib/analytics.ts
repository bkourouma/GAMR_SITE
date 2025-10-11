/**
 * Analytics Utilities
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Type-safe analytics event tracking
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

/**
 * Pricing page event types
 */
export type PricingEventAction =
  | 'select_plan'
  | 'select_service'
  | 'contact_addon'
  | 'calculate_roi'
  | 'toggle_deployment'
  | 'toggle_billing'
  | 'expand_faq'
  | 'click_cta';

/**
 * Track pricing page interaction
 *
 * @param action - Type of interaction
 * @param label - Specific item identifier
 * @param value - Optional numeric value
 */
export function trackPricingEvent(
  action: PricingEventAction,
  label: string,
  value?: number | string
): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: 'pricing',
      event_label: label,
      value,
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', action, label, value);
  }
}

/**
 * Track CTA click
 */
export function trackCTAClick(
  ctaType: 'trial' | 'demo' | 'contact',
  location: 'hero' | 'card' | 'footer' | 'addon'
): void {
  trackPricingEvent('click_cta', `${ctaType}_${location}`);
}

/**
 * Track toggle interaction
 */
export function trackToggle(toggleType: 'deployment' | 'billing', value: string): void {
  trackPricingEvent(toggleType === 'deployment' ? 'toggle_deployment' : 'toggle_billing', value);
}
