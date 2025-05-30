'use client';

import { useState } from 'react';
import { Medication } from '@/types';
import { 
  X, 
  Pill, 
  Package, 
  AlertTriangle,
  Calendar,
  Building,
  MapPin,
  Edit,
  Save,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface MedicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication: Medication | null;
  onUpdate?: (medicationId: string, updates: Partial<Medication>) => void;
}

const MedicationDetailsModal = ({ isOpen, onClose, medication, onUpdate }: MedicationDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'inventory' | 'history'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Medication>>({});

  if (!isOpen || !medication) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PA', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStockStatus = () => {
    if (medication.stock <= medication.minStock) return { status: 'critical', color: 'text-red-600', bg: 'bg-red-50' };
    if (medication.stock <= medication.minStock * 1.5) return { status: 'low', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { status: 'normal', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const handleEdit = () => {
    setEditData(medication);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(medication.id, editData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Medication, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const daysUntilExpiry = getDaysUntilExpiry(medication.expiryDate);
  const stockStatus = getStockStatus();
  const isExpiringSoon = daysUntilExpiry <= 30;

  // Mock inventory movement history
  const inventoryHistory = [
    {
      id: '1',
      date: new Date('2024-12-15'),
      type: 'entrada',
      quantity: 50,
      reason: 'Compra a proveedor',
      user: 'Farmacéutico Juan',
      previousStock: medication.stock - 50,
      newStock: medication.stock
    },
    {
      id: '2',
      date: new Date('2024-12-10'),
      type: 'salida',
      quantity: -10,
      reason: 'Venta - Pedido #order-1',
      user: 'Sistema',
      previousStock: medication.stock + 10,
      newStock: medication.stock
    },
    {
      id: '3',
      date: new Date('2024-12-05'),
      type: 'ajuste',
      quantity: -2,
      reason: 'Ajuste por inventario físico',
      user: 'Supervisor Farmacia',
      previousStock: medication.stock + 2,
      newStock: medication.stock
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex items-center space-x-3">
            <Pill className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-xl font-semibold text-white">{medication.name}</h2>
              <p className="text-purple-100 text-sm">
                {medication.brand} - {medication.activeIngredient} {medication.concentration}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={medication.requiresPrescription ? 'warning' : 'default'} className="bg-white text-purple-600">
              {medication.requiresPrescription ? 'Receta Médica' : 'Venta Libre'}
            </Badge>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        <div className="p-4 space-y-2">
          {stockStatus.status !== 'normal' && (
            <div className={`p-3 rounded-lg border ${stockStatus.bg} border-${stockStatus.status === 'critical' ? 'red' : 'orange'}-200`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${stockStatus.color}`} />
                <p className={`text-sm font-medium ${stockStatus.color}`}>
                  {stockStatus.status === 'critical' ? 'Stock Crítico' : 'Stock Bajo'}: 
                  {medication.stock} unidades (mínimo: {medication.minStock})
                </p>
              </div>
            </div>
          )}
          {isExpiringSoon && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                <p className="text-sm font-medium text-orange-600">
                  {daysUntilExpiry > 0 ? `Vence en ${daysUntilExpiry} días` : 'VENCIDO'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Información Básica
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'inventory'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Gestión de Inventario
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Historial de Movimientos
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Pill className="w-5 h-5 mr-2" />
                    Información del Medicamento
                  </h3>
                  <Button 
                    variant={isEditing ? "outline" : "default"}
                    size="sm"
                    onClick={isEditing ? handleCancel : handleEdit}
                  >
                    {isEditing ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Cancelar
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Nombre Comercial</Label>
                      {isEditing ? (
                        <Input
                          value={editData.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{medication.name}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Principio Activo</Label>
                      {isEditing ? (
                        <Input
                          value={editData.activeIngredient || ''}
                          onChange={(e) => handleInputChange('activeIngredient', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">{medication.activeIngredient}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Concentración</Label>
                      {isEditing ? (
                        <Input
                          value={editData.concentration || ''}
                          onChange={(e) => handleInputChange('concentration', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">{medication.concentration}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Forma Farmacéutica</Label>
                      <p className="text-gray-900 capitalize">
                        {medication.form === 'tablet' ? 'Tableta' :
                         medication.form === 'capsule' ? 'Cápsula' :
                         medication.form === 'liquid' ? 'Líquido' :
                         medication.form === 'injection' ? 'Inyección' :
                         medication.form === 'cream' ? 'Crema' :
                         medication.form === 'drops' ? 'Gotas' : medication.form}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Marca</Label>
                      {isEditing ? (
                        <Input
                          value={editData.brand || ''}
                          onChange={(e) => handleInputChange('brand', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">{medication.brand}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Categoría</Label>
                      <p className="text-gray-900">{medication.category}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Fabricante</Label>
                      {isEditing ? (
                        <Input
                          value={editData.manufacturer || ''}
                          onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">{medication.manufacturer}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Precio</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={editData.price || ''}
                          onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-purple-600 font-semibold text-lg">{formatCurrency(medication.price)}</p>
                      )}
                    </div>
                  </div>
                </div>

                {medication.description && (
                  <div className="mt-6">
                    <Label className="text-sm font-medium text-gray-600">Descripción</Label>
                    {isEditing ? (
                      <Textarea
                        value={editData.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-900 mt-1">{medication.description}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Manufacturing & Expiry Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Información de Fabricación
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Número de Lote</Label>
                      <p className="font-mono text-gray-900">{medication.batchNumber}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Fecha de Fabricación</Label>
                      <p className="text-gray-900">{formatDate(medication.manufacturingDate)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Fecha de Vencimiento</Label>
                      <p className={`font-medium ${isExpiringSoon ? 'text-orange-600' : 'text-gray-900'}`}>
                        {formatDate(medication.expiryDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Ubicación en Farmacia
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Ubicación</Label>
                      {isEditing ? (
                        <Input
                          value={editData.location || ''}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">{medication.location}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Código de Barras</Label>
                      <p className="font-mono text-gray-900">{medication.barcode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Current Stock Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Estado Actual del Inventario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg ${stockStatus.bg} border border-${stockStatus.status === 'critical' ? 'red' : stockStatus.status === 'low' ? 'orange' : 'green'}-200`}>
                    <Label className="text-sm font-medium text-gray-600">Stock Actual</Label>
                    <p className={`text-2xl font-bold ${stockStatus.color}`}>{medication.stock}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-600">Stock Mínimo</Label>
                    <p className="text-2xl font-bold text-gray-900">{medication.minStock}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-600">Stock Máximo</Label>
                    <p className="text-2xl font-bold text-gray-900">{medication.maxStock}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Label className="text-sm font-medium text-gray-600">Para Reposición</Label>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.max(0, medication.maxStock - medication.stock)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stock Management Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones de Inventario</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Entrada de Stock</h4>
                    <div className="space-y-2">
                      <Input type="number" placeholder="Cantidad" />
                      <Input placeholder="Motivo (compra, devolución...)" />
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Agregar Stock
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Salida de Stock</h4>
                    <div className="space-y-2">
                      <Input type="number" placeholder="Cantidad" />
                      <Input placeholder="Motivo (vencimiento, daño...)" />
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <TrendingDown className="w-4 h-4 mr-2" />
                        Reducir Stock
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Ajuste de Stock</h4>
                    <div className="space-y-2">
                      <Input type="number" placeholder="Stock real contado" />
                      <Input placeholder="Motivo del ajuste" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Ajustar Stock
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reorder Recommendations */}
              {medication.stock <= medication.minStock && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">🔔 Recomendación de Reposición</h4>
                  <p className="text-yellow-700 mb-3">
                    El stock está por debajo del mínimo. Se recomienda realizar un pedido de reposición.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-yellow-700">Cantidad Sugerida</Label>
                      <p className="text-yellow-900 font-semibold">
                        {medication.maxStock - medication.stock} unidades
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-yellow-700">Costo Estimado</Label>
                      <p className="text-yellow-900 font-semibold">
                        {formatCurrency((medication.maxStock - medication.stock) * medication.price)}
                      </p>
                    </div>
                  </div>
                  <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                    Generar Orden de Compra
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Historial de Movimientos de Inventario
              </h3>
              
              <div className="space-y-3">
                {inventoryHistory.map((movement) => (
                  <div key={movement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={movement.type === 'entrada' ? 'success' : movement.type === 'salida' ? 'warning' : 'default'}
                        >
                          {movement.type === 'entrada' ? 'Entrada' : 
                           movement.type === 'salida' ? 'Salida' : 'Ajuste'}
                        </Badge>
                        <span className={`font-medium ${
                          movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(movement.date)}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mb-1">{movement.reason}</p>
                    <div className="text-sm text-gray-600">
                      <p>Stock anterior: {movement.previousStock} → Stock nuevo: {movement.newStock}</p>
                      <p>Usuario: {movement.user}</p>
                    </div>
                  </div>
                ))}
              </div>

              {inventoryHistory.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sin Movimientos</h3>
                  <p className="text-gray-600">No hay historial de movimientos para este medicamento.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Código: {medication.id} | Última actualización: {formatDate(new Date())}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            {isEditing && (
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetailsModal; 