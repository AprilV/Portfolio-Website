import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { db } from './db';
import { adminSettings, type AdminSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';

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
      scriptSrc: process.env.NODE_ENV === 'production' 
        ? ["'self'"] 
        : ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // unsafe-eval only for development
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
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  crossOriginEmbedderPolicy: false // Allow embedded content
});

// Add CSRF protection middleware
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF for GET requests and admin routes (handled by session auth)
  if (req.method === 'GET' || req.path.startsWith('/api/admin/')) {
    return next();
  }
  
  // For now, rely on SameSite cookies and CORS for CSRF protection
  // In future, implement proper CSRF tokens
  next();
};

// CORS configuration
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? ['https://aprilsykes.com', 'https://www.aprilsykes.com']
      : ['http://localhost:3000', 'http://localhost:5000', /\.replit\.dev$/, /\.repl\.co$/];
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    callback(null, isAllowed);
  },
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

// Initialize admin password if not exists
export const initializeAdminPassword = async (): Promise<void> => {
  try {
    const [existingAdmin] = await db.select().from(adminSettings).where(eq(adminSettings.id, "admin"));
    
    if (!existingAdmin) {
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(defaultPassword, saltRounds);
      
      await db.insert(adminSettings).values({
        id: "admin",
        passwordHash: passwordHash,
      });
      
      console.log("🔐 Admin password initialized in database");
    }
  } catch (error) {
    console.error("Error initializing admin password:", error);
  }
};

// Admin login function with database authentication
export const authenticateAdmin = async (password: string): Promise<string | null> => {
  try {
    const [admin] = await db.select().from(adminSettings).where(eq(adminSettings.id, "admin"));
    
    if (!admin || !admin.passwordHash) {
      return null;
    }
    
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    
    if (!isValid) {
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
  } catch (error) {
    console.error("Admin authentication error:", error);
    return null;
  }
};

// Admin logout function
export const logoutAdmin = (sessionToken: string): boolean => {
  return adminSessions.delete(sessionToken);
};

// Change admin password function with database persistence
export const changeAdminPassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
  try {
    const [admin] = await db.select().from(adminSettings).where(eq(adminSettings.id, "admin"));
    
    if (!admin || !admin.passwordHash) {
      return false;
    }
    
    // Verify current password
    const isCurrentValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    
    if (!isCurrentValid) {
      return false;
    }
    
    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
    
    // Update password in database
    await db
      .update(adminSettings)
      .set({ 
        passwordHash: newPasswordHash,
        updatedAt: new Date()
      })
      .where(eq(adminSettings.id, "admin"));
    
    console.log(`🔑 ADMIN PASSWORD PERMANENTLY CHANGED from database at ${new Date().toISOString()}`);
    
    return true;
  } catch (error) {
    console.error("Admin password change error:", error);
    return false;
  }
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

// String sanitization helper function
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove dangerous HTML tags and attributes
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<object[^>]*>.*?<\/object>/gi, '')
    .replace(/<embed[^>]*>.*?<\/embed>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    // Remove javascript: and data: URLs
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove potentially dangerous attributes
    .replace(/(<[^>]*)\s*(href|src|action)\s*=\s*["']?\s*(javascript|data|vbscript):[^"'>]*["']?/gi, '$1')
    // Trim whitespace
    .trim();
};

// Enhanced spam detection patterns
const spamPatterns = [
  /https?:\/\/[^\s]+.*https?:\/\/[^\s]+/gi, // Multiple URLs
  /\b(buy now|click here|free money|guaranteed|urgent|act now|limited time|earn money|investment opportunity)\b/gi,
  /(.)\1{8,}/gi, // Repeated characters
  /(viagra|cialis|pharmacy|crypto|bitcoin|forex|casino|lottery)/gi, // Spam topics
  /\b\w+@\w+\.\w+.*\b\w+@\w+\.\w+/gi, // Multiple email addresses
];

// Validate contact form data with enhanced spam detection
export const validateContactData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Basic field validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Length validation
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (data.company && data.company.length > 100) {
    errors.push('Company name must be less than 100 characters');
  }

  if (data.message && data.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  // Enhanced spam detection
  const messageContent = `${data.name || ''} ${data.email || ''} ${data.message || ''}`.toLowerCase();
  let spamScore = 0;
  
  spamPatterns.forEach(pattern => {
    if (pattern.test(messageContent)) {
      spamScore++;
    }
  });
  
  // If multiple spam indicators, likely spam
  if (spamScore >= 2) {
    errors.push('Message flagged as potential spam');
    console.warn(`🚨 SPAM DETECTED: Score ${spamScore}/5 - Content: ${messageContent.substring(0, 100)}...`);
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