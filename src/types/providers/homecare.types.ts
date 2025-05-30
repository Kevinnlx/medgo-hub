export interface HomecareUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'PROVIDER' | 'STAFF' | 'CAREGIVER'
  homecareId: string
  homecareName: string
  permissions: HomecarePermission[]
  avatar?: string
  isActive: boolean
  createdAt: Date
}

export type HomecarePermission = 
  | 'VIEW_BOOKINGS'
  | 'MANAGE_BOOKINGS'
  | 'VIEW_CLIENTS'
  | 'MANAGE_CLIENTS'
  | 'MANAGE_CAREGIVERS'
  | 'VIEW_CARE_PLANS'
  | 'MANAGE_CARE_PLANS'
  | 'VIEW_REPORTS'
  | 'MANAGE_STAFF'
  | 'CONFIGURE_HOMECARE'
  | 'MANAGE_SERVICES'

export interface HomecareService {
  id: string
  name: string
  description: string
  category: string
  duration: number // minutes
  price: number
  requiresSpecialization: boolean
  equipment: string[]
  homecareId: string
  careLevel: 'basic' | 'intermediate' | 'advanced' | 'specialized'
  ageGroups: ('infant' | 'child' | 'adult' | 'elderly')[]
  medicalConditions: string[]
  prerequisites: string[]
  isActive: boolean
  createdAt: Date
}

export interface HomecareBooking {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  clientAddress: HomecareAddress
  providerId: string
  caregiverId?: string
  serviceId: string
  serviceName: string
  serviceCategory: string
  scheduledDate: Date
  scheduledTime: string
  duration: number
  status: 'scheduled' | 'confirmed' | 'caregiver_assigned' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled'
  specialInstructions?: string
  carePlan?: string
  medicalNotes?: string
  emergencyContact: EmergencyContact
  rating?: HomecareRating
  price: number
  paymentStatus: 'pending' | 'completed' | 'refunded'
  recurringPattern?: 'none' | 'daily' | 'weekly' | 'bi-weekly' | 'monthly'
  recurringEndDate?: Date
  caregiverArrival?: Date
  serviceStart?: Date
  serviceEnd?: Date
  serviceNotes?: string
  vitalSigns?: HomecareVitalSigns[]
  medicationsAdministered?: MedicationRecord[]
  documentsGenerated?: string[]
  familyPresent?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface HomecareAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  landmark?: string
  latitude?: number
  longitude?: number
  floor?: string
  apartment?: string
  accessInstructions?: string
  parkingAvailable?: boolean
}

export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
  email?: string
  address?: string
}

export interface HomecareVitalSigns {
  bloodPressure?: string
  heartRate?: number
  temperature?: number
  oxygenSaturation?: number
  bloodSugar?: number
  weight?: number
  height?: number
  recordedAt: Date
  recordedBy: string
  notes?: string
}

export interface MedicationRecord {
  medicationName: string
  dosage: string
  administeredAt: Date
  administeredBy: string
  notes?: string
  patientResponse?: string
}

export interface HomecareCaregiver {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber?: string
  certifications: string[]
  specializations: string[]
  experience: number
  rating: number
  isAvailable: boolean
  currentLocation?: HomecareLocation
  homecareId: string
  workingHours: {
    [key: string]: {
      start: string
      end: string
      isAvailable: boolean
    }
  }
  serviceAreas: string[]
  maxConcurrentClients: number
  assignedClients: string[]
  completedServices: number
  languages: string[]
  transportationAvailable: boolean
  ageGroupPreferences: ('infant' | 'child' | 'adult' | 'elderly')[]
  medicalConditionExpertise: string[]
  biography?: string
  emergencyContact: EmergencyContact
  createdAt: Date
}

export interface HomecareLocation {
  latitude: number
  longitude: number
  address: string
  city: string
  postalCode: string
  landmark?: string
}

export interface CarePlan {
  id: string
  clientId: string
  clientName: string
  providerId: string
  title: string
  description: string
  goals: CareGoal[]
  services: CarePlanService[]
  schedule: CareSchedule[]
  startDate: Date
  endDate?: Date
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  assignedCaregivers: string[]
  medicalConditions: string[]
  medications: CarePlanMedication[]
  dietaryRestrictions: string[]
  mobilityLevel: 'independent' | 'assisted' | 'wheelchair' | 'bedbound'
  cognitiveLevel: 'normal' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment'
  notes?: string
  familyInvolvement: boolean
  emergencyProcedures: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface CareGoal {
  id: string
  description: string
  targetDate: Date
  status: 'in_progress' | 'achieved' | 'modified' | 'discontinued'
  measurableOutcome: string
  progress: number // 0-100
}

export interface CarePlanService {
  serviceId: string
  serviceName: string
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'as_needed'
  duration: number
  specialInstructions?: string
}

export interface CareSchedule {
  serviceId: string
  serviceName: string
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly'
  timeSlots: string[]
  duration: number
  daysOfWeek?: number[] // 0-6, Sunday to Saturday
  specificDates?: Date[]
}

export interface CarePlanMedication {
  name: string
  dosage: string
  frequency: string
  administrationTime: string[]
  instructions: string
  startDate: Date
  endDate?: Date
  prescribedBy: string
}

export interface HomecareRating {
  id: string
  clientId: string
  bookingId: string
  providerId: string
  caregiverId: string
  overallRating: number // 1-5
  punctuality: number // 1-5
  professionalism: number // 1-5
  qualityOfCare: number // 1-5
  communication: number // 1-5
  kindness: number // 1-5
  comment?: string
  wouldRecommend: boolean
  wouldRequestAgain: boolean
  createdAt: Date
}

export interface HomecareStats {
  totalBookings: number
  activeBookings: number
  completedBookings: number
  totalRevenue: number
  averageRating: number
  totalClients: number
  activeCarePlans: number
  topServices: {
    name: string
    bookings: number
    revenue: number
  }[]
  caregiverPerformance: {
    caregiverId: string
    name: string
    rating: number
    completedServices: number
  }[]
  recentActivity: HomecareActivity[]
}

export interface HomecareActivity {
  id: string
  type: 'booking_scheduled' | 'caregiver_assigned' | 'service_started' | 'service_completed' | 'care_plan_created' | 'emergency_contact'
  description: string
  timestamp: Date
  bookingId?: string
  caregiverId?: string
  clientId?: string
  carePlanId?: string
}

export interface HomecareConfig {
  id: string
  homecareId: string
  serviceName: string
  description: string
  serviceAreas: string[]
  headquarters: HomecareAddress
  contactInfo: {
    email: string
    phone: string
    emergencyPhone: string
    website?: string
  }
  operatingHours: {
    [key: string]: {
      start: string
      end: string
      isAvailable: boolean
      emergencyServices: boolean
    }
  }
  serviceSettings: {
    minimumServiceDuration: number
    maximumServiceDuration: number
    advanceBookingDays: number
    lastMinuteBookingHours: number
    allowRecurringServices: boolean
    allowFamilyPresence: boolean
  }
  caregiverSettings: {
    maxTravelDistance: number
    transportationReimbursement: boolean
    backgroundCheckRequired: boolean
    certificationRequired: boolean
    minimumExperience: number
  }
  pricingSettings: {
    baseHourlyRate: number
    serviceMultipliers: { [serviceType: string]: number }
    travelFee: number
    emergencyServiceSurcharge: number
    weekendSurcharge: number
    holidaySurcharge: number
    cancellationPolicy: {
      freeThreshold: number // hours before service
      partialRefund: number // percentage
    }
  }
  medicalSettings: {
    vitalSignsTracking: boolean
    medicationAdministration: boolean
    medicalNotesRequired: boolean
    familyNotifications: boolean
    doctorReporting: boolean
  }
  qualitySettings: {
    mandatoryRatings: boolean
    minimumRating: number
    caregiverRetrainingThreshold: number
    qualityAssuranceCalls: boolean
    documentationRequired: boolean
  }
  notificationSettings: {
    clientReminders: boolean
    familyUpdates: boolean
    caregiverAlerts: boolean
    emergencyNotifications: boolean
    serviceReports: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface HomecareReport {
  id: string
  homecareId: string
  type: 'service_quality' | 'financial' | 'caregiver_performance' | 'client_satisfaction' | 'care_outcomes'
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  data: any
  generatedAt: Date
  generatedBy: string
}

export interface HomecareClient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  address: HomecareAddress
  medicalConditions: string[]
  medications: string[]
  allergies: string[]
  emergencyContacts: EmergencyContact[]
  insuranceInfo?: {
    provider: string
    policyNumber: string
    groupNumber?: string
  }
  mobilityLevel: 'independent' | 'assisted' | 'wheelchair' | 'bedbound'
  cognitiveLevel: 'normal' | 'mild_impairment' | 'moderate_impairment' | 'severe_impairment'
  preferredLanguage: string
  specialNeeds: string[]
  homecareId: string
  assignedCaregiver?: string
  activeCarePlan?: string
  registrationDate: Date
  lastServiceDate?: Date
  totalServices: number
  isActive: boolean
} 