# Quickstart Guide: Modern Visual Homepage Transformation

**Feature**: 002-transform-the-gamr  
**Date**: October 8, 2025  
**Purpose**: Setup guide and development workflow for implementing the homepage transformation

---

## Prerequisites

### Required Software

- **Node.js**: v20.x or later
- **pnpm**: v8.x or later (package manager)
- **Git**: Latest version
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Recommended Tools

- **Chrome DevTools** or **Firefox DevTools** (for debugging)
- **Lighthouse CI** (for performance testing)
- **React Developer Tools** (browser extension)
- **Playwright Test** (for E2E testing, already configured)

---

## Initial Setup

### 1. Clone and Install

```bash
# Ensure you're on the feature branch
git checkout 002-transform-the-gamr

# Install dependencies
pnpm install

# Verify installation
pnpm run type-check
pnpm run lint
```

### 2. Environment Configuration

No environment variables are required for this feature. The project uses default Next.js configuration.

### 3. Verify Existing Assets

```bash
# Check that the logo exists
ls public/images/logo.jpg

# If missing, add a high-quality logo image (800x800px recommended)
```

---

## Development Workflow

### 1. Start Development Server

```bash
# Start Next.js development server
pnpm run dev

# Server will start at http://localhost:3000
```

### 2. Enable Hot Reload

The development server supports Fast Refresh. Changes to components will automatically reload in the browser.

### 3. Run Type Checking (in Watch Mode)

```bash
# In a separate terminal
pnpm run type-check --watch
```

### 4. Run Linting

```bash
# Check for linting errors
pnpm run lint

# Auto-fix linting errors
pnpm run lint --fix

# Format code with Prettier
pnpm run format
```

---

## Project Structure Overview

```
src/
├── app/
│   ├── page.tsx              # Homepage - main entry point
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles + Tailwind
│
├── components/
│   ├── home/                 # Homepage-specific sections
│   ├── layout/               # Header, Footer
│   ├── shared/               # Reusable components
│   └── ui/                   # Base UI primitives
│
├── hooks/                    # Custom React hooks (NEW)
│   ├── useIntersectionObserver.ts
│   ├── useAnimatedCounter.ts
│   ├── useReducedMotion.ts
│   ├── useParallax.ts
│   ├── use3DTilt.ts
│   └── useScrollBlur.ts
│
├── lib/
│   ├── animations.ts         # Animation utilities (NEW)
│   ├── design-tokens.ts      # Color palette, spacing (NEW)
│   ├── constants.ts          # Existing constants (ENHANCE)
│   └── utils.ts              # Existing utilities
│
├── types/
│   ├── animations.ts         # Animation types (NEW)
│   ├── design-system.ts      # Design token types (NEW)
│   └── index.ts              # Type exports
│
└── styles/
    └── animations.css        # Custom CSS keyframes (NEW)
```

---

## Implementation Sequence

Follow this order for systematic development:

### Phase 1: Foundation (Day 1-2)

1. **Design Tokens**

   ```bash
   # Create design system
   touch src/lib/design-tokens.ts
   touch src/types/design-system.ts
   ```

   - Define ColorToken objects
   - Export color palette constants
   - Update Tailwind config with custom colors

2. **Animation Infrastructure**

   ```bash
   # Create animation utilities
   touch src/lib/animations.ts
   touch src/types/animations.ts
   touch src/styles/animations.css
   ```

   - Implement easing functions
   - Create utility functions (interpolate, clamp, etc.)
   - Define CSS keyframes (@keyframes)

3. **Core Hooks**

   ```bash
   # Create hooks directory
   mkdir -p src/hooks
   touch src/hooks/useReducedMotion.ts
   touch src/hooks/useIntersectionObserver.ts
   ```

   - Start with useReducedMotion (simplest)
   - Then useIntersectionObserver (needed by most components)

**Validation**: Run `pnpm run type-check` and `pnpm run lint` - should pass

---

### Phase 2: Hero Section (Day 3-4)

1. **Update Global Styles**

   ```bash
   # Edit src/app/globals.css
   # Add color variables, gradient classes, animation utilities
   ```

2. **Optimize Logo**

   ```bash
   # Use next/image optimization
   # Ensure logo.jpg is optimized (WebP/AVIF support)
   ```

3. **Transform HeroSection Component**

   ```bash
   # Edit src/components/home/HeroSection.tsx
   ```

   - Implement split-screen layout
   - Add gradient background
   - Create animated logo with floating effect
   - Add parallax hook (create `useParallax.ts`)

4. **Enhance CTAButton**

   ```bash
   # Edit src/components/shared/CTAButton.tsx
   ```

   - Add pulse animation
   - Add ripple effect on click
   - Add micro-interactions

**Validation**:

```bash
# Visual check at http://localhost:3000
# Run Lighthouse (should see improved aesthetics)
pnpm run lighthouse
```

---

### Phase 3: Interactive Elements (Day 5-6)

