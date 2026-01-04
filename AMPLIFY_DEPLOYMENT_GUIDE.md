# AWS Amplify Deployment Guide - aprilsykes.dev

## Overview
Deploy your portfolio to AWS Amplify with automatic GitHub deployments and custom domain **aprilsykes.dev**.

**Your Workflow:**
```
VS Code → Git Push → GitHub → Amplify Auto-Deploy → aprilsykes.dev
```

---

## Prerequisites
- [ ] GitHub account
- [ ] AWS account (free tier works)
- [ ] Domain: aprilsykes.dev on Namecheap
- [ ] Code pushed to GitHub repository

---

## Part 1: Push to GitHub

### Step 1: Initialize Git (if not already done)
```powershell
cd "c:\ReactGitEC2\Portfolio Web\Portfolio Website"
git init
git add .
git commit -m "Initial commit - Portfolio ready for deployment"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `portfolio` (or whatever you prefer)
3. Set to **Public** or **Private** (both work)
4. Do NOT initialize with README (you already have code)
5. Click **Create repository**

### Step 3: Push to GitHub
```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy to AWS Amplify

### Step 1: Sign in to AWS Amplify
1. Go to https://console.aws.amazon.com/amplify/
2. Sign in to AWS Console
3. Click **Get Started** under "Amplify Hosting"

### Step 2: Connect GitHub Repository
1. Click **GitHub**
2. Click **Authorize AWS Amplify** (if first time)
3. Select your repository: `portfolio`
4. Select branch: `main`
5. Click **Next**

### Step 3: Configure Build Settings

Amplify should auto-detect your app. Use this build configuration:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**Important Settings:**
- **App name:** AprilSykes-Portfolio (or your choice)
- **Environment:** production
- **Branch:** main
- **Build settings:** Use the config above

Click **Next**

### Step 4: Review and Deploy
1. Review all settings
2. Click **Save and deploy**
3. Wait 3-5 minutes for initial deployment
4. You'll get a URL like: `https://main.d1234abcd.amplifyapp.com`

### Step 5: Test Your Deployment
1. Click the Amplify URL
2. Verify your portfolio loads correctly
3. Test all sections and contact form
4. Check mobile responsiveness

---

## Part 3: Connect Custom Domain (aprilsykes.dev)

### Step 1: In AWS Amplify Console
1. In your Amplify app, click **Domain management** (left sidebar)
2. Click **Add domain**
3. Enter: `aprilsykes.dev`
4. Click **Configure domain**

### Step 2: Amplify Shows DNS Instructions
Amplify will show you the DNS records needed. It looks like:

**For Namecheap, you'll see:**
- CNAME record for `www`
- ANAME/ALIAS or CNAME for root domain `@`

Copy these values - we'll use them in Namecheap.

### Step 3: Configure Namecheap DNS

1. Log into **Namecheap**
2. Go to **Domain List**
3. Click **Manage** next to aprilsykes.dev
4. Click **Advanced DNS** tab
5. Delete any existing A records for @ and www

**Add these records from Amplify:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | www | [Value from Amplify] | Automatic |
| CNAME Record | @ | [Value from Amplify] | Automatic |

**Note:** If Namecheap doesn't support CNAME for @ (root domain), use:
- Type: **ALIAS** or **URL Redirect Record**
- Or contact Namecheap support for root domain CNAME

Alternative if CNAME doesn't work for root:
1. In Namecheap, set **ALIAS** to point @ to the Amplify domain
2. Keep www as CNAME

6. Click **Save All Changes**

### Step 4: Wait for DNS Propagation
- DNS changes take 5-48 hours
- Usually live within 30 minutes to 2 hours
- Amplify will automatically verify and issue SSL certificate

### Step 5: Verify in Amplify
1. Back in Amplify Console → Domain management
2. Wait for status to change from "Pending verification" to "Available"
3. SSL certificate will be automatically issued
4. Both domains will be live with HTTPS:
   - https://aprilsykes.dev
   - https://www.aprilsykes.dev

---

## Part 4: Environment Variables (If Needed)

If you need environment variables (like for SendGrid email API):

