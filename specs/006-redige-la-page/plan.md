# Implementation Plan: Page À Propos

**Branch**: `006-redige-la-page` | **Date**: October 9, 2025 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/006-redige-la-page/spec.md`

## Summary

Create a comprehensive "À Propos" (About) page for the GAMR marketing site that establishes trust and credibility with potential clients. The page will present GAMR's mission, team, values, achievements, and social proof in a clean, accessible, and performant design following existing site patterns from the homepage and features pages.

**Technical Approach**: Build as a new Next.js page route (`/a-propos`) with reusable React components following the established pattern from existing pages (homepage, fonctionnalites, solutions, tarifs). Leverage existing shared components (CTASection, StatsSection) and design system tokens for consistency.

## Technical Context

**Language/Version**: TypeScript 5+ with strict mode enabled  
**Primary Dependencies**: Next.js 14+ (App Router), React 18+, Tailwind CSS 3+  
**Storage**: Static content stored in TypeScript data files (following pattern from `src/lib/features-data.ts`, `src/lib/stats.ts`)  
**Testing**: Vitest (unit/component tests), Playwright (e2e page navigation and accessibility)  
**Target Platform**: Web (responsive, mobile-first design)  
**Project Type**: Marketing website (Next.js App Router with static/SSG pages)  
**Performance Goals**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse score > 90  
**Constraints**: WCAG 2.1 AA compliance required, optimized images (WebP with fallback), lazy loading  
**Scale/Scope**: Single new page with 6-8 sections, 4-6 reusable components, ~300 lines of content data

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Verify compliance with `.specify/memory/constitution.md`:

- [x] **Performance Excellence**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90 - specified in requirements
- [x] **Accessibility First**: WCAG 2.1 AA compliance planned with 7 specific requirements (A11Y-001 to A11Y-007)
- [x] **SEO & Discoverability**: Complete SEO requirements (SEO-001 to SEO-007) including OpenGraph, JSON-LD Organization schema, canonical URL
- [x] **Mobile-First Design**: Mobile-first responsive approach following existing site patterns, touch-friendly targets
- [x] **Type Safety**: TypeScript strict mode already enabled in project, all new types will be defined
- [x] **Code Quality**: ESLint/Prettier already configured, will follow Conventional Commits for feature work
- [x] **CI Quality Gates**: Existing CI pipeline (lint, type-check, test, build, Lighthouse) will validate all changes

_All constitution checks pass. No violations to justify._

## Project Structure

### Documentation (this feature)

```
specs/006-redige-la-page/
├── plan.md              # This file
├── research.md          # Phase 0: Design patterns and content strategy
├── data-model.md        # Phase 1: Content entities and validation
├── quickstart.md        # Phase 1: Dev setup and testing guide
├── contracts/           # Phase 1: Component interfaces and props
└── checklists/
    └── requirements.md  # Quality validation checklist
```

### Source Code (repository root)

```
src/
├── app/
│   └── a-propos/
│       └── page.tsx                    # NEW: Main About page route
│
├── components/
│   ├── about/                          # NEW: About page components
│   │   ├── AboutHero.tsx              # Hero section with mission statement
│   │   ├── CompanyStory.tsx           # Company history and origin
│   │   ├── TeamSection.tsx            # Team member profiles grid
│   │   ├── TeamMemberCard.tsx         # Individual team member card
│   │   ├── ValuesSection.tsx          # Company values showcase
│   │   ├── ValueCard.tsx              # Individual value card
│   │   ├── AchievementsSection.tsx    # Stats and social proof
│   │   └── AboutCTA.tsx               # Contact/demo CTA
│   │
│   ├── shared/                         # EXISTING: Reuse shared components
│   │   ├── CTASection.tsx             # Can reuse for About CTA
│   │   ├── StatsDisplay.tsx           # Can reuse for achievements
│   │   └── SectionContainer.tsx       # Consistent section layout
│   │
│   └── layout/                         # EXISTING
│       ├── Header.tsx                 # UPDATE: Add "À Propos" nav link
│       └── Footer.tsx                 # Already includes navigation
│
├── lib/
│   ├── about-data.ts                  # NEW: About page content data
│   │                                  # (mission, team, values, stats)
│   └── seo.ts                         # UPDATE: Add About page metadata
│
├── types/
│   └── about.ts                       # NEW: TypeScript types for About entities
│
└── content/
    └── about/                          # NEW: Optional MDX for long-form content
        └── company-story.mdx          # (if story > 300 words)

