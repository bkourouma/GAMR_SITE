# Data Model: Page Fonctionnalités GAMR

**Feature**: Page Fonctionnalités  
**Date**: 2025-10-09  
**Status**: ✅ Complete

## Overview

This document defines the data structures and content models for the GAMR features page. All entities are implemented as TypeScript constants with type inference (no runtime database). Data is static marketing content optimized for type safety and maintainability.

---

## Entity 1: Feature

Represents a single capability of the GAMR platform displayed as a card.

### Schema

```typescript
interface Feature {
  key: string; // Unique identifier (slug format)
  title: string; // Display name (max 50 chars)
  description: string; // Short description (max 150 chars)
  benefitsText: string; // Benefits-oriented copy (max 250 chars)
  icon: string; // Lucide icon name (e.g., 'Map', 'Shield', 'BarChart')
  order: number; // Display order (1-7 for main features)
  category: 'main' | 'secondary'; // Category for JSON export structure
}
```

### Validation Rules

- **key**: Lowercase kebab-case, unique across all features, pattern: `/^[a-z][a-z0-9-]*$/`
- **title**: 3-50 characters, sentence case, no trailing punctuation
- **description**: 10-150 characters, ends with period, action-oriented language
- **benefitsText**: 20-250 characters, explains "why" not just "what"
- **icon**: Must be valid Lucide React icon name (validated at compile time)
- **order**: Positive integer, unique per category
- **category**: Enum literal type ('main' | 'secondary')

### Relationships

- **Belongs to**: Category (main or secondary)
- **Has many**: Tooltip terms (many-to-many via term references in text)
- **Displayed in**: FeaturesGrid component (cards in 4-3 layout)

### Sample Data

```typescript
const featureCartographie: Feature = {
  key: 'cartographie-menaces',
  title: 'Cartographie des menaces',
  description: 'Visualisez tous vos risques par processus, projet ou entité organisationnelle.',
  benefitsText: 'Identifiez en un coup d'œil les zones critiques nécessitant une attention immédiate et priorisez vos ressources efficacement.',
  icon: 'Map',
  order: 1,
  category: 'main',
};
```

### Semantic Considerations

- **title** should match terminology from spec (FR-004): exact names like "Cartographie des menaces", "Évaluation automatisée des risques"
- **description** uses present tense, second person ("Visualisez", "Pilotez")
- **benefitsText** focuses on outcomes ("Identifiez", "Priorisez") not features

---

## Entity 2: FeaturesCollection

Container for all features, organized by category (nested structure per clarification decision).

### Schema

```typescript
interface FeaturesCollection {
  main: Feature[]; // Primary features (7 cards)
  secondary: Feature[]; // Future features (empty initially)
}
```

### Constraints

- **main.length**: Exactly 7 features (FR-004 requirement)
- **main[].order**: Sequential 1-7, no gaps
- **secondary**: May be empty, reserved for future expansion

### Export Format (JSON)

```json
{
  "main": [
    {
      "key": "cartographie-menaces",
      "title": "Cartographie des menaces",
      "description": "Visualisez tous vos risques par processus, projet ou entité organisationnelle.",
      "benefitsText": "Identifiez en un coup d'œil les zones critiques...",
      "icon": "Map",
      "order": 1,
      "category": "main"
    }
    // ... 6 more features
  ],
  "secondary": []
}
```

### Usage

```typescript
// Access features
import { FEATURES_DATA } from '@/lib/features-data';

const mainFeatures = FEATURES_DATA.main; // Type: readonly Feature[]

// Iterate in FeaturesGrid
{FEATURES_DATA.main.map((feature) => (
  <FeatureCard key={feature.key} {...feature} />
))}

// Export JSON (if needed for external tools)
const json = JSON.stringify(FEATURES_DATA, null, 2);
```

---

## Entity 3: ComparisonItem

Represents a single row in the "Avant GAMR vs Avec GAMR" comparison table.

### Schema

```typescript
interface ComparisonItem {
  dimension: string; // Aspect being compared (e.g., "Productivité")
  situationBefore: string; // Description of pain point before GAMR
  situationWithGAMR: string; // Description of improvement with GAMR
  improvementMetric?: string; // Optional quantified improvement (e.g., "+70%")
}
```

### Validation Rules

