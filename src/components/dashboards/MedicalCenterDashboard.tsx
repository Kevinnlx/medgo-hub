'use client'

import React from 'react'
import ProviderDashboardBase from './ProviderDashboardBase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Stethoscope,
  Calendar,
  Users,
  Bed,
  Heart,
  Clock,
  UserPlus,
  Settings,
  FileText,
  Activity,
  CheckCircle,
  AlertTriangle,
  Phone,
  Building,
  Star
} from 'lucide-react'

const MedicalCenterDashboard: React.FC = () => {
  // Datos simulados específicos del centro médico
  const medicalCenterMetrics = {
    totalServices: 15,
    activeServices: 12,
    totalRevenue: 89450,
    monthlyRevenue: 18920,
    rating: 4.6,
    totalClients: 1847,
    todayServices: 23,
    completionRate: 94
  }

  // Acciones rápidas específicas para centro médico
  const quickActions = [
    {
      title: 'Nueva Consulta',
      description: 'Programar cita médica',
      icon: <Calendar className="h-4 w-4" />,
      color: 'text-blue-600',
      onClick: () => console.log('Nueva consulta')
    },
    {
      title: 'Registrar Paciente',
      description: 'Agregar nuevo paciente',
      icon: <UserPlus className="h-4 w-4" />,
      color: 'text-green-600',
      onClick: () => console.log('Registrar paciente')
    },
    {
      title: 'Gestionar Personal',
      description: 'Administrar doctores y staff',
      icon: <Users className="h-4 w-4" />,
      color: 'text-purple-600',
      onClick: () => console.log('Gestionar personal')
    },
    {
      title: 'Configurar Instalaciones',
      description: 'Salas y equipamiento',
      icon: <Building className="h-4 w-4" />,
      color: 'text-orange-600',
      onClick: () => console.log('Configurar instalaciones')
    }
  ]

  // Actividad reciente específica
  const recentActivity = [
    {
      id: '1',
      title: 'Consulta completada',
      description: 'Dr. García completó consulta con María López',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'service' as const,
      icon: <Stethoscope className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'Nuevo paciente registrado',
      description: 'Juan Martínez se registró en el sistema',
      timestamp: '2024-01-15T13:45:00Z',
      type: 'service' as const,
      icon: <UserPlus className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Pago procesado',
      description: 'Consulta de Ana Ruiz - $45.00',
      timestamp: '2024-01-15T12:20:00Z',
      type: 'payment' as const,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'Revisión recibida',
      description: 'Carlos Pérez calificó con 5 estrellas',
      timestamp: '2024-01-15T11:10:00Z',
      type: 'review' as const,
      icon: <Star className="h-4 w-4" />
    }
  ]

  // Tabs personalizados para centro médico - SIMPLIFICADOS
  const customTabs = [
    {
      id: 'consultations',
      label: 'Consultas',
      content: (
        <div className="space-y-6">
          {/* Agenda del día */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Agenda de Hoy
              </CardTitle>
              <CardDescription>
                Consultas programadas para hoy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: '09:00',
                    patient: 'María González',
                    doctor: 'Dr. Pérez',
                    type: 'Consulta General',
                    status: 'completed',
                    room: 'Sala 1'
                  },
                  {
                    time: '09:30',
                    patient: 'Juan Martínez',
                    doctor: 'Dr. García',
                    type: 'Seguimiento',
                    status: 'in-progress',
                    room: 'Sala 2'
                  },
                  {
                    time: '10:00',
                    patient: 'Ana López',
                    doctor: 'Dr. Rodríguez',
                    type: 'Consulta Especializada',
                    status: 'scheduled',
                    room: 'Sala 3'
                  },
                  {
                    time: '10:30',
                    patient: 'Carlos Ruiz',
                    doctor: 'Dr. Pérez',
                    type: 'Revisión',
                    status: 'scheduled',
                    room: 'Sala 1'
                  }
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-lg">{appointment.time}</div>
                        <div className="text-xs text-gray-500">{appointment.room}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                        <p className="text-sm text-gray-800">{appointment.type}</p>
                        <p className="text-xs text-gray-700">
                          Dr. {appointment.doctor} • {appointment.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {appointment.status === 'completed' ? 'Completada' :
                         appointment.status === 'in-progress' ? 'En Progreso' :
                         'Programada'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de consultas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Consultas Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">23</div>
                <p className="text-xs text-green-600">+3 vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Tiempo Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">32 min</div>
                <p className="text-xs text-gray-800">por consulta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Satisfacción</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">4.6/5</div>
                <p className="text-xs text-green-600">+0.1 vs mes anterior</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ]

  return (
    <ProviderDashboardBase
      providerType="Centro Médico"
      providerName="Centro Médico San Rafael"
      metrics={medicalCenterMetrics}
      quickActions={quickActions}
      recentActivity={recentActivity}
      customTabs={customTabs}
    >
      {/* Contenido adicional específico del centro médico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Alertas y notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Alertas del Sistema
            </CardTitle>
            <CardDescription>
              Notificaciones importantes del centro médico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                type: 'warning',
                title: 'Sala en mantenimiento',
                description: 'Sala de Procedimientos no disponible hasta las 15:00',
                time: 'hace 1 hora'
              },
              {
                type: 'info',
                title: 'Nuevo paciente registrado',
                description: 'María González completó su registro',
                time: 'hace 2 horas'
              },
              {
                type: 'success',
                title: 'Pago procesado',
                description: 'Consulta de Juan Pérez - $45.00',
                time: 'hace 3 horas'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'info' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  ) : alert.type === 'info' ? (
                    <Activity className="h-4 w-4 text-blue-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Información de contacto y horarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-blue-600" />
              Información del Centro
            </CardTitle>
            <CardDescription>
              Datos de contacto y horarios de atención
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Contacto</h4>
              <p className="text-sm text-gray-800">📞 (502) 2345-6789</p>
              <p className="text-sm text-gray-800">📧 info@centromedicosanrafael.com</p>
              <p className="text-sm text-gray-800">📍 Av. Principal 123, Zona 10, Guatemala</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Horarios de Atención</h4>
              <div className="text-sm text-gray-800 space-y-1">
                <p><strong>Lunes - Viernes:</strong> 7:00 AM - 7:00 PM</p>
                <p><strong>Sábados:</strong> 8:00 AM - 4:00 PM</p>
                <p><strong>Domingos:</strong> 9:00 AM - 2:00 PM</p>
                <p><strong>Emergencias:</strong> 24/7</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Servicios Disponibles</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Medicina General',
                  'Cardiología',
                  'Pediatría',
                  'Dermatología',
                  'Laboratorio',
                  'Emergencias'
                ].map((service, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderDashboardBase>
  )
}

export default MedicalCenterDashboard 