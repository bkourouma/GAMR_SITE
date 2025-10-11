/**
 * ASPCIPartnerSection Component
 * Feature: Page Fonctionnalités - User Story 3
 *
 * Partner credibility section with ASPCI text and visual
 */

import Image from 'next/image';

export function ASPCIPartnerSection() {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="aspci-title"
      role="complementary"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="aspci-title"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        >
          ASPCI, un partenaire de confiance
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text content */}
          <div className="flex-1 space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Depuis plus d&apos;une dizaine d&apos;années, <strong>ASPCI</strong> assure
              l&apos;assistance et la formation des agents des Ports d&apos;Abidjan et de San-Pedro
              ainsi que de nombreuses multinationales notamment dans l&apos;industrie extractive en
              Côte d&apos;Ivoire et dans d&apos;autres pays de la sous-région.
            </p>

            <p className="text-base text-gray-600 leading-relaxed">
              Cette expertise reconnue dans le domaine de la sécurité et de la gestion des risques
              fait d&apos;ASPCI le partenaire idéal pour accompagner le développement et le
              déploiement de la plateforme GAMR.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>10+ années d&apos;expérience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>Multinationales accompagnées</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>Expertise sous-régionale</span>
              </div>
            </div>
          </div>

          {/* Partnership visual */}
          <div className="flex-shrink-0 w-full md:w-96">
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg border-4 border-blue-100 bg-white p-8 flex items-center justify-center">
              <Image
                src="/images/aspci.jpg"
                alt="Logo ASPCI - Partenaire de confiance GAMR"
                width={600}
                height={400}
                loading="lazy"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
