'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { ConversionCTAProps } from '@/types/solutions';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

/**
 * ConversionCTA - Final call-to-action section at bottom of page
 */
export function ConversionCTA({ headline, ctas, background, className = '' }: ConversionCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`relative py-20 px-4 overflow-hidden ${background || 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-500'} ${className}`}
      aria-labelledby="conversion-cta-title"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
          backgroundSize: '60px 60px',
        }}
      ></div>

      <div
        className={`container mx-auto text-center max-w-5xl relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Prêt à transformer votre secteur ?
        </div>

        <h2
          id="conversion-cta-title"
          className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="block bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent">
            {headline}
          </span>
        </h2>

        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {ctas.map((cta, index) => (
            <CTAButton
              key={index}
              href={cta.href}
              variant={cta.variant || 'primary'}
              size={cta.size || 'lg'}
              buttonClassName="text-blue-600"
              className={`
                group font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300 border-0 min-w-[280px] text-lg relative overflow-hidden
                ${
                  index === 0
                    ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-blue-600'
                    : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-blue-600'
                }
              `}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-green-300 to-teal-300'
                    : 'bg-gradient-to-r from-purple-300 to-rose-300'
                }`}
              ></div>
              <span className="flex items-center justify-center relative z-10">
                {index === 0 && (
                  <svg
                    className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {index === 1 && (
                  <svg
                    className="mr-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                )}
                <span>{cta.label}</span>
                {index === 0 && (
                  <svg
                    className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                )}
              </span>
            </CTAButton>
          ))}
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Déploiement rapide
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Formation incluse
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            ROI mesurable
          </div>
        </div>
      </div>
    </section>
  );
}
