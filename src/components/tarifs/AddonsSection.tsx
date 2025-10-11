/**
 * AddonsSection Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Premium add-ons section
 */

'use client';

import { addons } from '@/lib/pricing-data';
import { AddonCard } from './AddonCard';
import { cn } from '@/lib/utils';

export interface AddonsSectionProps {
  /** Optional section title override */
  title?: string;

  /** Callback when addon contact is clicked */
  onAddonContact?: (addonId: string) => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Section displaying all premium add-ons
 */
export function AddonsSection({
  title = 'Options Premium (Add-ons)',
  onAddonContact,
  className,
}: AddonsSectionProps) {
  return (
    <section
      className={cn('addons-section py-16 bg-gradient-to-br from-white to-purple-50', className)}
      aria-labelledby="addons-title"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            id="addons-title"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            ⭐ {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enrichissez votre solution GAMR avec des fonctionnalités avancées adaptées à vos besoins
            spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((addon) => (
            <AddonCard
              key={addon.id}
              addon={addon}
              {...(onAddonContact ? { onContactClick: onAddonContact } : {})}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Tarifs sur mesure selon vos besoins. Contactez-nous pour un devis personnalisé.
          </p>
        </div>
      </div>
    </section>
  );
}
