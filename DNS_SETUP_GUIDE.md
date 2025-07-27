# DNS Setup Guide - www.aprilsykes.com Configuration

## Issue Identified
The www subdomain (www.aprilsykes.com) is not resolving because it's not configured in your domain's DNS settings. The main domain aprilsykes.com works perfectly, but visitors typing www.aprilsykes.com get an error.

## Current Status
✅ **aprilsykes.com** - Working perfectly  
❌ **www.aprilsykes.com** - DNS not configured (returns "Could not resolve host")

## Solution: Configure WWW Subdomain

### Step 1: Access Your DNS Settings
1. Log into your domain registrar (where you purchased aprilsykes.com)
2. Navigate to DNS Management or DNS Settings
3. Look for the DNS Records section

### Step 2: Add WWW Record (Choose One Option)

#### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: www
Value: aprilsykes.com
TTL: 3600 (1 hour)
```

#### Option B: A Record (Alternative)
```
Type: A
Name: www
Value: [Same IP address as aprilsykes.com]
TTL: 3600 (1 hour)
```

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

## Common Domain Registrars

### Namecheap
1. Login → Domain List → Manage
2. Advanced DNS → Add New Record
3. Type: CNAME, Host: www, Value: aprilsykes.com

### GoDaddy
1. Login → My Products → Domains → Manage DNS
2. Add Record → CNAME → Name: www, Value: aprilsykes.com

### Cloudflare
1. Login → Select Domain → DNS → Records
2. Add record → CNAME → Name: www, Target: aprilsykes.com

### Google Domains
1. Login → My domains → Manage → DNS
2. Custom records → Create new record
3. Type: CNAME, Name: www, Data: aprilsykes.com

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