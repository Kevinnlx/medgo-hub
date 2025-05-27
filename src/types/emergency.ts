export type EmergencyType = 
  | 'MEDICAL_EMERGENCY'  // Health emergencies requiring immediate attention
  | 'ACCIDENT'           // Injury situations (vehicular, workplace, etc.)
  | 'TRANSFER';          // Non-critical transport between medical facilities

export type EmergencyStatus = 
  | 'PENDING'      // Just created, needs payment
  | 'PAID'         // Payment confirmed, awaiting operator
  | 'ACCEPTED'     // Operator assigned and confirmed
  | 'IN_PROGRESS'  // Operator en route
  | 'ARRIVING'     // Within 3 minutes of arrival
  | 'COMPLETED'    // Service concluded
  | 'CANCELLED';   // Request terminated

export type PaymentStatus = 
  | 'PENDING'      // Payment intent created
  | 'PROCESSING'   // Payment being processed
  | 'SUCCEEDED'    // Payment completed successfully
  | 'FAILED'       // Payment attempt failed
  | 'REFUNDED';    // Payment refunded

export interface EmergencyProviderConfig {
  id: string;
  providerId: string;
  baseFeeAmountCents: number;
  perKmFeeAmountCents: number;
  serviceRadiusKm: number;
  maxConcurrentRequests: number;
  operatingHours: {
    [day: string]: { open: string; close: string; closed?: boolean };
  };
  autoAssign: boolean;
  isActive: boolean;
  commissionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyOperatorAvailability {
  id: string;
  operatorId: string;
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  lastLocationUpdate?: string;
  lastStatusChange: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyRequest {
  id: string;
  requesterId: string;
  providerId: string;
  operatorId?: string;
  
  // Patient Information
  patientName: string;
  patientAge: number;
  bloodType?: string;
  medicalConditions?: string[];
  allergies?: string[];
  
  // Emergency Details
  emergencyType: EmergencyType;
  description: string;
  status: EmergencyStatus;
  
  // Location Information
  pickupAddress: string;
  pickupCoordinates: {
    latitude: number;
    longitude: number;
  };
  referenceNotes?: string;
  buildingDetails?: string;
  
  // Contact Information
  contactName: string;
  contactPhone: string;
  contactRelationship: string;
  
  // Distance and Payment
  estimatedDistanceKm?: number;
  finalDistanceKm?: number;
  paymentId?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  acceptedAt?: string;
  startedAt?: string;
  arrivedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  
  // Additional Information
  cancellationReason?: string;
  serviceNotes?: string;
}

export interface EmergencyPayment {
  id: string;
  requestId: string;
  amountCents: number;
  platformFeeCents: number;
  providerAmountCents: number;
  paymentProvider?: string;
  paymentIntentId?: string;
  paymentMethodId?: string;
  customerId?: string;
  status: PaymentStatus;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  refundedAt?: string;
}

export interface EmergencyProviderPayout {
  id: string;
  providerId: string;
  amountUsd: number;
  requestIds: string[];
  paymentIds: string[];
  status: string;
  payoutMethod?: string;
  transactionReference?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface EmergencyLocationUpdate {
  id: string;
  requestId: string;
  operatorId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}

export interface EmergencyStatusHistory {
  id: string;
  requestId: string;
  status: EmergencyStatus;
  changedBy: string;
  notes?: string;
  createdAt: string;
}

export interface EmergencyRating {
  id: string;
  requestId: string;
  ratedBy: string;
  responseTimeRating: number; // 1-5
  serviceQualityRating: number; // 1-5
  operatorRating: number; // 1-5
  overallRating: number; // 1-5
  comments?: string;
  createdAt: string;
}

export interface EmergencyPriceCalculation {
  totalAmountCents: number;
  platformFeeCents: number;
  providerAmountCents: number;
  baseFeeCents: number;
  distanceFeeCents: number;
  distanceKm: number;
}

export interface AvailableOperator {
  operatorId: string;
  name: string;
  distanceKm: number;
  lastLocationUpdate: string;
  specializations?: string[];
  rating?: number;
  estimatedArrivalMinutes?: number;
}

// Request payload for creating emergency request
export interface CreateEmergencyRequestPayload {
  patientName: string;
  patientAge: number;
  bloodType?: string;
  medicalConditions?: string[];
  allergies?: string[];
  emergencyType: EmergencyType;
  description: string;
  pickupAddress: string;
  pickupCoordinates: {
    latitude: number;
    longitude: number;
  };
  referenceNotes?: string;
  buildingDetails?: string;
  contactName: string;
  contactPhone: string;
  contactRelationship: string;
  providerId: string;
}

// Update request status payload
export interface UpdateEmergencyStatusPayload {
  status: EmergencyStatus;
  notes?: string;
  finalDistanceKm?: number;
  serviceNotes?: string;
}

// Rate service payload
export interface RateEmergencyServicePayload {
  responseTimeRating: number;
  serviceQualityRating: number;
  operatorRating: number;
  overallRating: number;
  comments?: string;
}

// Operator location update payload
export interface UpdateOperatorLocationPayload {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Provider configuration update payload
export interface UpdateProviderConfigPayload {
  baseFeeAmountCents?: number;
  perKmFeeAmountCents?: number;
  serviceRadiusKm?: number;
  maxConcurrentRequests?: number;
  operatingHours?: {
    [day: string]: { open: string; close: string; closed?: boolean };
  };
  autoAssign?: boolean;
  isActive?: boolean;
  commissionPercentage?: number;
} 