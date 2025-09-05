import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  XCircle,
  Target,
  BarChart3
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Area, AreaChart } from 'recharts';

const Index = () => {
  // Mock data for the dashboard
  const overviewStats = {
    totalStudents: 12847,
    totalCompanies: 256,
    successfulMatches: 8932,
    matchingAccuracy: 94.2
  };

  const applicationData = [
    { name: 'Accepted', value: 8932, color: 'hsl(var(--success))' },
    { name: 'Pending', value: 2105, color: 'hsl(var(--warning))' },
    { name: 'Rejected', value: 1810, color: 'hsl(var(--destructive))' }
  ];

  const companyStatusData = [
    { name: 'Active', value: 156, color: 'hsl(var(--chart-1))' },
    { name: 'Allocated', value: 78, color: 'hsl(var(--chart-2))' },
    { name: 'Pending', value: 22, color: 'hsl(var(--chart-3))' }
  ];

  const monthlyTrends = [
    { month: 'Jan', applications: 1200, matches: 980, companies: 45 },
    { month: 'Feb', applications: 1450, matches: 1180, companies: 52 },
    { month: 'Mar', applications: 1890, matches: 1520, companies: 61 },
    { month: 'Apr', applications: 2340, matches: 1980, companies: 68 },
    { month: 'May', applications: 2100, matches: 1750, companies: 30 }
  ];

  const sectorDistribution = [
    { sector: 'Tech', students: 4200, companies: 89 },
    { sector: 'Finance', students: 2800, companies: 56 },
    { sector: 'Healthcare', students: 2100, companies: 42 },
    { sector: 'Manufacturing', students: 1900, companies: 38 },
    { sector: 'Consulting', students: 1847, companies: 31 }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color = "primary" }) => (
    <Card className="bg-gradient-card border-border/20 hover:shadow-glow transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className={`text-${trend.type === 'positive' ? 'success' : 'destructive'}`}>
              {trend.value}
            </span> from last month
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Internship Matching Dashboard</h1>
            <p className="text-muted-foreground">Real-time insights into student-company matching algorithm</p>
          </div>
          <Badge variant="outline" className="w-fit bg-gradient-primary text-primary-foreground border-0">
            <BarChart3 className="w-4 h-4 mr-1" />
            Live Analytics
          </Badge>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={overviewStats.totalStudents.toLocaleString()}
            icon={Users}
            trend={{ type: 'positive', value: '+12%' }}
            color="primary"
          />
          <StatCard
            title="Partner Companies"
            value={overviewStats.totalCompanies}
            icon={Building2}
            trend={{ type: 'positive', value: '+8%' }}
            color="chart-2"
          />
          <StatCard
            title="Successful Matches"
            value={overviewStats.successfulMatches.toLocaleString()}
            icon={CheckCircle}
            trend={{ type: 'positive', value: '+18%' }}
            color="success"
          />
          <StatCard
            title="Matching Accuracy"
            value={`${overviewStats.matchingAccuracy}%`}
            icon={Target}
            trend={{ type: 'positive', value: '+2.1%' }}
            color="chart-1"
          />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Application Status Distribution */}
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground">Application Status</CardTitle>
              <p className="text-sm text-muted-foreground">Student application breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {applicationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {applicationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Status */}
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground">Company Status</CardTitle>
              <p className="text-sm text-muted-foreground">Partner company breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={companyStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Trends</CardTitle>
              <p className="text-sm text-muted-foreground">Application & matching trends</p>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="matches" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Sector Analysis */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Sector Distribution */}
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground">Sector Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Students and companies by industry</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorDistribution.map((sector, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{sector.sector}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-foreground">{sector.students.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{sector.companies} companies</div>
                      </div>
                    </div>
                    <Progress 
                      value={(sector.students / overviewStats.totalStudents) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Performance Metrics */}
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground">AI Performance Metrics</CardTitle>
              <p className="text-sm text-muted-foreground">Algorithm effectiveness indicators</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Match Success Rate</span>
                    <span className="text-sm font-medium text-success">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Student Satisfaction</span>
                    <span className="text-sm font-medium text-success">91.8%</span>
                  </div>
                  <Progress value={91.8} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Company Satisfaction</span>
                    <span className="text-sm font-medium text-success">89.4%</span>
                  </div>
                  <Progress value={89.4} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing Speed</span>
                    <span className="text-sm font-medium text-chart-1">1.2s avg</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;