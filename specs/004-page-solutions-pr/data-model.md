# Data Model: Page Solutions - Secteurs d'Activité

**Feature**: Page Solutions  
**Date**: 2025-10-09  
**Status**: Completed

## Overview

This document defines the data entities and their relationships for the Solutions page. The page displays static, content-driven data about 5 industry sectors and their relationship to GAMR's capabilities. No database or API is required; all data is stored as TypeScript constants and exported for potential external consumption.

---

## Entity Definitions

### 1. Industry (Secteur d'Activité)

Represents an industry sector that GAMR serves, including its regulatory context and specific solutions.

**Purpose**: Core entity containing all information about a sector for display on the Solutions page.

**Attributes**:

| Field       | Type     | Required | Validation                              | Description                                                          |
| ----------- | -------- | -------- | --------------------------------------- | -------------------------------------------------------------------- |
| `id`        | string   | Yes      | Unique, lowercase, hyphenated           | URL-safe identifier for anchor navigation (e.g., "secteur-bancaire") |
| `nom`       | string   | Yes      | 3-100 chars                             | Display name of the sector (e.g., "Secteur bancaire et financier")   |
| `normes`    | string[] | Yes      | Array length 1-3                        | List of regulatory standards/frameworks applicable to this sector    |
| `defis`     | string[] | Yes      | Array length 1-5                        | Key challenges faced by organizations in this sector                 |
| `solutions` | string[] | Yes      | Array length 1-5                        | GAMR capabilities/benefits addressing sector challenges              |
| `icone`     | string   | Yes      | Valid file path or React component name | Path to icon/illustration or name of icon component to display       |
| `order`     | number   | Optional | Integer 1-5                             | Display order on page (defaults to array index)                      |

**Type Definition**:

```typescript
interface Industry {
  id: string;
  nom: string;
  normes: string[];
  defis: string[];
  solutions: string[];
  icone: string;
  order?: number;
}
```

**Example**:

```typescript
{
  id: 'secteur-bancaire',
  nom: 'Secteur bancaire et financier',
  normes: ['Bâle III', 'ISO 27001', 'AML/CFT (LBC/FT)'],
  defis: [
    'Risque opérationnel',
    'Fraude',
    'Cybersécurité',
    'Conformité réglementaire'
  ],
  solutions: [
    'Matrice de risques configurable (opérationnels, IT, conformité)',
    'Analyse d\'impact automatisée',
    'Génération de rapports pour les audits internes et BCEAO'
  ],
  icone: '/images/solutions/banking.svg',
  order: 4
}
```

**Validation Rules**:

- `id` MUST be unique across all industries
- `id` MUST match HTML id attribute rules (no spaces, special chars except hyphen)
- `normes` array MUST contain 1-3 items (per spec: "3 max")
- `nom` SHOULD NOT exceed 60 characters for responsive display
- `icone` path MUST resolve to existing asset or valid component name

---

### 2. Standard (Norme/Référentiel)

Represents a regulatory standard, framework, or certification applicable to one or more industries.

**Purpose**: Structured representation of compliance requirements for display in sections and comparison table.

**Attributes**:

| Field          | Type   | Required | Description                                 |
| -------------- | ------ | -------- | ------------------------------------------- |
| `code`         | string | Yes      | Short identifier (e.g., "ISO-14001")        |
| `nom`          | string | Yes      | Full name of standard (e.g., "ISO 14001")   |
| `description`  | string | Optional | Brief explanation (e.g., "environnement")   |
| `organisation` | string | Optional | Issuing body (e.g., "ISO", "OACI", "BCEAO") |

**Type Definition**:

```typescript
interface Standard {
  code: string;
  nom: string;
  description?: string;
  organisation?: string;
}
```

**Usage Note**:
While the `Standard` type is defined for potential future expansion (hover tooltips, linked detail pages), the current implementation stores standards as simple strings in the `Industry.normes` array. This matches spec requirement FR-008 through FR-012 which list standards as plain text.

**Example** (future enhancement):

```typescript
{
  code: 'ISO-14001',
  nom: 'ISO 14001',
  description: 'Management environnemental',
  organisation: 'ISO'
}
```

---

### 3. GAMRModule (Module GAMR)

Represents a GAMR platform capability or feature set particularly relevant to an industry sector.

**Purpose**: Used in comparison table to show which GAMR modules are most applicable to each sector.

**Attributes**:

| Field         | Type           | Required | Description                                           |
| ------------- | -------------- | -------- | ----------------------------------------------------- |
| `id`          | string         | Yes      | Unique identifier (e.g., "cartographie-risques")      |
| `nom`         | string         | Yes      | Display name (e.g., "Cartographie des risques")       |
| `description` | string         | Optional | Brief description of module functionality             |
| `category`    | ModuleCategory | Optional | Grouping (e.g., "evaluation", "reporting", "actions") |

