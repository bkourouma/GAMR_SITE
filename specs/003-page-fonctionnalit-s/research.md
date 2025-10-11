# Research & Technical Decisions: Page Fonctionnalités GAMR

**Feature**: Page Fonctionnalités  
**Date**: 2025-10-09  
**Status**: ✅ Complete

## Overview

This document captures all technical research and architectural decisions made during Phase 0 planning for the GAMR features page. Each decision includes context, alternatives considered, rationale, and implementation guidance.

---

## Decision 1: Tooltip Implementation Strategy

**Status**: ✅ Decided

**Context**: FR-011b requires tooltips for all technical terms (GAMR, cartographie, heatmaps, scoring). Must work on hover (desktop) and tap (mobile), support keyboard navigation (Tab + Enter/Esc), and be accessible to screen readers. A11Y-008 mandates aria-describedby or equivalent pattern.

**Options Considered**:

1. **Radix UI Tooltip** - Headless, accessible, built-in keyboard support
   - **Pros**: WCAG compliant out-of-box, handles hover/focus/touch automatically, small bundle (~3KB)
   - **Cons**: Requires additional dependency, learning curve for Radix primitives

2. **Custom CSS-only tooltip** - Pure CSS with `:hover` and `:focus`
   - **Pros**: Zero JavaScript, minimal bundle impact
   - **Cons**: Limited mobile support (no tap-to-reveal), difficult to make screen-reader friendly, positioning complexity

3. **Tippy.js** - Popular full-featured tooltip library
   - **Pros**: Rich features (animations, placement), good mobile support
   - **Cons**: Heavier bundle (~15KB), more than needed for simple definitions, not as accessibility-focused

4. **shadcn/ui Tooltip component** - Pre-built on Radix with Tailwind styling
   - **Pros**: Already integrated in project stack, matches design system, Radix accessibility benefits, copy-paste ready
   - **Cons**: None significant (ideal choice)

**Decision**: Use **shadcn/ui Tooltip component** (Radix UI under the hood)

**Rationale**:

- Already part of project's design system (shadcn/ui is referenced in assumptions)
- Provides Radix UI's accessibility features with zero config
- Consistent styling with existing components
- Handles all interaction modes (hover, focus, tap) automatically
- Built-in ARIA patterns (aria-describedby, role="tooltip")
- Minimal bundle addition since Radix primitives likely already in use

**Implementation Notes**:

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Usage pattern for technical terms
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-dotted cursor-help">GAMR</span>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <p>Gestion et Analyse Méthodique des Risques</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;

// Mobile: Radix handles tap-to-open automatically
// Keyboard: Tab to trigger, Enter/Space to open, Esc to close
// Screen reader: aria-describedby links trigger to content
```

**References**:

- [shadcn/ui Tooltip](https://ui.shadcn.com/docs/components/tooltip)
- [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
- [WCAG 2.1 tooltip patterns](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24)

---

## Decision 2: Feature Data Structure

**Status**: ✅ Decided

**Context**: FR-015 specifies nested JSON structure `{main: [...], secondary: [...]}`. Clarification confirmed category-based nesting. Need to balance type safety, extensibility, and export capability.

**Options Considered**:

1. **Plain JSON file** (e.g., `features.json`)
   - **Pros**: Standard format, easily exportable, tool-agnostic
   - **Cons**: No type checking at authoring time, requires separate TypeScript types, runtime validation needed

2. **TypeScript const with satisfies** - Type-safe constants
   - **Pros**: Compile-time type checking, IDE autocomplete, refactoring safety
   - **Cons**: Requires build step to export as JSON, slightly more complex authoring

3. **Hybrid: TypeScript const + JSON.stringify export**
   - **Pros**: Type safety during development, runtime JSON export via utility function
   - **Cons**: JSON export not automatic, developer must remember to regenerate

4. **Zod schema with TypeScript inference** - Runtime + compile-time validation
   - **Pros**: Single source of truth, runtime validation, TypeScript types inferred
   - **Cons**: Overkill for static data that doesn't come from external sources

**Decision**: **TypeScript const with `as const` assertion + type inference**

**Rationale**:

- Static marketing content doesn't need runtime validation (not user input)
- Type safety prevents errors during content authoring (typos in keys, missing required fields)
- `as const` provides literal type inference for better type narrowing
- Can export to JSON programmatically if needed (e.g., for API or static generation)
- Follows existing project patterns (stats.ts, testimonials.ts use similar approach)

**Implementation Notes**:

```typescript
// lib/features-data.ts
export const FEATURES_DATA = {
  main: [
    {
      key: 'cartographie-menaces',
      title: 'Cartographie des menaces',
      description: 'Visualisez tous vos risques par processus, projet ou entité.',
      benefitsText:
        'Identifiez rapidement les zones critiques nécessitant une attention immédiate.',
      icon: 'Map', // Lucide icon name
      order: 1,
    },
    // ... 6 more features
  ],
  secondary: [], // Reserved for future features
} as const;

