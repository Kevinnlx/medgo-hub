export interface EmergencyUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'PROVIDER' | 'STAFF' | 'PARAMEDIC'
  emergencyId: string
  emergencyName: string
  permissions: EmergencyPermission[]
  avatar?: string
  isActive: boolean
  createdAt: Date
}

export type EmergencyPermission = 
  | 'VIEW_REQUESTS'
  | 'MANAGE_REQUESTS'
  | 'DISPATCH_UNITS'
  | 'MANAGE_PARAMEDICS'
  | 'VIEW_LOCATIONS'
  | 'MANAGE_VEHICLES'
  | 'VIEW_REPORTS'
  | 'MANAGE_STAFF'
  | 'CONFIGURE_EMERGENCY'
  | 'ACCESS_MEDICAL_PROTOCOLS'

export interface EmergencyRequest {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  providerId: string
  paramedicId?: string
  location: EmergencyLocation
  destination?: EmergencyLocation
  status: 'requested' | 'assigned' | 'en_route' | 'arrived' | 'transporting' | 'completed' | 'cancelled'
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  symptoms: string
  patientAge?: number
  patientGender?: 'male' | 'female'
  medicalHistory?: string[]
  currentMedications?: string[]
  allergies?: string[]
  vitalSigns?: EmergencyVitalSigns
  notes?: string
  estimatedCost: number
  finalCost?: number
  distance: number
  estimatedArrival: Date
  actualArrival?: Date
  departureTime?: Date
  arrivalAtDestination?: Date
  completedAt?: Date
  rating?: EmergencyRating
  paymentStatus: 'pending' | 'completed' | 'refunded'
  requestedBy?: string
  dispatchedBy?: string
  protocolsApplied?: string[]
  equipmentUsed?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface EmergencyVitalSigns {
  bloodPressure?: string
  heartRate?: number
  temperature?: number
  oxygenSaturation?: number
  respiratoryRate?: number
  glasgowScale?: number
  painScale?: number
  recordedAt: Date
  recordedBy: string
}

export interface EmergencyLocation {
  latitude: number
  longitude: number
  address: string
  city: string
  postalCode: string
  landmark?: string
  floor?: string
  apartment?: string
  accessInstructions?: string
}

export interface EmergencyParamedic {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  certifications: string[]
  specializations: string[]
  experience: number
  rating: number
  isAvailable: boolean
  currentLocation?: EmergencyLocation
  emergencyId: string
  vehicleId?: string
  shiftStart?: Date
  shiftEnd?: Date
  maxConcurrentCases: number
  assignedRequests: string[]
  completedCases: number
  responseTimeAvg: number // minutes
  languages: string[]
  createdAt: Date
}

export interface EmergencyVehicle {
  id: string
  type: 'ambulance_basic' | 'ambulance_advanced' | 'ambulance_icu' | 'motorcycle' | 'helicopter'
  licensePlate: string
  model: string
  year: number
  equipment: string[]
  capacity: number
  status: 'available' | 'in_use' | 'maintenance' | 'out_of_service'
  currentLocation?: EmergencyLocation
  paramedicId?: string
  emergencyId: string
  lastMaintenance: Date
  nextMaintenance: Date
  fuelLevel?: number
  mileage: number
  isGpsEnabled: boolean
  createdAt: Date
}

export interface EmergencyProtocol {
  id: string
  name: string
  category: string
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  symptoms: string[]
  steps: ProtocolStep[]
  requiredEquipment: string[]
  estimatedTime: number // minutes
  emergencyId: string
  isActive: boolean
  createdAt: Date
}

export interface ProtocolStep {
  order: number
  instruction: string
  critical: boolean
  estimatedTime: number // minutes
  requiredEquipment?: string[]
}

export interface EmergencyRating {
  id: string
  clientId: string
  requestId: string
  providerId: string
  paramedicId: string
  overallRating: number // 1-5
  responseTime: number // 1-5
  professionalism: number // 1-5
  medicalCare: number // 1-5
  communication: number // 1-5
  comfort: number // 1-5
  comment?: string
  wouldRecommend: boolean
  createdAt: Date
}

export interface EmergencyStats {
  totalRequests: number
  activeRequests: number
  completedRequests: number
  totalRevenue: number
  averageResponseTime: number
  averageRating: number
  availableParamedics: number
  availableVehicles: number
  topUrgencyLevels: {
    level: string
    count: number
    avgResponseTime: number
  }[]
  recentActivity: EmergencyActivity[]
}

export interface EmergencyActivity {
  id: string
  type: 'request_received' | 'paramedic_assigned' | 'unit_dispatched' | 'arrived_on_scene' | 'transporting' | 'case_completed' | 'vehicle_maintenance'
  description: string
  timestamp: Date
  requestId?: string
  paramedicId?: string
  vehicleId?: string
  urgencyLevel?: string
}

export interface EmergencyConfig {
  id: string
  emergencyId: string
  serviceName: string
  description: string
  serviceArea: EmergencyServiceArea
  headquarters: EmergencyLocation
  contactInfo: {
    email: string
    phone: string
    emergencyHotline: string
    website?: string
  }
  operatingHours: {
    [key: string]: {
      start: string
      end: string
      isOpen: boolean
      nightShift: boolean
    }
  }
  responseSettings: {
    maxResponseTime: number // minutes
    maxServiceDistance: number // km
    autoDispatch: boolean
    requireConfirmation: boolean
    allowMultipleUnits: boolean
  }
  pricingSettings: {
    baseFee: number
    perKmRate: number
    urgencyMultipliers: {
      low: number
      medium: number
      high: number
      critical: number
    }
    equipmentFees: { [equipment: string]: number }
    nightSurcharge: number
    weekendSurcharge: number
  }
  medicalSettings: {
    protocolsRequired: boolean
    vitalSignsRequired: boolean
    destinationHospitals: string[]
    partnerPharmacies: string[]
  }
  vehicleSettings: {
    gpsTrackingEnabled: boolean
    fuelMonitoring: boolean
    maintenanceAlerts: boolean
    capacityLimits: { [vehicleType: string]: number }
  }
  notificationSettings: {
    clientNotifications: boolean
    hospitalNotifications: boolean
    familyNotifications: boolean
    realTimeTracking: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EmergencyServiceArea {
  regions: string[]
  cities: string[]
  excludedAreas?: string[]
  maximumDistance: number // km from headquarters
  priority: 'coverage' | 'response_time'
}

export interface EmergencyReport {
  id: string
  emergencyId: string
  type: 'response_times' | 'financial' | 'paramedic_performance' | 'vehicle_utilization' | 'medical_outcomes'
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  data: any
  generatedAt: Date
  generatedBy: string
}

export interface EmergencyDispatch {
  id: string
  requestId: string
  dispatchTime: Date
  paramedicId: string
  vehicleId: string
  dispatchedBy: string
  estimatedArrival: Date
  actualArrival?: Date
  route?: {
    distance: number
    estimatedTime: number
    coordinates: { lat: number; lng: number }[]
  }
  status: 'dispatched' | 'en_route' | 'arrived' | 'completed' | 'cancelled'
  notes?: string
}

export interface EmergencyEquipment {
  id: string
  name: string
  category: string
  description: string
  emergencyId: string
  vehicleId?: string
  quantity: number
  status: 'available' | 'in_use' | 'maintenance' | 'expired'
  expirationDate?: Date
  lastInspection: Date
  nextInspection: Date
  cost: number
  supplier: string
  createdAt: Date
} 