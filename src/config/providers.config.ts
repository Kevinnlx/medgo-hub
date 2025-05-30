import { 
  Package, 
  TestTube, 
  Building2, 
  Truck, 
  Heart,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  ShoppingCart,
  ClipboardList,
  User,
  AlertTriangle
} from 'lucide-react'

export type ProviderType = 'pharmacy' | 'laboratory' | 'medical-center' | 'emergency' | 'homecare'

export interface ProviderConfig {
  id: ProviderType
  name: string
  displayName: string
  description: string
  icon: any
  color: string
  bgColor: string
  features: string[]
  modules: ProviderModule[]
  permissions: string[]
  dashboardRoute: string
}

export interface ProviderModule {
  id: string
  name: string
  description: string
  icon: any
  route: string
  permissions: string[]
  isCore: boolean // Core modules are always visible
}

// Pharmacy Configuration
const pharmacyConfig: ProviderConfig = {
  id: 'pharmacy',
  name: 'pharmacy',
  displayName: 'Farmacia',
  description: 'Gestión completa de farmacia con inventario, órdenes y entregas',
  icon: Package,
  color: 'blue',
  bgColor: 'bg-blue-600',
  features: [
    'Gestión de inventario de medicamentos',
    'Procesamiento de órdenes y recetas',
    'Verificación digital de prescripciones',
    'Gestión de repartidores y entregas',
    'Control de stock y alertas',
    'Reportes de ventas y productos'
  ],
  modules: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Panel principal con métricas y resumen',
      icon: BarChart3,
      route: '/dashboard/pharmacy',
      permissions: ['VIEW_DASHBOARD'],
      isCore: true
    },
    {
      id: 'orders',
      name: 'Órdenes',
      description: 'Gestión de órdenes de medicamentos',
      icon: ShoppingCart,
      route: '/dashboard/pharmacy/orders',
      permissions: ['VIEW_ORDERS', 'PROCESS_ORDERS'],
      isCore: true
    },
    {
      id: 'inventory',
      name: 'Inventario',
      description: 'Control de stock de medicamentos',
      icon: Package,
      route: '/dashboard/pharmacy/inventory',
      permissions: ['VIEW_INVENTORY', 'MANAGE_INVENTORY'],
      isCore: true
    },
    {
      id: 'couriers',
      name: 'Repartidores',
      description: 'Gestión de personal de entrega',
      icon: Truck,
      route: '/dashboard/pharmacy/couriers',
      permissions: ['MANAGE_COURIERS'],
      isCore: false
    },
    {
      id: 'clients',
      name: 'Clientes',
      description: 'Base de datos de clientes',
      icon: Users,
      route: '/dashboard/pharmacy/clients',
      permissions: ['VIEW_CLIENTS'],
      isCore: false
    },
    {
      id: 'reports',
      name: 'Reportes',
      description: 'Análisis y reportes de ventas',
      icon: FileText,
      route: '/dashboard/pharmacy/reports',
      permissions: ['VIEW_REPORTS'],
      isCore: false
    },
    {
      id: 'settings',
      name: 'Configuración',
      description: 'Configuración de la farmacia',
      icon: Settings,
      route: '/dashboard/pharmacy/settings',
      permissions: ['CONFIGURE_PHARMACY'],
      isCore: true
    }
  ],
  permissions: [
    'VIEW_DASHBOARD',
    'VIEW_INVENTORY',
    'MANAGE_INVENTORY',
    'VIEW_ORDERS',
    'PROCESS_ORDERS',
    'VERIFY_PRESCRIPTIONS',
    'MANAGE_COURIERS',
    'VIEW_CLIENTS',
    'VIEW_REPORTS',
    'CONFIGURE_PHARMACY'
  ],
  dashboardRoute: '/dashboard/pharmacy'
}

