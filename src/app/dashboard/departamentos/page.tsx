'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Building, Users, Edit, X, Save, Activity, TrendingUp, Mail, Phone, MapPin, Calendar } from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';
import { useNotifications } from '@/contexts/NotificationContext';
import { mockDepartments } from "@/data/mockData";

interface Department {
  id: string;
  name: string;
  description?: string;
  head?: string;
  employees?: number;
  location?: string;
  budget?: number;
  established?: string;
  status?: string;
  totalStaff?: number;
  activeStaff?: number;
  patients?: number;
  appointments?: number;
  phone?: string;
  email?: string;
  schedule?: string;
  equipment?: string[];
}

interface ManagementData {
  departmentId: string;
  action: string;
  notes: string;
  timestamp: Date;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'maintenance':
      return 'Mantenimiento';
    case 'inactive':
      return 'Inactivo';
    default:
      return status;
  }
};

const NewDepartmentModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (data: Department) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: '',
    location: '',
    phone: '',
    email: '',
    schedule: '',
    budget: 0,
    equipment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const equipmentList = formData.equipment.split(',').map(item => item.trim()).filter(item => item);
    onSave({
      ...formData,
      id: `DEPT-${Date.now()}`,
      status: 'active',
      totalStaff: 0,
      activeStaff: 0,
      patients: 0,
      appointments: 0,
      equipment: equipmentList
    });
    onClose();
    setFormData({
      name: '',
      description: '',
      head: '',
      location: '',
      phone: '',
      email: '',
      schedule: '',
      budget: 0,
      equipment: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Nuevo Departamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del departamento</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Cardiología, Pediatría..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jefe de departamento</label>
              <input
                type="text"
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Dr. Juan Pérez"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
              placeholder="Descripción de los servicios del departamento..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Piso 2 - Ala Este"
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
                placeholder="+34 91 123 4567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="departamento@medgohub.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horario</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="24/7 o 08:00 - 18:00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Presupuesto anual (€)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equipamiento (separado por comas)</label>
            <input
              type="text"
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Ecocardiograma, ECG, Monitor..."
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
              Guardar Departamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DepartmentDetailsModal = ({ department, isOpen, onClose }: { department: Department | null; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Detalles del Departamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Building className="w-10 h-10 text-cyan-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">{department.name}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(department.status || 'active')}`}>
                  {getStatusText(department.status || 'active')}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-4">{department.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{department.totalStaff} personal</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4" />
                  <span>{department.patients} pacientes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>€{((department.budget || 0) / 1000).toFixed(0)}K presupuesto</span>
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
                  <span className="text-gray-700">{department.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{department.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{department.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Horario: {department.schedule}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Personal y Recursos</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Jefe de departamento:</span>
                  <p className="text-gray-700 font-medium">{department.head}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Personal total:</span>
                  <p className="text-gray-700">{department.totalStaff} empleados</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Personal activo:</span>
                  <p className="text-gray-700">{department.activeStaff} empleados</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Presupuesto anual:</span>
                  <p className="text-gray-700">€{(department.budget || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Equipamiento Principal</h4>
            <div className="flex flex-wrap gap-2">
              {(department.equipment || []).map((equipment: string, index: number) => (
                <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">
                  {equipment}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{department.activeStaff}</div>
              <div className="text-sm text-gray-600">Personal activo</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{department.patients}</div>
              <div className="text-sm text-gray-600">Pacientes actuales</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{department.appointments}</div>
              <div className="text-sm text-gray-600">Citas hoy</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-semibold text-gray-900">{(department.equipment || []).length}</div>
              <div className="text-sm text-gray-600">Equipos</div>
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

const ManageDepartmentModal = ({ department, isOpen, onClose, onSave }: { 
  department: Department | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: ManagementData) => void 
}) => {
  const [managementAction, setManagementAction] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!department) return;
    onSave({
      departmentId: department.id,
      action: managementAction,
      notes: notes,
      timestamp: new Date()
    });
    onClose();
    setManagementAction('');
    setNotes('');
  };

  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Gestionar {department.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">{department.name}</h3>
            <p className="text-gray-600">Jefe: {department.head}</p>
            <p className="text-gray-600">Personal: {department.activeStaff}/{department.totalStaff}</p>
            <p className="text-gray-600">Estado: {getStatusText(department.status || 'active')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Acción de gestión</label>
              <select
                value={managementAction}
                onChange={(e) => setManagementAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="">Seleccionar acción</option>
                <option value="change_status">Cambiar estado</option>
                <option value="update_staff">Actualizar personal</option>
                <option value="update_budget">Actualizar presupuesto</option>
                <option value="add_equipment">Agregar equipamiento</option>
                <option value="schedule_maintenance">Programar mantenimiento</option>
                <option value="assign_head">Asignar nuevo jefe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas y detalles</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                rows={4}
                placeholder="Describe los detalles de la gestión..."
                required
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
                Aplicar Gestión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function DepartamentosPage() {
  const { addNotification } = useNotifications();
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isNewDepartmentModalOpen, setIsNewDepartmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const handleNewDepartment = () => {
    setIsNewDepartmentModalOpen(true);
  };

  const handleSaveDepartment = (departmentData: Department) => {
    setDepartments(prev => [...prev, { ...departmentData, id: Date.now().toString() }]);
    addNotification({
      type: 'success',
      title: 'Departamento creado',
      message: `El departamento ${departmentData.name} ha sido creado exitosamente`
    });
  };

  const handleViewDetails = (department: Department) => {
    setSelectedDepartment(department);
    setIsDetailsModalOpen(true);
  };

  const handleManageDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setIsManageModalOpen(true);
  };

  const handleManagementAction = (managementData: ManagementData) => {
    addNotification({
      type: 'success',
      title: 'Acción registrada',
      message: `Acción "${managementData.action}" registrada para el departamento`
    });
  };

  const filteredDepartments = selectedStatus === 'all' 
    ? departments 
    : departments.filter(dept => dept.status === selectedStatus);

  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(d => d.status === 'active').length;
  const totalStaff = departments.reduce((sum, dept) => sum + (dept.totalStaff || 0), 0);
  const totalPatients = departments.reduce((sum, dept) => sum + (dept.patients || 0), 0);

  return (
    <DashboardLayout currentPage="/dashboard/departamentos">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Departamentos</h1>
          <p className="text-gray-600">Administración de departamentos médicos y especialidades</p>
        </div>
        <button 
          onClick={handleNewDepartment}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Departamento</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Total Departamentos</div>
          <div className="text-3xl font-semibold text-gray-900">{totalDepartments}</div>
          <div className="text-sm text-cyan-600">Especialidades</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Activos</div>
          <div className="text-3xl font-semibold text-gray-900">{activeDepartments}</div>
          <div className="text-sm text-green-600">Operativos</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Personal Total</div>
          <div className="text-3xl font-semibold text-gray-900">{totalStaff}</div>
          <div className="text-sm text-blue-600">Profesionales</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Pacientes</div>
          <div className="text-3xl font-semibold text-gray-900">{totalPatients}</div>
          <div className="text-sm text-purple-600">En tratamiento</div>
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
                placeholder="Buscar departamentos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Building className="w-4 h-4" />
              <span>Ubicación</span>
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
              Todos
            </button>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`px-3 py-1 text-sm rounded-lg ${
                selectedStatus === 'active' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => setSelectedStatus('maintenance')}
              className={`px-3 py-1 text-sm rounded-lg ${
                selectedStatus === 'maintenance' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mantenimiento
            </button>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(department.status || 'active')}`}>
                        {getStatusText(department.status || 'active')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{department.description}</p>
                  </div>
                </div>
              </div>

              {/* Department Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{department.activeStaff}</div>
                  <div className="text-xs text-gray-600">Personal Activo</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{department.patients}</div>
                  <div className="text-xs text-gray-600">Pacientes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{department.appointments}</div>
                  <div className="text-xs text-gray-600">Citas Hoy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    €{((department.budget || 0) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-gray-600">Presupuesto</div>
                </div>
              </div>

              {/* Department Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Jefe de Departamento:</span>
                  <span className="text-gray-900 font-medium">{department.head}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Ubicación:</span>
                  <span className="text-gray-900">{department.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Horario:</span>
                  <span className="text-gray-900">{department.schedule}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Teléfono:</span>
                  <span className="text-gray-900">{department.phone}</span>
                </div>
              </div>

              {/* Equipment */}
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">Equipamiento Principal:</div>
                <div className="flex flex-wrap gap-2">
                  {(department.equipment || []).slice(0, 3).map((equipment, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {equipment}
                    </span>
                  ))}
                  {(department.equipment || []).length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{(department.equipment || []).length - 3} más
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{department.totalStaff} personal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>{department.patients} pacientes</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleManageDepartment(department)}
                    className="px-3 py-1 text-sm text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors"
                  >
                    <Edit className="w-4 h-4 inline mr-1" />
                    Gestionar
                  </button>
                  <button 
                    onClick={() => handleViewDetails(department)}
                    className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay departamentos</h3>
          <p className="text-gray-600">
            {selectedStatus === 'all' 
              ? 'No se encontraron departamentos'
              : `No hay departamentos con estado: ${getStatusText(selectedStatus)}`
            }
          </p>
        </div>
      )}

      {/* Modals */}
      <NewDepartmentModal 
        isOpen={isNewDepartmentModalOpen}
        onClose={() => setIsNewDepartmentModalOpen(false)}
        onSave={handleSaveDepartment}
      />

      <DepartmentDetailsModal 
        department={selectedDepartment}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <ManageDepartmentModal 
        department={selectedDepartment}
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        onSave={handleManagementAction}
      />
    </DashboardLayout>
  );
} 