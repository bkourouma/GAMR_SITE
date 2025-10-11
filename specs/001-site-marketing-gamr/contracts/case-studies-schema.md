# Case Studies MDX Schema

**Feature**: GAMR Marketing Website  
**Date**: 2025-10-08  
**Status**: Complete

## Overview

This document specifies the MDX frontmatter schema for case study files. Case studies are static content stored in `/src/content/case-studies/*.mdx` and rendered via Next.js dynamic routes at `/etudes-de-cas/[slug]`.

---

## MDX File Structure

### File Location

```
src/content/case-studies/
├── audit-usine-production.mdx
├── conformite-hospitaliere.mdx
└── startup-tech-indice-securite.mdx
```

### Full Example

**File**: `audit-usine-production.mdx`

```mdx
---
title: "Réduction de 95% du Temps d'Audit dans une Usine de Production"
slug: 'audit-usine-production'
industry: 'manufacturing'
heroImage: '/images/case-studies/usine-hero.jpg'
excerpt: 'Comment une entreprise manufacturière a réduit ses audits de sécurité de 2 jours à 2 heures par site tout en améliorant son indice de sécurité de 58 à 82 en 3 mois.'
publishDate: '2025-01-15'
featured: true

clientName: 'Directrice Sécurité'
clientRole: 'Directrice Sécurité'
clientCompany: 'Groupe Industriel, 2500 employés'
clientQuote: 'GAMR a transformé notre approche de la sécurité. Nous avons enfin une vision quantifiable de notre posture avec un indice qui évolue en temps réel.'

challenge: 'Audit de sécurité de 15 sites de production - processus manuel, incohérent, chronophage'
context: "Entreprise manufacturière multi-sites avec besoin d'audits trimestriels réguliers et exigences strictes de conformité"

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

seo:
  title: 'Cas Client: Réduction 95% Temps Audit Usine | GAMR'
  description: "Découvrez comment GAMR a transformé les audits de sécurité d'une entreprise manufacturière avec 15 sites."
  keywords:
    - 'audit sécurité usine'
    - 'gestion risques manufacturing'
    - 'amélioration indice sécurité'
    - 'réduction temps audit'
---

## Le Défi

[Entreprise Exemple], un leader du secteur manufacturier avec 15 sites de production à travers la France, faisait face à un défi majeur : leurs audits de sécurité prenaient 2 jours complets par site, mobilisant des équipes entières et coûtant plus de 50 000€ par an en consultants externes.

Chaque audit était différent selon l'évaluateur, les résultats étaient difficiles à comparer entre sites, et l'absence de vision consolidée empêchait la direction de prendre des décisions éclairées sur les investissements sécurité.

## La Solution GAMR

L'entreprise a déployé GAMR en mode Cloud en seulement 24 heures...

[... rest of MDX content ...]
```

---

## Frontmatter Field Specification

### Required Fields

| Field           | Type    | Description                  | Validation                                               |
| --------------- | ------- | ---------------------------- | -------------------------------------------------------- |
| `title`         | string  | Full case study title        | 10-100 chars                                             |
| `slug`          | string  | URL-friendly identifier      | lowercase, hyphens, no spaces, unique                    |
| `industry`      | enum    | Sector category              | One of: manufacturing, health, tech, finance, government |
| `heroImage`     | string  | Hero image path              | Valid path in /public/images/                            |
| `excerpt`       | string  | Short description            | 100-200 chars, used in listing page                      |
| `publishDate`   | string  | Publication date             | ISO format YYYY-MM-DD                                    |
| `featured`      | boolean | Show prominently on homepage | true or false                                            |
| `clientName`    | string  | Client contact name          | Can be anonymized if needed                              |
| `clientRole`    | string  | Client job title             | e.g., "RSSI", "Directrice Sécurité"                      |
| `clientCompany` | string  | Client organization          | Can include size, e.g., "2500 employés"                  |
| `clientQuote`   | string  | Testimonial quote            | 50-300 chars                                             |
| `challenge`     | string  | One-line challenge summary   | 50-150 chars                                             |
| `context`       | string  | Detailed context             | 100-300 chars                                            |
| `results`       | array   | Metrics achieved             | See Results Schema below                                 |
| `seo`           | object  | SEO metadata                 | See SEO Schema below                                     |

