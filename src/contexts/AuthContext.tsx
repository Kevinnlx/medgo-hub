'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, VerificationStatus } from '@/types';

interface AuthUser extends User {
  permissions: string[];
  status: 'active' | 'inactive' | 'suspended';
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  isPlatformUser: () => boolean;
  isProviderVerified: () => boolean;
  canManageProviders: () => boolean;
  canManageStaff: () => boolean;
  getDisplayName: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Updated mock users with new schema structure
const mockUsers: AuthUser[] = [
  // PLATFORM Administrator
  {
    id: '1',
    name: 'Administrador Sistema',
    display_name: 'Administrador Sistema',
    first_name: 'Administrador',
    last_names: 'Sistema',
    email: 'admin@medgohub.com',
    role: 'PLATFORM',
    permissions: ['all'],
    status: 'active',
    avatar: '/avatars/admin.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // STAFF - Platform Finance
  {
    id: '2',
    name: 'Ana Financiera',
    display_name: 'Ana Financiera López',
    first_name: 'Ana',
    last_names: 'Financiera López',
    email: 'finance@medgohub.com',
    role: 'STAFF',
    staff_type: 'FINANCE',
    parent_entity_type: 'PLATFORM',
    permissions: [
      'billing_manage',
      'financial_reports',
      'provider_payouts',
      'transaction_records',
      'refund_processing',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/finance.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // STAFF - Platform Support
  {
    id: '3',
    name: 'Carlos Soporte',
    display_name: 'Carlos Soporte Mendoza',
    first_name: 'Carlos',
    last_names: 'Soporte Mendoza',
    email: 'support@medgohub.com',
    role: 'STAFF',
    staff_type: 'SUPPORT',
    parent_entity_type: 'PLATFORM',
    permissions: [
      'user_assistance',
      'provider_verification',
      'dispute_resolution',
      'content_management',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/support.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Medical Center
  {
    id: '4', 
    name: 'Dr. María González',
    display_name: 'Dr. María González Rodríguez',
    first_name: 'María',
    last_names: 'González Rodríguez',
    email: 'provider.medical@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'MEDICAL_CENTER',
    organization_name: 'Centro Médico González',
    license_number: 'LIC-MED-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    verified_by: '1', // Verified by platform admin
    permissions: [
      'patients_manage',
      'appointments_manage', 
      'medical_records_manage',
      'prescriptions_manage',
      'consultations_manage',
      'staff_manage',
      'service_delivery',
      'location_tracking',
      'samples_collect',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/doctor.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Pharmacy
  {
    id: '5',
    name: 'Farmacia Central',
    display_name: 'Farmacia Central',
    organization_name: 'Farmacia Central S.A.',
    email: 'provider.pharmacy@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'PHARMACY',
    license_number: 'LIC-PHARM-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    verified_by: '1',
    permissions: [
      'prescriptions_manage',
      'inventory_manage',
      'deliveries_manage',
      'staff_manage',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/pharmacy.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Laboratory
  {
    id: '6',
    name: 'Laboratorio Clínico',
    display_name: 'Laboratorio Clínico Avanzado',
    organization_name: 'Laboratorio Clínico Avanzado',
    email: 'provider.lab@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'LABORATORY',
    license_number: 'LIC-LAB-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    verified_by: '1',
    permissions: [
      'samples_collect',
      'medical_records_manage',
      'test_results',
      'staff_manage',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/lab.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Emergency
  {
    id: '7',
    name: 'Servicios de Emergencia',
    display_name: 'Servicios de Emergencia MedRápido',
    organization_name: 'Servicios de Emergencia MedRápido',
    email: 'provider.emergency@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'EMERGENCY',
    license_number: 'LIC-EMR-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    verified_by: '1',
    permissions: [
      'service_delivery',
      'location_tracking',
      'emergency_response',
      'staff_manage',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/emergency.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Homecare
  {
    id: '8',
    name: 'Atención Domiciliaria Plus',
    display_name: 'Atención Domiciliaria Plus',
    organization_name: 'Atención Domiciliaria Plus S.A.',
    email: 'provider.homecare@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'HOMECARE',
    license_number: 'LIC-HOME-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    verified_by: '1',
    permissions: [
      'service_delivery',
      'appointments_manage',
      'medical_records_manage',
      'staff_manage',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/homecare.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Office Specialist
  {
    id: '9',
    name: 'Dr. Luis Cardiólogo',
    display_name: 'Dr. Luis Hernández Cardiólogo',
    first_name: 'Luis',
    last_names: 'Hernández Cardiólogo',
    email: 'provider.specialist@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'OFFICE_SPECIALIST',
    license_number: 'LIC-SPEC-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    verified_by: '1',
    permissions: [
      'patients_manage',
      'appointments_manage',
      'consultations_manage',
      'medical_records_manage',
      'prescriptions_manage',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/specialist.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Virtual Specialist
  {
    id: '10',
    name: 'Dra. Carmen Telemedicina',
    display_name: 'Dra. Carmen López Telemedicina',
    first_name: 'Carmen',
    last_names: 'López Telemedicina',
    email: 'provider.virtual@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'VIRTUAL_SPECIALIST',
    license_number: 'LIC-VIRT-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    verified_by: '1',
    permissions: [
      'patients_manage',
      'appointments_manage',
      'consultations_manage',
      'medical_records_manage',
      'prescriptions_manage',
      'reports_view'
    ],
    status: 'active',
    avatar: '/avatars/virtual.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // STAFF - Provider Finance (Medical Center)
  {
    id: '11',
    name: 'Elena Finanzas Hospital',
    display_name: 'Elena Rodríguez Finanzas',
    first_name: 'Elena',
    last_names: 'Rodríguez Finanzas',
    email: 'staff.finance.provider@medgohub.com',
    role: 'STAFF',
    staff_type: 'FINANCE',
    parent_entity_type: 'PROVIDER',
    parent_id: '4', // Pertenece al Medical Center
    permissions: [
      'billing_manage',
      'payment_tracking',
      'financial_reporting'
    ],
    status: 'active',
    avatar: '/avatars/staff-finance.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // STAFF - Provider Support (Medical Center)
  {
    id: '12',
    name: 'Roberto Soporte Hospital',
    display_name: 'Roberto Martínez Soporte',
    first_name: 'Roberto',
    last_names: 'Martínez Soporte',
    email: 'staff.support.provider@medgohub.com',
    role: 'STAFF',
    staff_type: 'SUPPORT',
    parent_entity_type: 'PROVIDER',
    parent_id: '4', // Pertenece al Medical Center
    permissions: [
      'appointments_manage',
      'patients_read',
      'patients_manage',
      'consultations_manage',
      'medical_records_manage',
      'service_coordination'
    ],
    status: 'active',
    avatar: '/avatars/staff-support.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Pending Verification
  {
    id: '13',
    name: 'Centro Médico Pendiente',
    display_name: 'Centro Médico Pendiente',
    organization_name: 'Centro Médico Pendiente S.A.',
    email: 'provider.pending@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'MEDICAL_CENTER',
    license_number: 'LIC-PEND-001',
    verification_status: 'PENDING',
    permissions: [],
    status: 'inactive',
    avatar: '/avatars/pending.jpg',
    is_active: false,
    created_at: new Date().toISOString()
  }
];

// Credenciales mock (en producción, esto sería manejado por el backend)
const mockCredentials = [
  { email: 'admin@medgohub.com', password: 'platform123' },
  { email: 'finance@medgohub.com', password: 'finance123' },
  { email: 'support@medgohub.com', password: 'support123' },
  { email: 'provider.medical@medgohub.com', password: 'medical123' },
  { email: 'provider.pharmacy@medgohub.com', password: 'pharmacy123' },
  { email: 'provider.lab@medgohub.com', password: 'lab123' },
  { email: 'provider.emergency@medgohub.com', password: 'emergency123' },
  { email: 'provider.homecare@medgohub.com', password: 'homecare123' },
  { email: 'provider.specialist@medgohub.com', password: 'specialist123' },
  { email: 'provider.virtual@medgohub.com', password: 'virtual123' },
  { email: 'staff.finance.provider@medgohub.com', password: 'stafffinance123' },
  { email: 'staff.support.provider@medgohub.com', password: 'staffsupport123' },
  { email: 'provider.pending@medgohub.com', password: 'pending123' }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión guardada solo en el cliente
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('medigo_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('medigo_user');
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      initializeAuth();
    } else {
      // En el servidor, simplemente marcar como no cargando
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar credenciales
    const credential = mockCredentials.find(cred => 
      cred.email === email && cred.password === password
    );
    
    if (credential) {
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('medigo_user', JSON.stringify(foundUser));
        }
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('medigo_user');
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes('all') || user.permissions.includes(permission);
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  const isPlatformUser = () => {
    if (!user) return false;
    return user.role === 'PLATFORM';
  };

  const isProviderVerified = () => {
    if (!user) return false;
    return user.verification_status === 'VERIFIED';
  };

  const canManageProviders = () => {
    if (!user) return false;
    return user.role === 'PLATFORM' || (user.role === 'STAFF' && user.parent_entity_type === 'PLATFORM');
  };

  const canManageStaff = () => {
    if (!user) return false;
    return user.role === 'PLATFORM' || (user.role === 'PROVIDER' && user.verification_status === 'VERIFIED');
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.display_name || user.name || 
           (user.first_name && user.last_names ? `${user.first_name} ${user.last_names}` : '') ||
           user.organization_name || 'Usuario';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading: isLoading || !isInitialized,
      hasPermission,
      hasRole,
      isPlatformUser,
      isProviderVerified,
      canManageProviders,
      canManageStaff,
      getDisplayName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 