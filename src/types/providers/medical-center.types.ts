export interface MedicalCenterUser {
  id: string
  name: string
  email: string
  phone: string
  role: 'PROVIDER' | 'STAFF' | 'DOCTOR'
  medicalCenterId: string
  medicalCenterName: string
  permissions: MedicalCenterPermission[]
  avatar?: string
  isActive: boolean
  createdAt: Date
}

export type MedicalCenterPermission = 
  | 'VIEW_APPOINTMENTS'
  | 'MANAGE_APPOINTMENTS'
  | 'VIEW_PATIENTS'
  | 'MANAGE_PATIENTS'
  | 'ACCESS_RECORDS'
  | 'MANAGE_DOCTORS'
  | 'MANAGE_DEPARTMENTS'
  | 'VIEW_REPORTS'
  | 'MANAGE_STAFF'
  | 'CONFIGURE_CENTER'
  | 'MANAGE_FACILITIES'

export interface MedicalCenterDoctor {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  licenseNumber: string
  experience: number
  rating: number
  avatar?: string
  consultationFee: number
  isAvailable: boolean
  medicalCenterId: string
  departmentId: string
  schedule: DoctorSchedule
  biography?: string
  education: string[]
  certifications: string[]
  languages: string[]
  consultationTypes: ('presencial' | 'virtual')[]
  createdAt: Date
}

export interface DoctorSchedule {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
}

export interface TimeSlot {
  start: string
  end: string
  consultationType?: 'presencial' | 'virtual' | 'both'
}

export interface MedicalCenterAppointment {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  doctorId: string
  doctorName: string
  doctorSpecialty: string
  medicalCenterId: string
  departmentId: string
  type: 'presencial' | 'virtual'
  date: Date
  time: string
  duration: number
  status: 'programada' | 'confirmada' | 'en-progreso' | 'completada' | 'cancelada' | 'no-asistio'
  reason: string
  notes?: string
  room?: string
  virtualLink?: string
  checkInTime?: Date
  checkOutTime?: Date
  waitingRoom?: boolean
  priority: 'normal' | 'urgente'
  cost: number
  paymentStatus: 'pending' | 'completed' | 'refunded'
  insuranceCovered: boolean
  followUpRequired: boolean
  prescription?: MedicalCenterPrescription[]
  diagnosis?: string
  treatment?: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalCenterPrescription {
  id: string
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  isDigital: boolean
  dispensedAt?: Date
  pharmacyId?: string
}

export interface MedicalCenterPatient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  bloodType: string
  avatar?: string
  medicalCenterId: string
  patientNumber: string
  address: PatientAddress
  emergencyContact: EmergencyContact
  allergies: string[]
  chronicConditions: string[]
  currentMedications: string[]
  insuranceInfo?: InsuranceInfo
  lastVisit?: Date
  totalVisits: number
  registrationDate: Date
  isActive: boolean
}

export interface PatientAddress {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
  email?: string
}

export interface InsuranceInfo {
  provider: string
  policyNumber: string
  groupNumber?: string
  validUntil?: Date
}

export interface MedicalCenterDepartment {
  id: string
  name: string
  description: string
  icon: string
  medicalCenterId: string
  headOfDepartment?: string
  doctors: string[]
  services: string[]
  operatingHours: {
    [key: string]: {
      start: string
      end: string
      isOpen: boolean
    }
  }
  facilities: string[]
  isActive: boolean
  createdAt: Date
}

export interface MedicalCenterFacility {
  id: string
  name: string
  type: 'consultation_room' | 'procedure_room' | 'waiting_area' | 'emergency_room' | 'surgery_room' | 'laboratory' | 'pharmacy'
  floor: number
  capacity: number
  equipment: string[]
  medicalCenterId: string
  departmentId?: string
  isAvailable: boolean
  currentOccupancy: number
  nextAvailable?: Date
  maintenanceSchedule?: Date[]
  createdAt: Date
}

export interface MedicalCenterStats {
  totalPatients: number
  todayAppointments: number
  completedAppointments: number
  totalRevenue: number
  averageWaitTime: number
  patientSatisfaction: number
  topDepartments: {
    name: string
    appointments: number
    revenue: number
  }[]
  recentActivity: MedicalCenterActivity[]
}

export interface MedicalCenterActivity {
  id: string
  type: 'appointment_scheduled' | 'appointment_completed' | 'patient_registered' | 'doctor_added' | 'emergency_case'
  description: string
  timestamp: Date
  userId?: string
  patientId?: string
  doctorId?: string
  appointmentId?: string
}

export interface MedicalCenterConfig {
  id: string
  medicalCenterId: string
  centerName: string
  description: string
  address: PatientAddress
  contactInfo: {
    email: string
    phone: string
    website?: string
    emergencyContact: string
  }
  operatingHours: {
    [key: string]: {
      start: string
      end: string
      isOpen: boolean
      emergencyHours: boolean
    }
  }
  appointmentSettings: {
    allowOnlineBooking: boolean
    advanceBookingDays: number
    cancellationPolicy: number // hours before
    noShowPolicy: boolean
    reminderSettings: {
      email: boolean
      sms: boolean
      hoursBeforeAppointment: number[]
    }
  }
  consultationSettings: {
    virtualConsultationEnabled: boolean
    inPersonConsultationEnabled: boolean
    maxConcurrentVirtual: number
    defaultConsultationDuration: number
    consultationTypes: string[]
  }
  facilitySettings: {
    totalRooms: number
    emergencyRooms: number
    waitingAreas: number
    parkingSpaces: number
    wheelchairAccessible: boolean
  }
  paymentSettings: {
    acceptedMethods: ('cash' | 'card' | 'transfer' | 'insurance')[]
    insuranceProviders: string[]
    depositRequired: boolean
    depositAmount?: number
  }
  notificationSettings: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    appointmentReminders: boolean
    emergencyAlerts: boolean
    patientUpdates: boolean
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MedicalCenterReport {
  id: string
  medicalCenterId: string
  type: 'appointments' | 'financial' | 'patient_satisfaction' | 'doctor_performance' | 'facility_utilization'
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  endDate: Date
  data: any
  generatedAt: Date
  generatedBy: string
}

export interface WaitingRoom {
  id: string
  name: string
  medicalCenterId: string
  departmentId: string
  capacity: number
  currentOccupancy: number
  estimatedWaitTime: number
  patients: WaitingPatient[]
  isActive: boolean
}

export interface WaitingPatient {
  patientId: string
  appointmentId: string
  checkInTime: Date
  estimatedCallTime: Date
  priority: 'normal' | 'urgente'
  status: 'waiting' | 'called' | 'in_consultation'
} 