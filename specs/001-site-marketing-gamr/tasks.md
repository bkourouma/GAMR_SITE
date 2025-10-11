# Tasks: GAMR Marketing Website

**Input**: Design documents from `/specs/001-site-marketing-gamr/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - not included in this task list per constitution. Tests can be added if explicitly requested later.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, etc.)
- Include exact file paths in descriptions

## Path Conventions

- **Marketing Site (Next.js)**: `src/app/`, `src/components/`, `src/lib/`
- All paths relative to repository root `gamr-site/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure needed by all user stories

- [ ] T001 Initialize Next.js 14 project with TypeScript, Tailwind CSS, App Router in `gamr-site/` directory
- [ ] T002 [P] Configure TypeScript strict mode in `tsconfig.json` (strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes)
- [ ] T003 [P] Configure Tailwind CSS custom theme in `tailwind.config.ts` (colors: primary blue, secondary violet, risk levels)
- [ ] T004 [P] Install form dependencies: `pnpm add react-hook-form zod @hookform/resolvers/zod`
- [ ] T005 [P] Install SEO dependencies: `pnpm add next-seo next-sitemap`
- [ ] T006 [P] Install MDX dependencies: `pnpm add gray-matter remark remark-html rehype`
- [ ] T007 [P] Setup ESLint configuration in `.eslintrc.json` (next/core-web-vitals, typescript-eslint, jsx-a11y)
- [ ] T008 [P] Setup Prettier configuration in `.prettierrc` (singleQuote: true, semi: true, trailingComma: 'es5')
- [ ] T009 [P] Setup Husky git hooks: `pnpm add -D husky lint-staged` and create pre-commit hook
- [ ] T010 [P] Setup Commitlint: `pnpm add -D @commitlint/cli @commitlint/config-conventional` and create commit-msg hook
- [ ] T011 Create project folder structure: `src/app/`, `src/components/{ui,layout,forms,shared}`, `src/lib/`, `src/types/`, `src/content/case-studies/`, `tests/{unit,integration,e2e}`
- [ ] T012 [P] Setup Vitest configuration in `vitest.config.ts` for unit/integration tests
- [ ] T013 [P] Setup Playwright configuration in `playwright.config.ts` for e2e tests
- [ ] T014 Create environment variables template `.env.local.example` with all required keys (SendGrid, Airtable, GA4, Calendly)
- [ ] T015 Add Inter font configuration in `src/app/layout.tsx` using next/font/google
- [ ] T016 Create global styles in `src/app/globals.css` with Tailwind imports and custom CSS animations

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T017 Create base layout components: Header skeleton in `src/components/layout/Header.tsx`
- [ ] T018 Create Footer skeleton in `src/components/layout/Footer.tsx` with legal links placeholders
- [ ] T019 Create root layout in `src/app/layout.tsx` importing Header, Footer, and font configuration
- [ ] T020 [P] Create UI primitives: Button component in `src/components/ui/Button.tsx` with variants (primary, secondary, outline)
- [ ] T021 [P] Create UI primitives: Input component in `src/components/ui/Input.tsx` with error states
- [ ] T022 [P] Create UI primitives: Select component in `src/components/ui/Select.tsx`
- [ ] T023 [P] Create UI primitives: Textarea component in `src/components/ui/Textarea.tsx`
- [ ] T024 [P] Create UI primitives: Card component in `src/components/ui/Card.tsx`
- [ ] T025 [P] Create UI primitives: LoadingSpinner component in `src/components/ui/LoadingSpinner.tsx`
- [ ] T026 Create form validation schemas in `src/lib/validations.ts` (trialSignupSchema, demoRequestSchema, contactSchema, dataDeletionSchema) with Zod
- [ ] T027 Create utilities in `src/lib/utils.ts` (cn classNames helper, isPersonalEmailDomain function)
- [ ] T028 Create constants in `src/lib/constants.ts` (PERSONAL_EMAIL_DOMAINS array, site config)
- [ ] T029 Create TypeScript types in `src/types/forms.ts` (TrialSignupPayload, DemoRequestPayload, etc.)
- [ ] T030 Create TypeScript types in `src/types/content.ts` (CaseStudyFrontmatter, Feature, Testimonial, Industry, PricingOption)
- [ ] T031 Create GA4 tracking helper in `src/lib/analytics.ts` (trackEvent, trackError, trackConversion functions)
- [ ] T032 Setup Google Analytics 4 in `src/app/layout.tsx` with Script component (afterInteractive strategy)
- [ ] T033 Create global error handlers in `src/lib/analytics.ts` (window.onerror, onunhandledrejection) to track JavaScript errors via GA4
- [ ] T034 Create Error Boundary component in `src/components/shared/ErrorBoundary.tsx` to catch React errors and track to GA4
- [ ] T035 Create SEO helper functions in `src/lib/seo.ts` (generatePageMeta, generateJSONLD)
- [ ] T036 Configure next.config.js with image domains, i18n structure (French only), and strict CSP headers

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Découverte et Compréhension Initiale (Priority: P1) 🎯 MVP

**Goal**: Visitor understands GAMR value proposition in < 30 seconds via Homepage

