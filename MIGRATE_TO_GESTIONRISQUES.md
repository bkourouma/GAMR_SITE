# 🔄 GAMR Migration: gamr.engage-360.net → gestionrisques.com

## Quick Migration Guide

**Old Domain**: `gamr.engage-360.net`  
**New Domain**: `gestionrisques.com`  
**VPS IP**: `147.93.44.169`  
**Estimated Time**: 15-20 minutes

---

## ✅ STEP 1: Configure DNS on Hostinger (5 minutes)

1. **Log into Hostinger** control panel
2. **Go to DNS Zone Editor** for `gestionrisques.com`
3. **Add these A records**:

   **Record 1** (Root domain):
   - Type: `A`
   - Name: `@`
   - Points to: `147.93.44.169`
   - TTL: `3600`

   **Record 2** (WWW subdomain):
   - Type: `A`
   - Name: `www`
   - Points to: `147.93.44.169`
   - TTL: `3600`

4. **Click Save** and wait 10-30 minutes for propagation

---

## ✅ STEP 2: Verify DNS (Wait for propagation)

From your local machine:

```bash
nslookup gestionrisques.com
```

**Expected**: Should return `147.93.44.169`

**If not ready yet**, wait another 10-15 minutes and retry.

---

## ✅ STEP 3: Connect to VPS and Update Nginx

### 3.1: Connect via SSH

```bash
ssh root@147.93.44.169
```

Enter password when prompted.

---

### 3.2: Backup Current Configuration

```bash
# Create backup of current config
    sudo cp /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-available/gamr.engage-360.net.backup

# Verify backup
ls -la /etc/nginx/sites-available/ | grep gamr
```

---

### 3.3: Create New Configuration for gestionrisques.com

```bash
# Create new config file
sudo nano /etc/nginx/sites-available/gestionrisques.com
```

**Paste this complete configuration**:

```nginx
# GAMR Site - gestionrisques.com
# Migrated from gamr.engage-360.net

server {
    listen 80;
    listen [::]:80;
    server_name gestionrisques.com www.gestionrisques.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/gestionrisques.com.access.log;
    error_log /var/log/nginx/gestionrisques.com.error.log;

    # Proxy to Next.js app running on port 3003
    location / {
        proxy_pass http://localhost:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Next.js static files optimization
    location /_next/static {
        proxy_pass http://localhost:3003;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }

    # Public static files
    location /images {
        proxy_pass http://localhost:3003;
        proxy_cache_valid 30d;
        add_header Cache-Control "public, immutable";
    }

    # Favicon
    location /favicon.ico {
        proxy_pass http://localhost:3003;
        access_log off;
    }

    # Robots.txt
    location /robots.txt {
        proxy_pass http://localhost:3003;
        access_log off;
    }
}
```

**Save**: Press `Ctrl+X`, then `Y`, then `Enter`

---

### 3.4: Enable New Site Configuration

```bash
# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/gestionrisques.com /etc/nginx/sites-enabled/

# Verify symbolic link
ls -la /etc/nginx/sites-enabled/ | grep gestionrisques

# Test Nginx configuration
sudo nginx -t
```

**Expected output**:
```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

### 3.5: Reload Nginx

```bash
# Reload Nginx to apply changes
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx
```

**Expected**: Should show "active (running)" in green

---

## ✅ STEP 4: Test HTTP Access

### From VPS:

```bash
curl -I http://gestionrisques.com
```

**Expected**: `HTTP/1.1 200 OK`

### From Your Browser:

Visit: `http://gestionrisques.com`

**Expected**: GAMR site should load

---

## ✅ STEP 5: Install SSL Certificate

```bash
# Install SSL certificate for both root and www domains
sudo certbot --nginx -d gestionrisques.com -d www.gestionrisques.com
```

**Follow the prompts**:
1. Enter your email address: `[your-email]`
2. Agree to Terms of Service: `Y`
3. Share email with EFF (optional): `N` or `Y`
4. Choose redirect option: `2` (Redirect HTTP to HTTPS)

**Wait 2-3 minutes** for certificate installation.

---

## ✅ STEP 6: Verify HTTPS Works

### From VPS:

```bash
curl -I https://gestionrisques.com
```

**Expected**: `HTTP/2 200` or `HTTP/1.1 200`

### From Browser:

Visit: `https://gestionrisques.com`

**Expected**: 
- ✅ Site loads with HTTPS
- ✅ Padlock icon shows "Secure"
- ✅ No SSL errors

---

## ✅ STEP 7: Configure Old Domain Redirect (Optional but Recommended)

Set up `gamr.engage-360.net` to redirect to `gestionrisques.com`:

```bash
# Edit old domain config
sudo nano /etc/nginx/sites-available/gamr.engage-360.net
```

**Replace entire content** with this redirect configuration:

```nginx
# Redirect gamr.engage-360.net to gestionrisques.com
server {
    listen 80;
    listen [::]:80;
    server_name gamr.engage-360.net;
    return 301 https://gestionrisques.com$request_uri;
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

    return 301 https://gestionrisques.com$request_uri;
}
```

**Save**: `Ctrl+X`, `Y`, `Enter`

**Test and reload**:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

