/**
 * Design System Type Definitions
 * Feature: 002-transform-the-gamr
 *
 * Types for color tokens, spacing, and design system primitives.
 */

/**
 * Color categories in the design system
 */
export enum ColorCategory {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
  SUCCESS = 'success',
  WARNING = 'warning',
  BACKGROUND = 'background',
  TEXT = 'text',
}

/**
 * Color token representing a semantic color in the design system
 */
export interface ColorToken {
  /** Semantic name for the color */
  name: string;
  /** Hex color value (#RRGGBB) */
  value: string;
  /** RGB representation for alpha variations (e.g., "10, 36, 99") */
  rgb?: string;
  /** Color category */
  category: ColorCategory;
  /** Usage guidelines for this color */
  usage?: string;
  /** WCAG contrast ratio against white */
  contrastRatio?: number;
  /** Corresponding Tailwind class name */
  tailwindClass?: string;
}
