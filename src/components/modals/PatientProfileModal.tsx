'use client';

import { useState } from 'react';
import { Patient, PatientLocation } from '@/types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Heart, 
  Weight, 
  Ruler, 
  Droplets, 
  AlertTriangle,
  Shield,
  Clock,
  Plus,
  Edit3,
  Save
} from 'lucide-react';

interface PatientProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onSave?: (patient: Patient) => void;
  isEditable?: boolean;
}

const PatientProfileModal = ({ 
  isOpen, 
  onClose, 
  patient, 
  onSave, 
  isEditable = false 
}: PatientProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Patient | null>(null);

  if (!isOpen || !patient) return null;

  const handleEdit = () => {
    setEditData({ ...patient });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData && onSave) {
      onSave(editData);
    }
    setIsEditing(false);
    setEditData(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

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

  const currentData = isEditing ? editData : patient;

  const InfoCard = ({ icon: Icon, label, value, className = "" }: {
    icon: React.ElementType;
    label: string;
    value: string | number | undefined;
    className?: string;
  }) => (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <div className="text-lg font-semibold text-gray-900">
        {value || 'No especificado'}
      </div>
    </div>
  );

  const EditableField = ({ 
    label, 
    value, 
    onChange, 
    type = "text",
    placeholder 
  }: {
    label: string;
    value: any;
    onChange: (value: any) => void;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              {currentData?.avatar ? (
                <img 
                  src={currentData.avatar} 
                  alt={currentData.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {isEditing ? 'Editar Perfil del Paciente' : 'Perfil del Paciente'}
              </h2>
              <p className="text-blue-100">
                {currentData?.name} - {calculateAge(currentData?.dateOfBirth || new Date())} años
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditable && !isEditing && (
              <button
                onClick={handleEdit}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <Edit3 className="w-5 h-5 text-white" />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isEditing ? (
            /* Modo Edición */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditableField
                  label="Nombre"
                  value={editData?.name}
                  onChange={(value) => setEditData(prev => prev ? {...prev, name: value} : null)}
                  placeholder="Nombre completo"
                />
                <EditableField
                  label="Email"
                  value={editData?.email}
                  onChange={(value) => setEditData(prev => prev ? {...prev, email: value} : null)}
                  type="email"
                  placeholder="email@ejemplo.com"
                />
                <EditableField
                  label="Teléfono"
                  value={editData?.phone}
                  onChange={(value) => setEditData(prev => prev ? {...prev, phone: value} : null)}
                  type="tel"
                  placeholder="+507 XXXX-XXXX"
                />
                <EditableField
                  label="Tipo de Sangre"
                  value={editData?.bloodType}
                  onChange={(value) => setEditData(prev => prev ? {...prev, bloodType: value} : null)}
                  placeholder="O+, A+, B+, AB+, etc."
                />
                <EditableField
                  label="Peso (kg)"
                  value={editData?.weight}
                  onChange={(value) => setEditData(prev => prev ? {...prev, weight: parseFloat(value)} : null)}
                  type="number"
                  placeholder="75"
                />
                <EditableField
                  label="Altura (cm)"
                  value={editData?.height}
                  onChange={(value) => setEditData(prev => prev ? {...prev, height: parseFloat(value)} : null)}
                  type="number"
                  placeholder="175"
                />
              </div>
            </div>
          ) : (
            /* Modo Visualización */
            <div className="space-y-8">
              {/* Información Básica */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard 
                    icon={Mail} 
                    label="Email" 
                    value={currentData?.email} 
                  />
                  <InfoCard 
                    icon={Phone} 
                    label="Teléfono" 
                    value={currentData?.phone} 
                  />
                  <InfoCard 
                    icon={Calendar} 
                    label="Fecha de Nacimiento" 
                    value={currentData?.dateOfBirth ? formatDate(currentData.dateOfBirth) : undefined} 
                  />
                </div>
              </div>

              {/* Información Médica */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Información Médica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard 
                    icon={Droplets} 
                    label="Tipo de Sangre" 
                    value={currentData?.bloodType}
                    className="bg-red-50" 
                  />
                  <InfoCard 
                    icon={Weight} 
                    label="Peso" 
                    value={currentData?.weight ? `${currentData.weight} kg` : undefined}
                    className="bg-green-50" 
                  />
                  <InfoCard 
                    icon={Ruler} 
                    label="Altura" 
                    value={currentData?.height ? `${currentData.height} cm` : undefined}
                    className="bg-blue-50" 
                  />
                </div>
              </div>

              {/* Alergias y Condiciones */}
              {(currentData?.allergies?.length || currentData?.chronicConditions?.length) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Condiciones Médicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentData?.allergies?.length > 0 && (
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-2">Alergias</h4>
                        <ul className="space-y-1">
                          {currentData.allergies.map((allergy, index) => (
                            <li key={index} className="text-yellow-700 text-sm">• {allergy}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {currentData?.chronicConditions?.length > 0 && (
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Condiciones Crónicas</h4>
                        <ul className="space-y-1">
                          {currentData.chronicConditions.map((condition, index) => (
                            <li key={index} className="text-orange-700 text-sm">• {condition}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ubicaciones */}
              {currentData?.locations && currentData.locations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Ubicaciones
                  </h3>
                  <div className="space-y-3">
                    {currentData.locations.map((location, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{location.name}</h4>
                            {location.isPrimary && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Principal
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{location.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contacto de Emergencia */}
              {currentData?.emergencyContact && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Contacto de Emergencia
                  </h3>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-red-800">Nombre</span>
                        <p className="text-red-700">{currentData.emergencyContact.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-red-800">Teléfono</span>
                        <p className="text-red-700">{currentData.emergencyContact.phone}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-red-800">Relación</span>
                        <p className="text-red-700">{currentData.emergencyContact.relationship}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Información del Seguro */}
              {currentData?.insuranceInfo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Información del Seguro
                  </h3>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-green-800">Proveedor</span>
                        <p className="text-green-700">{currentData.insuranceInfo.provider}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-green-800">Número de Póliza</span>
                        <p className="text-green-700">{currentData.insuranceInfo.policyNumber}</p>
                      </div>
                      {currentData.insuranceInfo.groupNumber && (
                        <div>
                          <span className="text-sm font-medium text-green-800">Número de Grupo</span>
                          <p className="text-green-700">{currentData.insuranceInfo.groupNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {currentData?.registrationDate && (
              <span>Registrado: {formatDate(currentData.registrationDate)}</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileModal; 