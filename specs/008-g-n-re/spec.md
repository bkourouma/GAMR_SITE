# Feature Specification: Demo Request Page

**Feature Branch**: `008-g-n-re`  
**Created**: 2025-10-09  
**Status**: Draft  
**Input**: User description: "Génère le contenu et la structure HTML/MDX pour la page : http://localhost:3000/demander-demo - page de demande de démo personnalisée avec formulaire de qualification, planification de créneaux, et génération d'invitations calendrier (.ics)"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Prospect Requests Personalized Demo (Priority: P1)

A business prospect (director, compliance officer, or operations manager) visits the demo request page to schedule a personalized demonstration of GAMR. They need to provide their information, specify their needs, and propose convenient time slots for the demo.

**Why this priority**: This is the core conversion funnel for transforming website visitors into qualified leads. Without this functionality, prospects cannot request demos.

**Independent Test**: Can be fully tested by filling out the contact and qualification sections, proposing 3 time slots, accepting consent, and successfully submitting the form. Delivers a complete demo request that sales can act upon.

**Acceptance Scenarios**:

1. **Given** a prospect visits /demander-demo, **When** they complete all required fields (name, organization, email, sector, standards, goals, team size, mode, modules, 3 time slots, and GDPR consent), **Then** the form submits successfully
2. **Given** a prospect submits a valid demo request, **When** submission completes, **Then** they receive an immediate confirmation screen with a summary of their request
3. **Given** a prospect's submission includes their email, **When** the request is processed, **Then** they receive an email acknowledgment with demo details
4. **Given** a prospect provides incomplete required information, **When** they attempt to submit, **Then** they see clear inline error messages indicating which fields need attention

---

### User Story 2 - Prospect Adds Demo to Calendar (Priority: P2)

After submitting a demo request, the prospect wants to add the proposed time slot to their personal calendar for easy reference and planning.

**Why this priority**: Improves prospect engagement and reduces no-shows by making it easy to block time. Adds convenience but isn't essential for the initial request.

**Independent Test**: Can be tested by completing a demo request and verifying that calendar integration options (download .ics, add to Google Calendar, add to Outlook) are available and generate correct calendar entries for the first proposed time slot.

**Acceptance Scenarios**:

1. **Given** a prospect completes a demo request, **When** they view the confirmation screen, **Then** they see options to download a .ics file and add to Google Calendar or Outlook
2. **Given** a prospect clicks "Download .ics", **When** the file downloads, **Then** it contains the first proposed time slot with correct date, time, duration, and timezone (Africa/Abidjan)
3. **Given** a prospect clicks "Add to Google Calendar", **When** the link opens, **Then** Google Calendar pre-populates with the demo event details
4. **Given** a prospect clicks "Add to Outlook", **When** the link opens, **Then** Outlook pre-populates with the demo event details

---

### User Story 3 - Prospect Specifies Demo Preferences (Priority: P2)

The prospect needs to communicate their specific requirements, priorities, and context to ensure the demo team prepares a relevant demonstration tailored to their industry, compliance needs, and use cases.

**Why this priority**: Enhances demo quality and sales qualification but the demo can still be scheduled without detailed preferences (sales can gather details later).

**Independent Test**: Can be tested by filling out the qualification fields (sector, standards, goals, modules, team size, context, mode, imports, meeting tool preference, language) and verifying they're included in the submitted request.

**Acceptance Scenarios**:

1. **Given** a prospect selects multiple priority standards (e.g., ISO 31000, ISO 27001, RGPD/ANSSI-CI), **When** they submit, **Then** all selected standards are captured in the request
2. **Given** a prospect selects multiple modules to prioritize (e.g., Risk Evaluation, Action Plans, Dashboards), **When** they submit, **Then** these preferences guide demo preparation
3. **Given** a prospect provides context about their challenges, **When** they enter up to 400 characters in the context field, **Then** this information is included in the sales team's briefing
4. **Given** a prospect selects their preferred meeting tool (Google Meet, Teams, Zoom, or Phone), **When** they submit, **Then** the demo team knows which platform to prepare

---

### User Story 4 - Prospect Opts In for Marketing Content (Priority: P3)

The prospect may want to receive additional product resources, case studies, and use case examples beyond the demo invitation.

**Why this priority**: Nice to have for lead nurturing but not essential for demo scheduling. Can be added later via separate marketing channels.

**Independent Test**: Can be tested by checking/unchecking the marketing opt-in checkbox and verifying the preference is captured separately from the mandatory GDPR consent.

**Acceptance Scenarios**:

1. **Given** a prospect reviews the consent section, **When** they see the marketing opt-in option, **Then** it is clearly marked as optional and separate from required GDPR consent
2. **Given** a prospect checks the marketing opt-in box, **When** they submit, **Then** their preference is recorded for future communications
3. **Given** a prospect leaves the marketing opt-in unchecked, **When** they submit, **Then** they still receive only the demo-related communications

