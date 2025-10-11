# Technical Research: Page Tarifs

**Feature**: Page Tarifs - GAMR Pricing  
**Branch**: `005-g-n-re`  
**Date**: 2025-10-09  
**Purpose**: Resolve technical unknowns and establish implementation patterns

---

## 1. FCFA Currency Formatting with es-CI Locale

### Decision

Use JavaScript `Intl.NumberFormat` with `es-CI` locale and `XOF` currency code for West African CFA Franc formatting.

### Rationale

- Native browser API (no external dependencies)
- Proper internationalization support
- Automatic thousand separator handling
- Consistent with Next.js SSR/CSR rendering

### Implementation Pattern

```typescript
// lib/currency-formatter.ts
export function formatFCFA(amount: number, locale: string = 'es-CI'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Example output: "100.000 F CFA" or "100 000 FCFA" depending on locale config
```

### Alternatives Considered

- **Manual string formatting**: Rejected due to complexity and error-prone nature
- **Third-party library (numeral.js)**: Rejected to avoid bundle size increase for simple formatting
- **Server-only formatting**: Rejected because ROI calculator needs client-side formatting

### Testing Strategy

- Unit tests with various amounts (edge cases: 0, negative, very large numbers)
- Visual regression tests to verify formatting consistency across components

---

## 2. ROI Calculation Formula

### Decision

Calculate ROI based on time savings and incident prevention value using this formula:

```typescript
// Monthly savings calculation
const monthlySavings = (
  (numberOfUsers × hoursPerWeek × 4.33 × hourlyRate) +
  (incidentsAvoided × costPerIncident)
);

// Monthly ROI
const monthlyROI = monthlySavings - monthlyPlanCost;

// Annual ROI
const annualROI = monthlyROI × 12;

// Break-even point (months)
const breakEvenMonths = monthlySavings > monthlyPlanCost
  ? (setupCost / monthlyROI)
  : Infinity;

// Default constants
const hourlyRate = 15000; // FCFA per hour (average West African rate)
const costPerIncident = 500000; // FCFA per security incident
const setupCost = 0; // Cloud has no setup cost
```

### Rationale

- **Time savings**: Quantifies productivity gains (users × hours saved × hourly rate)
- **Incident prevention**: Major risk events have high cost (regulatory fines, data breach, downtime)
- **Conservative estimates**: Using mid-range values avoids overpromising ROI
- **Transparency**: Formula visible to users, builds trust

### User Inputs

1. **Number of users**: Direct input (1-1000 range)
2. **Incidents avoided per month**: Risk reduction metric (0-50 range)
3. **Time saved per user per week**: Efficiency gain in hours (0-40 hours range)

### Output Format

```
Économies mensuelles: 2.450.000 F CFA
ROI mensuel: 2.200.000 F CFA
ROI annuel: 26.400.000 F CFA
Seuil de rentabilité: Immédiat (premier mois)
```

### Alternatives Considered

- **Complex multi-factor model**: Rejected for user simplicity - too many inputs reduce engagement
- **Industry-standard ROI %**: Rejected because absolute FCFA values are more compelling for decision-makers
- **Backend calculation API**: Rejected for instant client-side feedback (< 50ms requirement)

### Validation

- Input bounds validation (min/max ranges)
- Division by zero protection
- Negative ROI handling (show warning, suggest higher tier)

---

## 3. Schema.org Product/Offer Markup

### Decision

Use `Product` schema with nested `AggregateOffer` for multi-tier pricing and individual `Offer` for each plan.

### Implementation Structure

```typescript
// JSON-LD for /tarifs page
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "GAMR - Grille d'Analyse des Menaces et Risques",
  "description": "Solution complète de gestion des risques et conformité",
  "brand": {
    "@type": "Organization",
    "name": "GAMR"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "XOF",
    "lowPrice": "100000",
    "highPrice": "500000",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter",
        "price": "100000",
        "priceCurrency": "XOF",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "100000",
          "priceCurrency": "XOF",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock",
        "url": "https://gamr.example/tarifs#starter"
      },
      // ... Pro, Business offers
    ]
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Deployment Model",
      "value": "Cloud SaaS"
    },
    {
      "@type": "PropertyValue",
      "name": "Free Trial",
      "value": "30 days"
    }
  ]
}
```

