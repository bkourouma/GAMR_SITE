# Component Contracts: Page Fonctionnalités

**Feature**: Page Fonctionnalités  
**Date**: 2025-10-09  
**Status**: ✅ Complete

## Overview

This document defines the interface contracts (props, events, accessibility) for all components in the features page. Contracts ensure consistency, type safety, and testability.

---

## Page-Level Component

### `FonctionnalitesPage`

Main page component rendering all sections.

**File**: `src/app/fonctionnalites/page.tsx`

**Props**: None (Next.js App Router page)

**Metadata Export**:

```typescript
export const metadata: Metadata = {
  title: 'Fonctionnalités GAMR | Plateforme de Gestion des Risques', // SEO-001
  description:
    'Découvrez les fonctionnalités de GAMR : cartographie des menaces, évaluation automatisée, indicateurs de performance, rapports intelligents. Simplifiez la gestion de vos risques.', // SEO-002
  openGraph: {
    title: 'Fonctionnalités GAMR',
    description: 'Cartographie, évaluation automatisée, et pilotage complet de vos risques',
    images: ['/og-image-fonctionnalites.png'],
    url: 'https://[domain]/fonctionnalites',
  },
};
```

**Structure**:

```tsx
export default function FonctionnalitesPage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <OverviewSection />
      <FeaturesGrid />
      <ComparisonTable />
      <ASPCIPartnerSection />
      <ConversionCTA />
    </main>
  );
}
```

**Accessibility**:

- `<main>` landmark for primary content
- Each section has unique `id` for anchor navigation
- Logical heading hierarchy (h1 in hero, h2 for sections)

---

## Section Components

### `HeroSection`

Hero section with headline and dual CTAs (FR-001).

**File**: `src/components/fonctionnalites/HeroSection.tsx`

**Props**:

```typescript
interface HeroSectionProps {
  className?: string; // Optional styling override
}
```

**Content** (hardcoded per spec):

- **Title (h1)**: "Toutes vos analyses de risques, réunies dans une seule plateforme"
- **Subtitle**: "De la cartographie à la décision, GAMR automatise et simplifie la gestion des menaces et des risques."
- **Primary CTA**: "Demander une démo" (links to `/demo` or contact form)
- **Secondary CTA**: "Essayer gratuitement" (links to `/trial` or signup)

**Events**:

```typescript
type CTAClickEvent = {
  action: 'demo_request' | 'trial_signup';
  location: 'hero';
};

// Analytics tracking
onClick={() => trackEvent({ action: 'demo_request', location: 'hero' })}
```

**Accessibility**:

- `<section aria-labelledby="hero-title">`
- Primary CTA has visual prominence (solid button + icon)
- Secondary CTA is outline button
- Both buttons keyboard accessible (Tab, Enter)

**Example**:

```tsx
<HeroSection />
```

---

### `OverviewSection`

Brief introduction with platform mockup (FR-002).

**File**: `src/components/fonctionnalites/OverviewSection.tsx`

**Props**:

```typescript
interface OverviewSectionProps {
  className?: string;
}
```

**Content**:

- **Intro text**: 2-3 sentences explaining centralization benefit
- **Image**: Platform mockup (Next.js Image with priority for LCP)

**Image Requirements**:

- **Source**: `/images/fonctionnalites/platform-overview.png`
- **Alt text**: "Interface de la plateforme GAMR montrant le tableau de bord de gestion des risques"
- **Dimensions**: 1200x800px (16:9 aspect ratio)
- **Loading**: `priority` (above fold, LCP target)

**Accessibility**:

- `<section aria-labelledby="overview-title">`
- Image has descriptive alt text (A11Y-003)
- Text-image layout responsive (stack on mobile)

**Example**:

```tsx
<OverviewSection />
```

---

### `FeaturesGrid`

Grid of 7 feature cards in 4-3 layout (FR-003, FR-004).

**File**: `src/components/fonctionnalites/FeaturesGrid.tsx`

