'use client';

import { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Stethoscope,
  Building,
  Monitor,
  CreditCard,
  Shield
} from 'lucide-react';
import { Consultation, ServiceRating } from '@/types';

interface ConsultationCardProps {
  consultation: Consultation;
  onStartVideo?: (consultation: Consultation) => void;
  onViewDetails?: (consultation: Consultation) => void;
  onEditConsultation?: (consultation: Consultation) => void;
  onCancelConsultation?: (consultationId: string) => void;
  onCompleteConsultation?: (consultationId: string) => void;
  onRateService?: (consultationId: string, rating: ServiceRating) => void;
  onViewPrescription?: (consultation: Consultation) => void;
  currentUserRole?: string;
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({
  consultation,
  onStartVideo,
  onViewDetails,
  onEditConsultation,
  onCancelConsultation,
  onCompleteConsultation,
  onRateService,
  onViewPrescription,
  currentUserRole = 'patient'
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: Consultation['status']) => {
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

  const getTypeColor = (type: Consultation['type']) => {
    switch (type) {
      case 'virtual':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'presencial':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderTypeColor = (providerType: string) => {
    switch (providerType) {
      case 'MEDICAL_CENTER':
        return 'bg-blue-100 text-blue-800';
      case 'OFFICE_SPECIALIST':
        return 'bg-green-100 text-green-800';
      case 'VIRTUAL_SPECIALIST':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Consultation['status']) => {
    switch (status) {
      case 'programada':
        return <Calendar className="w-4 h-4" />;
      case 'en-progreso':
        return <CheckCircle className="w-4 h-4" />;
      case 'completada':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelada':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusText = (status: Consultation['status']) => {
    switch (status) {
      case 'programada':
        return 'Programada';
      case 'en-progreso':
        return 'En Progreso';
      case 'completada':
        return 'Completada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  const getTypeText = (type: Consultation['type']) => {
    switch (type) {
      case 'virtual':
        return 'Virtual';
      case 'presencial':
        return 'Presencial';
      default:
        return 'Desconocido';
    }
  };

  const getProviderTypeText = (providerType: string) => {
    switch (providerType) {
      case 'MEDICAL_CENTER':
        return 'Centro Médico';
      case 'OFFICE_SPECIALIST':
        return 'Especialista Presencial';
      case 'VIRTUAL_SPECIALIST':
        return 'Especialista Virtual';
      default:
        return 'Proveedor';
    }
  };

  const canStartVideo = consultation.type === 'virtual' && 
                       consultation.status === 'programada' && 
                       consultation.virtualMeetingLink;

  const canEdit = consultation.status === 'programada' && 
                  (currentUserRole === 'doctor' || currentUserRole === 'admin');

  const canCancel = consultation.status === 'programada';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-cyan-100 rounded-lg">
            {consultation.type === 'virtual' ? (
              <Video className="w-5 h-5 text-cyan-600" />
            ) : (
              <Building className="w-5 h-5 text-cyan-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {currentUserRole === 'doctor' ? consultation.patientName : consultation.doctorName}
            </h3>
            <p className="text-sm text-gray-600">{consultation.reason}</p>
            <p className="text-sm text-gray-500">
              {consultation.scheduledDateTime ? formatDate(consultation.scheduledDateTime) : formatDate(consultation.date)} • {consultation.scheduledDateTime ? formatTime(consultation.scheduledDateTime) : consultation.time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(consultation.type)}`}>
            {consultation.type === 'virtual' ? <Monitor className="w-3 h-3" /> : <Building className="w-3 h-3" />}
            <span>{getTypeText(consultation.type)}</span>
          </span>
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>
            {getStatusIcon(consultation.status)}
            <span>{getStatusText(consultation.status)}</span>
          </span>
        </div>
      </div>

      {/* Provider Information */}
      {consultation.providerType && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Información del Proveedor</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderTypeColor(consultation.providerType)}`}>
                {getProviderTypeText(consultation.providerType)}
              </span>
              {consultation.providerId && (
                <span className="text-sm text-gray-600">ID: {consultation.providerId}</span>
              )}
            </div>
            {consultation.location && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{consultation.location}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Virtual Meeting Info */}
      {consultation.type === 'virtual' && consultation.virtualMeetingLink && (
        <div className="bg-purple-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-purple-900 mb-2">Reunión Virtual</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-800">Enlace de reunión disponible</span>
            </div>
            {canStartVideo && onStartVideo && (
              <button
                onClick={() => onStartVideo(consultation)}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
              >
                Iniciar Video
              </button>
            )}
          </div>
        </div>
      )}

      {/* Consultation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Detalles de la Consulta</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Duración:</span>
              <span className="font-medium">{consultation.duration} min</span>
            </div>
            {consultation.specialty && (
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Especialidad:</span>
                <span className="font-medium">{consultation.specialty}</span>
              </div>
            )}
            {consultation.urgency && (
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Urgencia:</span>
                <span className={`font-medium ${
                  consultation.urgency === 'high' ? 'text-red-600' :
                  consultation.urgency === 'medium' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {consultation.urgency === 'high' ? 'Alta' :
                   consultation.urgency === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Información Adicional</h4>
          <div className="space-y-2 text-sm">
            {consultation.followUpRequired && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Seguimiento requerido</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            )}
            {consultation.cost && (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Costo:</span>
                <span className="font-medium">{formatCurrency(consultation.cost)}</span>
              </div>
            )}
            {consultation.insuranceCovered && (
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Cubierto por seguro</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prescription */}
      {consultation.prescription && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Prescripción Médica</span>
          </h4>
          <div className="space-y-2">
            {consultation.prescription.slice(0, 2).map((prescription, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-blue-800">{prescription.medicationName}</span>
                <span className="text-xs text-blue-600">{prescription.dosage}</span>
              </div>
            ))}
            {consultation.prescription.length > 2 && (
              <p className="text-xs text-blue-600">
                +{consultation.prescription.length - 2} medicamentos más
              </p>
            )}
            {onViewPrescription && (
              <button
                onClick={() => onViewPrescription(consultation)}
                className="text-xs text-blue-600 hover:text-blue-700 mt-2"
              >
                Ver prescripción completa
              </button>
            )}
          </div>
        </div>
      )}

      {/* Service Rating */}
      {consultation.rating && (
        <div className="bg-yellow-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-yellow-900 mb-2">Calificación del Servicio</h4>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= consultation.rating!.rating
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-yellow-700">
              {consultation.rating.rating}/5
            </span>
          </div>
          {consultation.rating.comment && (
            <p className="text-sm text-yellow-800 mt-2">{consultation.rating.comment}</p>
          )}
        </div>
      )}

      {/* Payment Information */}
      {consultation.payment && (
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-green-900 mb-2">Información de Pago</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-800">
                Estado: {consultation.payment.status === 'completed' ? 'Pagado' : 
                        consultation.payment.status === 'pending' ? 'Pendiente' : 'Fallido'}
              </span>
            </div>
            <span className="font-medium text-green-900">
              {formatCurrency(consultation.payment.amount)}
            </span>
          </div>
        </div>
      )}

      {/* Notes */}
      {consultation.notes && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Notas</h4>
          <p className="text-sm text-gray-700">{consultation.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {consultation.cost && (
            <>
              <span className="text-sm text-gray-600">Costo:</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(consultation.cost)}
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-1 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
          >
            {showDetails ? 'Menos detalles' : 'Más detalles'}
          </button>
          
          {canStartVideo && onStartVideo && (
            <button
              onClick={() => onStartVideo(consultation)}
              className="px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Unirse
            </button>
          )}
          
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(consultation)}
              className="px-3 py-1 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Ver Detalles
            </button>
          )}
          
          {canEdit && onEditConsultation && (
            <button
              onClick={() => onEditConsultation(consultation)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Editar
            </button>
          )}
        </div>
      </div>

      {/* Extended Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">ID de Consulta:</span>
              <span className="ml-2 font-medium">{consultation.id}</span>
            </div>
            <div>
              <span className="text-gray-600">ID del Paciente:</span>
              <span className="ml-2 font-medium">{consultation.patientId}</span>
            </div>
            <div>
              <span className="text-gray-600">ID del Médico:</span>
              <span className="ml-2 font-medium">{consultation.doctorId}</span>
            </div>
            {consultation.createdAt && (
              <div>
                <span className="text-gray-600">Creada:</span>
                <span className="ml-2 font-medium">{formatDate(consultation.createdAt)}</span>
              </div>
            )}
          </div>

          {/* Additional Action Buttons */}
          <div className="flex items-center space-x-2 pt-2">
            {consultation.status === 'en-progreso' && onCompleteConsultation && (
              <button
                onClick={() => onCompleteConsultation(consultation.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <CheckCircle className="w-3 h-3" />
                <span>Completar</span>
              </button>
            )}
            
            {canCancel && onCancelConsultation && (
              <button
                onClick={() => onCancelConsultation(consultation.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <XCircle className="w-3 h-3" />
                <span>Cancelar</span>
              </button>
            )}
            
            {consultation.status === 'completada' && !consultation.rating && onRateService && (
              <button
                onClick={() => onRateService(consultation.id, { 
                  id: `rating-${consultation.id}`,
                  clientId: consultation.patientId,
                  serviceId: consultation.id,
                  serviceType: 'consultation',
                  providerId: consultation.doctorId,
                  overallRating: 5,
                  wouldRecommend: true,
                  createdAt: new Date()
                })}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
              >
                <Star className="w-3 h-3" />
                <span>Calificar</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationCard; 