**Test redirect**:
- Visit: `https://gamr.engage-360.net`
- Should automatically redirect to: `https://gestionrisques.com`

---

## ✅ STEP 8: Update Environment Variables (If Applicable)

Check if your app uses environment variables:

```bash
cd /opt/gamr

# Check for .env file
ls -la | grep .env
```

**If .env file exists**:

```bash
nano .env

# Update domain-specific variables (if any)
# Example:
# NEXT_PUBLIC_SITE_URL=https://gestionrisques.com
# NEXT_PUBLIC_API_URL=https://gestionrisques.com/api
```

**If you updated .env**, rebuild and restart:

```bash
pnpm build
pm2 restart gamr-site
```

---

## ✅ STEP 9: Final Verification

### Check PM2 Status:

```bash
pm2 list
```

**Expected**: `gamr-site` status = `online` (green)

### Check Nginx Status:

```bash
sudo systemctl status nginx
```

**Expected**: `active (running)`

### Test All Pages:

Visit these URLs in your browser:

- ✅ `https://gestionrisques.com/`
- ✅ `https://gestionrisques.com/fonctionnalites`
- ✅ `https://gestionrisques.com/solutions`
- ✅ `https://gestionrisques.com/tarifs`
- ✅ `https://gestionrisques.com/a-propos`
- ✅ `https://gestionrisques.com/demander-demo`
- ✅ `https://gestionrisques.com/essai-gratuit`

### Verify Other Sites Still Work:

- ✅ `https://engage-360.net`
- ✅ `https://agents.engage-360.net`
- ✅ `https://chat.engage-360.net`
- ✅ `https://bmi.engage-360.net`

**All should still work normally.**

---

## ✅ STEP 10: Update Deploy Script

Update the deployment script to reflect new domain:

```bash
nano /opt/gamr/deploy.sh
```

**Update the last line** (line 49):

```bash
# OLD:
echo "🌐 Visit: https://gamr.engage-360.net"

# NEW:
echo "🌐 Visit: https://gestionrisques.com"
```

**Save**: `Ctrl+X`, `Y`, `Enter`

---

## 📊 Check Logs

```bash
# PM2 logs
pm2 logs gamr-site --lines 50

# Nginx access log for new domain
sudo tail -20 /var/log/nginx/gestionrisques.com.access.log

# Nginx error log
sudo tail -20 /var/log/nginx/gestionrisques.com.error.log
```

---

## 🎉 SUCCESS CHECKLIST

- [ ] DNS configured for gestionrisques.com (A records)
- [ ] DNS resolves to 147.93.44.169
- [ ] Nginx configuration created
- [ ] HTTP access works (gestionrisques.com)
- [ ] SSL certificate installed
- [ ] HTTPS access works with padlock 🔒
- [ ] All pages load correctly
- [ ] Old domain redirects to new domain
- [ ] PM2 app status: online
- [ ] Other VPS sites unaffected
- [ ] No errors in logs

---

## 🔄 Quick Command Reference

**Complete migration in one session** (after DNS is ready):

```bash
# 1. Connect
ssh root@147.93.44.169

# 2. Backup
sudo cp /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-available/gamr.engage-360.net.backup

# 3. Create new config (paste the nginx config from above)
sudo nano /etc/nginx/sites-available/gestionrisques.com

# 4. Enable site
sudo ln -s /etc/nginx/sites-available/gestionrisques.com /etc/nginx/sites-enabled/

# 5. Test & reload
sudo nginx -t
sudo systemctl reload nginx

# 6. Test HTTP
curl -I http://gestionrisques.com

# 7. Install SSL
sudo certbot --nginx -d gestionrisques.com -d www.gestionrisques.com

# 8. Test HTTPS
curl -I https://gestionrisques.com

# 9. Setup redirect for old domain
sudo nano /etc/nginx/sites-available/gamr.engage-360.net
# (paste redirect config)

# 10. Reload again
sudo nginx -t
sudo systemctl reload nginx

# Done! 🎉
```

---

## 🆘 Troubleshooting

### DNS not resolving

**Check propagation status**: https://www.whatsmydns.net/#A/gestionrisques.com

**Wait**: Sometimes takes up to 1 hour for global propagation

### SSL certificate fails

**Error**: "DNS problem: NXDOMAIN"
- **Solution**: DNS not propagated yet, wait and retry

**Retry SSL installation**:
```bash
sudo certbot --nginx -d gestionrisques.com -d www.gestionrisques.com --force-renewal
```

### Site not loading

**Check Nginx error logs**:
```bash
sudo tail -50 /var/log/nginx/gestionrisques.com.error.log
```

**Check PM2 app**:
```bash
pm2 list
pm2 logs gamr-site --lines 50
```

**Verify port 3003 is listening**:
```bash
sudo netstat -tulpn | grep 3003
```

---

## 📞 Support

If issues persist:
1. Check DNS: `nslookup gestionrisques.com`
2. Check Nginx: `sudo nginx -t`
3. Check PM2: `pm2 list`
4. Review logs: `pm2 logs gamr-site`

---

**Migration Date**: October 18, 2025  
**From**: gamr.engage-360.net  
**To**: gestionrisques.com  
**Status**: Ready to execute ✅


