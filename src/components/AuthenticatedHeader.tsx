'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getFilteredNavigation } from "@/utils/navigationConfig";
import { Home, Video, Users, Pill, TestTube, Ambulance, FileText, CreditCard, UserCog, BarChart3, Calendar, Plus, ChevronDown, Bell, LogOut, Settings } from "lucide-react";
import NotificationsModal from "@/components/modals/NotificationsModal";
import UserSettingsModal from "@/components/modals/UserSettingsModal";

const iconMap = {
  Home,
  Video, 
  Users,
  Pill,
  TestTube,
  Ambulance,
  FileText,
  CreditCard,
  UserCog,
  BarChart3,
  Calendar,
  Plus
};

interface AuthenticatedHeaderProps {
  currentPage?: string;
}

const AuthenticatedHeader = ({ currentPage }: AuthenticatedHeaderProps) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isUserSettingsModalOpen, setIsUserSettingsModalOpen] = useState(false);

  if (!user) return null;

  // Obtener navegación filtrada con todos los parámetros necesarios
  const navigation = getFilteredNavigation(
    user.role, 
    user.permissions,
    user.staffType,
    user.providerType,
    user.parentEntityType
  );

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'PLATFORM': return 'bg-purple-100 text-purple-800';
      case 'PROVIDER': return 'bg-blue-100 text-blue-800';
      case 'STAFF': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDetailedRoleName = () => {
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

  const getNotificationCount = () => {
    switch (user.role) {
      case 'PLATFORM': return 8;
      case 'PROVIDER': return 5;
      case 'STAFF': return 3;
      default: return 0;
    }
  };

  const handleNotificationsClick = () => {
    setIsNotificationsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleUserSettingsClick = () => {
    setIsUserSettingsModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Solo mostrar para roles que no sean PLATFORM */}
            {user.role !== 'PLATFORM' && (
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">MediGo Hub</span>
                </Link>
              </div>
            )}

            {/* Navigation - Solo para roles que no sean PLATFORM */}
            {user.role !== 'PLATFORM' && (
              <nav className="hidden md:flex flex-1 justify-center space-x-4">
                {navigation.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  const isActive = currentPage === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* User Menu - Ajustar posición para PLATFORM */}
            <div className={`flex items-center space-x-2 ${user.role === 'PLATFORM' ? 'ml-auto' : ''}`}>
              {/* Notifications */}
              <button 
                onClick={handleNotificationsClick}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Ver notificaciones"
                tabIndex={0}
              >
                <Bell className="w-5 h-5" />
                {getNotificationCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getNotificationCount()}
                  </span>
                )}
              </button>

              {/* Logout Button - Always visible */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                aria-label="Cerrar sesión"
                tabIndex={0}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Cerrar Sesión</span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  aria-label="Menú de usuario"
                  tabIndex={0}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getRoleColor(user.role)}`}>
                      {getDetailedRoleName()}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${getRoleColor(user.role)}`}>
                        {getDetailedRoleName()}
                      </div>
                      
                      {/* Información adicional del perfil */}
                      <div className="mt-2 space-y-1">
                        {user.staffType && (
                          <div className="text-xs text-gray-500">
                            Tipo de Staff: <span className="font-medium">{user.staffType}</span>
                          </div>
                        )}
                        {user.providerType && (
                          <div className="text-xs text-gray-500">
                            Tipo de Proveedor: <span className="font-medium">{user.providerType.replace('_', ' ')}</span>
                          </div>
                        )}
                        {user.parentEntityType && (
                          <div className="text-xs text-gray-500">
                            Entidad: <span className="font-medium">{user.parentEntityType}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="px-4 py-2">
                      <div className="text-xs text-gray-500 mb-2">Permisos:</div>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 5).map((permission) => (
                          <span
                            key={permission}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {permission}
                          </span>
                        ))}
                        {user.permissions.length > 5 && (
                          <span className="text-xs text-gray-500">
                            +{user.permissions.length - 5} más
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-2">
                      <button
                        onClick={handleUserSettingsClick}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configuración</span>
                      </button>
                      <button
                        onClick={handleNotificationsClick}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Bell className="w-4 h-4" />
                        <span>Ver Notificaciones ({getNotificationCount()})</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      <NotificationsModal 
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      {/* User Settings Modal */}
      <UserSettingsModal 
        isOpen={isUserSettingsModalOpen}
        onClose={() => setIsUserSettingsModalOpen(false)}
      />
    </>
  );
};

export default AuthenticatedHeader; 