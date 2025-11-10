export function DemoValueProposition() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Ce que votre essai gratuit inclut
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Nous configurons GAMRdigitale selon vos priorités risques et conformité. Votre espace
            d&apos;essai sera pré-configuré avec :
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Parcours complet d&apos;évaluation des risques</span>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Matrices de risques interactives</span>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Plans d&apos;action et suivi</span>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Tableaux de bord personnalisables</span>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Rapports et conformité réglementaire</span>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">Adaptation à votre secteur</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>💡 Accès complet :</strong> Plateforme GAMRdigitale, modules de base, support
              par email, modèle de risques ISO 31000 par défaut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
