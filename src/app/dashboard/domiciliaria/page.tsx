'use client';

import { useState } from 'react';
import { Home, Search, Filter, Plus, Clock, Calendar, Heart, Activity } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import StatCard from '@/components/dashboard/StatCard';
import { useNotifications } from '@/contexts/NotificationContext';
import HomecareBookingCard from '@/components/features/homecare/HomecareBookingCard';
import { mockHomecareBookings } from '@/data/mockData';
import { HomecareBooking } from '@/types';

export default function DomiciliariaPage() {
  const { addNotification } = useNotifications();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRecurring, setSelectedRecurring] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<HomecareBooking[]>(mockHomecareBookings);

  const handleNewService = () => {
    addNotification({
      type: 'info',
      title: 'Nuevo servicio',
      message: 'Abriendo formulario para programar nuevo servicio domiciliario'
    });
  };

  const handleViewDetails = (booking: HomecareBooking) => {
    addNotification({
      type: 'info',
      title: 'Detalles del servicio',
      message: `Visualizando detalles de la reserva ${booking.id}`
    });
  };

  const handleTrackCaregiver = (booking: HomecareBooking) => {
    addNotification({
      type: 'info',
      title: 'Rastreo activo',
      message: `Rastreando cuidador para reserva ${booking.id}`
    });
  };

  const handleContactCaregiver = (booking: HomecareBooking) => {
    addNotification({
      type: 'info',
      title: 'Contacto directo',
      message: `Conectando con cuidador de la reserva ${booking.id}`
    });
  };

  const handleViewCarePlan = (booking: HomecareBooking) => {
    addNotification({
      type: 'info',
      title: 'Plan de cuidado',
      message: `Visualizando plan de cuidado para ${booking.id}`
    });
  };

  const getFilteredBookings = () => {
    let filtered = bookings;

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === selectedStatus);
    }

    // Apply recurring pattern filter
    if (selectedRecurring !== 'all') {
      filtered = filtered.filter(booking => 
        selectedRecurring === 'recurring' 
          ? booking.recurringPattern && booking.recurringPattern !== 'none'
          : booking.recurringPattern === 'none' || !booking.recurringPattern
      );
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.caregiverId && booking.caregiverId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  const filteredBookings = getFilteredBookings();

  // Calculate statistics
  const totalBookings = bookings.length;
  const scheduledBookings = bookings.filter(b => b.status === 'scheduled').length;
  const activeBookings = bookings.filter(b => ['confirmed', 'in_progress'].includes(b.status)).length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const recurringBookings = bookings.filter(b => b.recurringPattern && b.recurringPattern !== 'none').length;

  return (
    <ProtectedRoute requiredPermission="service_delivery">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Atención Domiciliaria</h1>
            <p className="text-gray-600">Gestión de servicios de salud en el hogar del paciente</p>
          </div>
          <button 
            onClick={handleNewService}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Programar Servicio</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-800">Cuidado en casa</span>
            <span className="text-green-600">• Servicios personalizados • Profesionales calificados • Atención de calidad</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Total Servicios"
            value={totalBookings.toString()}
            icon={Home}
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Programados"
            value={scheduledBookings.toString()}
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
            color="blue"
          />
          <StatCard
            title="Activos"
            value={activeBookings.toString()}
            icon={Activity}
            trend={{ value: 3, isPositive: true }}
            color="yellow"
          />
          <StatCard
            title="Completados"
            value={completedBookings.toString()}
            icon={Clock}
            trend={{ value: 12, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Recurrentes"
            value={recurringBookings.toString()}
            icon={Calendar}
            trend={{ value: 2, isPositive: true }}
            color="purple"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por reserva, cliente, servicio, ubicación..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Estado
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="scheduled">Programado</option>
                <option value="confirmed">Confirmado</option>
                <option value="in_progress">En progreso</option>
                <option value="completed">Completado</option>
                <option value="cancelled">Cancelado</option>
                <option value="rescheduled">Reprogramado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Tipo
              </label>
              <select
                value={selectedRecurring}
                onChange={(e) => setSelectedRecurring(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="single">Servicio único</option>
                <option value="recurring">Recurrente</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedRecurring('all');
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay servicios</h3>
              <p className="text-gray-600 mb-4">
                No se encontraron servicios domiciliarios con los criterios seleccionados.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedRecurring('all');
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Ver todos los servicios
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredBookings.map((booking) => (
                <HomecareBookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={handleViewDetails}
                  onTrackCaregiver={handleTrackCaregiver}
                  onContactCaregiver={handleContactCaregiver}
                  onViewCarePlan={handleViewCarePlan}
                />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredBookings.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Mostrando {filteredBookings.length} de {bookings.length} servicios
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Valor total: €{filteredBookings.reduce((sum, booking) => sum + booking.price, 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 