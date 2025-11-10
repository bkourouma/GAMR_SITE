/**
 * AboutCTA Component
 * Call-to-action section at bottom of About page
 */

import Link from 'next/link';
import { CTAButton } from '@/components/shared/CTAButton';

export function AboutCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Prêt à transformer votre gestion des risques ?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Rejoignez les centaines d&apos;organisations qui font confiance à GAMRdigitale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href="/essai-gratuit" size="lg" variant="secondary">
            Essai Gratuit 30 Jours
          </CTAButton>
          <Link
            href="/demander-demo"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-primary-600 rounded-lg transition-all duration-300"
          >
            Demander une Démo
          </Link>
        </div>
      </div>
    </section>
  );
}
