'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  FileText,
  Settings,
  PlusCircle,
  Search,
  Filter
} from 'lucide-react'

// Import pharmacy-specific types
import type { 
  PharmacyStats, 
  PharmacyActivity, 
  PharmacyOrder, 
  PharmacyMedication 
} from '@/types/providers/pharmacy.types'

const PharmacyDashboard = () => {
  const [stats, setStats] = useState<PharmacyStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<PharmacyOrder[]>([])
  const [lowStockMedications, setLowStockMedications] = useState<PharmacyMedication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load pharmacy-specific data
    loadPharmacyData()
  }, [])

  const loadPharmacyData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockStats: PharmacyStats = {
        totalOrders: 1250,
        pendingOrders: 25,
        completedOrders: 1180,
        totalRevenue: 125000,
        lowStockItems: 15,
        topSellingMedications: [
          { name: 'Ibuprofeno 400mg', quantity: 150, revenue: 3500 },
          { name: 'Paracetamol 500mg', quantity: 120, revenue: 2800 },
          { name: 'Amoxicilina 500mg', quantity: 95, revenue: 4200 }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'order_received',
            description: 'Nueva orden recibida de Juan Pérez',
            timestamp: new Date(),
            orderId: 'ORD-001'
          },
          {
            id: '2',
            type: 'prescription_verified',
            description: 'Receta verificada para orden ORD-002',
            timestamp: new Date(Date.now() - 3600000),
            orderId: 'ORD-002'
          }
        ]
      }

      const mockOrders: PharmacyOrder[] = [
        {
          id: 'ORD-001',
          clientId: 'CLI-001',
          clientName: 'Juan Pérez',
          clientPhone: '+505 8888-1234',
          pharmacyId: 'PHARM-001',
          items: [],
          subtotal: 150,
          deliveryFee: 25,
          total: 175,
          status: 'verified',
          paymentStatus: 'pending',
          deliveryAddress: {
            street: 'Calle Principal 123',
            city: 'Managua',
            state: 'Managua',
            postalCode: '12345',
            country: 'Nicaragua'
          },
          estimatedDelivery: new Date(Date.now() + 86400000),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      setStats(mockStats)
      setRecentOrders(mockOrders)
      setLoading(false)
    } catch (error) {
      console.error('Error loading pharmacy data:', error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'verified': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'dispatched': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-emerald-100 text-emerald-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Farmacia</h1>
          <p className="text-gray-600">Gestión completa de tu farmacia</p>
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
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
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
              +8% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Medicamentos por reabastecer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Órdenes Recientes</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="couriers">Repartidores</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Órdenes Recientes</CardTitle>
              <CardDescription>
                Gestiona las órdenes de medicamentos de tu farmacia
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
                      </div>
                      <p className="text-sm text-gray-600">{order.clientPhone}</p>
                      <p className="text-sm text-gray-500">
                        Total: C${order.total} • {order.deliveryAddress.city}
                      </p>
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

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Inventario</CardTitle>
              <CardDescription>
                Controla el stock de medicamentos y productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Buscar medicamentos..."
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Agregar Medicamento
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-5 gap-4 font-semibold text-sm text-gray-600 p-3 border-b">
                  <div>Medicamento</div>
                  <div>Stock Actual</div>
                  <div>Stock Mínimo</div>
                  <div>Precio</div>
                  <div>Estado</div>
                </div>
                
                {/* Mock inventory items */}
                {[
                  { name: 'Ibuprofeno 400mg', stock: 25, minStock: 50, price: 15, status: 'Bajo Stock' },
                  { name: 'Paracetamol 500mg', stock: 150, minStock: 100, price: 12, status: 'Normal' },
                  { name: 'Amoxicilina 500mg', stock: 8, minStock: 30, price: 35, status: 'Crítico' }
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-3 border-b items-center">
                    <div className="font-medium">{item.name}</div>
                    <div>{item.stock}</div>
                    <div>{item.minStock}</div>
                    <div>C${item.price}</div>
                    <div>
                      <Badge className={
                        item.status === 'Crítico' ? 'bg-red-100 text-red-800' :
                        item.status === 'Bajo Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="couriers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Repartidores</CardTitle>
              <CardDescription>
                Administra tu equipo de entrega de medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Carlos Mendoza', status: 'Disponible', deliveries: 5, rating: 4.8 },
                  { name: 'María García', status: 'En Entrega', deliveries: 3, rating: 4.9 },
                  { name: 'Luis Rodríguez', status: 'Disponible', deliveries: 7, rating: 4.7 }
                ].map((courier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{courier.name}</h3>
                        <p className="text-sm text-gray-600">
                          {courier.deliveries} entregas hoy • ⭐ {courier.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={
                        courier.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }>
                        {courier.status}
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
              <CardTitle>Reportes de Farmacia</CardTitle>
              <CardDescription>
                Analiza el desempeño y tendencias de tu farmacia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Medicamentos Más Vendidos</h3>
                  {stats?.topSellingMedications.map((med, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.quantity} unidades</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">C${med.revenue}</p>
                        <p className="text-sm text-gray-600">ingresos</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Actividad Reciente</h3>
                  {stats?.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PharmacyDashboard 