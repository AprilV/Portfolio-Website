import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, MessageSquare, Phone, Save, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

interface AlertSettings {
  emailAlerts: boolean;
  slackWebhook: string;
  smsAlerts: boolean;
  twilioSid: string;
  twilioToken: string;
  twilioPhone: string;
  alertPhone: string;
}

interface AlertSettingsResponse {
  success: boolean;
  settings: AlertSettings;
}

const AlertSettingsDashboard = () => {
  const [settings, setSettings] = useState<AlertSettings>({
    emailAlerts: true,
    slackWebhook: "",
    smsAlerts: false,
    twilioSid: "",
    twilioToken: "",
    twilioPhone: "",
    alertPhone: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alertData, isLoading, error } = useQuery<AlertSettingsResponse>({
    queryKey: ['/api/admin/alert-settings'],
    queryFn: async () => {
      const response = await fetch('/api/admin/alert-settings', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch alert settings');
      }
      
      return response.json();
    },

  });

  const updateMutation = useMutation({
    mutationFn: async (newSettings: Partial<AlertSettings>) => {
      const response = await fetch('/api/admin/alert-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to update alert settings');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/alert-settings'] });
      toast({
        title: "Settings Updated",
        description: "Alert settings have been saved successfully.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update alert settings.",
        variant: "destructive"
      });
    }
  });

  const handleSave = () => {
    updateMutation.mutate(settings);
  };

  const handleInputChange = (field: keyof AlertSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading alert settings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Error Loading Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load alert settings. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Alert Settings</h2>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={updateMutation.isPending}
          className="bg-primary-blue hover:bg-primary-blue/90"
        >
          {updateMutation.isPending ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Configure email alerts for new contact submissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="emailAlerts"
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => handleInputChange('emailAlerts', checked)}
              />
              <Label htmlFor="emailAlerts">Enable email notifications</Label>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Auto-Responder Active</p>
                  <p className="text-sm text-blue-700">
                    Branded auto-reply emails are automatically sent to all contact form submissions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slack Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-500" />
              Slack Integration
            </CardTitle>
            <CardDescription>
              Get instant Slack notifications for new contacts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
              <Textarea
                id="slackWebhook"
                placeholder="https://hooks.slack.com/services/..."
                value={settings.slackWebhook}
                onChange={(e) => handleInputChange('slackWebhook', e.target.value)}
                className="min-h-[80px]"
              />
              <p className="text-xs text-gray-500">
                Create a webhook in your Slack workspace and paste the URL here
              </p>
            </div>

            {settings.slackWebhook && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">Slack webhook configured</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SMS Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-500" />
              SMS Notifications (Twilio Integration)
            </CardTitle>
            <CardDescription>
              Configure SMS alerts using Twilio for immediate notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="smsAlerts"
                checked={settings.smsAlerts}
                onCheckedChange={(checked) => handleInputChange('smsAlerts', checked)}
              />
              <Label htmlFor="smsAlerts">Enable SMS notifications</Label>
            </div>

            {settings.smsAlerts && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twilioSid">Twilio Account SID</Label>
                  <Input
                    id="twilioSid"
                    type="password"
                    placeholder="AC..."
                    value={settings.twilioSid}
                    onChange={(e) => handleInputChange('twilioSid', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twilioToken">Twilio Auth Token</Label>
                  <Input
                    id="twilioToken"
                    type="password"
                    placeholder="Auth token..."
                    value={settings.twilioToken}
                    onChange={(e) => handleInputChange('twilioToken', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twilioPhone">Twilio Phone Number</Label>
                  <Input
                    id="twilioPhone"
                    placeholder="+1234567890"
                    value={settings.twilioPhone}
                    onChange={(e) => handleInputChange('twilioPhone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alertPhone">Your Phone Number</Label>
                  <Input
                    id="alertPhone"
                    placeholder="+1234567890"
                    value={settings.alertPhone}
                    onChange={(e) => handleInputChange('alertPhone', e.target.value)}
                  />
                </div>
              </div>
            )}

            {!settings.smsAlerts && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Enable SMS alerts above to configure Twilio integration for instant notifications.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Test Section */}
      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
          <CardDescription>
            Test your notification setup with sample alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <Mail className="w-4 h-4 mr-2" />
              Test Email (Auto-enabled)
            </Button>
            
            <Button variant="outline" size="sm" disabled={!settings.slackWebhook}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Test Slack
            </Button>
            
            <Button variant="outline" size="sm" disabled={!settings.smsAlerts}>
              <Phone className="w-4 h-4 mr-2" />
              Test SMS
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Test buttons will be enabled once the respective services are configured.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertSettingsDashboard;