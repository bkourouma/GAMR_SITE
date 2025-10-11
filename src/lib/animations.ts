/**
 * Animation Utilities
 * Feature: 002-transform-the-gamr
 *
 * Easing functions, animation utilities, and helper functions for smooth 60fps animations.
 */

import type { EasingFunction, TransformValues } from '@/types/animations';

// Re-export types for convenience
export type { EasingFunction, TransformValues } from '@/types/animations';

// ============================================================================
// Easing Functions
// ============================================================================

/**
 * Linear easing - no acceleration
 */
export function linear(t: number): number {
  return t;
}

/**
 * Quadratic ease in - accelerating from zero velocity
 */
export function easeInQuad(t: number): number {
  return t * t;
}

/**
 * Quadratic ease out - decelerating to zero velocity
 */
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

/**
 * Quadratic ease in-out - acceleration until halfway, then deceleration
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Cubic ease in - accelerating from zero velocity
 */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/**
 * Cubic ease out - decelerating to zero velocity
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Cubic ease in-out - acceleration until halfway, then deceleration
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

/**
 * Quartic ease in - accelerating from zero velocity
 */
export function easeInQuart(t: number): number {
  return t * t * t * t;
}

/**
 * Quartic ease out - decelerating to zero velocity
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Quartic ease in-out - acceleration until halfway, then deceleration
 */
export function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

/**
 * Elastic ease out - bouncy end effect
 */
export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

/**
 * Back ease out - slight overshoot
 */
export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// ============================================================================
// Animation Utility Functions
// ============================================================================

/**
 * Calculate staggered animation delays
 * @param index - Element index in the list
 * @param baseDelay - Base delay per element in milliseconds (default: 100ms)
 * @returns Delay in milliseconds
 */
export function staggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

/**
 * Get animation duration based on content length
 * @param contentLength - Length of content (characters, items, etc.)
 * @param minDuration - Minimum duration in milliseconds (default: 500ms)
 * @param maxDuration - Maximum duration in milliseconds (default: 3000ms)
 * @returns Duration in milliseconds
 */
export function getAnimationDuration(
  contentLength: number,
  minDuration: number = 500,
  maxDuration: number = 3000
): number {
  const baseDuration = contentLength * 10; // 10ms per character
  return Math.min(Math.max(baseDuration, minDuration), maxDuration);
}

/**
 * Interpolate between two values with easing
 * @param start - Starting value
 * @param end - Ending value
 * @param progress - Progress from 0 to 1
 * @param easing - Easing function (default: linear)
 * @returns Interpolated value
 */
export function interpolate(
  start: number,
  end: number,
  progress: number,
  easing: EasingFunction = linear
): number {
  const easedProgress = easing(progress);
  return start + (end - start) * easedProgress;
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Debounce function calls for performance
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format a number with decimals, prefix, and suffix
 * @param value - Number to format
 * @param options - Formatting options
 * @returns Formatted string
 */
export function formatNumber(
  value: number,
  options: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
    locale?: string;
  } = {}
): string {
  const { decimals = 0, prefix = '', suffix = '', locale = 'fr-FR' } = options;

  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formatted}${suffix}`;
}

/**
 * Generate CSS transform string from individual values
 * @param values - Transform values
 * @returns CSS transform string
 */
export function getTransformValue(values: TransformValues): string {
  const transforms: string[] = [];

  if (values.translateX !== undefined) {
    const unit = typeof values.translateX === 'number' ? 'px' : '';
    transforms.push(`translateX(${values.translateX}${unit})`);
  }
  if (values.translateY !== undefined) {
    const unit = typeof values.translateY === 'number' ? 'px' : '';
    transforms.push(`translateY(${values.translateY}${unit})`);
  }
  if (values.translateZ !== undefined) {
    const unit = typeof values.translateZ === 'number' ? 'px' : '';
    transforms.push(`translateZ(${values.translateZ}${unit})`);
  }
  if (values.rotateX !== undefined) {
    transforms.push(`rotateX(${values.rotateX}deg)`);
  }
  if (values.rotateY !== undefined) {
    transforms.push(`rotateY(${values.rotateY}deg)`);
  }
  if (values.rotateZ !== undefined) {
    transforms.push(`rotateZ(${values.rotateZ}deg)`);
  }
  if (values.scale !== undefined) {
    transforms.push(`scale(${values.scale})`);
  } else {
    if (values.scaleX !== undefined) {
      transforms.push(`scaleX(${values.scaleX})`);
    }
    if (values.scaleY !== undefined) {
      transforms.push(`scaleY(${values.scaleY})`);
    }
  }

  return transforms.join(' ');
}

/**
 * Request idle callback polyfill
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (callback: () => void) => setTimeout(callback, 1);

/**
 * Cancel idle callback polyfill
 */
export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : (id: number) => clearTimeout(id);
