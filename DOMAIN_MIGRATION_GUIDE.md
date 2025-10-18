# 🔄 GAMR - Domain Migration Guide

## Migrating from `gamr.engage-360.net` to Your New Domain

This guide shows you how to point your GAMR site (currently on `gamr.engage-360.net`) to a new domain.

---

## 📝 Prerequisites

- [ ] New domain registered on Hostinger
- [ ] SSH access to VPS (147.93.44.169)
- [ ] Current site running on `gamr.engage-360.net`

---

## 🎯 Migration Options

Choose one based on your needs:

### **Option A: Complete Migration** (Replace old domain with new)
- New domain becomes the primary domain
- Old domain can redirect to new domain
- Best for rebranding

### **Option B: Multi-Domain** (Both domains work)
- Both domains point to same site
- Good for transition period
- Keeps both active

---

## 🚀 STEP-BY-STEP GUIDE

### STEP 1: Configure DNS on Hostinger (5 minutes)

1. **Log into Hostinger** control panel
2. **Go to DNS Zone Editor** for your new domain
3. **Add A Record**:
   - Type: `A`
   - Name: `@` (for root domain) or your subdomain name
   - Points to: `147.93.44.169`
   - TTL: `3600` (default)
4. **Click Save**

**If using www subdomain**, also add:
   - Type: `A`
   - Name: `www`
   - Points to: `147.93.44.169`
   - TTL: `3600`

5. **Wait 10-30 minutes** for DNS propagation

6. **Verify DNS** (from your local machine):
   ```bash
   nslookup your-new-domain.com
   # Should return: 147.93.44.169
   ```

---

### STEP 2: Connect to VPS

```bash
ssh root@147.93.44.169
```

Enter your password when prompted.

---

### STEP 3: Update Nginx Configuration

#### **Option A: Replace Old Domain** (Recommended)

Update the existing Nginx configuration:

```bash
# Edit the existing config file
sudo nano /etc/nginx/sites-available/gamr.engage-360.net
```

**Replace** the `server_name` line (line 5):

```nginx
# OLD:
server_name gamr.engage-360.net;

# NEW:
server_name your-new-domain.com www.your-new-domain.com;
```

**Also update log file names** for clarity:

```nginx
# OLD:
access_log /var/log/nginx/gamr.engage-360.net.access.log;
error_log /var/log/nginx/gamr.engage-360.net.error.log;

# NEW:
access_log /var/log/nginx/your-new-domain.access.log;
error_log /var/log/nginx/your-new-domain.error.log;
```

**Save**: `Ctrl+X`, `Y`, `Enter`

**Optionally rename the config file**:
```bash
sudo mv /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-available/your-new-domain.com
sudo rm /etc/nginx/sites-enabled/gamr.engage-360.net
sudo ln -s /etc/nginx/sites-available/your-new-domain.com /etc/nginx/sites-enabled/
```

---

#### **Option B: Add New Domain (Keep Both)**

Create a new Nginx configuration:

```bash
# Copy existing config
sudo cp /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-available/your-new-domain.com

# Edit new config
sudo nano /etc/nginx/sites-available/your-new-domain.com
```

**Update these lines**:

```nginx
# Line 5: Update server_name
server_name your-new-domain.com www.your-new-domain.com;

# Update log paths
access_log /var/log/nginx/your-new-domain.access.log;
error_log /var/log/nginx/your-new-domain.error.log;
```

**Save**: `Ctrl+X`, `Y`, `Enter`

**Enable the new site**:
```bash
sudo ln -s /etc/nginx/sites-available/your-new-domain.com /etc/nginx/sites-enabled/
```

---

### STEP 4: Test and Reload Nginx

```bash
# Test configuration for syntax errors
sudo nginx -t

# If test is successful, reload Nginx
sudo systemctl reload nginx
```

**Expected output**:
```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

### STEP 5: Test HTTP Access

```bash
# From VPS
curl -I http://your-new-domain.com

# Expected: HTTP/1.1 200 OK
```

**From your browser**:
- Visit: `http://your-new-domain.com`
- Should load the GAMR site

---

### STEP 6: Install SSL Certificate for New Domain

```bash
# Install SSL certificate using Certbot
sudo certbot --nginx -d your-new-domain.com -d www.your-new-domain.com

# Follow the prompts:
# 1. Enter email address
# 2. Agree to Terms (Y)
# 3. Choose redirect option: 2 (Redirect HTTP to HTTPS)
```

**Wait 2-3 minutes** for certificate installation.

**Test HTTPS**:
- Visit: `https://your-new-domain.com`
- Should show secure padlock 🔒

---

### STEP 7: Verify Everything Works

#### Check PM2 Status:
```bash
pm2 list
# gamr-site should show "online" (green)
```

#### Check Nginx Status:
```bash
sudo systemctl status nginx
# Should show "active (running)"
```

#### Test All Pages:
Visit these URLs in your browser:
- ✅ `https://your-new-domain.com/`
- ✅ `https://your-new-domain.com/fonctionnalites`
- ✅ `https://your-new-domain.com/solutions`
- ✅ `https://your-new-domain.com/tarifs`
- ✅ `https://your-new-domain.com/a-propos`

