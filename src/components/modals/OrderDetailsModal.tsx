'use client';

import { useState } from 'react';
import { PharmacyOrder, OrderItem } from '@/types';
import { 
  X, 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  Check, 
  AlertCircle,
  Phone,
  User,
  CreditCard,
  FileText,
  Eye,
  Download
} from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PharmacyOrder | null;
  onUpdateStatus?: (orderId: string, newStatus: PharmacyOrder['status']) => void;
}

const OrderDetailsModal = ({ isOpen, onClose, order, onUpdateStatus }: OrderDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'tracking' | 'prescriptions'>('details');

  if (!isOpen || !order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PA', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'payment_pending': return 'bg-orange-100 text-orange-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'dispatched': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'payment_pending': return 'Pago Pendiente';
      case 'verified': return 'Verificado';
      case 'processing': return 'Procesando';
      case 'ready': return 'Listo';
      case 'dispatched': return 'Enviado';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const statusSteps = [
    { status: 'pending', label: 'Recibido', icon: FileText },
    { status: 'verified', label: 'Verificado', icon: Check },
    { status: 'processing', label: 'Procesando', icon: Package },
    { status: 'ready', label: 'Listo', icon: AlertCircle },
    { status: 'dispatched', label: 'Enviado', icon: Truck },
    { status: 'delivered', label: 'Entregado', icon: Check }
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.status === order.status);
  };

  const handleStatusUpdate = (newStatus: PharmacyOrder['status']) => {
    if (onUpdateStatus) {
      onUpdateStatus(order.id, newStatus);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-semibold text-white">Pedido #{order.id}</h2>
              <p className="text-purple-100 text-sm">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Detalles del Pedido
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'tracking'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Seguimiento
          </button>
          {order.prescriptions && order.prescriptions.length > 0 && (
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'prescriptions'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Prescripciones
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Información del Cliente
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">ID Cliente:</span>
                      <p className="text-gray-900">{order.clientId}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Estado de Pago:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                        order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                        order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus === 'completed' ? 'Completado' :
                         order.paymentStatus === 'pending' ? 'Pendiente' : 'Fallido'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Dirección de Entrega
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 font-medium">{order.deliveryAddress.street}</p>
                  <p className="text-gray-600">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}
                  </p>
                  <p className="text-gray-600">{order.deliveryAddress.country}</p>
                  {order.deliveryAddress.landmark && (
                    <p className="text-gray-500 text-sm mt-2">
                      Referencia: {order.deliveryAddress.landmark}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Medicamentos Pedidos
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.medicationName}</h4>
                          {item.instructions && (
                            <p className="text-sm text-gray-600 mt-1">
                              Instrucciones: {item.instructions}
                            </p>
                          )}
                          {item.prescriptionId && (
                            <p className="text-sm text-blue-600 mt-1">
                              Prescripción: {item.prescriptionId}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            Cantidad: {item.quantity}
                          </p>
                          <p className="text-purple-600 font-semibold">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Resumen del Pedido
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío:</span>
                      <span className="text-gray-900">{formatCurrency(order.deliveryFee)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-semibold text-purple-600 text-lg">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Notes */}
              {order.verificationNotes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notas de Verificación
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">{order.verificationNotes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {/* Status Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Estado del Pedido
                </h3>
                <div className="relative">
                  {statusSteps.map((step, index) => {
                    const currentIndex = getCurrentStepIndex();
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const IconComponent = step.icon;

                    return (
                      <div key={step.status} className="relative flex items-center mb-6 last:mb-0">
                        {/* Line */}
                        {index < statusSteps.length - 1 && (
                          <div 
                            className={`absolute left-6 top-12 w-0.5 h-6 ${
                              isCompleted ? 'bg-purple-600' : 'bg-gray-300'
                            }`}
                          />
                        )}
                        
                        {/* Icon */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                          isCompleted 
                            ? 'bg-purple-600 border-purple-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <h4 className={`font-medium ${
                            isCompleted ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </h4>
                          {isCurrent && (
                            <p className="text-sm text-purple-600 font-medium">
                              Estado actual
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Information */}
              {order.trackingNumber && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Información de Entrega
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Número de Seguimiento:</span>
                      <span className="font-mono text-gray-900">{order.trackingNumber}</span>
                    </div>
                    {order.courierId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Repartidor ID:</span>
                        <span className="text-gray-900">{order.courierId}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entrega estimada:</span>
                      <span className="text-gray-900">{formatDate(order.estimatedDelivery)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'prescriptions' && order.prescriptions && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Prescripciones Médicas
              </h3>
              {order.prescriptions.map((prescription, index) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{prescription.medicationName}</h4>
                      <p className="text-sm text-gray-600">
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Duración:</span>
                      <span className="ml-2 text-gray-900">{prescription.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Instrucciones:</span>
                      <p className="text-gray-900 mt-1">{prescription.instructions}</p>
                    </div>
                    {prescription.isDigital && (
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <span className="text-green-800 text-xs font-medium">
                          ✓ Prescripción Digital Verificada
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Última actualización: {formatDate(order.updatedAt)}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cerrar
            </button>
            {order.status === 'pending' && (
              <button
                onClick={() => handleStatusUpdate('verified')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Verificar Pedido
              </button>
            )}
            {order.status === 'verified' && (
              <button
                onClick={() => handleStatusUpdate('processing')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Procesar Pedido
              </button>
            )}
            {order.status === 'processing' && (
              <button
                onClick={() => handleStatusUpdate('ready')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Marcar como Listo
              </button>
            )}
            {order.status === 'ready' && (
              <button
                onClick={() => handleStatusUpdate('dispatched')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Truck className="w-4 h-4" />
                <span>Enviar Pedido</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 