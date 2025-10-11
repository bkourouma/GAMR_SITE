# Data Model: Demo Request Page

**Feature**: 008-g-n-re  
**Date**: 2025-10-09  
**Purpose**: Define entities, validation rules, and relationships for demo request feature

---

## Entity 1: DemoRequest

**Description**: Represents a prospect's complete demo request submission, including contact information, qualification details, scheduling preferences, and consent tracking. Persisted with "pending" status for sales team follow-up.

### Fields

| Field            | Type            | Required | Constraints                                | Description                                     |
| ---------------- | --------------- | -------- | ------------------------------------------ | ----------------------------------------------- |
| `id`             | string          | Yes      | Unique, auto-generated (timestamp or UUID) | Unique identifier for the request               |
| `fullName`       | string          | Yes      | Min 2 characters, max 100                  | Prospect's full name                            |
| `organization`   | string          | Yes      | Min 2 characters, max 150                  | Organization/company name                       |
| `email`          | string          | Yes      | Valid email format, max 255                | Professional email address                      |
| `phone`          | string          | No       | Optional, max 20 characters                | Phone number (international format recommended) |
| `role`           | enum            | No       | See Role enum below                        | Prospect's role in organization                 |
| `sector`         | enum            | Yes      | See Sector enum below                      | Industry/sector                                 |
| `standards`      | array\<enum\>   | Yes      | Min 1 item, see Standards enum             | Priority compliance standards                   |
| `goals`          | array\<enum\>   | Yes      | Min 1 item, see Goals enum                 | Primary objectives for GAMR                     |
| `teamSize`       | enum            | Yes      | See TeamSize enum below                    | Size of team that will use GAMR                 |
| `context`        | string          | No       | Optional, max 400 characters               | Context, challenges, or use case description    |
| `mode`           | enum            | Yes      | "cloud" \| "onprem"                        | Preferred deployment mode                       |
| `imports`        | array\<enum\>   | No       | Optional, see Imports enum                 | Data sources to import at startup               |
| `modules`        | array\<enum\>   | Yes      | Min 1 item, see Modules enum               | Modules to prioritize in demo                   |
| `timezone`       | string          | Yes      | IANA timezone identifier                   | Prospect's timezone (default: Africa/Abidjan)   |
| `duration`       | enum            | Yes      | "30" \| "45" \| "60"                       | Preferred demo duration in minutes              |
| `slot1`          | TimeSlot        | Yes      | See TimeSlot entity                        | First proposed time slot                        |
| `slot2`          | TimeSlot        | Yes      | See TimeSlot entity                        | Second proposed time slot                       |
| `slot3`          | TimeSlot        | Yes      | See TimeSlot entity                        | Third proposed time slot                        |
| `meetingTool`    | enum            | Yes      | See MeetingTool enum below                 | Preferred meeting platform                      |
| `language`       | enum            | Yes      | "fr" \| "en"                               | Demo language preference                        |
| `gdprConsent`    | boolean         | Yes      | Must be true                               | GDPR consent for demo organization              |
| `marketingOptIn` | boolean         | No       | Optional, default false                    | Opt-in for marketing communications             |
| `honeypot`       | string          | No       | Must be empty string                       | Anti-spam honeypot field (invisible to users)   |
| `status`         | enum            | Yes      | Auto-set to "pending" on creation          | Request processing status                       |
| `createdAt`      | ISO 8601 string | Yes      | Auto-generated timestamp                   | Submission timestamp                            |
| `icsGenerated`   | boolean         | Yes      | Auto-set based on generation success       | Whether .ics file was successfully generated    |
| `emailSent`      | boolean         | Yes      | Auto-set based on email send success       | Whether email acknowledgment was sent           |

### Enumerations

#### Role

```typescript
type Role = 'direction' | 'compliance_audit' | 'operations' | 'it_security' | 'other';
```

**Display Labels** (French):

- `direction`: "Direction"
- `compliance_audit`: "Conformité/Audit"
- `operations`: "Opérations"
- `it_security`: "IT/Sécurité"
- `other`: "Autre"

#### Sector

```typescript
type Sector =
  | 'extractive'
  | 'aeroportuaire'
  | 'gouvernement'
  | 'banque_finance'
  | 'sante_hopitaux'
  | 'autre';
```

**Display Labels** (French):

