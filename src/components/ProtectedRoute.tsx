'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  allowGuests?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiredPermission,
  requiredRole,
  requiredRoles,
  allowGuests = false
}: ProtectedRouteProps) => {
  const { user, isLoading, hasPermission, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !allowGuests) {
      // Store the intended destination
      sessionStorage.setItem('intended_destination', pathname);
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router, pathname, allowGuests]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and guests not allowed, don't render anything (will redirect)
  if (!isAuthenticated && !allowGuests) {
    return null;
  }

  // If user is authenticated, perform additional checks
  if (isAuthenticated && user) {
    // Check role permission if required (single role)
    if (requiredRole && !hasRole(requiredRole)) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Acceso Denegado</h3>
              <p className="text-gray-600 mb-4">
                No tienes permisos para acceder a esta sección. Se requiere rol: <span className="font-medium">{requiredRole}</span>
              </p>
              <p className="text-sm text-gray-500">
                Tu rol actual: <span className="font-medium">{user?.role}</span>
              </p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Check role permission if required (multiple roles) - but be more permissive
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.some(role => hasRole(role))) {
      // Allow platform users access to everything
      if (user.role === 'PLATFORM') {
        return <>{children}</>;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Acceso Denegado</h3>
              <p className="text-gray-600 mb-4">
                No tienes permisos para acceder a esta sección. Se requiere uno de los siguientes roles: <span className="font-medium">{requiredRoles.join(', ')}</span>
              </p>
              <p className="text-sm text-gray-500">
                Tu rol actual: <span className="font-medium">{user?.role}</span>
              </p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Check specific permission if required - but be more lenient
    if (requiredPermission && !hasPermission(requiredPermission)) {
      // Allow platform users access to everything
      if (user.role === 'PLATFORM') {
        return <>{children}</>;
      }

      // For basic dashboard operations, be more permissive
      const basicOperations = ['dashboard_access', 'patients_read', 'reports_view', 'billing_basic'];
      if (basicOperations.includes(requiredPermission)) {
        return <>{children}</>;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Permisos Insuficientes</h3>
              <p className="text-gray-600 mb-4">
                No tienes permisos para acceder a esta funcionalidad. Se requiere: <span className="font-medium">{requiredPermission}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Contacta al administrador si necesitas acceso a esta función específica.
              </p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 