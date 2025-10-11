/**
 * useIntersectionObserver Hook
 * Feature: 002-transform-the-gamr
 *
 * Detects when an element enters the viewport for scroll-triggered animations.
 * Uses the native Intersection Observer API for optimal performance.
 */

'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Options for the Intersection Observer
 */
export interface UseIntersectionObserverOptions {
  /** Intersection threshold (0-1). Default: 0.1 (10% visible) */
  threshold?: number | number[];
  /** Root element for intersection. Default: null (viewport) */
  root?: Element | null;
  /** Margin around the root. Default: '0px' */
  rootMargin?: string;
  /** Whether to trigger only once. Default: false */
  triggerOnce?: boolean;
  /** Initial state before mounting. Default: false */
  initialIsIntersecting?: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 *
 * @param {RefObject<Element>} ref - React ref pointing to the element to observe
 * @param {UseIntersectionObserverOptions} options - Configuration options
 * @returns {boolean} true when element is intersecting viewport
 *
 * @example
 * ```tsx
 * function FadeInSection({ children }: { children: React.ReactNode }) {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const isVisible = useIntersectionObserver(ref, {
 *     threshold: 0.2,
 *     triggerOnce: true,
 *   });
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={`transition-opacity duration-700 ${
 *         isVisible ? 'opacity-100' : 'opacity-0'
 *       }`}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    initialIsIntersecting = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);

  useEffect(() => {
    const element = ref.current;

    // Early return if no element or IntersectionObserver not supported
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // Guard clause for undefined entry
        if (!entry) {
          return;
        }

        const isElementIntersecting = entry.isIntersecting;

        // Update state when intersecting
        if (isElementIntersecting) {
          setIsIntersecting(true);

          // If triggerOnce is true, disconnect observer after first trigger
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // Only update to false if not triggerOnce
          // (triggerOnce keeps the true state forever after first trigger)
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    // Start observing
    observer.observe(element);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return isIntersecting;
}
