# Component APIs Contract

**Feature**: Page Tarifs - GAMR Pricing  
**Purpose**: Define prop interfaces and component contracts for all pricing page components  
**Location**: `src/components/tarifs/`

---

## Component Hierarchy

```
TarifsPage (app/tarifs/page.tsx)
├── PricingHero
│   └── Button (CTA) ×2
├── DeploymentToggle
├── BillingToggle (shown only for Cloud)
├── CloudPricingGrid
│   └── PricingCard ×4
│       ├── Badge (optional)
│       ├── FormattedPrice
│       └── Button (CTA)
├── OnPremiseSection
│   ├── OnPremiseService ×N
│   └── IncludedFeaturesTable
├── AddonsSection
│   └── AddonCard ×5
│       └── Button (Contact CTA)
├── ComparisonTable
│   └── ComparisonRow ×6
├── ROICalculator
│   ├── Input (number) ×3
│   ├── FormattedPrice (results) ×3
│   └── ValidationMessage (if errors)
├── PricingFAQ
│   └── Accordion
│       └── AccordionItem ×6-8
└── PricingCTA
    └── Button ×2
```

---

## 1. PricingHero

**Location**: `src/components/tarifs/PricingHero.tsx`

### Props

```typescript
export interface PricingHeroProps {
  /** Main hero title */
  title?: string;

  /** Subtitle/description */
  subtitle?: string;

  /** Primary CTA text (default: "Essai gratuit 30 jours") */
  primaryCtaText?: string;

  /** Primary CTA destination */
  primaryCtaHref?: string;

  /** Secondary CTA text (default: "Demander une démo") */
  secondaryCtaText?: string;

  /** Secondary CTA destination */
  secondaryCtaHref?: string;
}
```

### Default Props

```typescript
const defaultProps: Required<PricingHeroProps> = {
  title: 'Des tarifs simples et transparents',
  subtitle: 'Choisissez le mode qui correspond à votre gouvernance : Cloud ou On-Premise.',
  primaryCtaText: 'Essai gratuit 30 jours',
  primaryCtaHref: '/inscription',
  secondaryCtaText: 'Demander une démo',
  secondaryCtaHref: '/contact?type=demo',
};
```

### Events

- `onPrimaryCtaClick?: () => void` - Analytics tracking for primary CTA
- `onSecondaryCtaClick?: () => void` - Analytics tracking for secondary CTA

---

## 2. DeploymentToggle

**Location**: `src/components/tarifs/DeploymentToggle.tsx`

### Props

```typescript
export type DeploymentModel = 'cloud' | 'on-premise';

export interface DeploymentToggleProps {
  /** Current selected deployment model */
  value: DeploymentModel;

  /** Callback when deployment model changes */
  onChange: (model: DeploymentModel) => void;

  /** Optional label */
  label?: string;

  /** Disable the toggle */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}
```

### State Management

```typescript
// Parent component state
const [deploymentModel, setDeploymentModel] = useState<DeploymentModel>('cloud');

<DeploymentToggle
  value={deploymentModel}
  onChange={setDeploymentModel}
/>
```

### Accessibility

- `role="switch"`
- `aria-checked={value === 'cloud'}`
- `aria-label="Basculer entre Cloud et On-Premise"`
- Keyboard support: Space, Enter to toggle

---

## 3. BillingToggle

**Location**: `src/components/tarifs/BillingToggle.tsx`

### Props

```typescript
export type BillingPeriod = 'monthly' | 'annual';

export interface BillingToggleProps {
  /** Current selected billing period */
  value: BillingPeriod;

  /** Callback when billing period changes */
  onChange: (period: BillingPeriod) => void;

  /** Show savings badge for annual (default: true) */
  showSavingsBadge?: boolean;

  /** Custom savings text (default: "Économisez 15%") */
  savingsText?: string;

  /** Disable the toggle */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}
```

### Computed Props

```typescript
// Component calculates and displays savings percentage
const savingsPercent = 15; // Hardcoded 15% discount
```

### Accessibility

- `role="radiogroup"`
- `aria-labelledby="billing-toggle-label"`
- Each option has `role="radio"` and `aria-checked`

---

## 4. PricingCard

**Location**: `src/components/tarifs/PricingCard.tsx`

### Props