1. In Amplify Console, click **Environment variables** (left sidebar)
2. Click **Manage variables**
3. Add your variables:
   ```
   VITE_SENDGRID_API_KEY=your_key_here
   VITE_CONTACT_EMAIL=april@aprilsykes.dev
   ```
4. Click **Save**
5. Trigger a new deployment (it will rebuild with new variables)

---

## Part 5: Your Daily Workflow

### Making Updates

```powershell
# 1. Make changes in VS Code
# Edit your files...

# 2. Test locally
npm run dev

# 3. Commit and push to GitHub
git add .
git commit -m "Updated portfolio content"
git push

# 4. Amplify automatically deploys!
# Check deployment status in Amplify Console
```

### Monitoring Deployments
1. Go to Amplify Console
2. See real-time build logs
3. Get notifications when deployment completes
4. Automatic rollback if build fails

---

## Part 6: Simplify Contact Form (Optional)

Since you don't need a database, you can use a simpler contact form:

### Option A: EmailJS (No Backend Needed)
1. Sign up at https://www.emailjs.com/
2. Free tier: 200 emails/month
3. Update contact form to use EmailJS
4. No server or database needed

### Option B: Formspree
1. Sign up at https://formspree.io/
2. Free tier: 50 submissions/month
3. Simple HTML form submission
4. Emails sent directly to you

### Option C: AWS SES (If staying in AWS)
1. Use AWS Simple Email Service
2. Amplify serverless function
3. Very cheap (~$0.10 per 1000 emails)

Let me know if you want me to set up EmailJS for you!

---

## Cost Breakdown

### AWS Amplify Pricing
- **Free Tier:** 
  - 1000 build minutes/month
  - 15 GB served/month
  - 5 GB storage

- **After Free Tier:**
  - $0.01 per build minute
  - $0.15 per GB served
  - $0.023 per GB storage

**Estimated Cost:** $0-5/month for a portfolio site

### Namecheap Domain
- ~$10-15/year for .dev domain

**Total:** ~$1-7/month (mostly free!)

---

## Troubleshooting

### Build Fails
```powershell
# Check build logs in Amplify Console
# Common issues:
- Missing dependencies (check package.json)
- Environment variables not set
- Build commands incorrect
```

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS records in Namecheap match Amplify exactly
- Use `nslookup aprilsykes.dev` to verify DNS

### SSL Certificate Pending
- Amplify auto-issues Let's Encrypt SSL
- Wait for DNS verification (can take hours)
- Check domain status in Amplify Console

### Contact Form Not Working
- Check environment variables are set
- Verify API keys are correct
- Consider switching to EmailJS for simplicity

---

## Next Steps After Deployment

### Set Up Email Forwarding
If you want april@aprilsykes.dev email:
1. Use Namecheap email forwarding (free)
2. Or ImprovMX (free, better features)
3. Or Google Workspace ($6/month)

### Enable Notifications
1. In Amplify, go to **Notifications**
2. Set up email alerts for deployment status
3. Get notified when builds succeed/fail

### Set Up Branch Deployments (Optional)
1. Create `dev` branch for testing
2. Amplify can auto-deploy to preview URLs
3. Merge to `main` for production

---

## Quick Reference

### Important URLs
- **Amplify Console:** https://console.aws.amazon.com/amplify/
- **Your App:** https://aprilsykes.dev
- **GitHub Repo:** https://github.com/YOUR_USERNAME/portfolio

### Important Commands
```powershell
# Test locally
npm run dev

# Build locally (to test)
npm run build

# Deploy (just push to GitHub!)
git add .
git commit -m "Update message"
git push
```

### Amplify Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

---

## Checklist

- [ ] Code pushed to GitHub
- [ ] Amplify app created and connected
- [ ] Initial deployment successful
- [ ] Custom domain added in Amplify
- [ ] DNS records configured in Namecheap
- [ ] SSL certificate issued (HTTPS working)
- [ ] aprilsykes.dev loads correctly
- [ ] www.aprilsykes.dev loads correctly
- [ ] Contact form tested
- [ ] Mobile responsiveness verified

---

**Your portfolio will be live at:**
- ✅ https://aprilsykes.dev
- ✅ https://www.aprilsykes.dev

**Automatic deployments on every push to main!** 🚀

No server management, no SSH, no manual uploads - just code and push!
