# 🚀 GAMR Site - Hostinger VPS Deployment Guide

**Target Domain**: `gamr.engage-360.net`  
**Server IP**: `147.93.44.169`  
**App Directory**: `/opt/gamr`  
**GitHub Repo**: `https://github.com/bkourouma/GAMR_SITE.git`

---

## ⚠️ CRITICAL SAFETY NOTES

This guide is designed for a **multi-site VPS environment**. All commands:

- ✅ Only affect `gamr.engage-360.net`
- ✅ Will NOT impact existing sites (engage-360.net, agents.engage-360.net, chat.engage-360.net, bmi.engage-360.net)
- ✅ Use isolated directories and ports
- ✅ Create separate Nginx configuration files

**If at any point you're unsure, STOP and review before proceeding.**

---

## 📋 PREREQUISITES

Before starting, ensure you have:

- [x] SSH access to the VPS
- [x] sudo/root privileges
- [x] DNS A record for `gamr.engage-360.net` pointing to `147.93.44.169`
- [x] Node.js 18+ installed on the VPS
- [x] PM2 installed globally
- [x] Nginx installed and running
- [x] Git installed on the VPS

---

## 🔍 STEP 1: VERIFY DNS CONFIGURATION (5 minutes)

**From your local machine**, check that DNS is properly configured:

```bash
# Check DNS resolution
nslookup gamr.engage-360.net

# Or use dig
dig gamr.engage-360.net +short
```

**Expected Result**: Should return `147.93.44.169`

**If DNS not configured yet:**

1. Go to your domain registrar (Hostinger DNS panel)
2. Add A record: `gamr.engage-360.net` → `147.93.44.169`
3. Wait 5-60 minutes for propagation
4. Repeat check above

---

## 🔐 STEP 2: CONNECT TO VPS (2 minutes)

Open your terminal/PowerShell and connect via SSH:

```bash
ssh root@147.93.44.169
# Or if you have a specific user:
# ssh your-username@147.93.44.169
```

**Enter your password when prompted.**

---

## 📦 STEP 3: VERIFY SYSTEM REQUIREMENTS (5 minutes)

Run these commands to verify installed software:

```bash
# Check Node.js version (need 18+)
node --version

# Check PM2
pm2 --version

# Check Nginx
nginx -v

# Check Git
git --version

# Check current PM2 apps (to see existing apps)
pm2 list
```

**Expected Results:**

- Node.js: v18.x or higher
- PM2: Any version
- Nginx: Any version
- Git: Any version

**If any missing, install them first:**

```bash
# Install Node.js 20 LTS (if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally (if needed)
sudo npm install -g pm2

# Install Nginx (if needed)
sudo apt-get update
sudo apt-get install -y nginx

# Install Git (if needed)
sudo apt-get install -y git
```

---

## 🗂️ STEP 4: CREATE APPLICATION DIRECTORY (3 minutes)

Create the directory for GAMR and set proper permissions:

```bash
# Create directory
sudo mkdir -p /opt/gamr

# Set ownership to current user (replace 'your-user' if needed)
sudo chown -R $USER:$USER /opt/gamr

# Verify directory exists
ls -la /opt/
```

**Expected Result**: You should see `/opt/gamr` directory with your user as owner.

---

## 📥 STEP 5: CLONE REPOSITORY (5 minutes)

Clone the GAMR site from GitHub:

```bash
# Navigate to app directory
cd /opt/gamr

# Clone the repository
git clone https://github.com/bkourouma/GAMR_SITE.git .

# Verify files are present
ls -la
```

**Expected Result**: You should see all project files (package.json, src/, public/, etc.)

---

## 🔧 STEP 6: INSTALL DEPENDENCIES (5-10 minutes)

Install Node.js dependencies:

```bash
# Still in /opt/gamr directory
cd /opt/gamr

# Install pnpm globally if not installed
npm install -g pnpm

# Install project dependencies
pnpm install

# This may take 3-5 minutes depending on your connection
```

**Expected Result**:

- `node_modules/` folder created
- No error messages
- Message: "Dependencies installed successfully"

---

## 🔨 STEP 7: BUILD FOR PRODUCTION (5 minutes)

Build the Next.js application:

```bash
# Build the production version
pnpm build

# This will take 2-3 minutes
```

**Expected Result**:

- Success message: "Compiled successfully"
- `.next/` folder created
- No build errors

