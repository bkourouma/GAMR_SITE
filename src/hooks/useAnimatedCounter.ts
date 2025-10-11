/**
 * useAnimatedCounter Hook
 * Feature: 002-transform-the-gamr
 *
 * Animate a number from start to end value with easing.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */

'use client';

import { useEffect, useState } from 'react';
import { easeOutCubic, type EasingFunction } from '@/lib/animations';
import { useReducedMotion } from './useReducedMotion';

/**
 * Options for animated counter
 */
export interface UseAnimatedCounterOptions {
  /** Starting value. Default: 0 */
  start?: number;
  /** Ending value (required) */
  end: number;
  /** Animation duration in milliseconds. Default: 2000 */
  duration?: number;
  /** Easing function. Default: easeOutCubic */
  easing?: EasingFunction;
  /** Number of decimal places. Default: 0 */
  decimals?: number;
  /** Format function for display. Optional */
  formatFn?: (value: number) => string;
}

/**
 * Hook to animate a counter from start to end value
 *
 * @param {UseAnimatedCounterOptions} options - Configuration options
 * @returns {number} Current counter value
 *
 * @example
 * ```tsx
 * function StatCard({ value }: { value: number }) {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const isVisible = useIntersectionObserver(ref, { triggerOnce: true });
 *
 *   const count = useAnimatedCounter({
 *     start: 0,
 *     end: isVisible ? value : 0,
 *     duration: 2000,
 *     easing: easeOutCubic,
 *     decimals: 0,
 *   });
 *
 *   return (
 *     <div ref={ref}>
 *       <span className="text-5xl font-bold">{count}+</span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAnimatedCounter(options: UseAnimatedCounterOptions): number {
  const { start = 0, end, duration = 2000, easing = easeOutCubic, decimals = 0 } = options;

  const [count, setCount] = useState(start);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, jump directly to end value
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    // If end is same as current count, no animation needed
    if (end === count) {
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const currentCount = start + (end - start) * easedProgress;

      // Round to specified decimal places
      const roundedCount = Number(currentCount.toFixed(decimals));
      setCount(roundedCount);

      // Continue animation if not complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly on the target value
        setCount(Number(end.toFixed(decimals)));
      }
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, duration, easing, decimals, prefersReducedMotion]);

  return count;
}
