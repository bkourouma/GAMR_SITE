'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DemoRequest } from '@/types/demo';

interface ConsentFieldsProps {
  register: UseFormRegister<DemoRequest>;
  errors: FieldErrors<DemoRequest>;
}

export function ConsentFields({ register, errors }: ConsentFieldsProps) {
  return (
    <fieldset className="space-y-6">
      <legend className="text-2xl font-bold text-gray-900 mb-6">Consentements</legend>

      {/* GDPR Consent (Required) */}
      <div
        className={`p-4 border-2 rounded-lg ${errors.gdprConsent ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
      >
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('gdprConsent')}
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            aria-required="true"
            aria-invalid={!!errors.gdprConsent}
            aria-describedby={errors.gdprConsent ? 'gdprConsent-error' : undefined}
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-900">
              J&apos;accepte d&apos;être contacté pour l&apos;organisation de cette démo{' '}
              <span className="text-red-500">*</span>
            </span>
            <p className="text-xs text-gray-600 mt-1">
              Vos données seront utilisées uniquement pour organiser votre démonstration et ne
              seront pas partagées avec des tiers.
            </p>
          </div>
        </label>
        {errors.gdprConsent && (
          <p id="gdprConsent-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.gdprConsent.message}
          </p>
        )}
      </div>

      {/* Marketing Opt-in (Optional) */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('marketingOptIn')}
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-900">
              Recevoir des ressources produit et cas d&apos;usage
            </span>
            <p className="text-xs text-gray-600 mt-1">
              Optionnel : Recevez nos études de cas, guides et actualités produit par email.
            </p>
          </div>
        </label>
      </div>

      {/* Honeypot (hidden anti-spam field) */}
      <input
        type="text"
        {...register('honeypot')}
        style={{ position: 'absolute', left: '-9999px' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
        <p>
          <strong>Protection des données :</strong> Conformément au RGPD, vous disposez d&apos;un
          droit d&apos;accès, de rectification et de suppression de vos données personnelles. Pour
          exercer ces droits, contactez-nous à{' '}
          <a href="mailto:privacy@gamr.example" className="text-blue-600 hover:underline">
            privacy@gamr.example
          </a>
        </p>
      </div>
    </fieldset>
  );
}