// Laboratory Configuration
const laboratoryConfig: ProviderConfig = {
  id: 'laboratory',
  name: 'laboratory',
  displayName: 'Laboratorio',
  description: 'Gestión completa de laboratorio clínico con análisis y resultados',
  icon: TestTube,
  color: 'green',
  bgColor: 'bg-green-600',
  features: [
    'Gestión de órdenes de laboratorio',
    'Administración de técnicos especializados',
    'Procesamiento de muestras',
    'Validación de resultados',
    'Control de calidad',
    'Reportes de rendimiento'
  ],
  modules: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Panel principal con métricas de laboratorio',
      icon: BarChart3,
      route: '/dashboard/laboratory',
      permissions: ['VIEW_DASHBOARD'],
      isCore: true
    },
    {
      id: 'orders',
      name: 'Órdenes',
      description: 'Gestión de órdenes de análisis',
      icon: ClipboardList,
      route: '/dashboard/laboratory/orders',
      permissions: ['VIEW_ORDERS', 'MANAGE_ORDERS'],
      isCore: true
    },
    {
      id: 'tests',
      name: 'Catálogo de Pruebas',
      description: 'Gestión del catálogo de análisis',
      icon: TestTube,
      route: '/dashboard/laboratory/tests',
      permissions: ['MANAGE_TESTS'],
      isCore: true
    },
    {
      id: 'technicians',
      name: 'Técnicos',
      description: 'Gestión de personal técnico',
      icon: User,
      route: '/dashboard/laboratory/technicians',
      permissions: ['MANAGE_TECHNICIANS'],
      isCore: false
    },
    {
      id: 'results',
      name: 'Resultados',
      description: 'Validación y entrega de resultados',
      icon: FileText,
      route: '/dashboard/laboratory/results',
      permissions: ['ENTER_RESULTS', 'VALIDATE_RESULTS'],
      isCore: true
    },
    {
      id: 'reports',
      name: 'Reportes',
      description: 'Análisis de desempeño del laboratorio',
      icon: FileText,
      route: '/dashboard/laboratory/reports',
      permissions: ['VIEW_REPORTS'],
      isCore: false
    },
    {
      id: 'settings',
      name: 'Configuración',
      description: 'Configuración del laboratorio',
      icon: Settings,
      route: '/dashboard/laboratory/settings',
      permissions: ['CONFIGURE_LABORATORY'],
      isCore: true
    }
  ],
  permissions: [
    'VIEW_DASHBOARD',
    'VIEW_ORDERS',
    'MANAGE_ORDERS',
    'PROCESS_SAMPLES',
    'ENTER_RESULTS',
    'VALIDATE_RESULTS',
    'MANAGE_TESTS',
    'MANAGE_TECHNICIANS',
    'VIEW_REPORTS',
    'CONFIGURE_LABORATORY'
  ],
  dashboardRoute: '/dashboard/laboratory'
}

// Medical Center Configuration
const medicalCenterConfig: ProviderConfig = {
  id: 'medical-center',
  name: 'medical-center',
  displayName: 'Centro Médico',
  description: 'Gestión hospitalaria integral con citas, pacientes y personal médico',
  icon: Building2,
  color: 'purple',
  bgColor: 'bg-purple-600',
  features: [
    'Gestión de citas médicas',
    'Registro y seguimiento de pacientes',
    'Administración de personal médico',
    'Gestión de departamentos',
    'Control de instalaciones',
    'Reportes médicos y administrativos'
  ],
  modules: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Panel principal del centro médico',
      icon: BarChart3,
      route: '/dashboard/medical-center',
      permissions: ['VIEW_DASHBOARD'],
      isCore: true
    },
    {
      id: 'appointments',
      name: 'Citas',
      description: 'Gestión de citas médicas',
      icon: Calendar,
      route: '/dashboard/medical-center/appointments',
      permissions: ['VIEW_APPOINTMENTS', 'MANAGE_APPOINTMENTS'],
      isCore: true
    },
    {
      id: 'patients',
      name: 'Pacientes',
      description: 'Registro y seguimiento de pacientes',
      icon: Users,
      route: '/dashboard/medical-center/patients',
      permissions: ['VIEW_PATIENTS', 'MANAGE_PATIENTS'],
      isCore: true
    },
    {
      id: 'doctors',
      name: 'Médicos',
      description: 'Gestión del personal médico',
      icon: User,
      route: '/dashboard/medical-center/doctors',
      permissions: ['MANAGE_DOCTORS'],
      isCore: false
    },
    {
      id: 'departments',
      name: 'Departamentos',
      description: 'Gestión de departamentos médicos',
      icon: Building2,
      route: '/dashboard/medical-center/departments',
      permissions: ['MANAGE_DEPARTMENTS'],
      isCore: false
    },
    {
      id: 'facilities',
      name: 'Instalaciones',
      description: 'Gestión de espacios y recursos',
      icon: Building2,
      route: '/dashboard/medical-center/facilities',
      permissions: ['MANAGE_FACILITIES'],
      isCore: false
    },
    {
      id: 'reports',
      name: 'Reportes',
      description: 'Reportes médicos y administrativos',
      icon: FileText,
      route: '/dashboard/medical-center/reports',
      permissions: ['VIEW_REPORTS'],
      isCore: false
    },
    {
      id: 'settings',
      name: 'Configuración',
      description: 'Configuración del centro médico',
      icon: Settings,
      route: '/dashboard/medical-center/settings',
      permissions: ['CONFIGURE_CENTER'],
      isCore: true
    }
  ],
  permissions: [
    'VIEW_DASHBOARD',
    'VIEW_APPOINTMENTS',
    'MANAGE_APPOINTMENTS',
    'VIEW_PATIENTS',
    'MANAGE_PATIENTS',
    'ACCESS_RECORDS',
    'MANAGE_DOCTORS',
    'MANAGE_DEPARTMENTS',
    'MANAGE_FACILITIES',
    'VIEW_REPORTS',
    'CONFIGURE_CENTER'
  ],
  dashboardRoute: '/dashboard/medical-center'
}

