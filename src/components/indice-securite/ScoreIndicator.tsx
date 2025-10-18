'use client';

import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function ScoreIndicator() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Échelle d'Évaluation de l'Indice de Sécurité
        </h2>
        
        <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
          L'indice de sécurité GAMR s'étend de 1 à 60, avec des plages de valeurs correspondant 
          à différents niveaux de risque pour votre organisation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_INDEX_DATA.scoreIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className={`${indicator.color} ${indicator.textColor} p-6 rounded-lg text-center shadow-lg transform transition-transform hover:scale-105`}
              aria-label={`Niveau de risque: ${indicator.label}`}
            >
              <div className="text-2xl font-bold mb-2">
                {indicator.minScore}-{indicator.maxScore}
              </div>
              <h3 className="font-semibold mb-2">{indicator.label}</h3>
              <p className="text-sm opacity-90">{indicator.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Calcul de l'Indice de Sécurité
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-lg font-medium text-gray-700">Probabilité</div>
            <div className="text-2xl font-bold text-gray-900">×</div>
            <div className="text-lg font-medium text-gray-700">Vulnérabilité</div>
            <div className="text-2xl font-bold text-gray-900">×</div>
            <div className="text-lg font-medium text-gray-700">Répercussions</div>
            <div className="text-2xl font-bold text-gray-900">=</div>
            <div className="text-lg font-bold text-orange-600">Indice de Sécurité (1-60)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
