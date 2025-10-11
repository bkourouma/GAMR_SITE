# Feature Specification: Page Tarifs - GAMR Pricing

**Feature Branch**: `005-g-n-re`  
**Created**: 2025-10-09  
**Status**: Draft  
**Input**: User description: "Génère le contenu et la structure HTML/MDX pour la page tarifs avec grille de prix Cloud/On-Premise, comparatif, calculateur ROI et FAQ"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Compare Cloud and On-Premise Pricing (Priority: P1)

A decision-maker needs to understand the cost differences between Cloud subscription and On-Premise licensing to make an informed purchasing decision aligned with their organization's governance model and budget constraints.

**Why this priority**: This is the core value proposition of the pricing page. Without the ability to compare the two deployment models, users cannot make an informed decision. This represents the minimum viable product for the pricing page.

**Independent Test**: Can be fully tested by navigating to /tarifs, viewing both Cloud and On-Premise pricing sections, and verifying all prices, features, and key differentiators are displayed. Delivers immediate value by answering "How much does GAMR cost?"

**Acceptance Scenarios**:

1. **Given** a visitor lands on /tarifs, **When** they view the page, **Then** they see a clear hero section explaining "Simple and transparent pricing" with Cloud and On-Premise options
2. **Given** a user wants to see Cloud pricing, **When** they select the Cloud toggle, **Then** they see 3 standard plans (Starter, Pro, Business) plus Enterprise with clear pricing in FCFA
3. **Given** a user wants to see On-Premise pricing, **When** they select the On-Premise toggle, **Then** they see perpetual license information with maintenance costs (20% annually)
4. **Given** a user wants to compare deployment models, **When** they view the comparison table, **Then** they see key differences in updates, security, time-to-value, CAPEX/OPEX, SLA, and customization

---

### User Story 2 - Understand Annual vs Monthly Pricing (Priority: P1)

A budget-conscious decision-maker wants to see the cost savings of annual commitment versus monthly billing to optimize their procurement planning.

**Why this priority**: Pricing flexibility is essential for different organizational budget cycles. Annual discount (15%) is a key conversion lever. This is independently valuable and can be tested without other features.

**Independent Test**: Can be tested by toggling between monthly and annual billing periods and verifying the 15% discount is correctly applied and displayed in FCFA across all Cloud plans.

**Acceptance Scenarios**:

1. **Given** a user is viewing Cloud pricing, **When** they select the "Mensuel" toggle, **Then** all Cloud plans display monthly pricing in FCFA
2. **Given** a user is viewing monthly pricing, **When** they switch to "Annuel" toggle, **Then** all Cloud plans display annual pricing with a visible 15% savings indicator
3. **Given** a user switches between monthly and annual, **When** they view the Enterprise plan, **Then** the plan still shows "Contact us" as it's custom pricing
4. **Given** annual pricing is displayed, **When** a user calculates total annual cost, **Then** the savings compared to 12 monthly payments equals 15%

---

### User Story 3 - View Cloud Plan Details and Features (Priority: P2)

A potential customer needs to understand exactly what is included in each Cloud plan (user limits, standards, action priorities) to select the appropriate tier for their organization size and needs.

**Why this priority**: Detailed plan information enables self-service decision-making. Users must understand limits and features before committing. This builds on the basic pricing comparison (P1).

**Independent Test**: Can be tested by examining each Cloud plan card and verifying all limits, features (8-10 bullet points), and CTAs are present and accurate.

**Acceptance Scenarios**:

1. **Given** a user views the Starter plan, **When** they read the plan details, **Then** they see: 100,000 FCFA/month, 1 user, 1 standard, 5 action priorities/year, and 8-10 included features
2. **Given** a user views the Pro plan, **When** they read the plan details, **Then** they see: 250,000 FCFA/month, 5 users, 3 standards, 10 action priorities/year, and 8-10 included features
3. **Given** a user views the Business plan, **When** they read the plan details, **Then** they see: 500,000 FCFA/month, 25 users, 10 standards, 25 action priorities/year, and 8-10 included features
4. **Given** a user views the Enterprise plan, **When** they read the plan details, **Then** they see "Custom pricing" with customizable limits and a CTA to "Contact expert"
5. **Given** a user wants to try a plan, **When** they click the plan's CTA button, **Then** they are directed to appropriate action (trial signup for standard plans, contact form for Enterprise)

