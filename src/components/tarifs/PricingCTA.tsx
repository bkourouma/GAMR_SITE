/**
 * PricingCTA Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Final call-to-action section at bottom of pricing page
 */

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface PricingCTAProps {
  /** Optional title override */
  title?: string;

  /** Optional description override */
  description?: string;

  /** Primary CTA text */
  primaryCtaText?: string;

  /** Primary CTA href */
  primaryCtaHref?: string;

  /** Secondary CTA text */
  secondaryCtaText?: string;

  /** Secondary CTA href */
  secondaryCtaHref?: string;

  /** Callbacks for analytics */
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Final CTA section for conversion
 */
export function PricingCTA({
  title = 'Prêt à commencer ?',
  description = 'Rejoignez les organisations qui font confiance à GAMRdigitale pour leur gestion des risques et conformité.',
  primaryCtaText = 'Démarrez votre essai gratuit',
  primaryCtaHref = '/inscription',
  secondaryCtaText = 'Demander une démo',
  secondaryCtaHref = '/contact?type=demo',
  onPrimaryClick,
  onSecondaryClick,
  className,
}: PricingCTAProps) {
  return (
    <section
      className={`pricing-cta py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white ${className || ''}`}
      aria-labelledby="pricing-cta-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="pricing-cta-title" className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>

        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={primaryCtaHref} {...(onPrimaryClick ? { onClick: onPrimaryClick } : {})}>
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100"
            >
              {primaryCtaText}
            </Button>
          </Link>

          <Link
            href={secondaryCtaHref}
            {...(onSecondaryClick ? { onClick: onSecondaryClick } : {})}
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            >
              {secondaryCtaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
