# Tasks: Modern Visual Homepage Transformation

**Input**: Design documents from `/specs/002-transform-the-gamr/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Organization**: Tasks are grouped by user story (US1-US4) to enable independent implementation and testing of each story.

**Testing Approach**: This feature includes comprehensive testing tasks for accessibility, performance, and cross-browser compatibility as specified in the constitution requirements.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, or SETUP/FOUNDATION)
- Include exact file paths in descriptions

## Path Conventions

Single project structure: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and design system foundation  
**Estimated Time**: 4-6 hours

- [ ] **T001** [SETUP] Verify all dependencies installed: Next.js 14.2+, React 18.3+, Tailwind CSS 3.4+, Lucide React, clsx, tailwind-merge
- [ ] **T002** [P] [SETUP] Verify logo image exists at `public/images/logo.jpg` and optimize (WebP/AVIF, max 800px width)
- [ ] **T003** [P] [SETUP] Add Inter and Poppins fonts to `src/app/layout.tsx` using next/font with display:swap and preload

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented  
**Estimated Time**: 8-10 hours

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Design System & Type Definitions

- [ ] **T004** [P] [FOUNDATION] Create TypeScript types in `src/types/design-system.ts` (ColorToken, ColorCategory enum)
- [ ] **T005** [P] [FOUNDATION] Create animation types in `src/types/animations.ts` (AnimationConfiguration, AnimationType enum, EasingFunction type, ReducedMotionConfig)
- [ ] **T006** [FOUNDATION] Create design tokens in `src/lib/design-tokens.ts` (export colorTokens array with all 7 colors from spec: Primary #0A2463, Secondary #247BA0, Accent #FF6B35, Success #2EC4B6, Warning #FFB703, Background #F8F9FA, Text #212529)
- [ ] **T007** [FOUNDATION] Update Tailwind config `tailwind.config.ts` to extend with custom colors from design tokens, add backdropBlur variants, custom animation durations

### Core Animation Infrastructure

- [ ] **T008** [P] [FOUNDATION] Implement easing functions in `src/lib/animations.ts` (linear, easeOutQuad, easeOutCubic, easeOutQuart, easeOutElastic, easeOutBack)
- [ ] **T009** [P] [FOUNDATION] Implement animation utility functions in `src/lib/animations.ts` (interpolate, clamp, staggerDelay, getAnimationDuration, formatNumber, debounce, getTransformValue)
- [ ] **T010** [FOUNDATION] Create custom CSS keyframes in `src/styles/animations.css` (@keyframes float for logo, @keyframes fadeIn, @keyframes slideInLeft, @keyframes slideInRight, @keyframes pulse)
- [ ] **T011** [FOUNDATION] Update `src/app/globals.css` with color CSS variables, gradient classes, animation utility classes, and prefers-reduced-motion global styles

### Essential React Hooks

- [ ] **T012** [P] [FOUNDATION] Create `src/hooks/useReducedMotion.ts` hook (detects prefers-reduced-motion media query, returns boolean, SSR-safe)
- [ ] **T013** [P] [FOUNDATION] Create `src/hooks/useIntersectionObserver.ts` hook (accepts ref and options {threshold, rootMargin, triggerOnce}, returns isIntersecting boolean)

**Checkpoint ✅**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - First Impression for Enterprise Decision Maker (Priority: P1) 🎯 MVP

**Goal**: Create a visually stunning hero section that conveys premium quality within 3 seconds of page load with split-screen layout, animated logo, gradient background, and prominent CTAs.

**Independent Test**: Load homepage on desktop (≥1024px) and mobile (<768px). Verify hero displays with logo, headline, CTAs within 1.5s FCP. Check split-screen on desktop, stacked on mobile. Confirm logo animation loops smoothly.

**Estimated Time**: 10-12 hours

### Hero Section Implementation

- [ ] **T014** [US1] Create `src/hooks/useParallax.ts` hook (accepts speed, direction, disableOnMobile options; uses requestAnimationFrame; respects reduced motion; returns ref)
- [ ] **T015** [US1] Enhance `src/components/home/HeroSection.tsx` with split-screen layout (Flexbox/Grid: content left, logo right on ≥1024px; stacked on <768px)
- [ ] **T016** [US1] Add gradient background to HeroSection (linear-gradient from #0A2463 to #247BA0, 135deg angle)
- [ ] **T017** [US1] Integrate logo with Next Image in HeroSection (`priority={true}`, `width={800}`, `height={800}`, `quality={90}`, `placeholder="blur"`)
- [ ] **T018** [US1] Apply floating animation to logo (animate-float class, will-change: transform, conditional on !prefersReducedMotion)
- [ ] **T019** [US1] Apply parallax effect to hero background using useParallax hook (speed: 0.3, direction: 'up')
- [ ] **T020** [US1] Add headline with gradient text animation (background-clip: text, animated gradient background-position)
- [ ] **T021** [US1] Add two distinct CTA buttons in HeroSection (primary: "Essai Gratuit", secondary: "Demander une Démo")

### Enhanced CTA Buttons

- [ ] **T022** [US1] Enhance `src/components/shared/CTAButton.tsx` with pulse animation on hover (CSS animation: pulse 2s infinite on hover state)
- [ ] **T023** [US1] Add ripple effect to CTAButton on click (create ripple span element dynamically, animate scale and opacity, remove after animation)
- [ ] **T024** [US1] Add scale micro-interaction to CTAButton (transform: scale(1.05) on hover, transition: 200ms)
- [ ] **T025** [US1] Ensure CTAButton supports href prop to render as <a> tag for links, forward ref for focus management

### Scroll-Triggered Fade-ins

- [ ] **T026** [P] [US1] Add fade-in animation to `src/components/home/ProblemSolution.tsx` using useIntersectionObserver (threshold: 0.2, triggerOnce: true, transition opacity and transform)
- [ ] **T027** [P] [US1] Add fade-in animation to `src/components/home/SocialProof.tsx` using useIntersectionObserver
- [ ] **T028** [P] [US1] Add fade-in animation to `src/components/home/DemoVideo.tsx` using useIntersectionObserver

### Animated Statistics

- [ ] **T029** [US1] Create `src/hooks/useAnimatedCounter.ts` hook (accepts start, end, duration, easing, decimals; uses requestAnimationFrame; respects reduced motion; returns current count number)
- [ ] **T030** [US1] Create `src/components/shared/AnimatedCounter.tsx` component (uses useAnimatedCounter, accepts all counter props, includes ARIA live region for screen readers, forwards ref)
- [ ] **T031** [US1] Enhance `src/components/home/SocialProof.tsx` to integrate AnimatedCounter for statistics (trigger animation with useIntersectionObserver, format with prefix/suffix)

**Checkpoint ✅**: User Story 1 complete - Hero section is visually stunning, statistics animate on scroll, all fade-ins work

---

## Phase 4: User Story 3 - Mobile and Accessibility Experience (Priority: P1)

**Goal**: Ensure all visual enhancements work smoothly on mobile devices and with assistive technology, respecting reduced motion preferences and providing full keyboard navigation.

**Independent Test**: Test on iOS Safari and Chrome Android. Enable "Reduce Motion" in OS settings. Navigate with keyboard only (Tab, Enter, Escape). Test with NVDA/JAWS screen reader. Verify all content accessible, focus indicators visible, animations disabled/simplified.

**Estimated Time**: 8-10 hours

### Responsive Design

- [ ] **T032** [US3] Add responsive breakpoints to HeroSection (stack layout <768px, split-screen ≥1024px, fluid spacing between)
- [ ] **T033** [US3] Ensure all interactive elements have min 44x44px touch targets (buttons, cards, navigation links - add padding if needed)
- [ ] **T034** [P] [US3] Test and adjust font sizes for mobile readability (verify no zoom required, use clamp() for fluid typography)
- [ ] **T035** [P] [US3] Verify all animations work on touch devices (disable hover-only effects on touch, provide touch alternatives)

### Accessibility Implementation

- [ ] **T036** [P] [US3] Add ARIA labels to AnimatedCounter (aria-live="polite", aria-atomic="true", sr-only text with full context)
- [ ] **T037** [P] [US3] Add ARIA labels to all interactive cards (role="article", aria-labelledby for titles, tabIndex={0} for keyboard access)
- [ ] **T038** [US3] Implement skip-to-content link in Header (visually hidden until focused, jumps to main content)
- [ ] **T039** [US3] Ensure all images have descriptive alt text (logo, feature icons, testimonial avatars - review and update)
- [ ] **T040** [US3] Add keyboard event handlers to interactive cards (Enter/Space to activate, add onKeyDown handlers)

### Reduced Motion Support

- [ ] **T041** [US3] Verify useReducedMotion hook is used in all animated components (HeroSection, CTAButton, FeatureCard, TestimonialCard, AnimatedCounter)
- [ ] **T042** [US3] Test reduced motion CSS (animations should be instant: animation-duration: 0.01ms, transition-duration: 0.01ms)
- [ ] **T043** [US3] Ensure content hierarchy maintained with reduced motion (opacity changes instant, no transforms, content still accessible)

### Focus Management

- [ ] **T044** [P] [US3] Style focus indicators globally in globals.css (2px outline, high contrast color #FF6B35, offset 2px, visible on all interactive elements)
- [ ] **T045** [P] [US3] Test focus visibility on all interactive elements (buttons, links, cards, form inputs - manual keyboard test)

**Checkpoint ✅**: User Story 3 complete - Mobile experience excellent, accessibility WCAG 2.1 AA compliant, reduced motion respected

---

## Phase 5: User Story 2 - Interactive Engagement with Features (Priority: P2)

**Goal**: Create visually engaging feature presentations with hover effects, 3D tilt, glassmorphism, and interactive elements that increase engagement time and demonstrate platform capabilities.

**Independent Test**: Hover over feature cards (verify lift and shadow). Interact with security dashboard preview (animated charts). Scroll to testimonials (slide-in animation). Hover over buttons (pulse effect). Check performance (60fps maintained).

**Estimated Time**: 12-15 hours

### 3D Tilt & Glassmorphism

- [ ] **T046** [US2] Create `src/hooks/use3DTilt.ts` hook (tracks mouse position, calculates rotateX/rotateY, applies perspective transform, resets on mouse leave, respects reduced motion, disables on touch)
- [ ] **T047** [US2] Enhance `src/components/ui/Card.tsx` with glassmorphism variant (background: rgba with 0.1 alpha, backdrop-filter: blur(10px), border: 1px rgba, @supports fallback for older browsers)
- [ ] **T048** [US2] Enhance `src/components/shared/FeatureCard.tsx` with 3D tilt effect using use3DTilt hook (maxTilt: 8deg, scale: 1.03, speed: 400ms, conditional on !prefersReducedMotion && !isMobile)
- [ ] **T049** [US2] Add hover lift effect to FeatureCard (transform: translateY(-8px), box-shadow increase, transition: 300ms ease-out)
- [ ] **T050** [US2] Apply glassmorphism styling to feature cards in `src/components/home/FeaturesGrid.tsx`

### Interactive Feature Grid

- [ ] **T051** [US2] Update FeaturesGrid layout (responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop, gap-6)
- [ ] **T052** [P] [US2] Add hover animations to feature icons in FeatureCard (scale: 1.1, rotate: 5deg on hover, transition: 200ms)
- [ ] **T053** [P] [US2] Add gradient borders to key feature cards (border-image with gradient, or pseudo-element with gradient background)

### Security Dashboard Preview

- [ ] **T054** [US2] Transform `src/components/home/DemoVideo.tsx` into security index dashboard preview component
- [ ] **T055** [US2] Add animated progress bars to DemoVideo (use CSS animation or requestAnimationFrame, fill from 0 to target value when visible, duration: 1500ms, easing: ease-out-cubic)
- [ ] **T056** [US2] Add chart visualization to DemoVideo (can be CSS-based bar chart or simple progress indicators, trigger animation on scroll into view)
- [ ] **T057** [US2] Make dashboard preview interactive (hover states on chart elements, tooltip on hover optional)

### Testimonial Animations

- [ ] **T058** [US2] Enhance `src/components/shared/TestimonialCard.tsx` with slide-in animation (slideInLeft/slideInRight based on animationDirection prop, trigger with useIntersectionObserver)
- [ ] **T059** [US2] Add staggered animation delays to testimonials (use staggerDelay utility: index \* 150ms, apply as animation-delay)
- [ ] **T060** [US2] Ensure testimonial cards work on mobile (simplify animation, reduce transform distance, test touch interactions)

**Checkpoint ✅**: User Story 2 complete - Feature cards engaging with 3D effects, dashboard animated, testimonials slide in smoothly

---

## Phase 6: User Story 4 - Visual Brand Consistency and Premium Feel (Priority: P2)

**Goal**: Apply consistent visual language throughout the page with modern design patterns, glassmorphism navigation, gradient effects, and typography that reinforces premium brand perception.

**Independent Test**: Visual audit across all sections. Verify color palette consistency. Check navigation blur effect on scroll. Validate typography hierarchy. Compare against premium SaaS benchmarks (Notion, Linear, Stripe).

**Estimated Time**: 8-10 hours

### Navigation Enhancement

- [ ] **T061** [US4] Create `src/hooks/useScrollBlur.ts` hook (tracks scroll position, returns isScrolled boolean when > threshold, uses passive scroll listener, debounced)
- [ ] **T062** [US4] Enhance `src/components/layout/Header.tsx` with sticky positioning (sticky top-0, z-50)
- [ ] **T063** [US4] Add blur effect to Header when scrolled (backdrop-filter: blur(10px), bg-white/80, shadow-lg, transition when isScrolled from useScrollBlur)
- [ ] **T064** [US4] Ensure Header works on mobile (hamburger menu if needed, logo sizing, CTA button visibility)

### Typography & Visual Consistency

- [ ] **T065** [P] [US4] Apply typography hierarchy across all components (h1-h6 with Poppins, body with Inter, font-weights: 300/400/600/700, proper line-heights)
- [ ] **T066** [P] [US4] Implement responsive font sizes using Tailwind clamp or custom scale (mobile: base, tablet: +10%, desktop: +20%, fluid scaling)
- [ ] **T067** [US4] Add gradient text effects to section headlines (background: linear-gradient, background-clip: text, -webkit-text-fill-color: transparent)

### Visual Enhancements

- [ ] **T068** [P] [US4] Add subtle gradient overlays to hero background images if any (linear-gradient overlay with rgba, blend-mode: multiply or overlay)
- [ ] **T069** [P] [US4] Ensure all sections use defined background colors appropriately (alternate between F8F9FA and white, proper spacing, visual separation)
- [ ] **T070** [US4] Add smooth scroll behavior globally in globals.css (html { scroll-behavior: smooth }, respect reduced motion)

### Mobile Floating Action Button

- [ ] **T071** [US4] Create `src/components/shared/FloatingActionButton.tsx` component (fixed positioning, bottom-right, 60x60px circle, visible only on mobile <768px)
- [ ] **T072** [US4] Add "Essai Gratuit" text and icon to FAB (Plus icon from Lucide, white text on primary color background, pulse animation)
- [ ] **T073** [US4] Hide FAB on scroll up, show on scroll down (use scroll direction detection, smooth show/hide transition)
- [ ] **T074** [US4] Integrate FAB in `src/components/home/FinalCTA.tsx` or page layout

**Checkpoint ✅**: User Story 4 complete - Brand consistency across all sections, navigation polished, FAB working on mobile

---

## Phase 7: Enhanced UI Components (Cross-Story)

**Purpose**: Enhance base UI components used across multiple user stories  
**Estimated Time**: 4-6 hours

### Button Enhancements

- [ ] **T075** [P] Add glassmorphism variant to `src/components/ui/Button.tsx` (variant="glass", semi-transparent background, backdrop blur)
- [ ] **T076** [P] Add micro-interactions to Button (ripple effect on click, scale on hover, loading spinner state)

### Card Enhancements

- [ ] **T077** [P] Add glassmorphism variant to `src/components/ui/Card.tsx` (variant="glass")
- [ ] **T078** [P] Add hover lift option to Card (hoverLift prop, translateY transform, shadow increase)
- [ ] **T079** [P] Add 3D tilt option to Card (tilt3D prop, integrates use3DTilt hook)

### Loading States

- [ ] **T080** [P] Verify LoadingSpinner component in `src/components/ui/LoadingSpinner.tsx` works and is styled appropriately
- [ ] **T081** [P] Add skeleton loading animations for image loading states (create skeleton class in animations.css with shimmer effect)

---

## Phase 8: Performance Optimization

**Purpose**: Ensure 60fps animations, fast load times, and optimal bundle size  
**Estimated Time**: 6-8 hours

### Image Optimization

- [ ] **T082** [P] Verify all images use Next Image component with proper width/height (prevents CLS)
- [ ] **T083** [P] Verify logo is optimized (WebP, AVIF formats, appropriate quality 85-90)
- [ ] **T084** [P] Add lazy loading to below-fold images (Next Image lazy by default, verify loading="lazy")

### Animation Performance

- [ ] **T085** [P] Audit all animations use GPU-accelerated properties only (transform, opacity - no width/height/top/left)
- [ ] **T086** [P] Add will-change sparingly to actively animating elements (add on animation start, remove on end)
- [ ] **T087** [P] Debounce scroll handlers in parallax and blur hooks (16ms minimum, use existing debounce utility)
- [ ] **T088** Test animation frame rate with Chrome DevTools Performance tab (record scrolling, verify 60fps, identify jank)

### Bundle Size

- [ ] **T089** Build production bundle and analyze size (pnpm run build, check .next/static/chunks)
- [ ] **T090** Verify animation JavaScript bundle < 50KB gzipped (measure hooks + lib/animations.ts combined)
- [ ] **T091** Optimize imports for tree-shaking (ensure named imports from lucide-react, avoid default imports)

### Code Splitting

- [ ] **T092** Consider dynamic imports for heavy features if needed (e.g., chart components in DemoVideo if using library)

---

## Phase 9: Testing & Quality Assurance

**Purpose**: Constitution compliance verification before deployment (NON-NEGOTIABLE)  
**Estimated Time**: 10-12 hours

### Unit Tests (Vitest)

- [ ] **T093** [P] Write unit test for `useReducedMotion` hook in `src/hooks/useReducedMotion.test.ts` (mock matchMedia, test returns false/true based on media query)
- [ ] **T094** [P] Write unit test for `useIntersectionObserver` hook in `src/hooks/useIntersectionObserver.test.ts` (mock IntersectionObserver, test callback triggers)
- [ ] **T095** [P] Write unit test for `useAnimatedCounter` hook in `src/hooks/useAnimatedCounter.test.ts` (test counts from start to end, respects reduced motion)
- [ ] **T096** [P] Write unit test for easing functions in `src/lib/animations.test.ts` (verify mathematical correctness for easeOutQuad, easeOutCubic)
- [ ] **T097** [P] Write unit test for utility functions in `src/lib/animations.test.ts` (interpolate, clamp, formatNumber, staggerDelay)

### Component Tests

- [ ] **T098** [P] Write component test for AnimatedCounter in `src/components/shared/AnimatedCounter.test.tsx` (renders, props applied, ARIA labels present)
- [ ] **T099** [P] Write component test for CTAButton in `src/components/shared/CTAButton.test.tsx` (renders variants, onClick fires, href renders as link)
- [ ] **T100** [P] Write component test for FeatureCard in `src/components/shared/FeatureCard.test.tsx` (renders content, glassmorphism class applied, tilt disabled on reduced motion)

### E2E Tests (Playwright)

- [ ] **T101** Write E2E test in `tests/e2e/homepage-hero.spec.ts` (navigate to homepage, verify hero visible within 1.5s, check split-screen layout, verify logo animating)
- [ ] **T102** Write E2E test in `tests/e2e/homepage-animations.spec.ts` (scroll to sections, verify fade-ins trigger, check counters animate, verify testimonials slide in)
- [ ] **T103** Write E2E test in `tests/e2e/accessibility-keyboard.spec.ts` (Tab through all interactive elements, verify focus indicators visible, Enter activates buttons)
- [ ] **T104** Write E2E test in `tests/e2e/accessibility-reduced-motion.spec.ts` (enable reduced motion via emulateMedia, verify animations instant/disabled, content still accessible)
- [ ] **T105** Write E2E test in `tests/e2e/mobile-responsive.spec.ts` (set mobile viewport, verify stacked layout, check touch targets ≥44px, FAB visible)

### Accessibility Testing (WCAG 2.1 AA)

- [ ] **T106** Run automated accessibility test with axe-core in Playwright (integrate @axe-core/playwright, run on homepage, assert no violations)
- [ ] **T107** Manual keyboard navigation testing (Tab through entire page, verify logical order, check focus indicators on all elements, test skip-to-content link)
- [ ] **T108** Screen reader testing with NVDA (Windows) or VoiceOver (Mac) (verify all sections announced, counters announced with ARIA live, images have alt text, logical reading order)
- [ ] **T109** Color contrast validation using WAVE or axe DevTools browser extension (all text meets 4.5:1 ratio for normal text, 3:1 for large text)
- [ ] **T110** Focus indicator visibility check (verify 2px outline, high contrast color, visible on all interactive elements)
- [ ] **T111** ARIA labels review (validate aria-labels on counters, cards, custom interactive elements, ensure descriptive)

### Performance Testing (Constitution Budgets)

- [ ] **T112** Run Lighthouse CI audit in headless mode (pnpm run lighthouse, verify FCP < 1.5s, TTI < 3s, CLS < 0.1)
- [ ] **T113** Verify Lighthouse Performance score > 90 (run multiple times, take average, address any warnings)
- [ ] **T114** Verify Lighthouse Accessibility score = 100 (must be perfect, fix any issues)
- [ ] **T115** Verify Lighthouse SEO score > 95 (check meta tags, structured data, alt text)
- [ ] **T116** Mobile performance testing on throttled 3G network (Chrome DevTools Network throttling, verify usable experience, critical content loads first)
- [ ] **T117** Test on mid-range Android device or simulator (verify 60fps animations, no jank, smooth scrolling)
- [ ] **T118** Bundle size analysis (verify total JavaScript < 2MB, animation bundle < 50KB, image assets optimized)

### Cross-Browser Testing

- [ ] **T119** Test on Chrome latest (desktop and mobile, verify all animations work, glassmorphism renders, performance good)
- [ ] **T120** Test on Firefox latest (desktop and mobile, check backdrop-filter support, verify animations)
- [ ] **T121** Test on Safari latest (desktop iOS, check -webkit prefixes, verify animations, test on actual iPhone/iPad if possible)
- [ ] **T122** Test on Edge latest (desktop, verify Chromium-based behavior similar to Chrome)
- [ ] **T123** Test fallback for older browsers (verify @supports fallback for backdrop-filter, check graceful degradation, ensure content accessible)

### Visual Regression Testing

- [ ] **T124** Set up Playwright screenshot tests (capture hero section, feature grid, testimonials on desktop and mobile)
- [ ] **T125** Run visual regression tests (compare screenshots against baseline, review differences, update baseline if intentional)

---

## Phase 10: SEO & Metadata

**Purpose**: SEO optimization and discoverability (Constitution requirement)  
**Estimated Time**: 4-5 hours

### Meta Tags & SEO

- [ ] **T126** [P] Update page metadata in `src/app/page.tsx` (title: "GAMR - Plateforme de Gestion et d'Analyse des Risques Métiers", description: 150-160 chars highlighting modern premium platform)
- [ ] **T127** [P] Add OpenGraph tags in `src/app/layout.tsx` or page.tsx (og:title, og:description, og:image with hero screenshot, og:url, og:type)
- [ ] **T128** [P] Add Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] **T129** Add JSON-LD structured data in `src/app/page.tsx` (Organization schema with name, url, logo, description; WebPage schema)
- [ ] **T130** Verify canonical URL set correctly in page metadata
- [ ] **T131** Generate sitemap.xml using next-sitemap (already installed, verify config in next-sitemap.config.js, run generation)
- [ ] **T132** Verify robots.txt configuration (allow all, include sitemap URL)

### SEO Validation

- [ ] **T133** Test with Google Rich Results Test (paste URL or HTML, verify structured data valid)
- [ ] **T134** Verify all images have descriptive alt text for search indexing (logo, icons, decorative images marked aria-hidden if appropriate)
- [ ] **T135** Check heading hierarchy (single H1 per page, logical H2-H6 structure, proper nesting)

---

## Phase 11: Polish & Final Integration

**Purpose**: Final refinements and documentation  
**Estimated Time**: 4-6 hours

- [ ] **T136** [P] Code cleanup and refactoring (remove console.logs, clean up unused imports, consistent formatting)
- [ ] **T137** [P] Add TypeScript documentation comments to custom hooks (JSDoc comments explaining params, returns, usage)
- [ ] **T138** [P] Add TypeScript documentation comments to utility functions (JSDoc for animations.ts, design-tokens.ts)
- [ ] **T139** Run full linting and type-check (pnpm run lint --fix, pnpm run type-check, fix any errors)
- [ ] **T140** Run Prettier formatting across all modified files (pnpm run format)
- [ ] **T141** Update `README.md` in project root if needed (document new features, link to spec docs)
- [ ] **T142** Create/update component documentation in Storybook if using (showcase all variants, states, props)
- [ ] **T143** Run final build test (pnpm run build, verify no errors, check bundle output)
- [ ] **T144** Manual smoke test on production build (pnpm run start, test all user stories end-to-end)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phases 3-6)**: All depend on Foundational completion
  - **US1 (Phase 3)**: Can start after Foundational ✅ Priority P1 - MVP
  - **US3 (Phase 4)**: Can start after Foundational ✅ Priority P1 - Should complete early
  - **US2 (Phase 5)**: Can start after Foundational - Priority P2
  - **US4 (Phase 6)**: Can start after Foundational - Priority P2
- **Components (Phase 7)**: Can proceed in parallel with user stories (supports all stories)
- **Performance (Phase 8)**: Best after all features implemented
- **Testing (Phase 9)**: Requires all features complete
- **SEO (Phase 10)**: Can start anytime, best after content finalized
- **Polish (Phase 11)**: Requires all features complete

### User Story Dependencies

- **US1 (P1)**: Independent - no dependencies on other stories ✅ MVP candidate
- **US3 (P1)**: Independent - but enhances US1 (accessibility for hero) ✅ Should complete early
- **US2 (P2)**: Independent - can work in parallel with US1/US3
- **US4 (P2)**: Independent - but benefits from US1 hero being complete (navigation context)

### Within Each Phase

- Foundational: Types → Design Tokens → Utilities → Hooks (sequential)
- User Stories: Hooks → Components → Integration (mostly sequential within story)
- Testing: Unit tests [P] → Integration tests → E2E tests (unit can be parallel)

### Parallel Opportunities

**Within Foundational Phase:**

- T004, T005 (different type files)
- T008, T009 (different utility groups)
- T012, T013 (different hook files)

**Across User Stories (if team capacity):**

- US1 (T014-T031) and US3 (T032-T045) can proceed in parallel (different concerns)
- US2 (T046-T060) and US4 (T061-T074) can proceed in parallel after US1/US3

**Within User Stories:**

- US1: T026, T027, T028 (different component files)
- US2: T052, T053 (styling tasks), T046 before T048 (tilt hook before usage)
- US3: T034, T035, T036, T037, T044, T045 (different files/concerns)
- US4: T065, T066, T068, T069 (different files)

**Testing Phase:**

- All unit tests (T093-T097) can run in parallel
- All component tests (T098-T100) can run in parallel
- Cross-browser tests (T119-T123) can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch all type definitions together:
Task T004: "Create TypeScript types in src/types/design-system.ts"
Task T005: "Create animation types in src/types/animations.ts"

# Launch animation utilities together:
Task T008: "Implement easing functions in src/lib/animations.ts"
Task T009: "Implement animation utility functions in src/lib/animations.ts"
# (Can be split into two files if needed: easing.ts and utilities.ts)

# Launch core hooks together:
Task T012: "Create src/hooks/useReducedMotion.ts"
Task T013: "Create src/hooks/useIntersectionObserver.ts"
```

