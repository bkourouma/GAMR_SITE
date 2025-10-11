# Developer Quickstart: Page Tarifs

**Feature**: Page Tarifs - GAMR Pricing  
**Branch**: `005-g-n-re`  
**For**: New developers joining the pricing page development

---

## Quick Overview

The `/tarifs` page is a comprehensive pricing display with:

- 4 Cloud plan tiers (Starter, Pro, Business, Enterprise)
- On-Premise licensing option
- Interactive toggles (deployment model, billing period)
- ROI calculator
- FAQ section
- Full SEO optimization

**Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui

---

## Project Structure

```
src/
├── app/tarifs/
│   └── page.tsx                    # Main pricing page
├── components/tarifs/              # Pricing-specific components
│   ├── PricingHero.tsx
│   ├── CloudPricingGrid.tsx
│   ├── PricingCard.tsx
│   ├── ROICalculator.tsx
│   └── ... (11 components total)
├── lib/
│   ├── pricing-data.ts             # SINGLE SOURCE OF TRUTH for pricing
│   ├── pricing-utils.ts            # Price calculations
│   └── currency-formatter.ts       # FCFA formatting
├── types/
│   ├── pricing.ts                  # All pricing types
│   └── roi.ts                      # ROI calculator types
└── hooks/
    └── useROICalculator.ts         # ROI calculation logic

tests/e2e/
└── tarifs.spec.ts                  # Playwright tests
```

---

## Getting Started

### 1. Checkout and Install

```bash
# Checkout the feature branch
git checkout 005-g-n-re

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev

# Open in browser
open http://localhost:3000/tarifs
```

### 2. Key Files to Understand First

Read these in order:

1. **`src/types/pricing.ts`** - Understand data structures
2. **`src/lib/pricing-data.ts`** - See actual pricing data
3. **`src/components/tarifs/PricingCard.tsx`** - Learn component patterns
4. **`app/tarifs/page.tsx`** - See how it all connects

---

## Common Tasks

### Task 1: Update Plan Pricing

**File**: `src/lib/pricing-data.ts`

```typescript
// Find the plan you want to update
export const cloudPlans: PricingPlan[] = [
  {
    id: 'cloud-starter',
    name: 'Starter',
    basePrice: 100000, // ← CHANGE THIS (in FCFA)
    // Annual price will auto-calculate (basePrice * 12 * 0.85)
    annualPrice: 1020000, // ← UPDATE THIS TOO
    // ... rest stays the same
  },
  // ...
];
```

**Formula for annual price**: `monthlyPrice × 12 × 0.85` (15% discount)

**Don't forget**:

1. Update both `basePrice` and `annualPrice`
2. Run validation: `pnpm test:pricing-data`
3. Update this in docs if it's a significant change

---

### Task 2: Add a New Feature to a Plan

**File**: `src/lib/pricing-data.ts`

```typescript
export const cloudPlans: PricingPlan[] = [
  {
    id: 'cloud-pro',
    name: 'Pro',
    features: [
      'Toutes les fonctionnalités Starter',
      'Évaluation selon 3 normes',
      // ← ADD YOUR NEW FEATURE HERE
      'Nouvelle fonctionnalité description',
      // Keep 8-10 features total
    ],
    // ...
  },
];
```

**Rules**:

- Each plan must have 8-10 features
- Keep descriptions concise (< 60 characters)
- Start with benefit, not technical detail
- Use present tense ("Accédez à..." not "Vous pouvez accéder...")

---

### Task 3: Add a New FAQ Question

**File**: `src/lib/pricing-data.ts`

```typescript
export const faqEntries: FAQEntry[] = [
  // ... existing FAQs
  {
    id: 'faq-new-question', // Unique ID
    question: "Votre question se termine par un point d'interrogation ?",
    answer: 'Votre réponse claire et concise (< 500 caractères). Évitez le jargon technique.',
    category: 'billing', // security | trial | support | compliance | billing
    displayOrder: 9, // Increment from last FAQ
    keywords: ['mot-clé-1', 'mot-clé-2'], // For future search feature
  },
];
```

**Rules**:

- Total FAQs: 6-8 items
- Question must end with "?"
- Answer: < 500 characters
- Use categories from: `security`, `trial`, `support`, `compliance`, `billing`
- Increment `displayOrder` to add at end

---

### Task 4: Update ROI Calculation Constants

**File**: `src/lib/pricing-data.ts`

```typescript
export const roiConstants: ROIConstants = {
  hourlyRate: 15000, // ← FCFA per hour (average West African rate)
  costPerIncident: 500000, // ← FCFA per security incident
  setupCost: 0, // Cloud has no setup cost
  weeksPerMonth: 4.33, // Don't change (average)
};
```

**When to update**:

- `hourlyRate`: If regional salary data changes
- `costPerIncident`: If risk assessment data updates
- `setupCost`: Always 0 for Cloud, > 0 for On-Premise

