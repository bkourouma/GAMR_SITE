/**
 * useReducedMotion Hook
 * Feature: 002-transform-the-gamr
 *
 * Detects if the user prefers reduced motion based on system settings.
 * Essential for WCAG 2.1 AA compliance (Success Criterion 2.3.3).
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect user's motion preference
 *
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <div
 *       className={prefersReducedMotion ? 'opacity-100' : 'animate-fade-in'}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  // Default to false for SSR (animations enabled)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query to match (prefers-reduced-motion: reduce)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    // Listen for changes in user preference
    // Using both addEventListener and addListener for broader browser support
    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup listener on unmount
    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
