'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  Beaker,
  FileSearch,
  Download,
  Upload,
  TrendingUp
} from 'lucide-react';
import ProviderDashboardBase from './ProviderDashboardBase';

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

  // Datos simulados específicos del laboratorio
  const laboratoryMetrics = {
    totalServices: 25,
    activeServices: 22,
    totalRevenue: 124680,
    monthlyRevenue: 28940,
    rating: 4.8,
    totalClients: 1456,
    todayServices: 67,
    completionRate: 98
  }

  // Acciones rápidas específicas para laboratorio
  const quickActions = [
    {
      title: 'Nueva Muestra',
      description: 'Registrar nueva muestra',
      icon: <FlaskConical className="h-4 w-4" />,
      color: 'text-blue-600',
      onClick: () => console.log('Nueva muestra')
    },
    {
      title: 'Procesar Resultados',
      description: 'Análisis completados',
      icon: <FileSearch className="h-4 w-4" />,
      color: 'text-green-600',
      onClick: () => console.log('Procesar resultados')
    },
    {
      title: 'Generar Reportes',
      description: 'Reportes de laboratorio',
      icon: <Download className="h-4 w-4" />,
      color: 'text-purple-600',
      onClick: () => console.log('Generar reportes')
    },
    {
      title: 'Control de Calidad',
      description: 'Verificar estándares',
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'text-orange-600',
      onClick: () => console.log('Control de calidad')
    }
  ]

  // Actividad reciente específica
  const recentActivity = [
    {
      id: '1',
      title: 'Análisis completado',
      description: 'Hemograma completo para María López - Resultados normales',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'service' as const,
      icon: <FlaskConical className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'Muestra procesada',
      description: 'Química sanguínea - Juan Martínez',
      timestamp: '2024-01-15T13:45:00Z',
      type: 'service' as const,
      icon: <Activity className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Pago procesado',
      description: 'Perfil lipídico - $85.00',
      timestamp: '2024-01-15T12:20:00Z',
      type: 'payment' as const,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'Equipo mantenimiento',
      description: 'Analizador hematológico calibrado',
      timestamp: '2024-01-15T11:10:00Z',
      type: 'alert' as const,
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ]

  // Tabs personalizados para laboratorio
  const customTabs = [
    {
      id: 'samples',
      label: 'Muestras',
      content: (
        <div className="space-y-6">
          {/* Muestras en proceso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FlaskConical className="h-5 w-5 mr-2 text-blue-600" />
                Muestras en Proceso
              </CardTitle>
              <CardDescription>
                Estado actual de análisis en laboratorio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 'LAB-001',
                    patient: 'María González',
                    doctor: 'Dr. Pérez',
                    testType: 'Hemograma Completo',
                    priority: 'normal',
                    status: 'processing',
                    receivedAt: '2024-01-15T08:30:00Z',
                    estimatedTime: '2 horas'
                  },
                  {
                    id: 'LAB-002',
                    patient: 'Juan Martínez',
                    doctor: 'Dra. García',
                    testType: 'Química Sanguínea',
                    priority: 'urgent',
                    status: 'pending',
                    receivedAt: '2024-01-15T09:15:00Z',
                    estimatedTime: '1 hora'
                  },
                  {
                    id: 'LAB-003',
                    patient: 'Ana López',
                    doctor: 'Dr. Rodríguez',
                    testType: 'Perfil Lipídico',
                    priority: 'normal',
                    status: 'completed',
                    receivedAt: '2024-01-15T07:45:00Z',
                    estimatedTime: 'Completado'
                  }
                ].map((sample, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-sm">{sample.id}</div>
                        <Badge className={
                          sample.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          sample.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        } variant="secondary">
                          {sample.priority === 'urgent' ? 'Urgente' :
                           sample.priority === 'high' ? 'Alta' :
                           'Normal'}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{sample.patient}</h4>
                        <p className="text-sm text-gray-800">{sample.testType}</p>
                        <p className="text-xs text-gray-700">
                          Solicitado por {sample.doctor} • {sample.estimatedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={
                        sample.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        sample.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {sample.status === 'pending' ? 'Pendiente' :
                         sample.status === 'processing' ? 'Procesando' :
                         'Completado'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {sample.status === 'completed' ? 'Ver Resultado' : 'Actualizar'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de análisis */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Análisis Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">67</div>
                <p className="text-xs text-green-600">+12 vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Tiempo Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">2.5 hrs</div>
                <p className="text-xs text-gray-800">por análisis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">En Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">15</div>
                <p className="text-xs text-orange-600">3 urgentes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Precisión</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">99.2%</div>
                <p className="text-xs text-green-600">control de calidad</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ]

  return (
    <ProviderDashboardBase
      providerType="Laboratorio Clínico"
      providerName="Laboratorio Diagnóstico Plus"
      metrics={laboratoryMetrics}
      quickActions={quickActions}
      recentActivity={recentActivity}
      customTabs={customTabs}
    />
  );
};

export default LaboratoryDashboard; 