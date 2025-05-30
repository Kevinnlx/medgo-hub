'use client';

import { useState } from 'react';
import { Search, Filter, Plus, User, Phone, Mail, Calendar, Edit2, Eye, Heart, AlertTriangle, MoreHorizontal, Trash2 } from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useNotifications } from '@/contexts/NotificationContext';
import { Patient } from '@/types';
import NewPatientModal from '@/components/modals/NewPatientModal';
import EditPatientModal from '@/components/modals/EditPatientModal';
import PatientDetailsModal from '@/components/modals/PatientDetailsModal';
import PatientFiltersModal from '@/components/modals/PatientFiltersModal';

interface PatientFilterOptions {
  name: string;
  email: string;
  phone: string;
  ageFrom: string;
  ageTo: string;
  gender: string[];
  bloodType: string[];
  hasAllergies: string;
  hasChronicConditions: string;
  registrationDateFrom: string;
  registrationDateTo: string;
}

const calculateAge = (dateOfBirth: Date) => {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    return age - 1;
  }
  return age;
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const getGenderLabel = (gender: string) => {
  switch (gender) {
    case 'male': return 'Masculino';
    case 'female': return 'Femenino';
    case 'other': return 'Otro';
    default: return gender;
  }
};

export default function PacientesPage() {
  const { addNotification } = useNotifications();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<PatientFilterOptions>({
    name: '',
    email: '',
    phone: '',
    ageFrom: '',
    ageTo: '',
    gender: [],
    bloodType: [],
    hasAllergies: '',
    hasChronicConditions: '',
    registrationDateFrom: '',
    registrationDateTo: ''
  });

  const handleNewPatient = (patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: `patient_${Date.now()}`
    };
    
    setPatients(prev => [newPatient, ...prev]);
    addNotification({
      type: 'success',
      title: 'Paciente creado',
      message: `${newPatient.name} ha sido registrado exitosamente`
    });
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedPatient: Patient) => {
    setPatients(prev =>
      prev.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
    addNotification({
      type: 'success',
      title: 'Paciente actualizado',
      message: `Los datos de ${updatedPatient.name} han sido actualizados`
    });
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    addNotification({
      type: 'success',
      title: 'Paciente eliminado',
      message: 'El paciente ha sido eliminado exitosamente'
    });
    setDropdownOpen(null);
  };

  const handleApplyFilters = (newFilters: PatientFilterOptions) => {
    setFilters(newFilters);
    addNotification({
      type: 'info',
      title: 'Filtros aplicados',
      message: 'Los filtros se han aplicado correctamente'
    });
  };

  const toggleDropdown = (patientId: string) => {
    if (dropdownOpen === patientId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(patientId);
    }
  };

  // Apply filters and search
  const getFilteredPatients = () => {
    let filtered = patients;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
    }

    // Apply advanced filters
    if (filters.name) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(patient =>
        patient.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.phone) {
      filtered = filtered.filter(patient =>
        patient.phone.includes(filters.phone)
      );
    }

    if (filters.ageFrom) {
      filtered = filtered.filter(patient =>
        calculateAge(patient.dateOfBirth) >= parseInt(filters.ageFrom)
      );
    }

    if (filters.ageTo) {
      filtered = filtered.filter(patient =>
        calculateAge(patient.dateOfBirth) <= parseInt(filters.ageTo)
      );
    }

    if (filters.gender.length > 0) {
      filtered = filtered.filter(patient =>
        filters.gender.includes(patient.gender)
      );
    }

    if (filters.bloodType.length > 0) {
      filtered = filtered.filter(patient =>
        filters.bloodType.includes(patient.bloodType)
      );
    }

    if (filters.hasAllergies) {
      if (filters.hasAllergies === 'yes') {
        filtered = filtered.filter(patient => patient.allergies.length > 0);
      } else if (filters.hasAllergies === 'no') {
        filtered = filtered.filter(patient => patient.allergies.length === 0);
      }
    }

    if (filters.hasChronicConditions) {
      if (filters.hasChronicConditions === 'yes') {
        filtered = filtered.filter(patient => patient.chronicConditions.length > 0);
      } else if (filters.hasChronicConditions === 'no') {
        filtered = filtered.filter(patient => patient.chronicConditions.length === 0);
      }
    }

    return filtered;
  };

  const filteredPatients = getFilteredPatients();

  const hasActiveFilters = () => {
    return filters.name || filters.email || filters.phone || filters.ageFrom || 
           filters.ageTo || filters.gender.length > 0 || filters.bloodType.length > 0 ||
           filters.hasAllergies || filters.hasChronicConditions || 
           filters.registrationDateFrom || filters.registrationDateTo;
  };

  return (
    <ProtectedRoute requiredPermission="patients_read">
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedHeader currentPage="/dashboard/pacientes" />

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Pacientes</h1>
              <p className="text-gray-700">Administra la información de todos los pacientes registrados</p>
            </div>
            <button 
              onClick={() => setShowNewModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Paciente</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Total Pacientes</div>
              <div className="text-3xl font-semibold text-gray-900">{patients.length}</div>
              <div className="text-sm text-blue-600">Registrados</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Con Alergias</div>
              <div className="text-3xl font-semibold text-gray-900">
                {patients.filter(p => p.allergies.length > 0).length}
              </div>
              <div className="text-sm text-yellow-600">Pacientes</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Condiciones Crónicas</div>
              <div className="text-3xl font-semibold text-gray-900">
                {patients.filter(p => p.chronicConditions.length > 0).length}
              </div>
              <div className="text-sm text-orange-600">Pacientes</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-700 mb-2">Tipo de Sangre O+</div>
              <div className="text-3xl font-semibold text-gray-900">
                {patients.filter(p => p.bloodType === 'O+').length}
              </div>
              <div className="text-sm text-red-600">Pacientes</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar pacientes por nombre, email o teléfono..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  onClick={() => setShowFiltersModal(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    hasActiveFilters() 
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
                >
                  <Filter className="w-4 h-4" />
                <span>
                  {hasActiveFilters() ? 'Filtros Activos' : 'Filtros'}
                </span>
                  {hasActiveFilters() && (
                  <div className="w-5 h-5 bg-white text-blue-500 rounded-full flex items-center justify-center text-xs font-medium">
                    {Object.values(filters).flat().filter(f => f).length}
                  </div>
                  )}
                </button>
              </div>
            </div>

          {/* Patients Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredPatients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paciente
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Género
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo de Sangre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Condiciones
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                              {patient.avatar ? (
                                <img className="h-10 w-10 rounded-full object-cover" src={patient.avatar} alt={patient.name} />
                              ) : (
                                <span className="text-sm font-medium text-gray-700">
                                  {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">ID: {patient.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <div className="text-sm text-gray-900 flex items-center">
                              <Mail className="w-4 h-4 mr-1 text-gray-500" />
                              {patient.email}
                            </div>
                            <div className="text-sm text-gray-900 flex items-center">
                              <Phone className="w-4 h-4 mr-1 text-gray-500" />
                              {patient.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                            {calculateAge(patient.dateOfBirth)} años
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{getGenderLabel(patient.gender)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {patient.bloodType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {patient.allergies.length > 0 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                {patient.allergies.length}
                              </span>
                            )}
                            {patient.chronicConditions.length > 0 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                <Heart className="w-3 h-3 mr-1" />
                                {patient.chronicConditions.length}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewDetails(patient)}
                              className="p-1 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEditPatient(patient)}
                              className="p-1 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() => toggleDropdown(patient.id)}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
                              >
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                              {dropdownOpen === patient.id && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                  <div className="py-1">
                                    <button
                                      onClick={() => handleDeletePatient(patient.id)}
                                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Eliminar Paciente
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No se encontraron pacientes</h3>
                <p className="text-gray-500 mt-2">
                  {searchTerm || hasActiveFilters()
                    ? 'Intenta ajustando los filtros o el término de búsqueda'
                    : 'Agrega tu primer paciente haciendo clic en "Nuevo Paciente"'}
                </p>
                {(searchTerm || hasActiveFilters()) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                      name: '',
                      email: '',
                      phone: '',
                      ageFrom: '',
                      ageTo: '',
                      gender: [],
                      bloodType: [],
                      hasAllergies: '',
                      hasChronicConditions: '',
                      registrationDateFrom: '',
                      registrationDateTo: ''
                      });
                    }}
                    className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

        {/* Modals */}
        <NewPatientModal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          onSave={handleNewPatient}
        />

        <EditPatientModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          patient={selectedPatient}
          onSave={handleSaveEdit}
        />

        <PatientDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          patient={selectedPatient}
          onEdit={handleEditPatient}
        />

        <PatientFiltersModal
          isOpen={showFiltersModal}
          onClose={() => setShowFiltersModal(false)}
        currentFilters={filters}
          onApplyFilters={handleApplyFilters}
        />
    </ProtectedRoute>
  );
} 