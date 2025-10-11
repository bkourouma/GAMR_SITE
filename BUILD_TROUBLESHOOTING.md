# 🔧 Build Troubleshooting Guide

## Common Build Issues and Solutions

### Issue 1: TypeScript Type Errors with react-hook-form

**Error Message:**

```
Type error: Type 'Resolver<...>' is not assignable to type 'Resolver<...>'
```

**Cause:** Type mismatch between Zod schema and react-hook-form types

**Solution:**

1. Ensure all optional array fields in Zod schemas use `.optional().default([])`
2. Check that field names in `defaultValues` match schema field names exactly
3. Verify timezone field uses `_timezone` not `timezone`

**Fixed Files:**

- `src/lib/demo/schema.ts` - Line 170: `imports: z.array(importSchema).optional().default([])`
- `src/components/demo/DemoRequestForm.tsx` - Line 27: `_timezone: 'Africa/Abidjan'`

---

### Issue 2: Build Failing with "Cannot find module"

**Error Message:**

```
Error: Cannot find module '@/...'
```

**Solution:**

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

---

### Issue 3: Out of Memory During Build

**Error Message:**

```
JavaScript heap out of memory
```

**Solution:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

Or update `package.json`:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

### Issue 4: ESLint Errors During Build

**Error Message:**

```
Failed to compile due to ESLint errors
```

**Solution:**

```bash
# Fix auto-fixable issues
pnpm lint --fix

# If ESLint is blocking build, temporarily disable in next.config.js
# (NOT recommended for production)
```

In `next.config.js`:

```javascript
module.exports = {
  eslint: {
    // Only enable this temporarily to unblock deployment
    ignoreDuringBuilds: false, // Keep false for production
  },
};
```

---

### Issue 5: Missing Environment Variables

**Error Message:**

```
Error: Missing required environment variable
```

**Solution:**

```bash
# Create .env.local file (if needed)
touch /opt/gamr/.env.local

# Add required variables:
# RESEND_API_KEY=your_key_here
# RESEND_FROM_EMAIL=noreply@gamr.engage-360.net
```

**Note:** For this GAMR site, environment variables are optional for basic functionality.

---

### Issue 6: Stale Cache Causing Issues

**Symptoms:**

- Build succeeds but old code runs
- Changes not reflected
- Unexpected behavior

**Solution:**

```bash
cd /opt/gamr

# Full clean
rm -rf .next
rm -rf node_modules/.cache

# Rebuild
pnpm build

# Restart PM2
pm2 restart gamr-site
```

---

### Issue 7: pnpm Lock File Issues

**Error Message:**

```
WARN deprecated package...
ERR! Lockfile is up-to-date, resolution step is skipped
```

**Solution:**

```bash
# Remove lock file and reinstall
rm pnpm-lock.yaml
pnpm install
pnpm build
```

---

## Build Success Checklist

After a successful build, verify:

- [ ] `.next/` directory created
- [ ] No error messages in output
- [ ] "Compiled successfully" message appears
- [ ] Build output shows page routes
- [ ] Static pages generated

**Example successful output:**

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    1.2 kB          87 kB
├ ○ /a-propos                           890 B           85 kB
├ ○ /demander-demo                      2.1 kB          89 kB
├ ○ /essai-gratuit                      1.8 kB          88 kB
├ ○ /fonctionnalites                    1.5 kB          87 kB
├ ○ /solutions                          1.3 kB          86 kB
└ ○ /tarifs                             2.3 kB          90 kB

○  (Static)  automatically rendered as static HTML
```

---

## Quick Build Commands

**Standard build:**

```bash
cd /opt/gamr
pnpm build
```

**Build with verbose output:**

```bash
cd /opt/gamr
pnpm build --debug
```

**Clean build:**

```bash
cd /opt/gamr
rm -rf .next
pnpm build
```

**Type check only (no build):**

```bash
cd /opt/gamr
pnpm type-check
```

**Lint only:**

```bash
cd /opt/gamr
pnpm lint
```

---

## Need More Help?

1. **Check build logs** for specific error messages
2. **Review the main deployment guide** for context
3. **Search error messages** online (many Next.js build issues are well-documented)
4. **Verify Node.js version** is 18 or higher: `node --version`
5. **Check disk space**: `df -h`
6. **Check memory**: `free -m`

---

**Last Updated:** October 2024  
**For:** GAMR Site Deployment on Hostinger VPS
