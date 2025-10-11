import { z } from 'zod';
import { isPersonalEmailDomain } from './utils';

/**
 * Trial Signup Form Validation Schema
 */
export const trialSignupSchema = z.object({
  email: z
    .string()
    .min(1, 'Ce champ est obligatoire')
    .email('Veuillez entrer un email valide (ex: nom@entreprise.com)')
    .refine((email) => !isPersonalEmailDomain(email), 'Veuillez utiliser un email professionnel'),
  organization: z
    .string()
    .min(2, "Le nom de l'organisation doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'organisation est trop long"),
  deploymentType: z.enum(['cloud', 'onpremise', 'unsure'], {
    message: 'Veuillez sélectionner un type de déploiement',
  }),
  userCount: z.enum(['1-10', '11-50', '51-200', '200+'], {
    message: "Veuillez sélectionner le nombre d'utilisateurs",
  }),
  honeypot: z.string().max(0, 'Invalid submission'),
});

export type TrialSignupFormData = z.infer<typeof trialSignupSchema>;

/**
 * Demo Request Form Validation Schema
 */
export const demoRequestSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom est trop long'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom est trop long'),
  email: z
    .string()
    .min(1, 'Ce champ est obligatoire')
    .email('Veuillez entrer un email valide (ex: nom@entreprise.com)'),
  phone: z
    .string()
    .min(1, 'Ce champ est obligatoire')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Numéro de téléphone invalide'),
  organization: z
    .string()
    .min(2, "Le nom de l'organisation doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'organisation est trop long"),
  industry: z.enum(['technology', 'health', 'finance', 'manufacturing', 'government', 'other'], {
    message: "Veuillez sélectionner votre secteur d'activité",
  }),
  deploymentType: z.enum(['cloud', 'onpremise', 'unsure'], {
    message: 'Veuillez sélectionner un type de déploiement',
  }),
  needs: z.string().max(500, 'La description est trop longue (max 500 caractères)').optional(),
  honeypot: z.string().max(0, 'Invalid submission'),
});

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

/**
 * Contact Form Validation Schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom est trop long'),
  email: z.string().min(1, 'Ce champ est obligatoire').email('Veuillez entrer un email valide'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message est trop long (max 1000 caractères)'),
  honeypot: z.string().max(0, 'Invalid submission'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Data Deletion Request Validation Schema
 */
export const dataDeletionSchema = z.object({
  email: z.string().min(1, 'Ce champ est obligatoire').email('Veuillez entrer un email valide'),
  honeypot: z.string().max(0, 'Invalid submission'),
});

export type DataDeletionFormData = z.infer<typeof dataDeletionSchema>;
