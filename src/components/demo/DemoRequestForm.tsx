'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demoRequestSchema } from '@/lib/demo/schema';
import type { DemoRequest, DemoRequestResponse } from '@/types/demo';
import { ContactFields } from './ContactFields';
import { QualificationFields } from './QualificationFields';
import { ConsentFields } from './ConsentFields';
import { DemoConfirmation } from './DemoConfirmation';

export function DemoRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<DemoRequestResponse | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DemoRequest>({
    resolver: zodResolver(demoRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      _timezone: 'Africa/Abidjan',
      meetingTool: 'google_meet',
      language: 'fr',
      marketingOptIn: false,
      imports: [],
      mode: 'cloud',
    },
  });

  const onSubmit = async (data: DemoRequest) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: DemoRequestResponse = await response.json();

      if (result.success) {
        setConfirmationData(result);
        // Scroll to top to show confirmation
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.error.message);
        // Scroll to first error if field-specific
        if (result.error.fields) {
          const firstErrorField = Object.keys(result.error.fields)[0];
          if (firstErrorField) {
            const element = document.getElementById(firstErrorField);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element?.focus();
          }
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        'Une erreur est survenue lors de l&apos;envoi du formulaire. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // If form was successfully submitted, show confirmation
  if (confirmationData && confirmationData.success) {
    return <DemoConfirmation data={confirmationData.data} />;
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
        {/* Global error message */}
        {submitError && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700" role="alert">
            <p className="font-medium">Erreur de soumission</p>
            <p className="text-sm">{submitError}</p>
          </div>
        )}

        {/* Form sections */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm">
              1
            </span>
            Vos coordonnées
          </h3>
          <ContactFields register={register} errors={errors} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm">
              2
            </span>
            Votre contexte
          </h3>
          <QualificationFields register={register} errors={errors} watch={watch} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <ConsentFields register={register} errors={errors} />
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Envoi en cours...</span>
              </span>
            ) : (
              'Démarrer mon essai gratuit'
            )}
          </button>
        </div>

        {/* Required fields note */}
        <p className="text-center text-sm text-gray-600">
          <span className="text-red-500">*</span> Champs obligatoires
        </p>
      </form>
    </div>
  );
}
