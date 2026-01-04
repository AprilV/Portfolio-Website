# EC2 Deployment Guide - aprilsykes.dev

## Overview
Deploy your portfolio to AWS EC2 with custom domain **aprilsykes.dev** from Namecheap.

---

## Prerequisites Checklist
- [ ] AWS EC2 instance (Ubuntu 22.04 LTS recommended)
- [ ] EC2 instance running and accessible via SSH
- [ ] Security group allows HTTP (80) and HTTPS (443)
- [ ] Domain: aprilsykes.dev registered on Namecheap
- [ ] SSH key pair for EC2 access

---

## Part 1: Build Production Files

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build for Production
```bash
npm run build
```

This creates:
- `dist/` - Frontend files (HTML, CSS, JS)
- `dist/index.js` - Backend server bundle

---

## Part 2: EC2 Server Setup

### Step 1: Connect to EC2
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

### Step 2: Install Node.js 20
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x
npm --version
```

### Step 3: Install nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Step 4: Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Step 5: Create Application Directory
```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R ubuntu:ubuntu /var/www/portfolio
```

---

## Part 3: Upload Files to EC2

### Option A: Using SCP (from your local machine)
```bash
# Navigate to your project directory
cd "c:\ReactGitEC2\Portfolio Web\Portfolio Website"

# Upload dist folder
scp -i your-key.pem -r dist ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/portfolio/

# Upload package files
scp -i your-key.pem package.json ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/portfolio/
scp -i your-key.pem package-lock.json ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/portfolio/

# Upload node_modules (or install on server)
scp -i your-key.pem -r node_modules ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/portfolio/
```

### Option B: Using Git (recommended)
```bash
# On EC2 server
cd /var/www/portfolio
git clone YOUR_GITHUB_REPO_URL .
npm install --production
npm run build
```

---

## Part 4: Configure Database

### Step 1: Set Up PostgreSQL Database
```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE portfolio;
CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;
\q
```

### Step 2: Configure Environment Variables
```bash
# Create .env file on EC2
cd /var/www/portfolio
nano .env
```

Add this content:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://portfolio_user:your_secure_password@localhost:5432/portfolio
SENDGRID_API_KEY=your_sendgrid_key_here
```

### Step 3: Run Database Migrations
```bash
cd /var/www/portfolio
npm run db:push
```

---

## Part 5: Configure nginx as Reverse Proxy

### Step 1: Create nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name aprilsykes.dev www.aprilsykes.dev;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static files
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase upload size for contact form
    client_max_body_size 10M;
}
```

### Step 2: Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Part 6: Set Up PM2 Process Manager

### Step 1: Install PM2
```bash
sudo npm install -g pm2
```

### Step 2: Start Application
```bash
cd /var/www/portfolio
pm2 start dist/index.js --name portfolio
pm2 save
pm2 startup
```

### Step 3: Verify Application
```bash
pm2 status
pm2 logs portfolio
```

---

## Part 7: Configure Namecheap DNS

### Step 1: Get EC2 Public IP
```bash
# On EC2, run:
curl http://checkip.amazonaws.com
```

### Step 2: Configure DNS Records in Namecheap

1. Log into **Namecheap**
2. Go to **Domain List** → Click **Manage** next to aprilsykes.dev
3. Go to **Advanced DNS** tab
4. Add these records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | YOUR_EC2_PUBLIC_IP | Automatic |
| A Record | www | YOUR_EC2_PUBLIC_IP | Automatic |

5. Click **Save All Changes**

### Step 3: Wait for DNS Propagation
- DNS changes take 5 minutes to 48 hours
- Usually live within 30 minutes

### Step 4: Test DNS
```bash
# From your local machine
nslookup aprilsykes.dev
ping aprilsykes.dev
```

---

## Part 8: Install SSL Certificate (HTTPS)

### Step 1: Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2: Get SSL Certificate
```bash
sudo certbot --nginx -d aprilsykes.dev -d www.aprilsykes.dev
```

Follow prompts:
- Enter email address
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### Step 3: Verify Auto-Renewal
```bash
sudo certbot renew --dry-run
```

---

## Part 9: Verification Checklist

### Test Your Deployment
- [ ] Visit http://aprilsykes.dev (should work)
- [ ] Visit https://aprilsykes.dev (should have SSL)
- [ ] Visit www.aprilsykes.dev (should work)
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Verify all sections load properly
- [ ] Test admin login functionality

### Check Server Status
```bash
# On EC2
pm2 status
pm2 logs portfolio
sudo systemctl status nginx
sudo systemctl status postgresql
```

---

## Part 10: Maintenance Commands

### View Application Logs
```bash
pm2 logs portfolio
pm2 logs portfolio --lines 100
```

### Restart Application
```bash
pm2 restart portfolio
```

### Update Application
```bash
cd /var/www/portfolio
git pull
npm install --production
npm run build
pm2 restart portfolio
```

### Monitor Resources
```bash
pm2 monit
htop
df -h
```

### Database Backup
```bash
sudo -u postgres pg_dump portfolio > portfolio_backup_$(date +%Y%m%d).sql
```

---

## Troubleshooting

### Application Won't Start
```bash
# Check logs
pm2 logs portfolio --err

# Check if port 5000 is in use
sudo lsof -i :5000

# Restart
pm2 restart portfolio
```

### nginx Issues
```bash
# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/error.log

# Restart nginx
sudo systemctl restart nginx
```

### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -l

# Verify .env file has correct DATABASE_URL
cat /var/www/portfolio/.env
```

### DNS Not Working
- Wait longer (up to 48 hours for full propagation)
- Clear DNS cache on your computer
- Check DNS with: `nslookup aprilsykes.dev`
- Verify A records in Namecheap point to correct IP

### SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Verify nginx SSL config
sudo nginx -t
```

---

## Security Best Practices

### Firewall Setup
```bash
# Enable firewall
sudo ufw enable

# Allow SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
```

### Keep System Updated
```bash
sudo apt update && sudo apt upgrade -y
```

### Regular Backups
- Set up automated database backups
- Use AWS snapshots for EC2 volumes
- Keep code in Git repository

---

## Quick Reference

### Important Paths
- Application: `/var/www/portfolio`
- nginx config: `/etc/nginx/sites-available/portfolio`
- SSL certificates: `/etc/letsencrypt/live/aprilsykes.dev/`
- Logs: `~/.pm2/logs/`

### Important Commands
```bash
# Application
pm2 restart portfolio
pm2 logs portfolio

# nginx
sudo systemctl reload nginx
sudo nginx -t

# Database
sudo -u postgres psql portfolio
```

### Environment Variables
Located at: `/var/www/portfolio/.env`
- `NODE_ENV=production`
- `PORT=5000`
- `DATABASE_URL=postgresql://...`
- `SENDGRID_API_KEY=...`

---

## Next Steps After Deployment

1. ✅ Set up monitoring (PM2, CloudWatch)
2. ✅ Configure automated backups
3. ✅ Set up error tracking (optional: Sentry)
4. ✅ Configure CDN (optional: CloudFront)
5. ✅ Set up CI/CD pipeline (optional: GitHub Actions)

---

**Your portfolio will be live at:** 
- https://aprilsykes.dev
- https://www.aprilsykes.dev

Good luck with your deployment! 🚀
