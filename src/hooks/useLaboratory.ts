import { useState, useEffect } from 'react';
import { labTests, labOrders, labTechnicians } from '@/data/mockData';
import type { LabTest, LabOrder, LabTechnician } from '@/types';

export const useLaboratory = () => {
  const [availableTests, setAvailableTests] = useState<LabTest[]>(labTests);
  const [orders, setOrders] = useState<LabOrder[]>(labOrders);
  const [technicians, setTechnicians] = useState<LabTechnician[]>(labTechnicians);
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData: Partial<LabOrder>) => {
    setLoading(true);
    try {
      // Validate required fields
      if (!orderData.patientId || !orderData.tests || !orderData.scheduledDate || !orderData.scheduledTime || orderData.cost === undefined) {
        throw new Error('Missing required fields for lab order');
      }

      const newOrder: LabOrder = {
        id: `order-${Date.now()}`,
        clientId: orderData.patientId,
        providerId: 'lab-provider-1',
        patientId: orderData.patientId,
        doctorId: orderData.doctorId || '',
        technicianId: orderData.technicianId,
        tests: orderData.tests,
        collectionType: 'home',
        scheduledDate: new Date(orderData.scheduledDate),
        scheduledTime: orderData.scheduledTime,
        status: 'ordered',
        priority: orderData.priority || 'normal',
        sampleType: orderData.sampleType || 'blood',
        totalCost: orderData.cost,
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: LabOrder['status']) => {
    setLoading(true);
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() }
          : order
      ));
    } finally {
      setLoading(false);
    }
  };

  const assignTechnician = async (orderId: string, technicianId: string) => {
    setLoading(true);
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, technicianId, updatedAt: new Date() }
          : order
      ));
    } finally {
      setLoading(false);
    }
  };

  const updateSampleCollection = async (orderId: string, collectionDate: Date) => {
    setLoading(true);
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              collectionDate, 
              status: 'collected',
              updatedAt: new Date() 
            }
          : order
      ));
    } finally {
      setLoading(false);
    }
  };

  const addTestResults = async (orderId: string, results: LabOrder['results']) => {
    setLoading(true);
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              results, 
              status: 'completed',
              resultDate: new Date(),
              updatedAt: new Date() 
            }
          : order
      ));
    } finally {
      setLoading(false);
    }
  };

  const searchTests = (query: string) => {
    return availableTests.filter(test => 
      test.name.toLowerCase().includes(query.toLowerCase()) ||
      test.category.toLowerCase().includes(query.toLowerCase()) ||
      test.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getOrdersByStatus = (status: LabOrder['status']) => {
    return orders.filter(order => order.status === status);
  };

  const getOrdersByPatient = (patientId: string) => {
    return orders.filter(order => order.patientId === patientId);
  };

  const getOrdersByDoctor = (doctorId: string) => {
    return orders.filter(order => order.doctorId === doctorId);
  };

  const getOrdersByTechnician = (technicianId: string) => {
    return orders.filter(order => order.technicianId === technicianId);
  };

  const getOrdersByPriority = (priority: LabOrder['priority']) => {
    return orders.filter(order => order.priority === priority);
  };

  const getAvailableTechnicians = (specialization?: string) => {
    if (!specialization) return technicians.filter(tech => tech.availability);
    
    return technicians.filter(tech => 
      tech.specializations.includes(specialization) && tech.availability
    );
  };

  const getTestsByCategory = (category: string) => {
    return availableTests.filter(test => test.category === category);
  };

  const calculateOrderCost = (testIds: string[]) => {
    return testIds.reduce((total, testId) => {
      const test = availableTests.find(t => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const getPendingOrders = () => {
    return orders.filter(order => 
      ['ordered', 'collected', 'processing'].includes(order.status)
    );
  };

  const getCompletedOrders = () => {
    return orders.filter(order => order.status === 'completed');
  };

  return {
    availableTests,
    orders,
    technicians,
    loading,
    createOrder,
    updateOrderStatus,
    assignTechnician,
    updateSampleCollection,
    addTestResults,
    searchTests,
    getOrdersByStatus,
    getOrdersByPatient,
    getOrdersByDoctor,
    getOrdersByTechnician,
    getOrdersByPriority,
    getAvailableTechnicians,
    getTestsByCategory,
    calculateOrderCost,
    getPendingOrders,
    getCompletedOrders
  };
}; 