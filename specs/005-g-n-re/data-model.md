# Data Model: Page Tarifs

**Feature**: Page Tarifs - GAMR Pricing  
**Branch**: `005-g-n-re`  
**Date**: 2025-10-09  
**Purpose**: Define TypeScript types and data structures for pricing page

---

## Core Entities

### 1. PricingPlan

Represents a subscription tier (Starter, Pro, Business, Enterprise) with complete pricing and feature information.

```typescript
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
```

**Validation Rules**:

- `basePrice`: Must be > 0 or null (for custom pricing)
- `annualPrice`: If provided, must equal `basePrice * 12 * 0.85` (15% discount)
- `userLimit`, `standardsLimit`, `actionPrioritiesLimit`: Must be > 0 or null
- `features`: Must contain 8-10 items
- `billingPeriod`: Required for cloud plans, omitted for on-premise

**Relationships**:

- Each `PricingPlan` can have multiple `Addon` options available
- Cloud plans have both monthly and annual pricing variants

**State Transitions**:

- Cloud plans: `billingPeriod` toggles between 'monthly' and 'annual'
- All plans: `deploymentModel` filtering when user toggles Cloud/On-Premise

---

### 2. OnPremisePricing

Represents the on-premise licensing model with maintenance and services.

```typescript
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
```

**Validation Rules**:

- `licensePrice`: Must be > 0 or null
- `maintenancePercentage`: Must be between 0 and 1 (typically 0.15-0.25)
- `annualMaintenanceCost`: Auto-calculated from `licensePrice * maintenancePercentage`
- `services`: Must include at least deployment, training, support packages

---

### 3. Addon

Represents premium add-on features available for purchase.

```typescript
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
```

**Validation Rules**:

- `basePrice`: Must be > 0 or null (null means "Contact us" pricing)
- `features`: Must contain at least 2 items
- `availability`: Must match plan's deploymentModel for display logic

**Display Logic**:

- If `basePrice` is null, show "Contact us" CTA
- Filter addons by `availability` based on selected deployment model

---

### 4. ComparisonDimension

Represents a single comparison point between Cloud and On-Premise.

```typescript
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
```

**Validation Rules**:

- `cloudValue` and `onPremiseValue`: Must be non-empty strings
- `displayOrder`: Must be unique among all dimensions
- `dimensionName`: Should be concise (2-4 words max)

**Required Dimensions** (per FR-024):

1. Updates/maintenance
2. Security & compliance
3. Time-to-value
4. CAPEX vs OPEX
5. SLA commitments
6. Customization capabilities

---

### 5. FAQEntry

Represents a frequently asked question with answer.

```typescript
/**
 * FAQ category for organization
 */
export type FAQCategory = 'security' | 'trial' | 'support' | 'compliance' | 'billing';

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
```

**Validation Rules**:

- `question`: Must end with "?"
- `answer`: Must be non-empty, < 500 characters (concise)
- `displayOrder`: Must be unique
- Total FAQ count: 6-8 items (per FR-030)

**Required Topics** (per FR-031):

1. Security & hosting
2. Data portability/reversibility
3. User limits
4. Free trial terms
5. Accepted payment methods
6. Contract commitments
7. Support availability
8. Compliance (ISO, ANSSI-CI, RGPD)

---

### 6. ROI Calculation

Represents ROI calculator inputs and computed results.

```typescript
/**
 * User inputs for ROI calculation
 */
export interface ROIInputs {
  /** Number of users in organization */
  numberOfUsers: number; // Range: 1-1000

  /** Security incidents avoided per month */
  incidentsAvoidedPerMonth: number; // Range: 0-50

  /** Time saved per user per week (hours) */
  timeSavedPerUserPerWeek: number; // Range: 0-40
}

/**
 * Calculated ROI results
 */
export interface ROIResults {
  /** Monthly savings in FCFA */
  monthlySavings: number;

  /** Monthly ROI (savings - plan cost) in FCFA */
  monthlyROI: number;

  /** Annual ROI in FCFA */
  annualROI: number;

  /** Break-even point in months */
  breakEvenMonths: number | null; // null if never breaks even

  /** Selected plan monthly cost (for context) */
  planCost: number;
}

/**
 * ROI calculation constants (configurable)
 */
export interface ROIConstants {
  /** Average hourly rate in FCFA */
  hourlyRate: number; // Default: 15000

  /** Average cost per security incident in FCFA */
  costPerIncident: number; // Default: 500000

  /** Setup/onboarding cost in FCFA */
  setupCost: number; // Default: 0 for Cloud

  /** Weeks per month for time calculation */
  weeksPerMonth: number; // Default: 4.33
}
```