**Independent Test**: User reads homepage and identifies 3+ key benefits without navigating away

### Implementation for User Story 1

- [ ] T037 [P] [US1] Create Hero Section component in `src/components/home/HeroSection.tsx` with title, subtitle, primary CTA, and dashboard visual
- [ ] T038 [P] [US1] Create Problem/Solution section in `src/components/home/ProblemSolution.tsx` listing 4 pain points with GAMR solutions
- [ ] T039 [P] [US1] Create static features data in `src/lib/features.ts` (7 features: Indice Sécurité, Évaluations, IA, Fiches, Actions, Users, Analytics)
- [ ] T040 [US1] Create Features Grid component in `src/components/home/FeaturesGrid.tsx` displaying 7 feature cards with icons
- [ ] T041 [US1] Create FeatureCard sub-component in `src/components/shared/FeatureCard.tsx` (icon, title, short description, "En savoir plus" link)
- [ ] T042 [P] [US1] Create static testimonials data in `src/lib/testimonials.ts` (3 testimonials with quotes, authors, roles, ratings)
- [ ] T043 [US1] Create Social Proof section in `src/components/home/SocialProof.tsx` (logos, 6 stats, 3 testimonials)
- [ ] T044 [US1] Create TestimonialCard component in `src/components/shared/TestimonialCard.tsx` (quote, author, stars)
- [ ] T045 [US1] Create Demo Video section in `src/components/home/DemoVideo.tsx` with YouTube embed (responsive 16:9, thumbnail preview)
- [ ] T046 [US1] Create Final CTA section in `src/components/home/FinalCTA.tsx` (dual CTAs: Essai Gratuit + Demander Démo)
- [ ] T047 [US1] Create CTAButton shared component in `src/components/shared/CTAButton.tsx` (primary/secondary variants, hover effects, reassurance text)
- [ ] T048 [US1] Assemble Homepage in `src/app/page.tsx` importing all sections in correct order
- [ ] T049 [US1] Add SEO metadata to Homepage using next-seo (title, description, OpenGraph, JSON-LD Organization + WebSite schemas)
- [ ] T050 [US1] Add hero images to `public/images/hero/` (dashboard screenshot with Security Index visible, 2x resolution WebP)
- [ ] T051 [US1] Implement scroll animations using Intersection Observer hook `src/hooks/useIntersectionObserver.ts` for fade-in effects
- [ ] T052 [US1] Add prefers-reduced-motion detection in animations to disable if user preference set

**Checkpoint**: Homepage complete - User Story 1 fully functional and testable independently

---

## Phase 4: User Story 5 - Demande de Démonstration Personnalisée (Priority: P1) 🎯 MVP

**Goal**: Qualified decision-maker can request personalized demo in < 2 minutes

**Independent Test**: User fills demo form, receives confirmation, can book via Calendly

### Implementation for User Story 5

- [ ] T053 [US5] Create demo request page in `src/app/demander-demo/page.tsx` with SEO metadata
- [ ] T054 [P] [US5] Create DemoRequestForm component in `src/components/forms/DemoRequestForm.tsx` with all fields (firstName, lastName, email, phone, organization, industry, deploymentType, needs)
- [ ] T055 [P] [US5] Create FormField wrapper component in `src/components/forms/FormField.tsx` for consistent label/error display
- [ ] T056 [US5] Implement react-hook-form integration in DemoRequestForm with zod resolver (demoRequestSchema from validations.ts)
- [ ] T057 [US5] Add real-time validation (onBlur) with contextual error messages in French
- [ ] T058 [US5] Add honeypot field to DemoRequestForm (hidden via CSS, labeled "Website URL")
- [ ] T059 [US5] Implement two-column layout for demo page (form left, benefits right) with responsive breakpoint
- [ ] T060 [US5] Create benefits list component showing 8 demo points covered (including "Visualisation indice sécurité temps réel")
- [ ] T061 [P] [US5] Create Calendly integration component in `src/components/shared/Calendly.tsx` with iframe embed
- [ ] T062 [US5] Create API route `/api/demo-request/route.ts` for form submission
- [ ] T063 [US5] Implement honeypot validation in API route (reject silently if filled, track spam_detected to GA4)
- [ ] T064 [US5] Implement Airtable integration in API route (POST to DemoRequests table with all fields)
- [ ] T065 [US5] Implement SendGrid email sending in API route (confirmation email with demo details and Calendly link)
- [ ] T066 [US5] Add form submission success state (green confirmation message, hide form, show Calendly widget)
- [ ] T067 [US5] Add loading spinner during submission (disable button, prevent double submit)
- [ ] T068 [US5] Add error handling for API failures (display gracious error message with contact email)
- [ ] T069 [US5] Track demo_request event to GA4 with parameters (industry, deployment_type, source_page)
- [ ] T070 [US5] Add mini testimonial below form: "Setup en 10 minutes..."

**Checkpoint**: Demo request flow complete - User Story 5 fully functional

---

## Phase 5: User Story 6 - Démarrage Essai Gratuit (Priority: P1) 🎯 MVP

