/**
 * Error Boundary Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Graceful error handling for client components
 */

'use client';

import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary for graceful degradation
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: unknown) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Une erreur s&apos;est produite
          </h3>
          <p className="text-sm text-red-700 mb-4">
            Nous sommes désolés. Veuillez rafraîchir la page ou nous contacter si le problème
            persiste.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Rafraîchir la page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
