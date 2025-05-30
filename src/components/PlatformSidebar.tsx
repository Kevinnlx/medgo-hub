'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getFilteredNavigation } from "@/utils/navigationConfig";
import { 
  Home, Video, Users, Pill, TestTube, Ambulance, FileText, 
  CreditCard, UserCog, BarChart3, Calendar, Plus, ChevronLeft, 
  ChevronRight, Menu, X, ChevronDown, ChevronUp, Building2, 
  Settings, Activity, HeartHandshake, Search, Zap
} from "lucide-react";

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
  Plus,
  Building2,
  Settings,
  Activity,
  HeartHandshake
};

interface PlatformSidebarProps {
  currentPage?: string;
}

// Organizamos la navegación en categorías
const getNavigationCategories = (navigation: any[]) => {
  return [
    {
      id: 'main',
      title: 'Principal',
      icon: Home,
      items: navigation.filter(item => 
        ['/dashboard'].includes(item.href)
      )
    },
    {
      id: 'medical',
      title: 'Servicios Médicos',
      icon: HeartHandshake,
      items: navigation.filter(item => 
        ['/dashboard/consultas', '/dashboard/pacientes', '/dashboard/expedientes', '/dashboard/medicos', '/dashboard/departamentos', '/dashboard/registros'].includes(item.href)
      )
    },
    {
      id: 'services',
      title: 'Servicios Especializados',
      icon: Activity,
      items: navigation.filter(item => 
        ['/dashboard/farmacia', '/dashboard/laboratorio', '/dashboard/emergencias', '/dashboard/homecare'].includes(item.href)
      )
    },
    {
      id: 'management',
      title: 'Gestión y Administración',
      icon: Building2,
      items: navigation.filter(item => 
        ['/dashboard/usuarios', '/dashboard/proveedores', '/dashboard/personal', '/dashboard/facturacion', '/dashboard/finanzas'].includes(item.href)
      )
    },
    {
      id: 'reports',
      title: 'Reportes y Configuración',
      icon: BarChart3,
      items: navigation.filter(item => 
        ['/dashboard/reportes', '/dashboard/configuracion', '/dashboard/historiales', '/dashboard/visitas'].includes(item.href)
      )
    }
  ].filter(category => category.items.length > 0);
};

// Accesos rápidos
const quickActions = [
  { title: 'Nueva Cita', href: '/dashboard/consultas', icon: Calendar, color: 'bg-primary-500' },
  { title: 'Nuevo Paciente', href: '/dashboard/pacientes', icon: Users, color: 'bg-primary-600' },
  { title: 'Reportes', href: '/dashboard/reportes', icon: BarChart3, color: 'bg-accent-500' },
  { title: 'Configuración', href: '/dashboard/configuracion', icon: Settings, color: 'bg-accent-600' }
];

const PlatformSidebar = ({ currentPage }: PlatformSidebarProps) => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'PLATFORM') return null;

  // Obtener navegación filtrada
  const navigation = getFilteredNavigation(
    user.role, 
    user.permissions,
    user.staff_type,
    user.provider_type,
    user.parent_entity_type,
    user.verification_status
  );

  const categories = getNavigationCategories(navigation);

  // Filtrar elementos de navegación basado en la búsqueda
  const filteredCategories = searchQuery.trim() 
    ? categories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : categories;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setSearchQuery(''); // Limpiar búsqueda al colapsar
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryCollapsed = (categoryId: string) => {
    return collapsedCategories.includes(categoryId);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-40 transition-all duration-300 overflow-hidden
        ${isCollapsed ? 'w-16' : 'w-72'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <span className="text-lg font-bold text-black">MediGo Hub</span>
                <p className="text-xs text-gray-500">Sistema de Gestión Médica</p>
              </div>
            </div>
          )}
          
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-black">{user.display_name || user.name}</p>
                <p className="text-xs text-gray-500">
                  Administrador de Plataforma
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar - Solo cuando no está colapsado */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar módulo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-black"
              />
            </div>
          </div>
        )}

        {/* Quick Actions - Solo cuando no está colapsado y no hay búsqueda */}
        {!isCollapsed && !searchQuery.trim() && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Accesos Rápidos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-black text-center leading-tight">{action.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
          <div className="p-2">
            {/* Mostrar mensaje de búsqueda si no hay resultados */}
            {searchQuery.trim() && filteredCategories.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No se encontraron resultados</p>
              </div>
            )}

            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isCatCollapsed = !searchQuery.trim() && isCategoryCollapsed(category.id);
              
              return (
                <div key={category.id} className="mb-2">
                  {/* Category Header */}
                  <button
                    onClick={() => !isCollapsed && !searchQuery.trim() && toggleCategory(category.id)}
                    className={`
                      w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors
                      ${isCollapsed ? 'justify-center' : ''}
                      hover:bg-gray-50 text-black
                    `}
                    title={isCollapsed ? category.title : ''}
                  >
                    <div className="flex items-center space-x-2">
                      <CategoryIcon className="w-4 h-4 text-teal-600" />
                      {!isCollapsed && (
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          {category.title}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && !searchQuery.trim() && (
                      <div className="flex items-center space-x-1">
                        <span className="text-xs bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                          {category.items.length}
                        </span>
                        {isCatCollapsed ? (
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        ) : (
                          <ChevronUp className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    )}
                  </button>

                  {/* Category Items */}
                  {(!isCollapsed && (!isCatCollapsed || searchQuery.trim())) && (
                    <div className="ml-2 space-y-1">
                      {category.items.map((item) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap];
                        const isActive = currentPage === item.href;
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`
                              flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors
                              ${isActive
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm'
                                : 'text-black hover:text-black hover:bg-teal-50'
                              }
                            `}
                            title={item.title}
                          >
                            {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                            <div className="min-w-0 flex-1">
                              <span className="truncate">{item.title}</span>
                              {searchQuery.trim() && (
                                <p className="text-xs opacity-75 truncate">{item.description}</p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Collapsed Category Items */}
                  {isCollapsed && (
                    <div className="space-y-1 mt-1">
                      {category.items.map((item) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap];
                        const isActive = currentPage === item.href;
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`
                              flex items-center justify-center p-2 rounded-lg text-sm transition-colors
                              ${isActive
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm'
                                : 'text-black hover:text-black hover:bg-teal-50'
                              }
                            `}
                            title={item.title}
                          >
                            {Icon && <Icon className="w-4 h-4" />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed ? (
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p className="font-medium text-black">MediGo Hub v1.2.4</p>
              <p>© 2024 Todos los derechos reservados</p>
              <div className="flex items-center justify-center space-x-1 text-teal-600">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <span>Sistema Activo</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlatformSidebar; 