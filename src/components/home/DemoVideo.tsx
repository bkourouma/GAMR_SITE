/**
 * DemoVideo Component
 * Feature: 002-transform-the-gamr
 *
 * Demo video section with fade-in animation on scroll.
 * Will be enhanced with security dashboard preview in future iterations.
 */

'use client';

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`
        py-20 px-4 bg-gradient-to-br from-[#CC5500] to-[#B8470A]
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Découvrez GAMR en Action
          </h2>
          <p className="text-lg text-white/90">
            2 minutes pour comprendre comment GAMR transforme votre gestion des risques
          </p>
        </div>

        <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-gray-900">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer bg-gradient-primary hover:opacity-90 transition-opacity"
              aria-label="Lire la vidéo de démonstration"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
              </div>
            </button>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              {/* Placeholder - replace with actual YouTube/Vimeo embed */}
              <div className="text-center">
                <p>Intégration vidéo YouTube/Vimeo à venir</p>
                <p className="text-sm mt-2 opacity-75">
                  iframe src=&quot;https://youtube.com/embed/...&quot;
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-white/80 mt-4">
          Workflow complet : Évaluation → Risque → Action
        </p>
      </div>
    </section>
  );
}
