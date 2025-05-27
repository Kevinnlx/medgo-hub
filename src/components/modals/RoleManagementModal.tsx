'use client';

import { useState } from 'react';
import { X, Shield, Users, Settings, Plus, Edit2, Trash2, Eye } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
}

interface RoleManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (roles: Role[]) => void;
}

const defaultRoles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acceso completo al sistema y gestión general",
    permissions: ["all"],
    userCount: 1,
    color: "bg-red-100 text-red-800"
  },
  {
    id: "doctor",
    name: "Médico General",
    description: "Diagnóstico, tratamiento y gestión de pacientes",
    permissions: ["patients_read", "appointments_manage", "medical_records", "prescriptions"],
    userCount: 1,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "specialist",
    name: "Médico Especialista",
    description: "Consultas especializadas y procedimientos específicos",
    permissions: ["patients_read", "appointments_manage", "medical_records", "consultations"],
    userCount: 1,
    color: "bg-indigo-100 text-indigo-800"
  },
  {
    id: "nurse",
    name: "Enfermero/a",
    description: "Cuidado directo de pacientes y asistencia médica",
    permissions: ["patients_read", "medical_records", "vitals_manage"],
    userCount: 1,
    color: "bg-green-100 text-green-800"
  },
  {
    id: "receptionist",
    name: "Recepcionista",
    description: "Atención al cliente y gestión de citas",
    permissions: ["appointments_manage", "patients_read", "billing_basic"],
    userCount: 1,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "financial",
    name: "Personal Financiero",
    description: "Gestión de facturación, pagos y finanzas",
    permissions: ["billing_manage", "financial_reports", "payments"],
    userCount: 1,
    color: "bg-yellow-100 text-yellow-800"
  }
];

const allPermissions = [
  { id: "all", name: "Acceso Total", category: "Sistema" },
  { id: "patients_read", name: "Ver Pacientes", category: "Pacientes" },
  { id: "patients_write", name: "Editar Pacientes", category: "Pacientes" },
  { id: "appointments_manage", name: "Gestionar Citas", category: "Citas" },
  { id: "medical_records", name: "Historiales Médicos", category: "Médico" },
  { id: "prescriptions", name: "Recetas", category: "Médico" },
  { id: "consultations", name: "Consultas", category: "Médico" },
  { id: "vitals_manage", name: "Signos Vitales", category: "Enfermería" },
  { id: "billing_basic", name: "Facturación Básica", category: "Finanzas" },
  { id: "billing_manage", name: "Gestión Financiera", category: "Finanzas" },
  { id: "financial_reports", name: "Reportes Financieros", category: "Finanzas" },
  { id: "payments", name: "Pagos", category: "Finanzas" },
  { id: "medications_manage", name: "Gestión de Medicamentos", category: "Farmacia" },
  { id: "inventory", name: "Inventario", category: "Farmacia" },
  { id: "lab_tests", name: "Pruebas de Laboratorio", category: "Laboratorio" },
  { id: "samples_manage", name: "Gestión de Muestras", category: "Laboratorio" },
  { id: "results_input", name: "Ingreso de Resultados", category: "Laboratorio" },
  { id: "facility_access", name: "Acceso a Instalaciones", category: "Seguridad" },
  { id: "security_manage", name: "Gestión de Seguridad", category: "Seguridad" },
  { id: "cleaning_schedule", name: "Horarios de Limpieza", category: "Mantenimiento" },
  { id: "supplies_request", name: "Solicitud de Suministros", category: "Mantenimiento" },
  { id: "equipment_manage", name: "Gestión de Equipos", category: "Técnico" },
  { id: "maintenance", name: "Mantenimiento", category: "Técnico" },
  { id: "staff_manage", name: "Gestión de Personal", category: "Supervisión" },
  { id: "reports_view", name: "Ver Reportes", category: "Supervisión" },
  { id: "quality_control", name: "Control de Calidad", category: "Supervisión" },
  { id: "scheduling", name: "Programación", category: "Supervisión" }
];

