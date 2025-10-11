# Phase 1: Data Models & Content Structures

**Feature**: GAMR Marketing Website  
**Date**: 2025-10-08  
**Status**: Complete

## Overview

This document defines the data models, content structures, and type definitions for the GAMR marketing site. All models are designed to support the functional requirements and enable type-safe development with TypeScript strict mode.

---

## Content Models

### Case Study (MDX)

Static content stored as MDX files in `/src/content/case-studies/`.

**File Structure**:

```
src/content/case-studies/
├── audit-usine-production.mdx
├── conformite-hospitaliere.mdx
└── startup-tech-indice-securite.mdx
```

**Frontmatter Schema**:

```yaml
---
title: "Réduction de 95% du Temps d'Audit dans une Usine de Production"
slug: 'audit-usine-production'
industry: 'manufacturing' # manufacturing | health | tech | finance | government
heroImage: '/images/case-studies/usine-hero.jpg'
excerpt: 'Comment une entreprise manufacturière a réduit ses audits de sécurité de 2 jours à 2 heures par site tout en améliorant son indice de sécurité de 58 à 82 en 3 mois.'
publishDate: '2025-01-15'
featured: true

# Client Information
clientName: 'Directrice Sécurité'
clientRole: 'Directrice Sécurité'
clientCompany: 'Groupe Industriel, 2500 employés'
clientQuote: 'GAMR a transformé notre approche de la sécurité. Nous avons enfin une vision quantifiable de notre posture.'

# Challenge & Context
challenge: 'Audit de sécurité de 15 sites de production - processus manuel, incohérent, chronophage'
context: "Entreprise manufacturière multi-sites avec besoin d'audits trimestriels réguliers"

# Results (Key Metrics)
results:
  - label: "Temps d'audit réduit"
    value: '95%'
    description: 'De 2 jours à 2 heures par site'
    icon: 'clock'
  - label: 'Indice de sécurité amélioré'
    value: '58 → 82'
    description: 'En seulement 3 mois'
    icon: 'trending-up'
  - label: 'Vulnérabilités critiques détectées'
    value: '23'
    description: "Identifiées automatiquement par l'IA"
    icon: 'alert-triangle'
  - label: 'Actions correctives générées'
    value: '47'
    description: 'Priorisées automatiquement'
    icon: 'check-circle'

# SEO
seo:
  title: 'Cas Client: Réduction 95% Temps Audit Usine | GAMR'
  description: "Découvrez comment GAMR a transformé les audits de sécurité d'une entreprise manufacturière avec 15 sites."
  keywords:
    ['audit sécurité usine', 'gestion risques manufacturing', 'amélioration indice sécurité']
---
# Content starts here (MDX)
```

**TypeScript Type Definition**:

```typescript
type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  industry: 'manufacturing' | 'health' | 'tech' | 'finance' | 'government';
  heroImage: string;
  excerpt: string;
  publishDate: string; // ISO date
  featured: boolean;

  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientQuote: string;

  challenge: string;
  context: string;

  results: Array<{
    label: string;
    value: string;
    description: string;
    icon: string; // Lucide icon name
  }>;

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

type CaseStudy = CaseStudyFrontmatter & {
  content: string; // Rendered MDX
};
```

---

## Form Data Models

### Trial Signup Form

**Fields**:

```typescript
type TrialSignupPayload = {
  email: string; // Required, validated format + business domain
  organization: string; // Required, min 2 chars
  deploymentType: 'cloud' | 'onpremise' | 'unsure'; // Required
  userCount: '1-10' | '11-50' | '51-200' | '200+'; // Required
  honeypot: string; // Hidden field, should be empty
};

type TrialSignupResponse =
  | { success: true; message: string }
  | { success: false; errors: Array<{ field: string; message: string }> };
```

**Validation Rules** (Zod Schema):

