# Data Model: Page À Propos

**Feature**: 006-redige-la-page  
**Date**: October 9, 2025  
**Status**: Complete ✅

## Overview

This document defines the data entities for the About page content. All entities are strongly typed with TypeScript and validated with Zod schemas to ensure content quality and consistency.

## Entity Definitions

### 1. CompanyInfo

Represents the company's mission, history, and foundational information.

**TypeScript Interface**:

```typescript
interface CompanyInfo {
  mission: {
    headline: string; // Main headline (e.g., "Notre mission")
    tagline: string; // Short tagline (30-50 chars)
    description: string; // Full mission statement (100-300 words)
    foundedYear: number; // Year company was founded
  };
  story: {
    intro: string; // Introduction to company story (50-100 words)
    sections: Array<{
      id: string; // Unique identifier (e.g., "origins", "growth")
      title: string; // Section title (e.g., "Nos origines")
      content: string; // Section content (100-200 words)
      year?: number; // Optional year marker for timeline
      imageUrl?: string; // Optional illustration
    }>;
  };
  contact: {
    email: string; // General contact email
    phone?: string; // Optional phone number
    address?: string; // Optional physical address
  };
}
```

**Zod Schema**:

```typescript
import { z } from 'zod';

export const CompanyInfoSchema = z.object({
  mission: z.object({
    headline: z.string().min(5).max(100),
    tagline: z.string().min(10).max(80),
    description: z.string().min(100).max(1500), // ~300 words
    foundedYear: z.number().int().min(2000).max(new Date().getFullYear()),
  }),
  story: z.object({
    intro: z.string().min(50).max(500),
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string().min(5).max(100),
          content: z.string().min(100).max(1000),
          year: z.number().int().min(2000).max(new Date().getFullYear()).optional(),
          imageUrl: z.string().url().optional(),
        })
      )
      .min(1)
      .max(5), // 1-5 story sections
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;
```

**Validation Rules**:

- Mission description: 100-1500 characters (~20-300 words)
- Story sections: 1-5 sections maximum
- Founded year: Must be between 2000 and current year
- Email: Must be valid email format
- All text fields: No empty strings

**Example Data**:

```typescript
export const COMPANY_INFO: CompanyInfo = {
  mission: {
    headline: 'Simplifier la gestion des associations sportives',
    tagline: 'La plateforme tout-en-un pour gérer votre club',
    description:
      "GAMR est née d'une conviction : la gestion administrative ne devrait jamais être un frein à la passion sportive. Nous créons des outils intuitifs qui permettent aux dirigeants d'associations de se concentrer sur l'essentiel : développer leur club et accompagner leurs adhérents.",
    foundedYear: 2019,
  },
  story: {
    intro:
      "L'histoire de GAMR commence sur un terrain de sport, là où la passion rencontre la réalité administrative.",
    sections: [
      {
        id: 'origins',
        title: 'Les origines',
        content:
          "Fondée en 2019 par d'anciens dirigeants d'associations sportives, GAMR est née d'un constat simple : les outils de gestion existants étaient trop complexes, trop chers, ou inadaptés aux besoins réels des clubs.",
        year: 2019,
      },
      {
        id: 'growth',
        title: 'Notre croissance',
        content:
          "En 5 ans, nous sommes passés d'une petite équipe à une plateforme utilisée par plus de 150 associations et 10,000 licenciés à travers la France. Chaque fonctionnalité que nous développons est guidée par les retours de nos utilisateurs.",
        year: 2024,
      },
    ],
  },
  contact: {
    email: 'contact@gamr.fr',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France',
  },
};
```

---

### 2. TeamMember

Represents an individual team member profile.

**TypeScript Interface**:

```typescript
interface TeamMember {
  id: string; // Unique identifier (e.g., "john-doe")
  firstName: string; // First name
  lastName: string; // Last name
  role: string; // Job title (e.g., "Co-fondateur & CEO")
  bio: string; // Short biography (50-500 chars / ~10-100 words)
  imageUrl: string; // Relative path to team photo (e.g., "john-doe.jpg")
  email?: string; // Optional email for contact
  linkedIn?: string; // Optional LinkedIn profile URL
  twitter?: string; // Optional Twitter/X profile URL
  order: number; // Display order (1-based)
}
```

**Zod Schema**:

