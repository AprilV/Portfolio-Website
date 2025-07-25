import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendAutoReply } from "./email";
import { logContactSubmission, getContactLogPath } from "./contact-log";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
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
      
      // Don't wait for emails to complete - send response immediately
      Promise.all(emailPromises).then(([notificationSent, autoReplySent]) => {
        // Log submission to file for backup notification
        logContactSubmission(submission.id, contactData, notificationSent, 'sendgrid-id-placeholder');
        
        if (notificationSent) {
          console.log("✅ Contact notification email sent successfully");
          console.log(`📧 If email not received, check log file: ${getContactLogPath()}`);
        } else {
          console.log("❌ Contact notification email failed or disabled");
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

  // Get contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Error fetching contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
