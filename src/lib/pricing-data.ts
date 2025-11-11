/**
 * Pricing Data - Single Source of Truth
 * Feature: 005-g-n-re - Page Tarifs
 *
 * All pricing information for GAMRdigitale Cloud and On-Premise models
 */

import type {
  PricingPlan,
  Addon,
  ComparisonDimension,
  FAQEntry,
  OnPremisePricing,
  EvaluationPricing,
  IntegrationPricing,
} from '@/types/pricing';
import type { ROIConstants } from '@/types/roi';

/**
 * 1-EVALUATION Pricing
 */
export const evaluationPricing: EvaluationPricing = {
  title: '1-EVALUATION',
  description: 'Audit complet de votre site avec rapport détaillé',
  activities: [
    { name: 'Collecte de données de terrain', included: true },
    { name: 'Traitement et analyse de données', included: true },
    { name: 'Validation des données', included: true },
    { name: 'Reportage', included: true },
    { name: 'Remise de rapport provisoire', included: true },
    { name: 'Prise en compte des remarques', included: true },
    { name: 'Remise de rapport', included: true },
    { name: 'Production de la GAMR', included: true },
    { name: 'Formation du chef de sécurité', included: true },
  ],
  totalCost: 5000000, // 5 000 000 FCFA
};

/**
 * 2-INTEGRATION DES DONNEES Pricing
 */
export const integrationPricing: IntegrationPricing = {
  title: '2-INTEGRATION DES DONNEES',
  description: "Activation de votre compte avec vos données d'évaluation",
  services: [
    "Import des données d'évaluation dans votre espace SAAS",
    'Configuration personnalisée de votre environnement',
    "Formation à l'utilisation (2 sessions de 2h)",
    'Support dédié pendant 30 jours',
  ],
  standardPrice: 1500000, // 1 500 000 FCFA
  annualPrice: 0, // GRATUIT si souscription annuelle
  badge: '💡 INCLUS si souscription annuelle',
};

/**
 * Cloud pricing plans (4 tiers)
 */
export const cloudPlans: PricingPlan[] = [
  {
    id: 'cloud-starter',
    tier: 'starter',
    name: 'Starter',
    deploymentModel: 'cloud',
    billingPeriod: 'monthly',
    basePrice: 100000, // FCFA per month
    annualPrice: 1020000, // 100000 * 12 * 0.85
    userLimit: 1,
    standardsLimit: 1,
    actionPrioritiesLimit: 5,
    features: [
      'Tableau de bord des risques en temps réel',
      'Évaluation selon 1 norme de conformité',
      "Jusqu'à 5 priorités d'actions par an",
      'Rapports mensuels automatisés',
      'Notifications par email',
      'Historique des données 6 mois',
      'Support email (48h)',
      'Accès mobile responsive',
    ],
    ctaText: 'Essayer gratuitement',
    ctaDestination: '/inscription?plan=starter',
    isHighlighted: false,
  },
  {
    id: 'cloud-pro',
    tier: 'pro',
    name: 'Pro',
    deploymentModel: 'cloud',
    billingPeriod: 'monthly',
    basePrice: 250000, // FCFA per month
    annualPrice: 2550000, // 250000 * 12 * 0.85
    userLimit: 5,
    standardsLimit: 2,
    actionPrioritiesLimit: 10,
    features: [
      'Toutes les fonctionnalités Starter',
      'Évaluation selon 2 normes de conformité',
      "Jusqu'à 10 priorités d'actions par an",
      'Rapports personnalisables illimités',
      'Notifications multi-canaux (email, SMS, Slack)',
      'Historique des données 2 ans',
      'Support prioritaire 24h + chat',
      'API REST pour intégrations',
      'Tableaux de bord personnalisés',
      'Export de données (CSV, PDF)',
    ],
    ctaText: 'Essayer gratuitement',
    ctaDestination: '/inscription?plan=pro',
    isHighlighted: false,
  },
  {
    id: 'cloud-business',
    tier: 'business',
    name: 'Business',
    deploymentModel: 'cloud',
    billingPeriod: 'monthly',
    basePrice: 500000, // FCFA per month
    annualPrice: 5100000, // 500000 * 12 * 0.85
    userLimit: 25,
    standardsLimit: 4,
    actionPrioritiesLimit: 25,
    features: [
      'Toutes les fonctionnalités Pro',
      'Évaluation selon 4 normes de conformité',
      "Jusqu'à 25 priorités d'actions par an",
      'Rapports exécutifs automatisés',
      'Historique des données illimité',
      'Support prioritaire 24/5 (8h)',
      'Formation en ligne incluse',
      'Gestionnaire de compte dédié',
      'Analyses prédictives avancées',
      'Audit de conformité trimestriel',
    ],
    ctaText: 'Essayer gratuitement',
    ctaDestination: '/inscription?plan=business',
    isHighlighted: true,
    badge: 'Plus populaire',
  },
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
      "Priorités d'actions illimitées",
      'SLA 99.9% garanti',
      'Support dédié 24/7/365 (4h)',
      'Déploiement multi-régions',
      'Formation sur site',
      'Intégrations personnalisées',
      'Revue de sécurité annuelle',
      'Roadmap produit partagée',
    ],
    ctaText: 'Parler à un expert',
    ctaDestination: '/contact?type=enterprise',
    isHighlighted: false,
  },
];

