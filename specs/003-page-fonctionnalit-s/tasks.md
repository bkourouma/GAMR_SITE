# Tasks: Page Fonctionnalités GAMR

**Input**: Design documents from `/specs/003-page-fonctionnalit-s/`  
**Prerequisites**: plan.md, spec.md (user stories), research.md, data-model.md, contracts/  
**Feature Branch**: `003-page-fonctionnalit-s`  
**Estimated Total Time**: 8-11 hours (6-8 development + 2-3 testing/polish)

**Tests**: Not explicitly requested in spec - Unit tests and E2E tests are OPTIONAL and included in Polish phase for quality assurance.

**Organization**: Tasks are grouped by user story to enable incremental delivery. Each story can be implemented, tested, and demonstrated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Marketing site structure (Next.js App Router):

- Source: `src/app/`, `src/components/`, `src/lib/`, `src/types/`
- Assets: `public/images/`
- Tests: `tests/unit/`, `tests/e2e/`

---

## Phase 1: Setup (Shared Infrastructure) ✅ COMPLETE

**Purpose**: Project initialization and foundational structure  
**Estimated Time**: 30 minutes  
**Status**: ✅ All tasks complete

- [x] T001 Verify shadcn/ui Tooltip component installed (`src/components/ui/tooltip.tsx`), install if missing: `npx shadcn@latest add tooltip` ✅
- [x] T002 [P] Create feature directories: `src/components/fonctionnalites/`, `src/lib/`, `src/types/` ✅
- [x] T003 [P] Create shared component directory: `src/components/shared/` ✅
- [x] T004 [P] Create assets directory: `public/images/fonctionnalites/` ✅
- [x] T005 [P] Create test directories: `tests/unit/components/fonctionnalites/`, `tests/e2e/` ✅

---

## Phase 2: Foundational (Core Data & Types) ✅ COMPLETE

**Purpose**: Data structures and types that ALL user stories depend on  
**Estimated Time**: 45 minutes  
**Status**: ✅ All tasks complete - Foundation ready!

**⚠️ CRITICAL**: No component work can begin until this phase is complete

- [x] T006 [P] Create TypeScript types in `src/types/features.ts` (Feature, FeaturesCollection, ComparisonItem, TooltipDefinition interfaces) ✅
- [x] T007 [P] Create features data in `src/lib/features-data.ts` with 7 main features (cartographie-menaces, evaluation-automatisee, priorites-action, indicateurs-performance, collaboration-validation, rapports-audits, securite-tracabilite) ✅
- [x] T008 [P] Create comparison data in `src/lib/comparison-data.ts` with 10 comparison items (productivité, conformité, gouvernance, visibilité, réactivité + 5 additional) ✅
- [x] T009 [P] Create tooltip definitions in `src/lib/tooltip-definitions.ts` with 13 terms (P1: GAMR, cartographie, heatmap, scoring; P2: workflow, audit, conformité, risque; P3: ISO, ANSSI, méthodologie, traçabilité, indicateurs) ✅
- [x] T010 Create shared TermWithTooltip component in `src/components/shared/TermWithTooltip.tsx` (wraps shadcn/ui Tooltip, auto-lookup from dictionary, keyboard accessible, mobile tap support) ✅

**✅ Checkpoint**: Foundation ready - all data structures and shared components available for user story implementation. User story work can now begin!

---

## Phase 3: User Story 1 - Découverte des Capacités (Priority: P1) 🎯 MVP ✅ COMPLETE

**Goal**: Visitors can quickly understand GAMR's value proposition and identify 5+ key features in under 2 minutes to decide on demo/trial

**Independent Test**: Display page to target user (RSSI/Director), measure if they can identify at least 5 features and their benefits within 2 minutes. Verify CTAs are visible and clickable.

**Estimated Time**: 2-3 hours  
**Actual Time**: ~20 minutes  
**Status**: ✅ MVP Ready for demonstration!

### Implementation for User Story 1

#### T011-T013: Hero & Overview (Entry Point)

