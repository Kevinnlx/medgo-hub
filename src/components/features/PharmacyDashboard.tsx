'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { usePharmacy } from '@/hooks/usePharmacy'
import { formatCurrency, formatDate } from '@/lib/utils'
import { 
  Pill, 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  Clock,
  Warehouse,
  Calendar
} from 'lucide-react'

const PharmacyDashboard: React.FC = () => {
  const {
    medications,
    orders,
    loading,
    error,
    searchMedications,
    getLowStockMedications,
    getExpiringSoonMedications,
    updateOrderStatus,
    verifyPrescription,
    getMedicationCategories
  } = usePharmacy()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const handleOrderStatusUpdate = async (orderId: string, newStatus: any) => {
    try {
      await updateOrderStatus(orderId, newStatus)
    } catch (err) {
      console.error('Error updating order status:', err)
    }
  }

  const handlePrescriptionVerification = async (orderId: string) => {
    try {
      await verifyPrescription(orderId, 'Prescription verified by pharmacist')
    } catch (err) {
      console.error('Error verifying prescription:', err)
    }
  }

  const filteredMedications = searchMedications(searchQuery).filter(med => 
    categoryFilter === 'all' || med.category === categoryFilter
  )

  const lowStockMeds = getLowStockMedications()
  const expiringSoonMeds = getExpiringSoonMedications()
  const categories = getMedicationCategories()
  
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const processingOrders = orders.filter(order => order.status === 'processing').length
  const readyOrders = orders.filter(order => order.status === 'ready').length

  const getStockBadgeVariant = (medication: any) => {
    if (medication.stock <= medication.minStock) return 'destructive'
    if (medication.stock <= medication.minStock * 1.5) return 'warning'
    return 'success'
  }

  const getOrderStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'pending'
      case 'payment_pending': return 'warning'
      case 'verified': return 'info'
      case 'processing': return 'in-progress'
      case 'ready': return 'success'
      case 'dispatched': return 'info'
      case 'delivered': return 'completed'
      case 'cancelled': return 'cancelled'
      default: return 'default'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600">Manage medication inventory and orders</p>
        </div>
        <Button variant="pharmacy" size="lg" className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Medication
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Medications</p>
                <p className="text-2xl font-bold text-purple-600">{medications.length}</p>
              </div>
              <Pill className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-red-600">{lowStockMeds.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">{expiringSoonMeds.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready Orders</p>
                <p className="text-2xl font-bold text-green-600">{readyOrders}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'inventory'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          <Warehouse className="inline-block h-4 w-4 mr-2" />
          Inventory Management
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'orders'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingCart className="inline-block h-4 w-4 mr-2" />
          Order Management
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search medications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Medications Grid */}
          <div className="grid gap-4">
            {filteredMedications.map((medication) => (
              <Card key={medication.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
                        <p className="text-sm text-gray-600">{medication.brand} - {medication.concentration}</p>
                      </div>
                      <Badge variant="outline">{medication.category}</Badge>
                      <Badge variant={getStockBadgeVariant(medication)}>
                        Stock: {medication.stock}
                      </Badge>
                      {medication.requiresPrescription && (
                        <Badge variant="warning">Prescription Required</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="font-medium">{formatCurrency(medication.price)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{medication.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Batch Number</p>
                      <p className="font-medium">{medication.batchNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expiry Date</p>
                      <p className="font-medium">{formatDate(medication.expiryDate)}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-sm">{medication.description}</p>
                  </div>

                  {medication.stock <= medication.minStock && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <p className="text-sm text-red-800">Low stock alert! Current: {medication.stock}, Minimum: {medication.minStock}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Orders List */}
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">Client ID: {order.clientId}</p>
                      </div>
                      <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                      <Badge variant="outline">
                        Payment: {order.paymentStatus}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button 
                          variant="info" 
                          size="sm"
                          onClick={() => handlePrescriptionVerification(order.id)}
                        >
                          Verify
                        </Button>
                      )}
                      {order.status === 'verified' && (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleOrderStatusUpdate(order.id, 'processing')}
                        >
                          Process
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleOrderStatusUpdate(order.id, 'ready')}
                        >
                          Ready
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button 
                          variant="info" 
                          size="sm"
                          onClick={() => handleOrderStatusUpdate(order.id, 'dispatched')}
                        >
                          <Truck className="h-4 w-4" />
                          Dispatch
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="font-medium text-lg">{formatCurrency(order.total)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                      <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Items:</p>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{item.medicationName}</span>
                        <span className="text-sm font-medium">Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="text-sm">{order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                  </div>

                  {order.verificationNotes && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">Verification Notes: {order.verificationNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {orders.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Orders will appear here once customers start placing them.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default PharmacyDashboard 