**Props**:

```typescript
interface FeaturesGridProps {
  features?: Feature[]; // Default: FEATURES_DATA.main
  className?: string;
}
```

**Layout**:

- Desktop (≥1024px): 4 columns first row, 3 columns second row
- Tablet (640-1023px): 2 columns (3-3-1 layout)
- Mobile (<640px): 1 column stack

**Grid CSS**:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature) => (
    <FeatureCard key={feature.key} {...feature} />
  ))}
</div>
```

**Accessibility**:

- `<section aria-labelledby="features-title">`
- Grid maintains reading order (row-by-row)
- Each card is focusable and keyboard navigable

**Example**:

```tsx
<FeaturesGrid />
// OR with custom features
<FeaturesGrid features={customFeatures} />
```

---

### `FeatureCard`

Individual feature card with icon, title, description, and tooltip (FR-003).

**File**: `src/components/fonctionnalites/FeatureCard.tsx`

**Props**:

```typescript
interface FeatureCardProps extends Feature {
  // Inherits: key, title, description, benefitsText, icon, order, category
  className?: string;
  onClick?: () => void; // Optional interaction tracking
}
```

**Structure**:

```tsx
<Card className="flex flex-col p-6 min-h-[280px]">
  <div className="mb-4">
    <Icon name={icon} className="h-12 w-12 text-blue-600" />
  </div>
  <h3 className="text-xl font-semibold mb-3">
    <TermWithTooltip term={title} />
  </h3>
  <p className="text-gray-600 mb-4">{description}</p>
  <p className="text-sm text-gray-500 mt-auto">{benefitsText}</p>
</Card>
```

**Styling**:

- **Min height**: 280px (prevents CLS, equal card heights)
- **Padding**: 24px (p-6)
- **Gap**: 24px between cards (gap-6 in grid)
- **Hover**: Subtle lift effect (shadow-lg on hover)

**Accessibility**:

- `<article>` or `<Card>` (semantic card component)
- Icon has `aria-hidden="true"` (decorative)
- Title has tooltip for technical terms
- Card focusable if interactive

**Example**:

```tsx
<FeatureCard
  key="cartographie-menaces"
  title="Cartographie des menaces"
  description="Visualisez tous vos risques..."
  benefitsText="Identifiez en un coup d'œil..."
  icon="Map"
  order={1}
  category="main"
