# Research: Modern Visual Homepage Transformation

**Feature**: 002-transform-the-gamr  
**Date**: October 8, 2025  
**Purpose**: Resolve technical unknowns and establish implementation patterns for premium animations, glassmorphism effects, and accessibility

---

## 1. Animation Implementation Strategy

### Decision: Hybrid CSS-first with Selective JavaScript

**Rationale**:

- CSS animations and transitions are GPU-accelerated by default and have better performance
- JavaScript needed only for complex scroll-triggered logic and counter animations
- Keeps animation bundle well under 50KB target

**Implementation Pattern**:

```typescript
// CSS for simple animations (transforms, fades, pulses)
.hero-logo {
  animation: float 3s ease-in-out infinite;
  will-change: transform;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

// JavaScript only for:
// 1. Scroll-triggered animations (Intersection Observer)
// 2. Counter animations (requestAnimationFrame)
// 3. Dynamic 3D tilt (mouse tracking)
```

**Alternatives Considered**:

- **Framer Motion**: Rejected - 35KB gzipped, exceeds budget for what we need
- **GSAP**: Rejected - 50KB+ gzipped, overkill for our requirements
- **Pure JavaScript**: Rejected - harder to optimize, CSS is more performant for simple animations
- **CSS-only everything**: Rejected - can't handle scroll triggers and counters effectively

**Best Practices**:

1. Use `transform` and `opacity` for animations (GPU-accelerated)
2. Add `will-change` sparingly and remove after animation
3. Debounce scroll handlers (16ms threshold for 60fps)
4. Use `requestAnimationFrame` for JavaScript animations
5. Limit simultaneous animations to 3-5 elements
6. Avoid animating `width`, `height`, `top`, `left` (causes reflow)

**Performance Targets**:

- Maintain 60fps (16.6ms per frame)
- Animation JavaScript bundle: <20KB gzipped
- No layout shifts (CLS = 0)

---

## 2. Intersection Observer for Scroll Triggers

### Decision: Custom Hook with Configurable Thresholds

**Rationale**:

- Native browser API, no dependencies
- Automatically handles viewport intersection detection
- More performant than scroll event listeners
- Supports staggered animations with threshold configuration

**Implementation Pattern**:

```typescript
// hooks/useIntersectionObserver.ts
interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (options.triggerOnce) {
            observer.disconnect();
          }
        } else if (!options.triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce]);

  return isIntersecting;
}

// Usage in components
const ref = useRef<HTMLDivElement>(null);
const isVisible = useIntersectionObserver(ref, {
  threshold: 0.2,
  triggerOnce: true
});

<div
  ref={ref}
  className={`transition-opacity duration-700 ${
    isVisible ? 'opacity-100' : 'opacity-0'
  }`}
>
```

**Alternatives Considered**:

- **Scroll event listeners**: Rejected - performance overhead, need throttling/debouncing
- **Third-party libraries (AOS, ScrollReveal)**: Rejected - adds unnecessary dependencies
- **CSS-only (scroll-timeline)**: Rejected - poor browser support, experimental API

**Best Practices**:

1. Use `triggerOnce: true` for one-time reveals to disconnect observer
2. Set appropriate thresholds (0.1-0.3 for early triggers, 0.5+ for precise timing)
3. Use `rootMargin` for triggering before element enters viewport
4. Batch DOM reads in observer callback to avoid layout thrashing
5. Disconnect observers in cleanup to prevent memory leaks

---

## 3. Glassmorphism & Modern Visual Effects

### Decision: backdrop-filter with Graceful Fallback

**Rationale**:

- Creates premium frosted-glass effect
- Supported in all modern browsers (95%+ coverage)
- Fallback to semi-transparent solid color is visually acceptable

**Implementation Pattern**:

```css
/* Tailwind config extension */
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
};

/* Component usage */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Fallback for older browsers */
@supports not (backdrop-filter: blur(10px)) {
  .glass-card {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}
```

**Browser Support**:

- ✅ Chrome 76+ (2019)
- ✅ Safari 9+ (2015, with -webkit prefix)
- ✅ Firefox 103+ (2022)
- ✅ Edge 79+ (2020)
- ❌ IE 11 (graceful degradation)

**Performance Considerations**:

- Blur effects are GPU-intensive
- Limit to 3-5 elements with backdrop-filter per page
- Avoid backdrop-filter on elements that scroll or animate
- Use fixed positioning or transform for better performance

**Alternatives Considered**:

- **SVG filters**: Rejected - complex, poor browser support, performance issues
- **Layered semi-transparent divs**: Rejected - doesn't achieve true glassmorphism
- **Canvas-based blur**: Rejected - extreme performance overhead

**Best Practices**:

1. Use `will-change: backdrop-filter` only during animation
2. Apply blur to parent container, not animated child
3. Test on mid-range devices for performance
4. Provide semantic fallback (not just visual)
5. Limit blur radius to 8-12px for optimal performance

---

## 4. Accessibility & Reduced Motion

### Decision: prefers-reduced-motion First with Hook Abstraction

**Rationale**:

