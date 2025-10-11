/**
 * FAQStructuredData Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * JSON-LD structured data for FAQPage
 */

import { faqEntries } from '@/lib/pricing-data';

/**
 * Generate FAQPage structured data for SEO
 */
export function FAQStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
