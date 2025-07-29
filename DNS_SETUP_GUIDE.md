# DNS Setup Guide for www.aprilsykes.com

## Current Issue
The www subdomain verification failed because the required DNS records are not configured at your domain registrar.

## Required DNS Records

### 1. A Record for www subdomain
```
Name/Host: www
Type: A
Value: 34.111.179.208
TTL: 3600 (or Auto)
```

### 2. TXT Record for www subdomain
```
Name/Host: www
Type: TXT
Value: replit-verify=e1da66e2-bd09-43f
TTL: 3600 (or Auto)
```

## Step-by-Step Instructions

### Step 1: Access Your Domain Registrar
1. Log into the website where you purchased aprilsykes.com
2. Navigate to DNS Management or Domain Settings
3. Look for "DNS Records", "DNS Zone", or "Nameserver Management"

### Step 2: Add A Record
1. Click "Add Record" or "New Record"
2. Select Type: A
3. Name/Host: www
4. Value/Points to: 34.111.179.208
5. TTL: 3600 (or leave default)
6. Save the record

### Step 3: Add TXT Record
1. Click "Add Record" or "New Record" again
2. Select Type: TXT
3. Name/Host: www
4. Value: replit-verify=e1da66e2-bd09-43f
5. TTL: 3600 (or leave default)
6. Save the record

### Step 4: Wait for Propagation
- DNS changes can take 5 minutes to 48 hours to propagate
- Most changes are live within 1-2 hours
- Replit will automatically verify once records are detected

## Common Registrar Interfaces

### If using Name.com:
- Go to Account → My Domains → Manage → DNS Records
- Add both A and TXT records as described above

### If using GoDaddy:
- Go to My Products → DNS → Manage Zones
- Add both records in the DNS management interface

### If using Cloudflare:
- Go to DNS → Records
- Add both A and TXT records
- Ensure proxy status is "DNS only" (grey cloud) for both

## Verification Status
Once DNS records are added and propagated:
- Replit will automatically detect the records
- The domain status will change from "Failed" to "Verified"
- No further action needed on Replit side

## Troubleshooting
If verification continues to fail after 24 hours:
1. Double-check the exact spelling of TXT record value
2. Ensure no extra spaces in DNS record values
3. Contact your domain registrar for DNS support

## Current Status
- ✅ Root domain (aprilsykes.com) - Verified and working
- ❌ WWW subdomain (www.aprilsykes.com) - DNS records needed
- ✅ Server configuration - Ready for both domains