---

## Parallel Example: Testing Phase

```bash
# Launch all unit tests together:
Task T093: "Test useReducedMotion hook"
Task T094: "Test useIntersectionObserver hook"
Task T095: "Test useAnimatedCounter hook"
Task T096: "Test easing functions"
Task T097: "Test utility functions"

# Launch all component tests together:
Task T098: "Test AnimatedCounter component"
Task T099: "Test CTAButton component"
Task T100: "Test FeatureCard component"

# Launch all browser tests together (if infrastructure supports):
Task T119: "Test on Chrome"
Task T120: "Test on Firefox"
Task T121: "Test on Safari"
Task T122: "Test on Edge"
```

---

## Implementation Strategy

### MVP First: P1 User Stories Only (Fastest Time to Value)

1. **Phase 1**: Setup (T001-T003) → ~4 hours
2. **Phase 2**: Foundational (T004-T013) → ~10 hours ⚠️ CRITICAL BLOCKER
3. **Phase 3**: User Story 1 - Hero & First Impression (T014-T031) → ~12 hours
4. **Phase 4**: User Story 3 - Mobile & Accessibility (T032-T045) → ~10 hours
5. **Phase 9**: Critical Testing (T106-T118 minimum) → ~8 hours
6. **Phase 11**: Polish (T139-T144) → ~4 hours

