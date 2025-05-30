'use client'

import React from 'react'
import ProviderDashboardBase from './ProviderDashboardBase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Pill,
  Package,
  ShoppingCart,
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Plus,
  Search,
  Star,
  Phone,
  MapPin,
  Calendar,
  Activity,
  DollarSign,
  Users,
  Building
} from 'lucide-react'

const PharmacyDashboard: React.FC = () => {
  // Datos simulados específicos de farmacia
  const pharmacyMetrics = {
    totalServices: 8,
    activeServices: 6,
    totalRevenue: 156780,
    monthlyRevenue: 34520,
    rating: 4.7,
    totalClients: 2134,
    todayServices: 47,
    completionRate: 96
  }

  // Acciones rápidas específicas para farmacia
  const quickActions = [
    {
      title: 'Nueva Receta',
      description: 'Procesar receta médica',
      icon: <FileText className="h-4 w-4" />,
      color: 'text-blue-600',
      onClick: () => console.log('Nueva receta')
    },
    {
      title: 'Gestionar Inventario',
      description: 'Control de medicamentos',
      icon: <Package className="h-4 w-4" />,
      color: 'text-green-600',
      onClick: () => console.log('Gestionar inventario')
    },
    {
      title: 'Delivery Express',
      description: 'Envío a domicilio',
      icon: <Truck className="h-4 w-4" />,
      color: 'text-purple-600',
      onClick: () => console.log('Delivery')
    },
    {
      title: 'Productos OTC',
      description: 'Venta libre',
      icon: <ShoppingCart className="h-4 w-4" />,
      color: 'text-orange-600',
      onClick: () => console.log('Productos OTC')
    }
  ]

  // Actividad reciente específica
  const recentActivity = [
    {
      id: '1',
      title: 'Receta procesada',
      description: 'Antibiótico prescrito por Dr. García entregado',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'service' as const,
      icon: <Pill className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'Delivery completado',
      description: 'Medicamentos entregados a María López',
      timestamp: '2024-01-15T13:45:00Z',
      type: 'service' as const,
      icon: <Truck className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Pago procesado',
      description: 'Venta de vitaminas - $28.50',
      timestamp: '2024-01-15T12:20:00Z',
      type: 'payment' as const,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'Stock bajo',
      description: 'Paracetamol 500mg - Solo 15 unidades',
      timestamp: '2024-01-15T11:10:00Z',
      type: 'alert' as const,
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ]

  // Tabs personalizados para farmacia
  const customTabs = [
    {
      id: 'prescriptions',
      label: 'Recetas',
      content: (
        <div className="space-y-6">
          {/* Recetas pendientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Recetas Pendientes
              </CardTitle>
              <CardDescription>
                Prescripciones médicas por procesar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 'RX-001',
                    patient: 'María González',
                    doctor: 'Dr. Pérez',
                    medication: 'Amoxicilina 500mg',
                    quantity: '21 cápsulas',
                    status: 'pending',
                    receivedAt: '2024-01-15T10:30:00Z',
                    urgency: 'normal'
                  },
                  {
                    id: 'RX-002',
                    patient: 'Juan Martínez',
                    doctor: 'Dra. García',
                    medication: 'Insulina NPH',
                    quantity: '3 viales',
                    status: 'processing',
                    receivedAt: '2024-01-15T09:45:00Z',
                    urgency: 'high'
                  },
                  {
                    id: 'RX-003',
                    patient: 'Ana López',
                    doctor: 'Dr. Rodríguez',
                    medication: 'Losartan 50mg',
                    quantity: '30 tabletas',
                    status: 'ready',
                    receivedAt: '2024-01-15T08:20:00Z',
                    urgency: 'normal'
                  },
                  {
                    id: 'RX-004',
                    patient: 'Carlos Ruiz',
                    doctor: 'Dr. Morales',
                    medication: 'Salbutamol Inhalador',
                    quantity: '2 inhaladores',
                    status: 'delivered',
                    receivedAt: '2024-01-14T16:15:00Z',
                    urgency: 'urgent'
                  }
                ].map((prescription, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-sm">{prescription.id}</div>
                        <Badge className={
                          prescription.urgency === 'urgent' ? 'bg-red-100 text-red-800' :
                          prescription.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        } variant="secondary">
                          {prescription.urgency === 'urgent' ? 'Urgente' :
                           prescription.urgency === 'high' ? 'Alta' :
                           'Normal'}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{prescription.patient}</h4>
                        <p className="text-sm text-gray-800">{prescription.medication}</p>
                        <p className="text-xs text-gray-700">
                          {prescription.doctor} • {prescription.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={
                        prescription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        prescription.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        prescription.status === 'ready' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {prescription.status === 'pending' ? 'Pendiente' :
                         prescription.status === 'processing' ? 'Procesando' :
                         prescription.status === 'ready' ? 'Listo' :
                         'Entregado'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {prescription.status === 'pending' ? 'Procesar' :
                         prescription.status === 'processing' ? 'Ver Estado' :
                         prescription.status === 'ready' ? 'Entregar' :
                         'Ver Detalles'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de recetas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Recetas Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">47</div>
                <p className="text-xs text-green-600">+8 vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Tiempo Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12 min</div>
                <p className="text-xs text-gray-800">por receta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <p className="text-xs text-orange-600">2 urgentes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Disponibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">94%</div>
                <p className="text-xs text-green-600">medicamentos en stock</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'inventory',
      label: 'Inventario',
      content: (
        <div className="space-y-6">
          {/* Control de inventario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-green-600" />
                Control de Inventario
              </CardTitle>
              <CardDescription>
                Gestión de stock y medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Alertas de stock bajo */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Productos con Stock Bajo</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Paracetamol 500mg', current: 15, minimum: 50, status: 'critical' },
                      { name: 'Ibuprofeno 400mg', current: 23, minimum: 40, status: 'low' },
                      { name: 'Amoxicilina 500mg', current: 8, minimum: 30, status: 'critical' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={item.status === 'critical' ? 'text-red-600' : 'text-orange-600'}>
                            {item.current} unidades
                          </span>
                          <Button size="sm" variant="outline">Reabastecer</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categorías de medicamentos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      category: 'Antibióticos',
                      items: 24,
                      inStock: 22,
                      lowStock: 2,
                      value: '$3,450'
                    },
                    {
                      category: 'Analgésicos',
                      items: 18,
                      inStock: 15,
                      lowStock: 3,
                      value: '$1,890'
                    },
                    {
                      category: 'Vitaminas',
                      items: 31,
                      inStock: 29,
                      lowStock: 2,
                      value: '$2,340'
                    },
                    {
                      category: 'Diabetes',
                      items: 12,
                      inStock: 11,
                      lowStock: 1,
                      value: '$4,560'
                    },
                    {
                      category: 'Cardiología',
                      items: 15,
                      inStock: 14,
                      lowStock: 1,
                      value: '$3,780'
                    },
                    {
                      category: 'Respiratorio',
                      items: 8,
                      inStock: 7,
                      lowStock: 1,
                      value: '$1,230'
                    }
                  ].map((category, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{category.category}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Total productos:</span>
                            <span className="font-medium">{category.items}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>En stock:</span>
                            <span className="text-green-600">{category.inStock}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Stock bajo:</span>
                            <span className="text-red-600">{category.lowStock}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Valor:</span>
                            <span className="font-medium">{category.value}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress 
                            value={(category.inStock / category.items) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'delivery',
      label: 'Delivery',
      content: (
        <div className="space-y-6">
          {/* Entregas del día */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-purple-600" />
                Entregas de Hoy
              </CardTitle>
              <CardDescription>
                Servicios de delivery programados y en progreso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 'DEL-001',
                    customer: 'María González',
                    address: 'Zona 10, Av. Las Américas',
                    items: 'Antibióticos, Vitaminas',
                    status: 'preparing',
                    driver: 'Asignando...',
                    estimatedTime: '30-45 min',
                    total: '$45.50'
                  },
                  {
                    id: 'DEL-002',
                    customer: 'Juan Martínez',
                    address: 'Zona 1, Centro Histórico',
                    items: 'Insulina NPH',
                    status: 'in-transit',
                    driver: 'Carlos Pérez',
                    estimatedTime: '15 min',
                    total: '$89.00'
                  },
                  {
                    id: 'DEL-003',
                    customer: 'Ana López',
                    address: 'Zona 15, Vista Hermosa',
                    items: 'Medicamentos cardio',
                    status: 'delivered',
                    driver: 'Luis García',
                    estimatedTime: 'Entregado',
                    total: '$67.25'
                  }
                ].map((delivery, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-sm">{delivery.id}</div>
                        <div className="text-xs text-gray-500">{delivery.total}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{delivery.customer}</h4>
                        <p className="text-sm text-gray-600">{delivery.items}</p>
                        <p className="text-xs text-gray-500">
                          📍 {delivery.address}
                        </p>
                        <p className="text-xs text-gray-500">
                          🚚 {delivery.driver} • {delivery.estimatedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={
                        delivery.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                        delivery.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {delivery.status === 'preparing' ? 'Preparando' :
                         delivery.status === 'in-transit' ? 'En Camino' :
                         'Entregado'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Rastrear
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de delivery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Entregas Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-green-600">+5 vs ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Tiempo Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 min</div>
                <p className="text-xs text-gray-600">por entrega</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">En Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-blue-600">rutas activas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Satisfacción</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-green-600">delivery rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }
  ]

  return (
    <ProviderDashboardBase
      providerType="Farmacia"
      providerName="Farmacia La Salud"
      metrics={pharmacyMetrics}
      quickActions={quickActions}
      recentActivity={recentActivity}
      customTabs={customTabs}
    >
      {/* Contenido adicional específico de farmacia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Productos más vendidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
              Productos Más Vendidos
            </CardTitle>
            <CardDescription>
              Top 5 productos del mes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Paracetamol 500mg', sales: 145, revenue: '$725', trend: '+12%' },
              { name: 'Ibuprofeno 400mg', sales: 98, revenue: '$588', trend: '+8%' },
              { name: 'Vitamina C', sales: 87, revenue: '$435', trend: '+15%' },
              { name: 'Amoxicilina 500mg', sales: 76, revenue: '$912', trend: '+5%' },
              { name: 'Aspirina 100mg', sales: 65, revenue: '$325', trend: '+3%' }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Pill className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.sales} unidades vendidas</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{product.revenue}</div>
                  <div className="text-xs text-green-600">{product.trend}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Información de la farmacia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Información de la Farmacia
            </CardTitle>
            <CardDescription>
              Datos de contacto y servicios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Contacto</h4>
              <p className="text-sm text-gray-600">📞 (502) 2345-9876</p>
              <p className="text-sm text-gray-600">📧 info@farmacialasalud.com</p>
              <p className="text-sm text-gray-600">📍 Av. Central 456, Zona 1, Guatemala</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Horarios</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Lunes - Sábado:</strong> 8:00 AM - 9:00 PM</p>
                <p><strong>Domingos:</strong> 9:00 AM - 6:00 PM</p>
                <p><strong>Delivery:</strong> 24/7</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Servicios</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Medicamentos con Receta',
                  'Productos OTC',
                  'Delivery Express',
                  'Consulta Farmacéutica',
                  'Vitaminas y Suplementos',
                  'Productos de Belleza'
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

export default PharmacyDashboard 