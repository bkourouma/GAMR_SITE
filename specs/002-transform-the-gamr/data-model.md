# Data Model: Modern Visual Homepage Transformation

**Feature**: 002-transform-the-gamr  
**Date**: October 8, 2025  
**Purpose**: Define data entities for visual assets, animations, design tokens, and statistics

---

## Overview

This data model defines the logical entities for the homepage transformation. Since this is a frontend-only feature with no backend persistence, these entities represent TypeScript types and configuration objects used in the application code.

---

## Entity Diagram

```
┌─────────────────┐
│  ColorToken     │
└────────┬────────┘
         │
         │ uses
         │
┌────────▼────────────────────┐
│  AnimationConfiguration     │
└────────┬────────────────────┘
         │
         │ configures
         │
┌────────▼────────┐      ┌──────────────────┐
│  VisualAsset    │      │ StatisticCounter │
└─────────────────┘      └──────────────────┘
```

---

## 1. ColorToken

**Purpose**: Represents design system colors with semantic naming for consistent theming.

### Attributes

| Field         | Type   | Required | Description                                    | Example           |
| ------------- | ------ | -------- | ---------------------------------------------- | ----------------- |
| name          | string | Yes      | Semantic name for the color                    | "primary"         |
| value         | string | Yes      | Hex color value                                | "#0A2463"         |
| rgb           | string | No       | RGB representation for alpha variations        | "10, 36, 99"      |
| category      | string | Yes      | Color category (primary/secondary/accent/etc.) | "primary"         |
| usage         | string | No       | Guidelines for when to use this color          | "Hero background" |
| contrastRatio | number | No       | WCAG contrast ratio against white              | 12.3              |
| tailwindClass | string | No       | Corresponding Tailwind class name              | "bg-primary"      |

### Validation Rules

