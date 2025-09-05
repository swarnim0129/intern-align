import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  Filter,
  UserCheck,
  UserX,
  Clock,
  GraduationCap,
  MapPin,
  Mail
} from "lucide-react";

const Students = () => {
  const studentStats = {
    total: 12847,
    matched: 8932,
    pending: 2105,
    rejected: 1810
  };

  const recentStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      major: "Computer Science",
      year: "Senior",
      gpa: 3.8,
      location: "New York, NY",
      status: "matched",
      company: "TechCorp Inc.",
      skills: ["React", "Python", "Machine Learning"]
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@university.edu",
      major: "Business Analytics",
      year: "Junior",
      gpa: 3.6,
      location: "San Francisco, CA",
      status: "pending",
      company: null,
      skills: ["SQL", "Tableau", "Excel"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@university.edu",
      major: "Mechanical Engineering",
      year: "Senior",
      gpa: 3.9,
      location: "Austin, TX",
      status: "matched",
      company: "Boeing",
      skills: ["CAD", "MATLAB", "Project Management"]
    },
    {
      id: 4,
      name: "Alex Thompson",
      email: "alex.t@university.edu",
      major: "Marketing",
      year: "Junior",
      gpa: 3.4,
      location: "Chicago, IL",
      status: "rejected",
      company: null,
      skills: ["Digital Marketing", "Analytics", "Adobe Creative"]
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.w@university.edu",
      major: "Data Science",
      year: "Senior",
      gpa: 3.7,
      location: "Seattle, WA",
      status: "pending",
      company: null,
      skills: ["Python", "R", "Deep Learning", "Statistics"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'matched':
        return <Badge className="bg-success text-success-foreground">Matched</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
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
        <div className="text-2xl font-bold text-foreground">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Manage and track student applications and matches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            Add Student
          </Button>
        </div>
      </div>

      {/* Student Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={studentStats.total}
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Successfully Matched"
          value={studentStats.matched}
          icon={UserCheck}
          color="success"
        />
        <StatCard
          title="Pending Applications"
          value={studentStats.pending}
          icon={Clock}
          color="warning"
        />
        <StatCard
          title="Rejected Applications"
          value={studentStats.rejected}
          icon={UserX}
          color="destructive"
        />
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border/20">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search students by name, email, or major..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Major</Button>
              <Button variant="outline" size="sm">Status</Button>
              <Button variant="outline" size="sm">Location</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Students Table */}
      <Card className="bg-gradient-card border-border/20">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Students</CardTitle>
          <p className="text-sm text-muted-foreground">Latest student applications and their status</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1 space-y-2 md:space-y-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{student.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground md:ml-13">
                    <span>{student.major} • {student.year}</span>
                    <span>GPA: {student.gpa}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {student.location}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 md:ml-13">
                    {student.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {student.company && (
                    <div className="text-sm text-muted-foreground md:ml-13">
                      Matched with: <span className="font-medium text-foreground">{student.company}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  {getStatusBadge(student.status)}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;