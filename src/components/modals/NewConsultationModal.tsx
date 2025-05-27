'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, User, Video, MapPin, Phone } from 'lucide-react';

interface NewConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (consultationData: any) => void;
}

const NewConsultationModal: React.FC<NewConsultationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorName: '',
    date: '',
    time: '',
    type: '',
    reason: '',
    notes: '',
    room: '',
    duration: '30'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'El nombre del paciente es requerido';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'El email del paciente es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Email inválido';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'El teléfono del paciente es requerido';
    }

    if (!formData.doctorName.trim()) {
      newErrors.doctorName = 'El médico es requerido';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    if (!formData.time) {
      newErrors.time = 'La hora es requerida';
    }

    if (!formData.type) {
      newErrors.type = 'El tipo de consulta es requerido';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'El motivo de la consulta es requerido';
    }

    if (formData.type === 'presencial' && !formData.room.trim()) {
      newErrors.room = 'La sala es requerida para consultas presenciales';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const consultationData = {
        ...formData,
        id: `cons-${Date.now()}`,
        status: 'programada',
        patientId: `patient-${Date.now()}`,
        doctorId: `doctor-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await onSubmit(consultationData);
      
      // Reset form
      setFormData({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        doctorName: '',
        date: '',
        time: '',
        type: '',
        reason: '',
        notes: '',
        room: '',
        duration: '30'
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating consultation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual': return <Video className="h-4 w-4" />;
      case 'presencial': return <MapPin className="h-4 w-4" />;
      case 'telefonica': return <Phone className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Nueva Consulta
          </DialogTitle>
          <DialogDescription>
            Complete la información para crear una nueva consulta médica.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Información del Paciente
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nombre del Paciente *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  placeholder="Nombre completo del paciente"
                  className={errors.patientName ? 'border-red-500' : ''}
                />
                {errors.patientName && (
                  <p className="text-sm text-red-500">{errors.patientName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientEmail">Email del Paciente *</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                  placeholder="email@ejemplo.com"
                  className={errors.patientEmail ? 'border-red-500' : ''}
                />
                {errors.patientEmail && (
                  <p className="text-sm text-red-500">{errors.patientEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientPhone">Teléfono del Paciente *</Label>
                <Input
                  id="patientPhone"
                  value={formData.patientPhone}
                  onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.patientPhone ? 'border-red-500' : ''}
                />
                {errors.patientPhone && (
                  <p className="text-sm text-red-500">{errors.patientPhone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctorName">Médico Asignado *</Label>
                <Select value={formData.doctorName} onValueChange={(value) => handleInputChange('doctorName', value)}>
                  <SelectTrigger className={errors.doctorName ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. García">Dr. García - Medicina General</SelectItem>
                    <SelectItem value="Dra. Martínez">Dra. Martínez - Cardiología</SelectItem>
                    <SelectItem value="Dr. López">Dr. López - Dermatología</SelectItem>
                    <SelectItem value="Dra. Rodríguez">Dra. Rodríguez - Pediatría</SelectItem>
                    <SelectItem value="Dr. Sánchez">Dr. Sánchez - Neurología</SelectItem>
                  </SelectContent>
                </Select>
                {errors.doctorName && (
                  <p className="text-sm text-red-500">{errors.doctorName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Detalles de la Consulta
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.date ? 'border-red-500' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={errors.time ? 'border-red-500' : ''}
                />
                {errors.time && (
                  <p className="text-sm text-red-500">{errors.time}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración (minutos)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Consulta *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Presencial
                      </div>
                    </SelectItem>
                    <SelectItem value="virtual">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Virtual
                      </div>
                    </SelectItem>
                    <SelectItem value="telefonica">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Telefónica
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              {formData.type === 'presencial' && (
                <div className="space-y-2">
                  <Label htmlFor="room">Sala/Consultorio *</Label>
                  <Select value={formData.room} onValueChange={(value) => handleInputChange('room', value)}>
                    <SelectTrigger className={errors.room ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Seleccionar sala" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultorio 1">Consultorio 1</SelectItem>
                      <SelectItem value="Consultorio 2">Consultorio 2</SelectItem>
                      <SelectItem value="Consultorio 3">Consultorio 3</SelectItem>
                      <SelectItem value="Sala de Examen A">Sala de Examen A</SelectItem>
                      <SelectItem value="Sala de Examen B">Sala de Examen B</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.room && (
                    <p className="text-sm text-red-500">{errors.room}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Consultation Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de la Consulta *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Describe el motivo de la consulta..."
                className={errors.reason ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Adicionales</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Notas adicionales o instrucciones especiales..."
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isSubmitting ? 'Creando...' : 'Crear Consulta'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewConsultationModal; 