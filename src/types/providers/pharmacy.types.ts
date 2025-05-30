export interface PharmacyUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'PROVIDER' | 'STAFF'
  pharmacyId: string
  pharmacyName: string
  permissions: PharmacyPermission[]
  avatar?: string
  isActive: boolean
  createdAt: Date
}

export type PharmacyPermission = 
  | 'VIEW_INVENTORY'
  | 'MANAGE_INVENTORY'
  | 'PROCESS_ORDERS'
  | 'VERIFY_PRESCRIPTIONS'
  | 'MANAGE_COURIERS'
  | 'VIEW_REPORTS'
  | 'MANAGE_STAFF'
  | 'CONFIGURE_PHARMACY'

export interface PharmacyMedication {
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
  isActive: boolean
  pharmacyId: string
}

export interface PharmacyOrder {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  pharmacyId: string
  items: PharmacyOrderItem[]
  prescriptions?: PharmacyPrescription[]
  subtotal: number
  deliveryFee: number
  total: number
  status: 'pending' | 'payment_pending' | 'verified' | 'processing' | 'ready' | 'dispatched' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'partial' | 'completed' | 'refunded'
  deliveryAddress: PharmacyAddress
  estimatedDelivery: Date
  trackingNumber?: string
  courierId?: string
  verificationNotes?: string
  verifiedBy?: string
  processedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface PharmacyOrderItem {
  medicationId: string
  medicationName: string
  quantity: number
  price: number
  prescriptionId?: string
  instructions?: string
  verified: boolean
  verifiedBy?: string
}

export interface PharmacyPrescription {
  id: string
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  isDigital: boolean
  verificationRequired: boolean
  verified: boolean
  verifiedBy?: string
  verifiedAt?: Date
  dispensedAt?: Date
  doctorName?: string
  doctorLicense?: string
}

export interface PharmacyAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  landmark?: string
  latitude?: number
  longitude?: number
}

export interface PharmacyCourier {
  id: string
  name: string
  email: string
  phone: string
  vehicleType: string
  vehiclePlate: string
  isAvailable: boolean
  currentLocation?: {
    latitude: number
    longitude: number
  }
  rating: number
  deliveriesCompleted: number
  pharmacyId: string
  createdAt: Date
}

export interface PharmacyStats {
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  totalRevenue: number
  lowStockItems: number
  topSellingMedications: {
    name: string
    quantity: number
    revenue: number
  }[]
  recentActivity: PharmacyActivity[]
}

export interface PharmacyActivity {
  id: string
  type: 'order_received' | 'order_verified' | 'order_dispatched' | 'order_delivered' | 'stock_low' | 'prescription_verified'
  description: string
  timestamp: Date
  userId?: string
  orderId?: string
  medicationId?: string
}

export interface PharmacyConfig {
  id: string
  pharmacyId: string
  businessName: string
  description: string
  address: PharmacyAddress
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
  deliverySettings: {
    minOrderValue: number
    deliveryFee: number
    freeDeliveryThreshold: number
    maxDeliveryDistance: number
    estimatedDeliveryTime: number // minutes
  }
  prescriptionSettings: {
    requireVerification: boolean
    digitalPrescriptionAccepted: boolean
    allowPartialDispensing: boolean
  }
  paymentSettings: {
    acceptedMethods: ('cash' | 'card' | 'transfer' | 'insurance')[]
    requirePaymentBeforeDelivery: boolean
  }
  notificationSettings: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    orderAlerts: boolean
    stockAlerts: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PharmacyReport {
  id: string
  pharmacyId: string
  type: 'sales' | 'inventory' | 'deliveries' | 'prescriptions'
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  data: any
  generatedAt: Date
  generatedBy: string
} 