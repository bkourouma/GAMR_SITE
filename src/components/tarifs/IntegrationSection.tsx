/**
 * IntegrationSection Component - Section 2 of Tarification
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Displays the data integration package with pricing
 */

'use client';

import type { IntegrationPricing } from '@/types/pricing';
import { formatFCFA } from '@/lib/currency-formatter';

export interface IntegrationSectionProps {
  /** Integration pricing data */
  data: IntegrationPricing;
  /** Callback when user requests integration */
  onRequestIntegration?: () => void;
}

/**
 * IntegrationSection Component
 */
export function IntegrationSection({ data, onRequestIntegration }: IntegrationSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
          {data.description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.description}</p>
          )}
        </div>

        {/* Pricing Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-green-600 text-white px-6 py-4">
              <div className="grid grid-cols-2 gap-4 font-semibold text-lg">
                <div>FORFAIT ACTIVATION COMPTE</div>
                <div className="text-right">COUT / SITE</div>
              </div>
            </div>

            {/* Table Body - Services */}
            <div className="divide-y divide-gray-200">
              {data.services.map((service, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center text-gray-800">
                    <span className="mr-3 text-green-600">✓</span>
                    {service}
                  </div>
                  <div className="text-right text-gray-600">
                    {/* Show price on first row */}
                    {index === 0 && (
                      <span className="font-semibold text-xl text-green-600">
                        {formatFCFA(data.standardPrice)}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Special row for annual discount */}
              <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-gradient-to-r from-yellow-50 to-green-50 border-t-2 border-green-300">
                <div className="flex items-center text-gray-900 font-medium">
                  <span className="mr-3 text-2xl">💡</span>
                  INCLUS si souscription annuelle
                </div>
                <div className="text-right">
                  <span className="font-bold text-2xl text-green-600">GRATUIT</span>
                </div>
              </div>
            </div>

            {/* Footer with CTA */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-6 border-t-2 border-green-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    ⚡ Activation sous 5 jours ouvrés après évaluation
                  </p>
                </div>
                <button
                  onClick={onRequestIntegration}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Activer mon compte
                </button>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              💰 <strong>Économisez 1 500 000 FCFA</strong> en souscrivant directement à un forfait
              annuel après votre évaluation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
