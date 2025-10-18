'use client';

import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function GamrProcessSteps() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Processus d'Évaluation en 7 Étapes
        </h2>
        
        <div className="space-y-10">
          {SECURITY_INDEX_DATA.processSteps.map((step) => (
            <div 
              key={step.id} 
              className="border-l-4 border-orange-500 pl-6 hover:bg-orange-50 transition-colors duration-300 rounded-r-lg p-4"
            >
              <div className="flex items-center mb-3">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  {step.stepNumber}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-700 mb-3">{step.description}</p>
              
              {step.formula && (
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <strong className="text-blue-800">Formule:</strong> <span className="text-blue-700">{step.formula}</span>
                </div>
              )}
              
              {step.examples && step.examples.length > 0 && (
                <div className="mt-3">
                  <strong className="text-gray-700">Exemples:</strong>
                  <ul className="mt-2 space-y-1">
                    {step.examples.map((example, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
