'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  CheckCircle, XCircle, Clock, AlertCircle, Eye, FileText, 
  Shield, Building2, User, Phone, Mail, Globe, MapPin, 
  Calendar, Search, Filter, Plus, MoreVertical, ExternalLink
} from "lucide-react";
import { ProviderType, VerificationStatus } from "@/types";

interface Provider {
  id: string;
  display_name: string;
  email: string;
  phone_number?: string;
  provider_type: ProviderType;
  organization_name?: string;
  license_number?: string;
  verification_status: VerificationStatus;
  verified_at?: string;
  verified_by?: string;
  created_at: string;
  address?: string;
  website?: string;
  bio?: string;
  is_active: boolean;
}

// Mock data - en producción esto vendría de la API
const mockProviders: Provider[] = [
  {
    id: '4',
    display_name: 'Dr. María González Rodríguez',
    email: 'provider.medical@medgohub.com',
    phone_number: '+52 55 1234 5678',
    provider_type: 'MEDICAL_CENTER',
    organization_name: 'Centro Médico González',
    license_number: 'LIC-MED-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 86400000).toISOString(),
    verified_by: '1',
    created_at: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    address: 'Av. Reforma 123, Ciudad de México',
    website: 'https://centromedicogonzalez.com',
    bio: 'Centro médico especializado en atención integral',
    is_active: true
  },
  {
    id: '5',
    display_name: 'Farmacia Central',
    email: 'provider.pharmacy@medgohub.com',
    phone_number: '+52 55 9876 5432',
    provider_type: 'PHARMACY',
    organization_name: 'Farmacia Central S.A.',
    license_number: 'LIC-PHARM-001',
    verification_status: 'VERIFIED',
    verified_at: new Date(Date.now() - 172800000).toISOString(),
    verified_by: '1',
    created_at: new Date(Date.now() - 1728000000).toISOString(), // 20 days ago
    address: 'Calle Juárez 456, Guadalajara',
    is_active: true
  },
  {
    id: '13',
    display_name: 'Centro Médico Pendiente',
    email: 'provider.pending@medgohub.com',
    phone_number: '+52 55 1111 2222',
    provider_type: 'MEDICAL_CENTER',
    organization_name: 'Centro Médico Pendiente S.A.',
    license_number: 'LIC-PEND-001',
    verification_status: 'PENDING',
    created_at: new Date().toISOString(),
    address: 'Av. Insurgentes 789, Monterrey',
    bio: 'Nuevo centro médico especializado en medicina familiar',
    is_active: false
  },
  {
    id: '14',
    display_name: 'Laboratorio en Revisión',
    email: 'provider.reviewing@medgohub.com',
    provider_type: 'LABORATORY',
    organization_name: 'Laboratorio DiagMed',
    license_number: 'LIC-LAB-002',
    verification_status: 'IN_REVIEW',
    created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    is_active: false
  }
];

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
    action: 'Revisar'
  },
  IN_REVIEW: {
    label: 'En Revisión',
    color: 'bg-blue-100 text-blue-800',
    icon: AlertCircle,
    action: 'Completar'
  },
  VERIFIED: {
    label: 'Verificado',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    action: 'Gestionar'
  },
  REJECTED: {
    label: 'Rechazado',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
    action: 'Revisar'
  }
};

const providerTypeLabels = {
  'MEDICAL_CENTER': 'Centro Médico',
  'PHARMACY': 'Farmacia',
  'LABORATORY': 'Laboratorio',
  'EMERGENCY': 'Emergencias',
  'HOMECARE': 'Atención Domiciliaria',
  'OFFICE_SPECIALIST': 'Especialista',
  'VIRTUAL_SPECIALIST': 'Telemedicina'
};

export default function ProveedoresPage() {
  const { user, canManageProviders } = useAuth();
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<ProviderType | 'ALL'>('ALL');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Verificar permisos
  if (!user || !canManageProviders()) {
    return (
      <DashboardLayout currentPage="/dashboard/proveedores">
        <div className="text-center py-12">
          <Shield className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-700">No tienes permisos para gestionar proveedores.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Filtrar proveedores
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.organization_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.license_number?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || provider.verification_status === statusFilter;
    const matchesType = typeFilter === 'ALL' || provider.provider_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleVerifyProvider = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? {
            ...provider,
            verification_status: 'VERIFIED' as VerificationStatus,
            verified_at: new Date().toISOString(),
            verified_by: user.id,
            is_active: true
          }
        : provider
    ));
  };

  const handleRejectProvider = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? {
            ...provider,
            verification_status: 'REJECTED' as VerificationStatus,
            is_active: false
          }
        : provider
    ));
  };

  const handleSetInReview = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? {
            ...provider,
            verification_status: 'IN_REVIEW' as VerificationStatus
          }
        : provider
    ));
  };

  const getStatusStats = () => {
    return {
      total: providers.length,
      pending: providers.filter(p => p.verification_status === 'PENDING').length,
      inReview: providers.filter(p => p.verification_status === 'IN_REVIEW').length,
      verified: providers.filter(p => p.verification_status === 'VERIFIED').length,
      rejected: providers.filter(p => p.verification_status === 'REJECTED').length
    };
  };

  const stats = getStatusStats();

  return (
    <DashboardLayout currentPage="/dashboard/proveedores">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Proveedores</h1>
            <p className="text-gray-700">Administra y verifica proveedores de servicios médicos</p>
          </div>
          <button className="flex items-center space-x-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuevo Proveedor</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building2 className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">En Revisión</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inReview}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Verificados</p>
                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Rechazados</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar proveedores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as VerificationStatus | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="ALL">Todos los estados</option>
              <option value="PENDING">Pendientes</option>
              <option value="IN_REVIEW">En revisión</option>
              <option value="VERIFIED">Verificados</option>
              <option value="REJECTED">Rechazados</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ProviderType | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="ALL">Todos los tipos</option>
              {Object.entries(providerTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Providers List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Registro
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProviders.map((provider) => {
                  const statusInfo = statusConfig[provider.verification_status];
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-medium">
                              {provider.display_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {provider.display_name}
                            </div>
                            <div className="text-sm text-gray-500">{provider.email}</div>
                            {provider.organization_name && (
                              <div className="text-xs text-gray-500">{provider.organization_name}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {providerTypeLabels[provider.provider_type]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(provider.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProvider(provider);
                              setShowDetails(true);
                            }}
                            className="text-cyan-600 hover:text-cyan-900 p-1"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {provider.verification_status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleSetInReview(provider.id)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Poner en revisión"
                              >
                                <AlertCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleVerifyProvider(provider.id)}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Verificar"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRejectProvider(provider.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Rechazar"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          {provider.verification_status === 'IN_REVIEW' && (
                            <>
                              <button
                                onClick={() => handleVerifyProvider(provider.id)}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Verificar"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRejectProvider(provider.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Rechazar"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron proveedores</h3>
              <p className="text-gray-600">Intenta ajustar los filtros de búsqueda.</p>
            </div>
          )}
        </div>

        {/* Provider Details Modal */}
        {showDetails && selectedProvider && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Detalles del Proveedor</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedProvider.display_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedProvider.email}</p>
                    </div>
                    {selectedProvider.phone_number && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedProvider.phone_number}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tipo</label>
                      <p className="mt-1 text-sm text-gray-900">{providerTypeLabels[selectedProvider.provider_type]}</p>
                    </div>
                    {selectedProvider.organization_name && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Organización</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedProvider.organization_name}</p>
                      </div>
                    )}
                    {selectedProvider.license_number && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Número de Licencia</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedProvider.license_number}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estado</label>
                      <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[selectedProvider.verification_status].color}`}>
                        {statusConfig[selectedProvider.verification_status].label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address & Contact */}
                {(selectedProvider.address || selectedProvider.website) && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contacto y Ubicación</h3>
                    <div className="space-y-3">
                      {selectedProvider.address && (
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Dirección</p>
                            <p className="text-sm text-gray-900">{selectedProvider.address}</p>
                          </div>
                        </div>
                      )}
                      {selectedProvider.website && (
                        <div className="flex items-start space-x-3">
                          <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Sitio Web</p>
                            <a 
                              href={selectedProvider.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center"
                            >
                              {selectedProvider.website}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {selectedProvider.bio && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Descripción</h3>
                    <p className="text-sm text-gray-700">{selectedProvider.bio}</p>
                  </div>
                )}

                {/* Verification Info */}
                {selectedProvider.verified_at && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Verificación</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-sm font-medium text-green-800">Verificado exitosamente</p>
                      </div>
                      <p className="text-sm text-green-700">
                        Verificado el {new Date(selectedProvider.verified_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  {selectedProvider.verification_status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => {
                          handleSetInReview(selectedProvider.id);
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Poner en Revisión
                      </button>
                      <button
                        onClick={() => {
                          handleVerifyProvider(selectedProvider.id);
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Verificar Proveedor
                      </button>
                      <button
                        onClick={() => {
                          handleRejectProvider(selectedProvider.id);
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  
                  {selectedProvider.verification_status === 'IN_REVIEW' && (
                    <>
                      <button
                        onClick={() => {
                          handleVerifyProvider(selectedProvider.id);
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Verificar Proveedor
                      </button>
                      <button
                        onClick={() => {
                          handleRejectProvider(selectedProvider.id);
                          setShowDetails(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 