- **dimension**: 3-30 characters, title case, from required set: "Productivité", "Conformité", "Gouvernance", "Visibilité", "Réactivité" (FR-006) + 3-5 additional dimensions
- **situationBefore**: 10-100 characters, describes problem/friction, neutral or slightly negative tone
- **situationWithGAMR**: 10-100 characters, describes solution/benefit, positive tone, action-oriented
- **improvementMetric**: Optional, format: "+XX%" or "-XX%" or "XXx faster", max 20 characters

### Collection

```typescript
type ComparisonTable = ComparisonItem[]; // Length: 8-10 items (FR-005)
```

### Sample Data

```typescript
const comparisonData: ComparisonTable = [
  {
    dimension: 'Productivité',
    situationBefore: 'Audits manuels fastidieux de 2-3 jours par site',
    situationWithGAMR: 'Évaluations automatisées complétées en 2 heures',
    improvementMetric: '+70%'
  },
  {
    dimension: 'Conformité',
    situationBefore: 'Préparation d'audit sur 3 semaines avec fichiers Excel dispersés',
    situationWithGAMR: 'Rapports conformité générés en 1 clic, prêts pour auditeurs',
    improvementMetric: '-95% temps'
  },
  {
    dimension: 'Gouvernance',
    situationBefore: 'Responsabilités floues, actions correctives non suivies',
    situationWithGAMR: 'Assignations claires avec échéances et notifications automatiques',
  },
  // ... 5-7 more items
];
```

### Usage

```tsx
// In ComparisonTable component
<tbody>
  {comparisonData.map((item) => (
    <tr key={item.dimension}>
      <td className="font-semibold">{item.dimension}</td>
      <td>
        <span className="text-red-600">❌</span> {item.situationBefore}
      </td>
      <td>
        <span className="text-green-600">✅</span> {item.situationWithGAMR}
        {item.improvementMetric && (
          <span className="ml-2 font-bold text-green-700">{item.improvementMetric}</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
```

---

## Entity 4: TooltipDefinition

Represents a technical term with its explanatory definition (FR-011b requirement).

### Schema

```typescript
interface TooltipDefinition {
  term: string; // Technical term (e.g., "GAMR", "cartographie", "heatmap")
  definition: string; // Plain-language explanation (max 200 chars)
  context?: string; // Optional additional context for disambiguation
}
```

### Validation Rules

- **term**: 2-50 characters, case-sensitive, matches exact usage in content
- **definition**: 10-200 characters, plain language (avoid jargon), complete sentence with period
- **context**: Optional, max 100 characters, provides domain-specific clarification

### Collection

```typescript
type TooltipDictionary = Record<string, TooltipDefinition>;
// OR
type TooltipList = TooltipDefinition[]; // Array for iteration
```

### Sample Data

```typescript
const tooltipDefinitions: TooltipDictionary = {
  'GAMR': {
    term: 'GAMR',
    definition: 'Gestion et Analyse Méthodique des Risques - méthodologie structurée pour identifier, évaluer et piloter les risques organisationnels.',
  },
  'cartographie': {
    term: 'cartographie',
    definition: 'Visualisation graphique de tous les risques identifiés, organisés par domaine, processus ou projet.',
    context: 'Dans le contexte de la gestion des risques'
  },
  'heatmap': {
    term: 'heatmap',
    definition: 'Carte thermique utilisant des couleurs (vert à rouge) pour représenter visuellement l'intensité ou la criticité des risques.',
  },
  'scoring': {
    term: 'scoring',
    definition: 'Attribution d'une note chiffrée à chaque risque selon sa probabilité, sa vulnérabilité et son impact.',
  },
  // ... additional terms from feature descriptions
};
```

### Usage

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { tooltipDefinitions } from '@/lib/tooltip-definitions';

// Inline usage
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-dotted cursor-help">
        {tooltipDefinitions.GAMR.term}
      </span>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltipDefinitions.GAMR.definition}</p>
      {tooltipDefinitions.GAMR.context && (
        <p className="text-xs text-muted-foreground mt-1">
          {tooltipDefinitions.GAMR.context}
        </p>
      )}
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Helper component for reusability
<TermWithTooltip term="GAMR" />
```

---

## Entity 5: PageSection

Represents a logical section of the features page (for content organization).

### Schema

```typescript
interface PageSection {
  id: string; // Unique identifier (used for anchor links)
  type: SectionType; // Section variant
  title: string; // Section heading
  order: number; // Display order (1-6)
}

