'use client';

import { MethodologySection } from './MethodologySection';
import { ScoreIndicator } from './ScoreIndicator';
import { SecurityIndexSimulator } from './SecurityIndexSimulator';
import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function SecurityIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Indice de Sécurité
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Connassez-vous votre Indice de Sécurité?
          </p>
          
          {/* Security Index Simulator */}
          <div className="flex justify-center">
            <SecurityIndexSimulator />
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <MethodologySection />

      {/* Score Indicators */}
      <ScoreIndicator />

      {/* Conclusions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Conclusions
          </h2>
          
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <ul className="space-y-4">
              {SECURITY_INDEX_DATA.conclusions.map((conclusion, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white font-bold mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-700">{conclusion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
