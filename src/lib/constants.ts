/**
 * Site-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: 'GAMRdigitale',
  title: 'GAMRdigitale - Plateforme Intelligente de Gestion des Risques | IA & Analytics',
  description:
    'Transformez votre gestion des risques avec GAMRdigitale : évaluations automatisées, analyse IA, scoring intelligent. Essai gratuit 30 jours.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gamr.com',
  locale: 'fr',
  contactEmail: 'contact@gamr.com',
} as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/gamr',
  linkedin: 'https://linkedin.com/company/gamr',
  github: 'https://github.com/gamr',
} as const;

export const DEPLOYMENT_TYPES = [
  { value: 'cloud', label: 'Cloud (SaaS) - Recommandé' },
  { value: 'onpremise', label: 'OnPremise (Sur site)' },
  { value: 'unsure', label: 'Je ne sais pas encore' },
] as const;

export const USER_COUNT_OPTIONS = [
  { value: '1-10', label: '1-10 utilisateurs' },
  { value: '11-50', label: '11-50 utilisateurs' },
  { value: '51-200', label: '51-200 utilisateurs' },
  { value: '200+', label: '200+ utilisateurs' },
] as const;

export const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Technologie & Logiciel' },
  { value: 'health', label: 'Santé & Médical' },
  { value: 'finance', label: 'Services Financiers & Assurance' },
  { value: 'manufacturing', label: 'Manufacturing & Industrie' },
  { value: 'government', label: 'Gouvernement & Secteur Public' },
  { value: 'other', label: 'Autre' },
] as const;

export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
