/**
 * OverviewSection Component
 * Feature: Page Fonctionnalités - User Story 1
 *
 * Brief introduction with platform mockup
 */

import Image from 'next/image';
import { TermWithTooltip } from '@/components/shared/TermWithTooltip';

export function OverviewSection() {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="overview-title">
      <div className="container mx-auto max-w-6xl">
        <h2
          id="overview-title"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6"
        >
          Une plateforme complète pour la gestion des risques
        </h2>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Centraliser la gestion des <TermWithTooltip term="risque">risques</TermWithTooltip>{' '}
            permet de gagner en efficacité, en{' '}
            <TermWithTooltip term="conformité">conformité</TermWithTooltip> et en visibilité.{' '}
            <TermWithTooltip term="GAMRdigitale">GAMRdigitale</TermWithTooltip> vous accompagne de
            l&apos;identification à la{' '}
            <TermWithTooltip term="traçabilité">traçabilité</TermWithTooltip> complète de vos
            risques.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Automatisez vos évaluations, pilotez vos actions correctives et démontrez votre
            conformité en quelques clics avec une{' '}
            <TermWithTooltip term="méthodologie">méthodologie</TermWithTooltip> éprouvée.
          </p>
        </div>

        {/* Platform mockup with priority loading for LCP */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/dashboard.jpg"
            alt="Interface de la plateforme GAMRdigitale montrant le tableau de bord de gestion des risques"
            width={1200}
            height={800}
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
