'use client';

import { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, X, UserCheck, UserX, Clock } from "lucide-react";

// Tipos para usuarios
interface User {
  id: number;
  name: string;
  email: string;
  role: 'PLATFORM' | 'PROVIDER' | 'STAFF';
  status: 'Activo' | 'Inactivo' | 'Pendiente';
  lastLogin: string;
  avatar: string;
  phone?: string;
  providerType?: string;
  staffType?: string;
  permissions?: string[];
  registrationDate: string;
  entityName?: string;
}

// Datos iniciales
const initialUsers: User[] = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@medigo.com",
    role: "PROVIDER",
    status: "Activo",
    lastLogin: "Hace 2 horas",
    avatar: "A",
    phone: "+34 91 123 4567",
    providerType: "MEDICAL_CENTER",
    permissions: ["MANAGE_PATIENTS", "MANAGE_CONSULTATIONS", "VIEW_REPORTS"],
    registrationDate: "2024-01-15",
    entityName: "Clínica San Rafael"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@medigo.com",
    role: "STAFF",
    status: "Activo",
    lastLogin: "Hace 1 día",
    avatar: "C",
    phone: "+34 93 987 6543",
    staffType: "SUPPORT",
    permissions: ["VIEW_PATIENTS", "MANAGE_APPOINTMENTS"],
    registrationDate: "2024-02-20",
    entityName: "Clínica San Rafael"
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@medigo.com",
    role: "PROVIDER",
    status: "Inactivo",
    lastLogin: "Hace 1 semana",
    avatar: "M",
    phone: "+34 96 555 1234",
    providerType: "PHARMACY",
    permissions: ["MANAGE_PHARMACY", "VIEW_REPORTS"],
    registrationDate: "2024-03-10",
    entityName: "Farmacia del Valle"
  }
];

// Componente Modal para Nuevo/Editar Usuario
const UserModal = ({ 
  isOpen, 
  onClose, 
  user, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  user?: User | null; 
  onSave: (user: User) => void;
}) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'PROVIDER',
    status: user?.status || 'Activo',
    phone: user?.phone || '',
    providerType: user?.providerType || '',
    staffType: user?.staffType || '',
    entityName: user?.entityName || '',
    permissions: user?.permissions || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      ...formData as User,
      id: user?.id || Date.now(),
      avatar: formData.name?.charAt(0).toUpperCase() || 'U',
      lastLogin: user?.lastLogin || 'Nunca',
      registrationDate: user?.registrationDate || new Date().toISOString().split('T')[0]
    };
    onSave(newUser);
    onClose();
  };

  const availablePermissions = [
    'MANAGE_PATIENTS',
    'MANAGE_CONSULTATIONS', 
    'MANAGE_PHARMACY',
    'MANAGE_LABORATORY',
    'MANAGE_APPOINTMENTS',
    'VIEW_REPORTS',
    'MANAGE_FINANCE',
    'MANAGE_STAFF',
    'SYSTEM_CONFIG'
  ];

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...(formData.permissions || []), permission]
      });
    } else {
      setFormData({
        ...formData,
        permissions: (formData.permissions || []).filter(p => p !== permission)
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {user ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre completo del usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+34 XXX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PLATFORM">Administrador de Plataforma</option>
                <option value="PROVIDER">Proveedor</option>
                <option value="STAFF">Personal</option>
              </select>
            </div>

            {formData.role === 'PROVIDER' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Proveedor
                </label>
                <select
                  value={formData.providerType}
                  onChange={(e) => setFormData({ ...formData, providerType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="MEDICAL_CENTER">Centro Médico</option>
                  <option value="LABORATORY">Laboratorio</option>
                  <option value="PHARMACY">Farmacia</option>
                  <option value="EMERGENCY">Emergencias</option>
                  <option value="HOMECARE">Atención Domiciliaria</option>
                  <option value="SPECIALIST">Especialista</option>
                </select>
              </div>
            )}

            {formData.role === 'STAFF' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Personal
                </label>
                <select
                  value={formData.staffType}
                  onChange={(e) => setFormData({ ...formData, staffType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="FINANCE">Financiero</option>
                  <option value="SUPPORT">Soporte</option>
                  <option value="ADMIN">Administrativo</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>

            {(formData.role === 'PROVIDER' || formData.role === 'STAFF') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entidad
                </label>
                <input
                  type="text"
                  value={formData.entityName}
                  onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de la entidad"
                />
              </div>
            )}
          </div>

          {/* Permisos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Permisos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availablePermissions.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(formData.permissions || []).includes(permission)}
                    onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {permission.replace('_', ' ').toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {user ? 'Actualizar' : 'Crear'} Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Modal de Detalles
const UserDetailsModal = ({ 
  isOpen, 
  onClose, 
  user 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  user: User | null;
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Detalles del Usuario</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">{user.avatar}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                user.role === 'PLATFORM' ? 'bg-purple-100 text-purple-800' :
                user.role === 'PROVIDER' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <label className="text-sm font-medium text-gray-500">Teléfono</label>
                <p className="text-gray-900">{user.phone}</p>
              </div>
            )}
            {user.entityName && (
              <div>
                <label className="text-sm font-medium text-gray-500">Entidad</label>
                <p className="text-gray-900">{user.entityName}</p>
              </div>
            )}
            {user.providerType && (
              <div>
                <label className="text-sm font-medium text-gray-500">Tipo de Proveedor</label>
                <p className="text-gray-900">{user.providerType.replace('_', ' ')}</p>
              </div>
            )}
            {user.staffType && (
              <div>
                <label className="text-sm font-medium text-gray-500">Tipo de Personal</label>
                <p className="text-gray-900">{user.staffType}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">Estado</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                user.status === 'Activo' ? 'bg-green-100 text-green-800' : 
                user.status === 'Inactivo' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Último Acceso</label>
              <p className="text-gray-900">{user.lastLogin}</p>
            </div>
            {user.permissions && user.permissions.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Permisos</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.permissions.map((permission) => (
                    <span 
                      key={permission}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {permission.replace('_', ' ').toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | User['role']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.entityName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handlers
  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      // Actualizar existente
      setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    } else {
      // Crear nuevo
      setUsers(prev => [...prev, user]);
    }
    setSelectedUser(null);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleToggleStatus = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo' as User['status'] }
        : user
    ));
  };

  // Estadísticas calculadas
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Activo').length;
  const newThisMonth = users.filter(u => {
    const registrationDate = new Date(u.registrationDate);
    const now = new Date();
    return registrationDate.getMonth() === now.getMonth() && 
           registrationDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <DashboardLayout currentPage="/dashboard/usuarios">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p className="text-gray-600">Administra usuarios, roles y permisos del sistema</p>
          </div>
          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>

          {/* Filtros expandidos */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos los roles</option>
                    <option value="PLATFORM">Administrador</option>
                    <option value="PROVIDER">Proveedor</option>
                    <option value="STAFF">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Lista de Usuarios ({filteredUsers.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Acceso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{user.avatar}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.entityName && (
                            <div className="text-xs text-gray-400">{user.entityName}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'PLATFORM' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'PROVIDER' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                      {user.providerType && (
                        <div className="text-xs text-gray-500 mt-1">
                          {user.providerType.replace('_', ' ')}
                        </div>
                      )}
                      {user.staffType && (
                        <div className="text-xs text-gray-500 mt-1">
                          {user.staffType}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Activo' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Inactivo' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{user.lastLogin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="p-1 hover:bg-gray-100 rounded text-blue-600"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-1 hover:bg-gray-100 rounded text-green-600"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-1 hover:bg-gray-100 rounded ${
                            user.status === 'Activo' ? 'text-red-600' : 'text-green-600'
                          }`}
                          title={user.status === 'Activo' ? 'Desactivar' : 'Activar'}
                        >
                          {user.status === 'Activo' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 hover:bg-gray-100 rounded text-red-600"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                  ? 'Intenta ajustando los filtros o el término de búsqueda'
                  : 'Agrega tu primer usuario haciendo clic en "Nuevo Usuario"'}
              </p>
              {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setRoleFilter('all');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Usuarios Activos</p>
                <p className="text-2xl font-semibold text-gray-900">{activeUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Nuevos Este Mes</p>
                <p className="text-2xl font-semibold text-gray-900">{newThisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modales */}
        <UserModal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          onSave={handleSaveUser}
        />

        <UserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSave={handleSaveUser}
        />

        <UserDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      </div>
    </DashboardLayout>
  );
} 