```typescript
import type { PricingPlan } from '@/types/pricing';

export interface PricingCardProps {
  /** Pricing plan data */
  plan: PricingPlan;

  /** Display price (can differ from plan.basePrice for annual) */
  price: number | null;

  /** Billing period for display context */
  billingPeriod?: BillingPeriod;

  /** Callback when CTA is clicked */
  onCtaClick?: (planId: string) => void;

  /** Override CTA text */
  ctaText?: string;

  /** Override CTA href */
  ctaHref?: string;

  /** Additional CSS classes */
  className?: string;
}
```

### Rendering Logic

```typescript
// Example rendering logic
function PricingCard({ plan, price, billingPeriod, onCtaClick }: PricingCardProps) {
  const isCustomPricing = price === null;
  const isHighlighted = plan.isHighlighted ?? false;

  return (
    <article className={cn(
      'pricing-card',
      isHighlighted && 'highlighted',
      className
    )}>
      {plan.badge && <Badge>{plan.badge}</Badge>}

      <h3>{plan.name}</h3>

      {isCustomPricing ? (
        <div className="price-custom">Sur devis</div>
      ) : (
        <>
          <FormattedPrice value={price!} />
          <span className="period">
            {billingPeriod === 'annual' ? '/ an' : '/ mois'}
          </span>
        </>
      )}

      <ul className="features">
        {plan.features.map((feature, i) => (
          <li key={i}>
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        href={ctaHref ?? plan.ctaDestination}
        onClick={() => onCtaClick?.(plan.id)}
        variant={isHighlighted ? 'primary' : 'secondary'}
      >
        {ctaText ?? plan.ctaText}
      </Button>
    </article>
  );
}
```

### Accessibility

- `<article>` semantic element
- `aria-labelledby` pointing to plan name heading
- List semantics for features (`<ul>`, `<li>`)

---

## 5. CloudPricingGrid

**Location**: `src/components/tarifs/CloudPricingGrid.tsx`

### Props

```typescript
export interface CloudPricingGridProps {
  /** Billing period to determine pricing display */
  billingPeriod: BillingPeriod;

  /** Callback when any plan CTA is clicked */
  onPlanSelect?: (planId: string) => void;

  /** Additional CSS classes */
  className?: string;
}
```

### Internal Behavior

```typescript
// Component internally loads cloudPlans from pricing-data.ts
import { cloudPlans, getPlanPrice } from '@/lib/pricing-data';

function CloudPricingGrid({ billingPeriod, onPlanSelect }: CloudPricingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cloudPlans.map(plan => (
        <PricingCard
          key={plan.id}
          plan={plan}
          price={getPlanPrice(plan, billingPeriod)}
          billingPeriod={billingPeriod}
          onCtaClick={onPlanSelect}
        />
      ))}
    </div>
  );
}
```

---

## 6. OnPremiseSection

**Location**: `src/components/tarifs/OnPremiseSection.tsx`

### Props

```typescript
export interface OnPremiseSectionProps {
  /** Optional section title override */
  title?: string;

  /** Callback when service is selected */
  onServiceSelect?: (serviceId: string) => void;

  /** Additional CSS classes */
  className?: string;
}
```

### Internal Structure

```typescript
import { onPremisePricing } from '@/lib/pricing-data';

function OnPremiseSection({ title, onServiceSelect }: OnPremiseSectionProps) {
  return (
    <section className="on-premise-section">
      <h2>{title ?? 'On-Premise'}</h2>

      <div className="license-info">
        <p>Licence perpétuelle avec maintenance annuelle à 20%</p>
      </div>

      <div className="services-grid">
        {onPremisePricing.services.map(service => (
          <OnPremiseServiceCard
            key={service.id}
            service={service}
            onSelect={() => onServiceSelect?.(service.id)}
          />
        ))}
      </div>

      <IncludedFeaturesTable
        included={onPremisePricing.includedFeatures}
        excluded={onPremisePricing.excludedFeatures}
      />
    </section>
  );
}
```

---

## 7. AddonCard

**Location**: `src/components/tarifs/AddonCard.tsx`

### Props

```typescript
import type { Addon } from '@/types/pricing';

export interface AddonCardProps {
  /** Add-on data */
  addon: Addon;

  /** Callback when contact CTA is clicked */
  onContactClick?: (addonId: string) => void;

  /** Additional CSS classes */
  className?: string;
}
```

### Rendering

