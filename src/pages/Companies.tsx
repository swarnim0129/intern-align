import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Search, 
  Filter,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  Building,
  Globe,
  Mail
} from "lucide-react";

const Companies = () => {
  const companyStats = {
    total: 256,
    active: 156,
    allocated: 78,
    pending: 22
  };

  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      industry: "Technology",
      location: "San Francisco, CA",
      website: "techcorp.com",
      email: "hr@techcorp.com",
      totalPositions: 25,
      filledPositions: 18,
      pendingApplications: 45,
      status: "active",
      description: "Leading technology company specializing in AI and machine learning solutions.",
      requirements: ["Computer Science", "Engineering", "Data Science"]
    },
    {
      id: 2,
      name: "Boeing",
      industry: "Aerospace",
      location: "Seattle, WA",
      website: "boeing.com",
      email: "careers@boeing.com",
      totalPositions: 15,
      filledPositions: 12,
      pendingApplications: 28,
      status: "active",
      description: "Global aerospace company designing and manufacturing commercial airplanes.",
      requirements: ["Mechanical Engineering", "Aerospace Engineering", "Materials Science"]
    },
    {
      id: 3,
      name: "Goldman Sachs",
      industry: "Finance",
      location: "New York, NY",
      website: "goldmansachs.com",
      email: "internships@gs.com",
      totalPositions: 30,
      filledPositions: 30,
      pendingApplications: 0,
      status: "allocated",
      description: "Leading global investment banking, securities and investment management firm.",
      requirements: ["Finance", "Economics", "Business Analytics", "Mathematics"]
    },
    {
      id: 4,
      name: "Startup Innovations",
      industry: "Technology",
      location: "Austin, TX",
      website: "startupinnovations.io",
      email: "team@startupinnovations.io",
      totalPositions: 8,
      filledPositions: 0,
      pendingApplications: 12,
      status: "pending",
      description: "Fast-growing startup focused on innovative web technologies and digital solutions.",
      requirements: ["Computer Science", "Web Development", "UI/UX Design"]
    },
    {
      id: 5,
      name: "Johnson & Johnson",
      industry: "Healthcare",
      location: "New Brunswick, NJ",
      website: "jnj.com",
      email: "internships@jnj.com",
      totalPositions: 20,
      filledPositions: 14,
      pendingApplications: 33,
      status: "active",
      description: "American multinational corporation focused on pharmaceuticals, medical devices and consumer goods.",
      requirements: ["Biomedical Engineering", "Chemistry", "Biology", "Business"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'allocated':
        return <Badge className="bg-primary text-primary-foreground">Fully Allocated</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-warning text-warning">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = "primary" }) => (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Management</h1>
          <p className="text-muted-foreground">Manage partner companies and internship positions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            Add Company
          </Button>
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Companies"
          value={companyStats.total}
          icon={Building2}
          color="primary"
        />
        <StatCard
          title="Active Companies"
          value={companyStats.active}
          icon={CheckCircle}
          color="success"
        />
        <StatCard
          title="Fully Allocated"
          value={companyStats.allocated}
          icon={Users}
          color="chart-1"
        />
        <StatCard
          title="Pending Review"
          value={companyStats.pending}
          icon={Clock}
          color="warning"
        />
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border/20">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search companies by name, industry, or location..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Industry</Button>
              <Button variant="outline" size="sm">Status</Button>
              <Button variant="outline" size="sm">Location</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Companies List */}
      <div className="grid gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="bg-gradient-card border-border/20 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Company Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                    {getStatusBadge(company.status)}
                  </div>

                  <p className="text-sm text-muted-foreground">{company.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {company.website}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {company.email}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Required Majors:</p>
                    <div className="flex flex-wrap gap-1">
                      {company.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats and Progress */}
                <div className="lg:w-80 space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">{company.totalPositions}</div>
                      <div className="text-xs text-muted-foreground">Total Positions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{company.filledPositions}</div>
                      <div className="text-xs text-muted-foreground">Filled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning">{company.pendingApplications}</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Position Fill Rate</span>
                      <span className="font-medium text-foreground">
                        {Math.round((company.filledPositions / company.totalPositions) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(company.filledPositions / company.totalPositions) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Manage Positions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Companies;