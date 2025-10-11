/**
 * Features Page - Page Fonctionnalités GAMR
 * Feature: Page Fonctionnalités - User Story 1 MVP
 *
 * Main landing page showcasing GAMR platform capabilities
 */

import type { Metadata } from 'next';
import { HeroSection } from '@/components/fonctionnalites/HeroSection';
import { OverviewSection } from '@/components/fonctionnalites/OverviewSection';
import { FeaturesGrid } from '@/components/fonctionnalites/FeaturesGrid';
import { ComparisonTable } from '@/components/fonctionnalites/ComparisonTable';
import { ASPCIPartnerSection } from '@/components/fonctionnalites/ASPCIPartnerSection';
import { PartnersSection } from '@/components/shared/PartnersSection';
import { ConversionCTA } from '@/components/fonctionnalites/ConversionCTA';

// SEO Metadata (SEO-001 to SEO-007)
export const metadata: Metadata = {
  title: 'Fonctionnalités GAMR | Plateforme de Gestion des Risques',
  description:
    'Découvrez les fonctionnalités de GAMR : cartographie des menaces, évaluation automatisée, indicateurs de performance, rapports intelligents. Simplifiez la gestion de vos risques.',
  keywords: [
    'gestion des risques',
    'cartographie',
    'audit',
    'conformité',
    'GAMR',
    "Côte d'Ivoire",
    'évaluation des risques',
    'tableaux de bord',
    'sécurité',
    'conformité ISO',
  ],
  openGraph: {
    title: 'Fonctionnalités GAMR - Plateforme de Gestion des Risques',
    description:
      'Cartographie, évaluation automatisée, et pilotage complet de vos risques avec la méthodologie GAMR.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GAMR',
  },
  alternates: {
    canonical: '/fonctionnalites',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FonctionnalitesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero section with title and CTAs */}
      <HeroSection />

      {/* Overview with intro text and platform mockup */}
      <OverviewSection />

      {/* 7 feature cards in 4-3 grid layout */}
      <FeaturesGrid />

      {/* Before/After comparison table */}
      <ComparisonTable />

      {/* ASPCI Partner credibility section */}
      <ASPCIPartnerSection />

      {/* Partners logos infinite scroll */}
      <PartnersSection />

      {/* Final conversion CTA */}
      <ConversionCTA />
    </main>
  );
}
