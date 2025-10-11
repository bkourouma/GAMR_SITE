# Development Quick Start Guide

**Feature**: GAMR Marketing Website  
**Date**: 2025-10-08  
**Status**: Complete

## Prerequisites

Before starting development, ensure you have:

- **Node.js**: Version 18.17.0 or higher (check: `node --version`)
- **pnpm**: Version 8.0.0 or higher (install: `npm install -g pnpm`)
- **Git**: Latest version (check: `git --version`)
- **Code Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - MDX (for case studies)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest version)

**Recommended Tools**:

- **Playwright Test for VS Code** (for running e2e tests)
- **React Developer Tools** (browser extension)

---

## Initial Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone <repository-url>
cd gamr-site

# Verify you're on the feature branch
git branch
# Should show: * 001-site-marketing-gamr
```

### 2. Install Dependencies

```bash
# Install all npm dependencies with pnpm
pnpm install

# This installs:
# - Next.js, React, TypeScript
# - Tailwind CSS
# - react-hook-form, zod
# - Vitest, Playwright
# - ESLint, Prettier
# - All other dependencies from package.json
```

**Expected time**: 2-5 minutes depending on internet speed

---

### 3. Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local with your credentials
# (Use your preferred editor: code, nano, vim, notepad)
code .env.local
```

**Required variables**:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=GAMR

# SendGrid (for email confirmations)
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=no-reply@gamr.com
SENDGRID_TRIAL_TEMPLATE_ID=d-your_trial_template_id
SENDGRID_DEMO_TEMPLATE_ID=d-your_demo_template_id
SENDGRID_DELETION_TEMPLATE_ID=d-your_deletion_template_id

# Airtable (for form submissions storage)
AIRTABLE_API_KEY=pat your_airtable_personal_access_token
AIRTABLE_BASE_ID=app your_base_id_here
AIRTABLE_TABLE_TRIAL=TrialSignups
AIRTABLE_TABLE_DEMO=DemoRequests
AIRTABLE_TABLE_CONTACT=Contacts
AIRTABLE_TABLE_DELETION=DeletionRequests

# Google Analytics 4 (optional for development)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Data Deletion Token Secret (generate random 32+ char string)
DATA_DELETION_SECRET=your_random_secret_key_min_32_chars

# Calendly (for demo booking widget)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/gamr-demo
```

**How to obtain credentials**:

1. **SendGrid**:
   - Sign up at https://sendgrid.com (free tier: 100 emails/day)
   - Create API key in Settings → API Keys
   - Create email templates for trial, demo, deletion confirmations

2. **Airtable**:
   - Sign up at https://airtable.com
   - Create new base "GAMR Marketing Leads"
   - Create tables: TrialSignups, DemoRequests, Contacts, DeletionRequests
   - Generate Personal Access Token in Account → Developer

3. **Google Analytics 4**:
   - Create GA4 property at https://analytics.google.com
   - Copy Measurement ID (format: G-XXXXXXXXXX)

4. **Calendly**:
   - Create account at https://calendly.com
   - Set up 15-minute event type
   - Copy event URL

---

### 4. Verify Setup

```bash
# Run development server
pnpm dev

# You should see:
#   ▲ Next.js 14.x.x
#   - Local:        http://localhost:3000
#   - Network:      http://192.168.x.x:3000
#
# ✓ Ready in X.Xs
```

**Open browser**: Navigate to http://localhost:3000

**Expected result**: Homepage loads successfully (even with placeholder content)

---

## Development Workflow

### Running the Development Server

```bash
# Start development server (hot reload enabled)
pnpm dev

# The server runs on port 3000 by default
# Changes to files automatically refresh the page
```

**Development Features**:

- Hot Module Replacement (HMR) - instant updates
- Fast Refresh - preserves component state
- Error overlay - shows compilation errors in browser
- TypeScript errors shown in terminal

---

### Code Quality Commands

```bash
# Run ESLint (check for code issues)
pnpm lint

# Fix auto-fixable ESLint issues
pnpm lint --fix

# Check code formatting with Prettier
pnpm format:check

# Auto-format all files with Prettier
pnpm format

# Run TypeScript type checking (no compilation)
pnpm type-check

# Run all quality checks together
pnpm lint && pnpm type-check && pnpm format:check
```

**Pre-commit hooks**: Husky automatically runs lint + format on staged files before each commit.

---

### Testing Commands

```bash
# Run all unit + integration tests (Vitest)
pnpm test

# Run tests in watch mode (re-run on file changes)
pnpm test:watch

# Run tests with coverage report
pnpm test -- --coverage

# Run end-to-end tests (Playwright)
pnpm test:e2e

# Run e2e tests in UI mode (interactive)
pnpm test:e2e:ui

# Run e2e tests in headed mode (see browser)
pnpm test:e2e -- --headed

# Run specific e2e test file
pnpm test:e2e tests/e2e/homepage.spec.ts
```

**Testing Strategy**:

- Write tests BEFORE implementing features (TDD where appropriate)
- Unit tests for utilities and hooks
- Integration tests for multi-component interactions
- E2E tests for critical paths (homepage, trial signup, demo request)

---

### Building for Production

```bash
# Create optimized production build
pnpm build

