# Implementation Plan: Page Tarifs - GAMR Pricing

**Branch**: `005-g-n-re` | **Date**: 2025-10-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-g-n-re/spec.md`

## Summary

Create a comprehensive pricing page at `/tarifs` that displays GAMR Cloud and On-Premise pricing options with interactive toggles (deployment model, billing period), detailed plan comparison, ROI calculator, and FAQ section. The page must achieve Lighthouse Performance > 90, be fully accessible (WCAG 2.1 AA), and include rich SEO metadata with schema.org Product/Offer markup. All pricing displayed in FCFA with es-CI locale formatting, supporting 15% annual discount calculation.

**Technical Approach**: Server-side rendered Next.js page with client-side interactive components (toggles, calculator, accordions). Data model defined in TypeScript, pricing data sourced from centralized data file, components built with Tailwind CSS and shadcn/ui primitives. ROI calculations performed client-side for instant feedback.

## Technical Context

**Language/Version**: TypeScript 5+ with strict mode  
**Framework**: Next.js 14+ (App Router with RSC)  
**Primary Dependencies**: React 18+, Tailwind CSS 3+, shadcn/ui components (Card, Badge, Toggle, Accordion, Table, Button)  
**Styling**: Tailwind CSS with utility-first, mobile-first approach  
**Storage**: N/A (static pricing data in TypeScript module)  
**Testing**: Vitest (unit/component tests), Playwright (e2e tests for user flows)  
**Target Platform**: Web (SSR for SEO, CSR for interactivity), mobile-first responsive design  
**Project Type**: Marketing site / Frontend application (Next.js)  
**Performance Goals**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90, ROI calc updates < 50ms  
**Constraints**: es-CI locale for FCFA formatting, WCAG 2.1 AA compliance, schema.org Product/Offer markup, no layout shift on toggle interactions  
**Scale/Scope**: Single page with 7 major sections, 4 pricing tiers, 6-8 FAQ items, responsive across 320px-2560px viewports

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Verify compliance with `.specify/memory/constitution.md`:

- [x] **Performance Excellence**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90 - Specified in PERF-001 to PERF-007
- [x] **Accessibility First**: WCAG 2.1 AA compliance planned and testable - A11Y-001 to A11Y-010 cover keyboard nav, ARIA, contrast, screen readers
- [x] **SEO & Discoverability**: OpenGraph, JSON-LD, sitemap/robots implementation - SEO-001 to SEO-008 define complete metadata and structured data
- [x] **Mobile-First Design**: Mobile viewport priority, responsive strategy defined - FR-025 ensures mobile responsiveness, constitution mobile-first approach followed
- [x] **Type Safety**: TypeScript strict mode, all types defined - Project uses TS strict mode, data models will be fully typed in Phase 1
- [x] **Code Quality**: ESLint/Prettier configured, Conventional Commits enforced - Project has .eslintrc.json, .prettierrc, commitlint.config.js in place
- [x] **CI Quality Gates**: All checks (lint, type, test, build, Lighthouse) configured - Project has existing CI setup, e2e tests will be added for new page

_All constitution checks pass. No violations to justify._

## Project Structure

### Documentation (this feature)

```
specs/005-g-n-re/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output - Technical research and decisions
├── data-model.md        # Phase 1 output - TypeScript type definitions
├── quickstart.md        # Phase 1 output - Developer getting started guide
├── contracts/           # Phase 1 output - Component APIs and data contracts
│   ├── pricing-data-contract.md      # Pricing data structure
│   ├── component-apis.md             # Component prop interfaces
│   └── seo-metadata-contract.md      # SEO and schema.org structure
└── checklists/
    └── requirements.md  # Quality validation checklist (completed)
```

### Source Code (repository root)

```
src/
├── app/
│   └── tarifs/
│       └── page.tsx                 # Main pricing page (SSR + metadata)
├── components/
│   ├── tarifs/                      # Pricing page components
│   │   ├── PricingHero.tsx         # Hero with title, subtitle, CTAs
│   │   ├── DeploymentToggle.tsx    # Cloud/On-Premise toggle
│   │   ├── BillingToggle.tsx       # Monthly/Annual toggle
│   │   ├── CloudPricingGrid.tsx    # 4 Cloud plan cards
│   │   ├── PricingCard.tsx         # Individual plan card component
│   │   ├── OnPremiseSection.tsx    # On-Premise pricing details
│   │   ├── AddonsSection.tsx       # Premium add-ons display
│   │   ├── ComparisonTable.tsx     # Cloud vs On-Premise comparison
│   │   ├── ROICalculator.tsx       # Interactive ROI calculator
│   │   ├── PricingFAQ.tsx          # FAQ with accordion
│   │   └── PricingCTA.tsx          # Final CTA section
│   ├── ui/                          # shadcn/ui primitives
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── toggle.tsx
│   │   ├── accordion.tsx
│   │   ├── table.tsx
│   │   └── button.tsx
│   └── shared/
│       └── FormattedPrice.tsx       # FCFA price formatting utility component
├── lib/
│   ├── pricing-data.ts              # Centralized pricing data model
│   ├── pricing-utils.ts             # Annual discount, ROI calculations
│   ├── currency-formatter.ts        # es-CI locale FCFA formatting
│   └── seo-metadata.ts              # SEO metadata generation utilities
├── types/
│   ├── pricing.ts                   # PricingPlan, Addon, ComparisonDimension, FAQEntry
│   └── roi.ts                       # ROIInputs, ROIResults types
└── hooks/
    └── useROICalculator.ts          # Client-side ROI calculation hook

