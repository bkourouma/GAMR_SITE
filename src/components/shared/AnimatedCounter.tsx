/**
 * AnimatedCounter Component
 * Feature: 002-transform-the-gamr
 *
 * Displays an animated number counter with ARIA live region for screen readers.
 * Respects user's reduced motion preference.
 */

'use client';

import { forwardRef, useRef } from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { formatNumber } from '@/lib/animations';
import type { EasingFunction } from '@/types/animations';

export interface AnimatedCounterProps {
  /** Starting value. Default: 0 */
  start?: number;
  /** Ending value (required) */
  end: number;
  /** Animation duration in milliseconds. Default: 2000 */
  duration?: number;
  /** Number of decimal places. Default: 0 */
  decimals?: number;
  /** Prefix (e.g., "$"). Default: empty */
  prefix?: string;
  /** Suffix (e.g., "+", "%"). Default: empty */
  suffix?: string;
  /** Easing function name. Default: easeOutCubic */
  easing?: EasingFunction;
  /** Trigger animation on scroll into view. Default: true */
  triggerOnScroll?: boolean;
  /** Intersection Observer threshold. Default: 0.3 */
  threshold?: number;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Additional CSS classes for the number */
  className?: string;
}

/**
 * Animated counter component with accessibility support
 *
 * @example
 * ```tsx
 * <AnimatedCounter
 *   end={500}
 *   suffix="+"
 *   triggerOnScroll={true}
 *   ariaLabel="500 plus organizations using GAMRdigitale"
 *   className="text-5xl font-bold text-primary"
 * />
 * ```
 */
export const AnimatedCounter = forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  (
    {
      start = 0,
      end,
      duration = 2000,
      decimals = 0,
      prefix = '',
      suffix = '',
      easing,
      triggerOnScroll = true,
      threshold = 0.3,
      ariaLabel,
      className = '',
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(internalRef, {
      threshold,
      triggerOnce: true,
    });

    // Only animate when visible (if triggerOnScroll is true)
    const targetValue = triggerOnScroll ? (isVisible ? end : start) : end;

    const count = useAnimatedCounter({
      start,
      end: targetValue,
      duration,
      ...(easing && { easing }),
      decimals,
    });

    const formattedValue = formatNumber(count, {
      decimals,
      prefix,
      suffix,
      locale: 'fr-FR',
    });

    const screenReaderText = ariaLabel || `${formattedValue}`;

    return (
      <div ref={internalRef} className="inline-block">
        {/* Screen reader only text */}
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {screenReaderText}
        </span>

        {/* Visual counter */}
        <span ref={forwardedRef} className={className} aria-hidden="true">
          {formattedValue}
        </span>
      </div>
    );
  }
);

AnimatedCounter.displayName = 'AnimatedCounter';
