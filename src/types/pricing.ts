/**
 * Pricing Types for GAMRdigitale Tarifs Page
 * Feature: 005-g-n-re - Page Tarifs
 */

/**
 * Evaluation activity item
 */
export interface EvaluationActivity {
  /** Activity name */
  name: string;
  /** Whether this activity is included in the package */
  included: boolean;
}

/**
 * Evaluation package pricing
 */
export interface EvaluationPricing {
  /** Package title */
  title: string;
  /** Activities included in evaluation */
  activities: EvaluationActivity[];
  /** Total cost in FCFA */
  totalCost: number;
  /** Description/subtitle */
  description?: string;
}

/**
 * Integration package pricing
 */
export interface IntegrationPricing {
  /** Package title */
  title: string;
  /** List of services included */
  services: string[];
  /** Standard price in FCFA */
  standardPrice: number;
  /** Price when subscribing annually (usually 0 for free) */
  annualPrice: number;
  /** Description/subtitle */
  description?: string;
  /** Badge text (e.g., "GRATUIT si annuel") */
  badge?: string;
}

/**
 * Deployment model for the pricing plan
 */
export type DeploymentModel = 'cloud' | 'on-premise';

/**
 * Billing period for cloud subscriptions
 */
export type BillingPeriod = 'monthly' | 'annual';

/**
 * Pricing plan tier identifier
 */
export type PlanTier = 'starter' | 'pro' | 'business' | 'enterprise';

/**
 * Add-on category for grouping
 */
export type AddonCategory = 'ai' | 'integration' | 'support' | 'training';

/**
 * Add-on pricing model
 */
export type AddonPricingModel = 'per-user' | 'flat-fee' | 'package' | 'custom';

/**
 * Deployment model availability for add-ons
 */
export type AddonAvailability = 'cloud-only' | 'on-premise-only' | 'both';

/**
 * FAQ category for organization
 */
export type FAQCategory = 'security' | 'trial' | 'support' | 'compliance' | 'billing';

/**
 * Complete pricing plan definition
 */
export interface PricingPlan {
  /** Unique identifier for the plan */
  id: string;

  /** Plan tier (starter, pro, business, enterprise) */
  tier: PlanTier;

  /** Display name (e.g., "Starter", "Pro") */
  name: string;

  /** Deployment model (cloud or on-premise) */
  deploymentModel: DeploymentModel;

  /** Billing period (monthly or annual) - only for cloud plans */
  billingPeriod?: BillingPeriod;

  /** Base price in FCFA (monthly for cloud, license for on-premise) */
  basePrice: number | null; // null for custom pricing (Enterprise)

  /** Annual price in FCFA (pre-calculated with 15% discount for cloud) */
  annualPrice?: number | null;

  /** Maximum number of users allowed */
  userLimit: number | null; // null for unlimited/custom

  /** Maximum number of compliance standards */
  standardsLimit: number | null; // null for unlimited/custom

  /** Action priorities per year */
  actionPrioritiesLimit: number | null; // null for unlimited/custom

  /** List of included features (8-10 items) */
  features: string[];

  /** Call-to-action button text */
  ctaText: string;

  /** CTA destination URL or route */
  ctaDestination: string;

  /** Whether this plan is highlighted (most popular, recommended) */
  isHighlighted?: boolean;

  /** Badge text for highlighted plans (e.g., "Plus populaire") */
  badge?: string;
}

/**
 * Additional service package for on-premise deployment
 */
export interface OnPremiseService {
  /** Service identifier */
  id: string;

  /** Service name (e.g., "Déploiement", "Formation") */
  name: string;

  /** Service description */
  description: string;

  /** Pricing model (package, hourly, custom) */
  pricingModel: 'package' | 'hourly' | 'custom';

  /** Package price in FCFA (if applicable) */
  packagePrice?: number | null;

  /** Hourly rate in FCFA (if applicable) */
  hourlyRate?: number | null;
}

/**
 * On-premise deployment pricing structure
 */
export interface OnPremisePricing {
  /** Perpetual license base price in FCFA */
  licensePrice: number | null; // null for custom pricing

  /** Annual maintenance percentage (e.g., 0.20 for 20%) */
  maintenancePercentage: number;

  /** Calculated annual maintenance cost */
  annualMaintenanceCost: number | null; // licensePrice * maintenancePercentage

  /** Additional service packages */
  services: OnPremiseService[];

  /** Included features table */
  includedFeatures: string[];

  /** Excluded features (requires add-ons or custom) */
  excludedFeatures: string[];
}

/**
 * Premium add-on feature
 */
export interface Addon {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Detailed description */
  description: string;

  /** Add-on category */
  category: AddonCategory;

  /** Pricing model */
  pricingModel: AddonPricingModel;

  /** Which deployment models support this add-on */
  availability: AddonAvailability;

  /** Base price in FCFA (null for custom pricing) */
  basePrice?: number | null;

  /** Features included in this add-on */
  features: string[];

  /** Icon or image identifier */
  icon?: string;
}

/**
 * Cloud vs On-Premise comparison dimension
 */
export interface ComparisonDimension {
  /** Unique identifier */
  id: string;

  /** Dimension name (e.g., "Mises à jour") */
  dimensionName: string;

  /** Cloud model value/description */
  cloudValue: string;

  /** On-Premise model value/description */
  onPremiseValue: string;

  /** Icon identifier for visual representation */
  icon?: string;

  /** Display order (lower = higher priority) */
  displayOrder: number;

  /** Whether to highlight this dimension (key differentiator) */
  isHighlighted?: boolean;
}

/**
 * Frequently asked question entry
 */
export interface FAQEntry {
  /** Unique identifier */
  id: string;

  /** Question text */
  question: string;

  /** Answer text (supports markdown) */
  answer: string;

  /** Category for grouping */
  category: FAQCategory;

  /** Display order (lower = higher priority) */
  displayOrder: number;

  /** Keywords for search functionality (future enhancement) */
  keywords?: string[];
}

/**
 * Type guard to check if a plan has custom pricing
 */
export function hasCustomPricing(plan: PricingPlan): boolean {
  return plan.basePrice === null;
}

/**
 * Type guard to check if a plan is a cloud plan
 */
export function isCloudPlan(plan: PricingPlan): plan is PricingPlan & {
  billingPeriod: BillingPeriod;
} {
  return plan.deploymentModel === 'cloud';
}

/**
 * Type guard to check if an addon has visible pricing
 */
export function hasVisiblePricing(addon: Addon): boolean {
  return addon.basePrice !== null && addon.pricingModel !== 'custom';
}

/**
 * Validate that a pricing plan has the required number of features
 */
export function validatePlanFeatures(plan: PricingPlan): {
  isValid: boolean;
  error?: string;
} {
  const featureCount = plan.features.length;

  if (featureCount < 8 || featureCount > 10) {
    return {
      isValid: false,
      error: `Plan ${plan.name} must have 8-10 features, has ${featureCount}`,
    };
  }

  return { isValid: true };
}
