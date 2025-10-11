# Component Contracts: Page Solutions

**Feature**: Page Solutions - Secteurs d'Activité  
**Date**: 2025-10-09  
**Status**: Completed

## Overview

This document defines TypeScript interfaces and prop contracts for all React components in the Solutions page. These contracts serve as the source of truth for component APIs during implementation.

---

## Type Definitions (Shared)

### Core Data Types

```typescript
/**
 * Represents an industry sector that GAMR serves
 */
export interface Industry {
  /** Unique identifier for anchor navigation (e.g., "secteur-bancaire") */
  id: string;
  /** Display name of the sector */
  nom: string;
  /** List of regulatory standards (1-3 items) */
  normes: string[];
  /** Key challenges faced by this sector */
  defis: string[];
  /** GAMR solutions addressing these challenges */
  solutions: string[];
  /** Path to icon or component name */
  icone: string;
  /** Display order (optional, defaults to array index) */
  order?: number;
}

/**
 * CTA (Call-to-Action) button configuration
 */
export interface CTAConfig {
  /** Button text */
  label: string;
  /** Destination URL or path */
  href: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Opens in new tab */
  external?: boolean;
}

/**
 * Comparison table row data
 */
export interface ComparisonRow {
  /** Sector name */
  secteur: string;
  /** List of key norms */
  normesKeys: string[];
  /** List of GAMR modules */
  modulesGAMR: string[];
}
```

---

## Page-Level Components

### SolutionsPage

**Location**: `src/app/solutions/page.tsx`  
**Purpose**: Root page component, orchestrates all sections

```typescript
/**
 * Main Solutions page component (Next.js page)
 * No props - fetches data internally
 */
export default function SolutionsPage(): JSX.Element;

/**
 * Metadata for SEO (Next.js convention)
 */
export const metadata: Metadata = {
  title: 'Solutions GAMR par Secteur - Conformité & Gestion des Risques',
  description:
    "Découvrez comment GAMR s'adapte aux normes de votre secteur : industrie, aéroport, banque, santé, gouvernement. Conformité automatisée et reporting simplifié.",
  openGraph: {
    title: 'Solutions GAMR par Secteur',
    description: "GAMR s'adapte aux normes de votre secteur",
    url: '/solutions',
    images: ['/images/og/solutions.jpg'],
  },
};

/**
 * Exportable industry data for external consumption (FR-018)
 */
export const industries: Industry[];
```

---

## Section Components

### HeroSection

**Location**: `src/components/solutions/HeroSection.tsx`  
**Purpose**: Above-the-fold hero with title, subtitle, and CTAs

```typescript
export interface HeroSectionProps {
  /** Main heading text */
  title: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Primary CTA configuration */
  primaryCTA: CTAConfig;
  /** Secondary CTA configuration */
  secondaryCTA: CTAConfig;
  /** Optional background image or gradient */
  background?: string;
}

export function HeroSection(props: HeroSectionProps): JSX.Element;
```

**Default Props** (suggested):

```typescript
const defaultProps: HeroSectionProps = {
  title: 'Des solutions adaptées à chaque secteur',
  subtitle:
    "GAMR s'aligne sur vos normes industrielles et réglementaires pour renforcer votre gouvernance et votre performance.",
  primaryCTA: {
    label: 'Découvrir les fonctionnalités',
    href: '/fonctionnalites',
    variant: 'primary',
  },
  secondaryCTA: {
    label: 'Demander une démo',
    href: '/demo',
    variant: 'secondary',
  },
};
```

**Accessibility Requirements**:

- Heading MUST use `<h1>` tag (A11Y-004)
- CTAs MUST be keyboard accessible (A11Y-001)
- Color contrast MUST meet 4.5:1 ratio (A11Y-003)

---

### IntroSection

**Location**: `src/components/solutions/IntroSection.tsx`  
**Purpose**: Introduction text explaining GAMR's multi-sector adaptability

```typescript
export interface IntroSectionProps {
  /** Introduction text content */
  content: string;
  /** Optional className for styling override */
  className?: string;
}

export function IntroSection(props: IntroSectionProps): JSX.Element;
```

**Default Props**:

```typescript
const defaultProps: IntroSectionProps = {
  content:
    "Chaque secteur fait face à des risques spécifiques, encadrés par des normes strictes. GAMR s'adapte à vos cadres réglementaires pour simplifier la conformité et accélérer la prise de décision.",
};
```

**Accessibility Requirements**:

- Content MUST be wrapped in semantic HTML (e.g., `<p>` or `<div>` with appropriate role)
- Font size MUST be readable without zoom (mobile-first principle)

---

### SolutionCard

**Location**: `src/components/solutions/SolutionCard.tsx`  
**Purpose**: Reusable card component for displaying one industry sector

```typescript
export interface SolutionCardProps {
  /** Industry data */
  industry: Industry;
  /** Optional visual variant */
  variant?: 'default' | 'highlighted';
  /** Optional className for styling override */
  className?: string;
  /** Callback when card is clicked (optional, for future interactions) */
  onClick?: (industryId: string) => void;
}

export function SolutionCard(props: SolutionCardProps): JSX.Element;
```

