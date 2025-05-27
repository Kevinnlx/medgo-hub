'use client';

import { useState } from 'react';
import { Package, MapPin, Clock, User, Eye, AlertCircle } from 'lucide-react';
import { PharmacyOrder } from '@/types';

interface PharmacyOrderCardProps {
  order: PharmacyOrder;
  onViewDetails: (order: PharmacyOrder) => void;
  onTrackDelivery?: (order: PharmacyOrder) => void;
}

const PharmacyOrderCard = ({ order, onViewDetails, onTrackDelivery }: PharmacyOrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'payment_pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ready':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'dispatched':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const hasPrescriptionItems = order.items.some(item => item.prescriptionId);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Pedido {order.id}</h3>
            <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasPrescriptionItems && (
            <div className="flex items-center space-x-1 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Prescripción</span>
            </div>
          )}
          <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status === 'pending' && 'Pendiente'}
            {order.status === 'payment_pending' && 'Pago Pendiente'}
            {order.status === 'verified' && 'Verificado'}
            {order.status === 'processing' && 'Procesando'}
            {order.status === 'ready' && 'Listo'}
            {order.status === 'dispatched' && 'Enviado'}
            {order.status === 'delivered' && 'Entregado'}
            {order.status === 'cancelled' && 'Cancelado'}
          </span>
        </div>
      </div>

      {/* Items Summary */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          {order.items.length} {order.items.length === 1 ? 'medicamento' : 'medicamentos'}
        </div>
        <div className="space-y-1">
          {order.items.slice(0, isExpanded ? order.items.length : 2).map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-gray-900">
                {item.medicationName} 
                {item.prescriptionId && <span className="text-amber-600 ml-1">📋</span>}
              </span>
              <span className="text-gray-600">
                {item.quantity}x {formatCurrency(item.price)}
              </span>
            </div>
          ))}
          {order.items.length > 2 && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-cyan-600 text-sm hover:text-cyan-700 transition-colors"
            >
              Ver {order.items.length - 2} más...
            </button>
          )}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">Dirección de entrega</span>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          {order.deliveryAddress.street}, {order.deliveryAddress.city}
        </p>
        {order.deliveryAddress.landmark && (
          <p className="text-xs text-gray-500 ml-6">{order.deliveryAddress.landmark}</p>
        )}
        
        <div className="flex items-center space-x-2 mt-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Entrega estimada: {formatDate(order.estimatedDelivery)}
          </span>
        </div>
      </div>

      {/* Payment and Total */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm text-gray-900">{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Envío</span>
          <span className="text-sm text-gray-900">{formatCurrency(order.deliveryFee)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">Estado del pago</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus === 'pending' && 'Pendiente'}
            {order.paymentStatus === 'partial' && 'Parcial'}
            {order.paymentStatus === 'completed' && 'Completado'}
            {order.paymentStatus === 'refunded' && 'Reembolsado'}
          </span>
        </div>
      </div>

      {/* Verification Notes */}
      {order.verificationNotes && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-1">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Notas de verificación</span>
          </div>
          <p className="text-sm text-blue-800 ml-6">{order.verificationNotes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(order)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Ver detalles</span>
        </button>
        
        {(order.status === 'dispatched' || order.status === 'ready') && order.trackingNumber && onTrackDelivery && (
          <button
            onClick={() => onTrackDelivery(order)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Rastrear</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PharmacyOrderCard; 