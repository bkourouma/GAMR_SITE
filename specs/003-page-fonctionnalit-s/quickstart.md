# Developer Quickstart: Page Fonctionnalités

**Feature**: Page Fonctionnalités  
**Date**: 2025-10-09  
**Estimated Time**: 6-8 hours (experienced Next.js developer)

## Overview

Quick reference guide for implementing the GAMR features page. Follow this guide sequentially for fastest implementation path.

---

## Prerequisites

### Required Knowledge

- ✅ Next.js 15 App Router
- ✅ TypeScript (strict mode)
- ✅ React Server/Client Components
- ✅ Tailwind CSS
- ✅ shadcn/ui component patterns

### Verify Environment

```bash
# Check Node version (≥18.17)
node --version

# Check package manager
pnpm --version

# Verify dependencies installed
pnpm install

# Check dev server works
pnpm dev
```

### Review Documentation

Before starting, read:

1. [spec.md](./spec.md) - Feature requirements (10 min)
2. [research.md](./research.md) - Technical decisions (15 min)
3. [data-model.md](./data-model.md) - Data structures (10 min)
4. [contracts/components.md](./contracts/components.md) - Component interfaces (20 min)

**Total prep time**: ~55 minutes

---

## Implementation Checklist

### Phase 1: Setup (30 min)

#### 1.1 Verify shadcn/ui Tooltip (5 min)

```bash
# Check if Tooltip already installed
ls src/components/ui/tooltip.tsx

# If not found, install
npx shadcn-ui@latest add tooltip

# Verify import works
# src/components/ui/tooltip.tsx should exist
```

#### 1.2 Create Data Files (15 min)

```bash
# Create directories
mkdir -p src/lib
mkdir -p src/types

# Create feature data file
touch src/lib/features-data.ts

# Create comparison data file
touch src/lib/comparison-data.ts

# Create tooltip definitions file
touch src/lib/tooltip-definitions.ts

# Create types file
touch src/types/features.ts
```

**Copy content** from [data-model.md](./data-model.md) examples into respective files.

#### 1.3 Create Component Structure (10 min)

```bash
# Create feature directory
mkdir -p src/components/fonctionnalites

# Create components
touch src/components/fonctionnalites/HeroSection.tsx
touch src/components/fonctionnalites/OverviewSection.tsx
touch src/components/fonctionnalites/FeaturesGrid.tsx
touch src/components/fonctionnalites/FeatureCard.tsx
touch src/components/fonctionnalites/ComparisonTable.tsx
touch src/components/fonctionnalites/ASPCIPartnerSection.tsx
touch src/components/fonctionnalites/ConversionCTA.tsx

# Create shared tooltip component
touch src/components/shared/TermWithTooltip.tsx

# Create page file
mkdir -p src/app/fonctionnalites
touch src/app/fonctionnalites/page.tsx
```

---

### Phase 2: Core Data Implementation (45 min)

#### 2.1 Types (10 min)

**File**: `src/types/features.ts`

```typescript
export interface Feature {
  key: string;
  title: string;
  description: string;
  benefitsText: string;
  icon: string;
  order: number;
  category: 'main' | 'secondary';
}

export interface FeaturesCollection {
  main: Feature[];
  secondary: Feature[];
}

export interface ComparisonItem {
  dimension: string;
  situationBefore: string;
  situationWithGAMR: string;
  improvementMetric?: string;
}

export interface TooltipDefinition {
  term: string;
  definition: string;
  context?: string;
}
```

#### 2.2 Features Data (20 min)

**File**: `src/lib/features-data.ts`

Implement 7 features per FR-004:

1. Cartographie des menaces
2. Évaluation automatisée des risques
3. Priorités d'action & suivi des mesures
4. Indicateurs de performance
5. Collaboration & validation
6. Rapports & audits intelligents
7. Sécurité & traçabilité

**Refer to**: [data-model.md](./data-model.md) for complete examples.

**Pro tip**: Use copilot/AI to generate content based on spec, then review for accuracy.

#### 2.3 Comparison Data (10 min)

**File**: `src/lib/comparison-data.ts`

Create 8-10 comparison items covering:

- Productivité (required)
- Conformité (required)
- Gouvernance (required)
- Visibilité (required)
- Réactivité (required)
- - 3-5 additional dimensions

**Reference**: [data-model.md](./data-model.md) examples.

#### 2.4 Tooltip Definitions (5 min)

**File**: `src/lib/tooltip-definitions.ts`

Add P1 (priority 1) tooltips minimum:

- GAMR
- cartographie
- heatmap
- scoring

**Reference**: [contracts/tooltips.md](./contracts/tooltips.md) for definitions.

---

### Phase 3: Shared Components (30 min)

#### 3.1 TermWithTooltip Component (30 min)

**File**: `src/components/shared/TermWithTooltip.tsx`

**Key features**:

- Auto-lookup term in tooltip dictionary
- Keyboard accessible (Tab, Enter, Esc)
- Mobile tap support
- Dotted underline styling

**Implementation**: See [contracts/components.md](./contracts/components.md) for full code.

**Test manually**:

```bash
pnpm dev
# Navigate to page with tooltip
# Test: hover, focus+Enter, tap (mobile emulator)
```

---

### Phase 4: Section Components (2-3 hours)

Implement components in order of priority:

#### 4.1 HeroSection (30 min)

**File**: `src/components/fonctionnalites/HeroSection.tsx`

**Requirements**:

- Title (h1): "Toutes vos analyses de risques, réunies dans une seule plateforme"
- Subtitle with GAMR tooltip
- Primary CTA: "Demander une démo" (Button solid)
- Secondary CTA: "Essayer gratuitement" (Button outline)

**Styling**:

- Centered layout
- Responsive (stack CTAs on mobile)
- Hero gradient background

