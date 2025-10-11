# Tooltips Contract

**Feature**: Page Fonctionnalités  
**Date**: 2025-10-09  
**Status**: ✅ Complete

## Overview

This document specifies tooltip content, behavior, and accessibility requirements for technical terms on the features page (FR-011b, A11Y-008). All technical terms must have tooltips per clarification decision.

---

## Tooltip Definitions

### Required Terms (Minimum)

These terms MUST have tooltips based on feature content:

| Term             | Definition                                                                                                                            | Context                                         | Priority                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------- |
| **GAMR**         | Gestion et Analyse Méthodique des Risques - méthodologie structurée pour identifier, évaluer et piloter les risques organisationnels. | -                                               | P1 (appears multiple times) |
| **cartographie** | Visualisation graphique de tous les risques identifiés, organisés par domaine, processus ou projet.                                   | Dans le contexte de la gestion des risques      | P1 (feature title)          |
| **heatmap**      | Carte thermique utilisant des couleurs (vert à rouge) pour représenter visuellement l'intensité ou la criticité des risques.          | Aussi appelée "carte de chaleur"                | P1 (indicators feature)     |
| **scoring**      | Attribution d'une note chiffrée à chaque risque selon sa probabilité, sa vulnérabilité et son impact.                                 | Méthode quantitative d'évaluation               | P1 (evaluation feature)     |
| **workflow**     | Enchaînement structuré d'étapes et d'approbations pour traiter un processus métier de bout en bout.                                   | Dans le contexte de la collaboration            | P2 (collaboration feature)  |
| **audit**        | Examen systématique et indépendant visant à vérifier la conformité aux standards et réglementations.                                  | Audit de sécurité ou de conformité              | P2 (reports feature)        |
| **conformité**   | Respect des exigences légales, réglementaires et normatives applicables à l'organisation.                                             | Ex: ISO 27001, RGPD, ANSSI                      | P2 (security feature)       |
| **ISO**          | Organisation Internationale de Normalisation - établit des normes internationales de qualité et sécurité.                             | Ex: ISO 27001 pour la sécurité de l'information | P3 (security context)       |
| **ANSSI**        | Agence Nationale de la Sécurité des Systèmes d'Information - autorité française de cybersécurité.                                     | Publie des référentiels de sécurité             | P3 (security context)       |
| **risque**       | Événement potentiel pouvant avoir un impact négatif sur les objectifs de l'organisation.                                              | Mesuré par probabilité × impact                 | P2 (core concept)           |

### Data Structure

```typescript
interface TooltipDefinition {
  term: string; // Technical term (case-sensitive)
  definition: string; // Plain-language explanation (max 200 chars)
  context?: string; // Optional clarifying context (max 100 chars)
  priority: 'P1' | 'P2' | 'P3'; // Implementation priority
}

type TooltipDictionary = Record<string, TooltipDefinition>;
```

### Implementation

```typescript
// lib/tooltip-definitions.ts
export const tooltipDefinitions: TooltipDictionary = {
  'GAMR': {
    term: 'GAMR',
    definition: 'Gestion et Analyse Méthodique des Risques - méthodologie structurée pour identifier, évaluer et piloter les risques organisationnels.',
    priority: 'P1',
  },
  'cartographie': {
    term: 'cartographie',
    definition: 'Visualisation graphique de tous les risques identifiés, organisés par domaine, processus ou projet.',
    context: 'Dans le contexte de la gestion des risques',
    priority: 'P1',
  },
  'heatmap': {
    term: 'heatmap',
    definition: 'Carte thermique utilisant des couleurs (vert à rouge) pour représenter visuellement l'intensité ou la criticité des risques.',
    context: 'Aussi appelée "carte de chaleur"',
    priority: 'P1',
  },
  // ... autres termes
};
```

---

## Behavior Specification

### Interaction Modes

Tooltips must support 3 interaction modes:

#### 1. Desktop (Mouse)

- **Trigger**: Hover over term with dotted underline
- **Delay**: 300ms before tooltip appears
- **Dismissal**: Mouse leave, or click outside
- **Visual**: Tooltip positioned above/below term (auto-adjust to viewport)

#### 2. Mobile (Touch)

- **Trigger**: Tap on term
- **Delay**: Immediate (0ms)
- **Dismissal**: Tap outside tooltip, or tap term again
- **Visual**: Tooltip positioned to avoid covering term, scrollable if needed

#### 3. Keyboard (Accessibility)

- **Trigger**: Tab to term (focusable), press Enter or Space
- **Delay**: Immediate (0ms)
- **Dismissal**: Press Esc, or Tab away
- **Visual**: Focus ring visible on trigger element

### Position Strategy

```typescript
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

// Radix UI Tooltip handles positioning automatically
// Preference order: top → bottom → right → left
// Adjusts based on viewport collision detection
```

### Animation

