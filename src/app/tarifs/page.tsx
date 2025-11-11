/**
 * Tarifs Page - GAMRdigitale Pricing
 * Feature: 005-g-n-re - Page Tarifs
 *
 * New structure: Evaluation → Integration → Subscriptions
 */

'use client';

import { useState } from 'react';
import { PricingHero } from '@/components/tarifs/PricingHero';
import { EvaluationSection } from '@/components/tarifs/EvaluationSection';
import { IntegrationSection } from '@/components/tarifs/IntegrationSection';
import { BillingToggle } from '@/components/tarifs/BillingToggle';
import { CloudPricingGrid } from '@/components/tarifs/CloudPricingGrid';
import { PricingStructuredData } from '@/components/tarifs/PricingStructuredData';
import { evaluationPricing, integrationPricing } from '@/lib/pricing-data';
import type { BillingPeriod } from '@/types/pricing';

/**
 * Pricing page component
 */
export default function TarifsPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <>
      {/* Structured Data for SEO */}
      <PricingStructuredData />

      <main className="tarifs-page min-h-screen bg-white">
        {/* Hero Section */}
        <PricingHero />

        {/* 1-EVALUATION Section */}
        <EvaluationSection
          data={evaluationPricing}
          onRequestEvaluation={() => {
            // Analytics tracking
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'request_evaluation', {
                event_category: 'pricing',
                event_label: 'evaluation_section',
              });
            }
            // Navigate to contact or evaluation form
            window.location.href = '/contact?type=evaluation';
          }}
        />

        {/* 2-INTEGRATION DES DONNEES Section */}
        <IntegrationSection
          data={integrationPricing}
          onRequestIntegration={() => {
            // Analytics tracking
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'request_integration', {
                event_category: 'pricing',
                event_label: 'integration_section',
              });
            }
            // Navigate to contact or integration form
            window.location.href = '/contact?type=integration';
          }}
        />

        {/* 3-ABONNEMENTS Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">3-ABONNEMENTS</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Choisissez le plan qui correspond à vos besoins
              </p>

              {/* Billing Toggle */}
              <div className="flex justify-center">
                <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
              </div>
            </div>

            {/* Pricing Grid */}
            <CloudPricingGrid
              billingPeriod={billingPeriod}
              onPlanSelect={(planId) => {
                // Analytics tracking
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'select_plan', {
                    event_category: 'pricing',
                    event_label: planId,
                    value: billingPeriod,
                  });
                }
              }}
            />
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-white border-t-2 border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Besoin d&apos;aide pour choisir ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe est là pour vous accompagner dans le choix de la meilleure solution
                pour votre organisation
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Parler à un expert
              </a>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-100">
                <div className="text-4xl mb-3">📋</div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">1. Évaluation</h4>
                <p className="text-sm text-gray-600">
                  Audit complet de votre site avec rapport détaillé (5 000 000 FCFA)
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-100">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">2. Intégration</h4>
                <p className="text-sm text-gray-600">
                  Activation de votre compte SAAS (1 500 000 FCFA - Gratuit si annuel)
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-100">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">3. Abonnement</h4>
                <p className="text-sm text-gray-600">
                  Plateforme SAAS complète à partir de 100 000 FCFA/mois
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