**Reference**: [contracts/components.md](./contracts/components.md#herosection)

#### 4.2 FeaturesGrid + FeatureCard (45 min)

**Files**:

- `src/components/fonctionnalites/FeaturesGrid.tsx`
- `src/components/fonctionnalites/FeatureCard.tsx`

**Layout**:

```tsx
// FeaturesGrid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {FEATURES_DATA.main.map((feature) => (
    <FeatureCard key={feature.key} {...feature} />
  ))}
</div>
```

**FeatureCard requirements**:

- Lucide icon (dynamic import based on `feature.icon`)
- Title with tooltip
- Description text
- Benefits text
- Min height 280px (prevents CLS)

**Icon import pattern**:

```tsx
import * as Icons from 'lucide-react';

function FeatureCard({ icon, ...props }: FeatureCardProps) {
  const LucideIcon = Icons[icon as keyof typeof Icons] as React.ComponentType<{
    className?: string;
  }>;

  return (
    <Card>
      <LucideIcon className="h-12 w-12 text-blue-600" />
      {/* ... rest of card */}
    </Card>
  );
}
```

#### 4.3 ComparisonTable (30 min)

**File**: `src/components/fonctionnalites/ComparisonTable.tsx`

**Semantic HTML**:

- Use `<table>`, `<thead>`, `<tbody>`
- Add `<caption class="sr-only">` for accessibility
- Use `scope="col"` on headers

**Responsive**:

- Desktop: 3-column table
- Mobile: Transform rows into stacked cards (CSS media query)

**Icons**: ❌ red (before) / ✅ green (after) with `aria-label`

**Reference**: [contracts/components.md](./contracts/components.md#comparisontable)

#### 4.4 OverviewSection (15 min)

**File**: `src/components/fonctionnalites/OverviewSection.tsx`

**Requirements**:

- 2-3 sentence intro
- Next.js Image component with `priority` (LCP optimization)
- Image: `/images/fonctionnalites/platform-overview.png`
- Alt text: "Interface de la plateforme GAMR montrant le tableau de bord de gestion des risques"

#### 4.5 ASPCIPartnerSection (15 min)

**File**: `src/components/fonctionnalites/ASPCIPartnerSection.tsx`

**Content** (hardcoded per FR-007):

- Title: "ASPCI, un partenaire de confiance"
- Exact text from spec
- Image: `/images/fonctionnalites/aspci-partnership.jpg`

**Layout**: Side-by-side (desktop), stacked (mobile)

#### 4.6 ConversionCTA (15 min)

**File**: `src/components/fonctionnalites/ConversionCTA.tsx`

**Content**:

- Headline: "Adoptez la méthodologie GAMR dès aujourd'hui"
- Same dual CTAs as hero (primary/secondary hierarchy)

**Styling**: Centered, gradient background, high contrast

---

### Phase 5: Page Assembly (30 min)

#### 5.1 Main Page Component (20 min)

**File**: `src/app/fonctionnalites/page.tsx`

```tsx
import { Metadata } from 'next';
import { HeroSection } from '@/components/fonctionnalites/HeroSection';
import { OverviewSection } from '@/components/fonctionnalites/OverviewSection';
import { FeaturesGrid } from '@/components/fonctionnalites/FeaturesGrid';
import { ComparisonTable } from '@/components/fonctionnalites/ComparisonTable';
import { ASPCIPartnerSection } from '@/components/fonctionnalites/ASPCIPartnerSection';
import { ConversionCTA } from '@/components/fonctionnalites/ConversionCTA';

export const metadata: Metadata = {
  title: 'Fonctionnalités GAMR | Plateforme de Gestion des Risques',
  description:
    'Découvrez les fonctionnalités de GAMR : cartographie des menaces, évaluation automatisée, indicateurs de performance, rapports intelligents. Simplifiez la gestion de vos risques.',
  openGraph: {
    title: 'Fonctionnalités GAMR',
    description: 'Cartographie, évaluation automatisée, et pilotage complet de vos risques',
    images: ['/og-image-fonctionnalites.png'],
    url: '/fonctionnalites',
  },
};

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

#### 5.2 Add Images (10 min)

```bash
# Create image directory
mkdir -p public/images/fonctionnalites

# Add placeholder images (replace with real assets)
# - platform-overview.png (1200x800px)
# - aspci-partnership.jpg (600x400px)
```

**Placeholder images**: Use https://placehold.co or create simple mockups temporarily.

---

### Phase 6: Testing & QA (1-2 hours)

#### 6.1 Visual Testing (30 min)

```bash
pnpm dev
# Open http://localhost:3000/fonctionnalites
```

**Manual checks**:

- [ ] Hero section displays with CTAs
- [ ] 7 feature cards in 4-3 grid (desktop)
- [ ] Cards stack on mobile (use DevTools device emulator)
- [ ] Comparison table readable on mobile
- [ ] All images load with correct alt text
- [ ] Tooltips appear on hover/focus/tap
- [ ] CTAs clickable (even if routes don't exist yet)

#### 6.2 Accessibility Testing (20 min)

**Chrome DevTools Lighthouse**:

```bash
# Open page
# DevTools → Lighthouse tab
# Run audit (Desktop + Mobile)
# Target: Accessibility score > 95
```

**Keyboard navigation**:

- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Enter opens tooltips
- [ ] Esc closes tooltips

**Screen reader** (optional but recommended):

- Windows: NVDA (free)
- Mac: VoiceOver (built-in, Cmd+F5)
- Test: Navigate page, verify content announced correctly

#### 6.3 Performance Testing (20 min)

**Lighthouse Performance**:

- Target: > 90 score
- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1

**Common issues & fixes**:

- **Slow LCP**: Add `priority` to above-fold images
- **Large JS bundle**: Check bundle size with `pnpm analyze`
- **CLS**: Add `width` and `height` to images, `min-h-[280px]` on cards

#### 6.4 Responsive Testing (10 min)

Test breakpoints:

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px (laptop)
- Large: 1920px (desktop)

**Check**:

- [ ] Grid collapses correctly (4-3 → 2 cols → 1 col)
- [ ] Text remains readable (no truncation)
- [ ] CTAs accessible (tap targets ≥ 44px)
- [ ] No horizontal scroll

---

## Common Gotchas

### 1. Dynamic Icon Imports

❌ **Wrong** (icon won't render):

```tsx
import { icon } from 'lucide-react'; // icon is a string
```

✅ **Correct**:

```tsx
import * as Icons from 'lucide-react';
const LucideIcon = Icons[icon as keyof typeof Icons];
```

### 2. Tooltip Provider Placement

❌ **Wrong** (performance issue):

```tsx
<Tooltip>
  <TooltipProvider>...</TooltipProvider>
</Tooltip>
```

✅ **Correct** (wrap entire page once):

```tsx
<TooltipProvider>
  <FonctionnalitesPage />
</TooltipProvider>
```

### 3. Image Optimization

❌ **Wrong** (slow LCP):

```tsx
<img src="/images/platform.png" /> // No optimization
```

✅ **Correct**:

```tsx
<Image
  src="/images/fonctionnalites/platform-overview.png"
  width={1200}
  height={800}
  priority // Above fold
  alt="..."
/>
```

### 4. Mobile Tooltip Issues

❌ **Problem**: Tooltip requires double-tap on mobile

✅ **Solution**: Radix UI handles this automatically if using `<TooltipTrigger asChild>`

### 5. Grid Layout Shift

❌ **Problem**: Cards jump when content loads

✅ **Solution**: Add `min-h-[280px]` to FeatureCard

---

## Next Steps

After implementation complete:

1. **Create unit tests** (if time permits):

   ```bash
   mkdir -p tests/unit/components/fonctionnalites
   touch tests/unit/components/fonctionnalites/FeatureCard.test.tsx
   ```

2. **Create E2E tests** (high priority for conversion):

   ```bash
   mkdir -p tests/e2e
   touch tests/e2e/fonctionnalites.spec.ts
   ```

3. **Run full test suite**:

   ```bash
   pnpm test
   pnpm test:e2e
   ```

4. **Optimize bundle** (if needed):

   ```bash
   pnpm analyze
   # Review bundle size, lazy load if > 250KB
   ```

5. **Create PR** with checklist:
   - [ ] All components implemented
   - [ ] Lighthouse > 90 (all categories)
   - [ ] Accessibility tested (keyboard + screen reader)
   - [ ] Mobile responsive verified
   - [ ] Tests written and passing

---

## Time Estimates

| Phase     | Task                    | Estimated Time |
| --------- | ----------------------- | -------------- |
| 1         | Setup                   | 30 min         |
| 2         | Core Data               | 45 min         |
| 3         | Shared Components       | 30 min         |
| 4         | Section Components      | 2-3 hours      |
| 5         | Page Assembly           | 30 min         |
| 6         | Testing & QA            | 1-2 hours      |
| **Total** | **Full Implementation** | **6-8 hours**  |

**Minimum Viable** (skip tests, basic styling): ~4 hours  
**Production Ready** (tests, optimization, polish): ~8-10 hours

---

## Support & Resources

### Documentation

- [Feature Spec](./spec.md)
- [Research Decisions](./research.md)
- [Data Model](./data-model.md)
- [Component Contracts](./contracts/components.md)
- [Tooltip Contract](./contracts/tooltips.md)

### External References

- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- [shadcn/ui Tooltip](https://ui.shadcn.com/docs/components/tooltip)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [Lucide Icons](https://lucide.dev/icons/)

### Getting Help

- Review [research.md](./research.md) for technical decisions
- Check [contracts/](./contracts/) for component examples
- Run `/speckit.tasks` for detailed task breakdown

---

**Last Updated**: 2025-10-09  
**Status**: Ready for implementation 🚀
