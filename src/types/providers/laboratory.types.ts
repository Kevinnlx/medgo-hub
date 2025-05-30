export interface LaboratoryUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'PROVIDER' | 'STAFF' | 'TECHNICIAN'
  laboratoryId: string
  laboratoryName: string
  permissions: LaboratoryPermission[]
  avatar?: string
  isActive: boolean
  createdAt: Date
}

export type LaboratoryPermission = 
  | 'VIEW_ORDERS'
  | 'MANAGE_ORDERS'
  | 'PROCESS_SAMPLES'
  | 'ENTER_RESULTS'
  | 'VALIDATE_RESULTS'
  | 'MANAGE_TESTS'
  | 'MANAGE_TECHNICIANS'
  | 'VIEW_REPORTS'
  | 'MANAGE_STAFF'
  | 'CONFIGURE_LABORATORY'

export interface LaboratoryTest {
  id: string
  name: string
  description: string
  category: string
  sampleType: 'blood' | 'urine' | 'stool' | 'saliva' | 'tissue' | 'other'
  requirements: string[]
  preparationInstructions: string[]
  turnaroundTime: number // hours
  duration: number // minutes for collection
  price: number
  requiresFasting: boolean
  homeCollection: boolean
  equipment: string[]
  laboratoryId: string
  isActive: boolean
  createdAt: Date
}

export interface LaboratoryOrder {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  clientDateOfBirth: Date
  clientGender: 'male' | 'female' | 'other'
  laboratoryId: string
  technicianId?: string
  tests: LaboratoryOrderTest[]
  doctorId?: string
  doctorName?: string
  prescription?: string
  collectionType: 'home' | 'facility'
  collectionLocation?: LaboratoryAddress
  scheduledDate: Date
  scheduledTime: string
  status: 'ordered' | 'scheduled' | 'collected' | 'processing' | 'results_ready' | 'results_validated' | 'completed' | 'cancelled'
  sampleCollected?: Date
  resultsAvailable?: Date
  totalCost: number
  paymentStatus: 'pending' | 'completed' | 'refunded'
  specialInstructions?: string
  results?: LaboratoryResult[]
  priority: 'routine' | 'urgent' | 'stat'
  collectedBy?: string
  processedBy?: string
  validatedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface LaboratoryOrderTest {
  testId: string
  testName: string
  sampleType: string
  price: number
  status: 'pending' | 'collected' | 'processing' | 'completed'
  collectedAt?: Date
  processedAt?: Date
}

export interface LaboratoryResult {
  testId: string
  testName: string
  value: string
  unit: string
  referenceRange: string
  status: 'normal' | 'abnormal' | 'critical'
  notes?: string
  enteredBy: string
  enteredAt: Date
  validatedBy?: string
  validatedAt?: Date
  reportedAt?: Date
  flagged: boolean
}

export interface LaboratoryTechnician {
  id: string
  name: string
  email: string
  phone: string
  specializations: string[]
  experience: number
  rating: number
  isAvailable: boolean
  currentLocation?: LaboratoryLocation
  workingHours: {
    start: string
    end: string
  }
  assignedOrders: string[]
  certifications: string[]
  completedTests: number
  laboratoryId: string
  createdAt: Date
}

export interface LaboratoryAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  landmark?: string
  latitude?: number
  longitude?: number
}

export interface LaboratoryLocation {
  latitude: number
  longitude: number
  address: string
  city: string
  postalCode: string
  landmark?: string
}

export interface LaboratoryStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalRevenue: number
  criticalResults: number
  avgTurnaroundTime: number
  topTests: {
    name: string
    count: number
    revenue: number
  }[]
  recentActivity: LaboratoryActivity[]
}

export interface LaboratoryActivity {
  id: string
  type: 'order_received' | 'sample_collected' | 'results_entered' | 'results_validated' | 'critical_result' | 'technician_assigned'
  description: string
  timestamp: Date
  userId?: string
  orderId?: string
  testId?: string
}

export interface LaboratoryConfig {
  id: string
  laboratoryId: string
  businessName: string
  description: string
  address: LaboratoryAddress
  serviceRadius: number // km
  operatingHours: {
    [key: string]: {
      start: string
      end: string
      isOpen: boolean
    }
  }
  contactInfo: {
    email: string
    phone: string
    website?: string
    emergencyContact?: string
  }
  collectionSettings: {
    homeCollectionFee: number
    minOrderValueForFreeCollection: number
    maxCollectionDistance: number
    collectionTimeSlots: string[]
  }
  testSettings: {
    defaultTurnaroundTime: number
    urgentTestSurcharge: number
    fastingRequiredNotice: number
    criticalResultNotification: boolean
  }
  qualitySettings: {
    requireDoubleValidation: boolean
    criticalValueLimits: { [testName: string]: { min: number; max: number } }
    qualityControlFrequency: number
  }
  reportSettings: {
    includeGraphs: boolean
    includeInterpretation: boolean
    digitalDelivery: boolean
    printedCopies: boolean
  }
  notificationSettings: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    orderAlerts: boolean
    criticalResults: boolean
    fastingReminders: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface LaboratoryReport {
  id: string
  laboratoryId: string
  type: 'test_results' | 'financial' | 'quality_control' | 'technician_performance'
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  data: any
  generatedAt: Date
  generatedBy: string
}

export interface LaboratoryEquipment {
  id: string
  name: string
  type: string
  manufacturer: string
  model: string
  serialNumber: string
  status: 'operational' | 'maintenance' | 'out_of_order'
  lastMaintenance: Date
  nextMaintenance: Date
  laboratoryId: string
  assignedTests: string[]
  location: string
  createdAt: Date
} 