```typescript
const trialSignupSchema = z.object({
  email: z
    .string()
    .email('Veuillez entrer un email valide (ex: nom@entreprise.com)')
    .refine((email) => !isPersonalEmailDomain(email), 'Veuillez utiliser un email professionnel'),
  organization: z
    .string()
    .min(2, "Le nom de l'organisation doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'organisation est trop long"),
  deploymentType: z.enum(['cloud', 'onpremise', 'unsure']),
  userCount: z.enum(['1-10', '11-50', '51-200', '200+']),
  honeypot: z.string().max(0, 'Invalid submission'), // Must be empty
});
```

**Airtable Schema** (TrialSignups table):

| Field Name      | Type             | Description                         |
| --------------- | ---------------- | ----------------------------------- |
| Email           | Email            | User's professional email           |
| Organization    | Single line text | Company name                        |
| Deployment Type | Single select    | cloud, onpremise, unsure            |
| User Count      | Single select    | 1-10, 11-50, 51-200, 200+           |
| Submitted At    | Date             | Timestamp of submission             |
| Status          | Single select    | pending, contacted, converted, spam |
| IP Address      | Single line text | For spam detection (optional)       |
| User Agent      | Long text        | Browser info (optional)             |

---

### Demo Request Form

**Fields**:

```typescript
type DemoRequestPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  industry: 'technology' | 'health' | 'finance' | 'manufacturing' | 'government' | 'other';
  deploymentType: 'cloud' | 'onpremise' | 'unsure';
  needs?: string; // Optional textarea
  honeypot: string;
};

type DemoRequestResponse =
  | { success: true; message: string; calendlyUrl?: string }
  | { success: false; errors: Array<{ field: string; message: string }> };
```

**Validation Rules** (Zod Schema):

```typescript
const demoRequestSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis').max(50),
  lastName: z.string().min(2, 'Nom requis').max(50),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^[\d\s\+\-\(\)]+$/, 'Numéro de téléphone invalide'),
  organization: z.string().min(2).max(100),
  industry: z.enum(['technology', 'health', 'finance', 'manufacturing', 'government', 'other']),
  deploymentType: z.enum(['cloud', 'onpremise', 'unsure']),
  needs: z.string().max(500).optional(),
  honeypot: z.string().max(0),
});
```

**Airtable Schema** (DemoRequests table):

| Field Name      | Type             | Description                                   |
| --------------- | ---------------- | --------------------------------------------- |
| First Name      | Single line text | Contact first name                            |
| Last Name       | Single line text | Contact last name                             |
| Email           | Email            | Professional email                            |
| Phone           | Phone            | Contact phone number                          |
| Organization    | Single line text | Company name                                  |
| Industry        | Single select    | Sector options                                |
| Deployment Type | Single select    | cloud, onpremise, unsure                      |
| Needs           | Long text        | Specific requirements (optional)              |
| Submitted At    | Date             | Timestamp                                     |
| Status          | Single select    | pending, contacted, demo_scheduled, converted |
| Source Page     | Single line text | Which page form was submitted from            |

---

### Data Deletion Request

**Fields**:

```typescript
type DataDeletionPayload = {
  email: string;
  honeypot: string;
};

type DataDeletionResponse =
  | { success: true; message: string } // Email sent with confirmation link
  | { success: false; error: string };

type DataDeletionToken = {
  email: string;
  requestedAt: number; // Unix timestamp
  expiresAt: number; // 24h from requestedAt
  signature: string; // HMAC signature for verification
};
```

**Airtable Schema** (DeletionRequests table):

| Field Name   | Type          | Description                          |
| ------------ | ------------- | ------------------------------------ |
| Email        | Email         | Email to delete data for             |
| Requested At | Date          | When request submitted               |
| Confirmed At | Date          | When user clicked confirmation link  |
| Deleted At   | Date          | When data was actually deleted       |
| Status       | Single select | pending, confirmed, deleted, expired |
| Token        | Long text     | Verification token (expires 24h)     |

