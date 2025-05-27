'use client';

import { X, User, Mail, Phone, Shield, Calendar, Clock, Edit2, Lock, Unlock } from 'lucide-react';
import { User as UserType } from './NewUserModal';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onEdit?: (user: UserType) => void;
  onToggleStatus?: (user: UserType) => void;
}

const getRoleInfo = (roleId: string) => {
  const roleMap = {
    admin: { name: 'Administrador', color: 'bg-red-100 text-red-800', description: 'Acceso completo al sistema' },
    doctor: { name: 'Médico General', color: 'bg-blue-100 text-blue-800', description: 'Diagnóstico y tratamiento' },
    specialist: { name: 'Médico Especialista', color: 'bg-indigo-100 text-indigo-800', description: 'Consultas especializadas' },
    nurse: { name: 'Enfermero/a', color: 'bg-green-100 text-green-800', description: 'Cuidado directo de pacientes' },
    receptionist: { name: 'Recepcionista', color: 'bg-purple-100 text-purple-800', description: 'Atención al cliente' },
    financial: { name: 'Personal Financiero', color: 'bg-yellow-100 text-yellow-800', description: 'Gestión financiera' },
    pharmacist: { name: 'Farmacéutico/a', color: 'bg-cyan-100 text-cyan-800', description: 'Gestión de medicamentos' },
    lab_tech: { name: 'Técnico de Laboratorio', color: 'bg-pink-100 text-pink-800', description: 'Análisis de laboratorio' },
    security: { name: 'Seguridad', color: 'bg-gray-100 text-gray-800', description: 'Seguridad de instalaciones' },
    cleaning: { name: 'Personal de Limpieza', color: 'bg-orange-100 text-orange-800', description: 'Mantenimiento y limpieza' },
    technician: { name: 'Técnico', color: 'bg-emerald-100 text-emerald-800', description: 'Mantenimiento técnico' },
    supervisor: { name: 'Supervisor', color: 'bg-violet-100 text-violet-800', description: 'Supervisión de personal' }
  };
  return roleMap[roleId as keyof typeof roleMap] || { name: roleId, color: 'bg-gray-100 text-gray-800', description: 'Rol personalizado' };
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const UserDetailsModal = ({ isOpen, onClose, user, onEdit, onToggleStatus }: UserDetailsModalProps) => {
  if (!isOpen || !user) return null;

  const roleInfo = getRoleInfo(user.role);
  
  const handleEdit = () => {
    if (onEdit && user) {
      onEdit(user);
    }
  };

  const handleToggleStatus = () => {
    if (onToggleStatus && user) {
      onToggleStatus(user);
    }
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
              <h2 className="text-xl font-semibold text-gray-900">Perfil de Usuario</h2>
              <p className="text-sm text-gray-600">ID: {user.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
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
          {/* User Basic Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
                  <p className="text-lg text-gray-900 font-medium">{user.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Teléfono</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Estado</label>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                    {onToggleStatus && (
                      <button
                        onClick={handleToggleStatus}
                        className={`p-1 rounded transition-colors ${
                          user.status === 'active' 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.status === 'active' ? 'Desactivar usuario' : 'Activar usuario'}
                      >
                        {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha de Registro</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
                
                {user.lastLogin && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Último Acceso</label>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{formatDateTime(user.lastLogin)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Role and Permissions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Rol y Permisos</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-700">Rol Asignado</label>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color}`}>
                    {roleInfo.name}
                  </span>
                  <p className="text-blue-800">{roleInfo.description}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-blue-700">Permisos</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Resumen de Actividad</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-semibold text-green-900">28</div>
                <div className="text-sm text-green-700">Días activo</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-semibold text-green-900">156</div>
                <div className="text-sm text-green-700">Sesiones totales</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-semibold text-green-900">5.2h</div>
                <div className="text-sm text-green-700">Tiempo promedio</div>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Información de Seguridad</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-yellow-800">Autenticación de dos factores</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Desactivada</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-800">Última actualización de contraseña</span>
                <span className="text-yellow-700">Hace 45 días</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-yellow-800">Intentos de acceso fallidos</span>
                <span className="text-yellow-700">0 en los últimos 30 días</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Enviar Email
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Ver Historial
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Reiniciar Contraseña
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Ver Sesiones
              </button>
            </div>
          </div>
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Editar Usuario</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal; 