**If build fails:**

- Check error messages
- Ensure all dependencies installed
- Verify Node.js version is 18+

---

## 🚦 STEP 8: FIND AVAILABLE PORT (2 minutes)

Check which ports are currently in use:

```bash
# Check existing PM2 apps and their ports
pm2 list

# Or check with netstat
sudo netstat -tulpn | grep LISTEN
```

**Choose an available port** (e.g., 3001, 3002, 3003, etc.)  
**For this guide, we'll use port `3003`** (adjust if needed)

---

## ⚙️ STEP 9: CREATE PM2 ECOSYSTEM FILE (5 minutes)

Create a PM2 configuration file:

```bash
# Create ecosystem.config.js file
nano /opt/gamr/ecosystem.config.js
```

**Paste this configuration** (press `Ctrl+Shift+V` or right-click to paste):

```javascript
module.exports = {
  apps: [
    {
      name: 'gamr-site',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3003',
      cwd: '/opt/gamr',
      instances: 1,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
      },
      error_file: '/opt/gamr/logs/error.log',
      out_file: '/opt/gamr/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
```

**Save and exit:**

- Press `Ctrl+X`
- Press `Y` to confirm
- Press `Enter` to save

**Create logs directory:**

```bash
mkdir -p /opt/gamr/logs
```

---

## 🎯 STEP 10: START APPLICATION WITH PM2 (3 minutes)

Start the GAMR application:

```bash
# Navigate to app directory
cd /opt/gamr

# Start the app with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration (auto-restart on reboot)
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it gives you (copy/paste and run it)

# Check if app is running
pm2 list
```

**Expected Result**:

- App status: `online` (in green)
- No errors in the list

**Test the application locally:**

```bash
# Test if the app responds
curl http://localhost:3003
```

**Expected Result**: HTML content from the site

**If app status is "errored":**

```bash
# Check logs
pm2 logs gamr-site --lines 50

# Common fixes:
# - Ensure port 3003 is available
# - Check build completed successfully
# - Verify all dependencies installed
```

---

## 🌐 STEP 11: CREATE NGINX CONFIGURATION (10 minutes)

Create an Nginx configuration file for the subdomain:

```bash
# Create new Nginx site configuration
sudo nano /etc/nginx/sites-available/gamr.engage-360.net
```

**Paste this configuration** (adjust if you used a different port):

```nginx
# GAMR Site - gamr.engage-360.net
# This config is isolated and won't affect other sites

server {
    listen 80;
    listen [::]:80;
    server_name gamr.engage-360.net;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging (separate from other sites)
    access_log /var/log/nginx/gamr.engage-360.net.access.log;
    error_log /var/log/nginx/gamr.engage-360.net.error.log;

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

**Save and exit:**

- Press `Ctrl+X`
- Press `Y` to confirm
- Press `Enter` to save

---

## 🔗 STEP 12: ENABLE NGINX SITE (5 minutes)

Enable the new site configuration:

```bash
# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-enabled/

# Verify the symbolic link was created
ls -la /etc/nginx/sites-enabled/ | grep gamr

# Test Nginx configuration for syntax errors
sudo nginx -t
```

**Expected Result**:

```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**If syntax errors appear:**

- Review the configuration file
- Check for typos
- Ensure port matches your PM2 app port

**Reload Nginx:**

```bash
# Reload Nginx to apply changes
sudo systemctl reload nginx

# Or restart if reload doesn't work
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

**Expected Result**: Active (running) in green

---

## 🧪 STEP 13: TEST HTTP ACCESS (5 minutes)

Test the site is accessible via HTTP:

```bash
# From the VPS, test locally
curl -I http://gamr.engage-360.net

# Expected: HTTP/1.1 200 OK
```

**From your local machine:**
Open a web browser and visit:

```
http://gamr.engage-360.net
```

**Expected Result**: GAMR site loads successfully

**If site doesn't load:**

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/gamr.engage-360.net.error.log

# Check if PM2 app is still running
pm2 list

# Check if Nginx is running
sudo systemctl status nginx

# Check firewall (ensure ports 80/443 open)
sudo ufw status
```

---

## 🔒 STEP 14: INSTALL SSL CERTIFICATE (10 minutes)

Install Let's Encrypt SSL certificate using Certbot:

