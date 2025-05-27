import type {
  EmergencyRequest,
  EmergencyProviderConfig,
  EmergencyOperatorAvailability,
  EmergencyPayment,
  EmergencyRating,
  EmergencyStatus,
  EmergencyType,
  PaymentStatus,
  EmergencyPriceCalculation,
  AvailableOperator,
  CreateEmergencyRequestPayload,
  UpdateEmergencyStatusPayload,
  RateEmergencyServicePayload,
  UpdateOperatorLocationPayload,
  UpdateProviderConfigPayload
} from '@/types/emergency';

// Mock data - in production this would come from Supabase
const mockProviderConfigs: EmergencyProviderConfig[] = [
  {
    id: 'config-1',
    providerId: '7', // Emergency provider from AuthContext
    baseFeeAmountCents: 8000, // $80 base fee
    perKmFeeAmountCents: 350, // $3.50 per km
    serviceRadiusKm: 25,
    maxConcurrentRequests: 5,
    operatingHours: {
      monday: { open: '00:00', close: '23:59' },
      tuesday: { open: '00:00', close: '23:59' },
      wednesday: { open: '00:00', close: '23:59' },
      thursday: { open: '00:00', close: '23:59' },
      friday: { open: '00:00', close: '23:59' },
      saturday: { open: '00:00', close: '23:59' },
      sunday: { open: '00:00', close: '23:59' }
    },
    autoAssign: true,
    isActive: true,
    commissionPercentage: 15,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const mockOperatorAvailability: EmergencyOperatorAvailability[] = [
  {
    id: 'op-1',
    operatorId: 'operator-1',
    isAvailable: true,
    currentLocation: { latitude: 10.4806, longitude: -66.9036 },
    lastLocationUpdate: new Date().toISOString(),
    lastStatusChange: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'op-2',
    operatorId: 'operator-2',
    isAvailable: true,
    currentLocation: { latitude: 10.5000, longitude: -66.9200 },
    lastLocationUpdate: new Date().toISOString(),
    lastStatusChange: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'op-3',
    operatorId: 'operator-3',
    isAvailable: false,
    currentLocation: { latitude: 10.4600, longitude: -66.8800 },
    lastLocationUpdate: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    lastStatusChange: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  }
];

const mockRequests: EmergencyRequest[] = [
  {
    id: 'req-1',
    requesterId: 'user-1',
    providerId: '7',
    operatorId: 'operator-1',
    patientName: 'María González',
    patientAge: 45,
    bloodType: 'O+',
    medicalConditions: ['Diabetes', 'Hipertensión'],
    allergies: ['Penicilina'],
    emergencyType: 'MEDICAL_EMERGENCY',
    description: 'Paciente con dolor severo en el pecho',
    status: 'IN_PROGRESS',
    pickupAddress: 'Calle Principal 123, Caracas',
    pickupCoordinates: { latitude: 10.4806, longitude: -66.9036 },
    referenceNotes: 'Casa blanca con portón azul',
    buildingDetails: 'Segundo piso, apartamento 2B',
    contactName: 'Juan González',
    contactPhone: '+584141234567',
    contactRelationship: 'Esposo',
    estimatedDistanceKm: 8.5,
    paymentId: 'pay-1',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    updatedAt: new Date().toISOString(),
    paidAt: new Date(Date.now() - 1500000).toISOString(),
    acceptedAt: new Date(Date.now() - 1200000).toISOString(),
    startedAt: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: 'req-2',
    requesterId: 'user-2',
    providerId: '7',
    patientName: 'Carlos Rodríguez',
    patientAge: 28,
    bloodType: 'A+',
    medicalConditions: [],
    allergies: [],
    emergencyType: 'ACCIDENT',
    description: 'Accidente de motocicleta, posible fractura',
    status: 'PAID',
    pickupAddress: 'Avenida Libertador 456, Caracas',
    pickupCoordinates: { latitude: 10.5000, longitude: -66.9200 },
    referenceNotes: 'Frente al centro comercial',
    contactName: 'Ana Rodríguez',
    contactPhone: '+584147654321',
    contactRelationship: 'Hermana',
    estimatedDistanceKm: 12.3,
    paymentId: 'pay-2',
    createdAt: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
    updatedAt: new Date().toISOString(),
    paidAt: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: 'req-3',
    requesterId: 'user-3',
    providerId: '7',
    operatorId: 'operator-2',
    patientName: 'Elena Martínez',
    patientAge: 78,
    bloodType: 'B-',
    medicalConditions: ['Cardiopatía', 'Osteoporosis'],
    allergies: ['Sulfas'],
    emergencyType: 'MEDICAL_EMERGENCY',
    description: 'Dificultad respiratoria severa',
    status: 'COMPLETED',
    pickupAddress: 'Urbanización Los Palos Grandes, Calle 5',
    pickupCoordinates: { latitude: 10.4950, longitude: -66.8500 },
    referenceNotes: 'Casa esquina con jardín',
    buildingDetails: 'Planta baja',
    contactName: 'Luis Martínez',
    contactPhone: '+584149876543',
    contactRelationship: 'Hijo',
    estimatedDistanceKm: 15.7,
    finalDistanceKm: 16.2,
    paymentId: 'pay-3',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    paidAt: new Date(Date.now() - 6900000).toISOString(),
    acceptedAt: new Date(Date.now() - 6600000).toISOString(),
    startedAt: new Date(Date.now() - 6300000).toISOString(),
    arrivedAt: new Date(Date.now() - 5400000).toISOString(),
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    serviceNotes: 'Paciente estabilizada y trasladada exitosamente'
  }
];

const mockPayments: EmergencyPayment[] = [
  {
    id: 'pay-1',
    requestId: 'req-1',
    amountCents: 10975, // $109.75
    platformFeeCents: 1646, // 15%
    providerAmountCents: 9329,
    paymentProvider: 'stripe',
    paymentIntentId: 'pi_3Nh7asEOCJG5Bkqc1b5T7urj',
    status: 'SUCCEEDED',
    createdAt: new Date(Date.now() - 1500000).toISOString(),
    updatedAt: new Date(Date.now() - 1500000).toISOString(),
    processedAt: new Date(Date.now() - 1500000).toISOString()
  },
  {
    id: 'pay-2',
    requestId: 'req-2',
    amountCents: 12305, // $123.05
    platformFeeCents: 1846,
    providerAmountCents: 10459,
    paymentProvider: 'stripe',
    paymentIntentId: 'pi_3Nh7btEOCJG5Bkqc2c6U8vsk',
    status: 'SUCCEEDED',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    updatedAt: new Date(Date.now() - 300000).toISOString(),
    processedAt: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: 'pay-3',
    requestId: 'req-3',
    amountCents: 13670, // $136.70
    platformFeeCents: 2051,
    providerAmountCents: 11619,
    paymentProvider: 'stripe',
    paymentIntentId: 'pi_3Nh7ctEOCJG5Bkqc3d7V9wtl',
    status: 'SUCCEEDED',
    createdAt: new Date(Date.now() - 6900000).toISOString(),
    updatedAt: new Date(Date.now() - 6900000).toISOString(),
    processedAt: new Date(Date.now() - 6900000).toISOString()
  }
];

const mockRatings: EmergencyRating[] = [
  {
    id: 'rating-1',
    requestId: 'req-3',
    ratedBy: 'user-3',
    responseTimeRating: 5,
    serviceQualityRating: 5,
    operatorRating: 5,
    overallRating: 5,
    comments: 'Excelente servicio, muy profesionales y rápidos',
    createdAt: new Date(Date.now() - 3000000).toISOString()
  }
];

// Mock operators data
const mockOperators = [
  {
    id: 'operator-1',
    name: 'Carlos Medina',
    specializations: ['Paramédico', 'Trauma'],
    rating: 4.8,
    totalServices: 145
  },
  {
    id: 'operator-2',
    name: 'Ana López',
    specializations: ['Paramédico', 'Cardiología'],
    rating: 4.9,
    totalServices: 198
  },
  {
    id: 'operator-3',
    name: 'Luis García',
    specializations: ['Paramédico', 'Pediatría'],
    rating: 4.6,
    totalServices: 87
  }
];

class EmergencyService {
  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Calculate emergency service price
  calculatePrice(providerId: string, distanceKm: number): EmergencyPriceCalculation {
    const config = mockProviderConfigs.find(c => c.providerId === providerId);
    if (!config) {
      throw new Error('Provider configuration not found');
    }

    const baseFeeCents = config.baseFeeAmountCents;
    const distanceFeeCents = Math.round(distanceKm * config.perKmFeeAmountCents);
    const totalAmountCents = baseFeeCents + distanceFeeCents;
    const platformFeeCents = Math.round(totalAmountCents * (config.commissionPercentage / 100));
    const providerAmountCents = totalAmountCents - platformFeeCents;

    return {
      totalAmountCents,
      platformFeeCents,
      providerAmountCents,
      baseFeeCents,
      distanceFeeCents,
      distanceKm
    };
  }

  // Get all emergency requests
  async getAllRequests(): Promise<EmergencyRequest[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...mockRequests];
  }

  // Get requests by status
  async getRequestsByStatus(status: EmergencyStatus): Promise<EmergencyRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockRequests.filter(req => req.status === status);
  }

  // Get requests by provider
  async getRequestsByProvider(providerId: string): Promise<EmergencyRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockRequests.filter(req => req.providerId === providerId);
  }

  // Get requests by operator
  async getRequestsByOperator(operatorId: string): Promise<EmergencyRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockRequests.filter(req => req.operatorId === operatorId);
  }

  // Get request by ID
  async getRequestById(requestId: string): Promise<EmergencyRequest | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockRequests.find(req => req.id === requestId) || null;
  }

  // Create new emergency request
  async createRequest(payload: CreateEmergencyRequestPayload): Promise<EmergencyRequest> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const config = mockProviderConfigs.find(c => c.providerId === payload.providerId);
    if (!config) {
      throw new Error('Provider not found or not configured for emergency services');
    }

    // Calculate estimated distance (in real app, use geocoding service)
    const estimatedDistanceKm = this.calculateDistance(
      payload.pickupCoordinates.latitude,
      payload.pickupCoordinates.longitude,
      10.4806, // Provider's base location
      -66.9036
    );

    const newRequest: EmergencyRequest = {
      id: `req-${Date.now()}`,
      requesterId: 'current-user', // In real app, get from auth context
      ...payload,
      status: 'PENDING',
      estimatedDistanceKm,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockRequests.unshift(newRequest);
    return newRequest;
  }

  // Update request status
  async updateRequestStatus(
    requestId: string,
    payload: UpdateEmergencyStatusPayload
  ): Promise<EmergencyRequest> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const requestIndex = mockRequests.findIndex(req => req.id === requestId);
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }

    const request = mockRequests[requestIndex];
    const now = new Date().toISOString();
    
    // Update timestamps based on status
    const updates: Partial<EmergencyRequest> = {
      status: payload.status,
      updatedAt: now
    };

    switch (payload.status) {
      case 'PAID':
        updates.paidAt = now;
        break;
      case 'ACCEPTED':
        updates.acceptedAt = now;
        break;
      case 'IN_PROGRESS':
        updates.startedAt = now;
        break;
      case 'ARRIVING':
        // No specific timestamp
        break;
      case 'COMPLETED':
        updates.completedAt = now;
        if (payload.finalDistanceKm) {
          updates.finalDistanceKm = payload.finalDistanceKm;
        }
        if (payload.serviceNotes) {
          updates.serviceNotes = payload.serviceNotes;
        }
        break;
      case 'CANCELLED':
        updates.cancelledAt = now;
        if (payload.notes) {
          updates.cancellationReason = payload.notes;
        }
        break;
    }

    Object.assign(request, updates);
    mockRequests[requestIndex] = request;
    
    return request;
  }

  // Assign operator to request
  async assignOperator(requestId: string, operatorId: string): Promise<EmergencyRequest> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const requestIndex = mockRequests.findIndex(req => req.id === requestId);
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }

    const request = mockRequests[requestIndex];
    request.operatorId = operatorId;
    request.status = 'ACCEPTED';
    request.acceptedAt = new Date().toISOString();
    request.updatedAt = new Date().toISOString();

    mockRequests[requestIndex] = request;
    return request;
  }

  // Get available operators
  async getAvailableOperators(
    providerId: string,
    coordinates: { latitude: number; longitude: number },
    maxDistanceKm: number = 20
  ): Promise<AvailableOperator[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const availableOps = mockOperatorAvailability.filter(op => op.isAvailable);
    
    const validOperators: AvailableOperator[] = [];
    
    for (const op of availableOps) {
      const operator = mockOperators.find(o => o.id === op.operatorId);
      if (!operator || !op.currentLocation) continue;

      const distance = this.calculateDistance(
        coordinates.latitude,
        coordinates.longitude,
        op.currentLocation.latitude,
        op.currentLocation.longitude
      );

      if (distance > maxDistanceKm) continue;

      validOperators.push({
        operatorId: op.operatorId,
        name: operator.name,
        distanceKm: Math.round(distance * 100) / 100,
        lastLocationUpdate: op.lastLocationUpdate || op.updatedAt,
        specializations: operator.specializations || [],
        rating: operator.rating,
        estimatedArrivalMinutes: Math.round(distance * 2.5) // Rough estimate
      });
    }

    return validOperators.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // Update operator availability
  async updateOperatorAvailability(
    operatorId: string,
    isAvailable: boolean
  ): Promise<EmergencyOperatorAvailability> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const opIndex = mockOperatorAvailability.findIndex(op => op.operatorId === operatorId);
    if (opIndex === -1) {
      throw new Error('Operator not found');
    }

    const operator = mockOperatorAvailability[opIndex];
    operator.isAvailable = isAvailable;
    operator.lastStatusChange = new Date().toISOString();
    operator.updatedAt = new Date().toISOString();

    mockOperatorAvailability[opIndex] = operator;
    return operator;
  }

  // Update operator location
  async updateOperatorLocation(
    operatorId: string,
    payload: UpdateOperatorLocationPayload
  ): Promise<EmergencyOperatorAvailability> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const opIndex = mockOperatorAvailability.findIndex(op => op.operatorId === operatorId);
    if (opIndex === -1) {
      throw new Error('Operator not found');
    }

    const operator = mockOperatorAvailability[opIndex];
    operator.currentLocation = payload.coordinates;
    operator.lastLocationUpdate = new Date().toISOString();
    operator.updatedAt = new Date().toISOString();

    mockOperatorAvailability[opIndex] = operator;
    return operator;
  }

  // Rate emergency service
  async rateService(
    requestId: string,
    payload: RateEmergencyServicePayload
  ): Promise<EmergencyRating> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const request = mockRequests.find(req => req.id === requestId);
    if (!request) {
      throw new Error('Request not found');
    }

    if (request.status !== 'COMPLETED') {
      throw new Error('Cannot rate incomplete service');
    }

    const rating: EmergencyRating = {
      id: `rating-${Date.now()}`,
      requestId,
      ratedBy: 'current-user', // In real app, get from auth context
      ...payload,
      createdAt: new Date().toISOString()
    };

    mockRatings.push(rating);
    return rating;
  }

  // Get provider configuration
  async getProviderConfig(providerId: string): Promise<EmergencyProviderConfig | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProviderConfigs.find(config => config.providerId === providerId) || null;
  }

  // Update provider configuration
  async updateProviderConfig(
    providerId: string,
    payload: UpdateProviderConfigPayload
  ): Promise<EmergencyProviderConfig> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const configIndex = mockProviderConfigs.findIndex(config => config.providerId === providerId);
    if (configIndex === -1) {
      throw new Error('Provider configuration not found');
    }

    const config = mockProviderConfigs[configIndex];
    Object.assign(config, payload, { updatedAt: new Date().toISOString() });
    
    mockProviderConfigs[configIndex] = config;
    return config;
  }

  // Get payments
  async getPayments(): Promise<EmergencyPayment[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...mockPayments];
  }

  // Get payment by request ID
  async getPaymentByRequestId(requestId: string): Promise<EmergencyPayment | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockPayments.find(payment => payment.requestId === requestId) || null;
  }

  // Format currency
  formatCurrency(amountCents: number): string {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amountCents / 100);
  }

  // Format emergency type
  formatEmergencyType(type: EmergencyType): string {
    const types = {
      'MEDICAL_EMERGENCY': 'Emergencia Médica',
      'ACCIDENT': 'Accidente',
      'TRANSFER': 'Traslado'
    };
    return types[type] || type;
  }

  // Format status
  formatStatus(status: EmergencyStatus): string {
    const statuses = {
      'PENDING': 'Pendiente',
      'PAID': 'Pagado',
      'ACCEPTED': 'Aceptado',
      'IN_PROGRESS': 'En Progreso',
      'ARRIVING': 'Llegando',
      'COMPLETED': 'Completado',
      'CANCELLED': 'Cancelado'
    };
    return statuses[status] || status;
  }

  // Get status color
  getStatusColor(status: EmergencyStatus): string {
    const colors = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'PAID': 'bg-blue-100 text-blue-800',
      'ACCEPTED': 'bg-purple-100 text-purple-800',
      'IN_PROGRESS': 'bg-orange-100 text-orange-800',
      'ARRIVING': 'bg-indigo-100 text-indigo-800',
      'COMPLETED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }
}

export const emergencyService = new EmergencyService(); 