### Rationale

- **AggregateOffer**: Shows price range in search results
- **XOF currency**: Official ISO 4217 code for West African CFA Franc
- **UnitPriceSpecification**: Clarifies monthly recurring pricing
- **Individual Offers**: Each plan indexed separately by search engines
- **additionalProperty**: Highlights key differentiators (free trial, deployment model)

### SEO Benefits

- Rich snippets in Google search results
- Price comparison in Google Shopping (if applicable)
- Enhanced mobile search cards
- Better AI assistant integration (ChatGPT, Bard)

### Alternatives Considered

- **Service schema**: Rejected because GAMR is a software product, not a consulting service
- **SoftwareApplication schema**: Considered but Product with Offer provides better pricing display
- **Separate page per plan**: Rejected to avoid SEO dilution and maintain comparison UX

### Validation

- Test with Google Rich Results Test tool
- Verify structured data in Google Search Console
- Check rendering in schema.org validator

---

## 4. Accessibility Patterns for Interactive Components

### Decision: Component-Specific Patterns

#### A) Pricing Toggles (Cloud/On-Prem, Monthly/Annual)

```tsx
<div role="group" aria-labelledby="deployment-toggle-label">
  <span id="deployment-toggle-label">Modèle de déploiement</span>
  <button
    role="switch"
    aria-checked={isCloud ? 'true' : 'false'}
    aria-label="Basculer entre Cloud et On-Premise"
    onClick={toggleDeployment}
  >
    <span aria-hidden="true">Cloud</span>
    <span className="sr-only">{isCloud ? 'Cloud sélectionné' : 'On-Premise sélectionné'}</span>
    <span aria-hidden="true">On-Premise</span>
  </button>
</div>
```

**Keyboard Support**:

- Tab: Focus toggle
- Space/Enter: Toggle state
- Announce state change to screen readers

#### B) FAQ Accordion

```tsx
<div className="faq-accordion">
  {faqItems.map((item, index) => (
    <div key={index}>
      <h3>
        <button
          id={`faq-button-${index}`}
          aria-expanded={expandedIndex === index}
          aria-controls={`faq-panel-${index}`}
          onClick={() => toggleFAQ(index)}
        >
          {item.question}
          <span aria-hidden="true">{expandedIndex === index ? '−' : '+'}</span>
        </button>
      </h3>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        hidden={expandedIndex !== index}
      >
        {item.answer}
      </div>
    </div>
  ))}
</div>
```

**Keyboard Support**:

- Tab: Navigate between questions
- Space/Enter: Expand/collapse
- Home: First question
- End: Last question

#### C) ROI Calculator Form

```tsx
<form aria-labelledby="roi-calculator-title">
  <h2 id="roi-calculator-title">Calculateur de ROI</h2>

  <div>
    <label htmlFor="users-input">
      Nombre d'utilisateurs
      <span className="required" aria-label="requis">
        *
      </span>
    </label>
    <input
      id="users-input"
      type="number"
      min="1"
      max="1000"
      required
      aria-required="true"
      aria-describedby="users-help users-error"
      aria-invalid={hasError ? 'true' : 'false'}
    />
    <span id="users-help" className="help-text">
      Entre 1 et 1000
    </span>
    {hasError && (
      <span id="users-error" role="alert" className="error">
        Veuillez entrer un nombre entre 1 et 1000
      </span>
    )}
  </div>

  {/* Real-time results announced to screen readers */}
  <div role="status" aria-live="polite" aria-atomic="true">
    {isCalculating ? (
      <span className="sr-only">Calcul en cours...</span>
    ) : (
      <span>ROI mensuel estimé : {formatFCFA(monthlyROI)}</span>
    )}
  </div>
</form>
```

