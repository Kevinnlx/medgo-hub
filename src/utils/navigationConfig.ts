import { UserRole, StaffType, ProviderType, ParentEntityType } from '@/types'

export interface NavigationItem {
  title: string
  href: string
  icon: string
  description: string
  allowedRoles?: UserRole[]
  requiredRoles?: UserRole[]
  requiredPermissions?: string[]
  requiredStaffTypes?: StaffType[]
  requiredProviderTypes?: ProviderType[]
  requiredParentEntityTypes?: ParentEntityType[]
}

// Navegación completa para PLATFORM
export const platformNavigationItems: NavigationItem[] = [
  // INICIO
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: 'Home',
    description: 'Panel principal del sistema',
    allowedRoles: ['PLATFORM']
  },

  // SERVICIOS MÉDICOS
  {
    title: 'Consultas',
    href: '/dashboard/consultas',
    icon: 'Video',
    description: 'Gestión de consultas médicas',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Pacientes',
    href: '/dashboard/pacientes',
    icon: 'Users',
    description: 'Registro y gestión de pacientes',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Expedientes',
    href: '/dashboard/expedientes',
    icon: 'FileText',
    description: 'Gestión de expedientes médicos',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Médicos',
    href: '/dashboard/medicos',
    icon: 'UserCog',
    description: 'Gestión de profesionales médicos',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Departamentos',
    href: '/dashboard/departamentos',
    icon: 'Building2',
    description: 'Organización departamental',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Registros',
    href: '/dashboard/registros',
    icon: 'FileText',
    description: 'Registros médicos y archivos',
    allowedRoles: ['PLATFORM']
  },

  // SERVICIOS ESPECIALIZADOS
  {
    title: 'Farmacia',
    href: '/dashboard/farmacia',
    icon: 'Pill',
    description: 'Gestión de medicamentos y prescripciones',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Laboratorio',
    href: '/dashboard/laboratorio',
    icon: 'TestTube',
    description: 'Gestión de pruebas diagnósticas',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Emergencias',
    href: '/dashboard/emergencias',
    icon: 'Ambulance',
    description: 'Servicios de emergencias médicas',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Cuidado Domiciliario',
    href: '/dashboard/homecare',
    icon: 'HeartHandshake',
    description: 'Servicios de salud a domicilio',
    allowedRoles: ['PLATFORM']
  },

  // GESTIÓN Y ADMINISTRACIÓN
  {
    title: 'Usuarios',
    href: '/dashboard/usuarios',
    icon: 'Users',
    description: 'Gestión de usuarios del sistema',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Proveedores',
    href: '/dashboard/proveedores',
    icon: 'Building2',
    description: 'Gestión de proveedores de servicios',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Personal',
    href: '/dashboard/personal',
    icon: 'UserCog',
    description: 'Gestión de staff y personal',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Facturación',
    href: '/dashboard/facturacion',
    icon: 'CreditCard',
    description: 'Sistema de facturación',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Finanzas',
    href: '/dashboard/finanzas',
    icon: 'CreditCard',
    description: 'Gestión financiera y reportes',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Soporte',
    href: '/dashboard/soporte',
    icon: 'HeartHandshake',
    description: 'Atención al cliente y soporte técnico',
    allowedRoles: ['PLATFORM']
  },

  // REPORTES Y CONFIGURACIÓN
  {
    title: 'Reportes',
    href: '/dashboard/reportes',
    icon: 'BarChart3',
    description: 'Reportes y analíticas',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Configuración',
    href: '/dashboard/configuracion',
    icon: 'Settings',
    description: 'Configuración del sistema',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Historiales',
    href: '/dashboard/historiales',
    icon: 'Activity',
    description: 'Historiales de actividad',
    allowedRoles: ['PLATFORM']
  },
  {
    title: 'Visitas',
    href: '/dashboard/visitas',
    icon: 'Calendar',
    description: 'Registro de visitas',
    allowedRoles: ['PLATFORM']
  }
]