---

### Edge Cases

- What happens when a prospect proposes time slots that are all in the past?
- What happens when a prospect proposes overlapping time slots?
- What happens when a prospect enters an invalid email format?
- What happens when the timezone selector shows a timezone that doesn't match their location?
- What happens when a prospect tries to submit without accepting GDPR consent?
- What happens when the calendar file (.ics) fails to generate?
- What happens when a prospect's browser blocks the calendar integration popup?
- What happens when a prospect selects more than 10 modules or standards?
- What happens when the email service is unavailable during submission?
- What happens when a prospect navigates away mid-form and returns later?

## Requirements _(mandatory)_

### Functional Requirements

#### Content & Structure

- **FR-001**: Page MUST display a hero section with title "Demandez votre démo personnalisée", subtitle "Sélectionnez vos priorités et proposez vos disponibilités", and 3 key points: "Démo 30–45 min", "Équipe experte", "Sans engagement"
- **FR-002**: Page MUST display a value proposition section explaining demo coverage (risk assessment, matrices, action plans, dashboards, reports) and sector adaptation
- **FR-003**: Page MUST be accessible at the route /demander-demo

#### Contact Information Collection

- **FR-004**: Form MUST collect Full Name (required, minimum 2 characters)
- **FR-005**: Form MUST collect Organization name (required, minimum 2 characters)
- **FR-006**: Form MUST collect Professional email address (required, validated email format)
- **FR-007**: Form MUST collect Phone number (optional)
- **FR-008**: Form MUST collect Role with options: Direction, Conformité/Audit, Opérations, IT/Sécurité, Autre (optional)

#### Qualification Information

- **FR-009**: Form MUST collect Sector (required) with options: Industrie extractive, Aéroportuaire, Gouvernement/Institution, Banque & Finance, Santé & Hôpitaux, Autre
- **FR-010**: Form MUST allow selection of multiple Priority Standards from: ISO 31000, ISO 27001, ISO 45001, ISO 14001, OACI Annexe 19, COSO ERM, RGPD/ANSSI-CI, Bâle III, OMS Patient Safety, Autre (minimum 1 required)
- **FR-011**: Form MUST allow selection of multiple Primary Goals from: Cartographie, Conformité & audits, Automatisation & workflows, Reporting, Collaboration, Incidents (minimum 1 required)
- **FR-012**: Form MUST collect Team Size (required) with options: 1–10, 11–50, 51–200, 201–1000, 1000+
- **FR-013**: Form MUST collect Context & Challenges (optional, maximum 400 characters) describing the problem to solve or use case
- **FR-014**: Form MUST collect Deployment Mode preference (required) with options: Cloud or On-Premises
- **FR-015**: Form MUST allow selection of multiple Data Import sources from: Excel, CSV, ERP/CRM, Aucun, Autre (optional)
- **FR-016**: Form MUST allow selection of multiple Modules to Prioritize from: Évaluation risques, Plans d'action, Incidents/NC, Audits/rapports, Tableaux de bord, Multi-entités (minimum 1 required)

#### Demo Scheduling

- **FR-017**: Form MUST default timezone to Africa/Abidjan with option to change via timezone selector
- **FR-018**: Form MUST collect Demo Duration preference (required) with options: 30 min, 45 min, 60 min (default: 45 min)
- **FR-019**: Form MUST collect exactly 3 proposed time slots (required), each with date and time in 24-hour format
- **FR-020**: Form MUST validate that all proposed time slots are in the future (at least 24 hours from submission)
- **FR-021**: Form MUST collect Preferred Meeting Channel (required) with options: Google Meet, Microsoft Teams, Zoom, Téléphone (default: Google Meet)
- **FR-022**: Form MUST collect Demo Language (required) with options: Français, Anglais (default: Français)
- **FR-023**: System MUST display all times and dates in the user's selected timezone

#### Consent & Security

- **FR-024**: Form MUST require explicit GDPR consent checkbox: "J'accepte d'être contacté pour l'organisation de cette démo" (required to submit)
- **FR-025**: Form MUST display optional marketing opt-in: "Recevoir des ressources produit et cas d'usage" (opt-in, not required)
- **FR-026**: Form MUST implement anti-spam protection (honeypot field and/or CAPTCHA)
- **FR-027**: Form MUST prevent submission without required GDPR consent

#### Submission & Confirmation

