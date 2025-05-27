'use client';

import { X, FileText, User, DollarSign, Calendar, Clock, CreditCard, Download, Eye, Edit2 } from 'lucide-react';
import { Invoice } from './NewInvoiceModal';

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onEdit?: (invoice: Invoice) => void;
  onDownload?: (invoice: Invoice) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'paid':
      return 'Pagada';
    case 'pending':
      return 'Pendiente';
    case 'overdue':
      return 'Vencida';
    case 'draft':
      return 'Borrador';
    case 'cancelled':
      return 'Cancelada';
    default:
      return status;
  }
};

const getPaymentMethodText = (method?: string) => {
  const methods = {
    cash: 'Efectivo',
    card: 'Tarjeta de Crédito/Débito',
    transfer: 'Transferencia Bancaria',
    insurance: 'Seguro Médico',
    check: 'Cheque'
  };
  return method ? methods[method as keyof typeof methods] || method : 'No especificado';
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const InvoiceDetailsModal = ({ isOpen, onClose, invoice, onEdit, onDownload }: InvoiceDetailsModalProps) => {
  if (!isOpen || !invoice) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(invoice);
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(invoice);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Factura {invoice.id}</h2>
              <p className="text-sm text-gray-600">Creada el {formatDate(invoice.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onDownload && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF</span>
              </button>
            )}
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Invoice Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Información del Paciente</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">{invoice.patientName}</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    ID Paciente: {invoice.patientId}
                  </div>
                  {invoice.appointmentId && (
                    <div className="text-sm text-blue-700">
                      ID Cita: {invoice.appointmentId}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Estado de la Factura</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span>Vence: {formatDate(invoice.dueDate)}</span>
                  </div>
                  {invoice.paymentMethod && (
                    <div className="flex items-center space-x-2 text-sm text-blue-700">
                      <CreditCard className="w-4 h-4" />
                      <span>{getPaymentMethodText(invoice.paymentMethod)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-gray-50 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Conceptos Facturados</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {invoice.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.description}</div>
                      <div className="text-sm text-gray-600">
                        Cantidad: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(item.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Resumen Financiero</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-800">Subtotal:</span>
                  <span className="text-green-900 font-medium">{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-800">IVA:</span>
                  <span className="text-green-900 font-medium">{formatCurrency(invoice.tax)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-800">Descuento:</span>
                    <span className="text-green-900 font-medium">-{formatCurrency(invoice.discount)}</span>
                  </div>
                )}
                <div className="border-t border-green-300 pt-3">
                  <div className="flex justify-between">
                    <span className="text-green-900 font-semibold text-lg">Total:</span>
                    <span className="text-green-900 font-bold text-xl">{formatCurrency(invoice.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Resumen de Pagos</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Estado:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Método:</span>
                      <span className="text-green-800">{getPaymentMethodText(invoice.paymentMethod)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Vencimiento:</span>
                      <span className="text-green-800">{formatDate(invoice.dueDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {invoice.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Notas Adicionales</h3>
              <p className="text-yellow-800 leading-relaxed">{invoice.notes}</p>
            </div>
          )}

          {/* Invoice Timeline */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de la Factura</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Factura creada</div>
                  <div className="text-sm text-gray-600">{formatDateTime(invoice.createdAt)}</div>
                </div>
              </div>
              
              {invoice.status === 'paid' && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900">Pago recibido</div>
                    <div className="text-sm text-gray-600">
                      Pagado vía {getPaymentMethodText(invoice.paymentMethod)}
                    </div>
                  </div>
                </div>
              )}
              
              {invoice.status === 'overdue' && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900">Factura vencida</div>
                    <div className="text-sm text-gray-600">
                      Venció el {formatDate(invoice.dueDate)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Enviar por Email
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Marcar como Pagada
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Enviar Recordatorio
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Duplicar Factura
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cerrar
          </button>
          {onEdit && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Editar Factura</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal; 