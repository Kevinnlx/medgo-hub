import { 
  Doctor, 
  Patient, 
  Appointment, 
  Department, 
  Notification,
  Medication,
  PharmacyOrder,
  EmergencyRequest,
  HomecareService,
  HomecareBooking,
  LabTest,
  LabOrder,
  LabTechnician,
  ProviderConfig,
  ServiceRating,
  DeliveryTracking,
  Location,
  Consultation,
  MedicalRecord,
  SharedRecord,
  User,
  ProviderType,
  UserRole
} from '@/types'

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Cardiología',
    description: 'Especialistas en enfermedades del corazón',
    icon: 'Heart',
    doctorCount: 8
  },
  {
    id: '2',
    name: 'Pediatría',
    description: 'Atención médica para niños y adolescentes',
    icon: 'Baby',
    doctorCount: 12
  },
  {
    id: '3',
    name: 'Neurología',
    description: 'Especialistas en sistema nervioso',
    icon: 'Brain',
    doctorCount: 6
  },
  {
    id: '4',
    name: 'Traumatología',
    description: 'Atención de lesiones y fracturas',
    icon: 'Bone',
    doctorCount: 10
  },
  {
    id: '5',
    name: 'Dermatología',
    description: 'Cuidado de la piel y enfermedades cutáneas',
    icon: 'Skin',
    doctorCount: 5
  },
  {
    id: '6',
    name: 'Ginecología',
    description: 'Salud femenina y reproductiva',
    icon: 'UserCheck',
    doctorCount: 7
  }
]

export const mockUsers: User[] = [
  {
    id: 'user-platform-1',
    name: 'Admin Platform',
    email: 'admin@medigo.com',
    role: 'PLATFORM' as UserRole,
    permissions: ['all'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-provider-1',
    name: 'Centro Médico San Rafael',
    email: 'admin@sanrafael.com',
    role: 'PROVIDER' as UserRole,
    providerType: 'MEDICAL_CENTER' as ProviderType,
    permissions: ['manage_consultations', 'manage_staff', 'view_reports'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-provider-2',
    name: 'Farmacia Central',
    email: 'admin@farmaciacentral.com',
    role: 'PROVIDER' as UserRole,
    providerType: 'PHARMACY' as ProviderType,
    permissions: ['manage_inventory', 'process_orders', 'manage_prescriptions'],
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-client-1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    role: 'CLIENT' as UserRole,
    permissions: ['book_services', 'view_records', 'rate_services'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
]

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. María González',
    specialty: 'Cardiología',
    email: 'maria.gonzalez@hospital.com',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.8,
    experience: 15,
    consultationFee: 100,
    availableFrom: '09:00',
    availableTo: '17:00',
    isOnline: true
  },
  {
    id: 'doc-2',
    name: 'Dr. Carlos Rodríguez',
    specialty: 'Neurología',
    email: 'carlos.rodriguez@hospital.com',
    phone: '+1234567891',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.9,
    experience: 12,
    consultationFee: 120,
    availableFrom: '08:00',
    availableTo: '16:00',
    isOnline: false
  },
  {
    id: 'doc-3',
    name: 'Dr. Ana Martínez',
    specialty: 'Pediatría',
    email: 'ana.martinez@hospital.com',
    phone: '+1234567892',
    avatar: 'https://images.unsplash.com/photo-1594824475317-29b82d9e8f02?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.7,
    experience: 8,
    consultationFee: 80,
    availableFrom: '10:00',
    availableTo: '18:00',
    isOnline: true
  }
]

export const mockPatients: Patient[] = [
  {
    id: 'pat-1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+1234567893',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    dateOfBirth: new Date('1985-05-15'),
    gender: 'male',
    bloodType: 'O+',
    allergies: ['Penicilina'],
    chronicConditions: ['Hipertensión']
  },
  {
    id: 'pat-2',
    name: 'María López',
    email: 'maria.lopez@email.com',
    phone: '+1234567894',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    dateOfBirth: new Date('1990-08-22'),
    gender: 'female',
    bloodType: 'A+',
    allergies: [],
    chronicConditions: []
  }
]

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: new Date('2024-12-25'),
    time: '10:00',
    type: 'consultation',
    status: 'scheduled',
    reason: 'Revisión cardiológica rutinaria',
    notes: 'Paciente con antecedentes de hipertensión'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: new Date('2024-12-26'),
    time: '11:30',
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Control pediátrico',
    notes: 'Seguimiento de vacunación'
  },
  {
    id: '3',
    patientId: '1',
    doctorId: '3',
    date: new Date('2024-12-24'),
    time: '15:00',
    type: 'consultation',
    status: 'completed',
    reason: 'Dolor de cabeza persistente'
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Cita Programada',
    message: 'Tu cita con la Dra. María González está confirmada para mañana a las 10:00',
    type: 'appointment',
    isRead: false,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Recordatorio de Medicación',
    message: 'Es hora de tomar tu medicación prescrita',
    type: 'prescription',
    isRead: false,
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Resultados Disponibles',
    message: 'Los resultados de tu análisis de sangre están listos',
    type: 'alert',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000)
  }
]