tests/
└── e2e/
    └── about.spec.ts                  # NEW: E2E tests for About page
```

**Structure Decision**: Using the existing Next.js App Router pattern established in the project. The About page follows the same component organization as `fonctionnalites`, `solutions`, and `tarifs` pages:

- Page route in `src/app/a-propos/page.tsx`
- Feature-specific components in `src/components/about/`
- Shared components reused from `src/components/shared/`
- Content data in `src/lib/about-data.ts` (following pattern from `features-data.ts`, `stats.ts`)
- Types in `src/types/about.ts` (following existing type organization)

## Complexity Tracking

_No constitution violations. This section is not applicable._

## Phase 0: Research & Patterns

### Research Goals

1. **Component Patterns**: Analyze existing page components to ensure design consistency
2. **Content Strategy**: Define content structure for mission, team, values, and achievements
3. **Image Optimization**: Determine best approach for team photos (WebP, lazy loading, fallbacks)
4. **Reusability Assessment**: Identify which existing components can be reused vs new components needed
5. **Accessibility Patterns**: Review screen reader testing approach for team cards and stats

### Key Research Questions

- How are other pages (homepage, fonctionnalites) structuring their hero sections?
- What's the existing pattern for stats/metrics display (can reuse StatsDisplay)?
- How are images currently optimized (next/image configuration)?
- What's the navigation pattern for adding new pages to Header?
- How are existing pages handling SEO metadata?

_Detailed research findings will be documented in `research.md`._

## Phase 1: Design Artifacts

### Deliverables

1. **data-model.md**: Define entities (TeamMember, CompanyValue, KeyStat, SocialProof) with validation rules
2. **contracts/**: TypeScript interfaces and component prop definitions
   - `contracts/components.md`: Component interfaces for About page components
   - `contracts/data-schema.md`: JSON schema for content data validation
3. **quickstart.md**: Developer onboarding guide with setup instructions and testing procedures

### Design Approach

- **Data Model**: Content-first approach with strongly-typed entities
- **Components**: Atomic design - atoms (ValueCard, TeamMemberCard) compose into organisms (ValuesSection, TeamSection)
- **Validation**: Zod schemas for content validation (word counts, required fields)
- **Testing**: Component unit tests + E2E tests for full page flows

_Detailed design artifacts will be generated in Phase 1._

## Phase 2: Implementation Tasks

_This section will be completed by the `/speckit.tasks` command after planning is complete._

**Note**: Do NOT proceed with `/speckit.tasks` until research.md, data-model.md, contracts/, and quickstart.md are fully complete and reviewed.

## Success Metrics

- [ ] All 7 accessibility requirements (A11Y-001 to A11Y-007) pass automated and manual testing
- [ ] Lighthouse scores: Performance > 90, Accessibility > 95, SEO > 95
- [ ] Page loads in < 3s on 4G connection (measured via Lighthouse CI)
- [ ] All team member images optimized to < 50KB each (WebP format)
- [ ] Zero console errors or warnings in browser DevTools
- [ ] E2E tests pass for all 5 user stories (P1-P3 priorities)
- [ ] Screen reader navigation tested with NVDA/JAWS
- [ ] Mobile responsive testing on 320px, 375px, 768px, 1024px, 1440px viewports

## Next Steps

1. ✅ Constitution Check passed
2. ✅ Execute Phase 0: Generated `research.md` (15 research findings, all unknowns resolved)
3. ✅ Execute Phase 1: Generated `data-model.md`, `contracts/`, `quickstart.md`
   - ✅ `data-model.md`: 5 entities with Zod schemas (CompanyInfo, TeamMember, CompanyValue, AboutStat, SocialProof)
   - ✅ `contracts/components.md`: 11 component contracts with props, accessibility, and testing specs
   - ✅ `contracts/data-schema.md`: JSON schemas for API/CMS integration
   - ✅ `quickstart.md`: Complete developer guide with 6 phases
4. ✅ Update agent context: Cursor IDE context updated with TypeScript, Next.js, and data patterns
5. ⏳ Run `/speckit.tasks` to break down implementation into atomic tasks

---

**Plan Status**: ✅ Planning Complete | Ready for `/speckit.tasks`

**Deliverables Created**:

- Research document: 15 technical decisions
- Data model: 5 entities, fully validated
- Component contracts: 11 components specified
- Developer guide: 12-16 hours estimated
- Agent context: Updated with tech stack

**Ready for Implementation**: All design artifacts complete. Run `/speckit.tasks` to generate implementation tasks.
