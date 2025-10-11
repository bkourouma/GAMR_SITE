# Implementation Plan: GAMR Marketing Website

**Branch**: `001-site-marketing-gamr` | **Date**: 2025-10-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-site-marketing-gamr/spec.md`

## Summary

Build a production-ready marketing website for GAMR (Gestion et Analyse Méthodique des Risques) - an AI-powered enterprise risk management platform. The site targets CISOs, Risk Managers, Security Analysts, and IT Directors across Technology, Healthcare, Finance, Manufacturing, and Government sectors.

**Primary Requirements**:

- 7 pages: Homepage, Features (7 capabilities), Industry Solutions (5 sectors), Pricing (Cloud vs OnPremise), Case Studies (3 static), About, Free Trial, Request Demo
- 2 critical conversion flows: 30-day free trial signup (3-5% target) and personalized demo request (2-3% target)
- Real-Time Security Index (0-100) as primary differentiator with live calculation and historical tracking
- Mobile-first responsive design (60% mobile traffic) with sticky CTAs and touch-optimized interfaces
- Full constitution compliance: Performance (FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90), WCAG 2.1 AA accessibility, production SEO (OpenGraph, JSON-LD, sitemap/robots)
- GDPR-compliant data deletion workflow and honeypot spam protection
- GA4-based error tracking without external monitoring services

**Technical Approach**:
Modern JAMstack architecture with Next.js 14+ App Router for static site generation (SSG). TypeScript strict mode throughout. Tailwind CSS utility-first styling following Notion/Linear/Stripe design inspiration. Static case studies (MDX files, no CMS). Form submissions via API routes with Airtable storage and email notifications (SendGrid/AWS SES). Calendly integration for demo bookings. Google Analytics 4 for conversion + error tracking. Vercel/Netlify deployment with automatic PR previews and Lighthouse CI in GitHub Actions.

**Scope Clarifications from `/speckit.clarify`**:

- **GDPR**: Data retention indefinite until user deletion request (30-day deletion SLA)
- **Monitoring**: GA4 custom events only (no Sentry/external service)
- **Content**: Blog removed - static case studies only (no CMS/admin panel)
- **Spam**: Honeypot fields (no CAPTCHA/reCAPTCHA)

---

## Technical Context

**Language/Version**: TypeScript 5.3+ with strict mode enabled

**Primary Dependencies**:

- Next.js 14+ (App Router, React Server Components, Image Optimization)
- React 18+ (functional components, hooks, Suspense)
- Tailwind CSS 3.4+ (utility-first styling, custom config)
- next-seo / next-sitemap (SEO meta tags, sitemaps, robots.txt)
- zod (form validation schemas)
- react-hook-form (form state management)
- @axe-core/react (accessibility testing in development)
- gray-matter + remark/rehype (MDX processing for case studies)

**Storage**:

- Case studies: MDX files in `/src/content/case-studies/`
- Form submissions: POST to API routes → Airtable (CRM integration) or PostgreSQL/Supabase

**Testing**:

- Vitest (unit tests for components, utilities, hooks)
- React Testing Library (component interaction tests)
- Playwright (e2e tests for critical paths: homepage load, form submissions, navigation)
- Lighthouse CI (automated performance/accessibility/SEO audits on every PR)
- axe-core (accessibility linting in CI)

**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge last 2 versions), iOS 14+, Android 10+, responsive 320px-2560px

**Project Type**: Marketing Site / Frontend Application (Next.js/React SSG)

**Performance Goals**:

- First Contentful Paint (FCP) < 1.5s on 4G (4 Mbps)
- Time to Interactive (TTI) < 3s on 4G
- Cumulative Layout Shift (CLS) < 0.1
- Lighthouse scores: Performance > 90 (desktop) / > 85 (mobile), Accessibility 100, SEO > 95
- Page weight < 2 MB (homepage critical path)
- Form submission response < 2s

**Constraints**:

- Must support offline viewing for repeat visits (Service Worker caching)
- Must work with JavaScript disabled for core content (progressive enhancement)
- Must support prefers-reduced-motion for accessibility
- Must maintain performance on 3G networks (skeleton loaders, lazy loading)
- Must be crawlable by search engines (SSG, proper meta tags, structured data)
- No external error monitoring service (constitution decision: simplicity over complexity)
- No CMS (static content only for MVP)

**Scale/Scope**:

- 7 pages + 3 case study detail pages + legal pages
- ~15-20 reusable components
- 3 case studies (initial), expandable
- Expected traffic: 5k-10k monthly visitors initially, scalable to 100k+
- Form submissions: 100-500/month expected
- French only for MVP, i18n-ready structure

---

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Verify compliance with `.specify/memory/constitution.md`:

- [x] **Performance Excellence**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90
  - ✅ Next.js Image Optimization (WebP, responsive srcset)
  - ✅ Code splitting per route (App Router automatic)
  - ✅ Lazy loading for images and below-fold content
  - ✅ Lighthouse CI in GitHub Actions blocking PRs on regression
  - ✅ Service Worker for asset caching

- [x] **Accessibility First**: WCAG 2.1 AA compliance planned and testable
  - ✅ Semantic HTML structure (nav, main, section, article, footer)
  - ✅ Keyboard navigation fully supported (focus management in modals, menus)
  - ✅ Screen reader testing with NVDA/JAWS/VoiceOver
  - ✅ Color contrast 4.5:1 minimum (automated testing with axe-core)
  - ✅ Focus indicators visible (2px outline or custom ring)
  - ✅ ARIA labels where semantic HTML insufficient
  - ✅ prefers-reduced-motion support

- [x] **SEO & Discoverability**: OpenGraph, JSON-LD, sitemap/robots implementation
  - ✅ next-seo for meta tags (unique title/description per page)
  - ✅ OpenGraph tags (og:title, og:description, og:image 1200x630, og:url)
  - ✅ JSON-LD structured data (Organization, WebSite, Article, Product schemas)
  - ✅ next-sitemap for sitemap.xml generation (automatic from routes)
  - ✅ robots.txt configured (allow all public pages, reference sitemap)
  - ✅ Canonical URLs on all pages

- [x] **Mobile-First Design**: Mobile viewport priority, responsive strategy defined
  - ✅ Tailwind mobile-first breakpoints (default mobile, sm:, md:, lg:, xl:)
  - ✅ Touch targets minimum 44x44px
  - ✅ Hamburger menu for mobile navigation
  - ✅ Sticky CTA button on mobile (bottom fixed)
  - ✅ Responsive images with next/image
  - ✅ Tested on physical devices strategy defined

- [x] **Type Safety**: TypeScript strict mode, all types defined
  - ✅ tsconfig.json with strict: true, noUncheckedIndexedAccess: true
  - ✅ All props typed
  - ✅ API responses typed (zod schemas for validation)
  - ✅ No 'any' types without justification
  - ✅ Utility types for reusable patterns

- [x] **Code Quality**: ESLint/Prettier configured, Conventional Commits enforced
  - ✅ ESLint with next/core-web-vitals + typescript-eslint + a11y rules
  - ✅ Prettier with consistent formatting
  - ✅ Husky pre-commit hooks (lint-staged)
  - ✅ Commitlint for Conventional Commits
  - ✅ Branch naming convention enforced

- [x] **CI Quality Gates**: All checks (lint, type, test, build, Lighthouse) configured
  - ✅ GitHub Actions workflow on every PR
  - ✅ Steps: Lint → Type check → Test → Build → Lighthouse CI → Preview deploy
  - ✅ Branch protection requires all checks passing
  - ✅ Automatic preview deployments

**Complexity Tracking**: None - all constitution principles satisfied without violations.

---

## Project Structure

### Documentation (this feature)

```
specs/001-site-marketing-gamr/
├── spec.md              # Feature specification (✅ COMPLETE)
├── plan.md              # This file - Implementation plan (IN PROGRESS)
├── research.md          # Technical research & decisions (Phase 0 - TO BE CREATED)
├── data-model.md        # Content models & data structures (Phase 1 - TO BE CREATED)
├── quickstart.md        # Development setup guide (Phase 1 - TO BE CREATED)
├── contracts/           # API contracts & integrations (Phase 1 - TO BE CREATED)
│   ├── form-api.md      # Form submission endpoints
│   ├── case-studies-schema.md  # Case study MDX frontmatter schema
│   └── analytics.md     # GA4 tracking events specification
└── checklists/
    └── requirements.md  # Spec quality checklist (✅ COMPLETE)
