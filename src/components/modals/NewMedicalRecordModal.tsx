'use client';

import { useState } from 'react';
import { X, FileText, User, Heart, AlertTriangle, Calendar, Shield, Activity } from 'lucide-react';

export interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  status: 'active' | 'inactive' | 'archived';
  confidentialityLevel: 'standard' | 'high' | 'restricted';
  attendingPhysician: string;
  notes?: string;
  createdAt: Date;
  lastUpdate: Date;
}

interface NewMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'lastUpdate'>) => void;
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Desconocido'];
const relationships = ['Padre', 'Madre', 'Esposo/a', 'Hermano/a', 'Hijo/a', 'Abuelo/a', 'Tío/a', 'Primo/a', 'Amigo/a', 'Otro'];
const commonAllergies = [
  'Penicilina', 'Aspirina', 'Sulfonamidas', 'Antiinflamatorios', 'Insulina',
  'Mariscos', 'Frutos secos', 'Huevos', 'Leche', 'Soja', 'Trigo',
  'Polen', 'Ácaros', 'Pelo de animales', 'Látex', 'Metales'
];
const commonConditions = [
  'Hipertensión', 'Diabetes tipo 1', 'Diabetes tipo 2', 'Asma', 'Artritis',
  'Enfermedad cardíaca', 'Depresión', 'Ansiedad', 'Obesidad', 'Osteoporosis',
  'Cáncer', 'Epilepsia', 'Migrafas', 'Tiroides', 'Colesterol alto'
];

