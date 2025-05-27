export interface Doctor {
  id: string
  name: string
  specialty: string
  email: string
  phone: string
  avatar?: string
  rating: number
  experience: number // años
  consultationFee: number
  availableFrom: string
  availableTo: string
  isOnline: boolean
}

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  bloodType: string
  allergies: string[]
  chronicConditions: string[]
}

export interface Consultation {
  id: string
  patientName: string
  patientId: string
  doctorName: string
  doctorId: string
  type: 'presencial' | 'virtual'
  date: Date
  time: string
  status: 'programada' | 'en-progreso' | 'completada' | 'cancelada'
  reason: string
  duration: number
  notes?: string
  prescription?: Prescription[]
  room?: string // For in-office appointments
  virtualLink?: string // For virtual consultations
  waitingRoom?: boolean
  checkInTime?: Date
  checkOutTime?: Date
  // Additional properties needed by components
  scheduledDateTime?: Date
  providerType?: string
  providerId?: string
  location?: string
  virtualMeetingLink?: string
  specialty?: string
  urgency?: 'low' | 'medium' | 'high'
  followUpRequired?: boolean
  cost?: number
  insuranceCovered?: boolean
  rating?: {
    rating: number
    comment?: string
  }
  payment?: {
    status: 'pending' | 'completed' | 'failed'
    amount: number
  }
  createdAt?: Date
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: Date
  time: string
  type: 'consultation' | 'follow-up' | 'emergency'
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  reason: string
  notes?: string
  prescription?: Prescription[]
}

export interface Prescription {
  id: string
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  isDigital?: boolean
  verificationRequired?: boolean
  dispensedAt?: Date
  pharmacyId?: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  dateOfBirth: Date
  bloodType: string
  doctorId: string
  attendingPhysician: string
  date: Date
  diagnosis: string
  symptoms: string[]
  treatment: string
  followUpRequired: boolean
  attachments?: string[]
  moduleSource?: 'consultation' | 'emergency' | 'homecare' | 'laboratory'
  accessPermissions?: string[]
  sharedWith?: string[]
  timeLimit?: Date
  confidentialityLevel: 'low' | 'medium' | 'high'
  status: 'active' | 'archived' | 'under_review' | 'restricted'
  lastUpdate: Date
  totalEntries: number
  lastConsultation?: Date
  accessLog?: AccessLog[]
  allergies?: string[]
  chronicConditions?: string[]
  currentMedications?: string[]
  recentLabResults?: {
    testName: string
    value: string
    date: Date
    status: 'normal' | 'abnormal' | 'critical'
  }[]
  createdDate: Date
  type?: string
  title?: string
  content?: string
  tags?: string[]
  createdBy?: string
  createdAt?: Date
  updatedAt?: Date
  updatedBy?: string
  accessLevel?: 'private' | 'shared' | 'public'
  relatedServices?: string[]
  vitals?: {
    bloodPressure?: string
    heartRate?: number
    temperature?: number
    weight?: number
  }
  medications?: Array<{
    name: string
    dosage: string
  }>
  conditions?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  insuranceInfo?: {
    provider: string
    policyNumber: string
    groupNumber?: string
  }
}

