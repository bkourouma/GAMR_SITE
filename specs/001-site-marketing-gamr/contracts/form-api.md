# Form API Contracts

**Feature**: GAMR Marketing Website  
**Date**: 2025-10-08  
**Status**: Complete

## Overview

This document specifies the API contracts for all form submission endpoints on the GAMR marketing site. All endpoints follow RESTful conventions, use POST method, validate with Zod schemas, implement honeypot spam protection, and return consistent JSON responses.

---

## General Patterns

### Request Headers

```http
POST /api/{endpoint}
Content-Type: application/json
Accept: application/json
```

### Response Format

**Success Response** (HTTP 200):

```json
{
  "success": true,
  "message": "Human-readable success message in French"
}
```

**Validation Error Response** (HTTP 400):

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Veuillez entrer un email valide (ex: nom@entreprise.com)"
    },
    {
      "field": "organization",
      "message": "Ce champ est obligatoire"
    }
  ]
}
```

**Server Error Response** (HTTP 500):

```json
{
  "success": false,
  "message": "Erreur temporaire. Veuillez réessayer."
}
```

---

## Endpoint 1: Trial Signup

**Path**: `/api/trial-signup`  
**Method**: POST  
**Purpose**: Register new user for 30-day free trial

### Request Body

```typescript
{
  email: string; // Required, business email only
  organization: string; // Required, 2-100 chars
  deploymentType: 'cloud' | 'onpremise' | 'unsure'; // Required
  userCount: '1-10' | '11-50' | '51-200' | '200+'; // Required
  honeypot: string; // Hidden field, must be empty
}
```

### Validation Rules

- **email**: Must be valid email format AND not personal domain (gmail, yahoo, hotmail, outlook.com, etc.)
- **organization**: Length 2-100 characters
- **deploymentType**: One of the three enum values
- **userCount**: One of the four enum values
- **honeypot**: MUST be empty string (if filled, silent rejection + spam_detected event)

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Merci ! Vérifiez votre email pour activer votre essai gratuit."
}
```

### Error Responses

**400 Bad Request** (validation errors):

```json
{
  "success": false,
  "errors": [{ "field": "email", "message": "Veuillez utiliser un email professionnel" }]
}
```

**500 Internal Server Error**:

```json
{
  "success": false,
  "message": "Erreur temporaire. Veuillez réessayer ou nous contacter à contact@gamr.com"
}
```

### Side Effects

1. **Honeypot Check**: If `honeypot !== ''`, log spam_detected event to GA4 and return fake success (200) without processing
2. **Airtable Storage**: Create record in TrialSignups table with status="pending"
3. **Email Sending**: Send confirmation email via SendGrid with template:
   - **For deploymentType="cloud"**: Include activation link and quickstart guide link
   - **For deploymentType="onpremise" or "unsure"**: Include message "Nous vous contactons sous 24h" and link to Cloud vs OnPremise comparison guide
4. **GA4 Event**: Track `trial_signup` event with deployment_type and user_count parameters

### Example Request/Response

**Request**:

```http
POST /api/trial-signup
Content-Type: application/json

{
  "email": "marc.dubois@entreprise-exemple.fr",
  "organization": "Entreprise Exemple SAS",
  "deploymentType": "cloud",
  "userCount": "11-50",
  "honeypot": ""
}
```

**Response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Merci ! Vérifiez votre email pour activer votre essai gratuit."
}
```

---

## Endpoint 2: Demo Request

**Path**: `/api/demo-request`  
**Method**: POST  
**Purpose**: Request personalized demo with GAMR expert

### Request Body

```typescript
{
  firstName: string;          // Required, 2-50 chars
  lastName: string;           // Required, 2-50 chars
  email: string;              // Required, valid email
  phone: string;              // Required, digits/spaces/+/-/()
  organization: string;       // Required, 2-100 chars
  industry: 'technology' | 'health' | 'finance' | 'manufacturing' | 'government' | 'other';
  deploymentType: 'cloud' | 'onpremise' | 'unsure';
  needs?: string;             // Optional, max 500 chars
  honeypot: string;          // Hidden, must be empty
}
```

### Validation Rules

- **firstName, lastName**: 2-50 characters
- **email**: Valid format (no domain restriction for demo)
- **phone**: Regex `/^[\d\s\+\-\(\)]+$/`
- **organization**: 2-100 characters
- **industry**: Valid enum value
- **deploymentType**: Valid enum value
- **needs**: Optional, max 500 characters
- **honeypot**: Must be empty

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Merci ! Nous vous contactons sous 24h pour planifier votre démo.",
  "calendlyUrl": "https://calendly.com/gamr-demo/15min?prefill_email=..."
}
```

