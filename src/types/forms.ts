/**
 * Form data types inferred from Zod schemas
 * These match the validation schemas in src/lib/validations.ts
 */

export type DeploymentType = 'cloud' | 'onpremise' | 'unsure';
export type UserCount = '1-10' | '11-50' | '51-200' | '200+';
export type FormIndustry =
  | 'technology'
  | 'health'
  | 'finance'
  | 'manufacturing'
  | 'government'
  | 'other';

export type TrialSignupPayload = {
  email: string;
  organization: string;
  deploymentType: DeploymentType;
  userCount: UserCount;
  honeypot: string;
};

export type DemoRequestPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  industry: FormIndustry;
  deploymentType: DeploymentType;
  needs?: string;
  honeypot: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
};

export type DataDeletionPayload = {
  email: string;
  honeypot: string;
};

export type FormResponse<T = unknown> =
  | { success: true; message: string; data?: T }
  | { success: false; errors: Array<{ field: string; message: string }> }
  | { success: false; message: string };