---

### User Story 4 - Explore Add-on Options (Priority: P2)

An enterprise customer needs to understand available premium features (AI, SSO, connectors, premium support, training) and their costs to budget for enhanced capabilities beyond base plans.

**Why this priority**: Add-ons represent upsell opportunities and help users understand total cost of ownership. This is independent from base pricing and can be tested separately.

**Independent Test**: Can be tested by viewing the add-ons section and verifying all available options are clearly listed with descriptions and pricing indicators.

**Acceptance Scenarios**:

1. **Given** a user views the add-ons section, **When** they scroll through available options, **Then** they see: Advanced AI (report generation, natural language queries), SSO/LDAP/AD integration, ERP/CRM/Data Warehouse connectors, 24/7 Premium Support, and Training & skill transfer
2. **Given** a user wants to understand an add-on, **When** they read the add-on description, **Then** they see clear benefits and a "Contact us" CTA (no direct pricing displayed)
3. **Given** a user wants an add-on, **When** they click the add-on's "Contact us" CTA, **Then** they are directed to contact/demo request form to discuss pricing and requirements

---

### User Story 5 - Calculate ROI (Priority: P3)

A CFO or decision-maker wants to estimate return on investment by inputting their organization's parameters (number of users, incidents avoided, time saved) to justify the purchase to stakeholders.

**Why this priority**: ROI calculator builds confidence and provides justification for purchase. It's a value-add feature but not critical for basic pricing information. Can be implemented and tested independently.

**Independent Test**: Can be tested by entering sample parameters (users, incidents avoided, time saved) and verifying the calculator displays monthly/annual ROI and break-even point.

**Acceptance Scenarios**:

1. **Given** a user accesses the ROI calculator, **When** they view the calculator form, **Then** they see input fields for: number of users, incidents avoided per month, time saved per user per week
2. **Given** a user enters ROI parameters, **When** they input values (e.g., 10 users, 5 incidents/month, 2 hours/user/week), **Then** the calculator displays estimated monthly ROI, annual ROI, and break-even point in months
3. **Given** a user changes ROI parameters, **When** they update any input value, **Then** the ROI calculations update in real-time without page reload
4. **Given** the calculator shows results, **When** a user views the output, **Then** results are formatted in FCFA with clear labels and explanatory text

---

### User Story 6 - Get Questions Answered via FAQ (Priority: P3)

A prospect has common questions about security, hosting, user limits, free trial, payment methods, commitments, support, and compliance that need answering before purchase decision.

**Why this priority**: FAQ reduces friction and support burden but isn't critical for basic pricing display. Users can also contact support directly. This enhances but doesn't block the core pricing experience.

**Independent Test**: Can be tested by reviewing the FAQ section and verifying 6-8 key questions are answered clearly and comprehensively.

**Acceptance Scenarios**:

1. **Given** a user has security concerns, **When** they view the FAQ, **Then** they find answers about data hosting, security measures, and compliance (ISO, ANSSI-CI, RGPD)
2. **Given** a user wants to try before buying, **When** they view the FAQ, **Then** they find information about the 30-day free trial, no credit card requirements, and trial limitations if any
3. **Given** a user is concerned about commitment, **When** they view the FAQ, **Then** they find information about contract terms, cancellation policy, and data portability
4. **Given** a user has technical questions, **When** they view the FAQ, **Then** they find answers about user limits, SSO integration, payment methods accepted, and support availability
5. **Given** a user searches for specific information, **When** they scan FAQ headings, **Then** questions are organized logically and easy to scan (accordion or expandable format)

---

### User Story 7 - Access Free Trial and Demo CTAs (Priority: P1)