- `extractive`: "Industrie extractive"
- `aeroportuaire`: "Aéroportuaire"
- `gouvernement`: "Gouvernement/Institution"
- `banque_finance`: "Banque & Finance"
- `sante_hopitaux`: "Santé & Hôpitaux"
- `autre`: "Autre"

#### Standards

```typescript
type Standard =
  | 'iso31000'
  | 'iso27001'
  | 'iso45001'
  | 'iso14001'
  | 'icao_annexe_19'
  | 'coso_erm'
  | 'rgpd_anssi_ci'
  | 'basel_iii'
  | 'oms_patient_safety'
  | 'autre';
```

**Display Labels** (French):

- `iso31000`: "ISO 31000"
- `iso27001`: "ISO 27001"
- `iso45001`: "ISO 45001"
- `iso14001`: "ISO 14001"
- `icao_annexe_19`: "OACI Annexe 19"
- `coso_erm`: "COSO ERM"
- `rgpd_anssi_ci`: "RGPD/ANSSI-CI"
- `basel_iii`: "Bâle III"
- `oms_patient_safety`: "OMS Patient Safety"
- `autre`: "Autre"

#### Goals

```typescript
type Goal =
  | 'cartographie'
  | 'conformite_audits'
  | 'automatisation_workflows'
  | 'reporting'
  | 'collaboration'
  | 'incidents';
```

**Display Labels** (French):

- `cartographie`: "Cartographie"
- `conformite_audits`: "Conformité & audits"
- `automatisation_workflows`: "Automatisation & workflows"
- `reporting`: "Reporting"
- `collaboration`: "Collaboration"
- `incidents`: "Incidents"

#### TeamSize

```typescript
type TeamSize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
```

#### Imports

```typescript
type Import = 'excel' | 'csv' | 'erp_crm' | 'aucun' | 'autre';
```

**Display Labels** (French):

- `excel`: "Excel"
- `csv`: "CSV"
- `erp_crm`: "ERP/CRM"
- `aucun`: "Aucun"
- `autre`: "Autre"

#### Modules

```typescript
type Module =
  | 'evaluation_risques'
  | 'plans_action'
  | 'incidents_nc'
  | 'audits_rapports'
  | 'tableaux_bord'
  | 'multi_entites';
```

**Display Labels** (French):

- `evaluation_risques`: "Évaluation risques"
- `plans_action`: "Plans d'action"
- `incidents_nc`: "Incidents/NC"
- `audits_rapports`: "Audits/rapports"
- `tableaux_bord`: "Tableaux de bord"
- `multi_entites`: "Multi-entités"

#### MeetingTool

```typescript
type MeetingTool = 'google_meet' | 'microsoft_teams' | 'zoom' | 'phone';
```

**Display Labels** (French/English):

- `google_meet`: "Google Meet"
- `microsoft_teams`: "Microsoft Teams"
- `zoom`: "Zoom"
- `phone`: "Téléphone"

#### Status

```typescript
type Status =
  | 'pending' // Initial state: awaiting sales team review
  | 'contacted' // Sales team has reached out
  | 'scheduled' // Demo confirmed and scheduled
  | 'completed' // Demo has been conducted
  | 'cancelled'; // Request cancelled by prospect or sales
```

### Validation Rules

1. **Contact Information**:
   - `fullName`: Must be at least 2 characters (prevents single-letter entries)
   - `organization`: Must be at least 2 characters
   - `email`: Must match standard email regex (RFC 5322 simplified)
   - `phone`: If provided, should accept various formats (international, with/without country code)

2. **Qualification**:
   - `standards`: At least 1 standard must be selected
   - `goals`: At least 1 goal must be selected
   - `modules`: At least 1 module must be selected
   - `context`: If provided, limited to 400 characters to encourage concise descriptions

3. **Scheduling**:
   - All 3 time slots (`slot1`, `slot2`, `slot3`) are required
   - Each slot must be at least 24 hours in the future from submission time
   - Timezone must be a valid IANA timezone identifier

4. **Consent**:
   - `gdprConsent`: Must be explicitly true (boolean true, not just truthy)
   - `marketingOptIn`: Optional, defaults to false if not provided

5. **Anti-Spam**:
   - `honeypot`: Must be empty string or absent (rejects submissions where bots fill this field)

### State Transitions

