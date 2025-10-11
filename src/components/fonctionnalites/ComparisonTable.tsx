/**
 * ComparisonTable Component
 * Feature: Page Fonctionnalités - User Story 1
 *
 * Responsive table comparing "Avant GAMR" vs "Avec GAMR"
 * Desktop: Standard 3-column table
 * Mobile: Stacked card layout
 */

import { comparisonData } from '@/lib/comparison-data';
import type { ComparisonItem } from '@/types/features';

export interface ComparisonTableProps {
  data?: ComparisonItem[];
  className?: string;
}

export function ComparisonTable({ data = comparisonData, className }: ComparisonTableProps) {
  return (
    <section
      className={`py-16 px-4 bg-white ${className || ''}`}
      aria-labelledby="comparison-title"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="comparison-title"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4"
        >
          Bénéfices pour les utilisateurs
        </h2>

        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Découvrez comment GAMR transforme la gestion des risques avec des gains mesurables en
          productivité, conformité et gouvernance.
        </p>

        {/* Desktop & Tablet: Standard table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              Comparaison de la gestion des risques avant et après GAMR
            </caption>
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th scope="col" className="text-left py-4 px-4 font-semibold text-gray-900 w-1/4">
                  Dimension
                </th>
                <th scope="col" className="text-left py-4 px-4 font-semibold text-gray-900 w-3/8">
                  Avant GAMR
                </th>
                <th scope="col" className="text-left py-4 px-4 font-semibold text-gray-900 w-3/8">
                  Avec GAMR
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.dimension}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-4 font-semibold text-gray-900">{item.dimension}</td>
                  <td className="py-4 px-4 text-gray-600">
                    <span className="inline-flex items-start">
                      <span className="text-red-600 mr-2 flex-shrink-0" aria-label="Inconvénient">
                        ❌
                      </span>
                      <span>{item.situationBefore}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <span className="inline-flex items-start">
                      <span className="text-green-600 mr-2 flex-shrink-0" aria-label="Avantage">
                        ✅
                      </span>
                      <span>
                        {item.situationWithGAMR}
                        {item.improvementMetric && (
                          <span className="ml-2 font-bold text-green-700 whitespace-nowrap">
                            {item.improvementMetric}
                          </span>
                        )}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="sm:hidden space-y-6">
          {data.map((item) => (
            <div
              key={item.dimension}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-4">{item.dimension}</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Avant GAMR</p>
                  <p className="text-gray-600 flex items-start">
                    <span className="text-red-600 mr-2" aria-label="Inconvénient">
                      ❌
                    </span>
                    <span>{item.situationBefore}</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Avec GAMR</p>
                  <p className="text-gray-600 flex items-start">
                    <span className="text-green-600 mr-2" aria-label="Avantage">
                      ✅
                    </span>
                    <span>
                      {item.situationWithGAMR}
                      {item.improvementMetric && (
                        <span className="ml-2 font-bold text-green-700">
                          {item.improvementMetric}
                        </span>
                      )}
                    </span>
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