**After updating**: Test ROI calculator to ensure results make sense

---

### Task 5: Modify Toggle Behavior

**File**: `src/components/tarifs/DeploymentToggle.tsx` or `BillingToggle.tsx`

Both toggles follow the same pattern:

```typescript
'use client';

interface Props {
  value: 'cloud' | 'on-premise'; // or 'monthly' | 'annual'
  onChange: (value: ValueType) => void;
}

export function DeploymentToggle({ value, onChange }: Props) {
  return (
    <button
      role="switch"
      aria-checked={value === 'cloud'}
      onClick={() => onChange(value === 'cloud' ? 'on-premise' : 'cloud')}
    >
      {/* Toggle UI */}
    </button>
  );
}
```

**State is managed in parent** (`app/tarifs/page.tsx`):

```typescript
const [deploymentModel, setDeploymentModel] = useState<DeploymentModel>('cloud');

<DeploymentToggle value={deploymentModel} onChange={setDeploymentModel} />
```

---

## Testing

### Run All Tests

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Unit tests (pricing calculations, formatting)
pnpm test

# E2E tests (user flows)
pnpm test:e2e

# E2E tests (headed mode for debugging)
pnpm test:e2e:ui
```

### Test Specific User Story

```bash
# Test only pricing page e2e tests
pnpm test:e2e tests/e2e/tarifs.spec.ts