- Legal requirement (WCAG 2.1 2.3.3 Animation from Interactions)
- 35% of users have vestibular disorders or motion sensitivity
- CSS media query + React hook provides comprehensive coverage

**Implementation Pattern**:

```typescript
// hooks/useReducedMotion.ts
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// CSS approach (primary)
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// Component usage (for JavaScript animations)
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{
        transition: prefersReducedMotion
          ? 'none'
          : 'transform 0.3s ease',
      }}
    >
  );
}
```

**ARIA Live Regions for Counters**:

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {`${count} organizations using GAMR`}
</div>
<div aria-hidden="true" className="text-4xl font-bold">
  {count}+
</div>
```

**Alternatives Considered**:

- **Disable all animations**: Rejected - removes visual hierarchy
- **Slow down animations**: Rejected - doesn't help vestibular issues
- **User toggle in UI**: Rejected - adds complexity, should respect OS setting

**Best Practices**:

1. Apply reduced motion globally via CSS media query
2. Use hook for conditional JavaScript animation logic
3. Preserve visual hierarchy with instant state changes
4. Test with OS setting: Windows (Settings > Ease of Access), macOS (System Preferences > Accessibility)
5. Announce dynamic content changes to screen readers (ARIA live)
6. Ensure keyboard focus indicators visible during all states

**Keyboard Navigation Requirements**:

- Tab order logical and sequential
- Enter/Space activate buttons
- Escape closes modals/overlays
- Arrow keys for sliders/carousels
- Skip-to-content link for bypassing navigation

---

## 5. Performance Optimization Techniques

### Decision: Multi-layered Optimization Strategy

**Image Optimization**:

```typescript
// next.config.js (already configured)
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
}

// Component usage
<Image
  src="/images/logo.jpg"
  alt="GAMR Logo"
  width={800}
  height={800}
  priority // For hero logo
  quality={90}
  placeholder="blur"
