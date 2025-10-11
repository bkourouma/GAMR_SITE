# Data Schema Contract: Page À Propos

**Feature**: 006-redige-la-page  
**Date**: October 9, 2025  
**Status**: Complete ✅

## Overview

This document defines the JSON schema for About page content data, useful for future CMS integration, API contracts, and content validation.

## JSON Schemas

### 1. CompanyInfo Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://gamr.fr/schemas/company-info.json",
  "title": "CompanyInfo",
  "description": "Company mission, history, and contact information",
  "type": "object",
  "required": ["mission", "story", "contact"],
  "properties": {
    "mission": {
      "type": "object",
      "required": ["headline", "tagline", "description", "foundedYear"],
      "properties": {
        "headline": {
          "type": "string",
          "minLength": 5,
          "maxLength": 100,
          "description": "Main mission headline"
        },
        "tagline": {
          "type": "string",
          "minLength": 10,
          "maxLength": 80,
          "description": "Short tagline (30-50 chars recommended)"
        },
        "description": {
          "type": "string",
          "minLength": 100,
          "maxLength": 1500,
          "description": "Full mission statement (100-300 words)"
        },
        "foundedYear": {
          "type": "integer",
          "minimum": 2000,
          "maximum": 2030,
          "description": "Year company was founded"
        }
      }
    },
    "story": {
      "type": "object",
      "required": ["intro", "sections"],
      "properties": {
        "intro": {
          "type": "string",
          "minLength": 50,
          "maxLength": 500,
          "description": "Introduction to company story"
        },
        "sections": {
          "type": "array",
          "minItems": 1,
          "maxItems": 5,
          "items": {
            "type": "object",
            "required": ["id", "title", "content"],
            "properties": {
              "id": {
                "type": "string",
                "pattern": "^[a-z0-9-]+$",
                "description": "Unique identifier (lowercase with hyphens)"
              },
              "title": {
                "type": "string",
                "minLength": 5,
                "maxLength": 100
              },
              "content": {
                "type": "string",
                "minLength": 100,
                "maxLength": 1000
              },
              "year": {
                "type": "integer",
                "minimum": 2000,
                "maximum": 2030,
                "description": "Optional year marker for timeline"
              },
              "imageUrl": {
                "type": "string",
                "format": "uri",
                "description": "Optional illustration URL"
              }
            }
          }
        }
      }
    },
    "contact": {
      "type": "object",
      "required": ["email"],
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        },
        "phone": {
          "type": "string",
          "pattern": "^\\+?[0-9\\s\\-()]+$",
          "description": "Optional phone number"
        },
        "address": {
          "type": "string",
          "description": "Optional physical address"
        }
      }
    }
  }
}
```

---

### 2. TeamMember Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://gamr.fr/schemas/team-member.json",
  "title": "TeamMember",
  "description": "Individual team member profile",
  "type": "object",
  "required": ["id", "firstName", "lastName", "role", "bio", "imageUrl", "order"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "minLength": 2,
      "description": "Unique identifier (lowercase with hyphens)"
    },
    "firstName": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "lastName": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50
    },
    "role": {
      "type": "string",
      "minLength": 3,
      "maxLength": 100,
      "description": "Job title (e.g., 'Co-fondateur & CEO')"
    },
    "bio": {
      "type": "string",
      "minLength": 50,
      "maxLength": 500,
      "description": "Short biography (~10-100 words)"
    },
    "imageUrl": {
      "type": "string",
      "pattern": "^[a-z0-9-]+\\.(jpg|png|webp)$",
      "description": "Filename only (e.g., 'john-doe.jpg')"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Optional contact email"
    },
    "linkedIn": {
      "type": "string",
      "format": "uri",
      "pattern": "^https://linkedin\\.com/",
      "description": "Optional LinkedIn profile URL"
    },
    "twitter": {
      "type": "string",
      "format": "uri",
      "pattern": "^https://(twitter\\.com|x\\.com)/",
      "description": "Optional Twitter/X profile URL"
    },
    "order": {
      "type": "integer",
      "minimum": 1,
      "description": "Display order (1-based, CEO/founders first)"
    }
  }
}
```

---

