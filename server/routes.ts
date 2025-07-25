import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendAutoReply } from "./email";
import { logContactSubmission, getContactLogPath } from "./contact-log";
import { createContactAlert } from "./alternative-notification";
import { 
  contactFormLimiter, 
  adminLimiter, 
  apiLimiter,
  securityHeaders,
  corsOptions,
  sanitizeInput,
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

      const contactData = insertContactSchema.parse(contactFields);
      const submission = await storage.createContactSubmission(contactData);
      
      // Send email notifications
      const emailPromises = [
        sendContactNotification({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company || undefined,
          message: contactData.message
        }), // Email to April
        sendAutoReply({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company || undefined,
          message: contactData.message
        }) // Auto-reply to sender
      ];
      
      // Create immediate file-based alert system as backup
      createContactAlert({
        id: submission.id,
        name: contactData.name,
        email: contactData.email,
        company: contactData.company,
        message: contactData.message
      });
      
      // Don't wait for emails to complete - send response immediately
      Promise.all(emailPromises).then(([notificationSent, autoReplySent]) => {
        // Log submission to file for backup notification
        logContactSubmission(submission.id, contactData, notificationSent, 'sendgrid-id-placeholder');
        
        if (notificationSent) {
          console.log("✅ Contact notification email sent successfully");
          console.log(`📧 If email not received, check log file: ${getContactLogPath()}`);
        } else {
          console.log("❌ Contact notification email failed or disabled");
          console.log("📁 Check NEW_CONTACT_ALERT.txt file for contact details!");
        }
        
        if (autoReplySent) {
          console.log("✅ Auto-reply email sent successfully");
        } else {
          console.log("❌ Auto-reply email failed or disabled");
        }
      }).catch(error => {
        console.error("❌ Email sending error:", error);
        // Still log the submission even if email fails
        logContactSubmission(submission.id, contactData, false);
        console.log("📁 Contact details saved in NEW_CONTACT_ALERT.txt file!");
      });
      
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

  // Register admin-specific routes
  registerAdminRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
