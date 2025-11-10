'use client';

import { ComparisonTableProps } from '@/types/solutions';
import { extractModules } from '@/lib/solutions-data';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

/**
 * ComparisonTable - Comparative table showing sectors, norms, and GAMRdigitale modules
 * Responsive: Horizontal scroll on mobile with sticky first column
 */
export function ComparisonTable({
  industries,
  caption = 'Comparaison des secteurs et modules GAMRdigitale',
  className = '',
}: ComparisonTableProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`relative py-20 px-4 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 ${className}`}
      aria-labelledby="comparison-title"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Vue d&apos;ensemble comparative
          </div>
          <h2 id="comparison-title" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tableau comparatif
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment GAMRdigitale s&apos;adapte aux spécificités de chaque secteur
          </p>
        </div>

        <div
          className={`overflow-x-auto -mx-4 px-4 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-2xl">
              <caption className="sr-only">{caption}</caption>
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-700">
                  <th
                    scope="col"
                    className="px-6 py-6 text-left font-bold text-white sticky left-0 bg-inherit z-10 min-w-[200px]"
                  >
                    Secteur
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-left font-bold text-white min-w-[250px]"
                  >
                    Normes clés
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-6 text-left font-bold text-white min-w-[300px]"
                  >
                    Modules GAMRdigitale
                  </th>
                </tr>
              </thead>
              <tbody>
                {industries.map((industry, index) => (
                  <tr
                    key={industry.id}
                    className={`transition-all duration-300 hover:shadow-lg ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-6 font-semibold text-gray-900 sticky left-0 bg-inherit z-10 border-r border-gray-200">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{
                            backgroundColor:
                              index === 0
                                ? '#059669'
                                : index === 1
                                  ? '#2563eb'
                                  : index === 2
                                    ? '#7c3aed'
                                    : index === 3
                                      ? '#dc2626'
                                      : '#ea580c',
                          }}
                        ></div>
                        {industry.nom}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {industry.normes.map((norme, normeIndex) => (
                          <span
                            key={normeIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {norme}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {extractModules(industry.solutions).map((module, moduleIndex) => (
                          <span
                            key={moduleIndex}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