- **Entrance**: Fade in + scale (0.95 → 1.0) over 150ms
- **Exit**: Fade out over 100ms
- **Respect**: `prefers-reduced-motion` CSS media query (no animation if set)

```css
@media (prefers-reduced-motion: reduce) {
  [data-radix-tooltip-content] {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Accessibility Requirements (A11Y-008)

### ARIA Attributes

```html
<!-- Trigger element -->
<span
  role="button"
  tabindex="0"
  aria-describedby="tooltip-gamr"
  class="underline decoration-dotted cursor-help"
>
  GAMR
</span>

<!-- Tooltip content -->
<div id="tooltip-gamr" role="tooltip" class="bg-gray-900 text-white text-sm p-2 rounded shadow-lg">
  Gestion et Analyse Méthodique des Risques...
</div>
```

### Keyboard Navigation

| Key           | Action                                    |
| ------------- | ----------------------------------------- |
| Tab           | Navigate to next tooltip trigger          |
| Shift+Tab     | Navigate to previous tooltip trigger      |
| Enter / Space | Open tooltip when trigger focused         |
| Esc           | Close tooltip and return focus to trigger |
| Arrow keys    | (No action - tooltip doesn't trap focus)  |

### Screen Reader Behavior

- **Trigger announcement**: "GAMR, button, has tooltip"
- **Tooltip content**: Read aloud when opened
- **Context**: `aria-describedby` links trigger to tooltip content
- **Live region**: Not announced automatically (user-initiated only)

### Focus Management

- Tooltip trigger must be focusable: `tabIndex={0}` or interactive element
- Focus indicator visible: 2px blue ring with 2px offset
- Focus returns to trigger after tooltip closes
- Tooltip content doesn't receive focus (non-modal)

---

## Visual Design

### Styling Specifications

```tsx
// Trigger (term with tooltip)
className="
  underline
  decoration-dotted
  decoration-gray-400
  cursor-help
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
"

// Tooltip content
className="
  bg-gray-900
  text-white
  text-sm
  px-3
  py-2
  rounded-md
  shadow-xl
  max-w-xs
  z-50
"
```

### Color Contrast

- **Background**: `#111827` (gray-900)
- **Text**: `#FFFFFF` (white)
- **Contrast ratio**: 18.4:1 ✅ (exceeds WCAG AAA 7:1)
- **Context text**: `#9CA3AF` (gray-400) on gray-900 = 5.2:1 ✅

### Typography

- **Font size**: 14px (text-sm)
- **Line height**: 1.5 (20px)
- **Font weight**: 400 (regular)
- **Max width**: 320px (max-w-xs)
- **Padding**: 12px horizontal, 8px vertical

### Arrow/Pointer

Optional visual pointer connecting tooltip to term:

```tsx
// shadcn/ui Tooltip includes arrow
<TooltipContent sideOffset={5} className="...">
  <TooltipArrow className="fill-gray-900" />
  <p>{definition}</p>
</TooltipContent>
```

---

## Implementation Pattern

### Component Usage

```tsx
import { TermWithTooltip } from '@/components/shared/TermWithTooltip';

// Automatic lookup
<p>
  La plateforme <TermWithTooltip term="GAMR" /> automatise la gestion des risques.
</p>

// Custom display
<h3>
  <TermWithTooltip term="cartographie">
    Cartographie des menaces
  </TermWithTooltip>
</h3>

// Override definition
<TermWithTooltip
  term="custom"
  definition="Custom explanation for this specific context"
>
  custom term
</TermWithTooltip>
```

### Inline Pattern (Manual)

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-dotted cursor-help" tabIndex={0}>
        GAMR
      </span>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      <p>{tooltipDefinitions.GAMR.definition}</p>
      {tooltipDefinitions.GAMR.context && (
        <p className="text-xs text-gray-400 mt-1">{tooltipDefinitions.GAMR.context}</p>
      )}
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Content Guidelines

### Writing Definitions

**DO**:

- ✅ Use plain language (avoid jargon)
- ✅ Keep under 200 characters
- ✅ End with period
- ✅ Define in context of risk management
- ✅ Include common French/English terminology
- ✅ Provide examples if helpful ("Ex: ISO 27001")

**DON'T**:

- ❌ Use circular definitions ("GAMR est GAMR")
- ❌ Include links or external references
- ❌ Use overly technical language
- ❌ Exceed 200 characters (truncate or simplify)
- ❌ Start with "C'est..." (just define directly)

### Example Comparisons

| ❌ Bad                             | ✅ Good                                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| "GAMR est un outil de gestion"     | "Gestion et Analyse Méthodique des Risques - méthodologie structurée pour identifier, évaluer et piloter les risques organisationnels." |
| "Cartographie"                     | "Visualisation graphique de tous les risques identifiés, organisés par domaine, processus ou projet."                                   |
| "Voir Wikipedia pour plus d'infos" | "Carte thermique utilisant des couleurs (vert à rouge) pour représenter visuellement l'intensité des risques."                          |