A qualified lead wants to take action after reviewing pricing by either starting a 30-day free trial or requesting a personalized demo to experience GAMR before committing.

**Why this priority**: CTAs are the conversion points that turn visitors into leads. Without clear CTAs throughout the page, the pricing page fails its primary business objective. This is critical for P1.

**Independent Test**: Can be tested by verifying CTA buttons appear in hero section, plan cards, and final CTA section, and that clicking them leads to appropriate destinations (trial signup or demo request form).

**Acceptance Scenarios**:

1. **Given** a user lands on the pricing page, **When** they view the hero section, **Then** they see two prominent CTAs: "Essai gratuit 30 jours" and "Demander une démo"
2. **Given** a user clicks "Essai gratuit 30 jours", **When** the button is activated, **Then** they are directed to trial registration flow
3. **Given** a user clicks "Demander une démo", **When** the button is activated, **Then** they are directed to demo request form
4. **Given** a user scrolls to the bottom, **When** they reach the final CTA section, **Then** they see repeated CTAs for trial and demo to capture conversion intent
5. **Given** a user views a plan card, **When** they see the plan CTA, **Then** Starter/Pro/Business show "Essayer" while Enterprise shows "Parler à un expert"

---

### Edge Cases

- What happens when a user's browser doesn't support JavaScript and the monthly/annual toggle fails?
- How does the page handle display on very small mobile screens (< 320px width) with complex pricing tables?
- What happens if the ROI calculator receives extreme values (e.g., 10,000 users, 1000 incidents/month)?
- How does the system handle users switching between Cloud and On-Premise toggles rapidly?
- What happens when currency formatting fails or locale detection is incorrect?
- How does the page perform when users have slow internet connections (< 3G)?
- What happens if FAQ accordion components fail to expand/collapse?
- How does the comparison table render on narrow tablets in portrait mode?

## Requirements _(mandatory)_

### Functional Requirements

#### Page Structure & Navigation

- **FR-001**: System MUST display a pricing page accessible at /tarifs route
- **FR-002**: Page MUST include a hero section with title "Des tarifs simples et transparents" and subtitle explaining Cloud vs On-Premise choice
- **FR-003**: Hero section MUST display two CTAs: "Essai gratuit 30 jours" (primary) and "Demander une démo" (secondary)
- **FR-004**: Page MUST display final CTA section at bottom with repeated trial and demo CTAs

#### Pricing Model Toggles

- **FR-005**: System MUST provide a toggle to switch between Cloud and On-Premise deployment models
- **FR-006**: System MUST provide a toggle to switch between monthly ("Mensuel") and annual ("Annuel") billing periods for Cloud plans
- **FR-007**: Annual pricing MUST display a 15% discount compared to monthly pricing (calculated as: monthly × 12 × 0.85)
- **FR-008**: All pricing MUST be displayed in FCFA (CFA Francs) with proper formatting using es-CI locale standards

#### Cloud Pricing Plans

- **FR-009**: System MUST display four Cloud plan tiers: Starter, Pro, Business, and Enterprise
- **FR-010**: Starter plan MUST display: 100,000 FCFA/month, 1 user limit, 1 standard limit, 5 action priorities per year, and 8-10 feature bullet points
- **FR-011**: Pro plan MUST display: 250,000 FCFA/month, 5 user limit, 3 standards limit, 10 action priorities per year, and 8-10 feature bullet points
- **FR-012**: Business plan MUST display: 500,000 FCFA/month, 25 user limit, 10 standards limit, 25 action priorities per year, and 8-10 feature bullet points
- **FR-013**: Enterprise plan MUST display "Custom pricing" message, indicate customizable limits, and show "Parler à un expert" CTA
- **FR-014**: Each Cloud plan card MUST display price, limits, feature list (8-10 bullet points), and action CTA button
- **FR-015**: Standard plan CTAs (Starter, Pro, Business) MUST link to trial signup; Enterprise CTA MUST link to contact/demo form

#### On-Premise Pricing

