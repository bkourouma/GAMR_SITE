# Google Analytics 4 Event Specifications

**Feature**: GAMR Marketing Website  
**Date**: 2025-10-08  
**Status**: Complete

## Overview

This document specifies all custom events and tracking for the GAMR marketing site using Google Analytics 4. Events are used for conversion tracking, error monitoring (per clarification), user engagement analysis, and spam detection.

---

## Event Categories

1. **Conversion Events**: Trial signups, demo requests
2. **Error Events**: Form failures, API errors, JavaScript errors
3. **Engagement Events**: Video plays, ROI calculator usage, CTA clicks
4. **Spam Events**: Honeypot detections
5. **Navigation Events**: Page views, section scrolls

---

## Conversion Events

### Event: `trial_signup`

**When**: User successfully submits trial signup form

**Parameters**:

```typescript
{
  event: 'trial_signup',
  deployment_type: 'cloud' | 'onpremise' | 'unsure',
  user_count: '1-10' | '11-50' | '51-200' | '200+',
  source_page: string,          // Page URL where form was submitted
  form_completion_time: number  // Seconds from first interaction to submit
}
```

**Purpose**: Track trial conversion rate (SC-002: 3-5% target), segment by deployment preference and company size

---

### Event: `demo_request`

**When**: User successfully submits demo request form

**Parameters**:

```typescript
{
  event: 'demo_request',
  industry: 'technology' | 'health' | 'finance' | 'manufacturing' | 'government' | 'other',
  deployment_type: 'cloud' | 'onpremise' | 'unsure',
  source_page: string,
  has_custom_needs: boolean,    // Whether needs field was filled
  form_completion_time: number
}
```

**Purpose**: Track demo conversion rate (SC-003: 2-3% target), identify which industries are most interested

---

### Event: `contact_form_submit`

**When**: User submits general contact form

**Parameters**:

```typescript
{
  event: 'contact_form_submit',
  source_page: string,
  message_length: number
}
```

---

## Error Events

**General Event**: `error`

**When**: Any error occurs (form validation, submission failure, API error, JavaScript exception)

**Parameters**:

```typescript
{
  event: 'error',
  error_type: 'form_validation_failed' | 'form_submission_failed' | 'api_error' | 'page_load_error' | 'javascript_error' | 'video_load_failed',
  error_message: string,        // Truncated to 100 chars, NO PII
  page_path: string,
  user_action: string,          // What user was trying to do
  error_code?: string          // HTTP status code if applicable
}
```

**Purpose**: Monitor error rates (SC-026: < 2% error rate), diagnose issues without Sentry

### Error Type Specifications

#### `form_validation_failed`

**When**: User submits form with validation errors

**Example**:

```typescript
{
  event: 'error',
  error_type: 'form_validation_failed',
  error_message: 'Email invalide: domaine personnel détecté',
  page_path: '/essai-gratuit',
  user_action: 'submit_trial_form',
  failed_fields: 'email,organization' // Comma-separated list
}
```

#### `form_submission_failed`

**When**: Form validation passed but server returned error

**Example**:

```typescript
{
  event: 'error',
  error_type: 'form_submission_failed',
  error_message: 'API returned 500',
  page_path: '/demander-demo',
  user_action: 'submit_demo_form',
  error_code: '500'
}
```

#### `javascript_error`

**When**: Uncaught JavaScript exception (window.onerror)

**Example**:

```typescript
{
  event: 'error',
  error_type: 'javascript_error',
  error_message: 'TypeError: Cannot read property of undefined',
  page_path: '/fonctionnalites',
  user_action: 'click_feature_tab'
}
```

#### `video_load_failed`

**When**: Demo video fails to load

**Example**:

```typescript
{
  event: 'error',
  error_type: 'video_load_failed',
  error_message: 'YouTube embed timeout',
  page_path: '/',
  user_action: 'play_demo_video'
}
```

---

## Spam Events

### Event: `spam_detected`

**When**: Honeypot field is filled (bot detection)

**Parameters**:

```typescript
{
  event: 'spam_detected',
  form_type: 'trial' | 'demo' | 'contact' | 'deletion',
  honeypot_field_value: string, // Truncated to 50 chars
  page_path: string,
  user_agent: string           // Browser user agent (detect bot patterns)
}
```

**Purpose**: Monitor honeypot effectiveness (SC-028: block 90%+ bots), identify bot patterns

**Note**: NO PII (email, name, phone) included in spam events.

---

## Engagement Events

### Event: `video_play`

**When**: User plays the homepage demo video

**Parameters**:

```typescript
{
  event: 'video_play',
  video_title: 'GAMR Demo - Workflow Complet',
  video_platform: 'youtube' | 'vimeo',
  page_path: string
}
```

### Event: `video_progress`

**When**: User reaches 25%, 50%, 75%, 100% of video

**Parameters**:

```typescript
{
  event: 'video_progress',
  video_title: string,
  progress_percent: 25 | 50 | 75 | 100,
  watch_time_seconds: number
}
```

**Purpose**: Measure video engagement (SC-020: 40%+ watch to 50%+)

---

### Event: `roi_calculator_use`

**When**: User interacts with ROI calculator on pricing page

**Parameters**:

```typescript
{
  event: 'roi_calculator_use',
  user_count_input: number,
  sites_count_input: number,
  audit_frequency_input: string,
  estimated_time_saved: string,      // "70%" or calculated value
  estimated_cost_saved: number,      // Calculated in EUR
  estimated_index_improvement: string // "+32 points"
}
```

