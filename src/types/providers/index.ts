// Pharmacy Provider Types
export * from './pharmacy.types'

// Laboratory Provider Types  
export * from './laboratory.types'

// Medical Center Provider Types
export * from './medical-center.types'

// Emergency Provider Types
export * from './emergency.types'

// Homecare Provider Types
export * from './homecare.types'

// Base Provider Type Definitions
export type ProviderType = 
  | 'MEDICAL_CENTER' 
  | 'PHARMACY' 
  | 'LABORATORY' 
  | 'EMERGENCY' 
  | 'HOMECARE' 
  | 'OFFICE_SPECIALIST' 
  | 'VIRTUAL_SPECIALIST'

export type UserRole = 'PLATFORM' | 'PROVIDER' | 'STAFF' | 'OPERATOR' | 'CLIENT'

export type StaffType = 'FINANCE' | 'SUPPORT'

export type OperatorType = 'TRANSPORT' | 'COURIER' | 'TECHNICIAN' | 'PARAMEDIC' | 'CAREGIVER'

export type VerificationStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED'

// Base User Interface for all providers
export interface BaseUser {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  permissions: string[]
  avatar?: string
  isActive: boolean
  createdAt: Date
}

// Provider Type Union for Type Guards
export type ProviderUser = 
  | import('./pharmacy.types').PharmacyUser
  | import('./laboratory.types').LaboratoryUser
  | import('./medical-center.types').MedicalCenterUser
  | import('./emergency.types').EmergencyUser
  | import('./homecare.types').HomecareUser

// Provider Config Union
export type ProviderConfig = 
  | import('./pharmacy.types').PharmacyConfig
  | import('./laboratory.types').LaboratoryConfig
  | import('./medical-center.types').MedicalCenterConfig
  | import('./emergency.types').EmergencyConfig
  | import('./homecare.types').HomecareConfig

// Provider Stats Union
export type ProviderStats = 
  | import('./pharmacy.types').PharmacyStats
  | import('./laboratory.types').LaboratoryStats
  | import('./medical-center.types').MedicalCenterStats
  | import('./emergency.types').EmergencyStats
  | import('./homecare.types').HomecareStats

// Provider Report Union
export type ProviderReport = 
  | import('./pharmacy.types').PharmacyReport
  | import('./laboratory.types').LaboratoryReport
  | import('./medical-center.types').MedicalCenterReport
  | import('./emergency.types').EmergencyReport
  | import('./homecare.types').HomecareReport

// Type Guards
export const isPharmacyUser = (user: ProviderUser): user is import('./pharmacy.types').PharmacyUser => {
  return 'pharmacyId' in user
}

export const isLaboratoryUser = (user: ProviderUser): user is import('./laboratory.types').LaboratoryUser => {
  return 'laboratoryId' in user
}

export const isMedicalCenterUser = (user: ProviderUser): user is import('./medical-center.types').MedicalCenterUser => {
  return 'medicalCenterId' in user
}

export const isEmergencyUser = (user: ProviderUser): user is import('./emergency.types').EmergencyUser => {
  return 'emergencyId' in user
}

export const isHomecareUser = (user: ProviderUser): user is import('./homecare.types').HomecareUser => {
  return 'homecareId' in user
} 