'use client';

import { useState } from 'react';
import { 
  TestTube, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Download,
  Eye,
  MapPin,
  Home
} from 'lucide-react';
import { LabOrder } from '@/types';

interface LabOrderCardProps {
  order: LabOrder;
  onViewResults?: (order: LabOrder) => void;
  onDownloadResults?: (order: LabOrder) => void;
  onUpdateStatus?: (orderId: string, status: LabOrder['status']) => void;
}

const LabOrderCard: React.FC<LabOrderCardProps> = ({
  order,
  onViewResults,
  onDownloadResults,
  onUpdateStatus
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: LabOrder['status']) => {
    switch (status) {
      case 'ordered':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'collected':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: LabOrder['status']) => {
    switch (status) {
      case 'ordered':
        return <FileText className="w-4 h-4" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'collected':
        return <TestTube className="w-4 h-4" />;
      case 'processing':
        return <AlertTriangle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusText = (status: LabOrder['status']) => {
    switch (status) {
      case 'ordered':
        return 'Solicitado';
      case 'scheduled':
        return 'Programado';
      case 'collected':
        return 'Muestra Recolectada';
      case 'processing':
        return 'En Procesamiento';
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <TestTube className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Orden #{order.id}</h3>
            <p className="text-sm text-gray-600">Cliente: {order.clientId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span>{getStatusText(order.status)}</span>
          </span>
        </div>
      </div>

      {/* Test Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Información de las Pruebas</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <TestTube className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Pruebas:</span>
              <span className="font-medium">{order.tests.length}</span>
            </div>
            {order.doctorName && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Médico:</span>
                <span className="font-medium">{order.doctorName}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Creado:</span>
              <span className="font-medium">{formatDate(order.createdAt)}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Estado y Programación</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Programado:</span>
              <span className="font-medium">
                {formatDate(order.scheduledDate)} a las {order.scheduledTime}
              </span>
            </div>
            {order.sampleCollected && (
              <div className="flex items-center space-x-2">
                <TestTube className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Muestra recolectada:</span>
                <span className="font-medium">{formatDateTime(order.sampleCollected)}</span>
              </div>
            )}
            {order.resultsAvailable && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Resultados disponibles:</span>
                <span className="font-medium">{formatDateTime(order.resultsAvailable)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tests List */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Pruebas Solicitadas</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="space-y-2">
            {order.tests.map((test, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">{test.testName}</span>
                  <span className="text-xs text-gray-500 ml-2">({test.sampleType})</span>
                </div>
                <span className="text-sm text-gray-600">{formatCurrency(test.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Information */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Información de Recolección</h4>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            {order.collectionType === 'home' ? (
              <Home className="w-4 h-4 text-blue-600" />
            ) : (
              <TestTube className="w-4 h-4 text-blue-600" />
            )}
            <span className="text-sm font-medium text-blue-900">
              {order.collectionType === 'home' ? 'Recolección a domicilio' : 'Recolección en laboratorio'}
            </span>
          </div>
          {order.collectionLocation && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">{order.collectionLocation.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Technician Assignment */}
      {order.technicianId && (
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-green-900 mb-2">Técnico Asignado</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">ID: {order.technicianId}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {order.results && order.results.length > 0 && (
        <div className="bg-emerald-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-emerald-900 mb-2">Resultados Disponibles</h4>
          <div className="space-y-2">
            {order.results.map((result, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-emerald-900">{result.testName}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-emerald-600">{result.value} {result.unit}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      result.status === 'normal' ? 'bg-green-100 text-green-800' :
                      result.status === 'abnormal' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.status === 'normal' ? 'Normal' :
                       result.status === 'abnormal' ? 'Anormal' : 'Crítico'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {onViewResults && (
                    <button
                      onClick={() => onViewResults(order)}
                      className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                      title="Ver resultados"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  {onDownloadResults && (
                    <button
                      onClick={() => onDownloadResults(order)}
                      className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                      title="Descargar resultados"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Instructions */}
      {order.specialInstructions && (
        <div className="bg-amber-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-amber-900 mb-2">Instrucciones Especiales</h4>
          <p className="text-sm text-amber-800">{order.specialInstructions}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(order.totalCost)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Pago:</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus === 'pending' && 'Pendiente'}
              {order.paymentStatus === 'completed' && 'Completado'}
              {order.paymentStatus === 'refunded' && 'Reembolsado'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-1 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
          >
            {showDetails ? 'Menos detalles' : 'Más detalles'}
          </button>
          
          {order.status === 'completed' && order.results && onViewResults && (
            <button
              onClick={() => onViewResults(order)}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Ver Resultados
            </button>
          )}
          
          {order.status === 'scheduled' && onUpdateStatus && (
            <button
              onClick={() => onUpdateStatus(order.id, 'collected')}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Marcar Recolectada
            </button>
          )}
        </div>
      </div>

      {/* Extended Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">ID del Cliente:</span>
              <span className="ml-2 font-medium">{order.clientId}</span>
            </div>
            <div>
              <span className="text-gray-600">Proveedor:</span>
              <span className="ml-2 font-medium">{order.providerId}</span>
            </div>
            {order.doctorId && (
              <div>
                <span className="text-gray-600">ID del Médico:</span>
                <span className="ml-2 font-medium">{order.doctorId}</span>
              </div>
            )}
            {order.prescription && (
              <div className="md:col-span-2">
                <span className="text-gray-600">Prescripción:</span>
                <p className="mt-1 text-gray-800">{order.prescription}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabOrderCard; 