**Goal**: Small team/analyst can signup for 30-day trial in < 3 minutes without credit card

**Independent Test**: User fills trial form, receives confirmation email with activation or contact message

### Implementation for User Story 6

- [ ] T071 [US6] Create trial signup page in `src/app/essai-gratuit/page.tsx` with SEO metadata
- [ ] T072 [US6] Create TrialSignupForm component in `src/components/forms/TrialSignupForm.tsx` with fields (email, organization, deploymentType, userCount)
- [ ] T073 [US6] Implement react-hook-form with zod resolver (trialSignupSchema) for TrialSignupForm
- [ ] T074 [US6] Add email domain validation to reject personal emails (gmail, yahoo, hotmail, outlook.com) with specific error message
- [ ] T075 [US6] Add honeypot field to TrialSignupForm (same pattern as demo form)
- [ ] T076 [US6] Create trust badges component in `src/components/shared/TrustBadges.tsx` (4 badges: "Configuration en 5 minutes", etc.)
- [ ] T077 [US6] Display trust badges below trial form
- [ ] T078 [US6] Add mini testimonial to trial page
- [ ] T079 [US6] Create API route `/api/trial-signup/route.ts` for form submission
- [ ] T080 [US6] Implement honeypot validation in trial API route
- [ ] T081 [US6] Implement Airtable integration (POST to TrialSignups table)
- [ ] T082 [US6] Implement SendGrid email logic with conditional content (Cloud: activation link, OnPremise: contact message + comparison guide link)
- [ ] T083 [US6] Add form success state with confirmation message
- [ ] T084 [US6] Track trial_signup event to GA4 with parameters (deployment_type, user_count)
- [ ] T085 [US6] Update Header component to include sticky "Essai Gratuit" CTA linking to /essai-gratuit

**Checkpoint**: Trial signup flow complete - User Story 6 fully functional

**🎯 MVP MILESTONE**: At this point, core conversion flows (Homepage + Demo + Trial) are complete and can be deployed for initial user testing

---

## Phase 6: User Story 2 - Exploration Approfondie des Fonctionnalités (Priority: P2)

**Goal**: Qualified visitor explores 7 GAMR capabilities in detail before requesting demo

**Independent Test**: User navigates feature tabs, views screenshots, understands capabilities independently

### Implementation for User Story 2

- [ ] T086 [US2] Create features page in `src/app/fonctionnalites/page.tsx` with SEO metadata
- [ ] T087 [US2] Create FeatureTabs navigation component in `src/components/features/FeatureTabs.tsx` (7 tabs, sticky on scroll, ARIA tablist)
- [ ] T088 [US2] Create FeatureDetail component in `src/components/features/FeatureDetail.tsx` (title, full description, benefits list, screenshot, case study link, CTA)
- [ ] T089 [US2] Create SecurityIndexShowcase special component in `src/components/features/SecurityIndexShowcase.tsx` (algorithm box, gauge screenshot, testimonial)
- [ ] T090 [US2] Add feature screenshots to `public/images/features/` (7 high-res 2x WebP images: indice-securite.webp, evaluations.webp, etc.)
- [ ] T091 [US2] Implement tab navigation logic with keyboard support (Arrow keys, Home, End) and aria-selected state
- [ ] T092 [US2] Add smooth scroll to feature sections if using sections instead of tabs
- [ ] T093 [US2] Add "Essayer cette fonctionnalité" CTA button linking to /essai-gratuit for each feature
- [ ] T094 [US2] Update features.ts data file with full descriptions and benefits arrays for all 7 features

**Checkpoint**: Features exploration complete - User Story 2 fully functional

---

## Phase 7: User Story 3 - Comparaison des Options de Déploiement (Priority: P2)

**Goal**: IT Director compares Cloud vs OnPremise and gets personalized quote

**Independent Test**: User understands deployment differences, uses ROI calculator, requests quote

### Implementation for User Story 3

- [ ] T095 [US3] Create pricing page in `src/app/tarifs/page.tsx` with SEO metadata including Product/Offer JSON-LD schema
- [ ] T096 [US3] Create static pricing data in `src/lib/pricing.ts` (2 options: Cloud/OnPremise with included features, advantages, comparison criteria)
- [ ] T097 [P] [US3] Create PricingComparison component in `src/components/pricing/PricingComparison.tsx` (2 cards side-by-side, responsive stack on mobile)
- [ ] T098 [P] [US3] Create comparison table in `src/components/pricing/PricingComparison.tsx` (8 criteria: mise en service, coût, maintenance, sécurité, contrôle, scalabilité, conformité)
- [ ] T099 [US3] Create decision guide "Quelle Option Choisir?" section in pricing page (decision matrix, recommendations based on constraints)
- [ ] T100 [US3] Create ROICalculator component in `src/components/pricing/ROICalculator.tsx` with state management (inputs: userCount, sitesCount, auditFrequency)
- [ ] T101 [US3] Implement ROI calculation logic (70% time saved, +32 points index improvement, consultant costs avoided formula)
- [ ] T102 [US3] Add ROI results display with animated counters or progress bars
- [ ] T103 [US3] Track roi_calculator_use event to GA4 with inputs and calculated outputs
- [ ] T104 [US3] Create PricingFAQ component in `src/components/pricing/PricingFAQ.tsx` (accordion, 15+ questions from spec FR-027)
- [ ] T105 [US3] Add certification badges below pricing options (ISO 27001, SOC 2, RGPD, HDS logos)
- [ ] T106 [US3] Add "Contactez-nous pour un devis" CTA linking to /demander-demo with URL param pre-filling deployment type if selected

