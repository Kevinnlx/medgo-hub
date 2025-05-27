import {
  HomecareService,
  HomecareServiceStatus,
  HomecareServiceType,
  HomecareProviderSearchResult,
  CreateHomecareBookingData,
  UpdateHomecareServiceData,
  CreateHomecareRatingData,
  HomecareAnalytics,
  HomecareCaregiverProfile,
  HomecareBookingWithDetails,
  HomecareProviderConfig,
  CreateHomecareAvailabilityData,
  HomecareRecurringAvailabilityData,
  HomecareAvailability,
  HomecareRating,
  HomecareServiceNote
} from '@/types/homecare';

// Mock data storage
let mockServices: HomecareBookingWithDetails[] = [
  {
    id: 'hc_001',
    clientId: 'client_001',
    providerId: 'provider_001',
    operatorId: 'caregiver_001',
    serviceType: 'HOME_CARE',
    status: 'CONFIRMED',
    scheduledStart: new Date('2024-12-20T10:00:00'),
    scheduledEnd: new Date('2024-12-20T14:00:00'),
    durationHours: 4,
    serviceAddress: 'Av. Principal 123, Caracas',
    patientName: 'María González',
    patientAge: 75,
    medicalConditions: ['Diabetes', 'Hipertensión'],
    specialInstructions: 'Paciente con movilidad limitada',
    contactName: 'Carlos González',
    contactPhone: '+58-414-123-4567',
    contactRelationship: 'Hijo',
    baseRateCents: 8000,
    additionalChargesCents: 0,
    totalAmountCents: 8000,
    createdAt: new Date('2024-12-15T08:00:00'),
    updatedAt: new Date('2024-12-15T08:00:00'),
    providerName: 'CuidadoPlus C.A.',
    operatorName: 'Ana Rodríguez',
    clientName: 'Carlos González'
  },
  {
    id: 'hc_002', 
    clientId: 'client_002',
    providerId: 'provider_002',
    operatorId: 'caregiver_002',
    serviceType: 'INJECTIONS',
    status: 'IN_PROGRESS',
    scheduledStart: new Date('2024-12-19T15:00:00'),
    scheduledEnd: new Date('2024-12-19T16:00:00'),
    actualStart: new Date('2024-12-19T15:05:00'),
    durationHours: 1,
    serviceAddress: 'Calle 42 #15-67, Maracaibo',
    patientName: 'Pedro Martínez',
    patientAge: 68,
    medicalConditions: ['Artritis'],
    specialInstructions: 'Inyección intramuscular semanal',
    contactName: 'Pedro Martínez',
    contactPhone: '+58-424-987-6543',
    contactRelationship: 'Paciente',
    baseRateCents: 3500,
    additionalChargesCents: 500,
    totalAmountCents: 4000,
    createdAt: new Date('2024-12-18T10:00:00'),
    updatedAt: new Date('2024-12-19T15:05:00'),
    providerName: 'Servicios Médicos Valencia',
    operatorName: 'Luis Hernández',
    clientName: 'Pedro Martínez'
  },
  {
    id: 'hc_003',
    clientId: 'client_003', 
    providerId: 'provider_001',
    serviceType: 'ELDER_CARE',
    status: 'COMPLETED',
    scheduledStart: new Date('2024-12-18T08:00:00'),
    scheduledEnd: new Date('2024-12-18T20:00:00'),
    actualStart: new Date('2024-12-18T08:00:00'),
    actualEnd: new Date('2024-12-18T20:15:00'),
    durationHours: 12,
    serviceAddress: 'Urb. Los Palos Grandes, Caracas',
    patientName: 'Carmen Villareal',
    patientAge: 82,
    medicalConditions: ['Alzheimer inicial', 'Hipertensión'],
    specialInstructions: 'Supervisión constante, medicamentos cada 8 horas',
    contactName: 'Roberto Villareal',
    contactPhone: '+58-412-555-0123',
    contactRelationship: 'Hijo',
    baseRateCents: 15000,
    additionalChargesCents: 1000,
    totalAmountCents: 16000,
    createdAt: new Date('2024-12-15T14:00:00'),
    updatedAt: new Date('2024-12-18T20:15:00'),
    providerName: 'CuidadoPlus C.A.',
    clientName: 'Roberto Villareal'
  }
];

