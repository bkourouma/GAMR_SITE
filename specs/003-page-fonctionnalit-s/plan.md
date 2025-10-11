# Implementation Plan: Page Fonctionnalités GAMR

**Branch**: `003-page-fonctionnalit-s` | **Date**: 2025-10-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/003-page-fonctionnalit-s/spec.md`

## Summary

Create a comprehensive features page at `/fonctionnalites` showcasing GAMR's 7 core capabilities through an optimized marketing funnel. The page includes hero section, feature cards in 4-3 grid layout, 8-10 item comparison table, ASPCI partner section, and conversion CTAs with "Demander une démo" as primary action. All content includes tooltips for technical terms to ensure accessibility for diverse audiences.

**Technical Approach**: Next.js 15 App Router page with TypeScript, MDX/TSX content, shadcn/ui components, Tailwind CSS styling, and structured JSON data export for features. Mobile-first responsive design with comprehensive accessibility and SEO optimization.

## Technical Context

**Language/Version**: TypeScript 5+ with strict mode enabled  
**Primary Dependencies**: Next.js 15 (App Router), React 18, Tailwind CSS 3+, shadcn/ui components  
**Storage**: Static content (MDX/TypeScript constants), JSON feature data export  
**Testing**: Vitest (component tests), Playwright (E2E conversion flows), Lighthouse CI (performance)  
**Target Platform**: Web (desktop, tablet, mobile browsers - Chrome, Firefox, Safari, Edge)  
**Project Type**: Web marketing site (existing Next.js application)  
**Performance Goals**: FCP < 1.5s, LCP < 2.5s, TTI < 3s, Lighthouse > 90 (all categories)  
**Constraints**: Mobile-first responsive, WCAG 2.1 AA compliant, SEO optimized (title ≤ 60 chars, meta ≤ 160)  
**Scale/Scope**: Single page with 6 sections, 7 feature cards, 8-10 comparison items, integrated tooltips

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Verify compliance with `.specify/memory/constitution.md`:

- [x] **Performance Excellence**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90 ✅ Explicitly required in spec (PERF-001 to PERF-007)
- [x] **Accessibility First**: WCAG 2.1 AA compliance planned and testable ✅ Comprehensive A11Y requirements (A11Y-001 to A11Y-008) including keyboard navigation, screen readers, tooltips
- [x] **SEO & Discoverability**: OpenGraph, JSON-LD, sitemap/robots implementation ✅ Full SEO requirements (SEO-001 to SEO-007) with meta tags, structured data, canonical URLs
- [x] **Mobile-First Design**: Mobile viewport priority, responsive strategy defined ✅ Assumption #8 confirms mobile-first approach, FR-003 specifies responsive grid (4-3 desktop, stack mobile)
- [x] **Type Safety**: TypeScript strict mode, all types defined ✅ Project uses TypeScript 5+ with strict mode (existing codebase standard)
- [x] **Code Quality**: ESLint/Prettier configured, Conventional Commits enforced ✅ Existing project has linting/formatting setup (.eslintrc.json, .prettierrc, commitlint.config.js)
- [x] **CI Quality Gates**: All checks (lint, type, test, build, Lighthouse) configured ✅ Performance testing required (PERF-005), Lighthouse CI integration expected

**Status**: ✅ **ALL CHECKS PASS** - No violations or exceptions required

## Project Structure

### Documentation (this feature)

```
specs/003-page-fonctionnalit-s/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0: Technical research & decisions
├── data-model.md        # Phase 1: Content data structures
├── quickstart.md        # Phase 1: Developer guide
├── contracts/           # Phase 1: API/component contracts
│   ├── components.md    # Component interfaces & props
│   ├── features-schema.md # JSON schema for features data
│   └── tooltips.md      # Tooltip content specifications
├── checklists/
│   └── requirements.md  # Quality validation checklist (completed)
└── tasks.md             # Phase 2: Task breakdown (created by /speckit.tasks)
```

### Source Code (repository root)

```
src/
├── app/
│   └── fonctionnalites/
│       ├── page.tsx            # Main features page component (NEW)
│       └── metadata.ts         # SEO metadata config (NEW)
├── components/
│   ├── fonctionnalites/        # Feature-specific components (NEW)
│   │   ├── HeroSection.tsx     # Hero with dual CTAs
│   │   ├── OverviewSection.tsx # Intro text + platform image
│   │   ├── FeaturesGrid.tsx    # 7 feature cards in 4-3 layout
│   │   ├── FeatureCard.tsx     # Individual feature card with tooltip
│   │   ├── ComparisonTable.tsx # Before/After comparison (8-10 rows)
│   │   ├── ASPCIPartnerSection.tsx # Partner credibility section
│   │   └── ConversionCTA.tsx   # Final CTA section
│   ├── shared/
│   │   └── Tooltip.tsx         # Reusable tooltip component (NEW or ENHANCE)
│   └── ui/
│       ├── Button.tsx          # Existing (primary/secondary variants)
│       ├── Card.tsx            # Existing
│       └── ...                 # Other existing UI components
├── lib/
│   ├── features-data.ts        # Features JSON export (nested structure) (NEW)
│   ├── comparison-data.ts      # Comparison table data (NEW)
│   ├── tooltip-definitions.ts  # Technical term definitions (NEW)
│   └── seo.ts                  # Existing SEO utilities
├── types/
│   └── features.ts             # Feature/Comparison types (NEW)
└── styles/
    └── animations.css          # Existing (card hover effects)

tests/
├── unit/
│   └── components/
│       └── fonctionnalites/    # Component unit tests (NEW)
└── e2e/
    └── fonctionnalites.spec.ts # E2E conversion flow tests (NEW)

public/
└── images/
    ├── fonctionnalites/        # Feature page assets (NEW)
    │   ├── platform-overview.png
    │   └── aspci-partnership.jpg
    └── icons/                  # Feature icons (reuse or add)
```

**Structure Decision**: Marketing site structure (Option 1) - existing Next.js App Router application. The `/fonctionnalites` page follows established patterns from existing pages (homepage, etc.). New components are isolated in `components/fonctionnalites/` for maintainability. Data layer uses TypeScript constants with JSON export capability (FR-015) rather than API/database for static marketing content.

## Complexity Tracking

_No complexity violations detected - all requirements align with constitution principles._

## Phase 0: Research & Decisions

### Research Tasks

Based on Technical Context analysis, the following areas require investigation:

1. **Tooltip Implementation Strategy** - Research best practices for accessible, mobile-friendly tooltips that work on both hover and tap, support keyboard navigation, and integrate with screen readers

2. **Feature Data Structure** - Confirm optimal JSON schema for nested category structure `{main: [...], secondary: [...]}` that balances flexibility with type safety

3. **Grid Layout System** - Investigate Tailwind CSS patterns for 4-3 grid that degrades gracefully to mobile stack without excessive media query complexity

4. **Comparison Table Patterns** - Research semantic HTML and ARIA patterns for accessible comparison tables with 8-10 rows that remain scannable on mobile

5. **Image Optimization** - Confirm Next.js Image component configuration for platform mockup and ASPCI partner images to meet LCP < 2.5s target

6. **CTA Button Hierarchy** - Research visual design patterns that clearly differentiate primary vs secondary CTAs without relying solely on color (accessibility consideration)

7. **Performance Budget Allocation** - Determine JavaScript bundle size budget for features page considering tooltip interactivity, image assets, and animation requirements

### Decisions Log

Research outputs will be documented in [`research.md`](./research.md) with the following format:

```markdown
## Decision: [Topic]

**Status**: ✅ Decided | 🔄 In Progress | ⏸️ Blocked

**Context**: [Why this decision was needed]

**Options Considered**:

1. Option A - [pros/cons]
2. Option B - [pros/cons]
3. Option C - [pros/cons]

**Decision**: [What was chosen]

**Rationale**: [Why chosen over alternatives]

**Implementation Notes**: [Key details for developers]

