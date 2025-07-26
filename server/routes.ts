import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendAutoReply } from "./email";
import { logContactSubmission, getContactLogPath } from "./contact-log";
import { createContactAlert } from "./alternative-notification";
import { notifications } from "./notifications";
import { 
  contactFormLimiter, 
  adminLimiter, 
  apiLimiter,
  securityHeaders,
  corsOptions,
  sanitizeInput,
  sanitizeString,
  adminAuth,
  requestLogger,
  validateContactData,
  initializeAdminPassword
} from "./security";
import { registerAdminRoutes } from "./admin-routes";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Security middleware is now applied in index.ts
  
  // Initialize admin password on startup
  await initializeAdminPassword();
  
  // Apply admin-specific rate limiting (but exclude health endpoint)
  app.use('/api/admin/', (req, res, next) => {
    if (req.path === '/health') {
      return next(); // Skip rate limiting for health endpoint
    }
    adminLimiter(req, res, next);
  });

  // Contact form submission endpoint with enhanced security
  app.post("/api/contact", contactFormLimiter, async (req, res) => {
    try {
      // Enhanced validation
      const validation = validateContactData(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Please correct the following errors:",
          errors: validation.errors
        });
      }

      // Validate CAPTCHA
      const { captchaAnswer, captchaExpected, ...contactFields } = req.body;
      
      if (captchaAnswer === undefined || captchaExpected === undefined) {
        return res.status(400).json({
          success: false,
          message: "CAPTCHA verification is required to prevent spam."
        });
      }
      
      if (typeof captchaAnswer !== 'number' || typeof captchaExpected !== 'number') {
        return res.status(400).json({
          success: false,
          message: "Invalid CAPTCHA format."
        });
      }
      
      if (captchaAnswer !== captchaExpected) {
        console.log(`🤖 CAPTCHA FAILED: Expected ${captchaExpected}, got ${captchaAnswer} from ${req.ip} at ${new Date().toISOString()}`);
        return res.status(400).json({
          success: false,
          message: "CAPTCHA verification failed. Please solve the math problem correctly."
        });
      }

      console.log(`✅ CAPTCHA VERIFIED: Correct answer ${captchaAnswer} from ${req.ip} at ${new Date().toISOString()}`);

      // Sanitize all input fields to prevent XSS
      const sanitizedFields = {
        name: sanitizeString(contactFields.name),
        email: sanitizeString(contactFields.email),
        company: contactFields.company ? sanitizeString(contactFields.company) : contactFields.company,
        message: sanitizeString(contactFields.message)
      };

      const contactData = insertContactSchema.parse(sanitizedFields);
      const submission = await storage.createContactSubmission(contactData);
      
      // Update analytics for engagement tracking
      const today = new Date().toISOString().split('T')[0];
      const companies = [contactData.company].filter(Boolean);
      
      // Enhanced notification system
      Promise.all([
        // Update daily analytics
        storage.createOrUpdateAnalytics(today, 1, companies),
        
        // Send all new notifications (auto-responder, Slack, SMS)
        notifications.sendAllAlerts(submission),
        
        // Legacy email notifications (backup)
        sendContactNotification({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company || undefined,
          message: contactData.message
        }),
        
        // File-based backup alert system
        createContactAlert({
          id: submission.id,
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          message: contactData.message
        })
      ]).catch(console.error);
      
      // Log submission for backup
      logContactSubmission(submission.id, contactData, true, 'enhanced-notification-system');
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon.",
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Sorry, there was an error sending your message. Please try again or contact me directly." 
        });
      }
    }
  });

  // Get contact submissions (for admin purposes) - protected endpoint
  app.get("/api/contact", adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Error fetching contact submissions" });
    }
  });

  // Delete contact submission (admin only)
  app.delete("/api/contact/:id", adminAuth, async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      
      if (isNaN(contactId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid contact ID" 
        });
      }

      const deleted = await storage.deleteContactSubmission(contactId);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: "Contact not found" 
        });
      }

      console.log(`🗑️ CONTACT DELETED: ID ${contactId} by admin at ${new Date().toISOString()}`);
      
      res.json({ 
        success: true, 
        message: "Contact deleted successfully" 
      });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error deleting contact" 
      });
    }
  });

  // Analytics API routes
  app.get("/api/admin/analytics", adminAuth, async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const analytics = await storage.getAnalytics(days);
      const dailyCounts = await storage.getDailyContactCounts(days);
      
      res.json({
        success: true,
        analytics,
        dailyCounts,
        summary: {
          totalContacts: dailyCounts.reduce((sum, day) => sum + day.count, 0),
          averageDaily: dailyCounts.length > 0 ? 
            (dailyCounts.reduce((sum, day) => sum + day.count, 0) / dailyCounts.length).toFixed(1) : 0,
          topCompanies: analytics.length > 0 ? analytics[0].topCompanies : []
        }
      });
    } catch (error) {
      console.error("Analytics fetch error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
  });

  // Authentication logs API route
  app.get("/api/admin/auth-logs", adminAuth, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const hours = parseInt(req.query.hours as string) || 24;
      
      const logs = req.query.recent === 'true' 
        ? await storage.getRecentAuthLogs(hours)
        : await storage.getAuthLogs(limit);
      
      res.json({
        success: true,
        logs,
        summary: {
          total: logs.length,
          successful: logs.filter(log => log.success).length,
          failed: logs.filter(log => !log.success).length,
          uniqueIPs: [...new Set(logs.map(log => log.ipAddress))].length
        }
      });
    } catch (error) {
      console.error("Auth logs fetch error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch auth logs" });
    }
  });

  // Alert settings API routes
  app.get("/api/admin/alert-settings", adminAuth, async (req, res) => {
    try {
      const settings = await storage.getAlertSettings();
      res.json({
        success: true,
        settings: settings || {
          emailAlerts: true,
          slackWebhook: "",
          smsAlerts: false,
          twilioSid: "",
          twilioToken: "",
          twilioPhone: "",
          alertPhone: ""
        }
      });
    } catch (error) {
      console.error("Alert settings fetch error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch alert settings" });
    }
  });

  app.post("/api/admin/alert-settings", adminAuth, async (req, res) => {
    try {
      const settings = await storage.updateAlertSettings(req.body);
      res.json({
        success: true,
        message: "Alert settings updated successfully",
        settings
      });
    } catch (error) {
      console.error("Alert settings update error:", error);
      res.status(500).json({ success: false, message: "Failed to update alert settings" });
    }
  });

  // Register admin-specific routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