# Test specific scenario
pnpm test:e2e tests/e2e/tarifs.spec.ts -g "toggle billing period"
```

### Manual Testing Checklist

- [ ] Navigate to http://localhost:3000/tarifs
- [ ] Toggle Cloud/On-Premise - layout doesn't shift
- [ ] Toggle Monthly/Annual - prices update correctly (15% discount)
- [ ] Each plan card shows 8-10 features
- [ ] ROI calculator accepts valid inputs, rejects invalid
- [ ] FAQ accordions expand/collapse
- [ ] All CTAs link to correct destinations
- [ ] Mobile responsive (test at 375px, 768px, 1024px)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] No console errors in DevTools

---

## Debugging Tips

### Problem: Prices Not Formatting Correctly

**Check**: `src/lib/currency-formatter.ts`

```typescript
export function formatFCFA(amount: number, locale: string = 'es-CI'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

**Test in console**:

```javascript
formatFCFA(100000); // Should output: "100.000 F CFA" or similar
```

**Common issues**:

- Wrong locale: Use `'es-CI'` not `'fr-FR'`
- Missing Intl polyfill: Unlikely with modern browsers but check

---

### Problem: ROI Calculator Not Updating

**Check**: `src/hooks/useROICalculator.ts`

1. Verify inputs are valid (within ranges)
2. Check React DevTools - are state updates happening?
3. Look for validation errors in `errors` return value
4. Console.log the `results` object to see calculated values

**Debug component state**:

```typescript
// In ROICalculator.tsx
console.log('Inputs:', inputs);
console.log('Results:', results);
console.log('Errors:', errors);
console.log('Is Valid:', isValid);
```

---

### Problem: Layout Shift on Toggle

**Check**: CLS score in Lighthouse

```bash
# Run Lighthouse
pnpm build
pnpm start
# Open Chrome DevTools → Lighthouse → Run audit
```

**Solutions**:

1. Add `min-height` to containers that change content
2. Use `grid-auto-rows: 1fr` for equal height cards
3. Use opacity transitions instead of display none/block

---

## SEO Verification

### Check Metadata

```bash
# Build production
pnpm build

# Start production server
pnpm start

# Open http://localhost:3000/tarifs
# View Page Source (Ctrl+U) and verify:
```

- [ ] `<title>` is 50-60 characters
- [ ] `<meta name="description">` is 150-160 characters
- [ ] OpenGraph tags present (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] JSON-LD structured data present (search for `"@type": "Product"`)
- [ ] Canonical URL: `<link rel="canonical" href="https://gamr.example/tarifs">`

### Test Structured Data

1. Copy page source
2. Go to https://validator.schema.org/
3. Paste source code
4. Verify no errors for Product and FAQPage schemas

### Test OpenGraph

1. Go to https://www.opengraph.xyz/
2. Enter: http://localhost:3000/tarifs (or production URL)
3. Verify image, title, description appear correctly

---

## Performance Optimization

### Check Current Performance

```bash
# Build for production
pnpm build

# Analyze bundle
pnpm analyze

# Check page size
ls -lh .next/static/chunks/
```

### Performance Targets

- **FCP**: < 1.5s
- **TTI**: < 3s
- **CLS**: < 0.1
- **Lighthouse**: > 90

### Common Optimizations

1. **Images**: Use Next.js `<Image>` component, WebP format
2. **Fonts**: Preload fonts, use `font-display: swap`
3. **JavaScript**: Code splitting, dynamic imports for heavy components
4. **CSS**: Purge unused Tailwind classes (automatic in production)

---

## Accessibility Verification

### Automated Tests

```bash
# Run axe accessibility tests
pnpm test:e2e

# Check Lighthouse accessibility score (should be 100)
```

### Manual Tests

**Keyboard Navigation**:

- [ ] Tab through all interactive elements
- [ ] Space/Enter activates buttons and toggles
- [ ] Escape closes modals (if any)
- [ ] Focus indicators visible on all elements

**Screen Reader** (macOS: VoiceOver, Windows: NVDA):

- [ ] Toggle switches announce state ("Cloud selected" / "On-Premise selected")
- [ ] Prices announced with currency context
- [ ] FAQ accordions announce expanded/collapsed state
- [ ] Form inputs have labels
- [ ] Validation errors announced

**Color Contrast**:

- [ ] Use Chrome DevTools → Inspect → Accessibility pane
- [ ] All text meets 4.5:1 ratio (normal text)
- [ ] All text meets 3:1 ratio (large text 18px+)

---

## Deployment Checklist

Before merging to main:

- [ ] All tests pass (`pnpm test && pnpm test:e2e`)
- [ ] No TypeScript errors (`pnpm type-check`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Lighthouse scores > 90 (all categories)
- [ ] Manual testing on Chrome, Firefox, Safari
- [ ] Mobile testing on iOS and Android
- [ ] Accessibility audit passes (axe, WAVE)
- [ ] SEO metadata validated (schema.org validator)
- [ ] OpenGraph preview looks correct
- [ ] Branch is up-to-date with main
- [ ] PR description includes screenshots
- [ ] Breaking changes documented (if any)

---

## Useful Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm dev --turbo            # Start dev server (faster)

# Code Quality
pnpm type-check             # TypeScript validation
pnpm lint                   # ESLint
pnpm lint:fix               # Auto-fix linting issues
pnpm format                 # Prettier formatting
pnpm format:check           # Check formatting without changing

# Testing
pnpm test                   # Vitest unit tests
pnpm test:watch             # Unit tests in watch mode
pnpm test:e2e               # Playwright e2e tests
pnpm test:e2e:ui            # E2E tests with UI
pnpm test:e2e:debug         # E2E tests in debug mode

# Build & Production
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm analyze                # Bundle analyzer

# Specific to this feature
pnpm test:pricing-data      # Validate pricing data integrity
pnpm test:roi-calc          # Test ROI calculations
```

---

## Gotchas & Common Mistakes

### ❌ Don't: Hardcode Prices in Components

```typescript
// BAD
<div className="price">100.000 F CFA</div>

// GOOD
import { formatFCFA } from '@/lib/currency-formatter';
<FormattedPrice value={plan.basePrice} />
```

### ❌ Don't: Mutate Pricing Data

```typescript
// BAD
cloudPlans[0].basePrice = 150000; // Mutating imported data

// GOOD
const updatedPlan = { ...cloudPlans[0], basePrice: 150000 };
```

### ❌ Don't: Skip Annual Price Calculation

```typescript
// BAD
annualPrice: 1200000, // 12 * 100000 (no discount!)

// GOOD
annualPrice: 1020000, // 12 * 100000 * 0.85 (15% discount)
```

### ✅ Do: Use TypeScript Types

```typescript
import type { PricingPlan, BillingPeriod } from '@/types/pricing';

function MyComponent({ plan }: { plan: PricingPlan }) {
  // TypeScript will catch errors
}
```

### ✅ Do: Test on Multiple Browsers

Not just Chrome! Test on:

- Chrome (latest)
- Firefox (latest)
- Safari (macOS/iOS)
- Edge (Windows)

---

## Getting Help

### Documentation

- **Spec**: `specs/005-g-n-re/spec.md` - Requirements
- **Plan**: `specs/005-g-n-re/plan.md` - Architecture
- **Research**: `specs/005-g-n-re/research.md` - Technical decisions
- **Data Model**: `specs/005-g-n-re/data-model.md` - Type definitions
- **Contracts**: `specs/005-g-n-re/contracts/` - API contracts

### External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [schema.org Product](https://schema.org/Product)

### Need Help?

1. Check the spec documents first
2. Look at existing components for patterns
3. Review the contracts for API definitions
4. Check tests for usage examples
5. Ask team members

---

## Next Steps

After completing this feature:

1. **Test thoroughly** - Run full test suite
2. **Create PR** - Include screenshots and test results
3. **Request review** - Tag reviewers
4. **Address feedback** - Make requested changes
5. **Merge** - After approval and all checks pass
6. **Deploy** - Follow deployment process
7. **Monitor** - Watch analytics and error logs

---

**Welcome to the pricing page development!** 🎉

This guide should get you productive quickly. Update this document if you find gaps or discover better patterns.
