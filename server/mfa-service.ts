import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { db } from './db';
import { adminSettings, mfaTokens, type MfaToken, type InsertMfaToken } from '@shared/schema';
import { eq, and, gte } from 'drizzle-orm';
import { sendMfaEmail } from './email';

export interface MfaService {
  // Setup MFA
  setupMfa(email: string): Promise<{ backupCodes: string[]; success: boolean }>;
  
  // Email verification
  sendVerificationCode(type: 'login' | 'password_reset' | 'setup', ipAddress?: string, userAgent?: string): Promise<boolean>;
  verifyCode(code: string, type: 'login' | 'password_reset' | 'setup'): Promise<boolean>;
  
  // Backup codes
  generateBackupCodes(): string[];
  verifyBackupCode(code: string): Promise<boolean>;
  
  // Password recovery
  initiatePasswordReset(): Promise<boolean>;
  resetPasswordWithCode(code: string, newPassword: string): Promise<boolean>;
  
  // Status checks
  isMfaEnabled(): Promise<boolean>;
  getAdminSettings(): Promise<any>;
}

class DatabaseMfaService implements MfaService {
  
  async setupMfa(email: string): Promise<{ backupCodes: string[]; success: boolean }> {
    try {
      // Generate backup codes
      const backupCodes = this.generateBackupCodes();
      const hashedBackupCodes = await Promise.all(
        backupCodes.map(code => bcrypt.hash(code, 12))
      );
      
      // Update admin settings
      await db
        .update(adminSettings)
        .set({
          email,
          mfaEnabled: true,
          backupCodes: hashedBackupCodes,
          updatedAt: new Date(),
        })
        .where(eq(adminSettings.id, 'admin'));
      
      console.log('🔐 MFA SETUP: Email MFA enabled with backup codes');
      
      return { backupCodes, success: true };
    } catch (error) {
      console.error('MFA setup error:', error);
      return { backupCodes: [], success: false };
    }
  }
  
  async sendVerificationCode(
    type: 'login' | 'password_reset' | 'setup', 
    ipAddress?: string, 
    userAgent?: string
  ): Promise<boolean> {
    try {
      // Get admin email
      const [admin] = await db.select().from(adminSettings).where(eq(adminSettings.id, 'admin'));
      if (!admin?.email) {
        console.error('No admin email configured for MFA');
        return false;
      }
      
      // Generate secure 6-digit code
      const code = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minute expiry
      
      // Store token in database
      await db.insert(mfaTokens).values({
        token: code,
        type,
        expiresAt,
        ipAddress: ipAddress || 'unknown',
        userAgent: userAgent || 'unknown',
      });
      
      // Send email with code
      const emailSent = await sendMfaEmail(admin.email, code, type);
      
      if (emailSent) {
        console.log(`📧 MFA CODE SENT: ${type} verification code sent to ${admin.email}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Send verification code error:', error);
      return false;
    }
  }
  
  async verifyCode(code: string, type: 'login' | 'password_reset' | 'setup'): Promise<boolean> {
    try {
      const now = new Date();
      
      // Find valid token
      const [token] = await db
        .select()
        .from(mfaTokens)
        .where(
          and(
            eq(mfaTokens.token, code),
            eq(mfaTokens.type, type),
            eq(mfaTokens.used, false),
            gte(mfaTokens.expiresAt, now)
          )
        )
        .limit(1);
      
      if (!token) {
        console.log(`❌ INVALID MFA CODE: ${code} for type ${type}`);
        return false;
      }
      
      // Mark token as used
      await db
        .update(mfaTokens)
        .set({ used: true })
        .where(eq(mfaTokens.id, token.id));
      
      console.log(`✅ MFA CODE VERIFIED: ${type} verification successful`);
      return true;
    } catch (error) {
      console.error('Verify code error:', error);
      return false;
    }
  }
  
  generateBackupCodes(): string[] {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      // Generate 8-character alphanumeric backup codes
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    return codes;
  }
  
  async verifyBackupCode(code: string): Promise<boolean> {
    try {
      const [admin] = await db.select().from(adminSettings).where(eq(adminSettings.id, 'admin'));
      if (!admin?.backupCodes || admin.backupCodes.length === 0) {
        return false;
      }
      
      // Check if code matches any backup code
      for (let i = 0; i < admin.backupCodes.length; i++) {
        const isValid = await bcrypt.compare(code, admin.backupCodes[i]);
        if (isValid) {
          // Remove used backup code
          const updatedCodes = admin.backupCodes.filter((_, index) => index !== i);
          await db
            .update(adminSettings)
            .set({ 
              backupCodes: updatedCodes,
              updatedAt: new Date()
            })
            .where(eq(adminSettings.id, 'admin'));
          
          console.log('🔑 BACKUP CODE USED: One backup code consumed');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Verify backup code error:', error);
      return false;
    }
  }
  
  async initiatePasswordReset(): Promise<boolean> {
    try {
      return await this.sendVerificationCode('password_reset');
    } catch (error) {
      console.error('Initiate password reset error:', error);
      return false;
    }
  }
  
  async resetPasswordWithCode(code: string, newPassword: string): Promise<boolean> {
    try {
      // Verify the reset code
      const isValidCode = await this.verifyCode(code, 'password_reset');
      if (!isValidCode) {
        return false;
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      
      // Update password
      await db
        .update(adminSettings)
        .set({ 
          passwordHash: hashedPassword,
          updatedAt: new Date()
        })
        .where(eq(adminSettings.id, 'admin'));
      
      console.log('🔄 PASSWORD RESET: Admin password updated via MFA verification');
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }
  
  async isMfaEnabled(): Promise<boolean> {
    try {
      const [admin] = await db.select().from(adminSettings).where(eq(adminSettings.id, 'admin'));
      return admin?.mfaEnabled || false;
    } catch (error) {
      console.error('Check MFA status error:', error);
      return false;
    }
  }
  
  async getAdminSettings(): Promise<any> {
    try {
      const [admin] = await db.select().from(adminSettings).where(eq(adminSettings.id, 'admin'));
      return admin ? {
        email: admin.email,
        mfaEnabled: admin.mfaEnabled,
        hasBackupCodes: admin.backupCodes && admin.backupCodes.length > 0,
        backupCodesCount: admin.backupCodes?.length || 0,
      } : null;
    } catch (error) {
      console.error('Get admin settings error:', error);
      return null;
    }
  }
}

export const mfaService = new DatabaseMfaService();