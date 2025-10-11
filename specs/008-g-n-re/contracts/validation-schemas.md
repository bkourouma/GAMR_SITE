# Validation Schemas: Demo Request

**Feature**: 008-g-n-re  
**Date**: 2025-10-09  
**Purpose**: Define Zod validation schemas for demo request form data

---

## Overview

All validation schemas use [Zod](https://zod.dev/) for runtime type validation and TypeScript type inference. Schemas validate:

1. Field types and formats
2. Required vs optional fields
3. String lengths and constraints
4. Array min/max items
5. Enum allowed values
6. Custom business logic (e.g., future dates)

---

## Core Schemas

### TimeSlot Schema

```typescript
import { z } from 'zod';

export const timeSlotSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
      },
      { message: 'Invalid date' }
    ),

  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in 24-hour format (HH:mm)'),
});

// Inferred TypeScript type
export type TimeSlot = z.infer<typeof timeSlotSchema>;
```

**Validation Rules**:

- `date`: Must be ISO 8601 format (YYYY-MM-DD), must be valid date
- `time`: Must be 24-hour format (HH:mm), hour 00-23, minute 00-59

**Note**: Future date validation (24h+ from now) is done separately in API route with timezone context.

---

### Enum Schemas

```typescript
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

// Duration (required field)
export const durationSchema = z.enum(['30', '45', '60']);

export type Duration = z.infer<typeof durationSchema>;
```

---

### Contact Information Schema

```typescript
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  organization: z
    .string()
    .trim()
    .min(2, 'Organization name must be at least 2 characters')
    .max(150, 'Organization name must not exceed 150 characters'),

  email: z
    .string()
    .trim()
    .email('Invalid email format')
    .max(255, 'Email must not exceed 255 characters')
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .max(20, 'Phone number must not exceed 20 characters')
    .optional()
    .or(z.literal('')),

  role: roleSchema.optional(),
});

export type ContactInfo = z.infer<typeof contactSchema>;
```

**Validation Rules**:

- `fullName`: Required, 2-100 characters, trimmed
- `organization`: Required, 2-150 characters, trimmed
- `email`: Required, valid email format, max 255 characters, lowercase
- `phone`: Optional, max 20 characters, accepts empty string
- `role`: Optional enum

---

### Qualification Schema

```typescript
export const qualificationSchema = z.object({
  sector: sectorSchema,

  standards: z.array(standardSchema).min(1, 'Please select at least one standard'),

  goals: z.array(goalSchema).min(1, 'Please select at least one goal'),

  teamSize: teamSizeSchema,

  context: z
    .string()
    .trim()
    .max(400, 'Context must not exceed 400 characters')
    .optional()
    .or(z.literal('')),

  mode: modeSchema,

  imports: z.array(importSchema).optional().default([]),

  modules: z.array(moduleSchema).min(1, 'Please select at least one module to prioritize'),
});

export type Qualification = z.infer<typeof qualificationSchema>;
```

**Validation Rules**:

- `sector`: Required enum
- `standards`: Required array, min 1 item
- `goals`: Required array, min 1 item
- `teamSize`: Required enum
- `context`: Optional, max 400 characters
- `mode`: Required enum (cloud/onprem)
- `imports`: Optional array, defaults to empty array
- `modules`: Required array, min 1 item

---

### Scheduling Schema

```typescript
export const schedulingSchema = z.object({
  timezone: z
    .string()
    .min(1, 'Timezone is required')
    .default('Africa/Abidjan')
    .refine(
      (tz) => {
        // Validate IANA timezone identifier
        try {
          Intl.DateTimeFormat(undefined, { timeZone: tz });
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Invalid timezone identifier' }
    ),

  duration: durationSchema.default('45'),

  slot1: timeSlotSchema,
  slot2: timeSlotSchema,
  slot3: timeSlotSchema,

  meetingTool: meetingToolSchema.default('google_meet'),

  language: languageSchema.default('fr'),
});

export type Scheduling = z.infer<typeof schedulingSchema>;
```

**Validation Rules**:

- `timezone`: Required, valid IANA timezone, defaults to "Africa/Abidjan"
- `duration`: Required enum, defaults to "45"
- `slot1`, `slot2`, `slot3`: Required TimeSlot objects
- `meetingTool`: Required enum, defaults to "google_meet"
- `language`: Required enum, defaults to "fr"

**Note**: Future date validation for slots is performed separately in API route with timezone conversion.

---

### Consent Schema

```typescript
export const consentSchema = z.object({
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'GDPR consent is required to submit this form',
  }),

  marketingOptIn: z.boolean().optional().default(false),

  honeypot: z
    .string()
    .optional()
    .refine((val) => !val || val === '', {
      message: 'Invalid submission',
    }),
});

export type Consent = z.infer<typeof consentSchema>;
```

**Validation Rules**:

- `gdprConsent`: Must be explicitly `true` (boolean, not truthy value)
- `marketingOptIn`: Optional boolean, defaults to `false`
- `honeypot`: Must be empty string or absent (anti-spam)

---

### Complete Demo Request Schema

```typescript
export const demoRequestSchema = z.object({
  ...contactSchema.shape,
  ...qualificationSchema.shape,
  ...schedulingSchema.shape,
  ...consentSchema.shape,
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
```

**Alternative Approach** (separate schemas composition):

```typescript
export const demoRequestSchema = contactSchema
  .merge(qualificationSchema)
  .merge(schedulingSchema)
  .merge(consentSchema);
```

**Usage in API Route**:

```typescript
import { demoRequestSchema } from '@/lib/demo/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = demoRequestSchema.parse(body);

    // data is now fully typed and validated
    // TypeScript knows all field types
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          error: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR',
            fields: error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }
  }
}
```

---

## Custom Validation Functions

### Future Date Validation

```typescript
import { zonedTimeToUtc } from 'date-fns-tz';
import { addHours, isAfter } from 'date-fns';

/**
 * Validates that a time slot is at least 24 hours in the future
 * considering the user's timezone.
 */
export function validateFutureTimeSlot(
  slot: TimeSlot,
  timezone: string
): { valid: boolean; error?: string } {
  try {
    // Combine date and time in user's timezone
    const slotDateTime = zonedTimeToUtc(`${slot.date} ${slot.time}`, timezone);

    // Check if at least 24 hours in future
    const minDateTime = addHours(new Date(), 24);

    if (!isAfter(slotDateTime, minDateTime)) {
      return {
        valid: false,
        error: 'Time slot must be at least 24 hours in the future',
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid date/time or timezone',
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
  timezone: string
): Record<string, string> {
  const errors: Record<string, string> = {};

  const validation1 = validateFutureTimeSlot(slot1, timezone);
  if (!validation1.valid) {
    errors['slot1'] = validation1.error!;
  }

  const validation2 = validateFutureTimeSlot(slot2, timezone);
  if (!validation2.valid) {
    errors['slot2'] = validation2.error!;
  }

  const validation3 = validateFutureTimeSlot(slot3, timezone);
  if (!validation3.valid) {
    errors['slot3'] = validation3.error!;
  }

  return errors;
}
```

**Usage in API Route**:

```typescript
// After Zod validation passes
const timeSlotErrors = validateAllTimeSlots(data.slot1, data.slot2, data.slot3, data.timezone);

if (Object.keys(timeSlotErrors).length > 0) {
  return Response.json(
    {
      success: false,
      error: {
        message: 'Invalid time slots',
        code: 'INVALID_TIME_SLOT',
        fields: timeSlotErrors,
      },
    },
    { status: 400 }
  );
}
```

---

## Form-Level Validation (Client-Side)

### React Hook Form Integration

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { demoRequestSchema } from "@/lib/demo/schema"

export function DemoRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(demoRequestSchema),
    mode: "onBlur", // Validate on field blur
    defaultValues: {
      timezone: "Africa/Abidjan",
      duration: "45",
      meetingTool: "google_meet",
      language: "fr",
      marketingOptIn: false
    }
  })

  const onSubmit = async (data: DemoRequest) => {
    const response = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    // Handle response...
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with error display */}
      {errors.email && (
        <span className="error">{errors.email.message}</span>
      )}
    </form>
  )
}
```

**Benefits**:

- Zod schema provides both runtime validation and TypeScript types
- Same schema used client-side (React Hook Form) and server-side (API route)
- Error messages consistent between frontend and backend
- Type safety ensures no field mismatches

---

## Error Message Localization

### French Error Messages

```typescript
import { z } from 'zod';

