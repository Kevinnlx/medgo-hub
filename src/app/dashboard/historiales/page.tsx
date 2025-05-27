'use client';

import { useState } from 'react';
import { Search, Filter, Plus, FileText, Calendar, User, Eye, Download, Lock, AlertCircle, Clock, Stethoscope } from "lucide-react";
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useNotifications } from '@/contexts/NotificationContext';

// Mock medical records data
const mockMedicalRecords = [
  {
    id: "HCL-001",
    patientName: "María García",
    patientId: "PAT-001",
    patientAge: 34,
    patientGender: "Femenino",
    recordType: "Consulta General",
    doctorName: "Dr. Juan Pérez",
    department: "Medicina General",
    date: new Date("2024-12-24"),
    status: "completed",
    confidentiality: "normal",
    diagnosis: "Hipertensión arterial leve",
    treatment: "Medicación antihipertensiva y cambios dietéticos",
    notes: "Paciente responde bien al tratamiento inicial. Control en 3 meses.",
    vitals: {
      bloodPressure: "140/90",
      heartRate: 72,
      temperature: 36.5,
      weight: 68
    },
    allergies: ["Penicilina"],
    medications: ["Enalapril 10mg", "Aspirina 100mg"],
    lastUpdated: new Date("2024-12-24T14:30:00")
  },
  {
    id: "HCL-002", 
    patientName: "Carlos Rodríguez",
    patientId: "PAT-002",
    patientAge: 45,
    patientGender: "Masculino",
    recordType: "Cardiología",
    doctorName: "Dr. Ana López",
    department: "Cardiología",
    date: new Date("2024-12-23"),
    status: "pending_review",
    confidentiality: "high",
    diagnosis: "Arritmia cardíaca",
    treatment: "Holter 24h y ajuste medicación",
    notes: "Requiere seguimiento estrecho. Holter programado para la próxima semana.",
    vitals: {
      bloodPressure: "160/95",
      heartRate: 88,
      temperature: 36.8,
      weight: 82
    },
    allergies: ["Ibuprofeno", "Mariscos"],
    medications: ["Amiodarona 200mg", "Warfarina 5mg"],
    lastUpdated: new Date("2024-12-23T16:45:00")
  },
  {
    id: "HCL-003",
    patientName: "Ana Martínez",
    patientId: "PAT-003", 
    patientAge: 28,
    patientGender: "Femenino",
    recordType: "Ginecología",
    doctorName: "Dra. Isabel Sánchez",
    department: "Ginecología",
    date: new Date("2024-12-22"),
    status: "completed",
    confidentiality: "confidential",
    diagnosis: "Control prenatal - 12 semanas",
    treatment: "Suplementos prenatales y seguimiento",
    notes: "Embarazo evolucionando normalmente. Próxima ecografía en 4 semanas.",
    vitals: {
      bloodPressure: "110/70",
      heartRate: 75,
      temperature: 36.4,
      weight: 62
    },
    allergies: [],
    medications: ["Ácido fólico", "Hierro"],
    lastUpdated: new Date("2024-12-22T11:20:00")
  },
  {
    id: "HCL-004",
    patientName: "Roberto Silva",
    patientId: "PAT-004",
    patientAge: 67,
    patientGender: "Masculino", 
    recordType: "Neurología",
    doctorName: "Dr. Miguel Torres",
    department: "Neurología",
    date: new Date("2024-12-21"),
    status: "in_progress",
    confidentiality: "high",
    diagnosis: "Evaluación neurológica - sospecha Parkinson",
    treatment: "Pruebas diagnósticas adicionales",
    notes: "Paciente presenta temblor en reposo. Solicitada resonancia y DaTSCAN.",
    vitals: {
      bloodPressure: "135/85",
      heartRate: 68,
      temperature: 36.6,
      weight: 75
    },
    allergies: ["Látex"],
    medications: ["Levodopa 100mg (prueba)"],
    lastUpdated: new Date("2024-12-21T09:15:00")
  },
  {
    id: "HCL-005",
    patientName: "Elena Fernández",
    patientId: "PAT-005",
    patientAge: 52,
    patientGender: "Femenino",
    recordType: "Dermatología",
    doctorName: "Dra. Carmen Ruiz",
    department: "Dermatología",
    date: new Date("2024-12-20"),
    status: "completed",
    confidentiality: "normal",
    diagnosis: "Dermatitis atópica moderada",
    treatment: "Corticoides tópicos y hidratación",
    notes: "Mejoría notable tras tratamiento. Continuar con cuidados de la piel.",
    vitals: {
      bloodPressure: "120/80",
      heartRate: 70,
      temperature: 36.3,
      weight: 58
    },
    allergies: ["Níquel", "Perfumes"],
    medications: ["Betametasona crema", "Cetirizina 10mg"],
    lastUpdated: new Date("2024-12-20T15:30:00")
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending_review':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getConfidentialityColor = (level: string) => {
  switch (level) {
    case 'normal':
      return 'bg-gray-100 text-gray-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'confidential':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getConfidentialityText = (level: string) => {
  switch (level) {
    case 'normal':
      return 'Normal';
    case 'high':
      return 'Alta';
    case 'confidential':
      return 'Confidencial';
    default:
      return level;
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

export default function HistorialesPage() {
  const { addNotification } = useNotifications();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedConfidentiality, setSelectedConfidentiality] = useState('all');

  const handleNewRecord = () => {
    addNotification({
      type: 'info',
      title: 'Nuevo historial',
      message: 'Funcionalidad de creación de historiales médicos disponible'
    });
  };

  const handleViewRecord = (recordId: string) => {
    addNotification({
      type: 'info',
      title: 'Ver historial',
      message: `Accediendo al historial médico ${recordId}`
    });
  };

  const handleDownloadRecord = (recordId: string) => {
    addNotification({
      type: 'success',
      title: 'Descarga iniciada',
      message: `Descargando historial médico ${recordId}`
    });
  };

  const filteredRecords = mockMedicalRecords.filter(record => {
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesConfidentiality = selectedConfidentiality === 'all' || record.confidentiality === selectedConfidentiality;
    return matchesStatus && matchesConfidentiality;
  });

  const totalRecords = mockMedicalRecords.length;
  const completedRecords = mockMedicalRecords.filter(r => r.status === 'completed').length;
  const pendingRecords = mockMedicalRecords.filter(r => r.status === 'pending_review').length;
  const confidentialRecords = mockMedicalRecords.filter(r => r.confidentiality === 'confidential').length;

  return (
    <ProtectedRoute requiredPermission="medical_records">
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedHeader currentPage="/dashboard/historiales" />

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Historiales Médicos</h1>
              <p className="text-gray-600">Gestión de registros médicos y expedientes clínicos</p>
            </div>
            <button 
              onClick={handleNewRecord}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Historial</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Total Historiales</div>
              <div className="text-3xl font-semibold text-gray-900">{totalRecords}</div>
              <div className="text-sm text-cyan-600">Registros</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Completados</div>
              <div className="text-3xl font-semibold text-gray-900">{completedRecords}</div>
              <div className="text-sm text-green-600">Finalizados</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Pendientes</div>
              <div className="text-3xl font-semibold text-gray-900">{pendingRecords}</div>
              <div className="text-sm text-yellow-600">Revisión</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Confidenciales</div>
              <div className="text-3xl font-semibold text-gray-900">{confidentialRecords}</div>
              <div className="text-sm text-red-600">Protegidos</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por paciente, médico o diagnóstico..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Calendar className="w-4 h-4" />
                  <span>Fecha</span>
                </button>
              </div>
              
              {/* Status and Confidentiality Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Estado:</span>
                  <button
                    onClick={() => setSelectedStatus('all')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedStatus === 'all' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSelectedStatus('completed')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedStatus === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Completados
                  </button>
                  <button
                    onClick={() => setSelectedStatus('pending_review')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedStatus === 'pending_review' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pendientes
                  </button>
                  <button
                    onClick={() => setSelectedStatus('in_progress')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedStatus === 'in_progress' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    En Progreso
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Confidencialidad:</span>
                  <button
                    onClick={() => setSelectedConfidentiality('all')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedConfidentiality === 'all' 
                        ? 'bg-gray-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSelectedConfidentiality('normal')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedConfidentiality === 'normal' 
                        ? 'bg-gray-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setSelectedConfidentiality('high')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedConfidentiality === 'high' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Alta
                  </button>
                  <button
                    onClick={() => setSelectedConfidentiality('confidential')}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedConfidentiality === 'confidential' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Confidencial
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Records List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Registros Médicos</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {record.patientName} - {record.recordType}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                              {record.status === 'completed' ? 'Completado' : 
                               record.status === 'pending_review' ? 'Pendiente' : 
                               record.status === 'in_progress' ? 'En Progreso' : record.status}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidentialityColor(record.confidentiality)}`}>
                              <Lock className="w-3 h-3 inline mr-1" />
                              {getConfidentialityText(record.confidentiality)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {record.patientGender}, {record.patientAge} años
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Stethoscope className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{record.doctorName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{formatDate(record.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Actualizado: {formatDateTime(record.lastUpdated)}
                              </span>
                            </div>
                          </div>

                          {/* Medical Information */}
                          <div className="space-y-2 mb-4">
                            <div className="text-sm">
                              <strong className="text-gray-700">ID Historial:</strong> {record.id} | 
                              <strong className="text-gray-700"> Departamento:</strong> {record.department}
                            </div>
                            <div className="text-sm">
                              <strong className="text-gray-700">Diagnóstico:</strong> {record.diagnosis}
                            </div>
                            <div className="text-sm">
                              <strong className="text-gray-700">Tratamiento:</strong> {record.treatment}
                            </div>
                            {record.notes && (
                              <div className="text-sm">
                                <strong className="text-gray-700">Notas:</strong> {record.notes}
                              </div>
                            )}
                          </div>

                          {/* Vitals */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="bg-gray-50 p-2 rounded text-center">
                              <div className="text-sm font-medium text-gray-900">{record.vitals.bloodPressure}</div>
                              <div className="text-xs text-gray-600">Presión arterial</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-center">
                              <div className="text-sm font-medium text-gray-900">{record.vitals.heartRate} bpm</div>
                              <div className="text-xs text-gray-600">Frecuencia cardíaca</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-center">
                              <div className="text-sm font-medium text-gray-900">{record.vitals.temperature}°C</div>
                              <div className="text-xs text-gray-600">Temperatura</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded text-center">
                              <div className="text-sm font-medium text-gray-900">{record.vitals.weight} kg</div>
                              <div className="text-xs text-gray-600">Peso</div>
                            </div>
                          </div>

                          {/* Allergies and Medications */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-2">Alergias:</div>
                              <div className="flex flex-wrap gap-1">
                                {record.allergies.length > 0 ? (
                                  record.allergies.map((allergy, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded flex items-center">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      {allergy}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm text-gray-500">Sin alergias conocidas</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-700 mb-2">Medicamentos:</div>
                              <div className="flex flex-wrap gap-1">
                                {record.medications.map((medication, index) => (
                                  <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                    {medication}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewRecord(record.id)}
                          className="px-3 py-1 text-sm text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 inline mr-1" />
                          Ver Completo
                        </button>
                        <button 
                          onClick={() => handleDownloadRecord(record.id)}
                          className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <Download className="w-4 h-4 inline mr-1" />
                          Descargar
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredRecords.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron historiales</h3>
                    <p className="text-gray-600">
                      No hay registros médicos que coincidan con los filtros seleccionados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 