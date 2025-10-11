/**
 * useParallax Hook
 * Feature: 002-transform-the-gamr
 *
 * Apply parallax scroll effect to an element for visual depth.
 * Uses requestAnimationFrame for smooth 60fps scrolling.
 */

'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Options for parallax effect
 */
export interface UseParallaxOptions {
  /** Parallax speed multiplier (0.1 = slow, 0.5 = fast). Default: 0.2 */
  speed?: number;
  /** Scroll direction. Default: 'up' */
  direction?: 'up' | 'down';
  /** Disable on mobile devices. Default: true */
  disableOnMobile?: boolean;
}

/**
 * Hook to apply parallax scroll effect to an element
 *
 * @param {UseParallaxOptions} options - Configuration options
 * @returns {RefObject<HTMLElement>} Ref to attach to the parallax element
 *
 * @example
 * ```tsx
 * function HeroBackground() {
 *   const parallaxRef = useParallax({
 *     speed: 0.3,
 *     direction: 'up',
 *     disableOnMobile: true,
 *   });
 *
 *   return (
 *     <div ref={parallaxRef} className="absolute inset-0 bg-gradient">
 *       Background content
 *     </div>
 *   );
 * }
 * ```
 */
export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.2, direction = 'up', disableOnMobile = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Don't apply parallax if reduced motion is preferred
    if (prefersReducedMotion) {
      return;
    }

    // Check if mobile and should be disabled
    if (disableOnMobile && typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        return;
      }
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    let ticking = false;
    const multiplier = direction === 'up' ? -1 : 1;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (element) {
            const scrolled = window.scrollY;
            const offset = scrolled * speed * multiplier;
            element.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial position
    handleScroll();

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);

      // Reset transform on cleanup
      if (element) {
        element.style.transform = '';
      }
    };
  }, [speed, direction, disableOnMobile, prefersReducedMotion]);

  return ref;
}