### Side Effects

1. **Honeypot Check**: If filled, silent rejection + spam_detected event
2. **Airtable Storage**: Create record in DemoRequests table with status="pending", store source_page from Referer header
3. **Email Sending**: Send confirmation email with demo details and Calendly booking link
4. **GA4 Event**: Track `demo_request` event with industry, deployment_type, source_page
5. **Optional Calendly Prefill**: Return calendlyUrl with pre-filled email and name

---

## Endpoint 3: Contact Form

**Path**: `/api/contact`  
**Method**: POST  
**Purpose**: General contact/inquiry form (footer or About page)

### Request Body

```typescript
{
  name: string; // Required, 2-100 chars
  email: string; // Required, valid email
  message: string; // Required, 10-1000 chars
  honeypot: string; // Hidden, must be empty
}
```

### Validation Rules

- **name**: 2-100 characters
- **email**: Valid format
- **message**: 10-1000 characters
- **honeypot**: Must be empty

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Merci pour votre message. Nous vous répondons sous 48h."
}
```

### Side Effects

1. **Honeypot Check**: If filled, silent rejection + spam_detected
2. **Airtable Storage**: Create record in Contacts table
3. **Email Sending**: Send confirmation to user + notification to contact@gamr.com
4. **GA4 Event**: Track `contact_form_submit` event

---

## Endpoint 4: Data Deletion Request

**Path**: `/api/data-deletion`  
**Method**: POST  
**Purpose**: GDPR-compliant data deletion request

### Request Body

```typescript
{
  email: string; // Required, valid email
  honeypot: string; // Hidden, must be empty
}
```

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Un email de confirmation a été envoyé à votre adresse. Veuillez cliquer sur le lien pour confirmer la suppression de vos données."
}
```

**Note**: Returns same success message whether email exists or not (security best practice - don't reveal if email is in database).

### Side Effects

1. **Honeypot Check**: If filled, silent rejection
2. **Email Lookup**: Check if email exists in TrialSignups, DemoRequests, or Contacts tables
3. **Token Generation**: Create signed token with email + timestamp + 24h expiration
4. **Airtable Storage**: Create record in DeletionRequests table with status="pending", store token
5. **Email Sending**: Send confirmation email with deletion link: `https://gamr.com/gerer-mes-donnees/confirmer?token={signed_token}`
6. **GA4 Event**: Track `data_deletion_requested` event (without email PII)

---

## Endpoint 5: Confirm Data Deletion

**Path**: `/api/data-deletion/confirm`  
**Method**: POST  
**Purpose**: Confirm and execute data deletion after email verification

### Request Body

```typescript
{
  token: string; // Required, signed token from email
}
```

### Validation

- Verify token signature (HMAC with secret key)
- Check token expiration (must be < 24h old)
- Extract email from token

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Votre demande de suppression a été confirmée. Vos données seront supprimées dans les 30 jours."
}
```

### Error Responses

**400 Bad Request** (expired token):

```json
{
  "success": false,
  "error": "Lien expiré. Veuillez soumettre une nouvelle demande de suppression."
}
```

**400 Bad Request** (invalid token):

```json
{
  "success": false,
  "error": "Lien invalide. Veuillez vérifier le lien dans votre email."
}
```

### Side Effects

1. **Token Validation**: Verify signature + expiration
2. **Data Anonymization**: Update all records with this email:
   - Set email → "deleted-{randomId}@deleted.gamr.com"
   - Set name/organization → "Utilisateur supprimé"
   - Keep timestamps for audit
   - Set status → "deleted"
3. **Airtable Update**: Mark DeletionRequest status="deleted", set deletedAt timestamp
4. **Email Sending**: Send deletion confirmation email to original address
5. **GA4 Event**: Track `data_deletion_confirmed` event

**Note**: Deletion happens immediately upon confirmation, not after 30 days. The 30-day SLA in spec (FR-069) is maximum timeframe, not waiting period.

---

## Error Handling

### All Endpoints Must

- Catch all exceptions and return 500 with generic message (never expose stack traces)
- Log errors as GA4 custom events with error_type, page_path, user_action
- Validate honeypot BEFORE processing any data
- Never include PII (email, phone, names) in GA4 error events
- Return appropriate HTTP status codes (200, 400, 500)
- Include CORS headers if needed for preview domains

---

## Rate Limiting (Future Consideration)

**Not implemented in MVP** per clarification (honeypot only), but consider adding if spam exceeds 10%:

- Max 5 submissions per IP per hour
- Return 429 Too Many Requests if exceeded
- Message: "Trop de tentatives. Veuillez réessayer dans 1 heure."

---

**Status**: Form API contracts complete - Ready for implementation
