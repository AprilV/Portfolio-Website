import { 
  users, 
  contactSubmissions, 
  authLogs, 
  analytics, 
  alertSettings,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact,
  type AuthLog,
  type InsertAuthLog,
  type Analytics,
  type InsertAnalytics,
  type AlertSettings,
  type InsertAlertSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, gte, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactBlocked(id: number, blocked: boolean): Promise<boolean>;
  deleteContactSubmission(id: number): Promise<boolean>;
  
  // Authentication logs
  createAuthLog(log: InsertAuthLog): Promise<AuthLog>;
  getAuthLogs(limit?: number): Promise<AuthLog[]>;
  getRecentAuthLogs(hours?: number): Promise<AuthLog[]>;
  
  // Analytics
  createOrUpdateAnalytics(date: string, contactCount: number, companies: string[]): Promise<Analytics>;
  getAnalytics(days?: number): Promise<Analytics[]>;
  getDailyContactCounts(days?: number): Promise<{ date: string; count: number }[]>;
  
  // Alert settings
  getAlertSettings(): Promise<AlertSettings | undefined>;
  updateAlertSettings(settings: Partial<InsertAlertSettings>): Promise<AlertSettings>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async updateContactBlocked(id: number, blocked: boolean): Promise<boolean> {
    const result = await db
      .update(contactSubmissions)
      .set({ blocked })
      .where(eq(contactSubmissions.id, id));
    return (result.rowCount || 0) > 0;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Authentication logs implementation
  async createAuthLog(insertLog: InsertAuthLog): Promise<AuthLog> {
    const [log] = await db
      .insert(authLogs)
      .values(insertLog)
      .returning();
    return log;
  }

  async getAuthLogs(limit: number = 100): Promise<AuthLog[]> {
    return await db
      .select()
      .from(authLogs)
      .orderBy(desc(authLogs.timestamp))
      .limit(limit);
  }

  async getRecentAuthLogs(hours: number = 24): Promise<AuthLog[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);
    
    return await db
      .select()
      .from(authLogs)
      .where(gte(authLogs.timestamp, cutoffTime))
      .orderBy(desc(authLogs.timestamp));
  }

  // Analytics implementation
  async createOrUpdateAnalytics(date: string, contactCount: number, companies: string[]): Promise<Analytics> {
    // Try to update existing record first
    const existing = await db
      .select()
      .from(analytics)
      .where(eq(analytics.date, date))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(analytics)
        .set({
          contactCount: sql`${analytics.contactCount} + ${contactCount}`,
          topCompanies: companies,
        })
        .where(eq(analytics.date, date))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(analytics)
        .values({
          date,
          contactCount,
          topCompanies: companies,
        })
        .returning();
      return created;
    }
  }

  async getAnalytics(days: number = 30): Promise<Analytics[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    return await db
      .select()
      .from(analytics)
      .where(gte(analytics.date, cutoffString))
      .orderBy(desc(analytics.date));
  }

  async getDailyContactCounts(days: number = 30): Promise<{ date: string; count: number }[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    const results = await db
      .select({
        date: analytics.date,
        count: analytics.contactCount,
      })
      .from(analytics)
      .where(gte(analytics.date, cutoffString))
      .orderBy(analytics.date);

    return results.map(r => ({ date: r.date, count: r.count || 0 }));
  }

  // Alert settings implementation
  async getAlertSettings(): Promise<AlertSettings | undefined> {
    const [settings] = await db
      .select()
      .from(alertSettings)
      .where(eq(alertSettings.id, "alerts"))
      .limit(1);
    return settings || undefined;
  }

  async updateAlertSettings(settings: Partial<InsertAlertSettings>): Promise<AlertSettings> {
    const existing = await this.getAlertSettings();
    
    if (existing) {
      const [updated] = await db
        .update(alertSettings)
        .set({
          ...settings,
          updatedAt: new Date(),
        })
        .where(eq(alertSettings.id, "alerts"))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(alertSettings)
        .values({
          id: "alerts",
          ...settings,
        })
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
