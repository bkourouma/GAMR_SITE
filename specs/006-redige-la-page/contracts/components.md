# Component Contracts: Page À Propos

**Feature**: 006-redige-la-page  
**Date**: October 9, 2025  
**Status**: Complete ✅

## Overview

This document defines the component interfaces (props, events, accessibility) for all About page components. Each component contract specifies inputs, outputs, and behavior expectations.

---

## Page Components

### AboutPage

**File**: `src/app/a-propos/page.tsx`  
**Type**: Next.js Page Component  
**Description**: Root page component that composes all About page sections

**Props**: None (Next.js page components receive no props)

**Exports**:

```typescript
// SEO Metadata
export const metadata: Metadata = {
  title: string;
  description: string;
  keywords: string[];
  openGraph: OpenGraphMetadata;
  alternates: { canonical: string };
  robots: { index: boolean; follow: boolean };
};

// Page Component
export default function AboutPage(): JSX.Element;
```

**Dependencies**:

- AboutHero
- CompanyStory
- TeamSection
- ValuesSection
- AchievementsSection
- AboutCTA

**Structure**:

```typescript
export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* JSON-LD Schema */}
      <script type="application/ld+json" {...} />

      {/* Page Sections */}
      <AboutHero />
      <CompanyStory />
      <TeamSection />
      <ValuesSection />
      <AchievementsSection />
      <AboutCTA />
    </main>
  );
}
```

**Accessibility**:

- Uses semantic `<main>` element
- Proper heading hierarchy (h1 in Hero → h2 in sections)

---

## Section Components

### 1. AboutHero

**File**: `src/components/about/AboutHero.tsx`  
**Description**: Hero section with mission statement and visual

**Props**:

```typescript
interface AboutHeroProps {
  // No props - data imported from about-data.ts
}
```

**Internal Data Source**:

```typescript
import { COMPANY_INFO } from '@/lib/about-data';

const { mission } = COMPANY_INFO;
```

**Structure**:

```typescript
<section className="relative pt-8 pb-8 md:pt-12 md:pb-12 overflow-hidden">
  {/* Gradient Background */}
  <div className="absolute inset-0 bg-gradient-hero -z-10" />

  <div className="container mx-auto px-4 py-8 md:py-12">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left: Content */}
      <div>
        <h1>{mission.headline}</h1>
        <p className="text-xl">{mission.tagline}</p>
        <p>{mission.description}</p>
        <div className="flex gap-4">
          <Link href="/demander-demo"><Button>...</Button></Link>
          <Link href="/solutions"><Button variant="outline">...</Button></Link>
        </div>
      </div>

      {/* Right: Hero Image */}
      <div>
        <Image src="/images/about/hero.jpg" alt="..." />
      </div>
    </div>
  </div>
</section>
```

**Accessibility**:

- `<h1>` for main headline (only h1 on page)
- Alt text for hero image
- Keyboard accessible CTAs
- Proper color contrast on gradient background

**Responsive Behavior**:

- Mobile: Stack vertically (content → image)
- Desktop: Side-by-side grid (50/50 split)

---

### 2. CompanyStory

**File**: `src/components/about/CompanyStory.tsx`  
**Description**: Company history and origin story

**Props**:

```typescript
interface CompanyStoryProps {
  // No props - data imported from about-data.ts
}
```

**Internal Data Source**:

```typescript
import { COMPANY_INFO } from '@/lib/about-data';

const { story } = COMPANY_INFO;
```

**Structure**:

```typescript
<section className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
      Notre Histoire
    </h2>

    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
      {story.intro}
    </p>

    <div className="space-y-12 max-w-4xl mx-auto">
      {story.sections.map(section => (
        <div key={section.id} className="flex gap-8">
          {section.year && (
            <div className="text-4xl font-bold text-primary-500">
              {section.year}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
            <p className="text-gray-700">{section.content}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Accessibility**:

- `<h2>` for section heading
- `<h3>` for story section titles
- Semantic structure with proper spacing
- Gray background meets contrast ratio requirements

**Responsive Behavior**:

- Mobile: Year markers stack above content
- Desktop: Year markers inline with content

---

### 3. TeamSection

**File**: `src/components/about/TeamSection.tsx`  
**Description**: Grid of team member cards

**Props**:

```typescript
interface TeamSectionProps {
  // No props - data imported from about-data.ts
}
```

**Internal Data Source**:

```typescript
import { TEAM_MEMBERS } from '@/lib/about-data';
import { getTeamMembersByOrder } from '@/lib/about-data';

const teamMembers = getTeamMembersByOrder(); // Sorted by order field
```

**Structure**:

```typescript
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Notre Équipe
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map(member => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </div>
</section>
```

**Accessibility**:

- `<h2>` for section heading
- Grid layout with proper gap spacing
- Each card independently accessible

**Responsive Behavior**:

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

### 4. ValuesSection

**File**: `src/components/about/ValuesSection.tsx`  
**Description**: Grid of company values

**Props**:

```typescript
interface ValuesSectionProps {
  // No props - data imported from about-data.ts
}
```

**Internal Data Source**:

```typescript
import { COMPANY_VALUES, getValuesByOrder } from '@/lib/about-data';

const values = getValuesByOrder(); // Sorted by order field
```

**Structure**:

```typescript
<section className="py-16 md:py-24 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Nos Valeurs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {values.map(value => (
        <ValueCard key={value.id} value={value} />
      ))}
    </div>
  </div>
</section>
```

**Accessibility**:

- `<h2>` for section heading
- Icons have aria-hidden (decorative)
- Value names serve as headings

**Responsive Behavior**:

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns (or 3 if only 3 values)

---

### 5. AchievementsSection

**File**: `src/components/about/AchievementsSection.tsx`  
**Description**: Stats and social proof

**Props**:

```typescript
interface AchievementsSectionProps {
  // No props - data imported from about-data.ts
}
```

**Internal Data Source**:

```typescript
import { ABOUT_STATS, getStatsByOrder } from '@/lib/about-data';

