# Pricing Data Contract

**Feature**: Page Tarifs - GAMR Pricing  
**Purpose**: Define the structure and export format for centralized pricing data  
**File Location**: `src/lib/pricing-data.ts`

---

## Overview

This contract defines how pricing data is structured, validated, and exported from the centralized data source. All components consuming pricing data must use these exports.

---

## Data Export Structure

### Primary Exports

```typescript
// src/lib/pricing-data.ts

import type {
  PricingPlan,
  Addon,
  ComparisonDimension,
  FAQEntry,
  OnPremisePricing,
  ROIConstants,
} from '@/types/pricing';

/**
 * Cloud pricing plans (4 tiers)
 */
export const cloudPlans: PricingPlan[] = [
  // Starter, Pro, Business, Enterprise
];

/**
 * On-premise pricing information
 */
export const onPremisePricing: OnPremisePricing = {
  // License, maintenance, services
};

/**
 * Premium add-ons available for both models
 */
export const addons: Addon[] = [
  // AI, SSO, Connectors, Support, Training
];

/**
 * Cloud vs On-Premise comparison dimensions
 */
export const comparisonDimensions: ComparisonDimension[] = [
  // 6 key comparison points
];

/**
 * FAQ entries (6-8 questions)
 */
export const faqEntries: FAQEntry[] = [
  // Security, Trial, Support, Compliance, etc.
];

/**
 * ROI calculation constants
 */
export const roiConstants: ROIConstants = {
  hourlyRate: 15000, // FCFA per hour
  costPerIncident: 500000, // FCFA per incident
  setupCost: 0, // No setup for Cloud
  weeksPerMonth: 4.33, // Average weeks per month
};
```

---

## Cloud Plans Data Structure

### Example: Starter Plan

```typescript
{
  id: 'cloud-starter',
  tier: 'starter',
  name: 'Starter',
  deploymentModel: 'cloud',
  billingPeriod: 'monthly', // Toggle will switch to 'annual'
  basePrice: 100000, // FCFA per month
  annualPrice: 1020000, // 100000 * 12 * 0.85 = 15% discount
  userLimit: 1,
  standardsLimit: 1,
  actionPrioritiesLimit: 5,
  features: [
    'Tableau de bord des risques en temps réel',
    'Évaluation selon 1 norme de conformité',
    'Jusqu\'à 5 priorités d\'actions par an',
    'Rapports mensuels automatisés',
    'Notifications par email',
    'Historique des données 6 mois',
    'Support email (48h)',
    'Accès mobile responsive',
  ],
  ctaText: 'Essayer gratuitement',
  ctaDestination: '/inscription?plan=starter',
  isHighlighted: false,
}
```

### Example: Business Plan (Highlighted)

```typescript
{
  id: 'cloud-business',
  tier: 'business',
  name: 'Business',
  deploymentModel: 'cloud',
  billingPeriod: 'monthly',
  basePrice: 500000,
  annualPrice: 5100000, // 500000 * 12 * 0.85
  userLimit: 25,
  standardsLimit: 10,
  actionPrioritiesLimit: 25,
  features: [
    'Toutes les fonctionnalités Pro',
    'Évaluation selon 10 normes de conformité',
    'Jusqu\'à 25 priorités d\'actions par an',
    'Rapports personnalisables illimités',
    'API REST pour intégrations',
    'Historique des données illimité',
    'Support prioritaire 24/5',
    'Formation en ligne incluse',
    'Gestionnaire de compte dédié',
    'Analyses prédictives avancées',
  ],
  ctaText: 'Essayer gratuitement',
  ctaDestination: '/inscription?plan=business',
  isHighlighted: true,
  badge: 'Plus populaire',
}
```

### Example: Enterprise Plan (Custom Pricing)

```typescript
{
  id: 'cloud-enterprise',
  tier: 'enterprise',
  name: 'Enterprise',
  deploymentModel: 'cloud',
  billingPeriod: 'monthly',
  basePrice: null, // Custom pricing
  annualPrice: null,
  userLimit: null, // Unlimited
  standardsLimit: null, // Unlimited
  actionPrioritiesLimit: null, // Unlimited
  features: [
    'Toutes les fonctionnalités Business',
    'Normes de conformité illimitées',
    'Priorités d\'actions illimitées',
    'SLA 99.9% garanti',
    'Support dédié 24/7/365',
    'Déploiement multi-régions',
    'Formation sur site',
    'Intégrations personnalisées',
    'Revue de sécurité annuelle',
    'Roadmap produit partagée',
  ],
  ctaText: 'Parler à un expert',
  ctaDestination: '/contact?type=enterprise',
  isHighlighted: false,
}
```

