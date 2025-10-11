# Feature Specification: Page Essai Gratuit

**Feature Branch**: `007-g-n-re`  
**Created**: 2025-10-09  
**Status**: Draft  
**Input**: User description: "Génère le contenu et la structure HTML/MDX pour la page : /essai-gratuit - Questionnaire de 10 questions pour qualifier les besoins et préparer l'onboarding sur GAMR (Grille d'Analyse des Menaces et Risques). Le but est d'orienter la configuration du compte d'essai, prioriser les modules, et planifier une démo personnalisée."

## User Scenarios & Testing

### User Story 1 - Complete Free Trial Questionnaire (Priority: P1)

A prospective client visits `/essai-gratuit` to start their free trial. They view the hero section explaining the trial offer (no credit card required, cancellable anytime, support included), then complete a 10-question questionnaire about their organization's needs (sector, size, compliance standards, goals, maturity, user count, data import needs, priority modules, timeline, and constraints). After providing contact information and consenting to be contacted, they submit the form and receive immediate confirmation with next steps.

**Why this priority**: This is the core value proposition - capturing qualified leads and enabling personalized trial setup. Without this, the feature has no purpose.

**Independent Test**: Can be fully tested by visiting `/essai-gratuit`, completing all 10 questions plus contact fields, submitting the form, and verifying the success confirmation screen appears with appropriate next steps.

**Acceptance Scenarios**:

1. **Given** a visitor accesses `/essai-gratuit`, **When** they view the page, **Then** they see a hero section with title "Lancez votre essai gratuit — 10 questions, 2 minutes", subtitle explaining GAMR configuration, 3 key benefit points (Sans CB, Résiliable, Support inclus), and a CTA to start the questionnaire
2. **Given** the visitor scrolls down, **When** they view the context block, **Then** they see a clear explanation of what's included (platform access, base modules, email support, ISO 31000 default model) and what's excluded (specific connectors, SSO)
3. **Given** the questionnaire is displayed, **When** the visitor answers all 10 questions (sector, org size, priority standards, main goals, current maturity level 1-5, expected user count, data import needs, priority modules, implementation timeline, main constraint), **Then** all inputs are validated with inline error messages for required fields
4. **Given** the visitor completed the 10 questions, **When** they fill contact information (full name, organization, professional email, optional phone), **Then** the email field validates proper email format
5. **Given** all questions and contact fields are filled, **When** the visitor checks the consent checkbox and clicks submit, **Then** the form data is validated and submitted to the API
6. **Given** form submission succeeds, **When** the API returns success, **Then** the visitor sees a success screen with check icon, confirmation message "Merci ! Votre essai est en préparation", summary of non-sensitive responses, and next steps (activation email, demo scheduling, FAQ)

---

### User Story 2 - Navigate Multi-Step Form with Validation (Priority: P2)

A visitor fills out the questionnaire step by step. The interface displays a progress bar (0-100%) showing how far they've progressed. As they move through questions using "Précédent" and "Suivant" buttons, each step is validated before allowing progression. When validation fails, errors appear inline and the page scrolls to the first error. They can go back to previous questions to modify answers.

**Why this priority**: Good UX reduces form abandonment and improves completion rates. This enhances P1 but isn't essential for the feature to work.

**Independent Test**: Can be tested by attempting to advance through the form with empty required fields, verifying error messages appear inline, testing the "Précédent" button to go back, and confirming the progress bar updates accurately.

**Acceptance Scenarios**:

1. **Given** the visitor is on question 3, **When** they click "Suivant" without selecting any priority standards (required multiselect), **Then** an inline error message appears in French stating the field is required, and the form does not advance
2. **Given** the visitor sees a validation error, **When** the error appears, **Then** the page automatically scrolls to position the error in the viewport
3. **Given** the visitor is on question 7, **When** they click "Précédent", **Then** they return to question 6 with their previous answer preserved
4. **Given** the visitor progresses through the questionnaire, **When** they complete each question, **Then** the progress bar updates from 0% to 100% proportionally (10% per question plus contact section)
5. **Given** the visitor is on the maturity question (scale 1-5), **When** they interact with the scale control, **Then** they can select any integer value from 1 to 5
6. **Given** the visitor enters a non-numeric value in "Nombre d'utilisateurs prévus", **When** they try to submit or advance, **Then** an error message indicates a positive integer is required

