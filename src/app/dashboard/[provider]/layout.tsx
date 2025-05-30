'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Package, 
  TestTube, 
  Building2, 
  Truck, 
  Heart,
  Settings,
  Users,
  FileText,
  Calendar,
  DollarSign,
  BarChart3,
  Bell,
  LogOut
} from 'lucide-react'

// Navigation configurations for each provider type
const providerNavigations = {
  pharmacy: [
    { name: 'Dashboard', href: '/dashboard/pharmacy', icon: BarChart3 },
    { name: 'Órdenes', href: '/dashboard/pharmacy/orders', icon: Package },
    { name: 'Inventario', href: '/dashboard/pharmacy/inventory', icon: Package },
    { name: 'Repartidores', href: '/dashboard/pharmacy/couriers', icon: Truck },
    { name: 'Clientes', href: '/dashboard/pharmacy/clients', icon: Users },
    { name: 'Reportes', href: '/dashboard/pharmacy/reports', icon: FileText },
    { name: 'Configuración', href: '/dashboard/pharmacy/settings', icon: Settings }
  ],
  laboratory: [
    { name: 'Dashboard', href: '/dashboard/laboratory', icon: BarChart3 },
    { name: 'Órdenes', href: '/dashboard/laboratory/orders', icon: TestTube },
    { name: 'Pruebas', href: '/dashboard/laboratory/tests', icon: TestTube },
    { name: 'Técnicos', href: '/dashboard/laboratory/technicians', icon: Users },
    { name: 'Resultados', href: '/dashboard/laboratory/results', icon: FileText },
    { name: 'Reportes', href: '/dashboard/laboratory/reports', icon: FileText },
    { name: 'Configuración', href: '/dashboard/laboratory/settings', icon: Settings }
  ],
  'medical-center': [
    { name: 'Dashboard', href: '/dashboard/medical-center', icon: BarChart3 },
    { name: 'Citas', href: '/dashboard/medical-center/appointments', icon: Calendar },
    { name: 'Pacientes', href: '/dashboard/medical-center/patients', icon: Users },
    { name: 'Médicos', href: '/dashboard/medical-center/doctors', icon: Users },
    { name: 'Departamentos', href: '/dashboard/medical-center/departments', icon: Building2 },
    { name: 'Instalaciones', href: '/dashboard/medical-center/facilities', icon: Building2 },
    { name: 'Reportes', href: '/dashboard/medical-center/reports', icon: FileText },
    { name: 'Configuración', href: '/dashboard/medical-center/settings', icon: Settings }
  ],
  emergency: [
    { name: 'Dashboard', href: '/dashboard/emergency', icon: BarChart3 },
    { name: 'Solicitudes', href: '/dashboard/emergency/requests', icon: Truck },
    { name: 'Paramédicos', href: '/dashboard/emergency/paramedics', icon: Users },
    { name: 'Vehículos', href: '/dashboard/emergency/vehicles', icon: Truck },
    { name: 'Protocolos', href: '/dashboard/emergency/protocols', icon: FileText },
    { name: 'Reportes', href: '/dashboard/emergency/reports', icon: FileText },
    { name: 'Configuración', href: '/dashboard/emergency/settings', icon: Settings }
  ],
  homecare: [
    { name: 'Dashboard', href: '/dashboard/homecare', icon: BarChart3 },
    { name: 'Servicios', href: '/dashboard/homecare/bookings', icon: Heart },
    { name: 'Cuidadores', href: '/dashboard/homecare/caregivers', icon: Users },
    { name: 'Clientes', href: '/dashboard/homecare/clients', icon: Users },
    { name: 'Planes de Cuidado', href: '/dashboard/homecare/care-plans', icon: FileText },
    { name: 'Reportes', href: '/dashboard/homecare/reports', icon: FileText },
    { name: 'Configuración', href: '/dashboard/homecare/settings', icon: Settings }
  ]
}

const providerNames = {
  pharmacy: 'Farmacia',
  laboratory: 'Laboratorio',
  'medical-center': 'Centro Médico',
  emergency: 'Emergencias',
  homecare: 'Atención Domiciliaria'
}

const providerColors = {
  pharmacy: 'bg-blue-600',
  laboratory: 'bg-green-600',
  'medical-center': 'bg-purple-600',
  emergency: 'bg-red-600',
  homecare: 'bg-pink-600'
}

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const providerType = params.provider as keyof typeof providerNavigations
  const navigation = providerNavigations[providerType] || []
  const providerName = providerNames[providerType] || 'Proveedor'
  const providerColor = providerColors[providerType] || 'bg-gray-600'

  useEffect(() => {
    // Load user data and validate provider access
    loadUserData()
  }, [providerType])

  const loadUserData = async () => {
    try {
      // Mock user data - replace with actual API call
      const mockUser = {
        id: '1',
        name: 'Admin Usuario',
        email: 'admin@provider.com',
        role: 'PROVIDER',
        providerType: providerType,
        avatar: undefined
      }

      // Validate if user has access to this provider type
      if (mockUser.providerType !== providerType) {
        router.push('/dashboard')
        return
      }

      setCurrentUser(mockUser)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading user data:', error)
      router.push('/login')
    }
  }

  const handleLogout = () => {
    // Implement logout logic
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!navigation.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Tipo de proveedor no válido</h1>
          <p className="text-gray-600 mt-2">El tipo de proveedor especificado no existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className={`${providerColor} text-white p-4`}>
          <h1 className="text-xl font-bold">{providerName}</h1>
          <p className="text-sm opacity-90">Panel de Administración</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = typeof window !== 'undefined' && window.location.pathname === item.href
            
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? `${providerColor} text-white`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-sm text-gray-600">{currentUser?.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Notificaciones</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {providerName}
              </h2>
              <div className="text-sm text-gray-500">
                Panel de Control
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 