# This runs:
# 1. TypeScript compilation
# 2. Next.js build (static page generation)
# 3. Bundle optimization
# 4. Image optimization
# 5. Sitemap generation

# Expected output:
#   Route (app)                Size     First Load JS
#   ✓ /                       XkB      YkB
#   ✓ /fonctionnalites        XkB      YkB
#   ...

# Serve production build locally
pnpm start

# Open: http://localhost:3000
```

**Production Build Checks**:

- All TypeScript errors must be resolved
- All ESLint errors must be fixed
- Build output shows size of each route
- Lighthouse audit should pass (run `pnpm lighthouse` after build)

---

### Lighthouse CI (Local)

```bash
# Build first (required)
pnpm build

# Run Lighthouse CI
pnpm lighthouse

# Generates reports in .lighthouseci/ directory
# View results in terminal

# Expected scores:
# - Performance: > 90 (desktop), > 85 (mobile)
# - Accessibility: 100
# - SEO: > 95
```

---

## Project Structure Navigation

```
gamr-site/
├── src/
│   ├── app/                    # 👈 Routes and pages start here
│   │   ├── page.tsx           # Homepage (/)
│   │   ├── fonctionnalites/   # /fonctionnalites
│   │   ├── api/               # API routes for forms
│   │   └── ...
│   │
│   ├── components/             # 👈 Reusable UI components
│   │   ├── ui/                # Base components (Button, Input)
│   │   ├── layout/            # Header, Footer
│   │   ├── forms/             # Form components
│   │   └── ...
│   │
│   ├── lib/                   # 👈 Utilities and helpers
│   │   ├── validations.ts     # Zod schemas
│   │   ├── analytics.ts       # GA4 tracking
│   │   └── ...
│   │
│   └── content/               # 👈 MDX case studies
│       └── case-studies/
│
├── public/                     # 👈 Static assets (images, icons)
│
├── tests/                      # 👈 All tests here
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── specs/                      # 👈 Feature documentation
    └── 001-site-marketing-gamr/
        ├── spec.md
        ├── plan.md
        ├── research.md
        ├── data-model.md
        └── contracts/
```

---

## Common Development Tasks

### Creating a New Page

```bash
# 1. Create page directory
mkdir -p src/app/nouvelle-page

# 2. Create page.tsx file
# Use this template:

export default function NouvellePage() {
  return (
    <main>
      <h1>Nouvelle Page</h1>
    </main>
  );
}

# 3. Add SEO metadata (use next-seo or metadata export)
# 4. Add to navigation in Header component
# 5. Test at http://localhost:3000/nouvelle-page
```

### Creating a New Component

```bash
# 1. Create component file
touch src/components/shared/NouveauComponent.tsx

# 2. Use this template:

import React from 'react';

type NouveauComponentProps = {
  title: string;
  children?: React.ReactNode;
};

