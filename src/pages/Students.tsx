import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  major: string;
  year: string;
  gpa: number;
  location: string;
  status: "matched" | "pending" | "rejected" | string;
  company: string | null;
  skills: string[];
  eligibleRole: string;
  casteCategory: "GEN" | "OBC" | "SC" | "ST" | "EWS";
  pmScheme: {
    isEligible: boolean;
    internshipTrack: string; // e.g., Policy, Tech, Data, Administration
    domicileState: string;
    annualFamilyIncomeLakhs: number;
    ewsCertificate: boolean;
    categoryCertificate: boolean;
    pwd: boolean;
  };
};
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const studentStats = {
    total: 12847,
    matched: 8932,
    pending: 2105,
    rejected: 1810
  };

  const recentStudents: Student[] = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@university.in",
      major: "Computer Science",
      year: "Senior",
      gpa: 9.2,
      location: "Bengaluru, KA",
      status: "matched",
      company: "TechMahindra",
      skills: ["React", "Python", "Machine Learning"],
      eligibleRole: "Frontend Engineering Intern",
      casteCategory: "GEN",
      pmScheme: {
        isEligible: true,
        internshipTrack: "Tech",
        domicileState: "Karnataka",
        annualFamilyIncomeLakhs: 7.2,
        ewsCertificate: false,
        categoryCertificate: false,
        pwd: false,
      },
    },
    {
      id: 2,
      name: "Isha Patel",
      email: "isha.patel@university.in",
      major: "Business Analytics",
      year: "Junior",
      gpa: 8.6,
      location: "Mumbai, MH",
      status: "pending",
      company: null,
      skills: ["SQL", "Tableau", "Excel"],
      eligibleRole: "Data Analyst Intern",
      casteCategory: "EWS",
      pmScheme: {
        isEligible: true,
        internshipTrack: "Data",
        domicileState: "Maharashtra",
        annualFamilyIncomeLakhs: 5.5,
        ewsCertificate: true,
        categoryCertificate: false,
        pwd: false,
      },
    },
    {
      id: 3,
      name: "Vihaan Gupta",
      email: "vihaan.gupta@university.in",
      major: "Mechanical Engineering",
      year: "Senior",
      gpa: 9.5,
      location: "Pune, MH",
      status: "matched",
      company: "Tata Motors",
      skills: ["CAD", "MATLAB", "Project Management"],
      eligibleRole: "Operations Intern",
      casteCategory: "OBC",
      pmScheme: {
        isEligible: true,
        internshipTrack: "Administration",
        domicileState: "Maharashtra",
        annualFamilyIncomeLakhs: 8.1,
        ewsCertificate: false,
        categoryCertificate: true,
        pwd: false,
      },
    },
    {
      id: 4,
      name: "Ananya Reddy",
      email: "ananya.reddy@university.in",
      major: "Marketing",
      year: "Junior",
      gpa: 8.2,
      location: "Hyderabad, TS",
      status: "rejected",
      company: null,
      skills: ["Digital Marketing", "Analytics", "Adobe Creative"],
      eligibleRole: "Policy Communications Intern",
      casteCategory: "SC",
      pmScheme: {
        isEligible: false,
        internshipTrack: "Policy",
        domicileState: "Telangana",
        annualFamilyIncomeLakhs: 12.0,
        ewsCertificate: false,
        categoryCertificate: true,
        pwd: false,
      },
    },
    {
      id: 5,
      name: "Rohan Singh",
      email: "rohan.singh@university.in",
      major: "Data Science",
      year: "Senior",
      gpa: 8.9,
      location: "Delhi, DL",
      status: "pending",
      company: null,
      skills: ["Python", "R", "Deep Learning", "Statistics"],
      eligibleRole: "AI/ML Intern",
      casteCategory: "ST",
      pmScheme: {
        isEligible: true,
        internshipTrack: "Tech",
        domicileState: "Delhi",
        annualFamilyIncomeLakhs: 3.8,
        ewsCertificate: false,
        categoryCertificate: true,
        pwd: true,
      },
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt={selectedStudent.name} />
                    <AvatarFallback>
                      {selectedStudent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedStudent.name}</DialogTitle>
                    <DialogDescription>
                      {selectedStudent.major} • {selectedStudent.year}
                    </DialogDescription>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{selectedStudent.eligibleRole}</Badge>
                      <Badge className="bg-muted text-foreground" variant="outline">{selectedStudent.casteCategory}</Badge>
                      {selectedStudent.pmScheme.isEligible ? (
                        <Badge className="bg-success text-success-foreground">PM Scheme Eligible</Badge>
                      ) : (
                        <Badge variant="destructive">PM Scheme Ineligible</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2 text-foreground">Profile</div>
                    <dl className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd className="col-span-2 text-foreground truncate">{selectedStudent.email}</dd>
                      <dt className="text-muted-foreground">Location</dt>
                      <dd className="col-span-2 text-foreground">{selectedStudent.location}</dd>
                      <dt className="text-muted-foreground">GPA</dt>
                      <dd className="col-span-2 text-foreground">{selectedStudent.gpa}</dd>
                      {selectedStudent.company && (
                        <>
                          <dt className="text-muted-foreground">Company</dt>
                          <dd className="col-span-2 text-foreground">{selectedStudent.company}</dd>
                        </>
                      )}
                    </dl>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2 text-foreground">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium text-foreground">PM Internship Scheme</div>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <dt className="text-muted-foreground">Eligibility</dt>
                    <dd className="text-foreground">{selectedStudent.pmScheme.isEligible ? "Eligible" : "Not eligible"}</dd>
                    <dt className="text-muted-foreground">Track</dt>
                    <dd className="text-foreground">{selectedStudent.pmScheme.internshipTrack}</dd>
                    <dt className="text-muted-foreground">Domicile</dt>
                    <dd className="text-foreground">{selectedStudent.pmScheme.domicileState}</dd>
                    <dt className="text-muted-foreground">Family Income</dt>
                    <dd className="text-foreground">₹{selectedStudent.pmScheme.annualFamilyIncomeLakhs} LPA</dd>
                    <dt className="text-muted-foreground">EWS Certificate</dt>
                    <dd className="text-foreground">{selectedStudent.pmScheme.ewsCertificate ? "Yes" : "No"}</dd>
                    <dt className="text-muted-foreground">Category Certificate</dt>
                    <dd className="text-foreground">{selectedStudent.pmScheme.categoryCertificate ? "Yes" : "No"}</dd>
                    <dt className="text-muted-foreground">PwD</dt>
                    <dd className="text-foreground">{selectedStudent.pmScheme.pwd ? "Yes" : "No"}</dd>
                  </dl>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;