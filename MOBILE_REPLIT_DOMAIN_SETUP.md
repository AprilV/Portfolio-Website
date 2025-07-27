# Mobile Replit App - WWW Domain Setup Guide

## Adding www.aprilsykes.com on Mobile

### Step 1: Open Replit Mobile App
1. Open the Replit app on your phone
2. Navigate to your April Sykes portfolio project
3. Look for the project dashboard

### Step 2: Access Deployments
1. Tap the **"Deployments"** tab or icon
2. Find your current deployment (should show aprilsykes.com)
3. Tap on the deployment to open details

### Step 3: Deployment Settings
1. Look for a **"Settings"** button, gear icon ⚙️, or three dots menu
2. Tap to open deployment settings
3. Scroll down to find **"Custom Domains"** or **"Domains"** section

### Step 4: Add WWW Domain
1. Tap **"Add Domain"** or **"Link Domain"** button
2. Enter: `www.aprilsykes.com`
3. Tap **"Add"** or **"Save"**

### Step 5: Follow DNS Instructions
1. Replit will show DNS record requirements
2. Note down any CNAME or A records needed
3. Tap **"Verify"** once DNS is configured

## Alternative Mobile Method

### If Deployments Tab Not Visible:
1. Tap your profile/project name
2. Look for **"Project Settings"** 
3. Find **"Domains"** or **"Custom Domains"**
4. Add `www.aprilsykes.com`

### If Mobile App Limitations:
1. Open web browser on mobile
2. Go to replit.com and login
3. Navigate to your project
4. Use the web interface for deployment settings

## What Happens Next

Once you add the www domain:
- Replit will provide DNS verification steps
- Your server will automatically redirect www → non-www
- Both URLs will work seamlessly
- HTTPS will be configured automatically

## Mobile Browser Alternative

If the mobile app is limited:
1. Open Chrome/Safari on your phone
2. Go to replit.com
3. Login to your account
4. Find your portfolio project
5. Use "Deployments" → "Settings" → "Add Domain"
6. Enter: www.aprilsykes.com

## Expected Result

✅ www.aprilsykes.com → redirects to aprilsykes.com
✅ Professional 301 redirect preserves SEO
✅ Both domains work with HTTPS
✅ Seamless user experience

Your redirect middleware is already configured perfectly - once Replit recognizes the www domain, it will work automatically.