- **FR-028**: Form MUST validate all required fields before submission
- **FR-029**: Form MUST display inline validation errors for each field with issues
- **FR-030**: Form MUST scroll to the first error field when validation fails
- **FR-031**: Form MUST show loading state and disable submit button during processing
- **FR-032**: System MUST generate a calendar invitation file (.ics) for the first proposed time slot with: event title, description, correct date/time/timezone, duration, location/meeting tool, organizer details, attendee details
- **FR-033**: System MUST send an email acknowledgment to the prospect with: confirmation message, summary of request details (non-sensitive), and attached .ics file
- **FR-034**: System MUST store the demo request with status "pending" for sales team follow-up
- **FR-035**: Form MUST display a success screen after submission with message: "Merci ! Nous revenons vers vous pour confirmer le créneau"
- **FR-036**: Success screen MUST display a summary of submitted information (excluding sensitive data)
- **FR-037**: Success screen MUST provide buttons to: "Télécharger l'invitation .ics", "Ajouter à Google Calendar", "Ajouter à Outlook"

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: All form fields MUST be keyboard accessible (Tab navigation, Enter to submit, Esc to clear)
- **A11Y-002**: All form fields MUST have visible labels and appropriate ARIA attributes
- **A11Y-003**: All interactive elements (date pickers, dropdowns, checkboxes, buttons) MUST be keyboard operable
- **A11Y-004**: Color contrast MUST meet 4.5:1 ratio minimum for all text and form elements
- **A11Y-005**: Focus indicators MUST be clearly visible on all interactive elements
- **A11Y-006**: Validation errors MUST be announced to screen readers with ARIA live regions
- **A11Y-007**: Form structure MUST follow logical tab order matching visual layout
- **A11Y-008**: Required fields MUST be indicated both visually (asterisk) and programmatically (aria-required)

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) MUST be < 1.5 seconds
- **PERF-002**: Time to Interactive (TTI) MUST be < 3 seconds
- **PERF-003**: Cumulative Layout Shift (CLS) MUST be < 0.1
- **PERF-004**: Lighthouse Performance score MUST be > 90
- **PERF-005**: Date picker and timezone libraries MUST be lazy-loaded to reduce initial bundle size
- **PERF-006**: Form validation MUST respond instantly (< 100ms) for inline field validation
- **PERF-007**: Form submission MUST provide feedback within 2 seconds (loading state)

### SEO Requirements

- **SEO-001**: Page MUST have title: "Demander une Démo GAMR - Démonstration Personnalisée" (< 60 characters)
- **SEO-002**: Page MUST have meta description explaining demo request value proposition (150-160 characters)
- **SEO-003**: Page MUST have complete OpenGraph tags (og:title, og:description, og:image, og:url)
- **SEO-004**: Page MUST include JSON-LD structured data for ContactPage schema
- **SEO-005**: Page MUST have canonical URL defined
- **SEO-006**: Page MUST use semantic HTML (form, fieldset, legend) for proper structure

### Key Entities

- **Demo Request**: Represents a prospect's request for a personalized demo, including contact information (name, organization, email, phone, role), qualification details (sector, standards, goals, team size, context, deployment mode, import sources, priority modules), scheduling preferences (timezone, duration, 3 proposed time slots, meeting channel, language), consents (GDPR required, marketing optional), submission timestamp, and processing status
- **Time Slot**: Represents a proposed date and time for the demo in a specific timezone, includes date, time (24h format), timezone, and duration
- **Calendar Invitation**: Represents the generated .ics file containing event details for the first proposed time slot, includes event title, description, start/end times in correct timezone, location/meeting tool, organizer and attendee information

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Prospects can complete the entire demo request process (form fill to confirmation) in under 5 minutes
- **SC-002**: Form validation provides feedback on invalid fields within 100 milliseconds of field blur
- **SC-003**: 95% of demo requests successfully generate calendar invitations (.ics files) on first attempt
- **SC-004**: 90% of prospects successfully receive email acknowledgment within 2 minutes of form submission
- **SC-005**: Page loads completely and becomes interactive in under 3 seconds on 4G mobile connections
- **SC-006**: Zero critical accessibility violations detected by automated WCAG 2.1 AA testing tools
- **SC-007**: Calendar integration (download .ics, Google Calendar, Outlook) works correctly for all supported timezones
- **SC-008**: 85% of prospects who start the form complete and submit it (form completion rate)
- **SC-009**: All form fields are reachable and operable using only keyboard navigation
- **SC-010**: Demo request data is successfully stored with "pending" status in 99% of submissions

### Assumptions

- Email delivery service (Resend/Nodemailer) is properly configured and operational
- Database/persistence layer (Prisma/DB) is configured for storing demo requests
- Sales team will receive notifications of new demo requests through their existing system
- First proposed time slot is considered the primary/preferred slot for calendar generation
- Africa/Abidjan timezone is appropriate default for target market (Côte d'Ivoire)
- CAPTCHA service (Turnstile/hCaptcha) is configured if implemented (may start with honeypot only)
- Email addresses ending in common personal domains (gmail, yahoo, hotmail) are acceptable for "professional email" requirement
- 24-hour advance notice is sufficient minimum for proposed demo time slots
- Standard web calendar formats (.ics) are universally supported by target users' calendar applications
- Form does not require multi-step/wizard UI initially (can be single long form with sections)