---

### User Story 3 - View Contextual Help and FAQ (Priority: P3)

A visitor needs additional information before committing to the trial. They can access a FAQ section at the bottom of the page covering 3-4 common questions about security & hosting, trial data handling, cancellation process, and support availability. They can also see GDPR/ANSSI-CI compliant privacy information with a link to the full privacy policy.

**Why this priority**: Builds trust and reduces friction, but visitors can complete the trial without reading FAQ. Enhances conversion but isn't blocking.

**Independent Test**: Can be tested by scrolling to the FAQ section and verifying 3-4 entries about security, trial data, cancellation, and support are displayed clearly.

**Acceptance Scenarios**:

1. **Given** the visitor scrolls past the form, **When** they reach the FAQ section, **Then** they see 3-4 expandable FAQ entries covering security/hosting, trial data handling, cancellation, and support
2. **Given** the visitor views the consent checkbox section, **When** they read the GDPR/ANSSI-CI notice, **Then** they see information about data storage purpose, retention period, and right to withdraw, plus a clickable link to the full privacy policy
3. **Given** the visitor is at the bottom of the page, **When** they see the final CTA section, **Then** reassurance messages appear with a "Démarrer maintenant" button to scroll back to the form

---

### User Story 4 - Receive Internal Alert and External Confirmation (Priority: P2)

After a visitor successfully submits the trial request, the system sends an internal alert email to the GAMR team containing all the visitor's responses for review and trial preparation. Simultaneously, the visitor receives a confirmation email acknowledging their submission with next steps and a link to schedule a demo.

**Why this priority**: Critical for lead handoff to the sales/onboarding team, but the feature can work without email integration initially (manual review of database entries). Essential for production use.

**Independent Test**: Can be tested by submitting a trial request, checking that an internal alert email is sent to the configured GAMR team address with all questionnaire responses, and verifying the visitor receives a confirmation email.

**Acceptance Scenarios**:

1. **Given** a trial request is successfully submitted, **When** the API processes the request, **Then** an internal alert email is sent to the configured team address containing all 10 questionnaire responses plus contact information
2. **Given** the internal email is sent, **When** the team receives it, **Then** the email includes structured data (sector, org size, standards, goals, maturity, user count, imports, modules, timeline, constraint) formatted for easy review
3. **Given** the API processes the submission, **When** sending the visitor confirmation email, **Then** the email includes a personalized greeting, submission confirmation, summary of their key selections, and a CTA link to schedule a demo
4. **Given** SMTP configuration is missing or invalid, **When** the email send fails, **Then** the submission still succeeds and the visitor sees the success screen, but an error is logged for admin review

---

### Edge Cases

- What happens when a visitor submits the form multiple times (double-click)? System should prevent duplicate submissions via disabled button state after first click.
- How does the system handle partial form completion if the visitor closes the browser? Form state is not persisted; visitor must restart on next visit.
- What happens when the visitor enters "Autre" (Other) in sector or standards fields? The form accepts the selection without requiring additional text input (text input for "Other" is out of scope).
- How does the system handle email delivery failures? Submission succeeds, visitor sees success screen, but admin team is notified via logs to follow up manually.
- What happens when the visitor enters an extremely large number (>1,000,000) for expected users? Validation accepts any positive integer but the sales team will address during demo scheduling.
- How does the system handle form submission when the API route is unavailable? Display a user-friendly error message asking the visitor to retry or contact support directly.
- What happens when the visitor doesn't check the consent checkbox? Form validation prevents submission and displays an inline error message next to the checkbox.
- How does the system handle special characters in text inputs (constraint field)? Text is sanitized to prevent XSS but preserves international characters (accents, etc.) relevant to French content.
- What happens when the visitor enters an invalid email format? Client-side Zod validation displays an inline error message before submission.
- How does the system handle the optional phone field when left empty? Field is omitted from the submission payload if empty; no validation required.

