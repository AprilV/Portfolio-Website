# Adding MX Records in Replit for ProtonMail

## Step-by-Step Instructions

Since your domain aprilsykes.com is hosted by Replit, you can add the MX records directly in the Replit Domains panel.

### 1. Access DNS Settings
- In your Replit Domains panel (where you see aprilsykes.com as "Verified")
- Click the **edit/pencil icon** next to aprilsykes.com
- Look for "DNS Records" or "Custom DNS" section

### 2. Add First MX Record
```
Record Type: MX
Name: @ (or leave blank for root domain)
Value: mail.protonmail.ch
Priority: 10
TTL: Auto or 3600
```

### 3. Add Second MX Record
```
Record Type: MX
Name: @ (or leave blank for root domain) 
Value: mailsec.protonmail.ch
Priority: 20
TTL: Auto or 3600
```

### 4. Add SPF Record (Recommended)
```
Record Type: TXT
Name: @ (or leave blank for root domain)
Value: v=spf1 include:_spf.protonmail.ch mx ~all
TTL: Auto or 3600
```

## What These Records Do

- **MX Records**: Tell email servers where to deliver mail for @aprilsykes.com
- **Priority 10 vs 20**: ProtonMail's primary (10) and backup (20) mail servers
- **SPF Record**: Helps prevent spam and improves email deliverability

## After Adding Records

1. **Propagation**: DNS changes take 1-24 hours to fully propagate
2. **ProtonMail Setup**: Go to ProtonMail Settings → Custom Domains → Add aprilsykes.com
3. **Verification**: ProtonMail will provide additional verification steps
4. **Email Creation**: Create april@aprilsykes.com in your ProtonMail account

## Expected Result

Once complete, you'll have:
- april@aprilsykes.com forwarding to your ProtonMail
- Professional email for job applications and business correspondence
- Secure, encrypted email through ProtonMail infrastructure

## Troubleshooting

If you don't see DNS record options in Replit:
- Look for "Advanced DNS" or "Custom Records"
- Check if there's a separate DNS management section
- Some hosting providers put DNS settings under domain management

The key is finding where Replit allows you to add custom DNS records for your verified domain.