```typescript
function AddonCard({ addon, onContactClick }: AddonCardProps) {
  return (
    <div className="addon-card">
      {addon.icon && <Icon name={addon.icon} />}

      <h3>{addon.name}</h3>
      <p className="description">{addon.description}</p>

      <ul className="features">
        {addon.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      <Button
        variant="outline"
        onClick={() => onContactClick?.(addon.id)}
      >
        Nous contacter
      </Button>
    </div>
  );
}
```

---

## 8. ComparisonTable

**Location**: `src/components/tarifs/ComparisonTable.tsx`

### Props

```typescript
export interface ComparisonTableProps {
  /** Optional title override */
  title?: string;

  /** Additional CSS classes */
  className?: string;
}
```

### Responsive Behavior

```typescript
// Desktop: Table view
// Mobile: Stacked cards

function ComparisonTable({ title }: ComparisonTableProps) {
  const dimensions = comparisonDimensions;

  return (
    <>
      {/* Desktop table (hidden on mobile) */}
      <table className="hidden md:table">
        <thead>
          <tr>
            <th>Critère</th>
            <th>Cloud</th>
            <th>On-Premise</th>
          </tr>
        </thead>
        <tbody>
          {dimensions.map(dim => (
            <ComparisonRow key={dim.id} dimension={dim} />
          ))}
        </tbody>
      </table>

      {/* Mobile cards (hidden on desktop) */}
      <div className="md:hidden">
        {dimensions.map(dim => (
          <ComparisonCard key={dim.id} dimension={dim} />
        ))}
      </div>
    </>
  );
}
```

---

## 9. ROICalculator

**Location**: `src/components/tarifs/ROICalculator.tsx`

### Props

```typescript
export interface ROICalculatorProps {
  /** Pre-selected plan for ROI context (optional) */
  planId?: string;

  /** Callback when ROI is calculated */
  onCalculate?: (results: ROIResults) => void;

  /** Additional CSS classes */
  className?: string;
}
```

### State Management

```typescript
import { useState } from 'react';
import { useROICalculator } from '@/hooks/useROICalculator';
import type { ROIInputs } from '@/types/roi';

function ROICalculator({ planId, onCalculate }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<ROIInputs>({
    numberOfUsers: 10,
    incidentsAvoidedPerMonth: 5,
    timeSavedPerUserPerWeek: 2,
  });

  const { results, errors, isValid } = useROICalculator(inputs, planId);

  useEffect(() => {
    if (isValid && results) {
      onCalculate?.(results);
    }
  }, [results, isValid, onCalculate]);

  return (
    <form className="roi-calculator">
      {/* Input fields */}
      {/* Results display */}
    </form>
  );
}
```

### Hook: useROICalculator

```typescript
// src/hooks/useROICalculator.ts

import { useMemo } from 'react';
import { calculateROI } from '@/lib/pricing-utils';
import { validateROIInputs } from '@/types/pricing';
import type { ROIInputs, ROIResults } from '@/types/roi';

export interface UseROICalculatorReturn {
  /** Calculated ROI results */
  results: ROIResults | null;

  /** Validation errors for inputs */
  errors: Partial<Record<keyof ROIInputs, string>>;

  /** Whether inputs are valid */
  isValid: boolean;
}

export function useROICalculator(inputs: ROIInputs, planId?: string): UseROICalculatorReturn {
  // Validation
  const { isValid, errors } = useMemo(() => validateROIInputs(inputs), [inputs]);

  // Get plan cost (default to Business plan if not specified)
  const planCost = useMemo(() => {
    // Logic to get plan cost from planId or default
    return 500000; // Example: Business plan
  }, [planId]);

  // Calculate ROI
  const results = useMemo(() => {
    if (!isValid) return null;
    return calculateROI(inputs, planCost);
  }, [inputs, planCost, isValid]);

  return { results, errors, isValid };
}
```

---

## 10. PricingFAQ

**Location**: `src/components/tarifs/PricingFAQ.tsx`

### Props

```typescript
export interface PricingFAQProps {
  /** Optional title override */
  title?: string;

  /** Filter by category (optional) */
  category?: FAQCategory;

  /** Initially expanded FAQ item index (optional) */
  defaultExpanded?: number;

  /** Additional CSS classes */
  className?: string;
}
```

### Implementation

