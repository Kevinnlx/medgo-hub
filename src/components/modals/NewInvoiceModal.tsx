'use client';

import { useState } from 'react';
import { X, FileText, User, DollarSign, Calendar, CreditCard, Calculator } from 'lucide-react';

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => void;
}

const paymentMethods = [
  { id: 'cash', name: 'Efectivo' },
  { id: 'card', name: 'Tarjeta de Crédito/Débito' },
  { id: 'transfer', name: 'Transferencia Bancaria' },
  { id: 'insurance', name: 'Seguro Médico' },
  { id: 'check', name: 'Cheque' }
];

const commonServices = [
  { id: 'consultation', name: 'Consulta General', price: 50.00 },
  { id: 'specialist', name: 'Consulta Especialista', price: 80.00 },
  { id: 'emergency', name: 'Consulta de Emergencia', price: 120.00 },
  { id: 'lab_basic', name: 'Análisis Básico', price: 25.00 },
  { id: 'lab_complete', name: 'Análisis Completo', price: 75.00 },
  { id: 'xray', name: 'Radiografía', price: 45.00 },
  { id: 'ultrasound', name: 'Ecografía', price: 60.00 },
  { id: 'prescription', name: 'Receta Médica', price: 15.00 }
];

const NewInvoiceModal = ({ isOpen, onClose, onSave }: NewInvoiceModalProps) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    appointmentId: '',
    status: 'draft' as 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    paymentMethod: '',
    notes: '',
    discount: 0,
    taxRate: 10 // 10% tax
  });

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [currentItem, setCurrentItem] = useState({
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateItemTotal = () => {
    return currentItem.quantity * currentItem.unitPrice;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * formData.taxRate) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    return subtotal + tax - formData.discount;
  };

  const addItem = () => {
    if (!currentItem.description || currentItem.quantity <= 0 || currentItem.unitPrice <= 0) {
      setErrors(prev => ({ ...prev, item: 'Complete todos los campos del artículo' }));
      return;
    }

    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      description: currentItem.description,
      quantity: currentItem.quantity,
      unitPrice: currentItem.unitPrice,
      total: calculateItemTotal()
    };

    setItems(prev => [...prev, newItem]);
    setCurrentItem({ description: '', quantity: 1, unitPrice: 0 });
    setErrors(prev => ({ ...prev, item: '' }));
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addServiceItem = (service: typeof commonServices[0]) => {
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      description: service.name,
      quantity: 1,
      unitPrice: service.price,
      total: service.price
    };
    setItems(prev => [...prev, newItem]);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'El nombre del paciente es requerido';
    }

    if (items.length === 0) {
      newErrors.items = 'Debe agregar al menos un artículo';
    }

    if (formData.discount < 0) {
      newErrors.discount = 'El descuento no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const total = calculateTotal();

    const newInvoice = {
      patientId: formData.patientId || `PAT_${Date.now()}`,
      patientName: formData.patientName,
      appointmentId: formData.appointmentId || undefined,
      items,
      subtotal,
      tax,
      discount: formData.discount,
      total,
      status: formData.status,
      dueDate: formData.dueDate,
      paymentMethod: formData.paymentMethod || undefined,
      notes: formData.notes || undefined
    };

    onSave(newInvoice);
    handleClose();
  };

  const resetForm = () => {
    setFormData({
      patientId: '',
      patientName: '',
      appointmentId: '',
      status: 'draft',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentMethod: '',
      notes: '',
      discount: 0,
      taxRate: 10
    });
    setItems([]);
    setCurrentItem({ description: '', quantity: 1, unitPrice: 0 });
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Nueva Factura</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span>Información del Paciente</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del paciente *
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.patientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre completo del paciente"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID de cita (opcional)
                </label>
                <input
                  type="text"
                  value={formData.appointmentId}
                  onChange={(e) => setFormData({ ...formData, appointmentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="CITA-001"
                />
              </div>
            </div>
          </div>

          {/* Services and Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-gray-600" />
              <span>Servicios y Conceptos</span>
            </h3>

            {/* Quick Services */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Servicios Comunes</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {commonServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => addServiceItem(service)}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    {service.name}
                    <br />
                    <span className="text-blue-600 font-medium">{formatCurrency(service.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Custom Item */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Agregar Concepto Personalizado</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descripción del servicio"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cantidad"
                  />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentItem.unitPrice}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Precio"
                  />
                  <button
                    type="button"
                    onClick={addItem}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              {errors.item && (
                <p className="text-red-500 text-sm mt-2">{errors.item}</p>
              )}
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <div className="border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700">Conceptos Agregados</h4>
                </div>
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.description}</div>
                        <div className="text-sm text-gray-600">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="font-semibold text-gray-900">{formatCurrency(item.total)}</div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.items && (
              <p className="text-red-500 text-sm">{errors.items}</p>
            )}
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span>Detalles de Facturación</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Borrador</option>
                  <option value="pending">Pendiente</option>
                  <option value="paid">Pagada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de vencimiento
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dueDate.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value) })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de pago
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar método</option>
                  {paymentMethods.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descuento (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.discount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas adicionales
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Información adicional sobre la factura..."
                />
              </div>
            </div>
          </div>

          {/* Invoice Summary */}
          {items.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Resumen de Factura</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-800">Subtotal:</span>
                  <span className="text-blue-900 font-medium">{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">IVA ({formData.taxRate}%):</span>
                  <span className="text-blue-900 font-medium">{formatCurrency(calculateTax())}</span>
                </div>
                {formData.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-blue-800">Descuento:</span>
                    <span className="text-blue-900 font-medium">-{formatCurrency(formData.discount)}</span>
                  </div>
                )}
                <div className="border-t border-blue-300 pt-2">
                  <div className="flex justify-between">
                    <span className="text-blue-900 font-semibold text-lg">Total:</span>
                    <span className="text-blue-900 font-bold text-lg">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Crear Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceModal; 