- **FR-016**: On-Premise section MUST display perpetual license information with indicative pricing
- **FR-017**: On-Premise section MUST indicate annual maintenance and support cost equals 20% of license price
- **FR-018**: On-Premise section MUST list additional services: deployment, training, and support packages with "package" pricing model
- **FR-019**: On-Premise section MUST include a summary table showing included vs excluded items

#### Add-ons

- **FR-020**: System MUST display an add-ons/options section listing premium features available for both Cloud and On-Premise
- **FR-021**: Add-ons section MUST include: Advanced AI (report generation, natural language querying), SSO/LDAP/Active Directory integration, ERP/CRM/Data Warehouse connectors, 24/7 Premium Support, Training & skill transfer programs
- **FR-022**: Each add-on MUST display description and clear benefits with "Contact us" CTA to encourage qualified lead capture and allow for custom pricing negotiations

#### Cloud vs On-Premise Comparison

- **FR-023**: System MUST display a comparison table contrasting Cloud and On-Premise deployment models
- **FR-024**: Comparison table MUST include these dimensions: Updates/maintenance, Security & compliance, Time-to-value, CAPEX vs OPEX, SLA commitments, Customization capabilities
- **FR-025**: Comparison table MUST be responsive and readable on mobile devices (collapsible or horizontal scroll)

#### ROI Calculator

- **FR-026**: System MUST provide an interactive ROI calculator with three input parameters: number of users, incidents avoided per month, time saved per user per week
- **FR-027**: ROI calculator MUST display real-time calculated outputs: estimated monthly ROI in FCFA, estimated annual ROI in FCFA, break-even point in months
- **FR-028**: ROI calculator MUST update calculations immediately when any input parameter changes (client-side calculation)
- **FR-029**: ROI calculator MUST format all monetary outputs in FCFA with proper thousand separators

#### FAQ Section

- **FR-030**: System MUST display a FAQ section with 6-8 commonly asked questions
- **FR-031**: FAQ MUST address these topics: Security & hosting, Data portability/reversibility, User limits, Free trial terms, Accepted payment methods, Contract commitments, Support availability, Compliance (ISO, ANSSI-CI, RGPD)
- **FR-032**: FAQ MUST use an accordion or expandable format for easy scanning and progressive disclosure

#### Content & Tone

- **FR-033**: All content MUST be written in French with professional, clear, benefit-oriented tone
- **FR-034**: Pricing information MUST be transparent with no hidden costs or fees
- **FR-035**: Feature descriptions MUST focus on business benefits rather than technical implementation details

### Accessibility Requirements (WCAG 2.1 AA)

- **A11Y-001**: All pricing plan cards MUST be keyboard navigable (Tab, Enter, Esc)
- **A11Y-002**: Toggle switches (Cloud/On-Prem, Monthly/Annual) MUST be keyboard accessible and have proper ARIA labels
- **A11Y-003**: Pricing tables MUST have proper table semantics or ARIA roles for screen reader interpretation
- **A11Y-004**: All CTAs (buttons/links) MUST have descriptive accessible names indicating their purpose
- **A11Y-005**: Color contrast between text and backgrounds MUST meet 4.5:1 ratio minimum throughout pricing page
- **A11Y-006**: Focus indicators MUST be clearly visible on all interactive elements (toggles, buttons, FAQ accordions, calculator inputs)
- **A11Y-007**: ROI calculator inputs MUST have associated labels and proper error messages for invalid inputs
- **A11Y-008**: FAQ accordion controls MUST indicate expanded/collapsed state to screen readers (aria-expanded)
- **A11Y-009**: Pricing amounts MUST be announced clearly by screen readers with currency context
- **A11Y-010**: Page MUST maintain logical reading order when linearized (top to bottom, left to right)

### Performance Requirements

