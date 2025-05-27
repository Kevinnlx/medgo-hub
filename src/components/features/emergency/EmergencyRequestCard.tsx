'use client';

import { useState } from 'react';
import { Ambulance, MapPin, Clock, User, Phone, AlertTriangle, Navigation, Star } from 'lucide-react';
import { EmergencyRequest } from '@/types';

interface EmergencyRequestCardProps {
  request: EmergencyRequest;
  onViewDetails: (request: EmergencyRequest) => void;
  onTrackLocation?: (request: EmergencyRequest) => void;
  onContactParamedic?: (request: EmergencyRequest) => void;
}

const EmergencyRequestCard = ({ 
  request, 
  onViewDetails, 
  onTrackLocation, 
  onContactParamedic 
}: EmergencyRequestCardProps) => {
  const [showFullSymptoms, setShowFullSymptoms] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assigned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'en_route':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'arrived':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'transporting':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-500 text-white animate-pulse';
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(1)} km`;
  };

  const getTimeUntilArrival = () => {
    if (request.estimatedArrival) {
      const now = new Date();
      const arrival = new Date(request.estimatedArrival);
      const diffMs = arrival.getTime() - now.getTime();
      const diffMins = Math.ceil(diffMs / (1000 * 60));
      
      if (diffMins <= 0) {
        return 'Llegando ahora';
      } else if (diffMins < 60) {
        return `${diffMins} min`;
      } else {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return `${hours}h ${mins}min`;
      }
    }
    return null;
  };

  const canTrack = ['assigned', 'en_route', 'arrived', 'transporting'].includes(request.status);
  const canContact = request.paramedicId && ['assigned', 'en_route', 'arrived', 'transporting'].includes(request.status);
  const timeUntilArrival = getTimeUntilArrival();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Ambulance className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Emergencia {request.id}</h3>
            <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgencyLevel)}`}>
            {getUrgencyIcon(request.urgencyLevel)}
            <span className="ml-1">
              {request.urgencyLevel === 'critical' && 'Crítico'}
              {request.urgencyLevel === 'high' && 'Alto'}
              {request.urgencyLevel === 'medium' && 'Medio'}
              {request.urgencyLevel === 'low' && 'Bajo'}
            </span>
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(request.status)}`}>
            {request.status === 'requested' && 'Solicitado'}
            {request.status === 'assigned' && 'Asignado'}
            {request.status === 'en_route' && 'En camino'}
            {request.status === 'arrived' && 'En sitio'}
            {request.status === 'transporting' && 'Transportando'}
            {request.status === 'completed' && 'Completado'}
            {request.status === 'cancelled' && 'Cancelado'}
          </span>
        </div>
      </div>

      {/* Location and Timing */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Ubicación</span>
            </div>
            <p className="text-sm text-gray-600 ml-6">
              {request.location.address}
            </p>
            {request.location.landmark && (
              <p className="text-xs text-gray-500 ml-6">{request.location.landmark}</p>
            )}
          </div>

          {request.destination && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Navigation className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Destino</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {request.destination.address}
              </p>
            </div>
          )}
        </div>

        {/* Timing and Distance */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Distancia: <span className="font-medium text-gray-900">{formatDistance(request.distance)}</span>
            </span>
            {timeUntilArrival && (
              <span className="text-gray-600">
                Llegada: <span className="font-medium text-gray-900">{timeUntilArrival}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Síntomas reportados</h4>
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-800">
            {showFullSymptoms || request.symptoms.length <= 100
              ? request.symptoms
              : `${request.symptoms.substring(0, 100)}...`
            }
          </p>
          {request.symptoms.length > 100 && (
            <button
              onClick={() => setShowFullSymptoms(!showFullSymptoms)}
              className="text-red-600 text-sm hover:text-red-700 transition-colors mt-1"
            >
              {showFullSymptoms ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      {request.notes && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Notas adicionales</h4>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">{request.notes}</p>
          </div>
        </div>
      )}

      {/* Paramedic Info */}
      {request.paramedicId && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-1">
            <User className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Paramédico asignado</span>
          </div>
          <p className="text-sm text-green-800 ml-6">ID: {request.paramedicId}</p>
        </div>
      )}

      {/* Cost Information */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Costo estimado</span>
          <span className="font-semibold text-gray-900">{formatCurrency(request.estimatedCost)}</span>
        </div>
        {request.finalCost && (
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-600">Costo final</span>
            <span className="font-semibold text-gray-900">{formatCurrency(request.finalCost)}</span>
          </div>
        )}
      </div>

      {/* Rating */}
      {request.rating && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-600 fill-current" />
            <span className="text-sm font-medium text-yellow-900">
              Calificación: {request.rating.overallRating}/5
            </span>
          </div>
          {request.rating.comment && (
            <p className="text-sm text-yellow-800 mt-1">{request.rating.comment}</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(request)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <Ambulance className="w-4 h-4" />
          <span>Ver detalles</span>
        </button>
        
        {canTrack && onTrackLocation && (
          <button
            onClick={() => onTrackLocation(request)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Rastrear</span>
          </button>
        )}

        {canContact && onContactParamedic && (
          <button
            onClick={() => onContactParamedic(request)}
            className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmergencyRequestCard; 