let mockCaregivers: HomecareCaregiverProfile[] = [
  {
    id: 'caregiver_001',
    name: 'Ana Rodríguez',
    email: 'ana.rodriguez@cuidadoplus.com',
    phone: '+58-426-111-2233',
    providerId: 'provider_001',
    isAvailable: true,
    currentServices: 1,
    experience: 8,
    rating: 4.8,
    completedServices: 156,
    specialties: ['GENERAL_CARE', 'ELDER_CARE'],
    createdAt: new Date('2024-01-15T00:00:00')
  },
  {
    id: 'caregiver_002',
    name: 'Luis Hernández',
    email: 'luis.hernandez@medicvalencia.com',
    phone: '+58-414-445-6677',
    providerId: 'provider_002',
    isAvailable: false,
    currentServices: 2,
    experience: 12,
    rating: 4.9,
    completedServices: 284,
    specialties: ['INJECTION_SPECIALIST', 'GENERAL_CARE'],
    createdAt: new Date('2024-02-01T00:00:00')
  },
  {
    id: 'caregiver_003',
    name: 'Carmen Silva',
    email: 'carmen.silva@cuidadoplus.com',
    phone: '+58-412-789-0123',
    providerId: 'provider_001',
    isAvailable: true,
    currentServices: 0,
    experience: 6,
    rating: 4.7,
    completedServices: 98,
    specialties: ['PHYSICAL_THERAPY', 'WOUND_CARE'],
    createdAt: new Date('2024-03-10T00:00:00')
  }
];

let mockProviderConfigs: HomecareProviderConfig[] = [
  {
    id: 'config_001',
    providerId: 'provider_001',
    isActive: true,
    serviceRadius: 25,
    baseRateCents: 2000,
    minimumHours: 2,
    platformCommissionPercentage: 15,
    licenseVerified: true,
    insuranceVerified: true,
    backgroundCheckVerified: true,
    bookingNoticeHours: 24,
    maxConcurrentBookings: 5,
    serviceTypes: ['HOME_CARE', 'ELDER_CARE', 'PHYSICAL_THERAPY'],
    createdAt: new Date('2024-01-01T00:00:00'),
    updatedAt: new Date('2024-01-01T00:00:00')
  },
  {
    id: 'config_002',
    providerId: 'provider_002', 
    isActive: true,
    serviceRadius: 30,
    baseRateCents: 3500,
    minimumHours: 1,
    platformCommissionPercentage: 12,
    licenseVerified: true,
    insuranceVerified: true,
    backgroundCheckVerified: true,
    bookingNoticeHours: 12,
    maxConcurrentBookings: 3,
    serviceTypes: ['INJECTIONS', 'MEDICAL_MONITORING', 'WOUND_CARE'],
    createdAt: new Date('2024-02-01T00:00:00'),
    updatedAt: new Date('2024-02-01T00:00:00')
  }
];

