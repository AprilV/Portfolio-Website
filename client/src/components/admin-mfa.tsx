import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Mail, Copy, RefreshCw, Key, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MfaStatus {
  enabled: boolean;
  email: string | null;
  hasBackupCodes: boolean;
  backupCodesCount: number;
}

interface MfaSetupResponse {
  success: boolean;
  message: string;
  backupCodes?: string[];
}

export function AdminMfaPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [showCodes, setShowCodes] = useState(false);

  // Fetch MFA status
  const { data: mfaStatus, isLoading } = useQuery<MfaStatus>({
    queryKey: ['/api/admin/mfa/status'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Setup MFA mutation
  const setupMfaMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/admin/mfa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return response.json() as Promise<MfaSetupResponse>;
    },
    onSuccess: (data: MfaSetupResponse) => {
      if (data.success) {
        setGeneratedCodes(data.backupCodes || []);
        setShowCodes(true);
        toast({
          title: "MFA Setup Complete",
          description: "Two-factor authentication has been enabled successfully.",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/admin/mfa/status'] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "MFA Setup Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Password reset request mutation
  const resetRequestMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/admin/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json() as Promise<{ success: boolean; message: string }>;
    },
    onSuccess: () => {
      toast({
        title: "Reset Code Sent",
        description: "Check your email for the password reset verification code.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Reset Request Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Password reset confirm mutation
  const resetConfirmMutation = useMutation({
    mutationFn: async ({ code, password }: { code: string; password: string }) => {
      const response = await fetch('/api/admin/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, newPassword: password }),
      });
      return response.json() as Promise<{ success: boolean; message: string }>;
    },
    onSuccess: () => {
      setResetCode('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "Password Reset Complete",
        description: "Your admin password has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Password Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Backup code verification mutation
  const verifyBackupMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch('/api/admin/mfa/verify-backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      return response.json() as Promise<{ success: boolean; message: string }>;
    },
    onSuccess: () => {
      setBackupCode('');
      toast({
        title: "Backup Code Verified",
        description: "The backup code has been successfully verified and used.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/mfa/status'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Regenerate backup codes mutation
  const regenerateCodesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/admin/mfa/regenerate-backup-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json() as Promise<MfaSetupResponse>;
    },
    onSuccess: (data: MfaSetupResponse) => {
      if (data.success) {
        setGeneratedCodes(data.backupCodes || []);
        setShowCodes(true);
        toast({
          title: "Backup Codes Regenerated",
          description: "New backup codes have been generated. Save them securely.",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/admin/mfa/status'] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Regeneration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSetupMfa = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    setupMfaMutation.mutate(email);
  };

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    resetConfirmMutation.mutate({ code: resetCode, password: newPassword });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    });
  };

  const copyAllCodes = () => {
    const codesText = generatedCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    toast({
      title: "All Codes Copied",
      description: "All backup codes copied to clipboard",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading MFA settings...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* MFA Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Multi-Factor Authentication Status
          </CardTitle>
          <CardDescription>
            Secure your admin account with email-based two-factor authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant={mfaStatus?.enabled ? "default" : "secondary"}>
                {mfaStatus?.enabled ? "Enabled" : "Disabled"}
              </Badge>
              {mfaStatus?.enabled && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {mfaStatus.email}
                </div>
              )}
            </div>
            {mfaStatus?.enabled && (
              <div className="text-sm text-muted-foreground">
                Backup codes: {mfaStatus.backupCodesCount}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Show backup codes if generated */}
      {showCodes && generatedCodes.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <AlertTriangle className="h-5 w-5" />
              Important: Save Your Backup Codes
            </CardTitle>
            <CardDescription className="text-orange-700 dark:text-orange-300">
              Store these codes securely. Each can only be used once and they're your only way to recover access if you lose email access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {generatedCodes.map((code, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border font-mono text-sm"
                >
                  <span>{code}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(code)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={copyAllCodes} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy All Codes
              </Button>
              <Button onClick={() => setShowCodes(false)} variant="outline" size="sm">
                I've Saved These Codes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">MFA Setup</TabsTrigger>
          <TabsTrigger value="recovery">Password Recovery</TabsTrigger>
          <TabsTrigger value="backup">Backup Codes</TabsTrigger>
        </TabsList>

        {/* MFA Setup Tab */}
        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle>Setup Multi-Factor Authentication</CardTitle>
              <CardDescription>
                Configure email-based MFA for enhanced security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!mfaStatus?.enabled ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Recovery Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleSetupMfa}
                    disabled={setupMfaMutation.isPending}
                    className="w-full"
                  >
                    {setupMfaMutation.isPending ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Setting up MFA...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Enable MFA
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    MFA is already enabled for {mfaStatus.email}. You can manage backup codes or reset your password using the other tabs.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Recovery Tab */}
        <TabsContent value="recovery">
          <Card>
            <CardHeader>
              <CardTitle>Password Recovery</CardTitle>
              <CardDescription>
                Reset your admin password using email verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!mfaStatus?.enabled ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    MFA must be enabled first to use password recovery.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Button
                      onClick={() => resetRequestMutation.mutate()}
                      disabled={resetRequestMutation.isPending}
                      variant="outline"
                      className="w-full"
                    >
                      {resetRequestMutation.isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Reset Code
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="resetCode">Verification Code</Label>
                      <Input
                        id="resetCode"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={handlePasswordReset}
                      disabled={resetConfirmMutation.isPending || !resetCode || !newPassword}
                      className="w-full"
                    >
                      {resetConfirmMutation.isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          <Key className="h-4 w-4 mr-2" />
                          Reset Password
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Codes Tab */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup Codes Management</CardTitle>
              <CardDescription>
                Manage your MFA backup codes for emergency access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!mfaStatus?.enabled ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    MFA must be enabled first to manage backup codes.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">Available Backup Codes</h4>
                      <p className="text-sm text-muted-foreground">
                        You have {mfaStatus.backupCodesCount} backup codes remaining
                      </p>
                    </div>
                    <Button
                      onClick={() => regenerateCodesMutation.mutate()}
                      disabled={regenerateCodesMutation.isPending}
                      variant="outline"
                    >
                      {regenerateCodesMutation.isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Generate New Codes
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="backupCode">Test Backup Code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="backupCode"
                        value={backupCode}
                        onChange={(e) => setBackupCode(e.target.value)}
                        placeholder="Enter backup code to test"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => verifyBackupMutation.mutate(backupCode)}
                        disabled={verifyBackupMutation.isPending || !backupCode}
                        variant="outline"
                      >
                        {verifyBackupMutation.isPending ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Note: Testing a backup code will consume it permanently
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}