**MVP Total**: ~48 hours (6 days) - Delivers stunning hero with accessibility

**MVP Validation**:

- Hero section loads in < 1.5s ✅
- Split-screen on desktop, stacked on mobile ✅
- Logo animates smoothly ✅
- Statistics counter animates on scroll ✅
- Full keyboard navigation ✅
- Screen reader compatible ✅
- Lighthouse Performance > 90 ✅
- Lighthouse Accessibility = 100 ✅

**Deploy/Demo MVP** before continuing to P2 stories ✅

---

### Incremental Delivery: Add P2 Stories Sequentially

**After MVP, add User Story 2 (Interactive Engagement)**: 6. **Phase 5**: US2 - Interactive Features (T046-T060) → ~15 hours 7. **Testing**: Test US2 features (T101-T105 specific to interactions) → ~4 hours

**Checkpoint**: Deploy again with enhanced interactivity ✅

**Then add User Story 4 (Brand Consistency)**: 8. **Phase 6**: US4 - Visual Consistency (T061-T074) → ~10 hours 9. **Testing**: Visual regression (T124-T125) → ~2 hours

**Checkpoint**: Deploy again with full brand experience ✅

**Finally, complete remaining phases**: 10. **Phase 7**: Enhanced Components (T075-T081) → ~6 hours 11. **Phase 8**: Performance Optimization (T082-T092) → ~8 hours 12. **Phase 10**: SEO (T126-T135) → ~5 hours 13. **Phase 11**: Final Polish (T136-T144) → ~6 hours

