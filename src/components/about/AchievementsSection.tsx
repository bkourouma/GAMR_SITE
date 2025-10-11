/**
 * AchievementsSection Component
 * Displays company statistics and achievements
 */

'use client';

import { ABOUT_STATS } from '@/lib/about-data';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

export function AchievementsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nos Réalisations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ABOUT_STATS.map((stat) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
            const suffix = stat.value.replace(/[0-9]/g, '');

            return (
              <div key={stat.id} className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  <AnimatedCounter end={numericValue} duration={2000} />
                  {suffix}
                </div>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