#### Verify Other Sites Still Work:
- ✅ `https://engage-360.net`
- ✅ `https://agents.engage-360.net`
- ✅ `https://chat.engage-360.net`
- ✅ `https://bmi.engage-360.net`

---

## 🔀 OPTIONAL: Redirect Old Domain to New Domain

If you want `gamr.engage-360.net` to automatically redirect to your new domain:

### Create Redirect Configuration:

```bash
sudo nano /etc/nginx/sites-available/gamr.engage-360.net
```

**Replace the entire content** with this redirect configuration:

```nginx
# Redirect gamr.engage-360.net to new domain
server {
    listen 80;
    listen [::]:80;
    server_name gamr.engage-360.net;
    return 301 https://your-new-domain.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name gamr.engage-360.net;

    # Use existing SSL certificate
    ssl_certificate /etc/letsencrypt/live/gamr.engage-360.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gamr.engage-360.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://your-new-domain.com$request_uri;
}
```

**Replace** `your-new-domain.com` with your actual new domain.

**Save**: `Ctrl+X`, `Y`, `Enter`

**Test and reload**:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

**Test redirect**:
- Visit: `https://gamr.engage-360.net`
- Should automatically redirect to: `https://your-new-domain.com`

---

## 🔧 Update Environment Variables (If Applicable)

If your Next.js app uses environment variables with domain names:

```bash
cd /opt/gamr

# Check if .env file exists
ls -la | grep .env

# If exists, edit it
nano .env

# Update any domain-specific variables
# Example:
# OLD: NEXT_PUBLIC_SITE_URL=https://gamr.engage-360.net
# NEW: NEXT_PUBLIC_SITE_URL=https://your-new-domain.com
```

**If you updated .env**:
```bash
# Rebuild and restart
pnpm build
pm2 restart gamr-site
```

---

## ✅ POST-MIGRATION CHECKLIST

After migration, verify:

- [ ] DNS resolves to correct IP (147.93.44.169)
- [ ] New domain loads via HTTP
- [ ] SSL certificate installed for new domain
- [ ] New domain loads via HTTPS with padlock
- [ ] All pages work correctly
- [ ] Forms submit properly
- [ ] Images display correctly
- [ ] Old domain redirects (if configured)
- [ ] Other VPS sites still work
- [ ] PM2 status: online
- [ ] No errors in logs

---

## 📊 Verify Logs

```bash
# PM2 logs
pm2 logs gamr-site --lines 50

# Nginx access log
sudo tail -f /var/log/nginx/your-new-domain.access.log

# Nginx error log
sudo tail -f /var/log/nginx/your-new-domain.error.log
```

---

## 🔄 Update Google Analytics / SEO (If Applicable)

If you have analytics or SEO tools:

1. **Update Google Analytics** property settings
2. **Update Google Search Console** with new domain
3. **Submit new sitemap**: `https://your-new-domain.com/sitemap.xml`
4. **Set up 301 redirects** from old to new domain (covered above)

---

## ⚡ Quick Reference: Complete Migration Commands

If you already know your new domain, here's the quick command sequence:

```bash
# 1. Connect to VPS
ssh root@147.93.44.169

# 2. Edit Nginx config
sudo nano /etc/nginx/sites-available/gamr.engage-360.net
# Update server_name line to your new domain

# 3. Test and reload
sudo nginx -t
sudo systemctl reload nginx

# 4. Install SSL
sudo certbot --nginx -d your-new-domain.com -d www.your-new-domain.com

# 5. Verify
curl -I https://your-new-domain.com
pm2 list

# Done! 🎉
```

---

## 🆘 Troubleshooting

### Domain doesn't load

**Check DNS**:
```bash
nslookup your-new-domain.com
# Should return: 147.93.44.169
```

**Check Nginx config**:
```bash
sudo nginx -t
sudo cat /etc/nginx/sites-available/your-new-domain.com | grep server_name
```

**Check Nginx error logs**:
```bash
sudo tail -50 /var/log/nginx/your-new-domain.error.log
```

### SSL certificate fails

**Common issue**: DNS not propagated yet
- **Solution**: Wait 30-60 minutes, then retry Certbot

**Force retry**:
```bash
sudo certbot --nginx -d your-new-domain.com --force-renewal
```

### Old domain still showing

**Clear browser cache** or test in incognito mode

**Check Nginx server_name**:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🎉 Success!

Once complete, your GAMR site will be accessible at:

✅ **New Domain**: `https://your-new-domain.com`  
✅ **SSL Secure**: Valid certificate  
✅ **Same Application**: No code changes needed  
✅ **Other Sites**: Unaffected

---

## 📞 Need Help?

If you encounter issues:
1. Check DNS propagation: https://www.whatsmydns.net/
2. Test SSL: https://www.ssllabs.com/ssltest/
3. Review Nginx error logs
4. Verify PM2 app is running

---

**Created**: October 2024  
**Version**: 1.0.0


