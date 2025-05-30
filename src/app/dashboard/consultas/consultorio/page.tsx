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
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Building,
  User,
  Filter
} from 'lucide-react';

type Provider = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  nextAvailable: string;
  address: string;
  image: string;
  price: number;
};

const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Ana García',
    specialty: 'Medicina General',
    rating: 4.8,
    reviews: 124,
    distance: '0.5 km',
    nextAvailable: 'Hoy 3:00 PM',
    address: 'Clínica San Rafael, Av. Principal 123',
    image: '/api/placeholder/60/60',
    price: 50
  },
  {
    id: '2', 
    name: 'Dr. Carlos Mendoza',
    specialty: 'Cardiología',
    rating: 4.9,
    reviews: 89,
    distance: '1.2 km',
    nextAvailable: 'Mañana 10:00 AM',
    address: 'Hospital Central, Calle 45 #67',
    image: '/api/placeholder/60/60',
    price: 80
  },
  {
    id: '3',
    name: 'Dra. María Rodríguez',
    specialty: 'Pediatría',
    rating: 4.7,
    reviews: 156,
    distance: '2.1 km',
    nextAvailable: 'Hoy 5:30 PM',
    address: 'Centro Médico Infantil, Av. Niños 89',
    image: '/api/placeholder/60/60',
    price: 60
  }
];

export default function ConsultorioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || provider.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
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
            <h1 className="text-3xl font-bold text-gray-900">Consulta en Consultorio</h1>
            <p className="text-gray-600">Encuentra médicos especialistas cerca de ti</p>
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
                variant={selectedSpecialty === 'all' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSpecialty('all')}
              >
                Todas
              </Badge>
              <Badge 
                variant={selectedSpecialty === 'Medicina General' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSpecialty('Medicina General')}
              >
                Medicina General
              </Badge>
              <Badge 
                variant={selectedSpecialty === 'Cardiología' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSpecialty('Cardiología')}
              >
                Cardiología
              </Badge>
              <Badge 
                variant={selectedSpecialty === 'Pediatría' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedSpecialty('Pediatría')}
              >
                Pediatría
              </Badge>
            </div>
          </div>
        </div>

        {/* Provider List */}
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-emerald-600 text-sm font-medium">{provider.specialty}</p>
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
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{provider.distance}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Próxima disponibilidad:</p>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-600">{provider.nextAvailable}</span>
                        </div>
                      </div>
                      
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar
                      </Button>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">{provider.address}</span>
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
            <p className="text-gray-500">No se encontraron médicos con esos criterios</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('all');
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 