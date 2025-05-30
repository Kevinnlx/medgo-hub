'use client';

import { useAuth } from '@/contexts/AuthContext';
import PlatformSupportDashboard from '@/components/dashboards/PlatformSupportDashboard';
import { redirect } from 'next/navigation';

export default function SoportePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (user.role !== 'STAFF' || user.staff_type !== 'SUPPORT') {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Soporte al Cliente</h1>
        <p className="text-gray-900 mt-2">
          Gestión de tickets, verificaciones y atención al cliente
        </p>
      </div>
      
      <PlatformSupportDashboard />
    </div>
  );
} 