```typescript
export const TeamMemberSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/), // Lowercase with hyphens only
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  role: z.string().min(3).max(100),
  bio: z.string().min(50).max(500), // ~10-100 words
  imageUrl: z.string().regex(/^[a-z0-9-]+\.(jpg|png|webp)$/), // Filename only
  email: z.string().email().optional(),
  linkedIn: z.string().url().startsWith('https://linkedin.com/').optional(),
  twitter: z
    .string()
    .url()
    .startsWith('https://twitter.com/')
    .or(z.string().url().startsWith('https://x.com/'))
    .optional(),
  order: z.number().int().positive(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;
```

**Validation Rules**:

- ID: Lowercase alphanumeric with hyphens only (URL-friendly)
- Bio: 50-500 characters (roughly 10-100 words)
- Image URL: Filename only (path will be prefixed with `/images/team/`)
- Social URLs: Must be valid LinkedIn/Twitter/X URLs if provided
- Order: Positive integer for sorting (CEO/founders first)

**Example Data**:

```typescript
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'jean-dupont',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'Co-fondateur & CEO',
    bio: "Ancien dirigeant d'un club de basket pendant 10 ans, Jean a fondé GAMR pour simplifier la vie administrative des associations sportives. Passionné par le sport et l'innovation, il pilote la vision stratégique de l'entreprise.",
    imageUrl: 'jean-dupont.jpg',
    email: 'jean.dupont@gamr.fr',
    linkedIn: 'https://linkedin.com/in/jean-dupont',
    order: 1,
  },
  {
    id: 'marie-martin',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'CTO',
    bio: "Développeuse full-stack avec 15 ans d'expérience, Marie conçoit l'architecture technique de GAMR. Elle garantit la fiabilité, la sécurité et les performances de la plateforme.",
    imageUrl: 'marie-martin.jpg',
    linkedIn: 'https://linkedin.com/in/marie-martin',
    order: 2,
  },
];
```

---

### 3. CompanyValue

Represents a core company value or principle.

**TypeScript Interface**:

```typescript
interface CompanyValue {
  id: string; // Unique identifier (e.g., "innovation")
  name: string; // Value name (e.g., "Innovation")
  description: string; // Explanation (50-500 chars / ~10-100 words)
  icon: string; // Lucide icon name (e.g., "Lightbulb")
  order: number; // Display order (1-based)
}
```

**Zod Schema**:

```typescript
export const CompanyValueSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(50),
  description: z.string().min(50).max(500),
  icon: z.string().min(2).max(50), // Lucide icon name
  order: z.number().int().positive().max(10), // Max 10 values
});

export type CompanyValue = z.infer<typeof CompanyValueSchema>;
```

**Available Lucide Icons** (common for values):

- `Lightbulb` - Innovation
- `Award` - Excellence
- `Users` - Collaboration
- `Shield` - Integrity
- `Heart` - Passion
- `Target` - Focus
- `Zap` - Speed/Agility
- `TrendingUp` - Growth
- `CheckCircle` - Quality

**Validation Rules**:

- Name: 3-50 characters (concise value name)
- Description: 50-500 characters (~10-100 words)
- Order: 1-10 (recommend showing 3-5 values)
- Icon: Must be valid Lucide icon name

**Example Data**:

```typescript
export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'innovation',
    name: 'Innovation',
    description:
      "Nous repoussons constamment les limites de ce qui est possible dans la gestion sportive. Chaque fonctionnalité est pensée pour simplifier la vie des dirigeants et améliorer l'expérience des adhérents.",
    icon: 'Lightbulb',
    order: 1,
  },
  {
    id: 'excellence',
    name: 'Excellence',
    description:
      "La qualité n'est pas négociable. Nous testons rigoureusement chaque fonctionnalité et nous nous assurons que notre plateforme répond aux plus hauts standards de sécurité et de performance.",
    icon: 'Award',
    order: 2,
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description:
      "Nos meilleurs innovations naissent de l'écoute de nos utilisateurs. Nous travaillons main dans la main avec les associations pour co-créer les outils dont elles ont vraiment besoin.",
    icon: 'Users',
    order: 3,
  },
  {
    id: 'passion-sport',
    name: 'Passion Sport',
    description:
      'Le sport est au cœur de notre ADN. Nous comprenons les enjeux des clubs parce que nous en avons fait partie. Cette passion guide chaque décision que nous prenons.',
    icon: 'Heart',
    order: 4,
  },
];
```

---

### 4. AboutStat

Represents a key achievement or metric for social proof.

**TypeScript Interface**:

```typescript
interface AboutStat {
  id: string; // Unique identifier (e.g., "associations")
  value: string; // Display value (e.g., "150+", "5 ans")
  label: string; // Short label (e.g., "associations clientes")
  description?: string; // Optional longer explanation
  icon?: string; // Optional Lucide icon name
  order: number; // Display order (1-based)
}
```

**Zod Schema**:

```typescript
export const AboutStatSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  value: z.string().min(1).max(20), // Short display value
  label: z.string().min(3).max(100),
  description: z.string().max(200).optional(),
  icon: z.string().min(2).max(50).optional(),
  order: z.number().int().positive().max(12), // Max 12 stats
});

export type AboutStat = z.infer<typeof AboutStatSchema>;
```

**Validation Rules**:

- Value: 1-20 characters (keep it short for visual impact)
- Label: 3-100 characters (clear metric description)
- Order: 1-12 (recommend showing 4-6 stats)
- Description: Optional extended explanation (max 200 chars)

**Example Data**:

```typescript
export const ABOUT_STATS: AboutStat[] = [
  {
    id: 'experience',
    value: '5+',
    label: "ans d'expérience",
    description: 'Depuis 2019, nous accompagnons les associations sportives',
    icon: 'Calendar',
    order: 1,
  },
  {
    id: 'associations',
    value: '150+',
    label: 'associations clientes',
    description: 'Clubs de toutes tailles nous font confiance',
    icon: 'Users',
    order: 2,
  },
  {
    id: 'licenses',
    value: '10K+',
    label: 'licenciés gérés',
    description: 'Adhérents actifs sur la plateforme',
    icon: 'UserCheck',
    order: 3,
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'satisfaction client',
    description: 'Taux de satisfaction mesuré sur nos utilisateurs actifs',
    icon: 'ThumbsUp',
    order: 4,
  },
  {
    id: 'support',
    value: '<2h',
    label: 'temps de réponse support',
    description: 'Support réactif en français',
    icon: 'MessageCircle',
    order: 5,
  },
  {
    id: 'uptime',
    value: '99.9%',
    label: 'disponibilité plateforme',
    description: 'Infrastructure fiable et sécurisée',
    icon: 'Shield',
    order: 6,
  },
];
```

---

### 5. SocialProof

Represents client testimonials, logos, or certifications (optional for MVP).

**TypeScript Interface**:

```typescript
interface SocialProof {
  id: string; // Unique identifier
  type: 'logo' | 'testimonial' | 'certification';
  content: string; // Logo filename OR testimonial text
  source: string; // Company/person name
  role?: string; // For testimonials: person's role
  logoUrl?: string; // For logos: relative path
  order: number; // Display order
}
```

**Zod Schema**:

```typescript
export const SocialProofSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  type: z.enum(['logo', 'testimonial', 'certification']),
  content: z.string().min(3),
  source: z.string().min(2).max(100),
  role: z.string().max(100).optional(),
  logoUrl: z.string().optional(),
  order: z.number().int().positive(),
});

export type SocialProof = z.infer<typeof SocialProofSchema>;
```

**Example Data**:

```typescript
export const SOCIAL_PROOFS: SocialProof[] = [
  {
    id: 'club-basket-paris',
    type: 'logo',
    content: 'Club Basket Paris',
    source: 'Club Basket Paris',
    logoUrl: 'club-basket-paris.png',
    order: 1,
  },
  {
    id: 'tennis-club-lyon',
    type: 'testimonial',
    content:
      'GAMR a transformé notre gestion quotidienne. Nous avons gagné 10h par semaine sur les tâches administratives.',
    source: 'Sophie Lefebvre',
    role: 'Présidente, Tennis Club Lyon',
    order: 2,
  },
];
```

---

## Data Relationships

```mermaid
graph TD
    A[About Page] --> B[CompanyInfo]
    A --> C[TeamMember[]]
    A --> D[CompanyValue[]]
    A --> E[AboutStat[]]
    A --> F[SocialProof[]]

    B --> B1[Mission]
    B --> B2[Story]
    B --> B3[Contact]

    C --> C1[Profile Data]
    C --> C2[Image]
    C --> C3[Social Links]

    D --> D1[Icon]
    D --> D2[Description]

    E --> E1[Metric Display]
    E --> E2[Icon]

    F --> F1[Logo OR Testimonial]
```

## Data Storage

### File Location

All About page data stored in:

```
src/lib/about-data.ts
```

### File Structure

