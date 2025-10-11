/**
 * PricingHero Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Hero section with title, subtitle, and CTAs
 */

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface PricingHeroProps {
  /** Main hero title */
  title?: string;

  /** Subtitle/description */
  subtitle?: string;

  /** Primary CTA text (default: "Essai gratuit 30 jours") */
  primaryCtaText?: string;

  /** Primary CTA destination */
  primaryCtaHref?: string;

  /** Secondary CTA text (default: "Demander une démo") */
  secondaryCtaText?: string;

  /** Secondary CTA destination */
  secondaryCtaHref?: string;

  /** Callback for primary CTA click (analytics) */
  onPrimaryCtaClick?: () => void;

  /** Callback for secondary CTA click (analytics) */
  onSecondaryCtaClick?: () => void;
}

/**
 * Hero section for the pricing page
 */
export function PricingHero({
  title = 'Des tarifs simples et transparents',
  subtitle = 'Choisissez le mode qui correspond à votre gouvernance : Cloud ou On-Premise.',
  primaryCtaText = 'Essai gratuit 30 jours',
  primaryCtaHref = '/inscription',
  secondaryCtaText = 'Demander une démo',
  secondaryCtaHref = '/contact?type=demo',
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}: PricingHeroProps) {
  return (
    <section
      className="pricing-hero py-20 md:py-24 px-4 text-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden"
      aria-labelledby="pricing-hero-title"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1
          id="pricing-hero-title"
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in"
        >
          {title}
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-delay">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
          <Link
            href={primaryCtaHref}
            {...(onPrimaryCtaClick ? { onClick: onPrimaryCtaClick } : {})}
          >
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {primaryCtaText}
            </Button>
          </Link>

          <Link
            href={secondaryCtaHref}
            {...(onSecondaryCtaClick ? { onClick: onSecondaryCtaClick } : {})}
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              {secondaryCtaText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
