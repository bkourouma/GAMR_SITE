# Quickstart Guide: Security Index Menu

**Feature**: Security Index Menu  
**Date**: 2024-12-19  
**Phase**: 1 - Design & Contracts

## Overview

This guide provides step-by-step instructions for implementing the Security Index menu feature. The feature adds a new navigation item and dedicated page explaining the GAMR methodology with visual score indicators.

## Prerequisites

- Next.js 14.2.0+ development environment
- TypeScript 5.x
- Tailwind CSS configured
- Existing GAMR marketing site codebase

## Implementation Steps

### Step 1: Create Page Route

Create the new page route at `/src/app/indice-securite/page.tsx`:

```typescript
import { SecurityIndexPage } from '@/components/indice-securite/SecurityIndexPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indice de Sécurité - GAMR | Méthodologie d\'Évaluation',
  description: 'Découvrez la méthodologie GAMR pour évaluer l\'indice de sécurité de votre entreprise. Analyse des menaces et risques avec indicateurs visuels.',
  keywords: 'indice sécurité, GAMR, évaluation risques, gestion menaces',
};

export default function IndiceSecuritePage() {
  return <SecurityIndexPage />;
}
```

### Step 2: Create Static Content Constants

Create `/src/lib/constants/security-index.ts`:

```typescript
export const SECURITY_INDEX_DATA = {
  meta: {
    title: "Indice de Sécurité - GAMR",
    description: "Méthodologie d'évaluation de la sécurité d'entreprise"
  },
  hero: {
    title: "Indice de Sécurité",
    subtitle: "Comprenez comment GAMR évalue la sécurité de votre entreprise"
  },
  methodology: {
    title: "Méthodologie GAMR",
    objectives: [
      "Identifier les menaces et facteurs de risques",
      "Évaluer les conséquences d'incidents potentiels", 
      "Proposer des mesures préventives et de protection",
      "Aider à la répartition des ressources et planification d'urgence"
    ],
    overview: "La GAMR est une méthodologie simplifiée axée sur les facteurs de risques de l'entreprise pour aider à l'exécution d'une Évaluation de Sécurité."
  },
  scoreIndicators: [
    {
      id: "high-risk",
      minScore: 0,
      maxScore: 10,
      color: "bg-red-500",
      label: "Risque Élevé",
      description: "Sécurité critique - Action immédiate requise",
      textColor: "text-white"
    },
    // ... additional indicators
  ],
  processSteps: [
    {
      id: "targets",
      stepNumber: 1,
      title: "Cibles Potentielles (CP)",
      description: "Identification des éléments critiques de l'entreprise qui pourraient être visés par des actes malveillants.",
      examples: ["Fonctions clés", "Personnes importantes", "Zones vulnérables"]
    },
    // ... additional steps 2-7
  ]
};
```

### Step 3: Create Main Page Component

Create `/src/components/indice-securite/SecurityIndexPage.tsx`:

```typescript
import { MethodologySection } from './MethodologySection';
import { ScoreIndicator } from './ScoreIndicator';
import { GamrProcessSteps } from './GamrProcessSteps';
import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function SecurityIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {SECURITY_INDEX_DATA.hero.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {SECURITY_INDEX_DATA.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <MethodologySection />

      {/* Score Indicators */}
      <ScoreIndicator />

      {/* Process Steps */}
      <GamrProcessSteps />
    </div>
  );
}
```

### Step 4: Create Sub-Components

#### Methodology Section Component

Create `/src/components/indice-securite/MethodologySection.tsx`:

```typescript
import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function MethodologySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {SECURITY_INDEX_DATA.methodology.title}
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            {SECURITY_INDEX_DATA.methodology.overview}
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Objectifs de la GAMR
          </h3>
          <ul className="space-y-3">
            {SECURITY_INDEX_DATA.methodology.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

#### Score Indicator Component

Create `/src/components/indice-securite/ScoreIndicator.tsx`:

```typescript
import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function ScoreIndicator() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Échelle d'Évaluation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_INDEX_DATA.scoreIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className={`${indicator.color} ${indicator.textColor} p-6 rounded-lg text-center`}
            >
              <div className="text-2xl font-bold mb-2">
                {indicator.minScore}-{indicator.maxScore}
              </div>
              <h3 className="font-semibold mb-2">{indicator.label}</h3>
              <p className="text-sm opacity-90">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### Process Steps Component

