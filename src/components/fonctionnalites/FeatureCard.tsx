/**
 * FeatureCard Component
 * Feature: Page Fonctionnalités - User Story 1
 *
 * Individual feature card with icon, title, description, and benefits
 */

import * as React from 'react';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { Feature } from '@/types/features';

export interface FeatureCardProps extends Omit<Feature, 'key'> {
  className?: string;
}

export function FeatureCard({
  title,
  description,
  benefitsText,
  icon,
  className,
}: FeatureCardProps) {
  // Dynamically import Lucide icon based on icon name
  const LucideIcon = Icons[icon as keyof typeof Icons] as React.ComponentType<{
    className?: string;
    'aria-hidden'?: boolean;
  }>;

  return (
    <Card
      className={`flex flex-col p-6 min-h-[280px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className || ''}`}
    >
      {/* Icon */}
      <div className="mb-4">
        {LucideIcon && <LucideIcon className="h-12 w-12 text-blue-600" aria-hidden={true} />}
      </div>

      {/* Title with tooltip */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      {/* Benefits text (distinguished styling with icon) */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <p className="text-sm text-blue-600 font-medium leading-relaxed flex items-start gap-2">
          <span className="text-blue-500 flex-shrink-0 mt-0.5">💡</span>
          <span>{benefitsText}</span>
        </p>
      </div>
    </Card>
  );
}
