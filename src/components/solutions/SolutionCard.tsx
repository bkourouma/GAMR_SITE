'use client';

import Image from 'next/image';
import { SolutionCardProps } from '@/types/solutions';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

/**
 * SolutionCard - Reusable component for displaying industry sector information
 * Used 5 times on the Solutions page for each sector
 */
export function SolutionCard({
  industry,
  variant = 'default',
  className = '',
  onClick,
}: SolutionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  // Define color schemes for different sectors
  const getSectorColors = (industryId: string) => {
    const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
      'secteur-extractif': {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#34d399',
      },
      'secteur-aeroportuaire': {
        primary: '#2563eb',
        secondary: '#3b82f6',
        accent: '#60a5fa',
      },
      'secteur-bancaire': {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#a78bfa',
      },
      'secteur-sante': {
        primary: '#dc2626',
        secondary: '#ef4444',
        accent: '#f87171',
      },
      'secteur-gouvernemental': {
        primary: '#ea580c',
        secondary: '#f97316',
        accent: '#fb923c',
      },
    };
    return (
      colorMap[industryId] || {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#9ca3af',
      }
    );
  };

  const colors = getSectorColors(industry.id);

  const cardContent = (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <header className="flex items-center gap-4 mb-6">
        <div
          className="flex-shrink-0 relative w-16 h-16 p-3 rounded-2xl"
          style={{ backgroundColor: `${colors.primary}20` }}
        >
          <Image
            src={industry.icone}
            alt={`Icône ${industry.nom}`}
            width={64}
            height={64}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
          {industry.nom}
        </h2>
      </header>

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase mb-3 flex items-center">
          <span
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: colors.primary }}
          ></span>
          <span style={{ color: colors.primary }}>Normes et référentiels</span>
        </h3>
        <ul className="flex flex-wrap gap-2">
          {industry.normes.map((norme) => (
            <li
              key={norme}
              className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: `${colors.primary}15`,
                color: colors.primary,
                border: `1px solid ${colors.primary}30`,
              }}
            >
              {norme}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold uppercase mb-3 flex items-center">
          <span className="w-2 h-2 rounded-full mr-2 bg-red-500"></span>
          <span className="text-red-600">Défis majeurs</span>
        </h3>
        <ul className="space-y-2">
          {industry.defis.map((defi, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700 group-hover:text-gray-600 transition-colors"
            >
              <span
                className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"
                aria-hidden="true"
              ></span>
              <span className="text-sm">{defi}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase mb-3 flex items-center">
          <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
          <span className="text-green-600">Solutions GAMR</span>
        </h3>
        <ul className="space-y-3">
          {industry.solutions.map((solution, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700 group-hover:text-gray-600 transition-colors"
            >
              <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">{solution}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  const cardClasses = `
    solution-card group
    rounded-2xl border border-gray-200 p-8 bg-white
    hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
    scroll-mt-20 relative overflow-hidden
    ${variant === 'highlighted' ? 'border-blue-500 border-2 shadow-lg' : ''}
    ${className}
  `;

  // If onClick is provided, wrap in button for proper accessibility
  if (onClick) {
    return (
      <article id={industry.id} ref={ref}>
        <button
          type="button"
          className={`${cardClasses} w-full text-left cursor-pointer`}
          onClick={() => onClick(industry.id)}
        >
          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          ></div>
          {cardContent}
        </button>
      </article>
    );
  }

  // Otherwise, just render as article
  return (
    <article id={industry.id} className={cardClasses} ref={ref}>
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      ></div>
      {cardContent}
    </article>
  );
}
