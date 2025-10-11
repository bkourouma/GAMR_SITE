/**
 * AddonCard Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Individual add-on card with features and contact CTA
 */

'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Addon } from '@/types/pricing';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export interface AddonCardProps {
  /** Add-on data */
  addon: Addon;

  /** Callback when contact CTA is clicked */
  onContactClick?: (addonId: string) => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Add-on card component
 */
export function AddonCard({ addon, onContactClick, className }: AddonCardProps) {
  return (
    <Card
      className={cn(
        'addon-card flex flex-col h-full border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:scale-105',
        className
      )}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          {addon.icon && (
            <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow-sm">
              <span className="text-3xl" role="img" aria-label={addon.name}>
                {getIconEmoji(addon.icon)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {addon.name}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 mb-4">{addon.description}</p>

        <ul className="space-y-2" aria-label="Fonctionnalités incluses">
          {addon.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Availability indicator */}
        {addon.availability !== 'both' && (
          <div className="mt-4 text-xs text-gray-500 italic">
            {addon.availability === 'cloud-only'
              ? 'Disponible uniquement en Cloud'
              : 'Disponible uniquement en On-Premise'}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link
          href="/contact?type=addon"
          onClick={() => onContactClick?.(addon.id)}
          className="w-full"
        >
          <Button variant="outline" className="w-full">
            Nous contacter
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

/**
 * Map icon names to emoji (simple implementation)
 */
function getIconEmoji(iconName: string): string {
  const iconMap: Record<string, string> = {
    sparkles: '✨',
    'shield-check': '🛡️',
    link: '🔗',
    headset: '🎧',
    'graduation-cap': '🎓',
  };

  return iconMap[iconName] || '📦';
}