/>
```

**Animation Bundle Optimization**:

1. **Tree-shaking**: Export only used utilities
2. **Code splitting**: Dynamic import heavy animations
3. **Inline critical animations**: Small keyframes in CSS
4. **Defer non-critical**: Load tertiary animations on idle

```typescript
// Dynamic import for heavy features
const ChartAnimation = dynamic(() => import('@/components/ChartAnimation'), { ssr: false });
```

**GPU Acceleration**:

```css
/* Force GPU acceleration */
.accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Optimize will-change (add/remove dynamically) */
.animating {
  will-change: transform, opacity;
}
```

**Preventing Layout Shifts (CLS)**:

1. Reserve space for images with width/height
2. Load fonts with font-display: swap
3. Use CSS aspect-ratio for responsive media
4. Avoid injecting content above fold after load
5. Size skeletons to match final content

**Alternatives Considered**:

- **Lazy load everything**: Rejected - hero needs immediate load
- **Aggressive code splitting**: Rejected - too many requests hurt performance
- **Server-side animation**: Rejected - impossible, animations need client-side

**Best Practices**:

1. Measure first (Lighthouse, WebPageTest)
2. Optimize images (next/image handles this)
3. Minimize JavaScript execution (< 50KB animation bundle)
4. Use performance.now() to monitor frame timing in dev
5. Test on throttled CPU (6x slowdown in DevTools)
6. Monitor Core Web Vitals in production

---

## 6. 3D Transforms & Tilt Effects

### Decision: CSS 3D Transforms with Mouse Tracking

**Rationale**:

- Hardware-accelerated via GPU
- Smooth 60fps performance on modern devices
- Lightweight implementation (<2KB)

**Implementation Pattern**:

```typescript
// hooks/use3DTilt.ts
interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function use3DTilt(options: TiltOptions = {}) {
  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((centerX - x) / centerX) * maxTilt;

    card.style.transform = `
      perspective(${perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale, speed]);

  return ref;
}

// Usage
function FeatureCard() {
  const tiltRef = use3DTilt({ maxTilt: 8, scale: 1.03 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={prefersReducedMotion ? null : tiltRef}>
      {/* Card content */}
    </div>
  );
}
```

**Mobile Considerations**:

- Disable on touch devices (no hover state)
- Use simpler transform on mobile (scale only)
- Test on mid-range Android (check for jank)

**Alternatives Considered**:

- **Device orientation (gyroscope)**: Rejected - requires permissions, battery drain
- **Vanilla-tilt library**: Rejected - 8KB for something we can implement in 2KB
- **2D transform only**: Rejected - doesn't achieve desired 3D effect

**Best Practices**:

1. Limit tilt to 5-10 degrees for subtlety
2. Use cubic-bezier easing for smooth feel
3. Add transform-style: preserve-3d to parent if nesting
4. Disable on reduced-motion preference
5. Don't apply to text-heavy elements (readability)

---

## 7. Parallax Scrolling

### Decision: Transform-based Parallax with Controlled Depth

**Rationale**:

- CSS transforms are GPU-accelerated
- Controlled depth (0.1-0.3) prevents motion sickness
- requestAnimationFrame ensures smooth 60fps

**Implementation Pattern**:

```typescript
// hooks/useParallax.ts
interface ParallaxOptions {
  speed?: number; // 0.1 = slow, 0.5 = fast
  direction?: 'up' | 'down';
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.2, direction = 'up' } = options;
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const scrolled = window.scrollY;
            const multiplier = direction === 'up' ? -1 : 1;
            const offset = scrolled * speed * multiplier;
            ref.current.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, prefersReducedMotion]);

  return ref;
}
```

**Performance Considerations**:

- Use `{ passive: true }` on scroll listeners
- Limit to 1-2 parallax elements (hero section only)
- Avoid parallax on mobile (battery/performance)
- Keep speed factor low (0.1-0.3) to prevent jank

**Alternatives Considered**:

- **Background-attachment: fixed**: Rejected - poor mobile support, not smooth
- **Scroll-timeline API**: Rejected - experimental, no browser support
- **Heavy parallax libraries**: Rejected - unnecessary overhead

**Best Practices**:

1. Apply only to hero section, avoid excessive use
2. Use low speed factor (0.1-0.3) for subtlety
3. Disable on mobile and reduced-motion
4. Apply to background elements only (not foreground content)
5. Test for smoothness on mid-range devices

---

## 8. Font Loading Strategy

### Decision: next/font with Preload and Display Swap

**Rationale**:

- next/font automatically optimizes font loading
- Self-hosting eliminates external requests
- font-display: swap prevents FOIT (Flash of Invisible Text)

**Implementation Pattern**:

```typescript
// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
```

```css
/* globals.css */
:root {
  --font-inter: 'Inter', sans-serif;
  --font-poppins: 'Poppins', sans-serif;
}

body {
  font-family: var(--font-inter);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-poppins);
}
```

**Alternatives Considered**:

- **Google Fonts CDN**: Rejected - external request, GDPR concerns, slower
- **Self-hosted manually**: Rejected - next/font does this automatically with optimization
- **System fonts only**: Rejected - doesn't achieve desired premium aesthetic

**Best Practices**:

1. Use `display: 'swap'` to show fallback immediately
2. Preload only critical fonts (avoid over-preloading)
3. Limit font weights to those actually used
4. Subset to required character sets (latin for French)
5. Use variable fonts if available (not needed for Inter/Poppins)

---

## 9. Counter Animation Technique

### Decision: requestAnimationFrame with Easing Function

**Rationale**:

- Smooth animation at 60fps
- Easy to customize duration and easing
- Works with Intersection Observer for scroll trigger
- Accessible with ARIA live regions

**Implementation Pattern**:

```typescript
// hooks/useAnimatedCounter.ts
interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number; // milliseconds
  easing?: (t: number) => number;
}

export function useAnimatedCounter(options: UseAnimatedCounterOptions) {
  const { start = 0, end, duration = 2000, easing = easeOutQuad } = options;
  const [count, setCount] = useState(start);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easing(progress);
      const currentCount = Math.floor(start + (end - start) * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration, easing, prefersReducedMotion]);

  return count;
}

// Easing functions
function easeOutQuad(t: number): number {
  return t * (2 - t);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Usage
function StatCard({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { triggerOnce: true });
  const count = useAnimatedCounter({
    start: 0,
    end: isVisible ? value : 0,
    duration: 2000,
    easing: easeOutCubic,
  });

  return (
    <div ref={ref}>
      <span className="text-4xl font-bold">{count}+</span>
      <span className="sr-only" aria-live="polite">
        {count} organizations using GAMR
      </span>
    </div>
  );
}
```

**Alternatives Considered**:

- **setInterval**: Rejected - not frame-synchronized, can drift
- **CSS counter**: Rejected - no browser support for animated counters
- **Count-up libraries**: Rejected - 5KB for something simple

**Best Practices**:

1. Use easing functions for natural feel
2. Duration 1.5-2.5s for readability
3. Round to integers for whole numbers
4. Include ARIA live region for screen readers
5. Trigger only once on scroll-in (don't re-animate on scroll-out)

---

## Summary & Implementation Checklist

### Key Decisions Made

- ✅ **Animation Strategy**: CSS-first with selective JavaScript
- ✅ **Scroll Triggers**: Intersection Observer with custom hook
- ✅ **Glassmorphism**: backdrop-filter with fallback
- ✅ **Accessibility**: prefers-reduced-motion + ARIA live regions
- ✅ **Performance**: GPU acceleration, image optimization, <50KB bundle
- ✅ **3D Effects**: CSS transforms with mouse tracking
- ✅ **Parallax**: Transform-based with controlled depth
- ✅ **Fonts**: next/font with display swap
- ✅ **Counters**: requestAnimationFrame with easing

### No NEEDS CLARIFICATION Remaining

All technical unknowns have been resolved with concrete implementation patterns.

### Next Phase

Proceed to Phase 1: Design & Contracts

- Generate data-model.md
- Define component contracts
- Create animation utility contracts
- Write quickstart guide

---

**Research Status**: ✅ COMPLETE | **Date**: October 8, 2025
