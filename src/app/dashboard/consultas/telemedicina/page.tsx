'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  ArrowLeft,
  Search, 
  Star, 
  Clock, 
  Video,
  User,
  Filter,
  Calendar,
  CheckCircle,
  Wifi,
  Monitor
} from 'lucide-react';

type VirtualProvider = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  isOnline: boolean;
  nextAvailable: string;
  languages: string[];
  price: number;
  responseTime: string;
  experience: string;
};

const mockVirtualProviders: VirtualProvider[] = [
  {
    id: '1',
    name: 'Dr. Elena Vargas',
    specialty: 'Medicina General',
    rating: 4.9,
    reviews: 156,
    isOnline: true,
    nextAvailable: 'Ahora disponible',
    languages: ['Español', 'Inglés'],
    price: 40,
    responseTime: '< 5 min',
    experience: '8 años'
  },
  {
    id: '2', 
    name: 'Dr. Roberto Silva',
    specialty: 'Psicología',
    rating: 4.8,
    reviews: 203,
    isOnline: false,
    nextAvailable: 'En 30 min',
    languages: ['Español'],
    price: 60,
    responseTime: '< 10 min',
    experience: '12 años'
  },
  {
    id: '3',
    name: 'Dra. Carmen López',
    specialty: 'Dermatología',
    rating: 4.7,
    reviews: 89,
    isOnline: true,
    nextAvailable: 'Ahora disponible',
    languages: ['Español', 'Francés'],
    price: 70,
    responseTime: '< 15 min',
    experience: '6 años'
  },
  {
    id: '4',
    name: 'Dr. Miguel Herrera',
    specialty: 'Cardiología',
    rating: 4.9,
    reviews: 134,
    isOnline: false,
    nextAvailable: 'En 1 hora',
    languages: ['Español', 'Inglés'],
    price: 85,
    responseTime: '< 20 min',
    experience: '15 años'
  }
];

export default function TelemedicineePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const filteredProviders = mockVirtualProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || provider.specialty === selectedSpecialty;
    const matchesOnline = !onlineOnly || provider.isOnline;
    return matchesSearch && matchesSpecialty && matchesOnline;
  });

  return (
    <DashboardLayout currentPage="/dashboard/consultas">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/consultas">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Telemedicina</h1>
            <p className="text-gray-600">Consulta con especialistas por videollamada</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por nombre o especialidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2 overflow-x-auto">
              <Badge 
                variant={!onlineOnly ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setOnlineOnly(false)}
              >
                Todos
              </Badge>
              <Badge 
                variant={onlineOnly ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setOnlineOnly(true)}
              >
                Solo en línea
              </Badge>
            </div>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            <Badge 
              variant={selectedSpecialty === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedSpecialty('all')}
            >
              Todas las especialidades
            </Badge>
            <Badge 
              variant={selectedSpecialty === 'Medicina General' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedSpecialty('Medicina General')}
            >
              Medicina General
            </Badge>
            <Badge 
              variant={selectedSpecialty === 'Psicología' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedSpecialty('Psicología')}
            >
              Psicología
            </Badge>
            <Badge 
              variant={selectedSpecialty === 'Dermatología' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedSpecialty('Dermatología')}
            >
              Dermatología
            </Badge>
          </div>
        </div>

        {/* Provider List */}
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center relative">
                    <User className="w-8 h-8 text-gray-500" />
                    {provider.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Wifi className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-cyan-600 text-sm font-medium">{provider.specialty}</p>
                        <p className="text-xs text-gray-500">{provider.experience} de experiencia</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${provider.price}</p>
                        <p className="text-xs text-gray-500">consulta</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-xs text-gray-500">({provider.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Responde en {provider.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${provider.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className={`text-sm ${provider.isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                          {provider.nextAvailable}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {provider.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Agendar</span>
                        </Button>
                        {provider.isOnline && (
                          <Button 
                            className="bg-cyan-600 hover:bg-cyan-700 flex items-center space-x-1"
                            size="sm"
                          >
                            <Video className="w-4 h-4" />
                            <span>Consultar ahora</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron especialistas con esos criterios</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('all');
                setOnlineOnly(false);
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Requirements Info */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Monitor className="w-6 h-6 text-cyan-600 mt-1" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Requisitos técnicos
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Conexión a internet estable</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Cámara y micrófono funcionales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Navegador web actualizado</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 