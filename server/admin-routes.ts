import type { Express } from "express";
import { adminAuth, adminLimiter, authenticateAdmin, logoutAdmin, changeAdminPassword } from "./security";
import { storage } from "./storage";

export function registerAdminRoutes(app: Express) {
  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Password is required"
        });
      }

      const sessionToken = authenticateAdmin(password);
      
      if (!sessionToken) {
        console.log(`🚫 FAILED ADMIN LOGIN ATTEMPT from ${req.ip} at ${new Date().toISOString()}`);
        return res.status(401).json({
          success: false,
          message: "Invalid password"
        });
      }

      console.log(`✅ SUCCESSFUL ADMIN LOGIN from ${req.ip} at ${new Date().toISOString()}`);
      
      // Set secure cookie
      res.cookie('adminSession', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
        sameSite: 'strict'
      });

      res.json({
        success: true,
        message: "Authentication successful",
        token: sessionToken
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({
        success: false,
        message: "Authentication error"
      });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", async (req, res) => {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.adminSession;
    
    if (sessionToken) {
      logoutAdmin(sessionToken);
    }
    
    res.clearCookie('adminSession');
    res.json({ success: true, message: "Logged out successfully" });
  });

  // Admin password change endpoint
  app.post("/api/admin/change-password", adminAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password and new password are required"
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long"
        });
      }

      const success = changeAdminPassword(currentPassword, newPassword);
      
      if (!success) {
        console.log(`🚫 FAILED ADMIN PASSWORD CHANGE from ${req.ip} at ${new Date().toISOString()}`);
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect"
        });
      }

      console.log(`🔑 SUCCESSFUL ADMIN PASSWORD CHANGE from ${req.ip} at ${new Date().toISOString()}`);
      
      res.json({
        success: true,
        message: "Password changed successfully"
      });
    } catch (error) {
      console.error("Admin password change error:", error);
      res.status(500).json({
        success: false,
        message: "Password change error"
      });
    }
  });

  // Admin authentication status
  app.get("/api/admin/status", adminAuth, async (req, res) => {
    res.json({
      authenticated: true,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Admin dashboard statistics
  app.get("/api/admin/stats", adminAuth, async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      
      // Calculate weekly contacts
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const weeklyContacts = contacts.filter(
        contact => new Date(contact.createdAt) > oneWeekAgo
      ).length;

      // Calculate company statistics
      const companiesMap = new Map<string, number>();
      contacts.forEach(contact => {
        if (contact.company) {
          companiesMap.set(contact.company, (companiesMap.get(contact.company) || 0) + 1);
        }
      });

      const topCompanies = Array.from(companiesMap.entries())
        .map(([company, count]) => ({ company, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const stats = {
        totalContacts: contacts.length,
        weeklyContacts,
        uniqueCompanies: companiesMap.size,
        topCompanies,
        averageResponseTime: "24h",
        systemStatus: {
          portfolio: "online",
          email: "active",
          database: "connected",
          admin: "operational"
        }
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Admin settings endpoints
  app.get("/api/admin/settings", adminAuth, async (req, res) => {
    // Return current admin settings (this would be stored in database in production)
    const settings = {
      notifications: {
        emailEnabled: true,
        instantAlerts: true,
        weeklyReports: false,
        emailAddress: process.env.NOTIFICATION_EMAIL || "aprilv120@gmail.com"
      },
      security: {
        adminPasswordProtection: !!process.env.ADMIN_TOKEN,
        sessionTimeout: "24h",
        ipWhitelist: []
      },
      portfolio: {
        maintenanceMode: false,
        showLastUpdated: true,
        enableAnalytics: true,
        customMessage: ""
      }
    };

    res.json(settings);
  });

  app.post("/api/admin/settings", adminAuth, async (req, res) => {
    try {
      // In a production app, you'd save these settings to a database
      // For now, we'll just acknowledge the update
      console.log("Admin settings updated:", req.body);
      
      res.json({
        success: true,
        message: "Settings updated successfully",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error updating admin settings:", error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  // Export contact data
  app.get("/api/admin/export", adminAuth, async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      
      // Prepare CSV data
      const csvData = [
        ['ID', 'Name', 'Email', 'Company', 'Message', 'Date Submitted'],
        ...contacts.map(contact => [
          contact.id.toString(),
          contact.name,
          contact.email,
          contact.company || '',
          contact.message.replace(/\r?\n/g, ' '), // Remove line breaks for CSV
          new Date(contact.createdAt).toISOString()
        ])
      ];

      const csvContent = csvData.map(row => 
        row.map(field => `"${field.replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="portfolio-contacts-${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csvContent);
    } catch (error) {
      console.error("Error exporting contact data:", error);
      res.status(500).json({ error: "Failed to export data" });
    }
  });

  // System health check
  app.get("/api/admin/health", adminAuth, async (req, res) => {
    try {
      // Check database connection
      const dbTest = await storage.getContactSubmissions();
      
      // Check email service
      const emailStatus = !!process.env.SENDGRID_API_KEY;
      
      const health = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        services: {
          database: dbTest !== null ? "connected" : "error",
          email: emailStatus ? "configured" : "not_configured",
          server: "running"
        },
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development'
      };

      res.json(health);
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({
        status: "unhealthy",
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  });
}