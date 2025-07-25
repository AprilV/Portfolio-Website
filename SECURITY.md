# Security Implementation for Portfolio Website

## Overview

Your portfolio website now includes comprehensive security measures to protect both your site and visitor data. This is especially important since you're collecting contact information from potential employers.

## Security Features Implemented

### 1. **Rate Limiting Protection**
- **Contact Form**: Limited to 5 submissions per IP address every 15 minutes
- **Admin Access**: Limited to 100 requests per IP every 15 minutes  
- **General API**: Limited to 200 requests per IP every 15 minutes
- **Prevents**: Spam submissions, brute force attacks, API abuse

### 2. **Security Headers (Helmet.js)**
- **Content Security Policy (CSP)**: Prevents XSS attacks
- **HTTP Strict Transport Security (HSTS)**: Forces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer Policy**: Controls referrer information

### 3. **Input Sanitization**
- **XSS Protection**: Removes dangerous HTML/JavaScript from all inputs
- **Script Injection Prevention**: Blocks `<script>`, `<iframe>`, and `javascript:` content
- **Form Validation**: Enforces proper email format, message length limits
- **SQL Injection Prevention**: Uses parameterized queries via Drizzle ORM

### 4. **Admin Authentication**
- **Token-Based Access**: Admin areas require authentication token
- **Development Exception**: Local development allows easy access
- **Protected Endpoints**: All admin routes require valid authentication
- **Session Management**: Secure session handling for admin access

### 5. **CORS Configuration**  
- **Production**: Only allows requests from aprilsykes.com domains
- **Development**: Allows localhost for testing
- **Credential Support**: Secure handling of authentication cookies
- **Method Restrictions**: Only allows necessary HTTP methods

### 6. **Request Monitoring**
- **Suspicious Activity Detection**: Monitors for common attack patterns
- **Admin Access Logging**: Tracks all admin area access attempts  
- **IP Tracking**: Logs IP addresses for security analysis
- **Attack Pattern Recognition**: Detects PHP, WordPress, SQL injection attempts

### 7. **Data Validation**
- **Email Format Validation**: Ensures proper email addresses
- **Length Limits**: Prevents oversized data submissions
- **Required Field Enforcement**: Ensures all necessary data is provided
- **Character Sanitization**: Removes potentially dangerous characters

## Security Configuration

### Environment Variables Required:
```
ADMIN_TOKEN=your_secure_random_token_here
SESSION_SECRET=your_session_secret_here
SENDGRID_API_KEY=your_sendgrid_key
NOTIFICATION_EMAIL=aprilv120@gmail.com
```

### Optional Security Settings:
```
ALLOWED_ORIGINS=https://aprilsykes.com,https://www.aprilsykes.com
ADMIN_IP_WHITELIST=192.168.1.100,10.0.0.1
CONTACT_FORM_RATE_LIMIT=5
ADMIN_RATE_LIMIT=100
API_RATE_LIMIT=200
```

## Why This Security Matters for Your Career

### **Protecting Employer Data**
- Contact information from hiring managers is securely stored
- Email addresses and company details are protected from data breaches
- Professional communications remain confidential

### **Maintaining Professional Image**
- Security headers ensure your site meets enterprise standards
- Rate limiting prevents your site from being overwhelmed by spam
- Proper error handling maintains a professional appearance

### **Compliance & Trust**
- Security measures demonstrate technical competency to IT employers
- Shows understanding of data protection principles
- Builds trust with potential employers submitting sensitive information

## Security Monitoring

### **Automatic Threat Detection**
- Suspicious requests are logged with IP addresses and timestamps
- Common attack patterns are detected and blocked
- Admin access attempts are monitored and recorded

### **Security Alerts**
- Failed authentication attempts are logged
- Unusual activity patterns trigger warnings
- System health checks monitor security service status

## Best Practices Implemented

1. **Defense in Depth**: Multiple security layers protect your site
2. **Least Privilege**: Admin access is restricted and monitored
3. **Input Validation**: All data is validated and sanitized
4. **Secure Communication**: HTTPS enforced, secure headers applied
5. **Activity Monitoring**: All security events are logged
6. **Regular Updates**: Security dependencies are kept current

## Admin Security Features

### **Protected Admin Routes**
- `/admin` - Dashboard with authentication required
- `/admin/contacts` - Contact management with admin access only
- `/admin/settings` - Configuration panel with security controls
- `/admin/export` - Data export with authentication required

### **Admin Security Controls**
- IP whitelist configuration for admin access
- Session timeout settings
- Password protection toggle
- Security status monitoring

Your portfolio website now has enterprise-grade security suitable for collecting sensitive employment-related information while maintaining the professional standards expected in IT and project management roles.