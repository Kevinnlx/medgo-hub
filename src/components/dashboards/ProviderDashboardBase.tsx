'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  FileText,
  Bell,
  RefreshCw,
  Plus
} from 'lucide-react'

interface ProviderMetricProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
  color?: string
}

const ProviderMetric: React.FC<ProviderMetricProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  description,
  color = 'text-teal-600'
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-black'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-black">{title}</CardTitle>
        <div className={color}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-black">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()} mt-1`}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-black mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface ProviderDashboardBaseProps {
  providerType: string
  providerName: string
  metrics: {
    totalServices: number
    activeServices: number
    totalRevenue: number
    monthlyRevenue: number
    rating: number
    totalClients: number
    todayServices: number
    completionRate: number
  }
  children?: React.ReactNode
  customTabs?: {
    id: string
    label: string
    content: React.ReactNode
  }[]
  quickActions?: {
    title: string
    description: string
    icon: React.ReactNode
    color: string
    onClick: () => void
  }[]
  recentActivity?: {
    id: string
    title: string
    description: string
    timestamp: string
    type: 'service' | 'payment' | 'review' | 'alert'
    icon: React.ReactNode
  }[]
}

const ProviderDashboardBase: React.FC<ProviderDashboardBaseProps> = ({
  providerType,
  providerName,
  metrics,
  children,
  customTabs = [],
  quickActions = [],
  recentActivity = []
}) => {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'service': return 'text-blue-600 bg-blue-50'
      case 'payment': return 'text-green-600 bg-green-50'
      case 'review': return 'text-purple-600 bg-purple-50'
      case 'alert': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">{providerName}</h1>
          <p className="text-black mt-1">Dashboard de {providerType}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Reportes
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Servicio
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProviderMetric
          title="Servicios Totales"
          value={metrics.totalServices}
          change={`${metrics.activeServices} activos`}
          changeType="neutral"
          icon={<Activity className="h-5 w-5" />}
          description="Servicios ofrecidos"
        />
        <ProviderMetric
          title="Ingresos Mensuales"
          value={formatCurrency(metrics.monthlyRevenue)}
          change="+18.2% vs mes anterior"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
          description="Facturación del mes"
        />
        <ProviderMetric
          title="Rating Promedio"
          value={`${metrics.rating}/5`}
          change="+0.2 vs mes anterior"
          changeType="positive"
          icon={<Star className="h-5 w-5" />}
          description="Calificación de clientes"
        />
        <ProviderMetric
          title="Servicios Hoy"
          value={metrics.todayServices}
          change={`${metrics.completionRate}% completados`}
          changeType="positive"
          icon={<Calendar className="h-5 w-5" />}
          description="Agenda del día"
        />
      </div>

      {/* Contenido principal con tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className={`grid w-full ${customTabs.length > 0 ? `grid-cols-${Math.min(customTabs.length + 1, 6)}` : 'grid-cols-1'}`}>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          {customTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab: Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Métricas de rendimiento */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <TrendingUp className="h-5 w-5 mr-2 text-teal-600" />
                  Rendimiento del Mes
                </CardTitle>
                <CardDescription className="text-black">
                  Indicadores clave de rendimiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-black">Tasa de Completación</span>
                      <span className="font-medium text-black">{metrics.completionRate}%</span>
                    </div>
                    <Progress value={metrics.completionRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-black">Satisfacción del Cliente</span>
                      <span className="font-medium text-black">{((metrics.rating / 5) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(metrics.rating / 5) * 100} className="h-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{metrics.totalClients}</div>
                    <div className="text-sm text-blue-800">Clientes Totales</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(metrics.totalRevenue)}
                    </div>
                    <div className="text-sm text-green-800">Ingresos Totales</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{metrics.rating}</div>
                    <div className="text-sm text-purple-800">Rating Promedio</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-black">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={action.onClick}
                    >
                      <div className={action.color}>
                        {action.icon}
                      </div>
                      <div className="ml-2 text-left">
                        <div className="font-medium text-black">{action.title}</div>
                        <div className="text-xs text-black">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-black">Estado del Proveedor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-black">Estado</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verificado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-black">Personal</span>
                    </div>
                    <Badge variant="secondary">5 miembros</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-black">Configuración</span>
                    </div>
                    <Badge variant="outline">Completa</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Custom tabs */}
        {customTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* Actividad reciente */}
      {recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-black">
              <Activity className="h-5 w-5 mr-2 text-teal-600" />
              Actividad Reciente
            </CardTitle>
            <CardDescription className="text-black">
              Últimas acciones y eventos del proveedor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black">{activity.title}</p>
                    <p className="text-sm text-black">{activity.description}</p>
                  </div>
                  <div className="text-xs text-black">{formatDate(activity.timestamp)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contenido personalizado */}
      {children}
    </div>
  )
}

export default ProviderDashboardBase 