import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Database,
  Bell,
  Palette,
  Save,
  RefreshCw
} from "lucide-react";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and configurations</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="University Internship Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Administrator Email</Label>
                  <Input id="admin-email" defaultValue="admin@university.edu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-description">Organization Description</Label>
                <Input id="org-description" defaultValue="AI-powered internship matching platform connecting students with industry partners" />
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-backup Data</Label>
                  <p className="text-sm text-muted-foreground">Automatically backup platform data daily</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Retention Period</Label>
                  <p className="text-sm text-muted-foreground">Keep application data for compliance</p>
                </div>
                <Input className="w-32" defaultValue="7 years" />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline">
                  Export Data
                </Button>
                <Button variant="outline">
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Algorithm Settings */}
        <TabsContent value="algorithm" className="space-y-6">
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <SettingsIcon className="w-5 h-5" />
                Matching Algorithm Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="skill-weight">Skill Matching Weight (%)</Label>
                  <Input id="skill-weight" type="number" defaultValue="40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-weight">Location Preference Weight (%)</Label>
                  <Input id="location-weight" type="number" defaultValue="25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa-weight">GPA Weight (%)</Label>
                  <Input id="gpa-weight" type="number" defaultValue="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-weight">Experience Weight (%)</Label>
                  <Input id="experience-weight" type="number" defaultValue="15" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Bias Detection</Label>
                    <p className="text-sm text-muted-foreground">Monitor and reduce algorithmic bias in matches</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Diversity Prioritization</Label>
                    <p className="text-sm text-muted-foreground">Promote diversity in company selections</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Real-time Learning</Label>
                    <p className="text-sm text-muted-foreground">Continuously improve matching based on outcomes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retrain Algorithm
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Applications</Label>
                    <p className="text-sm text-muted-foreground">Notify when students submit new applications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Successful Matches</Label>
                    <p className="text-sm text-muted-foreground">Notify when matches are confirmed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important system status and error notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly performance and analytics summary</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Company Updates</Label>
                    <p className="text-sm text-muted-foreground">Notify when companies update their requirements</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Palette className="w-5 h-5" />
                Theme & Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing and padding throughout the interface</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>High Contrast</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better accessibility</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Dashboard Layout</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      Default Layout
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Compact Layout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                  </div>
                  <Input className="w-32" defaultValue="30 minutes" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest and in transit</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Minimum 12 characters</p>
                    <p>• Must include uppercase, lowercase, numbers, and symbols</p>
                    <p>• Cannot reuse last 5 passwords</p>
                    <p>• Expires every 90 days</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <Button variant="outline">
                    View Audit Log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;