'use client';

import { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  Shield, 
  Eye, 
  Download,
  Edit,
  Lock,
  AlertTriangle,
  Heart,
  Activity,
  Pill,
  TestTube,
  Stethoscope,
  Plus,
  History,
  Share2
} from 'lucide-react';
import { MedicalRecord, AccessLog } from '@/types';

interface MedicalRecordCardProps {
  record: MedicalRecord;
  onViewRecord?: (record: MedicalRecord) => void;
  onEditRecord?: (record: MedicalRecord) => void;
  onDownloadRecord?: (record: MedicalRecord) => void;
  onShareRecord?: (record: MedicalRecord) => void;
  onViewAccessLog?: (record: MedicalRecord) => void;
  onAddEntry?: (recordId: string) => void;
  currentUserRole?: string;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({
  record,
  onViewRecord,
  onEditRecord,
  onDownloadRecord,
  onShareRecord,
  onViewAccessLog,
  onAddEntry,
  currentUserRole = 'doctor'
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getConfidentialityColor = (level: MedicalRecord['confidentialityLevel']) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: MedicalRecord['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'restricted':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  };

  const getConfidentialityText = (level: MedicalRecord['confidentialityLevel']) => {
    switch (level) {
      case 'low':
        return 'Bajo';
      case 'medium':
        return 'Medio';
      case 'high':
        return 'Alto';
      default:
        return level;
    }
  };

  const getStatusText = (status: MedicalRecord['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'archived':
        return 'Archivado';
      case 'under_review':
        return 'En Revisión';
      case 'restricted':
        return 'Restringido';
      default:
        return status;
    }
  };

  const canAccess = (requiredLevel: string) => {
    // Simple role-based access control
    const roleHierarchy = {
      'admin': 4,
      'doctor': 3,
      'nurse': 2,
      'technician': 1,
      'viewer': 0
    };
    
    const userLevel = roleHierarchy[currentUserRole as keyof typeof roleHierarchy] || 0;
    const recordLevel = roleHierarchy[requiredLevel as keyof typeof roleHierarchy] || 0;
    
    return userLevel >= recordLevel;
  };

  const hasRestrictedAccess = record.confidentialityLevel === 'high' && !canAccess('doctor');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <FileText className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{record.patientName}</h3>
            <p className="text-sm text-gray-600">ID: {record.patientId}</p>
            <p className="text-sm text-gray-500">
              {calculateAge(record.dateOfBirth)} años • {record.bloodType}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getConfidentialityColor(record.confidentialityLevel)}`}>
            <Shield className="w-3 h-3" />
            <span>{getConfidentialityText(record.confidentialityLevel)}</span>
          </span>
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
            <Activity className="w-3 h-3" />
            <span>{getStatusText(record.status)}</span>
          </span>
        </div>
      </div>

      {/* Restricted Access Warning */}
      {hasRestrictedAccess && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-800">Acceso Restringido</span>
          </div>
          <p className="text-sm text-red-600 mt-1">
            Este expediente requiere permisos especiales para acceso completo.
          </p>
        </div>
      )}

      {/* Patient Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Información del Paciente</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Nacimiento:</span>
              <span className="font-medium">{formatDate(record.dateOfBirth)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Médico tratante:</span>
              <span className="font-medium">{record.attendingPhysician}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Última actualización:</span>
              <span className="font-medium">{formatDate(record.lastUpdate)}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Estadísticas del Expediente</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Total entradas:</span>
              <span className="font-medium">{record.totalEntries}</span>
            </div>
            {record.lastConsultation && (
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Última consulta:</span>
                <span className="font-medium">{formatDate(record.lastConsultation)}</span>
              </div>
            )}
            {record.accessLog && record.accessLog.length > 0 && (
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Último acceso:</span>
                <span className="font-medium">
                  {formatDateTime(record.accessLog[record.accessLog.length - 1].timestamp)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Medical Information */}
      {!hasRestrictedAccess && (
        <>
          {/* Allergies */}
          {record.allergies && record.allergies.length > 0 && (
            <div className="bg-red-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-red-900 mb-2 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Alergias</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {record.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full border border-red-200"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chronic Conditions */}
          {record.chronicConditions && record.chronicConditions.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-orange-900 mb-2 flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Condiciones Crónicas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {record.chronicConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full border border-orange-200"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Current Medications */}
          {record.currentMedications && record.currentMedications.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center space-x-2">
                <Pill className="w-4 h-4" />
                <span>Medicamentos Actuales</span>
              </h4>
              <div className="space-y-2">
                {record.currentMedications.map((medication, index) => (
                  <div key={index} className="text-sm text-blue-800">
                    {medication}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Medications */}
          {record.medications && record.medications.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center space-x-2">
                <Pill className="w-4 h-4" />
                <span>Medicamentos Detallados</span>
              </h4>
              <div className="space-y-2">
                {record.medications.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-blue-800">{medication.name}</span>
                    <span className="text-xs text-blue-600">{medication.dosage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Lab Results */}
          {record.recentLabResults && record.recentLabResults.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center space-x-2">
                <TestTube className="w-4 h-4" />
                <span>Resultados de Laboratorio Recientes</span>
              </h4>
              <div className="space-y-2">
                {record.recentLabResults.slice(0, 3).map((result, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-purple-800">{result.testName}</span>
                    <span className="text-xs text-purple-600">
                      {formatDate(result.date)}
                    </span>
                  </div>
                ))}
                {record.recentLabResults.length > 3 && (
                  <p className="text-xs text-purple-600">
                    +{record.recentLabResults.length - 3} resultados más
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Access Log Preview */}
      {record.accessLog && record.accessLog.length > 0 && canAccess('doctor') && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
            <History className="w-4 h-4" />
            <span>Accesos Recientes</span>
          </h4>
          <div className="space-y-1">
            {record.accessLog.slice(-3).map((log, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{log.userId}</span>
                <span className="text-gray-500">{formatDateTime(log.timestamp)}</span>
              </div>
            ))}
          </div>
          {onViewAccessLog && (
            <button
              onClick={() => onViewAccessLog(record)}
              className="text-xs text-cyan-600 hover:text-cyan-700 mt-2"
            >
              Ver historial completo
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Entradas:</span>
          <span className="font-semibold text-gray-900">{record.totalEntries}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-1 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
          >
            {showDetails ? 'Menos detalles' : 'Más detalles'}
          </button>
          
          {!hasRestrictedAccess && onViewRecord && (
            <button
              onClick={() => onViewRecord(record)}
              className="px-3 py-1 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Ver Expediente
            </button>
          )}
          
          {canAccess('doctor') && onAddEntry && (
            <button
              onClick={() => onAddEntry(record.id)}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Nueva Entrada
            </button>
          )}
        </div>
      </div>

      {/* Extended Details */}
      {showDetails && !hasRestrictedAccess && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">ID del Expediente:</span>
              <span className="ml-2 font-medium">{record.id}</span>
            </div>
            <div>
              <span className="text-gray-600">Creado:</span>
              <span className="ml-2 font-medium">{formatDate(record.createdDate)}</span>
            </div>
            {record.emergencyContact && (
              <div>
                <span className="text-gray-600">Contacto de emergencia:</span>
                <span className="ml-2 font-medium">{record.emergencyContact.name}</span>
              </div>
            )}
            {record.insuranceInfo && (
              <div>
                <span className="text-gray-600">Seguro:</span>
                <span className="ml-2 font-medium">{record.insuranceInfo.provider}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-2">
            {onEditRecord && canAccess('doctor') && (
              <button
                onClick={() => onEditRecord(record)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="w-3 h-3" />
                <span>Editar</span>
              </button>
            )}
            
            {onDownloadRecord && canAccess('doctor') && (
              <button
                onClick={() => onDownloadRecord(record)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Descargar</span>
              </button>
            )}
            
            {onShareRecord && canAccess('doctor') && (
              <button
                onClick={() => onShareRecord(record)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>Compartir</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordCard; 