'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MoreHorizontal, TrendingUp, Users, Calendar, DollarSign, Bell, 
  Activity, Heart, Clock, AlertTriangle, CheckCircle, ArrowUp, 
  ArrowDown, Zap, RefreshCw,
  Eye, UserPlus, FileText, Pill, Shield, Database
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
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
      trend: [120, 132, 145, 138, 155, 147, 162],
      color: "bg-blue-500"
    },
    {
      title: "Consultas Hoy",
      value: 89,
      change: 8,
      changeType: "positive" as const,
      icon: Calendar,
      trend: [45, 52, 48, 61, 73, 82, 89],
      color: "bg-green-500"
    },
    {
      title: "Personal Activo",
      value: 24,
      change: 2,
      changeType: "positive" as const,
      icon: Activity,
      trend: [20, 22, 21, 23, 24, 22, 24],
      color: "bg-purple-500"
    },
    {
      title: "Ingresos Hoy",
      value: 15420,
      change: 320,
      changeType: "positive" as const,
      icon: DollarSign,
      trend: [12000, 13200, 12800, 14100, 14800, 15100, 15420],
      color: "bg-cyan-500"
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 3) - 1,
        trend: [...metric.trend.slice(1), metric.value + Math.floor(Math.random() * 10) - 5]
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

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
    color: 'text-gray-600 bg-gray-100'
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
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
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

  useEffect(() => {
    // Welcome notification
    const welcomeTimer = setTimeout(() => {
      addNotification({
        type: 'info',
        title: '¡Bienvenido de vuelta!',
        message: `Buenos días ${user?.name || 'Usuario'}, tienes 3 nuevas notificaciones`,
        action: {
          label: 'Ver todas',
          onClick: () => console.log('Ver notificaciones')
        }
      });
    }, 2000);

    return () => clearTimeout(welcomeTimer);
  }, [addNotification, user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    addNotification({
      type: 'success',
      title: 'Datos actualizados',
      message: 'La información del dashboard se ha actualizado correctamente'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  return (
    <DashboardLayout currentPage="/dashboard">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Panel de Control
              </h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'En línea' : 'Sin conexión'}
                </span>
              </div>
            </div>
            <p className="text-gray-600">
              Bienvenido de vuelta, {user?.name || 'Usuario'} • {currentTime.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {currentTime.toLocaleTimeString('es-ES')}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
            <Link
              href="/dashboard/configuracion"
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Configuración</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {metric.changeType === 'positive' ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    +{metric.change}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  {metric.title.includes('Ingresos') ? formatCurrency(metric.value) : metric.value.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </div>

              {/* Mini trend chart */}
              <div className="h-8">
                <SimpleChart 
                  data={metric.trend.map((value, i) => ({ label: `${i}`, value }))}
                  type="line"
                  color={metric.color.replace('bg-', '').replace('-500', '')}
                  height={32}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
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
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 