- `value` MUST be valid hex color (#RRGGBB format)
- `name` MUST be unique within the design system
- `category` MUST be one of: primary, secondary, accent, success, warning, background, text
- `contrastRatio` if provided MUST be ≥ 4.5 for WCAG AA compliance (normal text)

### Example

```typescript
const colorTokens: ColorToken[] = [
  {
    name: 'primary',
    value: '#0A2463',
    rgb: '10, 36, 99',
    category: 'primary',
    usage: 'Hero background, primary buttons, main navigation',
    contrastRatio: 12.3,
    tailwindClass: 'bg-primary',
  },
  {
    name: 'secondary',
    value: '#247BA0',
    rgb: '36, 123, 160',
    category: 'secondary',
    usage: 'Hero gradient, secondary buttons, accents',
    contrastRatio: 4.8,
    tailwindClass: 'bg-secondary',
  },
];
```

### Related Entities

- **AnimationConfiguration**: Uses ColorToken for color-based animations
- **VisualAsset**: May reference ColorToken for overlays/tints

---

## 2. AnimationConfiguration

**Purpose**: Defines animation behavior settings for consistent, reusable animation patterns.

### Attributes

| Field           | Type                | Required | Description                             | Example                         |
| --------------- | ------------------- | -------- | --------------------------------------- | ------------------------------- |
| name            | string              | Yes      | Unique identifier for the animation     | "heroFadeIn"                    |
| type            | AnimationType       | Yes      | Animation category                      | "scroll-triggered"              |
| duration        | number              | Yes      | Animation duration in milliseconds      | 700                             |
| delay           | number              | No       | Delay before animation starts (ms)      | 200                             |
| easing          | EasingFunction      | Yes      | Timing function name or custom function | "ease-out"                      |
| properties      | string[]            | Yes      | CSS properties to animate               | ["opacity", "transform"]        |
| trigger         | TriggerCondition    | Yes      | When to start animation                 | "scroll-into-view"              |
| threshold       | number              | No       | Intersection Observer threshold (0-1)   | 0.2                             |
| triggerOnce     | boolean             | No       | Whether animation repeats on scroll     | true                            |
| reducedMotion   | ReducedMotionConfig | No       | Alternative behavior for reduced motion | { disable: false, duration: 0 } |
| gpuAcceleration | boolean             | No       | Force GPU acceleration (transform3d)    | true                            |

### Enums

```typescript
enum AnimationType {
  SCROLL_TRIGGERED = 'scroll-triggered',
  HOVER = 'hover',
  LOAD = 'load',
  INTERACTION = 'interaction',
  CONTINUOUS = 'continuous', // e.g., floating animation
}

enum TriggerCondition {
  SCROLL_INTO_VIEW = 'scroll-into-view',
  HOVER = 'hover',
  CLICK = 'click',
  IMMEDIATE = 'immediate', // On mount
  IDLE = 'idle', // After user idle period
}

type EasingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'ease-out-quad'
  | 'ease-out-cubic'
  | string; // Custom cubic-bezier
```

### Nested Types

```typescript
interface ReducedMotionConfig {
  disable: boolean; // If true, animation is completely disabled
  duration?: number; // Override duration (0 for instant)
  properties?: string[]; // Override properties (e.g., opacity only)
}
```

### Validation Rules

- `duration` MUST be 0-5000ms (max 5 seconds)
- `delay` MUST be 0-2000ms
- `threshold` MUST be 0-1 (Intersection Observer range)
- `properties` MUST contain at least one CSS property
- `easing` if custom MUST be valid cubic-bezier format
- For `type: 'scroll-triggered'`, `threshold` is REQUIRED

### Example

```typescript
const animationConfigs: AnimationConfiguration[] = [
  {
    name: 'fadeInOnScroll',
    type: AnimationType.SCROLL_TRIGGERED,
    duration: 700,
    delay: 0,
    easing: 'ease-out',
    properties: ['opacity', 'transform'],
    trigger: TriggerCondition.SCROLL_INTO_VIEW,
    threshold: 0.2,
    triggerOnce: true,
    reducedMotion: {
      disable: false,
      duration: 0, // Instant appearance
      properties: ['opacity'], // Only fade, no transform
    },
    gpuAcceleration: true,
  },
  {
    name: 'heroLogoFloat',
    type: AnimationType.CONTINUOUS,
    duration: 3000,
    easing: 'ease-in-out',
    properties: ['transform'],
    trigger: TriggerCondition.IMMEDIATE,
    reducedMotion: {
      disable: true, // Completely disable floating
    },
    gpuAcceleration: true,
  },
];
```

### Related Entities

- **VisualAsset**: Uses AnimationConfiguration for image animations
- **StatisticCounter**: Uses AnimationConfiguration for counter animations

---

## 3. VisualAsset

**Purpose**: Represents images, icons, and media files with optimization settings and loading priorities.

### Attributes

| Field       | Type          | Required | Description                            | Example                   |
| ----------- | ------------- | -------- | -------------------------------------- | ------------------------- |
| id          | string        | Yes      | Unique identifier                      | "hero-logo"               |
| path        | string        | Yes      | File path relative to public directory | "/images/logo.jpg"        |
| alt         | string        | Yes      | Descriptive alt text for accessibility | "GAMR platform logo"      |
| width       | number        | Yes      | Intrinsic width in pixels              | 800                       |
| height      | number        | Yes      | Intrinsic height in pixels             | 800                       |
| format      | ImageFormat[] | No       | Supported formats (auto-negotiated)    | ["webp", "avif", "jpg"]   |
| quality     | number        | No       | Compression quality (1-100)            | 90                        |
| priority    | boolean       | No       | Whether to preload (for above-fold)    | true                      |
| lazy        | boolean       | No       | Whether to lazy load                   | false                     |
| placeholder | string        | No       | Placeholder strategy                   | "blur"                    |
| blurDataURL | string        | No       | Base64 blur placeholder                | "data:image/jpeg;base64…" |
| animation   | string        | No       | AnimationConfiguration name to apply   | "heroLogoFloat"           |
| overlay     | Overlay       | No       | Gradient overlay settings              | { type: 'gradient', … }   |
| role        | AssetRole     | Yes      | Functional role in the design          | "hero-primary"            |

### Enums

```typescript
enum ImageFormat {
  WEBP = 'webp',
  AVIF = 'avif',
  JPEG = 'jpeg',
  PNG = 'png',
  SVG = 'svg',
}

enum AssetRole {
  HERO_PRIMARY = 'hero-primary',
  HERO_BACKGROUND = 'hero-background',
  FEATURE_ICON = 'feature-icon',
  TESTIMONIAL_AVATAR = 'testimonial-avatar',
  DECORATIVE = 'decorative',
}
```

### Nested Types

```typescript
interface Overlay {
  type: 'gradient' | 'solid' | 'none';
  colors?: string[]; // For gradient
  opacity?: number; // 0-1
  blendMode?: string; // CSS blend mode
}
```

### Validation Rules

- `path` MUST be valid file path starting with "/"
- `alt` MUST be descriptive (min 5 characters) unless `role` is "decorative"
- `width` and `height` MUST be > 0
- `quality` MUST be 1-100
- `priority` and `lazy` MUST NOT both be true
- For hero images, `priority` SHOULD be true
- `animation` if provided MUST reference existing AnimationConfiguration

### Example

```typescript
const visualAssets: VisualAsset[] = [
  {
    id: 'hero-logo',
    path: '/images/logo.jpg',
    alt: 'GAMR - Platform for Business Risk Management and Analysis',
    width: 800,
    height: 800,
    format: [ImageFormat.AVIF, ImageFormat.WEBP, ImageFormat.JPEG],
    quality: 90,
    priority: true, // Above the fold
    lazy: false,
    placeholder: 'blur',
    animation: 'heroLogoFloat',
    role: AssetRole.HERO_PRIMARY,
  },
  {
    id: 'feature-security-icon',
    path: '/icons/security.svg',
    alt: 'Security shield icon representing GAMR security features',
    width: 64,
    height: 64,
    priority: false,
    lazy: true,
    role: AssetRole.FEATURE_ICON,
    animation: 'iconScaleOnHover',
  },
];
```

### Related Entities

- **AnimationConfiguration**: Defines how asset animates
- **ColorToken**: May be used in overlays

---

## 4. StatisticCounter

**Purpose**: Represents numerical data points displayed with animation (e.g., "500+ organizations").

### Attributes

| Field            | Type   | Required | Description                              | Example                    |
| ---------------- | ------ | -------- | ---------------------------------------- | -------------------------- |
| id               | string | Yes      | Unique identifier                        | "organizations-count"      |
| label            | string | Yes      | Text label describing the statistic      | "Organizations using GAMR" |
| startValue       | number | Yes      | Starting number for animation            | 0                          |
| endValue         | number | Yes      | Final number to display                  | 500                        |
| duration         | number | No       | Animation duration in ms (default: 2000) | 2000                       |
| suffix           | string | No       | Text to append after number              | "+"                        |
| prefix           | string | No       | Text to prepend before number            | "$"                        |
| decimals         | number | No       | Number of decimal places to show         | 0                          |
| easing           | string | No       | Easing function for animation            | "ease-out-cubic"           |
| formatFn         | string | No       | Custom format function name              | "formatWithCommas"         |
| animationTrigger | string | Yes      | When to start animation                  | "scroll-into-view"         |
| threshold        | number | No       | Intersection Observer threshold          | 0.3                        |
| ariaLabel        | string | Yes      | Full text for screen readers             | "500 organizations..."     |
| category         | string | No       | Statistical category                     | "social-proof"             |

### Validation Rules

- `startValue` MUST be < `endValue`
- `duration` MUST be 500-5000ms
- `decimals` MUST be 0-2
- `threshold` MUST be 0-1
- `ariaLabel` MUST be descriptive sentence
- `easing` MUST be valid easing function name
- `animationTrigger` MUST be one of: "scroll-into-view", "immediate", "hover"

### Example

```typescript
const statisticCounters: StatisticCounter[] = [
  {
    id: 'organizations-count',
    label: 'Organizations using GAMR',
    startValue: 0,
    endValue: 500,
    duration: 2000,
    suffix: '+',
    prefix: '',
    decimals: 0,
    easing: 'ease-out-cubic',
    formatFn: 'formatInteger',
    animationTrigger: 'scroll-into-view',
    threshold: 0.3,
    ariaLabel: '500 plus organizations currently using the GAMR platform',
    category: 'social-proof',
  },
  {
    id: 'security-index',
    label: 'Average Security Index',
    startValue: 0,
    endValue: 8.7,
    duration: 2500,
    suffix: '/10',
    decimals: 1,
    easing: 'ease-out-quad',
    formatFn: 'formatDecimal',
    animationTrigger: 'scroll-into-view',
    threshold: 0.4,
    ariaLabel: 'Average security index score of 8.7 out of 10',
    category: 'performance-metric',
  },
];
```

### Related Entities

- **AnimationConfiguration**: Defines counter animation behavior

---

## Entity Relationships

### ColorToken → AnimationConfiguration

- ColorTokens provide values for color-based animations
- Relationship: One ColorToken can be used by many AnimationConfigurations

### AnimationConfiguration → VisualAsset

- AnimationConfigurations define how VisualAssets animate
- Relationship: One AnimationConfiguration can be applied to many VisualAssets
- Relationship: One VisualAsset can have one AnimationConfiguration (optional)

### AnimationConfiguration → StatisticCounter

- AnimationConfigurations define easing/timing for StatisticCounter animations
- Relationship: One AnimationConfiguration pattern can be referenced by many StatisticCounters

---

## Implementation Notes

### TypeScript Type Definitions

All entities will be defined in TypeScript with strict typing:

```typescript
// types/design-system.ts
export interface ColorToken {
  name: string;
  value: string;
  rgb?: string;
  category: ColorCategory;
  usage?: string;
  contrastRatio?: number;
  tailwindClass?: string;
}

// types/animations.ts
export interface AnimationConfiguration {
  name: string;
  type: AnimationType;
  duration: number;
  delay?: number;
  easing: EasingFunction;
  properties: string[];
  trigger: TriggerCondition;
  threshold?: number;
  triggerOnce?: boolean;
  reducedMotion?: ReducedMotionConfig;
  gpuAcceleration?: boolean;
}

// types/index.ts
export interface VisualAsset {
  id: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  format?: ImageFormat[];
  quality?: number;
  priority?: boolean;
  lazy?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  animation?: string;
  overlay?: Overlay;
  role: AssetRole;
}

export interface StatisticCounter {
  id: string;
  label: string;
  startValue: number;
  endValue: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  easing?: string;
  formatFn?: string;
  animationTrigger: string;
  threshold?: number;
  ariaLabel: string;
  category?: string;
}
```

### Data Storage

Since this is frontend-only:

- **ColorTokens**: Defined in `lib/design-tokens.ts` as constants
- **AnimationConfigurations**: Defined in `lib/animations.ts` as constants
- **VisualAssets**: Defined in component files or `lib/constants.ts`
- **StatisticCounters**: Defined in `lib/stats.ts` (might already exist) or component files

### Validation

Validation will be handled via:

1. TypeScript strict mode (compile-time)
2. Zod schemas for runtime validation (if needed)
3. ESLint rules for best practices

---

## Data Flow

```
1. Design Tokens (ColorToken) → Tailwind Config
2. AnimationConfiguration → Custom Hooks (useIntersectionObserver, etc.)
3. VisualAsset → next/image Component
4. StatisticCounter → AnimatedCounter Component
```

---

**Data Model Status**: ✅ COMPLETE | **Date**: October 8, 2025