**Checkpoint**: Pricing comparison complete - User Story 3 fully functional

---

## Phase 8: User Story 8 - Navigation Mobile et Responsive (Priority: P2)

**Goal**: Mobile visitor (60% of traffic) navigates and converts without friction

**Independent Test**: User on mobile can navigate site, submit demo in < 3 min without zoom

### Implementation for User Story 8

- [ ] T107 [US8] Create MobileMenu component in `src/components/layout/MobileMenu.tsx` (hamburger icon, drawer overlay, full-screen menu)
- [ ] T108 [US8] Implement drawer animation (slide-in from right/left) with smooth transitions
- [ ] T109 [US8] Add keyboard accessibility to mobile menu (Tab, Esc to close, focus trap when open)
- [ ] T110 [US8] Update Header to show hamburger icon on mobile breakpoint (< md:)
- [ ] T111 [US8] Create StickyMobileCTA component in `src/components/layout/StickyMobileCTA.tsx` (bottom fixed, "Essai Gratuit" button)
- [ ] T112 [US8] Position sticky CTA with z-index that doesn't block scrollable content
- [ ] T113 [US8] Test all forms on mobile: verify input types (email keyboard, numeric keyboard), viewport adjustment without hiding fields
- [ ] T114 [US8] Verify touch targets ≥ 44x44px on all interactive elements (buttons, links, menu items)
- [ ] T115 [US8] Test features grid/carousel on mobile (stack vertical or swipeable carousel)
- [ ] T116 [US8] Optimize images for mobile with responsive srcset (smaller images for mobile breakpoints)
- [ ] T117 [US8] Test performance on mobile with Chrome DevTools device emulation (Moto G4, iPhone 12)
- [ ] T118 [US8] Test on physical devices if available (iOS 14+, Android 10+)
- [ ] T119 [US8] Verify no horizontal scroll at any breakpoint (320px - 2560px)

**Checkpoint**: Mobile experience optimized - User Story 8 complete

---

## Phase 9: User Story 4 - Découverte de Solutions Sectorielles (Priority: P3)

**Goal**: Sector-specific visitor finds industry-relevant case studies and certifications

**Independent Test**: User accesses sector page, sees relevant compliance/case studies

### Implementation for User Story 4

- [ ] T120 [P] [US4] Create static industries data in `src/lib/industries.ts` (5 industries: Tech, Santé, Finance, Industrie, Gouvernement)
- [ ] T121 [US4] Create solutions hub page in `src/app/solutions/page.tsx` (5 sector cards with icons, descriptions, CTAs)
- [ ] T122 [P] [US4] Create Health sector page in `src/app/solutions/sante/page.tsx` with pain points, adapted features, HDS certification, case study link
- [ ] T123 [P] [US4] Create Finance sector page in `src/app/solutions/finance/page.tsx` with banking compliance, SOC 2, case study
- [ ] T124 [P] [US4] Create Technology sector page in `src/app/solutions/technologie/page.tsx` with cybersecurity focus
- [ ] T125 [P] [US4] Create Manufacturing sector page in `src/app/solutions/industrie/page.tsx` with physical security, case study link
- [ ] T126 [P] [US4] Create Government sector page in `src/app/solutions/gouvernement/page.tsx` with public sector compliance
- [ ] T127 [US4] Add "Voir une démo sectorielle" CTA to each sector page linking to /demander-demo with industry pre-filled via URL param
- [ ] T128 [US4] Update DemoRequestForm to accept URL params (industry, deploymentType) for pre-filling
- [ ] T129 [US4] Update navigation menu to include Solutions dropdown or link

**Checkpoint**: Industry solutions complete - User Story 4 fully functional

---

## Phase 10: User Story 7 - Consultation Études de Cas (Priority: P3)

**Goal**: Researcher consults concrete success examples to understand GAMR value

**Independent Test**: User reads 3 case studies with quantified results

### Implementation for User Story 7

- [ ] T130 [P] [US7] Write Manufacturing case study MDX in `src/content/case-studies/audit-usine-production.mdx` (frontmatter + content following schema)
- [ ] T131 [P] [US7] Write Health case study MDX in `src/content/case-studies/conformite-hospitaliere.mdx`
- [ ] T132 [P] [US7] Write Tech case study MDX in `src/content/case-studies/startup-tech-indice-securite.mdx`
- [ ] T133 [P] [US7] Add case study hero images to `public/images/case-studies/` (3 images, 2x WebP)
- [ ] T134 [US7] Create MDX processing utilities in `src/lib/mdx.ts` (getCaseStudies, getCaseStudyBySlug, parseFrontmatter)
- [ ] T135 [US7] Create case studies listing page in `src/app/etudes-de-cas/page.tsx` (3 study previews with excerpts, images, key metrics)
- [ ] T136 [US7] Create CaseStudyCard component in `src/components/shared/CaseStudyCard.tsx` (image, title, industry badge, excerpt, key metric)
- [ ] T137 [US7] Create dynamic case study detail page in `src/app/etudes-de-cas/[slug]/page.tsx` using generateStaticParams for SSG
- [ ] T138 [US7] Implement case study layout: Contexte, Défi, Solution GAMR, Résultats (metrics grid), Témoignage client, CTA section
- [ ] T139 [US7] Create metrics display component for results array (icons, values, descriptions in grid)
- [ ] T140 [US7] Add industry filter badges to listing page (clickable, filter client-side or via search params)
- [ ] T141 [US7] Add SEO metadata to each case study (Article JSON-LD schema with headline, image, datePublished)
- [ ] T142 [US7] Add CTAs at end of case studies ("Démarrer essai gratuit" + "Demander démo")
- [ ] T143 [US7] Track case_study_view event to GA4 when user loads detail page

**Checkpoint**: Case studies complete - User Story 7 fully functional

---

## Phase 11: User Story 3 Additional - About Page

**Goal**: Visitor learns about GAMR mission, team, certifications, partners

**Independent Test**: User finds contact information and company credentials

### Implementation

- [ ] T144 [US3] Create about page in `src/app/a-propos/page.tsx` with SEO metadata (Organization + ContactPoint JSON-LD)
- [ ] T145 [P] [US3] Create Mission section component (text: "Démocratiser la gestion des risques")
- [ ] T146 [P] [US3] Create Certifications section component displaying ISO 27001, SOC 2, RGPD, HDS with logos and descriptions
- [ ] T147 [P] [US3] Create Partners section with Microsoft Azure, AWS, Prisma, OpenAI logos
- [ ] T148 [US3] Create static certifications data in `src/lib/certifications.ts`
- [ ] T149 [US3] Add certification logos to `public/images/certifications/`
- [ ] T150 [US3] Add partner logos to `public/images/partners/`
- [ ] T151 [US3] Create Contact section with ContactForm component (reuse FormField, similar pattern to Demo/Trial)
- [ ] T152 [US3] Create API route `/api/contact/route.ts` with Airtable integration
- [ ] T153 [US3] Track contact_form_submit event to GA4

**Checkpoint**: About page complete

---

## Phase 12: GDPR Data Deletion Portal

**Goal**: User can request deletion of personal data per GDPR compliance

**Independent Test**: User submits email, receives confirmation link, data is deleted

### Implementation

- [ ] T154 Create data deletion portal page in `src/app/gerer-mes-donnees/page.tsx`
- [ ] T155 Create DataDeletionForm component in `src/components/forms/DataDeletionForm.tsx` (email field only + honeypot)
- [ ] T156 Create API route `/api/data-deletion/route.ts` for deletion request submission
- [ ] T157 Implement token generation logic (HMAC signature with DATA_DELETION_SECRET, 24h expiration)
- [ ] T158 Store deletion request in Airtable DeletionRequests table with token
- [ ] T159 Send confirmation email with deletion link via SendGrid
- [ ] T160 Create confirmation page in `src/app/gerer-mes-donnees/confirmer/page.tsx` accepting token param
- [ ] T161 Create API route `/api/data-deletion/confirm/route.ts` for token validation and deletion execution
- [ ] T162 Implement token verification (signature check, expiration check)
- [ ] T163 Implement data anonymization in Airtable (update email to "deleted-{id}@deleted.gamr.com", name to "Utilisateur supprimé")
- [ ] T164 Send deletion confirmation email to original address
- [ ] T165 Track data_deletion_requested and data_deletion_confirmed events to GA4
- [ ] T166 Add "Gérer mes données" link in Footer component
- [ ] T167 Update Privacy Policy page (if exists) to mention deletion portal

**Checkpoint**: GDPR compliance complete

---

## Phase 13: SEO Implementation

**Purpose**: Production-ready SEO across all pages

- [ ] T168 [P] Install next-seo: `pnpm add next-seo`
- [ ] T169 [P] Install next-sitemap: `pnpm add next-sitemap`
- [ ] T170 [P] Create next-seo.config.ts with default SEO settings (site name, default OG image, Twitter card)
- [ ] T171 [P] Create next-sitemap.config.js with sitemap generation rules (all public pages, exclude /api, /gerer-mes-donnees/confirmer)
- [ ] T172 Add unique SEO metadata to all pages using next-seo or metadata export (Homepage, Features, Solutions x5, Pricing, Case Studies, About, Trial, Demo)
- [ ] T173 [P] Create OpenGraph images (1200x630px) for main pages in `public/images/og-images/`
- [ ] T174 [P] Implement JSON-LD Organization schema on Homepage (name, logo, social media, contact)
- [ ] T175 [P] Implement JSON-LD WebSite schema on Homepage (name, url)
- [ ] T176 [P] Implement JSON-LD Product/Offer schema on Pricing page
- [ ] T177 [P] Implement JSON-LD Article schema on Case Study detail pages (from MDX frontmatter)
- [ ] T178 Add canonical URLs to all pages via next-seo
- [ ] T179 Generate sitemap.xml by running `pnpm build` (next-sitemap generates automatically)
- [ ] T180 Create custom robots.txt in `public/robots.txt` (allow all except /api, /admin, reference sitemap)
- [ ] T181 Verify all URLs are SEO-friendly slugs (check routing structure)
- [ ] T182 Add descriptive alt text to all images (homepage hero, features, testimonials, case studies)
- [ ] T183 Verify heading hierarchy on all pages (single h1, logical h2/h3 structure)
- [ ] T184 Update internal links to use descriptive anchor text (avoid "cliquez ici")

**Checkpoint**: SEO implementation complete

---

## Phase 14: Accessibility Validation (NON-NEGOTIABLE per Constitution)

**Purpose**: WCAG 2.1 AA compliance verification

### Keyboard Navigation Testing

- [ ] T185 Test Tab order on all pages (logical sequence through interactive elements)
- [ ] T186 Test Shift+Tab reverse navigation
- [ ] T187 Test Enter key on links and buttons
- [ ] T188 Test Space bar on buttons
- [ ] T189 Test Esc key to close mobile menu and modals
- [ ] T190 Test Arrow keys in feature tabs navigation
- [ ] T191 Verify focus trap in mobile menu (Tab cycles within menu when open)
- [ ] T192 Verify focus returns to trigger button when closing mobile menu

### Screen Reader Testing

- [ ] T193 Test with NVDA on Windows (homepage, forms, navigation)
- [ ] T194 Test with VoiceOver on macOS/iOS if available
- [ ] T195 Verify all form labels are announced correctly
- [ ] T196 Verify form error messages are announced (aria-live="polite" or aria-describedby)
- [ ] T197 Verify feature tabs announce selected state (aria-selected="true")
- [ ] T198 Verify images have descriptive alt text or alt="" for decorative images
- [ ] T199 Verify heading structure is logical and announced correctly

### Visual & Contrast Testing

- [ ] T200 Run axe-core automated scan on all pages (should be 0 critical errors)
- [ ] T201 Verify color contrast ≥ 4.5:1 for all text (use browser DevTools or online checker)
- [ ] T202 Verify focus indicators are visible (2px outline or custom ring) on all interactive elements
- [ ] T203 Test zoom to 200% - verify no horizontal scroll and all content readable
- [ ] T204 Verify links are distinguishable from normal text (color + underline or bold)

### Motion & Animation

- [ ] T205 Set prefers-reduced-motion in OS settings and verify animations are disabled
- [ ] T206 Verify essential animations still work (loading spinners, form feedback) even with reduced motion

**Checkpoint**: Accessibility validated - Lighthouse Accessibility score should be 100

---

## Phase 15: Performance Optimization (NON-NEGOTIABLE per Constitution)

**Purpose**: Meet performance budgets (FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90)

### Image Optimization

- [ ] T207 Optimize all images to WebP format with fallback PNG/JPEG in `public/images/`
- [ ] T208 Verify all images use next/image component with width/height to prevent CLS
- [ ] T209 Add priority loading to hero images (LCP optimization)
- [ ] T210 Add loading="lazy" to below-fold images
- [ ] T211 Create responsive srcset for large images (hero, features) with sizes prop based on breakpoints
- [ ] T212 Verify image sizes are appropriate (no 4000px images when 1200px max display width)

### JavaScript & CSS Optimization

- [ ] T213 Verify code splitting is working (check build output, each route should have separate chunk)
- [ ] T214 Analyze bundle size with next-bundle-analyzer (install and run `ANALYZE=true pnpm build`)
- [ ] T215 Verify JavaScript bundle is < 250 KB (parsed) for main chunk
- [ ] T216 Dynamic import heavy components (ROICalculator, Calendly, video players) to reduce initial bundle
- [ ] T217 Verify CSS is optimized (Tailwind purges unused classes in production)

### Fonts & Resources

- [ ] T218 Verify Inter font is loaded with font-display: swap (next/font does this automatically)
- [ ] T219 Preload critical fonts in layout.tsx if needed
- [ ] T220 Load third-party scripts asynchronously (GA4 with strategy="afterInteractive", Calendly with defer)

### Service Worker & Caching

- [ ] T221 Install next-pwa: `pnpm add next-pwa`
- [ ] T222 Configure Service Worker in next.config.js for caching static assets
- [ ] T223 Test repeat visits load faster with cached assets

### Lighthouse Audits

- [ ] T224 Run Lighthouse audit on Homepage (desktop): verify Performance > 90, Accessibility 100, SEO > 95
- [ ] T225 Run Lighthouse audit on Homepage (mobile): verify Performance > 85
- [ ] T226 Run Lighthouse on all main pages (Features, Pricing, Trial, Demo) and verify scores
- [ ] T227 Fix any Lighthouse warnings or suggestions
- [ ] T228 Test performance on 3G network (Chrome DevTools throttling): verify TTI < 5s on 3G, skeleton loaders appear
- [ ] T229 Verify Cumulative Layout Shift < 0.1 (check for layout shifts during load, add aspect-ratio to images/videos)

**Checkpoint**: Performance optimized - Constitution performance targets met

---

## Phase 16: CI/CD Pipeline

**Purpose**: Automated quality gates on every PR

- [ ] T230 Create GitHub Actions workflow in `.github/workflows/ci.yml`
- [ ] T231 Add CI steps: Checkout → Setup Node → Install pnpm → Install dependencies
- [ ] T232 Add lint step: `pnpm lint` (must pass, no errors)
- [ ] T233 Add type-check step: `pnpm type-check` (tsc --noEmit must pass)
- [ ] T234 Add test step: `pnpm test` (Vitest unit tests must pass)
- [ ] T235 Add build step: `pnpm build` (must succeed without errors)
- [ ] T236 Add Lighthouse CI step using @lhci/cli
- [ ] T237 Configure Lighthouse budgets in `.lighthouserc.json` (performance > 90, accessibility 100, SEO > 95)
- [ ] T238 Setup branch protection rules on main branch (require CI passing, require 1 approval)
- [ ] T239 Connect Vercel for automatic preview deployments on PRs
- [ ] T240 Verify CI runs on sample PR and all checks pass

**Checkpoint**: CI/CD operational

---

## Phase 17: Legal Pages & Final Polish

**Purpose**: Production-ready legal compliance and content polish

### Legal Pages

- [ ] T241 [P] Create Mentions Légales page in `src/app/mentions-legales/page.tsx`
- [ ] T242 [P] Create Privacy Policy page in `src/app/confidentialite/page.tsx` with GDPR compliance details
- [ ] T243 [P] Create CGV/CGU page in `src/app/cgv/page.tsx` if applicable
- [ ] T244 Update Footer to link to all legal pages

### Content & Copy Review

- [ ] T245 Review all page copy for consistency, tone, and French grammar
- [ ] T246 Verify all CTAs use consistent wording across pages
- [ ] T247 Verify all reassurance messages are present ("Sans carte bancaire", "Support en français", etc.)
- [ ] T248 Proofread case studies for typos and formatting
- [ ] T249 Verify all metrics and numbers are accurate and match brief

### Cross-Browser Testing

- [ ] T250 Test on Chrome (latest) - Windows and macOS
- [ ] T251 Test on Firefox (latest)
- [ ] T252 Test on Safari (latest) - macOS and iOS
- [ ] T253 Test on Edge (latest)
- [ ] T254 Verify IE11 shows unsupported browser banner (if detecting old browsers)

### Final QA

- [ ] T255 Click through all navigation links - verify no 404s
- [ ] T256 Submit all forms end-to-end - verify emails received and Airtable records created
- [ ] T257 Test honeypot spam protection - fill hidden field and verify silent rejection + GA4 spam_detected event
- [ ] T258 Test data deletion workflow end-to-end - submit email, click confirmation link, verify data anonymized
- [ ] T259 Verify all external links open in new tab with rel="noopener noreferrer"
- [ ] T260 Test custom 404 page (visit non-existent URL)
- [ ] T261 Verify all images load correctly (no broken images)
- [ ] T262 Test video embeds (YouTube loads and plays)
- [ ] T263 Test Calendly widget on demo page
- [ ] T264 Verify ROI calculator calculations are correct
- [ ] T265 Run full Lighthouse audit suite on all pages
- [ ] T266 Run quickstart.md validation - ensure all setup steps work for new developer

**Checkpoint**: Site production-ready

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-11)**:
  - All depend on Foundational phase completion
  - US1, US5, US6 (P1) can proceed in parallel after Foundation (MVP)
  - US2, US3, US8 (P2) can start after Foundation, parallel to P1 stories
  - US4, US7 (P3) can start after Foundation, parallel to others
  - **Recommended**: Complete P1 stories first for MVP, then P2, then P3
- **GDPR Portal (Phase 12)**: Depends on Foundational (forms infrastructure)
- **SEO (Phase 13)**: Can start after pages exist (run in parallel with late-stage user stories)
- **Accessibility (Phase 14)**: After all pages/components complete
- **Performance (Phase 15)**: After all pages/components complete
- **CI/CD (Phase 16)**: Can start early and iterate
- **Legal & Polish (Phase 17)**: After all features complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories - can start immediately after Foundation
- **User Story 2 (P2)**: No dependencies on other stories - uses static features data
- **User Story 3 (P2)**: No dependencies on other stories - pricing is standalone
- **User Story 4 (P3)**: Soft dependency on US1 (navigation), can link to case studies from US7
- **User Story 5 (P1)**: No dependencies on other stories - demo form is standalone
- **User Story 6 (P1)**: No dependencies on other stories - trial form is standalone
- **User Story 7 (P3)**: No dependencies on other stories - static MDX content
- **User Story 8 (P2)**: Depends on having some pages to test mobile on (can start after US1 complete)

### Critical Path for MVP

```
Setup (Phase 1)
  → Foundational (Phase 2)
    → US1 Homepage (Phase 3)
      → US5 Demo Form (Phase 4)
        → US6 Trial Form (Phase 5)
          → SEO basics
            → Accessibility check
              → Performance check
                → Deploy MVP
```

