import { useState, useEffect } from 'react'
import { Consultation } from '@/types'
import { mockConsultations } from '@/data/mockData'

export const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setConsultations(mockConsultations)
      } catch (err) {
        setError('Error loading consultations')
      } finally {
        setLoading(false)
      }
    }

    loadConsultations()
  }, [])

  const createConsultation = async (consultationData: Omit<Consultation, 'id'>) => {
    try {
      const newConsultation: Consultation = {
        ...consultationData,
        id: `cons-${Date.now()}`
      }
      setConsultations(prev => [...prev, newConsultation])
      return newConsultation
    } catch (err) {
      setError('Error creating consultation')
      throw err
    }
  }

  const updateConsultation = async (id: string, updates: Partial<Consultation>) => {
    try {
      setConsultations(prev => 
        prev.map(consultation => 
          consultation.id === id 
            ? { ...consultation, ...updates }
            : consultation
        )
      )
    } catch (err) {
      setError('Error updating consultation')
      throw err
    }
  }

  const deleteConsultation = async (id: string) => {
    try {
      setConsultations(prev => prev.filter(consultation => consultation.id !== id))
    } catch (err) {
      setError('Error deleting consultation')
      throw err
    }
  }

  const getConsultationsByDoctor = (doctorId: string) => {
    return consultations.filter(consultation => consultation.doctorId === doctorId)
  }

  const getConsultationsByPatient = (patientId: string) => {
    return consultations.filter(consultation => consultation.patientId === patientId)
  }

  const getConsultationsByStatus = (status: Consultation['status']) => {
    return consultations.filter(consultation => consultation.status === status)
  }

  const getConsultationsByType = (type: Consultation['type']) => {
    return consultations.filter(consultation => consultation.type === type)
  }

  const getTodaysConsultations = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return consultations.filter(consultation => {
      const consultationDate = new Date(consultation.date)
      consultationDate.setHours(0, 0, 0, 0)
      return consultationDate >= today && consultationDate < tomorrow
    })
  }

  return {
    consultations,
    loading,
    error,
    createConsultation,
    updateConsultation,
    deleteConsultation,
    getConsultationsByDoctor,
    getConsultationsByPatient,
    getConsultationsByStatus,
    getConsultationsByType,
    getTodaysConsultations
  }
} 