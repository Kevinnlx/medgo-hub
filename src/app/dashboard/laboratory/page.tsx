'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TestTube, 
  ClipboardList, 
  User, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  FileText,
  Settings,
  PlusCircle,
  Search,
  Filter,
  CheckCircle,
  XCircle
} from 'lucide-react'

// Import laboratory-specific types
import type { 
  LaboratoryStats, 
  LaboratoryActivity, 
  LaboratoryOrder, 
  LaboratoryTest,
  LaboratoryTechnician 
} from '@/types/providers/laboratory.types'

const LaboratoryDashboard = () => {
  const [stats, setStats] = useState<LaboratoryStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<LaboratoryOrder[]>([])
  const [technicians, setTechnicians] = useState<LaboratoryTechnician[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load laboratory-specific data
    loadLaboratoryData()
  }, [])

  const loadLaboratoryData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockStats: LaboratoryStats = {
        totalOrders: 850,
        pendingOrders: 45,
        completedOrders: 720,
        totalRevenue: 185000,
        criticalResults: 8,
        avgTurnaroundTime: 4.2,
        topTests: [
          { name: 'Hemograma Completo', count: 120, revenue: 15000 },
          { name: 'Perfil Lipídico', count: 95, revenue: 12500 },
          { name: 'Glucosa en Ayunas', count: 85, revenue: 8500 }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'order_received',
            description: 'Nueva orden de laboratorio de María López',
            timestamp: new Date(),
            orderId: 'LAB-001'
          },
          {
            id: '2',
            type: 'critical_result',
            description: 'Resultado crítico detectado en orden LAB-045',
            timestamp: new Date(Date.now() - 1800000),
            orderId: 'LAB-045'
          }
        ]
      }

      const mockOrders: LaboratoryOrder[] = [
        {
          id: 'LAB-001',
          clientId: 'CLI-001',
          clientName: 'María López',
          clientPhone: '+505 8888-5678',
          clientDateOfBirth: new Date('1985-03-15'),
          clientGender: 'female',
          laboratoryId: 'LAB-001',
          tests: [
            { testId: 'TEST-001', testName: 'Hemograma Completo', sampleType: 'blood', price: 150, status: 'pending' },
            { testId: 'TEST-002', testName: 'Perfil Lipídico', sampleType: 'blood', price: 120, status: 'pending' }
          ],
          doctorName: 'Dr. Carlos Mendoza',
          collectionType: 'facility',
          scheduledDate: new Date(),
          scheduledTime: '08:00',
          status: 'scheduled',
          totalCost: 270,
          paymentStatus: 'completed',
          priority: 'routine',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      const mockTechnicians: LaboratoryTechnician[] = [
        {
          id: 'TECH-001',
          name: 'Ana Herrera',
          email: 'ana@lab.com',
          phone: '+505 8888-1111',
          specializations: ['Hematología', 'Química Clínica'],
          experience: 5,
          rating: 4.8,
          isAvailable: true,
          workingHours: { start: '07:00', end: '15:00' },
          assignedOrders: [],
          certifications: ['Técnico en Laboratorio Clínico'],
          completedTests: 1250,
          laboratoryId: 'LAB-001',
          createdAt: new Date()
        }
      ]

      setStats(mockStats)
      setRecentOrders(mockOrders)
      setTechnicians(mockTechnicians)
      setLoading(false)
    } catch (error) {
      console.error('Error loading laboratory data:', error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-gray-100 text-gray-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'collected': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'results_ready': return 'bg-green-100 text-green-800'
      case 'results_validated': return 'bg-emerald-100 text-emerald-800'
      case 'completed': return 'bg-emerald-100 text-emerald-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'routine': return 'bg-green-100 text-green-800'
      case 'urgent': return 'bg-yellow-100 text-yellow-800'
      case 'stat': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Laboratorio</h1>
          <p className="text-gray-600">Gestión completa de análisis clínicos</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nueva Orden
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Totales</CardTitle>
            <ClipboardList className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +15% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              En proceso de análisis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C${stats?.totalRevenue?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +10% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resultados Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.criticalResults}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención inmediata
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Órdenes Recientes</TabsTrigger>
          <TabsTrigger value="tests">Catálogo de Pruebas</TabsTrigger>
          <TabsTrigger value="technicians">Técnicos</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Órdenes de Laboratorio</CardTitle>
              <CardDescription>
                Gestiona las órdenes de análisis clínicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{order.clientName}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.clientPhone}</p>
                      <p className="text-sm text-gray-500">
                        {order.tests.length} pruebas • Total: C${order.totalCost}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {order.tests.map((test, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {test.testName}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Ver Detalles</Button>
                      <Button size="sm">Procesar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Pruebas</CardTitle>
              <CardDescription>
                Administra las pruebas de laboratorio disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar pruebas..."
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Agregar Prueba
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-gray-600 p-3 border-b">
                  <div>Prueba</div>
                  <div>Categoría</div>
                  <div>Muestra</div>
                  <div>Precio</div>
                  <div>Tiempo</div>
                  <div>Estado</div>
                </div>
                
                {/* Mock test items */}
                {[
                  { name: 'Hemograma Completo', category: 'Hematología', sample: 'Sangre', price: 150, time: '2-4 horas', status: 'Activa' },
                  { name: 'Perfil Lipídico', category: 'Química Clínica', sample: 'Sangre', price: 120, time: '4-6 horas', status: 'Activa' },
                  { name: 'Examen General de Orina', category: 'Uroanálisis', sample: 'Orina', price: 80, time: '1-2 horas', status: 'Activa' }
                ].map((test, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 p-3 border-b items-center">
                    <div className="font-medium">{test.name}</div>
                    <div>{test.category}</div>
                    <div>{test.sample}</div>
                    <div>C${test.price}</div>
                    <div>{test.time}</div>
                    <div>
                      <Badge className="bg-green-100 text-green-800">
                        {test.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Técnicos</CardTitle>
              <CardDescription>
                Administra el personal técnico del laboratorio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicians.map((technician) => (
                  <div key={technician.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{technician.name}</h3>
                        <p className="text-sm text-gray-600">
                          {technician.specializations.join(', ')} • {technician.experience} años
                        </p>
                        <p className="text-sm text-gray-500">
                          {technician.completedTests} pruebas completadas • ⭐ {technician.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        technician.isAvailable ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {technician.isAvailable ? 'Disponible' : 'Ocupado'}
                      </Badge>
                      <Button size="sm" variant="outline">Asignar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Laboratorio</CardTitle>
              <CardDescription>
                Analiza el desempeño y tendencias del laboratorio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Pruebas Más Solicitadas</h3>
                  {stats?.topTests.map((test, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-gray-600">{test.count} pruebas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">C${test.revenue}</p>
                        <p className="text-sm text-gray-600">ingresos</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Actividad Reciente</h3>
                  {stats?.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      {activity.type === 'critical_result' ? (
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      ) : (
                        <TestTube className="h-5 w-5 text-green-600 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Tiempo Promedio de Entrega</h3>
                </div>
                <p className="text-2xl font-bold text-blue-900">{stats?.avgTurnaroundTime} horas</p>
                <p className="text-sm text-blue-700">Meta: 6 horas o menos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LaboratoryDashboard 