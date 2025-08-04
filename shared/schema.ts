import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  blocked: boolean("blocked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  message: true,
}).extend({
  captchaAnswer: z.number().optional(),
  captchaExpected: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Admin settings table for persistent configuration
export const adminSettings = pgTable("admin_settings", {
  id: text("id").primaryKey().default("admin"),
  passwordHash: text("password_hash"),
  email: text("email"), // Recovery email
  mfaEnabled: boolean("mfa_enabled").default(false).notNull(),
  backupCodes: text("backup_codes").array().default([]), // Array of hashed backup codes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// MFA tokens table for email verification codes
export const mfaTokens = pgTable("mfa_tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  type: text("type").notNull(), // 'login', 'password_reset', 'setup'
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").default(false).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminSettings = typeof adminSettings.$inferSelect;
export type InsertAdminSettings = typeof adminSettings.$inferInsert;
export type MfaToken = typeof mfaTokens.$inferSelect;
export type InsertMfaToken = typeof mfaTokens.$inferInsert;

// Authentication logs table for security monitoring
export const authLogs = pgTable("auth_logs", {
  id: serial("id").primaryKey(),
  username: text("username"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  action: text("action").notNull(), // login_success, login_failed, logout
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  success: boolean("success").notNull(),
});

// Analytics table for engagement tracking
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // YYYY-MM-DD format
  contactCount: integer("contact_count").default(0),
  uniqueVisitors: integer("unique_visitors").default(0), // Future enhancement
  topCompanies: text("top_companies").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Alert settings for notifications
export const alertSettings = pgTable("alert_settings", {
  id: text("id").primaryKey().default("alerts"),
  emailAlerts: boolean("email_alerts").default(true),
  slackWebhook: text("slack_webhook"),
  smsAlerts: boolean("sms_alerts").default(false),
  twilioSid: text("twilio_sid"),
  twilioToken: text("twilio_token"),
  twilioPhone: text("twilio_phone"),
  alertPhone: text("alert_phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAuthLogSchema = createInsertSchema(authLogs).pick({
  username: true,
  ipAddress: true,
  userAgent: true,
  action: true,
  success: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  date: true,
  contactCount: true,
  uniqueVisitors: true,
  topCompanies: true,
});

export const insertAlertSettingsSchema = createInsertSchema(alertSettings).pick({
  emailAlerts: true,
  slackWebhook: true,
  smsAlerts: true,
  twilioSid: true,
  twilioToken: true,
  twilioPhone: true,
  alertPhone: true,
});

export type AuthLog = typeof authLogs.$inferSelect;
export type InsertAuthLog = z.infer<typeof insertAuthLogSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type AlertSettings = typeof alertSettings.$inferSelect;
export type InsertAlertSettings = z.infer<typeof insertAlertSettingsSchema>;