```typescript
/**
 * About Page Content Data
 * Feature: 006-redige-la-page
 *
 * All content for the About page with Zod validation
 */

import { z } from 'zod';

// 1. Schema definitions
export const CompanyInfoSchema = z.object({...});
export const TeamMemberSchema = z.object({...});
export const CompanyValueSchema = z.object({...});
export const AboutStatSchema = z.object({...});

// 2. Type exports
export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type CompanyValue = z.infer<typeof CompanyValueSchema>;
export type AboutStat = z.infer<typeof AboutStatSchema>;

// 3. Data constants
export const COMPANY_INFO: CompanyInfo = {...};
export const TEAM_MEMBERS: TeamMember[] = [...];
export const COMPANY_VALUES: CompanyValue[] = [...];
export const ABOUT_STATS: AboutStat[] = [...];

// 4. Validation (dev mode only)
if (process.env.NODE_ENV === 'development') {
  CompanyInfoSchema.parse(COMPANY_INFO);
  TEAM_MEMBERS.forEach(member => TeamMemberSchema.parse(member));
  COMPANY_VALUES.forEach(value => CompanyValueSchema.parse(value));
  ABOUT_STATS.forEach(stat => AboutStatSchema.parse(stat));
}

// 5. Helper functions
export function getTeamMemberById(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find(member => member.id === id);
}

export function getTeamMembersByOrder(): TeamMember[] {
  return [...TEAM_MEMBERS].sort((a, b) => a.order - b.order);
}

export function getValuesByOrder(): CompanyValue[] {
  return [...COMPANY_VALUES].sort((a, b) => a.order - b.order);
}

export function getStatsByOrder(): AboutStat[] {
  return [...ABOUT_STATS].sort((a, b) => a.order - b.order);
}
```

---

## Type Definitions File

All TypeScript types exported to:

```
src/types/about.ts
```

```typescript
/**
 * TypeScript types for About page entities
 * Feature: 006-redige-la-page
 */

export interface CompanyInfo {
  mission: {
    headline: string;
    tagline: string;
    description: string;
    foundedYear: number;
  };
  story: {
    intro: string;
    sections: Array<{
      id: string;
      title: string;
      content: string;
      year?: number;
      imageUrl?: string;
    }>;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  imageUrl: string;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  order: number;
}

export interface CompanyValue {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface SocialProof {
  id: string;
  type: 'logo' | 'testimonial' | 'certification';
  content: string;
  source: string;
  role?: string;
  logoUrl?: string;
  order: number;
}

// Utility type for all About page data
export interface AboutPageData {
  company: CompanyInfo;
  team: TeamMember[];
  values: CompanyValue[];
  stats: AboutStat[];
  socialProofs?: SocialProof[];
}
```

---

## Validation Strategy

### Development Mode

All data validated on import in development:

- Catches content errors early
- Validates word counts, URLs, image paths
- Ensures required fields present
- Validates data consistency

### Production Mode

Validation skipped in production for performance:

- Data already validated in development
- No runtime validation overhead
- Types enforce correctness at compile time

### Manual Content Updates

When updating content in `about-data.ts`:

1. Run `pnpm dev` to trigger dev-mode validation
2. Fix any Zod validation errors
3. Verify types with `pnpm type-check`
4. Review content in browser
5. Commit changes

---

## Migration Path to CMS

If future requirement to move content to CMS:

1. **Export JSON Schema** from Zod:

   ```typescript
   import { zodToJsonSchema } from 'zod-to-json-schema';
   const jsonSchema = zodToJsonSchema(TeamMemberSchema);
   ```

2. **API Fetch Pattern**:

   ```typescript
   // Instead of import from about-data.ts
   const teamMembers = await fetch('/api/about/team').then((r) => r.json());
   // Validate with Zod
   const validated = TeamMemberSchema.array().parse(teamMembers);
   ```

3. **Incremental Migration**:
   - Start with Team Members (most likely to change)
   - Keep Company Info in code (rarely changes)
   - Move Stats to API (updated regularly)

---

## Data Quality Checklist

Before deploying content:

- [ ] All team member bios are 50-500 characters
- [ ] All team photos are 800x800px, optimized to <50KB
- [ ] All URLs (LinkedIn, Twitter, emails) are valid
- [ ] Company mission description is 100-300 words
- [ ] Values descriptions are 50-100 words each
- [ ] Stats values are realistic and sourced
- [ ] All text is in French with correct accents
- [ ] No Lorem ipsum placeholder text remains
- [ ] Zod validation passes in dev mode
- [ ] TypeScript compiles without errors

---

**Data Model Status**: Complete ✅  
**Next Step**: Create component contracts