```bash
# Install Certbot if not already installed
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain and install SSL certificate
sudo certbot --nginx -d gamr.engage-360.net

# Follow the prompts:
# 1. Enter your email address
# 2. Agree to Terms of Service (Y)
# 3. Choose whether to redirect HTTP to HTTPS (recommended: 2 - Redirect)
```

**Expected Result**:

- Certificate successfully obtained
- Nginx configuration automatically updated
- HTTPS redirect enabled

**Certbot will automatically:**

- Update your Nginx configuration
- Add SSL certificate paths
- Configure HTTPS redirect
- Set up auto-renewal

**Test SSL certificate:**

```bash
# From your local machine, visit:
# https://gamr.engage-360.net
```

**Expected Result**: Site loads with HTTPS, padlock icon shows "Secure"

---

## ✅ STEP 15: VERIFY FINAL CONFIGURATION (10 minutes)

Run these final checks:

### 15.1: Check PM2 App Status

```bash
pm2 list
pm2 logs gamr-site --lines 20
```

**Expected**: Status = `online` (green), no errors in logs

### 15.2: Check Nginx Configuration

```bash
# View the final Nginx config (Certbot modified it)
sudo cat /etc/nginx/sites-available/gamr.engage-360.net

# Should now include SSL configuration
```

### 15.3: Test All Routes

From your browser, test these URLs:

- ✅ `https://gamr.engage-360.net` (Homepage)
- ✅ `https://gamr.engage-360.net/fonctionnalites` (Features)
- ✅ `https://gamr.engage-360.net/solutions` (Solutions)
- ✅ `https://gamr.engage-360.net/tarifs` (Pricing)
- ✅ `https://gamr.engage-360.net/a-propos` (About)
- ✅ `https://gamr.engage-360.net/demander-demo` (Demo Form)
- ✅ `https://gamr.engage-360.net/essai-gratuit` (Free Trial Form)

### 15.4: Check SSL Grade

Visit: https://www.ssllabs.com/ssltest/analyze.html?d=gamr.engage-360.net

**Expected**: Grade A or A+

### 15.5: Test Performance

```bash
# From your local machine, test page load time
curl -w "@-" -o /dev/null -s https://gamr.engage-360.net <<'EOF'
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
      time_redirect:  %{time_redirect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
EOF
```

**Expected**: time_total < 3 seconds

### 15.6: Verify Other Sites Still Work

**CRITICAL CHECK**: Ensure your other sites are unaffected:

- ✅ `https://engage-360.net`
- ✅ `https://agents.engage-360.net`
- ✅ `https://chat.engage-360.net`
- ✅ `https://bmi.engage-360.net`

**All should still be working normally.**

---

## 🔄 STEP 16: SETUP AUTO-UPDATES (Optional, 10 minutes)

Create a deployment script for future updates:

```bash
# Create deployment script
sudo nano /opt/gamr/deploy.sh
```

**Paste this script:**

```bash
#!/bin/bash
set -e

echo "🚀 Deploying GAMR Site..."

# Navigate to app directory
cd /opt/gamr

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build application
echo "🔨 Building application..."
pnpm build

# Restart PM2 app
echo "♻️  Restarting application..."
pm2 restart gamr-site

# Wait for app to start
sleep 3

# Check status
echo "✅ Checking application status..."
pm2 list

echo "🎉 Deployment complete!"
echo "🌐 Visit: https://gamr.engage-360.net"
```

**Save and make executable:**

```bash
# Save (Ctrl+X, Y, Enter)

# Make executable
chmod +x /opt/gamr/deploy.sh

# Test the script
# /opt/gamr/deploy.sh
```

**To update in the future, just run:**

```bash
cd /opt/gamr
./deploy.sh
```

---

## 📊 STEP 17: MONITORING & LOGS (5 minutes)

### View Application Logs

```bash
# Real-time logs
pm2 logs gamr-site

# Last 50 lines
pm2 logs gamr-site --lines 50

# Error logs only
pm2 logs gamr-site --err

# Output logs only
pm2 logs gamr-site --out
```

### View Nginx Logs

```bash
# Access log (visitor traffic)
sudo tail -f /var/log/nginx/gamr.engage-360.net.access.log

# Error log
sudo tail -f /var/log/nginx/gamr.engage-360.net.error.log
```

### PM2 Monitoring

