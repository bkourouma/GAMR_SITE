'use client';

import { SectorsGridProps } from '@/types/solutions';
import { SolutionCard } from './SolutionCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

/**
 * SectorsGrid - Container component that displays all 5 SolutionCards
 * Responsive: 2-column grid on desktop, single column on mobile
 */
export function SectorsGrid({ industries, layout = 'grid', className = '' }: SectorsGridProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 ${className}`}
      aria-labelledby="sectors-title"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            id="sectors-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Secteurs d&apos;Activité
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GAMRdigitale s&apos;adapte aux spécificités de chaque secteur avec des solutions
            personnalisées
          </p>
        </div>

        <div
          className={`
            ${layout === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : 'flex flex-col gap-8'}
          `}
        >
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <SolutionCard industry={industry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
