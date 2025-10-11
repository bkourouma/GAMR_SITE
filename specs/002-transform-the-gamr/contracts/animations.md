# Animation Utilities Contracts: Modern Visual Homepage Transformation

**Feature**: 002-transform-the-gamr  
**Date**: October 8, 2025  
**Purpose**: Define APIs for custom hooks, animation utilities, and helper functions

---

## Overview

This document defines the TypeScript interfaces and function signatures for all animation-related utilities, custom React hooks, and helper functions used throughout the homepage transformation.

---

## 1. Custom Hooks

### 1.1 useIntersectionObserver

**Purpose**: Detect when an element enters the viewport for scroll-triggered animations.

**Signature**:

```typescript
interface UseIntersectionObserverOptions {
  /** Intersection threshold (0-1) */
  threshold?: number | number[];
  /** Root element (null for viewport) */
  root?: Element | null;
  /** Root margin offset */
  rootMargin?: string;
  /** Trigger only once */
  triggerOnce?: boolean;
  /** Initial state */
  initialIsIntersecting?: boolean;
}

function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: UseIntersectionObserverOptions
): boolean;
```

**Parameters**:

- `ref`: React ref object pointing to the element to observe
- `options`: Configuration object

**Returns**: `boolean` - `true` when element is intersecting viewport

**Usage Example**:

```tsx
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: '50px',
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}
```

**Implementation Notes**:

- Disconnects observer if `triggerOnce` is true
- Returns `initialIsIntersecting` before mounting (SSR compatibility)
- Cleans up observer on unmount

---

### 1.2 useAnimatedCounter

**Purpose**: Animate a number from start to end value with easing.

**Signature**:

```typescript
interface UseAnimatedCounterOptions {
  /** Starting value */
  start?: number;
  /** Ending value */
  end: number;
  /** Animation duration (ms) */
  duration?: number;
  /** Easing function */
  easing?: (t: number) => number;
  /** Number of decimal places */
  decimals?: number;
  /** Format function for display */
  formatFn?: (value: number) => string;
}

function useAnimatedCounter(options: UseAnimatedCounterOptions): number;
```

**Parameters**:

- `options`: Configuration object

**Returns**: `number` - Current counter value

**Usage Example**:

```tsx
function StatisticCard({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { triggerOnce: true });

  const count = useAnimatedCounter({
    start: 0,
    end: isVisible ? value : 0,
    duration: 2000,
    easing: easeOutCubic,
    decimals: 0,
  });

  return (
    <div ref={ref}>
      <span className="text-5xl font-bold">{count}+</span>
    </div>
  );
}
```

**Implementation Notes**:

- Uses `requestAnimationFrame` for smooth 60fps
- Respects `prefers-reduced-motion` (returns end value immediately)
- Cleans up animation on unmount

---

### 1.3 useReducedMotion

**Purpose**: Detect user's motion preference setting.

**Signature**:

```typescript
function useReducedMotion(): boolean;
```

**Parameters**: None

**Returns**: `boolean` - `true` if user prefers reduced motion

**Usage Example**:

```tsx
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={
        prefersReducedMotion
          ? 'opacity-100' // No animation
          : 'animate-fade-in' // With animation
      }
    >
      Content
    </div>
  );
}
```

**Implementation Notes**:

- Listens to `(prefers-reduced-motion: reduce)` media query
- Updates dynamically if user changes system setting
- Returns `false` on server (SSR)

---

### 1.4 useParallax

**Purpose**: Apply parallax scroll effect to an element.

**Signature**:

```typescript
interface UseParallaxOptions {
  /** Parallax speed (0.1 = slow, 0.5 = fast) */
  speed?: number;
  /** Scroll direction */
  direction?: 'up' | 'down';
  /** Disable on mobile */
  disableOnMobile?: boolean;
}

function useParallax(options?: UseParallaxOptions): RefObject<HTMLElement>;
```

**Parameters**:

- `options`: Configuration object

**Returns**: `RefObject<HTMLElement>` - Ref to attach to the element

**Usage Example**:

