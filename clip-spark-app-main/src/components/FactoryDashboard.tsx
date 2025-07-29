import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Settings, Calendar, Clock, DollarSign, Eye, CheckCircle } from "lucide-react";

const mockMachines = [
  {
    id: 1,
    name: "CNC Milling Machine",
    type: "CNC",
    status: "Active",
    pricePerHour: 45,
    utilizationRate: 75,
    totalBookings: 24,
    revenue: 1080
  },
  {
    id: 2,
    name: "3D Printer Alpha",
    type: "3D Printing",
    status: "Maintenance",
    pricePerHour: 15,
    utilizationRate: 45,
    totalBookings: 18,
    revenue: 270
  }
];

const mockJobs = [
  {
    id: "JOB-001",
    clientName: "John Doe",
    machine: "CNC Milling Machine",
    status: "Pending",
    duration: "3 hours",
    scheduledDate: "2024-01-16",
    description: "Custom aluminum bracket for mounting system",
    files: ["bracket-design.stl", "specifications.pdf"]
  },
  {
    id: "JOB-002",
    clientName: "Jane Smith",
    machine: "3D Printer Alpha",
    status: "In Progress",
    duration: "6 hours",
    scheduledDate: "2024-01-15",
    description: "Prototype housing for electronic device",
    files: ["housing.stl"],
    progress: 40
  },
  {
    id: "JOB-003",
    clientName: "Tech Startup Inc",
    machine: "CNC Milling Machine",
    status: "Completed",
    duration: "4 hours",
    scheduledDate: "2024-01-14",
    description: "Precision parts for mechanical assembly",
    files: ["parts-drawing.dwg"]
  }
];

interface FactoryDashboardProps {
  onLogout: () => void;
}

export default function FactoryDashboard({ onLogout }: FactoryDashboardProps) {
  const [newMachineName, setNewMachineName] = useState("");
  const [newMachineType, setNewMachineType] = useState("");
  const [newMachinePrice, setNewMachinePrice] = useState("");

  const handleAddMachine = () => {
    console.log("Adding machine:", {
      name: newMachineName,
      type: newMachineType,
      price: newMachinePrice
    });
    setNewMachineName("");
    setNewMachineType("");
    setNewMachinePrice("");
  };

  const handleUpdateJobStatus = (jobId: string, newStatus: string) => {
    console.log("Updating job status:", jobId, newStatus);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">MicroFactory</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Factory Owner</span>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="machines">My Machines</TabsTrigger>
            <TabsTrigger value="jobs">Job Queue</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$1,350</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Utilization</p>
                      <p className="text-2xl font-bold">60%</p>
                    </div>
                    <Settings className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{job.clientName}</p>
                        <p className="text-sm text-muted-foreground">{job.machine}</p>
                        <Badge variant={
                          job.status === "Completed" ? "default" :
                          job.status === "In Progress" ? "secondary" : "outline"
                        }>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{job.scheduledDate}</p>
                        <p className="text-sm font-medium">{job.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="machines" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Machines</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Machine
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Machine</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="machineName">Machine Name</Label>
                      <Input
                        id="machineName"
                        value={newMachineName}
                        onChange={(e) => setNewMachineName(e.target.value)}
                        placeholder="e.g., CNC Router X200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="machineType">Machine Type</Label>
                      <Select value={newMachineType} onValueChange={setNewMachineType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select machine type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cnc">CNC Machine</SelectItem>
                          <SelectItem value="3d-printer">3D Printer</SelectItem>
                          <SelectItem value="laser-cutter">Laser Cutter</SelectItem>
                          <SelectItem value="mill">Milling Machine</SelectItem>
                          <SelectItem value="lathe">Lathe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricePerHour">Price per Hour ($)</Label>
                      <Input
                        id="pricePerHour"
                        type="number"
                        value={newMachinePrice}
                        onChange={(e) => setNewMachinePrice(e.target.value)}
                        placeholder="45"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description & Capabilities</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your machine's capabilities, materials it works with, maximum dimensions..."
                      />
                    </div>

                    <Button onClick={handleAddMachine} className="w-full">
                      Add Machine
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockMachines.map((machine) => (
                <Card key={machine.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <Badge variant={machine.status === "Active" ? "default" : "secondary"}>
                        {machine.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{machine.type}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Price/Hour</p>
                        <p className="font-medium">${machine.pricePerHour}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Bookings</p>
                        <p className="font-medium">{machine.totalBookings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Utilization</p>
                        <p className="font-medium">{machine.utilizationRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">${machine.revenue}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Job ID</p>
                        <p className="font-medium">{job.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{job.clientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Machine</p>
                        <p className="font-medium">{job.machine}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{job.duration}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm">{job.description}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Files</p>
                      <div className="flex flex-wrap gap-2">
                        {job.files.map((file, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {job.status === "In Progress" && job.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Badge variant={
                        job.status === "Completed" ? "default" :
                        job.status === "In Progress" ? "secondary" : "outline"
                      }>
                        {job.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        {job.status === "Pending" && (
                          <>
                            <Button size="sm" onClick={() => handleUpdateJobStatus(job.id, "In Progress")}>
                              Start Job
                            </Button>
                            <Button variant="outline" size="sm">
                              Decline
                            </Button>
                          </>
                        )}
                        {job.status === "In Progress" && (
                          <Button size="sm" onClick={() => handleUpdateJobStatus(job.id, "Completed")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Factory Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="factoryName">Factory Name</Label>
                    <Input id="factoryName" defaultValue="TechShop SF" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" defaultValue="contact@techshop.sf" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Maker St, San Francisco, CA 94102" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Job Notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified when new jobs are booked</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Job Completion Reminders</p>
                        <p className="text-sm text-muted-foreground">Reminders for pending job completions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Machine Maintenance Alerts</p>
                        <p className="text-sm text-muted-foreground">Scheduled maintenance reminders</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}