---

## On-Premise Pricing Structure

```typescript
export const onPremisePricing: OnPremisePricing = {
  licensePrice: null, // Indicative, custom quote required
  maintenancePercentage: 0.2, // 20% annual
  annualMaintenanceCost: null, // Calculated based on license
  services: [
    {
      id: 'deployment',
      name: 'Déploiement & Installation',
      description: 'Installation complète sur votre infrastructure avec configuration initiale',
      pricingModel: 'package',
      packagePrice: 2500000, // FCFA
    },
    {
      id: 'training',
      name: 'Formation & Transfert',
      description: 'Formation des administrateurs et utilisateurs finaux (5 jours)',
      pricingModel: 'package',
      packagePrice: 1500000, // FCFA
    },
    {
      id: 'support-premium',
      name: 'Support Premium 24/7',
      description: 'Support technique prioritaire avec SLA 4h',
      pricingModel: 'custom',
      packagePrice: null,
    },
  ],
  includedFeatures: [
    'Licence perpétuelle',
    'Mises à jour mineures incluses',
    'Support standard 9h-17h',
    'Documentation complète',
    'Sauvegarde locale',
  ],
  excludedFeatures: [
    'Mises à jour majeures (couvertes par maintenance)',
    'Support 24/7 (add-on)',
    'Formation sur site (package séparé)',
    'Intégrations tierces (add-on)',
  ],
};
```

---

## Add-ons Structure

### Example: AI Add-on

```typescript
{
  id: 'addon-ai-advanced',
  name: 'IA Avancée',
  description: 'Génération automatique de rapports et questionnement en langage naturel',
  category: 'ai',
  pricingModel: 'custom',
  availability: 'both',
  basePrice: null, // Contact us pricing
  features: [
    'Génération de rapports en langage naturel',
    'Analyse prédictive des risques',
    'Recommandations automatisées d\'actions',
    'Chatbot IA pour questions conformité',
  ],
  icon: 'sparkles',
}
```

### Example: SSO Add-on

```typescript
{
  id: 'addon-sso',
  name: 'SSO / LDAP / Active Directory',
  description: 'Authentification unique et intégration annuaire d\'entreprise',
  category: 'integration',
  pricingModel: 'custom',
  availability: 'both',
  basePrice: null, // Contact us pricing
  features: [
    'Single Sign-On (SAML 2.0, OAuth 2.0)',
    'Intégration LDAP',
    'Synchronisation Active Directory',
    'Gestion des rôles centralisée',
  ],
  icon: 'shield-check',
}
```

---

## Comparison Dimensions Structure

```typescript
export const comparisonDimensions: ComparisonDimension[] = [
  {
    id: 'updates',
    dimensionName: 'Mises à jour',
    cloudValue: 'Automatiques et continues, sans interruption',
    onPremiseValue: 'Planifiées avec contrôle de version',
    icon: 'refresh',
    displayOrder: 1,
    isHighlighted: true,
  },
  {
    id: 'security',
    dimensionName: 'Sécurité & Conformité',
    cloudValue: 'Certifications ISO 27001, SOC 2, hébergement France',
    onPremiseValue: 'Contrôle total sur données et infrastructure',
    icon: 'shield',
    displayOrder: 2,
    isHighlighted: true,
  },
  {
    id: 'time-to-value',
    dimensionName: 'Time-to-Value',
    cloudValue: 'Déploiement immédiat (< 1 heure)',
    onPremiseValue: 'Déploiement 2-4 semaines selon infrastructure',
    icon: 'clock',
    displayOrder: 3,
    isHighlighted: false,
  },
  {
    id: 'capex-opex',
    dimensionName: 'CAPEX vs OPEX',
    cloudValue: 'OPEX - Abonnement mensuel/annuel',
    onPremiseValue: 'CAPEX - Investissement initial + maintenance',
    icon: 'currency',
    displayOrder: 4,
    isHighlighted: false,
  },
  {
    id: 'sla',
    dimensionName: 'SLA & Disponibilité',
    cloudValue: 'SLA 99.9% garanti avec compensation',
    onPremiseValue: 'SLA basé sur votre infrastructure',
    icon: 'chart-line',
    displayOrder: 5,
    isHighlighted: false,
  },
  {
    id: 'customization',
    dimensionName: 'Personnalisation',
    cloudValue: 'Personnalisation limitée (workflows, rapports)',
    onPremiseValue: 'Personnalisation complète (code, intégrations)',
    icon: 'wrench',
    displayOrder: 6,
    isHighlighted: false,
  },
];
```

