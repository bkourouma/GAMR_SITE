# Quickstart Guide: Page À Propos

**Feature**: 006-redige-la-page  
**Date**: October 9, 2025  
**Status**: Complete ✅  
**Estimated Implementation Time**: 2-3 days (1 developer)

## Overview

This guide provides step-by-step instructions for implementing the About page. Follow these steps in order to build a production-ready, accessible, and performant About page.

---

## Prerequisites

### Required Knowledge

- Next.js 14+ (App Router)
- React 18+ (functional components, hooks)
- TypeScript (strict mode)
- Tailwind CSS
- Git workflow

### Development Environment

- Node.js 18+ installed
- pnpm package manager
- Code editor (VS Code recommended)
- Git configured

### Repository Access

```bash
git clone <repository-url>
cd gamr-site
git checkout 006-redige-la-page  # Feature branch already created
```

---

## Phase 1: Setup & Data Layer (2-3 hours)

### Step 1.1: Install Dependencies (if needed)

```bash
# Verify all dependencies installed
pnpm install

# Check current packages
pnpm list zod lucide-react next sharp
```

**Expected packages**:

- `zod` - Schema validation
- `lucide-react` - Icons
- `next` - Framework
- `sharp` - Image optimization

If any missing:

```bash
pnpm add zod lucide-react
```

---

### Step 1.2: Create Type Definitions

**File**: `src/types/about.ts`

```typescript
/**
 * TypeScript types for About page entities
 * Feature: 006-redige-la-page
 */

export interface CompanyInfo {
  mission: {
    headline: string;
    tagline: string;
    description: string;
    foundedYear: number;
  };
  story: {
    intro: string;
    sections: Array<{
      id: string;
      title: string;
      content: string;
      year?: number;
      imageUrl?: string;
    }>;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface TeamMember {
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

export interface CompanyValue {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface AboutPageData {
  company: CompanyInfo;
  team: TeamMember[];
  values: CompanyValue[];
  stats: AboutStat[];
}
```

**Update**: `src/types/index.ts`

```typescript
export * from './forms';
export * from './content';
export * from './about'; // ADD THIS LINE
```

---

### Step 1.3: Create Data File with Placeholder Content

**File**: `src/lib/about-data.ts`

