/**
 * OnPremiseSection Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * On-Premise licensing information with services
 */

'use client';

import Link from 'next/link';
import { onPremisePricing } from '@/lib/pricing-data';
import { FormattedPrice } from '@/components/shared/FormattedPrice';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OnPremiseSectionProps {
  /** Optional section title override */
  title?: string;

  /** Callback when service is selected */
  onServiceSelect?: (serviceId: string) => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * On-Premise pricing section with license and services
 */
export function OnPremiseSection({
  title = 'On-Premise',
  onServiceSelect,
  className,
}: OnPremiseSectionProps) {
  const pricing = onPremisePricing;

  return (
    <section
      className={cn('on-premise-section py-8', className)}
      aria-labelledby="on-premise-title"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="on-premise-title" className="text-3xl font-bold text-center mb-8">
          {title}
        </h2>

        {/* License Info */}
        <div className="license-info bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Licence Perpétuelle</h3>
          <p className="text-gray-700 mb-4">
            Prix indicatif sur devis en fonction de vos besoins spécifiques
          </p>
          <div className="bg-white inline-block px-6 py-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Maintenance annuelle</div>
            <div className="text-2xl font-bold text-blue-600">
              20% <span className="text-sm font-normal text-gray-600">du prix de licence</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Services professionnels</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.services.map((service) => (
              <Card key={service.id} className="service-card">
                <CardHeader>
                  <h4 className="text-lg font-semibold">{service.name}</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="price text-center py-3 bg-gray-50 rounded">
                    {service.packagePrice ? (
                      <FormattedPrice value={service.packagePrice} className="text-xl font-bold" />
                    ) : (
                      <span className="text-lg font-semibold text-gray-700">Sur devis</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/contact?type=on-premise-service"
                    onClick={() => onServiceSelect?.(service.id)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Demander un devis
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Included/Excluded Features Table */}
        <div className="features-table bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Included Features */}
            <div className="p-6 border-r border-gray-200">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Inclus dans la licence
              </h4>
              <ul className="space-y-2">
                {pricing.includedFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check
                      className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded Features */}
            <div className="p-6 bg-gray-50">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-gray-400" />
                Non inclus (options)
              </h4>
              <ul className="space-y-2">
                {pricing.excludedFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link href="/contact?type=on-premise">
            <Button size="lg">Demander une consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
