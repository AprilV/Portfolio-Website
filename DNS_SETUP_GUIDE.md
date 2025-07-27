# Replit Domain Setup Guide - www.aprilsykes.com Configuration

## Issue Identified
The www subdomain (www.aprilsykes.com) is not resolving because it needs to be configured in Replit's deployment system. Since your domain is hosted on Replit, you need to add the www subdomain through Replit's custom domain settings.

## Current Status
✅ **aprilsykes.com** - Working perfectly on Replit  
❌ **www.aprilsykes.com** - Not configured in Replit deployment (returns "Could not resolve host")

## Solution: Add WWW Subdomain to Replit Deployment

### Step 1: Access Replit Deployment Settings
1. Go to your Replit project
2. Click on the **"Deployments"** tab at the top
3. Find your current deployment for aprilsykes.com
4. Click **"Settings"** or the gear icon

### Step 2: Add WWW Domain to Replit
1. In the deployment settings, look for **"Custom Domains"** section
2. Click **"Add Domain"** or **"Link a domain"**
3. Enter: `www.aprilsykes.com`
4. Replit will provide you with DNS record requirements

### Step 3: Configure DNS Records (If Required)
Replit may provide you with specific records to add:

#### Typical Replit DNS Requirements:
```
Type: CNAME
Name: www
Value: [Replit provides this - usually like cname.replit.app]
TTL: 3600 (1 hour)
```

### Step 4: Verify Domain in Replit
1. After adding DNS records, return to Replit
2. Click **"Verify"** next to your www domain
3. Wait for verification (usually 5-30 minutes)

### Step 3: Verify Configuration
After adding the DNS record:
1. Wait 5-60 minutes for DNS propagation
2. Test: `curl -I https://www.aprilsykes.com`
3. Should redirect to `https://aprilsykes.com` with 301 status

## How Our Redirect Works

Your server already has proper WWW redirect middleware configured:

```javascript
// WWW redirect middleware - redirects www.aprilsykes.com to aprilsykes.com
app.use((req, res, next) => {
  if (req.headers.host?.startsWith('www.')) {
    const redirectUrl = `https://${req.headers.host.replace('www.', '')}${req.url}`;
    return res.redirect(301, redirectUrl);
  }
  next();
});
```

This means once DNS is configured:
- **www.aprilsykes.com** → Automatically redirects to **aprilsykes.com**
- Maintains SEO value with 301 permanent redirect
- Provides seamless user experience

## Alternative: Direct Replit Configuration

### Option A: Multiple Domain Setup
If Replit allows multiple domains in the same deployment:
1. Add both `aprilsykes.com` AND `www.aprilsykes.com` as separate custom domains
2. Both will point to the same deployment
3. Your server redirect middleware will handle www → non-www redirects

### Option B: DNS-Only Setup (If Replit Doesn't Support Both)
1. Get the IP address of your Replit deployment
2. Add DNS records in your domain registrar:
   ```
   Type: A
   Name: www
   Value: [Your Replit deployment IP]
   TTL: 3600
   ```

### How to Find Your Replit Deployment Details
1. In Replit, go to Deployments → Your deployment
2. Look for "Domain" or "URL" information
3. Note the IP address or CNAME target provided by Replit

## Testing Commands

Once configured, these should work:
```bash
# Should resolve to an IP address
nslookup www.aprilsykes.com

# Should return 301 redirect to aprilsykes.com
curl -I https://www.aprilsykes.com

# Should load the portfolio successfully
curl https://www.aprilsykes.com
```

## Security & SEO Benefits

✅ **SEO Protection**: 301 redirects preserve search engine rankings  
✅ **User Experience**: Both www and non-www URLs work seamlessly  
✅ **Brand Consistency**: Professional domain setup  
✅ **Security**: HTTPS works for both domains  

## Troubleshooting

### DNS Not Propagating
- Wait up to 24 hours for global DNS propagation
- Use different DNS servers to test: `nslookup www.aprilsykes.com 8.8.8.8`

### Still Not Working
1. Verify DNS record syntax exactly matches examples above
2. Ensure there are no conflicting DNS records
3. Check registrar documentation for specific setup steps
4. Contact your domain registrar support if needed

### Test Using Online Tools
- https://dnschecker.org (check global DNS propagation)
- https://www.whatsmydns.net (verify DNS records worldwide)

## Summary

Your portfolio application is perfectly configured for WWW redirects. The only missing piece is the DNS CNAME record at your domain registrar to make www.aprilsykes.com point to your server. Once that's added, visitors can use either URL and will be seamlessly redirected to the canonical aprilsykes.com domain.