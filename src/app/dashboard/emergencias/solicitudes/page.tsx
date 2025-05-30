'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Search,
  Filter,
  Download,
  Eye,
  Phone,
  User,
  MapPin,
  Clock,
  Heart,
  Star,
  Calendar,
  CheckCircle
} from 'lucide-react';

const EmergencyRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const activeRequests = [
    {
      id: 'EMG-001',
      time: '14:30',
      patient: 'María García',
      age: 45,
      type: 'Cardiac Emergency',
      status: 'IN_PROGRESS',
      location: 'Calle 15 #45-23, Zona Norte',
      paramedic: 'Dr. Juan Pérez',
      timeInStatus: '15 min',
      contact: '+57 310 123 4567',
      severity: 'High'
    },
    {
      id: 'EMG-002',
      time: '14:45',
      patient: 'Carlos López',
      age: 32,
      type: 'Accident',
      status: 'ACCEPTED',
      location: 'Av. Principal #120, Centro',
      paramedic: 'Dr. Ana Martín',
      timeInStatus: '8 min',
      contact: '+57 315 987 6543',
      severity: 'Medium'
    },
    {
      id: 'EMG-003',
      time: '15:00',
      patient: 'Elena Ruiz',
      age: 28,
      type: 'Medical Emergency',
      status: 'PAID',
      location: 'Zona Centro, Calle 8 #12-34',
      paramedic: 'Pending Assignment',
      timeInStatus: '5 min',
      contact: '+57 312 456 7890',
      severity: 'High'
    },
    {
      id: 'EMG-004',
      time: '15:15',
      patient: 'Roberto Silva',
      age: 58,
      type: 'Medical Transport',
      status: 'ARRIVING',
      location: 'Hospital San José',
      paramedic: 'Dr. Luis Torres',
      timeInStatus: '3 min',
      contact: '+57 318 234 5678',
      severity: 'Low'
    }
  ];

  const completedRequests = [
    {
      id: 'EMG-098',
      completionDate: '2024-01-15',
      time: '13:45',
      patient: 'Roberto Silva',
      type: 'Medical Transport',
      duration: '45 min',
      paramedic: 'Dr. Carmen Vega',
      distance: '8.5 km',
      rating: 5,
      paymentStatus: 'Paid',
      amount: 150000
    },
    {
      id: 'EMG-097',
      completionDate: '2024-01-15',
      time: '12:30',
      patient: 'Laura Mendez',
      type: 'Emergency Care',
      duration: '32 min',
      paramedic: 'Dr. Miguel Ángel',
      distance: '5.2 km',
      rating: 4,
      paymentStatus: 'Paid',
      amount: 120000
    },
    {
      id: 'EMG-096',
      completionDate: '2024-01-15',
      time: '11:15',
      patient: 'Ana Torres',
      type: 'Cardiac Emergency',
      duration: '55 min',
      paramedic: 'Dr. Juan Pérez',
      distance: '12.3 km',
      rating: 5,
      paymentStatus: 'Paid',
      amount: 200000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
      case 'ARRIVING': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PAID': return 'Awaiting Paramedic';
      case 'ACCEPTED': return 'Paramedic Assigned';
      case 'IN_PROGRESS': return 'En Route';
      case 'ARRIVING': return 'Approaching';
      default: return status;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActiveRequests = activeRequests.filter(request => {
    if (statusFilter !== 'all' && request.status !== statusFilter) return false;
    if (searchTerm && !request.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !request.patient.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const filteredCompletedRequests = completedRequests.filter(request => {
    if (searchTerm && !request.id.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !request.patient.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout currentPage="/dashboard/emergencias">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emergency Requests</h1>
            <p className="text-gray-600">Manage and monitor emergency service requests</p>
          </div>
          <Link href="/dashboard/emergencias">
            <Button variant="outline">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Requests ({filteredActiveRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed Requests ({filteredCompletedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {/* Filter Section for Active */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by request ID or patient name..."
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
                      <SelectItem value="all">All Active</SelectItem>
                      <SelectItem value="PAID">Awaiting Paramedic</SelectItem>
                      <SelectItem value="ACCEPTED">Paramedic Assigned</SelectItem>
                      <SelectItem value="IN_PROGRESS">En Route</SelectItem>
                      <SelectItem value="ARRIVING">Approaching</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Active Requests List */}
            <div className="space-y-4">
              {filteredActiveRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.id}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                          <Badge className={getSeverityColor(request.severity)}>
                            {request.severity}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            In status: {request.timeInStatus}
                          </span>
                        </div>
                        <p className="text-gray-600">{request.time} - {request.patient} ({request.age} years)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{request.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{request.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{request.paramedic}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{request.contact}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/dashboard/emergencias/solicitudes/${request.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </Link>
                        {request.status === 'PAID' && (
                          <Button size="sm">
                            Assign Paramedic
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Contact Patient
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {/* Filter Section for Completed */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-4 flex-1">
                    <div className="flex-1 min-w-64">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search by request ID or patient name..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Completed Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle>Completed Emergency Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Request ID</th>
                        <th className="text-left p-2">Date/Time</th>
                        <th className="text-left p-2">Patient</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Duration</th>
                        <th className="text-left p-2">Paramedic</th>
                        <th className="text-left p-2">Distance</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Payment</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompletedRequests.map((request) => (
                        <tr key={request.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{request.id}</td>
                          <td className="p-2">
                            <div>
                              <div>{request.completionDate}</div>
                              <div className="text-xs text-gray-500">{request.time}</div>
                            </div>
                          </td>
                          <td className="p-2">{request.patient}</td>
                          <td className="p-2">{request.type}</td>
                          <td className="p-2">{request.duration}</td>
                          <td className="p-2">{request.paramedic}</td>
                          <td className="p-2">{request.distance}</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < request.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-1 text-xs">{request.rating}</span>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge className="bg-green-100 text-green-800">
                              {request.paymentStatus}
                            </Badge>
                            <div className="text-xs text-gray-500">${request.amount.toLocaleString()}</div>
                          </td>
                          <td className="p-2">
                            <Link href={`/dashboard/emergencias/solicitudes/${request.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmergencyRequestsPage; 