### 3. CompanyValue Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://gamr.fr/schemas/company-value.json",
  "title": "CompanyValue",
  "description": "Core company value or principle",
  "type": "object",
  "required": ["id", "name", "description", "icon", "order"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "minLength": 2
    },
    "name": {
      "type": "string",
      "minLength": 3,
      "maxLength": 50,
      "description": "Value name (e.g., 'Innovation')"
    },
    "description": {
      "type": "string",
      "minLength": 50,
      "maxLength": 500,
      "description": "Explanation (~10-100 words)"
    },
    "icon": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50,
      "description": "Lucide icon name (e.g., 'Lightbulb')",
      "enum": [
        "Lightbulb",
        "Award",
        "Users",
        "Shield",
        "Heart",
        "Target",
        "Zap",
        "TrendingUp",
        "CheckCircle",
        "Star",
        "Sparkles",
        "Compass"
      ]
    },
    "order": {
      "type": "integer",
      "minimum": 1,
      "maximum": 10,
      "description": "Display order (recommend 3-5 values total)"
    }
  }
}
```

---

### 4. AboutStat Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://gamr.fr/schemas/about-stat.json",
  "title": "AboutStat",
  "description": "Key achievement or metric for social proof",
  "type": "object",
  "required": ["id", "value", "label", "order"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "minLength": 2
    },
    "value": {
      "type": "string",
      "minLength": 1,
      "maxLength": 20,
      "description": "Display value (e.g., '150+', '5 ans', '99.9%')"
    },
    "label": {
      "type": "string",
      "minLength": 3,
      "maxLength": 100,
      "description": "Short label (e.g., 'associations clientes')"
    },
    "description": {
      "type": "string",
      "maxLength": 200,
      "description": "Optional extended explanation"
    },
    "icon": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50,
      "description": "Optional Lucide icon name"
    },
    "order": {
      "type": "integer",
      "minimum": 1,
      "maximum": 12,
      "description": "Display order (recommend 4-6 stats)"
    }
  }
}
```

---

## Complete API Response Schema

For future API endpoint `/api/about`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://gamr.fr/schemas/about-page-data.json",
  "title": "AboutPageData",
  "description": "Complete About page content",
  "type": "object",
  "required": ["company", "team", "values", "stats"],
  "properties": {
    "company": {
      "$ref": "https://gamr.fr/schemas/company-info.json"
    },
    "team": {
      "type": "array",
      "items": {
        "$ref": "https://gamr.fr/schemas/team-member.json"
      },
      "minItems": 1,
      "maxItems": 20,
      "description": "List of team members"
    },
    "values": {
      "type": "array",
      "items": {
        "$ref": "https://gamr.fr/schemas/company-value.json"
      },
      "minItems": 3,
      "maxItems": 5,
      "description": "List of company values (recommend 3-5)"
    },
    "stats": {
      "type": "array",
      "items": {
        "$ref": "https://gamr.fr/schemas/about-stat.json"
      },
      "minItems": 4,
      "maxItems": 6,
      "description": "List of achievement metrics (recommend 4-6)"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "lastUpdated": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 timestamp of last content update"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$",
          "description": "Content version (semver format)"
        }
      }
    }
  }
}
```

---

## Example API Response

```json
{
  "company": {
    "mission": {
      "headline": "Simplifier la gestion des associations sportives",
      "tagline": "La plateforme tout-en-un pour gérer votre club",
      "description": "GAMR est née d'une conviction : la gestion administrative ne devrait jamais être un frein à la passion sportive...",
      "foundedYear": 2019
    },
    "story": {
      "intro": "L'histoire de GAMR commence sur un terrain de sport...",
      "sections": [
        {
          "id": "origins",
          "title": "Les origines",
          "content": "Fondée en 2019...",
          "year": 2019
        }
      ]
    },
    "contact": {
      "email": "contact@gamr.fr",
      "phone": "+33 1 23 45 67 89",
      "address": "Paris, France"
    }
  },
  "team": [
    {
      "id": "jean-dupont",
      "firstName": "Jean",
      "lastName": "Dupont",
      "role": "Co-fondateur & CEO",
      "bio": "Ancien dirigeant d'un club de basket...",
      "imageUrl": "jean-dupont.jpg",
      "email": "jean.dupont@gamr.fr",
      "linkedIn": "https://linkedin.com/in/jean-dupont",
      "order": 1
    }
  ],
  "values": [
    {
      "id": "innovation",
      "name": "Innovation",
      "description": "Nous repoussons constamment les limites...",
      "icon": "Lightbulb",
      "order": 1
    }
  ],
  "stats": [
    {
      "id": "experience",
      "value": "5+",
      "label": "ans d'expérience",
      "description": "Depuis 2019, nous accompagnons les associations",
      "icon": "Calendar",
      "order": 1
    }
  ],
  "metadata": {
    "lastUpdated": "2025-10-09T12:00:00Z",
    "version": "1.0.0"
  }
}
```

---

## Content Validation Rules

### Character Count Validation

All text fields have character limits to ensure:

- Mobile readability
- Consistent card heights
- Performance (no excessive text)
- SEO optimization (concise meta descriptions)

**Validation Workflow**:

1. **Development**: Zod validates on import

   ```typescript
   if (process.env.NODE_ENV === 'development') {
     TeamMemberSchema.parse(member); // Throws error if invalid
   }
   ```

2. **Pre-Deployment**: CI runs type-check

   ```bash
   pnpm type-check  # Validates TypeScript types
   ```

3. **Runtime** (if using API): Zod validates responses
   ```typescript
   const data = await fetch('/api/about').then((r) => r.json());
   const validated = AboutPageDataSchema.parse(data); // Throws if invalid
   ```

---

## URL Pattern Validation

### Team Member Image URLs

**Pattern**: `^[a-z0-9-]+\.(jpg|png|webp)$`

**Valid Examples**:

- ✅ `jean-dupont.jpg`
- ✅ `marie-martin-cto.webp`
- ✅ `john-doe-2024.png`

**Invalid Examples**:

- ❌ `Jean-Dupont.jpg` (uppercase)
- ❌ `jean_dupont.jpg` (underscore)
- ❌ `jean-dupont` (missing extension)
- ❌ `/images/team/jean-dupont.jpg` (includes path)

**Rationale**: Filename only (path prefixed in component)

---

### Social Media URLs

**LinkedIn Pattern**: `^https://linkedin\.com/`