```

### Source Code (repository root)

```
gamr-site/
├── src/
│   ├── app/                        # Next.js 14 App Router
│   │   ├── layout.tsx              # Root layout (header, footer, providers)
│   │   ├── page.tsx                # Homepage (/)
│   │   ├── fonctionnalites/        # Features page
│   │   │   └── page.tsx
│   │   ├── solutions/              # Industry solutions
│   │   │   ├── page.tsx            # Solutions hub
│   │   │   ├── sante/page.tsx
│   │   │   ├── finance/page.tsx
│   │   │   ├── technologie/page.tsx
│   │   │   ├── industrie/page.tsx
│   │   │   └── gouvernement/page.tsx
│   │   ├── tarifs/                 # Pricing page
│   │   │   └── page.tsx
│   │   ├── etudes-de-cas/          # Case studies
│   │   │   ├── page.tsx            # Listing
│   │   │   └── [slug]/page.tsx     # Detail pages (SSG from MDX)
│   │   ├── a-propos/               # About page
│   │   │   └── page.tsx
│   │   ├── essai-gratuit/          # Free trial page
│   │   │   └── page.tsx
│   │   ├── demander-demo/          # Request demo page
│   │   │   └── page.tsx
│   │   ├── gerer-mes-donnees/      # Data deletion portal (GDPR)
│   │   │   └── page.tsx
│   │   ├── api/                    # API Routes
│   │   │   ├── trial-signup/route.ts
│   │   │   ├── demo-request/route.ts
│   │   │   ├── contact/route.ts
│   │   │   └── data-deletion/route.ts
│   │   ├── globals.css             # Global styles + Tailwind imports
│   │   └── not-found.tsx           # Custom 404 page
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # Base UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── StickyMobileCTA.tsx
│   │   ├── home/                   # Homepage components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProblemSolution.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── DemoVideo.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── features/               # Features page components
│   │   │   ├── FeatureTabs.tsx
│   │   │   ├── FeatureDetail.tsx
│   │   │   └── SecurityIndexShowcase.tsx
│   │   ├── pricing/                # Pricing components
│   │   │   ├── PricingComparison.tsx
│   │   │   ├── ROICalculator.tsx
│   │   │   └── PricingFAQ.tsx
│   │   ├── forms/                  # Form components
│   │   │   ├── TrialSignupForm.tsx
│   │   │   ├── DemoRequestForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── DataDeletionForm.tsx
│   │   │   └── FormField.tsx
│   │   └── shared/                 # Shared components
│   │       ├── TestimonialCard.tsx
│   │       ├── CaseStudyCard.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── CTAButton.tsx
│   │       ├── TrustBadges.tsx
│   │       └── Calendly.tsx
│   │
│   ├── lib/                        # Utilities and helpers
│   │   ├── utils.ts                # General utilities (cn classNames helper)
│   │   ├── validations.ts          # Zod schemas for forms
│   │   ├── api.ts                  # API client functions
│   │   ├── analytics.ts            # GA4 tracking helpers
│   │   ├── seo.ts                  # SEO meta generation helpers
│   │   ├── mdx.ts                  # MDX processing utilities
│   │   └── constants.ts            # App constants (site config, URLs)
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useForm.ts              # Form state management wrapper
│   │   ├── useMediaQuery.ts        # Responsive breakpoint detection
│   │   ├── useScrollProgress.ts    # Scroll position tracking
│   │   └── useIntersectionObserver.ts
│   │
│   ├── types/                      # Shared TypeScript types
│   │   ├── forms.ts                # Form data types
│   │   ├── content.ts              # Case study content types
│   │   ├── api.ts                  # API request/response types
│   │   └── index.ts                # Export all types
│   │
│   ├── styles/                     # Additional styles
│   │   └── animations.css          # Custom animation keyframes
│   │
│   └── content/                    # Static content
│       └── case-studies/           # MDX case studies
│           ├── audit-usine-production.mdx
│           ├── conformite-hospitaliere.mdx
│           └── startup-tech-indice-securite.mdx
│
├── public/                         # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── features/
│   │   ├── testimonials/
│   │   ├── certifications/
│   │   └── og-images/
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── robots.txt
│   └── sitemap.xml
│
├── tests/                          # Test files
│   ├── unit/
│   │   ├── components/
│   │   └── lib/
│   ├── integration/
│   │   ├── homepage.test.tsx
│   │   ├── form-submission.test.tsx
│   │   └── navigation.test.tsx
│   └── e2e/
│       ├── homepage.spec.ts
│       ├── trial-signup.spec.ts
│       ├── demo-request.spec.ts
│       └── mobile-navigation.spec.ts
│
├── .github/workflows/
│   └── ci.yml                      # Main CI pipeline
│
├── .husky/                         # Git hooks
│   ├── pre-commit
│   └── commit-msg
│
├── docs/brief/
│   └── MARKETING_SITE_BRIEF.md
│
├── .specify/memory/
│   └── constitution.md
│
├── .env.local.example
├── .env.local (gitignored)
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── commitlint.config.js
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

