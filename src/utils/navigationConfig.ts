import { UserRole, StaffType, ProviderType, ParentEntityType } from '@/types'

export interface NavigationItem {
  title: string
  href: string
  icon: string
  description: string
  requiredPermissions?: string[]
  requiredRoles?: UserRole[]
  allowedRoles?: UserRole[]
  requiredStaffTypes?: StaffType[]
  requiredProviderTypes?: ProviderType[]
  requiredParentEntityTypes?: ParentEntityType[]
}

export const navigationItems: NavigationItem[] = [
  {
    title: 'Inicio',
    href: '/dashboard',
    icon: 'Home',
    description: 'Panel principal del sistema',
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF']
  },
  {
    title: 'Consultas',
    href: '/dashboard/consultas',
    icon: 'Video',
    description: 'Gestión de consultas médicas presenciales y virtuales',
    requiredPermissions: ['consultations_manage', 'appointments_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT'],
    requiredProviderTypes: ['MEDICAL_CENTER', 'OFFICE_SPECIALIST', 'VIRTUAL_SPECIALIST']
  },
  {
    title: 'Pacientes',
    href: '/dashboard/pacientes',
    icon: 'Users',
    description: 'Gestión de pacientes registrados',
    requiredPermissions: ['patients_read', 'patients_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT'],
    requiredProviderTypes: ['MEDICAL_CENTER', 'OFFICE_SPECIALIST', 'VIRTUAL_SPECIALIST']
  },
  {
    title: 'Farmacia',
    href: '/dashboard/farmacia',
    icon: 'Pill',
    description: 'Gestión de medicamentos y prescripciones',
    requiredPermissions: ['prescriptions_manage', 'inventory_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT'],
    requiredProviderTypes: ['PHARMACY', 'MEDICAL_CENTER']
  },
  {
    title: 'Laboratorio',
    href: '/dashboard/laboratorio',
    icon: 'TestTube',
    description: 'Gestión de pruebas diagnósticas y resultados',
    requiredPermissions: ['samples_collect', 'medical_records_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT'],
    requiredProviderTypes: ['LABORATORY', 'MEDICAL_CENTER']
  },
  {
    title: 'Emergencias',
    href: '/dashboard/emergencias',
    icon: 'Ambulance',
    description: 'Servicios de ambulancia y emergencias médicas',
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF']
  },
  {
    title: 'Atención Domiciliaria',
    href: '/dashboard/domiciliaria',
    icon: 'Home',
    description: 'Servicios de salud a domicilio',
    requiredPermissions: ['service_delivery', 'appointments_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT'],
    requiredProviderTypes: ['HOMECARE', 'MEDICAL_CENTER']
  },
  {
    title: 'Expedientes Médicos',
    href: '/dashboard/expedientes',
    icon: 'FileText',
    description: 'Gestión de historiales médicos (legacy)',
    requiredPermissions: ['medical_records_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT']
  },
  {
    title: 'Facturación',
    href: '/dashboard/facturacion',
    icon: 'CreditCard',
    description: 'Gestión de facturación y pagos',
    requiredPermissions: ['billing_manage'],
    allowedRoles: ['PLATFORM', 'STAFF'],
    requiredStaffTypes: ['FINANCE']
  },
  {
    title: 'Finanzas',
    href: '/dashboard/finanzas',
    icon: 'CreditCard',
    description: 'Gestión financiera y reportes',
    requiredPermissions: ['financial_reports', 'billing_manage'],
    allowedRoles: ['PROVIDER', 'STAFF'],
    requiredStaffTypes: ['FINANCE']
  },
  {
    title: 'Usuarios',
    href: '/dashboard/usuarios',
    icon: 'UserCog',
    description: 'Administración de usuarios del sistema',
    requiredRoles: ['PLATFORM']
  },
  {
    title: 'Proveedores',
    href: '/dashboard/proveedores',
    icon: 'UserCog',
    description: 'Gestión y verificación de proveedores de la plataforma',
    requiredRoles: ['PLATFORM'],
    requiredPermissions: ['providers_manage']
  },
  {
    title: 'Personal',
    href: '/dashboard/personal',
    icon: 'UserCog',
    description: 'Gestión de personal y operadores',
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF']
  },
  {
    title: 'Reportes',
    href: '/dashboard/reportes',
    icon: 'BarChart3',
    description: 'Reportes y estadísticas del sistema',
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF']
  },
  {
    title: 'Configuración',
    href: '/dashboard/configuracion',
    icon: 'UserCog',
    description: 'Configuración del perfil y organización',
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF']
  },
  {
    title: 'Cuidado Domiciliario',
    href: '/dashboard/homecare',
    icon: 'HeartHandshake',
    description: 'Servicios de salud a domicilio',
    requiredPermissions: ['service_delivery', 'appointments_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT'],
    requiredProviderTypes: ['HOMECARE', 'MEDICAL_CENTER']
  },
  {
    title: 'Registros Médicos',
    href: '/dashboard/registros',
    icon: 'FileText',
    description: 'Gestión segura de registros médicos',
    requiredPermissions: ['medical_records_manage'],
    allowedRoles: ['PLATFORM', 'PROVIDER', 'STAFF'],
    requiredStaffTypes: ['SUPPORT']
  }
]

// Función helper para filtrar navegación según usuario
export const getFilteredNavigation = (
  userRole: UserRole, 
  userPermissions: string[],
  staffType?: StaffType,
  providerType?: ProviderType,
  parentEntityType?: ParentEntityType,
  verificationStatus?: string
): NavigationItem[] => {
  return navigationItems.filter(item => {
    // Si tiene permisos 'all', puede acceder a todo
    if (userPermissions.includes('all')) {
      return true
    }

    // Verificar roles permitidos
    if (item.allowedRoles && !item.allowedRoles.includes(userRole)) {
      return false
    }

    // Verificar roles requeridos
    if (item.requiredRoles && !item.requiredRoles.includes(userRole)) {
      return false
    }

    // Verificar tipos de staff requeridos
    if (item.requiredStaffTypes && userRole === 'STAFF') {
      if (!staffType || !item.requiredStaffTypes.includes(staffType)) {
        return false
      }
    }

    // Verificar tipos de provider requeridos
    if (item.requiredProviderTypes && userRole === 'PROVIDER') {
      if (!providerType || !item.requiredProviderTypes.includes(providerType)) {
        return false
      }
    }

    // Verificar tipos de entidad padre requeridos
    if (item.requiredParentEntityTypes && userRole === 'STAFF') {
      if (!parentEntityType || !item.requiredParentEntityTypes.includes(parentEntityType)) {
        return false
      }
    }

    // Verificar permisos requeridos
    if (item.requiredPermissions) {
      return item.requiredPermissions.some(permission => 
        userPermissions.includes(permission)
      )
    }

    return true
  })
} 