export function NouveauComponent({ title, children }: NouveauComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

# 3. Create test file
touch src/components/shared/NouveauComponent.test.tsx

# 4. Import and use in pages
```

### Adding a New Case Study

```bash
# 1. Create MDX file
touch src/content/case-studies/nouveau-cas.mdx

# 2. Add frontmatter (see case-studies-schema.md for full schema)
# 3. Write content following guidelines
# 4. Add hero image to public/images/case-studies/
# 5. Test by visiting /etudes-de-cas/nouveau-cas
# 6. Verify appears in listing page /etudes-de-cas
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Kill the process or use different port:
pnpm dev --port 3001
```

### TypeScript Errors in IDE

```bash
# Restart TypeScript server in VS Code:
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Or regenerate types:
pnpm build
```

### Module Not Found Errors

```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Image Optimization Errors

```bash
# Ensure images are in public/ directory
# Check next.config.js has correct image domains configured
# Verify image paths start with / (not ./ or relative)
```

### Tailwind Classes Not Working

```bash
# Verify tailwind.config.ts has correct content paths
# Restart dev server
# Check globals.css imports Tailwind directives
```

---

## Git Workflow

### Committing Changes

```bash
# Stage files
git add .

# Commit with Conventional Commits format
git commit -m "feat(homepage): add hero section component"

# Husky pre-commit hook will run:
# - lint-staged (ESLint + Prettier on staged files)
# - Type check
# If any fail, commit is blocked

# Commitlint validates message format:
# - Must be: type(scope): subject
# - Types: feat, fix, docs, style, refactor, test, chore, perf
# - Subject: lowercase, imperative mood, no period
```

### Pushing Changes

```bash
# Push to remote feature branch
git push origin 001-site-marketing-gamr

# This triggers GitHub Actions CI:
# - Lint
# - Type check
# - Tests (unit + integration)
# - Build
# - Lighthouse CI
# - Vercel preview deployment
```

---

## Deployment

### Preview Deployments (Automatic)

- Every push to branch creates preview deployment on Vercel
- Preview URL: `https://gamr-site-git-001-site-marketing-gamr-{team}.vercel.app`
- Check PR for deployment link and Lighthouse CI results
- Share preview URL with stakeholders for review

### Production Deployment

```bash
# Merge feature branch to main
git checkout main
git merge 001-site-marketing-gamr
git push origin main

# This triggers production deployment
# Production URL: https://gamr.com (or configured domain)
```

---

## Useful Scripts

```bash
# Development
pnpm dev              # Start dev server (port 3000)
pnpm dev --turbo      # Start with Turbopack (faster, experimental)

# Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript check

# Testing
pnpm test             # Run Vitest tests
pnpm test:watch       # Vitest watch mode
pnpm test:e2e         # Run Playwright e2e
pnpm test:e2e:ui      # Playwright UI mode

# Build
pnpm build            # Production build
pnpm start            # Serve production build
pnpm lighthouse       # Run Lighthouse audit

# Analysis
pnpm analyze          # Bundle size analysis (if configured)
```

---

## Configuration Files

### tsconfig.json (TypeScript)

```json
{
  "compilerOptions": {
    "strict": true, // Constitution mandate
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### tailwind.config.ts (Tailwind CSS)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // Bleu professionnel
          50: '#EFF6FF',
          100: '#DBEAFE',
          600: '#1E40AF',
          700: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#7C3AED', // Violet innovation
          50: '#FAF5FF',
          100: '#F3E8FF',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        risk: {
          critical: '#DC2626', // Rouge
          high: '#F59E0B', // Orange
          medium: '#FCD34D', // Jaune
          low: '#10B981', // Vert
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

### .eslintrc.json (ESLint)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "jsx-a11y/anchor-is-valid": "off"
  }
}
```

### .prettierrc (Prettier)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "arrowParens": "always"
}
```

---

## Testing Guide

### Running Unit Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test src/lib/validations.test.ts

# Run tests in watch mode (recommended during development)
pnpm test:watch

# Run tests with coverage
pnpm test -- --coverage

# View coverage report
open coverage/index.html  # macOS
start coverage/index.html # Windows
```

### Running E2E Tests

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run all e2e tests (headless)
pnpm test:e2e

# Run with UI (recommended for development)
pnpm test:e2e:ui

# Run specific test
pnpm test:e2e tests/e2e/trial-signup.spec.ts

# Debug mode (opens browser, pauses on failures)
pnpm test:e2e -- --debug
```

---

## FAQ

### Q: How do I add a new page?

Create a new folder in `src/app/` with a `page.tsx` file. Next.js automatically creates the route.

### Q: How do I add SEO metadata to a page?

Use the `metadata` export in your page.tsx:

```typescript
export const metadata = {
  title: 'Page Title | GAMR',
  description: 'Page description for SEO',
};
```

Or use next-seo `NextSeo` component for more control (OpenGraph, JSON-LD).

### Q: How do I test forms locally without sending real emails?

Set `SENDGRID_API_KEY=test` in `.env.local`. Update API route to skip email sending in development mode and console.log instead.

### Q: How do I add a new Tailwind color?

Edit `tailwind.config.ts` → `theme.extend.colors` → add your color → restart dev server.

### Q: How do I add a new font?

Use next/font:

```typescript
import { Inter, Poppins } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

Then use in className: `className={inter.className}`

### Q: Where do I put images?

- **Static images** (logos, icons): `/public/images/`
- **Dynamic images**: Use next/image component with src="/images/your-image.jpg"

### Q: How do I create a new form?

1. Define Zod schema in `src/lib/validations.ts`
2. Create form component in `src/components/forms/`
3. Use react-hook-form + zod resolver
4. Add honeypot field
5. Create API route in `src/app/api/`
6. Test with Playwright e2e test

---

## Performance Optimization Tips

1. **Always use next/image** for images (automatic optimization)
2. **Add loading="lazy"** to below-fold images
3. **Use dynamic imports** for heavy components:
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <LoadingSpinner />,
   });
   ```
4. **Optimize fonts** with next/font (automatic subsetting)
5. **Minimize client-side JavaScript** - use Server Components where possible
6. **Test with Lighthouse** regularly: `pnpm build && pnpm lighthouse`

---

## Accessibility Testing Tips

1. **Test keyboard navigation**: Tab through all interactive elements
2. **Test with screen reader**: NVDA (Windows), VoiceOver (Mac/iOS)
3. **Run axe-core**: Automated in dev mode, check browser console
4. **Check color contrast**: Use browser DevTools or online checker
5. **Test zoom to 200%**: Ensure no horizontal scroll
6. **Test prefers-reduced-motion**: Set in OS, verify animations disabled

---

## Getting Help

- **Documentation**: See `/specs/001-site-marketing-gamr/` for full specs
- **Constitution**: Read `.specify/memory/constitution.md` for quality standards
- **Issues**: Check GitHub Issues or create new one
- **Questions**: Ask in team chat or @mention tech lead

---

**Status**: Quick start guide complete - Ready for development
