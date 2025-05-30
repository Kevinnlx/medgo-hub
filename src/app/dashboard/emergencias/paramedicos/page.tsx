'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Search,
  Plus,
  Download,
  Eye,
  Phone,
  User,
  MapPin,
  Clock,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Mail,
  FileText,
  Upload,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const ParamedicsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const paramedics = [
    {
      id: 'P001',
      name: 'Dr. Juan Pérez',
      email: 'juan.perez@medigo.com',
      phone: '+57 310 123 4567',
      status: 'Available',
      location: 'Zona Norte',
      completedToday: 3,
      completedWeek: 18,
      completedMonth: 72,
      avgRating: 4.8,
      totalRatings: 245,
      avgResponseTime: '7.2 min',
      completionRate: 98.5,
      joinDate: '2023-05-15',
      license: 'MEDIC-12345',
      certification: 'Verified',
      experience: '5 years'
    },
    {
      id: 'P002',
      name: 'Dr. Ana Martín',
      email: 'ana.martin@medigo.com',
      phone: '+57 315 987 6543',
      status: 'On Service',
      location: 'Centro',
      completedToday: 2,
      completedWeek: 15,
      completedMonth: 68,
      avgRating: 4.9,
      totalRatings: 198,
      avgResponseTime: '6.8 min',
      completionRate: 99.2,
      joinDate: '2023-03-20',
      license: 'MEDIC-67890',
      certification: 'Verified',
      experience: '7 years'
    },
    {
      id: 'P003',
      name: 'Dr. Luis Torres',
      email: 'luis.torres@medigo.com',
      phone: '+57 312 456 7890',
      status: 'Available',
      location: 'Zona Sur',
      completedToday: 4,
      completedWeek: 22,
      completedMonth: 89,
      avgRating: 4.7,
      totalRatings: 312,
      avgResponseTime: '8.1 min',
      completionRate: 96.8,
      joinDate: '2022-11-10',
      license: 'MEDIC-11223',
      certification: 'Verified',
      experience: '3 years'
    },
    {
      id: 'P004',
      name: 'Dr. Carmen Vega',
      email: 'carmen.vega@medigo.com',
      phone: '+57 318 234 5678',
      status: 'Offline',
      location: 'Zona Este',
      completedToday: 0,
      completedWeek: 12,
      completedMonth: 55,
      avgRating: 4.6,
      totalRatings: 156,
      avgResponseTime: '9.3 min',
      completionRate: 94.2,
      joinDate: '2023-08-05',
      license: 'MEDIC-44556',
      certification: 'Pending Review',
      experience: '2 years'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'On Service': return 'bg-blue-100 text-blue-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCertificationColor = (certification: string) => {
    switch (certification) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredParamedics = paramedics.filter(paramedic => {
    if (statusFilter !== 'all' && paramedic.status !== statusFilter) return false;
    if (ratingFilter !== 'all') {
      const rating = parseFloat(ratingFilter);
      if (paramedic.avgRating < rating) return false;
    }
    if (searchTerm && !paramedic.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout currentPage="/dashboard/emergencias">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paramedic Management</h1>
            <p className="text-gray-600">Manage paramedic personnel and monitor performance</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/emergencias">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Paramedics ({filteredParamedics.length})</TabsTrigger>
            <TabsTrigger value="add">Add Paramedic</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filter Section */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="On Service">On Service</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Paramedic
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Paramedics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParamedics.map((paramedic) => (
                <Card key={paramedic.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{paramedic.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{paramedic.email}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getStatusColor(paramedic.status)}>
                            {paramedic.status}
                          </Badge>
                          <Badge className={getCertificationColor(paramedic.certification)}>
                            {paramedic.certification}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{paramedic.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{paramedic.completedToday} today</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{paramedic.avgRating} ({paramedic.totalRatings})</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Week: {paramedic.completedWeek}</div>
                        <div>Month: {paramedic.completedMonth}</div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div>Response: {paramedic.avgResponseTime}</div>
                        <div>Completion: {paramedic.completionRate}%</div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Link href={`/dashboard/emergencias/paramedicos/${paramedic.id}`}>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      {paramedic.status === 'Available' && (
                        <Button size="sm" className="flex-1">
                          Assign to Request
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Change Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            {/* Add New Paramedic Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add New Paramedic
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+57 300 123 4567" />
                    </div>
                    <div>
                      <Label htmlFor="license">Medical License</Label>
                      <Input id="license" placeholder="MEDIC-XXXXX" />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Professional Qualifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Professional Qualifications</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="qualifications">Certifications & Qualifications</Label>
                      <Textarea 
                        id="qualifications" 
                        placeholder="List certifications, specializations, and qualifications..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="institution">Institution/University</Label>
                        <Input id="institution" placeholder="Medical school or institution" />
                      </div>
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input id="graduationYear" type="number" placeholder="2020" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Setup */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Setup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="generatePassword">Password Setup</Label>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          Generate Password
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Invitation
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="initialStatus">Initial Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Set initial status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending Verification</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Certification Documents */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certification Documentation</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload medical license, certifications, and ID documents
                      </p>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Save and Create Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Paramedic Performance</h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Performance Data
              </Button>
            </div>

            {/* Performance Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Paramedic</th>
                        <th className="text-left p-2">Total Services</th>
                        <th className="text-left p-2">This Month</th>
                        <th className="text-left p-2">Avg Response</th>
                        <th className="text-left p-2">Avg Rating</th>
                        <th className="text-left p-2">Completion Rate</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paramedics.map((paramedic) => (
                        <tr key={paramedic.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{paramedic.name}</td>
                          <td className="p-2">{paramedic.totalRatings}</td>
                          <td className="p-2">{paramedic.completedMonth}</td>
                          <td className="p-2">{paramedic.avgResponseTime}</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              {paramedic.avgRating}
                            </div>
                          </td>
                          <td className="p-2">{paramedic.completionRate}%</td>
                          <td className="p-2">
                            <Badge className={getStatusColor(paramedic.status)}>
                              {paramedic.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Response Time Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Response time comparison by paramedic</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Rating Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Rating trends and comparison</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Services Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Services completed over time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Overall performance trends</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ParamedicsPage; 