**Validation Rules**:

- `numberOfUsers`: 1 ≤ value ≤ 1000
- `incidentsAvoidedPerMonth`: 0 ≤ value ≤ 50
- `timeSavedPerUserPerWeek`: 0 ≤ value ≤ 40

**Calculation Formula** (from research.md):

```typescript
// Monthly savings
monthlySavings = (
  (numberOfUsers × timeSavedPerUserPerWeek × 4.33 × hourlyRate) +
  (incidentsAvoidedPerMonth × costPerIncident)
);

// Monthly ROI
monthlyROI = monthlySavings - planCost;

// Annual ROI
annualROI = monthlyROI × 12;

// Break-even months
breakEvenMonths = monthlySavings > planCost
  ? Math.ceil(setupCost / monthlyROI)
  : null; // Never breaks even
```

**State Management**:

- Inputs stored in component state (controlled inputs)
- Results calculated in real-time (< 50ms per FR-PERF-005)
- No persistence required (session-only calculator)

---

## Utility Types

### Currency Formatting

```typescript
/**
 * Locale for currency formatting
 */
export type CurrencyLocale = 'es-CI' | 'fr-FR';

/**
 * Currency code
 */
export type CurrencyCode = 'XOF'; // West African CFA Franc

/**
 * Formatted price result
 */
export interface FormattedPrice {
  /** Raw numeric value */
  value: number;

  /** Formatted string (e.g., "100.000 F CFA") */
  formatted: string;

  /** Currency code */
  currency: CurrencyCode;

  /** Locale used */
  locale: CurrencyLocale;
}
```

---

## Type Guards

```typescript
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
 * Validate ROI inputs are within acceptable ranges
 */
export function validateROIInputs(inputs: ROIInputs): {
  isValid: boolean;
  errors: Partial<Record<keyof ROIInputs, string>>;
} {
  const errors: Partial<Record<keyof ROIInputs, string>> = {};

  if (inputs.numberOfUsers < 1 || inputs.numberOfUsers > 1000) {
    errors.numberOfUsers = "Le nombre d'utilisateurs doit être entre 1 et 1000";
  }

  if (inputs.incidentsAvoidedPerMonth < 0 || inputs.incidentsAvoidedPerMonth > 50) {
    errors.incidentsAvoidedPerMonth = "Le nombre d'incidents doit être entre 0 et 50";
  }

  if (inputs.timeSavedPerUserPerWeek < 0 || inputs.timeSavedPerUserPerWeek > 40) {
    errors.timeSavedPerUserPerWeek = 'Le temps gagné doit être entre 0 et 40 heures';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

---

## Data Relationships Diagram

```
PricingPlan (1)
  ├── DeploymentModel (cloud | on-premise)
  ├── BillingPeriod (monthly | annual) [cloud only]
  ├── Features[] (8-10 items)
  └── Compatible Addons (*)

Addon (*)
  ├── Category (ai | integration | support | training)
  ├── Availability (cloud-only | on-premise-only | both)
  └── Features[] (2+ items)

ComparisonDimension (6)
  ├── CloudValue (string)
  ├── OnPremiseValue (string)
  └── DisplayOrder (1-6)

FAQEntry (6-8)
  ├── Category (security | trial | support | compliance | billing)
  ├── Question (string)
  ├── Answer (markdown string)
  └── DisplayOrder (1-8)

ROIInputs
  └── → ROIResults (calculated)
      ├── MonthlySavings (FCFA)
      ├── MonthlyROI (FCFA)
      ├── AnnualROI (FCFA)
      └── BreakEvenMonths (number | null)
```

---

## File Locations

All types defined in this model will be implemented in:

- `src/types/pricing.ts` - Core pricing types (PricingPlan, Addon, ComparisonDimension, FAQEntry, OnPremisePricing)
- `src/types/roi.ts` - ROI calculation types (ROIInputs, ROIResults, ROIConstants)
- `src/lib/pricing-data.ts` - Actual data instances conforming to these types
- `src/lib/pricing-utils.ts` - Utility functions and type guards

---

## Next Steps

1. ✅ Data model complete
2. → Generate contracts/pricing-data-contract.md
3. → Generate contracts/component-apis.md
4. → Generate contracts/seo-metadata-contract.md
5. → Generate quickstart.md
6. → Update agent context

**Validation**: All types checked against spec requirements FR-001 through FR-035. No missing entities identified.
