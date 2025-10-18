# ✅ GAMR Deployment Checklist - Step by Step

Print this page and check off each step as you complete it!

---

## Pre-Deployment

- [ ] DNS record created: `gamr.engage-360.net` → `147.93.44.169`
- [ ] SSH access to VPS confirmed
- [ ] Have GitHub repo URL: `https://github.com/bkourouma/GAMR_SITE.git`

---

## Connection & Verification (10 minutes)

- [ ] **Step 1**: Connected to VPS via SSH: `ssh root@147.93.44.169`
- [ ] **Step 2**: Verified Node.js 18+: `node --version`
- [ ] **Step 3**: Verified PM2 installed: `pm2 --version`
- [ ] **Step 4**: Verified Nginx running: `nginx -v`
- [ ] **Step 5**: Checked existing PM2 apps: `pm2 list`

---

## Application Setup (20 minutes)

- [ ] **Step 6**: Created directory: `sudo mkdir -p /opt/gamr`
- [ ] **Step 7**: Set permissions: `sudo chown -R $USER:$USER   `
- [ ] **Step 8**: Cloned repository: `cd /opt/gamr && git clone https://github.com/bkourouma/GAMR_SITE.git .`
- [ ] **Step 9**: Installed pnpm: `npm install -g pnpm`
- [ ] **Step 10**: Installed dependencies: `pnpm install`
- [ ] **Step 11**: Built app: `pnpm build` (success message received)
- [ ] **Step 12**: Chose available port: `3003` (or: **\_\_**)
- [ ] **Step 13**: Created logs directory: `mkdir -p /opt/gamr/logs`

---

## PM2 Configuration (10 minutes)

- [ ] **Step 14**: Created `ecosystem.config.js` file
- [ ] **Step 15**: Started PM2 app: `pm2 start ecosystem.config.js`
- [ ] **Step 16**: Saved PM2 config: `pm2 save`
- [ ] **Step 17**: Setup startup: `pm2 startup` (followed command output)
- [ ] **Step 18**: Verified status online: `pm2 list` (green "online" status)
- [ ] **Step 19**: Tested locally: `curl http://localhost:3003` (HTML returned)

---

## Nginx Configuration (15 minutes)

- [ ] **Step 20**: Created Nginx config: `sudo nano /etc/nginx/sites-available/gamr.engage-360.net`
- [ ] **Step 21**: Pasted configuration (port matches your PM2 port)
- [ ] **Step 22**: Saved file (Ctrl+X, Y, Enter)
- [ ] **Step 23**: Enabled site: `sudo ln -s /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-enabled/`
- [ ] **Step 24**: Tested config: `sudo nginx -t` (success message)
- [ ] **Step 25**: Reloaded Nginx: `sudo systemctl reload nginx`
- [ ] **Step 26**: Checked Nginx status: `sudo systemctl status nginx` (active/running)

---

## HTTP Testing (5 minutes)

- [ ] **Step 27**: Tested HTTP on server: `curl -I http://gamr.engage-360.net`
- [ ] **Step 28**: Opened in browser: `http://gamr.engage-360.net` (site loads)

---

## SSL Setup (10 minutes)

- [ ] **Step 29**: Installed Certbot: `sudo apt-get install -y certbot python3-certbot-nginx`
- [ ] **Step 30**: Ran Certbot: `sudo certbot --nginx -d gamr.engage-360.net`
- [ ] **Step 31**: Entered email address
- [ ] **Step 32**: Agreed to Terms of Service
- [ ] **Step 33**: Chose redirect option (2)
- [ ] **Step 34**: Certificate obtained successfully
- [ ] **Step 35**: Tested HTTPS: `https://gamr.engage-360.net` (padlock shows secure)

---

## Final Verification (15 minutes)

- [ ] **Step 36**: PM2 status online: `pm2 list`
- [ ] **Step 37**: No errors in logs: `pm2 logs gamr-site --lines 20`
- [ ] **Step 38**: Tested all pages work:
  - [ ] Homepage: `https://gamr.engage-360.net`
  - [ ] Features: `https://gamr.engage-360.net/fonctionnalites`
  - [ ] Solutions: `https://gamr.engage-360.net/solutions`
  - [ ] Pricing: `https://gamr.engage-360.net/tarifs`
  - [ ] About: `https://gamr.engage-360.net/a-propos`
  - [ ] Demo: `https://gamr.engage-360.net/demander-demo`
  - [ ] Trial: `https://gamr.engage-360.net/essai-gratuit`

---

## CRITICAL: Verify Other Sites (5 minutes)

**⚠️ IMPORTANT: Ensure your existing sites still work!**

- [ ] `https://engage-360.net` - Working ✅
- [ ] `https://agents.engage-360.net` - Working ✅
- [ ] `https://chat.engage-360.net` - Working ✅
- [ ] `https://bmi.engage-360.net` - Working ✅

---

## Optional: Deploy Script (5 minutes)

- [ ] **Step 39**: Created deploy script: `sudo nano /opt/gamr/deploy.sh`
- [ ] **Step 40**: Made executable: `chmod +x /opt/gamr/deploy.sh`
- [ ] **Step 41**: Tested script: `/opt/gamr/deploy.sh`

---

## Post-Deployment

- [ ] **Step 42**: Bookmarked monitoring commands
- [ ] **Step 43**: Saved `QUICK_REFERENCE.md` for future use
- [ ] **Step 44**: Tested SSL grade: https://www.ssllabs.com/ssltest/ (A or A+)

---

## 🎉 DEPLOYMENT COMPLETE!

**Your site is live at:** https://gamr.engage-360.net

### Quick Commands for Later:

**View logs:**

```bash
pm2 logs gamr-site
```

**Restart app:**

```bash
pm2 restart gamr-site
```

**Deploy updates:**

```bash
cd /opt/gamr && ./deploy.sh
```

**Check status:**

```bash
pm2 list
```

---

**Total Time**: ~1.5 hours  
**Difficulty**: Intermediate  
**Risk Level**: Low (isolated configuration)

**Need Help?** See `HOSTINGER_VPS_DEPLOYMENT_GUIDE.md` for detailed troubleshooting.