1. **Create AnimatedCounter Component**

   ```bash
   touch src/components/shared/AnimatedCounter.tsx
   touch src/hooks/useAnimatedCounter.ts
   ```

2. **Enhance SocialProof Section**

   ```bash
   # Edit src/components/home/SocialProof.tsx
   # Integrate AnimatedCounter for statistics
   ```

3. **Create 3D Tilt Hook**

   ```bash
   touch src/hooks/use3DTilt.ts
   ```

4. **Enhance FeatureCard**

   ```bash
   # Edit src/components/shared/FeatureCard.tsx
   # Add glassmorphism variant
   # Integrate 3D tilt effect
   ```

5. **Enhance FeaturesGrid**
   ```bash
   # Edit src/components/home/FeaturesGrid.tsx
   # Apply glassmorphism to cards
   # Add scroll-triggered fade-ins
   ```

**Validation**:

```bash
# Test hover effects, counter animations
# Check performance with DevTools (60fps)
```

---

### Phase 4: Navigation & Polish (Day 7)

1. **Create Scroll Blur Hook**

   ```bash
   touch src/hooks/useScrollBlur.ts
   ```

2. **Enhance Header**

   ```bash
   # Edit src/components/layout/Header.tsx
   # Add sticky positioning
   # Add blur effect on scroll
   ```

3. **Enhance TestimonialCard**

   ```bash
   # Edit src/components/shared/TestimonialCard.tsx
   # Add slide-in animations
   # Implement staggered delays
   ```

4. **Create Floating Action Button**
   ```bash
   touch src/components/shared/FloatingActionButton.tsx
   # Implement mobile-only FAB for "Essai Gratuit"
   ```

**Validation**:

```bash
# Test on mobile devices (Chrome DevTools responsive mode)
# Verify touch interactions
```

---

### Phase 5: Testing & Optimization (Day 8-9)

1. **Accessibility Testing**

   ```bash
   # Run automated tests
   pnpm run test

   # Run E2E tests
   pnpm run test:e2e

   # Manual testing checklist:
   # - Keyboard navigation (Tab, Enter, Escape)
   # - Screen reader (NVDA/JAWS)
   # - Reduced motion (enable in OS settings)
   ```

2. **Performance Testing**

   ```bash
   # Run Lighthouse CI
   pnpm run lighthouse

   # Check bundle size
   pnpm run build
   # Inspect .next/static/chunks

   # Verify metrics:
   # - FCP < 1.5s
   # - TTI < 3s
   # - CLS < 0.1
   # - Lighthouse Performance > 90
   ```

3. **Cross-Browser Testing**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)
   - Mobile browsers (iOS Safari, Chrome Android)

4. **Visual Regression Testing**
   ```bash
   # Run Playwright visual tests
   pnpm run test:e2e --project chromium
   ```

**Validation**:

- All tests pass
- Lighthouse scores meet requirements
- No accessibility violations
- Smooth animations on target devices

---

## Testing Strategies

### Unit Testing (Vitest)

```bash
# Run all unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test -- --coverage
```

**Example Test**:

```typescript
// src/hooks/useReducedMotion.test.ts
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  it('returns false when prefers-reduced-motion is not set', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion is set', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

---

### E2E Testing (Playwright)

```bash
# Run E2E tests
pnpm run test:e2e

# Run E2E tests with UI
pnpm run test:e2e:ui

# Run specific test file
pnpm run test:e2e tests/homepage-animations.spec.ts
```

**Example E2E Test**:

```typescript
// tests/homepage-animations.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage Animations', () => {
  test('hero section displays with animated logo', async ({ page }) => {
    await page.goto('/');

    // Wait for hero to load
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toBeVisible();

    // Check logo animation is present
    const logo = page.locator('[data-testid="hero-logo"]');
    await expect(logo).toHaveCSS('animation-name', 'float');
  });

  test('counters animate on scroll into view', async ({ page }) => {
    await page.goto('/');

    // Scroll to statistics section
    await page.locator('[data-testid="social-proof"]').scrollIntoViewIfNeeded();

    // Wait for counter animation
    await page.waitForTimeout(2500); // Animation duration + buffer

    // Check final value is displayed
    const counter = page.locator('[data-testid="organizations-counter"]');
    await expect(counter).toContainText('500+');
  });

  test('respects prefers-reduced-motion', async ({ page }) => {
    // Enable reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Animations should be instant/disabled
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toHaveCSS('animation-duration', '0.01ms');
  });
});
```

---

### Accessibility Testing

```bash
# Run axe-core tests (integrated with Playwright)
pnpm run test:e2e -- --grep "accessibility"
```

**Manual Testing Checklist**:

- [ ] Keyboard Navigation
  - [ ] Tab through all interactive elements
  - [ ] Enter/Space activate buttons
  - [ ] Escape closes modals (if any)
  - [ ] Skip-to-content link works

- [ ] Screen Reader (NVDA/JAWS)
  - [ ] All sections announced
  - [ ] ARIA labels present
  - [ ] Counter values announced
  - [ ] Image alt text descriptive

- [ ] Reduced Motion
  - [ ] Enable in OS settings
  - [ ] Animations disabled/simplified
  - [ ] Content still accessible

- [ ] Color Contrast
  - [ ] Run WAVE extension
  - [ ] Check all text/background combinations
  - [ ] Verify 4.5:1 ratio minimum

---

## Performance Monitoring

### Lighthouse CI

```bash
# Run Lighthouse audit
pnpm run lighthouse

