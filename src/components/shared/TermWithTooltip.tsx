/**
 * TermWithTooltip Component
 * Feature: Page Fonctionnalités
 *
 * Wraps technical terms with accessible tooltips
 * Supports hover (desktop), tap (mobile), and keyboard navigation
 */

import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { tooltipDefinitions } from '@/lib/tooltip-definitions';
import { cn } from '@/lib/utils';

export interface TermWithTooltipProps {
  /** Technical term to display and lookup in dictionary */
  term: string;

  /** Optional: custom display text (defaults to term) */
  children?: React.ReactNode;

  /** Optional: override default definition from dictionary */
  definition?: string;

  /** Optional: override context from dictionary */
  context?: string;

  /** Optional: additional className for trigger element */
  className?: string;
}

export function TermWithTooltip({
  term,
  children,
  definition: customDefinition,
  context: customContext,
  className,
}: TermWithTooltipProps) {
  // Lookup term in dictionary
  const tooltipData = tooltipDefinitions[term];

  // Use custom definition or fallback to dictionary
  const definition = customDefinition || tooltipData?.definition;
  const context = customContext || tooltipData?.context;

  // If no definition found, render plain text without tooltip
  if (!definition) {
    return <span className={className}>{children || term}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              // Dotted underline styling
              'underline decoration-dotted decoration-gray-400',
              // Cursor indicates help available
              'cursor-help',
              // Keyboard focus styling (A11Y-006)
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              // Make focusable for keyboard navigation
              'inline-block',
              className
            )}
            tabIndex={0}
            role="button"
            aria-label={`Définition de ${term}`}
          >
            {children || term}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs z-50" sideOffset={5}>
          <p className="text-sm">{definition}</p>
          {context && <p className="text-xs text-muted-foreground mt-1">{context}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
