/**
 * Tarifs Page - GAMR Pricing
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Main pricing page with Cloud and On-Premise options
 */

'use client';

import { useState } from 'react';
import { PricingHero } from '@/components/tarifs/PricingHero';
import { DeploymentToggle } from '@/components/tarifs/DeploymentToggle';
import { BillingToggle } from '@/components/tarifs/BillingToggle';
import { CloudPricingGrid } from '@/components/tarifs/CloudPricingGrid';
import { OnPremiseSection } from '@/components/tarifs/OnPremiseSection';
import { ComparisonTable } from '@/components/tarifs/ComparisonTable';
import { AddonsSection } from '@/components/tarifs/AddonsSection';
import { ROICalculator } from '@/components/tarifs/ROICalculator';
import { PricingFAQ } from '@/components/tarifs/PricingFAQ';
import { PricingCTA } from '@/components/tarifs/PricingCTA';
import { PricingStructuredData } from '@/components/tarifs/PricingStructuredData';
import { FAQStructuredData } from '@/components/tarifs/FAQStructuredData';
import type { DeploymentModel, BillingPeriod } from '@/types/pricing';

/**
 * Pricing page component
 */
export default function TarifsPage() {
  const [deploymentModel, setDeploymentModel] = useState<DeploymentModel>('cloud');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  return (
    <>
      {/* Structured Data for SEO */}
      <PricingStructuredData />
      <FAQStructuredData />

      <main className="tarifs-page min-h-screen bg-white">
        {/* Hero Section */}
        <PricingHero />

        {/* Toggles Section */}
        <div className="toggles-container py-10 bg-white border-y-2 border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Deployment Toggle */}
              <DeploymentToggle value={deploymentModel} onChange={setDeploymentModel} />

              {/* Billing Toggle - Only show for Cloud */}
              {deploymentModel === 'cloud' && (
                <>
                  <div className="hidden sm:block w-px h-8 bg-gray-300" aria-hidden="true" />
                  <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Content - Conditional based on deployment model */}
        <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
          {deploymentModel === 'cloud' ? (
            <CloudPricingGrid
              billingPeriod={billingPeriod}
              onPlanSelect={(planId) => {
                // Analytics tracking
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'select_plan', {
                    event_category: 'pricing',
                    event_label: planId,
                    value: billingPeriod,
                  });
                }
              }}
            />
          ) : (
            <OnPremiseSection
              onServiceSelect={(serviceId) => {
                // Analytics tracking
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'select_service', {
                    event_category: 'pricing',
                    event_label: serviceId,
                  });
                }
              }}
            />
          )}
        </div>

        {/* Add-ons Section */}
        <AddonsSection
          onAddonContact={(addonId) => {
            // Analytics tracking
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'contact_addon', {
                event_category: 'pricing',
                event_label: addonId,
              });
            }
          }}
        />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* ROI Calculator */}
        <ROICalculator
          planId="cloud-business"
          onCalculate={(results) => {
            // Analytics tracking
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'calculate_roi', {
                event_category: 'pricing',
                event_label: 'roi_calculator',
                value: results.monthlyROI,
              });
            }
          }}
        />

        {/* FAQ Section */}
        <PricingFAQ defaultExpanded={0} />

        {/* Final CTA */}
        <PricingCTA />
      </main>
    </>
  );
}
