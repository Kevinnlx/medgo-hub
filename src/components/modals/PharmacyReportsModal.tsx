'use client';

import { useState } from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  Package,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface PharmacyReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PharmacyReportsModal = ({ isOpen, onClose }: PharmacyReportsModalProps) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'expiration' | 'financial'>('sales');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PA', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Mock report data
  const salesReport = {
    totalSales: 45680.50,
    totalOrders: 328,
    averageOrderValue: 139.27,
    growthRate: 15.4,
    topMedications: [
      { name: 'Paracetamol 500mg', sales: 8540.20, units: 142 },
      { name: 'Ibuprofeno 400mg', sales: 6230.15, units: 98 },
      { name: 'Amoxicilina 500mg', sales: 5890.00, units: 76 },
      { name: 'Loratadina 10mg', sales: 4560.30, units: 89 },
      { name: 'Complejo B', sales: 3420.75, units: 67 }
    ],
    dailySales: [
      { date: '2024-12-15', amount: 2340.50, orders: 18 },
      { date: '2024-12-16', amount: 1890.25, orders: 14 },
      { date: '2024-12-17', amount: 2780.00, orders: 22 },
      { date: '2024-12-18', amount: 2150.75, orders: 16 },
      { date: '2024-12-19', amount: 3420.30, orders: 25 },
      { date: '2024-12-20', amount: 2890.15, orders: 19 }
    ]
  };

  const inventoryReport = {
    totalMedications: 156,
    totalValue: 89540.25,
    lowStock: 12,
    outOfStock: 3,
    categories: [
      { name: 'Analgésicos', count: 28, value: 15240.50, percentage: 18.0 },
      { name: 'Antibióticos', count: 22, value: 18930.75, percentage: 21.2 },
      { name: 'Antiinflamatorios', count: 18, value: 12680.30, percentage: 14.2 },
      { name: 'Vitaminas', count: 35, value: 8950.20, percentage: 10.0 },
      { name: 'Dermatológicos', count: 16, value: 11240.60, percentage: 12.6 },
      { name: 'Otros', count: 37, value: 22497.90, percentage: 24.0 }
    ],
    stockMovements: [
      { medication: 'Paracetamol 500mg', movement: 'entrada', quantity: 50, date: '2024-12-20' },
      { medication: 'Ibuprofeno 400mg', movement: 'salida', quantity: -25, date: '2024-12-19' },
      { medication: 'Amoxicilina 500mg', movement: 'venta', quantity: -10, date: '2024-12-18' },
      { medication: 'Vitamina C 1000mg', movement: 'entrada', quantity: 30, date: '2024-12-17' }
    ]
  };

  const expirationReport = {
    expiringThisMonth: 8,
    expired: 2,
    totalExpirationValue: 4560.75,
    items: [
      { 
        medication: 'Amoxicilina 500mg', 
        batch: 'AMX2024003', 
        expiryDate: new Date('2025-03-05'), 
        stock: 80, 
        value: 2800.00,
        daysLeft: 75,
        status: 'warning'
      },
      { 
        medication: 'Crema Hidrocortisona 1%', 
        batch: 'HID2024006', 
        expiryDate: new Date('2025-01-10'), 
        stock: 45, 
        value: 1890.00,
        daysLeft: 21,
        status: 'critical'
      },
      { 
        medication: 'Aspirina 100mg', 
        batch: 'ASP2024001', 
        expiryDate: new Date('2024-12-25'), 
        stock: 12, 
        value: 180.50,
        daysLeft: 5,
        status: 'critical'
      },
      { 
        medication: 'Vitamina D3 2000 UI', 
        batch: 'VIT2024007', 
        expiryDate: new Date('2024-12-22'), 
        stock: 8, 
        value: 240.25,
        daysLeft: 2,
        status: 'expired'
      }
    ]
  };

  const financialReport = {
    revenue: 45680.50,
    costs: 28950.30,
    profit: 16730.20,
    margin: 36.6,
    paymentMethods: [
      { method: 'Efectivo', amount: 18560.20, percentage: 40.6 },
      { method: 'Tarjeta', amount: 15230.15, percentage: 33.3 },
      { method: 'Transferencia', amount: 8940.90, percentage: 19.6 },
      { method: 'Seguro', amount: 2949.25, percentage: 6.5 }
    ],
    expenses: [
      { category: 'Compra de medicamentos', amount: 22450.80, percentage: 77.5 },
      { category: 'Gastos operativos', amount: 3890.25, percentage: 13.4 },
      { category: 'Personal', amount: 2609.25, percentage: 9.1 }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-semibold text-white">Reportes de Farmacia</h2>
              <p className="text-purple-100 text-sm">
                Análisis y estadísticas del negocio
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium">Rango de fechas:</Label>
            </div>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-40"
            />
            <span className="text-gray-500">hasta</span>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-40"
            />
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Aplicar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sales'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ventas
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'inventory'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Inventario
          </button>
          <button
            onClick={() => setActiveTab('expiration')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'expiration'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Vencimientos
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'financial'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Financiero
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {activeTab === 'sales' && (
            <div className="space-y-6">
              {/* Sales Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Ventas Totales</p>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(salesReport.totalSales)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Pedidos</p>
                      <p className="text-2xl font-bold text-green-900">{salesReport.totalOrders}</p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Valor Promedio</p>
                      <p className="text-2xl font-bold text-purple-900">{formatCurrency(salesReport.averageOrderValue)}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Crecimiento</p>
                      <p className="text-2xl font-bold text-orange-900">+{salesReport.growthRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Top Medications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicamentos Más Vendidos</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
                      <span>Medicamento</span>
                      <span>Ventas</span>
                      <span>Unidades</span>
                      <span>Promedio</span>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {salesReport.topMedications.map((med, index) => (
                      <div key={index} className="p-4 grid grid-cols-4 gap-4 text-sm">
                        <span className="font-medium text-gray-900">{med.name}</span>
                        <span className="text-green-600 font-semibold">{formatCurrency(med.sales)}</span>
                        <span className="text-gray-600">{med.units} unidades</span>
                        <span className="text-gray-600">{formatCurrency(med.sales / med.units)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Sales Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas Diarias</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="space-y-3">
                    {salesReport.dailySales.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">{formatDate(new Date(day.date))}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-green-600 font-semibold">{formatCurrency(day.amount)}</span>
                          <Badge variant="outline">{day.orders} pedidos</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Inventory Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Medicamentos</p>
                      <p className="text-2xl font-bold text-blue-900">{inventoryReport.totalMedications}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Valor Total</p>
                      <p className="text-2xl font-bold text-green-900">{formatCurrency(inventoryReport.totalValue)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Stock Bajo</p>
                      <p className="text-2xl font-bold text-orange-900">{inventoryReport.lowStock}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Sin Stock</p>
                      <p className="text-2xl font-bold text-red-900">{inventoryReport.outOfStock}</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Categories Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventario por Categoría</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inventoryReport.categories.map((category, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <Badge variant="outline">{category.percentage}%</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Medicamentos: {category.count}</span>
                          <span className="text-green-600 font-semibold">{formatCurrency(category.value)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Stock Movements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Movimientos Recientes</h3>
                <div className="space-y-2">
                  {inventoryReport.stockMovements.map((movement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={movement.movement === 'entrada' ? 'success' : 'warning'}
                        >
                          {movement.movement}
                        </Badge>
                        <span className="font-medium">{movement.medication}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`font-semibold ${
                          movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </span>
                        <span className="text-gray-500 text-sm">{formatDate(new Date(movement.date))}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expiration' && (
            <div className="space-y-6">
              {/* Expiration Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Vencen Este Mes</p>
                      <p className="text-2xl font-bold text-orange-900">{expirationReport.expiringThisMonth}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Ya Vencidos</p>
                      <p className="text-2xl font-bold text-red-900">{expirationReport.expired}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Valor en Riesgo</p>
                      <p className="text-2xl font-bold text-yellow-900">{formatCurrency(expirationReport.totalExpirationValue)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Expiration Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicamentos por Vencer</h3>
                <div className="space-y-3">
                  {expirationReport.items.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      item.status === 'expired' ? 'bg-red-50 border-red-200' :
                      item.status === 'critical' ? 'bg-orange-50 border-orange-200' :
                      'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{item.medication}</h4>
                          <Badge 
                            variant={item.status === 'expired' ? 'destructive' : 
                                   item.status === 'critical' ? 'warning' : 'default'}
                          >
                            {item.status === 'expired' ? 'VENCIDO' : 
                             item.status === 'critical' ? 'CRÍTICO' : 'ALERTA'}
                          </Badge>
                        </div>
                        <span className={`font-semibold ${
                          item.status === 'expired' ? 'text-red-600' :
                          item.status === 'critical' ? 'text-orange-600' : 'text-yellow-600'
                        }`}>
                          {item.daysLeft > 0 ? `${item.daysLeft} días` : 'Vencido'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Lote:</span>
                          <p className="font-mono">{item.batch}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Vencimiento:</span>
                          <p className="font-medium">{formatDate(item.expiryDate)}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Stock:</span>
                          <p className="font-medium">{item.stock} unidades</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Valor:</span>
                          <p className="font-semibold text-green-600">{formatCurrency(item.value)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-6">
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Ingresos</p>
                      <p className="text-2xl font-bold text-green-900">{formatCurrency(financialReport.revenue)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Costos</p>
                      <p className="text-2xl font-bold text-red-900">{formatCurrency(financialReport.costs)}</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Ganancia</p>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(financialReport.profit)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Margen</p>
                      <p className="text-2xl font-bold text-purple-900">{financialReport.margin}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de Pago</h3>
                  <div className="space-y-3">
                    {financialReport.paymentMethods.map((method, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{method.method}</span>
                          <Badge variant="outline">{method.percentage}%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 font-semibold">{formatCurrency(method.amount)}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${method.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gastos por Categoría</h3>
                  <div className="space-y-3">
                    {financialReport.expenses.map((expense, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{expense.category}</span>
                          <Badge variant="outline">{expense.percentage}%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-red-600 font-semibold">{formatCurrency(expense.amount)}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-600 h-2 rounded-full" 
                              style={{ width: `${expense.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Reportes generados el {formatDate(new Date())}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyReportsModal; 