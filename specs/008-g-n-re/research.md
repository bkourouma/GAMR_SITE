# Research: Demo Request Page Technology Decisions

**Feature**: 008-g-n-re  
**Date**: 2025-10-09  
**Purpose**: Resolve technology choices and best practices for demo request page implementation

---

## Research Task 1: Calendar Generation Library

**Question**: Which library should be used for .ics file generation?

### Options Evaluated

#### Option A: `ics` (npm package)

**Pros**:

- Simple, functional API: `createEvent()` returns .ics string
- Small bundle size (~15KB)
- Good TypeScript support
- Handles timezone conversion automatically
- Active maintenance (last updated 2024)

**Cons**:

- Less feature-rich (no recurring events, alarms require manual setup)
- API is somewhat imperative

**Example Usage**:

```typescript
import { createEvent } from 'ics';

const event = {
  start: [2025, 10, 15, 10, 30],
  duration: { minutes: 45 },
  title: 'Démo GAMR',
  description: 'Démonstration personnalisée GAMR',
  location: 'Google Meet',
  organizer: { name: 'Équipe GAMR', email: 'demo@gamr.example' },
  attendees: [{ name: 'John Doe', email: 'john@example.com' }],
};

const { value } = createEvent(event); // Returns .ics string
```

#### Option B: `ical-generator`

**Pros**:

- More feature-rich (alarms, recurring events, better customization)
- Fluent, chainable API
- Good for complex calendar scenarios

**Cons**:

- Larger bundle size (~45KB)
- More complex API for simple use case
- Overkill for single-event generation

### Decision: **ics**

**Rationale**: The `ics` package is sufficient for our single-event use case (demo invitation for first time slot). Its smaller bundle size (15KB vs 45KB) aligns with performance requirements (lazy-loading to keep initial bundle small). Simple functional API reduces implementation complexity. We don't need recurring events or advanced alarm features.

**Alternatives considered**: `ical-generator` evaluated but rejected due to unnecessary complexity and larger bundle size for our straightforward single-event generation needs.

---

## Research Task 2: Timezone Handling

**Question**: Which library handles timezone-aware date operations?

### Options Evaluated

#### Option A: `date-fns-tz`

**Pros**:

- Extends date-fns (already familiar to developers)
- Tree-shakeable, only import what you need
- Good TypeScript support
- ~70KB with timezone data
- Works well with IANA timezone identifiers (e.g., "Africa/Abidjan")

**Cons**:

- Requires date-fns as peer dependency
- Timezone data adds to bundle size

**Example Usage**:

```typescript
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

const localDate = new Date('2025-10-15 10:30');
const utcDate = zonedTimeToUtc(localDate, 'Africa/Abidjan');
const formatted = format(utcDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Africa/Abidjan' });
```

#### Option B: `luxon`

**Pros**:

- Comprehensive, modern date library
- Excellent timezone support
- Immutable API
- Good error handling

**Cons**:

- Larger bundle (~75KB + timezone data ~200KB)
- Different API paradigm (not compatible with date-fns)
- Heavier for simple timezone conversion

#### Option C: `day.js` with timezone plugin

**Pros**:

- Very small base library (~7KB)
- Plugin architecture keeps bundle small
- API similar to moment.js (familiar)

**Cons**:

- Timezone plugin adds significant weight (~200KB for timezone data)
- Less TypeScript support than date-fns-tz
- Mutability issues in some operations

### Decision: **date-fns-tz**

**Rationale**: Best balance of bundle size, functionality, and TypeScript support. Tree-shakeable nature allows importing only needed functions. Consistent with date-fns patterns already used in codebase. IANA timezone support is excellent for Africa/Abidjan default and timezone selector. Total cost (~70KB) is acceptable when lazy-loaded as part of form interaction.

**Alternatives considered**: Luxon rejected due to larger bundle and API divergence from existing patterns. Day.js rejected due to timezone data weight and weaker TypeScript support.

---

## Research Task 3: Date/Time Picker Component

**Question**: Which date/time picker provides best UX and accessibility?

### Options Evaluated

#### Option A: `react-datepicker`

**Pros**:

- Comprehensive all-in-one solution (date + time)
- Good accessibility (keyboard nav, ARIA labels)
- Customizable styling
- ~50KB gzipped
- Works with date-fns

