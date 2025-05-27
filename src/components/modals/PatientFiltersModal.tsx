'use client';

import { useState } from 'react';
import { X, Filter, Calendar, User, Heart, Phone } from 'lucide-react';

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

interface PatientFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: PatientFilterOptions) => void;
  currentFilters: PatientFilterOptions;
}

const PatientFiltersModal = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: PatientFiltersModalProps) => {
  const [filters, setFilters] = useState<PatientFilterOptions>(currentFilters);

  const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' }
  ];

  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleGenderChange = (gender: string) => {
    const newGenders = filters.gender.includes(gender)
      ? filters.gender.filter(g => g !== gender)
      : [...filters.gender, gender];
    setFilters({ ...filters, gender: newGenders });
  };

  const handleBloodTypeChange = (bloodType: string) => {
    const newBloodTypes = filters.bloodType.includes(bloodType)
      ? filters.bloodType.filter(bt => bt !== bloodType)
      : [...filters.bloodType, bloodType];
    setFilters({ ...filters, bloodType: newBloodTypes });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: PatientFilterOptions = {
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
    };
    setFilters(resetFilters);
  };

  const hasActiveFilters = () => {
    return filters.name || filters.email || filters.phone || filters.ageFrom || 
           filters.ageTo || filters.gender.length > 0 || filters.bloodType.length > 0 ||
           filters.hasAllergies || filters.hasChronicConditions || 
           filters.registrationDateFrom || filters.registrationDateTo;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Filtros de Pacientes</h2>
              <p className="text-sm text-gray-600">Personaliza tu búsqueda de pacientes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information Search */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>Información Personal</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={filters.email}
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={filters.phone}
                  onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por teléfono"
                />
              </div>
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>Rango de Edad</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad mínima
                </label>
                <input
                  type="number"
                  value={filters.ageFrom}
                  onChange={(e) => setFilters({ ...filters, ageFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad máxima
                </label>
                <input
                  type="number"
                  value={filters.ageTo}
                  onChange={(e) => setFilters({ ...filters, ageTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="120"
                  min="0"
                  max="120"
                />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Género</h3>
            
            <div className="grid grid-cols-3 gap-3">
              {genderOptions.map((gender) => (
                <button
                  key={gender.value}
                  type="button"
                  onClick={() => handleGenderChange(gender.value)}
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.gender.includes(gender.value)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {gender.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blood Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gray-500" />
              <span>Tipo de Sangre</span>
            </h3>
            
            <div className="grid grid-cols-4 gap-3">
              {bloodTypeOptions.map((bloodType) => (
                <button
                  key={bloodType}
                  type="button"
                  onClick={() => handleBloodTypeChange(bloodType)}
                  className={`p-2 border-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.bloodType.includes(bloodType)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {bloodType}
                </button>
              ))}
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Condiciones Médicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiene Alergias
                </label>
                <select
                  value={filters.hasAllergies}
                  onChange={(e) => setFilters({ ...filters, hasAllergies: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="yes">Con alergias</option>
                  <option value="no">Sin alergias</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condiciones Crónicas
                </label>
                <select
                  value={filters.hasChronicConditions}
                  onChange={(e) => setFilters({ ...filters, hasChronicConditions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="yes">Con condiciones crónicas</option>
                  <option value="no">Sin condiciones crónicas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Registration Date Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Fecha de Registro</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registrado desde
                </label>
                <input
                  type="date"
                  value={filters.registrationDateFrom}
                  onChange={(e) => setFilters({ ...filters, registrationDateFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registrado hasta
                </label>
                <input
                  type="date"
                  value={filters.registrationDateTo}
                  onChange={(e) => setFilters({ ...filters, registrationDateTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Filtros Activos:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.name && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Nombre: {filters.name}
                  </span>
                )}
                {filters.email && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Email: {filters.email}
                  </span>
                )}
                {filters.ageFrom && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Edad ≥ {filters.ageFrom}
                  </span>
                )}
                {filters.ageTo && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Edad ≤ {filters.ageTo}
                  </span>
                )}
                {filters.gender.map(gender => (
                  <span key={gender} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Género: {gender}
                  </span>
                ))}
                {filters.bloodType.map(bloodType => (
                  <span key={bloodType} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Sangre: {bloodType}
                  </span>
                ))}
                {filters.hasAllergies && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Alergias: {filters.hasAllergies === 'yes' ? 'Sí' : 'No'}
                  </span>
                )}
                {filters.hasChronicConditions && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Crónicas: {filters.hasChronicConditions === 'yes' ? 'Sí' : 'No'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={!hasActiveFilters()}
          >
            Limpiar Filtros
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFiltersModal; 