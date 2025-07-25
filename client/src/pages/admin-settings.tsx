import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Mail, 
  User, 
  Shield, 
  Palette,
  Bell,
  Database,
  Download,
  Upload,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function AdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      emailEnabled: true,
      instantAlerts: true,
      weeklyReports: false,
      emailAddress: "aprilv120@gmail.com"
    },
    profile: {
      displayName: "April V. Sykes",
      title: "Assistant Project Manager",
      location: "Bremerton, WA",
      linkedinUrl: "https://linkedin.com/in/april-sykes",
      phoneNumber: "",
      bio: "IT Professional transitioning to Project Management with 20+ years of experience at Dell Technologies and extensive leadership background."
    },
    portfolio: {
      maintenanceMode: false,
      showLastUpdated: true,
      enableAnalytics: true,
      customMessage: ""
    },
    security: {
      adminPasswordProtection: false,
      ipWhitelist: "",
      sessionTimeout: "24h"
    }
  });

  const handleSaveSettings = () => {
    // Here you would typically save to your backend
    toast({
      title: "Settings Saved",
      description: "Your admin settings have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your portfolio data export will be ready shortly.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Feature",
      description: "Data import functionality coming soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
          <p className="text-gray-600">Configure your portfolio and admin preferences</p>
        </div>

        <div className="space-y-8">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive contact form submissions via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.emailEnabled}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, emailEnabled: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="instant-alerts">Instant Alerts</Label>
                      <p className="text-sm text-gray-600">Get immediate notifications for urgent contacts</p>
                    </div>
                    <Switch
                      id="instant-alerts"
                      checked={settings.notifications.instantAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, instantAlerts: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports">Weekly Reports</Label>
                      <p className="text-sm text-gray-600">Summary of weekly portfolio activity</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={settings.notifications.weeklyReports}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, weeklyReports: checked }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input
                      id="notification-email"
                      type="email"
                      value={settings.notifications.emailAddress}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, emailAddress: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Email System Status</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      SendGrid integration active with 50% delivery rate
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      value={settings.profile.displayName}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, displayName: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={settings.profile.title}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, title: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={settings.profile.location}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, location: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={settings.profile.linkedinUrl}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, linkedinUrl: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={settings.profile.phoneNumber}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, phoneNumber: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={settings.profile.bio}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, bio: e.target.value }
                        }))
                      }
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Portfolio Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Temporarily disable public access</p>
                    </div>
                    <Switch
                      id="maintenance-mode"
                      checked={settings.portfolio.maintenanceMode}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, maintenanceMode: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-updated">Show Last Updated</Label>
                      <p className="text-sm text-gray-600">Display when portfolio was last modified</p>
                    </div>
                    <Switch
                      id="show-updated"
                      checked={settings.portfolio.showLastUpdated}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, showLastUpdated: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Enable Analytics</Label>
                      <p className="text-sm text-gray-600">Track portfolio performance</p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={settings.portfolio.enableAnalytics}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, enableAnalytics: checked }
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="custom-message">Custom Message</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Add a custom message to display on your portfolio..."
                      value={settings.portfolio.customMessage}
                      onChange={(e) => 
                        setSettings(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, customMessage: e.target.value }
                        }))
                      }
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Portfolio Status</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Live at aprilsykes.com • Last updated: Today
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Export Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download all contact submissions and portfolio data
                    </p>
                    <Button onClick={handleExportData} variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Export All Data
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Import Data</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Restore or import portfolio data from backup
                    </p>
                    <Button onClick={handleImportData} variant="outline" className="w-full" disabled>
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data (Coming Soon)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} size="lg">
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}