'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { 
  PharmacyUser, 
  PharmacyOrder, 
  PharmacyMedication, 
  PharmacyStats,
  PharmacyCourier,
  PharmacyConfig
} from '@/types/providers/pharmacy.types'

interface PharmacyState {
  user: PharmacyUser | null
  orders: PharmacyOrder[]
  medications: PharmacyMedication[]
  couriers: PharmacyCourier[]
  stats: PharmacyStats | null
  config: PharmacyConfig | null
  loading: boolean
  error: string | null
}

type PharmacyAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: PharmacyUser | null }
  | { type: 'SET_ORDERS'; payload: PharmacyOrder[] }
  | { type: 'SET_MEDICATIONS'; payload: PharmacyMedication[] }
  | { type: 'SET_COURIERS'; payload: PharmacyCourier[] }
  | { type: 'SET_STATS'; payload: PharmacyStats }
  | { type: 'SET_CONFIG'; payload: PharmacyConfig }
  | { type: 'ADD_ORDER'; payload: PharmacyOrder }
  | { type: 'UPDATE_ORDER'; payload: { id: string; updates: Partial<PharmacyOrder> } }
  | { type: 'UPDATE_MEDICATION'; payload: { id: string; updates: Partial<PharmacyMedication> } }
  | { type: 'ADD_MEDICATION'; payload: PharmacyMedication }

const initialState: PharmacyState = {
  user: null,
  orders: [],
  medications: [],
  couriers: [],
  stats: null,
  config: null,
  loading: false,
  error: null
}

const pharmacyReducer = (state: PharmacyState, action: PharmacyAction): PharmacyState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload }
    
    case 'SET_MEDICATIONS':
      return { ...state, medications: action.payload }
    
    case 'SET_COURIERS':
      return { ...state, couriers: action.payload }
    
    case 'SET_STATS':
      return { ...state, stats: action.payload }
    
    case 'SET_CONFIG':
      return { ...state, config: action.payload }
    
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] }
    
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, ...action.payload.updates }
            : order
        )
      }
    
    case 'UPDATE_MEDICATION':
      return {
        ...state,
        medications: state.medications.map(medication =>
          medication.id === action.payload.id
            ? { ...medication, ...action.payload.updates }
            : medication
        )
      }
    
    case 'ADD_MEDICATION':
      return { ...state, medications: [action.payload, ...state.medications] }
    
    default:
      return state
  }
}

interface PharmacyContextType {
  state: PharmacyState
  // Orders
  loadOrders: () => Promise<void>
  createOrder: (order: Omit<PharmacyOrder, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateOrder: (id: string, updates: Partial<PharmacyOrder>) => Promise<void>
  verifyPrescription: (orderId: string, prescriptionId: string) => Promise<void>
  
  // Medications
  loadMedications: () => Promise<void>
  addMedication: (medication: Omit<PharmacyMedication, 'id' | 'pharmacyId'>) => Promise<void>
  updateMedication: (id: string, updates: Partial<PharmacyMedication>) => Promise<void>
  checkLowStock: () => Promise<PharmacyMedication[]>
  
  // Couriers
  loadCouriers: () => Promise<void>
  assignCourier: (orderId: string, courierId: string) => Promise<void>
  
  // Stats and Reports
  loadStats: () => Promise<void>
  generateReport: (type: string, period: string) => Promise<any>
  
  // Configuration
  loadConfig: () => Promise<void>
  updateConfig: (updates: Partial<PharmacyConfig>) => Promise<void>
}

const PharmacyContext = createContext<PharmacyContextType | null>(null)

export const usePharmacy = () => {
  const context = useContext(PharmacyContext)
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider')
  }
  return context
}

interface PharmacyProviderProps {
  children: ReactNode
  pharmacyId: string
}