// ===============================
// PHARMACY MOCK DATA
// ===============================

export const mockMedications: Medication[] = [
  {
    id: 'med-1',
    name: 'Paracetamol',
    brand: 'Tylenol',
    category: 'Analgésicos',
    description: 'Analgésico y antipirético',
    activeIngredient: 'Paracetamol',
    concentration: '500mg',
    form: 'tablet',
    price: 15.50,
    stock: 100,
    minStock: 10,
    maxStock: 200,
    requiresPrescription: false,
    batchNumber: 'BTH001',
    manufacturingDate: new Date('2023-06-01'),
    expiryDate: new Date('2026-06-01'),
    manufacturer: 'Johnson & Johnson',
    location: 'Estante A1'
  },
  {
    id: 'med-2',
    name: 'Amoxicilina',
    brand: 'Amoxil',
    category: 'Antibióticos',
    description: 'Antibiótico de amplio espectro',
    activeIngredient: 'Amoxicilina',
    concentration: '500mg',
    form: 'capsule',
    price: 45.00,
    stock: 75,
    minStock: 15,
    maxStock: 150,
    requiresPrescription: true,
    batchNumber: 'BTH002',
    manufacturingDate: new Date('2023-08-01'),
    expiryDate: new Date('2025-08-01'),
    manufacturer: 'Pfizer',
    location: 'Estante B2'
  }
]

export const mockPharmacyOrders: PharmacyOrder[] = [
  {
    id: 'ORDER-001',
    clientId: 'client_001',
    pharmacyId: 'pharmacy_001',
    items: [
      {
        medicationId: 'MED-001',
        medicationName: 'Amoxicilina 500mg',
        quantity: 21,
        price: 12.50,
        prescriptionId: 'PRESC-001',
        instructions: 'Tomar 1 cápsula cada 8 horas durante 7 días'
      }
    ],
    subtotal: 12.50,
    deliveryFee: 5.00,
    total: 17.50,
    status: 'verified',
    paymentStatus: 'completed',
    deliveryAddress: {
      street: 'Calle Principal 123',
      city: 'Madrid',
      state: 'Madrid',
      postalCode: '28001',
      country: 'España',
      landmark: 'Cerca del parque central'
    },
    estimatedDelivery: new Date('2024-12-26'),
    trackingNumber: 'TRK-001',
    courierId: 'courier_001',
    verificationNotes: 'Prescripción verificada correctamente',
    createdAt: new Date('2024-12-25'),
    updatedAt: new Date('2024-12-25')
  }
]

// ===============================
// EMERGENCY MOCK DATA
// ===============================

export const mockLocation: Location = {
  latitude: 40.4168,
  longitude: -3.7038,
  address: 'Calle de la Princesa 31',
  city: 'Madrid',
  postalCode: '28008',
  landmark: 'Cerca del Hospital Clínico'
}

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: 'emer-1',
    clientId: 'pat-1',
    providerId: 'emer-prov-1',
    paramedicId: 'para-1',
    location: mockLocation,
    destination: {
      latitude: 40.4378,
      longitude: -3.6844,
      address: 'Hospital General Universitario Gregorio Marañón',
      city: 'Madrid',
      postalCode: '28007'
    },
    status: 'en_route',
    urgencyLevel: 'high',
    symptoms: 'Dolor en el pecho y dificultad para respirar',
    notes: 'Paciente consciente, signos vitales estables',
    estimatedCost: 120.00,
    distance: 8.5,
    estimatedArrival: new Date(Date.now() + 900000), // 15 minutes from now
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// ===============================
// HOMECARE MOCK DATA
// ===============================

