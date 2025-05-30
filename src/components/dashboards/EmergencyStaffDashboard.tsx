'use client'

import React from 'react'
import ProviderDashboardBase from './ProviderDashboardBase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Truck,
  Siren,
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  FileText,
  MapPin,
  Calendar,
  Activity,
  Phone,
  Shield,
  Bell,
  Eye,
  Plus,
  Radio,
  Navigation,
  Zap,
  Target,
  Star,
  Thermometer,
  Timer,
  UserCheck,
  BookOpen,
  Calculator,
  Stethoscope,
  Clipboard,
  Settings,
  TrendingUp,
  Users,
  Map,
  MessageSquare,
  Briefcase
} from 'lucide-react'

const EmergencyStaffDashboard: React.FC = () => {
  // Datos simulados específicos de personal de emergencias
  const emergencyStaffMetrics = {
    totalServices: 9,
    activeServices: 7,
    totalRevenue: 22480,
    monthlyRevenue: 18650,
    rating: 4.8,
    totalClients: 89,
    todayServices: 14,
    completionRate: 97
  }

  // Acciones rápidas específicas para personal de emergencias
  const quickActions = [
    {
      title: 'Nueva Emergencia',
      description: 'Responder llamada',
      icon: <Siren className="h-4 w-4" />,
      color: 'text-red-600',
      onClick: () => console.log('Nueva emergencia')
    },
    {
      title: 'Despachar Ambulancia',
      description: 'Enviar unidad',
      icon: <Truck className="h-4 w-4" />,
      color: 'text-blue-600',
      onClick: () => console.log('Despachar ambulancia')
    },
    {
      title: 'Comunicar Hospital',
      description: 'Coordinar traslado',
      icon: <Radio className="h-4 w-4" />,
      color: 'text-green-600',
      onClick: () => console.log('Comunicar hospital')
    },
    {
      title: 'Protocolo ACLS',
      description: 'Soporte vital avanzado',
      icon: <Heart className="h-4 w-4" />,
      color: 'text-purple-600',
      onClick: () => console.log('Protocolo ACLS')
    }
  ]

  // Actividad reciente específica
  const recentActivity = [
    {
      id: '1',
      title: 'Emergencia atendida',
      description: 'Infarto agudo - Paciente estabilizado y trasladado',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'service' as const,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'Código rojo activado',
      description: 'Accidente múltiple - 3 ambulancias despachadas',
      timestamp: '2024-01-15T13:45:00Z',
      type: 'alert' as const,
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Traslado completado',
      description: 'Paciente pediátrico - Hospital Roosevelt',
      timestamp: '2024-01-15T12:20:00Z',
      type: 'service' as const,
      icon: <Truck className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'RCP exitosa',
      description: 'Paro cardíaco revertido - 8 minutos',
      timestamp: '2024-01-15T11:10:00Z',
      type: 'service' as const,
      icon: <Heart className="h-4 w-4" />
    }
  ]

  // Tabs personalizados para personal de emergencias
  const customTabs = [
    {
      id: 'emergencies',
      label: 'Emergencias Activas',
      content: (
        <div className="space-y-6">
          {/* Emergencias en curso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Siren className="h-5 w-5 mr-2 text-red-600" />
                Llamadas de Emergencia
              </CardTitle>
              <CardDescription>
                Emergencias activas y en proceso de atención
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 'EMG-001',
                    type: 'Infarto agudo',
                    location: 'Av. Roosevelt 15-45, Zona 11',
                    patient: 'Hombre, 58 años',
                    priority: 'critical',
                    status: 'dispatched',
                    reportTime: '14:30',
                    eta: '12 min',
                    ambulanceId: 'AMB-05',
                    crew: 'Equipo Alpha'
                  },
                  {
                    id: 'EMG-002',
                    type: 'Accidente de tránsito',
                    location: 'CA-1 Km 15.5, Villa Nueva',
                    patient: 'Múltiples víctimas',
                    priority: 'urgent',
                    status: 'on_scene',
                    reportTime: '13:45',
                    eta: 'En sitio',
                    ambulanceId: 'AMB-03, AMB-07',
                    crew: 'Equipo Bravo, Charlie'
                  },
                  {
                    id: 'EMG-003',
                    type: 'Dificultad respiratoria',
                    location: 'Col. Vista Hermosa I, Casa 12',
                    patient: 'Mujer, 34 años',
                    priority: 'high',
                    status: 'pending',
                    reportTime: '14:45',
                    eta: 'Esperando',
                    ambulanceId: 'Pendiente',
                    crew: 'Por asignar'
                  },
                  {
                    id: 'EMG-004',
                    type: 'Caída de altura',
                    location: 'Construcción Zona 14',
                    patient: 'Hombre, 42 años',
                    priority: 'urgent',
                    status: 'transporting',
                    reportTime: '13:20',
                    eta: '8 min Hospital',
                    ambulanceId: 'AMB-02',
                    crew: 'Equipo Delta'
                  }
                ].map((emergency, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    emergency.priority === 'critical' ? 'border-red-300 bg-red-50' :
                    emergency.priority === 'urgent' ? 'border-orange-300 bg-orange-50' :
                    'border-yellow-300 bg-yellow-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-bold text-sm">{emergency.id}</div>
                          <div className="text-xs text-gray-500">{emergency.reportTime}</div>
                          <Badge className={
                            emergency.priority === 'critical' ? 'bg-red-100 text-red-800' :
                            emergency.priority === 'urgent' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          } variant="secondary">
                            {emergency.priority === 'critical' ? 'Crítico' :
                             emergency.priority === 'urgent' ? 'Urgente' :
                             'Alto'}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-red-600">{emergency.type}</h4>
                          <p className="text-sm text-black">📍 {emergency.location}</p>
                          <p className="text-sm text-black">👤 {emergency.patient}</p>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-500">
                            <span>🚑 {emergency.ambulanceId}</span>
                            <span>👥 {emergency.crew}</span>
                            <span>⏱️ ETA: {emergency.eta}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={
                          emergency.status === 'on_scene' ? 'bg-blue-100 text-blue-800' :
                          emergency.status === 'dispatched' ? 'bg-green-100 text-green-800' :
                          emergency.status === 'transporting' ? 'bg-purple-100 text-purple-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {emergency.status === 'on_scene' ? 'En sitio' :
                           emergency.status === 'dispatched' ? 'Despachada' :
                           emergency.status === 'transporting' ? 'Trasladando' :
                           'Pendiente'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Radio className="h-4 w-4 mr-1" />
                          Comunicar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de emergencias */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black">Emergencias Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-green-600">+5 vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black">Tiempo Respuesta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5 min</div>
                <p className="text-xs text-black">promedio</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black">Unidades Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6/8</div>
                <p className="text-xs text-orange-600">2 en mantenimiento</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black">Tasa Supervivencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-green-600">últimos 30 días</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ]

  return (
    <ProviderDashboardBase
      providerType="Personal de Emergencias"
      providerName="TEM. Patricia Morales"
      metrics={emergencyStaffMetrics}
      quickActions={quickActions}
      recentActivity={recentActivity}
      customTabs={customTabs}
    >
      {/* Contenido adicional específico de personal de emergencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Alertas de emergencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-yellow-600" />
              Alertas de Emergencia
            </CardTitle>
            <CardDescription>
              Notificaciones críticas del sistema de emergencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                type: 'emergency',
                title: 'Múltiples llamadas - Mismo sector',
                message: 'Zona 11 - Posible incidente masivo. 3 llamadas en 5 minutos.',
                time: 'hace 2 min',
                action: 'Activar protocolo'
              },
              {
                type: 'equipment',
                title: 'Equipo crítico low battery',
                message: 'Monitor/Desfibrilador AMB-02 - Batería al 15%',
                time: 'hace 8 min',
                action: 'Cambiar batería'
              },
              {
                type: 'weather',
                title: 'Alerta meteorológica',
                message: 'Lluvia intensa prevista 16:00-20:00. Incremento accidentes.',
                time: 'hace 15 min',
                action: 'Preparar unidades'
              },
              {
                type: 'hospital',
                title: 'Hospital en capacidad límite',
                message: 'Hospital Roosevelt - ER al 95% ocupación',
                time: 'hace 25 min',
                action: 'Redirigir traslados'
              }
            ].map((alert, index) => (
              <div key={index} className={`p-3 border rounded-lg ${
                alert.type === 'emergency' ? 'border-red-300 bg-red-50' :
                alert.type === 'equipment' ? 'border-orange-300 bg-orange-50' :
                alert.type === 'weather' ? 'border-blue-300 bg-blue-50' :
                'border-purple-300 bg-purple-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    alert.type === 'emergency' ? 'bg-red-100' :
                    alert.type === 'equipment' ? 'bg-orange-100' :
                    alert.type === 'weather' ? 'bg-blue-100' :
                    'bg-purple-100'
                  }`}>
                    {alert.type === 'emergency' ? <Siren className="h-4 w-4 text-red-600" /> :
                     alert.type === 'equipment' ? <Settings className="h-4 w-4 text-orange-600" /> :
                     alert.type === 'weather' ? <MapPin className="h-4 w-4 text-blue-600" /> :
                     <Activity className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <p className="text-sm text-black">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{alert.time}</span>
                      <Button size="sm" variant="outline">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Información del personal de emergencias - Perfil actualizado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
              Mi Perfil de Emergencias
            </CardTitle>
            <CardDescription>
              Información profesional y certificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Información Personal</h4>
              <div className="text-sm text-black space-y-1">
                <p className="text-sm text-black">🚑 TEM. Patricia Morales Rivera</p>
                <p className="text-sm text-black">🏥 Servicios de Emergencia MediGo</p>
                <p className="text-sm text-black">📧 patricia.morales@medgohub.com</p>
                <p className="text-sm text-black">📞 (502) 2345-6789 ext. 911</p>
                <p className="text-sm text-black">📻 Radio: Canal 3 - Unidad 205</p>
                <p className="text-sm text-black">🆔 Empleado: EMR-2017-0156</p>
                <p className="text-sm text-black">📅 Fecha de ingreso: 15 de Marzo, 2017</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Formación Académica</h4>
              <div className="text-sm text-black space-y-1">
                <p><strong>Título Principal:</strong> Técnico en Emergencias Médicas</p>
                <p><strong>Institución:</strong> Universidad San Carlos - Facultad de Medicina</p>
                <p><strong>Año de graduación:</strong> 2016</p>
                <p><strong>Especialización:</strong> Trauma y Cardiología de Emergencia</p>
                <p><strong>Licencia profesional:</strong> TEM-2017-1234 (Vigente hasta 2025)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Certificaciones Médicas</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { cert: 'ACLS', desc: 'Soporte Vital Avanzado', exp: '2025' },
                  { cert: 'PALS', desc: 'Soporte Vital Pediátrico', exp: '2024' },
                  { cert: 'BLS', desc: 'Soporte Vital Básico', exp: '2025' },
                  { cert: 'TCCC', desc: 'Cuidado Táctico de Combate', exp: '2024' },
                  { cert: 'PHTLS', desc: 'Soporte Vital en Trauma', exp: '2025' },
                  { cert: 'AMLS', desc: 'Soporte Vital Médico Avanzado', exp: '2024' }
                ].map((cert, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs font-semibold text-red-600">{cert.cert}</p>
                    <p className="text-xs text-gray-600">{cert.desc}</p>
                    <p className="text-xs text-green-600">Vigente hasta {cert.exp}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Competencias Especiales</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'RCP Avanzado',
                  'Intubación Endotraqueal',
                  'Acceso Vascular Periférico',
                  'Acceso Intraóseo',
                  'Farmacología de Emergencia',
                  'Trauma Pediátrico',
                  'Manejo de Vía Aérea',
                  'Protocolos de Paro Cardíaco',
                  'Desfibrilación Automática',
                  'Inmovilización Espinal',
                  'Control de Hemorragias',
                  'Manejo de Crisis'
                ].map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Experiencia Profesional</h4>
              <div className="text-sm text-black space-y-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <p className="font-medium">Técnico en Emergencias Médicas Senior</p>
                  <p className="text-gray-600">Servicios de Emergencia MediGo (2017 - Presente)</p>
                  <p className="text-xs text-gray-500">7 años de experiencia</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="font-medium">Paramédico Voluntario</p>
                  <p className="text-gray-600">Bomberos Voluntarios - Zona 11 (2015 - 2017)</p>
                  <p className="text-xs text-gray-500">2 años de experiencia</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Estadísticas del Período Actual</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Emergencias este mes:</span>
                    <span className="text-sm font-medium text-red-600">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tiempo promedio respuesta:</span>
                    <span className="text-sm font-medium text-blue-600">8.5 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">RCP exitosas:</span>
                    <span className="text-sm font-medium text-green-600">12/14 (86%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tasa de supervivencia:</span>
                    <span className="text-sm font-medium text-green-600">94%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Traslados completados:</span>
                    <span className="text-sm font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Emergencias críticas:</span>
                    <span className="text-sm font-medium text-red-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Calificación promedio:</span>
                    <span className="text-sm font-medium flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      4.8/5.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Turnos completados:</span>
                    <span className="text-sm font-medium">22/22</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Información de Turno Actual</h4>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p><strong>Horario de turno:</strong></p>
                    <p className="text-red-600">12:00 - 20:00 hrs</p>
                  </div>
                  <div>
                    <p><strong>Estado actual:</strong></p>
                    <p className="text-green-600">En servicio activo</p>
                  </div>
                  <div>
                    <p><strong>Unidad asignada:</strong></p>
                    <p className="text-blue-600">AMB-05 (SVA)</p>
                  </div>
                  <div>
                    <p><strong>Compañero de turno:</strong></p>
                    <p>TEM. Carlos Hernández</p>
                  </div>
                  <div>
                    <p><strong>Sector de cobertura:</strong></p>
                    <p>Zona 11, 14, 15</p>
                  </div>
                  <div>
                    <p><strong>Base operativa:</strong></p>
                    <p>Estación Central MediGo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Reconocimientos y Logros</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm">
                    <p className="font-medium">Paramédico del Año 2023</p>
                    <p className="text-gray-600">Por excelencia en atención de emergencias</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                  <Heart className="h-4 w-4 text-blue-500" />
                  <div className="text-sm">
                    <p className="font-medium">Certificación de Instructor BLS</p>
                    <p className="text-gray-600">Autorizada para entrenar personal nuevo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="text-sm">
                    <p className="font-medium">5 años sin incidentes</p>
                    <p className="text-gray-600">Récord de seguridad impecable</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Información de Contacto de Emergencia</h4>
              <div className="text-sm text-black space-y-1 p-2 bg-gray-50 rounded-lg">
                <p><strong>Contacto primario:</strong> Ana Morales (Esposa)</p>
                <p><strong>Teléfono:</strong> (502) 5678-9012</p>
                <p><strong>Contacto secundario:</strong> Dr. Manuel Rivera (Padre)</p>
                <p><strong>Teléfono:</strong> (502) 3456-7890</p>
                <p><strong>Alergias conocidas:</strong> Penicilina</p>
                <p><strong>Tipo de sangre:</strong> O+ (Donante universal)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderDashboardBase>
  )
}

export default EmergencyStaffDashboard 