```
pending → contacted → scheduled → completed
    ↓         ↓           ↓
    └────→ cancelled ←────┘
```

**Transitions** (managed by sales team, not user-facing):

- `pending`: Initial state on form submission
- `pending → contacted`: Sales team initiates contact with prospect
- `contacted → scheduled`: Time slot confirmed, meeting scheduled
- `scheduled → completed`: Demo has been conducted
- `any → cancelled`: Request cancelled before demo completion

**Notes**:

- State transitions are not part of MVP (form only creates "pending" requests)
- Status field prepared for future admin panel implementation
- Transition logic would be implemented in admin API routes

---

## Entity 2: TimeSlot

**Description**: Represents a single proposed time slot for the demo. Three instances are required per DemoRequest.

### Fields

| Field  | Type   | Required | Constraints                       | Description           |
| ------ | ------ | -------- | --------------------------------- | --------------------- |
| `date` | string | Yes      | ISO 8601 date format (YYYY-MM-DD) | Date of proposed slot |
| `time` | string | Yes      | 24-hour format (HH:mm)            | Time of proposed slot |

### Validation Rules

1. **Date Validation**:
   - Must be valid ISO 8601 date format
   - Must be at least 24 hours in the future (calculated in prospect's selected timezone)
   - Should not be more than 90 days in future (soft limit, warning only)

2. **Time Validation**:
   - Must be valid 24-hour time format (HH:mm)
   - Hour: 00-23, Minute: 00-59
   - Recommended business hours check: 08:00-18:00 (soft limit, warning only)

3. **Combination Validation**:
   - When combined with timezone, must result in future datetime
   - Three slots should not overlap (if same date, times should be sufficiently spaced)

### Computed Properties

```typescript
interface TimeSlotComputed extends TimeSlot {
  // Computed at runtime for display/validation
  datetime: Date; // Combination of date + time + timezone
  isInFuture: boolean; // Whether slot is at least 24h in future
  formattedDisplay: string; // Localized display format (e.g., "15 oct. 2025 à 10:30")
}
```

---

## Entity 3: CalendarInvitation

**Description**: Represents the generated .ics calendar file for the demo. Generated for the first proposed time slot (slot1) only.

### Fields

| Field            | Type   | Required | Description                                 |
| ---------------- | ------ | -------- | ------------------------------------------- |
| `summary`        | string | Yes      | Event title (e.g., "Démo GAMR")             |
| `description`    | string | Yes      | Event description                           |
| `startDate`      | Date   | Yes      | Event start date/time (from slot1)          |
| `duration`       | number | Yes      | Duration in minutes (from duration field)   |
| `location`       | string | Yes      | Meeting tool name or "Téléphone"            |
| `organizerName`  | string | Yes      | "Équipe GAMR"                               |
| `organizerEmail` | string | Yes      | "demo@gamr.example" (or configured email)   |
| `attendeeName`   | string | Yes      | Prospect's full name                        |
| `attendeeEmail`  | string | Yes      | Prospect's email                            |
| `timezone`       | string | Yes      | IANA timezone identifier                    |
| `icsContent`     | string | Yes      | Generated .ics file content (text/calendar) |

### Generation Logic

1. **Event Details**:
   - Title: "Démo GAMR" (fixed)
   - Description: "Démonstration personnalisée GAMR" + prospect's organization
   - Start: Combination of slot1.date, slot1.time in prospect's timezone
   - End: Start + duration (calculated)

2. **Participants**:
   - Organizer: GAMR team (name + email from config)
   - Attendee: Prospect (name + email from form)

3. **Location Field**:
   - If `meetingTool === "google_meet"`: "Google Meet"
   - If `meetingTool === "microsoft_teams"`: "Microsoft Teams"
   - If `meetingTool === "zoom"`: "Zoom"
   - If `meetingTool === "phone"`: "Téléphone"

4. **ICS Format**:
   - Generated using `ics` library
   - Includes VTIMEZONE component for correct timezone handling
   - Adds method: REQUEST (indicates invitation)
   - Status: TENTATIVE (demo not confirmed yet)

### Calendar Link Generators

Helper functions to generate calendar URLs for Google Calendar and Outlook:

```typescript
interface CalendarLinks {
  googleCalendar: string; // URL to add event to Google Calendar
  outlook: string; // URL to add event to Outlook
  icsDownload: string; // Blob URL or API endpoint for .ics download
}
```

**Google Calendar URL Format**:

```
https://calendar.google.com/calendar/render?action=TEMPLATE
  &text=Démo%20GAMR
  &dates=20251015T103000/20251015T111500
  &details=Description
  &location=Google%20Meet
  &ctz=Africa/Abidjan
```

**Outlook URL Format**:

```
https://outlook.live.com/calendar/0/deeplink/compose?
  subject=Démo%20GAMR
  &startdt=2025-10-15T10:30:00
  &enddt=2025-10-15T11:15:00
  &body=Description
  &location=Google%20Meet
```

---

## Relationships

```
DemoRequest
  ├── contains → TimeSlot (slot1)
  ├── contains → TimeSlot (slot2)
  ├── contains → TimeSlot (slot3)
  └── generates → CalendarInvitation (based on slot1)
```

- **DemoRequest → TimeSlot**: One-to-three (embedded/composition relationship)
  - TimeSlots are not stored separately; they are part of DemoRequest object
  - Validated as a group (all 3 required)

- **DemoRequest → CalendarInvitation**: One-to-one (generated, not persisted)
  - CalendarInvitation is ephemeral (generated on-demand during submission)
  - Only first slot (slot1) is used for calendar generation
  - .ics content is attached to email but not stored in database

---

## Storage Schema (JSON File)

```json
{
  "requests": [
    {
      "id": "1728475200000",
      "fullName": "Marie Kouassi",
      "organization": "Banque Centrale",
      "email": "marie.kouassi@bcao.example",
      "phone": "+225 07 12 34 56 78",
      "role": "compliance_audit",
      "sector": "banque_finance",
      "standards": ["basel_iii", "iso27001", "rgpd_anssi_ci"],
      "goals": ["conformite_audits", "reporting", "cartographie"],
      "teamSize": "11-50",
      "context": "Besoin d'automatiser la conformité Bâle III et améliorer le reporting réglementaire.",
      "mode": "cloud",
      "imports": ["excel", "erp_crm"],
      "modules": ["evaluation_risques", "audits_rapports", "tableaux_bord"],
      "timezone": "Africa/Abidjan",
      "duration": "45",
      "slot1": {
        "date": "2025-10-15",
        "time": "10:30"
      },
      "slot2": {
        "date": "2025-10-16",
        "time": "14:00"
      },
      "slot3": {
        "date": "2025-10-17",
        "time": "09:00"
      },
      "meetingTool": "google_meet",
      "language": "fr",
      "gdprConsent": true,
      "marketingOptIn": true,
      "status": "pending",
      "createdAt": "2025-10-09T14:30:00.000Z",
      "icsGenerated": true,
      "emailSent": true
    }
  ]
}
```

---

## Future Considerations

### Migration to Prisma/PostgreSQL

When volume grows or sales team needs query capabilities, the data model can be migrated to a relational database:

```prisma
model DemoRequest {
  id              String   @id @default(cuid())
  fullName        String   @db.VarChar(100)
  organization    String   @db.VarChar(150)
  email           String   @db.VarChar(255)
  phone           String?  @db.VarChar(20)
  role            Role?
  sector          Sector
  standards       Standard[]
  goals           Goal[]
  teamSize        TeamSize
  context         String?  @db.VarChar(400)
  mode            Mode
  imports         Import[]
  modules         Module[]
  timezone        String   @db.VarChar(50)
  duration        Int
  slot1           Json     // {date: string, time: string}
  slot2           Json
  slot3           Json
  meetingTool     MeetingTool
  language        Language
  gdprConsent     Boolean
  marketingOptIn  Boolean  @default(false)
  status          Status   @default(PENDING)
  createdAt       DateTime @default(now())
  icsGenerated    Boolean  @default(false)
  emailSent       Boolean  @default(false)
}
```

**Migration path**:

1. Define Prisma schema
2. Create migration
3. Write script to import existing JSON data
4. Update API route to use Prisma client
5. No changes required to frontend (API contract remains same)

### Admin Panel (Future)

Data model supports future admin panel features:

- List all demo requests (filter by status, date)
- Update request status (pending → contacted → scheduled → completed)
- View prospect details and preferences
- Export to CSV for sales CRM import
- Send follow-up emails
- Add notes to requests

All admin features would be separate from this MVP scope.