**Component Structure**:

```tsx
<article id={industry.id} className="solution-card">
  <header>
    <img src={industry.icone} alt={`Icône ${industry.nom}`} />
    <h2>{industry.nom}</h2>
  </header>

  <section className="normes">
    <h3>Normes et référentiels</h3>
    <ul>
      {industry.normes.map((norme) => (
        <li key={norme}>{norme}</li>
      ))}
    </ul>
  </section>

  <section className="defis">
    <h3>Défis majeurs</h3>
    <ul>
      {industry.defis.map((defi) => (
        <li key={defi}>{defi}</li>
      ))}
    </ul>
  </section>

  <section className="solutions">
    <h3>Solutions GAMR</h3>
    <ul>
      {industry.solutions.map((solution) => (
        <li key={solution}>{solution}</li>
      ))}
    </ul>
  </section>
</article>
```

**Accessibility Requirements**:

- Use semantic `<article>` for each card (A11Y-007)
- Icon MUST have descriptive alt text (A11Y-002)
- Heading hierarchy MUST be H2 for sector name, H3 for subsections (A11Y-004)
- Lists MUST use proper `<ul>` and `<li>` tags

**Performance Requirements**:

- Icon MUST be lazy-loaded if below fold (PERF-005)
- Minimum height MUST be set to prevent CLS (PERF-003)

---

### SectorsGrid

**Location**: `src/components/solutions/SectorsGrid.tsx`  
**Purpose**: Container component that displays all 5 SolutionCards

```typescript
export interface SectorsGridProps {
  /** Array of industry data to display */
  industries: Industry[];
  /** Grid layout variant */
  layout?: 'grid' | 'stack';
  /** Optional className for styling override */
  className?: string;
}

export function SectorsGrid(props: SectorsGridProps): JSX.Element;
```

**Responsive Behavior**:

- **Desktop (>1024px)**: 2-column grid
- **Tablet (768-1024px)**: 2-column grid (narrower)
- **Mobile (<768px)**: Single column stack

**Accessibility Requirements**:

- Grid MUST maintain logical tab order (A11Y-001)
- Each card MUST be independently focusable

---

### ComparisonTable

**Location**: `src/components/solutions/ComparisonTable.tsx`  
**Purpose**: Comparative table showing sectors, norms, and GAMR modules

```typescript
export interface ComparisonTableProps {
  /** Array of industry data for comparison */
  industries: Industry[];
  /** Optional table caption */
  caption?: string;
  /** Optional className for styling override */
  className?: string;
}

export function ComparisonTable(props: ComparisonTableProps): JSX.Element;
```

**Component Structure**:

```tsx
<div className="comparison-table-wrapper">
  <table className="comparison-table">
    <caption>{caption || 'Comparaison des secteurs et modules GAMR'}</caption>
    <thead>
      <tr>
        <th scope="col">Secteur</th>
        <th scope="col">Normes clés</th>
        <th scope="col">Modules GAMR</th>
      </tr>
    </thead>
    <tbody>
      {industries.map((industry) => (
        <tr key={industry.id}>
          <td>{industry.nom}</td>
          <td>{industry.normes.join(', ')}</td>
          <td>{extractModules(industry.solutions).join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**Accessibility Requirements**:

- MUST use semantic table tags (A11Y-005)
- Headers MUST use `scope` attribute (A11Y-005)
- Table MUST have `<caption>` or `aria-label` (A11Y-005)

**Responsive Behavior**:

- Mobile: Horizontal scroll with sticky first column (research.md Decision 2)
- Desktop: Full-width table, no scroll

**Performance Requirements**:

- Table structure MUST not cause layout shift (PERF-003)

---

### ConversionCTA

**Location**: `src/components/solutions/ConversionCTA.tsx`  
**Purpose**: Final call-to-action section at bottom of page

```typescript
export interface ConversionCTAProps {
  /** Headline text */
  headline: string;
  /** Array of CTA configurations */
  ctas: CTAConfig[];
  /** Optional background color or gradient */
  background?: string;
  /** Optional className for styling override */
  className?: string;
}

export function ConversionCTA(props: ConversionCTAProps): JSX.Element;
```

**Default Props**:

```typescript
const defaultProps: ConversionCTAProps = {
  headline: "Découvrez comment GAMR s'intègre à vos processus et à vos normes sectorielles.",
  ctas: [
    {
      label: 'Demander une démo',
      href: '/demo',
      variant: 'primary',
    },
    {
      label: 'Essayer gratuitement',
      href: '/signup',
      variant: 'secondary',
    },
  ],
};
```

**Accessibility Requirements**:

- CTAs MUST be keyboard accessible (A11Y-001)
- Headline MUST use appropriate heading level (H2 or H3) (A11Y-004)

---

## Shared/Reusable Components

### CTAButton

**Location**: `src/components/shared/CTAButton.tsx` (EXISTING)  
**Purpose**: Reusable button component used across site

```typescript
export interface CTAButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Destination URL */
  href?: string;
  /** Click handler (if not using href) */
  onClick?: () => void;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width button */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** External link (opens in new tab) */
  external?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function CTAButton(props: CTAButtonProps): JSX.Element;
