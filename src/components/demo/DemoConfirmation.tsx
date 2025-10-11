'use client';

import { DemoRequestSuccessResponse } from '@/types/demo';

interface DemoConfirmationProps {
  data: DemoRequestSuccessResponse['data'];
}

export function DemoConfirmation({ data }: DemoConfirmationProps) {
  const { id: _id, message: _message, summary } = data;

  return (
    <div className="container mx-auto px-4 max-w-3xl py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Votre essai est en préparation&nbsp;!
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Nous configurons votre espace GAMR selon vos besoins.&nbsp; Vous recevrez un email
          d&apos;activation sous <strong>24 heures</strong> avec vos identifiants de connexion.
        </p>

        {/* Summary Box */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Récapitulatif&nbsp;:</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Nom&nbsp;:</dt>
              <dd className="font-medium text-gray-900">{summary.fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Organisation&nbsp;:</dt>
              <dd className="font-medium text-gray-900">{summary.organization}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Email&nbsp;:</dt>
              <dd className="font-medium text-gray-900">{summary.email}</dd>
            </div>
          </dl>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Prochaines étapes&nbsp;:</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span className="text-sm text-gray-700">
                Vous recevrez un email d&apos;activation avec vos identifiants GAMR
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span className="text-sm text-gray-700">
                Votre espace sera pré-configuré selon vos réponses
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span className="text-sm text-gray-700">
                Consultez le guide de démarrage pour vos premiers pas
              </span>
            </li>
          </ol>
        </div>

        {/* Email Confirmation Note */}
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 text-center">
          📧 Un email de confirmation a été envoyé à <strong>{summary.email}</strong>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/guide-demarrage"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
          >
            Accéder au guide de démarrage
          </a>
          <a
            href="/"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-semibold"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </div>
  );
}
