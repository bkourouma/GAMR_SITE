/**
 * PricingFAQ Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * FAQ section with accordion
 */

'use client';

import { faqEntries } from '@/lib/pricing-data';
import type { FAQCategory } from '@/types/pricing';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface PricingFAQProps {
  /** Optional title override */
  title?: string;

  /** Filter by category (optional) */
  category?: FAQCategory;

  /** Initially expanded FAQ item index (optional) */
  defaultExpanded?: number;

  /** Additional CSS classes */
  className?: string;
}

/**
 * FAQ section with accordion
 */
export function PricingFAQ({
  title = 'Questions fréquentes',
  category,
  defaultExpanded,
  className,
}: PricingFAQProps) {
  const filteredFAQs = category
    ? faqEntries.filter((faq) => faq.category === category)
    : faqEntries;

  const sortedFAQs = filteredFAQs.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section
      className={cn('pricing-faq py-16 bg-gradient-to-br from-white to-gray-50', className)}
      aria-labelledby="faq-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id="faq-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent"
        >
          ❓ {title}
        </h2>

        <Accordion
          type="single"
          collapsible
          {...(defaultExpanded !== undefined ? { defaultValue: `item-${defaultExpanded}` } : {})}
          className="space-y-4"
        >
          {sortedFAQs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={`item-${index}`}
              className="border-2 border-gray-200 rounded-xl px-6 bg-white shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300"
            >
              <AccordionTrigger className="hover:no-underline py-5">
                <h3 className="text-left text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Vous avez d&apos;autres questions ?{' '}
            <a href="/contact" className="text-blue-600 hover:underline font-medium">
              Contactez notre équipe
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
