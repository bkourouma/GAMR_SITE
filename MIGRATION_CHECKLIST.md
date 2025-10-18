# ✅ GAMR Migration Checklist

## gamr.engage-360.net → gestionrisques.com

---

## 📋 Pre-Migration (Do on Hostinger)

- [ ] Log into Hostinger control panel
- [ ] Go to DNS Zone Editor for `gestionrisques.com`
- [ ] Add A record: `@` → `147.93.44.169`
- [ ] Add A record: `www` → `147.93.44.169`
- [ ] Wait 15-30 minutes for DNS propagation
- [ ] Verify DNS: `nslookup gestionrisques.com` returns `147.93.44.169`

---

## 🔧 Migration Steps (Do on VPS)

- [ ] SSH into VPS: `ssh root@147.93.44.169`
- [ ] Backup old config: `sudo cp /etc/nginx/sites-available/gamr.engage-360.net /etc/nginx/sites-available/gamr.engage-360.net.backup`
- [ ] Create new Nginx config: `/etc/nginx/sites-available/gestionrisques.com`
- [ ] Enable new site: `sudo ln -s /etc/nginx/sites-available/gestionrisques.com /etc/nginx/sites-enabled/`
- [ ] Test Nginx: `sudo nginx -t`
- [ ] Reload Nginx: `sudo systemctl reload nginx`
- [ ] Test HTTP: `curl -I http://gestionrisques.com`
- [ ] Install SSL: `sudo certbot --nginx -d gestionrisques.com -d www.gestionrisques.com`
- [ ] Test HTTPS in browser: `https://gestionrisques.com`
- [ ] Configure old domain redirect (optional)
- [ ] Test redirect: `https://gamr.engage-360.net` → `https://gestionrisques.com`

---

## ✅ Final Verification

- [ ] `https://gestionrisques.com` loads with padlock 🔒
- [ ] All pages work: /fonctionnalites, /solutions, /tarifs, /a-propos
- [ ] Forms work: /demander-demo, /essai-gratuit
- [ ] Images display correctly
- [ ] Old domain redirects to new domain
- [ ] PM2 status: `pm2 list` shows "online"
- [ ] No errors in logs: `pm2 logs gamr-site --lines 20`
- [ ] Other sites still work:
  - [ ] https://engage-360.net
  - [ ] https://agents.engage-360.net
  - [ ] https://chat.engage-360.net
  - [ ] https://bmi.engage-360.net

---

## 📅 Estimated Time

- DNS Configuration: 5 minutes
- DNS Propagation Wait: 15-30 minutes
- VPS Configuration: 10 minutes
- SSL Installation: 5 minutes
- **Total: ~30-45 minutes**

---

## 🚀 Ready to Start?

**Step 1**: Configure DNS on Hostinger (see Pre-Migration section)  
**Step 2**: Wait for DNS propagation  
**Step 3**: Run migration commands on VPS (see MIGRATE_TO_GESTIONRISQUES.md)

---

## 📞 Need Help?

See detailed instructions in: `MIGRATE_TO_GESTIONRISQUES.md`