export const mockHomecareServices: HomecareService[] = [
  {
    id: 'HCS-001',
    name: 'Enfermería a Domicilio',
    description: 'Servicios de enfermería especializada en el hogar',
    category: 'Enfermería',
    duration: 60,
    price: 45.00,
    requiresSpecialization: true,
    equipment: ['Kit de signos vitales', 'Material de curación'],
    providerId: 'homecare_provider_001'
  },
  {
    id: 'HCS-002',
    name: 'Fisioterapia',
    description: 'Sesiones de fisioterapia y rehabilitación',
    category: 'Rehabilitación',
    duration: 90,
    price: 65.00,
    requiresSpecialization: true,
    equipment: ['Mesa de fisioterapia portátil', 'Electroestimulador'],
    providerId: 'homecare_provider_001'
  }
]

export const mockHomecareBookings: HomecareBooking[] = [
  {
    id: 'home-1',
    clientId: 'pat-1',
    providerId: 'home-prov-1',
    caregiverId: 'care-1',
    serviceId: 'service-1',
    serviceName: 'Enfermería a Domicilio',
    location: mockLocation,
    scheduledDate: new Date('2024-01-20'),
    scheduledTime: '09:00',
    duration: 60,
    status: 'scheduled',
    specialInstructions: 'Tomar signos vitales y administrar medicación',
    price: 80.00,
    paymentStatus: 'pending',
    recurringPattern: 'weekly',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// ===============================
// LABORATORY MOCK DATA
// ===============================

export const mockLabTests: LabTest[] = [
  {
    id: 'test-1',
    name: 'Hemograma Completo',
    description: 'Análisis completo de sangre',
    category: 'Hematología',
    sampleType: 'blood',
    requirements: ['Ayuno 8-12 horas'],
    preparationInstructions: ['No comer 8 horas antes', 'Beber solo agua'],
    turnaroundTime: 24,
    price: 50.00,
    requiresFasting: true,
    homeCollection: true,
    equipment: ['Tubos de sangre', 'Agujas', 'Torniquete'],
    providerId: 'lab-1'
  },
  {
    id: 'test-2',
    name: 'Perfil Lipídico',
    description: 'Análisis de colesterol y triglicéridos',
    category: 'Bioquímica',
    sampleType: 'blood',
    requirements: ['Ayuno 12 horas'],
    preparationInstructions: ['No comer 12 horas antes', 'Evitar alcohol 24h antes'],
    turnaroundTime: 24,
    price: 40.00,
    requiresFasting: true,
    homeCollection: true,
    equipment: ['Tubos de sangre'],
    providerId: 'lab-1'
  }
]

export const mockLabOrders: LabOrder[] = [
  {
    id: 'order-1',
    clientId: 'pat-1',
    providerId: 'lab-1',
    technicianId: 'tech-1',
    tests: [
      {
        testId: 'test-1',
        testName: 'Hemograma Completo',
        sampleType: 'blood',
        price: 50.00
      }
    ],
    doctorId: 'doc-1',
    doctorName: 'Dr. María González',
    collectionType: 'home',
    collectionLocation: mockLocation,
    scheduledDate: new Date('2024-01-18'),
    scheduledTime: '08:00',
    status: 'scheduled',
    totalCost: 50.00,
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'LO-002',
    clientId: 'client_002',
    providerId: 'lab_provider_001',
    technicianId: 'technician_002',
    tests: [
      {
        testId: 'LAB-002',
        testName: 'Perfil Lipídico',
        sampleType: 'blood',
        price: 30.00
      },
      {
        testId: 'LAB-001',
        testName: 'Hemograma Completo',
        sampleType: 'blood',
        price: 25.00
      }
    ],
    doctorId: 'doctor_002',
    doctorName: 'Dr. Carlos Rodríguez',
    prescription: 'Evaluación de riesgo cardiovascular',
    collectionType: 'facility',
    scheduledDate: new Date('2024-12-27'),
    scheduledTime: '08:00',
    status: 'completed',
    sampleCollected: new Date('2024-12-27T08:15:00'),
    resultsAvailable: new Date('2024-12-28T14:00:00'),
    totalCost: 55.00,
    paymentStatus: 'completed',
    results: [
      {
        testId: 'LAB-002',
        testName: 'Perfil Lipídico',
        value: '180',
        unit: 'mg/dl',
        referenceRange: '<200',
        status: 'normal',
        notes: 'Dentro de los parámetros normales',
        validatedBy: 'Dr. Lab Tech',
        validatedAt: new Date('2024-12-28T14:00:00')
      },
      {
        testId: 'LAB-001',
        testName: 'Hemograma Completo',
        value: '4.5',
        unit: 'x10^6/μL',
        referenceRange: '4.5-5.5',
        status: 'normal',
        validatedBy: 'Dr. Lab Tech',
        validatedAt: new Date('2024-12-28T14:00:00')
      }
    ],
    createdAt: new Date('2024-12-26'),
    updatedAt: new Date('2024-12-28')
  },
  {
    id: 'LO-003',
    clientId: 'client_003',
    providerId: 'lab_provider_002',
    tests: [
      {
        testId: 'LAB-001',
        testName: 'Hemograma Completo',
        sampleType: 'blood',
        price: 25.00
      }
    ],
    doctorId: 'doctor_003',
    doctorName: 'Dra. Ana Martínez',
    collectionType: 'home',
    collectionLocation: {
      latitude: 40.4200,
      longitude: -3.7100,
      address: 'Calle de Alcalá 150',
      city: 'Madrid',
      postalCode: '28009'
    },
    scheduledDate: new Date('2024-12-28'),
    scheduledTime: '10:30',
    status: 'collected',
    sampleCollected: new Date('2024-12-28T10:45:00'),
    totalCost: 30.00,
    paymentStatus: 'pending',
    specialInstructions: 'Llamar antes de llegar',
    createdAt: new Date('2024-12-27'),
    updatedAt: new Date('2024-12-28')
  },
  {
    id: 'LO-004',
    clientId: 'client_004',
    providerId: 'lab_provider_001',
    tests: [
      {
        testId: 'LAB-002',
        testName: 'Perfil Lipídico',
        sampleType: 'blood',
        price: 30.00
      }
    ],
    doctorName: 'Dr. Emergency',
    collectionType: 'facility',
    scheduledDate: new Date('2024-12-29'),
    scheduledTime: '07:00',
    status: 'processing',
    sampleCollected: new Date('2024-12-29T07:30:00'),
    totalCost: 30.00,
    paymentStatus: 'completed',
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2024-12-29')
  },
  {
    id: 'LO-005',
    clientId: 'client_005',
    providerId: 'lab_provider_002',
    tests: [
      {
        testId: 'LAB-001',
        testName: 'Hemograma Completo',
        sampleType: 'blood',
        price: 25.00
      }
    ],
    collectionType: 'home',
    scheduledDate: new Date('2024-12-30'),
    scheduledTime: '11:00',
    status: 'ordered',
    totalCost: 30.00,
    paymentStatus: 'pending',
    createdAt: new Date('2024-12-29'),
    updatedAt: new Date('2024-12-29')
  }
]

// ===============================
// LAB TECHNICIANS MOCK DATA
// ===============================

export const mockLabTechnicians: LabTechnician[] = [
  {
    id: 'tech-1',
    name: 'Carlos Méndez',
    email: 'carlos.mendez@lab.com',
    phone: '+34 666 111 222',
    specializations: ['Hematología', 'Bioquímica'],
    experience: 5,
    rating: 4.8,
    isAvailable: true,
    currentLocation: {
      latitude: 40.4165,
      longitude: -3.7026,
      address: 'Calle Gran Vía 30',
      city: 'Madrid',
      postalCode: '28013'
    },
    workingHours: {
      start: '07:00',
      end: '15:00'
    },
    assignedOrders: ['order-1', 'LO-002']
  },
  {
    id: 'tech-2',
    name: 'Laura Fernández',
    email: 'laura.fernandez@lab.com',
    phone: '+34 666 333 444',
    specializations: ['Microbiología', 'Inmunología'],
    experience: 8,
    rating: 4.9,
    isAvailable: false,
    currentLocation: {
      latitude: 40.4200,
      longitude: -3.7100,
      address: 'Calle de Alcalá 150',
      city: 'Madrid',
      postalCode: '28009'
    },
    workingHours: {
      start: '09:00',
      end: '17:00'
    },
    assignedOrders: ['LO-003']
  },
  {
    id: 'tech-3',
    name: 'Miguel Ruiz',
    email: 'miguel.ruiz@lab.com',
    phone: '+34 666 555 777',
    specializations: ['Bioquímica', 'Endocrinología'],
    experience: 3,
    rating: 4.6,
    isAvailable: true,
    workingHours: {
      start: '06:00',
      end: '14:00'
    },
    assignedOrders: ['LO-004', 'LO-005']
  }
]

// ===============================
// SERVICE RATINGS MOCK DATA
// ===============================

export const mockServiceRatings: ServiceRating[] = [
  {
    id: 'rating-1',
    clientId: 'pat-1',
    serviceId: 'cons-2',
    serviceType: 'consultation',
    providerId: 'user-provider-1',
    operatorId: 'doc-2',
    overallRating: 5,
    serviceQuality: 5,
    timeliness: 4,
    communication: 5,
    professionalism: 5,
    comment: 'Excelente atención, muy profesional y puntual',
    wouldRecommend: true,
    createdAt: new Date('2024-01-16')
  },
  {
    id: 'RATING-002',
    clientId: 'client_002',
    serviceId: 'pharmacy_order_001',
    serviceType: 'pharmacy',
    providerId: 'pharmacy_001',
    operatorId: 'courier_001',
    overallRating: 4,
    serviceQuality: 4,
    timeliness: 3,
    communication: 4,
    professionalism: 4,
    comment: 'Buen servicio, aunque llegó un poco tarde',
    wouldRecommend: true,
    createdAt: new Date('2024-12-24')
  }
]

// ===============================
// DELIVERY TRACKING MOCK DATA
// ===============================

export const mockDeliveryTracking: DeliveryTracking[] = [
  {
    id: 'TRK-001',
    orderId: 'ORDER-001',
    courierId: 'courier_001',
    status: 'in_transit',
    currentLocation: {
      latitude: 40.4200,
      longitude: -3.7000,
      address: 'Calle Gran Vía 45',
      city: 'Madrid',
      postalCode: '28013'
    },
    estimatedDelivery: new Date('2024-12-26T14:30:00'),
    trackingEvents: [
      {
        timestamp: new Date('2024-12-25T10:00:00'),
        status: 'assigned',
        description: 'Pedido asignado al repartidor'
      },
      {
        timestamp: new Date('2024-12-25T10:30:00'),
        status: 'picked_up',
        location: {
          latitude: 40.4100,
          longitude: -3.6900,
          address: 'Farmacia Central',
          city: 'Madrid',
          postalCode: '28010'
        },
        description: 'Pedido recogido en farmacia'
      },
      {
        timestamp: new Date('2024-12-25T11:00:00'),
        status: 'in_transit',
        location: {
          latitude: 40.4200,
          longitude: -3.7000,
          address: 'Calle Gran Vía 45',
          city: 'Madrid',
          postalCode: '28013'
        },
        description: 'En camino hacia destino'
      }
    ]
  }
]

// ===============================
// PROVIDER CONFIGURATION MOCK DATA
// ===============================

export const mockProviderConfigs: ProviderConfig[] = [
  {
    id: 'config-1',
    providerId: 'user-provider-1',
    providerType: 'MEDICAL_CENTER',
    businessName: 'Centro Médico San Rafael',
    description: 'Centro médico especializado en cardiología y medicina general',
    serviceArea: [
      {
        latitude: 40.7128,
        longitude: -74.0060,
        address: 'Manhattan, NY',
        city: 'New York',
        postalCode: '10001'
      }
    ],
    operatingHours: {
      monday: [{ start: '08:00', end: '18:00', serviceTypes: ['consultation'] }],
      tuesday: [{ start: '08:00', end: '18:00', serviceTypes: ['consultation'] }],
      wednesday: [{ start: '08:00', end: '18:00', serviceTypes: ['consultation'] }],
      thursday: [{ start: '08:00', end: '18:00', serviceTypes: ['consultation'] }],
      friday: [{ start: '08:00', end: '18:00', serviceTypes: ['consultation'] }],
      saturday: [{ start: '09:00', end: '14:00', serviceTypes: ['consultation'] }],
      sunday: [],
      holidays: false,
      emergencyHours: false
    },
    contactInfo: {
      email: 'admin@sanrafael.com',
      phone: '+1234567890',
      website: 'www.sanrafael.com',
      address: {
        street: '123 Medical Center Dr',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA'
      }
    },
    specializations: ['Cardiología', 'Medicina General', 'Pediatría'],
    facilities: [
      {
        id: 'facility-1',
        name: 'Consultorio 1',
        type: 'consultation_room',
        capacity: 1,
        equipment: ['Electrocardiografo', 'Tensiómetro', 'Estetoscopio'],
        isActive: true
      }
    ],
    pricing: {
      type: 'fixed',
      baseFee: 100,
      additionalFees: [],
      insuranceAccepted: ['Seguro Nacional', 'Seguro Privado']
    },
    settings: {
      autoAcceptBookings: false,
      maxConcurrentServices: 5,
      cancellationPolicy: {
        allowCancellation: true,
        timeLimit: 24,
        refundPercentage: 100,
        reschedulePolicy: true
      },
      notificationPreferences: {
        email: true,
        sms: true,
        push: true,
        newBookings: true,
        cancellations: true,
        emergencies: true,
        reports: true
      },
      qualityAssurance: {
        requireRatings: true,
        minRatingThreshold: 4.0,
        autoSuspendLowRated: false,
        qualityChecks: true
      },
      integration: {
        medicalRecords: true,
        externalSystems: [],
        apiAccess: true,
        dataSharing: true
      }
    },
    staff: [
      {
        id: 'staff-1',
        userId: 'user-staff-1',
        name: 'Ana García',
        role: 'SUPPORT',
        permissions: ['manage_appointments', 'view_patients'],
        departments: ['Recepción'],
        isActive: true,
        hiredAt: new Date('2023-01-01')
      }
    ],
    operators: [],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date()
  }
]

// Add missing exports and additional mock data
export const mockConsultations: Consultation[] = [
  {
    id: 'cons-1',
    patientName: 'Juan Pérez',
    patientId: 'pat-1',
    doctorName: 'Dr. María González',
    doctorId: 'doc-1',
    type: 'presencial',
    date: new Date('2024-01-15'),
    time: '10:00',
    status: 'programada',
    reason: 'Consulta de seguimiento cardiovascular',
    duration: 30,
    room: 'Consultorio 1'
  },
  {
    id: 'cons-2',
    patientName: 'María López',
    patientId: 'pat-2',
    doctorName: 'Dr. Carlos Rodríguez',
    doctorId: 'doc-2',
    type: 'virtual',
    date: new Date('2024-01-16'),
    time: '14:00',
    status: 'completada',
    reason: 'Dolor de cabeza recurrente',
    duration: 45,
    virtualLink: 'https://meet.medigo.com/cons-2',
    notes: 'Paciente presenta migrañas. Se recomienda seguimiento.'
  },
  {
    id: 'CONS-003',
    patientName: 'Carlos Martín',
    patientId: 'patient_003',
    doctorName: 'Dra. Ana Martínez',
    doctorId: 'doctor_003',
    type: 'presencial',
    date: new Date('2024-12-25'),
    time: '16:00',
    status: 'completada',
    reason: 'Dolor de cabeza persistente',
    duration: 60,
    checkInTime: new Date('2024-12-25T15:55:00'),
    checkOutTime: new Date('2024-12-25T16:45:00'),
    prescription: [
      {
        id: 'PRESC-001',
        medicationName: 'Ibuprofeno',
        dosage: '400mg',
        frequency: 'Cada 8 horas',
        duration: '5 días',
        instructions: 'Tomar con alimentos'
      }
    ]
  }
]

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'record-1',
    patientId: 'pat-1',
    patientName: 'Juan Pérez',
    dateOfBirth: new Date('1985-05-15'),
    bloodType: 'O+',
    doctorId: 'doc-1',
    attendingPhysician: 'Dr. María González',
    date: new Date('2024-01-10'),
    diagnosis: 'Hipertensión arterial controlada',
    symptoms: ['Dolor de cabeza ocasional', 'Fatiga leve'],
    treatment: 'Continuar medicación antihipertensiva',
    followUpRequired: true,
    moduleSource: 'consultation',
    confidentialityLevel: 'medium',
    status: 'active',
    lastUpdate: new Date(),
    totalEntries: 5,
    lastConsultation: new Date('2024-01-10'),
    allergies: ['Penicilina'],
    chronicConditions: ['Hipertensión'],
    currentMedications: ['Losartán 50mg'],
    createdDate: new Date('2023-01-01'),
    emergencyContact: {
      name: 'María Pérez',
      phone: '+1234567895',
      relationship: 'Esposa'
    },
    insuranceInfo: {
      provider: 'Seguro Nacional',
      policyNumber: 'SN123456789'
    }
  },
  {
    id: 'MR-002',
    patientId: 'patient_002',
    patientName: 'Laura García',
    dateOfBirth: new Date('1990-07-22'),
    bloodType: 'A+',
    doctorId: 'doctor_002',
    attendingPhysician: 'Dr. Carlos Rodríguez',
    date: new Date('2024-12-20'),
    diagnosis: 'Desarrollo normal para la edad',
    symptoms: [],
    treatment: 'Seguimiento rutinario de crecimiento',
    followUpRequired: true,
    moduleSource: 'consultation',
    confidentialityLevel: 'low',
    status: 'active',
    lastUpdate: new Date('2024-12-20'),
    totalEntries: 8,
    lastConsultation: new Date('2024-12-15'),
    allergies: [],
    chronicConditions: [],
    currentMedications: ['Vitamina D3 1000 UI'],
    recentLabResults: [
      {
        testName: 'Hemograma completo',
        value: 'Normal',
        date: new Date('2024-12-10'),
        status: 'normal'
      }
    ],
    createdDate: new Date('2024-03-10'),
    emergencyContact: {
      name: 'Roberto García',
      phone: '+34 600 222 444',
      relationship: 'Padre'
    },
    insuranceInfo: {
      provider: 'Adeslas',
      policyNumber: 'ADS-987654321'
    },
    accessLog: [
      {
        id: 'LOG-003',
        userId: 'doctor_002',
        userName: 'Dr. Carlos Rodríguez',
        recordId: 'MR-002',
        action: 'view',
        timestamp: new Date('2024-12-20T09:45:00'),
        ipAddress: '192.168.1.102'
      }
    ]
  },
  {
    id: 'MR-003',
    patientId: 'patient_003',
    patientName: 'Carlos Martín',
    dateOfBirth: new Date('1978-11-08'),
    bloodType: 'B+',
    doctorId: 'doctor_003',
    attendingPhysician: 'Dra. Ana Martínez',
    date: new Date('2024-12-18'),
    diagnosis: 'Cefalea tensional',
    symptoms: ['Dolor de cabeza frontal', 'Tensión cervical'],
    treatment: 'Analgésicos y relajación muscular',
    followUpRequired: false,
    moduleSource: 'emergency',
    confidentialityLevel: 'high',
    status: 'under_review',
    lastUpdate: new Date('2024-12-18'),
    totalEntries: 3,
    allergies: ['Aspirina'],
    chronicConditions: ['Migraña crónica'],
    currentMedications: ['Sumatriptán 50mg PRN'],
    recentLabResults: [],
    createdDate: new Date('2024-12-18'),
    emergencyContact: {
      name: 'Ana Martín',
      phone: '+34 600 333 555',
      relationship: 'Hermana'
    },
    accessLog: [
      {
        id: 'LOG-004',
        userId: 'doctor_003',
        userName: 'Dra. Ana Martínez',
        recordId: 'MR-003',
        action: 'view',
        timestamp: new Date('2024-12-18T20:30:00'),
        ipAddress: '192.168.1.103'
      }
    ]
  },
  {
    id: 'MR-004',
    patientId: 'patient_004',
    patientName: 'Elena López',
    dateOfBirth: new Date('1965-05-30'),
    bloodType: 'AB+',
    doctorId: 'doctor_001',
    attendingPhysician: 'Dra. María González',
    date: new Date('2024-12-22'),
    diagnosis: 'Diabetes mellitus tipo 2 descompensada',
    symptoms: ['Polidipsia', 'Poliuria', 'Fatiga extrema'],
    treatment: 'Ajuste de medicación antidiabética y seguimiento nutricional',
    followUpRequired: true,
    moduleSource: 'laboratory',
    confidentialityLevel: 'high',
    status: 'active',
    lastUpdate: new Date('2024-12-22'),
    totalEntries: 25,
    lastConsultation: new Date('2024-12-22'),
    allergies: ['Sulfonamidas'],
    chronicConditions: ['Diabetes mellitus tipo 2', 'Neuropatía diabética'],
    currentMedications: ['Metformina 1000mg', 'Glipizida 5mg', 'Gabapentina 300mg'],
    recentLabResults: [
      {
        testName: 'Glucosa en ayunas',
        value: '180 mg/dl',
        date: new Date('2024-12-21'),
        status: 'abnormal'
      },
      {
        testName: 'HbA1c',
        value: '9.2%',
        date: new Date('2024-12-20'),
        status: 'critical'
      },
      {
        testName: 'Creatinina',
        value: '1.4 mg/dl',
        date: new Date('2024-12-20'),
        status: 'abnormal'
      }
    ],
    createdDate: new Date('2023-08-15'),
    emergencyContact: {
      name: 'Miguel López',
      phone: '+34 600 444 666',
      relationship: 'Esposo'
    },
    insuranceInfo: {
      provider: 'DKV',
      policyNumber: 'DKV-456789123',
      groupNumber: 'GRP-002'
    },
    accessLog: [
      {
        id: 'LOG-005',
        userId: 'doctor_001',
        userName: 'Dra. María González',
        recordId: 'MR-004',
        action: 'edit',
        timestamp: new Date('2024-12-22T11:20:00'),
        ipAddress: '192.168.1.104'
      },
      {
        id: 'LOG-006',
        userId: 'lab_tech_001',
        userName: 'Técnico de Laboratorio',
        recordId: 'MR-004',
        action: 'view',
        timestamp: new Date('2024-12-21T16:45:00'),
        ipAddress: '192.168.1.105'
      }
    ]
  }
]

