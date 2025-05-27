'use client';

import { useState } from 'react';
import { Home, MapPin, User, Calendar, Star, Heart, Phone } from 'lucide-react';
import { HomecareBooking } from '@/types';

interface HomecareBookingCardProps {
  booking: HomecareBooking;
  onViewDetails: (booking: HomecareBooking) => void;
  onTrackCaregiver?: (booking: HomecareBooking) => void;
  onContactCaregiver?: (booking: HomecareBooking) => void;
  onViewCarePlan?: (booking: HomecareBooking) => void;
}

const HomecareBookingCard = ({ 
  booking, 
  onViewDetails, 
  onTrackCaregiver, 
  onContactCaregiver,
  onViewCarePlan 
}: HomecareBookingCardProps) => {
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecurringPatternText = (pattern: string) => {
    switch (pattern) {
      case 'daily':
        return 'Diario';
      case 'weekly':
        return 'Semanal';
      case 'monthly':
        return 'Mensual';
      case 'none':
        return 'Único';
      default:
        return 'Único';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} min`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}min`;
    }
  };

  const canTrack = ['confirmed', 'in_progress'].includes(booking.status) && booking.caregiverId;
  const canContact = booking.caregiverId && ['confirmed', 'in_progress'].includes(booking.status);
  const hasCarePlan = booking.carePlan;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{booking.serviceName}</h3>
            <p className="text-sm text-gray-600">Reserva {booking.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {booking.recurringPattern && booking.recurringPattern !== 'none' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
              <Calendar className="w-3 h-3 mr-1" />
              {getRecurringPatternText(booking.recurringPattern)}
            </span>
          )}
          <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status === 'scheduled' && 'Programado'}
            {booking.status === 'confirmed' && 'Confirmado'}
            {booking.status === 'in_progress' && 'En progreso'}
            {booking.status === 'completed' && 'Completado'}
            {booking.status === 'cancelled' && 'Cancelado'}
            {booking.status === 'rescheduled' && 'Reprogramado'}
          </span>
        </div>
      </div>

      {/* Service Details */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Fecha y hora</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              {formatDate(booking.scheduledDate)} a las {booking.scheduledTime}
            </p>
            <p className="text-xs text-gray-500 ml-6">
              Duración: {formatDuration(booking.duration)}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Ubicación</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              {booking.location.address}
            </p>
            {booking.location.landmark && (
              <p className="text-xs text-gray-500 ml-6">{booking.location.landmark}</p>
            )}
          </div>
        </div>
      </div>

      {/* Caregiver Info */}
      {booking.caregiverId && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-1">
            <User className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Cuidador asignado</span>
          </div>
          <p className="text-sm text-green-800 ml-6">ID: {booking.caregiverId}</p>
          
          {/* Arrival and Service Times */}
          {booking.caregiverArrival && (
            <div className="mt-2 ml-6">
              <p className="text-xs text-green-600">
                Llegada: {formatDateTime(booking.caregiverArrival)}
              </p>
            </div>
          )}
          
          {booking.serviceStart && booking.serviceEnd && (
            <div className="mt-1 ml-6">
              <p className="text-xs text-green-600">
                Servicio: {formatDateTime(booking.serviceStart)} - {formatDateTime(booking.serviceEnd)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Special Instructions */}
      {booking.specialInstructions && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Instrucciones especiales</h4>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              {showFullInstructions || booking.specialInstructions.length <= 100
                ? booking.specialInstructions
                : `${booking.specialInstructions.substring(0, 100)}...`
              }
            </p>
            {booking.specialInstructions.length > 100 && (
              <button
                onClick={() => setShowFullInstructions(!showFullInstructions)}
                className="text-blue-600 text-sm hover:text-blue-700 transition-colors mt-1"
              >
                {showFullInstructions ? 'Ver menos' : 'Ver más'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Service Notes */}
      {booking.serviceNotes && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Notas del servicio</h4>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">{booking.serviceNotes}</p>
          </div>
        </div>
      )}

      {/* Cost Information */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Precio del servicio</span>
          <span className="font-semibold text-gray-900">{formatCurrency(booking.price)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Estado del pago</span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
            {booking.paymentStatus === 'pending' && 'Pendiente'}
            {booking.paymentStatus === 'completed' && 'Completado'}
            {booking.paymentStatus === 'refunded' && 'Reembolsado'}
          </span>
        </div>
      </div>

      {/* Rating */}
      {booking.rating && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 mb-1">
            <Star className="w-4 h-4 text-yellow-600 fill-current" />
            <span className="text-sm font-medium text-yellow-900">
              Calificación: {booking.rating.overallRating}/5
            </span>
          </div>
          {booking.rating.comment && (
            <p className="text-sm text-yellow-800">{booking.rating.comment}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(booking)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Ver detalles</span>
        </button>
        
        {hasCarePlan && onViewCarePlan && (
          <button
            onClick={() => onViewCarePlan(booking)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span>Plan de cuidado</span>
          </button>
        )}

        {canTrack && onTrackCaregiver && (
          <button
            onClick={() => onTrackCaregiver(booking)}
            className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <MapPin className="w-4 h-4" />
          </button>
        )}

        {canContact && onContactCaregiver && (
          <button
            onClick={() => onContactCaregiver(booking)}
            className="flex items-center justify-center px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomecareBookingCard; 