---

## Testing Requirements

### Unit Tests

```typescript
describe('TermWithTooltip', () => {
  it('renders term with dotted underline', () => {
    render(<TermWithTooltip term="GAMR" />);
    const term = screen.getByText('GAMR');
    expect(term).toHaveClass('underline', 'decoration-dotted');
  });

  it('shows tooltip on hover', async () => {
    render(<TermWithTooltip term="GAMR" />);
    const term = screen.getByText('GAMR');

    await userEvent.hover(term);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeVisible();
    expect(tooltip).toHaveTextContent(/Gestion et Analyse Méthodique/);
  });

  it('shows tooltip on keyboard focus + Enter', async () => {
    render(<TermWithTooltip term="GAMR" />);
    const term = screen.getByText('GAMR');

    term.focus();
    await userEvent.keyboard('{Enter}');

    expect(await screen.findByRole('tooltip')).toBeVisible();
  });

  it('closes tooltip on Esc key', async () => {
    render(<TermWithTooltip term="GAMR" />);
    const term = screen.getByText('GAMR');

    await userEvent.hover(term);
    expect(await screen.findByRole('tooltip')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
```

### E2E Tests

```typescript
test('tooltip works on mobile tap', async ({ page }) => {
  await page.goto('/fonctionnalites');
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile

  // Find term with tooltip
  const term = page.getByText('GAMR').first();

  // Tap to open
  await term.tap();
  await expect(page.getByRole('tooltip')).toBeVisible();

  // Tap outside to close
  await page.tap('body', { position: { x: 10, y: 10 } });
  await expect(page.getByRole('tooltip')).not.toBeVisible();
});

test('tooltip accessible via keyboard', async ({ page }) => {
  await page.goto('/fonctionnalites');

  // Tab to first tooltip trigger
  await page.keyboard.press('Tab');
  // ... may need multiple tabs to reach tooltip

  // Open with Enter
  await page.keyboard.press('Enter');
  await expect(page.getByRole('tooltip')).toBeVisible();

  // Close with Esc
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).not.toBeVisible();
});
```

### Accessibility Tests

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('tooltip has no accessibility violations', async () => {
  const { container } = render(<TermWithTooltip term="GAMR" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('tooltip trigger has correct ARIA attributes', () => {
  render(<TermWithTooltip term="GAMR" />);
  const trigger = screen.getByText('GAMR');

  expect(trigger).toHaveAttribute('tabindex', '0');
  expect(trigger).toHaveAttribute('aria-describedby');
  // role="button" or interactive element
});
```

---

## Performance Considerations

### Bundle Size

- Radix UI Tooltip: ~5KB gzipped
- Tooltip definitions: ~2KB (all terms)
- Total overhead: ~7KB

### Lazy Loading (Optional)

If tooltip definitions become large (>20 terms):

```typescript
// Lazy load definitions
const tooltipDefinitions = {
  async GAMR() {
    return (await import('./tooltip-definitions')).GAMR;
  },
  // ... other terms
};
```

### Rendering Optimization

```tsx
// Wrap entire page in single TooltipProvider (don't nest)
<TooltipProvider delayDuration={300}>
  <FonctionnalitesPage />
</TooltipProvider>

// Not optimal:
// <TooltipProvider><Tooltip>...</Tooltip></TooltipProvider> // Per tooltip
```

---

## Edge Cases

### Overlapping Terms

```tsx
// Nested tooltips: only outer tooltip works
<TermWithTooltip term="GAMR">
  plateforme <TermWithTooltip term="cartographie" /> GAMR
</TermWithTooltip>
// Solution: Avoid nesting, restructure text
```

### Long Definitions

```tsx
// If definition > 200 chars, truncate or use "Learn more" link
<TooltipContent className="max-w-xs">
  <p>{definition.slice(0, 197)}...</p>
  <a href="/glossary#term" className="text-xs underline mt-1">
    En savoir plus
  </a>
</TooltipContent>
```

### Mobile Viewport Overflow

```tsx
// Ensure tooltip stays within viewport
<TooltipContent
  className="max-w-[calc(100vw-2rem)]" // Prevent horizontal overflow
  side="top" // Prefer top/bottom on mobile (more space)
  sideOffset={8}
>
  {definition}
</TooltipContent>
```

---

## Maintenance

### Adding New Terms

1. Add entry to `tooltip-definitions.ts`
2. Assign priority (P1/P2/P3)
3. Verify definition ≤ 200 chars
4. Test accessibility (hover, focus, tap)
5. Update this contract document

### Updating Definitions

1. Edit definition in `tooltip-definitions.ts`
2. Verify no breaking changes (term key unchanged)
3. Test all pages using the term
4. Update version number if major change

---

**Last Updated**: 2025-10-09  
**Version**: 1.0.0  
**Next**: Complete Phase 1 with `quickstart.md`
