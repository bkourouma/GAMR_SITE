'use client';

import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function MethodologySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {SECURITY_INDEX_DATA.methodology.title}
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6 text-lg">
            {SECURITY_INDEX_DATA.methodology.overview}
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
            <p className="text-orange-800 font-medium">
              {SECURITY_INDEX_DATA.methodology.disclaimer}
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Objectifs de la GAMR
          </h3>
          <ul className="space-y-3 mb-8">
            {SECURITY_INDEX_DATA.methodology.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">
              Processus d'évaluation de la sécurité et de la sûreté
            </h4>
            <p className="text-blue-800">
              Le processus d'évaluation comporte 7 points : les cibles potentielles (CP), le scénario de menace, 
              la probabilité, la vulnérabilité, les répercussions, la note attribuée au risque, la priorité d'action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
