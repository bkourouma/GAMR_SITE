/**
 * ConversionCTA Component
 * Feature: Page Fonctionnalités - User Story 3
 *
 * Final conversion section with dual CTAs
 */

'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight, Calendar } from 'lucide-react';

export function ConversionCTA() {
  return (
    <section
      className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2 id="cta-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Adoptez la méthodologie GAMR dès aujourd&apos;hui
        </h2>

        {/* Supporting text */}
        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Rejoignez les organisations qui ont transformé leur gestion des risques avec une solution
          intelligente et éprouvée.
        </p>

        {/* Dual CTAs with hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA - Demo Request */}
          <Button
            variant="primary"
            size="lg"
            className="gap-2 text-lg px-8 py-6 !bg-orange-500 hover:!bg-orange-600 !text-white"
            onClick={() => {
              // Analytics tracking placeholder
              console.log('CTA clicked: demo_request from final_cta');
              // TODO: Navigate to /demo or open contact form
            }}
          >
            Demander une démo
            <ArrowRight className="h-5 w-5" />
          </Button>

          {/* Secondary CTA - Free Trial */}
          <Button
            variant="primary"
            size="lg"
            className="gap-2 text-lg px-8 py-6 !bg-orange-500 hover:!bg-orange-600 !text-white"
            onClick={() => {
              // Analytics tracking placeholder
              console.log('CTA clicked: trial_signup from final_cta');
              // TODO: Navigate to /trial or signup
            }}
          >
            <Calendar className="h-5 w-5" />
            Essai gratuit 30 jours
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Configuration en 1 jour</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Support dédié</span>
          </div>
        </div>
      </div>
    </section>
  );
}
