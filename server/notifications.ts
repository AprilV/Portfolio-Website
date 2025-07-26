import sgMail from '@sendgrid/mail';
import { storage } from './storage';
import { ContactSubmission } from '@shared/schema';

// Notification service for real-time alerts
export class NotificationService {
  private static instance: NotificationService;
  
  private constructor() {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Send Slack notification
  async sendSlackAlert(contact: ContactSubmission): Promise<boolean> {
    try {
      const settings = await storage.getAlertSettings();
      if (!settings?.slackWebhook) return false;

      const payload = {
        text: "🚀 New Portfolio Contact Received!",
        attachments: [
          {
            color: "#2C73D2",
            fields: [
              {
                title: "Name",
                value: contact.name,
                short: true
              },
              {
                title: "Email",
                value: contact.email,
                short: true
              },
              {
                title: "Company",
                value: contact.company || "Not specified",
                short: true
              },
              {
                title: "Time",
                value: new Date(contact.createdAt).toLocaleString(),
                short: true
              },
              {
                title: "Message Preview",
                value: contact.message.substring(0, 200) + (contact.message.length > 200 ? "..." : ""),
                short: false
              }
            ],
            footer: "April Sykes Portfolio",
            ts: Math.floor(new Date(contact.createdAt).getTime() / 1000)
          }
        ]
      };

      const response = await fetch(settings.slackWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return response.ok;
    } catch (error) {
      console.error('Slack notification failed:', error);
      return false;
    }
  }

  // Send SMS notification via Twilio
  async sendSMSAlert(contact: ContactSubmission): Promise<boolean> {
    try {
      const settings = await storage.getAlertSettings();
      if (!settings?.smsAlerts || !settings.twilioSid || !settings.twilioToken || !settings.alertPhone) {
        return false;
      }

      // Note: In production, you would use the Twilio SDK
      // For now, we'll simulate the SMS sending
      const message = `🚀 New portfolio contact from ${contact.name} (${contact.company || 'No company'}) at ${new Date(contact.createdAt).toLocaleString()}. Check admin panel for full details.`;

      console.log(`SMS Alert would be sent to ${settings.alertPhone}: ${message}`);
      
      // Simulate successful SMS sending
      return true;
    } catch (error) {
      console.error('SMS notification failed:', error);
      return false;
    }
  }

  // Send branded auto-responder email
  async sendAutoResponder(contact: ContactSubmission): Promise<boolean> {
    try {
      if (!process.env.SENDGRID_API_KEY) return false;

      const autoResponderHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for reaching out - April Sykes</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #1E1E1E; margin: 0; padding: 0; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2C73D2 0%, #43D8C9 100%); padding: 32px 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You for Connecting!</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 16px;">April V. Sykes - Assistant Project Manager</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 32px 24px;">
              <p style="font-size: 16px; margin: 0 0 16px 0;">Hi ${contact.name},</p>
              
              <p style="font-size: 16px; margin: 0 0 16px 0;">Thank you for reaching out through my portfolio! I've received your message and truly appreciate your interest in my work and qualifications.</p>
              
              <div style="background-color: #f8fafc; border-left: 4px solid #2C73D2; padding: 16px; margin: 24px 0; border-radius: 0 4px 4px 0;">
                <p style="margin: 0; font-style: italic; color: #4a5568;">"I'm passionate about leveraging my 20+ years of IT experience to drive successful project outcomes and build collaborative team relationships."</p>
              </div>

              <h3 style="color: #2C73D2; margin: 24px 0 12px 0; font-size: 18px;">What's Next?</h3>
              <ul style="margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">I typically respond to all inquiries within 24 hours</li>
                <li style="margin-bottom: 8px;">I'll review your message carefully and provide a thoughtful response</li>
                <li style="margin-bottom: 8px;">Feel free to explore my complete portfolio and ATS-optimized resumes</li>
                <li>Connect with me on LinkedIn for the latest updates</li>
              </ul>

              <h3 style="color: #2C73D2; margin: 24px 0 12px 0; font-size: 18px;">Key Qualifications Highlight:</h3>
              <div style="display: grid; gap: 12px; margin-bottom: 24px;">
                <div style="display: flex; align-items: center; padding: 8px; background-color: #f0f7ff; border-radius: 4px;">
                  <span style="color: #2C73D2; font-weight: 600; margin-right: 8px;">•</span>
                  <span>20+ years IT Operations & Systems Analysis experience</span>
                </div>
                <div style="display: flex; align-items: center; padding: 8px; background-color: #f0f7ff; border-radius: 4px;">
                  <span style="color: #2C73D2; font-weight: 600; margin-right: 8px;">•</span>
                  <span>Bachelor's in Information Systems (BAS-IS) - In Progress</span>
                </div>
                <div style="display: flex; align-items: center; padding: 8px; background-color: #f0f7ff; border-radius: 4px;">
                  <span style="color: #2C73D2; font-weight: 600; margin-right: 8px;">•</span>
                  <span>10+ Industry Certifications (CCNA, CompTIA A+, Network+)</span>
                </div>
                <div style="display: flex; align-items: center; padding: 8px; background-color: #f0f7ff; border-radius: 4px;">
                  <span style="color: #2C73D2; font-weight: 600; margin-right: 8px;">•</span>
                  <span>Proven leadership managing 24x7 operations & cross-functional teams</span>
                </div>
              </div>

              <p style="font-size: 16px; margin: 0 0 16px 0;">Looking forward to our conversation!</p>
              
              <p style="font-size: 16px; margin: 0;">Best regards,<br><strong>April V. Sykes</strong><br>Assistant Project Manager Candidate</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b;">
                📧 april_sykes@proton.me | 🌐 aprilsykes.com
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                This is an automated confirmation. I'll respond personally within 24 hours.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      const msg = {
        to: contact.email,
        from: 'april_sykes@proton.me',
        subject: 'Thank you for reaching out - April Sykes Portfolio',
        html: autoResponderHtml,
      };

      await sgMail.send(msg);
      console.log(`Auto-responder sent to ${contact.email}`);
      return true;
    } catch (error) {
      console.error('Auto-responder failed:', error);
      return false;
    }
  }

  // Send all configured alerts
  async sendAllAlerts(contact: ContactSubmission): Promise<void> {
    const settings = await storage.getAlertSettings();
    
    const promises = [];
    
    // Auto-responder (always try to send)
    promises.push(this.sendAutoResponder(contact));
    
    // Slack alerts
    if (settings?.slackWebhook) {
      promises.push(this.sendSlackAlert(contact));
    }
    
    // SMS alerts
    if (settings?.smsAlerts) {
      promises.push(this.sendSMSAlert(contact));
    }

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error('Some notifications failed:', error);
    }
  }
}

export const notifications = NotificationService.getInstance();