// Custom error map for French messages
const frenchErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'string') {
      return { message: 'Ce champ est requis' };
    }
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === 'string') {
      return { message: `Minimum ${issue.minimum} caractères requis` };
    }
    if (issue.type === 'array') {
      return { message: `Veuillez sélectionner au moins ${issue.minimum} option(s)` };
    }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string') {
      return { message: `Maximum ${issue.maximum} caractères autorisés` };
    }
  }

  return { message: ctx.defaultError };
};

// Set custom error map globally
z.setErrorMap(frenchErrorMap);
```

Or use custom messages inline:

```typescript
fullName: z.string()
  .trim()
  .min(2, 'Le nom doit contenir au moins 2 caractères')
  .max(100, 'Le nom ne doit pas dépasser 100 caractères');
```

---

## Testing Validation Schemas

### Unit Tests (Vitest)

```typescript
import { describe, it, expect } from 'vitest';
import { demoRequestSchema, timeSlotSchema } from '@/lib/demo/schema';

describe('TimeSlot Schema', () => {
  it('accepts valid date and time', () => {
    const result = timeSlotSchema.safeParse({
      date: '2025-10-15',
      time: '10:30',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid date format', () => {
    const result = timeSlotSchema.safeParse({
      date: '15/10/2025',
      time: '10:30',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toContain('YYYY-MM-DD');
  });

  it('rejects invalid time format', () => {
    const result = timeSlotSchema.safeParse({
      date: '2025-10-15',
      time: '25:00',
    });

    expect(result.success).toBe(false);
  });
});

describe('Demo Request Schema', () => {
  it('accepts valid complete request', () => {
    const validRequest = {
      fullName: 'Marie Kouassi',
      organization: 'Banque Centrale',
      email: 'marie@example.com',
      sector: 'banque_finance',
      standards: ['basel_iii'],
      goals: ['conformite_audits'],
      teamSize: '11-50',
      mode: 'cloud',
      modules: ['evaluation_risques'],
      timezone: 'Africa/Abidjan',
      duration: '45',
      slot1: { date: '2025-10-15', time: '10:30' },
      slot2: { date: '2025-10-16', time: '14:00' },
      slot3: { date: '2025-10-17', time: '09:00' },
      meetingTool: 'google_meet',
      language: 'fr',
      gdprConsent: true,
    };

    const result = demoRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('rejects request without GDPR consent', () => {
    const invalidRequest = { /* ...validRequest, */ gdprConsent: false };

    const result = demoRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
    expect(result.error?.issues.find((i) => i.path[0] === 'gdprConsent')).toBeDefined();
  });
});
```

---

## Schema Export Structure

**File**: `src/lib/demo/schema.ts`

```typescript
// Re-export all schemas and types
export {
  // Individual schemas
  timeSlotSchema,
  roleSchema,
  sectorSchema,
  standardSchema,
  goalSchema,
  teamSizeSchema,
  importSchema,
  moduleSchema,
  meetingToolSchema,
  modeSchema,
  languageSchema,
  durationSchema,
  contactSchema,
  qualificationSchema,
  schedulingSchema,
  consentSchema,

  // Complete schema
  demoRequestSchema,

  // Inferred types
  type TimeSlot,
  type Role,
  type Sector,
  type Standard,
  type Goal,
  type TeamSize,
  type Import,
  type Module,
  type MeetingTool,
  type Mode,
  type Language,
  type Duration,
  type ContactInfo,
  type Qualification,
  type Scheduling,
  type Consent,
  type DemoRequest,
};

// Custom validation functions
export { validateFutureTimeSlot, validateAllTimeSlots };
```

This schema structure provides:

- ✅ Type safety (Zod + TypeScript)
- ✅ Runtime validation (client + server)
- ✅ Consistent error messages
- ✅ Reusable validation logic
- ✅ Easy testing
- ✅ Clear separation of concerns (contact, qualification, scheduling, consent)
