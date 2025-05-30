'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Star,
  Activity,
  Clock,
  Users,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Heart,
  AlertTriangle,
  Navigation
} from 'lucide-react';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('service');
  const [dateRange, setDateRange] = useState('month');
  const [emergencyTypeFilter, setEmergencyTypeFilter] = useState('all');
  const [paramedicFilter, setParamedicFilter] = useState('all');

  // Mock analytics data
  const serviceMetrics = {
    totalRequests: 324,
    avgAcceptanceTime: '3.2 min',
    avgArrivalTime: '15.8 min',
    completionRate: 97.2,
    trendData: {
      requests: '+12%',
      acceptance: '-5%',
      arrival: '+2%',
      completion: '+1.5%'
    }
  };

  const financialMetrics = {
    totalRevenue: 4850000,
    commissionAmount: 728000,
    netRevenue: 4122000,
    avgServiceValue: 149600,
    trendData: {
      revenue: '+18%',
      commission: '+18%',
      avgValue: '+5%'
    }
  };

  const ratingMetrics = {
    overallRating: 4.7,
    responseTimeRating: 4.5,
    serviceQualityRating: 4.8,
    paramedicRating: 4.9,
    totalRatings: 298,
    trendData: {
      overall: '+0.2',
      responseTime: '+0.1',
      quality: '+0.3',
      paramedic: '+0.1'
    }
  };

  const requestVolumeData = [
    { type: 'Cardiac Emergency', count: 98, percentage: 30.2 },
    { type: 'Accident', count: 75, percentage: 23.1 },
    { type: 'Medical Emergency', count: 89, percentage: 27.5 },
    { type: 'Medical Transport', count: 62, percentage: 19.1 }
  ];

  const paramedicPerformance = [
    { name: 'Dr. Juan Pérez', requests: 72, avgResponse: '7.2 min', rating: 4.8 },
    { name: 'Dr. Ana Martín', requests: 68, avgResponse: '6.8 min', rating: 4.9 },
    { name: 'Dr. Luis Torres', requests: 89, avgResponse: '8.1 min', rating: 4.7 },
    { name: 'Dr. Carmen Vega', requests: 55, avgResponse: '9.3 min', rating: 4.6 }
  ];

  const paymentData = [
    { status: 'Successful', count: 289, percentage: 89.2, amount: 4325000 },
    { status: 'Failed', count: 24, percentage: 7.4, amount: 360000 },
    { status: 'Pending', count: 11, percentage: 3.4, amount: 165000 }
  ];

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 52.3 },
    { stars: 4, count: 98, percentage: 32.9 },
    { stars: 3, count: 32, percentage: 10.7 },
    { stars: 2, count: 8, percentage: 2.7 },
    { stars: 1, count: 4, percentage: 1.3 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Cardiac Emergency': return 'bg-red-100 text-red-800';
      case 'Accident': return 'bg-orange-100 text-orange-800';
      case 'Medical Emergency': return 'bg-blue-100 text-blue-800';
      case 'Medical Transport': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout currentPage="/dashboard/emergencias">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emergency Analytics</h1>
            <p className="text-gray-600">Comprehensive analytics and insights for emergency services</p>
          </div>
          <div className="flex space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
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
            <TabsTrigger value="service">Service Performance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
          </TabsList>

          <TabsContent value="service" className="space-y-6">
            {/* Service Performance Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Service Performance Analytics</h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <Select value={emergencyTypeFilter} onValueChange={setEmergencyTypeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Emergency type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="cardiac">Cardiac Emergency</SelectItem>
                      <SelectItem value="accident">Accident</SelectItem>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="transport">Medical Transport</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={paramedicFilter} onValueChange={setParamedicFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Paramedic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Paramedics</SelectItem>
                      <SelectItem value="juan">Dr. Juan Pérez</SelectItem>
                      <SelectItem value="ana">Dr. Ana Martín</SelectItem>
                      <SelectItem value="luis">Dr. Luis Torres</SelectItem>
                      <SelectItem value="carmen">Dr. Carmen Vega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Service Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-900">{serviceMetrics.totalRequests}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {serviceMetrics.trendData.requests} from last period
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Acceptance Time</p>
                      <p className="text-2xl font-bold text-gray-900">{serviceMetrics.avgAcceptanceTime}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {serviceMetrics.trendData.acceptance} from last period
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Arrival Time</p>
                      <p className="text-2xl font-bold text-gray-900">{serviceMetrics.avgArrivalTime}</p>
                      <p className="text-xs text-red-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {serviceMetrics.trendData.arrival} from last period
                      </p>
                    </div>
                    <Navigation className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{serviceMetrics.completionRate}%</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {serviceMetrics.trendData.completion} from last period
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Volume by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requestVolumeData.map((item) => (
                      <div key={item.type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                          <span className="text-sm text-gray-600">{item.count} requests</span>
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Time Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Response time trends over selected period</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramedic Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paramedicPerformance.map((paramedic) => (
                      <div key={paramedic.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{paramedic.name}</p>
                          <p className="text-sm text-gray-600">{paramedic.requests} requests completed</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{paramedic.avgResponse}</p>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span className="text-sm">{paramedic.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Heat map: Service areas and activity zones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            {/* Financial Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Financial Analytics</h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Financial Report
              </Button>
            </div>

            {/* Financial Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${financialMetrics.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {financialMetrics.trendData.revenue} from last period
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Commission Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${financialMetrics.commissionAmount.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {financialMetrics.trendData.commission} from last period
                      </p>
                    </div>
                    <PieChart className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Net Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${financialMetrics.netRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {financialMetrics.trendData.revenue} from last period
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Service Value</p>
                      <p className="text-2xl font-bold text-gray-900">${financialMetrics.avgServiceValue.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {financialMetrics.trendData.avgValue} from last period
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Daily/weekly/monthly revenue trends</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Emergency Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requestVolumeData.map((item) => {
                      const revenue = (item.count * 150000); // Mock calculation
                      return (
                        <div key={item.type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className={getTypeColor(item.type)}>
                              {item.type}
                            </Badge>
                            <span className="text-sm text-gray-600">{item.count} services</span>
                          </div>
                          <span className="text-sm font-medium">${revenue.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentData.map((payment) => (
                      <div key={payment.status} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            payment.status === 'Successful' ? 'bg-green-100 text-green-800' :
                            payment.status === 'Failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {payment.status}
                          </Badge>
                          <span className="text-sm text-gray-600">{payment.count} payments ({payment.percentage}%)</span>
                        </div>
                        <span className="text-sm font-medium">${payment.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Pricing Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Average pricing and optimization recommendations</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            {/* Ratings Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Rating Analytics</h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Rating Data
              </Button>
            </div>

            {/* Rating Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Overall Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{ratingMetrics.overallRating}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {ratingMetrics.trendData.overall} from last period
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Response Time Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{ratingMetrics.responseTimeRating}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {ratingMetrics.trendData.responseTime} from last period
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Service Quality Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{ratingMetrics.serviceQualityRating}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {ratingMetrics.trendData.quality} from last period
                      </p>
                    </div>
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Paramedic Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{ratingMetrics.paramedicRating}</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {ratingMetrics.trendData.paramedic} from last period
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rating Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ratingDistribution.map((rating) => (
                      <div key={rating.stars} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < rating.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{rating.count} ratings</span>
                        </div>
                        <span className="text-sm font-medium">{rating.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart: Rating trends over time</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramedic Rating Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paramedicPerformance.map((paramedic) => (
                      <div key={paramedic.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{paramedic.name}</p>
                          <p className="text-sm text-gray-600">{paramedic.requests} services rated</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(paramedic.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{paramedic.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Feedback Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Positive Feedback Themes</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Quick response times</li>
                        <li>• Professional paramedic behavior</li>
                        <li>• Effective communication</li>
                        <li>• Quality medical care</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Areas for Improvement</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Arrival time accuracy</li>
                        <li>• Equipment availability</li>
                        <li>• Follow-up communication</li>
                        <li>• Billing transparency</li>
                      </ul>
                    </div>
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

export default AnalyticsPage; 