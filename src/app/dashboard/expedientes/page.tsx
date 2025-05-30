'use client';

import { useState } from 'react';
import { FileText, Search, Filter, Plus, User, Calendar, Activity, Eye, Download, Lock, Shield } from 'lucide-react';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useNotifications } from '@/contexts/NotificationContext';
import MedicalRecordCard from '@/components/features/medical-records/MedicalRecordCard';
import { medicalRecords } from '@/data/mockData';
import { MedicalRecord } from '@/types';

export default function ExpedientesPage() {
  const { addNotification } = useNotifications();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedConfidentiality, setSelectedConfidentiality] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState<MedicalRecord[]>(medicalRecords);
  const [currentUserRole] = useState('doctor'); // This would come from auth context

  const handleNewRecord = () => {
    addNotification({
      type: 'info',
      title: 'Nuevo expediente médico',
      message: 'Funcionalidad de creación de expedientes disponible'
    });
  };

  const handleViewRecord = (record: MedicalRecord) => {
    addNotification({
      type: 'info',
      title: 'Expediente médico',
      message: `Accediendo al expediente de ${record.patientName}`
    });
  };

  const handleEditRecord = (record: MedicalRecord) => {
    addNotification({
      type: 'info',
      title: 'Editar expediente',
      message: `Editando expediente de ${record.patientName}`
    });
  };

  const handleDownloadRecord = (record: MedicalRecord) => {
    addNotification({
      type: 'success',
      title: 'Descarga iniciada',
      message: `Descargando expediente de ${record.patientName}`
    });
  };

  const handleShareRecord = (record: MedicalRecord) => {
    addNotification({
      type: 'info',
      title: 'Compartir expediente',
      message: `Compartiendo expediente de ${record.patientName}`
    });
  };

  const handleViewAccessLog = (record: MedicalRecord) => {
    addNotification({
      type: 'info',
      title: 'Historial de accesos',
      message: `Visualizando historial de accesos para ${record.patientName}`
    });
  };

  const handleAddEntry = (recordId: string) => {
    addNotification({
      type: 'info',
      title: 'Nueva entrada médica',
      message: 'Agregando nueva entrada al expediente'
    });
  };

  // Apply filters
  const getFilteredRecords = () => {
    let filtered = records;

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(record => record.status === selectedStatus);
    }

    // Apply confidentiality filter
    if (selectedConfidentiality !== 'all') {
      filtered = filtered.filter(record => record.confidentialityLevel === selectedConfidentiality);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.attendingPhysician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredRecords = getFilteredRecords();

  // Calculate statistics
  const totalRecords = records.length;
  const activeRecords = records.filter(r => r.status === 'active').length;
  const totalEntries = records.reduce((sum, r) => sum + r.totalEntries, 0);
  const highConfidentialityRecords = records.filter(r => r.confidentialityLevel === 'high').length;
  const recentlyUpdated = records.filter(r => {
    const daysDiff = (new Date().getTime() - r.lastUpdate.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 7;
  }).length;

  return (
    <ProtectedRoute requiredPermission="medical_records_manage">
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedHeader currentPage="/dashboard/expedientes" />

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Expedientes Médicos</h1>
              <p className="text-gray-700">Gestión centralizada de historiales médicos y documentación clínica</p>
            </div>
            <button 
              onClick={handleNewRecord}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Expediente</span>
            </button>
          </div>

          {/* Security Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-blue-800">Información Confidencial</span>
              <span className="text-blue-600">• Acceso controlado • Trazabilidad completa • Cumplimiento HIPAA</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Total Expedientes</div>
              <div className="text-3xl font-semibold text-gray-900">{totalRecords}</div>
              <div className="text-sm text-cyan-600">En sistema</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Expedientes Activos</div>
              <div className="text-3xl font-semibold text-gray-900">{activeRecords}</div>
              <div className="text-sm text-green-600">En seguimiento</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Entradas Totales</div>
              <div className="text-3xl font-semibold text-gray-900">{totalEntries}</div>
              <div className="text-sm text-purple-600">Registros médicos</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Alta Confidencialidad</div>
              <div className="text-3xl font-semibold text-gray-900">{highConfidentialityRecords}</div>
              <div className="text-sm text-red-600">Acceso restringido</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Actualizados (7d)</div>
              <div className="text-3xl font-semibold text-gray-900">{recentlyUpdated}</div>
              <div className="text-sm text-orange-600">Recientes</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar por paciente, ID o médico..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full md:w-80"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filtros Avanzados</span>
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activos</option>
                  <option value="inactive">Inactivos</option>
                  <option value="archived">Archivados</option>
                  <option value="restricted">Restringidos</option>
                </select>
                
                <select
                  value={selectedConfidentiality}
                  onChange={(e) => setSelectedConfidentiality(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                >
                  <option value="all">Todos los niveles</option>
                  <option value="high">Alta confidencialidad</option>
                  <option value="medium">Media confidencialidad</option>
                  <option value="standard">Estándar</option>
                  <option value="low">Baja confidencialidad</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-gray-700">
              Mostrando {filteredRecords.length} de {totalRecords} expedientes médicos
            </p>
          </div>

          {/* Medical Records Grid */}
          <div className="space-y-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <MedicalRecordCard
                  key={record.id}
                  record={record}
                  onViewRecord={handleViewRecord}
                  onEditRecord={handleEditRecord}
                  onDownloadRecord={handleDownloadRecord}
                  onShareRecord={handleShareRecord}
                  onViewAccessLog={handleViewAccessLog}
                  onAddEntry={handleAddEntry}
                  currentUserRole={currentUserRole}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron expedientes</h3>
                <p className="text-gray-700 mb-6">
                  {searchTerm || selectedStatus !== 'all' || selectedConfidentiality !== 'all'
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'No hay expedientes médicos registrados'}
                </p>
                <button
                  onClick={handleNewRecord}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Crear Primer Expediente
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 