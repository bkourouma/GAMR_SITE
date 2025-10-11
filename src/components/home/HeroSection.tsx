/**
 * HeroSection Component
 * Feature: 002-transform-the-gamr
 *
 * Modern split-screen hero with animated logo, gradient background, and parallax effect.
 * Responsive: Split on desktop (≥1024px), stacked on mobile.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useParallax } from '@/hooks/useParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroSection() {
  const parallaxRef = useParallax({ speed: 0.3, direction: 'up', disableOnMobile: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 flex items-center overflow-hidden">
      {/* Gradient Background with Parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-hero -z-10"
        aria-hidden="true"
      />

      {/* Decorative Elements */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        {/* Subtle geometric shapes for depth */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Headline with Gradient Text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Transformez la gestion des risques de </span>
              <span className="text-gradient-accent animate-gradient inline-block drop-shadow-lg">
                réactive
              </span>
              <span className="text-white"> à </span>
              <span className="text-gradient inline-block drop-shadow-lg">proactive</span>
              <span className="text-white"> avec des insights IA</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0">
              GAMR est la plateforme de gestion des risques propulsée par l&apos;IA qui combine
              évaluations structurées, scoring intelligent et recommandations actionnables dans une
              interface intuitive unique.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/essai-gratuit">
                <Button
                  size="lg"
                  variant="primary"
                  className={`
                    relative overflow-hidden group
                    !bg-orange-500 hover:!bg-orange-600
                    ${!prefersReducedMotion ? 'hover:animate-pulse-subtle' : ''}
                  `}
                >
                  <span className="relative z-10">Essai Gratuit</span>
                  {!prefersReducedMotion && (
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </Button>
              </Link>
              <Link href="/demander-demo">
                <Button
                  size="lg"
                  variant="outline"
                  className={`
                    bg-white/10 border-white/30 text-white backdrop-blur-sm
                    hover:bg-white/20 hover:border-white/50
                    ${!prefersReducedMotion ? 'hover:scale-105' : ''}
                    transition-all duration-300
                  `}
                >
                  Demander une Démo
                </Button>
              </Link>
            </div>

            {/* Reassurance Text */}
            <p className="text-sm text-white/70">
              Sans carte bancaire • Annulation à tout moment • Support en français
            </p>
          </div>

          {/* Right Column: Animated Logo */}
          <div className="flex justify-center lg:justify-end">
            <div
              className={`
                relative w-full max-w-lg aspect-square
                ${!prefersReducedMotion ? 'animate-float' : ''}
              `}
            >
              {/* Glow Effect Behind Logo */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-accent/30 to-success/30 rounded-full blur-3xl -z-10"
                aria-hidden="true"
              />

              {/* Logo Image */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src="/images/logo.jpg"
                  alt="GAMR - Plateforme de Gestion et d'Analyse des Risques Métiers"
                  width={800}
                  height={800}
                  priority
                  quality={90}
                  className="w-full h-full object-contain drop-shadow-2xl gpu-accelerated"
                  style={{
                    willChange: prefersReducedMotion ? 'auto' : 'transform',
                  }}
                />
              </div>

              {/* Decorative Ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div
          className={`
            w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2
            ${!prefersReducedMotion ? 'animate-bounce' : ''}
          `}
        >
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
