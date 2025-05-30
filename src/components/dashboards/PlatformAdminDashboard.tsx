'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  UserCheck,
  PlusCircle,
  Settings,
  FileText,
  Bell,
  BarChart3,
  Calendar,
  MessageSquare,
  CreditCard,
  Shield,
  Globe
} from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  description 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-primary-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-black">{title}</CardTitle>
        <div className="text-primary-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-black">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()} mt-1`}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface ProviderStatusData {
  status: 'VERIFIED' | 'PENDING' | 'IN_REVIEW' | 'REJECTED'
  count: number
  percentage: number
  color: string
}

interface RecentActivityItem {
  id: string
  type: 'provider_registered' | 'provider_verified' | 'payment_processed' | 'user_created' | 'alert'
  title: string
  description: string
  timestamp: string
  icon: React.ReactNode
  severity?: 'info' | 'success' | 'warning' | 'error'
}

const PlatformAdminDashboard: React.FC = () => {
  // Datos simulados para métricas
  const platformMetrics = {
    totalUsers: 15420,
    totalProviders: 127,
    monthlyTransactions: 89650,
    totalRevenue: 145780,
    activeUsers: 12340,
    verifiedProviders: 94,
    pendingVerifications: 18,
    systemUptime: 99.8
  }

  // Datos de estado de proveedores
  const providerStatusData: ProviderStatusData[] = [
    { status: 'VERIFIED', count: 94, percentage: 74, color: 'bg-primary-500' },
    { status: 'PENDING', count: 18, percentage: 14, color: 'bg-primary-300' },
    { status: 'IN_REVIEW', count: 11, percentage: 9, color: 'bg-accent-400' },
    { status: 'REJECTED', count: 4, percentage: 3, color: 'bg-accent-200' }
  ]

  // Actividad reciente
  const recentActivity: RecentActivityItem[] = [
    {
      id: '1',
      type: 'provider_verified',
      title: 'Nuevo proveedor verificado',
      description: 'Centro Médico San Rafael ha sido verificado',
      timestamp: 'hace 15 min',
      icon: <CheckCircle className="h-4 w-4" />,
      severity: 'success'
    },
    {
      id: '2',
      type: 'provider_registered',
      title: 'Nuevo registro de proveedor',
      description: 'Farmacia La Salud solicita verificación',
      timestamp: 'hace 1 hora',
      icon: <Building2 className="h-4 w-4" />,
      severity: 'info'
    },
    {
      id: '3',
      type: 'payment_processed',
      title: 'Pago procesado',
      description: '$15,430 transferido a 12 proveedores',
      timestamp: 'hace 2 horas',
      icon: <CreditCard className="h-4 w-4" />,
      severity: 'success'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Sistema de alertas',
      description: 'Umbral de verificaciones pendientes alcanzado',
      timestamp: 'hace 3 horas',
      icon: <AlertTriangle className="h-4 w-4" />,
      severity: 'warning'
    },
    {
      id: '5',
      type: 'user_created',
      title: 'Personal agregado',
      description: 'Nuevo staff de soporte creado para Hospital Central',
      timestamp: 'hace 4 horas',
      icon: <UserCheck className="h-4 w-4" />,
      severity: 'info'
    }
  ]

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'success': return 'text-primary-600 bg-primary-50'
      case 'warning': return 'text-accent-600 bg-accent-50'
      case 'error': return 'text-red-600 bg-red-50'
      default: return 'text-primary-600 bg-primary-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Vista general de la plataforma MediGo</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-primary-200 text-black hover:bg-primary-50">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
          <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
            <PlusCircle className="h-4 w-4 mr-2" />
            Acciones Rápidas
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Usuarios"
          value={platformMetrics.totalUsers.toLocaleString()}
          change="+12.5% vs mes anterior"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
          description="Usuarios activos en la plataforma"
        />
        <MetricCard
          title="Proveedores"
          value={platformMetrics.totalProviders}
          change="+8 nuevos este mes"
          changeType="positive"
          icon={<Building2 className="h-5 w-5" />}
          description={`${platformMetrics.verifiedProviders} verificados`}
        />
        <MetricCard
          title="Transacciones Mensuales"
          value={`$${(platformMetrics.monthlyTransactions / 1000).toFixed(0)}K`}
          change="+18.2% vs mes anterior"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
          description="Volumen de transacciones"
        />
        <MetricCard
          title="Ingresos Totales"
          value={`$${(platformMetrics.totalRevenue / 1000).toFixed(0)}K`}
          change="+22.1% vs mes anterior"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Comisiones e ingresos"
        />
      </div>

      {/* Contenido principal con tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-primary-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-black">Vista General</TabsTrigger>
          <TabsTrigger value="providers" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-black">Proveedores</TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-black">Financiero</TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-primary-600 data-[state=active]:text-white text-black">Sistema</TabsTrigger>
        </TabsList>

        {/* Tab: Vista General */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Estado de Proveedores */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                  Estado de Proveedores
                </CardTitle>
                <CardDescription>
                  Distribución de proveedores por estado de verificación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {providerStatusData.map((item) => (
                  <div key={item.status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-black">{item.status}</span>
                      <span className="text-gray-600">{item.count} ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2 bg-primary-100 [&>div]:bg-primary-600" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Métricas Adicionales */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-black">Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-primary-600" />
                      <span className="text-sm text-black">Uptime</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary-100 text-primary-800">{platformMetrics.systemUptime}%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-accent-600" />
                      <span className="text-sm text-black">Regiones</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary-100 text-primary-800">12 activas</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary-600" />
                      <span className="text-sm text-black">Seguridad</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary-100 text-primary-800">
                      Óptima
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-black">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Verificar Proveedores
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Procesar Pagos
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Configuración
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Proveedores */}
        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Alertas de Verificación */}
            <Card>
              <CardHeader>
                <CardTitle className="text-accent-600 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Verificaciones Pendientes
                </CardTitle>
                <CardDescription>
                  Proveedores esperando verificación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent-600 mb-2">
                  {platformMetrics.pendingVerifications}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Requieren atención inmediata
                </p>
                <Button size="sm" className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                  Ver Lista de Verificación
                </Button>
              </CardContent>
            </Card>

            {/* Tipos de Proveedor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Distribución por Tipo</CardTitle>
                <CardDescription>
                  Proveedores por especialidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: 'Centro Médico', count: 24, color: 'bg-primary-400' },
                  { type: 'Farmacia', count: 31, color: 'bg-primary-500' },
                  { type: 'Laboratorio', count: 18, color: 'bg-primary-600' },
                  { type: 'Emergencia', count: 12, color: 'bg-accent-400' },
                  { type: 'Atención Domiciliaria', count: 15, color: 'bg-accent-500' },
                  { type: 'Especialista', count: 27, color: 'bg-accent-600' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-black">{item.type}</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary-100 text-primary-800">{item.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Financiero */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Comisiones Mensuales"
              value={`$${(platformMetrics.totalRevenue * 0.15 / 1000).toFixed(0)}K`}
              change="+15.8% vs mes anterior"
              changeType="positive"
              icon={<DollarSign className="h-5 w-5" />}
              description="15% de comisión promedio"
            />
            <MetricCard
              title="Pagos Procesados"
              value="234"
              change="Este mes"
              changeType="neutral"
              icon={<CreditCard className="h-5 w-5" />}
              description="Transferencias a proveedores"
            />
            <MetricCard
              title="Reembolsos"
              value="12"
              change="-5 vs mes anterior"
              changeType="positive"
              icon={<XCircle className="h-5 w-5" />}
              description="Solicitudes procesadas"
            />
          </div>
        </TabsContent>

        {/* Tab: Sistema */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Estado del Sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Estado del Sistema</CardTitle>
                <CardDescription>Monitoreo en tiempo real</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { service: 'API Principal', status: 'Operacional', color: 'bg-primary-500' },
                  { service: 'Base de Datos', status: 'Operacional', color: 'bg-primary-500' },
                  { service: 'Pagos', status: 'Operacional', color: 'bg-primary-500' },
                  { service: 'Notificaciones', status: 'Degradado', color: 'bg-accent-400' },
                  { service: 'Almacenamiento', status: 'Operacional', color: 'bg-primary-500' }
                ].map((service) => (
                  <div key={service.service} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">{service.service}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${service.color}`} />
                      <span className="text-sm text-gray-600">{service.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Configuración Global */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Configuración Global</CardTitle>
                <CardDescription>Ajustes de la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                  <Settings className="h-4 w-4 mr-2" />
                  Políticas de Comisión
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificaciones Maestras
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                  <Shield className="h-4 w-4 mr-2" />
                  Configuración de Seguridad
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-primary-200 text-black hover:bg-primary-50">
                  <Globe className="h-4 w-4 mr-2" />
                  Regiones y Mercados
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-black">
            <Activity className="h-5 w-5 mr-2 text-primary-600" />
            Actividad Reciente
          </CardTitle>
          <CardDescription>
            Últimas acciones en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.timestamp}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PlatformAdminDashboard 