```typescript
/**
 * About Page Content Data
 * Feature: 006-redige-la-page
 *
 * TODO: Replace placeholder content with real company info before production
 */

import { z } from 'zod';
import type { CompanyInfo, TeamMember, CompanyValue, AboutStat } from '@/types/about';

// Zod Schemas for validation
export const CompanyInfoSchema = z.object({
  mission: z.object({
    headline: z.string().min(5).max(100),
    tagline: z.string().min(10).max(80),
    description: z.string().min(100).max(1500),
    foundedYear: z.number().int().min(2000).max(new Date().getFullYear()),
  }),
  story: z.object({
    intro: z.string().min(50).max(500),
    sections: z
      .array(
        z.object({
          id: z.string(),
          title: z.string().min(5).max(100),
          content: z.string().min(100).max(1000),
          year: z.number().int().min(2000).max(new Date().getFullYear()).optional(),
          imageUrl: z.string().url().optional(),
        })
      )
      .min(1)
      .max(5),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const TeamMemberSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  role: z.string().min(3).max(100),
  bio: z.string().min(50).max(500),
  imageUrl: z.string().regex(/^[a-z0-9-]+\.(jpg|png|webp)$/),
  email: z.string().email().optional(),
  linkedIn: z.string().url().startsWith('https://linkedin.com/').optional(),
  twitter: z.string().url().optional(),
  order: z.number().int().positive(),
});

export const CompanyValueSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(50),
  description: z.string().min(50).max(500),
  icon: z.string().min(2).max(50),
  order: z.number().int().positive().max(10),
});

export const AboutStatSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  value: z.string().min(1).max(20),
  label: z.string().min(3).max(100),
  description: z.string().max(200).optional(),
  icon: z.string().min(2).max(50).optional(),
  order: z.number().int().positive().max(12),
});

// Data Constants (PLACEHOLDER - Replace with real content)
export const COMPANY_INFO: CompanyInfo = {
  mission: {
    headline: 'Simplifier la gestion des associations sportives',
    tagline: 'La plateforme tout-en-un pour gérer votre club',
    description:
      "GAMR est née d'une conviction : la gestion administrative ne devrait jamais être un frein à la passion sportive. Nous créons des outils intuitifs qui permettent aux dirigeants d'associations de se concentrer sur l'essentiel : développer leur club et accompagner leurs adhérents. Notre mission est de rendre la technologie accessible à tous les clubs, quelle que soit leur taille.",
    foundedYear: 2019,
  },
  story: {
    intro:
      "L'histoire de GAMR commence sur un terrain de sport, là où la passion rencontre la réalité administrative quotidienne des clubs.",
    sections: [
      {
        id: 'origins',
        title: 'Nos origines',
        content:
          "Fondée en 2019 par d'anciens dirigeants d'associations sportives, GAMR est née d'un constat simple : les outils de gestion existants étaient trop complexes, trop chers, ou inadaptés aux besoins réels des clubs de terrain. Nous avons décidé de créer la solution que nous aurions aimé avoir.",
        year: 2019,
      },
      {
        id: 'growth',
        title: 'Notre croissance',
        content:
          "En 5 ans, nous sommes passés d'une petite équipe à une plateforme utilisée par plus de 150 associations et 10,000 licenciés à travers la France. Chaque fonctionnalité que nous développons est guidée par les retours de nos utilisateurs et leur expertise terrain.",
        year: 2024,
      },
    ],
  },
  contact: {
    email: 'contact@gamr.fr',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France',
  },
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'jean-dupont',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'Co-fondateur & CEO',
    bio: "Ancien dirigeant d'un club de basket pendant 10 ans, Jean a fondé GAMR pour simplifier la vie administrative des associations sportives. Passionné par le sport et l'innovation, il pilote la vision stratégique de l'entreprise et maintient un lien direct avec les utilisateurs.",
    imageUrl: 'jean-dupont.jpg',
    email: 'jean.dupont@gamr.fr',
    linkedIn: 'https://linkedin.com/in/jean-dupont',
    order: 1,
  },
  {
    id: 'marie-martin',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'CTO',
    bio: "Développeuse full-stack avec 15 ans d'expérience dans les plateformes SaaS, Marie conçoit l'architecture technique de GAMR. Elle garantit la fiabilité, la sécurité et les performances de la plateforme pour servir des milliers d'utilisateurs quotidiens.",
    imageUrl: 'marie-martin.jpg',
    linkedIn: 'https://linkedin.com/in/marie-martin',
    order: 2,
  },
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'innovation',
    name: 'Innovation',
    description:
      "Nous repoussons constamment les limites de ce qui est possible dans la gestion sportive. Chaque fonctionnalité est pensée pour simplifier la vie des dirigeants et améliorer l'expérience des adhérents.",
    icon: 'Lightbulb',
    order: 1,
  },
  {
    id: 'excellence',
    name: 'Excellence',
    description:
      "La qualité n'est pas négociable. Nous testons rigoureusement chaque fonctionnalité et nous assurons que notre plateforme répond aux plus hauts standards de sécurité et de performance.",
    icon: 'Award',
    order: 2,
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description:
      "Nos meilleures innovations naissent de l'écoute de nos utilisateurs. Nous travaillons main dans la main avec les associations pour co-créer les outils dont elles ont vraiment besoin.",
    icon: 'Users',
    order: 3,
  },
  {
    id: 'passion-sport',
    name: 'Passion Sport',
    description:
      'Le sport est au cœur de notre ADN. Nous comprenons les enjeux des clubs parce que nous en avons fait partie. Cette passion guide chaque décision que nous prenons.',
    icon: 'Heart',
    order: 4,
  },
];

export const ABOUT_STATS: AboutStat[] = [
  {
    id: 'experience',
    value: '5+',
    label: "ans d'expérience",
    description: 'Depuis 2019, nous accompagnons les associations sportives',
    icon: 'Calendar',
    order: 1,
  },
  {
    id: 'associations',
    value: '150+',
    label: 'associations clientes',
    description: 'Clubs de toutes tailles nous font confiance',
    icon: 'Users',
    order: 2,
  },
  {
    id: 'licenses',
    value: '10K+',
    label: 'licenciés gérés',
    description: 'Adhérents actifs sur la plateforme',
    icon: 'UserCheck',
    order: 3,
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'satisfaction client',
    description: 'Taux de satisfaction mesuré sur nos utilisateurs actifs',
    icon: 'ThumbsUp',
    order: 4,
  },
];

// Validation (development mode only)
if (process.env.NODE_ENV === 'development') {
  try {
    CompanyInfoSchema.parse(COMPANY_INFO);
    TEAM_MEMBERS.forEach((member) => TeamMemberSchema.parse(member));
    COMPANY_VALUES.forEach((value) => CompanyValueSchema.parse(value));
    ABOUT_STATS.forEach((stat) => AboutStatSchema.parse(stat));
    console.log('✅ About page data validation passed');
  } catch (error) {
    console.error('❌ About page data validation failed:', error);
  }
}

// Helper functions
export function getTeamMemberById(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((member) => member.id === id);
}

export function getTeamMembersByOrder(): TeamMember[] {
  return [...TEAM_MEMBERS].sort((a, b) => a.order - b.order);
}

export function getValuesByOrder(): CompanyValue[] {
  return [...COMPANY_VALUES].sort((a, b) => a.order - b.order);
}

export function getStatsByOrder(): AboutStat[] {
  return [...ABOUT_STATS].sort((a, b) => a.order - b.order);
}
```

