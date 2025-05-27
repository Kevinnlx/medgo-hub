'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useConsultations } from '@/hooks/useConsultations'
import { formatDate, formatTime } from '@/lib/utils'
import NewConsultationModal from '@/components/modals/NewConsultationModal'
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  User, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Phone,
  MessageSquare
} from 'lucide-react'

const ConsultationDashboard: React.FC = () => {
  const {
    consultations,
    loading,
    error,
    updateConsultation,
    createConsultation,
    getConsultationsByStatus,
    getConsultationsByType,
    getTodaysConsultations
  } = useConsultations()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isNewConsultationModalOpen, setIsNewConsultationModalOpen] = useState(false)

  const handleStatusUpdate = async (consultationId: string, newStatus: any) => {
    try {
      await updateConsultation(consultationId, { status: newStatus })
    } catch (err) {
      console.error('Error updating consultation status:', err)
    }
  }

  const handleCreateConsultation = async (consultationData: any) => {
    try {
      await createConsultation(consultationData)
    } catch (err) {
      console.error('Error creating consultation:', err)
    }
  }

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.reason.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter
    const matchesType = typeFilter === 'all' || consultation.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const todaysConsultations = getTodaysConsultations()
  const scheduledCount = getConsultationsByStatus('programada').length
  const inProgressCount = getConsultationsByStatus('en-progreso').length
  const completedCount = getConsultationsByStatus('completada').length

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'programada': return 'scheduled'
      case 'en-progreso': return 'in-progress'
      case 'completada': return 'completed'
      case 'cancelada': return 'cancelled'
      default: return 'default'
    }
  }

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual': return Video
      case 'presencial': return MapPin
      case 'telefonica': return Phone
      default: return Calendar
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Consultas</h1>
          <p className="text-gray-600">Administra consultas presenciales y virtuales</p>
        </div>
        <Button 
          onClick={() => setIsNewConsultationModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700"
        >
          <Plus className="h-5 w-5" />
          Nueva Consulta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Consultas de Hoy</p>
                <p className="text-2xl font-bold text-blue-600">{todaysConsultations.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Programadas</p>
                <p className="text-2xl font-bold text-orange-600">{scheduledCount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Progreso</p>
                <p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p>
              </div>
              <Video className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar consultas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Estados</SelectItem>
                  <SelectItem value="programada">Programadas</SelectItem>
                  <SelectItem value="en-progreso">En Progreso</SelectItem>
                  <SelectItem value="completada">Completadas</SelectItem>
                  <SelectItem value="cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Tipos</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="telefonica">Telefónica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultations List */}
      <div className="grid gap-4">
        {filteredConsultations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay consultas</h3>
              <p className="text-gray-500 mb-4">No se encontraron consultas que coincidan con los filtros aplicados.</p>
              <Button 
                onClick={() => setIsNewConsultationModalOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Consulta
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredConsultations.map((consultation) => {
            const TypeIcon = getConsultationTypeIcon(consultation.type)
            return (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <TypeIcon className="h-8 w-8 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {consultation.patientName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Dr. {consultation.doctorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {consultation.reason}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(consultation.date)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTime(consultation.date)}
                        </p>
                      </div>
                      
                      <Badge variant={getStatusBadgeVariant(consultation.status)}>
                        {consultation.status}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {consultation.status === 'programada' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusUpdate(consultation.id, 'en-progreso')}
                            className="text-green-600 hover:text-green-700"
                          >
                            Iniciar
                          </Button>
                        )}
                        {consultation.status === 'en-progreso' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusUpdate(consultation.id, 'completada')}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Completar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* New Consultation Modal */}
      <NewConsultationModal
        isOpen={isNewConsultationModalOpen}
        onClose={() => setIsNewConsultationModalOpen(false)}
        onSubmit={handleCreateConsultation}
      />
    </div>
  )
}

export default ConsultationDashboard 