// Navegación simplificada: Solo Inicio, Módulo específico, Expedientes (cuando aplique) y Configuración
export const navigationItems: NavigationItem[] = [
  // INICIO - Siempre presente para todos los roles
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: 'Home',
    description: 'Panel principal del sistema',
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF', 'CLIENT']
  },

  // MÓDULOS ESPECÍFICOS PARA PROVIDERS
  {
    title: 'Consultas',
    href: '/dashboard/consultas',
    icon: 'Video',
    description: 'Gestión de consultas médicas',
    allowedRoles: ['PROVIDER'],
    requiredProviderTypes: ['MEDICAL_CENTER', 'OFFICE_SPECIALIST', 'VIRTUAL_SPECIALIST']
  },
  {
    title: 'Farmacia',
    href: '/dashboard/farmacia',
    icon: 'Pill',
    description: 'Gestión de medicamentos y prescripciones',
    allowedRoles: ['PROVIDER'],
    requiredProviderTypes: ['PHARMACY']
  },
  {
    title: 'Laboratorio',
    href: '/dashboard/laboratorio',
    icon: 'TestTube',
    description: 'Gestión de pruebas diagnósticas',
    allowedRoles: ['PROVIDER'],
    requiredProviderTypes: ['LABORATORY']
  },
  {
    title: 'Emergencias',
    href: '/dashboard/emergencias',
    icon: 'Ambulance',
    description: 'Servicios de emergencias médicas',
    allowedRoles: ['PROVIDER'],
    requiredProviderTypes: ['EMERGENCY']
  },
  {
    title: 'Cuidado Domiciliario',
    href: '/dashboard/homecare',
    icon: 'HeartHandshake',
    description: 'Servicios de salud a domicilio',
    allowedRoles: ['PROVIDER'],
    requiredProviderTypes: ['HOMECARE']
  },

  // MÓDULOS ESPECÍFICOS PARA STAFF
  {
    title: 'Finanzas',
    href: '/dashboard/finanzas',
    icon: 'CreditCard',
    description: 'Gestión financiera y reportes',
    allowedRoles: ['STAFF'],
    requiredStaffTypes: ['FINANCE']
  },
  {
    title: 'Soporte',
    href: '/dashboard/soporte',
    icon: 'HeartHandshake',
    description: 'Atención al cliente y soporte técnico',
    allowedRoles: ['STAFF'],
    requiredStaffTypes: ['SUPPORT']
  },

  // EXPEDIENTES - Solo para providers que manejan registros médicos
  {
    title: 'Expedientes',
    href: '/dashboard/expedientes',
    icon: 'FileText',
    description: 'Gestión de expedientes médicos',
    allowedRoles: ['PROVIDER'],
    requiredProviderTypes: ['MEDICAL_CENTER', 'OFFICE_SPECIALIST', 'VIRTUAL_SPECIALIST']
  },

  // CONFIGURACIÓN - Siempre presente para PROVIDER y STAFF
  {
    title: 'Configuración',
    href: '/dashboard/configuracion',
    icon: 'Settings',
    description: 'Configuración del perfil y organización',
    allowedRoles: ['PROVIDER', 'STAFF']
  }
]

// Función helper simplificada para filtrar navegación según usuario
export const getFilteredNavigation = (
  userRole: UserRole, 
  userPermissions: string[],
  staffType?: StaffType,
  providerType?: ProviderType,
  parentEntityType?: ParentEntityType,
  verificationStatus?: string
): NavigationItem[] => {
  // Para PLATFORM, usar navegación completa
  if (userRole === 'PLATFORM') {
    return platformNavigationItems
  }

  return navigationItems.filter(item => {
    // Verificar roles permitidos
    if (item.allowedRoles && !item.allowedRoles.includes(userRole)) {
      return false
    }

    // Verificar roles requeridos específicos
    if (item.requiredRoles && !item.requiredRoles.includes(userRole)) {
      return false
    }

    // Verificar tipos de staff requeridos (solo aplicar para STAFF)
    if (item.requiredStaffTypes && userRole === 'STAFF') {
      if (!staffType || !item.requiredStaffTypes.includes(staffType)) {
        return false
      }
    }

    // Verificar tipos de provider requeridos (solo aplicar para PROVIDER)
    if (item.requiredProviderTypes && userRole === 'PROVIDER') {
      if (!providerType || !item.requiredProviderTypes.includes(providerType)) {
        return false
      }
    }

    // Verificar tipos de entidad padre requeridos (solo aplicar para STAFF)
    if (item.requiredParentEntityTypes && userRole === 'STAFF') {
      if (!parentEntityType || !item.requiredParentEntityTypes.includes(parentEntityType)) {
        return false
      }
    }

    return true
  })
} 