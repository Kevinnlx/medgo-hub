import { useState, useEffect } from 'react';
import { medicalRecords, sharedRecords } from '@/data/mockData';
import type { MedicalRecord, SharedRecord, User } from '@/types';

export const useMedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(medicalRecords);
  const [sharedRecordsList, setSharedRecordsList] = useState<SharedRecord[]>(sharedRecords);
  const [loading, setLoading] = useState(false);

  const createRecord = async (recordData: Partial<MedicalRecord>) => {
    setLoading(true);
    try {
      // Validate required fields
      if (!recordData.patientId || !recordData.patientName || !recordData.dateOfBirth || 
          !recordData.bloodType || !recordData.doctorId || !recordData.attendingPhysician || 
          !recordData.diagnosis || !recordData.treatment) {
        throw new Error('Missing required fields for medical record');
      }

      const newRecord: MedicalRecord = {
        id: `record-${Date.now()}`,
        patientId: recordData.patientId,
        patientName: recordData.patientName,
        dateOfBirth: new Date(recordData.dateOfBirth),
        bloodType: recordData.bloodType,
        doctorId: recordData.doctorId,
        attendingPhysician: recordData.attendingPhysician,
        date: new Date(),
        diagnosis: recordData.diagnosis,
        symptoms: recordData.symptoms || [],
        treatment: recordData.treatment,
        followUpRequired: recordData.followUpRequired || false,
        confidentialityLevel: recordData.confidentialityLevel || 'medium',
        status: 'active',
        lastUpdate: new Date(),
        totalEntries: 1,
        createdDate: new Date(),
        type: recordData.type || 'consultation',
        title: recordData.title || 'Medical Record',
        content: recordData.content || '',
        attachments: recordData.attachments || [],
        tags: recordData.tags || [],
        createdBy: recordData.createdBy || '',
        updatedBy: recordData.updatedBy || '',
        accessLevel: recordData.accessLevel || 'private',
        relatedServices: recordData.relatedServices || [],
        vitals: recordData.vitals,
        medications: recordData.medications || [],
        conditions: recordData.conditions || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setRecords(prev => [newRecord, ...prev]);
      return newRecord;
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (recordId: string, updates: Partial<MedicalRecord>) => {
    setLoading(true);
    try {
      setRecords(prev => prev.map(record => 
        record.id === recordId 
          ? { ...record, ...updates, updatedAt: new Date() }
          : record
      ));
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (recordId: string) => {
    setLoading(true);
    try {
      setRecords(prev => prev.filter(record => record.id !== recordId));
      // Also remove any shared records
      setSharedRecordsList(prev => prev.filter(shared => shared.recordId !== recordId));
    } finally {
      setLoading(false);
    }
  };

  const shareRecord = async (recordId: string, shareData: Partial<SharedRecord>) => {
    setLoading(true);
    try {
      const newShare: SharedRecord = {
        id: `sr_${Date.now()}`,
        recordId,
        sharedBy: shareData.sharedBy || '',
        sharedWith: shareData.sharedWith || '',
        accessLevel: shareData.accessLevel || 'read',
        expiresAt: shareData.expiresAt,
        purpose: shareData.purpose || '',
        isActive: true,
        createdAt: new Date()
      };
      
      setSharedRecordsList(prev => [newShare, ...prev]);
      return newShare;
    } finally {
      setLoading(false);
    }
  };

  const revokeAccess = async (shareId: string) => {
    setLoading(true);
    try {
      setSharedRecordsList(prev => prev.map(share => 
        share.id === shareId 
          ? { ...share, isActive: false }
          : share
      ));
    } finally {
      setLoading(false);
    }
  };

  const addAttachment = async (recordId: string, attachment: string) => {
    setLoading(true);
    try {
      setRecords(prev => prev.map(record => 
        record.id === recordId 
          ? { 
              ...record, 
              attachments: [...(record.attachments || []), attachment],
              updatedAt: new Date() 
            }
          : record
      ));
    } finally {
      setLoading(false);
    }
  };

  const removeAttachment = async (recordId: string, attachmentIndex: number) => {
    setLoading(true);
    try {
      setRecords(prev => prev.map(record => 
        record.id === recordId 
          ? { 
              ...record, 
              attachments: (record.attachments || []).filter((_, index) => index !== attachmentIndex),
              updatedAt: new Date() 
            }
          : record
      ));
    } finally {
      setLoading(false);
    }
  };

  const getRecordsByPatient = (patientId: string) => {
    return records.filter(record => record.patientId === patientId);
  };

  const getRecordsByType = (type: MedicalRecord['type']) => {
    return records.filter(record => record.type === type);
  };

  const getRecordsByService = (service: string) => {
    return records.filter(record => 
      record.relatedServices && record.relatedServices.includes(service)
    );
  };

  const getSharedRecords = (userId: string) => {
    const activeShares = sharedRecordsList.filter(share => 
      share.sharedWith === userId && 
      share.isActive &&
      (!share.expiresAt || new Date(share.expiresAt) > new Date())
    );
    
    return activeShares.map(share => {
      const record = records.find(r => r.id === share.recordId);
      return record ? { ...record, shareInfo: share } : null;
    }).filter(Boolean);
  };

  const getRecordsSharedBy = (userId: string) => {
    return sharedRecordsList.filter(share => 
      share.sharedBy === userId && share.isActive
    );
  };

  const searchRecords = (query: string, patientId?: string) => {
    let filteredRecords = records;
    
    if (patientId) {
      filteredRecords = filteredRecords.filter(record => record.patientId === patientId);
    }
    
    return filteredRecords.filter(record => 
      (record.title && record.title.toLowerCase().includes(query.toLowerCase())) ||
      (record.content && record.content.toLowerCase().includes(query.toLowerCase())) ||
      (record.tags && record.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
  };

  const getRecordsByDateRange = (startDate: Date, endDate: Date, patientId?: string) => {
    let filteredRecords = records;
    
    if (patientId) {
      filteredRecords = filteredRecords.filter(record => record.patientId === patientId);
    }
    
    return filteredRecords.filter(record => {
      if (!record.createdAt) return false;
      const recordDate = new Date(record.createdAt);
      return recordDate >= startDate && recordDate <= endDate;
    });
  };

  const getRecordsByAccessLevel = (accessLevel: MedicalRecord['accessLevel']) => {
    return records.filter(record => record.accessLevel === accessLevel);
  };

  const hasAccess = (recordId: string, userId: string, requiredLevel: 'read' | 'write' = 'read') => {
    const record = records.find(r => r.id === recordId);
    if (!record) return false;
    
    // Owner always has access
    if (record.createdBy === userId) return true;
    
    // Check shared access
    const share = sharedRecordsList.find(s => 
      s.recordId === recordId && 
      s.sharedWith === userId && 
      s.isActive &&
      (!s.expiresAt || new Date(s.expiresAt) > new Date())
    );
    
    if (!share) return false;
    
    if (requiredLevel === 'write') {
      return share.accessLevel === 'write';
    }
    
    return true;
  };

  const getPatientSummary = (patientId: string) => {
    const patientRecords = getRecordsByPatient(patientId);
    
    const summary = {
      totalRecords: patientRecords.length,
      recordsByType: {} as Record<string, number>,
      recentRecords: patientRecords
        .filter(record => record.createdAt)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
        .slice(0, 5),
      allergies: [] as string[],
      medications: [] as string[],
      conditions: [] as string[]
    };
    
    patientRecords.forEach(record => {
      if (record.type) {
        summary.recordsByType[record.type] = (summary.recordsByType[record.type] || 0) + 1;
      }
      if (record.allergies) {
        summary.allergies.push(...record.allergies);
      }
      if (record.medications) {
        summary.medications.push(...record.medications.map(med => med.name));
      }
      if (record.conditions) {
        summary.conditions.push(...record.conditions);
      }
    });
    
    // Remove duplicates
    summary.allergies = [...new Set(summary.allergies)];
    summary.medications = [...new Set(summary.medications)];
    summary.conditions = [...new Set(summary.conditions)];
    
    return summary;
  };

  return {
    records,
    sharedRecordsList,
    loading,
    createRecord,
    updateRecord,
    deleteRecord,
    shareRecord,
    revokeAccess,
    addAttachment,
    removeAttachment,
    getRecordsByPatient,
    getRecordsByType,
    getRecordsByService,
    getSharedRecords,
    getRecordsSharedBy,
    searchRecords,
    getRecordsByDateRange,
    getRecordsByAccessLevel,
    hasAccess,
    getPatientSummary
  };
}; 