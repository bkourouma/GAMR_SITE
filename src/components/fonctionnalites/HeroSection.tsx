/**
 * HeroSection Component
 * Feature: Page Fonctionnalités - User Story 1
 *
 * Hero section with title, subtitle with GAMR tooltip, and dual CTAs
 */

'use client';

import { Button } from '@/components/ui/Button';
import { TermWithTooltip } from '@/components/shared/TermWithTooltip';
import { ArrowRight, Calendar } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto max-w-5xl text-center">
        {/* Title */}
        <h1
          id="hero-title"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
        >
          Toutes vos analyses de risques, réunies dans une seule plateforme
        </h1>

        {/* Subtitle with GAMR tooltip */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          De la <TermWithTooltip term="cartographie">cartographie</TermWithTooltip> à la décision,{' '}
          <TermWithTooltip term="GAMR">GAMR</TermWithTooltip> automatise et simplifie la gestion des
          menaces et des risques.
        </p>

        {/* Dual CTAs with hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA - Demo Request */}
          <Button
            variant="primary"
            size="lg"
            className="gap-2 text-lg px-8 py-6 !bg-orange-500 hover:!bg-orange-600"
            onClick={() => {
              // Analytics tracking placeholder
              console.log('CTA clicked: demo_request from hero');
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
            className="gap-2 text-lg px-8 py-6 !bg-orange-500 hover:!bg-orange-600"
            onClick={() => {
              // Analytics tracking placeholder
              console.log('CTA clicked: trial_signup from hero');
              // TODO: Navigate to /trial or signup
            }}
          >
            <Calendar className="h-5 w-5" />
            Essayer gratuitement
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-sm text-gray-500">
          <p>✓ Sans carte bancaire • ✓ Support en français • ✓ Conforme RGPD</p>
        </div>
      </div>
    </section>
  );
}