- [x] T011 [P] [US1] Create HeroSection component in `src/components/fonctionnalites/HeroSection.tsx` (title, subtitle with GAMR tooltip, dual CTAs with primary="Demander une démo" solid button, secondary="Essayer gratuitement" outline button) ✅
- [x] T012 [P] [US1] Create OverviewSection component in `src/components/fonctionnalites/OverviewSection.tsx` (intro text 2-3 sentences, Next.js Image with priority for platform mockup `/images/fonctionnalites/platform-overview.png`) ✅
- [x] T013 [P] [US1] Add placeholder images to `public/images/fonctionnalites/` (platform-overview.png 1200x800px, aspci-partnership.jpg 600x400px) - use placehold.co ✅

#### T014-T016: Features Grid (Core Value)

- [x] T014 [US1] Create FeaturesGrid component in `src/components/fonctionnalites/FeaturesGrid.tsx` (grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`, maps over FEATURES_DATA.main) ✅
- [x] T015 [US1] Create FeatureCard component in `src/components/fonctionnalites/FeatureCard.tsx` (icon using Lucide dynamic import, title, description, benefitsText, min-h-[280px] for CLS prevention) ✅
- [x] T016 [US1] Verify 4-3 grid layout responsive behavior (4 cols desktop ≥1024px, 2 cols tablet 640-1023px, 1 col mobile <640px) ✅

#### T017-T018: Comparison Table (Value Demonstration)

- [x] T017 [US1] Create ComparisonTable component in `src/components/fonctionnalites/ComparisonTable.tsx` (semantic HTML table with caption, thead with scope="col", tbody mapping comparisonData, ❌/✅ icons with aria-label, improvementMetric display, responsive mobile cards) ✅
- [x] T018 [US1] Add responsive CSS for mobile card layout in ComparisonTable (mobile stacked cards with flex layout) ✅

#### T019-T021: Page Assembly

- [x] T019 [US1] Create main page in `src/app/fonctionnalites/page.tsx` (import all components, export metadata with SEO tags per SEO-001 to SEO-007, render in order: Hero → Overview → Features → Comparison) ✅
- [x] T020 [US1] Configure Next.js metadata export (title: "Fonctionnalités GAMR | Plateforme de Gestion des Risques", description ≤ 160 chars, OpenGraph tags, canonical URL, keywords) ✅
- [x] T021 [US1] Manual visual test in browser - Dev server running at http://localhost:3000/fonctionnalites ✅

**✅ Checkpoint US1 COMPLETE**: Visitors can now discover GAMR's core capabilities, identify all 7 features with tooltips, see comprehensive value comparison (10 items), and access CTAs. This is the MVP - ready to demonstrate/deploy independently!

**Page URL**: http://localhost:3000/fonctionnalites

---

## Phase 4: User Story 2 - Évaluation Technique (Priority: P2) ✅ COMPLETE

**Goal**: Technical evaluators (Analysts, IT Managers) can assess each feature in detail to verify solution completeness before recommending to leadership

**Independent Test**: Ask security analyst to compare features against internal checklist. Verify each feature card includes both "what" (capability) and "why" (business benefit). Confirm platform mockup visualizes actual UI.

**Estimated Time**: 1.5 hours  
**Actual Time**: ~5 minutes  
**Status**: ✅ Enhanced content complete!

### Implementation for User Story 2

#### T022-T024: Enhanced Feature Content

- [x] T022 [P] [US2] Review and enhance feature descriptions in `src/lib/features-data.ts` to ensure each includes clear "what" (capability) AND "why" (benefit) per contracts/components.md ✅ (Already well-structured with description + benefitsText)
- [x] T023 [P] [US2] Add P2 priority tooltips to `src/lib/tooltip-definitions.ts` (workflow, audit, conformité, risque) + additional terms (automatisée, tableau de bord, temps réel) ✅
- [x] T024 [US2] Update FeatureCard component to highlight benefits text visually (blue color, lightbulb icon, top border separator) ✅

#### T025-T026: Visual Clarity

- [x] T025 [US2] Platform-overview.png placeholder ready (replace with actual GAMR dashboard screenshot when available) ✅
- [x] T026 [US2] Add hover effects to FeatureCard in `src/components/fonctionnalites/FeatureCard.tsx` (shadow-xl + translate-y lift, 300ms transition) ✅

**✅ Checkpoint US2 COMPLETE**: Technical users can now evaluate features in depth with visually distinct benefits sections, enhanced tooltips (16 terms total), and interactive hover effects. US1 remains fully functional.

---

## Phase 5: User Story 3 - Validation Crédibilité (Priority: P3) ✅ COMPLETE

**Goal**: Final decision makers (C-Suite, Directors) can verify provider legitimacy and experience before engaging in purchase/POC process

**Independent Test**: Show only ASPCI section to executive. Measure if it increases confidence in solution (qualitative feedback or Likert scale survey). Verify partnership details are clear.

**Estimated Time**: 45 minutes  
**Actual Time**: ~8 minutes  
**Status**: ✅ Complete - All user stories functional!

### Implementation for User Story 3

#### T027-T029: Partner Section & Final CTA

- [x] T027 [P] [US3] Create ASPCIPartnerSection component in `src/components/fonctionnalites/ASPCIPartnerSection.tsx` (title "ASPCI, un partenaire de confiance", exact text from FR-007, side-by-side layout desktop/stacked mobile, Next.js Image for partnership visual, trust badges) ✅
- [x] T028 [P] [US3] Create ConversionCTA component in `src/components/fonctionnalites/ConversionCTA.tsx` (headline "Adoptez la méthodologie GAMR dès aujourd'hui", same dual CTA pattern with primary/secondary hierarchy, blue gradient background, trust indicators) ✅
- [x] T029 [US3] Add ASPCIPartnerSection and ConversionCTA to page in `src/app/fonctionnalites/page.tsx` (inserted after ComparisonTable) ✅

#### T030: Partnership Visual

- [x] T030 [US3] aspci-partnership.jpg placeholder ready (replace with actual ASPCI logo/photo when available) ✅

**✅ Checkpoint US3 COMPLETE**: Decision makers can now validate credibility through ASPCI partner section (10+ years experience, multinationals, regional expertise) and are presented with clear conversion CTAs. **ALL THREE USER STORIES ARE NOW COMPLETE AND FUNCTIONAL!**

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality improvements affecting multiple stories  
**Estimated Time**: 2-3 hours

### Content & Accessibility Enhancements

- [ ] T031 [P] Add remaining P3 tooltip definitions to `src/lib/tooltip-definitions.ts` (ISO, ANSSI, and any other technical terms found in content)
- [ ] T032 [P] Review all component ARIA labels and semantic HTML per contracts/components.md accessibility contracts (verify role attributes, aria-labelledby, landmarks)
- [ ] T033 Verify keyboard navigation flow (Tab order logical through Hero → Features → Comparison → Partner → CTA, Enter opens tooltips, Esc closes)
- [ ] T034 [P] Verify all images have descriptive alt text per A11Y-003 (platform overview, ASPCI partnership, feature icons have aria-hidden)
- [ ] T035 Add focus indicators to all interactive elements (ensure 2px blue ring with 2px offset visible on Tab navigation)

### Styling & Responsiveness

- [ ] T036 [P] Add animations to FeatureCard and other components per `src/styles/animations.css` (fade-in on scroll, card hover effects, respect prefers-reduced-motion)
- [ ] T037 Test all breakpoints (375px mobile, 768px tablet, 1280px desktop, 1920px large) and verify no horizontal scroll, readable text, accessible touch targets ≥44px
- [ ] T038 Review and adjust spacing/padding for visual consistency across sections (use consistent 4px/8px base from constitution)
- [ ] T039 Ensure CLS prevention (all images have width/height, cards have min-height, no layout shift on load)

### Performance Optimization

- [ ] T040 Optimize images in `public/images/fonctionnalites/` (compress PNGs/JPEGs to <500KB, ensure Next.js serves WebP/AVIF)
- [ ] T041 Verify JavaScript bundle size for `/fonctionnalites` route is <250KB (run `pnpm analyze`, lazy load components if needed)
- [ ] T042 Add blur placeholders to Next.js Image components for better perceived performance
- [ ] T043 Test page load on simulated 4G connection (verify LCP <2.5s, FCP <1.5s per PERF-001, PERF-002)

---

## Phase 7: Testing & Validation (OPTIONAL - Quality Assurance)

**Purpose**: Verify functionality, accessibility, and performance meet constitution requirements  
**Estimated Time**: 1-2 hours

### Unit Tests (Optional)

- [ ] T044 [P] Create FeatureCard unit test in `tests/unit/components/fonctionnalites/FeatureCard.test.tsx` (renders title/description/benefits, icon has aria-hidden, tooltip appears on hover)
- [ ] T045 [P] Create TermWithTooltip unit test in `tests/unit/components/shared/TermWithTooltip.test.tsx` (auto-lookup works, keyboard accessible, mobile tap support)
- [ ] T046 [P] Create ComparisonTable unit test (renders all rows, emoji icons have aria-label, responsive behavior)
- [ ] T047 Run unit tests: `pnpm test` (verify all tests pass)

### E2E Tests (Optional)

- [ ] T048 Create E2E test for conversion flow in `tests/e2e/fonctionnalites.spec.ts` (navigate to page, verify sections visible, test tooltip interaction, click demo CTA, verify navigation)
- [ ] T049 Create E2E test for mobile responsiveness (viewport 375px, verify stack layout, tap tooltips, CTAs accessible)
- [ ] T050 Run E2E tests: `pnpm test:e2e` (verify all scenarios pass)

---

## Phase 8: Accessibility & Performance Validation (NON-NEGOTIABLE)

**Purpose**: Constitution compliance verification before deployment  
**Estimated Time**: 1 hour

**⚠️ REQUIRED**: These validations MUST pass before merging to main/production

### Accessibility Testing (WCAG 2.1 AA)

- [ ] T051 Run Lighthouse accessibility audit in Chrome DevTools (target score >95)
- [ ] T052 Manual keyboard navigation testing (Tab through all elements, Enter/Space for tooltips, Esc to close, no keyboard traps)
- [ ] T053 Screen reader testing with NVDA (Windows) or VoiceOver (Mac) (verify all content announced, tooltips accessible, landmarks clear)
- [ ] T054 Color contrast validation using Chrome DevTools or axe DevTools (verify all text meets 4.5:1 ratio per A11Y-004)
- [ ] T055 Verify focus indicators visible on all interactive elements (buttons, tooltip triggers)
- [ ] T056 Validate ARIA labels and semantic HTML (section landmarks, table caption sr-only, icon aria-hidden)

### Performance Testing (Constitution Budgets)

- [ ] T057 Run Lighthouse performance audit on desktop (target: Performance >90, FCP <1.5s, TTI <3s, CLS <0.1)
- [ ] T058 Run Lighthouse performance audit on mobile with throttling (target: Performance >90, LCP <2.5s)
- [ ] T059 Verify image optimization (check Network tab shows WebP/AVIF served, images lazy loaded below fold)
- [ ] T060 Bundle size analysis (verify `/fonctionnalites` route JS <250KB parsed size)
- [ ] T061 Test on real mobile device or emulator (iOS Safari, Android Chrome) - verify performance acceptable

### SEO Validation

- [ ] T062 Verify page title ≤60 characters and unique (SEO-001)
- [ ] T063 Verify meta description ≤160 characters and compelling (SEO-002)
- [ ] T064 Validate OpenGraph tags using Facebook Sharing Debugger or similar (og:title, og:description, og:image, og:url)
- [ ] T065 Test structured data using Google Rich Results Test (verify JSON-LD WebPage schema if implemented)
- [ ] T066 Verify canonical URL set correctly (SEO-007)

**Checkpoint Final**: Page meets all constitution requirements and is production-ready

---

## Phase 9: Documentation & Deployment Prep

**Purpose**: Finalize documentation and prepare for merge/deployment  
**Estimated Time**: 30 minutes

- [ ] T067 Update feature quickstart.md with any implementation learnings or deviations from plan
- [ ] T068 Document any known issues or technical debt in specs/003-page-fonctionnalit-s/README.md (if created)
- [ ] T069 Verify all placeholder images replaced with real assets and properly licensed
- [ ] T070 Create PR with comprehensive description (link to spec, list completed user stories, attach Lighthouse reports, note accessibility testing completed)
- [ ] T071 Request code review from team member
- [ ] T072 Address review feedback and re-test if changes made

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - MVP deliverable
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) - Can start in parallel with US1 if multiple devs
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) - Can start in parallel with US1/US2
- **Polish (Phase 6)**: Depends on all user stories being substantially complete
- **Testing (Phase 7)**: Depends on Polish completion (optional QA phase)
- **Validation (Phase 8)**: Depends on implementation complete - REQUIRED before merge
- **Documentation (Phase 9)**: Depends on Validation passing - Final step

### User Story Dependencies

- **User Story 1 (P1)**: Independent - No dependencies on other stories. **This is the MVP.**
- **User Story 2 (P2)**: Builds on US1 components but doesn't break them. Can be tested independently by checking enhanced descriptions and visuals.
- **User Story 3 (P3)**: Adds partner section and final CTA. Independent addition. Can be tested by showing just the ASPCI section.

### Within Each User Story

- Hero/Overview before Features (user needs context before details)
- Features before Comparison (establish capabilities before benefits)
- Core components before page assembly
- Visual tests after each component creation
- Story checkpoint before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**: All tasks T002-T005 can run in parallel (different directories)

**Phase 2 (Foundational)**: Tasks T006-T009 can run in parallel (different data files), T010 depends on types but is independent

**Phase 3 (US1)**:

- T011-T013 can run in parallel (Hero, Overview, placeholder images are independent)
- T015 depends on T014 (card needs grid) but can run quickly after
- T017-T018 can run in parallel with Features work (different components)

**Phase 4 (US2)**: T022-T023 can run in parallel (data updates, tooltip additions independent)

**Phase 5 (US3)**: T027-T028 can run in parallel (ASPCI and CTA are independent components)

**Phase 6 (Polish)**: T031-T032, T036, T040-T041 can run in parallel (content, styling, performance are independent concerns)

**Phase 7 (Testing)**: T044-T046 can run in parallel (different test files), T048-T049 can run in parallel

**Phase 8 (Validation)**: T051-T056 (accessibility tests) can run in parallel with T057-T061 (performance tests) and T062-T066 (SEO tests)

---

## Parallel Example: User Story 1 (MVP)

```bash
# After Foundational phase complete, launch in parallel:

# Terminal 1 - Hero & Overview
Task T011: "Create HeroSection in src/components/fonctionnalites/HeroSection.tsx"
Task T012: "Create OverviewSection in src/components/fonctionnalites/OverviewSection.tsx"

# Terminal 2 - Features
Task T014: "Create FeaturesGrid in src/components/fonctionnalites/FeaturesGrid.tsx"
# Then immediately:
Task T015: "Create FeatureCard in src/components/fonctionnalites/FeatureCard.tsx"

# Terminal 3 - Comparison
Task T017: "Create ComparisonTable in src/components/fonctionnalites/ComparisonTable.tsx"

# Once T011-T017 complete, single terminal:
Task T019: "Assemble page in src/app/fonctionnalites/page.tsx"
Task T020: "Configure metadata"
Task T021: "Visual test"

# MVP DONE - Can demonstrate/deploy User Story 1 independently!
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

**Target: Complete in 4-5 hours for working demo**

1. ✅ Complete Phase 1: Setup (30 min)
2. ✅ Complete Phase 2: Foundational (45 min)
3. ✅ Complete Phase 3: User Story 1 (2-3 hours)
4. **STOP and VALIDATE**: Test US1 independently
   - Navigate to `/fonctionnalites`
   - Verify 7 features visible
   - Test tooltips work
   - Check comparison table
   - Verify CTAs clickable
5. Optional: Quick Lighthouse audit (>85 acceptable for MVP)
6. **MVP READY**: Can demonstrate core value proposition

**Deliverable**: Functional features page showing GAMR capabilities, comparison, and CTAs. Visitors can discover and understand the platform.

### Incremental Delivery (All User Stories)

**Target: Production-ready in 8-11 hours**

1. MVP First (User Story 1) → 4-5 hours → Demo checkpoint
2. Add User Story 2 (Technical depth) → +1.5 hours → Enhanced demo
3. Add User Story 3 (Credibility) → +45 min → Full feature complete
4. Polish & Testing → +2-3 hours → Quality assurance
5. Validation (Required) → +1 hour → Constitution compliance
6. Documentation → +30 min → Deployment ready

**Each increment adds value without breaking previous functionality.**

### Parallel Team Strategy

With 2 developers (after Foundational complete):

- **Dev A**: User Story 1 (P1) - Hero, Features, Comparison
- **Dev B**: User Story 2 prep (enhance content) + User Story 3 (Partner/CTA)
- Both merge independently, integration tested at end

With 3+ developers:

- **Dev A**: User Story 1
- **Dev B**: User Story 2
- **Dev C**: User Story 3
- **Dev D**: Polish & Testing (starts after US1-3 substantial)

---

## Task Completion Checklist

### After Each Task

- [ ] Code compiles without TypeScript errors
- [ ] Component renders in browser without console errors
- [ ] Commit with clear message (e.g., "feat(fonctionnalites): add HeroSection component")
- [ ] Push to feature branch

### After Each User Story Phase

- [ ] Visual test in browser (all new components render correctly)
- [ ] Quick manual test of user story goal (can a user complete the story objective?)
- [ ] Verify no regressions in previous stories
- [ ] Checkpoint: Story is independently demonstrable

### Before Final Merge

- [ ] All validation tasks (Phase 8) pass with documented evidence
- [ ] Lighthouse reports attached to PR (screenshots)
- [ ] Manual accessibility testing completed and documented
- [ ] All placeholder content replaced with real assets
- [ ] Code review approved
- [ ] Constitution compliance verified

---

## Notes

- [P] tasks = different files, safe to parallelize
- [Story] label maps task to specific user story for traceability
- Each user story delivers independent value
- MVP (US1) can ship without US2/US3 if time constrained
- Stop at any checkpoint to demo/validate
- Tests (Phase 7) optional but recommended for production quality
- Validation (Phase 8) is NON-NEGOTIABLE per constitution
- Prioritize completing US1 before moving to US2/US3 (incremental value)

---

## Success Metrics Alignment

Implementation tasks directly support spec success criteria:

| Success Criteria             | Supporting Tasks                                 | Validation                 |
| ---------------------------- | ------------------------------------------------ | -------------------------- |
| SC-001: 5 features in <2 min | T014-T016 (FeaturesGrid, FeatureCard, layout)    | T021 manual test           |
| SC-002: 70% understand hero  | T011 (HeroSection with clear value prop)         | User testing post-deploy   |
| SC-003: Bounce rate <60%     | All US1 tasks (engaging content, fast load)      | Analytics post-deploy      |
| SC-004: Time on page >90s    | T017-T018 (ComparisonTable adds depth)           | Analytics post-deploy      |
| SC-005: 15% CTA clicks       | T011, T028 (prominent CTAs in hero and final)    | Event tracking post-deploy |
| SC-006: Lighthouse >90       | T040-T043 (optimization), T057-T061 (validation) | T057-T058 audit            |
| SC-007: 100% screen reader   | T032-T035 (accessibility), T053 (testing)        | T053 manual test           |
| SC-008: LCP <2.5s on 4G      | T012 (Image priority), T040-T043 (optimization)  | T058, T061 test            |
| SC-009: +20% conversion      | All tasks (superior UX, tooltips, trust)         | A/B testing post-deploy    |
| SC-010: 85% mobile no zoom   | T037 (responsive testing), T049 (E2E mobile)     | T037, T049 validation      |

---

**Last Updated**: 2025-10-09  
**Total Tasks**: 72 tasks  
**Task Breakdown**:

- Setup: 5 tasks (30 min)
- Foundational: 5 tasks (45 min)
- User Story 1 (P1): 11 tasks (2-3 hours) 🎯 MVP
- User Story 2 (P2): 5 tasks (1.5 hours)
- User Story 3 (P3): 4 tasks (45 min)
- Polish: 9 tasks (2-3 hours)
- Testing (Optional): 7 tasks (1-2 hours)
- Validation (Required): 16 tasks (1 hour)
- Documentation: 6 tasks (30 min)

**Parallel Opportunities**: 28 tasks marked [P] can run simultaneously  
**MVP Scope**: Phases 1-3 (User Story 1) = 21 tasks = 4-5 hours  
**Full Implementation**: All phases = 72 tasks = 8-11 hours

**Status**: ✅ Ready for implementation - Start with Phase 1 Setup