- **PERF-001**: First Contentful Paint (FCP) MUST be < 1.5 seconds on 3G connections
- **PERF-002**: Time to Interactive (TTI) MUST be < 3 seconds on 3G connections
- **PERF-003**: Cumulative Layout Shift (CLS) MUST be < 0.1 (no layout shift when prices/toggles load)
- **PERF-004**: Lighthouse Performance score MUST be > 90
- **PERF-005**: ROI calculator MUST update calculations within 50ms of input change for responsive user experience
- **PERF-006**: Pricing page MUST load and render all visible content above-the-fold within 2 seconds on 4G connections
- **PERF-007**: Interactive elements (toggles, accordions) MUST respond to user input within 100ms

### SEO Requirements

- **SEO-001**: Page MUST have unique title: "Tarifs GAMR - Abonnement Cloud et Licence On-Premise" (55 characters)
- **SEO-002**: Page MUST have unique meta description highlighting key pricing, free trial, and deployment options (150-160 characters)
- **SEO-003**: OpenGraph tags MUST be complete: og:title ("Tarifs GAMR"), og:description (pricing summary), og:image (pricing preview image), og:url (canonical /tarifs URL)
- **SEO-004**: JSON-LD structured data MUST use schema.org Product and Offer schemas for each pricing plan to enable rich snippets
- **SEO-005**: Canonical URL MUST be defined as [domain]/tarifs to prevent duplicate content issues
- **SEO-006**: Page headings MUST follow semantic hierarchy (H1 for hero title, H2 for major sections, H3 for plan names/FAQ questions)
- **SEO-007**: Page MUST include relevant keywords naturally: "tarifs GAMR", "prix cloud", "licence on-premise", "analyse des risques", "conformité" in content
- **SEO-008**: JSON-LD MUST include pricing in FCFA with proper currency code (XOF) for each plan tier

### Key Entities _(include if feature involves data)_

- **Pricing Plan**: Represents a subscription tier (Starter, Pro, Business, Enterprise) with attributes: name, deployment model (Cloud/On-Premise), billing period (monthly/annual), base price in FCFA, user limit, standards limit, action priorities limit, included features list, CTA text and destination
- **Add-on/Option**: Represents additional premium features purchasable with any plan, with attributes: name, description, category (AI, Integration, Support, Training), pricing model (per-user, flat fee, package), availability (Cloud-only, On-Premise-only, or both)
- **Comparison Dimension**: Represents a comparison point between Cloud and On-Premise, with attributes: dimension name (e.g., "Updates"), Cloud value/description, On-Premise value/description, icon/visual indicator
- **FAQ Entry**: Represents a frequently asked question with attributes: question text, answer text, category (Security, Trial, Support, Compliance), display order
- **ROI Calculation**: Represents input parameters and calculated results with attributes: number of users (input), incidents avoided per month (input), time saved per user per week (input), monthly ROI (calculated), annual ROI (calculated), break-even point in months (calculated)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can view and compare all pricing plans (Cloud and On-Premise) within 10 seconds of landing on the page
- **SC-002**: Users can understand the cost difference between monthly and annual Cloud subscriptions within 5 seconds of toggling the billing period
- **SC-003**: 90% of users can identify the appropriate pricing plan for their organization size within 2 minutes of page exploration
- **SC-004**: Users can calculate estimated ROI for their organization within 1 minute of entering parameters
- **SC-005**: Page maintains Lighthouse Performance score > 90 on both desktop and mobile devices
- **SC-006**: All interactive elements (toggles, calculator, FAQ accordions) respond to user input within 100ms
- **SC-007**: Page loads fully interactive content within 3 seconds on 3G connections (TTI < 3s)
- **SC-008**: 80% of qualified prospects who view the pricing page take action (start trial, request demo, or contact sales) within the session
- **SC-009**: FAQ section answers reduce "pricing clarification" support tickets by 40% within first month of deployment
- **SC-010**: Page achieves zero accessibility violations when tested with automated tools (axe, Lighthouse Accessibility audit)
- **SC-011**: Pricing information is indexed by search engines with rich snippets (Product schema) visible in search results within 2 weeks of publication
- **SC-012**: Mobile users can view and interact with all pricing information without horizontal scrolling on devices ≥ 375px width