```bash
# Real-time monitoring dashboard
pm2 monit

# Press Ctrl+C to exit
```

### Check Resource Usage

```bash
# Check memory and CPU
pm2 list

# Detailed app info
pm2 describe gamr-site
```

---

## 🔧 TROUBLESHOOTING GUIDE

### Problem: Site not loading (502 Bad Gateway)

**Solution:**

```bash
# Check if PM2 app is running
pm2 list

# If stopped, start it
pm2 start gamr-site

# Check logs for errors
pm2 logs gamr-site --lines 50
```

### Problem: Port already in use

**Solution:**

```bash
# Find what's using port 3003
sudo lsof -i :3003

# Kill the process (if safe to do so)
sudo kill -9 <PID>

# Or change port in ecosystem.config.js and Nginx config
```

### Problem: SSL certificate not working

**Solution:**

```bash
# Re-run Certbot
sudo certbot --nginx -d gamr.engage-360.net

# Force renewal
sudo certbot renew --force-renewal
```

### Problem: Changes not showing after update

**Solution:**

```bash
# Clear Next.js cache and rebuild
cd /opt/gamr
rm -rf .next
pnpm build
pm2 restart gamr-site

# Clear browser cache or use Incognito mode
```

### Problem: Application crashing/restarting

**Solution:**

```bash
# Check error logs
pm2 logs gamr-site --err --lines 100

# Check memory usage
pm2 list

# Increase max_memory_restart in ecosystem.config.js if needed
# Then reload config
pm2 reload gamr-site
```

---

## 🔐 SECURITY BEST PRACTICES

### 1. Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 2. Keep System Updated

```bash
# Regular updates
sudo apt-get update
sudo apt-get upgrade -y

# Update Node.js packages
cd /opt/gamr
pnpm update
```

### 3. Setup Fail2Ban (Optional)

```bash
# Install fail2ban to prevent brute force attacks
sudo apt-get install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 📈 POST-DEPLOYMENT CHECKLIST

After deployment, verify these items:

- [ ] Site accessible via HTTPS
- [ ] All pages load correctly
- [ ] Forms submit properly
- [ ] Images display correctly
- [ ] No console errors in browser DevTools
- [ ] SSL certificate valid (A+ grade)
- [ ] All other sites still working
- [ ] PM2 app status: online
- [ ] Nginx status: active
- [ ] Logs show no errors
- [ ] SSL auto-renewal configured
- [ ] Firewall configured
- [ ] Deploy script tested

---

## 🆘 ROLLBACK PROCEDURE

If something goes wrong and you need to rollback:

### 1. Stop the Application

```bash
pm2 stop gamr-site
pm2 delete gamr-site
```

### 2. Disable Nginx Site

```bash
sudo rm /etc/nginx/sites-enabled/gamr.engage-360.net
sudo systemctl reload nginx
```

### 3. Remove Files (Optional)

```bash
sudo rm -rf /opt/gamr
```

### 4. Verify Other Sites Still Work

Visit all your other subdomains to ensure they're unaffected.

---

## 📝 MAINTENANCE COMMANDS

### Update Application

```bash
cd /opt/gamr
./deploy.sh
```

### Restart Application

```bash
pm2 restart gamr-site
```

### View Logs

```bash
pm2 logs gamr-site
```

### Check Status

```bash
pm2 list
sudo systemctl status nginx
```

### Renew SSL Certificate Manually

```bash
sudo certbot renew
```

---

## 🎉 SUCCESS!

If you've completed all steps, your GAMR site should now be:

✅ **Live** at `https://gamr.engage-360.net`  
✅ **Secure** with SSL certificate  
✅ **Fast** with Nginx caching  
✅ **Reliable** with PM2 process management  
✅ **Monitored** with logging  
✅ **Safe** - Other sites unaffected

---

## 📞 NEED HELP?

If you encounter issues:

1. **Check the Troubleshooting section** above
2. **Review logs**: `pm2 logs gamr-site` and Nginx error logs
3. **Verify each step** was completed correctly
4. **Test components** individually (PM2, Nginx, DNS)

---

## 📚 USEFUL RESOURCES

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Certbot User Guide](https://certbot.eff.org/instructions)
- [Let's Encrypt SSL Labs](https://www.ssllabs.com/ssltest/)

---

**Created**: October 2024  
**Last Updated**: October 2024  
**Version**: 1.0.0
