'use client';

import { useState } from 'react';
import { X, User, Mail, Phone, Calendar, Shield, Settings, Edit2, Save } from 'lucide-react';
import { User as UserType } from '@/types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onEdit?: (user: UserType) => void;
  canEdit?: boolean;
}

const UserProfileModal = ({ isOpen, onClose, user, onEdit, canEdit = false }: UserProfileModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(null);

  if (!isOpen || !user) return null;

  const handleStartEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedUser && onEdit) {
      onEdit(editedUser);
      setIsEditing(false);
      setEditedUser(null);
      onClose();
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'PLATFORM': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'PROVIDER': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'STAFF': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDetailedRoleName = (user: UserType) => {
    let baseName = '';
    
    switch (user.role) {
      case 'PLATFORM':
        baseName = 'Administrador de Plataforma';
        break;
      case 'PROVIDER':
        baseName = 'Proveedor';
        if (user.providerType) {
          switch (user.providerType) {
            case 'MEDICAL_CENTER': baseName += ' - Centro Médico'; break;
            case 'PHARMACY': baseName += ' - Farmacia'; break;
            case 'LABORATORY': baseName += ' - Laboratorio'; break;
            case 'EMERGENCY': baseName += ' - Emergencias'; break;
            case 'HOMECARE': baseName += ' - Atención Domiciliaria'; break;
            case 'OFFICE_SPECIALIST': baseName += ' - Especialista Consultorio'; break;
            case 'VIRTUAL_SPECIALIST': baseName += ' - Especialista Virtual'; break;
          }
        }
        break;
      case 'STAFF':
        if (user.staffType === 'FINANCE') {
          baseName = 'Personal Financiero';
        } else if (user.staffType === 'SUPPORT') {
          baseName = 'Personal de Soporte';
        } else {
          baseName = 'Personal Administrativo';
        }
        
        if (user.parentEntityType === 'PLATFORM') {
          baseName += ' - Plataforma';
        } else if (user.parentEntityType === 'PROVIDER') {
          baseName += ' - Proveedor';
        }
        break;
      default:
        baseName = user.role;
    }
    
    return baseName;
  };

  const currentUser = isEditing ? editedUser : user;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-medium">
                {currentUser?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Editar Perfil' : 'Perfil de Usuario'}
              </h2>
              <p className="text-sm text-gray-600">{currentUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {canEdit && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Editar perfil"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser?.name || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{currentUser?.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser?.email || ''}
                  onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{currentUser?.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Role Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol y Permisos
            </label>
            <div className="space-y-3">
              <div className={`inline-flex items-center px-3 py-2 rounded-lg border ${getRoleColor(currentUser?.role || '')}`}>
                <Shield className="w-4 h-4 mr-2" />
                <span className="font-medium">{getDetailedRoleName(currentUser!)}</span>
              </div>
              
              {/* Additional Role Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser?.staffType && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm font-medium text-green-800">Tipo de Staff</div>
                    <div className="text-sm text-green-600">{currentUser.staffType}</div>
                  </div>
                )}
                
                {currentUser?.providerType && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-blue-800">Tipo de Proveedor</div>
                    <div className="text-sm text-blue-600">
                      {currentUser.providerType.replace('_', ' ')}
                    </div>
                  </div>
                )}
                
                {currentUser?.parentEntityType && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-purple-800">Entidad Padre</div>
                    <div className="text-sm text-purple-600">{currentUser.parentEntityType}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permisos del Sistema
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              {currentUser?.permissions.includes('all') ? (
                <div className="flex items-center space-x-2 text-purple-600">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Acceso Completo al Sistema</span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentUser?.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {permission.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID de Usuario
            </label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900 font-mono text-sm">{currentUser?.id}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal; 