/**
 * On-premise pricing information
 */
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

/**
 * Premium add-ons available for both models
 */
export const addons: Addon[] = [
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
      "Recommandations automatisées d'actions",
      'Chatbot IA pour questions conformité',
    ],
    icon: 'sparkles',
  },
  {
    id: 'addon-sso',
    name: 'SSO / LDAP / Active Directory',
    description: "Authentification unique et intégration annuaire d'entreprise",
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
  },
  {
    id: 'addon-connectors',
    name: 'Connecteurs ERP/CRM/Data Warehouse',
    description: "Intégration avec vos systèmes d'information existants",
    category: 'integration',
    pricingModel: 'custom',
    availability: 'both',
    basePrice: null, // Contact us pricing
    features: [
      'Connecteurs ERP (SAP, Oracle, Sage)',
      'Connecteurs CRM (Salesforce, Dynamics)',
      'Export vers Data Warehouse',
      'API webhooks personnalisés',
    ],
    icon: 'link',
  },
  {
    id: 'addon-support-247',
    name: 'Support Premium 24/7',
    description: 'Assistance technique prioritaire avec engagement de niveau de service',
    category: 'support',
    pricingModel: 'custom',
    availability: 'both',
    basePrice: null, // Contact us pricing
    features: [
      'Disponibilité 24/7/365',
      'SLA 4h garanti',
      'Hotline téléphonique dédiée',
      'Gestionnaire de compte personnel',
    ],
    icon: 'headset',
  },
  {
    id: 'addon-training',
    name: 'Formation & Transfert de Compétences',
    description: 'Programme de formation complet pour vos équipes',
    category: 'training',
    pricingModel: 'custom',
    availability: 'both',
    basePrice: null, // Contact us pricing
    features: [
      'Formation sur site ou en ligne',
      'Supports de cours personnalisés',
      'Certification des administrateurs',
      'Support post-formation 3 mois',
    ],
    icon: 'graduation-cap',
  },
];

/**
 * Cloud vs On-Premise comparison dimensions
 */
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

/**
 * FAQ entries (6-8 questions)
 */
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
      'Paiement par carte bancaire (Visa, Mastercard), virement SEPA, ou Mobile Money (Orange Money, MTN, Moov, TrésorMoney). Facturation mensuelle ou annuelle. Devis sur demande pour paiement par bon de commande (plans Business et Enterprise uniquement).',
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
    question: 'GAMRdigitale est-il conforme aux standards africains (ANSSI-CI, RGPD) ?',
    answer:
      "Oui, GAMRdigitale est conçu pour la conformité réglementaire africaine. Conformité RGPD complète, alignement ANSSI-CI (Côte d'Ivoire), support des standards ISO 27001, ISO 27002, NIST, et normes sectorielles. Certifications en cours pour ISO 27001.",
    category: 'compliance',
    displayOrder: 7,
    keywords: ['conformité', 'rgpd', 'anssi', 'iso', 'certification'],
  },
  {
    id: 'faq-reversibility',
    question: 'Puis-je exporter mes données si je quitte GAMRdigitale ?',
    answer:
      'Oui, réversibilité complète garantie. Export de toutes vos données en CSV, JSON, ou PDF à tout moment depuis le tableau de bord. Support gratuit pour la transition vers une autre solution pendant 30 jours après résiliation.',
    category: 'billing',
    displayOrder: 8,
    keywords: ['export', 'données', 'réversibilité', 'portabilité'],
  },
];

/**
 * ROI calculation constants
 */
export const roiConstants: ROIConstants = {
  hourlyRate: 15000, // FCFA per hour (average West African rate)
  costPerIncident: 500000, // FCFA per security incident
  setupCost: 0, // Cloud has no setup cost
  weeksPerMonth: 4.33, // Average weeks per month
};