**Purpose**: Measure calculator usage (SC-018: 30%+ of pricing page visitors)

---

### Event: `cta_click`

**When**: User clicks any CTA button

**Parameters**:

```typescript
{
  event: 'cta_click',
  cta_text: string,              // e.g., "Démarrer l'Essai Gratuit"
  cta_location: string,          // e.g., "header", "hero", "footer", "sticky_mobile"
  destination_page: string,      // Where CTA leads
  source_page: string           // Current page
}
```

**Purpose**: Understand which CTAs drive most conversions, optimize placement

---

### Event: `case_study_view`

**When**: User views a case study detail page

**Parameters**:

```typescript
{
  event: 'case_study_view',
  case_study_slug: string,
  industry: string,
  source: 'listing' | 'industry_page' | 'direct' | 'search'
}
```

**Purpose**: Measure case study engagement (SC-011: 10%+ conversion from case studies)

---

### Event: `feature_explore`

**When**: User clicks on a feature tab/section on features page

**Parameters**:

```typescript
{
  event: 'feature_explore',
  feature_name: string,          // e.g., "Indice de Sécurité en Temps Réel"
  feature_order: number,         // 1-7
  time_on_feature: number       // Seconds spent (if tracking)
}
```

---

### Event: `industry_page_view`

**When**: User views an industry solution page

**Parameters**:

```typescript
{
  event: 'industry_page_view',
  industry: string,              // sante, finance, technologie, etc.
  source: 'solutions_hub' | 'direct' | 'search'
}
```

**Purpose**: Identify which industries are most interested (SC-022: 25%+ conversions from solutions/cases)

---

## Navigation Events

### Event: `mobile_menu_open`

**When**: User opens hamburger menu on mobile

**Parameters**:

```typescript
{
  event: 'mobile_menu_open',
  page_path: string
}
```

### Event: `form_started`

**When**: User focuses first field in any form

**Parameters**:

```typescript
{
  event: 'form_started',
  form_type: 'trial' | 'demo' | 'contact' | 'deletion',
  page_path: string
}
```

**Purpose**: Calculate form abandonment rate (SC-004: < 10% abandonment)

### Event: `form_abandoned`

**When**: User starts form but leaves page without submitting

**Parameters**:

```typescript
{
  event: 'form_abandoned',
  form_type: string,
  last_filled_field: string,
  fields_completed: number,
  total_fields: number,
  time_on_form: number          // Seconds
}
```

---

## Page View Enhancement

**Automatic page_view events** are enhanced with custom parameters:

```typescript
{
  event: 'page_view',
  page_path: string,            // Auto by GA4
  page_title: string,           // Auto by GA4
  device_category: 'mobile' | 'tablet' | 'desktop', // Custom dimension
  user_type: 'first_visit' | 'returning', // Based on cookie
  referrer_type: 'organic' | 'direct' | 'social' | 'email' | 'paid'
}
```

---

## Implementation Notes

### Event Tracking Helper

Create `/src/lib/analytics.ts`:

```typescript
export function trackEvent(event: GAEvent): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.event, event);
  }
}

export function trackError(error: { type: ErrorType; message: string; action: string }): void {
  trackEvent({
    event: 'error',
    error_type: error.type,
    error_message: error.message.substring(0, 100), // Truncate
    page_path: window.location.pathname,
    user_action: error.action,
  });
}

export function trackConversion(type: 'trial' | 'demo', data: unknown): void {
  // Event-specific logic
}
```

### Error Boundary Integration

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    trackError({
      type: 'javascript_error',
      message: error.message,
      action: 'react_component_render',
    });
  }
}
```

### Window Error Handlers

```typescript
window.onerror = (message, source, lineno, colno, error) => {
  trackError({
    type: 'javascript_error',
    message: String(message),
    action: 'global_error',
  });
};

window.onunhandledrejection = (event) => {
  trackError({
    type: 'javascript_error',
    message: String(event.reason),
    action: 'unhandled_promise_rejection',
  });
};
```

---

## Privacy Compliance

### NO PII in Events

**Never include**:

- Email addresses
- Phone numbers
- Full names
- Organization names (for trial/demo - OK for spam_detected if truncated)
- IP addresses (GA4 anonymizes automatically)
- Exact error messages containing user input

**OK to include**:

- Page paths
- Feature names
- Industry categories (generic)
- Error types (categorical)
- Metrics (aggregated)

### GDPR Considerations

- GA4 data retention set to 14 months (configurable)
- IP anonymization enabled
- Data Processing Amendment signed with Google
- Cookie consent banner required (if using non-essential cookies)
- Privacy policy must mention GA4 usage

---

## Dashboard & Reports

### Key Metrics to Monitor

**Conversion Funnel**:

1. Page views (homepage)
2. CTA clicks (trial/demo)
3. Form started (trial/demo)
4. Form submitted (trial/demo)
5. Conversion rate by source/industry/deployment type

**Error Monitoring**:

1. Total errors by type (daily/weekly)
2. Error rate as % of sessions
3. Most common error messages
4. Pages with highest error rates

**Engagement**:

1. Video play rate and completion rate
2. ROI calculator usage rate
3. Case study view-to-conversion
4. Average session duration
5. Bounce rate by landing page

**Spam Detection**:

1. Spam events by form type
2. Honeypot effectiveness rate
3. Spam vs legitimate submission ratio

---

**Status**: Analytics specification complete - Ready for implementation
