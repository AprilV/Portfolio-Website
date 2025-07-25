import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set. Email notifications will be disabled.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactEmailParams {
  name: string;
  email: string;
  company?: string | null;
  message: string;
}

export async function sendContactNotification(contactData: ContactEmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured, skipping email notification");
    return false;
  }

  try {
    // Test log to verify function is called
    console.log(`🔧 DEBUG: Attempting to send notification email for ${contactData.name}`);
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2C73D2, #43D8C9); padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #1E1E1E; margin: 0 0 20px 0; font-size: 20px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #2C73D2;">Name:</strong> ${contactData.name}
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #2C73D2;">Email:</strong> 
            <a href="mailto:${contactData.email}" style="color: #43D8C9; text-decoration: none;">${contactData.email}</a>
          </div>
          
          ${contactData.company ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #2C73D2;">Company:</strong> ${contactData.company}
          </div>
          ` : ''}
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 8px; border-left: 4px solid #2C73D2;">
          <h3 style="color: #1E1E1E; margin: 0 0 15px 0;">Message:</h3>
          <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contactData.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            Reply directly to this email to respond to ${contactData.name}
          </p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Message

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.company ? `Company: ${contactData.company}` : ''}

Message:
${contactData.message}

Reply directly to this email to respond to ${contactData.name}.
    `;

    // Use Gmail for reliable email delivery
    const notificationEmail = 'aprilv120@gmail.com';
    const fromEmail = 'april_sykes@proton.me'; // Keep verified sender
    
    const emailPayload = {
      to: notificationEmail,
      from: fromEmail,
      replyTo: contactData.email, 
      subject: `🚨 PORTFOLIO CONTACT: ${contactData.name} - ${contactData.company || 'Individual'}`,
      text: emailText,
      html: emailHtml,
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false },
        subscriptionTracking: { enable: false }
      },
      mailSettings: {
        sandboxMode: { enable: false }
      }
    };

    console.log('Sending notification email with payload:', JSON.stringify(emailPayload, null, 2));
    
    const result = await mailService.send(emailPayload);
    
    console.log('SendGrid response for notification:', JSON.stringify(result, null, 2));
    console.log(`Contact notification email sent from VERIFIED SENDER for ${contactData.name} - Message ID: ${result[0]?.headers?.['x-message-id']}`);
    
    // Additional logging for delivery status
    if (result[0]?.statusCode === 202) {
      console.log(`✅ SendGrid accepted email for delivery to aprilv120@gmail.com`);
      console.log(`📧 Email should arrive within 1-5 minutes in Gmail inbox`);
      console.log(`🆔 Message ID for tracking: ${result[0]?.headers?.['x-message-id']}`);
    } else {
      console.log(`❌ Unexpected SendGrid response status: ${result[0]?.statusCode}`);
    }
    
    return true;
  } catch (error: any) {
    console.error('Failed to send contact notification email:', error);
    if (error.response && error.response.body) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body, null, 2));
    }
    return false;
  }
}

export async function sendAutoReply(contactData: ContactEmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    return false;
  }

  try {
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2C73D2, #43D8C9); padding: 30px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Message</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">April V. Sykes - Assistant Project Manager</p>
        </div>
        
        <div style="padding: 25px;">
          <p style="color: #1E1E1E; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hi ${contactData.name},
          </p>
          
          <p style="color: #1E1E1E; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out through my portfolio website! I've received your message and really appreciate you taking the time to connect.
          </p>
          
          <p style="color: #1E1E1E; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            I'll review your message and get back to you within 24-48 hours. If you have any urgent questions, please don't hesitate to call or text me directly.
          </p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2C73D2; margin: 0 0 10px 0;">Quick About Me:</h3>
            <ul style="color: #333; margin: 0; padding-left: 20px;">
              <li>20+ years IT infrastructure experience</li>
              <li>Currently pursuing CAMP certification</li>
              <li>Bachelor's in Information Systems (3.94 GPA)</li>
              <li>Team leadership experience at Dell Technologies</li>
            </ul>
          </div>
          
          <p style="color: #1E1E1E; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Looking forward to discussing how I can contribute to your team's success!
          </p>
          
          <p style="color: #1E1E1E; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong style="color: #2C73D2;">April V. Sykes</strong><br>
            <span style="color: #666;">Assistant Project Manager | IT Professional | CAPM Candidate</span>
          </p>
        </div>
        
        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            📧 aprilv120@gmail.com | 📍 Bremerton, WA | 💼 LinkedIn: /in/april-sykes
          </p>
        </div>
      </div>
    `;

    const autoReplyText = `
Hi ${contactData.name},

Thank you for reaching out through my portfolio website! I've received your message and really appreciate you taking the time to connect.

I'll review your message and get back to you within 24-48 hours. If you have any urgent questions, please don't hesitate to call or text me directly.

Quick About Me:
• 20+ years IT infrastructure experience
• Currently pursuing CAPM certification  
• Bachelor's in Information Systems (3.94 GPA)
• Team leadership experience at Dell Technologies

Looking forward to discussing how I can contribute to your team's success!

Best regards,
April V. Sykes
Assistant Project Manager | IT Professional | CAPM Candidate

📧 aprilv120@gmail.com | 📍 Bremerton, WA | 💼 LinkedIn: /in/april-sykes
    `;

    await mailService.send({
      to: contactData.email,
      from: 'april_sykes@proton.me',
      subject: 'Thank you for your message - April V. Sykes',
      text: autoReplyText,
      html: autoReplyHtml,
    });

    console.log(`Auto-reply email sent to ${contactData.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send auto-reply email:', error);
    return false;
  }
}