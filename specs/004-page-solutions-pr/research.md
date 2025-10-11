# Research: Page Solutions - Technical Decisions

**Feature**: Page Solutions - Secteurs d'Activité  
**Date**: 2025-10-09  
**Status**: Completed

## Overview

This document captures research findings and technical decisions for implementing the `/solutions` page, which showcases how GAMR adapts to 5 industry sectors with their specific regulatory frameworks.

---

## Decision 1: Component Architecture Pattern

### Decision

Use a reusable `SolutionCard` component with prop-based configuration for the 5 sector sections, following the existing pattern from the `/fonctionnalites` page (`FeatureCard` component).

### Rationale

- **Consistency**: The codebase already demonstrates this pattern with `FeatureCard.tsx` (visible in both `src/components/fonctionnalites/` and `src/components/shared/`)
- **Maintainability**: Single component to update styling and structure across all 5 sectors
- **Type Safety**: Props interface ensures all required data (normes, defis, solutions) is provided
- **Performance**: Single component definition reduces bundle size compared to 5 separate components
- **Accessibility**: Centralizes accessibility implementation (ARIA labels, semantic HTML) in one place

### Alternatives Considered

1. **5 separate sector components** (ExtractiveSection, AirportSection, etc.)
   - Rejected: Duplicate code, harder to maintain consistency, larger bundle size
   - Only justified if sectors have radically different layouts (they don't per spec)

2. **Generic `Card` component with slot-based content**
   - Rejected: Over-abstraction for this use case, loses type safety on sector-specific fields
   - Better suited for highly variable content (not applicable here)

### Implementation Notes

```typescript
// SolutionCard interface (from contracts/components.md)
interface SolutionCardProps {
  id: string;
  title: string;
  icon: string | React.ReactNode;
  normes: string[];
  defis: string[];
  solutions: string[];
  variant?: 'default' | 'highlighted';
}
```

---

## Decision 2: Responsive Table Strategy

### Decision

Implement a horizontally scrollable table on mobile with sticky first column, transforming into a full-width table on tablet+ viewports.

### Rationale

- **Usability**: Preserves table structure (easier to scan than card transformation)
- **Data Integrity**: All 3 columns (Secteur, Normes clés, Modules GAMR) remain visible in same row
- **Accessibility**: Native `<table>` semantics work with screen readers (WCAG 2.1 AA requirement)
- **Performance**: CSS-only solution (`overflow-x: auto`) without JavaScript
- **Pattern Recognition**: Users understand horizontal scroll on mobile (common UX pattern)

### Alternatives Considered

1. **Card transformation** (table → stacked cards on mobile)
   - Rejected: Breaks comparative view (requires scrolling between cards to compare sectors)
   - Spec emphasizes comparative function: "permettant la comparaison rapide" (FR-014)
2. **Accordion pattern** (collapsible rows)
   - Rejected: Requires JavaScript, adds interaction complexity, hides data by default
   - Conflicts with "en un coup d'œil" requirement from user story

3. **Vertical table** (transposed: sectors as columns, attributes as rows)
   - Rejected: Awkward on desktop, loses semantic structure, harder to implement responsively

### Implementation Notes

```css
/* Mobile: Horizontal scroll */
@media (max-width: 768px) {
  .comparison-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .comparison-table th:first-child,
  .comparison-table td:first-child {
    position: sticky;
    left: 0;
    background: white;
    z-index: 1;
  }
}
```

---

## Decision 3: Icon System

### Decision

Use Lucide React for UI icons (arrows, chevrons in CTAs) and custom SVG illustrations for sector-specific imagery.

### Rationale

- **Existing Pattern**: Project already uses Lucide React (visible in constitution: "Lucide React pour les icônes")
- **Consistency**: Maintains icon library used throughout site (homepage, fonctionnalites page)
- **Flexibility**: Custom SVGs for sectors allow unique, branded illustrations
- **Performance**: Lucide icons are tree-shakeable; custom SVGs optimized and inlined
- **Accessibility**: Both support accessible patterns (role="img", aria-label)

### Alternatives Considered

1. **React Icons library**
   - Rejected: Different from existing project standard (Lucide), increases bundle size
2. **Icon fonts (Font Awesome, etc.)**
   - Rejected: Accessibility issues, FOIT/FOUT loading problems, constitution emphasizes performance

3. **Image files (PNG/JPG) for sector icons**
   - Rejected: Larger file sizes, no styling flexibility, doesn't scale cleanly

### Implementation Notes

```tsx
// Lucide icons for UI elements
import { ArrowRight, Check } from 'lucide-react';

// Custom SVG for sector icons (exported from design tools)
// Stored in: public/images/solutions/[sector].svg
// Loaded via next/image for optimization

// Fallback strategy for loading failures (FR edge case)
const SectorIcon = ({ src, alt }) => (
  <Image src={src} alt={alt} width={80} height={80} onError={() => setIconError(true)} />
);
{
  iconError && (
    <span className="icon-fallback" aria-label={alt}>
      🏢
    </span>
  );
}
```

---

## Decision 4: JSON Export Strategy

### Decision

Export a static constant `industries` array from `/app/solutions/page.tsx` (not a separate API route or data file).

### Rationale

- **Simplicity**: FR-018 requires exportable JSON but doesn't specify external consumption
- **Co-location**: Data lives with component that renders it (easier maintenance)
- **Type Safety**: TypeScript ensures structure matches `Industry` type
- **Performance**: No runtime fetch, data bundled with page at build time (SSG)
- **Future-Proof**: If API needed later, easy to extract to `lib/solutions-data.ts`

### Alternatives Considered

1. **Separate data file** (`lib/solutions-data.ts`)
   - Pros: Clean separation of data and presentation
   - Cons: Over-engineering for current requirements, adds import overhead
   - **Decision**: Start with co-location, refactor if data is reused elsewhere

2. **API route** (`/api/solutions`)
   - Rejected: Unnecessary server overhead for static data, conflicts with SSG strategy
   - Only justified if data changes frequently or needs server-side auth

3. **CMS/headless solution** (Contentful, Strapi)
   - Rejected: Overkill for 5 static sectors, adds deployment complexity
   - Spec content is verbatim and unlikely to change frequently

### Implementation Notes

```typescript
// app/solutions/page.tsx
export const industries: Industry[] = [
  {
    id: 'extractive',
    nom: 'Industrie extractive (mines, pétrole, gaz)',
    normes: ['ISO 14001', 'ISO 45001', 'IFC Performance Standards'],
    defis: [
      'Gestion des risques environnementaux',
      'Conformité ESG',
      'Suivi des incidents terrain',
    ],
    solutions: [
      'Cartographie des risques environnementaux et sociaux',
      "Suivi automatique des plans d'action HSE",
      'Reporting ESG consolidé et exportable',
    ],
    icone: '/images/solutions/extractive.svg',
  },
  // ... 4 autres secteurs
];
```

---

## Decision 5: Anchor Navigation Implementation

### Decision

Use standard HTML `id` attributes on section elements with CSS `scroll-behavior: smooth` for anchor navigation (e.g., `/solutions#bancaire`).

### Rationale

- **Simplicity**: Native HTML feature, zero JavaScript required
- **Accessibility**: Works with assistive technologies out of the box
- **SEO**: Search engines understand anchor links for deep linking
- **Performance**: No bundle overhead, instant navigation
- **Spec Requirement**: FR-019 explicitly requires anchor support

### Alternatives Considered

1. **JavaScript smooth scroll library** (react-scroll, react-anchor-link-smooth-scroll)
   - Rejected: Unnecessary dependency, constitution emphasizes minimal bundles
   - CSS `scroll-behavior` provides equivalent UX with native support

2. **Hash routing with React Router**
   - Rejected: Next.js app directory doesn't use React Router
   - Over-complicates what HTML already handles natively

3. **Intersection Observer + programmatic scroll**
   - Rejected: Complex for simple use case, only needed for advanced effects (parallax, etc.)
   - Spec doesn't require scroll-spy or navigation highlighting

### Implementation Notes

```tsx
// Section component with anchor
<section id="secteur-bancaire" className="scroll-mt-20">
  <h2>Secteur bancaire et financier</h2>
  {/* ... content */}
</section>

// CSS (globals.css)
html {
  scroll-behavior: smooth;
}

// Respect reduced motion preference (constitution requirement)
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

// CTA link to anchor
<a href="/solutions#secteur-bancaire">Voir le secteur bancaire</a>
```

---

## Decision 6: Hero Section CTA Navigation

### Decision

Implement CTAs as Next.js `<Link>` components with `href` prop for client-side navigation, maintaining referrer and analytics context.

### Rationale

- **Performance**: Next.js Link preloads destination pages on hover
- **User Experience**: Instant navigation without full page reload
- **Analytics**: Preserves navigation chain for tracking user journeys (SC-002: CTA click rate measurement)
- **SEO**: Crawlable links for search engines
- **Constitution**: Aligns with performance excellence principle (TTI < 3s)

### Alternatives Considered

1. **Standard `<a>` tags**
   - Rejected: Full page reload, loses preload optimization
   - Only use case: External links (e.g., demo form on different domain)

2. **Button with onClick handler**
   - Rejected: Breaks middle-click/new-tab behavior, not semantic HTML
   - Fails A11Y-001 keyboard navigation requirement

### Implementation Notes

```tsx
import Link from 'next/link';
import { CTAButton } from '@/components/shared/CTAButton';

// Primary CTA
<Link href="/fonctionnalites">
  <CTAButton variant="primary">
    Découvrir les fonctionnalités
  </CTAButton>
</Link>

// Secondary CTA
<Link href="/demo"> {/* Or wherever demo form lives */}
  <CTAButton variant="secondary">
    Demander une démo
  </CTAButton>
</Link>
```

---

## Decision 7: Layout Shift Prevention Strategy

### Decision

Define explicit width/height for all images and reserve space for content sections during load to meet CLS < 0.1 requirement (PERF-003).

### Rationale

- **Constitution Requirement**: CLS < 0.1 is non-negotiable (Principle I)
- **User Experience**: Prevents frustrating content jumps during page load
- **Mobile Critical**: Most impactful on slower connections where images load progressively
- **Core Web Vital**: CLS directly impacts SEO rankings

### Implementation Notes

```tsx
// Sector icons with explicit dimensions
<Image
  src={industry.icone}
  alt={`Icône ${industry.nom}`}
  width={80}
  height={80}
  priority={false} // Hero only, lazy load others
/>

// Reserve space for sections with min-height
.solution-card {
  min-height: 400px; /* Prevents collapse during load */
}

// Skeleton screens for progressive enhancement (optional enhancement)
{loading && <SolutionCardSkeleton />}
```

---

## Decision 8: Test Strategy

### Decision

Implement 3-tier testing: unit tests for isolated components (Vitest), visual regression for layout (Playwright), and user flow e2e tests (Playwright).

### Rationale

- **Constitution Requirement**: Critical paths require 90%+ coverage
- **Spec Requirements**: Success criteria SC-007 (95% browser compat) and SC-008 (zero WCAG errors)
- **Risk Mitigation**: Responsive table and 5 sector cards have high visual complexity
- **Existing Pattern**: Project already has Playwright setup (homepage-visual.spec.ts, fonctionnalites.spec.ts)

### Test Coverage Plan

**Unit Tests** (Vitest):

- `SolutionCard.test.tsx`: Props rendering, normes list display, accessibility attributes
- `ComparisonTable.test.tsx`: Table structure, sticky column behavior, responsive classes
- `lib/solutions-data.test.ts`: JSON structure validation against types

**Visual Regression** (Playwright):

- Desktop viewport (1920x1080): Full page screenshot comparison
- Tablet viewport (768x1024): Verify responsive breakpoint
- Mobile viewport (375x667): Horizontal scroll table, stacked cards
- Theme variants: Light mode (only mode per constitution)

**E2e User Flows** (Playwright):

1. Hero CTA navigation → /fonctionnalites (FR-003)
2. Anchor navigation → /solutions#secteur-bancaire (FR-019)
3. Final CTA conversion → Demo page (FR-015)
4. Keyboard navigation through all interactive elements (A11Y-001)
5. Screen reader announcement testing (A11Y-007)

### Implementation Notes

```typescript
// tests/e2e/solutions.spec.ts
test('User can navigate to sector via anchor link', async ({ page }) => {
  await page.goto('/solutions');
  await page.click('a[href="#secteur-bancaire"]');
  await expect(page.locator('#secteur-bancaire')).toBeInViewport();
});

test('Comparison table is horizontally scrollable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  const table = page.locator('.comparison-table-wrapper');
  await expect(table).toHaveCSS('overflow-x', 'auto');
});
```

---

## Technology Choices Summary

| Area              | Technology                | Justification                                                |
| ----------------- | ------------------------- | ------------------------------------------------------------ |
| Framework         | Next.js 14 App Router     | Existing project standard, SSG support, optimal performance  |
| Styling           | Tailwind CSS              | Constitution standard, mobile-first utilities, design tokens |
| Icons             | Lucide React + Custom SVG | Constitution standard, tree-shakeable, brand flexibility     |
| Type Safety       | TypeScript 5+ Strict      | Constitution requirement, catch bugs at compile time         |
| Testing           | Vitest + Playwright       | Existing project setup, comprehensive coverage               |
| Component Pattern | Reusable SolutionCard     | Existing pattern from FeatureCard, maintainable              |
| Table Strategy    | Horizontal Scroll Mobile  | Preserves comparison UX, native semantics, accessible        |
| Navigation        | HTML Anchor + CSS         | Native, accessible, performant, SEO-friendly                 |
| Data Strategy     | Co-located Static Export  | Simple, type-safe, sufficient for static content             |

---

## Risks & Mitigations

### Risk 1: Horizontal scroll table on mobile not discoverable

**Likelihood**: Medium  
**Impact**: Medium (affects UX for mobile users ~60% of traffic)  
**Mitigation**:

- Add subtle scroll indicator (fade gradient on right edge)
- Touch-friendly scroll (CSS `-webkit-overflow-scrolling: touch`)
- E2e test to verify scrollability (implemented)

### Risk 2: Custom sector SVG icons increase bundle size

**Likelihood**: Low  
**Impact**: Medium (affects performance goals)  
**Mitigation**:

- Optimize SVGs before commit (SVGO tool)
- Lazy load icons below fold (Next.js Image priority=false)
- Monitor bundle size in CI (Lighthouse CI)
- Constitution allows performance budget management

### Risk 3: Anchor navigation conflicts with sticky header

**Likelihood**: High (common issue with fixed headers)  
**Impact**: Low (cosmetic, CTA target hidden behind header)  
**Mitigation**:

- Use `scroll-margin-top` CSS property on section elements
- Set offset equal to header height (typically 80px)
- Test across viewports (header height may vary mobile vs desktop)

```css
section[id] {
  scroll-margin-top: 5rem; /* Header height + padding */
}
```

---

## Open Questions (NONE)

All technical decisions have been resolved. No NEEDS CLARIFICATION items remain from Technical Context section in plan.md.

---

## References

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [WCAG 2.1 Table Accessibility](https://www.w3.org/WAI/tutorials/tables/)
- [MDN: CSS scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [Web.dev: CLS Optimization](https://web.dev/cls/)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)

---

**Status**: ✅ All research complete. Ready for Phase 1 (Data Model & Contracts).