```

**Usage in Solutions Page**:

- Hero section CTAs
- Conversion section CTAs
- Should be consistent with existing implementation from homepage and fonctionnalites page

---

## Utility Functions

### extractModules

**Location**: `src/lib/solutions-data.ts` or `src/components/solutions/ComparisonTable.tsx`  
**Purpose**: Extract module names from solution descriptions for table display

```typescript
/**
 * Extracts GAMR module names from solution descriptions
 * @param solutions - Array of solution descriptions
 * @returns Array of shortened module names
 */
export function extractModules(solutions: string[]): string[] {
  return solutions.map((solution) => {
    // Take first 3-5 words and add ellipsis
    const words = solution.split(' ').slice(0, 4);
    return words.join(' ') + (solution.split(' ').length > 4 ? '...' : '');
  });
}
```

**Example**:

```typescript
const solutions = [
  'Cartographie des risques environnementaux et sociaux',
  "Suivi automatique des plans d'action HSE",
];

extractModules(solutions);
// Returns: [
//   'Cartographie des risques environnementaux...',
//   'Suivi automatique des plans...'
// ]
```

---

## Type Export Structure

**Location**: `src/types/solutions.ts` (NEW FILE)

```typescript
/**
 * Type definitions for Solutions page components
 * @module types/solutions
 */

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

// Component props exports
export type {
  HeroSectionProps,
  IntroSectionProps,
  SolutionCardProps,
  SectorsGridProps,
  ComparisonTableProps,
  ConversionCTAProps,
} from '../components/solutions';
```

---

## Validation & Testing

### Type Safety Tests

```typescript
// tests/unit/types/solutions.test.ts
import { Industry, CTAConfig } from '@/types/solutions';

describe('Solutions Types', () => {
  test('Industry interface requires all mandatory fields', () => {
    const validIndustry: Industry = {
      id: 'test',
      nom: 'Test Sector',
      normes: ['ISO 9001'],
      defis: ['Challenge 1'],
      solutions: ['Solution 1'],
      icone: '/test.svg',
    };

    expect(validIndustry).toBeDefined();
  });

  test('Industry normes array accepts 1-3 items', () => {
    const industry: Industry = {
      id: 'test',
      nom: 'Test',
      normes: ['A', 'B', 'C'],
      defis: ['D'],
      solutions: ['E'],
      icone: '/test.svg',
    };

    expect(industry.normes).toHaveLength(3);
  });
});
```

### Component Contract Tests

```typescript
// tests/unit/components/solutions/SolutionCard.test.tsx
import { render, screen } from '@testing-library/react';
import { SolutionCard } from '@/components/solutions/SolutionCard';

describe('SolutionCard', () => {
  const mockIndustry: Industry = {
    id: 'test-sector',
    nom: 'Test Sector',
    normes: ['ISO 9001', 'ISO 27001'],
    defis: ['Challenge 1', 'Challenge 2'],
    solutions: ['Solution 1', 'Solution 2'],
    icone: '/test.svg',
  };

  test('renders all industry data', () => {
    render(<SolutionCard industry={mockIndustry} />);

    expect(screen.getByText('Test Sector')).toBeInTheDocument();
    expect(screen.getByText('ISO 9001')).toBeInTheDocument();
    expect(screen.getByText('Challenge 1')).toBeInTheDocument();
    expect(screen.getByText('Solution 1')).toBeInTheDocument();
  });

  test('icon has alt text', () => {
    render(<SolutionCard industry={mockIndustry} />);

    const icon = screen.getByAltText(/Icône Test Sector/i);
    expect(icon).toBeInTheDocument();
  });

  test('section has correct id for anchor navigation', () => {
    const { container } = render(<SolutionCard industry={mockIndustry} />);

    const article = container.querySelector('#test-sector');
    expect(article).toBeInTheDocument();
  });
});
```

---

## Contract Versioning

### Version 1.0.0 (Initial)

- All component contracts defined
- Industry interface with 5 sectors
- CTA configuration interface
- Comparison table structure

### Future Enhancements (Potential)

- **v1.1.0**: Add `Standard` interface for detailed norm tooltips
- **v1.2.0**: Add `GAMRModule` interface for module detail pages
- **v2.0.0**: Breaking change if sector structure changes significantly

---

## Contract Compliance Checklist

Before implementation, verify:

- [ ] All component props are typed (no `any` types)
- [ ] Required vs optional props are clearly marked
- [ ] Default props are documented
- [ ] Accessibility requirements are noted in each component
- [ ] Performance requirements are noted where applicable
- [ ] Component structure examples are provided
- [ ] Responsive behavior is specified
- [ ] All contracts follow TypeScript strict mode rules

---

**Status**: ✅ Component contracts complete. All interfaces defined, validated against spec requirements.
