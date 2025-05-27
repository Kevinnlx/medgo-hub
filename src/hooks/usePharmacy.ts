import { useState, useEffect } from 'react'
import { Medication, PharmacyOrder } from '@/types'
import { mockMedications } from '@/data/mockData'

export const usePharmacy = () => {
  const [medications, setMedications] = useState<Medication[]>([])
  const [orders, setOrders] = useState<PharmacyOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setMedications(mockMedications)
        setOrders([]) // Initialize with empty orders
      } catch (err) {
        setError('Error loading pharmacy data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const searchMedications = (query: string) => {
    if (!query.trim()) return medications
    
    return medications.filter(med => 
      med.name.toLowerCase().includes(query.toLowerCase()) ||
      med.brand.toLowerCase().includes(query.toLowerCase()) ||
      med.activeIngredient.toLowerCase().includes(query.toLowerCase()) ||
      med.category.toLowerCase().includes(query.toLowerCase())
    )
  }

  const getMedicationsByCategory = (category: string) => {
    return medications.filter(med => med.category === category)
  }

  const getLowStockMedications = () => {
    return medications.filter(med => med.stock <= med.minStock)
  }

  const getExpiringSoonMedications = (daysThreshold = 30) => {
    const threshold = new Date()
    threshold.setDate(threshold.getDate() + daysThreshold)
    
    return medications.filter(med => new Date(med.expiryDate) <= threshold)
  }

  const updateMedicationStock = async (medicationId: string, newStock: number) => {
    try {
      setMedications(prev => 
        prev.map(med => 
          med.id === medicationId 
            ? { ...med, stock: newStock }
            : med
        )
      )
    } catch (err) {
      setError('Error updating stock')
      throw err
    }
  }

  const addMedication = async (medicationData: Omit<Medication, 'id'>) => {
    try {
      const newMedication: Medication = {
        ...medicationData,
        id: `med-${Date.now()}`
      }
      setMedications(prev => [...prev, newMedication])
      return newMedication
    } catch (err) {
      setError('Error adding medication')
      throw err
    }
  }

  const updateMedication = async (id: string, updates: Partial<Medication>) => {
    try {
      setMedications(prev => 
        prev.map(med => 
          med.id === id 
            ? { ...med, ...updates }
            : med
        )
      )
    } catch (err) {
      setError('Error updating medication')
      throw err
    }
  }

  const createOrder = async (orderData: Omit<PharmacyOrder, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newOrder: PharmacyOrder = {
        ...orderData,
        id: `order-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setOrders(prev => [...prev, newOrder])
      
      // Update medication stock
      for (const item of orderData.items) {
        await updateMedicationStock(item.medicationId, 
          medications.find(m => m.id === item.medicationId)!.stock - item.quantity
        )
      }
      
      return newOrder
    } catch (err) {
      setError('Error creating order')
      throw err
    }
  }

  const updateOrderStatus = async (orderId: string, status: PharmacyOrder['status']) => {
    try {
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status, updatedAt: new Date() }
            : order
        )
      )
    } catch (err) {
      setError('Error updating order status')
      throw err
    }
  }

  const getOrdersByStatus = (status: PharmacyOrder['status']) => {
    return orders.filter(order => order.status === status)
  }

  const getOrdersByClient = (clientId: string) => {
    return orders.filter(order => order.clientId === clientId)
  }

  const verifyPrescription = async (orderId: string, notes?: string) => {
    try {
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status: 'verified', 
                verificationNotes: notes,
                updatedAt: new Date() 
              }
            : order
        )
      )
    } catch (err) {
      setError('Error verifying prescription')
      throw err
    }
  }

  const getMedicationCategories = () => {
    const categories = new Set(medications.map(med => med.category))
    return Array.from(categories)
  }

  return {
    medications,
    orders,
    loading,
    error,
    searchMedications,
    getMedicationsByCategory,
    getLowStockMedications,
    getExpiringSoonMedications,
    updateMedicationStock,
    addMedication,
    updateMedication,
    createOrder,
    updateOrderStatus,
    getOrdersByStatus,
    getOrdersByClient,
    verifyPrescription,
    getMedicationCategories
  }
} 