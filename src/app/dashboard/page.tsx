'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MoreHorizontal, TrendingUp, Users, Calendar, DollarSign, Bell, 
  Activity, Heart, Clock, AlertTriangle, CheckCircle, ArrowUp, 
  ArrowDown, Zap, RefreshCw,
  Eye, UserPlus, FileText, Pill, Shield, Database, UserCheck, Settings
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import PlatformAdminDashboard from "@/components/dashboards/PlatformAdminDashboard";
import PlatformFinanceDashboard from "@/components/dashboards/PlatformFinanceDashboard";
import PlatformSupportDashboard from "@/components/dashboards/PlatformSupportDashboard";
import MedicalCenterDashboard from "@/components/dashboards/MedicalCenterDashboard";
import PharmacyDashboard from "@/components/dashboards/PharmacyDashboard";
import LaboratoryDashboard from "@/components/dashboards/LaboratoryDashboard";
import { SimpleChart } from "@/components/ui/SimpleChart";
import { useNotifications } from "@/contexts/NotificationContext";
import { useAuth } from "@/contexts/AuthContext";

// Enhanced metrics with real-time simulation
const useRealTimeMetrics = () => {
  const [metrics, setMetrics] = useState([
    {
      title: "Pacientes Activos",
      value: 1247,
      change: 12,
      changeType: "positive" as const,
      icon: Users,
      trend: [
        { value: 120, label: 'D1' },
        { value: 132, label: 'D2' },
        { value: 145, label: 'D3' },
        { value: 138, label: 'D4' },
        { value: 155, label: 'D5' },
        { value: 147, label: 'D6' },
        { value: 162, label: 'D7' }
      ],
      color: "bg-blue-500"
    },
    {
      title: "Consultas Hoy",
      value: 89,
      change: 8,
      changeType: "positive" as const,
      icon: Calendar,
      trend: [
        { value: 45, label: 'H1' },
        { value: 52, label: 'H2' },
        { value: 48, label: 'H3' },
        { value: 61, label: 'H4' },
        { value: 73, label: 'H5' },
        { value: 82, label: 'H6' },
        { value: 89, label: 'H7' }
      ],
      color: "bg-green-500"
    },
    {
      title: "Personal Activo",
      value: 24,
      change: 2,
      changeType: "positive" as const,
      icon: Activity,
      trend: [
        { value: 20, label: 'D1' },
        { value: 22, label: 'D2' },
        { value: 21, label: 'D3' },
        { value: 23, label: 'D4' },
        { value: 24, label: 'D5' },
        { value: 22, label: 'D6' },
        { value: 24, label: 'D7' }
      ],
      color: "bg-purple-500"
    },
    {
      title: "Ingresos Hoy",
      value: 15420,
      change: 320,
      changeType: "positive" as const,
      icon: DollarSign,
      trend: [
        { value: 12000, label: 'D1' },
        { value: 13200, label: 'D2' },
        { value: 12800, label: 'D3' },
        { value: 14100, label: 'D4' },
        { value: 14800, label: 'D5' },
        { value: 15100, label: 'D6' },
        { value: 15420, label: 'D7' }
      ],
      color: "bg-cyan-500"
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const newValue = metric.value + Math.floor(Math.random() * 3) - 1;
        const lastTrendValue = metric.trend[metric.trend.length - 1].value;
        const newTrendValue = lastTrendValue + Math.floor(Math.random() * 10) - 5;
        
        return {
          ...metric,
          value: newValue,
          trend: [
            ...metric.trend.slice(1), 
            { value: newTrendValue, label: `T${Date.now() % 100}` }
          ]
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// Mock users for testing
const testUsers = [
  {
    id: '1',
    name: 'Administrador Sistema',
    email: 'admin@medgohub.com',
    role: 'PLATFORM',
    description: 'Acceso completo al sistema'
  },
  {
    id: '4', 
    name: 'Dr. María González (Centro Médico)',
    email: 'provider.medical@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'MEDICAL_CENTER',
    description: 'Proveedor médico verificado'
  },
  {
    id: '5',
    name: 'Farmacia Central',
    email: 'provider.pharmacy@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'PHARMACY',
    description: 'Proveedor farmacéutico'
  },
  {
    id: '2',
    name: 'Ana Financiera (Staff)',
    email: 'finance@medgohub.com',
    role: 'STAFF',
    staff_type: 'FINANCE',
    description: 'Personal financiero'
  },
  {
    id: '9',
    name: 'Juan Paciente',
    email: 'paciente@medgohub.com',
    role: 'CLIENT',
    description: 'Cliente/Paciente'
  }
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    type: 'patient_registered',
    title: 'Nuevo paciente registrado',
    description: 'María González se registró en el sistema',
    time: '2 min',
    icon: UserPlus,
    color: 'text-green-600 bg-green-100'
  },
  {
    id: 2,
    type: 'consultation_completed',
    title: 'Consulta completada',
    description: 'Dr. Pérez completó consulta con Juan Martínez',
    time: '5 min',
    icon: CheckCircle,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    id: 3,
    type: 'prescription_issued',
    title: 'Receta emitida',
    description: 'Medicamento prescrito para Ana López',
    time: '8 min',
    icon: Pill,
    color: 'text-purple-600 bg-purple-100'
  },
  {
    id: 4,
    type: 'report_generated',
    title: 'Reporte generado',
    description: 'Reporte mensual de estadísticas',
    time: '12 min',
    icon: FileText,
    color: 'text-orange-600 bg-orange-100'
  },
  {
    id: 5,
    type: 'system_alert',
    title: 'Alerta del sistema',
    description: 'Backup automático completado',
    time: '15 min',
    icon: Shield,
    color: 'text-gray-700 bg-gray-100'
  }
];

// Quick actions
const quickActions = [
  { 
    title: 'Nueva Consulta', 
    href: '/dashboard/consultas', 
    icon: Calendar, 
    color: 'bg-blue-500 hover:bg-blue-600',
    description: 'Programar cita médica'
  },
  { 
    title: 'Farmacia', 
    href: '/dashboard/farmacia', 
    icon: Pill, 
    color: 'bg-green-500 hover:bg-green-600',
    description: 'Gestionar medicamentos'
  },
  { 
    title: 'Emergencias', 
    href: '/dashboard/emergencias', 
    icon: AlertTriangle, 
    color: 'bg-red-500 hover:bg-red-600',
    description: 'Servicios de ambulancia'
  },
  { 
    title: 'Cuidado Domiciliario', 
    href: '/dashboard/homecare', 
    icon: Heart, 
    color: 'bg-purple-500 hover:bg-purple-600',
    description: 'Servicios en el hogar'
  },
  { 
    title: 'Laboratorio', 
    href: '/dashboard/laboratorio', 
    icon: Activity, 
    color: 'bg-indigo-500 hover:bg-indigo-600',
    description: 'Pruebas diagnósticas'
  },
  { 
    title: 'Registros Médicos', 
    href: '/dashboard/registros', 
    icon: FileText, 
    color: 'bg-cyan-500 hover:bg-cyan-600',
    description: 'Historial de pacientes'
  },
  { 
    title: 'Registrar Paciente', 
    href: '/dashboard/pacientes', 
    icon: UserPlus, 
    color: 'bg-orange-500 hover:bg-orange-600',
    description: 'Nuevo registro de paciente'
  },
  { 
    title: 'Ver Reportes', 
    href: '/dashboard/reportes', 
    icon: Database, 
    color: 'bg-gray-500 hover:bg-gray-600',
    description: 'Estadísticas y análisis'
  }
];

export default function DashboardPage() {
  const { addNotification } = useNotifications();
  const { user, login } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const metrics = useRealTimeMetrics();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate network status
    const networkTimer = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(networkTimer);
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    addNotification({
      type: 'success',
      title: 'Datos actualizados',
      message: 'La información del dashboard se ha actualizado correctamente.'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(amount);
  };

  const handleUserSwitch = async (testUser: any) => {
    try {
      const success = await login(testUser.email, 'password123');
      if (success) {
        setShowUserSelector(false);
        addNotification({
          type: 'success',
          title: 'Usuario cambiado',
          message: `Ahora estás logueado como: ${testUser.name}`
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo cambiar de usuario'
      });
    }
  };

  // If user is PLATFORM, show the specialized Platform Admin Dashboard
  if (user?.role === 'PLATFORM') {
    return (
      <DashboardLayout>
        <PlatformAdminDashboard />
      </DashboardLayout>
    );
  }

  // If user is STAFF with FINANCE type, show the Platform Finance Dashboard
  if (user?.role === 'STAFF' && user?.staff_type === 'FINANCE') {
    return (
      <DashboardLayout>
        <PlatformFinanceDashboard />
      </DashboardLayout>
    );
  }

  // If user is STAFF with SUPPORT type, show the Platform Support Dashboard
  if (user?.role === 'STAFF' && user?.staff_type === 'SUPPORT') {
    return (
      <DashboardLayout>
        <PlatformSupportDashboard />
      </DashboardLayout>
    );
  }

  // If user is PROVIDER with MEDICAL_CENTER type, show the Medical Center Dashboard
  if (user?.role === 'PROVIDER' && user?.provider_type === 'MEDICAL_CENTER') {
    return (
      <DashboardLayout>
        <MedicalCenterDashboard />
      </DashboardLayout>
    );
  }

  // If user is PROVIDER with PHARMACY type, show the Pharmacy Dashboard
  if (user?.role === 'PROVIDER' && user?.provider_type === 'PHARMACY') {
    return (
      <DashboardLayout>
        <PharmacyDashboard />
      </DashboardLayout>
    );
  }

  // If user is PROVIDER with LABORATORY type, show the Laboratory Dashboard
  if (user?.role === 'PROVIDER' && user?.provider_type === 'LABORATORY') {
    return (
      <DashboardLayout>
        <LaboratoryDashboard />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="/dashboard">
      <div className="space-y-6">
        {/* Header Section with User Selector */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ¡Bienvenido, {user?.display_name || user?.name || 'Usuario'}!
            </h1>
            <p className="text-gray-700 mt-1">
              {currentTime.toLocaleString('es-GT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          {/* User Role Badge and Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'PLATFORM' ? 'bg-purple-100 text-purple-800' :
                user?.role === 'PROVIDER' ? 'bg-blue-100 text-blue-800' :
                user?.role === 'STAFF' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-900'
              }`}>
                {user?.role} {user?.provider_type ? `(${user.provider_type})` : ''}
              </span>
              
              {/* Debug/Test User Selector */}
              <button
                onClick={() => setShowUserSelector(!showUserSelector)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                title="Cambiar usuario (Solo para pruebas)"
              >
                <UserCheck className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-500">
                {isOnline ? 'En línea' : 'Sin conexión'}
              </span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm">Actualizar</span>
            </button>
          </div>
        </div>

        {/* User Selector Modal */}
        {showUserSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Seleccionar Usuario de Prueba</h3>
                <button
                  onClick={() => setShowUserSelector(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {testUsers.map((testUser) => (
                  <button
                    key={testUser.id}
                    onClick={() => handleUserSwitch(testUser)}
                    className={`w-full text-left p-3 rounded-lg border hover:bg-gray-50 ${
                      user?.id === testUser.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{testUser.name}</div>
                    <div className="text-sm text-gray-700">{testUser.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{testUser.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.title.includes('Ingresos') 
                        ? formatCurrency(metric.value) 
                        : metric.value.toLocaleString()
                      }
                    </p>
                    <div className="flex items-center mt-2">
                      {metric.changeType === 'positive' ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ml-1 ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs ayer</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <SimpleChart data={metric.trend} color={metric.color} type="line" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className={`flex items-center space-x-3 p-4 rounded-lg ${action.color} text-white transition-all duration-200 hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
                <Link 
                  href="/dashboard/historiales"
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Ver todo
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-700">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 