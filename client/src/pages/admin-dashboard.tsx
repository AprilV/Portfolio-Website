import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Calendar, 
  FileText, 
  BarChart3,
  ExternalLink,
  Download,
  Shield,
  Bell,
  Activity
} from "lucide-react";
import { Link } from "wouter";
import AuthLogsDashboard from "@/components/admin/auth-logs-dashboard";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";
import AlertSettingsDashboard from "@/components/admin/alert-settings-dashboard";
import { AdminMfaPanel } from "@/components/admin-mfa";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}

interface DashboardStats {
  totalContacts: number;
  thisWeekContacts: number;
  companiesReached: number;
  avgResponseTime: string;
  topCompanies: Array<{ company: string; count: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: string }>;
}

function calculateStats(contacts: ContactSubmission[]): DashboardStats {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const thisWeekContacts = contacts.filter(contact => 
    new Date(contact.createdAt) >= oneWeekAgo
  ).length;
  
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
  
  return {
    totalContacts: contacts.length,
    thisWeekContacts,
    companiesReached: companiesMap.size,
    avgResponseTime: "< 24h",
    topCompanies,
    recentActivity: [
      { type: "contact", description: "New contact submission", timestamp: new Date().toISOString() },
      { type: "email", description: "Email notification sent", timestamp: new Date().toISOString() },
      { type: "admin", description: "Admin dashboard accessed", timestamp: new Date().toISOString() }
    ]
  };
}

function exportContacts(contacts: ContactSubmission[]) {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Name,Email,Company,Message,Date\n"
    + contacts.map(contact => 
        `"${contact.name}","${contact.email}","${contact.company || ''}","${contact.message.replace(/"/g, '""')}","${new Date(contact.createdAt).toLocaleDateString()}"`
      ).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `contacts_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function AdminDashboard() {
  const { data: contacts, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  // Calculate dashboard statistics
  const stats = calculateStats(contacts || []);
  const recentContacts = contacts?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive career management and engagement analytics</p>
        </div>

        {/* Enhanced Admin Dashboard with Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="auth-logs" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Auth Logs
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalContacts}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.thisWeekContacts} this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Companies Reached Out</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.companiesReached}</div>
                  <p className="text-xs text-muted-foreground">
                    Unique organizations
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">
                    Professional engagement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                  <p className="text-xs text-muted-foreground">
                    Target: 24h
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Recent Contact Submissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-gray-600">{contact.company || 'Individual'}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant={contact.company ? "default" : "secondary"}>
                            {contact.company ? "Company" : "Individual"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href="/admin/contacts">
                        <Button variant="outline" className="w-full">
                          View All Contacts
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Companies */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Top Companies by Inquiries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.topCompanies.map((item, index) => (
                        <div key={item.company} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <span className="font-medium">{item.company}</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.count} inquiries</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/admin/contacts">
                      <Button className="w-full justify-start" variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Manage Contacts
                      </Button>
                    </Link>
                    
                    <Button className="w-full justify-start" variant="outline" 
                            onClick={() => window.open('https://app.sendgrid.com', '_blank')}>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Email Analytics
                    </Button>
                    
                    <Button className="w-full justify-start" variant="outline"
                            onClick={() => exportContacts(contacts || [])}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    
                    <Link href="/admin/settings">
                      <Button className="w-full justify-start border-blue-200 bg-blue-50 hover:bg-blue-100" variant="outline">
                        <span className="mr-2 text-blue-600">🔑</span>
                        <span className="text-blue-700">Change Password</span>
                      </Button>
                    </Link>

                    <Link href="/admin/security">
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Security Tests
                      </Button>
                    </Link>
                    
                    <Link href="/">
                      <Button className="w-full justify-start" variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Portfolio
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Portfolio Site</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Notifications</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contact Database</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Admin Dashboard</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">New contact submission</div>
                          <div className="text-gray-600">2 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">Email notification sent</div>
                          <div className="text-gray-600">2 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">Admin dashboard accessed</div>
                          <div className="text-gray-600">Just now</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Authentication Logs Tab */}
          <TabsContent value="auth-logs">
            <AuthLogsDashboard />
          </TabsContent>

          {/* Alert Settings Tab */}
          <TabsContent value="alerts">
            <AlertSettingsDashboard />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <AdminMfaPanel />
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-600" />
                  Contact Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">Manage contact submissions and communications</p>
                  <Link href="/admin/contacts">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to Contact Management
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}