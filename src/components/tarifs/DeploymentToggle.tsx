/**
 * DeploymentToggle Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Toggle between Cloud and On-Premise deployment models
 */

'use client';

import type { DeploymentModel } from '@/types/pricing';
import { cn } from '@/lib/utils';

export interface DeploymentToggleProps {
  /** Current selected deployment model */
  value: DeploymentModel;

  /** Callback when deployment model changes */
  onChange: (model: DeploymentModel) => void;

  /** Optional label */
  label?: string;

  /** Disable the toggle */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Toggle switch for Cloud vs On-Premise deployment
 *
 * Accessible with ARIA switch pattern and keyboard support
 */
export function DeploymentToggle({
  value,
  onChange,
  label = 'Modèle de déploiement',
  disabled = false,
  className,
}: DeploymentToggleProps) {
  const isCloud = value === 'cloud';

  const handleToggle = () => {
    if (disabled) return;
    onChange(isCloud ? 'on-premise' : 'cloud');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="group"
      aria-labelledby="deployment-toggle-label"
      className={cn('deployment-toggle', className)}
    >
      <span id="deployment-toggle-label" className="sr-only">
        {label}
      </span>

      <div className="flex items-center justify-center gap-3">
        <span
          className={cn(
            'text-sm font-semibold transition-all duration-300',
            isCloud ? 'text-blue-600 scale-110' : 'text-gray-400'
          )}
        >
          ☁️ Cloud
        </span>

        <button
          role="switch"
          aria-checked={isCloud}
          aria-label="Basculer entre Cloud et On-Premise"
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyPress}
          className={cn(
            'relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-inner',
            isCloud
              ? 'bg-gradient-to-r from-blue-600 to-blue-500'
              : 'bg-gradient-to-r from-gray-300 to-gray-400',
            disabled && 'opacity-50 cursor-not-allowed',
            !disabled && 'hover:scale-105'
          )}
        >
          <span
            className={cn(
              'inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300',
              isCloud ? 'translate-x-8' : 'translate-x-1'
            )}
          />
          <span className="sr-only">
            {isCloud ? 'Cloud sélectionné' : 'On-Premise sélectionné'}
          </span>
        </button>

        <span
          className={cn(
            'text-sm font-semibold transition-all duration-300',
            !isCloud ? 'text-purple-600 scale-110' : 'text-gray-400'
          )}
        >
          🏢 On-Premise
        </span>
      </div>
    </div>
  );
}