# Check specific metrics
npx lhci autorun --collect.url=http://localhost:3000
```

**Target Scores**:

- Performance: ≥ 90
- Accessibility: 100
- Best Practices: ≥ 90
- SEO: ≥ 95

### Bundle Analysis

```bash
# Build for production
pnpm run build

# Analyze bundle size
# Install analyzer if not present
pnpm add -D @next/bundle-analyzer

# Check .next/static/chunks for size
du -sh .next/static/chunks/*
```

**Targets**:

- Animation JavaScript: < 50KB gzipped
- Total page weight: < 2MB

---

## Debugging Tips

### Animation Debugging

```typescript
// Add to component for debugging
useEffect(() => {
  console.log('Animation triggered:', { isVisible, count });
}, [isVisible, count]);

// Measure frame rate
let frames = 0;
let lastTime = performance.now();

function measureFPS() {
  frames++;
  const currentTime = performance.now();

  if (currentTime >= lastTime + 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(measureFPS);
}

measureFPS();
```

### DevTools Settings

```bash
# Chrome DevTools
# 1. Open DevTools (F12)
# 2. Settings (F1)
# 3. Enable "Show paint rectangles"
# 4. Enable "Show layout shift regions"
# 5. Performance tab > Capture settings > Enable "Web Vitals"
```

### Common Issues

**Issue**: Animations not triggering on scroll

```typescript
// Check Intersection Observer threshold
console.log('Intersection ratio:', entry.intersectionRatio);
// Adjust threshold if needed (0.1 to 0.3 typical)
```

**Issue**: Poor performance on mobile

```typescript
// Disable expensive effects on mobile
const isMobile = useMediaQuery('(max-width: 768px)');
const enable3DTilt = !isMobile;
```

**Issue**: Layout shifts during animation

```css
/* Reserve space for animated elements */
.animated-element {
  min-height: 200px; /* Prevent CLS */
}
```

---

## Git Workflow

### Commit Convention

Follow Conventional Commits format:

```bash
# Feature commits
git commit -m "feat(hero): implement split-screen layout with animated logo"

# Enhancement commits
git commit -m "feat(animations): add useAnimatedCounter hook"

# Bug fixes
git commit -m "fix(accessibility): add ARIA labels to counter components"

# Performance improvements
git commit -m "perf(images): optimize logo with WebP format"

# Documentation
git commit -m "docs(quickstart): add debugging tips section"

# Tests
git commit -m "test(hooks): add unit tests for useIntersectionObserver"
```

### Pre-commit Hooks

Husky is configured to run on every commit:

- Lint-staged (formats staged files)
- ESLint (checks for errors)
- Commitlint (validates commit message)

```bash
# If you need to bypass hooks (emergency only)
git commit --no-verify -m "..."
```

---

## Deployment

### Build for Production

```bash
# Create production build
pnpm run build

# Test production build locally
pnpm run start

# Verify at http://localhost:3000
```

### Pre-deployment Checklist

- [ ] All tests pass (`pnpm run test`)
- [ ] E2E tests pass (`pnpm run test:e2e`)
- [ ] Lighthouse scores meet targets
- [ ] No console errors in production build
- [ ] Images optimized (WebP/AVIF)
- [ ] Bundle size under target
- [ ] Cross-browser testing complete
- [ ] Accessibility audit passed
- [ ] Mobile testing complete

---

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Vitals](https://web.dev/vitals/)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Playwright](https://playwright.dev/)

### Design Inspiration

- [Notion](https://notion.so) - Clean, minimal design
- [Linear](https://linear.app) - Smooth animations
- [Stripe](https://stripe.com) - Premium aesthetics
- [Vercel](https://vercel.com) - Modern gradients
- [Framer](https://framer.com) - Advanced animations

---

## Support

### Getting Help

1. **Check existing documentation**:
   - [plan.md](./plan.md) - Implementation plan
   - [research.md](./research.md) - Technical decisions
   - [data-model.md](./data-model.md) - Entity definitions
   - [contracts/](./contracts/) - Component APIs

2. **Review specification**:
   - [spec.md](./spec.md) - Full requirements

3. **Check code examples in contracts**:
   - [contracts/components.md](./contracts/components.md)
   - [contracts/animations.md](./contracts/animations.md)

---

**Quickstart Guide Status**: ✅ COMPLETE | **Date**: October 8, 2025