export const PharmacyProvider: React.FC<PharmacyProviderProps> = ({
  children,
  pharmacyId
}) => {
  const [state, dispatch] = useReducer(pharmacyReducer, initialState)

  // API calls - replace with actual implementations
  const loadOrders = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockOrders: PharmacyOrder[] = [
        {
          id: 'ORD-001',
          clientId: 'CLI-001',
          clientName: 'Juan Pérez',
          clientPhone: '+505 8888-1234',
          pharmacyId,
          items: [],
          subtotal: 150,
          deliveryFee: 25,
          total: 175,
          status: 'pending',
          paymentStatus: 'pending',
          deliveryAddress: {
            street: 'Calle Principal 123',
            city: 'Managua',
            state: 'Managua',
            postalCode: '12345',
            country: 'Nicaragua'
          },
          estimatedDelivery: new Date(Date.now() + 86400000),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      dispatch({ type: 'SET_ORDERS', payload: mockOrders })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading orders' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const createOrder = async (orderData: Omit<PharmacyOrder, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Mock API call
      const newOrder: PharmacyOrder = {
        ...orderData,
        id: `ORD-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dispatch({ type: 'ADD_ORDER', payload: newOrder })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error creating order' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateOrder = async (id: string, updates: Partial<PharmacyOrder>) => {
    try {
      // Mock API call
      const updatedData = { ...updates, updatedAt: new Date() }
      dispatch({ type: 'UPDATE_ORDER', payload: { id, updates: updatedData } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error updating order' })
    }
  }

  const verifyPrescription = async (orderId: string, prescriptionId: string) => {
    try {
      // Mock verification logic
      await new Promise(resolve => setTimeout(resolve, 500))
      dispatch({ 
        type: 'UPDATE_ORDER', 
        payload: { 
          id: orderId, 
          updates: { 
            status: 'verified',
            verifiedBy: state.user?.id || 'current-user',
            updatedAt: new Date()
          } 
        } 
      })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error verifying prescription' })
    }
  }

  const loadMedications = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Mock API call
      const mockMedications: PharmacyMedication[] = [
        {
          id: 'MED-001',
          name: 'Ibuprofeno',
          brand: 'Advil',
          category: 'Analgésicos',
          description: 'Antiinflamatorio no esteroideo',
          activeIngredient: 'Ibuprofeno',
          concentration: '400mg',
          form: 'tablet',
          price: 15,
          stock: 25,
          minStock: 50,
          maxStock: 200,
          requiresPrescription: false,
          batchNumber: 'BATCH-001',
          manufacturingDate: new Date('2024-01-01'),
          expiryDate: new Date('2026-01-01'),
          manufacturer: 'Laboratorio ABC',
          location: 'Estante A-1',
          isActive: true,
          pharmacyId
        }
      ]
      dispatch({ type: 'SET_MEDICATIONS', payload: mockMedications })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading medications' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addMedication = async (medicationData: Omit<PharmacyMedication, 'id' | 'pharmacyId'>) => {
    try {
      const newMedication: PharmacyMedication = {
        ...medicationData,
        id: `MED-${Date.now()}`,
        pharmacyId
      }
      dispatch({ type: 'ADD_MEDICATION', payload: newMedication })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error adding medication' })
    }
  }

  const updateMedication = async (id: string, updates: Partial<PharmacyMedication>) => {
    try {
      dispatch({ type: 'UPDATE_MEDICATION', payload: { id, updates } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error updating medication' })
    }
  }

  const checkLowStock = async (): Promise<PharmacyMedication[]> => {
    return state.medications.filter(med => med.stock <= med.minStock)
  }

  const loadCouriers = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Mock API call
      const mockCouriers: PharmacyCourier[] = [
        {
          id: 'COU-001',
          name: 'Carlos Mendoza',
          email: 'carlos@courier.com',
          phone: '+505 8888-9999',
          vehicleType: 'Motocicleta',
          vehiclePlate: 'M-123-456',
          isAvailable: true,
          rating: 4.8,
          deliveriesCompleted: 150,
          pharmacyId,
          createdAt: new Date()
        }
      ]
      dispatch({ type: 'SET_COURIERS', payload: mockCouriers })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading couriers' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const assignCourier = async (orderId: string, courierId: string) => {
    try {
      dispatch({ 
        type: 'UPDATE_ORDER', 
        payload: { 
          id: orderId, 
          updates: { 
            courierId,
            status: 'dispatched',
            updatedAt: new Date()
          } 
        } 
      })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error assigning courier' })
    }
  }

  const loadStats = async () => {
    try {
      // Mock stats
      const mockStats: PharmacyStats = {
        totalOrders: 1250,
        pendingOrders: 25,
        completedOrders: 1180,
        totalRevenue: 125000,
        lowStockItems: state.medications.filter(med => med.stock <= med.minStock).length,
        topSellingMedications: [
          { name: 'Ibuprofeno 400mg', quantity: 150, revenue: 3500 },
          { name: 'Paracetamol 500mg', quantity: 120, revenue: 2800 }
        ],
        recentActivity: []
      }
      dispatch({ type: 'SET_STATS', payload: mockStats })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading stats' })
    }
  }

  const generateReport = async (type: string, period: string) => {
    // Mock report generation
    return { type, period, data: {} }
  }

  const loadConfig = async () => {
    try {
      // Mock config loading
      const mockConfig: PharmacyConfig = {
        id: 'CONFIG-001',
        pharmacyId,
        businessName: 'Farmacia Central',
        description: 'Farmacia de confianza',
        address: {
          street: 'Calle Principal 123',
          city: 'Managua',
          state: 'Managua',
          postalCode: '12345',
          country: 'Nicaragua'
        },
        serviceRadius: 10,
        operatingHours: {
          monday: { start: '08:00', end: '20:00', isOpen: true },
          tuesday: { start: '08:00', end: '20:00', isOpen: true },
          wednesday: { start: '08:00', end: '20:00', isOpen: true },
          thursday: { start: '08:00', end: '20:00', isOpen: true },
          friday: { start: '08:00', end: '20:00', isOpen: true },
          saturday: { start: '08:00', end: '18:00', isOpen: true },
          sunday: { start: '10:00', end: '16:00', isOpen: true }
        },
        contactInfo: {
          email: 'info@farmacia.com',
          phone: '+505 2222-3333',
          emergencyContact: '+505 8888-0000'
        },
        deliverySettings: {
          minOrderValue: 100,
          deliveryFee: 25,
          freeDeliveryThreshold: 500,
          maxDeliveryDistance: 15,
          estimatedDeliveryTime: 60
        },
        prescriptionSettings: {
          requireVerification: true,
          digitalPrescriptionAccepted: true,
          allowPartialDispensing: false
        },
        paymentSettings: {
          acceptedMethods: ['cash', 'card', 'transfer'],
          requirePaymentBeforeDelivery: false
        },
        notificationSettings: {
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true,
          orderAlerts: true,
          stockAlerts: true
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dispatch({ type: 'SET_CONFIG', payload: mockConfig })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error loading config' })
    }
  }

  const updateConfig = async (updates: Partial<PharmacyConfig>) => {
    try {
      if (state.config) {
        const updatedConfig = { ...state.config, ...updates, updatedAt: new Date() }
        dispatch({ type: 'SET_CONFIG', payload: updatedConfig })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error updating config' })
    }
  }

  useEffect(() => {
    // Initialize pharmacy data
    loadOrders()
    loadMedications()
    loadCouriers()
    loadStats()
    loadConfig()
  }, [pharmacyId])

  const contextValue: PharmacyContextType = {
    state,
    loadOrders,
    createOrder,
    updateOrder,
    verifyPrescription,
    loadMedications,
    addMedication,
    updateMedication,
    checkLowStock,
    loadCouriers,
    assignCourier,
    loadStats,
    generateReport,
    loadConfig,
    updateConfig
  }

  return (
    <PharmacyContext.Provider value={contextValue}>
      {children}
    </PharmacyContext.Provider>
  )
} 