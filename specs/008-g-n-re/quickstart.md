# Developer Quickstart: Demo Request Page

**Feature**: 008-g-n-re  
**Date**: 2025-10-09  
**Purpose**: Step-by-step guide to set up development environment and start implementing the demo request feature

---

## Prerequisites

- Node.js 18+ installed
- pnpm package manager installed (`npm install -g pnpm`)
- Git repository cloned
- Code editor (VS Code recommended)
- Resend account for email testing (free tier)

---

## Step 1: Install Dependencies

```bash
# Navigate to project root
cd gamr-site

# Install new dependencies for demo request feature
pnpm add zod react-hook-form @hookform/resolvers/zod ics date-fns date-fns-tz resend

# Install dev dependencies
pnpm add -D @types/node
```

**Dependencies Added**:

- `zod`: Runtime type validation
- `react-hook-form`: Form state management
- `@hookform/resolvers/zod`: Zod integration for React Hook Form
- `ics`: Calendar invitation (.ics) generation
- `date-fns`: Date manipulation utilities
- `date-fns-tz`: Timezone-aware date operations
- `resend`: Email service for confirmations

---

## Step 2: Environment Variables

Create `.env.local` file in project root (if not exists):

```bash
# .env.local

# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email configuration
DEMO_ORGANIZER_EMAIL=demo@gamr.example
DEMO_ORGANIZER_NAME="Équipe GAMR"

# Optional: Rate limiting
DEMO_RATE_LIMIT_PER_HOUR=5
```

**Getting Resend API Key**:

1. Sign up at [resend.com](https://resend.com)
2. Navigate to API Keys section
3. Create new API key
4. Copy and paste into `.env.local`
5. For development, use test mode (emails sent to your verified email only)

**Note**: `.env.local` is gitignored. Never commit API keys to repository.

---

## Step 3: Create Data Directory

```bash
# Create directory for JSON file storage (MVP)
mkdir -p data

# Create empty demo requests file
echo '{"requests":[]}' > data/demo-requests.json

# Ensure data/ is gitignored
echo "data/" >> .gitignore
```

**Why JSON File Storage?**:

- Zero configuration for MVP
- Easy to inspect/debug
- Sufficient for expected volume (50-200/month)
- Migration to Prisma/PostgreSQL documented for future

---

## Step 4: Project Structure Setup

Create the necessary directory structure:

```bash
# Component directories
mkdir -p src/components/demo
mkdir -p src/lib/demo
mkdir -p src/types
mkdir -p src/app/demander-demo
mkdir -p src/app/api/demo

# Test directories
mkdir -p tests/unit/demo
mkdir -p tests/e2e
```

---

## Step 5: Static Data Configuration

Create `src/lib/demo/options.ts`:

```typescript
// Static options for form select fields

export const roles = [
  { value: 'direction', label: 'Direction' },
  { value: 'compliance_audit', label: 'Conformité/Audit' },
  { value: 'operations', label: 'Opérations' },
  { value: 'it_security', label: 'IT/Sécurité' },
  { value: 'other', label: 'Autre' },
] as const;

export const sectors = [
  { value: 'extractive', label: 'Industrie extractive' },
  { value: 'aeroportuaire', label: 'Aéroportuaire' },
  { value: 'gouvernement', label: 'Gouvernement/Institution' },
  { value: 'banque_finance', label: 'Banque & Finance' },
  { value: 'sante_hopitaux', label: 'Santé & Hôpitaux' },
  { value: 'autre', label: 'Autre' },
] as const;

export const standards = [
  { value: 'iso31000', label: 'ISO 31000' },
  { value: 'iso27001', label: 'ISO 27001' },
  { value: 'iso45001', label: 'ISO 45001' },
  { value: 'iso14001', label: 'ISO 14001' },
  { value: 'icao_annexe_19', label: 'OACI Annexe 19' },
  { value: 'coso_erm', label: 'COSO ERM' },
  { value: 'rgpd_anssi_ci', label: 'RGPD/ANSSI-CI' },
  { value: 'basel_iii', label: 'Bâle III' },
  { value: 'oms_patient_safety', label: 'OMS Patient Safety' },
  { value: 'autre', label: 'Autre' },
] as const;

export const goals = [
  { value: 'cartographie', label: 'Cartographie' },
  { value: 'conformite_audits', label: 'Conformité & audits' },
  { value: 'automatisation_workflows', label: 'Automatisation & workflows' },
  { value: 'reporting', label: 'Reporting' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'incidents', label: 'Incidents' },
] as const;

export const teamSizes = [
  { value: '1-10', label: '1–10' },
  { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-1000', label: '201–1000' },
  { value: '1000+', label: '1000+' },
] as const;

export const imports = [
  { value: 'excel', label: 'Excel' },
  { value: 'csv', label: 'CSV' },
  { value: 'erp_crm', label: 'ERP/CRM' },
  { value: 'aucun', label: 'Aucun' },
  { value: 'autre', label: 'Autre' },
] as const;

export const modules = [
  { value: 'evaluation_risques', label: 'Évaluation risques' },
  { value: 'plans_action', label: "Plans d'action" },
  { value: 'incidents_nc', label: 'Incidents/NC' },
  { value: 'audits_rapports', label: 'Audits/rapports' },
  { value: 'tableaux_bord', label: 'Tableaux de bord' },
  { value: 'multi_entites', label: 'Multi-entités' },
] as const;

export const durations = [
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' },
] as const;

export const meetingTools = [
  { value: 'google_meet', label: 'Google Meet' },
  { value: 'microsoft_teams', label: 'Microsoft Teams' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'phone', label: 'Téléphone' },
] as const;

export const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
] as const;
```

**Usage**: Import these options in form components for `<select>` and checkbox/radio groups.

---

## Step 6: TypeScript Types

Create `src/types/demo.ts`:

```typescript
// Re-export Zod-inferred types from schema
export type {
  DemoRequest,
  TimeSlot,
  Role,
  Sector,
  Standard,
  Goal,
  TeamSize,
  Import,
  Module,
  MeetingTool,
  Mode,
  Language,
  Duration,
} from '@/lib/demo/schema';

// Additional types for API responses
export interface DemoRequestSuccessResponse {
  success: true;
  data: {
    id: string;
    message: string;
    calendarLinks: {
      icsDownload: string;
      googleCalendar: string;
      outlook: string;
    };
    summary: {
      fullName: string;
      organization: string;
      email: string;
      slot1: TimeSlotDisplay;
      duration: string;
      meetingTool: string;
    };
  };
}

export interface TimeSlotDisplay {
  date: string;
  time: string;
  timezone: string;
}

export interface DemoRequestErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    fields?: Record<string, string[]>;
  };
}

export type DemoRequestResponse = DemoRequestSuccessResponse | DemoRequestErrorResponse;
```

---

## Step 7: Development Workflow

### Start Development Server

```bash
# Start Next.js development server
pnpm dev
```

Visit http://localhost:3000 to see the site. The demo request page will be at http://localhost:3000/demander-demo (once implemented).

### TypeScript Type Checking

```bash
# Run TypeScript compiler (no emit, just check types)
pnpm type-check
```

Fix any type errors before committing.

### Linting

```bash
# Run ESLint
pnpm lint

# Auto-fix fixable issues
pnpm lint --fix
```

### Testing

```bash
# Run unit tests (Vitest)
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run e2e tests (Playwright)
pnpm test:e2e

# Run e2e tests in UI mode (recommended during development)
pnpm test:e2e:ui
```

### Build for Production

```bash
# Build production bundle
pnpm build

# Preview production build locally
pnpm start
```

---

## Step 8: Testing API Locally

### Test Email Sending

Create a test script `scripts/test-email.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'demo@gamr.example',
      to: 'your-email@example.com', // Use your verified email
      subject: 'Test: Demo Request Confirmation',
      html: '<p>This is a test email.</p>',
      attachments: [
        {
          filename: 'test.ics',
          content: 'BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR',
        },
      ],
    });

    if (error) {
      console.error('Email error:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testEmail();
```

Run test:

```bash
npx tsx scripts/test-email.ts
```

### Test API Endpoint

Once API route is implemented, test with curl:

```bash
# Valid request
curl -X POST http://localhost:3000/api/demo \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "organization": "Test Org",
    "email": "test@example.com",
    "sector": "banque_finance",
    "standards": ["iso31000"],
    "goals": ["conformite_audits"],
    "teamSize": "11-50",
    "mode": "cloud",
    "modules": ["evaluation_risques"],
    "timezone": "Africa/Abidjan",
    "duration": "45",
    "slot1": {"date": "2025-10-15", "time": "10:30"},
    "slot2": {"date": "2025-10-16", "time": "14:00"},
    "slot3": {"date": "2025-10-17", "time": "09:00"},
    "meetingTool": "google_meet",
    "language": "fr",
    "gdprConsent": true
  }'
```

Or use a tool like Postman/Insomnia/Thunder Client for easier testing.

---

## Step 9: Accessing Saved Data

View submitted demo requests:

```bash
# Pretty-print JSON file
cat data/demo-requests.json | jq '.'

# Count total requests
cat data/demo-requests.json | jq '.requests | length'

# View latest request
cat data/demo-requests.json | jq '.requests[-1]'
```

**Note**: Install `jq` for JSON parsing: `brew install jq` (macOS) or `choco install jq` (Windows)

---

## Step 10: Git Workflow

### Branch Management

```bash
# Ensure you're on the feature branch
git checkout 008-g-n-re

# Check status
git status

# Stage changes
git add .

# Commit with conventional commit format
git commit -m "feat(demo): implement time slot picker component"

# Push to remote
git push origin 008-g-n-re
```

### Commit Message Format

Follow Conventional Commits:

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- test: Test additions/updates
- chore: Build/tooling changes

Examples:
- feat(demo): add contact information form fields
- feat(demo): implement calendar invitation generation
- fix(demo): correct timezone conversion for time slots
- test(demo): add validation schema unit tests
- docs(demo): update API contract documentation
```

---

## Step 11: Debugging Tips

### Common Issues

**Issue**: "Zod validation fails on form submit"

- **Check**: Console for detailed Zod error messages
- **Fix**: Ensure all required fields have values, check field names match schema

**Issue**: "Email not sending"

- **Check**: Resend API key is correct in `.env.local`
- **Check**: Resend dashboard for error logs
- **Fix**: In test mode, use verified email address

**Issue**: "Time slot validation fails"

- **Check**: Time slots are at least 24 hours in future
- **Check**: Date format is YYYY-MM-DD, time format is HH:mm
- **Fix**: Use date-fns-tz to convert to user's timezone

**Issue**: "Cannot write to data/demo-requests.json"

- **Check**: File exists and has write permissions
- **Check**: Directory `data/` exists
- **Fix**: Run `mkdir -p data && echo '{"requests":[]}' > data/demo-requests.json`

### DevTools Console

Useful console commands for debugging:

```javascript
// In browser console (form page):

// Check form state
console.log(formData);

// Test timezone conversion
const date = new Date('2025-10-15T10:30:00');
console.log(date.toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' }));

// Test API fetch
fetch('/api/demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData),
})
  .then((r) => r.json())
  .then(console.log);
```

---

## Step 12: Performance Testing

### Lighthouse Audit

```bash
# Run Lighthouse CI (if configured)
pnpm lighthouse

# Or use Chrome DevTools:
# 1. Open page in Chrome
# 2. Open DevTools (F12)
# 3. Navigate to Lighthouse tab
# 4. Click "Generate report"
# 5. Verify Performance > 90, Accessibility > 95
```

### Bundle Size Analysis

```bash
# Analyze production bundle
pnpm build
pnpm analyze

# Check for:
# - date-fns-tz is tree-shaken (only imported functions)
# - ics library is lazy-loaded
# - react-datepicker CSS is optimized
```

---

## Step 13: Accessibility Testing

### Keyboard Navigation

Manual testing checklist:

- [ ] Tab through all form fields (logical order)
- [ ] Enter submits form
- [ ] Esc clears focused field
- [ ] Date picker opens with Enter/Space
- [ ] All checkboxes/radios reachable via keyboard
- [ ] Focus indicators visible

### Screen Reader Testing

**macOS**: Use VoiceOver (Cmd+F5)
**Windows**: Use NVDA (free) or JAWS

Test checklist:

- [ ] All fields have labels announced
- [ ] Required fields announced as required
- [ ] Error messages announced when validation fails
- [ ] Form sections have proper headings
- [ ] Success message announced after submission

---

## Next Steps

1. **Review Planning Documents**:
   - Read [data-model.md](./data-model.md) for entity structure
   - Read [contracts/api-routes.md](./contracts/api-routes.md) for API spec
   - Read [contracts/validation-schemas.md](./contracts/validation-schemas.md) for Zod schemas

2. **Start Implementation**:
   - Wait for `/speckit.tasks` command to generate task breakdown
   - Follow task priority (P1 → P2 → P3)
   - Implement components incrementally
   - Write tests alongside implementation

3. **Code Review Preparation**:
   - Run full test suite: `pnpm test && pnpm test:e2e`
   - Check types: `pnpm type-check`
   - Lint code: `pnpm lint`
   - Test accessibility manually
   - Run Lighthouse audit
   - Update documentation if needed

---

## Migration Path: JSON → Prisma/PostgreSQL

When ready to migrate from JSON file storage to database:

### 1. Install Prisma

```bash
pnpm add -D prisma
pnpm add @prisma/client
npx prisma init
```

### 2. Define Schema

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model DemoRequest {
  id              String   @id @default(cuid())
  fullName        String
  organization    String
  email           String
  phone           String?
  role            String?
  sector          String
  standards       String[]  // Array of enums
  goals           String[]
  teamSize        String
  context         String?
  mode            String
  imports         String[]
  modules         String[]
  timezone        String
  duration        String
  slot1Date       String
  slot1Time       String
  slot2Date       String
  slot2Time       String
  slot3Date       String
  slot3Time       String
  meetingTool     String
  language        String
  gdprConsent     Boolean
  marketingOptIn  Boolean
  status          String   @default("pending")
  createdAt       DateTime @default(now())
  icsGenerated    Boolean  @default(false)
  emailSent       Boolean  @default(false)
}
```

### 3. Migrate Data

```bash
# Create migration
npx prisma migrate dev --name init

# Import existing JSON data
npx tsx scripts/import-json-to-db.ts
```

### 4. Update API Route

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // ... validation ...

  // Replace JSON file write with Prisma:
  const request = await prisma.demoRequest.create({
    data: {
      ...data,
      slot1Date: data.slot1.date,
      slot1Time: data.slot1.time,
      slot2Date: data.slot2.date,
      slot2Time: data.slot2.time,
      slot3Date: data.slot3.date,
      slot3Time: data.slot3.time,
      status: 'pending',
      icsGenerated: true,
      emailSent: true,
    },
  });

  // ... rest of logic ...
}
```

**No frontend changes required** - API contract remains identical.

---

## Troubleshooting

### Issue: TypeScript errors in `.d.ts` files

**Solution**: Ensure `next-env.d.ts` is included in `tsconfig.json`:

```json
{
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

### Issue: Hot reload not working

**Solution**: Restart dev server, clear `.next` cache:

```bash
rm -rf .next
pnpm dev
```

### Issue: Zod schema not matching React Hook Form

**Solution**: Check `@hookform/resolvers/zod` version compatibility:

```bash
pnpm list @hookform/resolvers/zod
# Should be ^3.0.0 or higher
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [date-fns](https://date-fns.org/)
- [Resend Documentation](https://resend.com/docs)
- [ics Library](https://github.com/adamgibbons/ics)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Ready to start coding!** Review the planning documents, wait for task breakdown (`/speckit.tasks`), and begin implementation. 🚀
