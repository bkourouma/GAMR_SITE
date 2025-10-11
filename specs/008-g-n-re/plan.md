# Implementation Plan: Demo Request Page

**Branch**: `008-g-n-re` | **Date**: 2025-10-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/008-g-n-re/spec.md`

## Summary

Build a comprehensive demo request page at `/demander-demo` that enables prospects to schedule personalized GAMR demonstrations. The page collects contact information, qualifies prospects through sector/compliance/goal selections, captures 3 proposed time slots with timezone support, and generates calendar invitations (.ics files) with email confirmation. Core technical approach: Next.js page with React Hook Form + Zod validation, server-side API route for submission processing, ics library for calendar generation, and email service integration.

## Technical Context

**Language/Version**: TypeScript 5.3+ (Next.js 15 with App Router)  
**Primary Dependencies**: React Hook Form, Zod, ics (calendar generation), Resend/Nodemailer (email), date-fns-tz (timezone handling)  
**Storage**: JSON file or Prisma/PostgreSQL for demo request persistence  
**Testing**: Vitest (form validation logic), Playwright (e2e form submission flow)  
**Target Platform**: Web browsers (desktop + mobile, 4G network support)  
**Project Type**: Web (Next.js marketing site)  
**Performance Goals**: FCP < 1.5s, TTI < 3s, form validation < 100ms, submission response < 2s  
**Constraints**: Lighthouse Performance > 90, WCAG 2.1 AA compliance, lazy-load heavy libraries (date pickers, timezone selectors)  
**Scale/Scope**: Single-page form with ~25 fields, expected volume: 50-200 submissions/month

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Verify compliance with `.specify/memory/constitution.md`:

- [x] **Performance Excellence**: FCP < 1.5s, TTI < 3s, CLS < 0.1, Lighthouse > 90 ✅ (lazy-loading strategy for date/timezone libraries, form fields progressively rendered)
- [x] **Accessibility First**: WCAG 2.1 AA compliance planned and testable ✅ (8 explicit accessibility requirements: keyboard nav, ARIA labels, focus indicators, screen reader support, semantic HTML)
- [x] **SEO & Discoverability**: OpenGraph, JSON-LD, sitemap/robots implementation ✅ (6 SEO requirements including ContactPage schema, OG tags, meta descriptions)
- [x] **Mobile-First Design**: Mobile viewport priority, responsive strategy defined ✅ (form layout adapts to small screens, touch targets meet 44x44px minimum)
- [x] **Type Safety**: TypeScript strict mode, all types defined ✅ (Zod schemas provide runtime + compile-time types, form data fully typed)
- [x] **Code Quality**: ESLint/Prettier configured, Conventional Commits enforced ✅ (existing project setup with Husky hooks)
- [x] **CI Quality Gates**: All checks (lint, type, test, build, Lighthouse) configured ✅ (Playwright tests for critical paths, Lighthouse CI for performance validation)

_No constitution violations. All checks pass._

## Project Structure

### Documentation (this feature)

```
specs/008-g-n-re/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (library evaluations, best practices)
├── data-model.md        # Phase 1 output (entities, validation schemas)
├── quickstart.md        # Phase 1 output (dev setup, API testing)
├── contracts/           # Phase 1 output (API contracts, schemas)
│   ├── api-routes.md    # POST /api/demo endpoint contract
│   └── validation-schemas.md  # Zod schema specifications
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
src/
├── app/
│   ├── demander-demo/
│   │   └── page.tsx               # Demo request page route
│   └── api/
│       └── demo/
│           └── route.ts           # POST /api/demo endpoint
├── components/
│   ├── demo/
│   │   ├── DemoRequestForm.tsx    # Main form component
│   │   ├── DemoHeroSection.tsx    # Hero with title/subtitle/key points
│   │   ├── DemoValueProposition.tsx  # Value explanation section
│   │   ├── ContactFields.tsx      # Name, org, email, phone, role
│   │   ├── QualificationFields.tsx  # Sector, standards, goals, team size, context
│   │   ├── SchedulingFields.tsx   # Timezone, duration, 3 time slots, meeting tool, language
│   │   ├── ConsentFields.tsx      # GDPR consent, marketing opt-in
│   │   ├── TimeSlotPicker.tsx     # Date + time picker (single slot)
│   │   └── DemoConfirmation.tsx   # Success screen with calendar buttons
│   └── ui/                        # shadcn/ui components (existing)
├── lib/
│   ├── demo/
│   │   ├── schema.ts              # Zod validation schemas
│   │   ├── options.ts             # Static data (sectors, standards, goals, etc.)
│   │   ├── ics-generator.ts       # .ics file generation logic
│   │   ├── calendar-links.ts      # Google/Outlook URL generators
│   │   └── mailer.ts              # Email sending abstraction
│   └── utils.ts                   # Existing utilities
├── types/
│   └── demo.ts                    # TypeScript types for demo requests
└── styles/
    └── globals.css                # Existing styles