// Emergency Configuration
const emergencyConfig: ProviderConfig = {
  id: 'emergency',
  name: 'emergency',
  displayName: 'Servicios de Emergencia',
  description: 'Gestión de servicios médicos de emergencia y ambulancias',
  icon: Truck,
  color: 'red',
  bgColor: 'bg-red-600',
  features: [
    'Gestión de solicitudes de emergencia',
    'Despacho de unidades médicas',
    'Administración de paramédicos',
    'Control de vehículos y equipos',
    'Protocolos médicos de emergencia',
    'Reportes de tiempo de respuesta'
  ],
  modules: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Centro de control de emergencias',
      icon: BarChart3,
      route: '/dashboard/emergency',
      permissions: ['VIEW_DASHBOARD'],
      isCore: true
    },
    {
      id: 'requests',
      name: 'Solicitudes',
      description: 'Gestión de llamadas de emergencia',
      icon: AlertTriangle,
      route: '/dashboard/emergency/requests',
      permissions: ['VIEW_REQUESTS', 'MANAGE_REQUESTS'],
      isCore: true
    },
    {
      id: 'paramedics',
      name: 'Paramédicos',
      description: 'Gestión de personal paramédico',
      icon: User,
      route: '/dashboard/emergency/paramedics',
      permissions: ['MANAGE_PARAMEDICS'],
      isCore: true
    },
    {
      id: 'vehicles',
      name: 'Vehículos',
      description: 'Gestión de ambulancias y equipos',
      icon: Truck,
      route: '/dashboard/emergency/vehicles',
      permissions: ['MANAGE_VEHICLES'],
      isCore: false
    },
    {
      id: 'protocols',
      name: 'Protocolos',
      description: 'Protocolos médicos de emergencia',
      icon: FileText,
      route: '/dashboard/emergency/protocols',
      permissions: ['ACCESS_MEDICAL_PROTOCOLS'],
      isCore: false
    },
    {
      id: 'reports',
      name: 'Reportes',
      description: 'Análisis de desempeño y tiempos',
      icon: FileText,
      route: '/dashboard/emergency/reports',
      permissions: ['VIEW_REPORTS'],
      isCore: false
    },
    {
      id: 'settings',
      name: 'Configuración',
      description: 'Configuración del servicio de emergencia',
      icon: Settings,
      route: '/dashboard/emergency/settings',
      permissions: ['CONFIGURE_EMERGENCY'],
      isCore: true
    }
  ],
  permissions: [
    'VIEW_DASHBOARD',
    'VIEW_REQUESTS',
    'MANAGE_REQUESTS',
    'DISPATCH_UNITS',
    'MANAGE_PARAMEDICS',
    'MANAGE_VEHICLES',
    'ACCESS_MEDICAL_PROTOCOLS',
    'VIEW_REPORTS',
    'CONFIGURE_EMERGENCY'
  ],
  dashboardRoute: '/dashboard/emergency'
}

