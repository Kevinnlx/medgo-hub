'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useHomecare } from '@/hooks/useHomecare';
import { Plus, Calendar, Clock, MapPin, User, Phone, FileText } from 'lucide-react';
import type { HomecareServiceType, CreateHomecareBookingData } from '@/types/homecare';

const CreateBookingModal = () => {
  const { createBooking, loading, formatServiceType } = useHomecare();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateHomecareBookingData>>({
    serviceType: 'HOME_CARE',
    durationHours: 4,
    scheduledStart: new Date(),
    serviceAddress: '',
    patientName: '',
    contactPhone: '',
    specialInstructions: '',
    patientAge: undefined,
    medicalConditions: [],
    contactName: '',
    contactRelationship: 'Familiar'
  });

  const serviceTypes: HomecareServiceType[] = [
    'HOME_CARE',
    'INJECTIONS', 
    'WOUND_CARE',
    'ELDER_CARE',
    'PHYSICAL_THERAPY',
    'MEDICAL_MONITORING'
  ];

  const handleInputChange = (field: keyof CreateHomecareBookingData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicalConditionsChange = (value: string) => {
    const conditions = value.split(',').map(c => c.trim()).filter(c => c.length > 0);
    handleInputChange('medicalConditions', conditions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.patientName || !formData.serviceAddress || !formData.contactPhone) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    try {
      const bookingData: CreateHomecareBookingData = {
        providerId: 'provider_001', // This would be selected by the user
        serviceType: formData.serviceType!,
        scheduledStart: formData.scheduledStart!,
        durationHours: formData.durationHours!,
        serviceAddress: formData.serviceAddress!,
        patientName: formData.patientName!,
        contactPhone: formData.contactPhone!,
        specialInstructions: formData.specialInstructions,
        patientAge: formData.patientAge,
        medicalConditions: formData.medicalConditions,
        contactName: formData.contactName,
        contactRelationship: formData.contactRelationship
      };

      await createBooking(bookingData);
      setOpen(false);
      
      // Reset form
      setFormData({
        serviceType: 'HOME_CARE',
        durationHours: 4,
        scheduledStart: new Date(),
        serviceAddress: '',
        patientName: '',
        contactPhone: '',
        specialInstructions: '',
        patientAge: undefined,
        medicalConditions: [],
        contactName: '',
        contactRelationship: 'Familiar'
      });
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Nueva Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Crear Nueva Reserva de Servicio
          </DialogTitle>
          <DialogDescription>
            Complete la información para solicitar un servicio de cuidado domiciliario
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tipo de Servicio *
            </Label>
            <select
              id="serviceType"
              value={formData.serviceType}
              onChange={(e) => handleInputChange('serviceType', e.target.value as HomecareServiceType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {serviceTypes.map(type => (
                <option key={type} value={type}>
                  {formatServiceType(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledStart" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fecha y Hora *
              </Label>
              <Input
                id="scheduledStart"
                type="datetime-local"
                value={formData.scheduledStart ? 
                  new Date(formData.scheduledStart.getTime() - formData.scheduledStart.getTimezoneOffset() * 60000)
                    .toISOString().slice(0, 16) : ''
                }
                onChange={(e) => handleInputChange('scheduledStart', new Date(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationHours" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duración (horas) *
              </Label>
              <Input
                id="durationHours"
                type="number"
                min="1"
                max="24"
                value={formData.durationHours}
                onChange={(e) => handleInputChange('durationHours', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Información del Paciente</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nombre del Paciente *
                </Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  placeholder="Nombre completo del paciente"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientAge">Edad</Label>
                <Input
                  id="patientAge"
                  type="number"
                  min="0"
                  max="120"
                  value={formData.patientAge || ''}
                  onChange={(e) => handleInputChange('patientAge', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Edad del paciente"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Condiciones Médicas</Label>
              <Input
                id="medicalConditions"
                value={formData.medicalConditions?.join(', ') || ''}
                onChange={(e) => handleMedicalConditionsChange(e.target.value)}
                placeholder="Diabetes, Hipertensión, etc. (separadas por comas)"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Información de Contacto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Nombre del Contacto</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Nombre de la persona de contacto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactRelationship">Relación</Label>
                <select
                  id="contactRelationship"
                  value={formData.contactRelationship}
                  onChange={(e) => handleInputChange('contactRelationship', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Paciente">Paciente</option>
                  <option value="Familiar">Familiar</option>
                  <option value="Cuidador">Cuidador</option>
                  <option value="Amigo">Amigo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono de Contacto *
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="+58-XXX-XXX-XXXX"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="serviceAddress" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Dirección del Servicio *
            </Label>
            <Textarea
              id="serviceAddress"
              value={formData.serviceAddress}
              onChange={(e) => handleInputChange('serviceAddress', e.target.value)}
              placeholder="Dirección completa donde se prestará el servicio"
              rows={3}
              required
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Instrucciones especiales, acceso al edificio, observaciones médicas, etc."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Creando...' : 'Crear Reserva'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookingModal; 