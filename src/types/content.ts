/**
 * Content types for case studies, features, testimonials, etc.
 */

export type Industry = 'manufacturing' | 'health' | 'tech' | 'finance' | 'government';

export type CaseStudyResult = {
  label: string;
  value: string;
  description: string;
  icon: string; // Lucide icon name
};

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  industry: Industry;
  heroImage: string;
  excerpt: string;
  publishDate: string;
  featured: boolean;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientQuote: string;
  challenge: string;
  context: string;
  results: CaseStudyResult[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type CaseStudy = CaseStudyFrontmatter & {
  content: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  featured: boolean;
};

export type Feature = {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  screenshot: string;
  gifUrl?: string;
  caseStudySlug?: string;
  order: number;
};

export type PricingOption = {
  name: string;
  tagline: string;
  included: string[];
  advantages: string[];
  ctaText: string;
  ctaLink: string;
  recommended?: boolean;
};

export type ComparisonCriterion = {
  name: string;
  cloud: string;
  onpremise: string;
};

export type IndustryData = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  painPoints: string[];
  adaptedFeatures: string[];
  caseStudySlugs: string[];
  certifications: Array<{
    name: string;
    description: string;
    logo?: string;
  }>;
  ctaText: string;
};
