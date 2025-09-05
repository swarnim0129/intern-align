import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Users, 
  Building2,
  Download,
  RefreshCw,
  Calendar
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', applications: 1200, matches: 980, success_rate: 81.7, satisfaction: 87 },
    { month: 'Feb', applications: 1450, matches: 1180, success_rate: 81.4, satisfaction: 89 },
    { month: 'Mar', applications: 1890, matches: 1520, success_rate: 80.4, satisfaction: 91 },
    { month: 'Apr', applications: 2340, matches: 1980, success_rate: 84.6, satisfaction: 93 },
    { month: 'May', applications: 2100, matches: 1750, success_rate: 83.3, satisfaction: 92 },
    { month: 'Jun', applications: 2450, matches: 2180, success_rate: 89.0, satisfaction: 94 }
  ];

  const industryBreakdown = [
    { name: 'Technology', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Finance', value: 22, color: 'hsl(var(--chart-2))' },
    { name: 'Healthcare', value: 18, color: 'hsl(var(--chart-3))' },
    { name: 'Manufacturing', value: 15, color: 'hsl(var(--chart-4))' },
    { name: 'Consulting', value: 10, color: 'hsl(var(--chart-5))' }
  ];

  const geographicData = [
    { region: 'West Coast', students: 3200, companies: 89, matches: 2680 },
    { region: 'East Coast', students: 2800, companies: 76, matches: 2240 },
    { region: 'Midwest', students: 2100, companies: 54, matches: 1720 },
    { region: 'South', students: 2400, companies: 65, matches: 2000 },
    { region: 'Southwest', students: 1900, companies: 43, matches: 1560 }
  ];

  const algorithmMetrics = [
    { metric: 'Processing Time', value: '1.2s', trend: '+15%', description: 'Average time to process matches' },
    { metric: 'Accuracy Score', value: '94.2%', trend: '+2.1%', description: 'Successful match prediction rate' },
    { metric: 'Bias Detection', value: '0.03', trend: '-12%', description: 'Fairness coefficient (lower is better)' },
    { metric: 'Coverage Rate', value: '89.5%', trend: '+5.2%', description: 'Percentage of students receiving matches' }
  ];

  const MetricCard = ({ title, value, icon: Icon, trend, color = "primary" }) => (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className="text-xs text-success mt-1">
            {trend} from last period
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Advanced Analytics</h1>
          <p className="text-muted-foreground">Deep insights into matching algorithm performance and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Processed"
          value="12,847"
          icon={Users}
          trend="+12%"
          color="primary"
        />
        <MetricCard
          title="Match Success Rate"
          value="89.0%"
          icon={Target}
          trend="+5.3%"
          color="success"
        />
        <MetricCard
          title="Partner Companies"
          value="256"
          icon={Building2}
          trend="+8%"
          color="chart-2"
        />
        <MetricCard
          title="Performance Score"
          value="94.2"
          icon={TrendingUp}
          trend="+2.1%"
          color="chart-1"
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Analysis</TabsTrigger>
          <TabsTrigger value="industry">Industry Breakdown</TabsTrigger>
          <TabsTrigger value="algorithm">Algorithm Metrics</TabsTrigger>
        </TabsList>

        {/* Performance Trends */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-card border-border/20">
              <CardHeader>
                <CardTitle className="text-foreground">Application vs Match Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly comparison of applications received and successful matches</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
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
                      <Area 
                        type="monotone" 
                        dataKey="applications" 
                        stackId="1"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1) / 0.2)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="matches" 
                        stackId="2"
                        stroke="hsl(var(--success))"
                        fill="hsl(var(--success) / 0.2)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/20">
              <CardHeader>
                <CardTitle className="text-foreground">Success Rate & Satisfaction</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly success rate and user satisfaction scores</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
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
                        dataKey="success_rate" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="satisfaction" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Analysis */}
        <TabsContent value="geographic" className="space-y-6">
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="text-foreground">Regional Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Student applications, company partnerships, and matches by region</p>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geographicData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="region" 
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
                    <Bar dataKey="students" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="companies" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="matches" fill="hsl(var(--success))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Breakdown */}
        <TabsContent value="industry" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-card border-border/20">
              <CardHeader>
                <CardTitle className="text-foreground">Industry Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Percentage of matches by industry sector</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {industryBreakdown.map((entry, index) => (
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
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/20">
              <CardHeader>
                <CardTitle className="text-foreground">Industry Performance</CardTitle>
                <p className="text-sm text-muted-foreground">Match success rates by industry</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryBreakdown.map((industry, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: industry.color }}></div>
                          <span className="text-sm font-medium text-foreground">{industry.name}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{industry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Algorithm Metrics */}
        <TabsContent value="algorithm" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {algorithmMetrics.map((metric, index) => (
              <Card key={index} className="bg-gradient-card border-border/20">
                <CardHeader>
                  <CardTitle className="text-foreground">{metric.metric}</CardTitle>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                    <Badge className="bg-success text-success-foreground">
                      {metric.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;