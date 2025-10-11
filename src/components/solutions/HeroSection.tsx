'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { HeroSectionProps } from '@/types/solutions';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

/**
 * HeroSection - Above-the-fold hero with title, subtitle, and CTAs
 */
export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  background,
}: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`relative py-24 px-4 overflow-hidden ${
        background || 'bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600'
      }`}
      aria-labelledby="hero-title"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div
        className={`container mx-auto text-center max-w-5xl relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
          Solutions sectorielles intelligentes
        </div>

        <h1
          id="hero-title"
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Use provided title; if you want a two-line style, split on `|` */}
          {title.includes('|') ? (
            <>
              <span className="block animate-slide-in-left">{title.split('|')[0]?.trim()}</span>
              <span className="block bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent animate-slide-in-right">
                {title.split('|')[1]?.trim()}
              </span>
            </>
          ) : (
            <span className="block bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent animate-slide-in-right">
              {title}
            </span>
          )}
        </h1>

        <p
          className={`text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {subtitle}
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <CTAButton
            href={primaryCTA.href}
            variant={primaryCTA.variant || 'primary'}
            size={primaryCTA.size || 'lg'}
            className="group bg-gradient-to-r from-orange-5 00 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-blue-600 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300 border-0 min-w-[300px] text-lg relative overflow-hidden"
            buttonClassName="text-blue-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="flex items-center justify-center relative z-10">
              <span>{primaryCTA.label}</span>
              <svg
                className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </CTAButton>

          <CTAButton
            href={secondaryCTA.href}
            variant={secondaryCTA.variant || 'secondary'}
            size={secondaryCTA.size || 'lg'}
            className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-blue-600 font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 min-w-[280px] text-lg relative overflow-hidden"
            buttonClassName="text-blue-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="flex items-center justify-center relative z-10">
              <svg
                className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {secondaryCTA.label}
            </span>
          </CTAButton>
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-16 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Conformité automatisée
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Reporting simplifié
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Support sectoriel
          </div>
        </div>
      </div>
    </section>
  );
}