```tsx
function HeroBackground() {
  const parallaxRef = useParallax({
    speed: 0.3,
    direction: 'up',
    disableOnMobile: true,
  });

  return (
    <div ref={parallaxRef} className="absolute inset-0 bg-gradient">
      {/* Background content */}
    </div>
  );
}
```

**Implementation Notes**:

- Uses `requestAnimationFrame` for smooth scrolling
- Respects `prefers-reduced-motion` (no effect)
- Passive scroll listener for performance
- Automatically disables on mobile if configured

---

### 1.5 use3DTilt

**Purpose**: Apply 3D tilt effect on mouse move.

**Signature**:

```typescript
interface Use3DTiltOptions {
  /** Maximum tilt angle (degrees) */
  maxTilt?: number;
  /** CSS perspective value */
  perspective?: number;
  /** Scale on tilt */
  scale?: number;
  /** Transition speed (ms) */
  speed?: number;
  /** Disable on touch devices */
  disableOnTouch?: boolean;
}

function use3DTilt(options?: Use3DTiltOptions): RefObject<HTMLDivElement>;
```

**Parameters**:

- `options`: Configuration object

**Returns**: `RefObject<HTMLDivElement>` - Ref to attach to the element

**Usage Example**:

```tsx
function FeatureCard() {
  const tiltRef = use3DTilt({
    maxTilt: 8,
    scale: 1.03,
    speed: 400,
    disableOnTouch: true,
  });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={prefersReducedMotion ? null : tiltRef} className="card">
      {/* Card content */}
    </div>
  );
}
```

**Implementation Notes**:

- Calculates tilt based on mouse position relative to element center
- Resets to 0 on mouse leave
- Respects `prefers-reduced-motion`
- Automatically disabled on touch devices if configured

---

### 1.6 useScrollBlur

**Purpose**: Apply blur effect to navigation on scroll.

**Signature**:

```typescript
interface UseScrollBlurOptions {
  /** Scroll threshold to trigger blur (px) */
  threshold?: number;
  /** Blur amount (px) */
  blurAmount?: number;
}

function useScrollBlur(options?: UseScrollBlurOptions): {
  isScrolled: boolean;
  ref: RefObject<HTMLElement>;
};
```

**Parameters**:

- `options`: Configuration object

**Returns**: Object with `isScrolled` boolean and `ref` to attach

**Usage Example**:

```tsx
function Header() {
  const { isScrolled, ref } = useScrollBlur({
    threshold: 100,
    blurAmount: 10,
  });

  return (
    <header
      ref={ref}
      className={`sticky top-0 transition-all ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Navigation */}
    </header>
  );
}
```

**Implementation Notes**:

- Uses passive scroll listener
- Debounced for performance
- Returns boolean for CSS class control

---

## 2. Easing Functions

**Purpose**: Mathematical functions for smooth animation timing.

**Signature**:

```typescript
type EasingFunction = (t: number) => number;

// Linear
function linear(t: number): number;

// Quadratic
function easeInQuad(t: number): number;
function easeOutQuad(t: number): number;
function easeInOutQuad(t: number): number;

// Cubic
function easeInCubic(t: number): number;
function easeOutCubic(t: number): number;
function easeInOutCubic(t: number): number;

// Quartic
function easeInQuart(t: number): number;
function easeOutQuart(t: number): number;
function easeInOutQuart(t: number): number;

// Elastic
function easeOutElastic(t: number): number;

// Back
function easeOutBack(t: number): number;
```

**Parameters**:

- `t`: Progress value from 0 to 1

**Returns**: Eased value from 0 to 1

**Usage Example**:

```typescript
const count = useAnimatedCounter({
  end: 500,
  easing: easeOutCubic, // Smooth deceleration
});
```

**Implementation Reference**:

```typescript
// Linear - no easing
export function linear(t: number): number {
  return t;
}

// Quadratic ease out - decelerating
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

// Cubic ease out - strong deceleration
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Elastic ease out - bouncy end
export function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

// Back ease out - slight overshoot
export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
```

---

## 3. Animation Utility Functions

### 3.1 staggerDelay

**Purpose**: Calculate staggered animation delays for sequential animations.

**Signature**:

```typescript
function staggerDelay(index: number, baseDelay?: number): number;
```

**Parameters**:

- `index`: Element index in the list
- `baseDelay`: Base delay per element (default: 100ms)

**Returns**: Delay in milliseconds

**Usage Example**:

```tsx
{
  testimonials.map((testimonial, index) => (
    <TestimonialCard
      key={testimonial.id}
      animationDelay={staggerDelay(index, 150)}
      {...testimonial}
    />
  ));
}
```

**Implementation**:

```typescript
export function staggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}
```

---

### 3.2 getAnimationDuration

**Purpose**: Get animation duration based on element size or content.

**Signature**:

```typescript
function getAnimationDuration(
  contentLength: number,
  minDuration?: number,
  maxDuration?: number
): number;
```

**Parameters**:

- `contentLength`: Length of content (characters, items, etc.)
- `minDuration`: Minimum duration (default: 500ms)
- `maxDuration`: Maximum duration (default: 3000ms)

**Returns**: Duration in milliseconds

**Usage Example**:

```typescript
const duration = getAnimationDuration(text.length, 1000, 2500);
```

**Implementation**:

```typescript
export function getAnimationDuration(
  contentLength: number,
  minDuration: number = 500,
  maxDuration: number = 3000
): number {
  const baseDuration = contentLength * 10; // 10ms per character
  return Math.min(Math.max(baseDuration, minDuration), maxDuration);
}
```

---

### 3.3 interpolate

**Purpose**: Interpolate between two values with easing.

**Signature**:

```typescript
function interpolate(start: number, end: number, progress: number, easing?: EasingFunction): number;
```

**Parameters**:

- `start`: Starting value
- `end`: Ending value
- `progress`: Progress from 0 to 1
- `easing`: Easing function (default: linear)

**Returns**: Interpolated value

**Usage Example**:

```typescript
const currentValue = interpolate(0, 500, 0.5, easeOutQuad);
// Returns 375 (with easeOutQuad)
```

**Implementation**:

```typescript
export function interpolate(
  start: number,
  end: number,
  progress: number,
  easing: EasingFunction = linear
): number {
  const easedProgress = easing(progress);
  return start + (end - start) * easedProgress;
}
```

---

### 3.4 clamp

**Purpose**: Constrain a value between min and max.

**Signature**:

```typescript
function clamp(value: number, min: number, max: number): number;
```

**Parameters**:

- `value`: Value to clamp
- `min`: Minimum value
- `max`: Maximum value

**Returns**: Clamped value

**Usage Example**:

```typescript
const rotation = clamp(mouseX * 0.1, -15, 15);
// Limits rotation to ±15 degrees
```

**Implementation**:

```typescript
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

---

### 3.5 debounce

**Purpose**: Debounce function calls for performance.

**Signature**:

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;
```

**Parameters**:

- `func`: Function to debounce
- `wait`: Wait time in milliseconds

**Returns**: Debounced function

**Usage Example**:

```typescript
const handleScroll = debounce(() => {
  // Expensive scroll handler
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);
```

**Implementation**:

```typescript
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
```

---

### 3.6 formatNumber

**Purpose**: Format numbers with decimals, prefixes, and suffixes.

**Signature**:

```typescript
interface FormatNumberOptions {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
}

function formatNumber(value: number, options?: FormatNumberOptions): string;
```

**Parameters**:

- `value`: Number to format
- `options`: Formatting options

**Returns**: Formatted string

**Usage Example**:

```typescript
formatNumber(1234.5, { decimals: 1, suffix: '+' });
// Returns "1234.5+"

formatNumber(1000000, { prefix: '$', decimals: 0 });
// Returns "$1,000,000"
```

**Implementation**:

```typescript
export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  const { decimals = 0, prefix = '', suffix = '', locale = 'fr-FR' } = options;

  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formatted}${suffix}`;
}
```

---

## 4. CSS Animation Utilities

### 4.1 getTransformValue

**Purpose**: Generate CSS transform string from individual values.

**Signature**:

```typescript
interface TransformValues {
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
}

function getTransformValue(values: TransformValues): string;
```

**Parameters**:

- `values`: Object with transform properties