type SectionType = 'hero' | 'overview' | 'features' | 'comparison' | 'partner' | 'cta';
```

### Validation Rules

- **id**: Lowercase kebab-case, unique, pattern: `/^[a-z][a-z0-9-]*$/`
- **type**: Must be one of 6 literal types (enforced by TypeScript enum)
- **title**: 3-60 characters, may be empty for hero/cta sections (no visible heading)
- **order**: 1-6, sequential, matches visual layout order

### Sample Data

```typescript
const pageSections: PageSection[] = [
  { id: 'hero', type: 'hero', title: '', order: 1 },
  { id: 'vue-ensemble', type: 'overview', title: 'Une plateforme complète', order: 2 },
  { id: 'fonctionnalites', type: 'features', title: 'Fonctionnalités principales', order: 3 },
  { id: 'benefices', type: 'comparison', title: 'Bénéfices pour les utilisateurs', order: 4 },
  { id: 'partenaire-aspci', type: 'partner', title: 'ASPCI, un partenaire de confiance', order: 5 },
  { id: 'conversion', type: 'cta', title: '', order: 6 },
];
```

### Usage

- **Semantic HTML**: Each section maps to `<section id={section.id}>` element
- **Navigation**: IDs enable anchor links for table of contents (future enhancement)
- **Analytics**: Section IDs track scroll depth and engagement per section
- **A11Y**: Type determines ARIA landmarks (e.g., `role="complementary"` for partner)

---

## Derived Types & Utilities

### Type Exports

```typescript
// Export all types for use across codebase
export type {
  Feature,
  FeaturesCollection,
  ComparisonItem,
  ComparisonTable,
  TooltipDefinition,
  TooltipDictionary,
  PageSection,
  SectionType,
};
```

### Type Guards

```typescript
// Runtime type validation (if needed for external data)
function isFeature(obj: unknown): obj is Feature {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'key' in obj &&
    'title' in obj &&
    'description' in obj &&
    'benefitsText' in obj &&
    'icon' in obj &&
    'order' in obj &&
    'category' in obj
  );
}
```

### Utility Functions

```typescript
// Sort features by order (defensive coding)
export function sortFeaturesByOrder(features: Feature[]): Feature[] {
  return [...features].sort((a, b) => a.order - b.order);
}

// Get feature by key
export function getFeatureByKey(key: string): Feature | undefined {
  return (
    FEATURES_DATA.main.find((f) => f.key === key) ||
    FEATURES_DATA.secondary.find((f) => f.key === key)
  );
}

// Export JSON (FR-015 requirement)
export function exportFeaturesJSON(): string {
  return JSON.stringify(FEATURES_DATA, null, 2);
}
```

---

## Data File Structure

Implementation files to create:

```
src/lib/
├── features-data.ts          # FEATURES_DATA constant + Feature type
├── comparison-data.ts         # comparisonData constant + ComparisonItem type
├── tooltip-definitions.ts     # tooltipDefinitions constant + TooltipDefinition type
└── page-sections.ts           # pageSections constant + PageSection type (optional)

src/types/
└── features.ts                # Shared type exports (import from lib files)
```

---

## Validation Checklist

Before implementation, verify:

- [ ] All 7 feature titles match spec FR-004 exactly
- [ ] Comparison table includes 5 mandatory dimensions (FR-006) + 3-5 additional
- [ ] All technical terms in features have tooltip definitions
- [ ] Icon names are valid Lucide React icons
- [ ] Character limits enforced (ESLint rule or runtime check)
- [ ] JSON export produces valid structure matching clarification schema

---

## Extensibility

Design supports future enhancements:

1. **Additional features**: Add to `FEATURES_DATA.secondary` array
2. **Localization**: Wrap strings in i18n function (`t('features.cartographie.title')`)
3. **CMS integration**: Replace constants with API fetch, types remain unchanged
4. **Feature flags**: Add `enabled: boolean` field to Feature interface
5. **Analytics**: Add `analyticsKey: string` for tracking feature interactions

---

**Last Updated**: 2025-10-09  
**Next**: Generate `contracts/` directory with component interfaces