Create `/src/components/indice-securite/GamrProcessSteps.tsx`:

```typescript
import { SECURITY_INDEX_DATA } from '@/lib/constants/security-index';

export function GamrProcessSteps() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Processus d'Évaluation en 7 Étapes
        </h2>
        
        <div className="space-y-8">
          {SECURITY_INDEX_DATA.processSteps.map((step) => (
            <div key={step.id} className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center mb-3">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  {step.stepNumber}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-700 mb-3">{step.description}</p>
              {step.examples && (
                <div className="text-sm text-gray-600">
                  <strong>Exemples :</strong> {step.examples.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Step 5: Update Navigation

Update `/src/components/layout/Header.tsx` to include the new menu item:

```typescript
// Add this link after the Solutions link in the desktop navigation
<Link
  href="/indice-securite"
  className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
>
  Indice de Sécurité
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
</Link>
```

### Step 6: Add Tests

#### Unit Test

Create `/tests/unit/security-index.test.ts`:

```typescript
import { render, screen } from '@testing-library/react';
import { SecurityIndexPage } from '@/components/indice-securite/SecurityIndexPage';

describe('SecurityIndexPage', () => {
  it('renders the page title', () => {
    render(<SecurityIndexPage />);
    expect(screen.getByText('Indice de Sécurité')).toBeInTheDocument();
  });

  it('renders all score indicators', () => {
    render(<SecurityIndexPage />);
    expect(screen.getByText('Risque Élevé')).toBeInTheDocument();
    expect(screen.getByText('Risque Moyen-Élevé')).toBeInTheDocument();
    expect(screen.getByText('Risque Moyen-Faible')).toBeInTheDocument();
    expect(screen.getByText('Risque Faible')).toBeInTheDocument();
  });

  it('renders all 7 process steps', () => {
    render(<SecurityIndexPage />);
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });
});
```

#### E2E Test

Create `/tests/e2e/security-index.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Security Index Page', () => {
  test('can navigate to security index page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Security Index menu item
    await page.click('text=Indice de Sécurité');
    
    // Verify page loads
    await expect(page).toHaveURL('/indice-securite');
    await expect(page.locator('h1')).toContainText('Indice de Sécurité');
  });

  test('displays all score indicators', async ({ page }) => {
    await page.goto('/indice-securite');
    
    // Check that all score indicators are visible
    await expect(page.locator('text=Risque Élevé')).toBeVisible();
    await expect(page.locator('text=Risque Moyen-Élevé')).toBeVisible();
    await expect(page.locator('text=Risque Moyen-Faible')).toBeVisible();
    await expect(page.locator('text=Risque Faible')).toBeVisible();
  });

  test('is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/indice-securite');
    
    // Verify page is responsive
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Méthodologie GAMR')).toBeVisible();
  });
});
```

## Verification Steps

1. **Start Development Server**: `npm run dev`
2. **Navigate to Page**: Go to `http://localhost:3000/indice-securite`
3. **Verify Content**: Check that all sections render correctly
4. **Test Navigation**: Click the "Indice de Sécurité" menu item
5. **Check Mobile**: Resize browser to test mobile responsiveness
6. **Run Tests**: Execute `npm test` and `npm run test:e2e`

## Success Criteria

- ✅ Page loads in under 3 seconds
- ✅ All content displays correctly
- ✅ Navigation works from main menu
- ✅ Mobile responsive design
- ✅ Accessibility compliance
- ✅ SEO meta tags present
- ✅ All tests pass

## Troubleshooting

### Common Issues

1. **Page Not Found (404)**: Ensure the page route is created in `/src/app/indice-securite/page.tsx`
2. **Styling Issues**: Verify Tailwind CSS classes are correctly applied
3. **Navigation Missing**: Check that Header component is updated with new menu item
4. **Content Not Loading**: Verify constants file is properly imported

### Debug Commands

```bash
# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint

# Run tests
npm test

# Build for production
npm run build
```
