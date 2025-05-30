'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Pill, 
  AlertTriangle, 
  Heart, 
  FileText, 
  Activity,
  MapPin,
  User,
  ChevronDown,
  Edit
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ServiceItem = {
  id: string;
  name: string;
  icon: any;
  route: string;
  description: string;
  color: string;
};

const services: ServiceItem[] = [
  {
    id: '1',
    name: 'Consulta',
    icon: Calendar,
    route: '/dashboard/consultas',
    description: 'Agenda citas médicas presenciales o por telemedicina',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Farmacia',
    icon: Pill,
    route: '/dashboard/farmacia',
    description: 'Busca y compra medicamentos con entrega a domicilio',
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Emergencia',
    icon: AlertTriangle,
    route: '/dashboard/emergencias',
    description: 'Solicita atención médica de urgencia en tu ubicación',
    color: 'bg-red-500'
  },
  {
    id: '4',
    name: 'Enfermería',
    icon: Heart,
    route: '/dashboard/homecare',
    description: 'Servicios de cuidados y procedimientos a domicilio',
    color: 'bg-purple-500'
  },
  {
    id: '5',
    name: 'Expediente',
    icon: FileText,
    route: '/dashboard/expedientes',
    description: 'Accede a tu historial médico y resultados de pruebas',
    color: 'bg-cyan-500'
  },
  {
    id: '6',
    name: 'Laboratorio',
    icon: Activity,
    route: '/dashboard/laboratorio',
    description: 'Programa toma de muestras y revisa resultados',
    color: 'bg-indigo-500'
  },
];

export default function HomeScreen() {
  const [user] = useState({
    nombre: 'Juan',
    apellido: 'Pérez'
  });
  const [currentLocation] = useState({
    direccion: 'Av. Principal 123, Ciudad'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-cyan-600 px-4 pt-12 pb-6 rounded-b-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-cyan-600 font-semibold text-lg">
                {user.nombre.charAt(0)}{user.apellido.charAt(0)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-white text-lg font-medium">
                ¡Hola, {user.nombre} {user.apellido}!
              </h1>
              <Edit className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
          <MapPin className="w-5 h-5 text-white" />
          <span className="text-white text-sm flex-1 truncate">
            {currentLocation.direccion}
          </span>
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          ¿Qué servicio necesitas hoy?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link key={service.id} href={service.route}>
                <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${service.color} p-3 rounded-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 