'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Calendar, Clock, User, Eye, Edit, X, Save } from "lucide-react";
import { mockDoctors, mockPatients, mockAppointments } from "@/data/mockData";
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useNotifications } from '@/contexts/NotificationContext';
import { Appointment } from '@/types';

const getPatientById = (id: string) => {
  return mockPatients.find(patient => patient.id === id);
};

const getDoctorById = (id: string) => {
  return mockDoctors.find(doctor => doctor.id === id);
};

const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'in-progress':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'scheduled':
      return 'Programada';
    case 'cancelled':
      return 'Cancelada';
    case 'completed':
      return 'Completada';
    case 'in-progress':
      return 'En Progreso';
    default:
      return status;
  }
};

// Modal Components
const NewAppointmentModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: Appointment) => void }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    type: 'consultation',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: `APP-${Date.now()}`,
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      date: new Date(formData.date),
      time: formData.time,
      reason: formData.reason,
      status: 'scheduled',
      type: formData.type as 'consultation' | 'follow-up' | 'emergency',
      notes: formData.notes
    };
    onSave(newAppointment);
    onClose();
    setFormData({
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      reason: '',
      type: 'consultation',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Nueva Cita Médica</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="">Seleccionar paciente</option>
                {mockPatients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Médico</label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="">Seleccionar médico</option>
                {mockDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cita</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="consultation">Consulta</option>
              <option value="follow-up">Seguimiento</option>
              <option value="emergency">Emergencia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de la consulta</label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Ej: Dolor de cabeza, control rutinario..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
              placeholder="Información adicional..."
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Guardar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AppointmentDetailsModal = ({ appointment, isOpen, onClose }: { 
  appointment: Appointment | null; 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  if (!isOpen || !appointment) return null;

  const patient = getPatientById(appointment.patientId);
  const doctor = getDoctorById(appointment.doctorId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Detalles de la Cita</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Paciente</h3>
              <div className="space-y-2">
                <p><strong>Nombre:</strong> {patient?.name}</p>
                <p><strong>Email:</strong> {patient?.email}</p>
                <p><strong>Teléfono:</strong> {patient?.phone}</p>
                <p><strong>Tipo de sangre:</strong> {patient?.bloodType}</p>
                {patient?.allergies && patient.allergies.length > 0 && (
                  <p><strong>Alergias:</strong> {patient.allergies.join(', ')}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Médico</h3>
              <div className="space-y-2">
                <p><strong>Nombre:</strong> {doctor?.name}</p>
                <p><strong>Especialidad:</strong> {doctor?.specialty}</p>
                <p><strong>Email:</strong> {doctor?.email}</p>
                <p><strong>Teléfono:</strong> {doctor?.phone}</p>
                <p><strong>Calificación:</strong> {doctor?.rating}/5 ⭐</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles de la Cita</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>ID de Cita:</strong> {appointment.id}</p>
              <p><strong>Estado:</strong> 
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </p>
              <p><strong>Fecha:</strong> {formatDate(appointment.date)}</p>
              <p><strong>Hora:</strong> {appointment.time}</p>
              <p><strong>Tipo:</strong> {appointment.type}</p>
              <p><strong>Motivo:</strong> {appointment.reason}</p>
            </div>
            {appointment.notes && (
              <div className="mt-4">
                <p><strong>Notas:</strong></p>
                <p className="mt-1 text-gray-600">{appointment.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function VisitasPage() {
  const { addNotification } = useNotifications();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleNewAppointment = () => {
    setShowNewAppointmentModal(true);
  };

  const handleSaveAppointment = (appointmentData: Appointment) => {
    setAppointments([...appointments, appointmentData]);
    addNotification({
      type: 'success',
      title: 'Cita creada',
      message: 'La nueva cita ha sido programada exitosamente'
    });
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleEditAppointment = (appointmentId: string) => {
    addNotification({
      type: 'info',
      title: 'Editar cita',
      message: `Función de edición para cita ${appointmentId} en desarrollo`
    });
  };

  const handleConfirmAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'confirmed' as const }
        : apt
    ));
    addNotification({
      type: 'success',
      title: 'Cita confirmada',
      message: 'La cita ha sido confirmada exitosamente'
    });
  };

  const handleStartConsultation = (appointmentId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'in-progress' as const }
        : apt
    ));
    addNotification({
      type: 'info',
      title: 'Consulta iniciada',
      message: 'La consulta médica ha comenzado'
    });
  };

  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    return appointmentDate.toDateString() === today.toDateString();
  });

  const filteredAppointments = selectedStatus === 'all' 
    ? todayAppointments 
    : todayAppointments.filter(appointment => appointment.status === selectedStatus);

  const totalAppointments = todayAppointments.length;
  const confirmedAppointments = todayAppointments.filter(a => a.status === 'confirmed').length;
  const scheduledAppointments = todayAppointments.filter(a => a.status === 'scheduled').length;
  const completedAppointments = todayAppointments.filter(a => a.status === 'completed').length;

  return (
    <ProtectedRoute requiredPermission="appointments_manage">
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedHeader currentPage="/dashboard/visitas" />

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Visitas</h1>
              <p className="text-gray-600">Administración de citas y consultas médicas programadas</p>
            </div>
            <button 
              onClick={handleNewAppointment}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Cita</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Total Citas Hoy</div>
              <div className="text-3xl font-semibold text-gray-900">{totalAppointments}</div>
              <div className="text-sm text-cyan-600">Programadas</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Confirmadas</div>
              <div className="text-3xl font-semibold text-gray-900">{confirmedAppointments}</div>
              <div className="text-sm text-green-600">Listas</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Programadas</div>
              <div className="text-3xl font-semibold text-gray-900">{scheduledAppointments}</div>
              <div className="text-sm text-yellow-600">Por confirmar</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Completadas</div>
              <div className="text-3xl font-semibold text-gray-900">{completedAppointments}</div>
              <div className="text-sm text-blue-600">Finalizadas</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar citas por paciente o médico..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filtros</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Calendar className="w-4 h-4" />
                  <span>Fecha</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedStatus('all')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedStatus === 'all' 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setSelectedStatus('confirmed')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedStatus === 'confirmed' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Confirmadas
                </button>
                <button
                  onClick={() => setSelectedStatus('scheduled')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedStatus === 'scheduled' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Programadas
                </button>
                <button
                  onClick={() => setSelectedStatus('completed')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedStatus === 'completed' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Completadas
                </button>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Citas de Hoy</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => {
                  const patient = getPatientById(appointment.patientId);
                  const doctor = getDoctorById(appointment.doctorId);

                  return (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-cyan-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">
                                Cita #{appointment.id}
                              </h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  Paciente: {patient?.name || 'Desconocido'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Eye className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {doctor?.name || 'Desconocido'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {appointment.time} - {formatDate(appointment.date)}
                                </span>
                              </div>
                            </div>

                            <div className="text-sm text-gray-600">
                              <strong>Tipo:</strong> {appointment.type} | 
                              <strong> Motivo:</strong> {appointment.reason || 'Consulta general'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {appointment.status === 'scheduled' && (
                            <button 
                              onClick={() => handleConfirmAppointment(appointment.id)}
                              className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                            >
                              Confirmar
                            </button>
                          )}
                          {appointment.status === 'confirmed' && (
                            <button 
                              onClick={() => handleStartConsultation(appointment.id)}
                              className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              Iniciar Consulta
                            </button>
                          )}
                          <button 
                            onClick={() => handleViewDetails(appointment)}
                            className="px-3 py-1 text-sm text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
                          >
                            Ver Detalles
                          </button>
                          <button 
                            onClick={() => handleEditAppointment(appointment.id)}
                            className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Edit className="w-4 h-4 inline mr-1" />
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas</h3>
                    <p className="text-gray-600">
                      {selectedStatus === 'all' 
                        ? 'No hay citas programadas para hoy'
                        : `No hay citas ${getStatusText(selectedStatus)} para hoy`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <NewAppointmentModal 
          isOpen={showNewAppointmentModal}
          onClose={() => setShowNewAppointmentModal(false)}
          onSave={handleSaveAppointment}
        />

        <AppointmentDetailsModal 
          appointment={selectedAppointment}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        />
      </div>
    </ProtectedRoute>
  );
} 