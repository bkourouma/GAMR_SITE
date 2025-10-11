# Component Contracts: Modern Visual Homepage Transformation

**Feature**: 002-transform-the-gamr  
**Date**: October 8, 2025  
**Purpose**: Define component APIs, prop interfaces, and interaction contracts

---

## Overview

This document defines the TypeScript interfaces for all components involved in the homepage transformation. Each component contract specifies props, events, ref forwarding, and usage patterns.

---

## 1. Enhanced Components (Existing → Enhanced)

### 1.1 HeroSection

**Purpose**: Split-screen hero with animated logo, gradient background, and CTA buttons.

**Props Interface**:

```typescript
interface HeroSectionProps {
  /** Main headline text (supports gradient animation) */
  headline: string;
  /** Subheadline/tagline text */
  subheadline: string;
  /** Primary CTA button text */
  primaryCta: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  /** Secondary CTA button text */
  secondaryCta: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  /** Logo image configuration */
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Whether to enable parallax effect */
  enableParallax?: boolean;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<HeroSection
  headline="Gérez vos risques métiers avec confiance"
  subheadline="La plateforme intelligente pour une gestion complète des risques"
  primaryCta={{
    text: 'Essai Gratuit',
    href: '/signup',
  }}
  secondaryCta={{
    text: 'Demander une Démo',
    href: '/demo',
  }}
  logo={{
    src: '/images/logo.jpg',
    alt: 'GAMR Logo',
    width: 800,
    height: 800,
  }}
  enableParallax={true}
/>
```

**Implementation Notes**:

- Uses `useParallax` hook for background parallax
- Uses `useReducedMotion` to disable animations
- Responsive: split-screen on desktop (≥1024px), stacked on mobile

---

### 1.2 FeaturesGrid

**Purpose**: Grid of feature cards with glassmorphism and 3D tilt effects.

**Props Interface**:

```typescript
interface Feature {
  id: string;
  icon: React.ReactNode | string; // Lucide icon or custom
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

interface FeaturesGridProps {
  /** Array of features to display */
  features: Feature[];
  /** Grid columns (responsive) */
  columns?: {
    mobile: 1 | 2;
    tablet: 2 | 3;
    desktop: 3 | 4;
  };
  /** Enable 3D tilt hover effect */
  enable3DTilt?: boolean;
  /** Enable glassmorphism styling */
  enableGlassmorphism?: boolean;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<FeaturesGrid
  features={[
    {
      id: 'risk-analysis',
      icon: <Shield className="w-8 h-8" />,
      title: 'Analyse des Risques',
      description: 'Identification et évaluation complète des risques métiers',
    },
    // ... more features
  ]}
  columns={{
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }}
  enable3DTilt={true}
  enableGlassmorphism={true}
/>
```

---

### 1.3 SocialProof

**Purpose**: Statistics section with animated counters.

**Props Interface**:

```typescript
interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: React.ReactNode;
}

interface SocialProofProps {
  /** Array of statistics to display */
  statistics: Statistic[];
  /** Section headline */
  headline?: string;
  /** Section subheadline */
  subheadline?: string;
  /** Animation duration for counters (ms) */
  animationDuration?: number;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<SocialProof
  headline="La confiance des leaders"
  statistics={[
    {
      id: 'organizations',
      label: 'Organizations',
      value: 500,
      suffix: '+',
    },
    {
      id: 'security-index',
      label: 'Indice de Sécurité Moyen',
      value: 8.7,
      suffix: '/10',
      decimals: 1,
    },
  ]}
  animationDuration={2000}
/>
```

---

### 1.4 DemoVideo (Enhanced as Security Dashboard Preview)

**Purpose**: Interactive security index dashboard with animated charts.

**Props Interface**:

```typescript
interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DemoVideoProps {
  /** Chart title */
  title: string;
  /** Chart description */
  description?: string;
  /** Data points for chart */
  data: ChartDataPoint[];
  /** Chart type */
  chartType?: 'progress' | 'bar' | 'doughnut';
  /** Whether to animate on scroll into view */
  animateOnScroll?: boolean;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<DemoVideo
  title="Tableau de Bord Sécurité"
  description="Visualisez votre indice de sécurité en temps réel"
  data={[
    { label: 'Infrastructure', value: 85, color: '#2EC4B6' },
    { label: 'Données', value: 92, color: '#247BA0' },
    { label: 'Accès', value: 78, color: '#FF6B35' },
  ]}
  chartType="progress"
  animateOnScroll={true}
/>
```

