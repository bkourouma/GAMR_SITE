# Phase 0: Technical Research & Decisions

**Feature**: GAMR Marketing Website  
**Date**: 2025-10-08  
**Status**: Complete

## Overview

This document records technical research, decisions, and trade-offs made during the planning phase for the GAMR marketing site. All decisions align with constitution principles and clarifications from `/speckit.clarify`.

---

## Key Technical Decisions

### 1. Content Management Strategy

**Decision**: Static MDX files in repository (no CMS)

**Rationale**:

- Clarification explicitly removed blog and admin panel from scope
- Only 3 case studies needed for MVP (static content acceptable)
- MDX provides markdown convenience with React component flexibility
- Version control benefits (git history, PR reviews for content changes)
- Zero infrastructure cost (no CMS subscription/hosting)
- Perfect for developer-managed content workflow

**Alternatives Considered**:

- **Headless CMS** (Contentful, Sanity, Strapi): Rejected - adds complexity, cost, and requires non-technical editors we don't have
- **WordPress-style admin**: Rejected - clarification confirmed removal after initial consideration
- **Notion as CMS**: Rejected - API rate limits, sync complexity, real-time updates not critical

**Implementation**:

- MDX files in `/src/content/case-studies/`
- Frontmatter for metadata (title, industry, metrics, author)
- gray-matter for parsing, remark/rehype for rendering
- generateStaticParams for SSG build-time generation

---

### 2. Form Submission Handling

**Decision**: API Routes → Airtable + SendGrid

**Rationale**:

- Balances control (custom validation, honeypot) with simplicity (no database management)
- Airtable provides instant CRM-like interface for sales team to track leads
- SendGrid reliable for transactional emails (confirmation, deletion workflows)
- Easy to extend with webhooks for Slack/Teams notifications

**Alternatives Considered**:

- **Direct to Database** (PostgreSQL/Supabase): Rejected - overkill for marketing site, requires more infrastructure
- **Third-party forms** (Formspree, Netlify Forms): Rejected - less control over validation, honeypot, GDPR deletion
- **Client-side only**: Rejected - security risk, no server-side validation

**Implementation**:

- Next.js API Routes at `/app/api/trial-signup/route.ts`, `/demo-request/route.ts`, `/data-deletion/route.ts`
- Zod schemas for validation (email format, required fields, honeypot detection)
- Airtable base with tables: TrialSignups, DemoRequests, Contacts, DeletionRequests
- SendGrid templates for confirmation emails

---

### 3. Deployment Platform

**Decision**: Vercel

**Rationale**:

- Built by Next.js creators - optimal integration and zero-config
- Automatic preview deployments for every PR (stakeholder review)
- Excellent performance (Edge Network, automatic optimization)
- Built-in Lighthouse CI integration available
- Generous free tier, predictable pricing
- Best DX for TypeScript + Next.js

**Alternatives Considered**:

- **Netlify**: Good Next.js support but slightly slower builds, less Next.js-specific optimization
- **AWS Amplify**: More control, enterprise features, but steeper learning curve and slower deploys
- **Azure Static Web Apps**: Good for Azure ecosystems, but Vercel DX is superior

**Implementation**:

- Connect GitHub repository to Vercel
- Configure environment variables (SENDGRID_API_KEY, AIRTABLE_API_KEY, etc.)
- Set up branch protection to require Vercel preview + Lighthouse checks
- Custom domain configuration (gamr.com or equivalent)

---

### 4. Animation Strategy

**Decision**: CSS animations + Intersection Observer API

**Rationale**:

- Constitution mandates performance (Lighthouse > 90, bundle size <2MB)
- CSS animations are native, zero bundle impact
- Intersection Observer API is supported in all modern browsers
- Sufficient for scroll-triggered fade-ins, slide-ups, and micro-interactions
- Respects prefers-reduced-motion natively

**Alternatives Considered**:

- **Framer Motion**: Rejected - adds ~50KB to bundle, more than needed for simple scroll animations
- **GSAP**: Rejected - powerful but overkill, license cost for commercial use, learning curve
- **React Spring**: Rejected - physics-based animations not needed, bundle overhead

**Implementation**:

- Define keyframes in `/src/styles/animations.css`
- Use Intersection Observer hook (`useIntersectionObserver.ts`)
- Apply classes conditionally when elements enter viewport
- Disable animations if `prefers-reduced-motion: reduce` detected

---

### 5. Analytics & Error Tracking

**Decision**: Google Analytics 4 only (no Sentry)

**Rationale**:

- Clarification specified GA4 custom events for error tracking
- Consolidates conversion tracking + error monitoring in single platform
- No additional service cost or privacy implications
- Sufficient for marketing site (not mission-critical app requiring detailed stack traces)

**Trade-offs**:

- **Pro**: Simpler architecture, one fewer service to manage, no additional data privacy concerns
- **Con**: Less detailed error context than Sentry (no stack trace source maps, user sessions)
- **Mitigation**: Comprehensive error event parameters (error_type, page_path, user_action) provide enough context for most issues

**Implementation**:

- gtag.js via next/script with strategy="afterInteractive"
- Custom events: form_validation_failed, form_submission_failed, api_error, javascript_error, spam_detected
- Error boundary component to catch React errors and track via GA4
- window.onerror and window.onunhandledrejection for global error capture

---

### 6. Spam Protection

**Decision**: Honeypot fields only

**Rationale**:

- Clarification specified honeypot (no CAPTCHA/reCAPTCHA)
- Simplest approach with zero UX friction
- No external service dependencies
- Blocks 90%+ of basic automated bots (per success criteria SC-028)
- Acceptable <0.1% false positive risk

**Trade-offs**:

- **Pro**: Perfect UX (invisible to users), no privacy concerns, no external service
- **Con**: Won't stop sophisticated bots or human spam farms
- **Mitigation**: If spam becomes issue post-launch, can add rate limiting or upgrade to Cloudflare Turnstile

**Implementation**:

- Hidden field "website" in all forms (CSS: visibility: hidden)
- Positioned naturally in DOM between visible fields
- Server-side check: if honeypot filled → silent rejection (show success message, don't save data, log as spam_detected in GA4)

---

### 7. GDPR Data Deletion Workflow

**Decision**: Email-verified self-service deletion portal

**Rationale**:

- Clarification specified indefinite retention with deletion on request
- Self-service portal reduces support burden
- Email verification prevents malicious deletion of others' data
- 30-day deletion SLA aligns with GDPR requirements

**Implementation**:

- Page `/gerer-mes-donnees` with email input form
- POST `/api/data-deletion/route.ts` → sends confirmation email with signed token (24h expiry)
- User clicks link → validates token → marks data for deletion
- Automated job (cron or scheduled function) processes deletions within 30 days
- Soft delete (anonymization) vs hard delete for audit trail preservation

---

### 8. Typography & Fonts

**Decision**: Inter font family via next/font/google

**Rationale**:

- Inter is open-source, excellent readability, modern aesthetic (matches Notion/Linear/Stripe inspiration)
- next/font automatically optimizes font loading (self-hosting, font-display: swap, preloading)
- Variable font reduces file size vs loading multiple weights
- Widely used in modern SaaS products (brand alignment)

**Alternatives Considered**:

- **Poppins**: Slightly more playful, but Inter is more professional for enterprise security product
- **System fonts**: Most performant but less distinctive branding

**Implementation**:

```typescript
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
```

---

### 9. Image Optimization

**Decision**: next/image with WebP format + responsive srcset

**Rationale**:

- next/image automatic optimization aligns with performance goals
- WebP format reduces file size by 25-35% vs JPEG/PNG
- Responsive srcset serves appropriately sized images per device
- Lazy loading built-in (below-fold images deferred)
- Automatic blur placeholder for better perceived performance

**Implementation**:

- All images through `<Image>` component with width/height specified (prevent CLS)
- WebP with PNG/JPEG fallback for older browsers
- Priority loading for hero images (LCP optimization)
- Sizes prop for responsive images based on Tailwind breakpoints

---

### 10. State Management

**Decision**: React Context API only (no Redux/Zustand)

**Rationale**:

- Marketing site has minimal global state needs (mobile menu open/closed, maybe theme)
- Avoids additional dependencies and learning curve
- Constitution principle: start simple (YAGNI)

**Alternatives Considered**:

- **Zustand**: Lightweight, but unnecessary for our limited state needs
- **Redux**: Massive overkill for marketing site

**Implementation**:

- Single context for mobile menu state if needed
- Most state is local to components (forms, accordions)

---

## Technology Stack Summary

| Category   | Technology                 | Version | Justification                                   |
| ---------- | -------------------------- | ------- | ----------------------------------------------- |
| Framework  | Next.js                    | 14+     | SSG, performance, SEO, constitution mandate     |
| Language   | TypeScript                 | 5.3+    | Constitution mandate (strict mode)              |
| Styling    | Tailwind CSS               | 3.4+    | Mobile-first, utility-first, rapid iteration    |
| Forms      | react-hook-form + zod      | Latest  | Type-safe validation, minimal re-renders        |
| Content    | MDX (gray-matter + remark) | Latest  | Static case studies, no CMS per clarification   |
| SEO        | next-seo + next-sitemap    | Latest  | Meta tags, OpenGraph, sitemap automation        |
| Analytics  | Google Analytics 4         | Latest  | Conversion + error tracking per clarification   |
| Email      | SendGrid or AWS SES        | Latest  | Transactional emails (confirmations, deletions) |
| Storage    | Airtable or Supabase       | Latest  | Form submissions, CRM integration               |
| Testing    | Vitest + Playwright        | Latest  | Unit/integration + e2e                          |
| Deployment | Vercel                     | Latest  | Best Next.js DX, preview deploys, Edge Network  |

---

## Performance Budget

Based on constitution and spec requirements:

| Metric                   | Target                        | Measurement                 |
| ------------------------ | ----------------------------- | --------------------------- |
| First Contentful Paint   | < 1.5s                        | Lighthouse, Core Web Vitals |
| Time to Interactive      | < 3s                          | Lighthouse, Core Web Vitals |
| Cumulative Layout Shift  | < 0.1                         | Lighthouse, Core Web Vitals |
| Lighthouse Performance   | > 90 (desktop), > 85 (mobile) | Lighthouse CI               |
| Lighthouse Accessibility | 100                           | Lighthouse CI               |
| Lighthouse SEO           | > 95                          | Lighthouse CI               |
| Page Weight (homepage)   | < 2 MB                        | Chrome DevTools Network tab |
| JavaScript Bundle        | < 250 KB (parsed)             | next-bundle-analyzer        |
| Images (homepage)        | < 1.5 MB total                | next/image optimization     |
| Form Response Time       | < 2s                          | API route timing            |

**Enforcement**: Lighthouse CI blocks PRs if any metric regresses beyond thresholds.

---

## Security Considerations

### Spam Protection

- Honeypot fields in all forms (invisible to humans, attractive to bots)
- Silent rejection (fake success message to avoid teaching bots)
- GA4 spam_detected events for monitoring effectiveness

### GDPR Compliance

- Data deletion portal with email verification
- 30-day deletion SLA
- Privacy policy transparency on data retention
- No third-party trackers without consent

### Form Validation

- Server-side validation (never trust client)
- Email domain validation (block personal emails for enterprise trial)
- Zod schemas ensure type safety
- Rate limiting consideration for future (not MVP, monitor spam levels first)

---

## Risk Analysis

| Risk                                    | Impact | Mitigation                                                                  |
| --------------------------------------- | ------ | --------------------------------------------------------------------------- |
| Honeypot insufficient for spam          | Medium | Monitor GA4 spam_detected events; upgrade to Turnstile if >10% spam         |
| GA4 error tracking lacks detail         | Low    | Comprehensive event parameters; can add Sentry later if needed              |
| Static case studies limit scalability   | Low    | MDX easy to manage for <10 studies; migrate to CMS when >20                 |
| Form API downtime loses leads           | High   | Use reliable services (Airtable 99.9% SLA); email fallback in error message |
| Performance regression as content grows | Medium | Lighthouse CI enforces budgets; mandatory review if scores drop             |

---

## Open Questions for Phase 1

None - all critical decisions resolved through clarification session.

---

**Status**: Research complete - Ready for Phase 1 (Design & Contracts)
