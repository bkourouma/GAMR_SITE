# Tasks: Demo Request Page

**Input**: Design documents from `/specs/008-g-n-re/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: E2E tests included for critical user paths (Playwright). Unit tests for validation and utilities.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Next.js App Router structure:

- Pages: `src/app/[route]/page.tsx`
- API routes: `src/app/api/[route]/route.ts`
- Components: `src/components/[feature]/`
- Libraries: `src/lib/[feature]/`
- Types: `src/types/`
- Tests: `tests/unit/` and `tests/e2e/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Install dependencies: `pnpm add zod react-hook-form @hookform/resolvers ics date-fns date-fns-tz resend`
- [x] T002 [P] Install dev dependencies: `pnpm add -D @types/node`
- [x] T003 Create environment variables template in `.env.local.example` (RESEND_API_KEY, DEMO_ORGANIZER_EMAIL, DEMO_ORGANIZER_NAME)
- [x] T004 Create data directory structure: `mkdir -p data && echo '{"requests":[]}' > data/demo-requests.json`
- [x] T005 [P] Add `data/` to `.gitignore`
- [x] T006 Create component directory structure: `src/components/demo/`, `src/lib/demo/`, `src/types/`
- [x] T007 [P] Create test directory structure: `tests/unit/demo/`, `tests/e2e/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Type Definitions

- [x] T008 [P] Create TypeScript types in `src/types/demo.ts` (DemoRequest, TimeSlot, Role, Sector, Standard, Goal, TeamSize, Import, Module, MeetingTool, Mode, Language, DemoRequestSuccessResponse, DemoRequestErrorResponse)

### Validation Schemas

- [x] T009 [P] Create Zod enum schemas in `src/lib/demo/schema.ts` (roleSchema, sectorSchema, standardSchema, goalSchema, teamSizeSchema, importSchema, moduleSchema, meetingToolSchema, modeSchema, languageSchema) - NOTE: durationSchema removed per user requirement
- [x] T010 [P] Create timeSlotSchema in `src/lib/demo/schema.ts` (date regex validation, time 24h format validation)
- [x] T011 Create composite schemas in `src/lib/demo/schema.ts` (contactSchema with phone mask +225 01 01 01 01 01, qualificationSchema with standardsOther field, schedulingSchema without duration, consentSchema, demoRequestSchema with standards "Autre" validation)
- [x] T012 [P] Create custom validation functions in `src/lib/demo/schema.ts` (validateFutureTimeSlot with timezone, validateAllTimeSlots)

### Static Data Configuration

- [x] T013 [P] Create static options data in `src/lib/demo/options.ts` (roles, sectors, standards, goals, teamSizes, imports, modules, meetingTools, languages, commonTimezones arrays with value/label pairs)

### Utility Libraries

- [x] T014 [P] Create ICS generator utility in `src/lib/demo/ics-generator.ts` (generateICS function using ics library, handles timezone, DEFAULT_DEMO_DURATION=45min, organizer, attendee)
- [x] T015 [P] Create calendar links generator in `src/lib/demo/calendar-links.ts` (generateGoogleCalendarURL, generateOutlookURL functions)
- [x] T016 [P] Create email service abstraction in `src/lib/demo/mailer.ts` (sendDemoConfirmation function using Resend API)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Prospect Requests Personalized Demo (Priority: P1) 🎯 MVP

**Goal**: Enable prospects to submit complete demo requests with contact info, qualification details, time slots, and consent. Form validates input, submits to API, sends email confirmation, stores request, and shows confirmation screen.

**Independent Test**: Visit /demander-demo, fill out all required fields (name, organization, email, sector, standards, goals, team size, mode, modules, 3 time slots, GDPR consent), submit form, verify confirmation screen appears, check that email is sent, confirm data is stored in JSON file.

### Page Structure Components

- [x] T017 [P] [US1] Create hero section component in `src/components/demo/DemoHeroSection.tsx` (title, subtitle, 3 key points)
- [x] T018 [P] [US1] Create value proposition component in `src/components/demo/DemoValueProposition.tsx` (demo coverage description, sector adaptation)

### Form Field Components

- [x] T019 [P] [US1] Create contact fields component in `src/components/demo/ContactFields.tsx` (fullName, organization, email with +225 format, phone, role inputs with React Hook Form register)
- [x] T020 [P] [US1] Create qualification fields component in `src/components/demo/QualificationFields.tsx` (sector select, standards multiselect WITH "Préciser" field when "Autre" selected, goals multiselect, teamSize select, context textarea, mode radio, imports multiselect, modules multiselect)
- [x] T021 [P] [US1] Create time slot picker component in `src/components/demo/TimeSlotPicker.tsx` (native date input, native time input, combines into TimeSlot object)
- [x] T022 [US1] Create scheduling fields component in `src/components/demo/SchedulingFields.tsx` (timezone select, NO DURATION FIELD per user requirement, 3 TimeSlotPicker instances, meetingTool select, language select) - depends on T021
- [x] T023 [P] [US1] Create consent fields component in `src/components/demo/ConsentFields.tsx` (GDPR consent checkbox required, marketing opt-in checkbox optional, honeypot field hidden)

### Main Form Component

- [x] T024 [US1] Create main form component in `src/components/demo/DemoRequestForm.tsx` (React Hook Form setup with Zod resolver, integrates all field components, handles submission, error display, loading state) - depends on T019-T023

### Confirmation Component

- [x] T025 [P] [US1] Create confirmation screen component in `src/components/demo/DemoConfirmation.tsx` (success message, summary display, calendar integration buttons)

### Page Implementation

- [x] T026 [US1] Create demo request page in `src/app/demander-demo/page.tsx` (assembles DemoHeroSection, DemoValueProposition, DemoRequestForm, shows DemoConfirmation on success, includes SEO metadata) - depends on T017, T018, T024, T025

### API Route Implementation

- [x] T027 [US1] Create API route in `src/app/api/demo/route.ts` - POST handler with all features:
  - Parse and validate request body with demoRequestSchema
  - Check honeypot field (reject if filled)
  - Validate time slots are in future with validateAllTimeSlots
  - Generate unique ID (timestamp)
  - Send email with sendDemoConfirmation (stub for now, will be enhanced in US2)
  - Persist to data/demo-requests.json (append to requests array)
  - Return success response with confirmation data
  - Handle errors with appropriate status codes and messages

### E2E Tests for User Story 1

- [ ] T028 [US1] Create E2E test in `tests/e2e/demo-request.spec.ts` (OPTIONAL - Manual testing recommended first)

### Unit Tests for User Story 1

- [ ] T029 [P] [US1] Create validation schema tests in `tests/unit/demo/schema.test.ts` (OPTIONAL)
- [ ] T030 [P] [US1] Create email service test in `tests/unit/demo/mailer.test.ts` (OPTIONAL)

**Checkpoint**: At this point, User Story 1 should be fully functional - prospects can submit demo requests, receive email confirmations, and see confirmation screen. This is the MVP! ✅

---

## Phase 4: User Story 2 - Prospect Adds Demo to Calendar (Priority: P2)

**Goal**: After submitting demo request, prospects can download .ics file or add event to Google Calendar/Outlook with one click.

**Independent Test**: Complete demo request (US1), verify confirmation screen shows three calendar options: "Download .ics", "Add to Google Calendar", "Add to Outlook". Click each button, verify .ics file downloads correctly, Google Calendar link opens with pre-filled event, Outlook link opens with pre-filled event.

### Calendar Generation Implementation

- [ ] T031 [US2] Enhance API route in `src/app/api/demo/route.ts`:
  - Generate .ics file using generateICS function for slot1
  - Generate Google Calendar URL using generateGoogleCalendarURL
  - Generate Outlook URL using generateOutlookURL
  - Attach .ics content to email via Resend
  - Return calendar links in success response (icsDownload as base64 data URL, googleCalendar URL, outlook URL)

### Confirmation Screen Enhancement

- [ ] T032 [US2] Update confirmation component in `src/components/demo/DemoConfirmation.tsx`:
  - Replace calendar button placeholders with functional buttons
  - "Download .ics" button triggers blob download from base64
  - "Add to Google Calendar" button opens googleCalendar URL in new tab
  - "Add to Outlook" button opens outlook URL in new tab
  - Add icons and styling for calendar buttons

### Unit Tests for User Story 2

- [ ] T033 [P] [US2] Create ICS generator tests in `tests/unit/demo/ics-generator.test.ts` (test .ics generation with correct event details, timezone handling, duration calculation)
- [ ] T034 [P] [US2] Create calendar links tests in `tests/unit/demo/calendar-links.test.ts` (test Google Calendar URL format, Outlook URL format, parameter encoding)

### E2E Tests for User Story 2

- [ ] T035 [US2] Add calendar integration tests to `tests/e2e/demo-request.spec.ts`:
  - Test: After successful submission, verify .ics download button present and functional
  - Test: Verify Google Calendar button opens correct URL with encoded parameters
  - Test: Verify Outlook button opens correct URL with encoded parameters

**Checkpoint**: At this point, User Stories 1 AND 2 work independently - prospects can request demos AND add them to calendars ✅

---

## Phase 5: User Story 4 - Prospect Opts In for Marketing Content (Priority: P3)

**Goal**: Prospects can optionally opt-in to receive marketing communications, tracked separately from required GDPR consent.

**Independent Test**: On demo request form, verify marketing opt-in checkbox is visible, clearly marked as optional, and separate from GDPR consent. Submit with checkbox unchecked, verify marketingOptIn is false in stored data. Submit with checkbox checked, verify marketingOptIn is true in stored data.

### Implementation Notes

- [ ] T036 [US4] **VALIDATION CHECK**: Verify ConsentFields component (`src/components/demo/ConsentFields.tsx`) already includes marketing opt-in checkbox (created in T023). If not, add it now:
  - Add marketingOptIn checkbox labeled "Recevoir des ressources produit et cas d'usage"
  - Mark as optional visually
  - Ensure separate styling from required GDPR consent
  - Default unchecked (false)

- [ ] T037 [US4] **VALIDATION CHECK**: Verify consentSchema (`src/lib/demo/schema.ts`) includes marketingOptIn field (created in T011). If not, add it now:
  - Add `marketingOptIn: z.boolean().optional().default(false)`

- [ ] T038 [US4] **VALIDATION CHECK**: Verify API route (`src/app/api/demo/route.ts`) persists marketingOptIn value (created in T027). Schema should already handle this automatically.

### Tests for User Story 4

- [ ] T039 [US4] Add marketing opt-in tests to `tests/e2e/demo-request.spec.ts`:
  - Test: Verify marketing opt-in checkbox is present and optional
  - Test: Submit with opt-in unchecked, verify data has marketingOptIn: false
  - Test: Submit with opt-in checked, verify data has marketingOptIn: true
  - Test: Verify form still submits successfully with opt-in unchecked

**Checkpoint**: All user stories complete - prospects can request demos, add to calendars, and opt-in to marketing ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T040 [P] Add loading spinners and disabled states during form submission in `src/components/demo/DemoRequestForm.tsx`
- [ ] T041 [P] Implement scroll-to-error functionality on validation failure in `src/components/demo/DemoRequestForm.tsx`
- [ ] T042 [P] Add ARIA live regions for error announcements in `src/components/demo/DemoRequestForm.tsx`
- [ ] T043 [P] Add French error message localization for Zod schemas in `src/lib/demo/schema.ts`
- [ ] T044 [P] Add form field descriptions and help text for complex fields (timezone, time slots, standards)
- [ ] T045 [P] Implement form state persistence (localStorage) so users don't lose data on accidental navigation
- [ ] T046 Code review and refactoring pass (extract duplicated logic, improve naming, add comments)
- [ ] T047 [P] Update quickstart.md with any deviations from planned implementation

---

## Phase 7: Accessibility & Performance Validation (NON-NEGOTIABLE)

**Purpose**: Constitution compliance verification before deployment

### Accessibility Testing (WCAG 2.1 AA)

- [ ] T048 Manual keyboard navigation testing:
  - Tab through all form fields in logical order
  - Enter key submits form
  - Esc clears focused field
  - Date picker opens with Enter/Space
  - All checkboxes/radios reachable via keyboard
  - Focus indicators clearly visible

- [ ] T049 Screen reader testing (NVDA on Windows or VoiceOver on macOS):
  - All fields have labels announced
  - Required fields announced as required
  - Error messages announced when validation fails
  - Form sections have proper headings
  - Success message announced after submission

- [ ] T050 Verify ARIA attributes:
  - aria-required on required fields
  - aria-invalid on fields with errors
  - aria-describedby linking errors to fields
  - aria-live regions for dynamic errors

- [ ] T051 Color contrast validation:
  - All text meets 4.5:1 ratio
  - Error messages meet contrast requirements
  - Disabled states distinguishable

### Performance Testing (Constitution Budgets)

- [ ] T052 Run Lighthouse audit on /demander-demo page:
  - Verify FCP < 1.5 seconds
  - Verify TTI < 3 seconds
  - Verify CLS < 0.1
  - Verify Performance score > 90
  - Verify Accessibility score > 95

- [ ] T053 Bundle size analysis:
  - Verify date-fns-tz is tree-shaken
  - Verify ics library doesn't bloat initial bundle
  - Check total JS bundle size < 200KB gzipped

- [ ] T054 Mobile performance testing:
  - Test on 3G network simulation
  - Verify form is usable on 320px viewport
  - Touch targets meet 44x44px minimum

### SEO Validation

- [ ] T055 Verify page metadata in `src/app/demander-demo/page.tsx`:
  - Title: "Demander une Démo GAMR - Démonstration Personnalisée" (< 60 chars)
  - Meta description (150-160 chars)
  - Complete OpenGraph tags (og:title, og:description, og:image, og:url)
  - JSON-LD structured data for ContactPage schema
  - Canonical URL defined

### Runtime Validation

- [ ] T056 Run `pnpm dev`, navigate to /demander-demo:
  - Page loads without console errors
  - Form submits successfully
  - Confirmation screen displays
  - Check Chrome DevTools for warnings

- [ ] T057 Run `pnpm build`:
  - Build completes without errors
  - No TypeScript errors
  - No ESLint errors

- [ ] T058 Run `pnpm type-check`:
  - Zero TypeScript errors
  - All types resolve correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 can start immediately after Foundational
  - US2 depends on US1 (enhances confirmation screen and API)
  - US4 is technically part of US1 (just validation check)
- **Polish (Phase 6)**: Depends on all user stories being complete
- **Validation (Phase 7)**: Depends on all implementation being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 completion (enhances API route and confirmation screen created in US1)
- **User Story 4 (P3)**: Technically part of US1 - just validation that components already include marketing opt-in

### Within Each User Story

**User Story 1 Flow**:

1. T017-T018: Page structure (parallel)
2. T019-T021: Form field components (parallel)
3. T022-T023: Dependent field components (require T021)
4. T024: Main form (requires T019-T023)
5. T025: Confirmation (parallel with above)
6. T026: Page assembly (requires T017, T018, T024, T025)
7. T027: API route (can be done in parallel with T017-T026)
8. T028-T030: Tests (can be done in parallel, or after implementation)

**User Story 2 Flow**:

1. T031: API enhancement (requires T027 from US1)
2. T032: Confirmation enhancement (requires T025 from US1)
3. T033-T035: Tests (parallel)

### Parallel Opportunities

- **Phase 1 Setup**: All tasks marked [P] (T001, T002, T005, T007) can run together
- **Phase 2 Foundational**: T008, T009, T010, T013, T014, T015, T016 can all run in parallel (different files)
- **US1 Page Structure**: T017, T018 parallel
- **US1 Form Fields**: T019, T020, T021, T023 parallel (different files)
- **US1 Tests**: T029, T030 parallel
- **US2 Tests**: T033, T034 parallel
- **Polish**: Most tasks (T040-T045, T047) can run in parallel

---

## Parallel Example: User Story 1 Foundation

```bash
# Launch all foundational tasks together (Phase 2):
Task T008: "Create TypeScript types in src/types/demo.ts"
Task T009: "Create Zod enum schemas in src/lib/demo/schema.ts"
Task T013: "Create static options data in src/lib/demo/options.ts"
Task T014: "Create ICS generator utility in src/lib/demo/ics-generator.ts"
Task T015: "Create calendar links generator in src/lib/demo/calendar-links.ts"
Task T016: "Create email service abstraction in src/lib/demo/mailer.ts"

