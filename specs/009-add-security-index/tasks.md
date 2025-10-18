# Tasks: Security Index Menu

**Input**: Design documents from `/specs/009-add-security-index/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included as this is a static informational page that needs validation of content display and navigation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- Paths follow Next.js App Router structure as defined in plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create directory structure for Security Index feature
- [ ] T002 [P] Create constants directory in `src/lib/constants/`
- [ ] T003 [P] Create components directory in `src/components/indice-securite/`
- [ ] T004 [P] Create tests directory structure in `tests/e2e/` and `tests/unit/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Create static content constants file in `src/lib/constants/security-index.ts`
- [ ] T006 [P] Define TypeScript interfaces for SecurityIndexPage, ScoreIndicator, ProcessStep, MethodologySection in `src/lib/types/security-index.ts`
- [ ] T007 [P] Create page route structure in `src/app/indice-securite/`
- [ ] T008 Setup SEO metadata structure for the Security Index page

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Security Index Explanation (Priority: P1) 🎯 MVP

**Goal**: Users can access a dedicated "Security Index" menu to understand how the GAMR methodology calculates security scores

**Independent Test**: Navigate to the Security Index menu and verify users can access and read the methodology explanation

### Tests for User Story 1

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US1] Unit test for SecurityIndexPage component rendering in `tests/unit/security-index.test.ts`
- [ ] T010 [P] [US1] E2E test for navigation to Security Index page in `tests/e2e/security-index.spec.ts`

### Implementation for User Story 1

- [ ] T011 [US1] Create page route component in `src/app/indice-securite/page.tsx`
- [ ] T012 [US1] Create main SecurityIndexPage component in `src/components/indice-securite/SecurityIndexPage.tsx`
- [ ] T013 [US1] Create MethodologySection component in `src/components/indice-securite/MethodologySection.tsx`
- [ ] T014 [US1] Update Header component to include Security Index menu item in `src/components/layout/Header.tsx`
- [ ] T015 [US1] Add SEO metadata and page title for Security Index page

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Visual Security Score Indicators (Priority: P2)

**Goal**: Users can see visual color-coded indicators that help them quickly understand what different security score ranges mean

**Independent Test**: Display the color-coded scale with sample scores in each range without requiring actual score calculations

### Tests for User Story 2

- [ ] T016 [P] [US2] Unit test for ScoreIndicator component in `tests/unit/score-indicator.test.ts`
- [ ] T017 [P] [US2] E2E test for visual indicators display in `tests/e2e/security-index.spec.ts`

### Implementation for User Story 2

- [ ] T018 [US2] Create ScoreIndicator component in `src/components/indice-securite/ScoreIndicator.tsx`
- [ ] T019 [US2] Implement color-coded visual indicators with proper accessibility contrast
- [ ] T020 [US2] Add responsive design for score indicators on mobile devices
- [ ] T021 [US2] Integrate ScoreIndicator component into SecurityIndexPage

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Methodology Overview (Priority: P3)

**Goal**: Users can read a high-level explanation of the GAMR methodology without getting overwhelmed by technical details

**Independent Test**: Present the methodology overview in a clear, readable format without requiring interaction with other system components

### Tests for User Story 3

- [ ] T022 [P] [US3] Unit test for GamrProcessSteps component in `tests/unit/gamr-process-steps.test.ts`
- [ ] T023 [P] [US3] E2E test for methodology content display in `tests/e2e/security-index.spec.ts`

### Implementation for User Story 3

- [ ] T024 [US3] Create GamrProcessSteps component in `src/components/indice-securite/GamrProcessSteps.tsx`
- [ ] T025 [US3] Implement 7-step evaluation process display with proper formatting
- [ ] T026 [US3] Add business-friendly language and remove technical jargon
- [ ] T027 [US3] Integrate GamrProcessSteps component into SecurityIndexPage
- [ ] T028 [US3] Add scoring formula explanation (Probability × Vulnerability × Impact = Risk Score)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 [P] Add accessibility improvements (ARIA labels, screen reader support)
- [ ] T030 [P] Optimize mobile responsiveness across all components
- [ ] T031 [P] Add performance optimizations (lazy loading, image optimization)
- [ ] T032 [P] Run quickstart.md validation steps
- [ ] T033 [P] Add print-friendly CSS styles for methodology content
- [ ] T034 [P] Validate color contrast ratios meet WCAG AA standards
- [ ] T035 [P] Update footer navigation to include Security Index link in `src/components/layout/Footer.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1/US2 but independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Components before integration
- Core implementation before styling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for SecurityIndexPage component rendering in tests/unit/security-index.test.ts"
Task: "E2E test for navigation to Security Index page in tests/e2e/security-index.spec.ts"

# Launch all components for User Story 1 together:
Task: "Create page route component in src/app/indice-securite/page.tsx"
Task: "Create main SecurityIndexPage component in src/components/indice-securite/SecurityIndexPage.tsx"
Task: "Create MethodologySection component in src/components/indice-securite/MethodologySection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Core navigation and methodology)
   - Developer B: User Story 2 (Visual indicators)
   - Developer C: User Story 3 (Process steps and overview)
3. Stories complete and integrate independently

---

## Task Summary

**Total Tasks**: 35 tasks
**Tasks per User Story**:
- User Story 1 (P1): 7 tasks (2 tests + 5 implementation)
- User Story 2 (P2): 6 tasks (2 tests + 4 implementation)  
- User Story 3 (P3): 7 tasks (2 tests + 5 implementation)
- Setup: 4 tasks
- Foundational: 4 tasks
- Polish: 7 tasks

**Parallel Opportunities Identified**: 15 tasks can run in parallel across different phases

**Independent Test Criteria**:
- **US1**: Navigate to Security Index menu and verify methodology explanation is accessible
- **US2**: Display color-coded scale with sample scores in each range independently
- **US3**: Present methodology overview in clear, readable format without system interaction

**Suggested MVP Scope**: User Story 1 only - provides core navigation and basic methodology explanation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
