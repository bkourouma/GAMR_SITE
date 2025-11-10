/**
 * SEO helpers for generating meta tags and JSON-LD structured data
 */

import { SITE_CONFIG } from './constants';

export type PageSEO = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
};

/**
 * Generate page metadata for Next.js
 */
export function generatePageMeta(seo: PageSEO) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl || SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: seo.ogImage || `${SITE_CONFIG.url}/images/og-images/default.jpg`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || `${SITE_CONFIG.url}/images/og-images/default.jpg`],
    },
    alternates: {
      canonical: seo.canonicalUrl,
    },
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.contactEmail,
      contactType: 'customer service',
      availableLanguage: ['French'],
    },
  };
}

/**
 * Generate WebSite JSON-LD schema
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
  };
}

/**
 * Generate Article JSON-LD schema (for case studies)
 */
export function generateArticleSchema(params: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    image: params.image,
    datePublished: params.datePublished,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.svg`,
      },
    },
  };
}

/**
 * Generate Product JSON-LD schema (for pricing page)
 */
export function generateProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GAMRdigitale Platform',
    applicationCategory: 'BusinessApplication',
    description: SITE_CONFIG.description,
    offers: [
      {
        '@type': 'Offer',
        name: 'Cloud (SaaS)',
        description: 'Solution hébergée avec déploiement en 24h',
      },
      {
        '@type': 'Offer',
        name: 'OnPremise',
        description: 'Solution sur site avec contrôle total des données',
      },
    ],
  };
}