# Launch all US1 form field components together:
Task T019: "Create contact fields component in src/components/demo/ContactFields.tsx"
Task T020: "Create qualification fields component in src/components/demo/QualificationFields.tsx"
Task T021: "Create time slot picker component in src/components/demo/TimeSlotPicker.tsx"
Task T023: "Create consent fields component in src/components/demo/ConsentFields.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T016) - CRITICAL BLOCKER
3. Complete Phase 3: User Story 1 (T017-T030)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Run accessibility and performance validation (Phase 7)
6. Deploy/demo if ready

**Estimated Time for MVP**: 12-16 hours

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (4-6 hours)
2. Add User Story 1 → Test independently → Deploy/Demo (MVP! 8-10 hours)
3. Add User Story 2 → Test independently → Deploy/Demo (2-3 hours)
4. Add User Story 4 → Validation only → Deploy/Demo (1 hour)
5. Polish & Validation → Production ready (3-4 hours)

**Total Estimated Time**: 18-24 hours

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (4-6 hours)
2. Once Foundational is done:
   - Developer A: US1 page components (T017-T026)
   - Developer B: US1 API route (T027)
   - Developer C: US1 tests (T028-T030)
3. US1 integrates and validates
4. Developer A: US2 implementation (T031-T032)
5. Developer B: US2 tests (T033-T035)
6. Developer C: Polish tasks (T040-T047)
7. All: Accessibility & Performance validation (T048-T058)

**Parallel Team Estimated Time**: 10-14 hours

---

## Task Summary

**Total Tasks**: 58

**By Phase**:

- Setup: 7 tasks
- Foundational: 9 tasks (BLOCKS all stories)
- User Story 1 (P1): 14 tasks (MVP)
- User Story 2 (P2): 5 tasks
- User Story 4 (P3): 4 tasks (validation only)
- Polish: 8 tasks
- Validation: 11 tasks (constitution compliance)

**By Story**:

- US1 (MVP): 14 implementation tasks + 3 tests = 17 total
- US2: 2 implementation tasks + 3 tests = 5 total
- US4: 4 validation tasks

**Parallel Opportunities**: 23 tasks marked [P] can run in parallel within their phase

**Critical Path**: Setup (7) → Foundational (9) → US1 Sequential (4) → US2 Sequential (2) = 22 sequential tasks minimum

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- US4 (marketing opt-in) is technically part of US1 - separated for product tracking but implementation is integrated
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Constitution compliance (Phase 7) is NON-NEGOTIABLE before production deployment
