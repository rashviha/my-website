import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, MapPin, Clock, Star, Upload, Calendar, DollarSign } from "lucide-react";

const mockMachines = [
  {
    id: 1,
    name: "CNC Milling Machine",
    type: "CNC",
    location: "San Francisco, CA",
    pricePerHour: 45,
    rating: 4.8,
    availability: "Available",
    materials: ["Aluminum", "Steel", "Plastic"],
    maxSize: "12x8x6 inches",
    owner: "TechShop SF"
  },
  {
    id: 2,
    name: "3D Printer (FDM)",
    type: "3D Printing",
    location: "Oakland, CA",
    pricePerHour: 15,
    rating: 4.6,
    availability: "Busy until 3PM",
    materials: ["PLA", "ABS", "PETG"],
    maxSize: "8x8x8 inches",
    owner: "MakerSpace Oakland"
  },
  {
    id: 3,
    name: "Laser Cutter",
    type: "Laser Cutting",
    location: "Berkeley, CA",
    pricePerHour: 35,
    rating: 4.9,
    availability: "Available",
    materials: ["Wood", "Acrylic", "Cardboard"],
    maxSize: "24x18 inches",
    owner: "Berkeley Fab Lab"
  }
];

const mockOrders = [
  {
    id: "ORD-001",
    machine: "CNC Milling Machine",
    status: "In Progress",
    date: "2024-01-15",
    duration: "3 hours",
    cost: 135,
    progress: 60
  },
  {
    id: "ORD-002",
    machine: "3D Printer (FDM)",
    status: "Completed",
    date: "2024-01-12",
    duration: "8 hours",
    cost: 120,
    progress: 100
  }
];

interface ClientDashboardProps {
  onLogout: () => void;
}

export default function ClientDashboard({ onLogout }: ClientDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHours, setBookingHours] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const filteredMachines = mockMachines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = () => {
    console.log("Booking submitted:", {
      machine: selectedMachine,
      date: bookingDate,
      hours: bookingHours,
      description: projectDescription
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">MicroFactory</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome back!</span>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Machines</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search machines, types, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Machine Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="cnc">CNC</SelectItem>
                  <SelectItem value="3d-printing">3D Printing</SelectItem>
                  <SelectItem value="laser">Laser Cutting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMachines.map((machine) => (
                <Card key={machine.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <Badge variant={machine.availability === "Available" ? "default" : "secondary"}>
                        {machine.availability}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{machine.type}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {machine.location}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{machine.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-medium">${machine.pricePerHour}/hr</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Materials:</p>
                      <div className="flex flex-wrap gap-1">
                        {machine.materials.map((material) => (
                          <Badge key={material} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          onClick={() => setSelectedMachine(machine)}
                          disabled={machine.availability !== "Available"}
                        >
                          {machine.availability === "Available" ? "Book Now" : "Unavailable"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Book {machine.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hours">Hours Needed</Label>
                              <Input
                                id="hours"
                                type="number"
                                placeholder="3"
                                value={bookingHours}
                                onChange={(e) => setBookingHours(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="description">Project Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Brief description of your project..."
                              value={projectDescription}
                              onChange={(e) => setProjectDescription(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Upload Design Files</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Drop files here or click to upload
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Supports: STL, PDF, DXF, DWG
                              </p>
                            </div>
                          </div>

                          {bookingHours && (
                            <div className="bg-accent/50 p-4 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span>Estimated Cost:</span>
                                <span className="font-medium">
                                  ${(parseFloat(bookingHours) * machine.pricePerHour).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          )}

                          <Button onClick={handleBooking} className="w-full">
                            Confirm Booking
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid gap-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Machine</p>
                        <p className="font-medium">{order.machine}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant={order.status === "Completed" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cost</p>
                        <p className="font-medium">${order.cost}</p>
                      </div>
                    </div>
                    
                    {order.status === "In Progress" && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{order.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Optional" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}