**Structure Decision**: Selected Marketing Site / Frontend Application (Next.js/React SSG)

**Rationale**:

- Pure frontend with API routes (no separate backend app)
- Next.js App Router provides optimal SEO (SSG) and performance
- Static case studies in MDX (no CMS complexity per clarification)
- Clear separation: app/ (routes), components/ (UI), lib/ (logic), types/ (contracts)

---

## Complexity Tracking

_No violations - Constitution Check passed completely._

---

## Next Steps

This plan is ready for Phase 0 (Research) and Phase 1 (Design) execution:

**Phase 0 Deliverables** (TO BE CREATED):

- `research.md`: Technical decisions, dependency justifications, alternatives considered

**Phase 1 Deliverables** (TO BE CREATED):

- `data-model.md`: Content models for case studies, form submissions, pages
- `contracts/form-api.md`: API endpoint specifications for trial/demo/contact/deletion
- `contracts/case-studies-schema.md`: MDX frontmatter schema for case studies
- `contracts/analytics.md`: GA4 custom event specifications (errors, conversions, spam)
- `quickstart.md`: Development environment setup guide

**Phase 2**: Task generation via `/speckit.tasks` (separate command, not included in `/speckit.plan`)

---

**Status**: Plan complete - Ready for Phase 0 research and Phase 1 design artifact generation
