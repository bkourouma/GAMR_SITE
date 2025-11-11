/**
 * EvaluationSection Component - Section 1 of Tarification
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Displays the evaluation package with activities and pricing
 */

'use client';

import type { EvaluationPricing } from '@/types/pricing';
import { formatFCFA } from '@/lib/currency-formatter';

export interface EvaluationSectionProps {
  /** Evaluation pricing data */
  data: EvaluationPricing;
  /** Callback when user requests evaluation */
  onRequestEvaluation?: () => void;
}

/**
 * EvaluationSection Component
 */
export function EvaluationSection({ data, onRequestEvaluation }: EvaluationSectionProps) {
  return (
    <section className="py-16 bg-white border-b-2 border-gray-200">
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
          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-blue-600 text-white px-6 py-4">
              <div className="grid grid-cols-2 gap-4 font-semibold text-lg">
                <div>ACTIVITES</div>
                <div className="text-right">COUT / SITE</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {data.activities.map((activity, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center text-gray-800">
                    <span className="mr-3 text-blue-600">✓</span>
                    {activity.name}
                  </div>
                  <div className="text-right text-gray-600">
                    {/* Show price only on specific row (Validation des données) */}
                    {activity.name === 'Validation des données' && (
                      <span className="font-semibold text-xl text-blue-600">
                        {formatFCFA(data.totalCost)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-6 border-t-2 border-blue-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">📋 Livraison complète sous 4-6 semaines</p>
                </div>
                <button
                  onClick={onRequestEvaluation}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Demander une évaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
