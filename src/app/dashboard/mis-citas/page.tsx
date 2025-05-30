'use client';

import { useState } from 'react'
import { Calendar, Clock, MapPin, User, Phone, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import AuthenticatedHeader from '@/components/AuthenticatedHeader'
import ProtectedRoute from '@/components/ProtectedRoute'

// Mock data for client services
const mockServices = [
  {
    id: '1',
    type: 'consultation',
    title: 'Consulta Médica General',
    provider: 'Dr. María González',
    providerType: 'MEDICAL_CENTER',
    date: new Date('2024-01-15'),
    time: '10:00',
    status: 'scheduled',
    location: 'Centro Médico San Rafael',
    address: 'Av. Principal 123',
    phone: '+1 555-0123',
    notes: 'Consulta de rutina - Chequeo general'
  },
  {
    id: '2', 
    type: 'pharmacy',
    title: 'Entrega de Medicamentos',
    provider: 'Farmacia Central',
    providerType: 'PHARMACY',
    date: new Date('2024-01-16'),
    time: '14:30',
    status: 'confirmed',
    location: 'Domicilio',
    address: 'Calle 45 #12-34',
    phone: '+1 555-0456',
    notes: 'Medicamentos para tratamiento de 15 días'
  },
  {
    id: '3',
    type: 'laboratory',
    title: 'Toma de Muestras',
    provider: 'Laboratorio Clínico',
    providerType: 'LABORATORY', 
    date: new Date('2024-01-18'),
    time: '08:00',
    status: 'in-progress',
    location: 'Domicilio',
    address: 'Calle 45 #12-34',
    phone: '+1 555-0789',
    notes: 'Exámenes de sangre - Ayuno de 12 horas'
  },
  {
    id: '4',
    type: 'homecare',
    title: 'Atención Domiciliaria',
    provider: 'Cuidados en Casa',
    providerType: 'HOMECARE',
    date: new Date('2024-01-20'),
    time: '16:00', 
    status: 'completed',
    location: 'Domicilio',
    address: 'Calle 45 #12-34',
    phone: '+1 555-0321',
    notes: 'Terapia física - Sesión 3 de 10'
  }
]

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'text-blue-600 bg-blue-100'
    case 'confirmed':
      return 'text-green-600 bg-green-100' 
    case 'in-progress':
      return 'text-yellow-600 bg-yellow-100'
    case 'completed':
      return 'text-gray-700 bg-gray-100'
    case 'cancelled':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-700 bg-gray-100'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'Programado'
    case 'confirmed':
      return 'Confirmado'
    case 'in-progress':
      return 'En Progreso'
    case 'completed':
      return 'Completado'
    case 'cancelled':
      return 'Cancelado'
    default:
      return status
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'scheduled':
      return <Clock className="w-4 h-4" />
    case 'confirmed':
      return <CheckCircle className="w-4 h-4" />
    case 'in-progress':
      return <AlertCircle className="w-4 h-4" />
    case 'completed':
      return <CheckCircle className="w-4 h-4" />
    case 'cancelled':
      return <XCircle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

export default function MisServiciosPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredServices = selectedFilter === 'all' 
    ? mockServices 
    : mockServices.filter(service => service.type === selectedFilter)

  return (
    <ProtectedRoute requiredRoles={['CLIENT']}>
      <div className="min-h-screen bg-gray-50">
        <AuthenticatedHeader currentPage="/dashboard/mis-servicios" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mis Servicios</h1>
            <p className="mt-2 text-gray-700">
              Gestiona tus consultas, entregas y servicios programados
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedFilter('consultation')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === 'consultation'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Consultas
              </button>
              <button
                onClick={() => setSelectedFilter('pharmacy')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === 'pharmacy'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Farmacia
              </button>
              <button
                onClick={() => setSelectedFilter('laboratory')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === 'laboratory'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Laboratorio
              </button>
              <button
                onClick={() => setSelectedFilter('homecare')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === 'homecare'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Domiciliaria
              </button>
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                        <span>{getStatusText(service.status)}</span>
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <User className="w-4 h-4" />
                        <span>{service.provider}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(service.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span>{service.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4" />
                        <span>{service.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 mb-4">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <div className="font-medium">{service.location}</div>
                        <div>{service.address}</div>
                      </div>
                    </div>

                    {service.notes && (
                      <div className="flex items-start space-x-2">
                        <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-700">{service.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    {service.status === 'scheduled' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors">
                          Confirmar
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-900 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors">
                          Reprogramar
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors">
                          Cancelar
                        </button>
                      </>
                    )}
                    {service.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Ver Detalles
                      </button>
                    )}
                    {service.status === 'completed' && (
                      <>
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                          Ver Resultado
                        </button>
                        <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 transition-colors">
                          Calificar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes servicios programados</h3>
              <p className="text-gray-700 mb-6">
                Programa tu próxima consulta o servicio de salud
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                Solicitar Servicio
              </button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
} 