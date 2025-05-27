'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmergency } from '@/hooks/useEmergency';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';
import { 
  Ambulance, 
  Clock, 
  MapPin, 
  User, 
  Heart, 
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Users,
  Phone,
  TrendingUp,
  DollarSign,
  Siren,
  Navigation,
  Timer,
  AlertTriangle,
  CarIcon,
  CheckSquare,
  Eye,
  ArrowRight,
  FileText
} from 'lucide-react';
import type { EmergencyStatus, EmergencyType, CreateEmergencyRequestPayload } from '@/types/emergency';

const EmergencyDashboard = () => {
  const { user } = useAuth();
  const {
    requests,
    loading,
    error,
    updateRequestStatus,
    assignOperator,
    createRequest,
    refreshData,
    formatCurrency,
    formatEmergencyType,
    formatStatus,
    getStatusColor,
    getStats
  } = useEmergency();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Form state for new request
  const [newRequestForm, setNewRequestForm] = useState<CreateEmergencyRequestPayload>({
    patientName: '',
    patientAge: 0,
    bloodType: '',
    medicalConditions: [],
    allergies: [],
    emergencyType: 'MEDICAL_EMERGENCY',
    description: '',
    pickupAddress: '',
    pickupCoordinates: { latitude: 10.4806, longitude: -66.9036 },
    referenceNotes: '',
    buildingDetails: '',
    contactName: '',
    contactPhone: '',
    contactRelationship: '',
    providerId: user?.id || '7'
  });

  useEffect(() => {
    if (user?.providerType === 'EMERGENCY') {
      refreshData();
    }
  }, [user, refreshData]);

  const handleStatusChange = async (requestId: string, newStatus: EmergencyStatus, notes?: string) => {
    try {
      await updateRequestStatus(requestId, { status: newStatus, notes });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCreateRequest = async () => {
    try {
      await createRequest(newRequestForm);
      setShowNewRequestModal(false);
      setNewRequestForm({
        patientName: '',
        patientAge: 0,
        bloodType: '',
        medicalConditions: [],
        allergies: [],
        emergencyType: 'MEDICAL_EMERGENCY',
        description: '',
        pickupAddress: '',
        pickupCoordinates: { latitude: 10.4806, longitude: -66.9036 },
        referenceNotes: '',
        buildingDetails: '',
        contactName: '',
        contactPhone: '',
        contactRelationship: '',
        providerId: user?.id || '7'
      });
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  const getEmergencyIcon = (emergencyType: EmergencyType) => {
    switch (emergencyType) {
      case 'MEDICAL_EMERGENCY': return <Heart className="h-4 w-4" />;
      case 'ACCIDENT': return <AlertTriangle className="h-4 w-4" />;
      case 'TRANSFER': return <CarIcon className="h-4 w-4" />;
      default: return <Ambulance className="h-4 w-4" />;
    }
  };

  const getTimeElapsed = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Hace un momento';
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours}h ${diffMinutes % 60}min`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} días`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getStatusActions = (request: any) => {
    switch (request.status) {
      case 'PENDING':
        return (
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleStatusChange(request.id, 'PAID')}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Confirmar Pago
          </Button>
        );
      case 'PAID':
        return (
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setSelectedRequest(request.id);
              setShowAssignModal(true);
            }}
          >
            <Users className="h-4 w-4 mr-1" />
            Asignar Operador
          </Button>
        );
      case 'ACCEPTED':
        return (
          <Button 
            size="sm"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => handleStatusChange(request.id, 'IN_PROGRESS')}
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            Iniciar Servicio
          </Button>
        );
      case 'IN_PROGRESS':
        return (
          <Button 
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => handleStatusChange(request.id, 'ARRIVING')}
          >
            <Navigation className="h-4 w-4 mr-1" />
            Marcar Llegando
          </Button>
        );
      case 'ARRIVING':
        return (
          <Button 
            size="sm"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleStatusChange(request.id, 'COMPLETED')}
          >
            <CheckSquare className="h-4 w-4 mr-1" />
            Completar
          </Button>
        );
      default:
        return null;
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = getStats();
  const selectedRequestData = selectedRequest ? requests.find(r => r.id === selectedRequest) : null;

  if (user?.providerType !== 'EMERGENCY') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Acceso Denegado</h3>
          <p className="text-gray-600">Este módulo está disponible solo para proveedores de emergencia</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar datos</h3>
          <p className="text-gray-600">{error}</p>
          <Button onClick={refreshData} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Ambulance className="h-8 w-8 text-red-600" />
            Servicios de Emergencia
          </h1>
          <p className="text-gray-600 mt-1">
            Panel de control para servicios de ambulancia y atención de emergencias
          </p>
        </div>
        
        <div className="flex gap-3">
          <Dialog open={showNewRequestModal} onOpenChange={setShowNewRequestModal}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Emergencia
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Siren className="h-5 w-5 text-red-600" />
                  Registrar Nueva Emergencia
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                {/* Información del Paciente */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Información del Paciente</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Nombre del Paciente *</Label>
                    <Input
                      id="patientName"
                      value={newRequestForm.patientName}
                      onChange={(e) => setNewRequestForm({...newRequestForm, patientName: e.target.value})}
                      placeholder="Nombre completo"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Edad *</Label>
                      <Input
                        id="patientAge"
                        type="number"
                        value={newRequestForm.patientAge || ''}
                        onChange={(e) => setNewRequestForm({...newRequestForm, patientAge: parseInt(e.target.value) || 0})}
                        placeholder="Edad"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Tipo de Sangre</Label>
                      <Select value={newRequestForm.bloodType} onValueChange={(value) => setNewRequestForm({...newRequestForm, bloodType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyType">Tipo de Emergencia *</Label>
                    <Select value={newRequestForm.emergencyType} onValueChange={(value: EmergencyType) => setNewRequestForm({...newRequestForm, emergencyType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MEDICAL_EMERGENCY">Emergencia Médica</SelectItem>
                        <SelectItem value="ACCIDENT">Accidente</SelectItem>
                        <SelectItem value="TRANSFER">Traslado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción de la Emergencia *</Label>
                    <Textarea
                      id="description"
                      value={newRequestForm.description}
                      onChange={(e) => setNewRequestForm({...newRequestForm, description: e.target.value})}
                      placeholder="Describe la situación de emergencia..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Ubicación y Contacto */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 border-b pb-2">Ubicación y Contacto</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Dirección de Recogida *</Label>
                    <Textarea
                      id="pickupAddress"
                      value={newRequestForm.pickupAddress}
                      onChange={(e) => setNewRequestForm({...newRequestForm, pickupAddress: e.target.value})}
                      placeholder="Dirección completa donde recoger al paciente"
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referenceNotes">Referencias de Ubicación</Label>
                    <Input
                      id="referenceNotes"
                      value={newRequestForm.referenceNotes}
                      onChange={(e) => setNewRequestForm({...newRequestForm, referenceNotes: e.target.value})}
                      placeholder="Ej: Casa blanca con portón azul"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buildingDetails">Detalles del Edificio</Label>
                    <Input
                      id="buildingDetails"
                      value={newRequestForm.buildingDetails}
                      onChange={(e) => setNewRequestForm({...newRequestForm, buildingDetails: e.target.value})}
                      placeholder="Ej: Piso 3, Apartamento 3B"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre del Contacto *</Label>
                    <Input
                      id="contactName"
                      value={newRequestForm.contactName}
                      onChange={(e) => setNewRequestForm({...newRequestForm, contactName: e.target.value})}
                      placeholder="Persona de contacto"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Teléfono de Contacto *</Label>
                    <Input
                      id="contactPhone"
                      value={newRequestForm.contactPhone}
                      onChange={(e) => setNewRequestForm({...newRequestForm, contactPhone: e.target.value})}
                      placeholder="+58414XXXXXXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactRelationship">Relación con el Paciente *</Label>
                    <Select value={newRequestForm.contactRelationship} onValueChange={(value) => setNewRequestForm({...newRequestForm, contactRelationship: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar relación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paciente">El mismo paciente</SelectItem>
                        <SelectItem value="Esposo/a">Esposo/a</SelectItem>
                        <SelectItem value="Hijo/a">Hijo/a</SelectItem>
                        <SelectItem value="Padre/Madre">Padre/Madre</SelectItem>
                        <SelectItem value="Hermano/a">Hermano/a</SelectItem>
                        <SelectItem value="Familiar">Otro familiar</SelectItem>
                        <SelectItem value="Amigo/a">Amigo/a</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowNewRequestModal(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleCreateRequest}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={!newRequestForm.patientName || !newRequestForm.description || !newRequestForm.pickupAddress}
                >
                  Crear Emergencia
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <Navigation className="h-4 w-4 mr-2" />
            Rastreo GPS
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.totalRequests}</p>
              </div>
              <Ambulance className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Activos</p>
                <p className="text-2xl font-bold text-orange-600">{stats.inProgressRequests + stats.arrivingRequests}</p>
              </div>
              <Siren className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedRequests}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Respuesta</p>
                <p className="text-xl font-bold">{stats.averageResponseTimeMinutes}m</p>
              </div>
              <Timer className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Éxito</p>
                <p className="text-xl font-bold">{stats.completionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos</p>
                <p className="text-lg font-bold">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por ID, dirección o paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="PENDING">Pendiente</SelectItem>
                <SelectItem value="PAID">Pagado</SelectItem>
                <SelectItem value="ACCEPTED">Aceptado</SelectItem>
                <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
                <SelectItem value="ARRIVING">Llegando</SelectItem>
                <SelectItem value="COMPLETED">Completado</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Requests */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Ambulance className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay emergencias
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all'
                  ? 'No se encontraron emergencias con los filtros aplicados'
                  : 'Aún no hay solicitudes de emergencia registradas'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Status and Emergency Type */}
                  <div className="lg:col-span-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 bg-red-50 rounded-lg">
                        {getEmergencyIcon(request.emergencyType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(request.status)}>
                            {formatStatus(request.status)}
                          </Badge>
                          <span className="text-xs text-gray-500 font-mono">
                            #{request.id.slice(-6)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {formatEmergencyType(request.emergencyType)}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {request.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {getTimeElapsed(request.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Information */}
                  <div className="lg:col-span-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{request.patientName}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>{request.patientAge} años</span>
                        {request.bloodType && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                            {request.bloodType}
                          </span>
                        )}
                      </div>
                      {request.medicalConditions && request.medicalConditions.length > 0 && (
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Condiciones:</span> {request.medicalConditions.join(', ')}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{request.contactName}</span>
                        <span className="text-gray-400">({request.contactRelationship})</span>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {request.pickupAddress}
                        </div>
                        {request.referenceNotes && (
                          <div className="text-xs text-gray-600 mb-1">
                            📍 {request.referenceNotes}
                          </div>
                        )}
                        {request.buildingDetails && (
                          <div className="text-xs text-gray-600 mb-1">
                            🏢 {request.buildingDetails}
                          </div>
                        )}
                        {request.estimatedDistanceKm && (
                          <div className="text-xs text-gray-500">
                            📏 ~{request.estimatedDistanceKm.toFixed(1)} km
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-col gap-2">
                      {getStatusActions(request)}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request.id);
                          setShowDetailsModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Detalles de la Emergencia #{selectedRequestData?.id.slice(-6)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequestData && (
            <div className="space-y-6">
              {/* Status and Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${getStatusColor(selectedRequestData.status)} text-sm py-1`}>
                    {formatStatus(selectedRequestData.status)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatEmergencyType(selectedRequestData.emergencyType)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Creado:</span> {formatDate(selectedRequestData.createdAt)}
                  </div>
                  {selectedRequestData.paidAt && (
                    <div>
                      <span className="text-gray-600">Pagado:</span> {formatDate(selectedRequestData.paidAt)}
                    </div>
                  )}
                  {selectedRequestData.acceptedAt && (
                    <div>
                      <span className="text-gray-600">Aceptado:</span> {formatDate(selectedRequestData.acceptedAt)}
                    </div>
                  )}
                  {selectedRequestData.completedAt && (
                    <div>
                      <span className="text-gray-600">Completado:</span> {formatDate(selectedRequestData.completedAt)}
                    </div>
                  )}
                </div>
              </div>

              {/* Patient Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Información del Paciente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nombre:</span> {selectedRequestData.patientName}
                  </div>
                  <div>
                    <span className="text-gray-600">Edad:</span> {selectedRequestData.patientAge} años
                  </div>
                  {selectedRequestData.bloodType && (
                    <div>
                      <span className="text-gray-600">Tipo de Sangre:</span> {selectedRequestData.bloodType}
                    </div>
                  )}
                  {selectedRequestData.medicalConditions && selectedRequestData.medicalConditions.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Condiciones Médicas:</span> {selectedRequestData.medicalConditions.join(', ')}
                    </div>
                  )}
                  {selectedRequestData.allergies && selectedRequestData.allergies.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Alergias:</span> {selectedRequestData.allergies.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Descripción de la Emergencia
                </h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedRequestData.description}
                </p>
              </div>

              {/* Location Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Dirección:</span> {selectedRequestData.pickupAddress}
                  </div>
                  {selectedRequestData.referenceNotes && (
                    <div>
                      <span className="text-gray-600">Referencias:</span> {selectedRequestData.referenceNotes}
                    </div>
                  )}
                  {selectedRequestData.buildingDetails && (
                    <div>
                      <span className="text-gray-600">Detalles del Edificio:</span> {selectedRequestData.buildingDetails}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Contacto:</span> {selectedRequestData.contactName}
                  </div>
                  <div>
                    <span className="text-gray-600">Teléfono:</span> {selectedRequestData.contactPhone}
                  </div>
                  <div>
                    <span className="text-gray-600">Relación:</span> {selectedRequestData.contactRelationship}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Operator Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Asignar Operador</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Selecciona un operador disponible para esta emergencia
            </p>
            
            <div className="space-y-3">
              {['operator-1', 'operator-2'].map((operatorId, index) => (
                <div key={operatorId} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Operador {index + 1}</div>
                      <div className="text-sm text-gray-600">Disponible • 2.5 km</div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={async () => {
                      if (selectedRequest) {
                        await assignOperator(selectedRequest, operatorId);
                        setShowAssignModal(false);
                        setSelectedRequest(null);
                      }
                    }}
                  >
                    Asignar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyDashboard; 