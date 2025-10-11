/**
 * ComparisonTable Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Cloud vs On-Premise comparison table (responsive)
 */

'use client';

import { comparisonDimensions } from '@/lib/pricing-data';
import { cn } from '@/lib/utils';

export interface ComparisonTableProps {
  /** Optional title override */
  title?: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Comparison table for Cloud vs On-Premise
 *
 * Responsive: Table on desktop, stacked cards on mobile
 */
export function ComparisonTable({
  title = 'Cloud vs On-Premise : Comparaison',
  className,
}: ComparisonTableProps) {
  const dimensions = comparisonDimensions.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section
      className={cn(
        'comparison-table-section py-16 bg-gradient-to-br from-gray-50 to-blue-50',
        className
      )}
      aria-labelledby="comparison-title"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="comparison-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent"
        >
          {title}
        </h2>

        {/* Desktop Table View (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="comparison-table w-full border-collapse bg-white shadow-xl rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Critère</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">☁️ Cloud</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">🏢 On-Premise</th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map((dimension, index) => (
                <tr
                  key={dimension.id}
                  className={cn(
                    'transition-all duration-200 hover:bg-blue-50',
                    index !== dimensions.length - 1 && 'border-b border-gray-200',
                    dimension.isHighlighted && 'bg-gradient-to-r from-blue-50 to-purple-50'
                  )}
                >
                  <td className="px-6 py-5 font-semibold text-gray-900">
                    {dimension.dimensionName}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700">{dimension.cloudValue}</td>
                  <td className="px-6 py-5 text-sm text-gray-700">{dimension.onPremiseValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (hidden on desktop) */}
        <div className="md:hidden space-y-4">
          {dimensions.map((dimension) => (
            <div
              key={dimension.id}
              className={cn(
                'comparison-card bg-white rounded-xl shadow-lg border p-5 transition-all duration-300 hover:shadow-xl',
                dimension.isHighlighted &&
                  'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 ring-2 ring-blue-200',
                !dimension.isHighlighted && 'border-gray-200 hover:border-blue-300'
              )}
            >
              <h3 className="font-bold text-gray-900 mb-4 text-center text-lg">
                {dimension.dimensionName}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-2">☁️ Cloud</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{dimension.cloudValue}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-xs font-bold text-purple-600 uppercase mb-2">
                    🏢 On-Premise
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {dimension.onPremiseValue}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