**MVP Delivery Timeline**: Phases 1-5 + basic SEO/A11Y/Perf checks = **3-4 weeks**

---

## Parallel Opportunities

### Within Foundational Phase (Phase 2)

All UI primitive components can be built in parallel:

- T020-T025: Button, Input, Select, Textarea, Card, LoadingSpinner (6 parallel tasks)
- T026-T030: Validation schemas and type definitions (5 parallel tasks)

### Within User Story 1 (Phase 3)

Homepage sections can be built in parallel:

- T037: HeroSection
- T038: ProblemSolution
- T039: features.ts data
- T042: testimonials.ts data

Then assemble in page.tsx (T048)

### Across User Stories (P1 MVP)

Once Foundation complete (Phase 2), these can ALL run in parallel:

- **Developer A**: US1 Homepage (T037-T052)
- **Developer B**: US5 Demo Form (T053-T070)
- **Developer C**: US6 Trial Form (T071-T085)

All three stories are independent and can be developed simultaneously.

### Within User Story 4 (Phase 9)

All 5 industry pages can be built in parallel:

- T122: Health page
- T123: Finance page
- T124: Technology page
- T125: Manufacturing page
- T126: Government page

### Within User Story 7 (Phase 10)

All 3 case studies can be written in parallel:

- T130: Manufacturing case study MDX
- T131: Health case study MDX
- T132: Tech case study MDX
- T133: Hero images

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup (T001-T016) - **2-3 days**
2. Complete Phase 2: Foundational (T017-T036) - **3-5 days**
3. Complete Phase 3: US1 Homepage (T037-T052) - **1 week**
4. Complete Phase 4: US5 Demo Form (T053-T070) - **3-4 days**
5. Complete Phase 5: US6 Trial Form (T071-T085) - **3-4 days**
6. Run basic SEO/A11Y/Perf checks - **2-3 days**
7. **DEPLOY MVP** for user testing

**Total MVP**: ~3-4 weeks with 1-2 developers

### Incremental Delivery

1. Deploy MVP (US1 + US5 + US6) → Validate conversions
2. Add US2 Features + US3 Pricing → Richer content
3. Add US8 Mobile optimization → Optimize for 60% traffic
4. Add US4 Solutions + US7 Case Studies → Sector targeting
5. Add GDPR portal → Compliance
6. Final polish & optimization → Production launch

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy (3 developers)

**Week 1-2: Setup + Foundation together**

- All devs: Pair on T001-T036

**Week 3-4: MVP parallel development**

- Dev A: US1 Homepage (T037-T052)
- Dev B: US5 Demo Form (T053-T070)
- Dev C: US6 Trial Form (T071-T085)

**Week 5-6: Secondary features parallel**

- Dev A: US2 Features (T086-T094)
- Dev B: US3 Pricing (T095-T106)
- Dev C: US8 Mobile (T107-T119)

**Week 7-8: Content + Quality**

- Dev A: US4 Solutions (T120-T129)
- Dev B: US7 Case Studies (T130-T143)
- Dev C: SEO + A11Y + Perf (T168-T229)

**Week 9: Final polish**

- All devs: GDPR, CI/CD, Legal, QA (T154-T266)

---

## Task Summary

**Total Tasks**: 266

**Breakdown by Phase**:

- Phase 1 (Setup): 16 tasks
- Phase 2 (Foundational): 20 tasks
- Phase 3 (US1 Homepage - P1): 16 tasks
- Phase 4 (US5 Demo - P1): 18 tasks
- Phase 5 (US6 Trial - P1): 15 tasks
- Phase 6 (US2 Features - P2): 9 tasks
- Phase 7 (US3 Pricing - P2): 12 tasks
- Phase 8 (US8 Mobile - P2): 13 tasks
- Phase 9 (US4 Solutions - P3): 10 tasks
- Phase 10 (US7 Case Studies - P3): 14 tasks
- Phase 11 (About Page): 10 tasks
- Phase 12 (GDPR Portal): 14 tasks
- Phase 13 (SEO): 17 tasks
- Phase 14 (Accessibility): 21 tasks
- Phase 15 (Performance): 23 tasks
- Phase 16 (CI/CD): 11 tasks
- Phase 17 (Legal & Polish): 27 tasks

**Parallel Opportunities**: 85+ tasks marked [P] can run simultaneously (different files, no dependencies)

**MVP Scope** (P1 only): Phases 1-5 = **85 tasks** = 3-4 weeks

**Full Feature-Complete**: All phases = **266 tasks** = 6-9 weeks (with 1-2 developers)

---

## Notes

- [P] tasks can run in parallel (different files)
- [Story] labels map tasks to user stories for traceability
- Each user story is independently completable and testable
- Stop at any checkpoint to validate story independently before proceeding
- Commit after each task or logical group
- MVP can be deployed after Phase 5 (T085)
- Constitution validation happens in Phases 14-15 (Accessibility & Performance)

---

**Status**: Task list ready for execution - Begin with Phase 1 (Setup)
