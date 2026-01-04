import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { sendContactNotification } from "./email";
import { 
  contactFormLimiter, 
  sanitizeString,
  validateContactData
} from "./security";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000)
});

export async function registerRoutes(app: Express): Promise<Server> {
  
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

      const contactData = contactSchema.parse(sanitizedFields);
      
      // Send email notification
      try {
        await sendContactNotification({
          name: contactData.name,
          email: contactData.email,
          company: contactData.company,
          message: contactData.message
        });
        
        console.log(`📧 Contact notification sent for ${contactData.email}`);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon."
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

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