**Type Definition**:

```typescript
type ModuleCategory = 'evaluation' | 'analyse' | 'reporting' | 'actions' | 'gouvernance';

interface GAMRModule {
  id: string;
  nom: string;
  description?: string;
  category?: ModuleCategory;
}
```

**Example**:

```typescript
{
  id: 'reporting-esg',
  nom: 'Reporting ESG consolidé',
  description: 'Génération automatique de rapports ESG pour bailleurs et investisseurs',
  category: 'reporting'
}
```

**Usage in Comparison Table**:
The table displays which modules are most used per sector. This can be represented as:

```typescript
interface IndustryModuleMapping {
  industryId: string;
  modules: string[]; // Array of GAMRModule IDs
}
```

---

### 4. PageSection

Represents a major structural section of the Solutions page.

**Purpose**: Defines page layout and component hierarchy for rendering and navigation.

**Attributes**:

| Field    | Type                | Required | Description                                       |
| -------- | ------------------- | -------- | ------------------------------------------------- |
| `id`     | string              | Yes      | Section identifier (e.g., "hero", "sectors-grid") |
| `type`   | SectionType         | Yes      | Component type to render                          |
| `order`  | number              | Yes      | Display order on page                             |
| `anchor` | string              | Optional | HTML id for anchor navigation                     |
| `props`  | Record<string, any> | Optional | Props to pass to section component                |

**Type Definition**:

```typescript
type SectionType = 'hero' | 'introduction' | 'sectors-grid' | 'comparison-table' | 'conversion-cta';

interface PageSection {
  id: string;
  type: SectionType;
  order: number;
  anchor?: string;
  props?: Record<string, any>;
}
```

**Example**:

```typescript
{
  id: 'hero-section',
  type: 'hero',
  order: 1,
  anchor: undefined, // Hero doesn't need anchor (top of page)
  props: {
    title: 'Des solutions adaptées à chaque secteur',
    subtitle: 'GAMR s\'aligne sur vos normes industrielles...',
    primaryCTA: { label: 'Découvrir les fonctionnalités', href: '/fonctionnalites' },
    secondaryCTA: { label: 'Demander une démo', href: '/demo' }
  }
}
```

---

## Entity Relationships

```
Industry (1) ----< (N) Normes (strings)
    |
    | references
    |
    v
GAMRModule (N) ----< (N) Industries (many-to-many via IndustryModuleMapping)

PageSection (contains)
    |
    +-- HeroSection (displays CTAs)
    +-- IntroSection (displays static text)
    +-- SectorsGrid (displays multiple Industries)
    |       |
    |       +-- SolutionCard (displays one Industry)
    |
    +-- ComparisonTable (displays Industries + GAMRModules)
    +-- ConversionCTA (displays CTAs)
```

**Relationship Notes**:

- Each `Industry` has 1-3 `normes` (stored as string array, not foreign key)
- Each `Industry` maps to multiple `GAMRModule` instances (for comparison table)
- `PageSection` entities define component hierarchy but don't store foreign keys
- No database relationships; all data is static and co-located in code

---

## Data Sources

### Primary Source: Static TypeScript Constant

All industry data is defined in `src/lib/solutions-data.ts` (or co-located in `src/app/solutions/page.tsx`):

```typescript
// src/lib/solutions-data.ts
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
  // ... 4 other industries (Aéroportuaire, Gouvernement, Bancaire, Santé)
];
```

**Rationale for Co-location**:

- Static content unlikely to change frequently
- No need for CMS or database
- Type safety at compile time
- SSG optimization (data bundled at build time)
- Easy to export for external consumption (FR-018)

### Secondary Sources: None

No external APIs, databases, or CMS integrations. All content is version-controlled in Git.

---

## Data Validation

### Compile-Time Validation (TypeScript)

```typescript
// Type guard for runtime validation (if loading from external source)
function isValidIndustry(obj: any): obj is Industry {
  return (
    typeof obj.id === 'string' &&
    typeof obj.nom === 'string' &&
    Array.isArray(obj.normes) &&
    obj.normes.length >= 1 &&
    obj.normes.length <= 3 &&
    Array.isArray(obj.defis) &&
    Array.isArray(obj.solutions) &&
    typeof obj.icone === 'string'
  );
}

// Validation at module load (catches errors early)
industries.forEach((industry, index) => {
  if (!isValidIndustry(industry)) {
    throw new Error(`Invalid industry data at index ${index}`);
  }
});
```

### Runtime Validation (Zod Schema)

For stricter validation (optional enhancement):

```typescript
import { z } from 'zod';

const IndustrySchema = z.object({
  id: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  nom: z.string().min(3).max(100),
  normes: z.array(z.string()).min(1).max(3),
  defis: z.array(z.string()).min(1).max(5),
  solutions: z.array(z.string()).min(1).max(5),
  icone: z.string(),
  order: z.number().int().min(1).max(5).optional(),
});

export const industries = IndustrySchema.array().parse(industriesRaw);
```

---

## Data Transformations

### For Comparison Table

Transform `Industry[]` into table rows with module mappings:

```typescript
interface ComparisonTableRow {
  secteur: string;
  normesKeys: string[];
  modulesGAMR: string[];
}

function transformForTable(industries: Industry[]): ComparisonTableRow[] {
  return industries.map((industry) => ({
    secteur: industry.nom,
    normesKeys: industry.normes,
    modulesGAMR: extractModulesFromSolutions(industry.solutions),
  }));
}

// Extract module names from solution descriptions
function extractModulesFromSolutions(solutions: string[]): string[] {
  // Simple extraction: first 3-5 words of each solution
  return solutions.map((s) => s.split(' ').slice(0, 4).join(' ') + '...');
}
```

### For JSON Export (FR-018)

Export format matches `Industry` interface exactly:

```typescript
// app/solutions/page.tsx
export const industries: Industry[] = [
  /* data */
];

// External consumers can import:
// import { industries } from '@/app/solutions/page';
```

---

## State Management

### No Runtime State Needed

- All data is static and loaded at build time (SSG)
- No user interactions modify data
- No filtering, sorting, or search functionality required by spec
- Component state limited to UI concerns (hover effects, animations)

### Potential Future State (Not in Spec)

If interactive features are added:

```typescript
// Filter industries by search term
const [searchTerm, setSearchTerm] = useState('');
const filteredIndustries = industries.filter((i) =>
  i.nom.toLowerCase().includes(searchTerm.toLowerCase())
);

// Expand/collapse sector cards
const [expandedSector, setExpandedSector] = useState<string | null>(null);
```

---

## Migration Path

### Current: Static TypeScript Constant

✅ Sufficient for spec requirements  
✅ Type-safe, performant, version-controlled

### Future: Headless CMS (if needed)

If content changes frequently or non-technical team needs to edit:

1. **Choose CMS**: Contentful, Strapi, Sanity
2. **Define content type** matching `Industry` interface
3. **Fetch at build time** (ISR with Next.js revalidate)
4. **Maintain type safety** via TypeScript SDK or codegen

```typescript
// Future implementation
async function getIndustries(): Promise<Industry[]> {
  const response = await fetch('https://api.cms.com/industries');
  const data = await response.json();
  return IndustrySchema.array().parse(data); // Runtime validation
}
```

### Future: API Endpoint (if needed)

If external systems need to consume data:

1. **Create API route**: `/api/solutions/industries`
2. **Return JSON** matching `Industry[]` type
3. **Add caching headers** for performance
4. **Version API** for backward compatibility

```typescript
// app/api/solutions/industries/route.ts
export async function GET() {
  return Response.json(industries);
}
```

---

## Testing Data Integrity

### Unit Tests

```typescript
// lib/solutions-data.test.ts
describe('Industries data', () => {
  test('contains exactly 5 industries', () => {
    expect(industries).toHaveLength(5);
  });

  test('all industries have unique IDs', () => {
    const ids = industries.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('all industries have 1-3 normes', () => {
    industries.forEach((industry) => {
      expect(industry.normes.length).toBeGreaterThanOrEqual(1);
      expect(industry.normes.length).toBeLessThanOrEqual(3);
    });
  });

  test('banking sector includes required normes', () => {
    const banking = industries.find((i) => i.id === 'secteur-bancaire');
    expect(banking?.normes).toContain('Bâle III');
    expect(banking?.normes).toContain('ISO 27001');
    expect(banking?.normes).toContain('AML/CFT (LBC/FT)');
  });
});
```

---

## Data Model Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Industry                            │
├─────────────────────────────────────────────────────────┤
│ - id: string                                            │
│ - nom: string                                           │
│ - normes: string[]          [1..3]                      │
│ - defis: string[]           [1..5]                      │
│ - solutions: string[]       [1..5]                      │
│ - icone: string                                         │
│ - order?: number                                        │
└─────────────────────────────────────────────────────────┘
                    │
                    │ uses (display only)
                    ▼
┌─────────────────────────────────────────────────────────┐
│                   GAMRModule                            │
├─────────────────────────────────────────────────────────┤
│ - id: string                                            │
│ - nom: string                                           │
│ - description?: string                                  │
│ - category?: ModuleCategory                             │
└─────────────────────────────────────────────────────────┘
```

---

**Status**: ✅ Data model complete. Types defined, validation strategy outlined, no database required.