const NewMedicalRecordModal = ({ isOpen, onClose, onSave }: NewMedicalRecordModalProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    bloodType: '',
    status: 'active' as 'active' | 'inactive' | 'archived',
    confidentialityLevel: 'standard' as 'standard' | 'high' | 'restricted',
    attendingPhysician: '',
    notes: ''
  });

  const [allergies, setAllergies] = useState<string[]>([]);
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState('');
  const [customCondition, setCustomCondition] = useState('');
  
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  const [insurance, setInsurance] = useState({
    provider: '',
    policyNumber: '',
    groupNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addAllergy = (allergy: string) => {
    if (allergy && !allergies.includes(allergy)) {
      setAllergies(prev => [...prev, allergy]);
    }
  };

  const removeAllergy = (allergy: string) => {
    setAllergies(prev => prev.filter(a => a !== allergy));
  };

  const addCondition = (condition: string) => {
    if (condition && !chronicConditions.includes(condition)) {
      setChronicConditions(prev => [...prev, condition]);
    }
  };

  const removeCondition = (condition: string) => {
    setChronicConditions(prev => prev.filter(c => c !== condition));
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim()) {
      addAllergy(customAllergy.trim());
      setCustomAllergy('');
    }
  };

  const addCustomCondition = () => {
    if (customCondition.trim()) {
      addCondition(customCondition.trim());
      setCustomCondition('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'El nombre del paciente es requerido';
    }

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'El ID del paciente es requerido';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.dateOfBirth = 'La fecha de nacimiento debe ser anterior a hoy';
      }
    }

    if (!formData.attendingPhysician.trim()) {
      newErrors.attendingPhysician = 'El médico responsable es requerido';
    }

    if (!emergencyContact.name.trim()) {
      newErrors.emergencyContactName = 'El nombre del contacto de emergencia es requerido';
    }

    if (!emergencyContact.phone.trim()) {
      newErrors.emergencyContactPhone = 'El teléfono del contacto de emergencia es requerido';
    } else if (!/^\+?[\d\s-()]+$/.test(emergencyContact.phone)) {
      newErrors.emergencyContactPhone = 'El teléfono no es válido';
    }

    if (!insurance.provider.trim()) {
      newErrors.insuranceProvider = 'El proveedor de seguro es requerido';
    }

    if (!insurance.policyNumber.trim()) {
      newErrors.insurancePolicyNumber = 'El número de póliza es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newRecord = {
      patientName: formData.patientName,
      patientId: formData.patientId,
      dateOfBirth: new Date(formData.dateOfBirth),
      gender: formData.gender,
      bloodType: formData.bloodType || 'Desconocido',
      allergies,
      chronicConditions,
      emergencyContact,
      insurance: {
        provider: insurance.provider,
        policyNumber: insurance.policyNumber,
        groupNumber: insurance.groupNumber || undefined
      },
      status: formData.status,
      confidentialityLevel: formData.confidentialityLevel,
      attendingPhysician: formData.attendingPhysician,
      notes: formData.notes || undefined
    };

    onSave(newRecord);
    handleClose();
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      patientId: '',
      dateOfBirth: '',
      gender: 'male',
      bloodType: '',
      status: 'active',
      confidentialityLevel: 'standard',
      attendingPhysician: '',
      notes: ''
    });
    setAllergies([]);
    setChronicConditions([]);
    setCustomAllergy('');
    setCustomCondition('');
    setEmergencyContact({ name: '', relationship: '', phone: '' });
    setInsurance({ provider: '', policyNumber: '', groupNumber: '' });
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Nuevo Expediente Médico</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span>Información del Paciente</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.patientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre completo del paciente"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID del paciente *
                </label>
                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.patientId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="PAT-001"
                />
                {errors.patientId && (
                  <p className="text-red-500 text-sm mt-1">{errors.patientId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de nacimiento *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de sangre
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar tipo</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Médico responsable *
                </label>
                <input
                  type="text"
                  value={formData.attendingPhysician}
                  onChange={(e) => setFormData({ ...formData, attendingPhysician: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.attendingPhysician ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Dr. María González"
                />
                {errors.attendingPhysician && (
                  <p className="text-red-500 text-sm mt-1">{errors.attendingPhysician}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gray-600" />
              <span>Información Médica</span>
            </h3>

            {/* Allergies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alergias conocidas
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {commonAllergies.map((allergy) => (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => allergies.includes(allergy) ? removeAllergy(allergy) : addAllergy(allergy)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        allergies.includes(allergy)
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Agregar alergia personalizada"
                  />
                  <button
                    type="button"
                    onClick={addCustomAllergy}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Agregar
                  </button>
                </div>

                {allergies.length > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-red-900 mb-2">Alergias seleccionadas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full"
                        >
                          {allergy}
                          <button
                            type="button"
                            onClick={() => removeAllergy(allergy)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chronic Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condiciones crónicas
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {commonConditions.map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => chronicConditions.includes(condition) ? removeCondition(condition) : addCondition(condition)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        chronicConditions.includes(condition)
                          ? 'bg-orange-100 text-orange-800 border-orange-300'
                          : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customCondition}
                    onChange={(e) => setCustomCondition(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Agregar condición personalizada"
                  />
                  <button
                    type="button"
                    onClick={addCustomCondition}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Agregar
                  </button>
                </div>

                {chronicConditions.length > 0 && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-900 mb-2">Condiciones seleccionadas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {chronicConditions.map((condition) => (
                        <span
                          key={condition}
                          className="inline-flex items-center px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full"
                        >
                          {condition}
                          <button
                            type="button"
                            onClick={() => removeCondition(condition)}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-gray-600" />
              <span>Contacto de Emergencia</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={emergencyContact.name}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre del contacto"
                />
                {errors.emergencyContactName && (
                  <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relación
                </label>
                <select
                  value={emergencyContact.relationship}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar relación</option>
                  {relationships.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={emergencyContact.phone}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+34 600 000 000"
                />
                {errors.emergencyContactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-gray-600" />
              <span>Información del Seguro</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proveedor de seguro *
                </label>
                <input
                  type="text"
                  value={insurance.provider}
                  onChange={(e) => setInsurance({ ...insurance, provider: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.insuranceProvider ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Sanitas, Adeslas, etc."
                />
                {errors.insuranceProvider && (
                  <p className="text-red-500 text-sm mt-1">{errors.insuranceProvider}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de póliza *
                </label>
                <input
                  type="text"
                  value={insurance.policyNumber}
                  onChange={(e) => setInsurance({ ...insurance, policyNumber: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.insurancePolicyNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="POL-123456789"
                />
                {errors.insurancePolicyNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.insurancePolicyNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de grupo (opcional)
                </label>
                <input
                  type="text"
                  value={insurance.groupNumber}
                  onChange={(e) => setInsurance({ ...insurance, groupNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="GRP-001"
                />
              </div>
            </div>
          </div>

          {/* Record Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-600" />
              <span>Configuración del Expediente</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado del expediente
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de confidencialidad
                </label>
                <select
                  value={formData.confidentialityLevel}
                  onChange={(e) => setFormData({ ...formData, confidentialityLevel: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="standard">Estándar</option>
                  <option value="high">Alto</option>
                  <option value="restricted">Restringido</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas adicionales
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Información adicional sobre el paciente, historial relevante, etc."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Crear Expediente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMedicalRecordModal; 