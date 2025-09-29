import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { 
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  CheckCircle, 
  Target,
  BarChart3
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const Dashboard = () => {
  // Region filters (dynamic, fetched from API)
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<boolean>(false);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [statesError, setStatesError] = useState<string>("");
  const [citiesError, setCitiesError] = useState<string>("");

  type RegionMetric = { applications: number; matches: number; companies: number; students: number };
  const metricsByRegion: Record<string, { total: RegionMetric; cities: Record<string, RegionMetric> }> = {
    Maharashtra: {
      total: { applications: 5200, matches: 4100, companies: 62, students: 6400 },
      cities: {
        Mumbai: { applications: 2500, matches: 2000, companies: 28, students: 3000 },
        Pune: { applications: 1800, matches: 1500, companies: 22, students: 2300 },
        Nagpur: { applications: 500, matches: 380, companies: 6, students: 650 },
        Nashik: { applications: 400, matches: 320, companies: 6, students: 450 },
      },
    },
    Karnataka: {
      total: { applications: 4300, matches: 3500, companies: 54, students: 5200 },
      cities: {
        Bengaluru: { applications: 3400, matches: 2900, companies: 44, students: 4100 },
        Mysuru: { applications: 500, matches: 380, companies: 6, students: 650 },
        Mangaluru: { applications: 400, matches: 320, companies: 4, students: 450 },
      },
    },
    Delhi: {
      total: { applications: 2100, matches: 1750, companies: 31, students: 2500 },
      cities: { "New Delhi": { applications: 2100, matches: 1750, companies: 31, students: 2500 } },
    },
    Telangana: {
      total: { applications: 2400, matches: 1900, companies: 35, students: 2900 },
      cities: { Hyderabad: { applications: 2000, matches: 1600, companies: 30, students: 2400 }, Warangal: { applications: 400, matches: 300, companies: 5, students: 500 } },
    },
    "Tamil Nadu": {
      total: { applications: 2600, matches: 2100, companies: 38, students: 3200 },
      cities: { Chennai: { applications: 1800, matches: 1500, companies: 26, students: 2200 }, Coimbatore: { applications: 500, matches: 400, companies: 8, students: 700 }, Madurai: { applications: 300, matches: 200, companies: 4, students: 300 } },
    },
    Gujarat: {
      total: { applications: 1900, matches: 1500, companies: 29, students: 2200 },
      cities: { Ahmedabad: { applications: 900, matches: 720, companies: 14, students: 1050 }, Surat: { applications: 600, matches: 480, companies: 9, students: 750 }, Vadodara: { applications: 400, matches: 300, companies: 6, students: 400 } },
    },
    "West Bengal": {
      total: { applications: 1700, matches: 1350, companies: 24, students: 2000 },
      cities: { Kolkata: { applications: 1400, matches: 1120, companies: 20, students: 1650 }, Howrah: { applications: 300, matches: 230, companies: 4, students: 350 } },
    },
  };

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Fetch states on mount
  useEffect(() => {
    let isMounted = true;
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        setStatesError("");
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const nextStates: string[] = json?.data?.states?.map((s: any) => s.name).filter(Boolean) ?? [];
        if (isMounted) setStates(nextStates.sort());
      } catch (e: any) {
        if (isMounted) setStatesError("Failed to load states. Please try again.");
      } finally {
        if (isMounted) setLoadingStates(false);
      }
    };
    fetchStates();
    return () => { isMounted = false; };
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    let isMounted = true;
    const fetchCities = async () => {
      if (!selectedState) { setCities([]); return; }
      try {
        setLoadingCities(true);
        setCitiesError("");
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India", state: selectedState }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const nextCities: string[] = json?.data ?? [];
        if (isMounted) setCities(Array.isArray(nextCities) ? nextCities.sort() : []);
      } catch (e: any) {
        if (isMounted) setCitiesError("Failed to load cities. Please try again.");
      } finally {
        if (isMounted) setLoadingCities(false);
      }
    };
    fetchCities();
    return () => { isMounted = false; };
  }, [selectedState]);
  const regionMetrics: RegionMetric | null = useMemo(() => {
    if (!selectedState) return null;
    const region = metricsByRegion[selectedState];
    if (!region) return null;
    if (selectedCity && region.cities[selectedCity]) return region.cities[selectedCity];
    return region.total;
  }, [selectedState, selectedCity]);

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

  // Derived, filtered analytics based on selected state/city
  const filteredApplicationData = useMemo(() => {
    if (!regionMetrics) return applicationData;
    const total = applicationData.reduce((s, d) => s + d.value, 0) || 1;
    return applicationData.map((d) => ({
      ...d,
      value: Math.round((d.value / total) * regionMetrics.applications),
    }));
  }, [regionMetrics]);

  const filteredCompanyStatusData = useMemo(() => {
    if (!regionMetrics) return companyStatusData;
    const total = companyStatusData.reduce((s, d) => s + d.value, 0) || 1;
    return companyStatusData.map((d, idx) => ({
      ...d,
      value: Math.round((d.value / total) * regionMetrics.companies),
    }));
  }, [regionMetrics]);

  const filteredMonthlyTrends = useMemo(() => {
    if (!regionMetrics) return monthlyTrends;
    const baseApps = monthlyTrends.reduce((s, m) => s + m.applications, 0) || 1;
    const baseMatches = monthlyTrends.reduce((s, m) => s + m.matches, 0) || 1;
    const appScale = regionMetrics.applications / baseApps;
    const matchScale = regionMetrics.matches / baseMatches;
    return monthlyTrends.map((m) => ({
      ...m,
      applications: Math.max(0, Math.round(m.applications * appScale)),
      matches: Math.max(0, Math.round(m.matches * matchScale)),
    }));
  }, [regionMetrics]);

  const filteredSectorDistribution = useMemo(() => {
    if (!regionMetrics) return sectorDistribution;
    const baseStudents = sectorDistribution.reduce((s, d) => s + d.students, 0) || 1;
    const baseCompanies = sectorDistribution.reduce((s, d) => s + d.companies, 0) || 1;
    const studentScale = regionMetrics.students / baseStudents;
    const companyScale = regionMetrics.companies / baseCompanies;
    return sectorDistribution.map((d) => ({
      ...d,
      students: Math.max(0, Math.round(d.students * studentScale)),
      companies: Math.max(0, Math.round(d.companies * companyScale)),
    }));
  }, [regionMetrics]);

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Real-time insights into student-company matching algorithm</p>
        </div>
        <Badge variant="outline" className="w-fit bg-gradient-primary text-primary-foreground border-0">
          <BarChart3 className="w-4 h-4 mr-1" />
          Live Analytics
        </Badge>
      </div>

      {/* Region Filters */}
      <Card className="bg-gradient-card border-border/20">
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">State</label>
              <Select value={selectedState} onValueChange={(v) => { setSelectedState(v); setSelectedCity(""); }} disabled={loadingStates || !!statesError}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingStates ? "Loading states..." : (statesError || "Select a state")} />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState || loadingCities || !!citiesError}>
                <SelectTrigger>
                  <SelectValue placeholder={!selectedState ? "Select state first" : (loadingCities ? "Loading cities..." : (citiesError || "Select a city"))} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => { setSelectedState(""); setSelectedCity(""); }}>Clear Filters</Button>
            </div>
          </div>
          {(statesError || citiesError) && (
            <div className="mt-2 text-xs text-destructive">{statesError || citiesError}</div>
          )}
        </CardContent>
      </Card>

      {/* Region Summary */}
      {regionMetrics && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title={`Applications${selectedCity ? ` • ${selectedCity}` : ` • ${selectedState}`}`} value={regionMetrics.applications.toLocaleString()} icon={Users} color="chart-1" />
          <StatCard title="Matches (Region)" value={regionMetrics.matches.toLocaleString()} icon={CheckCircle} color="success" />
          <StatCard title="Companies (Region)" value={regionMetrics.companies} icon={Building2} color="chart-2" />
          <StatCard title="Students (Region)" value={regionMetrics.students.toLocaleString()} icon={Users} color="primary" />
        </div>
      )}

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
                    data={filteredApplicationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {filteredApplicationData.map((entry, index) => (
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
              {filteredApplicationData.map((item, index) => (
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
                <BarChart data={filteredCompanyStatusData}>
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
                <LineChart data={filteredMonthlyTrends}>
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
              {filteredSectorDistribution.map((sector, index) => (
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
  );
};

export default Dashboard;