**Full Feature Total**: ~70 hours (9 days)

---

### Parallel Team Strategy (Fastest Overall Completion)

With 2-3 developers:

**Week 1 (Together):**

- All: Phase 1 + Phase 2 (Setup + Foundation) → ~14 hours
- **Critical**: Foundation MUST complete before splitting ⚠️

**Week 2 (Parallel Work):**

- Developer A: Phase 3 (US1 - Hero) → ~12 hours
- Developer B: Phase 4 (US3 - Accessibility) → ~10 hours
- Developer C: Phase 7 (Enhanced Components) → ~6 hours, then help A or B

**Week 3 (Parallel Work):**

- Developer A: Phase 5 (US2 - Interactive) → ~15 hours
- Developer B: Phase 6 (US4 - Brand) → ~10 hours
- Developer C: Phase 8 (Performance) → ~8 hours

**Week 4 (Together):**

- All: Phase 9 (Testing) → ~12 hours
- All: Phase 10 (SEO) + Phase 11 (Polish) → ~10 hours

**Parallel Total**: ~3-4 weeks with 2-3 developers

---

## Task Summary

| Phase            | Task Range    | Count   | Est. Hours | Can Parallelize        |
| ---------------- | ------------- | ------- | ---------- | ---------------------- |
| 1 - Setup        | T001-T003     | 3       | 4-6        | Yes                    |
| 2 - Foundational | T004-T013     | 10      | 8-10       | Partially              |
| 3 - US1 (P1)     | T014-T031     | 18      | 10-12      | Partially              |
| 4 - US3 (P1)     | T032-T045     | 14      | 8-10       | Partially              |
| 5 - US2 (P2)     | T046-T060     | 15      | 12-15      | Partially              |
| 6 - US4 (P2)     | T061-T074     | 14      | 8-10       | Partially              |
| 7 - Components   | T075-T081     | 7       | 4-6        | Yes                    |
| 8 - Performance  | T082-T092     | 11      | 6-8        | Yes                    |
| 9 - Testing      | T093-T125     | 33      | 10-12      | Yes                    |
| 10 - SEO         | T126-T135     | 10      | 4-5        | Partially              |
| 11 - Polish      | T136-T144     | 9       | 4-6        | Yes                    |
| **TOTAL**        | **T001-T144** | **144** | **78-100** | **Many opportunities** |