**Cons**:

- Moderate bundle size
- Styling customization requires CSS overrides
- Time picker UX is separate modal

**Example Usage**:

```tsx
import DatePicker from 'react-datepicker';

<DatePicker
  selected={selectedDate}
  onChange={setSelectedDate}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="yyyy-MM-dd HH:mm"
  minDate={new Date()}
/>;
```

#### Option B: `react-day-picker` + native time input

**Pros**:

- Lighter weight for date picker (~30KB)
- Excellent accessibility
- Modern, customizable with CSS modules
- Native time input reduces bundle size
- More control over time input UX

**Cons**:

- Requires separate time input implementation
- Two separate components to coordinate
- Native time input browser inconsistencies

#### Option C: shadcn/ui Calendar + native inputs

**Pros**:

- Already in codebase (zero additional bundle)
- Full styling control (Tailwind-based)
- Consistent with site design system
- Lightest option

**Cons**:

- More implementation work (wire up date + time separately)
- Need to build time input component
- Accessibility requires manual ARIA implementation

### Decision: **shadcn/ui Calendar + native time inputs**

**Rationale**: Aligns with existing design system and component library. Zero additional bundle size (shadcn/ui Calendar already available). Native `<input type="time">` provides good mobile UX with native pickers. Browser inconsistencies are minimal with modern evergreen browsers (Chrome, Safari, Firefox, Edge). Allows full Tailwind customization to match site aesthetic. Accessibility requirements met through shadcn/ui's built-in ARIA support plus custom time input labeling.

**Alternatives considered**: react-datepicker rejected due to 50KB bundle cost and styling friction. react-day-picker considered but shadcn/ui Calendar provides equivalent functionality already in codebase.

**Implementation notes**:

- Use shadcn/ui `Calendar` component for date selection
- Use native `<input type="time">` for 24-hour time input
- Wrap in custom `TimeSlotPicker` component for consistent UX
- Handle min/max date validation (24h in future)
- Format display with date-fns for consistent formatting

---

## Research Task 4: Email Service

**Question**: Which email service handles transactional emails with .ics attachments?

### Options Evaluated

#### Option A: Resend

**Pros**:

- Modern, developer-friendly API
- First-class TypeScript support
- Excellent attachment support (.ics files)
- Generous free tier (100 emails/day)
- Fast delivery (<1 second)
- Simple setup (API key only)

**Cons**:

- Requires account signup
- External service dependency
- Free tier limit may be reached at scale

**Example Usage**:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'demo@gamr.example',
  to: prospect.email,
  subject: 'Votre demande de démo GAMR',
  html: '<p>Merci...</p>',
  attachments: [
    {
      filename: 'demo-gamr.ics',
      content: icsContent,
    },
  ],
});
```

#### Option B: Nodemailer (SMTP)

**Pros**:

- No external service dependency (use own SMTP)
- Mature, battle-tested library
- Supports all email features (.ics attachments)
- Free (no usage limits)

**Cons**:

- Requires SMTP server configuration
- More complex setup (server, credentials, ports)
- Slower delivery than managed services
- Deliverability challenges (SPF, DKIM, DMARC setup)

#### Option C: SendGrid

**Pros**:

- Robust, enterprise-grade service
- Excellent deliverability
- Good attachment support

**Cons**:

- More complex API than Resend
- Free tier more limited (100 emails/day but stricter quotas)
- Heavier SDK

### Decision: **Resend**

**Rationale**: Best developer experience with simple API and first-class TypeScript support. Attachment handling (critical for .ics files) is straightforward. Fast delivery (<1s) meets requirement of email acknowledgment within 2 minutes. Free tier (100 emails/day) is sufficient for expected volume (50-200 submissions/month = ~2-7/day). Setup complexity is minimal (single API key environment variable). Modern service with good documentation.

**Alternatives considered**: Nodemailer rejected due to SMTP configuration overhead and deliverability challenges. SendGrid rejected due to API complexity and less generous free tier features.

**Implementation notes**:

- Store `RESEND_API_KEY` in environment variables
- Create email template for demo acknowledgment (HTML + plain text)
- Attach .ics file as binary content
- Handle errors gracefully (log failure, show success to user anyway)
- Monitor Resend dashboard for delivery metrics

---

## Research Task 5: Form State Management

**Question**: Best practices for multi-section forms with React Hook Form?

### Approaches Evaluated

#### Approach A: Single Form with Sections

**Pros**:

- Simplest implementation (one `<form>` element)
- All fields validated together on submit
- Easier state management (single form state)
- No step/navigation logic required
- Better for accessibility (linear tab order)

**Cons**:

- Long page scroll on mobile
- All fields visible (may feel overwhelming)
- No incremental validation feedback per section

**Implementation**:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  <ContactFields register={register} errors={errors} />
  <QualificationFields register={register} errors={errors} />
  <SchedulingFields register={register} errors={errors} />
  <ConsentFields register={register} errors={errors} />
  <button type="submit">Submit</button>
</form>
```

