'use client';

import { X, User, Phone, Mail, Calendar, Heart, AlertTriangle, Activity, Edit, FileText, BookOpen, PlusCircle } from 'lucide-react';
import { Patient } from '@/types';

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onEdit?: (patient: Patient) => void;
}

const PatientDetailsModal = ({ 
  isOpen, 
  onClose, 
  patient, 
  onEdit 
}: PatientDetailsModalProps) => {
  if (!isOpen || !patient) return null;

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
      weekday: 'long',
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

  const handleEdit = () => {
    if (onEdit) {
      onEdit(patient);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Información del Paciente</h2>
              <p className="text-sm text-gray-600">ID: {patient.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
              >
                Editar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Photo and Basic Info */}
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              {patient.avatar ? (
                <img 
                  src={patient.avatar} 
                  alt={patient.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-700">
                  {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{patient.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Edad:</span>
                    <p className="font-medium text-gray-900">{calculateAge(patient.dateOfBirth)} años</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600">Género:</span>
                    <p className="font-medium text-gray-900">{getGenderLabel(patient.gender)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <div>
                    <span className="text-sm text-gray-600">Tipo de Sangre:</span>
                    <p className="font-medium text-red-700">{patient.bloodType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>Información de Contacto</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Teléfono
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{patient.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{patient.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>Información Personal</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Fecha de Nacimiento
                </label>
                <p className="text-gray-900">{formatDate(patient.dateOfBirth)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Edad
                </label>
                <p className="text-gray-900">{calculateAge(patient.dateOfBirth)} años</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Género
                </label>
                <p className="text-gray-900">{getGenderLabel(patient.gender)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tipo de Sangre
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {patient.bloodType}
                </span>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Allergies */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span>Alergias</span>
              </h4>
              
              {patient.allergies.length > 0 ? (
                <div className="space-y-2">
                  {patient.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span className="text-yellow-900">{allergy}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-yellow-700 italic">No se registran alergias conocidas</p>
              )}
            </div>

            {/* Chronic Conditions */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-orange-600" />
                <span>Condiciones Crónicas</span>
              </h4>
              
              {patient.chronicConditions.length > 0 ? (
                <div className="space-y-2">
                  {patient.chronicConditions.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-orange-900">{condition}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-orange-700 italic">No se registran condiciones crónicas</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Acciones Rápidas</span>
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Historial Médico</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                <PlusCircle className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Nueva Consulta</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Recetas</span>
              </button>
              
              <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                <Edit className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-blue-900">Editar Datos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal; 