export type Feature = (typeof FEATURES_DATA.main)[number];
export type FeaturesCollection = typeof FEATURES_DATA;

// Export JSON utility (if needed)
export function exportFeaturesJSON(): string {
  return JSON.stringify(FEATURES_DATA, null, 2);
}
```

**References**:

- [TypeScript const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
- Existing patterns: `src/lib/stats.ts`, `src/lib/testimonials.ts`

---

## Decision 3: Grid Layout System (4-3 Pattern)

**Status**: ✅ Decided

**Context**: FR-003 specifies 4 cards on first row, 3 cards on second row (desktop), stack vertically on mobile. Need responsive system that avoids excessive media queries and maintains equal card heights.

**Options Considered**:

1. **CSS Grid with `grid-template-columns: repeat(4, 1fr)`**
   - **Pros**: Native CSS, responsive with media queries, can control exact layout
   - **Cons**: Requires media query for mobile, manual breakpoint management

2. **Tailwind Grid utilities** - `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
   - **Pros**: Utility-first, mobile-first defaults, no custom CSS
   - **Cons**: Doesn't naturally create 4-3 pattern (would be 4-4 or 3-3-1)

3. **Flexbox with wrap** - `flex flex-wrap`
   - **Pros**: Simpler than grid for wrapping behavior
   - **Cons**: Harder to control exact 4-3 split, uneven last row spacing

4. **Grid with explicit rows** - `grid-cols-4` + `span-1` on row 2
   - **Pros**: Precise control, maintains equal heights, semantic
   - **Cons**: Slightly more complex markup, requires thinking in rows

**Decision**: **Tailwind CSS Grid with row-specific responsive classes**

**Rationale**:

- Tailwind's mobile-first approach aligns with constitution Principle IV
- Grid provides better height consistency than flexbox (all cards same height per row)
- Can achieve 4-3 pattern with: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Last 3 items automatically wrap to second row
- Single media query breakpoint (lg: 1024px) for desktop view
- Mobile stack (1 col) → Tablet (2 cols) → Desktop (4-3 pattern)

**Implementation Notes**:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {FEATURES_DATA.main.map((feature) => (
    <FeatureCard key={feature.key} {...feature} />
  ))}
</div>

// Mobile (< 640px): 1 column (stack)
// Tablet (640px-1023px): 2 columns (3-3-1 layout)
// Desktop (≥ 1024px): 4 columns first row, 3 wrap to second row
// Gap: 24px (gap-6) maintains breathing room without wasting space
```

**Accessibility & Performance Considerations**:

- Grid maintains logical reading order (row-by-row)
- Screen readers navigate cards in expected sequence
- Equal heights prevent CLS (Cumulative Layout Shift)
- Reserve space with `min-h-[280px]` on cards for image loading

**References**:

- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [CSS Grid auto-fit vs auto-fill](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)

---

## Decision 4: Comparison Table Pattern (8-10 Rows)

**Status**: ✅ Decided

**Context**: FR-005 requires 8-10 row comparison table "Avant GAMR" vs "Avec GAMR". Must remain scannable on mobile, semantically correct HTML, and accessible to screen readers.

**Options Considered**:

1. **Standard HTML `<table>`** - Semantic table element
   - **Pros**: Semantically correct, screen reader friendly, native table behaviors
   - **Cons**: Difficult to make responsive without JavaScript or complex CSS

2. **CSS Grid styled as table** - `display: grid` with role="table"
   - **Pros**: Easier responsive control, can stack on mobile
   - **Cons**: Requires ARIA roles to replicate table semantics

3. **Definition list** - `<dl>` with `<dt>` (dimension) and `<dd>` (before/after)
   - **Pros**: Semantically appropriate for key-value pairs
   - **Cons**: Doesn't convey "comparison" relationship as clearly

4. **Responsive table with card layout** - Table on desktop, card stack on mobile
   - **Pros**: Best of both worlds - semantics + mobile UX
   - **Cons**: More complex CSS, potential layout shift

**Decision**: **Responsive HTML `<table>` with card-style mobile layout**

**Rationale**:

- Semantic HTML (`<table>`, `<thead>`, `<tbody>`) is best for structured data
- Screen readers announce "table with 10 rows, 3 columns" automatically
- CSS can transform table to stacked cards on mobile without breaking semantics
- No ARIA hacks needed - native HTML provides correct accessibility
- Follows MDN best practices for responsive tables

**Implementation Notes**:

```tsx
// Desktop: Standard table
<table className="w-full border-collapse">
  <thead>
    <tr>
      <th className="text-left">Dimension</th>
      <th className="text-left">Avant GAMR</th>
      <th className="text-left">Avec GAMR</th>
    </tr>
  </thead>
  <tbody>
    {comparisonData.map((item) => (
      <tr key={item.dimension}>
        <td className="font-semibold">{item.dimension}</td>
        <td className="text-red-600">❌ {item.before}</td>
        <td className="text-green-600">✅ {item.after}</td>
      </tr>
    ))}
  </tbody>
