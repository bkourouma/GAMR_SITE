# 🚀 GAMR Site - Quick Reference Card

## Essential Information

- **Domain**: `gamr.engage-360.net`
- **Server IP**: `147.93.44.169`
- **App Directory**: `/opt/gamr`
- **Port**: `3003`
- **Process Name**: `gamr-site`

---

## Quick Commands

### Connect to Server

```bash
ssh root@147.93.44.169
```

### Application Management

```bash
# View status
pm2 list

# Restart app
pm2 restart gamr-site

# Stop app
pm2 stop gamr-site

# Start app
pm2 start gamr-site

# View logs (real-time)
pm2 logs gamr-site

# View last 50 log lines
pm2 logs gamr-site --lines 50
```

### Deploy Updates

```bash
cd /opt/gamr
./deploy.sh
```

### Nginx Management

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/gamr.engage-360.net.error.log

# View access logs
sudo tail -f /var/log/nginx/gamr.engage-360.net.access.log
```

### SSL Certificate

```bash
# Renew certificate manually
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run

# View certificate info
sudo certbot certificates
```

### Troubleshooting

```bash
# Check what's using a port
sudo lsof -i :3003

# Check server resources
htop
# or
pm2 monit

# View all PM2 apps
pm2 list

# Clear Next.js cache
cd /opt/gamr
rm -rf .next
pnpm build
pm2 restart gamr-site
```

---

## File Locations

- **App Directory**: `/opt/gamr`
- **Nginx Config**: `/etc/nginx/sites-available/gamr.engage-360.net`
- **Nginx Enabled**: `/etc/nginx/sites-enabled/gamr.engage-360.net`
- **PM2 Config**: `/opt/gamr/ecosystem.config.js`
- **Deploy Script**: `/opt/gamr/deploy.sh`
- **App Logs**: `/opt/gamr/logs/`
- **Nginx Logs**: `/var/log/nginx/gamr.engage-360.net.*`

---

## Emergency Procedures

### Site Down

```bash
pm2 restart gamr-site
sudo systemctl reload nginx
```

### Complete Restart

```bash
pm2 stop gamr-site
pm2 start gamr-site
sudo systemctl restart nginx
```

### Rollback

```bash
cd /opt/gamr
git log --oneline  # Find previous commit
git reset --hard <commit-hash>
pnpm install
pnpm build
pm2 restart gamr-site
```

---

## Health Checks

**Check if site is up:**

```bash
curl -I https://gamr.engage-360.net
```

**Expected**: HTTP/2 200

**Check PM2 status:**

```bash
pm2 list
```

**Expected**: Status = `online` (green)

**Check Nginx:**

```bash
sudo systemctl status nginx
```

**Expected**: Active (running)

---

## Monitoring URLs

- **Site**: https://gamr.engage-360.net
- **SSL Test**: https://www.ssllabs.com/ssltest/analyze.html?d=gamr.engage-360.net
- **Uptime Check**: Setup at https://uptimerobot.com (recommended)

---

## Support Contacts

- **Full Deployment Guide**: `HOSTINGER_VPS_DEPLOYMENT_GUIDE.md`
- **Project README**: `README.md`
- **Spec**: `specs/001-site-marketing-gamr/spec.md`