**Valid Examples**:

- ✅ `https://linkedin.com/in/jean-dupont`
- ✅ `https://linkedin.com/company/gamr`

**Invalid Examples**:

- ❌ `http://linkedin.com/...` (must use HTTPS)
- ❌ `linkedin.com/in/...` (missing protocol)
- ❌ `https://www.linkedin.com/...` (www not required but allowed)

**Twitter Pattern**: `^https://(twitter\.com|x\.com)/`

**Valid Examples**:

- ✅ `https://twitter.com/gamr`
- ✅ `https://x.com/gamr`

---

## Migration from Static Data to API

When ready to move content to API/CMS:

### Step 1: Create API Endpoint

```typescript
// src/app/api/about/route.ts
import { NextResponse } from 'next/server';
import { COMPANY_INFO, TEAM_MEMBERS, COMPANY_VALUES, ABOUT_STATS } from '@/lib/about-data';

export async function GET() {
  const data = {
    company: COMPANY_INFO,
    team: TEAM_MEMBERS,
    values: COMPANY_VALUES,
    stats: ABOUT_STATS,
    metadata: {
      lastUpdated: new Date().toISOString(),
      version: '1.0.0',
    },
  };

  return NextResponse.json(data);
}
```

### Step 2: Update Page to Fetch Data

```typescript
// src/app/a-propos/page.tsx
import { AboutPageDataSchema } from '@/lib/about-data';

async function getAboutData() {
  const res = await fetch('/api/about', { next: { revalidate: 3600 } });
  const data = await res.json();
  return AboutPageDataSchema.parse(data); // Validate with Zod
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  return (
    <main>
      <AboutHero mission={aboutData.company.mission} />
      <TeamSection members={aboutData.team} />
      {/* ... */}
    </main>
  );
}
```

### Step 3: Add Caching Strategy

```typescript
// Static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

// Or dynamic with cache
const data = await fetch('/api/about', {
  next: { revalidate: 3600 },
});
```

---

## Content Update Workflow

### Current (Static Data)

1. Edit `src/lib/about-data.ts`
2. Run `pnpm dev` (validates with Zod)
3. Fix any validation errors
4. Run `pnpm type-check`
5. Commit and push
6. Deploy

### Future (API/CMS)

1. Update content in CMS UI
2. CMS validates against JSON schema
3. Content saved to database
4. API endpoint serves validated data
5. Next.js revalidates on interval
6. Changes appear on site

---

## Schema Versioning

If schemas change in the future, use semantic versioning:

**MAJOR** (breaking changes):

- Removing required fields
- Changing field types
- Renaming fields

**MINOR** (additive changes):

- Adding optional fields
- Adding enum values

**PATCH** (non-breaking):

- Changing descriptions
- Updating validation rules (if backwards compatible)

**Example**:

```json
{
  "version": "2.0.0",
  "changelog": [
    "v2.0.0: Added 'department' field to TeamMember (breaking)",
    "v1.1.0: Added 'twitter' field to TeamMember (optional)",
    "v1.0.1: Updated bio minLength from 10 to 50"
  ]
}
```

---

**Data Schema Contract Status**: Complete ✅  
**Next Step**: Create quickstart developer guide
