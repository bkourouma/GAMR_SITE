'use client';

import { IntroSectionProps } from '@/types/solutions';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

/**
 * IntroSection - Introduction text explaining GAMRdigitale's multi-sector adaptability
 */
export function IntroSection({ content, className = '' }: IntroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`relative py-16 px-4 overflow-hidden bg-gradient-to-r from-white via-blue-50 to-white ${className}`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div
        className={`container mx-auto max-w-4xl relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Approche sectorielle
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </section>
  );
}