/>
```

---

### `ComparisonTable`

Before/After comparison table with 8-10 rows (FR-005, FR-006).

**File**: `src/components/fonctionnalites/ComparisonTable.tsx`

**Props**:

```typescript
interface ComparisonTableProps {
  data?: ComparisonItem[]; // Default: comparisonData
  className?: string;
}
```

**Table Structure**:

```tsx
<table className="w-full border-collapse">
  <caption className="sr-only">Comparaison de la gestion des risques avant et après GAMR</caption>
  <thead>
    <tr>
      <th scope="col">Dimension</th>
      <th scope="col">Avant GAMR</th>
      <th scope="col">Avec GAMR</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item.dimension}>
        <td className="font-semibold">{item.dimension}</td>
        <td>
          <span className="text-red-600" aria-label="Inconvénient">
            ❌
          </span>
          {item.situationBefore}
        </td>
        <td>
          <span className="text-green-600" aria-label="Avantage">
            ✅
          </span>
          {item.situationWithGAMR}
          {item.improvementMetric && (
            <span className="ml-2 font-bold">{item.improvementMetric}</span>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

**Responsive Behavior**:

- Desktop: Standard 3-column table
- Mobile: Each row becomes a stacked card (CSS transforms)

**Accessibility**:

- `<caption>` for screen readers (SR-only)
- `scope="col"` on headers
- Emoji icons have `aria-label` (not just decorative)
- Color not sole indicator (icons + text)

**Example**:

```tsx
<ComparisonTable />
// OR with custom data
<ComparisonTable data={customComparisonData} />
```

---

### `ASPCIPartnerSection`

Partner credibility section with text and visual (FR-007, FR-008).

**File**: `src/components/fonctionnalites/ASPCIPartnerSection.tsx`

**Props**:

```typescript
interface ASPCIPartnerSectionProps {
  className?: string;
}
```

**Content** (hardcoded per spec):

- **Title**: "ASPCI, un partenaire de confiance"
- **Text**: "Depuis plus d'une dizaine d'années, ASPCI assure l'assistance et la formation des agents des Ports d'Abidjan et de San-Pedro ainsi que de nombreuses multinationales notamment dans l'industrie extractive en Côte d'Ivoire et dans d'autres pays de la sous-région."
- **Image**: `/images/fonctionnalites/aspci-partnership.jpg`

**Layout**:

- Text + image side-by-side (desktop)
- Stacked (mobile)

**Accessibility**:

- `<section aria-labelledby="aspci-title">`
- Image alt: "Logo ASPCI et collaboration avec GAMR"
- `role="complementary"` (supporting credibility content)

**Example**:

```tsx
<ASPCIPartnerSection />
```

---

### `ConversionCTA`

Final conversion section with dual CTAs (FR-009).

**File**: `src/components/fonctionnalites/ConversionCTA.tsx`

**Props**:

```typescript
interface ConversionCTAProps {
  className?: string;
}
```

**Content** (hardcoded per spec):

- **Headline**: "Adoptez la méthodologie GAMR dès aujourd'hui"
- **Primary CTA**: "Demander une démo"
- **Secondary CTA**: "Essai gratuit 30 jours"

**Events**:

```typescript
type CTAClickEvent = {
  action: 'demo_request' | 'trial_signup';
  location: 'final_cta';
};
```

**Styling**:

- Centered layout with gradient background
- Large CTAs with generous padding
- High contrast for visibility

**Accessibility**:

- `<section role="region" aria-labelledby="cta-title">`
- CTAs maintain keyboard accessibility
- Focus visible on tab navigation

**Example**:

```tsx
<ConversionCTA />
```

---

## Shared Components

### `TermWithTooltip`

Reusable component for wrapping technical terms with tooltips (FR-011b).

**File**: `src/components/shared/TermWithTooltip.tsx`

**Props**:

```typescript
interface TermWithTooltipProps {
  term: string; // Technical term to display and lookup
  children?: ReactNode; // Optional: custom display text
  definition?: string; // Optional: override default definition
  className?: string; // Optional: styling for trigger
}
```

**Behavior**:

- Looks up `term` in `tooltipDefinitions` dictionary
- If `definition` prop provided, uses that instead of lookup
- Renders term with dotted underline (cursor: help)
- Tooltip appears on hover (desktop), tap (mobile), focus (keyboard)

**Accessibility** (A11Y-008):

- Trigger: `<span tabIndex={0}` (keyboard focusable)
- Tooltip: `role="tooltip"`, `aria-describedby` links trigger to content
- Keyboard: Enter/Space to open, Esc to close

**Example**:

```tsx
// Automatic lookup
<TermWithTooltip term="GAMR" />
// Renders: GAMR (with tooltip showing definition from dictionary)

// Custom display
<TermWithTooltip term="GAMR">
  la méthodologie GAMR
</TermWithTooltip>
// Renders: "la méthodologie GAMR" (with GAMR tooltip)

// Override definition
<TermWithTooltip term="heatmap" definition="Custom definition here">
  heatmap
</TermWithTooltip>
```

**Implementation** (shadcn/ui Tooltip):

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { tooltipDefinitions } from '@/lib/tooltip-definitions';

export function TermWithTooltip({ term, children, definition, className }: TermWithTooltipProps) {
  const def = definition || tooltipDefinitions[term]?.definition;

  if (!def) {
    // Fallback: no tooltip if definition not found
    return <span className={className}>{children || term}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              'underline decoration-dotted cursor-help focus:outline-none focus:ring-2 focus:ring-blue-500',
              className
            )}
            tabIndex={0}
          >
            {children || term}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{def}</p>
          {tooltipDefinitions[term]?.context && (
            <p className="text-xs text-muted-foreground mt-1">{tooltipDefinitions[term].context}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

---

## Event Contracts

### Analytics Events

All CTAs and interactions should fire analytics events:

```typescript
// Event type definition
type AnalyticsEvent =
  | { event: 'cta_click'; action: 'demo_request' | 'trial_signup'; location: 'hero' | 'final_cta' }
  | { event: 'feature_view'; featureKey: string; method: 'scroll' | 'click' }
  | { event: 'comparison_view' }
  | { event: 'aspci_section_view' }
  | { event: 'tooltip_open'; term: string };

// Analytics utility
function trackEvent(event: AnalyticsEvent): void {
  // Google Analytics 4 or similar
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.event, event);
  }
}
```

**Usage**:

```tsx
<Button
  onClick={() => {
    trackEvent({ event: 'cta_click', action: 'demo_request', location: 'hero' });
    router.push('/demo');
  }}
>
  Demander une démo
</Button>
```

---

## Testing Contracts

### Unit Test Requirements

Each component must have tests verifying:

```typescript
// Example for FeatureCard
describe('FeatureCard', () => {
  it('renders feature title, description, and benefits', () => {
    const feature = FEATURES_DATA.main[0];
    render(<FeatureCard {...feature} />);
    expect(screen.getByText(feature.title)).toBeInTheDocument();
    expect(screen.getByText(feature.description)).toBeInTheDocument();
  });

  it('renders icon with correct aria-hidden', () => {
    const feature = FEATURES_DATA.main[0];
    render(<FeatureCard {...feature} />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('displays tooltip on term hover', async () => {
    const feature = FEATURES_DATA.main[0];
    render(<FeatureCard {...feature} />);
    const term = screen.getByText(/cartographie/i);
    await userEvent.hover(term);
    expect(await screen.findByRole('tooltip')).toBeVisible();
  });
});
```

### E2E Test Requirements

```typescript
// Playwright test
test('user can navigate features and request demo', async ({ page }) => {
  await page.goto('/fonctionnalites');

  // Verify page load
  await expect(
    page.getByRole('heading', { name: /toutes vos analyses de risques/i })
  ).toBeVisible();

  // Verify features visible
  await expect(page.getByText('Cartographie des menaces')).toBeVisible();

  // Test tooltip interaction
  await page.getByText('GAMR').first().hover();
  await expect(page.getByRole('tooltip')).toBeVisible();

  // Test CTA click
  await page
    .getByRole('button', { name: /demander une démo/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/demo/);
});
```

---

## Performance Contracts

Components must adhere to performance budgets:

| Component           | Max Bundle Size | Max Render Time |
| ------------------- | --------------- | --------------- |
| HeroSection         | 8 KB            | < 50ms          |
| FeaturesGrid        | 25 KB           | < 100ms         |
| FeatureCard         | 3 KB            | < 16ms          |
| ComparisonTable     | 12 KB           | < 80ms          |
| ASPCIPartnerSection | 8 KB            | < 50ms          |
| ConversionCTA       | 6 KB            | < 50ms          |
| TermWithTooltip     | 5 KB (Radix)    | < 30ms          |

**Measurement**: Use React DevTools Profiler and bundle analyzer

---

## Accessibility Contract Summary

All components must satisfy:

- [ ] Semantic HTML (section, article, nav, etc.)
- [ ] ARIA labels where needed (complementary, landmarks)
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1
- [ ] Alt text on all images
- [ ] Screen reader tested
- [ ] No reliance on color alone
- [ ] Tooltips accessible (hover, focus, tap)

---

**Last Updated**: 2025-10-09  
**Next**: Generate `features-schema.md` and `tooltips.md`
