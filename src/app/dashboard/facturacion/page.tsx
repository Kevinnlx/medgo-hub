'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Download, FileText, DollarSign, Calendar, User } from "lucide-react";
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useNotifications } from '@/contexts/NotificationContext';
import NewInvoiceModal from '@/components/modals/NewInvoiceModal';
import InvoiceDetailsModal from '@/components/modals/InvoiceDetailsModal';
import { Invoice } from '@/components/modals/NewInvoiceModal';
import { mockAppointments, mockPatients, mockDoctors } from "@/data/mockData";

const mockInvoices: Invoice[] = [
  {
    id: "FAC-001",
    patientId: "1",
    patientName: "Juan Carlos Pérez",
    appointmentId: "1",
    items: [
      { id: "1", description: "Consulta General", quantity: 1, unitPrice: 50.00, total: 50.00 },
      { id: "2", description: "Análisis de sangre", quantity: 1, unitPrice: 30.00, total: 30.00 }
    ],
    subtotal: 80.00,
    tax: 8.00,
    discount: 0,
    total: 88.00,
    status: "paid",
    dueDate: new Date("2024-12-31"),
    paymentMethod: "card",
    createdAt: new Date("2024-12-01"),
    notes: "Pago realizado en efectivo"
  },
  {
    id: "FAC-002",
    patientId: "2",
    patientName: "Ana María Rodríguez",
    appointmentId: "2",
    items: [
      { id: "3", description: "Consulta Especialista", quantity: 1, unitPrice: 80.00, total: 80.00 },
      { id: "4", description: "Radiografía", quantity: 1, unitPrice: 45.00, total: 45.00 }
    ],
    subtotal: 125.00,
    tax: 12.50,
    discount: 5.00,
    total: 132.50,
    status: "pending",
    dueDate: new Date("2024-12-28"),
    createdAt: new Date("2024-12-15")
  },
  {
    id: "FAC-003",
    patientId: "3",
    patientName: "Roberto Silva Mendoza",
    appointmentId: "3",
    items: [
      { id: "5", description: "Consulta de Emergencia", quantity: 1, unitPrice: 120.00, total: 120.00 }
    ],
    subtotal: 120.00,
    tax: 12.00,
    discount: 0,
    total: 132.00,
    status: "overdue",
    dueDate: new Date("2024-12-20"),
    createdAt: new Date("2024-12-10")
  }
];

const getPatientById = (id: string) => {
  return mockPatients.find(patient => patient.id === id);
};

const getDoctorById = (id: string) => {
  return mockDoctors.find(doctor => doctor.id === id);
};

const getAppointmentById = (id: string) => {
  return mockAppointments.find(appointment => appointment.id === id);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

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

export default function FacturacionPage() {
  const { addNotification } = useNotifications();
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);

  // Calculate totals
  const totalRevenue = invoices.reduce((sum, invoice) => 
    invoice.status === 'paid' ? sum + invoice.total : sum, 0
  );
  
  const pendingAmount = invoices.reduce((sum, invoice) => 
    invoice.status === 'pending' ? sum + invoice.total : sum, 0
  );
  
  const overdueAmount = invoices.reduce((sum, invoice) => 
    invoice.status === 'overdue' ? sum + invoice.total : sum, 0
  );

  const handleNewInvoice = () => {
    setShowNewInvoiceModal(true);
  };

  const handleSaveNewInvoice = (invoiceData: Omit<Invoice, 'id' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `FAC-${String(invoices.length + 1).padStart(3, '0')}`,
      createdAt: new Date()
    };
    
    setInvoices(prev => [newInvoice, ...prev]);
    addNotification({
      type: 'success',
      title: 'Factura creada',
      message: `Factura ${newInvoice.id} creada exitosamente`
    });
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetailsModal(true);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    addNotification({
      type: 'info',
      title: 'Descarga iniciada',
      message: `Descargando PDF de la factura ${invoice.id}`
    });
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(prev =>
      prev.map(invoice =>
        invoice.id === invoiceId
          ? { ...invoice, status: 'paid' as const }
          : invoice
      )
    );
    addNotification({
      type: 'success',
      title: 'Factura actualizada',
      message: `Factura ${invoiceId} marcada como pagada`
    });
  };

  const handleSendReminder = (invoiceId: string) => {
    addNotification({
      type: 'info',
      title: 'Recordatorio enviado',
      message: `Recordatorio de pago enviado para la factura ${invoiceId}`
    });
  };

  // Apply search filter
  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute requiredPermission="billing_manage">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <AuthenticatedHeader currentPage="/dashboard/facturacion" />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Gestión de Facturación</h1>
                <p className="text-gray-600">Administrar pagos y facturación de servicios médicos</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                </button>
                <button 
                  onClick={handleNewInvoice}
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Factura</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Ingresos Totales</div>
              <div className="text-3xl font-semibold text-gray-900">{formatCurrency(totalRevenue)}</div>
              <div className="text-sm text-green-600">Este mes</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Pendientes de Cobro</div>
              <div className="text-3xl font-semibold text-gray-900">{formatCurrency(pendingAmount)}</div>
              <div className="text-sm text-yellow-600">Por cobrar</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Facturas Vencidas</div>
              <div className="text-3xl font-semibold text-gray-900">{formatCurrency(overdueAmount)}</div>
              <div className="text-sm text-red-600">Atención requerida</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Facturas Emitidas</div>
              <div className="text-3xl font-semibold text-gray-900">{invoices.length}</div>
              <div className="text-sm text-gray-600">Este mes</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar facturas por número, paciente..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Fecha</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Estado</span>
                </button>
              </div>
            </div>
          </div>

          {/* Billing List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Facturas ({filteredInvoices.length})
              </h3>
            </div>
            
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay facturas</h3>
                <p className="text-gray-600 mb-6">
                  {invoices.length === 0 
                    ? 'No hay facturas registradas. Crea tu primera factura.'
                    : 'No hay facturas que coincidan con los filtros aplicados.'
                  }
                </p>
                {invoices.length === 0 && (
                  <button
                    onClick={handleNewInvoice}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Crear Primera Factura
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredInvoices.map((invoice) => {
                  const appointment = getAppointmentById(invoice.appointmentId || '');
                  const patient = getPatientById(invoice.patientId);
                  const doctor = appointment ? getDoctorById(appointment.doctorId) : null;
                  
                  return (
                    <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-cyan-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">
                                Factura #{invoice.id}
                              </h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                                {getStatusText(invoice.status)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-900 font-medium">{invoice.patientName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{formatCurrency(invoice.total)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  Vence: {formatDate(invoice.dueDate)}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-gray-500">Conceptos: </span>
                                <span className="text-gray-900">{invoice.items.length} servicio(s)</span>
                              </div>
                              {doctor && (
                                <div>
                                  <span className="text-gray-500">Doctor: </span>
                                  <span className="text-gray-900">{doctor.name}</span>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Subtotal: </span>
                                <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">IVA: </span>
                                <span className="text-gray-900">{formatCurrency(invoice.tax)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Total: </span>
                                <span className="text-gray-900 font-semibold">{formatCurrency(invoice.total)}</span>
                              </div>
                            </div>

                            <div className="mt-2 text-sm">
                              <span className="text-gray-500">Creada: </span>
                              <span className="text-gray-900">{formatDate(invoice.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewInvoice(invoice)}
                            className="px-3 py-1 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                          >
                            Ver Detalles
                          </button>
                          <button 
                            onClick={() => handleDownloadInvoice(invoice)}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Descargar PDF
                          </button>
                          {invoice.status === 'pending' && (
                            <button 
                              onClick={() => handleMarkAsPaid(invoice.id)}
                              className="px-3 py-1 text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                              Marcar Pagada
                            </button>
                          )}
                          {invoice.status === 'overdue' && (
                            <button 
                              onClick={() => handleSendReminder(invoice.id)}
                              className="px-3 py-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
                            >
                              Enviar Recordatorio
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Pagination */}
            {filteredInvoices.length > 0 && (
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Mostrando 1-{filteredInvoices.length} de {filteredInvoices.length} facturas
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                      Anterior
                    </button>
                    <button className="px-3 py-1 text-sm bg-cyan-500 text-white rounded">
                      1
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Modals */}
        <NewInvoiceModal
          isOpen={showNewInvoiceModal}
          onClose={() => setShowNewInvoiceModal(false)}
          onSave={handleSaveNewInvoice}
        />

        <InvoiceDetailsModal
          isOpen={showInvoiceDetailsModal}
          onClose={() => setShowInvoiceDetailsModal(false)}
          invoice={selectedInvoice}
          onDownload={handleDownloadInvoice}
        />
      </div>
    </ProtectedRoute>
  );
} 