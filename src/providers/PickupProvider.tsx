import React, { createContext, useContext, useState, useEffect } from 'react';

import { DATA, WorkerStatus } from '@constant';
import { PickupContextProps, ProviderProps, WorkerRequest, PickupRequest } from '@types';
import { getDriverPickupRequests, updatePickupRequestStatus } from '@api';
import { useAuth } from './AuthProvider';

const PickupContext = createContext<PickupContextProps | undefined>(undefined);

export const usePickup = () => {
  const context = useContext(PickupContext);
  if (!context) {
    throw new Error('usePickup must be used within a PickupProvider');
  }
  return context;
};

export const PickupProvider: React.FC<ProviderProps> = ({ children }) => {
  const { userInfo } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [workerRequests, setWorkerRequests] = useState<WorkerRequest[]>([]);
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<WorkerRequest | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  // Load pickup requests for drivers
  const loadPickupRequests = async () => {
    if (!userInfo?.id) return;
    
    try {
      setLoading(true);
      const response = await getDriverPickupRequests(1, 50);
      if (response.success) {
        setPickupRequests(response.data.requests);
        // Convert pickup requests to WorkerRequest format for UI compatibility
        const convertedRequests: WorkerRequest[] = response.data.requests.map((req: PickupRequest) => ({
          id: req.id.toString(),
          name: `${req.worker.first_name} ${req.worker.last_name}`,
          phone: req.worker.phone || req.worker.mobile || '',
          address: req.destination,
          project: req.project.name,
          time: req.pickup_time,
          date: req.pickup_date,
          status: req.status,
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          // Additional fields for pickup requests
          driver_name: `${req.driver.first_name} ${req.driver.last_name}`,
          vehicle_number: req.vehicle_number || req.driver.vehicle_number,
          vehicle_color: req.vehicle_color || req.driver.vehicle_color,
          drop_off_time: req.drop_off_time,
          created_at: req.created_at,
          updated_at: req.updated_at,
          // Fields needed for WorkRequestModal compatibility
          request_id: `PICKUP-${req.id}`, // Generate pickup request ID
          item: 'pickup_request', // Identify as pickup request
          notes: req.description || 'No description provided',
          driver_id: req.driver_id,
          // Timeline fields for pickup requests
          pickup_date_time: req.pickup_date ? `${req.pickup_time} | ${req.pickup_date}` : undefined,
          delivery_date_time: req.drop_off_time ? `${req.drop_off_time} | ${req.pickup_date}` : undefined,
        }));
        setWorkerRequests(convertedRequests);
      } else {
        setWorkerRequests([]);
      }
    } catch (error) {
      console.error('Error loading pickup requests:', error);
      // Fallback to static data if API fails
      setWorkerRequests(DATA.pickupWorker as WorkerRequest[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPickupRequests();
  }, [userInfo?.id]);

  const filteredRequests = workerRequests.filter(request => {
    if (selectedFilter === 'All') return true;
    
    // Handle status mapping between UI filters and API status values
    const statusMap: Record<string, string[]> = {
      'Pending': ['pending', 'Pending'],
      'In-Progress': ['in_progress', 'In-Progress', 'in_progress'],
      'Completed': ['completed', 'Completed'],
      'Rejected': ['rejected', 'Rejected'],
    };
    
    const allowedStatuses = statusMap[selectedFilter] || [selectedFilter];
    return allowedStatuses.includes(request.status);
  });

  const updateRequestStatus = async (
    requestId: string,
    newStatus: WorkerRequest['status'],
  ) => {
    try {
      console.log(`🔄 Updating pickup request ${requestId} to status: ${newStatus}`);
      
      // Update via API
      const pickupRequest = pickupRequests.find(req => req.id.toString() === requestId);
      if (pickupRequest) {
        console.log(`📡 Calling API to update pickup request ${pickupRequest.id} to ${newStatus}`);
        
        await updatePickupRequestStatus(pickupRequest.id, {
          status: newStatus as 'pending' | 'in_progress' | 'completed' | 'rejected',
        });
        console.log(`✅ API update successful`);
      }
      
      // Update local state
      setWorkerRequests(prev =>
        prev.map(request =>
          request.id === requestId ? { ...request, status: newStatus } : request,
        ),
      );
      
      if (selectedWorker?.id === requestId) {
        console.log(`🔄 Updating selectedWorker status from ${selectedWorker.status} to ${newStatus}`);
        setSelectedWorker(prev => (prev ? { ...prev, status: newStatus } : null));
      }
      
      console.log(`✅ Status update completed for request ${requestId}`);
    } catch (error) {
      console.error('❌ Error updating pickup request status:', error);
    }
  };

  const openModal = (worker: WorkerRequest) => {
    setSelectedWorker(worker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <PickupContext.Provider
      value={{
        selectedFilter,
        workerRequests,
        filteredRequests,
        selectedWorker,
        modalVisible,
        loading,
        setSelectedFilter,
        updateRequestStatus,
        setSelectedWorker,
        openModal,
        closeModal,
        loadPickupRequests,
      }}>
      {children}
    </PickupContext.Provider>
  );
};
