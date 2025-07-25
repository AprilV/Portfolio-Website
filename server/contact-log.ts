// Contact log for backup notification when emails fail to deliver
import { writeFileSync, appendFileSync, existsSync } from 'fs';
import { join } from 'path';

const LOG_FILE = join(process.cwd(), 'contact-submissions.log');

interface ContactLogEntry {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  emailSent: boolean;
  sendgridMessageId?: string;
}

export function logContactSubmission(
  id: number,
  contactData: {
    name: string;
    email: string;
    company?: string | null;
    message: string;
  },
  emailSent: boolean,
  messageId?: string
): void {
  const entry: ContactLogEntry = {
    id,
    timestamp: new Date().toISOString(),
    name: contactData.name,
    email: contactData.email,
    company: contactData.company || undefined,
    message: contactData.message,
    emailSent,
    sendgridMessageId: messageId
  };

  const logLine = `
===============================================
📧 NEW CONTACT FORM SUBMISSION #${id}
===============================================
⏰ Time: ${entry.timestamp}
👤 Name: ${entry.name}
📧 Email: ${entry.email}
🏢 Company: ${entry.company || 'Not provided'}
💬 Message: ${entry.message}
✅ Email Notification: ${emailSent ? 'SENT' : 'FAILED'}
🆔 SendGrid Message ID: ${messageId || 'N/A'}
===============================================

`;

  try {
    if (!existsSync(LOG_FILE)) {
      writeFileSync(LOG_FILE, `APRIL V. SYKES - PORTFOLIO CONTACT SUBMISSIONS LOG\nStarted: ${new Date().toISOString()}\n\n`);
    }
    
    appendFileSync(LOG_FILE, logLine);
    console.log(`📝 Contact submission #${id} logged to: ${LOG_FILE}`);
  } catch (error) {
    console.error('Failed to write contact log:', error);
  }
}

export function getContactLogPath(): string {
  return LOG_FILE;
}