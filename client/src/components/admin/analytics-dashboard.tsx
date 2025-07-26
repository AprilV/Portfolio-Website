import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Users, Building2, Calendar, RefreshCw, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

interface Analytics {
  id: number;
  date: string;
  contactCount: number;
  uniqueVisitors: number;
  topCompanies: string[];
  createdAt: string;
}

interface AnalyticsResponse {
  success: boolean;
  analytics: Analytics[];
  dailyCounts: { date: string; count: number }[];
  summary: {
    totalContacts: number;
    averageDaily: string;
    topCompanies: string[];
  };
}

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('30');
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: analyticsData, isLoading, error, refetch } = useQuery<AnalyticsResponse>({
    queryKey: ['/api/admin/analytics', timeRange, refreshKey],
    queryFn: async () => {
      const response = await fetch(`/api/admin/analytics?days=${timeRange}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      return response.json();
    },
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading analytics...</p>
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
            Error Loading Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load analytics data. Please try again.</p>
          <Button onClick={handleRefresh} variant="outline" className="mt-2">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const data = analyticsData || { analytics: [], dailyCounts: [], summary: { totalContacts: 0, averageDaily: '0', topCompanies: [] } };
  
  // Format data for charts
  const chartData = data.dailyCounts.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    contacts: item.count,
    fullDate: item.date
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Engagement Analytics</h2>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as '7' | '30' | '90')}>
            <TabsList>
              <TabsTrigger value="7">7 Days</TabsTrigger>
              <TabsTrigger value="30">30 Days</TabsTrigger>
              <TabsTrigger value="90">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{data.summary.totalContacts}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last {timeRange} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Daily Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">{data.summary.averageDaily}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Contacts per day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{data.summary.topCompanies.length}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {data.summary.topCompanies.slice(0, 3).map((company, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {company}
                </Badge>
              ))}
              {data.summary.topCompanies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{data.summary.topCompanies.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Contact Trend
            </CardTitle>
            <CardDescription>
              Daily contact submissions over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return format(new Date(payload[0].payload.fullDate), 'MMMM dd, yyyy');
                      }
                      return label;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contacts" 
                    stroke="#2C73D2" 
                    strokeWidth={2}
                    dot={{ fill: '#2C73D2', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Contact Volume Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contact Volume
            </CardTitle>
            <CardDescription>
              Daily contact volume distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label, payload) => {
                      if (payload && payload[0]) {
                        return format(new Date(payload[0].payload.fullDate), 'MMMM dd, yyyy');
                      }
                      return label;
                    }}
                  />
                  <Bar dataKey="contacts" fill="#43D8C9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analytics Data</CardTitle>
          <CardDescription>
            Last {Math.min(data.analytics.length, 10)} days of activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.analytics.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No analytics data available for the selected period.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.analytics.slice(0, 10).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{format(new Date(item.date), 'MMMM dd, yyyy')}</p>
                      <p className="text-sm text-gray-500">
                        {item.contactCount} contact{item.contactCount !== 1 ? 's' : ''}
                        {item.topCompanies.length > 0 && (
                          <span className="ml-2">
                            from {item.topCompanies.slice(0, 2).join(', ')}
                            {item.topCompanies.length > 2 && ` +${item.topCompanies.length - 2} more`}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {item.contactCount}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;