**Verify**:

```bash
pnpm dev

# Check console for validation message:
# "✅ About page data validation passed"
```

---

## Phase 2: Atomic Components (3-4 hours)

### Step 2.1: Create TeamMemberCard Component

**File**: `src/components/about/TeamMemberCard.tsx`

```typescript
/**
 * TeamMemberCard Component
 * Feature: 006-redige-la-page
 * Displays individual team member profile
 */

import Image from 'next/image';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import type { TeamMember } from '@/types/about';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      data-testid="team-member-card"
    >
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
        <p className="text-sm text-gray-700">{member.bio}</p>

        {/* Social Links */}
        {(member.linkedIn || member.twitter || member.email) && (
          <div className="flex gap-3 mt-4">
            {member.linkedIn && (
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.firstName} ${member.lastName} sur LinkedIn`}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.firstName} ${member.lastName} sur Twitter`}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Envoyer un email à ${member.firstName} ${member.lastName}`}
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### Step 2.2: Create ValueCard Component

**File**: `src/components/about/ValueCard.tsx`

```typescript
/**
 * ValueCard Component
 * Feature: 006-redige-la-page
 * Displays company value with icon
 */

'use client';

import * as Icons from 'lucide-react';
import type { CompanyValue } from '@/types/about';

interface ValueCardProps {
  value: CompanyValue;
}

export function ValueCard({ value }: ValueCardProps) {
  // Dynamic icon loading
  const Icon = (Icons as any)[value.icon] || Icons.CircleIcon;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
      {/* Icon */}
      <div className="w-12 h-12 mb-4 text-primary-600" aria-hidden="true">
        <Icon size={48} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-3">{value.name}</h3>
      <p className="text-sm text-gray-600">{value.description}</p>
    </div>
  );
}
```

---

### Step 2.3: Prepare Team Member Images

**Directory**: `/public/images/team/`

**Action**: Add placeholder team photos

1. Create directory:

   ```bash
   mkdir -p public/images/team
   ```

