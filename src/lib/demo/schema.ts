import { z } from 'zod';
import { addHours, isAfter, parseISO } from 'date-fns';

// ============================================================================
// ENUM SCHEMAS (T009)
// ============================================================================

// Role (optional field)
export const roleSchema = z.enum([
  'direction',
  'compliance_audit',
  'operations',
  'it_security',
  'other',
]);
export type Role = z.infer<typeof roleSchema>;

// Sector (required field)
export const sectorSchema = z.enum([
  'extractive',
  'aeroportuaire',
  'gouvernement',
  'banque_finance',
  'sante_hopitaux',
  'autre',
]);
export type Sector = z.infer<typeof sectorSchema>;

// Standards (multiselect, min 1)
export const standardSchema = z.enum([
  'iso31000',
  'iso27001',
  'iso45001',
  'iso14001',
  'icao_annexe_19',
  'coso_erm',
  'rgpd_anssi_ci',
  'basel_iii',
  'oms_patient_safety',
  'autre',
]);
export type Standard = z.infer<typeof standardSchema>;

// Goals (multiselect, min 1)
export const goalSchema = z.enum([
  'cartographie',
  'conformite_audits',
  'automatisation_workflows',
  'reporting',
  'collaboration',
  'incidents',
]);
export type Goal = z.infer<typeof goalSchema>;

// Team Size (required field)
export const teamSizeSchema = z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']);
export type TeamSize = z.infer<typeof teamSizeSchema>;

// Imports (multiselect, optional)
export const importSchema = z.enum(['excel', 'csv', 'erp_crm', 'aucun', 'autre']);
export type Import = z.infer<typeof importSchema>;

// Modules (multiselect, min 1)
export const moduleSchema = z.enum([
  'evaluation_risques',
  'plans_action',
  'incidents_nc',
  'audits_rapports',
  'tableaux_bord',
  'multi_entites',
]);
export type Module = z.infer<typeof moduleSchema>;

// Meeting Tool (required field)
export const meetingToolSchema = z.enum(['google_meet', 'microsoft_teams', 'zoom', 'phone']);
export type MeetingTool = z.infer<typeof meetingToolSchema>;

// Mode (required field)
export const modeSchema = z.enum(['cloud', 'onprem']);
export type Mode = z.infer<typeof modeSchema>;

// Language (required field)
export const languageSchema = z.enum(['fr', 'en']);
export type Language = z.infer<typeof languageSchema>;

// ============================================================================
// TIME SLOT SCHEMA (T010)
// ============================================================================

export const timeSlotSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La date doit être au format YYYY-MM-DD')
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
      },
      { message: 'Date invalide' }
    ),

  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "L'heure doit être au format 24h (HH:mm)"),
});
export type TimeSlot = z.infer<typeof timeSlotSchema>;

// ============================================================================
// COMPOSITE SCHEMAS (T011)
// ============================================================================

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne doit pas dépasser 100 caractères'),

  organization: z
    .string()
    .trim()
    .min(2, "Le nom de l'organisation doit contenir au moins 2 caractères")
    .max(150, "Le nom de l'organisation ne doit pas dépasser 150 caractères"),

  email: z
    .string()
    .trim()
    .email("Format d'email invalide")
    .max(255, "L'email ne doit pas dépasser 255 caractères")
    .toLowerCase(),

  // Phone - any string allowed
  phone: z.string().default('').optional(),

  role: roleSchema.optional(),
});
export type ContactInfo = z.infer<typeof contactSchema>;