**References**: [Links to docs, examples, discussions]
```

## Phase 1: Design Artifacts

### Data Model

**Output**: [`data-model.md`](./data-model.md)

Content structure for features page:

1. **Feature Entity**
   - Fields: key (slug), title, description, benefitsText, icon, order, category
   - Validation: title ≤ 50 chars, description ≤ 150 chars, benefits ≤ 250 chars
   - Relationships: Belongs to category (main/secondary), has associated tooltip terms

2. **Comparison Item Entity**
   - Fields: dimension, situationBefore, situationWithGAMR, improvementMetric
   - Validation: 8-10 items required, must include 5 mandatory dimensions (productivité, conformité, gouvernance, visibilité, réactivité)

3. **Tooltip Definition Entity**
   - Fields: term, definition, context
   - Validation: definition ≤ 200 chars, plain language required

4. **Page Section Entity**
   - Fields: id, type, title, content, order
   - Validation: 6 sections (hero, overview, features, comparison, partner, cta)

### API Contracts

**Output**: [`contracts/`](./contracts/)

Since this is a static marketing page, "contracts" refer to component interfaces and data schemas:

1. **`contracts/components.md`**
   - Component prop interfaces for all fonctionnalités components
   - Event handler signatures (CTA clicks, tooltip interactions)
   - Accessibility ARIA patterns

2. **`contracts/features-schema.md`**
   - JSON schema for features data export (FR-015)
   - TypeScript types exported from schema
   - Validation rules and examples

3. **`contracts/tooltips.md`**
   - Tooltip content specifications
   - Terms requiring definitions
   - Accessibility requirements (keyboard, screen reader, mobile tap)

### Developer Quickstart

**Output**: [`quickstart.md`](./quickstart.md)

Quick reference for developers implementing this feature:

- Setup steps (install dependencies, verify existing components)
- File creation checklist
- Key patterns to follow (mobile-first CSS, tooltip usage, CTA hierarchy)
- Testing requirements (unit tests, E2E conversion flows, Lighthouse CI)
- Common gotchas (CLS prevention with image placeholders, tooltip z-index, grid responsive behavior)

### Agent Context Update

After Phase 1 artifacts are generated, update Cursor's AI context:

```bash
.specify/scripts/powershell/update-agent-context.ps1 -AgentType cursor
```

This will add feature-specific context (new components, data structures, patterns) to `.cursor/context` for better code generation assistance.

## Phase 2: Task Breakdown

**Note**: Phase 2 (task decomposition) is handled by the separate `/speckit.tasks` command, which will:

- Break down implementation into atomic, testable tasks
- Assign priority and dependencies
- Create `tasks.md` with Markdown checklist format
- Provide implementation order guidance

This plan document stops after Phase 1 design artifacts are complete.

## Success Criteria Mapping

Implementation must satisfy all 10 measurable success criteria from spec:

| Success Criteria                      | Implementation Requirement                      | Validation Method         |
| ------------------------------------- | ----------------------------------------------- | ------------------------- |
| SC-001: 5 features in < 2 min         | Clear visual hierarchy, scannable cards         | User testing session      |
| SC-002: 70% understand hero           | Concise copy, strong value prop headline        | Comprehension survey      |
| SC-003: Bounce rate < 60%             | Engaging content, fast load, clear CTAs         | Google Analytics          |
| SC-004: Time on page > 90s            | Sufficient content depth, visual interest       | Google Analytics          |
| SC-005: 15% CTA clicks                | Prominent CTAs, compelling copy                 | Event tracking            |
| SC-006: Lighthouse > 90               | Optimized images, minimal JS, accessibility     | Lighthouse CI             |
| SC-007: 100% screen reader accessible | Semantic HTML, ARIA, keyboard nav               | axe-core + manual testing |
| SC-008: LCP < 2.5s on 4G              | Image optimization, lazy loading                | WebPageTest               |
| SC-009: +20% conversion vs avg        | Superior UX, clear value, trust signals         | A/B testing (post-launch) |
| SC-010: 85% mobile no zoom            | Responsive design, legible fonts, touch targets | Device testing            |

## Next Steps

1. ✅ **Constitution Check** - Passed (all 7 principles compliant)
2. 🔄 **Phase 0: Research** - Generate `research.md` with decisions on tooltips, grid, data structure, optimization
3. ⏸️ **Phase 1: Design** - Generate `data-model.md`, `contracts/`, `quickstart.md` after research complete
4. ⏸️ **Agent Context Update** - Run update script after Phase 1
5. ⏸️ **Phase 2: Tasks** - Run `/speckit.tasks` command to create implementation checklist

**Current Status**: Constitution validated ✅ | Ready for Phase 0 research 🚀
