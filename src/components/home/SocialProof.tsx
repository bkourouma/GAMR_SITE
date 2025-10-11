/**
 * SocialProof Component
 * Feature: 002-transform-the-gamr
 *
 * Social proof section with animated statistics and testimonials.
 * Stats animate when scrolled into view for engagement.
 */

'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { TESTIMONIALS } from '@/lib/testimonials';
import { TestimonialCard } from '@/components/shared/TestimonialCard';

// Statistics data with numeric values for animation
const STATISTICS = [
  {
    id: '1',
    value: 50,
    suffix: '+',
    label: 'organisations',
    ariaLabel: '50 plus organizations using GAMR',
  },
  {
    id: '2',
    value: 1000,
    suffix: '+',
    label: 'fiches de risque gérées',
    ariaLabel: '1,000 plus risk records managed',
  },
  {
    id: '3',
    value: 32,
    prefix: '+',
    label: 'points amélioration moyenne indice',
    ariaLabel: 'Plus 32 points average security index improvement',
  },
  {
    id: '4',
    value: 5,
    label: 'pays',
    ariaLabel: '5 countries',
  },
  {
    id: '5',
    value: 500,
    suffix: '+',
    label: 'utilisateurs actifs',
    ariaLabel: '500 plus active users',
  },
  {
    id: '6',
    value: 4.8,
    decimals: 1,
    suffix: '/5',
    label: 'satisfaction client',
    ariaLabel: '4.8 out of 5 client satisfaction rating',
  },
];

export function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div
        className={`
          container mx-auto max-w-7xl relative z-10
          transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        `}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Rejoignez 50+ Organisations de Confiance
          </h2>
          <p className="text-lg text-text/70">
            Des entreprises de toutes tailles utilisent GAMR pour gérer leurs risques efficacement
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {STATISTICS.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter
                  end={stat.value}
                  decimals={stat.decimals ?? 0}
                  prefix={stat.prefix ?? ''}
                  suffix={stat.suffix ?? ''}
                  ariaLabel={stat.ariaLabel}
                  duration={3500}
                  triggerOnScroll={true}
                  threshold={0.2}
                />
              </div>
              <div className="text-sm text-text/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.filter((t) => t.featured).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              authorName={testimonial.authorName}
              authorRole={testimonial.authorRole}
              authorCompany={testimonial.authorCompany}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