tests/
├── unit/
│   ├── pricing-utils.test.ts        # Test annual discount, ROI formulas
│   ├── currency-formatter.test.ts   # Test FCFA formatting
│   └── components/
│       ├── ROICalculator.test.tsx   # Calculator logic tests
│       └── PricingCard.test.tsx     # Card rendering tests
└── e2e/
    └── tarifs.spec.ts               # End-to-end pricing page tests (7 user stories)

public/
└── images/
    └── tarifs/
        └── og-image.png             # OpenGraph image for /tarifs
```

**Structure Decision**: Using Next.js App Router structure (Option 1 from template). The `/tarifs` page will be server-rendered for SEO with client components for interactive elements (toggles, calculator, accordions). Pricing data centralized in `lib/pricing-data.ts` for single source of truth. Components follow atomic design: ui primitives → shared utilities → feature-specific components. This structure supports incremental development by user story priority.

## Complexity Tracking

_No constitution violations. This section is not needed._

## Phase 0: Research & Technical Decisions

### Research Tasks

1. **FCFA Currency Formatting**: Research es-CI locale usage with JavaScript Intl API for proper FCFA formatting with thousand separators
2. **ROI Calculation Formula**: Define formula for calculating monthly/annual ROI from inputs (users, incidents avoided, time saved)
3. **Schema.org Product/Offer Markup**: Research proper JSON-LD structure for pricing plans with currency XOF and multiple offers
4. **Accessibility Patterns**: Research ARIA patterns for pricing toggles, accordion FAQs, and calculator form validation
5. **Layout Shift Prevention**: Best practices for preventing CLS when toggling between pricing views (Cloud/On-Prem, Monthly/Annual)
6. **Responsive Pricing Tables**: Patterns for making comparison tables accessible on mobile (horizontal scroll vs card transformation)

### Research Output Location

All findings will be documented in `specs/005-g-n-re/research.md` with decisions, rationale, and alternatives considered.

## Phase 1: Design & Contracts

### 1. Data Model (`data-model.md`)

Extract from spec Key Entities section:

- **PricingPlan**: name, deploymentModel, billingPeriod, basePrice, userLimit, standardsLimit, actionPrioritiesLimit, features[], ctaText, ctaDestination
- **Addon**: name, description, category, pricingModel, availability
- **ComparisonDimension**: dimensionName, cloudValue, onPremiseValue, icon
- **FAQEntry**: question, answer, category, displayOrder
- **ROICalculation**: numberOfUsers, incidentsAvoidedPerMonth, timeSavedPerUserPerWeek, monthlyROI, annualROI, breakEvenMonths

Document validation rules, relationships, and state transitions (e.g., billing period toggle state).

### 2. API Contracts (`contracts/`)

Generate three contract files:

#### a) `pricing-data-contract.md`

- TypeScript interfaces for all pricing data structures
- Export format from `lib/pricing-data.ts`
- Pricing calculation functions (annual discount, ROI formula)

#### b) `component-apis.md`

- Props interfaces for all 11 tarifs components
- Event handlers and callback signatures
- State management patterns (local state vs props)

#### c) `seo-metadata-contract.md`

- Next.js metadata export structure
- OpenGraph tag requirements
- JSON-LD Product/Offer schema template with XOF currency

### 3. Quick Start Guide (`quickstart.md`)

Developer onboarding document covering:

- How to add new pricing plan
- How to modify pricing values
- How to add/edit FAQ entries
- How to test pricing calculations
- How to verify SEO metadata
- How to run accessibility tests
- Local development workflow for /tarifs page

### 4. Agent Context Update

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType cursor` to update `.cursor/context.md` with:

- New /tarifs route
- Pricing data model location
- ROI calculator patterns
- FCFA formatting utilities
- Pricing component hierarchy

## Implementation Phases (Post-Planning)

_Note: These phases are executed via `/speckit.tasks` command after planning is complete._

### Phase 2: Tasks Generation (Next Command)

Execute `/speckit.tasks` to generate `tasks.md` breaking down implementation into:

1. **Priority 1 (P1)**: User Stories 1, 2, 7
   - Core pricing display (Cloud/On-Premise)
   - Billing toggle (Monthly/Annual with 15% discount)
   - CTAs throughout page
2. **Priority 2 (P2)**: User Stories 3, 4
   - Detailed Cloud plan features
   - Add-ons section

3. **Priority 3 (P3)**: User Stories 5, 6
   - ROI calculator
   - FAQ section

Each task will include acceptance criteria from spec, implementation steps, test requirements, and definition of done.

### Phase 3: Implementation (Post-Planning)

Execute `/speckit.implement` after tasks.md is ready to begin development following task priorities.

---

**Next Steps**:

1. Generate `research.md` (Phase 0 - resolves technical unknowns)
2. Generate `data-model.md`, `contracts/`, `quickstart.md` (Phase 1)
3. Update agent context with new patterns
4. Ready for `/speckit.tasks` command