export interface AccessLog {
  id: string
  userId: string
  userName: string
  recordId: string
  action: 'view' | 'edit' | 'share' | 'download'
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

export interface SharedRecord {
  id: string
  recordId: string
  sharedBy: string
  sharedWith: string
  accessLevel: 'read' | 'write'
  purpose: string
  expiresAt?: Date
  isActive: boolean
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'appointment' | 'prescription' | 'reminder' | 'alert'
  isRead: boolean
  createdAt: Date
}

export interface Department {
  id: string
  name: string
  description: string
  icon: string
  doctorCount: number
}

// ===============================
// PHARMACY MODULE TYPES
// ===============================

export interface Medication {
  id: string
  name: string
  brand: string
  category: string
  description: string
  activeIngredient: string
  concentration: string
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'drops'
  price: number
  stock: number
  minStock: number
  maxStock: number
  requiresPrescription: boolean
  batchNumber: string
  manufacturingDate: Date
  expiryDate: Date
  manufacturer: string
  location: string
  barcode?: string
  images?: string[]
}

export interface PharmacyOrder {
  id: string
  clientId: string
  pharmacyId: string
  items: OrderItem[]
  prescriptions?: Prescription[]
  subtotal: number
  deliveryFee: number
  total: number
  status: 'pending' | 'payment_pending' | 'verified' | 'processing' | 'ready' | 'dispatched' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'partial' | 'completed' | 'refunded'
  deliveryAddress: Address
  estimatedDelivery: Date
  trackingNumber?: string
  courierId?: string
  verificationNotes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  medicationId: string
  medicationName: string
  quantity: number
  price: number
  prescriptionId?: string
  instructions?: string
}

// ===============================
// EMERGENCY MODULE TYPES
// ===============================

export interface EmergencyRequest {
  id: string
  clientId: string
  providerId: string
  paramedicId?: string
  location: Location
  destination?: Location
  status: 'requested' | 'assigned' | 'en_route' | 'arrived' | 'transporting' | 'completed' | 'cancelled'
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  symptoms: string
  notes?: string
  estimatedCost: number
  finalCost?: number
  distance: number
  estimatedArrival: Date
  actualArrival?: Date
  completedAt?: Date
  rating?: ServiceRating
  paymentStatus: 'pending' | 'completed' | 'refunded'
  createdAt: Date
  updatedAt: Date
}

export interface Location {
  latitude: number
  longitude: number
  address: string
  city: string
  postalCode: string
  landmark?: string
}

// ===============================
// HOMECARE MODULE TYPES
// ===============================

export interface HomecareService {
  id: string
  name: string
  description: string
  category: string
  duration: number // minutes
  price: number
  requiresSpecialization: boolean
  equipment?: string[]
  providerId: string
}

export interface HomecareBooking {
  id: string
  clientId: string
  providerId: string
  caregiverId?: string
  serviceId: string
  serviceName: string
  location: Location
  scheduledDate: Date
  scheduledTime: string
  duration: number
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled'
  specialInstructions?: string
  carePlan?: string
  rating?: ServiceRating
  price: number
  paymentStatus: 'pending' | 'completed' | 'refunded'
  recurringPattern?: 'none' | 'daily' | 'weekly' | 'monthly'
  caregiverArrival?: Date
  serviceStart?: Date
  serviceEnd?: Date
  serviceNotes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CarePlan {
  id: string
  clientId: string
  providerId: string
  title: string
  description: string
  goals: string[]
  services: string[]
  schedule: CareSchedule[]
  startDate: Date
  endDate?: Date
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  assignedCaregivers: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CareSchedule {
  serviceId: string
  frequency: 'daily' | 'weekly' | 'monthly'
  timeSlots: string[]
  duration: number
}

// ===============================
// LABORATORY MODULE TYPES
// ===============================

export interface LabTest {
  id: string
  name: string
  description: string
  category: string
  sampleType: 'blood' | 'urine' | 'stool' | 'saliva' | 'tissue' | 'other'
  requirements: string[]
  preparationInstructions: string[]
  turnaroundTime: number // hours
  duration?: number // minutes - for the test procedure itself
  price: number
  requiresFasting: boolean
  homeCollection: boolean
  equipment?: string[]
  providerId: string
}

export interface LabOrder {
  id: string
  clientId: string
  providerId: string
  technicianId?: string
  tests: LabOrderTest[]
  doctorId?: string
  doctorName?: string
  prescription?: string
  collectionType: 'home' | 'facility'
  collectionLocation?: Location
  scheduledDate: Date
  scheduledTime: string
  status: 'ordered' | 'scheduled' | 'collected' | 'processing' | 'completed' | 'cancelled'
  sampleCollected?: Date
  resultsAvailable?: Date
  totalCost: number
  paymentStatus: 'pending' | 'completed' | 'refunded'
  specialInstructions?: string
  results?: LabResult[]
  createdAt: Date
  updatedAt: Date
  // Additional properties needed by components
  patientId?: string
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  sampleType?: 'blood' | 'urine' | 'stool' | 'saliva' | 'tissue' | 'other'
  collectionDate?: Date
  resultDate?: Date
  notes?: string
  cost?: number
}

export interface LabOrderTest {
  testId: string
  testName: string
  sampleType: string
  price: number
}

export interface LabResult {
  testId: string
  testName: string
  value: string
  unit: string
  referenceRange: string
  normalRange?: string // Alias for referenceRange for backward compatibility
  status: 'normal' | 'abnormal' | 'critical'
  notes?: string
  validatedBy: string
  validatedAt: Date
}

// ===============================
// LAB TECHNICIAN
// ===============================

export interface LabTechnician {
  id: string
  name: string
  email: string
  phone: string
  specializations: string[]
  experience: number
  rating: number
  isAvailable: boolean
  availability?: boolean // Alias for isAvailable for backward compatibility
  currentLocation?: Location
  workingHours: {
    start: string
    end: string
  }
  assignedOrders: string[]
  certifications?: string[]
  completedTests?: number
}

// ===============================
// SHARED TYPES
// ===============================

export interface ServiceRating {
  id: string
  clientId: string
  serviceId: string
  serviceType: 'consultation' | 'pharmacy' | 'emergency' | 'homecare' | 'laboratory'
  providerId: string
  operatorId?: string
  overallRating: number // 1-5
  serviceQuality?: number // 1-5
  timeliness?: number // 1-5
  communication?: number // 1-5
  professionalism?: number // 1-5
  comment?: string
  wouldRecommend: boolean
  createdAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  landmark?: string
  latitude?: number
  longitude?: number
}

export interface Payment {
  id: string
  orderId: string
  amount: number
  currency: string
  method: 'card' | 'cash' | 'transfer' | 'insurance'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  processedAt?: Date
  refundedAt?: Date
  refundAmount?: number
  platformFee: number
  providerAmount: number
}

export interface DeliveryTracking {
  id: string
  orderId: string
  courierId: string
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'failed'
  currentLocation?: Location
  estimatedDelivery: Date
  actualDelivery?: Date
  trackingEvents: TrackingEvent[]
  deliveryProof?: string
  signature?: string
}

export interface TrackingEvent {
  timestamp: Date
  status: string
  location?: Location
  description: string
}

// ===============================
// CORE ROLE SYSTEM
// ===============================

/**
 * Core Role System for MediGo Hub
 * Note: CLIENT uses medigo-app, OPERATOR uses medigo-ops
 */
export type UserRole = 'PLATFORM' | 'PROVIDER' | 'STAFF' | 'OPERATOR' | 'CLIENT'

/**
 * Staff Types - Used only by STAFF role in medigo-hub
 */
export type StaffType = 'FINANCE' | 'SUPPORT'

/**
 * Parent Entity Type - Defines organization ownership for STAFF
 */
export type ParentEntityType = 'PLATFORM' | 'PROVIDER'

/**
 * Provider Types - Categorizes healthcare providers in medigo-hub
 */
export type ProviderType = 
  | 'MEDICAL_CENTER' 
  | 'PHARMACY' 
  | 'LABORATORY' 
  | 'EMERGENCY' 
  | 'HOMECARE' 
  | 'OFFICE_SPECIALIST' 
  | 'VIRTUAL_SPECIALIST'

/**
 * Operator Types - Field personnel roles (used in medigo-ops, not medigo-hub)
 */
export type OperatorType = 'TRANSPORT' | 'COURIER' | 'TECHNICIAN' | 'PARAMEDIC' | 'CAREGIVER'

export type VerificationStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED'

/**
 * Complete User Profile Structure for MediGo Hub
 * Only PLATFORM, PROVIDER, and STAFF roles access medigo-hub
 */
export interface User {
  id: string
  created_at?: string
  updated_at?: string
  
  // Name fields (medical/legal format)
  first_name?: string
  middle_name?: string
  last_names?: string
  display_name?: string
  
  // Basic Info
  username?: string
  email: string
  phone_number?: string
  avatar_url?: string
  
  // Role Management
  role: UserRole
  staff_type?: StaffType
  parent_entity_type?: ParentEntityType
  parent_id?: string
  provider_type?: ProviderType
  operator_type?: OperatorType
  
  // Provider-specific fields
  organization_name?: string
  license_number?: string
  verification_status?: VerificationStatus
  verified_at?: string
  verified_by?: string
  
  // Additional Info
  address?: string
  bio?: string
  website?: string
  is_active?: boolean
  
  // Legacy fields for compatibility
  name: string
  avatar?: string
  permissions: string[]
  status?: 'active' | 'inactive' | 'suspended'
}

// ===============================
// PROVIDER CONFIGURATION TYPES
// ===============================

export interface ProviderConfig {
  id: string
  providerId: string
  providerType: ProviderType
  businessName: string
  description: string
  serviceArea: Location[]
  operatingHours: OperatingHours
  contactInfo: ContactInfo
  specializations?: string[]
  facilities?: Facility[]
  pricing: PricingModel
  settings: ProviderSettings
  staff: StaffMember[]
  operators: OperatorMember[]
  createdAt: Date
  updatedAt: Date
}

export interface OperatingHours {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
  holidays: boolean
  emergencyHours?: boolean
}

export interface TimeSlot {
  start: string
  end: string
  serviceTypes?: string[]
}

export interface ContactInfo {
  email: string
  phone: string
  website?: string
  address: Address
  emergencyContact?: string
}

export interface Facility {
  id: string
  name: string
  type: 'consultation_room' | 'procedure_room' | 'waiting_area' | 'pharmacy' | 'laboratory' | 'storage'
  capacity: number
  equipment: string[]
  isActive: boolean
}

export interface PricingModel {
  type: 'fixed' | 'dynamic' | 'time_based' | 'distance_based'
  baseFee: number
  additionalFees: AdditionalFee[]
  discounts?: Discount[]
  insuranceAccepted: string[]
}

export interface AdditionalFee {
  name: string
  type: 'percentage' | 'fixed'
  value: number
  conditions?: string[]
}

export interface Discount {
  name: string
  type: 'percentage' | 'fixed'
  value: number
  conditions: string[]
  validFrom: Date
  validTo: Date
}

export interface ProviderSettings {
  autoAcceptBookings: boolean
  maxConcurrentServices: number
  cancellationPolicy: CancellationPolicy
  notificationPreferences: NotificationPreferences
  qualityAssurance: QualitySettings
  integration: IntegrationSettings
}

export interface CancellationPolicy {
  allowCancellation: boolean
  timeLimit: number // hours before service
  refundPercentage: number
  reschedulePolicy: boolean
}

export interface NotificationPreferences {
  email: boolean
  sms: boolean
  push: boolean
  newBookings: boolean
  cancellations: boolean
  emergencies: boolean
  reports: boolean
}

export interface QualitySettings {
  requireRatings: boolean
  minRatingThreshold: number
  autoSuspendLowRated: boolean
  qualityChecks: boolean
}

export interface IntegrationSettings {
  medicalRecords: boolean
  externalSystems: string[]
  apiAccess: boolean
  dataSharing: boolean
}

export interface StaffMember {
  id: string
  userId: string
  name: string
  role: StaffType
  permissions: string[]
  departments?: string[]
  isActive: boolean
  hiredAt: Date
}

export interface OperatorMember {
  id: string
  operatorId: string
  name: string
  type: OperatorType
  specializations: string[]
  serviceAreas: string[]
  isActive: boolean
  isAvailable: boolean
  currentLocation?: Location
  rating: number
  completedServices: number
  joinedAt: Date
} 