### Results Schema

Array of metric objects:

```yaml
results:
  - label: string # Metric name (e.g., "Temps d'audit réduit")
    value: string # Metric value (e.g., "95%", "58 → 82")
    description: string # Additional context (e.g., "De 2 jours à 2 heures")
    icon: string # Lucide icon name (e.g., "clock", "trending-up")
```

**Validation**:

- Minimum 2 metrics, maximum 6 metrics per case study
- Each metric must have all 4 fields (label, value, description, icon)
- Icon must be valid Lucide icon name

### SEO Schema

```yaml
seo:
  title: string # 50-60 chars, include "Cas Client" prefix
  description: string # 150-160 chars, summarize outcomes
  keywords: string[] # 3-8 keywords, industry-specific + "GAMR"
```

---

## Slug Conventions

**Pattern**: `{industry}-{brief-description}`

**Examples**:

- `audit-usine-production` (manufacturing)
- `conformite-hospitaliere` (health)
- `startup-tech-indice-securite` (tech)
- `institution-financiere-30-agences` (finance)
- `securite-donnees-gouvernement` (government)

**Rules**:

- All lowercase
- Hyphens only (no underscores, spaces)
- French accents removed (é → e, à → a)
- Maximum 50 characters
- Must be unique across all case studies

---

## Industry Enum Values

```typescript
type Industry =
  | 'manufacturing' // Manufacturing & Industrie
  | 'health' // Santé & Médical
  | 'tech' // Technologie & Logiciel (or 'technology')
  | 'finance' // Services Financiers & Assurance
  | 'government'; // Gouvernement & Secteur Public
```

---

## Icon Names (Lucide React)

**Approved icons for results**:

- `clock` - Time savings
- `trending-up` - Improvements, growth
- `trending-down` - Reductions, cost savings
- `shield-check` - Security, compliance
- `alert-triangle` - Vulnerabilities detected
- `check-circle` - Actions completed, achievements
- `users` - User/team metrics
- `bar-chart` - General metrics
- `target` - Goals achieved
- `zap` - Speed, efficiency

---

## Content Guidelines

### Tone & Style

- **Professional** but accessible (avoid jargon)
- **Results-focused** (lead with outcomes, not features)
- **Specific numbers** over vague claims ("95%" not "significantly")
- **Client voice** in quotes (authentic, not marketing-speak)

### Structure

Each case study MDX content should follow:

1. **Le Défi** (2-3 paragraphs)
   - Client context and pain points
   - Specific challenges faced

2. **La Solution GAMR** (2-3 paragraphs)
   - How GAMR was deployed
   - Which features were used
   - Implementation timeline

3. **Les Résultats** (metrics + narrative)
   - Results array rendered as cards/grid
   - Narrative explaining impact
   - Before/after comparison

4. **Témoignage Client** (quote block)
   - Pull quote from frontmatter
   - Author attribution

5. **Prochaines Étapes** (CTA section)
   - Encourage reader to try GAMR
   - CTA buttons: "Démarrer l'essai gratuit" + "Demander une démo"

---

## Validation Checklist

Before adding a new case study MDX file:

- [ ] Frontmatter includes all required fields
- [ ] Slug is unique and follows naming convention
- [ ] Industry value is valid enum
- [ ] Results array has 2-6 metrics with all fields
- [ ] SEO title is 50-60 characters
- [ ] SEO description is 150-160 characters
- [ ] heroImage file exists in /public/images/case-studies/
- [ ] All Lucide icon names are valid
- [ ] Client has approved publication (name, quote, company)
- [ ] Numbers/metrics are validated and accurate
- [ ] Content follows structure guidelines
- [ ] French language correct (accents, grammar)
- [ ] MDX compiles without errors (test with `pnpm dev`)

---

**Status**: Case study schema complete - Ready for content creation
