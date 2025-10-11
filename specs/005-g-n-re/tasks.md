# Tasks: Page Tarifs - GAMR Pricing

**Input**: Design documents from `/specs/005-g-n-re/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: E2E tests included for user story validation (Playwright)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US7)
- Include exact file paths in descriptions

## Path Conventions

**Project Type**: Next.js marketing site (single project structure)

- `src/` - Application code
- `tests/e2e/` - End-to-end tests

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Directory structure and initial configuration for /tarifs page

- [ ] T001 Create `/tarifs` route directory at `src/app/tarifs/`
- [ ] T002 Create components directory structure at `src/components/tarifs/`
- [ ] T003 [P] Ensure shadcn/ui primitives installed (Card, Badge, Toggle, Accordion, Table, Button) in `src/components/ui/`
- [ ] T004 [P] Create OpenGraph image placeholder at `public/images/tarifs/og-image.png` (1200×630px)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, data model, and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Type Definitions

- [ ] T005 [P] Create pricing types in `src/types/pricing.ts`
  - Define: `PricingPlan`, `DeploymentModel`, `BillingPeriod`, `PlanTier`, `Addon`, `ComparisonDimension`, `FAQEntry`, `OnPremisePricing`
  - Include type guards: `hasCustomPricing`, `isCloudPlan`, `hasVisiblePricing`

- [ ] T006 [P] Create ROI types in `src/types/roi.ts`
  - Define: `ROIInputs`, `ROIResults`, `ROIConstants`
  - Include validation: `validateROIInputs`

### Data Model & Utilities

- [ ] T007 Create pricing data in `src/lib/pricing-data.ts`
  - Export: `cloudPlans` (4 tiers: Starter, Pro, Business, Enterprise)
  - Export: `onPremisePricing` (license info, services, features)
  - Export: `addons` (5 items: AI, SSO, Connectors, Support, Training)
  - Export: `comparisonDimensions` (6 dimensions)
  - Export: `faqEntries` (6-8 questions)
  - Export: `roiConstants` (hourlyRate: 15000, costPerIncident: 500000, setupCost: 0, weeksPerMonth: 4.33)

- [ ] T008 [P] Create pricing utilities in `src/lib/pricing-utils.ts`
  - Function: `calculateAnnualPrice(monthlyPrice)` → returns monthly × 12 × 0.85
  - Function: `calculateAnnualSavings(monthlyPrice)` → returns discount amount
  - Function: `getPlanPrice(plan, billingPeriod)` → returns correct price
  - Function: `calculateROI(inputs, planCost, constants)` → returns ROIResults

- [ ] T009 [P] Create currency formatter in `src/lib/currency-formatter.ts`
  - Function: `formatFCFA(amount, locale = 'es-CI')` → uses Intl.NumberFormat with XOF currency
  - Handle edge cases: 0, negative, very large numbers

### Shared Components

- [ ] T010 [P] Create FormattedPrice component in `src/components/shared/FormattedPrice.tsx`
  - Props: `value` (number), `locale`, `displayMode`, `className`, `aria-label`
  - Uses `formatFCFA` utility
  - Proper accessibility announcements

**Checkpoint**: Foundation ready - all user stories can now be implemented

---

## Phase 3: User Story 1 - Compare Cloud and On-Premise Pricing (Priority: P1) 🎯 MVP

**Goal**: Enable decision-makers to view and compare Cloud vs On-Premise pricing models with all plan details displayed

**Independent Test**: Navigate to /tarifs, toggle between Cloud and On-Premise, verify both models display correctly with all pricing information in FCFA

### Implementation for User Story 1

- [ ] T011 [P] [US1] Create PricingHero component in `src/components/tarifs/PricingHero.tsx`
  - Props: `title`, `subtitle`, `primaryCtaText/Href`, `secondaryCtaText/Href`
  - Displays: "Des tarifs simples et transparents" title
  - Two CTAs: "Essai gratuit 30 jours" + "Demander une démo"
  - Responsive layout, accessible keyboard navigation

- [ ] T012 [P] [US1] Create DeploymentToggle component in `src/components/tarifs/DeploymentToggle.tsx`
  - Props: `value` (DeploymentModel), `onChange`, `label`, `disabled`, `className`
  - Toggle between 'cloud' and 'on-premise'
  - ARIA: `role="switch"`, `aria-checked`, `aria-label`
  - Keyboard support: Space/Enter to toggle

- [ ] T013 [P] [US1] Create PricingCard component in `src/components/tarifs/PricingCard.tsx`
  - Props: `plan` (PricingPlan), `price`, `billingPeriod`, `onCtaClick`, `ctaText`, `ctaHref`
  - Displays: plan name, price (or "Sur devis"), limits, 8-10 features, CTA button
  - Handles highlighted plans with badge
  - Uses FormattedPrice component
  - Accessible: proper headings, list semantics, ARIA labels

- [ ] T014 [US1] Create CloudPricingGrid component in `src/components/tarifs/CloudPricingGrid.tsx` (depends on T013)
  - Props: `billingPeriod`, `onPlanSelect`
  - Loads `cloudPlans` from pricing-data
  - Renders 4 PricingCard components in responsive grid
  - Uses `getPlanPrice` utility for correct pricing

- [ ] T015 [P] [US1] Create OnPremiseSection component in `src/components/tarifs/OnPremiseSection.tsx`
  - Props: `title`, `onServiceSelect`
  - Loads `onPremisePricing` from pricing-data
  - Displays: perpetual license info, 20% maintenance, service packages
  - Includes IncludedFeaturesTable sub-component
  - Service cards with "Contact us" CTAs

- [ ] T016 [P] [US1] Create ComparisonTable component in `src/components/tarifs/ComparisonTable.tsx`
  - Props: `title`, `className`
  - Loads `comparisonDimensions` from pricing-data (6 items)
  - Desktop: `<table>` with 3 columns (Critère, Cloud, On-Premise)
  - Mobile: Transform to stacked cards (< 768px)
  - Proper table semantics and ARIA roles

- [ ] T017 [US1] Create main pricing page in `src/app/tarifs/page.tsx`
  - Server component with SEO metadata export
  - Client state for `deploymentModel` (cloud/on-premise)
  - Conditionally renders CloudPricingGrid OR OnPremiseSection based on toggle
  - Includes: PricingHero, DeploymentToggle, pricing section, ComparisonTable
  - Layout: prevents CLS with reserved space

- [ ] T018 [P] [US1] Create SEO structured data components
  - `src/components/tarifs/PricingStructuredData.tsx` → JSON-LD Product + AggregateOffer schema (XOF currency)
  - `src/components/tarifs/FAQStructuredData.tsx` → JSON-LD FAQPage schema (placeholder, will populate in US6)
  - Embed in page.tsx

### E2E Tests for User Story 1

- [ ] T019 [P] [US1] E2E test: Navigate to /tarifs and verify hero section in `tests/e2e/tarifs.spec.ts`
  - Test: Hero title visible, subtitle present, 2 CTAs render
  - Test: CTAs have correct href attributes

- [ ] T020 [P] [US1] E2E test: Toggle Cloud/On-Premise deployment models
  - Test: Default shows Cloud pricing (4 plans)
  - Test: Toggle to On-Premise shows license info
  - Test: Toggle back to Cloud restores pricing
  - Test: No layout shift (CLS < 0.1)

- [ ] T021 [P] [US1] E2E test: View comparison table on desktop and mobile
  - Test: Table renders on desktop (≥ 768px) with 3 columns
  - Test: Mobile transforms to cards (< 768px)
  - Test: All 6 dimensions visible in both modes

**Checkpoint**: User Story 1 complete and independently testable - MVP ready!

---

## Phase 4: User Story 2 - Understand Annual vs Monthly Pricing (Priority: P1)

**Goal**: Enable budget-conscious users to see annual discount savings (15%) by toggling billing period

**Independent Test**: Toggle between monthly and annual billing, verify 15% discount calculation is correct across all Cloud plans

### Implementation for User Story 2

- [ ] T022 [P] [US2] Create BillingToggle component in `src/components/tarifs/BillingToggle.tsx`
  - Props: `value` (BillingPeriod), `onChange`, `showSavingsBadge`, `savingsText`, `disabled`
  - Toggle between 'monthly' and 'annual'
  - Display "Économisez 15%" badge for annual
  - ARIA: `role="radiogroup"`, each option `role="radio"`, `aria-checked`
  - Keyboard support

- [ ] T023 [US2] Update main pricing page to include billing toggle in `src/app/tarifs/page.tsx`
  - Add client state for `billingPeriod` (monthly/annual)
  - Show BillingToggle only when `deploymentModel === 'cloud'`
  - Pass billingPeriod to CloudPricingGrid
  - Smooth transition between price changes (no instant swap)

- [ ] T024 [US2] Update PricingCard to show annual savings indicator in `src/components/tarifs/PricingCard.tsx`
  - Display savings amount when billingPeriod === 'annual'
  - Format: "Économisez X FCFA par an"
  - Visual indicator (badge or highlighted text)

### E2E Tests for User Story 2

- [ ] T025 [P] [US2] E2E test: Toggle between monthly and annual billing in `tests/e2e/tarifs.spec.ts`
  - Test: Default shows monthly pricing
  - Test: Toggle to annual shows discounted prices (basePrice × 12 × 0.85)
  - Test: Verify Starter annual = 1,020,000 FCFA (100k × 12 × 0.85)
  - Test: Verify Pro annual = 2,550,000 FCFA (250k × 12 × 0.85)
  - Test: Verify Business annual = 5,100,000 FCFA (500k × 12 × 0.85)
  - Test: Enterprise still shows "Contact us"
  - Test: Savings badge displays "Économisez 15%"

- [ ] T026 [P] [US2] E2E test: Verify price animations don't cause layout shift
  - Test: Measure CLS when toggling billing period
  - Test: Ensure CLS < 0.1

**Checkpoint**: User Stories 1 AND 2 complete - Core pricing functionality ready

---

## Phase 5: User Story 7 - Access Free Trial and Demo CTAs (Priority: P1)

**Goal**: Provide clear conversion CTAs throughout the page for trial signup and demo requests

**Independent Test**: Verify CTAs appear in hero, plan cards, and footer with correct destinations

### Implementation for User Story 7

- [ ] T027 [P] [US7] Create PricingCTA component in `src/components/tarifs/PricingCTA.tsx`
  - Props: `title`, `description`, `primaryCtaText/Href`, `secondaryCtaText/Href`, `onPrimaryClick`, `onSecondaryClick`
  - Final section at bottom of page
  - Prominent CTAs: "Démarrez votre essai gratuit" + "Demander une démo"
  - Responsive, accessible

- [ ] T028 [US7] Add PricingCTA to main page in `src/app/tarifs/page.tsx`
  - Place at bottom after all other sections
  - Configure CTA destinations: `/inscription` and `/contact?type=demo`

- [ ] T029 [US7] Update PricingCard CTAs with correct destinations in `src/components/tarifs/PricingCard.tsx`
  - Starter/Pro/Business: href="/inscription?plan={tier}"
  - Enterprise: href="/contact?type=enterprise"
  - Verify CTA text matches plan (Essayer vs Parler à un expert)

### E2E Tests for User Story 7

- [ ] T030 [P] [US7] E2E test: Verify CTA presence and destinations in `tests/e2e/tarifs.spec.ts`
  - Test: Hero CTAs visible and have correct href
  - Test: Each plan card CTA links correctly
  - Test: Final CTA section appears at page bottom
  - Test: Click CTAs and verify navigation (or mock if routes don't exist yet)

**Checkpoint**: Priority 1 (P1) user stories complete - Core MVP ready for deployment!

---

## Phase 6: User Story 3 - View Cloud Plan Details and Features (Priority: P2)

**Goal**: Display detailed features (8-10 bullet points) for each Cloud plan to enable informed selection

**Independent Test**: Examine each plan card and verify all limits and features are present and accurate

### Implementation for User Story 3

- [ ] T031 [US3] Populate complete feature lists in pricing data `src/lib/pricing-data.ts`
  - Starter plan: Add 8-10 feature bullet points
  - Pro plan: Add 8-10 feature bullet points
  - Business plan: Add 8-10 feature bullet points
  - Enterprise plan: Add 8-10 feature bullet points
  - Ensure features are benefit-focused, not technical

- [ ] T032 [US3] Verify PricingCard renders all features correctly in `src/components/tarifs/PricingCard.tsx`
  - Features list displays 8-10 items with checkmark icons
  - Proper list semantics (`<ul>`, `<li>`)
  - Responsive: features readable on mobile
  - Accessibility: screen reader announces each feature

### E2E Tests for User Story 3

- [ ] T033 [P] [US3] E2E test: Verify plan details completeness in `tests/e2e/tarifs.spec.ts`
  - Test: Starter plan shows correct price, limits, and 8-10 features
  - Test: Pro plan shows correct price, limits, and 8-10 features
  - Test: Business plan shows correct price, limits, and 8-10 features
  - Test: Enterprise plan shows "Sur devis" and 8-10 features
  - Test: Mobile view: features remain readable and well-formatted

**Checkpoint**: User Story 3 complete - Detailed plan information available

---

## Phase 7: User Story 4 - Explore Add-on Options (Priority: P2)

**Goal**: Display 5 premium add-ons (AI, SSO, Connectors, Support, Training) with "Contact us" CTAs

**Independent Test**: Verify add-ons section displays all 5 options with descriptions and contact CTAs

### Implementation for User Story 4

- [ ] T034 [P] [US4] Create AddonCard component in `src/components/tarifs/AddonCard.tsx`
  - Props: `addon` (Addon), `onContactClick`
  - Displays: icon, name, description, feature list, "Nous contacter" CTA
  - Responsive card layout
  - Accessible

- [ ] T035 [US4] Create AddonsSection component in `src/components/tarifs/AddonsSection.tsx`
  - Props: `title`, `onAddonContact`
  - Loads `addons` from pricing-data (5 items)
  - Renders AddonCard for each addon
  - Responsive grid layout

- [ ] T036 [US4] Add AddonsSection to main page in `src/app/tarifs/page.tsx`
  - Place after pricing sections, before comparison table
  - Wire up contact click handler (navigate to /contact)

### E2E Tests for User Story 4

- [ ] T037 [P] [US4] E2E test: Verify add-ons display in `tests/e2e/tarifs.spec.ts`
  - Test: Add-ons section visible with 5 add-on cards
  - Test: Each add-on shows: name, description, features, "Contact us" CTA
  - Test: Verify add-ons: AI Advanced, SSO/LDAP/AD, Connectors, Premium Support 24/7, Training
  - Test: Click "Contact us" CTA navigates to contact form

**Checkpoint**: User Story 4 complete - Add-ons information available

---

## Phase 8: User Story 5 - Calculate ROI (Priority: P3)

**Goal**: Provide interactive ROI calculator with real-time results (< 50ms updates)

**Independent Test**: Enter ROI parameters, verify calculations display monthly/annual ROI and break-even point in FCFA

### Implementation for User Story 5

- [ ] T038 [P] [US5] Create useROICalculator hook in `src/hooks/useROICalculator.ts`
  - Hook signature: `useROICalculator(inputs: ROIInputs, planId?: string): { results, errors, isValid }`
  - Uses `calculateROI` from pricing-utils
  - Uses `validateROIInputs` from types
  - Real-time calculation (no debounce - must be < 50ms)
  - Returns validation errors for each input field

- [ ] T039 [US5] Create ROICalculator component in `src/components/tarifs/ROICalculator.tsx`
  - Props: `planId`, `onCalculate`
  - Three input fields: numberOfUsers (1-1000), incidentsAvoidedPerMonth (0-50), timeSavedPerUserPerWeek (0-40)
  - Input validation with error messages
  - Real-time results display: monthlySavings, monthlyROI, annualROI, breakEvenMonths
  - Uses FormattedPrice for FCFA formatting
  - ARIA: proper labels, aria-describedby for errors, aria-live for results
  - Keyboard accessible

- [ ] T040 [US5] Add ROICalculator to main page in `src/app/tarifs/page.tsx`
  - Place after comparison table, before FAQ
  - Section heading: "Calculateur de ROI"

### Unit Tests for User Story 5

- [ ] T041 [P] [US5] Unit test: ROI calculation formulas in `tests/unit/pricing-utils.test.ts`
  - Test: 10 users, 5 incidents/month, 2 hrs/user/week → verify calculations
  - Test: Edge cases: 0 values, max values, negative ROI scenario
  - Test: Break-even calculation: setupCost > 0 and setupCost = 0

- [ ] T042 [P] [US5] Unit test: ROI input validation in `tests/unit/pricing-utils.test.ts`
  - Test: Invalid numberOfUsers (< 1, > 1000) → returns error
  - Test: Invalid incidentsAvoidedPerMonth (< 0, > 50) → returns error
  - Test: Invalid timeSavedPerUserPerWeek (< 0, > 40) → returns error

### E2E Tests for User Story 5

- [ ] T043 [P] [US5] E2E test: ROI calculator interaction in `tests/e2e/tarifs.spec.ts`
  - Test: Calculator visible with 3 input fields
  - Test: Enter valid values → results update in real-time (< 100ms perceived)
  - Test: Enter 10 users, 5 incidents, 2 hours → verify displayed ROI matches calculation
  - Test: Results formatted in FCFA with proper separators
  - Test: Enter invalid values → validation errors display
  - Test: Clear inputs → results reset appropriately

**Checkpoint**: User Story 5 complete - ROI calculator functional

---

## Phase 9: User Story 6 - Get Questions Answered via FAQ (Priority: P3)

**Goal**: Display 6-8 FAQ questions in accordion format covering security, trial, support, compliance topics

**Independent Test**: Verify FAQ section displays all questions, accordions expand/collapse, topics covered

### Implementation for User Story 6

- [ ] T044 [P] [US6] Create PricingFAQ component in `src/components/tarifs/PricingFAQ.tsx`
  - Props: `title`, `category`, `defaultExpanded`
  - Loads `faqEntries` from pricing-data (6-8 items)
  - Uses shadcn/ui Accordion component
  - Each FAQ: question (H3), answer (paragraph)
  - ARIA: `aria-expanded`, `aria-controls`, proper heading hierarchy
  - Keyboard accessible: Tab, Enter/Space to expand

- [ ] T045 [US6] Add PricingFAQ to main page in `src/app/tarifs/page.tsx`
  - Place after ROI calculator, before final CTA
  - Section heading: "Questions fréquentes"

- [ ] T046 [US6] Populate FAQ structured data in `src/components/tarifs/FAQStructuredData.tsx`
  - Update JSON-LD FAQPage schema with actual FAQ data
  - Map all 6-8 FAQ entries to Question/Answer format

### E2E Tests for User Story 6

- [ ] T047 [P] [US6] E2E test: FAQ accordion functionality in `tests/e2e/tarifs.spec.ts`
  - Test: FAQ section visible with 6-8 questions
  - Test: All questions start collapsed (or first expanded if defaultExpanded set)
  - Test: Click question → accordion expands and shows answer
  - Test: Click again → accordion collapses
  - Test: Keyboard navigation: Tab to question, Enter to expand
  - Test: Verify topics covered: security, trial, support, compliance, billing

- [ ] T048 [P] [US6] E2E test: FAQ content validation
  - Test: Security question mentions hosting, encryption, compliance
  - Test: Trial question mentions 30 days, no credit card
  - Test: Support question mentions SLA and response times
  - Test: Compliance question mentions RGPD, ANSSI-CI, ISO

**Checkpoint**: User Story 6 complete - FAQ functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall page quality

### SEO & Metadata

- [ ] T049 [P] [Polish] Complete metadata export in `src/app/tarifs/page.tsx`
  - Title: "Tarifs GAMR - Abonnement Cloud et Licence On-Premise" (55 chars)
  - Description: Complete 150-160 character meta description
  - OpenGraph: title, description, image, url, type
  - Twitter card: summary_large_image
  - Canonical URL: /tarifs
  - Robots: index, follow

- [ ] T050 [P] [Polish] Create high-quality OpenGraph image at `public/images/tarifs/og-image.png`
  - Dimensions: 1200×630px
  - Content: GAMR logo, "Plans dès 100.000 FCFA/mois", "Essai gratuit 30 jours"
  - File size: < 300KB
  - Format: PNG

### Performance Optimization

- [ ] T051 [P] [Polish] Optimize component bundle sizes
  - Analyze bundle with `pnpm analyze`
  - Dynamic imports for heavy components if needed (ROICalculator, ComparisonTable)
  - Tree-shake unused shadcn/ui components

- [ ] T052 [P] [Polish] Add layout shift prevention
  - Add min-height to sections that toggle content
  - Use CSS transitions for price changes (opacity, not display)
  - Ensure grid-auto-rows: 1fr for equal height cards

- [ ] T053 [P] [Polish] Optimize font loading
  - Preload critical fonts
  - Use font-display: swap
  - Subset fonts if possible

### Code Quality

- [ ] T054 [P] [Polish] Add comprehensive JSDoc comments
  - Document all component props
  - Document utility functions
  - Document type definitions

- [ ] T055 [P] [Polish] Code refactoring and cleanup
  - Extract repeated patterns into utilities
  - Remove any console.logs or debug code
  - Ensure consistent naming conventions

- [ ] T056 [P] [Polish] Add error boundaries
  - Wrap interactive components (ROICalculator, toggles)
  - Graceful degradation if JavaScript fails

### Documentation

- [ ] T057 [P] [Polish] Validate quickstart.md against implementation
  - Ensure all file paths match actual structure
  - Update any changed patterns or conventions
  - Add screenshots if helpful

---

## Phase 11: Accessibility & Performance Validation (NON-NEGOTIABLE)

**Purpose**: Constitution compliance verification before deployment

### Accessibility Testing (WCAG 2.1 AA)

- [ ] T058 Run automated accessibility tests with axe-core in Playwright tests `tests/e2e/tarifs.spec.ts`
  - Test: No violations on /tarifs page
  - Test: All interactive elements have accessible names
  - Test: All images have alt text
  - Test: Color contrast meets 4.5:1 ratio

- [ ] T059 Manual keyboard navigation testing
  - Test: Tab through all interactive elements in logical order
  - Test: Space/Enter activates toggles and buttons
  - Test: Escape closes modals (if any)
  - Test: Focus indicators clearly visible on all elements
  - Test: No keyboard traps

- [ ] T060 Screen reader testing (NVDA on Windows OR VoiceOver on macOS)
  - Test: Page structure announced correctly (headings, landmarks)
  - Test: Toggle switches announce state ("Cloud selected")
  - Test: Prices announced with currency ("100,000 CFA Francs")
  - Test: FAQ accordions announce expanded/collapsed state
  - Test: Form inputs have associated labels
  - Test: ROI results announced when updated (aria-live)

- [ ] T061 Color contrast validation
  - Test: Run Chrome DevTools Accessibility audit
  - Test: All text meets 4.5:1 minimum (normal text)
  - Test: All text meets 3:1 minimum (large text 18px+)
  - Fix any violations

### Performance Testing (Constitution Budgets)

- [ ] T062 Lighthouse CI performance audit
  - Test: First Contentful Paint (FCP) < 1.5 seconds
  - Test: Time to Interactive (TTI) < 3 seconds
  - Test: Cumulative Layout Shift (CLS) < 0.1
  - Test: Largest Contentful Paint (LCP) < 2.5 seconds
  - Test: Total Blocking Time (TBT) < 200ms

- [ ] T063 Lighthouse score validation
  - Test: Performance score > 90
  - Test: Accessibility score = 100
  - Test: Best Practices score > 90
  - Test: SEO score > 95

- [ ] T064 Mobile performance testing
  - Test: Run Lighthouse with mobile throttling (3G)
  - Test: Verify all metrics still meet targets
  - Test: Test on real mobile device (iOS and Android)

- [ ] T065 ROI calculator performance validation
  - Test: Calculation updates < 50ms after input change
  - Test: No jank or lag when typing in inputs
  - Test: Results render smoothly

- [ ] T066 Bundle size analysis
  - Test: Total JavaScript < 250KB (gzipped)
  - Test: First load JS < 100KB
  - Test: Unused code eliminated

### SEO Validation

- [ ] T067 Verify meta tags and structured data
  - Test: Google Rich Results Test for Product schema - no errors
  - Test: Google Rich Results Test for FAQPage schema - no errors
  - Test: OpenGraph preview in Facebook Sharing Debugger
  - Test: Twitter Card preview in Twitter Card Validator
  - Test: Schema.org validator passes

- [ ] T068 Sitemap and robots validation
  - Test: /tarifs entry exists in sitemap.xml
  - Test: robots.txt allows /tarifs
  - Test: Canonical URL resolves correctly

- [ ] T069 Internal linking audit
  - Test: Homepage links to /tarifs
  - Test: Navigation menu includes /tarifs
  - Test: Footer includes /tarifs
  - Test: /fonctionnalites and /solutions link to /tarifs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-9)**: All depend on Foundational completion
  - P1 stories (US1, US2, US7): Can proceed in parallel after Foundation
  - P2 stories (US3, US4): Can proceed in parallel after Foundation (may build on P1 but independently testable)
  - P3 stories (US5, US6): Can proceed in parallel after Foundation (independent)
- **Polish (Phase 10)**: Depends on all desired user stories being complete
- **Validation (Phase 11)**: Depends on Polish completion

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational - Core pricing display
- **User Story 2 (P1)**: Depends on US1 (BillingToggle integrated into existing page)
- **User Story 7 (P1)**: Depends on US1 (CTAs added to existing components)
- **User Story 3 (P2)**: Extends US1 (adds feature details to existing cards) - independently testable
- **User Story 4 (P2)**: Independent - can start after Foundational
- **User Story 5 (P3)**: Independent - can start after Foundational
- **User Story 6 (P3)**: Independent - can start after Foundational

### Within Each User Story

- Tests run in parallel where marked [P]
- Components before integration
- E2E tests after implementation complete
- Story complete before checkpoint

### Parallel Opportunities

**Foundation Phase** (tasks T005-T010 can run in parallel):

- T005 [P] pricing types
- T006 [P] ROI types
- T008 [P] pricing utilities
- T009 [P] currency formatter
- T010 [P] FormattedPrice component

**User Story 1** (tasks T011-T016 can run in parallel):

- T011 [P] PricingHero
- T012 [P] DeploymentToggle
- T013 [P] PricingCard
- T015 [P] OnPremiseSection
- T016 [P] ComparisonTable

**E2E Tests** (within each story, tests marked [P] can run in parallel)

**Different User Stories** (after Foundation):

- US4 (add-ons), US5 (ROI calculator), US6 (FAQ) are completely independent and can be worked on in parallel by different developers

---

## Parallel Example: Foundational Phase

```bash
# Launch all foundational types and utilities in parallel:
Task T005: "Create pricing types in src/types/pricing.ts"
Task T006: "Create ROI types in src/types/roi.ts"
Task T008: "Create pricing utilities in src/lib/pricing-utils.ts"
Task T009: "Create currency formatter in src/lib/currency-formatter.ts"
Task T010: "Create FormattedPrice component in src/components/shared/FormattedPrice.tsx"