**Keyboard Support**:

- Tab: Navigate inputs
- Arrow keys: Increment/decrement numbers
- Results announced automatically via aria-live

#### D) Pricing Cards

```tsx
<article className="pricing-card" aria-labelledby={`plan-${planId}-title`} tabIndex="0">
  <h3 id={`plan-${planId}-title`}>{plan.name}</h3>
  <div aria-label={`Prix : ${formatFCFA(plan.price)} par mois`}>
    <span aria-hidden="true">{formatFCFA(plan.price)}</span>
    <span className="sr-only">par mois</span>
  </div>
  <ul aria-label="Fonctionnalités incluses">
    {plan.features.map((feature, i) => (
      <li key={i}>
        <span aria-hidden="true">✓</span>
        <span className="sr-only">Inclus :</span>
        {feature}
      </li>
    ))}
  </ul>
  <a href={plan.ctaUrl} aria-label={`${plan.ctaText} - Plan ${plan.name}`}>
    {plan.ctaText}
  </a>
</article>
```

### Rationale

- **ARIA roles and states**: Proper semantics for custom controls
- **Screen reader announcements**: aria-live for dynamic content (ROI results, toggle states)
- **Visible focus indicators**: CSS outline on all interactive elements
- **Descriptive labels**: Context provided for all inputs and buttons
- **Error messaging**: Inline validation with aria-describedby and role="alert"

### Testing Approach

- Manual testing with NVDA (Windows), VoiceOver (macOS), TalkBack (Android)
- Automated testing with axe-core and Playwright accessibility checks
- Keyboard-only navigation testing
- Color contrast verification with Chrome DevTools

### Alternatives Considered

- **Radix UI primitives**: Considered for out-of-box accessibility, but shadcn/ui (built on Radix) already adopted in project
- **React Aria hooks**: Excellent but adds bundle size; shadcn/ui sufficient for our needs
- **Native HTML elements only**: Rejected because toggle switches and custom accordions provide better UX

---

## 5. Layout Shift Prevention (CLS < 0.1)

### Decision: Reserve Space & CSS Transitions

#### Problem

Toggling between Cloud/On-Premise or Monthly/Annual could cause layout shift if content heights differ.

#### Solution Strategy

**A) Fixed Height Containers**

```tsx
// Calculate max height needed for both states
<div className="min-h-[800px]">
  {' '}
  {/* Reserve space for tallest content */}
  {isCloud ? <CloudPricing /> : <OnPremisePricing />}
</div>
```

**B) CSS Grid with Equal Heights**

```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: 1fr; /* Equal height cards */
  gap: 1.5rem;
}
```

**C) Smooth Transitions (No Instant Swap)**

```tsx
<div className="relative">
  <div
    className={cn(
      'transition-opacity duration-300',
      isCloud ? 'opacity-100' : 'opacity-0 absolute inset-0'
    )}
  >
    <CloudPricing />
  </div>
  <div
    className={cn(
      'transition-opacity duration-300',
      !isCloud ? 'opacity-100' : 'opacity-0 absolute inset-0'
    )}
  >
    <OnPremisePricing />
  </div>
</div>
```

**D) Price Animation (No Jump)**

```tsx
// Animate number changes instead of instant replacement
import { useSpring, animated } from 'react-spring';

const animatedPrice = useSpring({
  value: currentPrice,
  config: { tension: 280, friction: 60 },
});

<animated.span>{animatedPrice.value.to((val) => formatFCFA(Math.round(val)))}</animated.span>;
```

### Rationale

- **Reserved space**: Prevents content below from shifting
- **Equal grid heights**: Cards maintain consistent height regardless of content
- **Opacity transitions**: Visual feedback without layout changes
- **Number animation**: Smooth price changes feel intentional, not jarring

### Measurement

- Lighthouse CLS metric in CI
- Real User Monitoring (RUM) if available
- Visual regression tests comparing before/after toggle

### Alternatives Considered

