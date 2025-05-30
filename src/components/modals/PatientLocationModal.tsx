'use client';

import { useState, useEffect } from 'react';
import { PatientLocation } from '@/types';
import { 
  X, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  Home, 
  Building, 
  Star,
  Save,
  Map
} from 'lucide-react';

interface PatientLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  locations: PatientLocation[];
  onSaveLocations: (locations: PatientLocation[]) => void;
}

const PatientLocationModal = ({ 
  isOpen, 
  onClose, 
  patientId, 
  locations,
  onSaveLocations 
}: PatientLocationModalProps) => {
  const [editingLocations, setEditingLocations] = useState<PatientLocation[]>(locations);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLocation, setEditingLocation] = useState<PatientLocation | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setEditingLocations(locations);
  }, [locations]);

  const handleAddLocation = () => {
    setEditingLocation({
      id: '',
      patientId,
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      isPrimary: false,
      city: '',
      state: '',
      postalCode: '',
      country: 'Panamá'
    });
    setShowAddForm(true);
  };

  const handleEditLocation = (location: PatientLocation) => {
    setEditingLocation({ ...location });
    setShowAddForm(true);
  };

  const handleSaveLocation = () => {
    if (!editingLocation) return;

    if (editingLocation.id) {
      // Editar ubicación existente
      setEditingLocations(prev =>
        prev.map(loc => loc.id === editingLocation.id ? editingLocation : loc)
      );
    } else {
      // Agregar nueva ubicación
      const newLocation: PatientLocation = {
        ...editingLocation,
        id: `location_${Date.now()}`
      };
      
      // Si es la primera ubicación o se marca como principal, hacer que sea principal
      const updatedLocations = editingLocations.map(loc => ({
        ...loc,
        isPrimary: newLocation.isPrimary ? false : loc.isPrimary
      }));
      
      setEditingLocations([...updatedLocations, newLocation]);
    }

    setShowAddForm(false);
    setEditingLocation(null);
  };

  const handleDeleteLocation = (locationId: string) => {
    setEditingLocations(prev => prev.filter(loc => loc.id !== locationId));
  };

  const handleSetPrimary = (locationId: string) => {
    setEditingLocations(prev =>
      prev.map(loc => ({
        ...loc,
        isPrimary: loc.id === locationId
      }))
    );
  };

  const handleSave = () => {
    onSaveLocations(editingLocations);
    onClose();
  };

  const getLocationIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('casa') || lowerName.includes('hogar')) {
      return Home;
    } else if (lowerName.includes('trabajo') || lowerName.includes('oficina')) {
      return Building;
    }
    return MapPin;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Ubicaciones del Paciente
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {!showAddForm ? (
            <div className="space-y-4">
              {/* Add Location Button */}
              <button
                onClick={handleAddLocation}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Agregar Nueva Ubicación</span>
              </button>

              {/* Existing Locations */}
              {editingLocations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay ubicaciones registradas</p>
                  <p className="text-sm">Agrega la primera ubicación del paciente</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {editingLocations.map((location) => {
                    const IconComponent = getLocationIcon(location.name);
                    return (
                      <div
                        key={location.id}
                        className={`p-4 rounded-lg border ${
                          location.isPrimary 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <IconComponent className={`w-5 h-5 mt-1 ${
                              location.isPrimary ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900">
                                  {location.name}
                                </h3>
                                {location.isPrimary && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center space-x-1">
                                    <Star className="w-3 h-3" />
                                    <span>Principal</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">
                                {location.address}
                              </p>
                              {(location.city || location.state) && (
                                <p className="text-gray-500 text-xs mt-1">
                                  {[location.city, location.state, location.country]
                                    .filter(Boolean)
                                    .join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-3">
                            {!location.isPrimary && (
                              <button
                                onClick={() => handleSetPrimary(location.id)}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Establecer como principal"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleEditLocation(location)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Editar ubicación"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLocation(location.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Eliminar ubicación"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Add/Edit Location Form */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingLocation?.id ? 'Editar Ubicación' : 'Nueva Ubicación'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingLocation(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Ubicación *
                  </label>
                  <input
                    type="text"
                    value={editingLocation?.name || ''}
                    onChange={(e) => setEditingLocation(prev => 
                      prev ? { ...prev, name: e.target.value } : null
                    )}
                    placeholder="Casa, Trabajo, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={editingLocation?.city || ''}
                    onChange={(e) => setEditingLocation(prev => 
                      prev ? { ...prev, city: e.target.value } : null
                    )}
                    placeholder="Ciudad"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Completa *
                </label>
                <textarea
                  value={editingLocation?.address || ''}
                  onChange={(e) => setEditingLocation(prev => 
                    prev ? { ...prev, address: e.target.value } : null
                  )}
                  placeholder="Dirección completa con detalles"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado/Provincia
                  </label>
                  <input
                    type="text"
                    value={editingLocation?.state || ''}
                    onChange={(e) => setEditingLocation(prev => 
                      prev ? { ...prev, state: e.target.value } : null
                    )}
                    placeholder="Estado"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    value={editingLocation?.postalCode || ''}
                    onChange={(e) => setEditingLocation(prev => 
                      prev ? { ...prev, postalCode: e.target.value } : null
                    )}
                    placeholder="00000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    value={editingLocation?.country || 'Panamá'}
                    onChange={(e) => setEditingLocation(prev => 
                      prev ? { ...prev, country: e.target.value } : null
                    )}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={editingLocation?.isPrimary || false}
                  onChange={(e) => setEditingLocation(prev => 
                    prev ? { ...prev, isPrimary: e.target.checked } : null
                  )}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPrimary" className="text-sm text-gray-700">
                  Establecer como ubicación principal
                </label>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingLocation(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveLocation}
                  disabled={!editingLocation?.name || !editingLocation?.address}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Ubicación</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showAddForm && (
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              {editingLocations.length} ubicación(es) registrada(s)
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientLocationModal; 