**Returns**: CSS transform string

**Usage Example**:

```typescript
const transform = getTransformValue({
  translateY: -10,
  rotateX: 5,
  scale: 1.05,
});
// Returns "translateY(-10px) rotateX(5deg) scale(1.05)"

element.style.transform = transform;
```

**Implementation**:

```typescript
export function getTransformValue(values: TransformValues): string {
  const transforms: string[] = [];

  if (values.translateX !== undefined) {
    const unit = typeof values.translateX === 'number' ? 'px' : '';
    transforms.push(`translateX(${values.translateX}${unit})`);
  }
  if (values.translateY !== undefined) {
    const unit = typeof values.translateY === 'number' ? 'px' : '';
    transforms.push(`translateY(${values.translateY}${unit})`);
  }
  if (values.translateZ !== undefined) {
    const unit = typeof values.translateZ === 'number' ? 'px' : '';
    transforms.push(`translateZ(${values.translateZ}${unit})`);
  }
  if (values.rotateX !== undefined) {
    transforms.push(`rotateX(${values.rotateX}deg)`);
  }
  if (values.rotateY !== undefined) {
    transforms.push(`rotateY(${values.rotateY}deg)`);
  }
  if (values.rotateZ !== undefined) {
    transforms.push(`rotateZ(${values.rotateZ}deg)`);
  }
  if (values.scale !== undefined) {
    transforms.push(`scale(${values.scale})`);
  } else {
    if (values.scaleX !== undefined) {
      transforms.push(`scaleX(${values.scaleX})`);
    }
    if (values.scaleY !== undefined) {
      transforms.push(`scaleY(${values.scaleY})`);
    }
  }

  return transforms.join(' ');
}
```

---

## 5. Performance Utilities

### 5.1 requestIdleCallback (Polyfill)

**Purpose**: Schedule low-priority work during idle periods.

**Signature**:

```typescript
function requestIdleCallback(callback: () => void): number;
function cancelIdleCallback(id: number): void;
```

**Usage Example**:

```typescript
const id = requestIdleCallback(() => {
  // Non-critical animation setup
  preloadImages();
});

// Later, if needed
cancelIdleCallback(id);
```

---

### 5.2 measurePerformance

**Purpose**: Measure animation frame timing.

**Signature**:

```typescript
interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  dropped: number;
}

function measurePerformance(duration?: number): Promise<PerformanceMetrics>;
```

**Parameters**:

- `duration`: Measurement duration in ms (default: 1000)

**Returns**: Promise resolving to performance metrics

**Usage Example**:

```typescript
const metrics = await measurePerformance(2000);
console.log(`FPS: ${metrics.fps}, Dropped: ${metrics.dropped}`);
```

---

## 6. Type Exports

**Summary of all types exported from animation utilities**:

```typescript
// From lib/animations.ts
export type { EasingFunction, TransformValues, PerformanceMetrics };

export {
  // Easing functions
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeOutElastic,
  easeOutBack,

  // Utility functions
  staggerDelay,
  getAnimationDuration,
  interpolate,
  clamp,
  debounce,
  formatNumber,
  getTransformValue,
  measurePerformance,
};

// From hooks/
export {
  useIntersectionObserver,
  useAnimatedCounter,
  useReducedMotion,
  useParallax,
  use3DTilt,
  useScrollBlur,
};

export type {
  UseIntersectionObserverOptions,
  UseAnimatedCounterOptions,
  UseParallaxOptions,
  Use3DTiltOptions,
  UseScrollBlurOptions,
};
```

---

## 7. Testing Contracts

### Unit Test Requirements

Each hook/utility MUST have tests for:

1. Correct return values
2. Edge cases (0, negative, very large values)
3. Cleanup on unmount (for hooks)
4. Reduced motion handling
5. SSR compatibility (hooks)

### Mock Requirements

```typescript
// For testing hooks that use browser APIs
export const mockIntersectionObserver = jest.fn();
export const mockRequestAnimationFrame = jest.fn();
export const mockMatchMedia = jest.fn();
```

---

**Animation Utilities Status**: ✅ COMPLETE | **Date**: October 8, 2025