- **Instant content swap**: Rejected due to CLS violations
- **Full page reload**: Rejected for poor UX and performance
- **Skeleton loaders**: Unnecessary since content is instant (no API calls)

---

## 6. Responsive Pricing Tables on Mobile

### Decision: Transform Table to Stacked Cards on Mobile

#### Desktop (≥ 768px): Comparison Table

```tsx
<table className="hidden md:table">
  <thead>
    <tr>
      <th>Critère</th>
      <th>Cloud</th>
      <th>On-Premise</th>
    </tr>
  </thead>
  <tbody>
    {comparisons.map((item) => (
      <tr key={item.dimension}>
        <td>{item.dimension}</td>
        <td>{item.cloudValue}</td>
        <td>{item.onPremiseValue}</td>
      </tr>
    ))}
  </tbody>
</table>
```

#### Mobile (< 768px): Stacked Cards

```tsx
<div className="md:hidden space-y-4">
  {comparisons.map((item) => (
    <div key={item.dimension} className="card">
      <h3>{item.dimension}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="label">Cloud</span>
          <p>{item.cloudValue}</p>
        </div>
        <div>
          <span className="label">On-Premise</span>
          <p>{item.onPremiseValue}</p>
        </div>
      </div>
    </div>
  ))}
</div>
```

### Rationale

- **Card transformation**: Maintains all content while optimizing for touch interaction
- **No horizontal scroll**: Avoids poor mobile UX pattern
- **Clear visual hierarchy**: Each dimension becomes its own card with labeled values
- **Touch-friendly**: Adequate tap target sizes (44x44px minimum)

### Alternative Pattern (If Many Columns)

For pricing feature comparison (8-10 features × 4 plans):

```tsx
<div className="overflow-x-auto">
  <table className="min-w-[800px]">{/* Horizontal scroll with momentum */}</table>
</div>
```

With indicators for scrollability:

```tsx
<div className="relative">
  {showLeftScroll && <div className="scroll-indicator left">←</div>}
  {showRightScroll && <div className="scroll-indicator right">→</div>}
  <div className="overflow-x-auto" onScroll={handleScroll}>
    <table>...</table>
  </div>
</div>
```

### Accessibility Considerations

- Table semantics maintained even in card view (using ARIA if needed)
- Scroll regions announced to screen readers
- Swipe gestures work with screen reader gestures

### Alternatives Considered

- **Horizontal scroll only**: Works for small tables but poor UX for many rows
- **Accordion expansion**: Too many clicks to compare; rejected
- **Separate pages per comparison**: Breaks comparison flow; rejected

---

## Summary of Technical Decisions

| Decision Area           | Chosen Approach                     | Key Library/Pattern                      |
| ----------------------- | ----------------------------------- | ---------------------------------------- |
| Currency Formatting     | Intl.NumberFormat                   | es-CI locale, XOF currency               |
| ROI Calculation         | Client-side formula                 | Time savings + incident prevention       |
| SEO Markup              | schema.org Product + AggregateOffer | JSON-LD with XOF pricing                 |
| Toggle Accessibility    | ARIA switch pattern                 | role="switch", aria-checked              |
| Accordion Accessibility | ARIA disclosure pattern             | aria-expanded, aria-controls             |
| Form Accessibility      | Native HTML + ARIA                  | aria-describedby, aria-live              |
| Layout Shift Prevention | Reserved space + CSS transitions    | min-height, opacity transitions          |
| Mobile Tables           | Responsive transformation           | Table → Stacked cards with media queries |

---

## Next Steps

1. ✅ Research complete - All technical unknowns resolved
2. → Proceed to Phase 1: Generate data-model.md
3. → Proceed to Phase 1: Generate contracts/ (3 files)
4. → Proceed to Phase 1: Generate quickstart.md
5. → Update agent context with patterns
6. → Ready for `/speckit.tasks` command

---

**Research Validation**: All patterns tested against constitution requirements (Performance, Accessibility, SEO, Mobile-First, Type Safety). No violations identified.
