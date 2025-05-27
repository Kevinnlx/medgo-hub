// ===============================
// HOMECARE MODULE TYPES - SQL SCHEMA ALIGNED
// ===============================

export type HomecareServiceType = 
  | 'HOME_CARE'
  | 'INJECTIONS' 
  | 'WOUND_CARE'
  | 'ELDER_CARE'
  | 'PHYSICAL_THERAPY'
  | 'MEDICAL_MONITORING';

export type HomecareServiceStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export type HomecarePaymentStatus = 
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'REFUNDED';

export type HomecareAvailabilityType = 
  | 'AVAILABLE'
  | 'UNAVAILABLE'
  | 'BOOKED'
  | 'BLOCKED';

export type SpecialtyType = 
  | 'GENERAL_CARE'
  | 'ELDER_CARE'
  | 'WOUND_CARE'
  | 'INJECTION_SPECIALIST'
  | 'PHYSICAL_THERAPY'
  | 'PEDIATRIC_CARE'
  | 'PALLIATIVE_CARE'
  | 'DISABILITY_CARE';

export interface HomecareProviderConfig {
  id: string;
  providerId: string;
  isActive: boolean;
  serviceRadius: number;
  baseRateCents: number;
  minimumHours: number;
  cancellationPolicy?: any;
  platformCommissionPercentage: number;
  licenseVerified: boolean;
  insuranceVerified: boolean;
  backgroundCheckVerified: boolean;
  bookingNoticeHours: number;
  maxConcurrentBookings: number;
  operatingHours?: any;
  serviceTypes: HomecareServiceType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HomecareSpecialty {
  id: string;
  specialtyType: SpecialtyType;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface HomecareProviderSpecialty {
  id: string;
  providerId: string;
  specialtyId: string;
  yearsExperience?: number;
  certificationUrl?: string;
  verified: boolean;
  createdAt: Date;
}

export interface HomecareAvailability {
  id: string;
  providerId: string;
  dateStart: Date;
  dateEnd: Date;
  availabilityType: HomecareAvailabilityType;
  recurrenceRule?: string;
  serviceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomecareService {
  id: string;
  clientId: string;
  providerId: string;
  operatorId?: string;
  serviceType: HomecareServiceType;
  status: HomecareServiceStatus;
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart?: Date;
  actualEnd?: Date;
  durationHours: number;
  serviceAddress: string;
  addressCoordinates?: { lat: number; lng: number };
  buildingDetails?: string;
  accessInstructions?: string;
  patientName: string;
  patientAge?: number;
  medicalConditions?: string[];
  specialInstructions?: string;
  contactName: string;
  contactPhone: string;
  contactRelationship?: string;
  baseRateCents: number;
  additionalChargesCents: number;
  totalAmountCents: number;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
}

export interface HomecarePayment {
  id: string;
  serviceId: string;
  amountCents: number;
  platformFeeCents: number;
  providerAmountCents: number;
  paymentProvider: string;
  paymentIntentId?: string;
  paymentMethodId?: string;
  customerId?: string;
  status: HomecarePaymentStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  refundedAt?: Date;
}

export interface HomecareServiceUpdate {
  id: string;
  serviceId: string;
  status: HomecareServiceStatus;
  updatedBy: string;
  notes?: string;
  createdAt: Date;
}

export interface HomecareServiceNote {
  id: string;
  serviceId: string;
  createdBy: string;
  noteType: string;
  content: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HomecareRating {
  id: string;
  serviceId: string;
  ratedBy: string;
  punctualityRating?: number;
  professionalismRating?: number;
  careQualityRating?: number;
  overallRating: number;
  reviewText?: string;
  providerResponse?: string;
  responseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Extended interfaces for UI components
export interface HomecareBookingWithDetails extends HomecareService {
  providerName: string;
  operatorName?: string;
  clientName: string;
  rating?: HomecareRating;
  updates?: HomecareServiceUpdate[];
  notes?: HomecareServiceNote[];
}

export interface HomecareCaregiverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  providerId: string;
  isAvailable: boolean;
  currentServices: number;
  experience: number;
  rating: number;
  completedServices: number;
  specialties: SpecialtyType[];
  createdAt: Date;
}

export interface HomecareProviderProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  serviceArea: string;
  config: HomecareProviderConfig;
  specialties: HomecareProviderSpecialty[];
  rating: number;
  totalServices: number;
  activeServices: number;
}

export interface HomecareSearchFilters {
  serviceType?: HomecareServiceType;
  date?: Date;
  durationHours?: number;
  coordinates?: { lat: number; lng: number };
  maxDistance?: number;
  minRating?: number;
  verified?: boolean;
}

export interface HomecareProviderSearchResult {
  providerId: string;
  providerName: string;
  distance?: number;
  baseRateCents: number;
  rating?: number;
  totalRatings: number;
  availableSlots: Array<{
    start: Date;
    end: Date;
  }>;
}

export interface HomecareAnalytics {
  serviceMetrics: {
    totalServices: number;
    completedServices: number;
    cancelledServices: number;
    noShows: number;
    totalHours?: number;
    totalEarningsCents?: number;
    avgDelayMinutes?: number;
    completionRate: number;
  };
  ratingMetrics: {
    avgRating?: number;
    totalRatings: number;
    ratingBreakdown: {
      punctuality?: number;
      professionalism?: number;
      careQuality?: number;
    };
  };
}

// Form interfaces for creating/updating
export interface CreateHomecareBookingData {
  providerId: string;
  serviceType: HomecareServiceType;
  scheduledStart: Date;
  durationHours: number;
  serviceAddress: string;
  addressCoordinates?: { lat: number; lng: number };
  patientName: string;
  contactPhone: string;
  specialInstructions?: string;
  patientAge?: number;
  medicalConditions?: string[];
  contactName?: string;
  contactRelationship?: string;
  buildingDetails?: string;
  accessInstructions?: string;
}

export interface UpdateHomecareServiceData {
  status?: HomecareServiceStatus;
  actualStart?: Date;
  actualEnd?: Date;
  durationHours?: number;
  specialInstructions?: string;
  cancellationReason?: string;
}

export interface CreateHomecareRatingData {
  overallRating: number;
  punctualityRating?: number;
  professionalismRating?: number;
  careQualityRating?: number;
  reviewText?: string;
}

export interface CreateHomecareAvailabilityData {
  dateStart: Date;
  dateEnd: Date;
  availabilityType: HomecareAvailabilityType;
  recurrenceRule?: string;
}

export interface HomecareRecurringAvailabilityData {
  weekdays: number[];
  startTime: string;
  endTime: string;
  startDate: Date;
  endDate: Date;
  availabilityType?: HomecareAvailabilityType;
} 