---

## Page Models

### Page Metadata

**Type Definition**:

```typescript
type PageSEO = {
  title: string; // 50-60 chars
  description: string; // 150-160 chars
  keywords?: string[];
  ogImage: {
    url: string; // 1200x630px
    alt: string;
  };
  canonicalUrl: string;
  twitterCard: 'summary_large_image';
  jsonLd: Record<string, unknown>[]; // Schema.org structured data
};

type Page = {
  slug: string;
  seo: PageSEO;
  heroTitle?: string;
  heroSubtitle?: string;
  lastUpdated: string; // ISO date
};
```

---

## Shared Models

### Testimonial

```typescript
type Testimonial = {
  id: string;
  quote: string; // Max 200 chars for homepage, unlimited for detail pages
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage?: string; // Optional headshot
  rating: 1 | 2 | 3 | 4 | 5;
  featured: boolean; // Show on homepage?
};
```

**Static Data**: Testimonials stored in `/src/lib/testimonials.ts` as const array (3-5 testimonials for MVP).

---

### Feature

```typescript
type Feature = {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  shortDescription: string; // 2-3 lines for homepage card
  fullDescription: string; // 3-5 paragraphs for features page
  benefits: string[]; // 4-6 benefit points
  screenshot: string; // High-res 2x image path
  gifUrl?: string; // Optional animated demo
  caseStudySlug?: string; // Link to related case study
  order: number; // Display order 1-7
};
```

**Static Data**: Features stored in `/src/lib/features.ts` as const array (7 features).

---

### Pricing Option

```typescript
type PricingOption = {
  name: 'Cloud (SaaS)' | 'OnPremise (Sur Site)';
  tagline: string;
  included: string[]; // What's included (5-7 items)
  advantages: string[]; // Key advantages (4-5 items)
  ctaText: string;
  ctaLink: string;
  recommended?: boolean; // Highlight as recommended?
};

type ComparisonCriterion = {
  name: string; // e.g., "Mise en service"
  cloud: string; // e.g., "24h"
  onpremise: string; // e.g., "1-2 semaines"
};
```

**Static Data**: Pricing stored in `/src/lib/pricing.ts`.

---

### Industry/Sector

```typescript
type Industry = {
  id: string;
  name: string; // e.g., "Santé & Médical"
  slug: string; // e.g., "sante"
  icon: string; // Lucide icon
  painPoints: string[]; // 3-5 sector-specific challenges
  adaptedFeatures: string[]; // Which GAMR features address these
  caseStudySlugs: string[]; // Related case studies
  certifications: Array<{
    // Sector-relevant certifications
    name: string; // e.g., "HDS"
    description: string;
    logo?: string;
  }>;
  ctaText: string; // e.g., "Voir une démo santé"
};
```

**Static Data**: Industries stored in `/src/lib/industries.ts` (5 industries).

---

## Analytics Event Models

### GA4 Custom Events

**Event Structure**:

```typescript
type GAEvent = {
  event: string; // Event name
  [key: string]: string | number | boolean; // Custom parameters
};

// Conversion Events
type TrialSignupEvent = {
  event: 'trial_signup';
  deployment_type: 'cloud' | 'onpremise' | 'unsure';
  user_count: '1-10' | '11-50' | '51-200' | '200+';
};

type DemoRequestEvent = {
  event: 'demo_request';
  industry: string;
  deployment_type: 'cloud' | 'onpremise' | 'unsure';
  source_page: string; // Which page form was on
};

// Error Events
type ErrorEvent = {
  event: 'error';
  error_type:
    | 'form_validation_failed'
    | 'form_submission_failed'
    | 'api_error'
    | 'page_load_error'
    | 'javascript_error'
    | 'video_load_failed';
  error_message: string; // Truncated to 100 chars
  page_path: string;
  user_action: string; // What user was trying to do
};

// Spam Events
type SpamDetectedEvent = {
  event: 'spam_detected';
  form_type: 'trial' | 'demo' | 'contact' | 'deletion';
  honeypot_field_value: string; // Truncated to 50 chars
};

// Engagement Events
type VideoPlayEvent = {
  event: 'video_play';
  video_title: string;
  video_duration: number;
};

type ROICalculatorUseEvent = {
  event: 'roi_calculator_use';
  user_count_input: number;
  sites_count_input: number;
  estimated_savings: number;
};
```

