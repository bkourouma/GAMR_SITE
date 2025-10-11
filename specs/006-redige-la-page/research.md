# Research & Design Patterns: Page À Propos

**Feature**: 006-redige-la-page  
**Date**: October 9, 2025  
**Status**: Complete ✅

## Executive Summary

Research analysis of existing GAMR marketing site patterns to inform About page implementation. All technical unknowns resolved. No clarifications needed - clear path forward using established component architecture, data patterns, and SEO structure.

## 1. Component Architecture Patterns

### Decision: Follow Established Page Structure Pattern

**Research Finding**: Analyzed existing pages (`fonctionnalites`, `solutions`, `tarifs`) and found consistent architecture:

**Pattern Observed** (from `src/app/fonctionnalites/page.tsx`):

```typescript
// Page structure:
// 1. Import feature-specific components
// 2. Export metadata object (SEO-001 to SEO-007)
// 3. Default export function that composes sections in <main>
// 4. Sections organized top-to-bottom matching user flow

export const metadata: Metadata = { /* SEO config */ };

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <ContentSection1 />
      <ContentSection2 />
      {/* ... */}
      <CTASection />
    </main>
  );
}
```

**Decision for About Page**:

- Create `src/app/a-propos/page.tsx` following exact same pattern
- Compose sections: AboutHero → CompanyStory → TeamSection → ValuesSection → AchievementsSection → AboutCTA
- Each section in separate component file under `src/components/about/`

**Rationale**: Consistency with existing codebase. Zero learning curve for developers. Proven pattern that works for responsive layout and SEO.

**Alternatives Considered**:

- ❌ Monolithic single-file page: Rejected due to maintainability concerns (would be 500+ lines)
- ❌ Different section organization: Rejected to maintain consistency across site

---

## 2. Hero Section Design

### Decision: Adapt Existing HeroSection Pattern with About-Specific Content

**Research Finding**: Analyzed `src/components/home/HeroSection.tsx`:

- Uses split-screen layout (content left, visual right) on desktop (`lg:grid-cols-2`)
- Mobile stacks vertically (default grid behavior)
- Gradient background (`bg-gradient-hero` class) with parallax effect
- Includes decorative elements (geometric shapes) for depth
- CTAs follow pattern: Primary CTA (orange) + Secondary CTA (outline white)

**Pattern Elements**:

```typescript
// Core structure
<section className="relative pt-8 pb-8 md:pt-12 md:pb-12">
  <div className="absolute inset-0 bg-gradient-hero -z-10" /> // Background
  <div className="container mx-auto px-4 py-8 md:py-12">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="text-center lg:text-left space-y-8">
        <h1>...</h1>
        <p>...</p>
        <div className="flex flex-col sm:flex-row gap-4">CTAs</div>
      </div>
      <div>Visual Element</div>
    </div>
  </div>
</section>
```

**Decision for About Hero**:

- Reuse layout structure (split-screen, gradient background)
- Replace right column visual: Instead of animated logo, use team photo or mission illustration
- Headline: "Notre mission : Simplifier la gestion des associations sportives"
- Subheadline: Brief mission statement (50-100 words)
- CTA: Primary "Demander une Démo" + Secondary "Voir nos Solutions"

**Rationale**: Visual consistency across site. Users already familiar with this hero pattern. Proven mobile responsiveness.

---

## 3. Content Data Management

### Decision: TypeScript Data Files with Zod Validation

**Research Finding**: Existing content stored in typed data files:

- `src/lib/features-data.ts`: Array of feature objects with type safety
- `src/lib/stats.ts`: Array of stat objects with structured format
- Pattern: `export const DATA_NAME = [{ ...objects }] as const satisfies Type;`

**Example Pattern** (from `features-data.ts`):

```typescript
export const FEATURES_DATA = {
  main: [
    {
      key: 'feature-id',
      title: 'Feature Title',
      description: 'Description text',
      icon: 'IconName',
      order: 1,
      category: 'main' as const,
    },
  ],
} as const satisfies FeaturesCollection;
```

**Decision for About Page**:

Create `src/lib/about-data.ts` with four data structures:

```typescript
// 1. Company info (mission, history)
export const COMPANY_INFO = {
  mission: {
    headline: string,
    description: string,
    foundedYear: number,
  },
  story: {
    sections: Array<{ title, content, year? }>
  },
} as const;

// 2. Team members
export const TEAM_MEMBERS = [
  {
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    bio: string, // 50-100 words
    imageUrl: string,
    linkedIn?: string,
    twitter?: string,
  },
] as const;

// 3. Company values
export const COMPANY_VALUES = [
  {
    id: string,
    name: string,
    description: string, // 50-100 words
    icon: string,
    order: number,
  },
] as const;

// 4. Achievement stats
export const ABOUT_STATS = [
  {
    id: string,
    value: string, // e.g., "150+", "5 ans"
    label: string,
    description?: string,
  },
] as const;
```

**Validation Strategy**: Add Zod schemas in data file for runtime validation:

```typescript
import { z } from 'zod';

const TeamMemberSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(50).max(500), // Word count check
  imageUrl: z.string().url(),
  linkedIn: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

// Validate at runtime (dev mode only)
if (process.env.NODE_ENV === 'development') {
  TEAM_MEMBERS.forEach((member) => TeamMemberSchema.parse(member));
}
```

**Rationale**:

- Consistent with existing patterns
- Type safety at compile time + runtime validation
- Easy to update content without touching components
- Can export as JSON for future CMS integration

**Alternatives Considered**:

- ❌ MDX files: Rejected due to overkill for structured data (better for long-form blog content)
- ❌ JSON files: Rejected due to lack of TypeScript type safety
- ❌ Database/CMS: Rejected for MVP (content unlikely to change frequently)

---

## 4. Image Optimization Strategy

### Decision: Next.js Image Component with WebP/AVIF + Lazy Loading

**Research Finding**: Project already configured for optimal image handling:

From `next.config.js`:

```javascript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

Existing usage pattern (from `HeroSection.tsx`):

```typescript
<Image
  src="/images/logo.jpg"
  alt="Descriptive alt text"
  width={800}
  height={800}
  priority={false} // or true for above-fold
  quality={90}
  className="w-full h-full object-contain"