# Then create data model (depends on types):
Task T007: "Create pricing data in src/lib/pricing-data.ts"
```

## Parallel Example: User Story 1 Implementation

```bash
# After PricingCard (T013) is complete, these can run in parallel:
Task T014: "Create CloudPricingGrid component" (uses PricingCard)
Task T015: "Create OnPremiseSection component" (independent)
Task T016: "Create ComparisonTable component" (independent)

# E2E tests can run in parallel:
Task T019: "E2E test: Navigate to /tarifs and verify hero section"
Task T020: "E2E test: Toggle Cloud/On-Premise deployment models"
Task T021: "E2E test: View comparison table on desktop and mobile"
```

---

## Implementation Strategy

### MVP First (P1 Stories: US1, US2, US7)

**Delivers**: Core pricing page with Cloud/On-Premise comparison, billing toggle, and CTAs

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T010) - **CRITICAL**
3. Complete Phase 3: User Story 1 (T011-T021)
4. Complete Phase 4: User Story 2 (T022-T026)
5. Complete Phase 5: User Story 7 (T027-T030)
6. **STOP and VALIDATE**: Test MVP independently
7. Deploy/demo MVP - users can now compare pricing and sign up!

**MVP Scope**: 30 tasks (T001-T030)

### Incremental Delivery

After MVP, add features incrementally:

**Release 1 (MVP - P1)**: Setup + Foundation + US1 + US2 + US7 → **30 tasks**

- Value: Users can compare pricing, see savings, and sign up

**Release 2 (P2)**: Add US3 + US4 → **+10 tasks (T031-T040 with tests removed)**

- Value: Detailed plan features and add-ons information

**Release 3 (P3)**: Add US5 + US6 → **+12 tasks (T038-T048 with unit tests)**

- Value: ROI calculator and FAQ support

**Release 4 (Polish)**: Phase 10 + Phase 11 → **+22 tasks (T049-T069)**

- Value: Production-ready with SEO, performance, accessibility validation

### Parallel Team Strategy

With 3 developers after Foundation phase complete:

**Sprint 1** (Week 1):

- Developer A: User Story 1 (T011-T021) - Core pricing
- Developer B: User Story 2 (T022-T026) - Billing toggle
- Developer C: User Story 7 (T027-T030) - CTAs

**Sprint 2** (Week 2):

- Developer A: User Story 3 (T031-T033) - Plan details
- Developer B: User Story 4 (T034-T037) - Add-ons
- Developer C: Polish & SEO (T049-T050)

**Sprint 3** (Week 3):

- Developer A: User Story 5 (T038-T043) - ROI calculator
- Developer B: User Story 6 (T044-T048) - FAQ
- Developer C: Performance optimization (T051-T053)

**Sprint 4** (Week 4):

- All: Accessibility & Performance Validation (T058-T069)

---

## Task Summary

**Total Tasks**: 69 tasks

### Tasks by Phase

- Phase 1 (Setup): 4 tasks
- Phase 2 (Foundational): 6 tasks
- Phase 3 (US1 - P1): 11 tasks (8 implementation + 3 E2E tests)
- Phase 4 (US2 - P1): 5 tasks (3 implementation + 2 E2E tests)
- Phase 5 (US7 - P1): 4 tasks (3 implementation + 1 E2E test)
- Phase 6 (US3 - P2): 3 tasks (2 implementation + 1 E2E test)
- Phase 7 (US4 - P2): 4 tasks (3 implementation + 1 E2E test)
- Phase 8 (US5 - P3): 6 tasks (3 implementation + 2 unit tests + 1 E2E test)
- Phase 9 (US6 - P3): 5 tasks (3 implementation + 2 E2E tests)
- Phase 10 (Polish): 9 tasks
- Phase 11 (Validation): 12 tasks

### Tasks by User Story

- **US1** (Compare pricing): 11 tasks
- **US2** (Annual/monthly): 5 tasks
- **US3** (Plan details): 3 tasks
- **US4** (Add-ons): 4 tasks
- **US5** (ROI calculator): 6 tasks
- **US6** (FAQ): 5 tasks
- **US7** (CTAs): 4 tasks
- **Setup/Foundation**: 10 tasks
- **Polish/Validation**: 21 tasks

### Parallel Opportunities

- Foundation: 5 parallel tasks (T005, T006, T008, T009, T010)
- US1 Implementation: 5 parallel tasks (T011, T012, T013, T015, T016)
- US1 E2E Tests: 3 parallel tasks (T019, T020, T021)
- Cross-story parallelization: US4, US5, US6 are fully independent

### MVP Scope

**30 tasks** (Phases 1-5) deliver a fully functional pricing page with:

- Cloud and On-Premise pricing comparison
- Monthly/annual billing toggle with 15% discount
- 4 Cloud plan tiers with pricing in FCFA
- On-Premise licensing information
- Comparison table (6 dimensions)
- Hero and final CTAs for conversion
- Basic SEO metadata
- Responsive design
- E2E test coverage

---

## Notes

- **[P]** tasks = different files, can run in parallel
- **[Story]** label (US1-US7) maps task to specific user story for traceability
- Each user story is independently testable at its checkpoint
- Constitution compliance validated in Phase 11 (NON-NEGOTIABLE)
- Tests use Playwright for E2E, Vitest for unit tests
- All file paths are exact and ready for implementation
- MVP can be deployed after Phase 5 (Task T030)
- Incremental delivery ensures value at each phase
- No blocking dependencies between P2 and P3 stories - can parallelize