2. Download placeholder images (800x800px):
   - Use [Unsplash](https://unsplash.com/s/photos/professional-portrait)
   - Or use [This Person Does Not Exist](https://thispersondoesnotexist.com/)
   - Save as: `jean-dupont.jpg`, `marie-martin.jpg`

3. Optimize images:
   ```bash
   # If you have ImageMagick installed:
   cd public/images/team
   mogrify -resize 800x800 -quality 85 *.jpg
   ```

---

## Phase 3: Section Components (4-5 hours)

### Step 3.1: Create AboutHero Section

**File**: `src/components/about/AboutHero.tsx`

```typescript
/**
 * AboutHero Section
 * Feature: 006-redige-la-page
 * Hero section with mission statement
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { COMPANY_INFO } from '@/lib/about-data';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AboutHero() {
  const { mission } = COMPANY_INFO;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-8 pb-8 md:pt-12 md:pb-12 flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero -z-10" aria-hidden="true" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              {mission.headline}
            </h1>

            <p className="text-xl md:text-2xl text-white/90">
              {mission.tagline}
            </p>

            <p className="text-lg text-white/80 max-w-2xl mx-auto lg:mx-0">
              {mission.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/demander-demo">
                <Button
                  size="lg"
                  variant="primary"
                  className={`
                    !bg-orange-500 hover:!bg-orange-600
                    ${!prefersReducedMotion ? 'hover:scale-105' : ''}
                    transition-all duration-300
                  `}
                >
                  Demander une Démo
                </Button>
              </Link>
              <Link href="/solutions">
                <Button
                  size="lg"
                  variant="outline"
                  className={`
                    bg-white/10 border-white/30 text-white backdrop-blur-sm
                    hover:bg-white/20 hover:border-white/50
                    ${!prefersReducedMotion ? 'hover:scale-105' : ''}
                    transition-all duration-300
                  `}
                >
                  Voir nos Solutions
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3]">
              <Image
                src="/images/about/hero.jpg"
                alt="Équipe GAMR"
                width={600}
                height={450}
                priority
                quality={90}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**TODO**: Add hero image at `/public/images/about/hero.jpg` (600x450px or 1200x900px)

---

### Step 3.2: Create CompanyStory Section

**File**: `src/components/about/CompanyStory.tsx`

```typescript
/**
 * CompanyStory Section
 * Feature: 006-redige-la-page
 * Company history and origin story
 */

import { COMPANY_INFO } from '@/lib/about-data';

export function CompanyStory() {
  const { story } = COMPANY_INFO;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Notre Histoire
        </h2>

        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 text-center">
          {story.intro}
        </p>

        <div className="space-y-12 max-w-4xl mx-auto">
          {story.sections.map((section) => (
            <div key={section.id} className="flex flex-col md:flex-row gap-8 items-start">
              {section.year && (
                <div className="text-4xl md:text-5xl font-bold text-primary-600 md:min-w-[120px]">
                  {section.year}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Step 3.3: Create TeamSection

**File**: `src/components/about/TeamSection.tsx`

```typescript
/**
 * TeamSection Component
 * Feature: 006-redige-la-page
 * Grid of team member cards
 */

import { getTeamMembersByOrder } from '@/lib/about-data';
import { TeamMemberCard } from './TeamMemberCard';

export function TeamSection() {
  const teamMembers = getTeamMembersByOrder();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Notre Équipe
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Step 3.4: Create ValuesSection

**File**: `src/components/about/ValuesSection.tsx`

```typescript
/**
 * ValuesSection Component
 * Feature: 006-redige-la-page
 * Grid of company values
 */

import { getValuesByOrder } from '@/lib/about-data';
import { ValueCard } from './ValueCard';

export function ValuesSection() {
  const values = getValuesByOrder();

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nos Valeurs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <ValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Step 3.5: Create AchievementsSection

**File**: `src/components/about/AchievementsSection.tsx`

```typescript
/**
 * AchievementsSection Component
 * Feature: 006-redige-la-page
 * Stats and social proof
 */

'use client';

import * as Icons from 'lucide-react';
import { getStatsByOrder } from '@/lib/about-data';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { PartnersSection } from '@/components/shared/PartnersSection';

export function AchievementsSection() {
  const stats = getStatsByOrder();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nos Réalisations
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon ? (Icons as any)[stat.icon] || Icons.CircleIcon : null;

            return (
              <div key={stat.id} className="text-center">
                {Icon && (
                  <div className="flex justify-center mb-4" aria-hidden="true">
                    <Icon className="w-10 h-10 text-primary-600" />
                  </div>
                )}
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                {stat.description && (
                  <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Client Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-600 mb-8 text-lg font-medium">
            Ils nous font confiance
          </p>
          <PartnersSection />
        </div>
      </div>
    </section>
  );
}
```

---

### Step 3.6: Create AboutCTA Section

**File**: `src/components/about/AboutCTA.tsx`

```typescript
/**
 * AboutCTA Component
 * Feature: 006-redige-la-page
 * Final call-to-action section
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function AboutCTA() {
  return (
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
            <Button
              size="lg"
              variant="primary"
              className="bg-white text-primary-600 hover:bg-gray-100 shadow-lg"
            >
              Demander une Démo
            </Button>
          </Link>
          <Link href="/essai-gratuit">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Essai Gratuit
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

## Phase 4: Page Assembly (1 hour)

### Step 4.1: Create About Page

**File**: `src/app/a-propos/page.tsx`

```typescript
/**
 * About Page - Page À Propos
 * Feature: 006-redige-la-page
 *
 * Company mission, team, values, and achievements
 */

import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { CompanyStory } from '@/components/about/CompanyStory';
import { TeamSection } from '@/components/about/TeamSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { AchievementsSection } from '@/components/about/AchievementsSection';
import { AboutCTA } from '@/components/about/AboutCTA';
import { COMPANY_INFO, TEAM_MEMBERS } from '@/lib/about-data';

// SEO Metadata (SEO-001 to SEO-007)
export const metadata: Metadata = {
  title: 'À Propos de GAMR - Notre Mission et Notre Équipe',
  description: 'Découvrez l\'équipe passionnée derrière GAMR, notre mission de simplifier la gestion des associations sportives, et nos valeurs d\'innovation et d\'excellence.',
  keywords: [
    'À propos GAMR',
    'équipe GAMR',
    'mission GAMR',
    'gestion associations sportives',
    'plateforme sport',
    'qui sommes-nous',
    'valeurs entreprise',
  ],
  openGraph: {
    title: 'À Propos de GAMR - Notre Mission et Notre Équipe',
    description: 'Rencontrez l\'équipe GAMR et découvrez notre mission d\'innovation dans la gestion des associations sportives.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'GAMR',
    images: [
      {
        url: '/images/about/hero.jpg',
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

// JSON-LD Organization Schema (SEO-004)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GAMR',
  description: COMPANY_INFO.mission.description,
  url: 'https://gamr.fr',
  logo: 'https://gamr.fr/images/logo.jpg',
  foundingDate: `${COMPANY_INFO.mission.foundedYear}-01-01`,
  email: COMPANY_INFO.contact.email,
  telephone: COMPANY_INFO.contact.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: COMPANY_INFO.contact.address,
    addressCountry: 'FR',
  },
  founders: TEAM_MEMBERS
    .filter((m) => m.role.toLowerCase().includes('fondateur'))
    .map((m) => ({
      '@type': 'Person',
      name: `${m.firstName} ${m.lastName}`,
      jobTitle: m.role,
    })),
  sameAs: TEAM_MEMBERS
    .filter((m) => m.linkedIn)
    .map((m) => m.linkedIn),
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

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

---

## Phase 5: Testing & Validation (2-3 hours)

### Step 5.1: Manual Testing Checklist

```bash
# Start dev server
pnpm dev

# Open browser: http://localhost:3000/a-propos
```

**Visual Testing**:

- [ ] All sections render correctly
- [ ] Images load properly
- [ ] Text is readable with good contrast
- [ ] Spacing looks consistent
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Hover effects work on cards
- [ ] CTAs are clickable
- [ ] No console errors in DevTools

**Content Validation**:

- [ ] Mission statement displays
- [ ] Team member cards show all info
- [ ] Values display with icons
- [ ] Stats animate on scroll
- [ ] Client logos appear (if PartnersSection has data)

---

### Step 5.2: TypeScript Validation

```bash
pnpm type-check

# Expected: 0 errors
```

---

### Step 5.3: Linting

```bash
pnpm lint

# Expected: 0 errors
```

---

### Step 5.4: E2E Tests

**File**: `tests/e2e/about.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/a-propos');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/À Propos de GAMR/);
  });

  test('displays all sections', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Simplifier');
    await expect(page.locator('h2:has-text("Notre Histoire")')).toBeVisible();
    await expect(page.locator('h2:has-text("Notre Équipe")')).toBeVisible();
    await expect(page.locator('h2:has-text("Nos Valeurs")')).toBeVisible();
    await expect(page.locator('h2:has-text("Nos Réalisations")')).toBeVisible();
  });

  test('team member cards render', async ({ page }) => {
    const cards = page.locator('[data-testid="team-member-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('CTA buttons are clickable', async ({ page }) => {
    const demoButton = page.locator('text=Demander une Démo').first();
    await expect(demoButton).toBeVisible();
    await demoButton.click();
    await expect(page).toHaveURL(/demander-demo/);
  });

  test('mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2:has-text("Notre Équipe")')).toBeVisible();
  });
});
```

**Run tests**:

```bash
pnpm test:e2e

# Expected: All tests pass
```

---

### Step 5.5: Lighthouse Audit

```bash
# Build production version
pnpm build

# Start production server
pnpm start

# Open Chrome DevTools → Lighthouse tab
# Run audit on http://localhost:3000/a-propos
```

**Target Scores**:

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

**Common Issues**:

- Images not optimized → Check Next.js Image component usage
- Missing alt text → Verify all images have descriptive alt
- Contrast too low → Check text colors on gradients
- CLS > 0.1 → Add width/height to all images

---

## Phase 6: Production Readiness (1-2 hours)

### Step 6.1: Replace Placeholder Content

1. **Get Real Content**:
   - Real team photos (professional, consistent style)
   - Actual company mission and history
   - Verified statistics
   - Real social media URLs

2. **Update `src/lib/about-data.ts`**:
   - Replace COMPANY_INFO
   - Replace TEAM_MEMBERS
   - Replace COMPANY_VALUES
   - Replace ABOUT_STATS

3. **Add Real Images**:
   - Upload team photos to `/public/images/team/`
   - Upload hero image to `/public/images/about/hero.jpg`
   - Optimize all images (< 50KB per team photo)

---

### Step 6.2: Final Checks

```bash
# 1. Type check
pnpm type-check

# 2. Lint
pnpm lint

# 3. Build
pnpm build

# 4. E2E tests
pnpm test:e2e

# 5. Dev mode validation
pnpm dev
# Check console for: "✅ About page data validation passed"
```

---

### Step 6.3: Git Commit

```bash
git add .
git commit -m "feat(about): implement About page with team, values, and achievements

- Add About page at /a-propos route
- Create TeamMemberCard and ValueCard components
- Implement all About page sections (Hero, Story, Team, Values, Achievements, CTA)
- Add Zod validation for content data
- Include SEO metadata and JSON-LD Organization schema
- Add E2E tests for About page
- All Lighthouse scores > 90

Closes #006-redige-la-page"

git push origin 006-redige-la-page
```

---

## Troubleshooting

### Issue: "Module not found: Can't resolve '@/lib/about-data'"

**Solution**: TypeScript paths not configured

```bash
# Check tsconfig.json has:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Issue: Team photos not loading

**Solution**:

1. Verify images exist in `/public/images/team/`
2. Check filenames match data exactly (case-sensitive)
3. Restart dev server: `pnpm dev`

---

### Issue: Lucide icons not rendering

**Solution**:

```bash
# Verify lucide-react installed
pnpm list lucide-react

# If missing:
pnpm add lucide-react
```

---

### Issue: Zod validation errors in console

**Solution**:

1. Read error message carefully (shows which field failed)
2. Check `src/lib/about-data.ts` for that field
3. Fix data to match schema requirements
4. Restart dev server

---

## Next Steps

After completing implementation:

1. **Create Pull Request**:
   - Title: "feat(about): implement About page"
   - Include screenshots
   - Tag reviewers

2. **Request Content Review**:
   - Ask stakeholders to review text
   - Get approval on team photos
   - Verify statistics are accurate

3. **Deploy to Staging**:
   - Merge to staging branch
   - Test on staging URL
   - Share with team for feedback

4. **Production Deployment**:
   - Merge to main
   - Deploy to production
   - Verify on live site
   - Monitor analytics

---

## Reference Links

- [Feature Spec](./spec.md)
- [Data Model](./data-model.md)
- [Component Contracts](./contracts/components.md)
- [Data Schema](./contracts/data-schema.md)
- [Research](./research.md)

---

**Quickstart Guide Complete** ✅

**Estimated Total Time**: 12-16 hours (1-2 days for 1 developer)

**Questions?** Refer to contracts and research docs, or consult with team lead.
