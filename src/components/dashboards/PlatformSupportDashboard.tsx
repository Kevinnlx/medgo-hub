'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  MessageSquare,
  UserCheck,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  FileText,
  Eye,
  Edit,
  Star,
  Users,
  Building2,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  MoreHorizontal,
  Send,
  Paperclip,
  Flag,
  Shield,
  Globe,
  TrendingUp
} from 'lucide-react'

interface SupportMetricProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
  urgency?: 'low' | 'medium' | 'high' | 'critical'
}

const SupportMetric: React.FC<SupportMetricProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  description,
  urgency 
}) => {
  const getUrgencyColor = () => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'high': return 'border-orange-500 bg-orange-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-200 bg-white'
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-700'
    }
  }

  return (
    <Card className={`hover:shadow-md transition-shadow ${getUrgencyColor()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-900">{title}</CardTitle>
        <div className="text-teal-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()} mt-1`}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-gray-700 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface SupportTicket {
  id: string
  type: 'technical' | 'provider_verification' | 'dispute' | 'billing' | 'general'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'pending_review' | 'resolved' | 'closed'
  createdBy: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  tags: string[]
  messages: number
}

interface ProviderVerification {
  id: string
  providerName: string
  providerType: string
  submittedAt: string
  documents: string[]
  status: 'pending' | 'in_review' | 'verified' | 'rejected'
  reviewedBy?: string
  notes?: string
  priority: 'normal' | 'urgent'
}

const PlatformSupportDashboard: React.FC = () => {
  const [selectedTicketType, setSelectedTicketType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Datos de soporte simulados
  const supportData = {
    totalTickets: 142,
    openTickets: 23,
    inProgressTickets: 18,
    resolvedToday: 15,
    avgResponseTime: 2.4,
    customerSatisfaction: 4.7,
    pendingVerifications: 12,
    activeDisputes: 3
  }

  // Tickets de soporte
  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-001',
      type: 'provider_verification',
      title: 'Verificación de Centro Médico San Rafael',
      description: 'Documentos enviados para verificación de nuevo proveedor médico',
      priority: 'high',
      status: 'in_progress',
      createdBy: 'Centro Médico San Rafael',
      assignedTo: 'Juan Pérez',
      createdAt: '2024-01-15T09:30:00Z',
      updatedAt: '2024-01-15T10:15:00Z',
      tags: ['verificación', 'médico', 'urgente'],
      messages: 3
    },
    {
      id: 'TKT-002',
      type: 'technical',
      title: 'Error en sistema de pagos',
      description: 'Problemas con el procesamiento de pagos automáticos',
      priority: 'critical',
      status: 'open',
      createdBy: 'Farmacia La Salud',
      createdAt: '2024-01-15T08:45:00Z',
      updatedAt: '2024-01-15T08:45:00Z',
      tags: ['técnico', 'pagos', 'crítico'],
      messages: 1
    },
    {
      id: 'TKT-003',
      type: 'dispute',
      title: 'Disputa por cancelación de servicio',
      description: 'Cliente disputa cargo por cancelación tardía',
      priority: 'medium',
      status: 'pending_review',
      createdBy: 'Juan Martínez (Cliente)',
      assignedTo: 'Ana García',
      createdAt: '2024-01-14T16:20:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      tags: ['disputa', 'cancelación', 'cliente'],
      messages: 7
    },
    {
      id: 'TKT-004',
      type: 'billing',
      title: 'Consulta sobre comisiones',
      description: 'Proveedor consulta sobre cálculo de comisiones',
      priority: 'low',
      status: 'resolved',
      createdBy: 'Laboratorio Central',
      assignedTo: 'María López',
      createdAt: '2024-01-14T14:30:00Z',
      updatedAt: '2024-01-14T17:45:00Z',
      tags: ['facturación', 'comisiones'],
      messages: 4
    },
    {
      id: 'TKT-005',
      type: 'general',
      title: 'Solicitud de información sobre nuevos servicios',
      description: 'Proveedor solicita información sobre ampliar servicios',
      priority: 'medium',
      status: 'in_progress',
      createdBy: 'Atención Domiciliaria 24h',
      assignedTo: 'Carlos Ruiz',
      createdAt: '2024-01-14T11:15:00Z',
      updatedAt: '2024-01-15T08:30:00Z',
      tags: ['información', 'servicios'],
      messages: 2
    }
  ]

  // Verificaciones pendientes
  const pendingVerifications: ProviderVerification[] = [
    {
      id: 'VER-001',
      providerName: 'Clínica Dental Smile',
      providerType: 'OFFICE_SPECIALIST',
      submittedAt: '2024-01-15T10:30:00Z',
      documents: ['Licencia profesional', 'Certificado de especialidad', 'Referencias'],
      status: 'pending',
      priority: 'urgent'
    },
    {
      id: 'VER-002',
      providerName: 'Farmacia Nueva Esperanza',
      providerType: 'PHARMACY',
      submittedAt: '2024-01-14T15:45:00Z',
      documents: ['Permiso sanitario', 'Licencia farmacéutica', 'Certificado de operación'],
      status: 'in_review',
      reviewedBy: 'Ana García',
      priority: 'normal'
    },
    {
      id: 'VER-003',
      providerName: 'Laboratorio Diagnóstico Plus',
      providerType: 'LABORATORY',
      submittedAt: '2024-01-13T09:20:00Z',
      documents: ['Acreditación laboratorio', 'Certificaciones técnicas', 'Seguro responsabilidad'],
      status: 'pending',
      priority: 'normal'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-teal-100 text-teal-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'pending_review': return 'bg-purple-100 text-purple-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_review': return 'bg-teal-100 text-teal-800'
      case 'verified': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Soporte</h1>
          <p className="text-gray-900 mt-1">Gestión de tickets, verificaciones y resolución de disputas</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
          <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Nuevo Ticket
          </Button>
        </div>
      </div>

      {/* Métricas de soporte principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SupportMetric
          title="Tickets Abiertos"
          value={supportData.openTickets}
          change="3 nuevos hoy"
          changeType="neutral"
          icon={<MessageSquare className="h-5 w-5" />}
          description="Requieren atención"
          urgency="medium"
        />
        <SupportMetric
          title="En Progreso"
          value={supportData.inProgressTickets}
          change="+2 vs ayer"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
          description="Siendo atendidos"
        />
        <SupportMetric
          title="Resueltos Hoy"
          value={supportData.resolvedToday}
          change="+25% vs ayer"
          changeType="positive"
          icon={<CheckCircle className="h-5 w-5" />}
          description="Casos cerrados"
        />
        <SupportMetric
          title="Verificaciones Pendientes"
          value={supportData.pendingVerifications}
          change="2 urgentes"
          changeType="neutral"
          icon={<UserCheck className="h-5 w-5" />}
          description="Proveedores esperando"
          urgency="high"
        />
      </div>

      {/* Contenido principal con tabs */}
      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets">Tickets de Soporte</TabsTrigger>
          <TabsTrigger value="verification">Verificaciones</TabsTrigger>
        </TabsList>

        {/* Tab: Tickets */}
        <TabsContent value="tickets" className="space-y-6">
          
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Tickets</CardTitle>
              <CardDescription>
                Gestión y seguimiento de consultas y problemas reportados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search-tickets" className="text-gray-900">Buscar tickets</Label>
                  <Input
                    id="search-tickets"
                    placeholder="ID, título, descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="ticket-type" className="text-gray-900">Tipo</Label>
                  <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="technical">Técnico</SelectItem>
                      <SelectItem value="provider_verification">Verificación</SelectItem>
                      <SelectItem value="dispute">Disputa</SelectItem>
                      <SelectItem value="billing">Facturación</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-gray-900">Prioridad</Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Lista de tickets */}
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex flex-col space-y-1">
                        <Badge className={getPriorityColor(ticket.priority)} variant="secondary">
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {ticket.id}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                          <div className="flex space-x-1">
                            {ticket.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-900 mt-1">{ticket.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-700">
                          <span>Por: {ticket.createdBy}</span>
                          <span>Creado: {formatDate(ticket.createdAt)}</span>
                          {ticket.assignedTo && <span>Asignado a: {ticket.assignedTo}</span>}
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{ticket.messages}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Verificaciones */}
        <TabsContent value="verification" className="space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Verificación de Proveedores</CardTitle>
              <CardDescription>
                Proceso de revisión y aprobación de nuevos proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              
              {/* Estadísticas de verificación */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-yellow-700">Pendientes</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="text-2xl font-bold text-teal-600">7</div>
                  <div className="text-sm text-teal-700">En Revisión</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">23</div>
                  <div className="text-sm text-green-700">Verificados</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-sm text-red-700">Rechazados</div>
                </div>
              </div>

              {/* Lista de verificaciones pendientes */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Verificaciones Pendientes</h4>
                <div className="space-y-3">
                  {pendingVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex flex-col space-y-1">
                          <Badge 
                            className={verification.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-teal-100 text-teal-800'}
                            variant="secondary"
                          >
                            {verification.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {verification.id}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{verification.providerName}</h4>
                            <Badge variant="outline">{verification.providerType}</Badge>
                          </div>
                          <div className="text-sm text-gray-900 mt-1">
                            Documentos: {verification.documents.join(', ')}
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-700">
                            <span>Enviado: {formatDate(verification.submittedAt)}</span>
                            {verification.reviewedBy && (
                              <span>Revisado por: {verification.reviewedBy}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getVerificationStatusColor(verification.status)}>
                          {verification.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Revisar
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Aprobar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Métricas de rendimiento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Satisfacción del cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Rendimiento</CardTitle>
            <CardDescription>
              Indicadores de calidad del servicio de soporte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">
                  {supportData.avgResponseTime}h
                </div>
                <div className="text-sm text-teal-700">Tiempo de Respuesta</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {supportData.customerSatisfaction}/5
                </div>
                <div className="text-sm text-green-700">Satisfacción</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de actividad */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Actividad</CardTitle>
            <CardDescription>
              Actividad reciente en el sistema de soporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Ticket TKT-001 actualizado', time: 'hace 5 min', type: 'update' },
                { action: 'Proveedor verificado: Clínica Dental', time: 'hace 12 min', type: 'verification' },
                { action: 'Disputa DIS-002 resuelta', time: 'hace 25 min', type: 'resolution' },
                { action: 'Nuevo artículo de ayuda creado', time: 'hace 1 hora', type: 'content' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-900">{activity.action}</span>
                  <span className="text-gray-700">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PlatformSupportDashboard 