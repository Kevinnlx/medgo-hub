'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLaboratory } from '@/hooks/useLaboratory';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  TestTube, 
  Clock, 
  User, 
  FileText, 
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  Activity,
  Microscope,
  FlaskConical,
  Beaker
} from 'lucide-react';

const LaboratoryDashboard = () => {
  const {
    availableTests,
    orders,
    technicians,
    loading,
    createOrder,
    updateOrderStatus,
    assignTechnician,
    updateSampleCollection,
    addTestResults,
    searchTests,
    getOrdersByStatus,
    getOrdersByPriority,
    getAvailableTechnicians,
    calculateOrderCost
  } = useLaboratory();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [testSearchTerm, setTestSearchTerm] = useState('');

  const handleStatusChange = async (orderId: string, newStatus: any) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const handleTechnicianAssignment = async (orderId: string, technicianId: string) => {
    await assignTechnician(orderId, technicianId);
  };

  const handleSampleCollection = async (orderId: string) => {
    await updateSampleCollection(orderId, new Date());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'collected': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSampleTypeIcon = (sampleType: string) => {
    switch (sampleType) {
      case 'blood': return <TestTube className="h-4 w-4 text-red-500" />;
      case 'urine': return <FlaskConical className="h-4 w-4 text-yellow-500" />;
      case 'saliva': return <Beaker className="h-4 w-4 text-blue-500" />;
      default: return <Microscope className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.notes && order.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredTests = searchTests(testSearchTerm);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: getOrdersByStatus('ordered').length + getOrdersByStatus('collected').length + getOrdersByStatus('processing').length,
    completedOrders: getOrdersByStatus('completed').length,
    urgentOrders: getOrdersByPriority('urgent').length,
    availableTechnicians: getAvailableTechnicians().length,
    totalTests: availableTests.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Services</h1>
          <p className="text-gray-600">Manage diagnostic tests, samples, and results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="lab" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Collect Sample
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgentOrders}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Techs</p>
                <p className="text-2xl font-bold text-purple-600">{stats.availableTechnicians}</p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Tests</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalTests}</p>
              </div>
              <Microscope className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Lab Orders</TabsTrigger>
          <TabsTrigger value="tests">Available Tests</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="ordered">Ordered</option>
                  <option value="collected">Collected</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getSampleTypeIcon(order.sampleType || 'blood')}
                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge className={getPriorityColor(order.priority || 'normal')}>
                          {order.priority}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <TestTube className="h-4 w-4" />
                          <span>{order.sampleType} sample</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Ordered: {formatDate(order.createdAt)}</span>
                        </div>
                        {order.collectionDate && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Collected: {formatDate(order.collectionDate)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatCurrency(order.cost || 0)}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="font-medium text-sm">Tests:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {order.tests.map((orderTest, index) => {
                            const test = availableTests.find(t => t.id === orderTest.testId);
                            return (
                              <Badge key={index} variant="outline">
                                {test?.name || orderTest.testName}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {order.notes && (
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {order.notes}
                          </p>
                        </div>
                      )}

                      {order.results && order.results.length > 0 && (
                        <div className="mt-3 p-3 bg-green-50 rounded-md">
                          <p className="text-sm font-medium text-green-800 mb-2">Results Available:</p>
                          <div className="space-y-1">
                            {order.results.map((result, index) => (
                              <div key={index} className="text-sm text-green-700">
                                <strong>{result.testName}:</strong> {result.value} {result.unit}
                                {result.normalRange && (
                                  <span className="text-gray-600"> (Normal: {result.normalRange})</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {order.status === 'ordered' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSampleCollection(order.id)}
                            className="whitespace-nowrap"
                          >
                            Collect Sample
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                            className="whitespace-nowrap"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {order.status === 'collected' && (
                        <Button
                          size="sm"
                          variant="lab"
                          onClick={() => handleStatusChange(order.id, 'processing')}
                          className="whitespace-nowrap"
                        >
                          Start Processing
                        </Button>
                      )}

                      {order.status === 'processing' && (
                        <Button
                          size="sm"
                          variant="lab"
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="whitespace-nowrap"
                        >
                          Add Results
                        </Button>
                      )}

                      <Button size="sm" variant="ghost" className="whitespace-nowrap">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          {/* Test Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search available tests..."
                  value={testSearchTerm}
                  onChange={(e) => setTestSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{test.name}</h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {test.category}
                      </Badge>
                      <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">{formatCurrency(test.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{test.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sample:</span>
                      <span>{test.sampleType}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button size="sm" variant="lab" className="w-full">
                      Add to Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-4">
          <div className="grid gap-4">
            {technicians.map((technician) => (
              <Card key={technician.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold text-lg">{technician.name}</h3>
                        <Badge className={technician.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {technician.availability ? 'Available' : 'Busy'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Experience:</span> {technician.experience} years
                        </div>
                        <div>
                          <span className="font-medium">Certifications:</span> {technician.certifications?.length || 0}
                        </div>
                        <div>
                          <span className="font-medium">Completed Tests:</span> {technician.completedTests}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="font-medium text-sm">Specializations:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {technician.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="font-medium text-sm">Certifications:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {technician.certifications?.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm" variant="lab">
                        Assign Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaboratoryDashboard; 