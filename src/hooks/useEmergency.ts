import { useState, useEffect, useCallback } from 'react';
import { emergencyService } from '@/lib/emergency-service';
import type {
  EmergencyRequest,
  EmergencyProviderConfig,
  EmergencyOperatorAvailability,
  EmergencyPayment,
  EmergencyRating,
  EmergencyStatus,
  EmergencyType,
  AvailableOperator,
  CreateEmergencyRequestPayload,
  UpdateEmergencyStatusPayload,
  RateEmergencyServicePayload,
  UpdateOperatorLocationPayload,
  UpdateProviderConfigPayload,
  EmergencyPriceCalculation
} from '@/types/emergency';

export const useEmergency = () => {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [availableOperators, setAvailableOperators] = useState<AvailableOperator[]>([]);
  const [providerConfig, setProviderConfig] = useState<EmergencyProviderConfig | null>(null);
  const [payments, setPayments] = useState<EmergencyPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [requestsData, paymentsData] = await Promise.all([
          emergencyService.getAllRequests(),
          emergencyService.getPayments()
        ]);
        
        setRequests(requestsData);
        setPayments(paymentsData);
      } catch (err) {
        console.error('Error loading emergency data:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Refresh data
  const refreshData = useCallback(async () => {
    try {
      setError(null);
      const [requestsData, paymentsData] = await Promise.all([
        emergencyService.getAllRequests(),
        emergencyService.getPayments()
      ]);
      
      setRequests(requestsData);
      setPayments(paymentsData);
    } catch (err) {
      console.error('Error refreshing emergency data:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar datos');
    }
  }, []);

  // Create new emergency request
  const createRequest = useCallback(async (payload: CreateEmergencyRequestPayload) => {
    try {
      setError(null);
      const newRequest = await emergencyService.createRequest(payload);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear solicitud';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Update request status
  const updateRequestStatus = useCallback(async (
    requestId: string, 
    payload: UpdateEmergencyStatusPayload
  ) => {
    try {
      setError(null);
      const updatedRequest = await emergencyService.updateRequestStatus(requestId, payload);
      setRequests(prev => prev.map(req => 
        req.id === requestId ? updatedRequest : req
      ));
      return updatedRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar estado';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Assign operator to request
  const assignOperator = useCallback(async (requestId: string, operatorId: string) => {
    try {
      setError(null);
      const updatedRequest = await emergencyService.assignOperator(requestId, operatorId);
      setRequests(prev => prev.map(req => 
        req.id === requestId ? updatedRequest : req
      ));
      return updatedRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al asignar operador';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Get available operators
  const loadAvailableOperators = useCallback(async (
    providerId: string,
    coordinates: { latitude: number; longitude: number },
    maxDistanceKm?: number
  ) => {
    try {
      setError(null);
      const operators = await emergencyService.getAvailableOperators(
        providerId, 
        coordinates, 
        maxDistanceKm
      );
      setAvailableOperators(operators);
      return operators;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar operadores';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Rate emergency service
  const rateService = useCallback(async (
    requestId: string, 
    payload: RateEmergencyServicePayload
  ) => {
    try {
      setError(null);
      const rating = await emergencyService.rateService(requestId, payload);
      return rating;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al calificar servicio';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Load provider configuration
  const loadProviderConfig = useCallback(async (providerId: string) => {
    try {
      setError(null);
      const config = await emergencyService.getProviderConfig(providerId);
      setProviderConfig(config);
      return config;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar configuración';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Update provider configuration
  const updateProviderConfig = useCallback(async (
    providerId: string, 
    payload: UpdateProviderConfigPayload
  ) => {
    try {
      setError(null);
      const updatedConfig = await emergencyService.updateProviderConfig(providerId, payload);
      setProviderConfig(updatedConfig);
      return updatedConfig;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar configuración';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Calculate price
  const calculatePrice = useCallback((providerId: string, distanceKm: number): EmergencyPriceCalculation => {
    try {
      return emergencyService.calculatePrice(providerId, distanceKm);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al calcular precio';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Utility functions for filtering and formatting
  const getRequestsByStatus = useCallback((status: EmergencyStatus) => {
    return requests.filter(req => req.status === status);
  }, [requests]);

  const getRequestsByProvider = useCallback((providerId: string) => {
    return requests.filter(req => req.providerId === providerId);
  }, [requests]);

  const getRequestsByOperator = useCallback((operatorId: string) => {
    return requests.filter(req => req.operatorId === operatorId);
  }, [requests]);

  const getRequestById = useCallback((requestId: string) => {
    return requests.find(req => req.id === requestId);
  }, [requests]);

  const getPaymentByRequestId = useCallback((requestId: string) => {
    return payments.find(payment => payment.requestId === requestId);
  }, [payments]);

  // Formatting utilities
  const formatCurrency = useCallback((amountCents: number) => {
    return emergencyService.formatCurrency(amountCents);
  }, []);

  const formatEmergencyType = useCallback((type: EmergencyType) => {
    return emergencyService.formatEmergencyType(type);
  }, []);

  const formatStatus = useCallback((status: EmergencyStatus) => {
    return emergencyService.formatStatus(status);
  }, []);

  const getStatusColor = useCallback((status: EmergencyStatus) => {
    return emergencyService.getStatusColor(status);
  }, []);

  // Statistics and metrics
  const getStats = useCallback(() => {
    const totalRequests = requests.length;
    const pendingRequests = getRequestsByStatus('PENDING').length;
    const paidRequests = getRequestsByStatus('PAID').length;
    const acceptedRequests = getRequestsByStatus('ACCEPTED').length;
    const inProgressRequests = getRequestsByStatus('IN_PROGRESS').length;
    const arrivingRequests = getRequestsByStatus('ARRIVING').length;
    const completedRequests = getRequestsByStatus('COMPLETED').length;
    const cancelledRequests = getRequestsByStatus('CANCELLED').length;

    // Calculate revenue from completed requests
    const completedPayments = payments.filter(payment => {
      const request = requests.find(req => req.id === payment.requestId);
      return request?.status === 'COMPLETED' && payment.status === 'SUCCEEDED';
    });

    const totalRevenue = completedPayments.reduce(
      (sum, payment) => sum + payment.amountCents, 
      0
    );

    const platformRevenue = completedPayments.reduce(
      (sum, payment) => sum + payment.platformFeeCents, 
      0
    );

    const providerRevenue = completedPayments.reduce(
      (sum, payment) => sum + payment.providerAmountCents, 
      0
    );

    // Calculate average response time for completed requests
    const completedRequestsWithTimes = requests.filter(req => 
      req.status === 'COMPLETED' && req.createdAt && req.acceptedAt
    );

    const averageResponseTimeMinutes = completedRequestsWithTimes.length > 0 
      ? completedRequestsWithTimes.reduce((sum, req) => {
          const created = new Date(req.createdAt).getTime();
          const accepted = new Date(req.acceptedAt!).getTime();
          return sum + (accepted - created) / (1000 * 60); // Convert to minutes
        }, 0) / completedRequestsWithTimes.length
      : 0;

    return {
      totalRequests,
      pendingRequests,
      paidRequests,
      acceptedRequests,
      inProgressRequests,
      arrivingRequests,
      completedRequests,
      cancelledRequests,
      totalRevenue,
      platformRevenue,
      providerRevenue,
      averageResponseTimeMinutes: Math.round(averageResponseTimeMinutes * 100) / 100,
      completionRate: totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0,
      cancellationRate: totalRequests > 0 ? (cancelledRequests / totalRequests) * 100 : 0
    };
  }, [requests, payments, getRequestsByStatus]);

  return {
    // Data
    requests,
    availableOperators,
    providerConfig,
    payments,
    loading,
    error,

    // Actions
    createRequest,
    updateRequestStatus,
    assignOperator,
    loadAvailableOperators,
    rateService,
    loadProviderConfig,
    updateProviderConfig,
    refreshData,

    // Utilities
    calculatePrice,
    getRequestsByStatus,
    getRequestsByProvider,
    getRequestsByOperator,
    getRequestById,
    getPaymentByRequestId,
    formatCurrency,
    formatEmergencyType,
    formatStatus,
    getStatusColor,
    getStats
  };
}; 