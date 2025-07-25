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
  validateContactData
} from "./security";
import { registerAdminRoutes } from "./admin-routes";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure trust proxy for Replit environment
  app.set('trust proxy', 1);
  
  // Apply security middleware
  app.use(securityHeaders);
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());
  app.use(requestLogger);
  app.use(sanitizeInput);

  // Apply rate limiting
  app.use('/api/', apiLimiter);
  app.use('/admin/', adminLimiter);

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

      const contactData = insertContactSchema.parse(req.body);
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