const stats = getStatsByOrder(); // Sorted by order field
```

**Structure**:

```typescript
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Nos Réalisations
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {stats.map(stat => (
        <div key={stat.id} className="text-center">
          {stat.icon && <LucideIcon name={stat.icon} className="mx-auto mb-4" />}
          <div className="text-4xl md:text-5xl font-bold text-primary-600">
            <AnimatedCounter value={stat.value} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* Optional: Client Logos */}
    <div className="mt-16">
      <p className="text-center text-gray-600 mb-8">Ils nous font confiance</p>
      <PartnersSection />
    </div>
  </div>
</section>
```

**Accessibility**:

- `<h2>` for section heading
- Stats have proper aria-labels for screen readers
- AnimatedCounter accessible (see AnimatedCounter contract)

**Responsive Behavior**:

- Mobile: 2 columns (2x3 grid for 6 stats)
- Desktop: 4 columns (1x4 grid)

---

### 6. AboutCTA

**File**: `src/components/about/AboutCTA.tsx`  
**Description**: Final call-to-action section

**Props**:

```typescript
interface AboutCTAProps {
  // No props - static content
}
```

**Structure**:

```typescript
<section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
      Prêt à simplifier la gestion de votre association ?
    </h2>
    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
      Rejoignez les 150+ associations qui nous font confiance
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/demander-demo">
        <Button size="lg" variant="primary" className="bg-white text-primary-600 hover:bg-gray-100">
          Demander une Démo
        </Button>
      </Link>
      <Link href="/essai-gratuit">
        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
          Essai Gratuit
        </Button>
      </Link>
    </div>
  </div>
</section>
```

**Accessibility**:

- `<h2>` for CTA heading
- High contrast text on gradient background
- Keyboard accessible buttons

**Responsive Behavior**:

- Mobile: Stacked buttons
- Desktop: Side-by-side buttons

---

## Atomic Components

### 7. TeamMemberCard

**File**: `src/components/about/TeamMemberCard.tsx`  
**Description**: Individual team member profile card

**Props**:

```typescript
interface TeamMemberCardProps {
  member: TeamMember; // From src/types/about.ts
}
```

**TeamMember Type**:

```typescript
interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  imageUrl: string;
  email?: string;
  linkedIn?: string;
  twitter?: string;
  order: number;
}
```

**Structure**:

```typescript
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
  {/* Profile Photo */}
  <div className="aspect-square relative">
    <Image
      src={`/images/team/${member.imageUrl}`}
      alt={`${member.firstName} ${member.lastName} - ${member.role}`}
      width={400}
      height={400}
      loading="lazy"
      quality={85}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Content */}
  <div className="p-6">
    <h3 className="text-xl font-bold mb-1">
      {member.firstName} {member.lastName}
    </h3>
    <p className="text-sm text-gray-600 mb-4">{member.role}</p>
    <p className="text-sm text-gray-700 line-clamp-4">{member.bio}</p>

    {/* Social Links */}
    {(member.linkedIn || member.twitter || member.email) && (
      <div className="flex gap-3 mt-4">
        {member.linkedIn && (
          <a
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.firstName} ${member.lastName} sur LinkedIn`}
            className="text-gray-600 hover:text-primary-600"
          >
            <LinkedInIcon />
          </a>
        )}
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.firstName} ${member.lastName} sur Twitter`}
            className="text-gray-600 hover:text-primary-600"
          >
            <TwitterIcon />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Envoyer un email à ${member.firstName} ${member.lastName}`}
            className="text-gray-600 hover:text-primary-600"
          >
            <MailIcon />
          </a>
        )}
      </div>
    )}
  </div>
</div>
```

**Accessibility**:

- `<h3>` for member name
- Descriptive alt text for photo: `{firstName} {lastName} - {role}`
- `aria-label` for social link icons
- `rel="noopener noreferrer"` for external links
- Proper color contrast for text

**Responsive Behavior**:

- Square aspect ratio (1:1) for photo consistency
- Card width adapts to grid container
- Hover effect on desktop (shadow elevation)

**Edge Cases**:

- If no social links: Don't render social links div
- If bio > 4 lines: Truncate with ellipsis (line-clamp-4)
- If image fails to load: Next.js shows blank gray placeholder

---

### 8. ValueCard

**File**: `src/components/about/ValueCard.tsx`  
**Description**: Individual company value card

**Props**:

```typescript
interface ValueCardProps {
  value: CompanyValue; // From src/types/about.ts
}
```

**CompanyValue Type**:

```typescript
interface CompanyValue {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  order: number;
}
```

**Structure**:

```typescript
'use client';

import { LucideIcon } from 'lucide-react';

<div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:scale-105">
  {/* Icon */}
  <div className="w-12 h-12 mb-4 text-primary-600" aria-hidden="true">
    <LucideIcon name={value.icon} size={48} />
  </div>

  {/* Content */}
  <h3 className="text-lg font-semibold mb-3">{value.name}</h3>
  <p className="text-sm text-gray-600">{value.description}</p>
</div>
```

**Icon Implementation**:

```typescript
// Helper to dynamically import Lucide icons
import * as Icons from 'lucide-react';

function getLucideIcon(name: string) {
  const Icon = Icons[name as keyof typeof Icons];
  if (!Icon) {
    console.warn(`Icon "${name}" not found, using default`);
    return Icons.CircleIcon;
  }
  return Icon;
}

// In component:
const Icon = getLucideIcon(value.icon);
<Icon size={48} className="text-primary-600" />
```

**Accessibility**:

- `<h3>` for value name
- Icon has `aria-hidden="true"` (decorative)
- Proper color contrast for text
- Hover effect doesn't affect accessibility

**Responsive Behavior**:

- Card height auto-adjusts to content
- Hover scale effect (desktop only)
- Consistent padding across all cards

**Edge Cases**:

- If icon name invalid: Fallback to CircleIcon with console warning
- If description > 100 words: Truncate in data validation (not in component)

---

## Shared Component Reuse

### 9. AnimatedCounter

**File**: `src/components/shared/AnimatedCounter.tsx` (EXISTING)  
**Usage**: Display animated numbers in stats

**Props**:

```typescript
interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}
```

**Usage in About Page**:

```typescript
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

<div className="text-4xl font-bold text-primary-600">
  <AnimatedCounter value="150+" duration={2000} />
</div>
```

**Accessibility**:

- Component already handles screen reader accessibility
- Final value announced after animation completes

---

### 10. CTAButton

**File**: `src/components/shared/CTAButton.tsx` (EXISTING)  
**Usage**: Reusable CTA buttons

**Props**:

```typescript
interface CTAButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage in About Page**:

```typescript
import { CTAButton } from '@/components/shared/CTAButton';

<CTAButton href="/demander-demo" variant="primary" size="lg">
  Demander une Démo
</CTAButton>
```

---

### 11. PartnersSection

**File**: `src/components/shared/PartnersSection.tsx` (EXISTING)  
**Usage**: Display client/partner logos

**Props**: None (uses internal data)

**Usage in About Page**:

```typescript
import { PartnersSection } from '@/components/shared/PartnersSection';

// In AchievementsSection:
<div className="mt-16">
  <p className="text-center text-gray-600 mb-8">Ils nous font confiance</p>
  <PartnersSection />
</div>
```

---

## Component Interaction Patterns

### Data Flow

```
about-data.ts (source of truth)
    ↓
Page Component (imports sections)
    ↓
Section Components (import data, render atomic components)
    ↓
Atomic Components (receive data via props)
```

### Example Flow

```typescript
// 1. Data layer (about-data.ts)
export const TEAM_MEMBERS = [...];

// 2. Section component (TeamSection.tsx)
import { TEAM_MEMBERS } from '@/lib/about-data';

export function TeamSection() {
  return (
    <div className="grid">
      {TEAM_MEMBERS.map(member => (
        <TeamMemberCard member={member} />
      ))}
    </div>
  );
}

// 3. Atomic component (TeamMemberCard.tsx)
interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return <div>{member.firstName}</div>;
}

// 4. Page component (page.tsx)
import { TeamSection } from '@/components/about/TeamSection';

export default function AboutPage() {
  return <main><TeamSection /></main>;
}
```

---

## Testing Contracts

### Unit Tests

Each component should have corresponding test file:

```
src/components/about/
  ├── TeamMemberCard.tsx
  └── TeamMemberCard.test.tsx
```

**Test Cases for TeamMemberCard**:

```typescript
describe('TeamMemberCard', () => {
  it('renders member name and role', () => {
    const member = { firstName: 'John', lastName: 'Doe', role: 'CEO', ... };
    render(<TeamMemberCard member={member} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
  });

  it('renders social links when provided', () => {
    const member = { linkedIn: 'https://linkedin.com/...', ... };
    render(<TeamMemberCard member={member} />);
    expect(screen.getByLabelText(/LinkedIn/)).toBeInTheDocument();
  });

  it('does not render social links when absent', () => {
    const member = { linkedIn: undefined, twitter: undefined, ... };
    render(<TeamMemberCard member={member} />);
    expect(screen.queryByLabelText(/LinkedIn/)).not.toBeInTheDocument();
  });

  it('has accessible alt text for photo', () => {
    const member = { firstName: 'John', lastName: 'Doe', role: 'CEO', ... };
    render(<TeamMemberCard member={member} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'John Doe - CEO');
  });
});
```

### E2E Tests

Covered in `tests/e2e/about.spec.ts`:

```typescript
test.describe('About Page', () => {
  test('all sections render', async ({ page }) => {
    await page.goto('/a-propos');
    await expect(page.locator('h2:has-text("Notre Équipe")')).toBeVisible();
    await expect(page.locator('h2:has-text("Nos Valeurs")')).toBeVisible();
  });

  test('team member cards render', async ({ page }) => {
    await page.goto('/a-propos');
    const cards = page.locator('[data-testid="team-member-card"]');
    await expect(cards).toHaveCount(TEAM_MEMBERS.length);
  });
});
```

---

## Performance Contracts

### Image Loading

- **Hero image**: `priority={true}` (above fold)
- **Team photos**: `loading="lazy"` (below fold)
- **Format**: WebP with JPEG fallback (automatic via Next.js)
- **Sizing**: Proper width/height attributes to prevent CLS

### Code Splitting

- Page component lazy loads sections (default Next.js behavior)
- No dynamic imports needed (sections are lightweight)

### Bundle Size Targets

- About page JS bundle: < 100KB (gzipped)
- Each section component: < 10KB (gzipped)
- Total page weight (including images): < 500KB

---

## Error Handling Contracts

### Missing Data

If data is incomplete or missing:

```typescript
// In TeamMemberCard
if (!member.imageUrl) {
  return (
    <div className="bg-gray-200 aspect-square flex items-center justify-center">
      <UserIcon className="w-24 h-24 text-gray-400" />
    </div>
  );
}
```

### Image Load Failures

Next.js Image component handles errors automatically with:

- Gray placeholder
- Console warning (dev mode)
- No crash or broken UI

### Validation Failures

Zod validation (dev mode) catches data errors:

- Console error with specific field
- Build fails if data invalid
- Prevents deployment of bad content

---

## Accessibility Contracts

### WCAG 2.1 AA Requirements

All components MUST meet:

1. **Keyboard Navigation**: Tab order logical, all interactive elements reachable
2. **Color Contrast**: 4.5:1 minimum for text
3. **Screen Reader**: Semantic HTML, proper ARIA labels
4. **Focus Indicators**: Visible focus states on all interactive elements
5. **Heading Hierarchy**: Logical h1 → h2 → h3 structure
6. **Alt Text**: Descriptive for all images
7. **Zoom Support**: Content readable at 200% zoom

### Testing Tools

- Automated: Lighthouse accessibility audit
- Manual: NVDA/JAWS screen reader
- Keyboard: Complete tab navigation

---

**Component Contracts Status**: Complete ✅  
**Next Step**: Create quickstart guide
