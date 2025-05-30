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

// Updated mock users with comprehensive permissions
const mockUsers: AuthUser[] = [
  // PLATFORM Administrator - Full access
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
  
  // STAFF - Platform Finance with appropriate permissions
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
      'reports_view',
      'dashboard_access',
      'patients_read'
    ],
    status: 'active',
    avatar: '/avatars/finance.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // STAFF - Platform Support with broader access
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
      'reports_view',
      'dashboard_access',
      'patients_read',
      'consultations_manage',
      'appointments_manage'
    ],
    status: 'active',
    avatar: '/avatars/support.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Medical Center with comprehensive access
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
    verified_at: new Date(Date.now() - 86400000).toISOString(),
    verified_by: '1',
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
      'reports_view',
      'dashboard_access',
      'patients_read',
      'billing_basic'
    ],
    status: 'active',
    avatar: '/avatars/doctor.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Pharmacy with appropriate permissions
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
    verified_at: new Date(Date.now() - 172800000).toISOString(),
    verified_by: '1',
    permissions: [
      'prescriptions_manage',
      'inventory_manage',
      'deliveries_manage',
      'staff_manage',
      'reports_view',
      'dashboard_access',
      'patients_read',
      'billing_basic'
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
    verified_at: new Date(Date.now() - 259200000).toISOString(),
    verified_by: '1',
    permissions: [
      'samples_collect',
      'medical_records_manage',
      'test_results',
      'staff_manage',
      'reports_view',
      'dashboard_access',
      'patients_read',
      'billing_basic'
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
    verified_at: new Date(Date.now() - 345600000).toISOString(),
    verified_by: '1',
    permissions: [
      'service_delivery',
      'location_tracking',
      'emergency_response',
      'staff_manage',
      'reports_view',
      'dashboard_access',
      'patients_read'
    ],
    status: 'active',
    avatar: '/avatars/emergency.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // PROVIDER - Homecare
  {
    id: '8',
    name: 'Atención Domiciliaria',
    display_name: 'HomeCare Plus',
    organization_name: 'HomeCare Plus S.A.',
    email: 'provider.homecare@medgohub.com',
    role: 'PROVIDER',
    provider_type: 'HOMECARE',
    license_number: 'LIC-HOME-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 432000000).toISOString(),
    verified_by: '1',
    permissions: [
      'service_delivery',
      'appointments_manage',
      'staff_manage',
      'reports_view',
      'dashboard_access',
      'patients_read',
      'medical_records_manage'
    ],
    status: 'active',
    avatar: '/avatars/homecare.jpg',
    is_active: true,
    created_at: new Date().toISOString()
  },
  
  // CLIENT - Regular patient
  {
    id: '9',
    name: 'Juan Paciente',
    display_name: 'Juan Paciente Ejemplo',
    first_name: 'Juan',
    last_names: 'Paciente Ejemplo',
    email: 'paciente@medgohub.com',
    role: 'CLIENT',
    permissions: [
      'appointments_book',
      'medical_records_view',
      'prescriptions_view',
      'billing_view',
      'dashboard_access'
    ],
    status: 'active',
    avatar: '/avatars/patient.jpg',
    is_active: true,
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
    const initializeAuth = () => {
      const storedUserId = localStorage.getItem('currentUserId');
      if (storedUserId) {
        const foundUser = mockUsers.find(u => u.id === storedUserId);
        if (foundUser && foundUser.status === 'active') {
          setUser(foundUser);
        } else {
          localStorage.removeItem('currentUserId');
        }
      }
      setIsLoading(false);
      setIsInitialized(true);
    };

    const timer = setTimeout(initializeAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.status === 'active');
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUserId', foundUser.id);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUserId');
  };

  // Improved permission checking - more permissive for better UX
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Platform users have all permissions
    if (user.role === 'PLATFORM') return true;
    
    // Check for 'all' permission
    if (user.permissions.includes('all')) return true;
    
    // Check for specific permission
    if (user.permissions.includes(permission)) return true;
    
    // Default access for basic dashboard operations
    const basicPermissions = ['dashboard_access', 'patients_read', 'reports_view'];
    if (basicPermissions.includes(permission)) return true;
    
    return false;
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
    if (user.role !== 'PROVIDER') return true; // Non-providers are considered "verified"
    return user.verification_status === 'VERIFIED';
  };

  const canManageProviders = () => {
    if (!user) return false;
    return user.role === 'PLATFORM' || 
           (user.role === 'STAFF' && user.parent_entity_type === 'PLATFORM');
  };

  const canManageStaff = () => {
    if (!user) return false;
    return user.role === 'PLATFORM' || 
           (user.role === 'PROVIDER' && user.verification_status === 'VERIFIED') ||
           (user.role === 'STAFF' && user.parent_entity_type === 'PLATFORM');
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