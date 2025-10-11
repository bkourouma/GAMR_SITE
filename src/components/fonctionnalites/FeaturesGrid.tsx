/**
 * FeaturesGrid Component
 * Feature: Page Fonctionnalités - User Story 1
 *
 * Grid of 7 feature cards in 4-3 responsive layout
 */

import { FeatureCard } from './FeatureCard';
import { FEATURES_DATA } from '@/lib/features-data';
import type { Feature } from '@/types/features';

export interface FeaturesGridProps {
  features?: Feature[];
  className?: string;
}

export function FeaturesGrid({ features = FEATURES_DATA.main, className }: FeaturesGridProps) {
  return (
    <section
      className={`py-16 px-4 bg-gray-50 ${className || ''}`}
      aria-labelledby="features-title"
    >
      <div className="container mx-auto max-w-7xl">
        <h2
          id="features-title"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4"
        >
          Fonctionnalités principales
        </h2>

        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Pilotez l&apos;ensemble de votre gestion des risques avec une suite complète d&apos;outils
          intelligents et intégrés.
        </p>

        {/* 
          Responsive grid: 
          - Mobile (< 640px): 1 column (stack)
          - Tablet (640-1023px): 2 columns 
          - Desktop (≥ 1024px): 4 columns (creates 4-3 layout with 7 items)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const { key: featureKey, ...featureProps } = feature;
            return <FeatureCard key={featureKey} {...featureProps} />;
          })}
        </div>
      </div>
    </section>
  );
}
