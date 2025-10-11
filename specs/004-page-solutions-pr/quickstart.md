# Quickstart Guide: Page Solutions Implementation

**Feature**: Page Solutions - Secteurs d'Activité  
**Date**: 2025-10-09  
**Audience**: Developers implementing this feature

## 🚀 Getting Started

This guide will help you implement the `/solutions` page from specification to production-ready code in a structured, testable way.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [x] Read [spec.md](./spec.md) - Feature requirements
- [x] Read [research.md](./research.md) - Technical decisions
- [x] Read [data-model.md](./data-model.md) - Entity definitions
- [x] Read [contracts/components.md](./contracts/components.md) - Component interfaces
- [x] Node.js 18+ and pnpm installed
- [x] Familiarity with Next.js 14 app directory
- [x] TypeScript strict mode experience

---

## 📁 File Structure Overview

You'll be creating these files:

```
src/
├── app/solutions/
│   └── page.tsx                    # Main page component (START HERE)
├── components/solutions/
│   ├── HeroSection.tsx             # Hero with CTAs
│   ├── IntroSection.tsx            # Introduction text
│   ├── SolutionCard.tsx            # Reusable sector card ⭐ KEY COMPONENT
│   ├── SectorsGrid.tsx             # Container for cards
│   ├── ComparisonTable.tsx         # Responsive table
│   └── ConversionCTA.tsx           # Final CTA section
├── lib/
│   └── solutions-data.ts           # Industry data constant
├── types/
│   └── solutions.ts                # TypeScript interfaces
└── styles/
    └── (reuse existing animations.css)

tests/
├── unit/components/solutions/
│   ├── SolutionCard.test.tsx
│   └── ComparisonTable.test.tsx
└── e2e/
    └── solutions.spec.ts            # Page flow tests

public/images/solutions/
├── extractive.svg                   # Sector icons (5 total)
├── airport.svg
├── government.svg
├── banking.svg
└── healthcare.svg
```

---

## 🎯 Implementation Phases

### Phase 1: Setup Types & Data (30 minutes)

#### Step 1.1: Create TypeScript Types

```bash
# Create types file
touch src/types/solutions.ts
```

```typescript
// src/types/solutions.ts
export interface Industry {
  id: string;
  nom: string;
  normes: string[];
  defis: string[];
  solutions: string[];
  icone: string;
  order?: number;
}

export interface CTAConfig {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
}

export interface ComparisonRow {
  secteur: string;
  normesKeys: string[];
  modulesGAMR: string[];
}
```

#### Step 1.2: Create Industry Data

```typescript
// src/lib/solutions-data.ts
import { Industry } from '@/types/solutions';

export const industries: Industry[] = [
  {
    id: 'industrie-extractive',
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
      'Reporting ESG consolidé et exportable pour bailleurs et investisseurs',
    ],
    icone: '/images/solutions/extractive.svg',
    order: 1,
  },
  {
    id: 'aeroportuaire',
    nom: 'Aéroportuaire',
    normes: ['OACI (Annexe 19 - SMS)', 'ISO 31000', 'ACI Best Practices'],
    defis: ['Sécurité opérationnelle', 'Gestion des incidents', 'Traçabilité et conformité'],
    solutions: [
      'Registre digital des risques et incidents',
      'Tableau de bord temps réel pour la direction sécurité',
      'Audit automatique et reporting conforme OACI',
    ],
    icone: '/images/solutions/airport.svg',
    order: 2,
  },
  {
    id: 'gouvernement',
    nom: 'Gouvernement & institutions publiques',
    normes: ['ISO 31000', 'COSO ERM', 'ANSSI-CI / RGPD'],
    defis: [
      'Gestion des risques organisationnels',
      'Conformité légale',
      'Traçabilité et transparence',
    ],
    solutions: [
      'Module de gouvernance des risques stratégiques',
      "Suivi des plans d'action ministériels",
      'Rapports consolidés pour le reporting institutionnel',
    ],
    icone: '/images/solutions/government.svg',
    order: 3,
  },
  {
    id: 'secteur-bancaire',
    nom: 'Secteur bancaire et financier',
    normes: ['Bâle III', 'ISO 27001', 'AML/CFT (LBC/FT)'],
    defis: ['Risque opérationnel', 'Fraude', 'Cybersécurité', 'Conformité réglementaire'],
    solutions: [
      'Matrice de risques configurable (opérationnels, IT, conformité)',
      "Analyse d'impact automatisée",
      'Génération de rapports pour les audits internes et BCEAO',
    ],
    icone: '/images/solutions/banking.svg',
    order: 4,
  },
  {
    id: 'sante',
    nom: 'Santé & hôpitaux',
    normes: ['ISO 9001', 'ISO 27001', 'OMS Patient Safety'],
    defis: ['Sécurité des patients', 'Gestion des risques cliniques', 'Conformité qualité'],
    solutions: [
      'Registre des risques médicaux et incidents',
      'Suivi des actions correctives',
      'Tableaux de bord qualité/sécurité, rapports ANS & OMS',
    ],
    icone: '/images/solutions/healthcare.svg',
    order: 5,
  },
];
```

#### Step 1.3: Validate Data

```typescript
// src/lib/solutions-data.test.ts
import { describe, test, expect } from 'vitest';
import { industries } from './solutions-data';

describe('Solutions Data Validation', () => {
  test('has exactly 5 industries', () => {
    expect(industries).toHaveLength(5);
  });

  test('all IDs are unique', () => {
    const ids = industries.map((i) => i.id);
    expect(new Set(ids).size).toBe(5);
  });

  test('all have 1-3 normes', () => {
    industries.forEach((industry) => {
      expect(industry.normes.length).toBeGreaterThanOrEqual(1);
      expect(industry.normes.length).toBeLessThanOrEqual(3);
    });
  });

  test('banking sector has required normes', () => {
    const banking = industries.find((i) => i.id === 'secteur-bancaire');
    expect(banking?.normes).toContain('Bâle III');
  });
});
```

Run test:

```bash
pnpm vitest run src/lib/solutions-data.test.ts
```

---

### Phase 2: Build Core Component (1 hour)

#### Step 2.1: Create SolutionCard Component

This is the most important component - it's reused 5 times.

```typescript
// src/components/solutions/SolutionCard.tsx
import Image from 'next/image';
import { Industry } from '@/types/solutions';

export interface SolutionCardProps {
  industry: Industry;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export function SolutionCard({
  industry,
  variant = 'default',
  className = ''
}: SolutionCardProps) {
  return (
    <article
      id={industry.id}
      className={`
        solution-card
        rounded-lg border border-gray-200 p-6 bg-white
        hover:shadow-lg transition-shadow duration-300
        scroll-mt-20
        ${variant === 'highlighted' ? 'border-blue-500 border-2' : ''}
        ${className}
      `}
    >
      <header className="flex items-center gap-4 mb-6">
        <Image
          src={industry.icone}
          alt={`Icône ${industry.nom}`}
          width={64}
          height={64}
          className="flex-shrink-0"
        />
        <h2 className="text-2xl font-bold text-gray-900">
          {industry.nom}
        </h2>
      </header>

      <section className="mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Normes et référentiels
        </h3>
        <ul className="flex flex-wrap gap-2">
          {industry.normes.map(norme => (
            <li
              key={norme}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            >
              {norme}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Défis majeurs
        </h3>
        <ul className="space-y-1">
          {industry.defis.map((defi, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-red-500 mt-1">•</span>
              <span>{defi}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Solutions GAMR
        </h3>
        <ul className="space-y-2">
          {industry.solutions.map((solution, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 mt-1">✓</span>
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
```

#### Step 2.2: Test SolutionCard

```typescript
// src/components/solutions/SolutionCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { SolutionCard } from './SolutionCard';
import { Industry } from '@/types/solutions';

const mockIndustry: Industry = {
  id: 'test-sector',
  nom: 'Test Sector',
  normes: ['ISO 9001', 'ISO 27001'],
  defis: ['Challenge 1', 'Challenge 2'],
  solutions: ['Solution 1', 'Solution 2'],
  icone: '/test.svg',
};

describe('SolutionCard', () => {
  test('renders industry name', () => {
    render(<SolutionCard industry={mockIndustry} />);
    expect(screen.getByText('Test Sector')).toBeInTheDocument();
  });

  test('displays all normes', () => {
    render(<SolutionCard industry={mockIndustry} />);
    expect(screen.getByText('ISO 9001')).toBeInTheDocument();
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
  });

  test('has correct anchor id', () => {
    const { container } = render(<SolutionCard industry={mockIndustry} />);
    expect(container.querySelector('#test-sector')).toBeInTheDocument();
  });

  test('icon has alt text', () => {
    render(<SolutionCard industry={mockIndustry} />);
    expect(screen.getByAltText(/Icône Test Sector/i)).toBeInTheDocument();
  });
});
```

