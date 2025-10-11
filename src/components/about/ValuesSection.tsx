/**
 * ValuesSection Component
 * Displays company values grid
 */

import { COMPANY_VALUES } from '@/lib/about-data';
import { ValueCard } from './ValueCard';

export function ValuesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COMPANY_VALUES.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