---

## FAQ Structure

```typescript
export const faqEntries: FAQEntry[] = [
  {
    id: 'faq-security',
    question: 'Où sont hébergées mes données et quelle est la sécurité appliquée ?',
    answer:
      'Toutes les données Cloud sont hébergées en France (Paris) chez un fournisseur certifié ISO 27001 et HDS. Chiffrement AES-256 au repos, TLS 1.3 en transit. Sauvegardes quotidiennes avec rétention 30 jours. Conformité RGPD complète.',
    category: 'security',
    displayOrder: 1,
    keywords: ['hébergement', 'sécurité', 'données', 'france', 'iso'],
  },
  {
    id: 'faq-trial',
    question: "Comment fonctionne l'essai gratuit de 30 jours ?",
    answer:
      "L'essai gratuit vous donne accès complet au plan Business sans carte bancaire requise. Durée de 30 jours calendaires. À l'expiration, vos données sont conservées 30 jours supplémentaires si vous souhaitez souscrire. Aucun engagement.",
    category: 'trial',
    displayOrder: 2,
    keywords: ['essai', 'gratuit', 'trial', 'carte bancaire'],
  },
  {
    id: 'faq-users',
    question: "Puis-je changer de plan ou ajouter des utilisateurs en cours d'abonnement ?",
    answer:
      "Oui, vous pouvez upgrader ou downgrader à tout moment. Le changement est proratisé au prorata temporis. L'ajout d'utilisateurs supplémentaires se fait depuis le tableau de bord avec facturation immédiate de la différence.",
    category: 'billing',
    displayOrder: 3,
    keywords: ['plan', 'utilisateurs', 'changement', 'upgrade'],
  },
  {
    id: 'faq-payment',
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer:
      'Paiement par carte bancaire (Visa, Mastercard), virement SEPA, ou Mobile Money (Orange Money, MTN, Moov). Facturation mensuelle ou annuelle. Devis sur demande pour paiement par bon de commande (plans Business et Enterprise uniquement).',
    category: 'billing',
    displayOrder: 4,
    keywords: ['paiement', 'carte', 'virement', 'mobile money'],
  },
  {
    id: 'faq-commitment',
    question: 'Y a-t-il un engagement de durée ?',
    answer:
      "Aucun engagement pour les plans mensuels. Les plans annuels sont payés d'avance mais bénéficient de 15% de réduction. Résiliation possible à tout moment avec préavis de 30 jours. Remboursement prorata pour plans annuels.",
    category: 'billing',
    displayOrder: 5,
    keywords: ['engagement', 'contrat', 'résiliation', 'annuel'],
  },
  {
    id: 'faq-support',
    question: 'Quel niveau de support puis-je attendre ?',
    answer:
      'Starter: email 48h. Pro: email 24h + chat. Business: prioritaire 8h + téléphone. Enterprise: dédié 4h avec SLA garanti. Base de connaissances et tutoriels vidéo accessibles à tous les plans.',
    category: 'support',
    displayOrder: 6,
    keywords: ['support', 'assistance', 'sla', 'réponse'],
  },
  {
    id: 'faq-compliance',
    question: 'GAMR est-il conforme aux standards africains (ANSSI-CI, RGPD) ?',
    answer:
      "Oui, GAMR est conçu pour la conformité réglementaire africaine. Conformité RGPD complète, alignement ANSSI-CI (Côte d'Ivoire), support des standards ISO 27001, ISO 27002, NIST, et normes sectorielles. Certifications en cours pour ISO 27001.",
    category: 'compliance',
    displayOrder: 7,
    keywords: ['conformité', 'rgpd', 'anssi', 'iso', 'certification'],
  },
  {
    id: 'faq-reversibility',
    question: 'Puis-je exporter mes données si je quitte GAMR ?',
    answer:
      'Oui, réversibilité complète garantie. Export de toutes vos données en CSV, JSON, ou PDF à tout moment depuis le tableau de bord. Support gratuit pour la transition vers une autre solution pendant 30 jours après résiliation.',
    category: 'billing',
    displayOrder: 8,
    keywords: ['export', 'données', 'réversibilité', 'portabilité'],
  },
];
```

---

## Pricing Calculation Functions

### Annual Discount Calculation