export const mockSharedRecords: SharedRecord[] = [
  {
    id: 'sr_001',
    recordId: 'MR-001',
    sharedBy: 'doctor_001',
    sharedWith: 'doctor_002',
    accessLevel: 'read',
    purpose: 'Consulta de segunda opinión',
    expiresAt: new Date('2025-01-30'),
    isActive: true,
    createdAt: new Date('2024-12-20')
  },
  {
    id: 'sr_002',
    recordId: 'MR-002',
    sharedBy: 'doctor_002',
    sharedWith: 'patient_002',
    accessLevel: 'read',
    purpose: 'Acceso del paciente a su historial',
    isActive: true,
    createdAt: new Date('2024-12-15')
  },
  {
    id: 'sr_003',
    recordId: 'MR-004',
    sharedBy: 'doctor_001',
    sharedWith: 'lab_tech_001',
    accessLevel: 'write',
    purpose: 'Actualización de resultados de laboratorio',
    expiresAt: new Date('2025-01-15'),
    isActive: true,
    createdAt: new Date('2024-12-22')
  }
]

// Export aliases for backwards compatibility
export const consultations = mockConsultations
export const medicalRecords = mockMedicalRecords
export const sharedRecords = mockSharedRecords
export const medications = mockMedications
export const pharmacyOrders = mockPharmacyOrders
export const labOrders = mockLabOrders
export const labTests = mockLabTests
export const labTechnicians = mockLabTechnicians
export const homecareServices = mockHomecareServices
export const homecareBookings = mockHomecareBookings
export const emergencyRequests = mockEmergencyRequests 