'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { mockEmergencyRequests } from '@/data/mockData'
import { 
  Ambulance, 
  MapPin, 
  Phone, 
  Clock, 
  AlertTriangle,
  Navigation,
  User,
  Heart,
  Plus,
  Eye,
  CheckCircle
} from 'lucide-react'

const EmergencyDashboard: React.FC = () => {
  const [requests, setRequests] = useState(mockEmergencyRequests)
  const [loading, setLoading] = useState(false)

  const updateRequestStatus = async (requestId: string, newStatus: any) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: newStatus, updatedAt: new Date() }
          : req
      )
    )
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'requested': return 'pending'
      case 'assigned': return 'info'
      case 'en_route': return 'warning'
      case 'arrived': return 'success'
      case 'transporting': return 'in-progress'
      case 'completed': return 'completed'
      case 'cancelled': return 'cancelled'
      default: return 'default'
    }
  }

  const getUrgencyBadgeVariant = (level: string) => {
    switch (level) {
      case 'critical': return 'destructive'
      case 'high': return 'warning'
      case 'medium': return 'info'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  const activeRequests = requests.filter(req => !['completed', 'cancelled'].includes(req.status)).length
  const criticalRequests = requests.filter(req => req.urgencyLevel === 'critical').length
  const inTransitRequests = requests.filter(req => req.status === 'transporting').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Services</h1>
          <p className="text-gray-600">Manage ambulance requests and paramedic dispatch</p>
        </div>
        <Button variant="emergency" size="lg" className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Emergency Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-2xl font-bold text-red-600">{activeRequests}</p>
              </div>
              <Ambulance className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Cases</p>
                <p className="text-2xl font-bold text-red-800">{criticalRequests}</p>
              </div>
              <Heart className="h-8 w-8 text-red-800" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-orange-600">{inTransitRequests}</p>
              </div>
              <Navigation className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Today</p>
                <p className="text-2xl font-bold text-blue-600">{requests.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Requests List */}
      <div className="grid gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Ambulance className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">#{request.id}</span>
                  </div>
                  <Badge variant={getStatusBadgeVariant(request.status)}>
                    {request.status.replace('_', ' ')}
                  </Badge>
                  <Badge variant={getUrgencyBadgeVariant(request.urgencyLevel)}>
                    {request.urgencyLevel} urgency
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                    Track
                  </Button>
                  {request.status === 'requested' && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'assigned')}
                    >
                      Assign Paramedic
                    </Button>
                  )}
                  {request.status === 'assigned' && (
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'en_route')}
                    >
                      En Route
                    </Button>
                  )}
                  {request.status === 'en_route' && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'arrived')}
                    >
                      Arrived
                    </Button>
                  )}
                  {request.status === 'arrived' && (
                    <Button 
                      variant="info" 
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'transporting')}
                    >
                      Start Transport
                    </Button>
                  )}
                  {request.status === 'transporting' && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'completed')}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin className="h-4 w-4" />
                    Pickup Location
                  </div>
                  <p className="font-medium">{request.location.address}</p>
                  <p className="text-sm text-gray-600">{request.location.city}</p>
                </div>

                {request.destination && (
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="h-4 w-4" />
                      Destination
                    </div>
                    <p className="font-medium">{request.destination.address}</p>
                    <p className="text-sm text-gray-600">{request.destination.city}</p>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Clock className="h-4 w-4" />
                    Request Time
                  </div>
                  <p className="font-medium">{formatDateTime(request.createdAt)}</p>
                  {request.estimatedArrival && (
                    <p className="text-sm text-gray-600">
                      ETA: {formatDateTime(request.estimatedArrival)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  Symptoms/Reason
                </div>
                <p className="text-gray-900">{request.symptoms}</p>
              </div>

              {request.paramedicId && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <User className="h-4 w-4" />
                    Assigned Paramedic
                  </div>
                  <p className="font-medium">Paramedic ID: {request.paramedicId}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Distance</p>
                  <p className="font-medium">{request.distance.toFixed(1)} km</p>
                </div>
                <div>
                  <p className="text-gray-600">Estimated Cost</p>
                  <p className="font-medium">{formatCurrency(request.estimatedCost)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Status</p>
                  <Badge variant={request.paymentStatus === 'completed' ? 'success' : 'pending'}>
                    {request.paymentStatus}
                  </Badge>
                </div>
              </div>

              {request.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Additional Notes</p>
                  <p className="text-sm">{request.notes}</p>
                </div>
              )}

              {request.urgencyLevel === 'critical' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-800 font-medium">CRITICAL: Immediate attention required</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Ambulance className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No emergency requests</h3>
            <p className="text-gray-600">Emergency requests will appear here when they are made.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default EmergencyDashboard 