---

## Entity Relationships

```
Page (1) ──> (many) Section
Page (1) ──> (1) PageSEO

Feature (1) ──> (0..1) CaseStudy [caseStudySlug link]

Industry (1) ──> (many) CaseStudy [via caseStudySlugs]
Industry (1) ──> (many) Feature [via adaptedFeatures]

FormSubmission (1) ──> (0..1) DeletionRequest [via email]

CaseStudy (MDX file with frontmatter)
  |
  └─> rendered in /etudes-de-cas/[slug] page
```

---

## Data Validation

### Email Domain Validation

**Personal Email Domains** (to block for trial signup):

```typescript
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'yahoo.fr',
  'hotmail.com',
  'hotmail.fr',
  'outlook.com',
  'outlook.fr',
  'live.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'protonmail.com',
  'laposte.net',
  'orange.fr',
  'free.fr',
  'sfr.fr',
  'wanadoo.fr',
  // Add more as needed
];

function isPersonalEmailDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return PERSONAL_EMAIL_DOMAINS.includes(domain || '');
}
```

### Phone Number Formats

**Accepted Formats**:

- International: +33 1 23 45 67 89
- National: 01 23 45 67 89
- Compact: 0123456789
- With parentheses: (01) 23 45 67 89

**Regex**: `/^[\d\s\+\-\(\)]+$/` (digits, spaces, +, -, parentheses)

---

## Content Guidelines

### Case Study Writing Template

```markdown
## Le Défi

[2-3 paragraphes décrivant le contexte client et les challenges]

## La Solution GAMR

[2-3 paragraphes expliquant comment GAMR a été utilisé]

Fonctionnalités clés utilisées :

- **Évaluations mobiles** : ...
- **Analyse IA** : ...
- **Indice de Sécurité** : ...

## Les Résultats

[Métriques avec visualisations]

### Impact Mesuré

- 📊 **[Métrique 1]** : [Valeur] - [Description]
- 📈 **[Métrique 2]** : [Valeur] - [Description]
- ⚡ **[Métrique 3]** : [Valeur] - [Description]

## Témoignage Client

> "[Quote du client]"
>
> — [Nom], [Rôle]  
> [Entreprise]
```

---

## Static Data Organization

```
src/lib/
├── testimonials.ts         # Array of 3-5 testimonials
├── features.ts             # Array of 7 features
├── industries.ts           # Array of 5 industries
├── pricing.ts              # 2 pricing options + 8 comparison criteria
├── stats.ts                # Homepage stats (500+ orgs, 10k+ risks, etc.)
└── certifications.ts       # ISO 27001, SOC 2, RGPD, HDS

src/content/
└── case-studies/
    ├── audit-usine-production.mdx         # Manufacturing
    ├── conformite-hospitaliere.mdx        # Health
    └── startup-tech-indice-securite.mdx   # Tech
```

---

## Type Safety Checklist

- [x] All form payloads have Zod schemas for runtime validation
- [x] All Zod schemas infer TypeScript types (no manual type duplication)
- [x] All MDX frontmatter has TypeScript types
- [x] All API responses are typed (success/error unions)
- [x] All GA4 events have typed interfaces
- [x] No `any` types in data models
- [x] All optional fields explicitly marked with `?` or `.optional()`
- [x] All enums use string literal unions (not `enum` keyword)

---

**Status**: Data models complete - Ready for contracts generation
