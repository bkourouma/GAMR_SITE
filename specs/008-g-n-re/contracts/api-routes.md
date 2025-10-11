# API Routes Contract: Demo Request

**Feature**: 008-g-n-re  
**Date**: 2025-10-09  
**Purpose**: Define API endpoint contracts for demo request submission

---

## POST /api/demo

**Purpose**: Submit a demo request, validate data, generate calendar invitation, send email confirmation, and persist request.

### Request

**Method**: `POST`  
**Content-Type**: `application/json`  
**Authentication**: None (public endpoint)  
**Rate Limiting**: Recommended 5 requests per IP per hour (prevent spam)

#### Request Body

```typescript
interface DemoRequestPayload {
  // Contact Information
  fullName: string; // Min 2 chars
  organization: string; // Min 2 chars
  email: string; // Valid email format
  phone?: string; // Optional
  role?: Role; // Optional enum

  // Qualification
  sector: Sector; // Required enum
  standards: Standard[]; // Min 1 item
  goals: Goal[]; // Min 1 item
  teamSize: TeamSize; // Required enum
  context?: string; // Optional, max 400 chars
  mode: 'cloud' | 'onprem'; // Required
  imports?: Import[]; // Optional
  modules: Module[]; // Min 1 item

  // Scheduling
  timezone: string; // IANA timezone, default "Africa/Abidjan"
  duration: '30' | '45' | '60'; // Required, default "45"
  slot1: TimeSlot; // Required
  slot2: TimeSlot; // Required
  slot3: TimeSlot; // Required
  meetingTool: MeetingTool; // Required, default "google_meet"
  language: 'fr' | 'en'; // Required, default "fr"

  // Consent
  gdprConsent: boolean; // Must be true
  marketingOptIn?: boolean; // Optional, default false

  // Anti-spam
  honeypot?: string; // Must be empty/absent
}

interface TimeSlot {
  date: string; // ISO 8601 date (YYYY-MM-DD)
  time: string; // 24-hour format (HH:mm)
}
```

**Example Request**:

```json
{
  "fullName": "Marie Kouassi",
  "organization": "Banque Centrale",
  "email": "marie.kouassi@bcao.example",
  "phone": "+225 07 12 34 56 78",
  "role": "compliance_audit",
  "sector": "banque_finance",
  "standards": ["basel_iii", "iso27001"],
  "goals": ["conformite_audits", "reporting"],
  "teamSize": "11-50",
  "context": "Besoin d'automatiser la conformité Bâle III.",
  "mode": "cloud",
  "imports": ["excel", "erp_crm"],
  "modules": ["evaluation_risques", "audits_rapports"],
  "timezone": "Africa/Abidjan",
  "duration": "45",
  "slot1": { "date": "2025-10-15", "time": "10:30" },
  "slot2": { "date": "2025-10-16", "time": "14:00" },
  "slot3": { "date": "2025-10-17", "time": "09:00" },
  "meetingTool": "google_meet",
  "language": "fr",
  "gdprConsent": true,
  "marketingOptIn": true
}
```

### Response

#### Success Response (201 Created)

```typescript
interface DemoRequestSuccessResponse {
  success: true;
  data: {
    id: string; // Generated request ID
    message: string; // Confirmation message
    calendarLinks: {
      icsDownload: string; // URL/blob for .ics download
      googleCalendar: string; // Google Calendar add URL
      outlook: string; // Outlook add URL
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

interface TimeSlotDisplay {
  date: string; // Formatted date (e.g., "15 octobre 2025")
  time: string; // Formatted time (e.g., "10:30")
  timezone: string; // Timezone name
}
```

**Example Success Response**:

```json
{
  "success": true,
  "data": {
    "id": "1728475200000",
    "message": "Merci ! Nous revenons vers vous pour confirmer le créneau.",
    "calendarLinks": {
      "icsDownload": "/api/demo/1728475200000/calendar.ics",
      "googleCalendar": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=D%C3%A9mo%20GAMR&dates=20251015T103000/20251015T111500&details=D%C3%A9monstration%20personnalis%C3%A9e%20GAMR&location=Google%20Meet&ctz=Africa/Abidjan",
      "outlook": "https://outlook.live.com/calendar/0/deeplink/compose?subject=D%C3%A9mo%20GAMR&startdt=2025-10-15T10:30:00&enddt=2025-10-15T11:15:00&body=D%C3%A9monstration%20personnalis%C3%A9e%20GAMR&location=Google%20Meet"
    },
    "summary": {
      "fullName": "Marie Kouassi",
      "organization": "Banque Centrale",
      "email": "marie.kouassi@bcao.example",
      "slot1": {
        "date": "15 octobre 2025",
        "time": "10:30",
        "timezone": "Africa/Abidjan (GMT+0)"
      },
      "duration": "45 minutes",
      "meetingTool": "Google Meet"
    }
  }
}
```

#### Error Response (400 Bad Request)

```typescript
interface DemoRequestErrorResponse {
  success: false;
  error: {
    message: string; // General error message
    code: string; // Error code for client handling
    fields?: Record<string, string[]>; // Field-specific errors
  };
}
```

