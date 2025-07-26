import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Activity, AlertTriangle, CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface AuthLog {
  id: number;
  username: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  action: string;
  timestamp: string;
  success: boolean;
}

interface AuthLogsResponse {
  success: boolean;
  logs: AuthLog[];
  summary: {
    total: number;
    successful: number;
    failed: number;
    uniqueIPs: number;
  };
}

const AuthLogsDashboard = () => {
  const [timeFilter, setTimeFilter] = useState<'recent' | 'all'>('recent');
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: authData, isLoading, error, refetch } = useQuery<AuthLogsResponse>({
    queryKey: ['/api/admin/auth-logs', timeFilter, refreshKey],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (timeFilter === 'recent') {
        params.append('recent', 'true');
        params.append('hours', '24');
      } else {
        params.append('limit', '100');
      }
      
      const response = await fetch(`/api/admin/auth-logs?${params}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch auth logs');
      }
      
      return response.json();
    },
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  const getActionBadge = (action: string, success: boolean) => {
    switch (action) {
      case 'login_success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Login Success</Badge>;
      case 'login_failed':
        return <Badge variant="destructive">Login Failed</Badge>;
      case 'logout':
        return <Badge variant="secondary">Logout</Badge>;
      case 'access_denied':
        return <Badge variant="destructive">Access Denied</Badge>;
      default:
        return <Badge variant={success ? "default" : "destructive"}>{action}</Badge>;
    }
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading authentication logs...</p>
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
            Error Loading Auth Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load authentication logs. Please try again.</p>
          <Button onClick={handleRefresh} variant="outline" className="mt-2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const logs = authData?.logs || [];
  const summary = authData?.summary || { total: 0, successful: 0, failed: 0, uniqueIPs: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Authentication Logs</h2>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{summary.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{summary.successful}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold text-red-600">{summary.failed}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unique IPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{summary.uniqueIPs}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Authentication Activity</CardTitle>
              <CardDescription>
                Recent authentication attempts and admin activities
              </CardDescription>
            </div>
            <Tabs value={timeFilter} onValueChange={(value) => setTimeFilter(value as 'recent' | 'all')}>
              <TabsList>
                <TabsTrigger value="recent">Last 24h</TabsTrigger>
                <TabsTrigger value="all">All (Last 100)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No authentication logs found for the selected period.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>User Agent</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.success)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getActionBadge(log.action, log.success)}
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {log.ipAddress || 'Unknown'}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate text-sm text-gray-600" title={log.userAgent || 'Unknown'}>
                          {log.userAgent || 'Unknown'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLogsDashboard;