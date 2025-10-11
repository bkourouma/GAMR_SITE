# Features JSON Schema

**Feature**: Page Fonctionnalités  
**Date**: 2025-10-09  
**Status**: ✅ Complete

## Overview

This document defines the JSON schema for the features data export (FR-015 requirement). Schema follows the nested category structure (`{main: [...], secondary: [...]}`) confirmed in clarifications.

---

## JSON Schema (v1.0.0)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://gamr.io/schemas/features-v1.json",
  "title": "GAMR Features Collection",
  "description": "Structured data for GAMR platform features organized by category",
  "type": "object",
  "required": ["main", "secondary"],
  "properties": {
    "main": {
      "type": "array",
      "description": "Primary features (displayed on features page)",
      "minItems": 7,
      "maxItems": 7,
      "items": {
        "$ref": "#/definitions/feature"
      }
    },
    "secondary": {
      "type": "array",
      "description": "Secondary or future features (reserved for expansion)",
      "items": {
        "$ref": "#/definitions/feature"
      }
    }
  },
  "definitions": {
    "feature": {
      "type": "object",
      "required": ["key", "title", "description", "benefitsText", "icon", "order", "category"],
      "properties": {
        "key": {
          "type": "string",
          "description": "Unique identifier in kebab-case format",
          "pattern": "^[a-z][a-z0-9-]*$",
          "minLength": 3,
          "maxLength": 50,
          "examples": ["cartographie-menaces", "evaluation-automatisee"]
        },
        "title": {
          "type": "string",
          "description": "Display name of the feature",
          "minLength": 3,
          "maxLength": 50,
          "examples": ["Cartographie des menaces", "Évaluation automatisée des risques"]
        },
        "description": {
          "type": "string",
          "description": "Short feature description (2 sentences max)",
          "minLength": 10,
          "maxLength": 150,
          "examples": ["Visualisez tous vos risques par processus, projet ou entité."]
        },
        "benefitsText": {
          "type": "string",
          "description": "Benefits-oriented copy explaining value",
          "minLength": 20,
          "maxLength": 250,
          "examples": [
            "Identifiez rapidement les zones critiques nécessitant une attention immédiate."
          ]
        },
        "icon": {
          "type": "string",
          "description": "Lucide React icon name",
          "examples": ["Map", "Shield", "BarChart", "Users", "FileText", "Lock", "TrendingUp"],
          "enum": [
            "Map",
            "Shield",
            "BarChart",
            "Users",
            "FileText",
            "Lock",
            "TrendingUp",
            "CheckCircle",
            "AlertTriangle",
            "Activity",
            "Settings",
            "Search",
            "Download",
            "Upload",
            "Eye",
            "Bell",
            "Calendar",
            "Clock"
          ]
        },
        "order": {
          "type": "integer",
          "description": "Display order (1-7 for main, 1+ for secondary)",
          "minimum": 1,
          "examples": [1, 2, 3]
        },
        "category": {
          "type": "string",
          "description": "Feature category",
          "enum": ["main", "secondary"],
          "examples": ["main"]
        }
      },
      "additionalProperties": false
    }
  }
}
```

---

## TypeScript Schema Definition

```typescript
/**
 * TypeScript representation of the JSON schema
 * Ensures compile-time type safety for features data
 */

/**
 * Individual feature within the GAMR platform
 */
export interface Feature {
  /** Unique identifier (kebab-case) */
  key: string;

  /** Display name (max 50 chars) */
  title: string;

  /** Short description (max 150 chars, 2 sentences) */
  description: string;

  /** Benefits-oriented copy (max 250 chars) */
  benefitsText: string;

  /** Lucide React icon name */
  icon: LucideIconName;

  /** Display order (sequential per category) */
  order: number;

  /** Feature category */
  category: 'main' | 'secondary';
}

/**
 * Collection of features organized by category
 * Follows nested structure per FR-015 clarification
 */
export interface FeaturesCollection {
  /** Primary features (exactly 7) displayed on features page */
  main: Feature[];

  /** Secondary/future features (0+) reserved for expansion */
  secondary: Feature[];
}

/**
 * Lucide icon names used in features
 * Subset of all Lucide icons for validation
 */
export type LucideIconName =
  | 'Map'
  | 'Shield'
  | 'BarChart'
  | 'Users'
  | 'FileText'
  | 'Lock'
  | 'TrendingUp'
  | 'CheckCircle'
  | 'AlertTriangle'
  | 'Activity'
  | 'Settings'
  | 'Search'
  | 'Download'
  | 'Upload'
  | 'Eye'
  | 'Bell'
  | 'Calendar'
  | 'Clock';