### Tasks Per User Story

- **US1 (First Impression)**: 18 tasks → MVP core
- **US2 (Interactive Engagement)**: 15 tasks → Engagement boost
- **US3 (Accessibility)**: 14 tasks → Legal compliance
- **US4 (Brand Consistency)**: 14 tasks → Premium polish

### Parallel Tasks Identified

- **43 tasks** marked [P] can run in parallel within their phase
- **4 user stories** can proceed in parallel after Foundational phase
- **Testing phase**: 33 tasks, majority can run in parallel

### MVP Scope (P1 Stories Only)

- **Setup + Foundation**: 13 tasks (blocking)
- **US1 (Hero)**: 18 tasks
- **US3 (Accessibility)**: 14 tasks
- **Critical Testing**: ~12 tasks
- **MVP Total**: ~57 tasks (~48 hours)

---

## Notes

- [P] tasks = different files, no dependencies, safe to parallelize
- [Story] labels map tasks to user stories for traceability (US1, US2, US3, US4)
- Each user story is independently testable (per spec requirements)
- Foundation phase (T004-T013) is CRITICAL PATH - blocks all user stories
- Commit after each task or logical group (follow conventional commits)
- MVP delivery recommended at Phase 4 checkpoint (US1 + US3 complete)
- Full feature delivery at Phase 11 checkpoint (all phases complete)
- Estimated 78-100 hours total (matches plan.md estimate of 56-71 hours core + 22-29 hours testing/polish)

---

**Tasks Generated**: October 8, 2025  
**Total Tasks**: 144  
**Estimated Total Time**: 78-100 hours (10-13 days solo, 3-4 weeks with team)  
**MVP Tasks**: 57 (48 hours, 6 days)  
**Parallel Opportunities**: 43+ tasks marked [P], user stories can proceed in parallel

**Ready for implementation** ✅
