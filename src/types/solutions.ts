/**
 * Type definitions for Solutions page components
 * @module types/solutions
 */

/**
 * Represents an industry sector that GAMR serves
 */
export interface Industry {
  /** Unique identifier for anchor navigation (e.g., "secteur-bancaire") */
  id: string;
  /** Display name of the sector */
  nom: string;
  /** List of regulatory standards (1-3 items) */
  normes: string[];
  /** Key challenges faced by this sector */
  defis: string[];
  /** GAMR solutions addressing these challenges */
  solutions: string[];
  /** Path to icon or component name */
  icone: string;
  /** Display order (optional, defaults to array index) */
  order?: number;
}

/**
 * CTA (Call-to-Action) button configuration
 */
export interface CTAConfig {
  /** Button text */
  label: string;
  /** Destination URL or path */
  href: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Opens in new tab */
  external?: boolean;
}

/**
 * Comparison table row data
 */
export interface ComparisonRow {
  /** Sector name */
  secteur: string;
  /** List of key norms */
  normesKeys: string[];
  /** List of GAMR modules */
  modulesGAMR: string[];
}

/**
 * Props for HeroSection component
 */
export interface HeroSectionProps {
  /** Main heading text */
  title: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Primary CTA configuration */
  primaryCTA: CTAConfig;
  /** Secondary CTA configuration */
  secondaryCTA: CTAConfig;
  /** Optional background image or gradient */
  background?: string;
}

/**
 * Props for IntroSection component
 */
export interface IntroSectionProps {
  /** Introduction text content */
  content: string;
  /** Optional className for styling override */
  className?: string;
}

/**
 * Props for SolutionCard component
 */
export interface SolutionCardProps {
  /** Industry data */
  industry: Industry;
  /** Optional visual variant */
  variant?: 'default' | 'highlighted';
  /** Optional className for styling override */
  className?: string;
  /** Callback when card is clicked (optional, for future interactions) */
  onClick?: (industryId: string) => void;
}

/**
 * Props for SectorsGrid component
 */
export interface SectorsGridProps {
  /** Array of industry data to display */
  industries: Industry[];
  /** Grid layout variant */
  layout?: 'grid' | 'stack';
  /** Optional className for styling override */
  className?: string;
}

/**
 * Props for ComparisonTable component
 */
export interface ComparisonTableProps {
  /** Array of industry data for comparison */
  industries: Industry[];
  /** Optional table caption */
  caption?: string;
  /** Optional className for styling override */
  className?: string;
}

/**
 * Props for ConversionCTA component
 */
export interface ConversionCTAProps {
  /** Headline text */
  headline: string;
  /** Array of CTA configurations */
  ctas: CTAConfig[];
  /** Optional background color or gradient */
  background?: string;
  /** Optional className for styling override */
  className?: string;
}