```

---

## Example: Valid Features Data

```json
{
  "main": [
    {
      "key": "cartographie-menaces",
      "title": "Cartographie des menaces",
      "description": "Visualisez tous vos risques par processus, projet ou entité organisationnelle.",
      "benefitsText": "Identifiez en un coup d'œil les zones critiques nécessitant une attention immédiate et priorisez vos ressources efficacement.",
      "icon": "Map",
      "order": 1,
      "category": "main"
    },
    {
      "key": "evaluation-automatisee",
      "title": "Évaluation automatisée des risques",
      "description": "Calculs dynamiques selon critères personnalisables (probabilité, vulnérabilité, impact).",
      "benefitsText": "Éliminez les biais subjectifs et obtenez des évaluations cohérentes basées sur une méthodologie éprouvée.",
      "icon": "BarChart",
      "order": 2,
      "category": "main"
    },
    {
      "key": "priorites-action",
      "title": "Priorités d'action & suivi des mesures",
      "description": "Suivi des plans d'atténuation avec assignations, échéances et notifications automatiques.",
      "benefitsText": "Ne manquez jamais une tâche critique et maintenez une responsabilité claire sur tous les risques identifiés.",
      "icon": "CheckCircle",
      "order": 3,
      "category": "main"
    },
    {
      "key": "indicateurs-performance",
      "title": "Indicateurs de performance",
      "description": "Tableaux de bord interactifs, heatmaps, scoring global et par domaine sécurité.",
      "benefitsText": "Visualisez votre posture de sécurité en temps réel et prenez des décisions éclairées basées sur des métriques concrètes.",
      "icon": "TrendingUp",
      "order": 4,
      "category": "main"
    },
    {
      "key": "collaboration-validation",
      "title": "Collaboration & validation",
      "description": "Workflow multi-utilisateurs avec approbations, commentaires et notifications en temps réel.",
      "benefitsText": "Facilitez la coordination entre équipes et accélérez les processus de validation avec des workflows structurés.",
      "icon": "Users",
      "order": 5,
      "category": "main"
    },
    {
      "key": "rapports-audits",
      "title": "Rapports & audits intelligents",
      "description": "Génération automatique de rapports Word/PDF exportables, prêts pour audits de conformité.",
      "benefitsText": "Préparez vos audits en quelques clics et démontrez votre conformité avec des rapports professionnels instantanés.",
      "icon": "FileText",
      "order": 6,
      "category": "main"
    },
    {
      "key": "securite-tracabilite",
      "title": "Sécurité & traçabilité",
      "description": "Gestion des rôles granulaire, journal d'audit complet, conformité ISO/ANSSI.",
      "benefitsText": "Protégez vos données sensibles et maintenez une traçabilité complète pour répondre aux exigences réglementaires.",
      "icon": "Lock",
      "order": 7,
      "category": "main"
    }
  ],
  "secondary": []
}
```

---

## Validation Rules

### Required Fields

All 7 fields are mandatory for each feature:

- ✅ `key` - Must be unique across all features
- ✅ `title` - Must match spec FR-004 names
- ✅ `description` - Action-oriented, present tense
- ✅ `benefitsText` - Value-focused, explains "why"
- ✅ `icon` - Must be valid Lucide icon name
- ✅ `order` - Sequential 1-7 for main features
- ✅ `category` - Literal 'main' or 'secondary'

### String Length Validation

| Field        | Min | Max | Rule                            |
| ------------ | --- | --- | ------------------------------- |
| key          | 3   | 50  | Kebab-case pattern              |
| title        | 3   | 50  | Sentence case, no period        |
| description  | 10  | 150 | 1-2 sentences, ends with period |
| benefitsText | 20  | 250 | Benefits-focused copy           |
| icon         | -   | -   | Must be in enum list            |

### Array Validation

- **main**: Exactly 7 items (minItems: 7, maxItems: 7)
- **secondary**: 0+ items (no upper limit)

### Uniqueness Validation

- **key**: Must be unique across main + secondary arrays
- **order**: Must be unique within each category (main, secondary)

---

## Runtime Validation (Zod)

Optional runtime validation using Zod schema:

```typescript
import { z } from 'zod';

const FeatureSchema = z.object({
  key: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z][a-z0-9-]*$/, 'Must be kebab-case'),

  title: z.string().min(3).max(50),

  description: z.string().min(10).max(150),

  benefitsText: z.string().min(20).max(250),

  icon: z.enum([
    'Map',
    'Shield',
    'BarChart',
    'Users',
    'FileText',
    'Lock',
    'TrendingUp',
    'CheckCircle',
    'AlertTriangle',
    // ... other icons
  ]),

  order: z.number().int().positive(),

  category: z.enum(['main', 'secondary']),
});

