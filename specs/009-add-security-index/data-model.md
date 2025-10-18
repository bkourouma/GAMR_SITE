# Data Model: Security Index Menu

**Feature**: Security Index Menu  
**Date**: 2024-12-19  
**Phase**: 1 - Design & Contracts

## Entity Definitions

### SecurityIndexPage

**Purpose**: Represents the main page entity containing all Security Index content

**Fields**:
- `id`: string - Unique identifier for the page
- `title`: string - Page title ("Indice de Sécurité")
- `description`: string - Meta description for SEO
- `methodology`: MethodologySection - Contains GAMR methodology explanation
- `scoreIndicators`: ScoreIndicator[] - Array of visual score indicators
- `processSteps`: ProcessStep[] - Array of 7-step evaluation process

**Relationships**:
- Contains multiple `ScoreIndicator` entities
- Contains multiple `ProcessStep` entities
- Contains one `MethodologySection` entity

### ScoreIndicator

**Purpose**: Represents a visual indicator for a specific security score range

**Fields**:
- `id`: string - Unique identifier
- `minScore`: number - Minimum score for this range
- `maxScore`: number - Maximum score for this range
- `color`: string - Tailwind CSS color class
- `label`: string - Human-readable label ("Risque Élevé", etc.)
- `description`: string - Explanation of what this range means
- `textColor`: string - Text color for contrast

**Validation Rules**:
- `minScore` must be >= 0
- `maxScore` must be <= 60
- `minScore` must be < `maxScore`
- `color` must be a valid Tailwind CSS class
- `textColor` must provide sufficient contrast with `color`

**State Transitions**: None (static entity)

### ProcessStep

**Purpose**: Represents one of the 7 steps in the GAMR evaluation process

**Fields**:
- `id`: string - Unique identifier
- `stepNumber`: number - Sequential step number (1-7)
- `title`: string - Step title in French
- `description`: string - Detailed explanation of the step
- `examples`: string[] - Optional examples for clarity
- `formula`: string - Optional formula if applicable (e.g., for step 6)

**Validation Rules**:
- `stepNumber` must be between 1 and 7
- `title` must not be empty
- `description` must not be empty
- `examples` array can be empty

**State Transitions**: None (static entity)

### MethodologySection

**Purpose**: Contains the high-level explanation of the GAMR methodology

**Fields**:
- `id`: string - Unique identifier
- `title`: string - Section title
- `objectives`: string[] - Array of GAMR objectives
- `overview`: string - General overview text
- `keyPoints`: string[] - Key points about the methodology
- `disclaimer`: string - Important disclaimer about methodology

**Validation Rules**:
- `title` must not be empty
- `objectives` array must contain at least 3 items
- `overview` must not be empty

**State Transitions**: None (static entity)

## Data Structure

```typescript
interface SecurityIndexPage {
  id: string;
  title: string;
  description: string;
  methodology: MethodologySection;
  scoreIndicators: ScoreIndicator[];
  processSteps: ProcessStep[];
}

interface ScoreIndicator {
  id: string;
  minScore: number;
  maxScore: number;
  color: string;
  label: string;
  description: string;
  textColor: string;
}

interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  examples?: string[];
  formula?: string;
}

interface MethodologySection {
  id: string;
  title: string;
  objectives: string[];
  overview: string;
  keyPoints: string[];
  disclaimer: string;
}
```

## Static Data Constants

The following static data will be stored in `/src/lib/constants/security-index.ts`:

### Score Indicators
```typescript
const SCORE_INDICATORS: ScoreIndicator[] = [
  {
    id: "high-risk",
    minScore: 0,
    maxScore: 10,
    color: "bg-red-500",
    label: "Risque Élevé",
    description: "Sécurité critique - Action immédiate requise",
    textColor: "text-white"
  },
  {
    id: "medium-high-risk", 
    minScore: 20,
    maxScore: 30,
    color: "bg-orange-500",
    label: "Risque Moyen-Élevé",
    description: "Sécurité préoccupante - Plan d'action nécessaire",
    textColor: "text-white"
  },
  {
    id: "medium-low-risk",
    minScore: 30,
    maxScore: 40,
    color: "bg-yellow-400", 
    label: "Risque Moyen-Faible",
    description: "Sécurité acceptable - Améliorations recommandées",
    textColor: "text-gray-900"
  },
  {
    id: "low-risk",
    minScore: 40,
    maxScore: 60,
    color: "bg-green-500",
    label: "Risque Faible", 
    description: "Sécurité satisfaisante - Maintenance continue",
    textColor: "text-white"
  }
];
```

### Process Steps
```typescript
const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "targets",
    stepNumber: 1,
    title: "Cibles Potentielles (CP)",
    description: "Identification des éléments critiques de l'entreprise qui pourraient être visés par des actes malveillants.",
    examples: ["Fonctions clés", "Personnes importantes", "Zones vulnérables", "Environnement immédiat"]
  },
  // ... additional steps 2-7
];
```

## Data Flow

1. **Page Load**: SecurityIndexPage data is loaded from static constants
2. **Component Rendering**: Each component receives relevant data subset
3. **User Interaction**: No data mutations (read-only page)
4. **Navigation**: User can navigate to other pages without data persistence

## Validation Rules

### Score Indicator Validation
- Score ranges must not overlap
- All scores 0-60 must be covered by exactly one indicator
- Color combinations must meet WCAG AA contrast requirements

### Process Step Validation  
- Must have exactly 7 steps
- Step numbers must be sequential (1-7)
- Each step must have non-empty title and description

### Content Validation
- All text content must be in French
- No technical jargon in user-facing text
- All descriptions must be business-friendly