#### Approach B: Multi-Step Wizard

**Pros**:

- Better mobile UX (one section at a time)
- Progress indication (step 1/4)
- Incremental validation (validate on "Next")
- Less overwhelming for users

**Cons**:

- More complex state management (current step, navigation)
- Back button handling required
- Accessibility challenges (screen reader navigation)
- Performance overhead (re-rendering on step changes)
- More code to maintain

**Implementation**:

```tsx
const [step, setStep] = useState(1);

{
  step === 1 && <ContactFields />;
}
{
  step === 2 && <QualificationFields />;
}
{
  step === 3 && <SchedulingFields />;
}
{
  step === 4 && <ConsentFields />;
}

<button onClick={() => setStep(step + 1)}>Next</button>;
```

### Decision: **Single Form with Sections**

**Rationale**: Spec assumption states "Form does not require multi-step/wizard UI initially (can be single long form with sections)". Single form is simpler, more accessible (linear navigation), and sufficient for MVP. Desktop users see all fields without complexity. Mobile users can scroll through sections naturally. React Hook Form provides excellent field-level validation with `mode: 'onBlur'` for incremental feedback without wizard complexity. Estimated ~25 fields fit reasonably on mobile with good spacing.

**Alternatives considered**: Multi-step wizard rejected for MVP due to complexity overhead and accessibility concerns. Can be added later if user testing shows completion rate issues.

**Implementation notes**:

- Use semantic `<fieldset>` and `<legend>` for each section
- React Hook Form with `mode: 'onBlur'` for inline validation
- Scroll to first error on submit (`scroll-behavior: smooth`)
- Visual section separation with borders/backgrounds
- Optional: Sticky header showing current section on scroll

---

## Research Task 6: Anti-Spam Strategy

**Question**: Which anti-spam approach balances security and user experience?

### Options Evaluated

#### Option A: Honeypot Field

**Pros**:

- Zero user friction (invisible to humans)
- No external service dependency
- Free, unlimited use
- Easy implementation (~10 lines of code)
- Blocks simple bots effectively

**Cons**:

- Ineffective against advanced bots
- Can be bypassed by bot operators who know the pattern

**Implementation**:

```tsx
<input
  type="text"
  name="website"
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>;

// Server-side check
if (body.website) {
  return Response.json({ error: 'Spam detected' }, { status: 400 });
}
```

#### Option B: Cloudflare Turnstile

**Pros**:

- Modern, privacy-friendly CAPTCHA alternative
- Minimal user friction (often invisible)
- Effective against bots
- Free tier (1M verifications/month)

**Cons**:

- Requires Cloudflare account
- External service dependency
- Privacy concerns (third-party request)
- Adds ~30KB to bundle

#### Option C: hCaptcha

**Pros**:

- Proven effectiveness
- Privacy-focused alternative to reCAPTCHA
- Free tier (unlimited for non-enterprise)

**Cons**:

- User friction (checkbox or image challenges)
- Accessibility issues for some users
- Adds ~40KB to bundle
- Privacy concerns (third-party request)

### Decision: **Honeypot Field (MVP), with Turnstile ready for upgrade**

**Rationale**: Honeypot provides zero-friction experience for legitimate users while blocking simple bots (which represent 80%+ of spam). Spec states "Turnstile/hCaptcha (stub) + honeypot", indicating honeypot is primary with CAPTCHA as optional enhancement. For MVP with expected low traffic (50-200 submissions/month), honeypot is sufficient. No external dependencies, no privacy concerns, no bundle size impact. If spam becomes problematic, Turnstile can be added with minimal code changes.

