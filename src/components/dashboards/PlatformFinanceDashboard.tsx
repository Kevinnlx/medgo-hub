'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Calendar,
  FileText,
  Download,
  Filter,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Percent,
  Calculator,
  PieChart,
  BarChart3,
  TrendingDown
} from 'lucide-react'

interface FinancialMetricProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
  percentage?: number
}

const FinancialMetric: React.FC<FinancialMetricProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  description,
  percentage 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive': return <ArrowUpRight className="h-3 w-3" />
      case 'negative': return <ArrowDownRight className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-teal-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`flex items-center ${getChangeColor()} text-xs mt-1`}>
            {getChangeIcon()}
            <span className="ml-1">{change}</span>
          </div>
        )}
        {percentage !== undefined && (
          <Progress value={percentage} className="h-2 mt-2" />
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface Transaction {
  id: string
  type: 'commission' | 'payment' | 'refund' | 'fee'
  providerId: string
  providerName: string
  amount: number
  status: 'pending' | 'processed' | 'failed' | 'cancelled'
  date: string
  description: string
}

interface CommissionRule {
  id: string
  providerType: string
  serviceName: string
  commissionRate: number
  minimumAmount: number
  isActive: boolean
}

const PlatformFinanceDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Datos financieros simulados
  const financialData = {
    totalRevenue: 425780,
    monthlyCommissions: 63867,
    pendingPayments: 18450,
    processedPayments: 234560,
    totalProviders: 127,
    activeProviders: 94,
    transactionVolume: 1245680,
    refundAmount: 4320,
    averageCommissionRate: 15.2,
    paymentSuccessRate: 98.7
  }

  // Transacciones recientes
  const recentTransactions: Transaction[] = [
    {
      id: 'T001',
      type: 'commission',
      providerId: 'P001',
      providerName: 'Centro Médico San Rafael',
      amount: 1250.00,
      status: 'processed',
      date: '2024-01-15T10:30:00Z',
      description: 'Comisión por servicios de enero'
    },
    {
      id: 'T002',
      type: 'payment',
      providerId: 'P002',
      providerName: 'Farmacia La Salud',
      amount: 3450.75,
      status: 'pending',
      date: '2024-01-15T09:15:00Z',
      description: 'Pago semanal de servicios'
    },
    {
      id: 'T003',
      type: 'refund',
      providerId: 'P003',
      providerName: 'Laboratorio Central',
      amount: 185.50,
      status: 'processed',
      date: '2024-01-14T16:45:00Z',
      description: 'Reembolso por cancelación'
    },
    {
      id: 'T004',
      type: 'commission',
      providerId: 'P004',
      providerName: 'Emergencias Plus',
      amount: 890.25,
      status: 'failed',
      date: '2024-01-14T14:20:00Z',
      description: 'Comisión por servicios de emergencia'
    },
    {
      id: 'T005',
      type: 'payment',
      providerId: 'P005',
      providerName: 'Atención Domiciliaria 24h',
      amount: 2100.00,
      status: 'processed',
      date: '2024-01-14T11:30:00Z',
      description: 'Pago quincenal de servicios'
    }
  ]

  // Reglas de comisión
  const commissionRules: CommissionRule[] = [
    {
      id: 'CR001',
      providerType: 'MEDICAL_CENTER',
      serviceName: 'Consulta General',
      commissionRate: 15.0,
      minimumAmount: 50.00,
      isActive: true
    },
    {
      id: 'CR002',
      providerType: 'PHARMACY',
      serviceName: 'Entrega de Medicamentos',
      commissionRate: 12.5,
      minimumAmount: 20.00,
      isActive: true
    },
    {
      id: 'CR003',
      providerType: 'LABORATORY',
      serviceName: 'Exámenes de Laboratorio',
      commissionRate: 18.0,
      minimumAmount: 100.00,
      isActive: true
    },
    {
      id: 'CR004',
      providerType: 'EMERGENCY',
      serviceName: 'Servicios de Emergencia',
      commissionRate: 20.0,
      minimumAmount: 200.00,
      isActive: true
    },
    {
      id: 'CR005',
      providerType: 'HOMECARE',
      serviceName: 'Atención Domiciliaria',
      commissionRate: 16.5,
      minimumAmount: 80.00,
      isActive: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'commission': return <Percent className="h-4 w-4" />
      case 'payment': return <CreditCard className="h-4 w-4" />
      case 'refund': return <ArrowDownRight className="h-4 w-4" />
      case 'fee': return <DollarSign className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Financiero</h1>
          <p className="text-gray-600 mt-1">Gestión de comisiones, pagos y reportes financieros</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <Calculator className="h-4 w-4 mr-2" />
            Procesar Pagos
          </Button>
        </div>
      </div>

      {/* Métricas financieras principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FinancialMetric
          title="Ingresos Totales"
          value={formatCurrency(financialData.totalRevenue)}
          change="+22.1% vs mes anterior"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
          description="Ingresos acumulados de la plataforma"
        />
        <FinancialMetric
          title="Comisiones Mensuales"
          value={formatCurrency(financialData.monthlyCommissions)}
          change="+15.8% vs mes anterior"
          changeType="positive"
          icon={<Percent className="h-5 w-5" />}
          description={`Tasa promedio: ${financialData.averageCommissionRate}%`}
        />
        <FinancialMetric
          title="Pagos Pendientes"
          value={formatCurrency(financialData.pendingPayments)}
          change="18 proveedores"
          changeType="neutral"
          icon={<Clock className="h-5 w-5" />}
          description="Requieren procesamiento"
        />
        <FinancialMetric
          title="Tasa de Éxito"
          value={`${financialData.paymentSuccessRate}%`}
          change="+0.3% vs mes anterior"
          changeType="positive"
          icon={<CheckCircle className="h-5 w-5" />}
          description="Pagos procesados exitosamente"
          percentage={financialData.paymentSuccessRate}
        />
      </div>

      {/* Contenido principal con tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="commissions">Comisiones</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        {/* Tab: Resumen */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Distribución de Ingresos */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-teal-600" />
                  Distribución de Ingresos por Tipo de Proveedor
                </CardTitle>
                <CardDescription>
                  Ingresos generados por cada categoría de servicios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'Centro Médico', amount: 156780, percentage: 37, color: 'bg-blue-500' },
                  { type: 'Farmacia', amount: 98450, percentage: 23, color: 'bg-green-500' },
                  { type: 'Laboratorio', amount: 89320, percentage: 21, color: 'bg-purple-500' },
                  { type: 'Emergencia', amount: 45230, percentage: 11, color: 'bg-red-500' },
                  { type: 'Atención Domiciliaria', amount: 36000, percentage: 8, color: 'bg-yellow-500' }
                ].map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-gray-600">{formatCurrency(item.amount)} ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Métricas adicionales */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Estado de Pagos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Procesados</span>
                    </div>
                    <Badge variant="secondary">{formatCurrency(financialData.processedPayments)}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Pendientes</span>
                    </div>
                    <Badge variant="secondary">{formatCurrency(financialData.pendingPayments)}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Reembolsos</span>
                    </div>
                    <Badge variant="secondary">{formatCurrency(financialData.refundAmount)}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Procesar Lote de Pagos
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Comisiones
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generar Reporte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Comisiones */}
        <TabsContent value="commissions" className="space-y-6">
          
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Comisiones</CardTitle>
              <CardDescription>
                Configurar y monitorear las reglas de comisión por tipo de proveedor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Buscar proveedor</Label>
                  <Input
                    id="search"
                    placeholder="Nombre del proveedor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period">Período</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Tabla de reglas de comisión */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Reglas de Comisión Activas</h4>
                <div className="space-y-3">
                  {commissionRules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{rule.providerType}</Badge>
                          <span className="font-medium">{rule.serviceName}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Mínimo: {formatCurrency(rule.minimumAmount)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-teal-600">{rule.commissionRate}%</div>
                          <div className="text-sm text-gray-500">Comisión</div>
                        </div>
                        <Badge 
                          variant={rule.isActive ? 'default' : 'secondary'}
                          className={rule.isActive ? 'bg-green-100 text-green-800' : ''}
                        >
                          {rule.isActive ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Pagos */}
        <TabsContent value="payments" className="space-y-6">
          
          {/* Filtros de transacciones */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Pagos</CardTitle>
              <CardDescription>
                Procesar y monitorear transferencias a proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search-transactions">Buscar transacción</Label>
                  <Input
                    id="search-transactions"
                    placeholder="ID, proveedor, descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status-filter">Estado</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="processed">Procesado</SelectItem>
                      <SelectItem value="failed">Fallido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Lista de transacciones */}
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-gray-100">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{transaction.providerName}</span>
                          <Badge variant="outline" className="text-xs">
                            {transaction.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(transaction.amount)}</div>
                        <div className="text-sm text-gray-500 capitalize">{transaction.type}</div>
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Reportes */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Reportes disponibles */}
            <Card>
              <CardHeader>
                <CardTitle>Reportes Financieros</CardTitle>
                <CardDescription>
                  Generar reportes detallados para análisis financiero
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: 'Reporte de Comisiones',
                    description: 'Detalle de comisiones por proveedor y período',
                    frequency: 'Mensual',
                    lastGenerated: '15 Ene 2024'
                  },
                  {
                    title: 'Estado de Pagos',
                    description: 'Resumen de pagos procesados y pendientes',
                    frequency: 'Semanal',
                    lastGenerated: '14 Ene 2024'
                  },
                  {
                    title: 'Análisis de Ingresos',
                    description: 'Análisis de tendencias de ingresos',
                    frequency: 'Quincenal',
                    lastGenerated: '10 Ene 2024'
                  },
                  {
                    title: 'Reconciliación Bancaria',
                    description: 'Conciliación con extractos bancarios',
                    frequency: 'Diario',
                    lastGenerated: 'Hoy'
                  }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Frecuencia: {report.frequency}</span>
                        <span>Último: {report.lastGenerated}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Métricas de rendimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
                <CardDescription>
                  Indicadores clave de rendimiento financiero
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {financialData.averageCommissionRate}%
                    </div>
                    <div className="text-sm text-gray-600">Comisión Promedio</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3</div>
                    <div className="text-sm text-gray-600">Días Promedio de Pago</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">94</div>
                    <div className="text-sm text-gray-600">Proveedores Activos</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(financialData.transactionVolume / financialData.totalProviders)}
                    </div>
                    <div className="text-sm text-gray-600">Volumen Promedio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PlatformFinanceDashboard 