export const qualificationSchema = z.object({
  sector: sectorSchema,

  standards: z.array(standardSchema).min(1, 'Veuillez sélectionner au moins une norme'),

  standardsOther: z
    .string()
    .default('')
    .refine((val) => val.trim().length <= 200, {
      message: 'La précision ne doit pas dépasser 200 caractères',
    }),

  goals: z.array(goalSchema).min(1, 'Veuillez sélectionner au moins un objectif'),

  teamSize: teamSizeSchema,

  context: z
    .string()
    .default('')
    .refine((val) => val.trim().length <= 400, {
      message: 'Le contexte ne doit pas dépasser 400 caractères',
    }),

  mode: modeSchema,

  imports: z.array(importSchema).catch([]),

  modules: z.array(moduleSchema).min(1, 'Veuillez sélectionner au moins un module à prioriser'),
});
export type Qualification = z.infer<typeof qualificationSchema>;

// Scheduling Information (NOTE: duration field removed per user requirement)
export const schedulingSchema = z.object({
  _timezone: z
    .string()
    .min(1, 'Le fuseau horaire est requis')
    .default('Africa/Abidjan')
    .refine(
      (tz) => {
        try {
          // Validate IANA timezone identifier
          Intl.DateTimeFormat(undefined, { timeZone: tz });
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Identifiant de fuseau horaire invalide' }
    ),

  slot1: timeSlotSchema,
  slot2: timeSlotSchema,
  slot3: timeSlotSchema,

  meetingTool: meetingToolSchema.default('google_meet'),
  language: languageSchema.default('fr'),
});
export type Scheduling = z.infer<typeof schedulingSchema>;

export const consentSchema = z.object({
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Le consentement RGPD est requis pour soumettre ce formulaire',
  }),

  marketingOptIn: z.boolean().default(false),

  // Honeypot field (anti-spam)
  honeypot: z
    .string()
    .default('')
    .refine((val) => val === '', {
      message: 'Soumission invalide',
    }),
});
export type Consent = z.infer<typeof consentSchema>;

// Complete Demo Request Schema
export const demoRequestSchema = contactSchema
  .merge(qualificationSchema)
  .merge(schedulingSchema)
  .merge(consentSchema)
  .refine(
    (data) => {
      // If "autre" is in standards, standardsOther must be provided
      if (data.standards.includes('autre')) {
        return !!data.standardsOther && data.standardsOther.trim().length > 0;
      }
      return true;
    },
    {
      message: 'Veuillez préciser la norme lorsque vous sélectionnez "Autre"',
      path: ['standardsOther'],
    }
  );
export type DemoRequest = z.infer<typeof demoRequestSchema>;

// ============================================================================
// CUSTOM VALIDATION FUNCTIONS (T012)
// ============================================================================

/**
 * Validates that a time slot is at least 24 hours in the future
 * Simplified validation using local time comparison
 */
export function validateFutureTimeSlot(
  slot: TimeSlot,
  _timezone: string
): { valid: boolean; error?: string } {
  try {
    // Parse date and time into datetime
    const slotDateTime = parseISO(`${slot.date}T${slot.time}:00`);

    // Check if at least 24 hours in future
    const minDateTime = addHours(new Date(), 24);

    if (!isAfter(slotDateTime, minDateTime)) {
      return {
        valid: false,
        error: 'Le créneau doit être au moins 24 heures dans le futur',
      };
    }

    return { valid: true };
  } catch {
    return {
      valid: false,
      error: 'Date/heure invalide',
    };
  }
}

/**
 * Validates all 3 time slots are in the future
 */
export function validateAllTimeSlots(
  slot1: TimeSlot,
  slot2: TimeSlot,
  slot3: TimeSlot,
  _timezone: string
): Record<string, string> {
  const errors: Record<string, string> = {};

  const validation1 = validateFutureTimeSlot(slot1, _timezone);
  if (!validation1.valid) {
    errors['slot1'] = validation1.error!;
  }

  const validation2 = validateFutureTimeSlot(slot2, _timezone);
  if (!validation2.valid) {
    errors['slot2'] = validation2.error!;
  }

  const validation3 = validateFutureTimeSlot(slot3, _timezone);
  if (!validation3.valid) {
    errors['slot3'] = validation3.error!;
  }

  return errors;
}
