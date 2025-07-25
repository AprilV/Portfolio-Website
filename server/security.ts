import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Rate limiting for contact form submissions
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for admin endpoints
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs for admin
  message: {
    error: 'Too many admin requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: {
    error: 'Too many API requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security headers configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Note: unsafe-eval needed for Vite in dev
      connectSrc: ["'self'", "wss:", "ws:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

// CORS configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://aprilsykes.com', 'https://www.aprilsykes.com']
    : ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// Input sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    if (typeof str !== 'string') return str;
    
    // Remove potentially dangerous characters
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  };

  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj !== null && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  next();
};

// Admin session management
const adminSessions = new Set<string>();

// Admin authentication middleware with proper session management
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.adminSession;
  
  if (!sessionToken || !adminSessions.has(sessionToken)) {
    console.log(`🚫 UNAUTHORIZED ADMIN ACCESS ATTEMPT: ${req.method} ${req.path} from ${req.ip} at ${new Date().toISOString()}`);
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized - Admin authentication required" 
    });
  }
  
  console.log(`✅ AUTHENTICATED ADMIN ACCESS: ${req.method} ${req.path} at ${new Date().toISOString()}`);
  next();
};

// Admin login function
export const authenticateAdmin = (password: string): string | null => {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (password !== adminPassword) {
    return null;
  }
  
  // Generate secure session token
  const sessionToken = crypto.randomBytes(32).toString('hex');
  adminSessions.add(sessionToken);
  
  // Auto-expire session after 4 hours
  setTimeout(() => {
    adminSessions.delete(sessionToken);
  }, 4 * 60 * 60 * 1000);
  
  return sessionToken;
};

// Admin logout function
export const logoutAdmin = (sessionToken: string): boolean => {
  return adminSessions.delete(sessionToken);
};

// Change admin password function
export const changeAdminPassword = (currentPassword: string, newPassword: string): boolean => {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (currentPassword !== adminPassword) {
    return false;
  }
  
  // In production, this would update the environment variable or database
  // For now, we'll just validate the change but note it can't persist across restarts
  console.log(`🔑 ADMIN PASSWORD CHANGE REQUESTED: New password would be set to: ${newPassword}`);
  console.log(`⚠️  NOTE: Password change cannot persist across server restarts without environment variable update`);
  
  return true;
};

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  
  // Log suspicious activity
  const suspiciousPatterns = [
    /\.(php|asp|jsp)$/i,
    /wp-admin|wordpress|wp-content/i,
    /admin\.php|config\.php/i,
    /<script|javascript:|eval\(/i,
    /union.*select|drop.*table|insert.*into/i
  ];

  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(req.url) || pattern.test(req.get('User-Agent') || '')
  );

  if (isSuspicious) {
    console.warn(`🚨 SUSPICIOUS REQUEST: ${timestamp} - IP: ${ip} - ${req.method} ${req.url} - UA: ${userAgent}`);
  }

  // Log admin access
  if (req.url.startsWith('/admin')) {
    console.log(`🔐 ADMIN ACCESS: ${timestamp} - IP: ${ip} - ${req.method} ${req.url}`);
  }

  next();
};

// Generate secure admin token
export const generateAdminToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validate contact form data
export const validateContactData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (data.company && data.company.length > 100) {
    errors.push('Company name must be less than 100 characters');
  }

  if (data.message && data.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// IP whitelist checking
export const checkIPWhitelist = (allowedIPs: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (allowedIPs.length === 0) {
      return next();
    }

    const clientIP = req.ip || req.connection.remoteAddress || '';
    
    if (!allowedIPs.includes(clientIP)) {
      console.warn(`🚫 BLOCKED IP: ${clientIP} attempted to access ${req.url}`);
      return res.status(403).json({ error: 'Access denied from this IP address' });
    }

    next();
  };
};