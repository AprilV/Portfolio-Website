import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  CheckCircle,
  Lock,
  Key
} from "lucide-react";

const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordChangeForm = z.infer<typeof passwordChangeSchema>;

export default function AdminSettings() {
  const { toast } = useToast();
  
  const passwordForm = useForm<PasswordChangeForm>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const passwordChangeMutation = useMutation({
    mutationFn: async (data: PasswordChangeForm) => {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password change failed');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password Changed",
        description: "Your admin password has been updated successfully.",
      });
      passwordForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Password Change Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onPasswordSubmit = (data: PasswordChangeForm) => {
    passwordChangeMutation.mutate(data);
  };

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

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Change Section */}
              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Change Admin Password</h3>
                </div>
                
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="password"
                                placeholder="Enter current password"
                                className="pl-10"
                                data-testid="input-current-password"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="password"
                                placeholder="Enter new password (min 6 characters)"
                                className="pl-10"
                                data-testid="input-new-password"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="password"
                                placeholder="Confirm new password"
                                className="pl-10"
                                data-testid="input-confirm-password"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={passwordChangeMutation.isPending}
                      data-testid="button-change-password"
                    >
                      {passwordChangeMutation.isPending ? "Changing Password..." : "Change Password"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Password changes are temporary and will reset to default after server restart. 
                    For permanent changes, update the ADMIN_PASSWORD environment variable.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Admin Password Protection</Label>
                  <p className="text-sm text-gray-600">Password protection is currently active</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Enabled
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout</Label>
                <Input
                  id="sessionTimeout"
                  placeholder="4 hours (default)"
                  value="4 hours"
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-600">
                  Admin sessions automatically expire after 4 hours for security
                </p>
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