'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pill, Package, AlertTriangle, Calendar } from 'lucide-react'

interface NewMedicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (medicationData: any) => void
}

const NewMedicationModal: React.FC<NewMedicationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    brand: '',
    category: '',
    dosage: '',
    form: '',
    strength: '',
    price: '',
    stock: '',
    minStock: '',
    expiryDate: '',
    batchNumber: '',
    manufacturer: '',
    description: '',
    sideEffects: '',
    contraindications: '',
    prescriptionRequired: true,
    activeIngredient: '',
    storageConditions: '',
    packSize: '1',
    unit: 'tablet'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del medicamento es requerido'
    }

    if (!formData.genericName.trim()) {
      newErrors.genericName = 'El nombre genérico es requerido'
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida'
    }

    if (!formData.dosage.trim()) {
      newErrors.dosage = 'La dosis es requerida'
    }

    if (!formData.form) {
      newErrors.form = 'La forma farmacéutica es requerida'
    }

    if (!formData.strength.trim()) {
      newErrors.strength = 'La concentración es requerida'
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número válido mayor a 0'
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0'
    }

    if (!formData.minStock || isNaN(Number(formData.minStock)) || Number(formData.minStock) < 0) {
      newErrors.minStock = 'El stock mínimo debe ser un número válido mayor o igual a 0'
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'La fecha de vencimiento es requerida'
    } else {
      const expiryDate = new Date(formData.expiryDate)
      const today = new Date()
      if (expiryDate <= today) {
        newErrors.expiryDate = 'La fecha de vencimiento debe ser futura'
      }
    }

    if (!formData.batchNumber.trim()) {
      newErrors.batchNumber = 'El número de lote es requerido'
    }

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = 'El fabricante es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const medicationData = {
        ...formData,
        id: `med-${Date.now()}`,
        price: Number(formData.price),
        stock: Number(formData.stock),
        minStock: Number(formData.minStock),
        packSize: Number(formData.packSize),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      }

      await onSubmit(medicationData)
      
      // Reset form
      setFormData({
        name: '',
        genericName: '',
        brand: '',
        category: '',
        dosage: '',
        form: '',
        strength: '',
        price: '',
        stock: '',
        minStock: '',
        expiryDate: '',
        batchNumber: '',
        manufacturer: '',
        description: '',
        sideEffects: '',
        contraindications: '',
        prescriptionRequired: true,
        activeIngredient: '',
        storageConditions: '',
        packSize: '1',
        unit: 'tablet'
      })
      
      onClose()
    } catch (error) {
      console.error('Error creating medication:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Nuevo Medicamento
          </DialogTitle>
          <DialogDescription>
            Complete la información para agregar un nuevo medicamento al inventario.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Comercial *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej. Aspirina"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="genericName">Nombre Genérico *</Label>
                <Input
                  id="genericName"
                  value={formData.genericName}
                  onChange={(e) => handleInputChange('genericName', e.target.value)}
                  placeholder="Ej. Ácido acetilsalicílico"
                  className={errors.genericName ? 'border-red-500' : ''}
                />
                {errors.genericName && (
                  <p className="text-sm text-red-500">{errors.genericName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Ej. Bayer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Fabricante *</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                  placeholder="Ej. Laboratorios ABC"
                  className={errors.manufacturer ? 'border-red-500' : ''}
                />
                {errors.manufacturer && (
                  <p className="text-sm text-red-500">{errors.manufacturer}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="activeIngredient">Principio Activo</Label>
                <Input
                  id="activeIngredient"
                  value={formData.activeIngredient}
                  onChange={(e) => handleInputChange('activeIngredient', e.target.value)}
                  placeholder="Ej. Paracetamol"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="analgesicos">Analgésicos</SelectItem>
                    <SelectItem value="antibioticos">Antibióticos</SelectItem>
                    <SelectItem value="antiinflamatorios">Antiinflamatorios</SelectItem>
                    <SelectItem value="cardiovasculares">Cardiovasculares</SelectItem>
                    <SelectItem value="respiratorios">Respiratorios</SelectItem>
                    <SelectItem value="gastrointestinales">Gastrointestinales</SelectItem>
                    <SelectItem value="dermatologicos">Dermatológicos</SelectItem>
                    <SelectItem value="neurologicos">Neurológicos</SelectItem>
                    <SelectItem value="vitaminas">Vitaminas y Suplementos</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pharmaceutical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Detalles Farmacéuticos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="form">Forma Farmacéutica *</Label>
                <Select value={formData.form} onValueChange={(value) => handleInputChange('form', value)}>
                  <SelectTrigger className={errors.form ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar forma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tableta</SelectItem>
                    <SelectItem value="capsule">Cápsula</SelectItem>
                    <SelectItem value="syrup">Jarabe</SelectItem>
                    <SelectItem value="injection">Inyección</SelectItem>
                    <SelectItem value="cream">Crema</SelectItem>
                    <SelectItem value="ointment">Pomada</SelectItem>
                    <SelectItem value="drops">Gotas</SelectItem>
                    <SelectItem value="spray">Spray</SelectItem>
                    <SelectItem value="powder">Polvo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.form && (
                  <p className="text-sm text-red-500">{errors.form}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="strength">Concentración *</Label>
                <Input
                  id="strength"
                  value={formData.strength}
                  onChange={(e) => handleInputChange('strength', e.target.value)}
                  placeholder="Ej. 500mg"
                  className={errors.strength ? 'border-red-500' : ''}
                />
                {errors.strength && (
                  <p className="text-sm text-red-500">{errors.strength}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosis *</Label>
                <Input
                  id="dosage"
                  value={formData.dosage}
                  onChange={(e) => handleInputChange('dosage', e.target.value)}
                  placeholder="Ej. 1 tableta cada 8 horas"
                  className={errors.dosage ? 'border-red-500' : ''}
                />
                {errors.dosage && (
                  <p className="text-sm text-red-500">{errors.dosage}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="packSize">Tamaño del Empaque</Label>
                <Input
                  id="packSize"
                  type="number"
                  value={formData.packSize}
                  onChange={(e) => handleInputChange('packSize', e.target.value)}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unidad</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tablet">Tableta</SelectItem>
                    <SelectItem value="capsule">Cápsula</SelectItem>
                    <SelectItem value="ml">Mililitro</SelectItem>
                    <SelectItem value="g">Gramo</SelectItem>
                    <SelectItem value="piece">Pieza</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="prescriptionRequired"
                  checked={formData.prescriptionRequired}
                  onChange={(e) => handleInputChange('prescriptionRequired', e.target.checked)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                />
                <Label htmlFor="prescriptionRequired">Requiere Receta Médica</Label>
              </div>
            </div>
          </div>

          {/* Inventory & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Inventario y Precios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Actual *</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  placeholder="0"
                  className={errors.stock ? 'border-red-500' : ''}
                />
                {errors.stock && (
                  <p className="text-sm text-red-500">{errors.stock}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock">Stock Mínimo *</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', e.target.value)}
                  placeholder="0"
                  className={errors.minStock ? 'border-red-500' : ''}
                />
                {errors.minStock && (
                  <p className="text-sm text-red-500">{errors.minStock}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="batchNumber">Número de Lote *</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                  placeholder="Ej. LOT123456"
                  className={errors.batchNumber ? 'border-red-500' : ''}
                />
                {errors.batchNumber && (
                  <p className="text-sm text-red-500">{errors.batchNumber}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.expiryDate ? 'border-red-500' : ''}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-red-500">{errors.expiryDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="storageConditions">Condiciones de Almacenamiento</Label>
                <Input
                  id="storageConditions"
                  value={formData.storageConditions}
                  onChange={(e) => handleInputChange('storageConditions', e.target.value)}
                  placeholder="Ej. Almacenar en lugar fresco y seco"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Adicional</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descripción del medicamento y sus usos..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sideEffects">Efectos Secundarios</Label>
                <Textarea
                  id="sideEffects"
                  value={formData.sideEffects}
                  onChange={(e) => handleInputChange('sideEffects', e.target.value)}
                  placeholder="Posibles efectos secundarios..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contraindications">Contraindicaciones</Label>
                <Textarea
                  id="contraindications"
                  value={formData.contraindications}
                  onChange={(e) => handleInputChange('contraindications', e.target.value)}
                  placeholder="Contraindicaciones y precauciones..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? 'Creando...' : 'Agregar Medicamento'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewMedicationModal 