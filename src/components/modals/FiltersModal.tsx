'use client';

import { useState } from 'react';
import { X, Filter, Calendar, Clock, User, Activity } from 'lucide-react';

interface FilterOptions {
  dateFrom: string;
  dateTo: string;
  status: string[];
  type: string[];
  doctor: string;
  patient: string;
  timeFrom: string;
  timeTo: string;
}

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FiltersModal = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FiltersModalProps) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const statusOptions = [
    { value: 'programada', label: 'Programada', color: 'blue' },
    { value: 'en-progreso', label: 'En Progreso', color: 'green' },
    { value: 'completada', label: 'Completada', color: 'gray' },
    { value: 'cancelada', label: 'Cancelada', color: 'red' }
  ];

  const typeOptions = [
    { value: 'presencial', label: 'Presencial', color: 'cyan' },
    { value: 'virtual', label: 'Virtual', color: 'purple' }
  ];

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setFilters({ ...filters, status: newStatus });
  };

  const handleTypeChange = (type: string) => {
    const newType = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    setFilters({ ...filters, type: newType });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateFrom: '',
      dateTo: '',
      status: [],
      type: [],
      doctor: '',
      patient: '',
      timeFrom: '',
      timeTo: ''
    };
    setFilters(resetFilters);
  };

  const hasActiveFilters = () => {
    return filters.dateFrom || filters.dateTo || filters.status.length > 0 || 
           filters.type.length > 0 || filters.doctor || filters.patient ||
           filters.timeFrom || filters.timeTo;
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
              <h2 className="text-xl font-semibold text-gray-900">Filtros Avanzados</h2>
              <p className="text-sm text-gray-600">Personaliza tu búsqueda de consultas</p>
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
          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>Rango de Fechas</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha desde
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha hasta
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Time Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>Rango de Horarios</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora desde
                </label>
                <input
                  type="time"
                  value={filters.timeFrom}
                  onChange={(e) => setFilters({ ...filters, timeFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora hasta
                </label>
                <input
                  type="time"
                  value={filters.timeTo}
                  onChange={(e) => setFilters({ ...filters, timeTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-500" />
              <span>Estado de Consulta</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => handleStatusChange(status.value)}
                  className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.status.includes(status.value)
                      ? `border-${status.color}-500 bg-${status.color}-50 text-${status.color}-700`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Tipo de Consulta</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {typeOptions.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTypeChange(type.value)}
                  className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    filters.type.includes(type.value)
                      ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Search by People */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>Búsqueda por Personas</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor
                </label>
                <input
                  type="text"
                  value={filters.doctor}
                  onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del doctor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paciente
                </label>
                <input
                  type="text"
                  value={filters.patient}
                  onChange={(e) => setFilters({ ...filters, patient: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del paciente"
                />
              </div>
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Filtros Activos:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.dateFrom && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Desde: {filters.dateFrom}
                  </span>
                )}
                {filters.dateTo && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Hasta: {filters.dateTo}
                  </span>
                )}
                {filters.status.map(status => (
                  <span key={status} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Estado: {status}
                  </span>
                ))}
                {filters.type.map(type => (
                  <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Tipo: {type}
                  </span>
                ))}
                {filters.doctor && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Doctor: {filters.doctor}
                  </span>
                )}
                {filters.patient && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Paciente: {filters.patient}
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

export default FiltersModal; 