/>
```

**Decision for About Page Images**:

1. **Team Photos**:
   - Store in: `/public/images/team/`
   - Naming: `firstname-lastname.jpg` (e.g., `john-doe.jpg`)
   - Source dimensions: 800x800px (1:1 aspect ratio for consistency)
   - Optimization: Let Next.js auto-convert to WebP/AVIF
   - Loading: `loading="lazy"` for all team photos (below fold)
   - Quality: `quality={85}` (balance between file size and clarity)

2. **Team Photo Preparation**:

   ```typescript
   // In TeamMemberCard.tsx
   <Image
     src={`/images/team/${member.imageUrl}`}
     alt={`${member.firstName} ${member.lastName} - ${member.role}`}
     width={400}
     height={400}
     loading="lazy"
     quality={85}
     className="w-full h-full object-cover rounded-full"
   />
   ```

3. **Hero Image** (if using team group photo):
   - Store in: `/public/images/about/`
   - Dimensions: 1200x800px (3:2 landscape)
   - Priority: `priority={true}` (above fold in hero)
   - Quality: `quality={90}` (hero is high-visibility)

**Performance Target**: < 50KB per team photo after optimization

**Rationale**:

- Next.js Image component handles responsive sizes automatically
- WebP/AVIF reduce file size by 30-50% vs JPEG
- Lazy loading defers below-fold images
- Proper alt text satisfies A11Y-002

**Alternatives Considered**:

- ❌ Manual responsive images with `<picture>`: Rejected (Next.js does this better)
- ❌ External image CDN: Rejected (unnecessary complexity for static site)

---

## 5. Team Section Layout

### Decision: CSS Grid with Responsive Columns

**Research Finding**: Examined grid patterns across existing components. Standard pattern:

- Mobile: 1 column (`grid-cols-1`)
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3-4 columns (`lg:grid-cols-3` or `lg:grid-cols-4`)

**Decision**:

```typescript
// TeamSection.tsx structure
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Notre Équipe
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {TEAM_MEMBERS.map(member => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </div>
</section>
```

**Card Design** (TeamMemberCard.tsx):

- Circular photo on top (400x400px, rounded-full)
- Name (text-xl font-bold)
- Role (text-sm text-gray-600)
- Bio (text-sm text-gray-700, line-clamp-4 with expand button)
- Social links (LinkedIn, Twitter icons) if available

**Accessibility Considerations**:

- Keyboard navigation: All cards focusable
- Proper heading hierarchy: h2 for section, h3 for names
- Alt text: "{firstName} {lastName} - {role}"

**Rationale**: Proven responsive pattern. Clean visual hierarchy. Scales well for 3-12 team members.

---

## 6. Values Section Design

### Decision: Icon + Text Cards in 4-Column Grid

**Research Finding**: Similar to team section but lighter weight content (no photos).

**Decision**:

```typescript
// ValuesSection.tsx
<section className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Nos Valeurs
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {COMPANY_VALUES.map(value => (
        <ValueCard key={value.id} value={value} />
      ))}
    </div>
  </div>
</section>
```

**Card Design** (ValueCard.tsx):

- Icon on top (Lucide React icon, 48x48px)
- Value name (text-lg font-semibold)
- Description (text-sm text-gray-600)
- Hover effect: Subtle scale and shadow

**Icon Strategy**: Use Lucide React icons (already in project dependencies per existing usage):

- Example values → icon mapping:
  - "Innovation" → `Lightbulb`
  - "Excellence" → `Award`
  - "Collaboration" → `Users`
  - "Intégrité" → `Shield`
  - "Passion Sport" → `Heart`

**Rationale**: Lightweight, fast-loading. Icons provide visual anchors without heavy images. Consistent with modern design trends.

---

## 7. Achievements & Social Proof

### Decision: Reuse Existing Stats Pattern + Add Client Logos

**Research Finding**: `src/lib/stats.ts` defines stats structure. Pattern can be reused.

**Implementation**:

1. **Stats Display** - Reuse pattern:

```typescript
// In AchievementsSection.tsx
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {ABOUT_STATS.map(stat => (
    <div key={stat.id} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary-600">
        <AnimatedCounter value={stat.value} />
      </div>
      <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
    </div>
  ))}
</div>
```

2. **Client Logos Section** - Reuse PartnersSection pattern:
   - Examine `src/components/shared/PartnersSection.tsx`
   - Adapt for client logos with heading "Ils nous font confiance"
   - Logos in `/public/images/partenaires/` (already exists)

**Stats to Include** (example):

- "5+ ans d'expérience"
- "150+ associations clientes"
- "10,000+ licenciés gérés"
- "98% satisfaction client"

**Rationale**: Consistency with homepage. AnimatedCounter provides visual interest. Proven social proof pattern.

---

## 8. SEO Implementation

### Decision: Follow Existing Metadata Pattern

**Research Finding**: Analyzed `src/app/fonctionnalites/page.tsx` metadata export:

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Brand Name',
  description: 'Meta description 150-160 chars',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GAMR',
  },
  alternates: {
    canonical: '/page-path',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

**Decision for About Page**:

```typescript
// In src/app/a-propos/page.tsx
export const metadata: Metadata = {
  title: 'À Propos de GAMR - Notre Mission et Notre Équipe',
  description:
    "Découvrez l'équipe passionnée derrière GAMR, notre mission de simplifier la gestion des associations sportives, et nos valeurs d'innovation et d'excellence.",
  keywords: [
    'À propos GAMR',
    'équipe GAMR',
    'mission GAMR',
    'gestion associations sportives',
    'plateforme sport',
    'qui sommes-nous',
  ],
  openGraph: {
    title: 'À Propos de GAMR - Notre Mission et Notre Équipe',
    description:
      "Rencontrez l'équipe GAMR et découvrez notre mission d'innovation dans la gestion des associations sportives.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GAMR',
    images: [
      {
        url: '/images/about/team-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Équipe GAMR',
      },
    ],
  },
  alternates: {
    canonical: '/a-propos',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

**JSON-LD Schema** (SEO-004 requirement):

```typescript
// Add to page.tsx after imports
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GAMR',
  description: 'Plateforme de gestion des associations sportives',
  url: 'https://gamr.fr',
  logo: 'https://gamr.fr/images/logo.jpg',
  foundingDate: '2019', // Update with actual date
  founders: TEAM_MEMBERS.filter(m => m.role.includes('Fondateur')).map(m => ({
    '@type': 'Person',
    name: `${m.firstName} ${m.lastName}`,
  })),
  sameAs: [
    'https://www.linkedin.com/company/gamr',
    'https://twitter.com/gamr',
    // Add other social profiles
  ],
};

// In page component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

**Rationale**: SEO best practices. Rich snippets in search results. Consistent with existing site SEO patterns.

---

## 9. Accessibility Implementation

### Decision: WCAG 2.1 AA Compliance Checklist

**Requirements from spec** (A11Y-001 to A11Y-007):

1. **A11Y-001: Keyboard Navigation**
   - ✅ All `<Link>` and `<Button>` components keyboard accessible by default (React)
   - Action: Ensure no `onClick` on non-interactive elements
   - Test: Tab through page, verify all CTAs reachable

2. **A11Y-002: Alt Text**
   - ✅ All `<Image>` components require alt prop (TypeScript enforces)
   - Pattern: `alt="{firstName} {lastName} - {role}"` for team photos
   - Pattern: `alt="Icône {valueName}"` for value icons

3. **A11Y-003: Color Contrast**
   - Existing design system already meets 4.5:1 minimum
   - Verify with Chrome DevTools Lighthouse
   - Focus areas: Gray text on white background

4. **A11Y-004: Focus Indicators**
   - Tailwind default focus rings enabled
   - Add custom if needed: `focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`

5. **A11Y-005: Heading Hierarchy**

   ```typescript
   <h1>Page Title (Hero)</h1>
     <h2>Notre Mission</h2>
     <h2>Notre Équipe</h2>
       <h3>{Member Name}</h3>
     <h2>Nos Valeurs</h2>
     <h2>Nos Réalisations</h2>
   ```

6. **A11Y-006: Zoom 200%**
   - Responsive design with relative units (rem, %) inherently supports zoom
   - Test at 200% zoom in browser

7. **A11Y-007: Screen Reader Stats**
   - Use semantic HTML: `<span aria-label="500 associations clientes">500+</span>`
   - AnimatedCounter should output accessible text

**Testing Strategy**:

- Automated: Lighthouse accessibility score > 95
- Manual: NVDA/JAWS screen reader testing
- Keyboard: Complete tab navigation test

**Rationale**: Legal requirement. Better UX for all users. Automated testing catches most issues.

---

## 10. Performance Budget

### Decision: Lighthouse CI Targets + Manual Optimizations

**Targets** (from PERF-001 to PERF-006):

- FCP < 1.5s ✅
- TTI < 3s ✅
- CLS < 0.1 ✅
- Lighthouse Performance > 90 ✅
- Images lazy-loaded ✅
- Full page load < 5s on 3G ✅

**Optimization Strategies**:

1. **Images**:
   - WebP/AVIF format (handled by Next.js)
   - Lazy loading all team photos
   - Proper sizing (don't load 2000px image for 400px display)
   - Target: < 50KB per team photo

2. **Code Splitting**:
   - Next.js automatically code-splits per page
   - Use dynamic imports for heavy components if needed:
     ```typescript
     const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
       loading: () => <Skeleton />,
     });
     ```

3. **Font Loading**:
   - Use Next.js font optimization (next/font)
   - Preload critical fonts

4. **Third-Party Scripts**:
   - No third-party scripts needed for About page
   - If analytics, use Next.js Script component with strategy="lazyOnload"

**Monitoring**:

- Lighthouse CI in GitHub Actions
- Performance budget in `.lighthouserc.json`
- Fail CI if regression > 5 points

**Rationale**: Performance is constitutional requirement. Mobile users on slow connections. Better performance = better conversions.

---

## 11. Testing Strategy

### Decision: E2E with Playwright + Manual Accessibility Testing

**Test Coverage**:

1. **E2E Tests** (`tests/e2e/about.spec.ts`):

   ```typescript
   test.describe('About Page', () => {
     test('displays all sections', async ({ page }) => {
       await page.goto('/a-propos');
       await expect(page.locator('h1')).toContainText('mission');
       await expect(page.locator('text=Notre Équipe')).toBeVisible();
       await expect(page.locator('text=Nos Valeurs')).toBeVisible();
     });

     test('team members render correctly', async ({ page }) => {
       await page.goto('/a-propos');
       const teamCards = page.locator('[data-testid="team-member-card"]');
       await expect(teamCards).toHaveCount(TEAM_MEMBERS.length);
     });

     test('CTA buttons work', async ({ page }) => {
       await page.goto('/a-propos');
       await page.click('text=Demander une Démo');
       await expect(page).toHaveURL('/demander-demo');
     });

     test('mobile responsive', async ({ page }) => {
       await page.setViewportSize({ width: 375, height: 667 });
       await page.goto('/a-propos');
       // Verify mobile layout
     });
   });
   ```

2. **Accessibility Tests**:
   - Lighthouse accessibility audit in CI
   - Manual screen reader testing (NVDA on Windows, VoiceOver on Mac)
   - Keyboard navigation test

3. **Visual Regression** (optional):
   - Playwright screenshots
   - Compare against baseline

**Coverage Targets**:

- E2E: 100% of user stories (P1-P3)
- Accessibility: WCAG 2.1 AA compliance
- Performance: Lighthouse scores in budget

**Rationale**: E2E tests catch integration issues. Playwright fast and reliable. Manual a11y testing catches nuanced issues automation misses.

---

## 12. Navigation Integration

### Decision: Update Header Component

**Finding**: Header already includes "À Propos" link at line 64-69 in `src/components/layout/Header.tsx`:

```typescript
<Link
  href="/a-propos"
  className="relative text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 group"
>
  À Propos
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
</Link>
```

**Action Required**: ✅ **NONE** - Navigation link already exists

**Additional Updates**:

- Footer: Verify "À Propos" link exists (likely already there)
- Sitemap: Add `/a-propos` to sitemap.xml generation

**Rationale**: Header already prepared for About page. No breaking changes needed.

---

## 13. Content Strategy

### Decision: Placeholder Content for MVP, Real Content Pre-Launch

**Approach**:

1. **MVP Phase** (for development):
   - Use placeholder text: "Lorem ipsum" style but contextual
   - Placeholder team photos: Use professional stock photos (Unsplash)
   - Placeholder stats: Realistic numbers (not "999,999")

2. **Pre-Launch Phase** (before production):
   - Replace with real content from stakeholders
   - Professional team photos (consistent lighting/background)
   - Real statistics from business metrics

**Content Preparation Checklist** (for stakeholders):

- [ ] Mission statement (50-100 words)
- [ ] Company history (200-300 words, split into 2-3 sections)
- [ ] 3-5 core values with descriptions (50-100 words each)
- [ ] Team member info for each person:
  - [ ] Name, role, bio (50-100 words)
  - [ ] Professional headshot (800x800px)
  - [ ] LinkedIn profile URL (optional)
- [ ] Achievement statistics (4-6 metrics with sources)
- [ ] Client logos for "Ils nous font confiance" (if available)

**Rationale**: Development can proceed without blocking on content. Content refinement happens in parallel. Placeholder data must look realistic for accurate design evaluation.

---

## 14. Mobile-First Considerations

### Decision: Mobile Breakpoints Strategy

**Breakpoints** (from Tailwind default):

- Mobile: < 640px (base styles)
- Tablet: 640px - 1023px (`sm:` and `md:`)
- Desktop: 1024px+ (`lg:` and `xl:`)

**Mobile-Specific Decisions**:

1. **Hero Section**:
   - Mobile: Stack vertically (content → image)
   - Tablet+: Side-by-side grid

2. **Team Grid**:
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns

3. **Values Grid**:
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 4 columns

4. **Stats**:
   - Mobile: 2 columns (2x3 grid)
   - Desktop: 4 columns (1x4 grid)

5. **Typography**:
   - Mobile: text-3xl (h1), text-2xl (h2)
   - Desktop: text-5xl (h1), text-4xl (h2)

6. **Spacing**:
   - Mobile: py-12 (section padding)
   - Desktop: py-24

**Touch Targets**: All buttons/links minimum 44x44px (iOS accessibility guideline)

**Testing Viewports**:

- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 768px (iPad)
- 1024px (Desktop)
- 1440px (Large desktop)

**Rationale**: Mobile-first CSS prevents desktop-centric bugs. Tailwind makes responsive styling efficient. Touch targets prevent mis-taps.

---

## 15. Browser Compatibility

### Decision: Modern Browsers (2 years back)

**Target Browsers**:

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions (iOS + macOS)

**Polyfills**: Not needed (Next.js handles via @babel/preset-env)

**CSS Features Used**:

- CSS Grid (supported in all targets)
- Flexbox (supported in all targets)
- CSS Custom Properties (supported in all targets)

**Testing Strategy**:

- Primary: Chrome (development)
- Secondary: Safari, Firefox (pre-launch manual testing)
- Automated: BrowserStack or Playwright multi-browser

**Rationale**: Modern browsers have excellent feature parity. No IE11 support needed (officially dead). Next.js transpiles JS for compatibility.

---

## Research Completion Summary

✅ **All technical unknowns resolved**  
✅ **No clarifications needed**  
✅ **Clear implementation path defined**

**Next Phase**: Proceed to Phase 1 (Design Artifacts)

- data-model.md: Entity definitions with Zod schemas
- contracts/: Component prop interfaces
- quickstart.md: Developer setup guide

**Estimated Implementation Time**: 2-3 days (1 dev)

- Day 1: Components + data structure
- Day 2: Content integration + SEO
- Day 3: Testing + polish
