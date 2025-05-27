'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Calendar, Clock, Mail, Phone, MapPin, Star, Stethoscope, User, X, Save, Edit, Eye, MoreHorizontal, Activity, TrendingUp } from "lucide-react";
import { mockDoctors } from "@/data/mockData";
import DashboardLayout from '@/components/DashboardLayout';
import { useNotifications } from '@/contexts/NotificationContext';
import { Doctor } from '@/types';

interface LocalDoctor extends Doctor {
  location?: string;
  education?: string;
  certifications?: string[];
  patients?: number;
}

interface AppointmentFormData {
  date: string;
  time: string;
  reason: string;
  notes: string;
  doctorId?: string;
  doctorName?: string;
  specialty?: string;
}

const getAvailabilityColor = (isAvailable: boolean) => {
  return isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

const getExperienceLevel = (experience: number) => {
  if (experience >= 20) return { level: 'Senior', color: 'bg-purple-100 text-purple-800' };
  if (experience >= 10) return { level: 'Especialista', color: 'bg-blue-100 text-blue-800' };
  if (experience >= 5) return { level: 'Intermedio', color: 'bg-green-100 text-green-800' };
  return { level: 'Junior', color: 'bg-yellow-100 text-yellow-800' };
};

const formatSchedule = (availableFrom?: string, availableTo?: string) => {
  if (!availableFrom || !availableTo) return 'No definido';
  return `${availableFrom} - ${availableTo}`;
};

// Modal Components
const NewDoctorModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: LocalDoctor) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    experience: 0,
    consultationFee: 0,
    availableFrom: '',
    availableTo: '',
    education: '',
    certifications: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const certificationsList = formData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert);
    const newDoctor: LocalDoctor = {
      ...formData,
      id: `DOC-${Date.now()}`,
      rating: 4.0,
      isOnline: true,
      certifications: certificationsList,
      patients: 0
    };
    onSave(newDoctor);
    onClose();
    setFormData({
      name: '',
      specialty: '',
      email: '',
      phone: '',
      experience: 0,
      consultationFee: 0,
      availableFrom: '',
      availableTo: '',
      education: '',
      certifications: '',
      location: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Nuevo Médico</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Dr. Juan Pérez"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Cardiología, Pediatría..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="doctor@medgohub.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="+34 600 123 456"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Años de experiencia</label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa consulta (€)</label>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Consulta 201, Planta 2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horario disponible desde</label>
              <input
                type="time"
                value={formData.availableFrom}
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horario disponible hasta</label>
              <input
                type="time"
                value={formData.availableTo}
                onChange={(e) => setFormData({ ...formData, availableTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Formación académica</label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Universidad de Medicina, Especialización..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificaciones (separadas por comas)</label>
            <input
              type="text"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Certificación A, Certificación B..."
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
              Guardar Médico
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DoctorProfileModal = ({ doctor, isOpen, onClose }: { doctor: LocalDoctor | null; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !doctor) return null;

  const experienceInfo = getExperienceLevel(doctor.experience || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Perfil del Médico</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-cyan-100 rounded-lg flex items-center justify-center">
              <User className="w-12 h-12 text-cyan-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">{doctor.name}</h3>
                <div className={`w-3 h-3 rounded-full ${doctor.isOnline ? 'bg-green-400' : 'bg-gray-300'}`}></div>
              </div>
              <p className="text-lg text-gray-600 mb-2">{doctor.specialty}</p>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(doctor.isOnline || false)}`}>
                  {doctor.isOnline ? 'Disponible' : 'Ocupado'}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${experienceInfo.color}`}>
                  {experienceInfo.level}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{doctor.rating}/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{doctor.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{doctor.phone}</span>
                </div>
                {doctor.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{doctor.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    Horario: {formatSchedule(doctor.availableFrom, doctor.availableTo)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Información Profesional</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Experiencia:</span>
                  <p className="text-gray-700">{doctor.experience} años</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tarifa de consulta:</span>
                  <p className="text-gray-700">€{doctor.consultationFee}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Pacientes atendidos:</span>
                  <p className="text-gray-700">{doctor.patients || 0} pacientes</p>
                </div>
              </div>
            </div>
          </div>

          {doctor.education && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Formación Académica</h4>
              <p className="text-gray-700">{doctor.education}</p>
            </div>
          )}

          {doctor.certifications && doctor.certifications.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Certificaciones</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.certifications.map((cert: string, index: number) => (
                  <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{doctor.rating}</div>
              <div className="text-sm text-gray-600">Calificación promedio</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{doctor.experience}</div>
              <div className="text-sm text-gray-600">Años de experiencia</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{doctor.patients || 0}</div>
              <div className="text-sm text-gray-600">Pacientes atendidos</div>
            </div>
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

const ScheduleAppointmentModal = ({ doctor, isOpen, onClose, onSchedule }: { doctor: LocalDoctor | null; isOpen: boolean; onClose: () => void; onSchedule: (data: AppointmentFormData) => void }) => {
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      ...appointmentData,
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      specialty: doctor?.specialty,
      notes: appointmentData.notes
    });
    onClose();
    setAppointmentData({
      date: '',
      time: '',
      reason: '',
      notes: ''
    });
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Programar Cita con {doctor.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <p className="text-gray-600">Tarifa: €{doctor.consultationFee}</p>
            <p className="text-gray-600">Horario: {formatSchedule(doctor.availableFrom, doctor.availableTo)}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                <input
                  type="time"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  min={doctor.availableFrom}
                  max={doctor.availableTo}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de la consulta</label>
              <textarea
                value={appointmentData.reason}
                onChange={(e) => setAppointmentData({ ...appointmentData, reason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={3}
                placeholder="Describe el motivo de tu consulta..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas adicionales</label>
              <textarea
                value={appointmentData.notes}
                onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={3}
                placeholder="Añade cualquier nota relevante..."
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
                <Calendar className="w-4 h-4 inline mr-2" />
                Programar Cita
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function MedicosPage() {
  const { addNotification } = useNotifications();
  const [doctors, setDoctors] = useState(mockDoctors);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isNewDoctorModalOpen, setIsNewDoctorModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<LocalDoctor | null>(null);
  const [isDoctorDetailsModalOpen, setIsDoctorDetailsModalOpen] = useState(false);
  const [isEditDoctorModalOpen, setIsEditDoctorModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const handleNewDoctor = () => {
    setIsNewDoctorModalOpen(true);
  };

  const handleSaveDoctor = (doctorData: any) => {
    setDoctors(prev => [...prev, { ...doctorData, id: Date.now().toString() }]);
    addNotification({
      type: 'success',
      title: 'Médico registrado',
      message: `Dr. ${doctorData.name} ha sido registrado exitosamente`
    });
  };

  const handleViewDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsDoctorDetailsModalOpen(true);
  };

  const handleEditDoctor = (doctor: LocalDoctor) => {
    setSelectedDoctor(doctor);
    setIsEditDoctorModalOpen(true);
  };

  const handleUpdateDoctor = (updatedDoctor: LocalDoctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
    setIsEditDoctorModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleScheduleAppointment = (doctor: LocalDoctor) => {
    setSelectedDoctor(doctor);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleSubmit = (appointmentData: AppointmentFormData) => {
    // Here you would typically save the appointment to your backend
    console.log('Scheduling appointment:', appointmentData);
    setIsScheduleModalOpen(false);
    setSelectedDoctor(null);
    // You could show a success message here
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'available' && (doctor.isOnline || false)) ||
      (selectedStatus === 'busy' && !(doctor.isOnline || false));
    return matchesSpecialty && matchesStatus;
  });

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter(doctor => doctor.isOnline || false).length;
  const averageRating = totalDoctors > 0 ? (doctors.reduce((sum, doctor) => sum + (doctor.rating || 0), 0) / totalDoctors).toFixed(1) : '0';
  const averageExperience = totalDoctors > 0 ? Math.round(doctors.reduce((sum, doctor) => sum + (doctor.experience || 0), 0) / totalDoctors) : 0;

  return (
    <DashboardLayout currentPage="/dashboard/medicos">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Médicos</h1>
          <p className="text-gray-600">Administración del personal médico y especialistas</p>
        </div>
        <button 
          onClick={handleNewDoctor}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Médico</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Total Médicos</div>
          <div className="text-3xl font-semibold text-gray-900">{totalDoctors}</div>
          <div className="text-sm text-cyan-600">Registrados</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Disponibles</div>
          <div className="text-3xl font-semibold text-gray-900">{availableDoctors}</div>
          <div className="text-sm text-green-600">En línea</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Calificación Media</div>
          <div className="text-3xl font-semibold text-gray-900">{averageRating}</div>
          <div className="text-sm text-yellow-600">Estrellas</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Experiencia Media</div>
          <div className="text-3xl font-semibold text-gray-900">{averageExperience}</div>
          <div className="text-sm text-purple-600">Años</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar médicos por nombre o especialidad..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>Horarios</span>
            </button>
          </div>
          
          {/* Specialty and Status Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Especialidad:</span>
              <button
                onClick={() => setSelectedSpecialty('all')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedSpecialty === 'all' 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              {specialties.slice(0, 4).map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    selectedSpecialty === specialty 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Estado:</span>
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedStatus === 'all' 
                    ? 'bg-gray-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedStatus('available')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedStatus === 'available' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Disponibles
              </button>
              <button
                onClick={() => setSelectedStatus('busy')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedStatus === 'busy' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ocupados
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => {
          const experienceInfo = getExperienceLevel(doctor.experience || 0);
          
          return (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <User className="w-8 h-8 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${doctor.isOnline ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(doctor.isOnline || false)}`}>
                          {doctor.isOnline ? 'Disponible' : 'Ocupado'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${experienceInfo.color}`}>
                          {experienceInfo.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating and Experience */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold text-gray-900">{doctor.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600">Calificación</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{doctor.experience}</div>
                    <div className="text-xs text-gray-600">Años exp.</div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{doctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Horario: {formatSchedule(doctor.availableFrom, doctor.availableTo)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Stethoscope className="w-4 h-4" />
                    <span>€{doctor.consultationFee}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {doctor.isOnline && (
                      <button 
                        onClick={() => handleScheduleAppointment(doctor)}
                        className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        Programar Cita
                      </button>
                    )}
                    <button 
                      onClick={() => handleViewDoctor(doctor)}
                      className="px-3 py-1 text-sm text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
                    >
                      Ver Perfil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron médicos</h3>
          <p className="text-gray-600">
            No hay médicos que coincidan con los filtros seleccionados
          </p>
        </div>
      )}

      {/* Modals */}
      <NewDoctorModal 
        isOpen={isNewDoctorModalOpen}
        onClose={() => setIsNewDoctorModalOpen(false)}
        onSave={handleSaveDoctor}
      />

      <DoctorProfileModal 
        doctor={selectedDoctor}
        isOpen={isDoctorDetailsModalOpen}
        onClose={() => setIsDoctorDetailsModalOpen(false)}
      />

      <ScheduleAppointmentModal 
        doctor={selectedDoctor}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleSubmit}
      />
    </DashboardLayout>
  );
} 