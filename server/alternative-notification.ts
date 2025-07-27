// Alternative notification system - Simple webhook/log approach
import { writeFileSync, appendFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const ALERT_FILE = join(process.cwd(), 'NEW_CONTACT_ALERT.txt');

export function createContactAlert(contactData: {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  message: string;
}): void {
  const alertContent = `
🚨 NEW PORTFOLIO CONTACT SUBMISSION 🚨
===========================================
TIME: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}
ID: #${contactData.id}
NAME: ${contactData.name}
EMAIL: ${contactData.email}
COMPANY: ${contactData.company || 'Not provided'}
===========================================
MESSAGE:
${contactData.message}
===========================================

⚡ ACTION REQUIRED: Reply to ${contactData.email}

===========================================
`;

  try {
    writeFileSync(ALERT_FILE, alertContent);
    // Secure logging without exposing sensitive data
    console.log(`🚨 New contact submission processed at ${new Date().toISOString()}`);
    console.log(`📁 Contact details securely stored in database and notification files`);
    
    // Security-compliant logging without PII exposure
    console.log('\n' + '='.repeat(50));
    console.log('🚨 NEW CONTACT SUBMISSION PROCESSED 🚨');
    console.log('='.repeat(50));
    console.log(`📊 Submission ID: ${contactData.id}`);
    console.log(`📧 Email domain: ${contactData.email.split('@')[1] || 'unknown'}`);
    console.log(`🏢 Company provided: ${contactData.company ? 'Yes' : 'No'}`);
    console.log(`💬 Message length: ${contactData.message.length} characters`);
    console.log('='.repeat(50) + '\n');
    
  } catch (error) {
    console.error('Failed to create contact alert:', error);
  }
}

export function getContactAlertPath(): string {
  return ALERT_FILE;
}

export function hasNewContactAlert(): boolean {
  return existsSync(ALERT_FILE);
}

export function clearContactAlert(): void {
  try {
    if (existsSync(ALERT_FILE)) {
      writeFileSync(ALERT_FILE, '');
    }
  } catch (error) {
    console.error('Failed to clear contact alert:', error);
  }
}