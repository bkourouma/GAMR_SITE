/**
 * PartnersSection Component
 *
 * Section "Nos Partenaires" with infinite scrolling logos
 * Displays partners in an elegant, modern infinite carousel
 */

'use client';

import Image from 'next/image';

const partners = [
  { name: 'ASPCI', logo: '/images/partenaires/aspci.png' },
  { name: 'CGECI', logo: '/images/partenaires/cgeci.png' },
  { name: 'FPFP', logo: '/images/partenaires/fpfp.png' },
  { name: 'Imhotep Academy', logo: '/images/partenaires/imhotepacademy.jpeg' },
  { name: 'Imhotep Data', logo: '/images/partenaires/imhotepdata.png' },
  { name: 'SODEXAM', logo: '/images/partenaires/sodexam.jpg' },
];

export function PartnersSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Nos Partenaires
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Ils nous font confiance pour sécuriser et optimiser leur gestion des risques
        </p>

        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Scrolling Track - Double the logos for seamless loop */}
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`partner-1-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <div className="relative w-40 h-24 flex items-center justify-center bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={160}
                    height={96}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless infinite scroll */}
            {partners.map((partner, index) => (
              <div
                key={`partner-2-${index}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <div className="relative w-40 h-24 flex items-center justify-center bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={160}
                    height={96}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Partner count */}
        <p className="text-center text-sm text-gray-500 mt-8">
          + de nombreux autres partenaires en Côte d&apos;Ivoire et dans la sous-région
        </p>
      </div>
    </section>
  );
}
