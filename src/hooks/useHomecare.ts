import { useState, useEffect } from 'react';
import { homecareService } from '@/lib/homecare-service';
import type {
  HomecareBookingWithDetails,
  HomecareCaregiverProfile,
  HomecareServiceStatus,
  HomecareServiceType,
  CreateHomecareBookingData,
  CreateHomecareRatingData,
  HomecareAnalytics,
  HomecareProviderSearchResult
} from '@/types/homecare';

export const useHomecare = () => {
  const [bookings, setBookings] = useState<HomecareBookingWithDetails[]>([]);
  const [availableCaregivers, setAvailableCaregivers] = useState<HomecareCaregiverProfile[]>([]);
  const [providerAnalytics, setProviderAnalytics] = useState<HomecareAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadBookings();
    loadCaregivers();
  }, []);

  const loadBookings = async (filters?: {
    status?: HomecareServiceStatus;
    providerId?: string;
    clientId?: string;
    operatorId?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const services = await homecareService.getServices(filters);
      setBookings(services);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  };

  const loadCaregivers = async (providerId?: string) => {
    try {
      const caregivers = await homecareService.getCaregivers(providerId);
      setAvailableCaregivers(caregivers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar cuidadores');
    }
  };

  const loadProviderAnalytics = async (
    providerId: string,
    startDate?: Date,
    endDate?: Date
  ) => {
    setLoading(true);
    try {
      const analytics = await homecareService.getProviderAnalytics(providerId, startDate, endDate);
      setProviderAnalytics(analytics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar analytics');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: CreateHomecareBookingData) => {
    setLoading(true);
    setError(null);
    try {
      const serviceId = await homecareService.createBooking(bookingData);
      await loadBookings(); // Refresh bookings list
      return serviceId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear reserva';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (
    serviceId: string,
    status: HomecareServiceStatus,
    notes?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await homecareService.updateServiceStatus(serviceId, status, notes);
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === serviceId 
          ? { 
              ...booking, 
              status, 
              updatedAt: new Date(),
              actualStart: status === 'IN_PROGRESS' ? new Date() : booking.actualStart,
              actualEnd: status === 'COMPLETED' ? new Date() : booking.actualEnd,
              cancelledAt: status === 'CANCELLED' ? new Date() : booking.cancelledAt,
              cancellationReason: status === 'CANCELLED' ? notes : booking.cancellationReason
            }
          : booking
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar estado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const assignCaregiver = async (serviceId: string, caregiverId: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await homecareService.assignCaregiver(serviceId, caregiverId);
      if (success) {
        await loadBookings(); // Refresh to get updated caregiver info
        await loadCaregivers(); // Refresh caregiver availability
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al asignar cuidador');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelService = async (serviceId: string, reason: string) => {
    setLoading(true);
    setError(null);
    try {
      const success = await homecareService.cancelService(serviceId, reason);
      if (success) {
        await loadBookings(); // Refresh bookings
        await loadCaregivers(); // Refresh caregiver availability
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (serviceId: string, ratingData: CreateHomecareRatingData) => {
    setLoading(true);
    setError(null);
    try {
      const ratingId = await homecareService.submitRating(serviceId, ratingData);
      await loadBookings(); // Refresh to show rating
      return ratingId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar calificación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addServiceNote = async (
    serviceId: string,
    noteType: string,
    content: string,
    isPrivate: boolean = false
  ) => {
    setLoading(true);
    setError(null);
    try {
      const noteId = await homecareService.addServiceNote(serviceId, noteType, content, isPrivate);
      await loadBookings(); // Refresh to show new note
      return noteId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar nota');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchProviders = async (
    serviceType: HomecareServiceType,
    date: Date,
    durationHours: number,
    coordinates?: { lat: number; lng: number },
    maxDistance?: number
  ): Promise<HomecareProviderSearchResult[]> => {
    setLoading(true);
    setError(null);
    try {
      return await homecareService.searchProviders(
        serviceType,
        date,
        durationHours,
        coordinates,
        maxDistance
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar proveedores');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Utility functions
  const getBookingsByStatus = (status: HomecareServiceStatus) => {
    return bookings.filter(booking => booking.status === status);
  };

  const getBookingsByProvider = (providerId: string) => {
    return bookings.filter(booking => booking.providerId === providerId);
  };

  const getBookingsByCaregiver = (caregiverId: string) => {
    return bookings.filter(booking => booking.operatorId === caregiverId);
  };

  const getAvailableCaregivers = () => {
    return availableCaregivers.filter(caregiver => caregiver.isAvailable);
  };

  const getCaregiversByProvider = (providerId: string) => {
    return availableCaregivers.filter(caregiver => caregiver.providerId === providerId);
  };

  // Format currency helper
  const formatCurrency = (cents: number): string => {
    return `Bs. ${(cents / 100).toFixed(2)}`;
  };

  // Format service type helper
  const formatServiceType = (serviceType: HomecareServiceType): string => {
    const types = {
      'HOME_CARE': 'Cuidado Domiciliario',
      'INJECTIONS': 'Inyecciones',
      'WOUND_CARE': 'Cuidado de Heridas',
      'ELDER_CARE': 'Cuidado de Adultos Mayores',
      'PHYSICAL_THERAPY': 'Fisioterapia',
      'MEDICAL_MONITORING': 'Monitoreo Médico'
    };
    return types[serviceType] || serviceType;
  };

  // Format status helper
  const formatStatus = (status: HomecareServiceStatus): string => {
    const statuses = {
      'PENDING': 'Pendiente',
      'CONFIRMED': 'Confirmado',
      'IN_PROGRESS': 'En Progreso',
      'COMPLETED': 'Completado',
      'CANCELLED': 'Cancelado',
      'NO_SHOW': 'No se presentó'
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status: HomecareServiceStatus): string => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'NO_SHOW': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return {
    // Data
    bookings,
    availableCaregivers,
    providerAnalytics,
    loading,
    error,

    // Actions
    createBooking,
    updateBookingStatus,
    assignCaregiver,
    cancelService,
    submitRating,
    addServiceNote,
    searchProviders,
    loadProviderAnalytics,
    loadBookings,
    loadCaregivers,

    // Utilities
    getBookingsByStatus,
    getBookingsByProvider,
    getBookingsByCaregiver,
    getAvailableCaregivers,
    getCaregiversByProvider,
    formatCurrency,
    formatServiceType,
    formatStatus,
    getStatusColor
  };
}; 