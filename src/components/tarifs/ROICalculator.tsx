/**
 * ROICalculator Component
 * Feature: 005-g-n-re - Page Tarifs
 *
 * Interactive ROI calculator with real-time results
 */

'use client';

import { useState } from 'react';
import { useROICalculator } from '@/hooks/useROICalculator';
import { FormattedPrice } from '@/components/shared/FormattedPrice';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import type { ROIInputs, ROIResults } from '@/types/roi';
import { cn } from '@/lib/utils';

export interface ROICalculatorProps {
  /** Pre-selected plan for ROI context (optional) */
  planId?: string;

  /** Callback when ROI is calculated */
  onCalculate?: (results: ROIResults) => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Interactive ROI calculator
 */
export function ROICalculator({ planId, onCalculate, className }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<ROIInputs>({
    numberOfUsers: 10,
    incidentsAvoidedPerMonth: 5,
    timeSavedPerUserPerWeek: 2,
  });

  const { results, errors, isValid } = useROICalculator(inputs, planId);

  const handleInputChange = (field: keyof ROIInputs, value: string): void => {
    const numValue = parseInt(value, 10) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));

    if (isValid && results && onCalculate) {
      onCalculate(results);
    }
  };

  return (
    <section
      className={cn(
        'roi-calculator-section py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50',
        className
      )}
      aria-labelledby="roi-calculator-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2
            id="roi-calculator-title"
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            📊 Calculateur de ROI
          </h2>
          <p className="text-lg text-gray-600">
            Estimez le retour sur investissement de GAMR pour votre organisation
          </p>
        </div>

        <Card className="shadow-xl border-2 border-purple-100">
          <CardHeader>
            <h3 className="text-xl font-semibold">Vos paramètres</h3>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" aria-labelledby="roi-calculator-title">
              {/* Number of Users */}
              <div>
                <Label htmlFor="users-input" className="text-sm font-medium text-gray-700">
                  Nombre d&apos;utilisateurs
                  <span className="text-red-500 ml-1" aria-label="requis">
                    *
                  </span>
                </Label>
                <Input
                  id="users-input"
                  type="number"
                  min="1"
                  max="1000"
                  value={inputs.numberOfUsers}
                  onChange={(e) => handleInputChange('numberOfUsers', e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby="users-help users-error"
                  aria-invalid={!!errors.numberOfUsers}
                  className={cn(errors.numberOfUsers && 'border-red-500')}
                />
                <p id="users-help" className="text-xs text-gray-500 mt-1">
                  Entre 1 et 1000 utilisateurs
                </p>
                {errors.numberOfUsers && (
                  <p id="users-error" role="alert" className="text-xs text-red-600 mt-1">
                    {errors.numberOfUsers}
                  </p>
                )}
              </div>

              {/* Incidents Avoided */}
              <div>
                <Label htmlFor="incidents-input" className="text-sm font-medium text-gray-700">
                  Incidents évités par mois
                  <span className="text-red-500 ml-1" aria-label="requis">
                    *
                  </span>
                </Label>
                <Input
                  id="incidents-input"
                  type="number"
                  min="0"
                  max="50"
                  value={inputs.incidentsAvoidedPerMonth}
                  onChange={(e) => handleInputChange('incidentsAvoidedPerMonth', e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby="incidents-help incidents-error"
                  aria-invalid={!!errors.incidentsAvoidedPerMonth}
                  className={cn(errors.incidentsAvoidedPerMonth && 'border-red-500')}
                />
                <p id="incidents-help" className="text-xs text-gray-500 mt-1">
                  Nombre d&apos;incidents de sécurité ou conformité évités (0-50)
                </p>
                {errors.incidentsAvoidedPerMonth && (
                  <p id="incidents-error" role="alert" className="text-xs text-red-600 mt-1">
                    {errors.incidentsAvoidedPerMonth}
                  </p>
                )}
              </div>

              {/* Time Saved */}
              <div>
                <Label htmlFor="time-saved-input" className="text-sm font-medium text-gray-700">
                  Temps gagné par utilisateur par semaine (heures)
                  <span className="text-red-500 ml-1" aria-label="requis">
                    *
                  </span>
                </Label>
                <Input
                  id="time-saved-input"
                  type="number"
                  min="0"
                  max="40"
                  step="0.5"
                  value={inputs.timeSavedPerUserPerWeek}
                  onChange={(e) => handleInputChange('timeSavedPerUserPerWeek', e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby="time-help time-error"
                  aria-invalid={!!errors.timeSavedPerUserPerWeek}
                  className={cn(errors.timeSavedPerUserPerWeek && 'border-red-500')}
                />
                <p id="time-help" className="text-xs text-gray-500 mt-1">
                  Heures gagnées grâce à l&apos;automatisation (0-40 heures/semaine)
                </p>
                {errors.timeSavedPerUserPerWeek && (
                  <p id="time-error" role="alert" className="text-xs text-red-600 mt-1">
                    {errors.timeSavedPerUserPerWeek}
                  </p>
                )}
              </div>

              {/* Results Display */}
              <div className="pt-6 border-t-2 border-gradient-to-r from-purple-200 to-blue-200">
                <h4 className="text-lg font-bold mb-6 text-center text-gray-900">
                  ✨ Votre ROI estimé
                </h4>

                {isValid && results ? (
                  <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className="space-y-4 animate-fade-in"
                  >
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        💰 Économies mensuelles :
                      </span>
                      <FormattedPrice
                        value={results.monthlySavings}
                        className="text-xl font-bold text-green-700"
                      />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">📈 ROI mensuel :</span>
                      <FormattedPrice
                        value={results.monthlyROI}
                        className={cn(
                          'text-xl font-bold',
                          results.monthlyROI >= 0 ? 'text-green-700' : 'text-red-600'
                        )}
                      />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-md">
                      <span className="text-sm font-medium text-gray-800">🎯 ROI annuel :</span>
                      <FormattedPrice
                        value={results.annualROI}
                        className={cn(
                          'text-2xl font-extrabold',
                          results.annualROI >= 0 ? 'text-green-700' : 'text-red-600'
                        )}
                      />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
                      <span className="text-sm font-medium text-gray-700">
                        ⏱️ Seuil de rentabilité :
                      </span>
                      <span className="text-lg font-bold text-orange-600">
                        {results.breakEvenMonths === null
                          ? 'N/A'
                          : results.breakEvenMonths === 0
                            ? '✨ Immédiat'
                            : `${results.breakEvenMonths} mois`}
                      </span>
                    </div>

                    {results.monthlyROI < 0 && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg animate-slide-in">
                        <p className="text-sm text-yellow-900 font-medium">
                          💡 <strong>Astuce :</strong> Pour un ROI positif, envisagez un plan
                          supérieur ou optimisez vos paramètres.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-6">
                    <p className="text-sm">
                      Veuillez corriger les erreurs ci-dessus pour voir les résultats
                    </p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-gray-500">
          <p>
            Calculs basés sur un taux horaire de 15.000 FCFA et un coût moyen d&apos;incident de
            500.000 FCFA. Les résultats sont des estimations indicatives.
          </p>
        </div>
      </div>
    </section>
  );
}
