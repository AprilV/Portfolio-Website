# ProtonMail Professional Email Setup for aprilsykes.com

## Overview
This guide will help you set up professional email forwarding using ProtonMail with your aprilsykes.com domain, allowing you to receive emails at april@aprilsykes.com directly in your ProtonMail account.

## Prerequisites
- You own the aprilsykes.com domain
- You have an active ProtonMail account
- Access to your domain's DNS settings (same place where you added the www subdomain)

## Step 1: Add MX Records for Email Routing

### Where to Add These Records
Go to the same DNS management area where you added the www.aprilsykes.com A record.

### Required MX Records
Add these two MX (Mail Exchange) records to your domain:

```
Record Type: MX
Name: @ (or leave blank for root domain)
Value: mail.protonmail.ch
Priority: 10
TTL: Auto or 3600

Record Type: MX  
Name: @ (or leave blank for root domain)
Value: mailsec.protonmail.ch
Priority: 20
TTL: Auto or 3600
```

### Important Notes:
- The `@` symbol represents your root domain (aprilsykes.com)
- Priority 10 is higher than Priority 20 (lower numbers = higher priority)
- These records tell email servers where to deliver mail for your domain

## Step 2: Add SPF Record (Optional but Recommended)

Add this TXT record for better email deliverability:

```
Record Type: TXT
Name: @ (or leave blank for root domain)
Value: v=spf1 include:_spf.protonmail.ch mx ~all
TTL: Auto or 3600
```

## Step 3: Set Up Custom Domain in ProtonMail

### Access ProtonMail Settings
1. Log into your ProtonMail account
2. Click on **Settings** (gear icon)
3. Go to **All Settings**
4. Navigate to **Custom Domains** in the left sidebar

### Add Your Domain
1. Click **Add Domain**
2. Enter: `aprilsykes.com`
3. Follow ProtonMail's domain verification steps
4. They will provide specific verification records to add to your DNS

### Create Email Address
Once verified, you can create:
- april@aprilsykes.com
- contact@aprilsykes.com
- Any other addresses you want

## Step 4: DNS Propagation Wait

After adding the MX records:
- **Propagation time**: 1-24 hours (usually within 2-4 hours)
- **Test with**: Send an email to april@aprilsykes.com from another email account
- **Verification**: Check if it arrives in your ProtonMail inbox

## Step 5: Update Portfolio Contact Information

Once working, we can update your portfolio to show:
- **Professional Email**: april@aprilsykes.com
- **Contact Form**: Still works through SendGrid to your Gmail
- **Email Signatures**: Use the professional domain address

## Troubleshooting

### If Emails Don't Arrive
1. **Check DNS propagation**: Use online DNS checker tools
2. **Verify MX records**: Ensure they point to ProtonMail servers
3. **Check spam folder**: Initial emails might be filtered
4. **Contact ProtonMail support**: They can verify domain setup

### If ProtonMail Domain Verification Fails
1. **Double-check DNS records**: Ensure exact match with their requirements
2. **Wait for propagation**: DNS changes can take time
3. **Clear DNS cache**: Your computer might cache old DNS information

## Professional Benefits

With this setup, you'll have:
- **Professional email address**: april@aprilsykes.com for job applications
- **Brand consistency**: Email matches your website domain
- **ProtonMail security**: End-to-end encryption and privacy
- **Multiple addresses**: Create role-specific emails (contact@, careers@, etc.)

## Next Steps

1. Add the MX records to your DNS
2. Set up domain verification in ProtonMail
3. Create your professional email address
4. Test email delivery
5. Update portfolio and resume with new professional email

## Support Resources

- **ProtonMail Support**: https://protonmail.com/support
- **DNS Propagation Checker**: https://www.whatsmydns.net
- **MX Record Checker**: https://mxtoolbox.com

---

Need help with any of these steps? Let me know and I can guide you through the specific DNS configuration process.