</table>

// Mobile CSS: Stack each row as a card
@media (max-width: 640px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  thead { display: none; } // Hide column headers
  tr {
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  td::before {
    content: attr(data-label); // Use data attributes for column labels
    font-weight: bold;
    display: block;
  }
}
```

**Accessibility Enhancements**:

- Add `<caption>` for screen readers: "Comparison of risk management before and after GAMR"
- Use `scope="col"` on header cells
- Add `data-label` attributes for mobile card labels
- Ensure color contrast on red/green indicators (use icons + color)

**References**:

- [MDN: Responsive Tables](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [A11y Project: Accessible Tables](https://www.a11yproject.com/posts/how-to-write-accessible-tables/)

---

## Decision 5: Image Optimization Strategy

**Status**: ✅ Decided

**Context**: PERF-002 requires LCP < 2.5s. Page includes platform overview mockup and ASPCI partnership image. Need optimization strategy that balances quality and performance.

**Options Considered**:

1. **Standard `<img>` with manual optimization**
   - **Pros**: Simple, no framework dependency
   - **Cons**: No automatic format selection, manual responsive images, no lazy loading

2. **Next.js Image component** - `next/image`
   - **Pros**: Automatic format optimization (WebP/AVIF), responsive srcset, lazy loading, blur placeholder
   - **Cons**: Requires image in public/ or external URL, build-time optimization

3. **CDN-based image service** (e.g., Cloudinary, Imgix)
   - **Pros**: Dynamic resizing, format conversion, CDN delivery
   - **Cons**: External dependency, cost, latency for first request

4. **SVG placeholders + progressive loading**
   - **Pros**: Instant initial render, smooth transition
   - **Cons**: More complex implementation, larger HTML payload

**Decision**: **Next.js Image component with priority loading for above-fold images**

**Rationale**:

- Already integrated in Next.js project (zero additional setup)
- Automatic format negotiation (serves WebP to Chrome, AVIF to modern browsers, fallback to PNG/JPG)
- Built-in responsive image generation (1x, 2x, 3x for different screen densities)
- Lazy loading for below-fold images reduces initial page weight
- `priority` prop for platform overview (above fold) ensures LCP optimization
- Blur placeholder prevents CLS (layout shift) during image load

**Implementation Notes**:

```tsx
import Image from 'next/image';

// Platform overview (above fold) - prioritize for LCP
<Image
  src="/images/fonctionnalites/platform-overview.png"
  alt="Interface de la plateforme GAMR montrant le tableau de bord de gestion des risques"
  width={1200}
  height={800}
  priority // Preload for LCP optimization
  className="rounded-lg shadow-xl"
  placeholder="blur"
  blurDataURL="data:image/..." // Generate with plaiceholder or sharp
/>

// ASPCI partner image (below fold) - lazy load
<Image
  src="/images/fonctionnalites/aspci-partnership.jpg"
  alt="Logo ASPCI et collaboration avec GAMR"
  width={600}
  height={400}
  loading="lazy" // Default behavior, explicit for clarity
  className="rounded-md"
/>
```

**Optimization Checklist**:

- [ ] Source images ≥ 2x target display size for retina screens
- [ ] Compress PNGs with ImageOptim or similar (target: < 500KB)
- [ ] Use JPEGs for photos (80-85% quality), PNGs for screenshots with text
- [ ] Generate blur placeholders with `plaiceholder` or `@plaiceholder/next`
- [ ] Test LCP with Lighthouse CI after implementation
- [ ] Verify WebP/AVIF served in Network tab (Chrome DevTools)

**Performance Impact**:

- WebP: 25-35% smaller than PNG/JPEG
- AVIF: 40-50% smaller than PNG/JPEG (newer browsers)
- Blur placeholder: Eliminates CLS, improves perceived performance
- Lazy loading: Saves ~1-2MB initial page weight

**References**:

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev: Optimize LCP](https://web.dev/optimize-lcp/)
- [plaiceholder](https://plaiceholder.co/)

---

## Decision 6: CTA Button Hierarchy (Visual Design)

**Status**: ✅ Decided

**Context**: Clarification established "Demander une démo" as primary CTA, "Essayer gratuitement" as secondary. Need visual differentiation that doesn't rely solely on color (A11Y-004 color contrast + WCAG non-color indicators).

**Options Considered**:

1. **Color-only distinction** - Blue primary, outline secondary
   - **Pros**: Simple, common pattern
   - **Cons**: Violates WCAG for color-blind users (fails non-color indicator requirement)

2. **Size + color** - Larger primary, smaller secondary, different colors
   - **Pros**: Multiple visual cues
   - **Cons**: Breaks button consistency guidelines, awkward visual balance

3. **Solid vs. outline (ghost) with icons** - Primary solid, secondary outline, both with icons
   - **Pros**: Multiple indicators (fill, border, icon), maintains size consistency
   - **Cons**: Requires icon selection, slightly heavier bundle

4. **Solid vs. outline + label distinction** - Primary solid ("Primary action"), secondary outline ("Secondary")
   - **Pros**: Explicit labeling for screen readers
   - **Cons**: Verbose, cluttered UI

**Decision**: **Solid primary button + outline secondary button + directional icons**

**Rationale**:

- Visual distinction: Filled vs. stroke (perceivable without color)
- Color remains as reinforcement: Primary uses brand blue, secondary neutral
- Icons add semantic meaning: Arrow-right for primary (forward action), Calendar for demo
- Accessible: WCAG pass - multiple non-color indicators (fill, icon, size can be equal)
- Familiar pattern: Widely used in B2B SaaS (GitHub, Linear, Vercel)

**Implementation Notes**:

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

// Primary CTA
<Button size="lg" className="gap-2">
  Demander une démo
  <ArrowRight className="h-4 w-4" />
</Button>

// Secondary CTA
<Button size="lg" variant="outline" className="gap-2">
  <Calendar className="h-4 w-4" />
  Essayer gratuitement
</Button>

// Button styles (shadcn/ui variants)
// Primary (default): bg-blue-600 hover:bg-blue-700 text-white
// Outline (secondary): border-2 border-gray-300 hover:bg-gray-50 text-gray-700
```

**Accessibility Enhancements**:

- Color contrast: Blue primary meets 4.5:1 on white background
- Outline secondary: 3:1 border contrast + 4.5:1 text contrast
- Icons have aria-hidden="true" (decorative, text label is semantic)
- Keyboard: Both buttons receive focus indicator (ring-2 ring-offset-2)
- Screen readers: Announce "Demander une démo, button" (text label suffices)

**Visual Hierarchy Validation**:

- Primary: Solid fill draws eye first (Gestalt principles - figure/ground)
- Secondary: Outline feels "lighter," less attention-grabbing
- Spacing: 16px gap between buttons prevents accidental clicks
- Mobile: Buttons stack vertically, primary on top (reading order = priority)

**References**:

- [shadcn/ui Button](https://ui.shadcn.com/docs/components/button)
- [WCAG 2.1: Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
- [Material Design: Button Hierarchy](https://m3.material.io/components/buttons/overview)

---

## Decision 7: Performance Budget Allocation

**Status**: ✅ Decided

**Context**: PERF-005 requires Lighthouse > 90. Need to allocate JavaScript bundle budget to ensure features page (with tooltips, animations) doesn't exceed performance targets.

**Options Considered**:

1. **No explicit budget** - Trust framework defaults
   - **Pros**: Less planning overhead
   - **Cons**: Risk of bundle bloat, no early warning system

2. **Strict budget (< 150KB total JS)** - Aggressive constraint
   - **Pros**: Forces efficiency, guarantees performance
   - **Cons**: May require sacrificing features or heavy optimization work

3. **Moderate budget (< 250KB total JS)** - Balanced approach
   - **Pros**: Realistic for interactive page, room for growth
   - **Cons**: Still requires monitoring, not as aggressive

4. **Component-level budgets** - Granular control per component
   - **Pros**: Precise accountability, easier to identify bloat
   - **Cons**: Complex to maintain, overhead in tracking

**Decision**: **Moderate budget of < 250KB total JavaScript (parsed size) with component guidelines**

**Rationale**:

- 250KB parsed JS on 4G network ≈ 0.8s parse time (within TTI < 3s budget)
- Leaves headroom for framework overhead (Next.js ~80KB, React ~50KB)
- Allows tooltip library (Radix ~5KB), icons (~2KB per icon), animations (~3KB)
- Provides ~110KB for page-specific code (components, data, logic)
- Lighthouse typically penalizes JS > 300KB heavily (performance score drops below 90)

**Budget Breakdown**:

| Component              | Budget (KB) | Justification                                    |
| ---------------------- | ----------- | ------------------------------------------------ |
| Next.js runtime        | 80          | Framework overhead (amortized across pages)      |
| React + React DOM      | 45          | Core library (amortized)                         |
| shadcn/ui Tooltip      | 5           | Radix UI Tooltip primitive                       |
| Lucide Icons (7 icons) | 14          | Feature card icons (2KB × 7)                     |
| Page components        | 60          | FeaturesGrid, FeatureCard, ComparisonTable, etc. |
| Data files             | 15          | features-data.ts, comparison-data.ts, tooltips   |
| Animation library      | 10          | framer-motion or CSS animations (if needed)      |
| Analytics/tracking     | 10          | Google Analytics snippet                         |
| **Total**              | **239**     | Under 250KB budget ✅                            |
| **Contingency**        | 11          | Buffer for minor additions                       |

**Monitoring & Enforcement**:

- Add `size-limit` package to measure bundle size in CI
- Configure `.size-limit.json` with 250KB limit for `/fonctionnalites` route
- Webpack Bundle Analyzer in development to identify heavy imports
- Lighthouse CI fails if JS budget exceeded

**Implementation Notes**:

```json
// .size-limit.json
[
  {
    "path": ".next/static/chunks/app/fonctionnalites/*.js",
    "limit": "250 KB",
    "running": false
  }
]

// package.json
{
  "scripts": {
    "size": "size-limit",
    "analyze": "ANALYZE=true next build"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15.0.0",
    "size-limit": "^11.0.0",
    "@size-limit/preset-app": "^11.0.0"
  }
}
```

**Optimization Strategies (if budget exceeded)**:

1. Code split tooltips definitions (load on demand)
2. Replace Lucide icons with SVG sprites (lighter)
3. Lazy load below-fold components (ConversionCTA, ASPCISection)
4. Use CSS animations instead of JS animation library
5. Defer non-critical analytics scripts

**References**:

- [size-limit](https://github.com/ai/size-limit)
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Web.dev: JavaScript Performance](https://web.dev/articles/fast)

---

## Summary of Decisions

| #   | Decision                       | Status     | Impact           |
| --- | ------------------------------ | ---------- | ---------------- |
| 1   | shadcn/ui Tooltip (Radix)      | ✅ Decided | A11Y + mobile UX |
| 2   | TypeScript const (as const)    | ✅ Decided | Type safety      |
| 3   | Tailwind Grid (4-3 responsive) | ✅ Decided | Layout           |
| 4   | HTML table + responsive CSS    | ✅ Decided | A11Y + semantics |
| 5   | Next.js Image (priority)       | ✅ Decided | Performance/LCP  |
| 6   | Solid + outline + icons        | ✅ Decided | CTA hierarchy    |
| 7   | 250KB JS budget                | ✅ Decided | Performance gate |

**All research complete** ✅ - Ready to proceed to Phase 1 (Design Artifacts)

---

**Last Updated**: 2025-10-09  
**Next Phase**: Generate `data-model.md`, `contracts/`, `quickstart.md`
