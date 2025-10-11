/**
 * PricingStructuredData Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * JSON-LD structured data for Product and Offers
 */

import { cloudPlans } from '@/lib/pricing-data';

/**
 * Generate Product + AggregateOffer structured data for SEO
 */
export function PricingStructuredData() {
  // Filter out Enterprise (custom pricing) for the aggregate offer
  const standardPlans = cloudPlans.filter((plan) => plan.basePrice !== null);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: "GAMR - Grille d'Analyse des Menaces et Risques",
    description:
      'Solution complète de gestion des risques, conformité réglementaire et analyse des menaces pour entreprises et organisations africaines.',
    brand: {
      '@type': 'Organization',
      name: 'GAMR',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'XOF',
      lowPrice: Math.min(...standardPlans.map((p) => p.basePrice!)).toString(),
      highPrice: Math.max(...standardPlans.map((p) => p.basePrice!)).toString(),
      offerCount: standardPlans.length.toString(),
      offers: standardPlans.map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.basePrice!.toString(),
        priceCurrency: 'XOF',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: plan.basePrice!.toString(),
          priceCurrency: 'XOF',
          unitText: 'MONTH',
        },
        availability: 'https://schema.org/InStock',
        url: `https://engage-360.net/tarifs#${plan.tier}`, // TODO: Update to actual GAMR domain
        description: `Plan ${plan.name}: ${plan.userLimit} ${plan.userLimit === 1 ? 'utilisateur' : 'utilisateurs'}, ${plan.standardsLimit} ${plan.standardsLimit === 1 ? 'norme' : 'normes'}, ${plan.actionPrioritiesLimit} actions prioritaires/an`,
      })),
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Deployment Model',
        value: 'Cloud SaaS',
      },
      {
        '@type': 'PropertyValue',
        name: 'Free Trial',
        value: '30 days',
      },
      {
        '@type': 'PropertyValue',
        name: 'Payment Frequency',
        value: 'Monthly or Annual',
      },
      {
        '@type': 'PropertyValue',
        name: 'Currency',
        value: 'XOF (West African CFA Franc)',
      },
      {
        '@type': 'PropertyValue',
        name: 'Target Region',
        value: 'West Africa',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
