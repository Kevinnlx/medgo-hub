'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMedicalRecords } from '@/hooks/useMedicalRecords';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  FileText, 
  Lock, 
  Share2, 
  Eye, 
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Shield,
  Clock,
  Tag,
  Paperclip,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  Link
} from 'lucide-react';

const MedicalRecordsDashboard = () => {
  const {
    records,
    sharedRecordsList,
    loading,
    createRecord,
    updateRecord,
    deleteRecord,
    shareRecord,
    revokeAccess,
    addAttachment,
    removeAttachment,
    getRecordsByPatient,
    getRecordsByType,
    getSharedRecords,
    searchRecords,
    getPatientSummary,
    hasAccess
  } = useMedicalRecords();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<string>('');

  const handleShareRecord = async (recordId: string, shareWith: string, accessLevel: 'read' | 'write') => {
    await shareRecord(recordId, {
      sharedWith: shareWith,
      accessLevel,
      sharedBy: 'current-user-id', // In real app, get from auth context
      purpose: 'Medical consultation'
    });
  };

  const handleRevokeAccess = async (shareId: string) => {
    await revokeAccess(shareId);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'lab-result': return 'bg-green-100 text-green-800';
      case 'prescription': return 'bg-purple-100 text-purple-800';
      case 'imaging': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'homecare': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'shared': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <User className="h-4 w-4" />;
      case 'lab-result': return <Activity className="h-4 w-4" />;
      case 'prescription': return <Heart className="h-4 w-4" />;
      case 'imaging': return <Eye className="h-4 w-4" />;
      case 'emergency': return <AlertCircle className="h-4 w-4" />;
      case 'homecare': return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = searchRecords(searchTerm).includes(record);
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesAccess = accessFilter === 'all' || record.accessLevel === accessFilter;
    const matchesPatient = !selectedPatient || record.patientId === selectedPatient;
    
    return matchesSearch && matchesType && matchesAccess && matchesPatient;
  });

  const stats = {
    totalRecords: records.length,
    privateRecords: records.filter(r => r.accessLevel === 'private').length,
    sharedRecords: records.filter(r => r.accessLevel === 'shared').length,
    recentRecords: records.filter(r => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return r.createdAt && new Date(r.createdAt) > dayAgo;
    }).length,
    activeShares: sharedRecordsList.filter(s => s.isActive).length,
    recordTypes: [...new Set(records.map(r => r.type))].length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Secure patient record management and sharing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="default" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Record
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Records
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold">{stats.totalRecords}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Private</p>
                <p className="text-2xl font-bold text-red-600">{stats.privateRecords}</p>
              </div>
              <Lock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shared</p>
                <p className="text-2xl font-bold text-blue-600">{stats.sharedRecords}</p>
              </div>
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent (24h)</p>
                <p className="text-2xl font-bold text-green-600">{stats.recentRecords}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Shares</p>
                <p className="text-2xl font-bold text-purple-600">{stats.activeShares}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Record Types</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.recordTypes}</p>
              </div>
              <Tag className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="shared">Shared Access</TabsTrigger>
          <TabsTrigger value="summary">Patient Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="consultation">Consultation</option>
                  <option value="lab-result">Lab Result</option>
                  <option value="prescription">Prescription</option>
                  <option value="imaging">Imaging</option>
                  <option value="emergency">Emergency</option>
                  <option value="homecare">Homecare</option>
                </select>
                <select
                  value={accessFilter}
                  onChange={(e) => setAccessFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Access</option>
                  <option value="private">Private</option>
                  <option value="shared">Shared</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Records List */}
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeIcon(record.type || 'consultation')}
                        <h3 className="font-semibold text-lg">{record.title}</h3>
                        <Badge className={getTypeColor(record.type || 'consultation')}>
                          {record.type || 'consultation'}
                        </Badge>
                        <Badge className={getAccessLevelColor(record.accessLevel || 'private')}>
                          <Lock className="h-3 w-3 mr-1" />
                          {record.accessLevel}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{record.content}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Created: {formatDate(record.createdAt || new Date())}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>By: {record.createdBy}</span>
                        </div>
                        {record.attachments && record.attachments.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Paperclip className="h-4 w-4" />
                            <span>{record.attachments.length} attachments</span>
                          </div>
                        )}
                        {record.relatedServices && record.relatedServices.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Link className="h-4 w-4" />
                            <span>{record.relatedServices.length} services</span>
                          </div>
                        )}
                      </div>

                      {record.tags && record.tags.length > 0 && (
                        <div className="mb-3">
                          <span className="font-medium text-sm">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {record.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {record.vitals && (
                        <div className="p-3 bg-blue-50 rounded-md mb-3">
                          <p className="text-sm font-medium text-blue-800 mb-1">Vital Signs:</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-700">
                            {record.vitals.bloodPressure && (
                              <div>BP: {record.vitals.bloodPressure}</div>
                            )}
                            {record.vitals.heartRate && (
                              <div>HR: {record.vitals.heartRate} bpm</div>
                            )}
                            {record.vitals.temperature && (
                              <div>Temp: {record.vitals.temperature}°F</div>
                            )}
                            {record.vitals.weight && (
                              <div>Weight: {record.vitals.weight} lbs</div>
                            )}
                          </div>
                        </div>
                      )}

                      {((record.allergies && record.allergies.length > 0) || 
                        (record.medications && record.medications.length > 0) || 
                        (record.conditions && record.conditions.length > 0)) && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          {record.allergies && record.allergies.length > 0 && (
                            <div className="mb-2">
                              <span className="font-medium text-red-800">Allergies:</span>
                              <p className="text-xs text-red-700">{record.allergies.join(', ')}</p>
                            </div>
                          )}
                          {record.medications && record.medications.length > 0 && (
                            <div className="mb-2">
                              <span className="font-medium text-green-800">Medications:</span>
                              <p className="text-xs text-green-700">{record.medications.join(', ')}</p>
                            </div>
                          )}
                          {record.conditions && record.conditions.length > 0 && (
                            <div>
                              <span className="font-medium text-orange-800">Conditions:</span>
                              <p className="text-xs text-orange-700">{record.conditions.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline" className="whitespace-nowrap">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="whitespace-nowrap">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="whitespace-nowrap">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="ghost" className="whitespace-nowrap">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="grid gap-4">
            {sharedRecordsList.filter(share => share.isActive).map((share) => {
              const record = records.find(r => r.id === share.recordId);
              if (!record) return null;

              return (
                <Card key={share.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Share2 className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-lg">{record.title}</h3>
                          <Badge className={share.accessLevel === 'write' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
                            {share.accessLevel}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Shared with:</span> {share.sharedWith}
                          </div>
                          <div>
                            <span className="font-medium">Shared by:</span> {share.sharedBy}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {formatDate(share.createdAt)}
                          </div>
                          {share.expiresAt && (
                            <div>
                              <span className="font-medium">Expires:</span> {formatDate(share.expiresAt)}
                            </div>
                          )}
                        </div>

                        {share.purpose && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-700">
                              <strong>Purpose:</strong> {share.purpose}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevokeAccess(share.id)}
                          className="whitespace-nowrap"
                        >
                          Revoke Access
                        </Button>
                        <Button size="sm" variant="ghost" className="whitespace-nowrap">
                          View Record
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <Input
                  placeholder="Enter patient ID to view summary..."
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                />
                <Button onClick={() => {
                  if (selectedPatient) {
                    const summary = getPatientSummary(selectedPatient);
                    console.log('Patient Summary:', summary);
                  }
                }}>
                  Generate Summary
                </Button>
              </div>
            </CardContent>
          </Card>

          {selectedPatient && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Summary - {selectedPatient}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {getPatientSummary(selectedPatient).totalRecords}
                    </p>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {getPatientSummary(selectedPatient).allergies.length}
                    </p>
                    <p className="text-sm text-gray-600">Known Allergies</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {getPatientSummary(selectedPatient).medications.length}
                    </p>
                    <p className="text-sm text-gray-600">Current Medications</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {getPatientSummary(selectedPatient).conditions.length}
                    </p>
                    <p className="text-sm text-gray-600">Medical Conditions</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Recent Records</h4>
                  <div className="space-y-2">
                    {getPatientSummary(selectedPatient).recentRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(record.type || 'consultation')}
                          <span className="font-medium">{record.title}</span>
                          <Badge className={getTypeColor(record.type || 'consultation')} variant="outline">
                            {record.type || 'consultation'}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-600">
                          {formatDate(record.createdAt || new Date())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecordsDashboard;