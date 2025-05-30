'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Settings,
  Save,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Clock,
  Copy,
  Calculator,
  Car,
  Shield,
  Calendar,
  Plus,
  Trash2
} from 'lucide-react';

const EmergencySettingsPage = () => {
  const [activeTab, setActiveTab] = useState('service');
  const [isServiceActive, setIsServiceActive] = useState(true);
  const [serviceRadius, setServiceRadius] = useState('25');
  const [maxConcurrentRequests, setMaxConcurrentRequests] = useState('10');
  const [responseTimeTarget, setResponseTimeTarget] = useState('15');
  
  // Pricing state
  const [baseFee, setBaseFee] = useState('50000');
  const [perKmFee, setPerKmFee] = useState('3500');
  const [minCharge, setMinCharge] = useState('80000');
  const [maxCharge, setMaxCharge] = useState('500000');
  const [simulationDistance, setSimulationDistance] = useState('10');

  // Operating hours state
  const [operatingHours, setOperatingHours] = useState({
    monday: { enabled: true, start: '06:00', end: '22:00' },
    tuesday: { enabled: true, start: '06:00', end: '22:00' },
    wednesday: { enabled: true, start: '06:00', end: '22:00' },
    thursday: { enabled: true, start: '06:00', end: '22:00' },
    friday: { enabled: true, start: '06:00', end: '22:00' },
    saturday: { enabled: true, start: '08:00', end: '20:00' },
    sunday: { enabled: true, start: '08:00', end: '20:00' }
  });

  const [is24x7, setIs24x7] = useState(false);

  const calculatePrice = (distance: number) => {
    const base = parseInt(baseFee);
    const perKm = parseInt(perKmFee);
    const calculated = base + (distance * perKm);
    const min = parseInt(minCharge);
    const max = parseInt(maxCharge);
    
    return Math.min(Math.max(calculated, min), max);
  };

  const handleSaveConfiguration = () => {
    // Save configuration logic here
    console.log('Saving service configuration...');
    alert('Service configuration saved successfully!');
  };

  const handleSavePricing = () => {
    // Save pricing logic here
    console.log('Saving pricing configuration...');
    alert('Pricing configuration saved successfully!');
  };

  const handleSaveHours = () => {
    // Save operating hours logic here
    console.log('Saving operating hours...');
    alert('Operating hours saved successfully!');
  };

  const handle24x7Toggle = (enabled: boolean) => {
    setIs24x7(enabled);
    if (enabled) {
      const newHours = { ...operatingHours };
      Object.keys(newHours).forEach(day => {
        newHours[day as keyof typeof newHours] = { enabled: true, start: '00:00', end: '23:59' };
      });
      setOperatingHours(newHours);
    }
  };

  const copySchedule = (fromDay: string) => {
    const sourceDay = operatingHours[fromDay as keyof typeof operatingHours];
    const newHours = { ...operatingHours };
    Object.keys(newHours).forEach(day => {
      if (day !== fromDay) {
        newHours[day as keyof typeof newHours] = { ...sourceDay };
      }
    });
    setOperatingHours(newHours);
  };

  return (
    <DashboardLayout currentPage="/dashboard/emergencias">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emergency Service Settings</h1>
            <p className="text-gray-600">Configure your emergency service parameters and preferences</p>
          </div>
          <Link href="/dashboard/emergencias">
            <Button variant="outline">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="service">Service Configuration</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="hours">Operating Hours</TabsTrigger>
          </TabsList>

          <TabsContent value="service" className="space-y-6">
            {/* Service Configuration Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Emergency Service Configuration</h2>
              <Button onClick={handleSaveConfiguration}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {/* Service Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Service Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isServiceActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Emergency Service Status
                      </p>
                      <p className="text-sm text-gray-600">
                        {isServiceActive ? 'Active and accepting requests' : 'Inactive - not accepting requests'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isServiceActive}
                    onCheckedChange={setIsServiceActive}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Medical License Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Insurance Coverage Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Background Check Completed</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Vehicle Inspection Due (30 days)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Emergency Equipment Certified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operational Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Operational Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="serviceRadius">Service Radius (km)</Label>
                    <Input
                      id="serviceRadius"
                      type="number"
                      value={serviceRadius}
                      onChange={(e) => setServiceRadius(e.target.value)}
                      placeholder="25"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Maximum distance you'll travel for emergency calls
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="maxRequests">Maximum Concurrent Requests</Label>
                    <Input
                      id="maxRequests"
                      type="number"
                      value={maxConcurrentRequests}
                      onChange={(e) => setMaxConcurrentRequests(e.target.value)}
                      placeholder="10"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Maximum number of active emergency requests
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="responseTarget">Response Time Target (minutes)</Label>
                    <Input
                      id="responseTarget"
                      type="number"
                      value={responseTimeTarget}
                      onChange={(e) => setResponseTimeTarget(e.target.value)}
                      placeholder="15"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Target response time for emergency calls
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="vehicleTypes">Vehicle Types Available</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambulance">Ambulance</SelectItem>
                        <SelectItem value="paramedicCar">Paramedic Car</SelectItem>
                        <SelectItem value="mobileUnit">Mobile Unit</SelectItem>
                        <SelectItem value="helicopter">Helicopter (Special)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-1">
                      Types of emergency vehicles in your fleet
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialCapabilities">Special Capabilities & Equipment</Label>
                  <Textarea
                    id="specialCapabilities"
                    placeholder="Describe any special medical equipment, capabilities, or certifications..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Special medical equipment or capabilities available
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            {/* Pricing Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Emergency Service Pricing</h2>
              <Button onClick={handleSavePricing}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {/* Pricing Model */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Pricing Model Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="baseFee">Base Fee (COP)</Label>
                    <Input
                      id="baseFee"
                      type="number"
                      value={baseFee}
                      onChange={(e) => setBaseFee(e.target.value)}
                      placeholder="50000"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Fixed fee charged for every emergency call
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="perKmFee">Per-Kilometer Fee (COP)</Label>
                    <Input
                      id="perKmFee"
                      type="number"
                      value={perKmFee}
                      onChange={(e) => setPerKmFee(e.target.value)}
                      placeholder="3500"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Additional fee charged per kilometer traveled
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="minCharge">Minimum Charge (COP)</Label>
                    <Input
                      id="minCharge"
                      type="number"
                      value={minCharge}
                      onChange={(e) => setMinCharge(e.target.value)}
                      placeholder="80000"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Minimum amount charged regardless of distance
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="maxCharge">Maximum Charge (COP)</Label>
                    <Input
                      id="maxCharge"
                      type="number"
                      value={maxCharge}
                      onChange={(e) => setMaxCharge(e.target.value)}
                      placeholder="500000"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Maximum amount charged for any emergency call
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Commission Information:</strong> MediGo Hub takes a 15% commission on all completed emergency services.
                    This commission covers platform maintenance, insurance, and support services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Simulator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Pricing Simulator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="simulationDistance">Distance (km)</Label>
                    <Input
                      id="simulationDistance"
                      type="number"
                      value={simulationDistance}
                      onChange={(e) => setSimulationDistance(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Price
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Price Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Fee:</span>
                      <span className="font-medium">COP {parseInt(baseFee).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance Fee ({simulationDistance} km):</span>
                      <span className="font-medium">COP {(parseInt(simulationDistance) * parseInt(perKmFee)).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Price:</span>
                        <span>COP {calculatePrice(parseInt(simulationDistance)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Platform Commission (15%):</span>
                        <span>COP {Math.round(calculatePrice(parseInt(simulationDistance)) * 0.15).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium text-green-600">
                        <span>Your Earnings:</span>
                        <span>COP {Math.round(calculatePrice(parseInt(simulationDistance)) * 0.85).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Market Comparison:</strong> Based on local market data, your pricing is competitive with similar emergency services in your area.
                    Average market rate for 10km: COP 115,000 - 135,000
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6">
            {/* Operating Hours Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Operating Hours</h2>
              <Button onClick={handleSaveHours}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {/* Quick Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Quick Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">24/7 Operation</p>
                    <p className="text-sm text-gray-600">Enable emergency services around the clock</p>
                  </div>
                  <Switch
                    checked={is24x7}
                    onCheckedChange={handle24x7Toggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-20">
                      <Switch
                        checked={hours.enabled}
                        onCheckedChange={(checked) => {
                          setOperatingHours(prev => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], enabled: checked }
                          }));
                        }}
                      />
                    </div>
                    
                    <div className="w-24 font-medium capitalize">
                      {day}
                    </div>
                    
                    <div className="flex items-center space-x-2 flex-1">
                      <Input
                        type="time"
                        value={hours.start}
                        onChange={(e) => {
                          setOperatingHours(prev => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], start: e.target.value }
                          }));
                        }}
                        disabled={!hours.enabled}
                        className="w-32"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        value={hours.end}
                        onChange={(e) => {
                          setOperatingHours(prev => ({
                            ...prev,
                            [day]: { ...prev[day as keyof typeof prev], end: e.target.value }
                          }));
                        }}
                        disabled={!hours.enabled}
                        className="w-32"
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copySchedule(day)}
                      disabled={!hours.enabled}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy to All
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Special Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Holiday & Special Hours
                  </span>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Special Date
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Christmas Day - December 25, 2024</p>
                        <p className="text-sm text-gray-600">Emergency services only</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="time" value="08:00" className="w-32" />
                      <span className="text-gray-500">to</span>
                      <Input type="time" value="18:00" className="w-32" />
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">New Year's Day - January 1, 2025</p>
                        <p className="text-sm text-gray-600">Limited availability</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="time" value="10:00" className="w-32" />
                      <span className="text-gray-500">to</span>
                      <Input type="time" value="16:00" className="w-32" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Special hours override regular weekly schedule for the specified dates.
                    Emergency services should maintain minimal availability during holidays.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmergencySettingsPage; 