---

### 1.5 Header (Sticky Nav with Blur)

**Purpose**: Sticky navigation with blur effect on scroll.

**Props Interface**:

```typescript
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface HeaderProps {
  /** Navigation items */
  navItems: NavItem[];
  /** Logo configuration */
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** CTA button in header */
  ctaButton?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  /** Enable blur effect on scroll */
  enableBlur?: boolean;
  /** Scroll threshold to trigger blur (px) */
  blurThreshold?: number;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<Header
  navItems={[
    { label: 'Solutions', href: '#solutions' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]}
  logo={{
    src: '/images/logo.jpg',
    alt: 'GAMR',
    width: 120,
    height: 40,
  }}
  ctaButton={{
    text: 'Essai Gratuit',
    href: '/signup',
    variant: 'primary',
  }}
  enableBlur={true}
  blurThreshold={100}
/>
```

---

## 2. Shared Components (Enhanced)

### 2.1 CTAButton

**Purpose**: Call-to-action button with pulse/hover effects.

**Props Interface**:

```typescript
interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Enable pulse animation */
  enablePulse?: boolean;
  /** Enable ripple effect on click */
  enableRipple?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Icon before text */
  leftIcon?: React.ReactNode;
  /** Icon after text */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
  /** Link href (renders as <a>) */
  href?: string;
}
```

**Ref Forwarding**: Yes (`React.forwardRef<HTMLButtonElement | HTMLAnchorElement>`)

**Usage Example**:

```tsx
<CTAButton
  variant="primary"
  size="lg"
  enablePulse={true}
  enableRipple={true}
  rightIcon={<ArrowRight />}
  href="/signup"
>
  Essai Gratuit
</CTAButton>
```

---

### 2.2 FeatureCard

**Purpose**: Card component with glassmorphism and hover effects.

**Props Interface**:

```typescript
interface FeatureCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Icon or image */
  icon?: React.ReactNode;
  /** Image source (alternative to icon) */
  imageSrc?: string;
  /** Enable glassmorphism styling */
  glassmorphism?: boolean;
  /** Enable 3D tilt effect */
  enable3DTilt?: boolean;
  /** Enable hover lift effect */
  enableHoverLift?: boolean;
  /** Link configuration */
  link?: {
    text: string;
    href: string;
  };
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}
```

**Ref Forwarding**: Yes (`React.forwardRef<HTMLDivElement>`)

**Usage Example**:

```tsx
<FeatureCard
  title="Analyse Prédictive"
  description="Anticipez les risques avant qu'ils ne surviennent"
  icon={<TrendingUp className="w-10 h-10 text-accent" />}
  glassmorphism={true}
  enable3DTilt={true}
  enableHoverLift={true}
  link={{
    text: 'En savoir plus',
    href: '/features/predictive',
  }}
/>
```

---

### 2.3 TestimonialCard

**Purpose**: Testimonial card with slide-in animation.

**Props Interface**:

```typescript
interface TestimonialCardProps {
  /** Testimonial text */
  quote: string;
  /** Author name */
  author: string;
  /** Author role/title */
  role: string;
  /** Author company */
  company: string;
  /** Avatar image */
  avatar?: {
    src: string;
    alt: string;
  };
  /** Star rating (1-5) */
  rating?: number;
  /** Animation direction */
  animationDirection?: 'left' | 'right';
  /** Animation delay (for staggered effect) */
  animationDelay?: number;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<TestimonialCard
  quote="GAMR a transformé notre approche de la gestion des risques."
  author="Marie Dubois"
  role="Directrice des Risques"
  company="TechCorp France"
  avatar={{
    src: '/images/testimonials/marie.jpg',
    alt: 'Marie Dubois',
  }}
  rating={5}
  animationDirection="left"
  animationDelay={200}
/>
```

---

## 3. New Components

### 3.1 AnimatedCounter

**Purpose**: Number counter with animation from start to end value.

**Props Interface**:

```typescript
interface AnimatedCounterProps {
  /** Starting value */
  start?: number;
  /** Ending value */
  end: number;
  /** Animation duration (ms) */
  duration?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "+", "%") */
  suffix?: string;
  /** Easing function */
  easing?: 'linear' | 'ease-out-quad' | 'ease-out-cubic';
  /** Trigger animation on scroll into view */
  triggerOnScroll?: boolean;
  /** Intersection Observer threshold */
  threshold?: number;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Additional CSS classes for the number */
  className?: string;
}
```

