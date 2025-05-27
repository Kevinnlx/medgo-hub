'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useHomecare } from '@/hooks/useHomecare';
import { formatDate } from '@/lib/utils';
import { 
  Eye, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  UserCheck, 
  Star,
  MessageSquare,
  FileText,
  CreditCard,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import type { HomecareBookingWithDetails, HomecareServiceStatus, CreateHomecareRatingData } from '@/types/homecare';

interface ServiceDetailsModalProps {
  service: HomecareBookingWithDetails;
  trigger?: React.ReactNode;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ service, trigger }) => {
  const { 
    updateBookingStatus, 
    submitRating, 
    addServiceNote, 
    loading, 
    formatCurrency, 
    formatServiceType, 
    formatStatus, 
    getStatusColor 
  } = useHomecare();
  
  const [open, setOpen] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [ratingData, setRatingData] = useState<CreateHomecareRatingData>({
    overallRating: 5,
    punctualityRating: 5,
    professionalismRating: 5,
    careQualityRating: 5,
    reviewText: ''
  });

  const handleStatusChange = async (newStatus: HomecareServiceStatus) => {
    try {
      await updateBookingStatus(service.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSubmitRating = async () => {
    try {
      await submitRating(service.id, ratingData);
      setShowRatingForm(false);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    
    try {
      await addServiceNote(service.id, 'general', newNote);
      setNewNote('');
      setShowNoteForm(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'HOME_CARE': return <User className="h-5 w-5" />;
      case 'INJECTIONS': return <FileText className="h-5 w-5" />;
      case 'WOUND_CARE': return <AlertCircle className="h-5 w-5" />;
      case 'ELDER_CARE': return <UserCheck className="h-5 w-5" />;
      case 'PHYSICAL_THERAPY': return <CheckCircle className="h-5 w-5" />;
      case 'MEDICAL_MONITORING': return <Eye className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="ghost" className="whitespace-nowrap">
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getServiceIcon(service.serviceType)}
            <span>{formatServiceType(service.serviceType)}</span>
            <Badge className={getStatusColor(service.status)}>
              {formatStatus(service.status)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Servicio ID: {service.id} • Creado: {formatDate(service.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información del Servicio</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Programado:</span>
                  <span>{formatDate(service.scheduledStart)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Duración:</span>
                  <span>{service.durationHours} horas</span>
                </div>

                {service.actualStart && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Inicio real:</span>
                    <span>{formatDate(service.actualStart)}</span>
                  </div>
                )}

                {service.actualEnd && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Fin real:</span>
                    <span>{formatDate(service.actualEnd)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Dirección:</span>
                  <span className="text-gray-700">{service.serviceAddress}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información del Paciente</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Paciente:</span>
                  <span>{service.patientName}</span>
                  {service.patientAge && <span>({service.patientAge} años)</span>}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Contacto:</span>
                  <span>{service.contactPhone}</span>
                </div>

                {service.contactName && (
                  <div className="flex items-center gap-2 text-sm">
                    <UserCheck className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Persona de contacto:</span>
                    <span>{service.contactName}</span>
                    {service.contactRelationship && <span>({service.contactRelationship})</span>}
                  </div>
                )}

                {service.operatorName && (
                  <div className="flex items-center gap-2 text-sm">
                    <UserCheck className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Cuidador asignado:</span>
                    <span>{service.operatorName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Medical Conditions */}
          {service.medicalConditions && service.medicalConditions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-3">Condiciones Médicas</h3>
              <div className="flex flex-wrap gap-2">
                {service.medicalConditions.map((condition, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {service.specialInstructions && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-3">Instrucciones Especiales</h3>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">{service.specialInstructions}</p>
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-3">Información de Pago</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Tarifa base:</span>
                <span>{formatCurrency(service.baseRateCents)}</span>
              </div>
              {service.additionalChargesCents > 0 && (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Cargos adicionales:</span>
                  <span>{formatCurrency(service.additionalChargesCents)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green-500" />
                <span className="font-medium">Total:</span>
                <span className="font-bold text-green-600">{formatCurrency(service.totalAmountCents)}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          {service.rating && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-3">Calificación</h3>
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">Calificación general: {service.rating.overallRating}/5</span>
                </div>
                {service.rating.reviewText && (
                  <p className="text-sm text-gray-700 italic">"{service.rating.reviewText}"</p>
                )}
                <div className="grid grid-cols-3 gap-4 mt-3 text-xs">
                  {service.rating.punctualityRating && (
                    <div>Puntualidad: {service.rating.punctualityRating}/5</div>
                  )}
                  {service.rating.professionalismRating && (
                    <div>Profesionalismo: {service.rating.professionalismRating}/5</div>
                  )}
                  {service.rating.careQualityRating && (
                    <div>Calidad: {service.rating.careQualityRating}/5</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {service.notes && service.notes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-2 mb-3">Notas del Servicio</h3>
              <div className="space-y-2">
                {service.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{note.noteType}</span>
                      <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {service.status === 'PENDING' && (
              <>
                <Button
                  onClick={() => handleStatusChange('CONFIRMED')}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Confirmar Servicio
                </Button>
                <Button
                  onClick={() => handleStatusChange('CANCELLED')}
                  disabled={loading}
                  variant="outline"
                >
                  Cancelar Servicio
                </Button>
              </>
            )}

            {service.status === 'CONFIRMED' && (
              <Button
                onClick={() => handleStatusChange('IN_PROGRESS')}
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Iniciar Servicio
              </Button>
            )}

            {service.status === 'IN_PROGRESS' && (
              <Button
                onClick={() => handleStatusChange('COMPLETED')}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                Completar Servicio
              </Button>
            )}

            {service.status === 'COMPLETED' && !service.rating && (
              <Button
                onClick={() => setShowRatingForm(true)}
                disabled={loading}
                variant="outline"
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
              >
                <Star className="h-4 w-4 mr-1" />
                Calificar Servicio
              </Button>
            )}

            <Button
              onClick={() => setShowNoteForm(true)}
              disabled={loading}
              variant="outline"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Agregar Nota
            </Button>
          </div>

          {/* Rating Form */}
          {showRatingForm && (
            <div className="p-4 bg-yellow-50 rounded-md border">
              <h4 className="font-semibold mb-3">Calificar Servicio</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Calificación General</label>
                    <select
                      value={ratingData.overallRating}
                      onChange={(e) => setRatingData(prev => ({ ...prev, overallRating: parseInt(e.target.value) }))}
                      className="w-full mt-1 px-2 py-1 border rounded"
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} estrella{n>1?'s':''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Puntualidad</label>
                    <select
                      value={ratingData.punctualityRating || 5}
                      onChange={(e) => setRatingData(prev => ({ ...prev, punctualityRating: parseInt(e.target.value) }))}
                      className="w-full mt-1 px-2 py-1 border rounded"
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <Textarea
                  placeholder="Comentarios sobre el servicio..."
                  value={ratingData.reviewText || ''}
                  onChange={(e) => setRatingData(prev => ({ ...prev, reviewText: e.target.value }))}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSubmitRating} disabled={loading} size="sm">
                    Enviar Calificación
                  </Button>
                  <Button onClick={() => setShowRatingForm(false)} variant="outline" size="sm">
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Note Form */}
          {showNoteForm && (
            <div className="p-4 bg-blue-50 rounded-md border">
              <h4 className="font-semibold mb-3">Agregar Nota</h4>
              <div className="space-y-3">
                <Textarea
                  placeholder="Escriba su nota aquí..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddNote} disabled={loading || !newNote.trim()} size="sm">
                    Agregar Nota
                  </Button>
                  <Button onClick={() => setShowNoteForm(false)} variant="outline" size="sm">
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsModal; 