tests/
├── unit/
│   └── demo/
│       ├── schema.test.ts         # Zod validation tests
│       ├── ics-generator.test.ts  # Calendar generation tests
│       └── calendar-links.test.ts # URL generation tests
└── e2e/
    └── demo-request.spec.ts       # Full form submission flow

public/
└── (no changes required)
```

**Structure Decision**: Option 1 (Marketing Site / Frontend Application) selected. Follows existing Next.js App Router structure in `gamr-site` repository. Demo-specific components isolated in `src/components/demo/` with shared UI components from `src/components/ui/`. API route co-located with page in App Router. Utilities and types organized by feature domain (`demo/`).

## Complexity Tracking

_No constitution violations or complexity concerns. Table intentionally left empty._

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| _None_    | _N/A_      | _N/A_                                |

---

# Phase 0: Research

## Research Tasks

1. **Calendar Generation Library**: Evaluate `ics` vs `ical-generator` for .ics file generation
2. **Timezone Handling**: Evaluate date-fns-tz vs luxon vs day.js for timezone-aware date operations
3. **Date/Time Picker**: Evaluate react-datepicker vs react-day-picker + time input for user-friendly slot selection
4. **Email Service**: Evaluate Resend vs Nodemailer for transactional email with .ics attachments
5. **Form State Management**: Best practices for multi-section forms with React Hook Form (single form vs wizard)
6. **Anti-Spam Strategy**: Evaluate honeypot vs Turnstile/hCaptcha for low-friction bot protection
7. **Data Persistence**: Evaluate JSON file storage vs Prisma/PostgreSQL for demo request storage (MVP approach)

## Research Findings

_See [research.md](./research.md) for detailed analysis of each research task._

---

# Phase 1: Design & Contracts

## Prerequisites

- [x] `research.md` complete (see Phase 0 output)
- [x] All NEEDS CLARIFICATION items resolved
- [x] Library and pattern decisions finalized

## Design Artifacts

### 1. Data Model

_See [data-model.md](./data-model.md) for comprehensive entity definitions, field specifications, validation rules, and state transitions._

**Key Entities**:

- `DemoRequest`: Complete prospect submission with contact, qualification, scheduling, and consent data
- `TimeSlot`: Individual proposed time slot (date, time, timezone)
- `CalendarInvitation`: Generated .ics file metadata

### 2. API Contracts

_See [contracts/](./contracts/) directory for detailed API specifications._

**Endpoints**:

- `POST /api/demo`: Submit demo request, validate data, generate .ics, send email, persist request
  - Request: JSON with all form fields (validated against Zod schema)
  - Response: Success with confirmation data OR error with field-specific messages
  - Side effects: Email sent, .ics generated, data persisted with "pending" status

### 3. Validation Schemas

_See [contracts/validation-schemas.md](./contracts/validation-schemas.md) for complete Zod schema definitions._

**Schemas**:

- `demoRequestSchema`: Root schema with all form fields
- `slotSchema`: Individual time slot validation (future date check, format validation)
- `contactSchema`: Contact information fields
- `qualificationSchema`: Sector, standards, goals, team size, context, mode, imports, modules
- `schedulingSchema`: Timezone, duration, 3 slots, meeting tool, language
- `consentSchema`: GDPR consent (required) + marketing opt-in (optional)

### 4. Developer Quickstart

_See [quickstart.md](./quickstart.md) for step-by-step setup instructions, local testing procedures, and API testing examples._

---

# Phase 2: Task Breakdown

_This phase is executed by the `/speckit.tasks` command, NOT by `/speckit.plan`._

The tasks.md file will be generated after this planning phase completes. It will break down implementation into:

- Component implementation tasks
- API route implementation tasks
- Validation and utility function tasks
- Testing tasks (unit + e2e)
- Documentation tasks

---

# Agent Context Update

Agent-specific context file will be updated after Phase 1 design artifacts are generated, adding:

- New libraries: `ics`, `date-fns-tz`, `react-datepicker` (or alternatives per research)
- New patterns: Form validation with Zod, .ics generation, calendar link generation
- New conventions: Demo feature organization under `src/components/demo/` and `src/lib/demo/`

_Agent context update will be performed automatically after data model and contracts are finalized._
