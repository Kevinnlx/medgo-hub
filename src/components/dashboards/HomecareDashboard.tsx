'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHomecare } from '@/hooks/useHomecare';
import { formatDate } from '@/lib/utils';
import CreateBookingModal from '@/components/homecare/CreateBookingModal';
import ServiceDetailsModal from '@/components/homecare/ServiceDetailsModal';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Heart, 
  Activity,
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  Phone,
  UserCheck,
  TrendingUp,
  DollarSign,
  Award,
  Syringe,
  HomeIcon,
  Stethoscope
} from 'lucide-react';
import type { HomecareServiceStatus, HomecareServiceType } from '@/types/homecare';

const HomecareDashboard = () => {
  const {
    bookings,
    availableCaregivers,
    loading,
    error,
    updateBookingStatus,
    assignCaregiver,
    cancelService,
    getBookingsByStatus,
    getAvailableCaregivers,
    formatCurrency,
    formatServiceType,
    formatStatus,
    getStatusColor
  } = useHomecare();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const handleStatusChange = async (serviceId: string, newStatus: HomecareServiceStatus, notes?: string) => {
    try {
      await updateBookingStatus(serviceId, newStatus, notes);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCaregiverAssignment = async (serviceId: string, caregiverId: string) => {
    try {
      await assignCaregiver(serviceId, caregiverId);
    } catch (error) {
      console.error('Error assigning caregiver:', error);
    }
  };

  const handleServiceCancellation = async (serviceId: string, reason: string) => {
    try {
      await cancelService(serviceId, reason);
    } catch (error) {
      console.error('Error cancelling service:', error);
    }
  };

  const getServiceIcon = (serviceType: HomecareServiceType) => {
    switch (serviceType) {
      case 'HOME_CARE': return <HomeIcon className="h-4 w-4" />;
      case 'INJECTIONS': return <Syringe className="h-4 w-4" />;
      case 'WOUND_CARE': return <Heart className="h-4 w-4" />;
      case 'ELDER_CARE': return <Users className="h-4 w-4" />;
      case 'PHYSICAL_THERAPY': return <Activity className="h-4 w-4" />;
      case 'MEDICAL_MONITORING': return <Stethoscope className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.serviceAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.serviceType === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: getBookingsByStatus('PENDING').length,
    confirmedBookings: getBookingsByStatus('CONFIRMED').length,
    inProgressBookings: getBookingsByStatus('IN_PROGRESS').length,
    completedBookings: getBookingsByStatus('COMPLETED').length,
    availableCaregivers: getAvailableCaregivers().length,
    totalRevenue: bookings
      .filter(b => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + b.totalAmountCents, 0)
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar datos</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Servicios de Cuidado Domiciliario</h1>
          <p className="text-gray-600">Gestiona servicios de atención médica domiciliaria y planes de cuidado</p>
        </div>
        <div className="flex gap-2">
          <CreateBookingModal />
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Buscar Proveedores
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Servicios</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmados</p>
                <p className="text-2xl font-bold text-blue-600">{stats.confirmedBookings}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Progreso</p>
                <p className="text-2xl font-bold text-orange-600">{stats.inProgressBookings}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedBookings}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cuidadores</p>
                <p className="text-2xl font-bold text-purple-600">{stats.availableCaregivers}</p>
              </div>
              <UserCheck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ingresos</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="caregivers">Cuidadores</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar servicios..."
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
                  <option value="all">Todos los Estados</option>
                  <option value="PENDING">Pendiente</option>
                  <option value="CONFIRMED">Confirmado</option>
                  <option value="IN_PROGRESS">En Progreso</option>
                  <option value="COMPLETED">Completado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos los Servicios</option>
                  <option value="HOME_CARE">Cuidado Domiciliario</option>
                  <option value="INJECTIONS">Inyecciones</option>
                  <option value="WOUND_CARE">Cuidado de Heridas</option>
                  <option value="ELDER_CARE">Cuidado de Adultos Mayores</option>
                  <option value="PHYSICAL_THERAPY">Fisioterapia</option>
                  <option value="MEDICAL_MONITORING">Monitoreo Médico</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Services List */}
          <div className="grid gap-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay servicios</h3>
                  <p className="text-gray-600">No se encontraron servicios que coincidan con los filtros.</p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getServiceIcon(booking.serviceType)}
                          <h3 className="font-semibold text-lg">
                            {formatServiceType(booking.serviceType)}
                          </h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {formatStatus(booking.status)}
                          </Badge>
                          {booking.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{booking.rating.overallRating}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <User className="h-4 w-4" />
                              <span><strong>Paciente:</strong> {booking.patientName}</span>
                              {booking.patientAge && <span>({booking.patientAge} años)</span>}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(booking.scheduledStart)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{booking.durationHours} horas</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">{booking.serviceAddress}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{booking.contactPhone}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium text-green-600">
                                {formatCurrency(booking.totalAmountCents)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {booking.operatorName && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <UserCheck className="h-4 w-4" />
                            <span><strong>Cuidador:</strong> {booking.operatorName}</span>
                          </div>
                        )}

                        {booking.specialInstructions && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-md">
                            <p className="text-sm text-gray-700">
                              <strong>Instrucciones:</strong> {booking.specialInstructions}
                            </p>
                          </div>
                        )}

                        {booking.medicalConditions && booking.medicalConditions.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-700">Condiciones médicas:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {booking.medicalConditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {booking.status === 'PENDING' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                              className="whitespace-nowrap"
                            >
                              Confirmar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleServiceCancellation(booking.id, 'Cancelado por el proveedor')}
                              className="whitespace-nowrap"
                            >
                              Cancelar
                            </Button>
                          </>
                        )}

                        {booking.status === 'CONFIRMED' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(booking.id, 'IN_PROGRESS')}
                              className="whitespace-nowrap"
                            >
                              Iniciar Servicio
                            </Button>
                            {!booking.operatorId && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="whitespace-nowrap"
                              >
                                Asignar Cuidador
                              </Button>
                            )}
                          </>
                        )}
                        
                        {booking.status === 'IN_PROGRESS' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                            className="whitespace-nowrap bg-green-600 hover:bg-green-700"
                          >
                            Completar Servicio
                          </Button>
                        )}

                        <ServiceDetailsModal service={booking} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="caregivers" className="space-y-4">
          <div className="grid gap-4">
            {availableCaregivers.map((caregiver) => (
              <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold text-lg">{caregiver.name}</h3>
                        <Badge className={caregiver.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {caregiver.isAvailable ? 'Disponible' : 'Ocupado'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Experiencia:</span> {caregiver.experience} años
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Calificación:</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{caregiver.rating}/5</span>
                        </div>
                        <div>
                          <span className="font-medium">Servicios:</span> {caregiver.completedServices}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Email:</span> {caregiver.email}
                        </div>
                        <div>
                          <span className="font-medium">Teléfono:</span> {caregiver.phone}
                        </div>
                      </div>

                      <div>
                        <span className="font-medium text-sm">Especialidades:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {caregiver.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        Ver Perfil
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Asignar Servicio
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Tasa de Finalización</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold">
                    {stats.totalBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Promedio por Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold">
                    {stats.completedBookings > 0 
                      ? formatCurrency(Math.round(stats.totalRevenue / stats.completedBookings))
                      : formatCurrency(0)
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Cuidadores Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-2xl font-bold">{availableCaregivers.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Servicios por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(['HOME_CARE', 'INJECTIONS', 'WOUND_CARE', 'ELDER_CARE', 'PHYSICAL_THERAPY', 'MEDICAL_MONITORING'] as HomecareServiceType[]).map(type => {
                  const count = bookings.filter(b => b.serviceType === type).length;
                  const percentage = stats.totalBookings > 0 ? (count / stats.totalBookings) * 100 : 0;
                  
                  return (
                    <div key={type} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-48">
                        {getServiceIcon(type)}
                        <span className="text-sm font-medium">{formatServiceType(type)}</span>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomecareDashboard; 