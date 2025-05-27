'use client';

import { X, Users, Video, Calendar, Clock, User, FileText, Activity, Edit2 } from 'lucide-react';
import { Consultation } from '@/types';

interface ConsultationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: Consultation | null;
  onEdit?: (consultation: Consultation) => void;
}

const ConsultationDetailsModal = ({ 
  isOpen, 
  onClose, 
  consultation, 
  onEdit 
}: ConsultationDetailsModalProps) => {
  if (!isOpen || !consultation) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'programada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'en-progreso':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completada':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'virtual':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'presencial':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(consultation);
    }
    onClose();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              {consultation.type === 'virtual' ? (
                <Video className="w-6 h-6 text-cyan-600" />
              ) : (
                <Users className="w-6 h-6 text-cyan-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Detalles de la Consulta</h2>
              <p className="text-sm text-gray-600">ID: {consultation.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                title="Editar consulta"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Type */}
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(consultation.status)}`}>
              {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getTypeColor(consultation.type)}`}>
              {consultation.type.charAt(0).toUpperCase() + consultation.type.slice(1)}
            </span>
          </div>

          {/* Patient and Doctor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Paciente</h3>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Nombre:</span>
                  <p className="text-gray-900">{consultation.patientName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">ID:</span>
                  <p className="text-gray-900 text-sm font-mono">{consultation.patientId}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Doctor</h3>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">Nombre:</span>
                  <p className="text-gray-900">{consultation.doctorName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">ID:</span>
                  <p className="text-gray-900 text-sm font-mono">{consultation.doctorId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Programación</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Fecha:</span>
                <p className="text-gray-900">{formatDate(consultation.date)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Hora:</span>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{consultation.time}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Duración:</span>
                <p className="text-gray-900">{consultation.duration} minutos</p>
              </div>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Detalles de la Consulta</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Motivo:</span>
                <p className="text-gray-900 mt-1">{consultation.reason}</p>
              </div>
              
              {consultation.notes && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Notas:</span>
                  <p className="text-gray-900 mt-1">{consultation.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Prescription */}
          {consultation.prescription && consultation.prescription.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Prescripción</h3>
              </div>
              
              <div className="space-y-3">
                {consultation.prescription.map((prescription) => (
                  <div key={prescription.id} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Medicamento:</span>
                        <p className="text-gray-900">{prescription.medicationName}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Dosis:</span>
                        <p className="text-gray-900">{prescription.dosage}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Frecuencia:</span>
                        <p className="text-gray-900">{prescription.frequency}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Duración:</span>
                        <p className="text-gray-900">{prescription.duration}</p>
                      </div>
                    </div>
                    {prescription.instructions && (
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-600">Instrucciones:</span>
                        <p className="text-gray-900 text-sm">{prescription.instructions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {consultation.type === 'virtual' && consultation.status === 'programada' && (
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-purple-900">Consulta Virtual</h4>
                  <p className="text-purple-700 text-sm">La consulta está programada para realizarse virtualmente</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Iniciar Videollamada
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cerrar
          </button>
          {onEdit && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Editar Consulta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetailsModal; 