```typescript
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { faqEntries } from '@/lib/pricing-data';

function PricingFAQ({ title, category, defaultExpanded }: PricingFAQProps) {
  const filteredFAQs = category
    ? faqEntries.filter(faq => faq.category === category)
    : faqEntries;

  return (
    <section className="pricing-faq">
      <h2>{title ?? 'Questions fréquentes'}</h2>

      <Accordion type="single" collapsible defaultValue={`item-${defaultExpanded ?? 0}`}>
        {filteredFAQs.map((faq, index) => (
          <AccordionItem key={faq.id} value={`item-${index}`}>
            <AccordionTrigger>
              <h3>{faq.question}</h3>
            </AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

---

## 11. PricingCTA

**Location**: `src/components/tarifs/PricingCTA.tsx`

### Props

```typescript
export interface PricingCTAProps {
  /** Optional title override */
  title?: string;

  /** Optional description override */
  description?: string;

  /** Primary CTA text */
  primaryCtaText?: string;

  /** Primary CTA href */
  primaryCtaHref?: string;

  /** Secondary CTA text */
  secondaryCtaText?: string;

  /** Secondary CTA href */
  secondaryCtaHref?: string;

  /** Callbacks for analytics */
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;

  /** Additional CSS classes */
  className?: string;
}
```

---

## 12. FormattedPrice (Shared Utility Component)

**Location**: `src/components/shared/FormattedPrice.tsx`

### Props

```typescript
export interface FormattedPriceProps {
  /** Price value in FCFA */
  value: number;

  /** Locale for formatting (default: 'es-CI') */
  locale?: CurrencyLocale;

  /** Display mode: full currency or symbol only */
  displayMode?: 'full' | 'symbol';

  /** Additional CSS classes */
  className?: string;

  /** Accessibility: Announce currency to screen readers */
  'aria-label'?: string;
}
```

### Implementation

```typescript
import { formatFCFA } from '@/lib/currency-formatter';

export function FormattedPrice({
  value,
  locale = 'es-CI',
  displayMode = 'full',
  className,
  'aria-label': ariaLabel,
}: FormattedPriceProps) {
  const formatted = formatFCFA(value, locale);

  return (
    <span
      className={cn('formatted-price', className)}
      aria-label={ariaLabel ?? `Prix : ${formatted}`}
    >
      {formatted}
    </span>
  );
}
```

---

## Main Page Composition

**Location**: `app/tarifs/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import type { DeploymentModel, BillingPeriod } from '@/types/pricing';

export default function TarifsPage() {
  const [deploymentModel, setDeploymentModel] = useState<DeploymentModel>('cloud');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <main className="tarifs-page">
      <PricingHero />

      <div className="toggles-container">
        <DeploymentToggle
          value={deploymentModel}
          onChange={setDeploymentModel}
        />

        {deploymentModel === 'cloud' && (
          <BillingToggle
            value={billingPeriod}
            onChange={setBillingPeriod}
          />
        )}
      </div>

      {deploymentModel === 'cloud' ? (
        <CloudPricingGrid billingPeriod={billingPeriod} />
      ) : (
        <OnPremiseSection />
      )}

      <AddonsSection />
      <ComparisonTable />
      <ROICalculator />
      <PricingFAQ />
      <PricingCTA />
    </main>
  );
}
```

---

## Event Tracking Contract

All analytics events should follow this structure:

```typescript
interface PricingPageEvent {
  event: 'pricing_interaction';
  category: 'pricing';
  action:
    | 'toggle_deployment'
    | 'toggle_billing'
    | 'select_plan'
    | 'calculate_roi'
    | 'expand_faq'
    | 'click_cta';
  label: string; // Specific item (plan name, faq id, etc.)
  value?: number; // Optional numeric value (price, roi result, etc.)
}

// Example usage
function trackPricingEvent(action: string, label: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pricing_interaction', {
      category: 'pricing',
      action,
      label,
      value,
    });
  }
}
```

---

## Contract Guarantees

1. **Props Immutability**: All data props are read-only
2. **Type Safety**: All components are fully typed with TypeScript
3. **Accessibility**: All interactive components support keyboard navigation and screen readers
4. **Responsiveness**: Components adapt to mobile/tablet/desktop viewports
5. **Performance**: ROI calculations complete in < 50ms
6. **Error Boundaries**: Invalid data handled gracefully with fallbacks

---

**Status**: Ready for implementation  
**Dependencies**: Requires types and data from contracts completed first
