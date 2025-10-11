'use client';

import { useEffect, useRef, useState } from 'react';
import { FEATURES } from '@/lib/features';
import { FeatureCard } from '@/components/shared/FeatureCard';

// Gradient combinations for each feature card
const GRADIENTS = [
  'from-orange-500 to-red-600', // Feature 1: Indice (warm, energetic)
  'from-blue-500 to-indigo-600', // Feature 2: Évaluations (trust, professional)
  'from-purple-500 to-pink-600', // Feature 3: IA (innovation, magic)
  'from-green-500 to-teal-600', // Feature 4: Fiches (growth, success)
  'from-cyan-500 to-blue-600', // Feature 5: Actions (clarity, focus)
  'from-violet-500 to-purple-600', // Feature 6: Users (collaboration)
  'from-amber-500 to-orange-600', // Feature 7: Analytics (insight, warmth)
];

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            7 Fonctionnalités Clés pour Maîtriser Vos Risques
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Une plateforme complète qui couvre tout le cycle de vie de la gestion des risques, de
            l&apos;évaluation à l&apos;action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.name}
                description={feature.shortDescription}
                href={`/fonctionnalites#${feature.slug}`}
                featured={feature.order === 1}
                gradient={GRADIENTS[index] || 'from-primary-500 to-primary-600'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