// Homecare Configuration
const homecareConfig: ProviderConfig = {
  id: 'homecare',
  name: 'homecare',
  displayName: 'Atención Domiciliaria',
  description: 'Gestión de servicios de cuidado y atención médica en el hogar',
  icon: Heart,
  color: 'pink',
  bgColor: 'bg-pink-600',
  features: [
    'Gestión de servicios a domicilio',
    'Administración de cuidadores',
    'Planes de cuidado personalizados',
    'Seguimiento de pacientes',
    'Coordinación familiar',
    'Reportes de calidad de atención'
  ],
  modules: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Panel de control de atención domiciliaria',
      icon: BarChart3,
      route: '/dashboard/homecare',
      permissions: ['VIEW_DASHBOARD'],
      isCore: true
    },
    {
      id: 'bookings',
      name: 'Servicios',
      description: 'Gestión de citas y servicios',
      icon: Calendar,
      route: '/dashboard/homecare/bookings',
      permissions: ['VIEW_BOOKINGS', 'MANAGE_BOOKINGS'],
      isCore: true
    },
    {
      id: 'caregivers',
      name: 'Cuidadores',
      description: 'Gestión del personal de cuidado',
      icon: User,
      route: '/dashboard/homecare/caregivers',
      permissions: ['MANAGE_CAREGIVERS'],
      isCore: true
    },
    {
      id: 'clients',
      name: 'Clientes',
      description: 'Registro y seguimiento de clientes',
      icon: Users,
      route: '/dashboard/homecare/clients',
      permissions: ['VIEW_CLIENTS', 'MANAGE_CLIENTS'],
      isCore: true
    },
    {
      id: 'care-plans',
      name: 'Planes de Cuidado',
      description: 'Gestión de planes personalizados',
      icon: FileText,
      route: '/dashboard/homecare/care-plans',
      permissions: ['VIEW_CARE_PLANS', 'MANAGE_CARE_PLANS'],
      isCore: false
    },
    {
      id: 'reports',
      name: 'Reportes',
      description: 'Análisis de calidad y desempeño',
      icon: FileText,
      route: '/dashboard/homecare/reports',
      permissions: ['VIEW_REPORTS'],
      isCore: false
    },
    {
      id: 'settings',
      name: 'Configuración',
      description: 'Configuración del servicio domiciliario',
      icon: Settings,
      route: '/dashboard/homecare/settings',
      permissions: ['CONFIGURE_HOMECARE'],
      isCore: true
    }
  ],
  permissions: [
    'VIEW_DASHBOARD',
    'VIEW_BOOKINGS',
    'MANAGE_BOOKINGS',
    'VIEW_CLIENTS',
    'MANAGE_CLIENTS',
    'MANAGE_CAREGIVERS',
    'VIEW_CARE_PLANS',
    'MANAGE_CARE_PLANS',
    'MANAGE_SERVICES',
    'VIEW_REPORTS',
    'CONFIGURE_HOMECARE'
  ],
  dashboardRoute: '/dashboard/homecare'
}

// Export all configurations
export const providerConfigs: Record<ProviderType, ProviderConfig> = {
  pharmacy: pharmacyConfig,
  laboratory: laboratoryConfig,
  'medical-center': medicalCenterConfig,
  emergency: emergencyConfig,
  homecare: homecareConfig
}

// Utility functions
export const getProviderConfig = (providerType: ProviderType): ProviderConfig => {
  return providerConfigs[providerType]
}

export const getProviderModules = (providerType: ProviderType, userPermissions: string[] = []): ProviderModule[] => {
  const config = getProviderConfig(providerType)
  return config.modules.filter(module => 
    module.isCore || module.permissions.some(permission => userPermissions.includes(permission))
  )
}

export const hasPermission = (providerType: ProviderType, userPermissions: string[], requiredPermission: string): boolean => {
  return userPermissions.includes(requiredPermission)
}

export const getProviderByRoute = (route: string): ProviderConfig | null => {
  for (const config of Object.values(providerConfigs)) {
    if (route.startsWith(config.dashboardRoute)) {
      return config
    }
  }
  return null
} 