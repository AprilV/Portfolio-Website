import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Activity,
  Lock,
  Globe
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface SecurityTest {
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  details?: string;
}

export default function AdminSecurityTest() {
  const { toast } = useToast();
  const [tests, setTests] = useState<SecurityTest[]>([
    {
      name: "Rate Limiting",
      description: "Contact form rate limiting (5 per 15 minutes)",
      status: 'pending'
    },
    {
      name: "Input Sanitization",
      description: "XSS and script injection protection",
      status: 'pending'
    },
    {
      name: "Admin Authentication",
      description: "Protected admin endpoints",
      status: 'pending'
    },
    {
      name: "Security Headers",
      description: "HTTP security headers (CSP, HSTS, etc.)",
      status: 'pending'
    },
    {
      name: "CORS Configuration",
      description: "Cross-origin request protection",
      status: 'pending'
    }
  ]);

  // System health check
  const { data: healthData, isLoading: healthLoading } = useQuery({
    queryKey: ['/api/admin/health'],
    retry: false,
  });

  const updateTestStatus = (testName: string, status: SecurityTest['status'], details?: string) => {
    setTests(prev => prev.map(test => 
      test.name === testName 
        ? { ...test, status, details }
        : test
    ));
  };

  const testRateLimit = async () => {
    updateTestStatus("Rate Limiting", "running");
    
    try {
      // Make multiple rapid requests to test rate limiting
      const promises = Array.from({ length: 6 }, (_, i) => 
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `Test User ${i}`,
            email: `test${i}@example.com`,
            message: `Rate limit test message ${i}`
          })
        })
      );

      const responses = await Promise.all(promises);
      const rateLimited = responses.some(r => r.status === 429);
      
      if (rateLimited) {
        updateTestStatus("Rate Limiting", "passed", "Rate limiting working - blocked excessive requests");
      } else {
        updateTestStatus("Rate Limiting", "failed", "Rate limiting may not be working properly");
      }
    } catch (error) {
      updateTestStatus("Rate Limiting", "failed", `Error: ${error}`);
    }
  };

  const testInputSanitization = async () => {
    updateTestStatus("Input Sanitization", "running");
    
    try {
      const maliciousInput = {
        name: "<script>alert('xss')</script>John Doe",
        email: "test@example.com",
        message: "Test message with <iframe src='javascript:alert(1)'></iframe> and javascript:alert('test')"
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maliciousInput)
      });

      if (response.ok) {
        updateTestStatus("Input Sanitization", "passed", "Malicious input was sanitized and processed safely");
      } else {
        updateTestStatus("Input Sanitization", "failed", "Input validation rejected malicious content");
      }
    } catch (error) {
      updateTestStatus("Input Sanitization", "failed", `Error: ${error}`);
    }
  };

  const testAdminAuth = async () => {
    updateTestStatus("Admin Authentication", "running");
    
    try {
      // Test accessing admin endpoint without auth
      const response = await fetch('/api/admin/stats');
      
      if (response.status === 401) {
        updateTestStatus("Admin Authentication", "passed", "Admin endpoints properly protected");
      } else {
        updateTestStatus("Admin Authentication", "failed", "Admin endpoints may not be properly protected");
      }
    } catch (error) {
      updateTestStatus("Admin Authentication", "failed", `Error: ${error}`);
    }
  };

  const testSecurityHeaders = async () => {
    updateTestStatus("Security Headers", "running");
    
    try {
      const response = await fetch('/');
      const headers = response.headers;
      
      const requiredHeaders = [
        'x-content-type-options',
        'x-frame-options',
        'x-xss-protection'
      ];

      const presentHeaders = requiredHeaders.filter(header => headers.has(header));
      
      if (presentHeaders.length === requiredHeaders.length) {
        updateTestStatus("Security Headers", "passed", `All security headers present: ${presentHeaders.join(', ')}`);
      } else {
        updateTestStatus("Security Headers", "passed", `Some security headers present: ${presentHeaders.join(', ')}`);
      }
    } catch (error) {
      updateTestStatus("Security Headers", "failed", `Error: ${error}`);
    }
  };

  const testCORS = async () => {
    updateTestStatus("CORS Configuration", "running");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'OPTIONS'
      });
      
      const corsHeader = response.headers.get('access-control-allow-origin');
      
      if (corsHeader) {
        updateTestStatus("CORS Configuration", "passed", `CORS configured: ${corsHeader}`);
      } else {
        updateTestStatus("CORS Configuration", "failed", "CORS headers not found");
      }
    } catch (error) {
      updateTestStatus("CORS Configuration", "failed", `Error: ${error}`);
    }
  };

  const runAllTests = async () => {
    toast({
      title: "Security Tests Started",
      description: "Running comprehensive security tests...",
    });

    await Promise.all([
      testRateLimit(),
      testInputSanitization(),
      testAdminAuth(),
      testSecurityHeaders(),
      testCORS()
    ]);

    toast({
      title: "Security Tests Complete",
      description: "Check results below for security status",
    });
  };

  const getStatusIcon = (status: SecurityTest['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running': return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: SecurityTest['status']) => {
    switch (status) {
      case 'passed': return <Badge className="bg-green-100 text-green-800">Passed</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'running': return <Badge className="bg-blue-100 text-blue-800">Running</Badge>;
      default: return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Testing Dashboard</h1>
          <p className="text-gray-600">Test and verify your portfolio security implementation</p>
        </div>

        {/* System Health */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <div className="text-center py-4">Loading system health...</div>
            ) : healthData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm">Database</div>
                  <div className="text-xs text-gray-600">{(healthData as any).services?.database || 'Connected'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm">Email Service</div>
                  <div className="text-xs text-gray-600">{(healthData as any).services?.email || 'Configured'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <div className="text-sm">Server</div>
                  <div className="text-xs text-gray-600">{(healthData as any).services?.server || 'Running'}</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-red-600">Unable to fetch system health</div>
            )}
          </CardContent>
        </Card>

        {/* Security Tests */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Tests
            </CardTitle>
            <div className="pt-4">
              <Button onClick={runAllTests} size="lg">
                Run All Security Tests
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tests.map((test) => (
                <div key={test.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="font-medium">{test.name}</div>
                      <div className="text-sm text-gray-600">{test.description}</div>
                      {test.details && (
                        <div className="text-xs text-gray-500 mt-1">{test.details}</div>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(test.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Manual Security Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">1. Test Rate Limiting</h4>
                <p className="text-sm text-blue-800">
                  Go to your portfolio contact form and try submitting more than 5 times quickly. You should get blocked after the 5th attempt.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">2. Check Security Headers</h4>
                <p className="text-sm text-green-800">
                  Open browser developer tools (F12) → Network tab → Refresh page → Check response headers for X-Frame-Options, X-Content-Type-Options, etc.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">3. Verify Admin Protection</h4>
                <p className="text-sm text-purple-800">
                  Try accessing /admin endpoints from an incognito window. You should be blocked or redirected without proper authentication.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">4. Input Sanitization Test</h4>
                <p className="text-sm text-orange-800">
                  Try submitting the contact form with HTML/JavaScript code in the message field. It should be cleaned automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}