const FeaturesCollectionSchema = z.object({
  main: z.array(FeatureSchema).length(7, 'Must have exactly 7 main features'),

  secondary: z.array(FeatureSchema),
});

// Usage
export function validateFeaturesData(data: unknown): FeaturesCollection {
  return FeaturesCollectionSchema.parse(data);
}

// In data file
import { FEATURES_DATA } from '@/lib/features-data';
validateFeaturesData(FEATURES_DATA); // Throws if invalid
```

---

## Export Utility

Function to export TypeScript data as JSON (FR-015):

```typescript
import { FEATURES_DATA } from '@/lib/features-data';
import type { FeaturesCollection } from '@/types/features';

/**
 * Export features data as formatted JSON string
 * @param pretty - Include indentation (default: true)
 * @returns JSON string representation
 */
export function exportFeaturesJSON(pretty: boolean = true): string {
  return JSON.stringify(FEATURES_DATA, null, pretty ? 2 : 0);
}

/**
 * Export features data as JSON file (Node.js environment)
 * @param filepath - Output file path
 */
export async function exportFeaturesFile(filepath: string): Promise<void> {
  const fs = await import('fs/promises');
  const json = exportFeaturesJSON();
  await fs.writeFile(filepath, json, 'utf-8');
  console.log(`Features exported to ${filepath}`);
}

// CLI usage example
// npx tsx scripts/export-features.ts
```

---

## Schema Versioning

Schema follows semantic versioning:

**Current Version**: `v1.0.0`

### Version History

| Version | Date       | Changes                                                          |
| ------- | ---------- | ---------------------------------------------------------------- |
| 1.0.0   | 2025-10-09 | Initial schema with 7 required fields, nested category structure |

### Breaking Changes (MAJOR)

- Removing required fields
- Changing field data types
- Renaming fields
- Changing category structure

### New Features (MINOR)

- Adding optional fields
- Adding new icon options to enum
- Expanding description length limits

### Fixes (PATCH)

- Fixing regex patterns
- Updating examples
- Clarifying descriptions

---

## Integration Examples

### API Endpoint (if needed)

```typescript
// app/api/features/route.ts
import { FEATURES_DATA } from '@/lib/features-data';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(FEATURES_DATA, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache 1 hour
    },
  });
}
```

### GraphQL Schema (alternative)

```graphql
type Feature {
  key: ID!
  title: String!
  description: String!
  benefitsText: String!
  icon: String!
  order: Int!
  category: FeatureCategory!
}

enum FeatureCategory {
  MAIN
  SECONDARY
}

type FeaturesCollection {
  main: [Feature!]!
  secondary: [Feature!]!
}

type Query {
  features: FeaturesCollection!
  feature(key: ID!): Feature
}
```

---

## Error Handling

Validation error examples:

```typescript
// Missing required field
{
  "error": "ValidationError",
  "message": "Missing required field: benefitsText",
  "path": "main[0].benefitsText"
}

// Invalid format
{
  "error": "ValidationError",
  "message": "key must match pattern /^[a-z][a-z0-9-]*$/",
  "path": "main[2].key",
  "received": "Cartographie Menaces" // Invalid: not kebab-case
}

// Array length violation
{
  "error": "ValidationError",
  "message": "main array must have exactly 7 items",
  "path": "main",
  "received": 6,
  "expected": 7
}
```

---

## Testing

Schema validation test examples:

```typescript
import { validateFeaturesData } from '@/lib/features-schema';
import { FEATURES_DATA } from '@/lib/features-data';

describe('Features Schema Validation', () => {
  it('validates correct features data', () => {
    expect(() => validateFeaturesData(FEATURES_DATA)).not.toThrow();
  });

  it('rejects invalid key format', () => {
    const invalid = {
      ...FEATURES_DATA,
      main: [
        {
          ...FEATURES_DATA.main[0],
          key: 'Invalid Key', // Space not allowed
        },
      ],
    };
    expect(() => validateFeaturesData(invalid)).toThrow(/kebab-case/);
  });

  it('rejects incorrect main array length', () => {
    const invalid = {
      ...FEATURES_DATA,
      main: FEATURES_DATA.main.slice(0, 5), // Only 5 items
    };
    expect(() => validateFeaturesData(invalid)).toThrow(/exactly 7/);
  });
});
```

---

**Last Updated**: 2025-10-09  
**Schema Version**: 1.0.0  
**Next**: Generate `tooltips.md`