// Utility functions
const generateId = () => `hc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const calculatePrice = (
  providerId: string,
  serviceType: HomecareServiceType,
  durationHours: number
) => {
  const config = mockProviderConfigs.find(c => c.providerId === providerId);
  if (!config) throw new Error('Proveedor no encontrado');

  if (durationHours < config.minimumHours) {
    throw new Error(`El servicio debe durar mínimo ${config.minimumHours} horas`);
  }

  const totalCents = config.baseRateCents * durationHours;
  const platformFeeCents = Math.round(totalCents * (config.platformCommissionPercentage / 100));
  const providerAmountCents = totalCents - platformFeeCents;

  return {
    totalAmountCents: totalCents,
    platformFeeCents,
    providerAmountCents
  };
};

// Main service functions
export const homecareService = {
  // Search providers
  searchProviders: async (
    serviceType: HomecareServiceType,
    date: Date,
    durationHours: number,
    coordinates?: { lat: number; lng: number },
    maxDistance: number = 50
  ): Promise<HomecareProviderSearchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    return mockProviderConfigs
      .filter(config => 
        config.isActive && 
        config.serviceTypes.includes(serviceType) &&
        durationHours >= config.minimumHours
      )
      .map(config => ({
        providerId: config.providerId,
        providerName: config.providerId === 'provider_001' ? 'CuidadoPlus C.A.' : 'Servicios Médicos Valencia',
        distance: coordinates ? Math.random() * maxDistance : 0,
        baseRateCents: config.baseRateCents,
        rating: 4.7 + Math.random() * 0.3,
        totalRatings: Math.floor(Math.random() * 200) + 50,
        availableSlots: [
          { start: new Date(date.getTime() + 8 * 60 * 60 * 1000), end: new Date(date.getTime() + 12 * 60 * 60 * 1000) },
          { start: new Date(date.getTime() + 14 * 60 * 60 * 1000), end: new Date(date.getTime() + 18 * 60 * 60 * 1000) }
        ]
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  },

  // Create booking
  createBooking: async (bookingData: CreateHomecareBookingData): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const pricing = calculatePrice(
      bookingData.providerId,
      bookingData.serviceType,
      bookingData.durationHours
    );

    const newService: HomecareBookingWithDetails = {
      id: generateId(),
      clientId: 'current_user_id', // This would come from auth context
      providerId: bookingData.providerId,
      serviceType: bookingData.serviceType,
      status: 'PENDING',
      scheduledStart: bookingData.scheduledStart,
      scheduledEnd: new Date(bookingData.scheduledStart.getTime() + bookingData.durationHours * 60 * 60 * 1000),
      durationHours: bookingData.durationHours,
      serviceAddress: bookingData.serviceAddress,
      addressCoordinates: bookingData.addressCoordinates,
      buildingDetails: bookingData.buildingDetails,
      accessInstructions: bookingData.accessInstructions,
      patientName: bookingData.patientName,
      patientAge: bookingData.patientAge,
      medicalConditions: bookingData.medicalConditions,
      specialInstructions: bookingData.specialInstructions,
      contactName: bookingData.contactName || bookingData.patientName,
      contactPhone: bookingData.contactPhone,
      contactRelationship: bookingData.contactRelationship,
      baseRateCents: pricing.providerAmountCents,
      additionalChargesCents: 0,
      totalAmountCents: pricing.totalAmountCents,
      createdAt: new Date(),
      updatedAt: new Date(),
      providerName: mockProviderConfigs.find(c => c.providerId === bookingData.providerId)?.providerId === 'provider_001' 
        ? 'CuidadoPlus C.A.' : 'Servicios Médicos Valencia',
      clientName: bookingData.contactName || bookingData.patientName
    };

    mockServices.unshift(newService);
    return newService.id;
  },

  // Update service status
  updateServiceStatus: async (
    serviceId: string,
    status: HomecareServiceStatus,
    notes?: string
  ): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) throw new Error('Servicio no encontrado');

    const service = mockServices[serviceIndex];
    
    mockServices[serviceIndex] = {
      ...service,
      status,
      updatedAt: new Date(),
      actualStart: status === 'IN_PROGRESS' ? new Date() : service.actualStart,
      actualEnd: status === 'COMPLETED' ? new Date() : service.actualEnd,
      cancelledAt: status === 'CANCELLED' ? new Date() : service.cancelledAt,
      cancellationReason: status === 'CANCELLED' ? notes : service.cancellationReason
    };
  },

  // Assign caregiver to service
  assignCaregiver: async (serviceId: string, caregiverId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    const caregiver = mockCaregivers.find(c => c.id === caregiverId);
    
    if (serviceIndex === -1 || !caregiver) return false;

    const service = mockServices[serviceIndex];
    
    // Check if caregiver belongs to the same provider
    if (caregiver.providerId !== service.providerId) {
      throw new Error('El cuidador no pertenece a este proveedor');
    }

    mockServices[serviceIndex] = {
      ...service,
      operatorId: caregiverId,
      operatorName: caregiver.name,
      updatedAt: new Date()
    };

    // Update caregiver availability
    const caregiverIndex = mockCaregivers.findIndex(c => c.id === caregiverId);
    mockCaregivers[caregiverIndex] = {
      ...caregiver,
      currentServices: caregiver.currentServices + 1,
      isAvailable: caregiver.currentServices + 1 < 3 // Max 3 concurrent services
    };

    return true;
  },

  // Cancel service
  cancelService: async (serviceId: string, reason: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) return false;

    const service = mockServices[serviceIndex];

    if (!['PENDING', 'CONFIRMED'].includes(service.status)) {
      throw new Error('No se puede cancelar un servicio en este estado');
    }

    mockServices[serviceIndex] = {
      ...service,
      status: 'CANCELLED',
      cancelledAt: new Date(),
      cancellationReason: reason,
      updatedAt: new Date()
    };

    // Free up caregiver if assigned
    if (service.operatorId) {
      const caregiverIndex = mockCaregivers.findIndex(c => c.id === service.operatorId);
      if (caregiverIndex !== -1) {
        const caregiver = mockCaregivers[caregiverIndex];
        mockCaregivers[caregiverIndex] = {
          ...caregiver,
          currentServices: Math.max(0, caregiver.currentServices - 1),
          isAvailable: true
        };
      }
    }

    return true;
  },

  // Submit rating
  submitRating: async (
    serviceId: string,
    ratingData: CreateHomecareRatingData
  ): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const service = mockServices.find(s => s.id === serviceId);
    if (!service || service.status !== 'COMPLETED') {
      throw new Error('Solo se pueden calificar servicios completados');
    }

    const ratingId = generateId();
    const rating: HomecareRating = {
      id: ratingId,
      serviceId,
      ratedBy: 'current_user_id',
      ...ratingData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add rating to service
    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    mockServices[serviceIndex] = {
      ...service,
      rating
    };

    return ratingId;
  },

  // Get provider analytics
  getProviderAnalytics: async (
    providerId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<HomecareAnalytics> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const services = mockServices.filter(s => {
      const matchesProvider = s.providerId === providerId;
      const matchesDateRange = !startDate || !endDate || 
        (s.createdAt >= startDate && s.createdAt <= endDate);
      return matchesProvider && matchesDateRange;
    });

    const completedServices = services.filter(s => s.status === 'COMPLETED');
    const ratings = completedServices.map(s => s.rating).filter(r => r);

    return {
      serviceMetrics: {
        totalServices: services.length,
        completedServices: completedServices.length,
        cancelledServices: services.filter(s => s.status === 'CANCELLED').length,
        noShows: services.filter(s => s.status === 'NO_SHOW').length,
        totalHours: completedServices.reduce((acc, s) => acc + s.durationHours, 0),
        totalEarningsCents: completedServices.reduce((acc, s) => acc + s.totalAmountCents, 0),
        avgDelayMinutes: 5.2, // Mock value
        completionRate: services.length > 0 ? Math.round((completedServices.length / services.length) * 100) : 0
      },
      ratingMetrics: {
        avgRating: ratings.length > 0 ? 
          Math.round((ratings.reduce((acc, r) => acc + r!.overallRating, 0) / ratings.length) * 10) / 10 : undefined,
        totalRatings: ratings.length,
        ratingBreakdown: {
          punctuality: ratings.length > 0 ? 
            Math.round((ratings.reduce((acc, r) => acc + (r!.punctualityRating || 0), 0) / ratings.length) * 10) / 10 : undefined,
          professionalism: ratings.length > 0 ? 
            Math.round((ratings.reduce((acc, r) => acc + (r!.professionalismRating || 0), 0) / ratings.length) * 10) / 10 : undefined,
          careQuality: ratings.length > 0 ? 
            Math.round((ratings.reduce((acc, r) => acc + (r!.careQualityRating || 0), 0) / ratings.length) * 10) / 10 : undefined
        }
      }
    };
  },

  // Get services
  getServices: async (filters?: {
    status?: HomecareServiceStatus;
    providerId?: string;
    clientId?: string;
    operatorId?: string;
  }): Promise<HomecareBookingWithDetails[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredServices = [...mockServices];

    if (filters?.status) {
      filteredServices = filteredServices.filter(s => s.status === filters.status);
    }
    if (filters?.providerId) {
      filteredServices = filteredServices.filter(s => s.providerId === filters.providerId);
    }
    if (filters?.clientId) {
      filteredServices = filteredServices.filter(s => s.clientId === filters.clientId);
    }
    if (filters?.operatorId) {
      filteredServices = filteredServices.filter(s => s.operatorId === filters.operatorId);
    }

    return filteredServices;
  },

  // Get caregivers
  getCaregivers: async (providerId?: string): Promise<HomecareCaregiverProfile[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    if (providerId) {
      return mockCaregivers.filter(c => c.providerId === providerId);
    }
    return [...mockCaregivers];
  },

  // Add service note
  addServiceNote: async (
    serviceId: string,
    noteType: string,
    content: string,
    isPrivate: boolean = false
  ): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const noteId = generateId();
    const note: HomecareServiceNote = {
      id: noteId,
      serviceId,
      createdBy: 'current_user_id',
      noteType,
      content,
      isPrivate,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add note to service
    const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
      const service = mockServices[serviceIndex];
      mockServices[serviceIndex] = {
        ...service,
        notes: [...(service.notes || []), note]
      };
    }

    return noteId;
  },

  // Get service by ID
  getServiceById: async (serviceId: string): Promise<HomecareBookingWithDetails | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockServices.find(s => s.id === serviceId) || null;
  }
}; 