import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, GraduationCap, Mail, MapPin } from "lucide-react";

type CompanyStudent = {
  id: number;
  name: string;
  email: string;
  role: string;
  location: string;
  skills: string[];
  eligibilityNotes?: string;
};

const mockCompanyToStudents: Record<string, CompanyStudent[]> = {
  "1": [
    { id: 101, name: "Aarav Sharma", email: "aarav.sharma@university.in", role: "Frontend Engineering Intern", location: "Bengaluru, KA", skills: ["React", "TypeScript", "Tailwind"], eligibilityNotes: "Meets GPA and Tech track criteria." },
    { id: 102, name: "Isha Patel", email: "isha.patel@university.in", role: "Data Analyst Intern", location: "Mumbai, MH", skills: ["SQL", "Python", "Tableau"] },
  ],
  "2": [
    { id: 201, name: "Vihaan Gupta", email: "vihaan.gupta@university.in", role: "Operations Intern", location: "Pune, MH", skills: ["MATLAB", "CAD", "Project Mgmt"], eligibilityNotes: "Category certificate verified (OBC)." },
  ],
  "default": [
    { id: 301, name: "Rohan Singh", email: "rohan.singh@university.in", role: "AI/ML Intern", location: "Delhi, DL", skills: ["Python", "TensorFlow", "Statistics"], eligibilityNotes: "PwD benefits applicable." },
  ],
};

const CompanyStudents = () => {
  const { id } = useParams();
  const students = useMemo(() => mockCompanyToStudents[id ?? "default"] ?? mockCompanyToStudents["default"], [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Company Students</h1>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/companies"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Companies</Link>
        </Button>
      </div>

      <Card className="bg-gradient-card border-border/20">
        <CardHeader>
          <CardTitle className="text-foreground">Assigned/Eligible Students</CardTitle>
          <p className="text-sm text-muted-foreground">Students relevant to the selected company with necessary details</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((s) => (
              <div key={s.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{s.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground"><Mail className="w-3 h-3" /> {s.email}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground md:ml-13">
                    <span>Role: <span className="text-foreground">{s.role}</span></span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 md:ml-13">
                    {s.skills.map((skill, idx) => (<Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>))}
                  </div>
                  {s.eligibilityNotes && (
                    <div className="text-xs text-muted-foreground md:ml-13">{s.eligibilityNotes}</div>
                  )}
                </div>
                <div className="mt-3 md:mt-0">
                  <Button size="sm" variant="outline">View Profile</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyStudents;


