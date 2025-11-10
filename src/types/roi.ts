/**
 * ROI Calculator Types for GAMRdigitale Tarifs Page
 * Feature: 005-g-n-re - Page Tarifs
 */

/**
 * User inputs for ROI calculation
 */
export interface ROIInputs {
  /** Number of users in organization */
  numberOfUsers: number; // Range: 1-1000

  /** Security incidents avoided per month */
  incidentsAvoidedPerMonth: number; // Range: 0-50

  /** Time saved per user per week (hours) */
  timeSavedPerUserPerWeek: number; // Range: 0-40
}

/**
 * Calculated ROI results
 */
export interface ROIResults {
  /** Monthly savings in FCFA */
  monthlySavings: number;

  /** Monthly ROI (savings - plan cost) in FCFA */
  monthlyROI: number;

  /** Annual ROI in FCFA */
  annualROI: number;

  /** Break-even point in months */
  breakEvenMonths: number | null; // null if never breaks even

  /** Selected plan monthly cost (for context) */
  planCost: number;
}

/**
 * ROI calculation constants (configurable)
 */
export interface ROIConstants {
  /** Average hourly rate in FCFA */
  hourlyRate: number; // Default: 15000

  /** Average cost per security incident in FCFA */
  costPerIncident: number; // Default: 500000

  /** Setup/onboarding cost in FCFA */
  setupCost: number; // Default: 0 for Cloud

  /** Weeks per month for time calculation */
  weeksPerMonth: number; // Default: 4.33
}

/**
 * Validate ROI inputs are within acceptable ranges
 */
export function validateROIInputs(inputs: ROIInputs): {
  isValid: boolean;
  errors: Partial<Record<keyof ROIInputs, string>>;
} {
  const errors: Partial<Record<keyof ROIInputs, string>> = {};

  if (inputs.numberOfUsers < 1 || inputs.numberOfUsers > 1000) {
    errors.numberOfUsers = "Le nombre d'utilisateurs doit être entre 1 et 1000";
  }

  if (inputs.incidentsAvoidedPerMonth < 0 || inputs.incidentsAvoidedPerMonth > 50) {
    errors.incidentsAvoidedPerMonth = "Le nombre d'incidents doit être entre 0 et 50";
  }

  if (inputs.timeSavedPerUserPerWeek < 0 || inputs.timeSavedPerUserPerWeek > 40) {
    errors.timeSavedPerUserPerWeek = 'Le temps gagné doit être entre 0 et 40 heures';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