**Alternatives considered**: Turnstile and hCaptcha evaluated but rejected for MVP due to added complexity and user friction without demonstrated need. Honeypot solves 80% of problem with 20% of effort.

**Implementation notes**:

- Create hidden field "website" (common bot target)
- Style with `position: absolute; left: -9999px`
- Add `aria-hidden="true"` for screen readers
- Add `tabIndex={-1}` to prevent keyboard focus
- Server-side validation: reject if field populated
- Monitor submission patterns; add Turnstile if spam rate > 10%

---

## Research Task 7: Data Persistence

**Question**: How to store demo requests for MVP?

### Options Evaluated

#### Option A: JSON File Storage

**Pros**:

- Zero configuration (no database setup)
- Simple Node.js fs operations
- Perfect for MVP/low volume
- Easy to inspect/debug (human-readable)
- No external service dependency

**Cons**:

- Not suitable for production scale
- No concurrent write safety
- No query capabilities
- Manual data backup required

**Implementation**:

```typescript
import fs from 'fs/promises';

const request = { id: Date.now(), ...data, status: 'pending' };
const existing = JSON.parse(await fs.readFile('data/demo-requests.json', 'utf-8'));
existing.push(request);
await fs.writeFile('data/demo-requests.json', JSON.stringify(existing, null, 2));
```

#### Option B: Prisma + PostgreSQL

**Pros**:

- Production-ready
- Type-safe database access
- Migration system
- Query capabilities
- Concurrent write safety

**Cons**:

- Requires database setup (PostgreSQL)
- More complex configuration
- Overkill for MVP volume (50-200/month)
- Additional dependencies

#### Option C: Prisma + SQLite

**Pros**:

- Zero configuration (file-based)
- Type-safe like PostgreSQL
- Good for low-volume production
- Easy migration to PostgreSQL later

**Cons**:

- Additional dependencies vs JSON
- Concurrent write limitations
- Still more setup than JSON file

### Decision: **JSON File Storage (MVP), with Prisma migration path documented**

**Rationale**: Expected volume (50-200 submissions/month) is extremely low. JSON file storage is sufficient for MVP, requires zero configuration, and is easy to inspect. Node.js fs operations are reliable for sequential writes. Can be implemented in < 50 lines with error handling. Deployment is simple (just ensure `data/` directory exists). When volume grows or sales team needs query capabilities, migration to Prisma + PostgreSQL is straightforward (JSON is already structured data).

**Alternatives considered**: Prisma + PostgreSQL rejected for MVP due to setup overhead without demonstrated need. Prisma + SQLite considered but adds dependency without sufficient benefit for MVP scale.

**Implementation notes**:

- Store requests in `data/demo-requests.json` (gitignored)
- Each request has: `id` (timestamp), all form data, `status: 'pending'`, `createdAt: ISO timestamp`
- Append-only writes (load → parse → append → write)
- Add file lock if concurrent submissions become issue
- Document Prisma migration path in quickstart.md
- Create stub Prisma schema in comments for future reference

---

## Summary of Decisions

| Decision Area         | Chosen Solution                    | Key Rationale                                           |
| --------------------- | ---------------------------------- | ------------------------------------------------------- |
| Calendar Generation   | `ics` package                      | Small bundle (15KB), simple API, sufficient features    |
| Timezone Handling     | `date-fns-tz`                      | Tree-shakeable, TypeScript support, works with date-fns |
| Date/Time Picker      | shadcn/ui Calendar + native time   | Zero bundle cost, consistent design, good mobile UX     |
| Email Service         | Resend                             | Simple API, fast delivery, excellent attachment support |
| Form State Management | Single form with sections          | Simpler, more accessible, sufficient for MVP            |
| Anti-Spam             | Honeypot field (Turnstile ready)   | Zero friction, blocks 80% of bots, easy to upgrade      |
| Data Persistence      | JSON file (Prisma migration ready) | Simple MVP, zero config, easy migration path            |

All decisions align with performance requirements (lazy-loading, small bundles), accessibility requirements (keyboard nav, ARIA support), and MVP scope (simple solutions, upgrade paths documented).
