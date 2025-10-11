/**
 * ValueCard Component
 * Displays individual company value
 */

import type { CompanyValue } from '@/types/about';

interface ValueCardProps {
  value: CompanyValue;
}

export function ValueCard({ value }: ValueCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl mb-4">{value.icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
      <p className="text-gray-600">{value.description}</p>
    </div>
  );
}