---

### Phase 3: Build Remaining Components (1.5 hours)

#### Step 3.1: HeroSection

```typescript
// src/components/solutions/HeroSection.tsx
import Link from 'next/link';
import { CTAButton } from '@/components/shared/CTAButton';
import { CTAConfig } from '@/types/solutions';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCTA: CTAConfig;
  secondaryCTA: CTAConfig;
}

export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryCTA.href}>
            <CTAButton variant={primaryCTA.variant} size="lg">
              {primaryCTA.label}
            </CTAButton>
          </Link>
          <Link href={secondaryCTA.href}>
            <CTAButton variant={secondaryCTA.variant} size="lg">
              {secondaryCTA.label}
            </CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

#### Step 3.2: SectorsGrid

```typescript
// src/components/solutions/SectorsGrid.tsx
import { Industry } from '@/types/solutions';
import { SolutionCard } from './SolutionCard';

export interface SectorsGridProps {
  industries: Industry[];
  layout?: 'grid' | 'stack';
}

export function SectorsGrid({ industries, layout = 'grid' }: SectorsGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`
            ${layout === 'grid'
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-8'
              : 'flex flex-col gap-8'
            }
          `}
        >
          {industries.map(industry => (
            <SolutionCard key={industry.id} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### Step 3.3: ComparisonTable

```typescript
// src/components/solutions/ComparisonTable.tsx
import { Industry } from '@/types/solutions';

export interface ComparisonTableProps {
  industries: Industry[];
  caption?: string;
}

function extractModules(solutions: string[]): string[] {
  return solutions.map(s => {
    const words = s.split(' ').slice(0, 4);
    return words.join(' ') + '...';
  });
}

export function ComparisonTable({
  industries,
  caption = 'Comparaison des secteurs et modules GAMR'
}: ComparisonTableProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tableau comparatif
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="bg-gray-100">
                <th scope="col" className="px-4 py-3 text-left font-semibold sticky left-0 bg-gray-100">
                  Secteur
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Normes clés
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Modules GAMR
                </th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry, index) => (
                <tr
                  key={industry.id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-4 py-3 font-medium sticky left-0 bg-inherit">
                    {industry.nom}
                  </td>
                  <td className="px-4 py-3">
                    {industry.normes.join(', ')}
                  </td>
                  <td className="px-4 py-3">
                    {extractModules(industry.solutions).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
```

---

### Phase 4: Assemble Page (30 minutes)

```typescript
// src/app/solutions/page.tsx
import { Metadata } from 'next';
import { HeroSection } from '@/components/solutions/HeroSection';
import { IntroSection } from '@/components/solutions/IntroSection';
import { SectorsGrid } from '@/components/solutions/SectorsGrid';
import { ComparisonTable } from '@/components/solutions/ComparisonTable';
import { ConversionCTA } from '@/components/solutions/ConversionCTA';
import { industries } from '@/lib/solutions-data';

export const metadata: Metadata = {
  title: 'Solutions GAMR par Secteur - Conformité & Gestion des Risques',
  description: 'Découvrez comment GAMR s\'adapte aux normes de votre secteur : industrie, aéroport, banque, santé, gouvernement. Conformité automatisée et reporting simplifié.',
  openGraph: {
    title: 'Solutions GAMR par Secteur',
    description: 'GAMR s\'adapte aux normes de votre secteur',
    url: '/solutions',
    images: [{ url: '/images/og/solutions.jpg' }],
  },
};

export default function SolutionsPage() {
  return (
    <main>
      <HeroSection
        title="Des solutions adaptées à chaque secteur"
        subtitle="GAMR s'aligne sur vos normes industrielles et réglementaires pour renforcer votre gouvernance et votre performance."
        primaryCTA={{
          label: 'Découvrir les fonctionnalités',
          href: '/fonctionnalites',
          variant: 'primary',
        }}
        secondaryCTA={{
          label: 'Demander une démo',
          href: '/demo',
          variant: 'secondary',
        }}
      />

      <IntroSection
        content="Chaque secteur fait face à des risques spécifiques, encadrés par des normes strictes. GAMR s'adapte à vos cadres réglementaires pour simplifier la conformité et accélérer la prise de décision."
      />

      <SectorsGrid industries={industries} />

      <ComparisonTable industries={industries} />

      <ConversionCTA
        headline="Découvrez comment GAMR s'intègre à vos processus et à vos normes sectorielles."
        ctas={[
          { label: 'Demander une démo', href: '/demo', variant: 'primary' },
          { label: 'Essayer gratuitement', href: '/signup', variant: 'secondary' },
        ]}
      />
    </main>
  );
}

// Export for external consumption (FR-018)
export { industries };
```

---

### Phase 5: Add CSS Enhancements (15 minutes)

```css
/* src/app/solutions/solutions.css (optional) */

/* Smooth scroll for anchor links */
html {
  scroll-behavior: smooth;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Scroll margin for anchored sections (account for sticky header) */
section[id],
article[id] {
  scroll-margin-top: 5rem;
}

/* Mobile: horizontal scroll table */
@media (max-width: 768px) {
  .comparison-table-wrapper {
    -webkit-overflow-scrolling: touch;
  }
}
```

---

### Phase 6: E2E Testing (30 minutes)

```typescript
// tests/e2e/solutions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Solutions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions');
  });

  test('displays hero section with CTAs', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Des solutions adaptées');
    await expect(page.getByRole('link', { name: /Découvrir les fonctionnalités/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Demander une démo/i })).toBeVisible();
  });

  test('shows all 5 sector cards', async ({ page }) => {
    const cards = page.locator('.solution-card');
    await expect(cards).toHaveCount(5);
  });

  test('primary CTA navigates to fonctionnalites', async ({ page }) => {
    await page.click('text=Découvrir les fonctionnalités');
    await expect(page).toHaveURL('/fonctionnalites');
  });

  test('anchor navigation works', async ({ page }) => {
    await page.goto('/solutions#secteur-bancaire');
    const banking = page.locator('#secteur-bancaire');
    await expect(banking).toBeInViewport();
  });

  test('comparison table is visible and has correct structure', async ({ page }) => {
    const table = page.locator('table');
    await expect(table).toBeVisible();

    const headers = table.locator('th');
    await expect(headers).toHaveCount(3);

    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(5);
  });

  test('mobile: table is scrollable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const tableWrapper = page.locator('.overflow-x-auto');
    await expect(tableWrapper).toHaveCSS('overflow-x', 'auto');
  });
});
```

---

## ✅ Pre-Launch Checklist

Before merging to main:

### Functionality

- [ ] All 5 sector cards display correctly
- [ ] Hero CTAs navigate to correct pages
- [ ] Anchor links work (`/solutions#secteur-bancaire`)
- [ ] Comparison table displays on desktop
- [ ] Table scrolls horizontally on mobile

### Accessibility

- [ ] All images have alt text
- [ ] Keyboard navigation works through all interactive elements
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Screen reader announces sections correctly

### Performance

- [ ] Lighthouse Performance score > 90
- [ ] FCP < 1.5s
- [ ] TTI < 3s
- [ ] CLS < 0.1
- [ ] Images are optimized (WebP format)
- [ ] Images below fold are lazy-loaded

### SEO

- [ ] Page title ≤ 60 characters
- [ ] Meta description ≤ 160 characters
- [ ] OpenGraph tags present
- [ ] Canonical URL defined
- [ ] JSON-LD structured data added

### Testing

- [ ] All unit tests pass (`pnpm test`)
- [ ] All e2e tests pass (`pnpm test:e2e`)
- [ ] Visual regression tests pass
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No ESLint errors (`pnpm lint`)

---

## 🐛 Common Issues & Solutions

### Issue: Icons not loading

**Solution**: Ensure icon files exist in `public/images/solutions/` and paths match exactly.

### Issue: Table doesn't scroll on mobile

**Solution**: Verify `overflow-x: auto` is applied to wrapper, not table element itself.

### Issue: Anchor navigation doesn't account for header

**Solution**: Add `scroll-margin-top: 5rem` to sections with IDs.

### Issue: Layout shift when images load

**Solution**: Always specify `width` and `height` on `next/image` components.

### Issue: TypeScript strict mode errors

**Solution**: Ensure all props are typed, no `any` types, enable `strict: true` in tsconfig.json.

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance Guides](https://web.dev/performance/)
- [Playwright Testing](https://playwright.dev/docs/intro)

---

## 🎉 You're Ready!

Follow these phases in order, run tests at each step, and you'll have a production-ready Solutions page that meets all spec requirements.

**Estimated Total Time**: 4-5 hours for first implementation

**Questions?** Refer back to:

- [spec.md](./spec.md) - "What" needs to be built
- [research.md](./research.md) - "Why" decisions were made
- [contracts/components.md](./contracts/components.md) - Component interfaces

Happy coding! 🚀