const RoleManagementModal = ({ isOpen, onClose, onSave }: RoleManagementModalProps) => {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleEditor, setShowRoleEditor] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [roleForm, setRoleForm] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    color: 'bg-gray-100 text-gray-800'
  });

  const handleCreateRole = () => {
    setEditingRole(null);
    setRoleForm({
      name: '',
      description: '',
      permissions: [],
      color: 'bg-gray-100 text-gray-800'
    });
    setShowRoleEditor(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleForm({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
      color: role.color
    });
    setShowRoleEditor(true);
  };

  const handleSaveRole = () => {
    if (editingRole) {
      // Edit existing role
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...roleForm }
          : role
      ));
    } else {
      // Create new role
      const newRole: Role = {
        id: `role_${Date.now()}`,
        name: roleForm.name,
        description: roleForm.description,
        permissions: roleForm.permissions,
        userCount: 0,
        color: roleForm.color
      };
      setRoles(prev => [...prev, newRole]);
    }
    setShowRoleEditor(false);
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
    }
  };

  const togglePermission = (permissionId: string) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getPermissionsByCategory = () => {
    const categories: Record<string, typeof allPermissions> = {};
    allPermissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Gestión de Roles</h2>
              <p className="text-sm text-gray-600">Administra roles y permisos del sistema</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreateRole}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Rol</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {!showRoleEditor ? (
          <div className="p-6">
            {/* Roles Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${role.color}`}>
                          {role.userCount} {role.userCount === 1 ? 'usuario' : 'usuarios'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setSelectedRole(role)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {role.userCount === 0 && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Permisos ({role.permissions.length}):</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {permission}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                          +{role.permissions.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Role Details Panel */}
            {selectedRole && (
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detalles del Rol: {selectedRole.name}</h3>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Información Básica</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Nombre:</span> {selectedRole.name}</p>
                      <p><span className="font-medium">Descripción:</span> {selectedRole.description}</p>
                      <p><span className="font-medium">Usuarios asignados:</span> {selectedRole.userCount}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Permisos Asignados</h4>
                    <div className="space-y-1">
                      {selectedRole.permissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Role Editor */
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {editingRole ? 'Editar Rol' : 'Crear Nuevo Rol'}
              </h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Información Básica</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Rol *
                      </label>
                      <input
                        type="text"
                        value={roleForm.name}
                        onChange={(e) => setRoleForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Ej: Supervisor de Enfermería"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color de Etiqueta
                      </label>
                      <select
                        value={roleForm.color}
                        onChange={(e) => setRoleForm(prev => ({ ...prev, color: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="bg-gray-100 text-gray-800">Gris</option>
                        <option value="bg-blue-100 text-blue-800">Azul</option>
                        <option value="bg-green-100 text-green-800">Verde</option>
                        <option value="bg-yellow-100 text-yellow-800">Amarillo</option>
                        <option value="bg-red-100 text-red-800">Rojo</option>
                        <option value="bg-purple-100 text-purple-800">Púrpura</option>
                        <option value="bg-indigo-100 text-indigo-800">Índigo</option>
                        <option value="bg-pink-100 text-pink-800">Rosa</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={roleForm.description}
                      onChange={(e) => setRoleForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Describe las responsabilidades de este rol..."
                    />
                  </div>
                </div>

                {/* Permissions */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-md font-medium text-blue-900 mb-4">
                    Permisos ({roleForm.permissions.length} seleccionados)
                  </h4>
                  
                  <div className="space-y-6">
                    {Object.entries(getPermissionsByCategory()).map(([category, permissions]) => (
                      <div key={category}>
                        <h5 className="text-sm font-medium text-blue-800 mb-3">{category}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {permissions.map((permission) => (
                            <label
                              key={permission.id}
                              className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={roleForm.permissions.includes(permission.id)}
                                onChange={() => togglePermission(permission.id)}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowRoleEditor(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveRole}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>{editingRole ? 'Guardar Cambios' : 'Crear Rol'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagementModal; 