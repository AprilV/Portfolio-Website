# DEPLOYMENT GUIDE - April V. Sykes Portfolio

## Quick Deployment Steps

### 1. Deploy via Replit (Recommended)
1. Click the **"Deploy"** button at the top of your Replit workspace
2. Choose **"Autoscale"** deployment type for best performance
3. Set environment variables if prompted:
   - `DATABASE_URL` (already configured)
   - `SENDGRID_API_KEY` (if email notifications needed)
4. Click **"Deploy"** - you'll get a `.replit.app` URL immediately

### 2. Production Build Ready
✅ Application is production-ready with:
- Optimized Vite build configuration
- Express server bundle
- Security headers and HTTPS enforcement
- Database connection configured
- All assets optimized

### 3. Custom Domain Setup (Optional)
If you want to use `aprilsykes.com`:
1. Deploy first to get the Replit URL
2. Go to your domain registrar (where you bought aprilsykes.com)
3. Add CNAME record pointing to your `.replit.app` domain
4. Configure custom domain in Replit deployment settings

## Deployment Files Created
- `.replit.yaml` - Replit deployment configuration
- `Dockerfile` - Container deployment (if needed)
- Production build optimized for performance

## Post-Deployment Checklist
- [ ] Test all portfolio sections load correctly
- [ ] Verify contact form submission works
- [ ] Test admin login functionality
- [ ] Confirm mobile responsiveness
- [ ] Check SSL certificate is active

## Troubleshooting
- If deployment fails, check the deployment logs
- Ensure DATABASE_URL environment variable is set
- Verify all dependencies are properly installed

**Ready to deploy!** Click the Deploy button in your Replit workspace.