**Example Validation Error**:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "fields": {
      "email": ["Invalid email format"],
      "slot1.date": ["Date must be at least 24 hours in the future"],
      "gdprConsent": ["GDPR consent is required"]
    }
  }
}
```

**Example Spam Detection Error**:

```json
{
  "success": false,
  "error": {
    "message": "Spam detected",
    "code": "SPAM_DETECTED"
  }
}
```

#### Error Response (500 Internal Server Error)

```typescript
interface DemoRequestServerErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
  };
}
```

**Example Server Error**:

```json
{
  "success": false,
  "error": {
    "message": "Failed to process demo request. Please try again.",
    "code": "SERVER_ERROR"
  }
}
```

### Processing Flow

1. **Validate Request**:
   - Parse JSON body
   - Validate against Zod schema (see validation-schemas.md)
   - Check honeypot field (must be empty)
   - Return 400 with field errors if validation fails

2. **Check Time Slots**:
   - Validate all 3 slots are at least 24 hours in future
   - Convert to UTC using timezone
   - Return 400 if any slot is in the past

3. **Generate Calendar Invitation**:
   - Create .ics file for slot1 using `ics` library
   - Include event details, organizer, attendee, timezone
   - Store .ics content for email attachment

4. **Generate Calendar Links**:
   - Create Google Calendar URL with encoded event details
   - Create Outlook URL with encoded event details
   - Create .ics download endpoint URL

5. **Send Email**:
   - Use Resend API to send confirmation email
   - Include .ics file as attachment
   - Include summary of request details
   - Log error if email fails (don't block success response)

6. **Persist Request**:
   - Generate unique ID (timestamp or UUID)
   - Add status: "pending", createdAt: timestamp
   - Add flags: icsGenerated, emailSent
   - Write to JSON file (data/demo-requests.json)
   - Handle file write errors gracefully

7. **Return Success Response**:
   - Return 201 with confirmation data
   - Include calendar links for frontend
   - Include summary for display

### Error Handling

| Error Scenario                  | HTTP Status | Error Code        | Client Behavior                         |
| ------------------------------- | ----------- | ----------------- | --------------------------------------- |
| Invalid JSON                    | 400         | INVALID_JSON      | Show generic error, check request       |
| Missing required fields         | 400         | VALIDATION_ERROR  | Show inline field errors                |
| Invalid email format            | 400         | VALIDATION_ERROR  | Highlight email field                   |
| Time slot in past               | 400         | INVALID_TIME_SLOT | Highlight slot field, suggest future    |
| GDPR consent not checked        | 400         | CONSENT_REQUIRED  | Scroll to consent, highlight checkbox   |
| Honeypot filled (spam detected) | 400         | SPAM_DETECTED     | Silent rejection (don't reveal reason)  |
| Email service failure           | 201         | _N/A_             | Success (email logged, will be retried) |
| Database write failure          | 500         | SERVER_ERROR      | Show retry message, contact support     |
| Unknown server error            | 500         | SERVER_ERROR      | Show generic error, log details         |

**Important**: Email and database failures should not block success response. Log errors server-side for follow-up, but return 201 to user. This prevents user frustration from transient issues while ensuring request is captured.

### Rate Limiting

**Recommended Strategy**:

- 5 requests per IP address per hour
- Implement using middleware (e.g., `express-rate-limit` equivalent)
- Return 429 Too Many Requests if exceeded
- Reset window after 1 hour

**Error Response (429)**:

```json
{
  "success": false,
  "error": {
    "message": "Too many requests. Please try again later.",
    "code": "RATE_LIMIT_EXCEEDED",
    "retryAfter": 3600
  }
}
```

### Security Considerations

1. **Input Sanitization**:
   - Zod schema handles type validation
   - Trim whitespace from string fields
   - Limit string field lengths (prevent DoS)
   - Validate enum values against allowed list

2. **Anti-Spam**:
   - Honeypot field (invisible, must be empty)
   - Optional: Add Turnstile/CAPTCHA token validation
   - Rate limiting per IP address

3. **Data Protection**:
   - Email and phone are PII - handle per GDPR
   - Do not log sensitive data
   - Secure email API keys in environment variables
   - Do not expose internal error details to client

4. **CORS**:
   - Allow same-origin requests only (marketing site)
   - If deployed on separate domain, whitelist specific origin

### Monitoring

**Metrics to Track**:

- Request volume per day/week
- Validation error rates (by field)
- Email delivery success rate
- Database write success rate
- Response time (p50, p95, p99)
- Spam detection rate (honeypot triggers)

**Alerting Thresholds**:

- Email delivery failure rate > 10%
- Database write failure rate > 1%
- Response time p95 > 2 seconds
- Validation error rate > 50% (indicates UX issue)

---

## GET /api/demo/[id]/calendar.ics (Optional Enhancement)

**Purpose**: Download .ics file for a specific demo request (alternative to inline blob).

### Request

**Method**: `GET`  
**Authentication**: None (public, ID is opaque)  
**Path Parameter**: `id` (string) - Demo request ID

### Response

**Success (200 OK)**:

```
Content-Type: text/calendar; charset=utf-8
Content-Disposition: attachment; filename="demo-gamr.ics"

BEGIN:VCALENDAR
VERSION:2.0
...
END:VCALENDAR
```

**Error (404 Not Found)**:

```json
{
  "success": false,
  "error": {
    "message": "Demo request not found",
    "code": "NOT_FOUND"
  }
}
```

**Implementation Note**: This endpoint is optional for MVP. Can use blob URLs instead. Useful if .ics download link needs to persist (e.g., in confirmation email).
