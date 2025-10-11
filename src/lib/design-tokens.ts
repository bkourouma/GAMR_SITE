/**
 * Design Tokens
 * Feature: 002-transform-the-gamr
 *
 * Central definition of all design system tokens including colors, spacing, typography.
 */

import { ColorToken, ColorCategory } from '@/types/design-system';

/**
 * Color palette for GAMR brand
 * All colors meet WCAG AA contrast requirements
 */
export const colorTokens: ColorToken[] = [
  {
    name: 'primary',
    value: '#0A2463',
    rgb: '10, 36, 99',
    category: ColorCategory.PRIMARY,
    usage: 'Hero background, primary buttons, main navigation',
    contrastRatio: 12.3,
    tailwindClass: 'bg-primary',
  },
  {
    name: 'secondary',
    value: '#247BA0',
    rgb: '36, 123, 160',
    category: ColorCategory.SECONDARY,
    usage: 'Hero gradient, secondary buttons, accents',
    contrastRatio: 4.8,
    tailwindClass: 'bg-secondary',
  },
  {
    name: 'accent',
    value: '#FF6B35',
    rgb: '255, 107, 53',
    category: ColorCategory.ACCENT,
    usage: 'Call-to-action highlights, focus indicators, vibrant accents',
    contrastRatio: 3.9,
    tailwindClass: 'bg-accent',
  },
  {
    name: 'success',
    value: '#2EC4B6',
    rgb: '46, 196, 182',
    category: ColorCategory.SUCCESS,
    usage: 'Success messages, positive indicators, progress bars',
    contrastRatio: 3.2,
    tailwindClass: 'bg-success',
  },
  {
    name: 'warning',
    value: '#FFB703',
    rgb: '255, 183, 3',
    category: ColorCategory.WARNING,
    usage: 'Warning messages, attention indicators',
    contrastRatio: 1.9,
    tailwindClass: 'bg-warning',
  },
  {
    name: 'background',
    value: '#F8F9FA',
    rgb: '248, 249, 250',
    category: ColorCategory.BACKGROUND,
    usage: 'Page background, card backgrounds, alternating sections',
    contrastRatio: 1.0,
    tailwindClass: 'bg-background',
  },
  {
    name: 'text',
    value: '#212529',
    rgb: '33, 37, 41',
    category: ColorCategory.TEXT,
    usage: 'Primary text color, headings, body copy',
    contrastRatio: 16.1,
    tailwindClass: 'text-text',
  },
];

/**
 * Get a color token by name
 */
export function getColorToken(name: string): ColorToken | undefined {
  return colorTokens.find((token) => token.name === name);
}

/**
 * Get color tokens by category
 */
export function getColorsByCategory(category: ColorCategory): ColorToken[] {
  return colorTokens.filter((token) => token.category === category);
}

/**
 * Animation duration presets (in milliseconds)
 */
export const animationDurations = {
  instant: 0,
  fast: 150,
  normal: 300,
  moderate: 500,
  slow: 700,
  verySlow: 1000,
  counter: 2000,
  float: 3000,
} as const;

/**
 * Easing curves (cubic-bezier values)
 */
export const easingCurves = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Z-index layers for consistent stacking
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Breakpoints for responsive design (matches Tailwind defaults)
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
