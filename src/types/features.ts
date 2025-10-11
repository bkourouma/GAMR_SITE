/**
 * Type definitions for GAMR Features Page
 * Feature: Page Fonctionnalités
 */

/**
 * Individual feature of the GAMR platform
 */
export interface Feature {
  /** Unique identifier (kebab-case) */
  key: string;

  /** Display name (max 50 chars) */
  title: string;

  /** Short description (max 150 chars, 2 sentences) */
  description: string;

  /** Benefits-oriented copy (max 250 chars) */
  benefitsText: string;

  /** Lucide React icon name */
  icon: string;

  /** Display order (sequential per category) */
  order: number;

  /** Feature category */
  category: 'main' | 'secondary';
}

/**
 * Collection of features organized by category
 * Follows nested structure per FR-015 clarification
 */
export interface FeaturesCollection {
  /** Primary features (exactly 7) displayed on features page */
  main: Feature[];

  /** Secondary/future features (0+) reserved for expansion */
  secondary: Feature[];
}

/**
 * Single row in the "Avant GAMR vs Avec GAMR" comparison table
 */
export interface ComparisonItem {
  /** Aspect being compared (e.g., "Productivité") */
  dimension: string;

  /** Description of pain point before GAMR */
  situationBefore: string;

  /** Description of improvement with GAMR */
  situationWithGAMR: string;

  /** Optional quantified improvement (e.g., "+70%") */
  improvementMetric?: string;
}

/**
 * Technical term with explanatory definition
 */
export interface TooltipDefinition {
  /** Technical term (case-sensitive) */
  term: string;

  /** Plain-language explanation (max 200 chars) */
  definition: string;

  /** Optional additional context for disambiguation */
  context?: string;
}

/**
 * Dictionary mapping terms to their definitions
 */
export type TooltipDictionary = Record<string, TooltipDefinition>;

/**
 * Array of comparison items (8-10 items per requirement)
 */
export type ComparisonTable = ComparisonItem[];