**Ref Forwarding**: Yes (`React.forwardRef<HTMLSpanElement>`)

**Usage Example**:

```tsx
<AnimatedCounter
  start={0}
  end={500}
  duration={2000}
  suffix="+"
  triggerOnScroll={true}
  threshold={0.3}
  ariaLabel="500 plus organizations using GAMR"
  className="text-5xl font-bold text-primary"
/>
```

---

### 3.2 FloatingActionButton (FAB)

**Purpose**: Floating action button for "Essai Gratuit" (mobile).

**Props Interface**:

```typescript
interface FloatingActionButtonProps {
  /** Button text */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Link href */
  href?: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Position */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Offset from bottom (px) */
  offsetBottom?: number;
  /** Offset from side (px) */
  offsetSide?: number;
  /** Hide on scroll up */
  hideOnScrollUp?: boolean;
  /** Show only on mobile */
  mobileOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
}
```

**Usage Example**:

```tsx
<FloatingActionButton
  href="/signup"
  icon={<Plus />}
  position="bottom-right"
  offsetBottom={20}
  offsetSide={20}
  mobileOnly={true}
>
  Essai Gratuit
</FloatingActionButton>
```

---

## 4. Base UI Components (Enhanced)

### 4.1 Button (Enhanced)

**Props Interface**:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  /** Enable micro-interactions */
  enableMicroInteractions?: boolean;
}
```

**New Variant**: `glass` - Glassmorphism button

---

### 4.2 Card (Enhanced)

**Props Interface**:

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Enable hover lift effect */
  hoverLift?: boolean;
  /** Enable 3D tilt effect */
  tilt3D?: boolean;
}
```

**New Variant**: `glass` - Glassmorphism card

---

## 5. Component Composition Patterns

### 5.1 FeaturesGrid → FeatureCard

```tsx
<FeaturesGrid>
  {features.map((feature) => (
    <FeatureCard key={feature.id} {...feature} />
  ))}
</FeaturesGrid>
```

### 5.2 SocialProof → AnimatedCounter

```tsx
<SocialProof>
  {statistics.map((stat) => (
    <div key={stat.id}>
      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
      <p>{stat.label}</p>
    </div>
  ))}
</SocialProof>
```

---

## 6. Ref Forwarding Summary

Components that forward refs (for animation hooks):

- ✅ `FeatureCard` - for Intersection Observer
- ✅ `AnimatedCounter` - for scroll trigger
- ✅ `CTAButton` - for focus management
- ✅ `TestimonialCard` - for slide-in animation
- ✅ `FloatingActionButton` - for portal rendering

---

## 7. Accessibility Contracts

### Keyboard Navigation

All interactive components MUST support:

- `Tab`: Focus next element
- `Shift+Tab`: Focus previous element
- `Enter`: Activate button/link
- `Space`: Activate button
- `Escape`: Close modals (if applicable)

### ARIA Requirements

**Animated Content**:

```tsx
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {/* Screen reader announcement */}
</div>
<div aria-hidden="true">
  {/* Visual animated content */}
</div>
```

**Interactive Cards**:

```tsx
<div role="article" tabIndex={0} aria-labelledby="card-title">
  <h3 id="card-title">{title}</h3>
</div>
```

---

## 8. Event Handling Contracts

### Click Events

```typescript
interface ClickEventHandler {
  (event: React.MouseEvent<HTMLElement>): void;
}
```

### Animation Events

```typescript
interface AnimationEventHandler {
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  onInView?: () => void; // Intersection Observer
  onOutOfView?: () => void;
}
```

---

## 9. Performance Contracts

### Lazy Loading

Components that support lazy loading:

- `DemoVideo` - Heavy chart libraries
- `TestimonialCard` - Images
- `FeatureCard` - Images

### Code Splitting

```tsx
// Dynamic import for heavy components
const ChartComponent = dynamic(() => import('./ChartComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});
```

---

## 10. Testing Contracts

### Unit Test Requirements

Each component MUST have tests for:

1. Renders without crashing
2. Props are correctly applied
3. Event handlers are called
4. Accessibility attributes present
5. Reduced motion respected

### Integration Test Requirements

Component interactions:

1. HeroSection → CTAButton clicks
2. FeaturesGrid → FeatureCard hover
3. SocialProof → AnimatedCounter animations

---

**Component Contracts Status**: ✅ COMPLETE | **Date**: October 8, 2025
