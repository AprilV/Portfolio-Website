// In-memory storage replacement for database
// Works for single-instance deployments (AWS Amplify)

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  blocked: boolean;
}

interface AuthLog {
  id: number;
  eventType: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  createdAt: string;
}

interface Analytics {
  id: number;
  date: string;
  contactCount: number;
  companies: string[];
  createdAt: string;
}

interface AlertSettings {
  id: number;
  emailEnabled: boolean;
  instantAlerts: boolean;
  weeklyReports: boolean;
  emailAddress: string;
}

class MemoryStorage {
  private contacts: ContactSubmission[] = [];
  private authLogs: AuthLog[] = [];
  private analytics: Analytics[] = [];
  private alertSettings: AlertSettings | null = null;
  private nextContactId = 1;
  private nextAuthLogId = 1;
  private nextAnalyticsId = 1;

  // Contact submissions
  async createContactSubmission(contact: { name: string; email: string; company?: string; message: string }): Promise<ContactSubmission> {
    const submission: ContactSubmission = {
      id: this.nextContactId++,
      ...contact,
      createdAt: new Date().toISOString(),
      blocked: false
    };
    this.contacts.push(submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contacts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async updateContactBlocked(id: number, blocked: boolean): Promise<boolean> {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      contact.blocked = blocked;
      return true;
    }
    return false;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      return true;
    }
    return false;
  }

  // Authentication logs
  async createAuthLog(log: { eventType: string; ipAddress: string; userAgent: string; success: boolean }): Promise<AuthLog> {
    const authLog: AuthLog = {
      id: this.nextAuthLogId++,
      ...log,
      createdAt: new Date().toISOString()
    };
    this.authLogs.push(authLog);
    
    // Keep only last 1000 logs to prevent memory issues
    if (this.authLogs.length > 1000) {
      this.authLogs = this.authLogs.slice(-1000);
    }
    
    return authLog;
  }

  async getAuthLogs(limit: number = 100): Promise<AuthLog[]> {
    return [...this.authLogs]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getRecentAuthLogs(hours: number = 24): Promise<AuthLog[]> {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.authLogs.filter(log => new Date(log.createdAt) > cutoff);
  }

  // Analytics
  async createOrUpdateAnalytics(date: string, contactCount: number, companies: string[]): Promise<Analytics> {
    const existing = this.analytics.find(a => a.date === date);
    
    if (existing) {
      existing.contactCount = contactCount;
      existing.companies = companies;
      return existing;
    }
    
    const analytics: Analytics = {
      id: this.nextAnalyticsId++,
      date,
      contactCount,
      companies,
      createdAt: new Date().toISOString()
    };
    this.analytics.push(analytics);
    return analytics;
  }

  async getAnalytics(days: number = 30): Promise<Analytics[]> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return this.analytics.filter(a => new Date(a.date) > cutoff);
  }

  async getDailyContactCounts(days: number = 7): Promise<{ date: string; count: number }[]> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const analytics = this.analytics.filter(a => new Date(a.date) > cutoff);
    return analytics.map(a => ({ date: a.date, count: a.contactCount }));
  }

  // Alert settings
  async getAlertSettings(): Promise<AlertSettings | null> {
    return this.alertSettings ? { ...this.alertSettings } : null;
  }

  async updateAlertSettings(settings: Partial<Omit<AlertSettings, 'id'>>): Promise<AlertSettings> {
    if (!this.alertSettings) {
      this.alertSettings = {
        id: 1,
        emailEnabled: true,
        instantAlerts: true,
        weeklyReports: false,
        emailAddress: process.env.NOTIFICATION_EMAIL || "aprilv120@gmail.com"
      };
    }
    
    Object.assign(this.alertSettings, settings);
    return { ...this.alertSettings };
  }
}

export const storage = new MemoryStorage();