```typescript
// src/lib/pricing-utils.ts

/**
 * Calculate annual price with 15% discount
 */
export function calculateAnnualPrice(monthlyPrice: number): number {
  return Math.round(monthlyPrice * 12 * 0.85);
}

/**
 * Calculate annual savings amount
 */
export function calculateAnnualSavings(monthlyPrice: number): number {
  const fullYearlyPrice = monthlyPrice * 12;
  const discountedYearlyPrice = calculateAnnualPrice(monthlyPrice);
  return fullYearlyPrice - discountedYearlyPrice;
}

/**
 * Get price for a plan based on billing period
 */
export function getPlanPrice(plan: PricingPlan, billingPeriod: BillingPeriod): number | null {
  if (plan.basePrice === null) return null;

  if (billingPeriod === 'annual') {
    return plan.annualPrice ?? calculateAnnualPrice(plan.basePrice);
  }

  return plan.basePrice;
}
```

### ROI Calculation

```typescript
import type { ROIInputs, ROIResults, ROIConstants } from '@/types/roi';
import { roiConstants } from './pricing-data';

/**
 * Calculate ROI based on user inputs
 */
export function calculateROI(
  inputs: ROIInputs,
  planCost: number,
  constants: ROIConstants = roiConstants
): ROIResults {
  // Monthly time savings value
  const timeSavingsValue =
    inputs.numberOfUsers *
    inputs.timeSavedPerUserPerWeek *
    constants.weeksPerMonth *
    constants.hourlyRate;

  // Monthly incident prevention value
  const incidentPreventionValue = inputs.incidentsAvoidedPerMonth * constants.costPerIncident;

  // Total monthly savings
  const monthlySavings = timeSavingsValue + incidentPreventionValue;

  // Monthly ROI (savings minus plan cost)
  const monthlyROI = monthlySavings - planCost;

  // Annual ROI
  const annualROI = monthlyROI * 12;

  // Break-even calculation
  let breakEvenMonths: number | null = null;
  if (monthlyROI > 0 && constants.setupCost > 0) {
    breakEvenMonths = Math.ceil(constants.setupCost / monthlyROI);
  } else if (monthlyROI > 0) {
    breakEvenMonths = 0; // Immediate ROI (no setup cost)
  }
  // If monthlyROI <= 0, breakEvenMonths stays null (never breaks even)

  return {
    monthlySavings,
    monthlyROI,
    annualROI,
    breakEvenMonths,
    planCost,
  };
}
```

---

## Data Validation

```typescript
/**
 * Validate pricing data integrity
 */
export function validatePricingData(): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate cloud plans
  if (cloudPlans.length !== 4) {
    errors.push('Must have exactly 4 cloud plans');
  }

  cloudPlans.forEach((plan) => {
    if (plan.features.length < 8 || plan.features.length > 10) {
      errors.push(`Plan ${plan.name} must have 8-10 features`);
    }

    if (plan.basePrice && plan.annualPrice) {
      const expectedAnnual = calculateAnnualPrice(plan.basePrice);
      if (Math.abs(plan.annualPrice - expectedAnnual) > 1) {
        errors.push(`Plan ${plan.name} annual price mismatch`);
      }
    }
  });

  // Validate FAQ
  if (faqEntries.length < 6 || faqEntries.length > 8) {
    errors.push('Must have 6-8 FAQ entries');
  }

  // Validate comparison dimensions
  if (comparisonDimensions.length !== 6) {
    errors.push('Must have exactly 6 comparison dimensions');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

---

## Usage in Components

```typescript
// Example: PricingCard component
import { cloudPlans, getPlanPrice } from '@/lib/pricing-data';
import { formatFCFA } from '@/lib/currency-formatter';

function PricingGrid({ billingPeriod }: { billingPeriod: BillingPeriod }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cloudPlans.map(plan => (
        <PricingCard
          key={plan.id}
          plan={plan}
          price={getPlanPrice(plan, billingPeriod)}
          billingPeriod={billingPeriod}
        />
      ))}
    </div>
  );
}
```

---

## Contract Guarantees

1. **Immutability**: Exported data is read-only, never mutated by components
2. **Type Safety**: All data conforms to types defined in `data-model.md`
3. **Validation**: Data validated on import, errors logged in development
4. **Single Source of Truth**: All pricing values come from this file only
5. **Calculation Consistency**: All price calculations use provided utility functions

---

**Status**: Ready for implementation  
**Dependencies**: Requires types from `data-model.md` to be implemented first