## Requirements

### Functional Requirements

- **FR-001**: System MUST render a dedicated page at route `/essai-gratuit` with hero section, context block, 10-question questionnaire form, contact fields section, FAQ (3-4 entries), and final CTA
- **FR-002**: Hero section MUST display title "Lancez votre essai gratuit — 10 questions, 2 minutes", subtitle "Nous configurons GAMR selon vos priorités risques et conformité", 3 benefit points (Sans CB, Résiliable, Support inclus), and CTA button to scroll to questionnaire
- **FR-003**: Context block MUST explain trial inclusions (platform access, base modules, email support, ISO 31000 default risk model) and exclusions (specific connectors, SSO, custom integrations)
- **FR-004**: Questionnaire MUST include exactly 10 qualification questions in this order: (1) Secteur d'activité (select, required), (2) Taille de l'organisation (select, required), (3) Normes prioritaires (multiselect, required), (4) Objectifs principaux (multiselect, required), (5) Maturité actuelle (scale 1-5, required), (6) Nombre d'utilisateurs prévus (number, required), (7) Données à importer (multiselect, optional), (8) Modules prioritaires (multiselect, required), (9) Délai souhaité de mise en œuvre (select, required), (10) Principale contrainte (text, optional)
- **FR-005**: System MUST display contact fields separate from the 10 questions: Nom complet (required), Organisation (required), Email professionnel (required with email validation), Téléphone (optional)
- **FR-006**: System MUST require explicit consent via checkbox labeled "J'accepte d'être contacté pour l'activation de mon essai et une démo" before form submission
- **FR-007**: System MUST display GDPR/ANSSI-CI compliant notice explaining data storage purpose, retention period, withdrawal rights, with link to privacy policy
- **FR-008**: System MUST validate all form inputs client-side using Zod schema before submission with inline French error messages
- **FR-009**: System MUST display a progress bar (0-100%) showing questionnaire completion percentage
- **FR-010**: System MUST provide "Précédent" and "Suivant" navigation buttons for multi-step form progression
- **FR-011**: System MUST scroll to first validation error when user attempts to advance with invalid inputs
- **FR-012**: System MUST prevent form submission if required fields are empty or consent checkbox is unchecked
- **FR-013**: System MUST submit form data to API route `/api/trial` via POST request with JSON payload containing all 10 question responses plus contact information
- **FR-014**: API route MUST revalidate form data server-side using Zod schema and return 400 error with message if validation fails
- **FR-015**: System MUST display success confirmation screen after successful submission showing: check icon, message "Merci ! Votre essai est en préparation", non-sensitive response summary, next steps (activation email mention, demo scheduling, FAQ link)
- **FR-016**: Success screen MUST provide two CTAs: "Réserver une démo" (calendar/scheduling link) and "Accéder au guide de démarrage" (starter guide link)
- **FR-017**: System MUST send internal alert email to GAMR team containing all questionnaire responses and contact information after successful submission
- **FR-018**: System MUST send confirmation email to visitor with submission acknowledgment and next steps after successful submission
- **FR-019**: System MUST emit analytics events `trial_started` (when form is first displayed) and `trial_submitted` (when form is successfully submitted) for tracking
- **FR-020**: FAQ section MUST include 3-4 entries covering: security & hosting details, trial data handling, cancellation process, support availability during trial
- **FR-021**: System MUST display final CTA section at bottom of page with reassurance messaging and "Démarrer maintenant" button scrolling to form
- **FR-022**: All text content MUST be in French with professional and reassuring tone
- **FR-023**: System MUST use SMTP configuration from environment variables (.env file) for sending emails
- **FR-024**: Question 1 (Secteur) options MUST include: Industrie extractive, Aéroportuaire, Gouvernement/Institution, Banque & Finance, Santé & Hôpitaux, Autre
- **FR-025**: Question 2 (Taille) options MUST include: 1-10, 11-50, 51-200, 201-1000, 1000+
- **FR-026**: Question 3 (Normes) options MUST include: ISO 31000, ISO 27001, ISO 45001, ISO 14001, OACI Annexe 19, COSO ERM, RGPD/ANSSI-CI, Bâle III, OMS Patient Safety, Autre
- **FR-027**: Question 4 (Objectifs) options MUST include: Cartographie des risques, Conformité & audits, Automatisation & workflows, Reporting & tableaux de bord, Collaboration & validation, Sensibilisation & incidents, Autre
- **FR-028**: Question 6 (Nombre d'utilisateurs) MUST accept only positive integers with minimum value of 1
- **FR-029**: Question 7 (Imports) options MUST include: Excel, CSV, ERP/CRM, Aucun, Autre
- **FR-030**: Question 8 (Modules) options MUST include: Évaluation des risques, Plans d'action, Incidents & non-conformités, Audits & rapports, Tableaux de bord, Multi-entités
- **FR-031**: Question 9 (Délai) options MUST include: Immédiat, < 1 mois, 1-3 mois, > 3 mois
- **FR-032**: Question 10 (Contrainte) MUST accept free text with maximum 200 characters

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: All form inputs MUST be keyboard accessible (Tab navigation, Enter to submit, Esc to cancel modals if any)
- **A11Y-002**: All form fields MUST have visible labels with proper `for` attribute linking to input `id`
- **A11Y-003**: Error messages MUST be associated with form fields using `aria-describedby` and announced to screen readers
- **A11Y-004**: Progress bar MUST include `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes
- **A11Y-005**: Multi-step navigation buttons MUST indicate current step and total steps to screen readers
- **A11Y-006**: Color contrast MUST meet 4.5:1 ratio minimum for all text and form controls
- **A11Y-007**: Focus indicators MUST be clearly visible on all interactive elements (inputs, buttons, checkboxes, links)
- **A11Y-008**: FAQ accordion items (if collapsed/expandable) MUST use `aria-expanded` to indicate state
- **A11Y-009**: Form validation errors MUST be announced to screen readers immediately when they occur
- **A11Y-010**: Success confirmation screen MUST announce completion status to screen readers via `role="status"` or `aria-live="polite"`

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) MUST be < 1.5 seconds
- **PERF-002**: Time to Interactive (TTI) MUST be < 3 seconds
- **PERF-003**: Cumulative Layout Shift (CLS) MUST be < 0.1
- **PERF-004**: Lighthouse Performance score MUST be > 90
- **PERF-005**: Form submission MUST complete within 2 seconds under normal network conditions
- **PERF-006**: Icons and non-critical assets MUST be lazy-loaded to optimize initial page load
- **PERF-007**: Client-side form validation MUST provide immediate feedback (< 100ms) after user input

### SEO Requirements

- **SEO-001**: Page MUST have unique title "Essai Gratuit GAMR | Démarrez en 2 Minutes" (≤ 60 characters)
- **SEO-002**: Page MUST have meta description "Configurez votre essai gratuit GAMR en 10 questions. Sans CB, résiliable, support inclus. Gestion des risques et conformité." (≤ 160 characters)
- **SEO-003**: Page MUST include OpenGraph tags: og:title, og:description, og:image (trial page screenshot), og:url, og:type (website)
- **SEO-004**: Page MUST implement JSON-LD structured data for WebPage schema type
- **SEO-005**: Canonical URL MUST point to `https://gamr.com/essai-gratuit` (adjust domain as appropriate)
- **SEO-006**: Page SHOULD use `robots` meta tag set to "noindex, nofollow" if this is a private funnel (to be confirmed based on marketing strategy)

### Key Entities

- **Trial Request**: Represents a completed free trial questionnaire submission. Contains 10 questionnaire responses (sector, organization size, priority standards, main goals, current maturity level, expected user count, data import needs, priority modules, implementation timeline, main constraint) plus contact information (full name, organization name, professional email, optional phone number) and consent timestamp.
- **Question Configuration**: Represents the structure and metadata for each of the 10 questionnaire questions. Contains question ID, label text (French), input type (select, multiselect, scale, number, text), required/optional flag, and options array (for select/multiselect types) or range constraints (for scale/number types).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Visitors can complete the entire questionnaire (10 questions + contact info) in under 3 minutes on average
- **SC-002**: Form submission success rate exceeds 95% (successful submissions / attempted submissions)
- **SC-003**: Form abandonment rate is below 30% (visitors who start but don't complete the form)
- **SC-004**: Page achieves Lighthouse Performance score > 90, Accessibility score > 95
- **SC-005**: 100% of form submissions trigger both internal alert email and visitor confirmation email when SMTP is properly configured
- **SC-006**: Zero critical accessibility violations when tested with automated tools (axe, WAVE) and screen readers (NVDA, JAWS)
- **SC-007**: Mobile conversion rate (form completions on mobile devices) matches or exceeds desktop conversion rate
- **SC-008**: Average time from form submission to internal team receiving alert email is under 30 seconds
- **SC-009**: Client-side validation catches 100% of required field violations before API submission
- **SC-010**: Page load time on 3G network is under 5 seconds

## Assumptions

1. **Email Infrastructure**: SMTP server credentials will be provided via environment variables (.env file) with keys: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_ADDRESS`, `SMTP_TO_ADDRESS` (internal team email). Email sending library (Resend or Nodemailer) will be determined during implementation.

2. **Data Persistence**: Initial implementation will POST to API route `/api/trial` which validates and processes the data. Database storage or CRM integration will be handled in the API route implementation (out of specification scope - implementation detail).

3. **Calendar Integration**: "Réserver une démo" CTA will link to an external calendar booking tool (e.g., Calendly, Cal.com) - URL to be provided during implementation. Calendar setup is out of scope for this feature.

4. **Starter Guide**: "Accéder au guide de démarrage" CTA will link to an existing guide document or page - URL to be provided during implementation. Guide creation is out of scope for this feature.

5. **Privacy Policy**: A complete privacy policy page exists at `/politique-confidentialite` or similar route that complies with GDPR/ANSSI-CI requirements. Creating the privacy policy is out of scope for this feature.

6. **Analytics Platform**: Google Analytics 4 (GA4) is already configured in the site, and `trial_started` / `trial_submitted` events will be sent to the existing GA4 property. Analytics setup is out of scope for this feature.

7. **Branding & Design System**: The page will use existing GAMR design tokens, color palette, typography, and component patterns established in the marketing site (shadcn/ui components where applicable).

8. **Response Storage**: Form responses will be stored either in a database or forwarded to a CRM via webhook - the specific integration method will be determined during implementation based on existing infrastructure.

9. **Multi-language Support**: This feature is French-only. Multi-language support (English, etc.) is out of scope for this iteration.

10. **Trial Activation**: The actual provisioning and activation of trial accounts in the GAMR platform is out of scope. This feature only captures the trial request; account creation is handled by a separate onboarding system or manual process.

11. **Spam Protection**: Form submissions will use honeypot fields and/or rate limiting to prevent spam, consistent with existing site protection mechanisms. CAPTCHA is not required unless spam becomes an issue post-launch.

12. **Error Recovery**: If email sending fails, the form submission still succeeds and displays the success screen to the user. Failed emails are logged for administrative review and manual follow-up.

## Out of Scope

- Integration with specific CRM platforms (Salesforce, HubSpot, etc.) - handled separately
- Automated trial account provisioning in GAMR platform - separate system
- Custom email template design - standard transactional email format is sufficient
- A/B testing different question orders or wording - fixed specification
- Real-time chat/support widget integration on the trial page
- Video tutorials or embedded demos explaining GAMR features
- Integration with payment processing (trial is free, no payment needed)
- Custom domain for trial subdomain (e.g., trial.gamr.com)
- Advanced analytics (heatmaps, session recording, funnel analysis)
- Automated demo scheduling based on questionnaire responses - manual scheduling via link
- Mobile app version of the trial request form
- Offline form completion support (PWA offline mode)
- Translation management system integration - French-only hardcoded content

## Dependencies

- Existing GAMR marketing site infrastructure (Next.js 15, App Router, React, TypeScript)
- shadcn/ui component library (for form controls, buttons, progress indicators)
- Zod validation library (for schema definition and validation)
- SMTP server access with credentials (for email sending)
- Email sending library (Resend or Nodemailer - to be selected during implementation)
- Existing design system and Tailwind configuration
- Google Analytics 4 configuration (for event tracking)
- Privacy policy page at documented URL
- External calendar booking tool (for demo scheduling CTA)
- Starter guide document or page (for guide access CTA)

## Risks & Mitigation

### Risk 1: High Form Abandonment Rate

**Likelihood**: Medium | **Impact**: High  
**Mitigation**: Implement autosave of form progress to browser localStorage, reduce cognitive load with progress indicators, ensure mobile UX is optimized, minimize required fields where possible.

### Risk 2: SMTP Configuration Errors Leading to Email Delivery Failures

**Likelihood**: Medium | **Impact**: Medium  
**Mitigation**: Validate SMTP configuration on deployment, implement robust error logging, ensure form submission succeeds even if email fails, provide admin dashboard to view failed email attempts.

### Risk 3: Spam Submissions

**Likelihood**: Medium | **Impact**: Low  
**Mitigation**: Implement honeypot fields, rate limiting per IP address, basic email domain validation (reject disposable email providers if needed), monitor submission patterns for anomalies.

### Risk 4: Mobile Conversion Rate Lower Than Desktop

**Likelihood**: Medium | **Impact**: High  
**Mitigation**: Mobile-first design approach, test on multiple device sizes, optimize form controls for touch interaction, reduce typing where possible (use selects over text inputs).

### Risk 5: Lengthy Questionnaire Discourages Completion

**Likelihood**: Medium | **Impact**: High  
**Mitigation**: Clearly communicate "2 minutes" completion time upfront, use progress bar to show advancement, allow saving and resuming later (if implemented), consider reducing to 8 questions if conversion data shows issues.

### Risk 6: Accessibility Issues Blocking Screen Reader Users

**Likelihood**: Low | **Impact**: High  
**Mitigation**: Implement WCAG 2.1 AA standards from the start, test with screen readers (NVDA, JAWS) before launch, use semantic HTML and ARIA labels properly, conduct accessibility audit.

### Risk 7: API Route Performance Degradation Under High Load

**Likelihood**: Low | **Impact**: Medium  
**Mitigation**: Implement rate limiting, use asynchronous email sending (queue-based), optimize database queries if persistence is implemented, monitor API response times.

## Notes

- This specification focuses on the user experience and business requirements for the trial request page. Implementation details (specific libraries, API structure, database schema) are intentionally excluded and will be determined during the planning and implementation phases.
- The 10-question limit is a hard constraint to keep completion time under 3 minutes. Any additional qualification questions should be handled post-submission during the demo call or onboarding process.
- Email template design is not specified - standard transactional format with GAMR branding is sufficient. Rich HTML templates can be added later if needed.
- Form state persistence (localStorage) is mentioned in risk mitigation but not specified as a requirement. This can be added as an enhancement if initial conversion data shows high abandonment rates.
- The specification assumes the GAMR marketing site is already live with existing pages. This trial page will be added to the existing site structure with appropriate navigation links from pricing page, homepage CTAs, etc.
