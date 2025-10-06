import React, { createContext, useContext, useEffect, useState } from 'react';

import { getStockRequests, getStockRequestDetails, getStockReplenishmentDetails, updateStockRequestItemStatus, updateReplenishmentItemStatus, StockRequest } from '@api';
import { WorkerStatus } from '@constant';
import { useAuth } from '@providers';
import { showFlash } from '@shared/utils/helpers';
import { isDriver } from '@utils/roleUtils';
import { ProviderProps, StockContextProps, WorkerRequest } from '@types';

// Helper function to generate generic status text
const getGenericStatusText = (status: string, requestType: 'stock' | 'replenishment'): string => {
  if (requestType === 'replenishment') {
    switch (status) {
      case 'picked_up': return 'Item(s) picked up from source';
      case 'in_transit': return 'Item(s) marked in transit';
      case 'delivered': return 'Item(s) have been delivered';
      case 'received': return 'Item(s) received and confirmed';
      default: return `Item(s) ${status}`;
    }
  } else {
    switch (status) {
      case 'picked_up': return 'Item(s) picked up from warehouse';
      case 'in_transit': return 'Item(s) marked in transit';
      case 'delivered': return 'Item(s) delivered to project site';
      case 'confirmed': return 'Item(s) received and confirmed';
      default: return `Item(s) ${status}`;
    }
  }
};

const StockContext = createContext<StockContextProps | undefined>(undefined);

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

export const StockProvider: React.FC<ProviderProps> = ({ children }) => {
  const { userInfo, authData } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [_stockRequests, setStockRequests] = useState<StockRequest[]>([]);
  const [workerRequests, setWorkerRequests] = useState<WorkerRequest[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<WorkerRequest | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // Complete status options matching web frontend
  const defaultStatusOptions = [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Picked Up', value: 'picked_up' },
    { label: 'In Transit', value: 'in_transit' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Picked by Driver', value: 'picked_by_driver' },
    { label: 'Stock Pending', value: 'stock_pending' }
  ];

  const [statusOptions, setStatusOptions] = useState<Array<{label: string, value: string}>>(defaultStatusOptions);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(false);

  // Check if current user is a driver
  const isDriverRole = isDriver(userInfo?.role);


  // Convert StockRequest to WorkerRequest format for compatibility
  const convertStockRequestToWorkerRequest = (stockRequest: StockRequest): WorkerRequest => {
    // Handle different data structures for stock requests vs replenishments
    const isReplenishment = stockRequest.request_type === 'replenishment';
    
    // Try different possible creator name fields
    let creatorName = 'Unknown Creator';
    if (stockRequest.creator_name) {
      creatorName = stockRequest.creator_name;
    } else if (stockRequest.creator?.first_name && stockRequest.creator?.last_name) {
      creatorName = `${stockRequest.creator.first_name} ${stockRequest.creator.last_name}`;
    } else if (stockRequest.creator?.username) {
      creatorName = stockRequest.creator.username;
    } else if (stockRequest.requestingStaff) {
      creatorName = stockRequest.requestingStaff;
    }
    
    const converted = {
      id: stockRequest.id.toString(),
      request_id: isReplenishment ? undefined : stockRequest.request_id, // Only for stock requests
      replenishment_id: isReplenishment ? (stockRequest as any).replenishment_id : undefined, // Only for replenishments
      name: creatorName,
      phone: '', // Not available in stock request
      address: stockRequest.warehouse_name || 'Unknown Warehouse',
      project: isReplenishment ? 'Stock Replenishment' : (stockRequest.project_name || 'Unknown Project'),
      time: new Date(stockRequest.created_at).toLocaleTimeString(),
      date: new Date(stockRequest.created_at).toLocaleDateString(),
      status: stockRequest.status as WorkerStatus,
      avatar: '', // No avatar needed
      quantity: (stockRequest as any).total_quantity_requested?.toString() || stockRequest.items?.length?.toString() || '0',
      item: stockRequest.request_type || 'stock_request',
      // Include creator information with role
      creator: stockRequest.creator ? {
        id: stockRequest.creator.id,
        name: stockRequest.creator.name,
        email: stockRequest.creator.email,
        role: stockRequest.creator.role ? {
          id: stockRequest.creator.role.id,
          role_name: stockRequest.creator.role.role_name
        } : undefined,
        user_roles: stockRequest.creator.user_roles ? stockRequest.creator.user_roles.map(ur => ({
          id: ur.id,
          role: ur.role ? {
            id: ur.role.id,
            role_name: ur.role.role_name
          } : undefined
        })) : undefined
      } : undefined,
      items: (stockRequest.items || []).map(item => ({
        ...item,
        quantity_delivered: item.quantity_delivered !== undefined ? item.quantity_delivered : item.quantity_requested
      })),
    };
    return converted;
  };

  // Use predefined status options (matching web frontend)
  const loadStatusOptions = () => {
    setStatusOptions(defaultStatusOptions);
    console.log('✅ Status options set to predefined list:', defaultStatusOptions);
  };

  // Load all stock requests by fetching all pages
  const loadAllStockRequests = async () => {
    if (!authData.accessToken || !userInfo?.id) {
      console.log('🚫 Skipping API call - missing auth or userInfo');
      return;
    }
    
    setLoading(true);
    try {
      const allRequests: StockRequest[] = [];
      let currentPage = 1;
      let totalPages = 1;
      
      // Fetch all pages
      do {
        const requestParams = { 
          status: selectedFilter === 'All' ? undefined : selectedFilter.toLowerCase(),
          // Don't filter by driver_id for manager's view - show all requests
          page: currentPage,
          limit: 50 // Fetch 50 per page
        };
        
        console.log(`📄 Fetching page ${currentPage}...`);
        const response = await getStockRequests(requestParams, authData.accessToken);
        
        if (response.success) {
          allRequests.push(...response.data.requests);
          totalPages = response.data.totalPages;
          currentPage++;
          
        } else {
          break;
        }
      } while (currentPage <= totalPages);
      
      console.log(`🎉 Loaded all ${allRequests.length} requests across ${totalPages} pages`);
      
      setStockRequests(allRequests);
      const convertedRequests = allRequests.map(convertStockRequestToWorkerRequest);
      setWorkerRequests(convertedRequests);
      
      if (allRequests.length === 0) {
        showFlash({
          message: 'No Stock Requests Found',
          description: 'There are currently no stock requests to display.',
          type: 'info',
        });
      }
      
      // Update pagination state
      setCurrentPage(1);
      setTotalPages(totalPages);
      setTotalRequests(allRequests.length);
      setHasMorePages(false);
      
    } catch (error: any) {
      console.error('❌ Failed to load all stock requests:', error);
      showFlash({
        message: 'Failed to Load Stock Requests',
        description: error?.message || 'Could not load stock requests. Please check your permissions and try again.',
        type: 'danger',
      });
      setStockRequests([]);
      setWorkerRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Load stock requests from API (single page)
  const loadStockRequests = async () => {
    if (!authData.accessToken || !userInfo?.id) {
      console.log('🚫 Skipping API call - missing auth or userInfo:', {
        hasToken: !!authData.accessToken,
        userId: userInfo?.id,
        userInfo: userInfo
      });
      return;
    }
    
    setLoading(true);
    try {
      // Always use the general stock requests endpoint for filtering
      // This matches the web frontend behavior
      const requestParams = { 
        status: selectedFilter === 'All' ? undefined : selectedFilter.toLowerCase(),
        // Always filter by current user for mobile app - show their assigned requests
        driver_id: userInfo.id,
        // Increase limit to show more requests (mobile app should show more than 10)
        page: 1,
        limit: 50 // Increased from default 10 to 50 to show more requests
      };
      
      console.log('🔍 Making API call with driver filter:', {
        driver_id: userInfo.id,
        status: requestParams.status,
        userInfo: userInfo
      });
      
      const response = await getStockRequests(requestParams, authData.accessToken);

      if (response.success) {
        // Log the API response for debugging
        console.log('🔍 PULL-TO-REFRESH API RESPONSE:', response);
        
        // Update pagination state
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setTotalRequests(response.data.total);
        setHasMorePages(response.data.page < response.data.totalPages);
        
        setStockRequests(response.data.requests);
        // Convert to WorkerRequest format for compatibility
        const convertedRequests = response.data.requests.map(convertStockRequestToWorkerRequest);
        
        
        setWorkerRequests(convertedRequests);
        
        // Log if there are more pages available
        if (response.data.totalPages > 1) {
          // console.log('⚠️ There are more pages available:', {
          //   totalPages: response.data.totalPages,
          //   currentPage: response.data.page,
          //   totalRequests: response.data.total
          // });
        }
      }
    } catch (error: any) {
      showFlash({
        message: 'Failed to load stock requests',
        description: error?.message || 'Something went wrong',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };


  // Load status options when component mounts
  useEffect(() => {
    loadStatusOptions();
  }, []);

  // Load filtered data when filter changes - but only if we're on a stock screen
  // This prevents unnecessary API calls when user is on dashboard or other screens
  useEffect(() => {
    // Only load data if we're actually on a stock-related screen
    // This will be controlled by the individual containers
  }, [selectedFilter, authData.accessToken, userInfo?.id]);

  // Function to filter requests by creator role
  const filterRequestsByCreatorRole = (requests: WorkerRequest[], allowedRoles: string[] = []) => {
    if (allowedRoles.length === 0) {
      return requests; // No role filtering, return all requests
    }
    
    // console.log('🔍 Filtering requests by role:', {
    //   totalRequests: requests.length,
    //   allowedRoles: allowedRoles,
    //   sampleRequest: requests[0] ? {
    //     id: requests[0].id,
    //     creator: requests[0].creator,
    //     hasRole: !!requests[0].creator?.role,
    //     hasUserRoles: !!requests[0].creator?.user_roles,
    //     userRolesLength: requests[0].creator?.user_roles?.length || 0
    //   } : 'No requests'
    // });
    
    const filtered = requests.filter(request => {
      // Check if the request has creator role information
      // Handle both old structure (creator.role) and new structure (creator.user_roles[0].role)
      let creatorRole = null;
      if (request.creator?.role?.role_name) {
        creatorRole = request.creator.role.role_name.toLowerCase();
      } else if (request.creator?.user_roles?.[0]?.role?.role_name) {
        creatorRole = request.creator.user_roles[0].role.role_name.toLowerCase();
      }
      
      // Check if any of the allowed role keywords are contained in the creator's role name
      const isAllowed = creatorRole && allowedRoles.some(allowedRole => 
        creatorRole.includes(allowedRole.toLowerCase())
      );
      
      if (requests.length <= 3) { // Only log for first few requests to avoid spam
        // console.log('🔍 Role check:', {
        //   requestId: request.id,
        //   creatorRole: creatorRole,
        //   allowedRoles: allowedRoles,
        //   isAllowed: isAllowed,
        //   creator: request.creator
        // });
      }
      
      return isAllowed;
    });
    
    // console.log('✅ Filtering result:', {
    //   originalCount: requests.length,
    //   filteredCount: filtered.length,
    //   allowedRoles: allowedRoles
    // });
    
    return filtered;
  };

  const filteredRequests = workerRequests.filter(request => {
    // First apply status filter
    let statusMatch = true;
    if (selectedFilter === 'All') {
      statusMatch = true;
    } else {
      // For all other filters, compare directly with the filter value
      statusMatch = request.status === selectedFilter;
    }

    // Then apply role-based filtering based on screen context
    // This will be controlled by the individual containers
    return statusMatch;
  });

  const updateRequestStatus = async (
    requestId: string,
    newStatus: string,
    notes?: string,
  ) => {
    try {
      const stockRequestId = parseInt(requestId);
      
      // Find the current request to determine if it's a replenishment
      const currentRequest = workerRequests.find(req => req.id === requestId);
      const isReplenishment = currentRequest?.item === 'replenishment';
      
      console.log('🔄 Updating status:', {
        requestId,
        newStatus,
        isReplenishment,
        currentRequest: currentRequest?.item
      });

      // Use different API endpoints based on request type (like web frontend)
      let response;
      if (isReplenishment) {
        // For replenishments, we need to update all items individually
        if (!currentRequest?.items || currentRequest.items.length === 0) {
          showFlash({
            message: 'No items found in this replenishment',
            type: 'warning',
          });
          return;
        }
        
        // Update all items in the replenishment
        const promises = currentRequest.items.map(item => {
          // Create payload based on status (like web frontend)
          let payload: any = {
            status: newStatus,
            notes: notes || getGenericStatusText(newStatus, 'replenishment')
          };
          
          // Add appropriate quantity fields based on status
          if (newStatus === 'picked_up') {
            payload.quantity_picked_up = item.quantity_requested;
          } else if (newStatus === 'delivered') {
            payload.quantity_delivered = item.quantity_requested;
          }
          
          // Map 'completed' status to 'received' for replenishment requests (like web frontend)
          if (newStatus === 'completed') {
            payload.status = 'received';
          }
          
          return updateReplenishmentItemStatus(
            stockRequestId,
            item.id,
            payload,
            authData.accessToken
          );
        });
        
        const responses = await Promise.all(promises);
        response = { success: responses.every(r => r.success) };
      } else {
        // For stock requests, we need to update all items individually
        if (!currentRequest?.items || currentRequest.items.length === 0) {
          showFlash({
            message: 'No items found in this request',
            type: 'warning',
          });
          return;
        }
        
        // Update all items in the stock request
        const promises = currentRequest.items.map(item => {
          // Create payload based on status (like web frontend)
          let payload: any = {
            status: newStatus,
            notes: notes || getGenericStatusText(newStatus, 'stock')
          };
          
          // Add appropriate quantity fields based on status (like web frontend)
          if (newStatus === 'picked_up') {
            payload.quantity_delivered = item.quantity_requested;
          } else if (newStatus === 'delivered') {
            payload.quantity_delivered = item.quantity_requested;
          }
          
          return updateStockRequestItemStatus(
            stockRequestId,
            item.id,
            payload,
            authData.accessToken
          );
        });
        
        const responses = await Promise.all(promises);
        response = { success: responses.every(r => r.success) };
      }

      if (response.success) {
        // Instead of updating local state, reload the data to get the actual status from the database
        // This ensures we show the correct request-level status that the backend calculated
        console.log(`✅ Status update successful: ${requestId} -> ${newStatus}${notes ? ` (notes: ${notes})` : ''}`);
        
        // Reload the stock requests to get the updated status from the database
        await loadStockRequests();
        
        // Close the modal after successful status update
        setModalVisible(false);
        setSelectedWorker(null);
        
        showFlash({
          message: `${isReplenishment ? 'Replenishment' : 'Request'} status updated successfully`,
          type: 'success',
        });
      }
    } catch (error: any) {
      console.error('❌ Status update error:', error);
      showFlash({
        message: 'Failed to update request status',
        description: error?.message || 'Something went wrong',
        type: 'danger',
      });
    }
  };

  const openModal = async (worker: WorkerRequest) => {
    // Set the worker first, then load detailed info, then open modal
    setSelectedWorker(worker);
    await loadDetailedRequestInfo(worker);
    setModalVisible(true);
  };

  const loadDetailedRequestInfo = async (worker: WorkerRequest) => {
    if (!authData.accessToken) return;
    
    setLoading(true);
    try {
      const requestId = parseInt(worker.id);
      const isReplenishment = worker.item === 'replenishment';
      
      let response;
      if (isReplenishment) {
        // Call replenishment details API
        response = await getStockReplenishmentDetails(requestId, authData.accessToken);
      } else {
        // Call stock request details API
        response = await getStockRequestDetails(requestId, authData.accessToken);
      }

      if (response.success && response.data) {
        const detailedData = response.data;
        
        // Update the selected worker with detailed information
        const updatedWorker: WorkerRequest = {
          ...worker,
          // Update items with detailed data and initialize quantity_delivered
          items: (detailedData.items || []).map(item => ({
            ...item,
            quantity_delivered: item.quantity_delivered !== undefined ? item.quantity_delivered : item.quantity_requested
          })),
          // Update other fields that might be more detailed in the detailed API
          project: isReplenishment ? 'Stock Replenishment' : (detailedData.project_name || worker.project),
          address: detailedData.warehouse_name || worker.address,
          name: detailedData.creator?.first_name + ' ' + detailedData.creator?.last_name || 
                detailedData.creator?.username || 
                detailedData.creator_name || 
                worker.name,
          // Pass through timeline timestamp fields for timeline
          driver_id: detailedData.driver_id,
          driver_name: detailedData.driver_name,
          driver_pickup_confirmation: detailedData.driver_pickup_confirmation,
          pickup_date_time: detailedData.pickup_date_time,
          pickup_notes: detailedData.pickup_notes,
          in_transit_date_time: detailedData.in_transit_date_time,
          driver_delivery_confirmation: detailedData.driver_delivery_confirmation,
          delivery_date_time: detailedData.delivery_date_time,
          delivery_notes: detailedData.delivery_notes,
          in_transit_notes: detailedData.in_transit_notes,
          worker_confirmation: detailedData.worker_confirmation,
          completion_date_time: detailedData.completion_date_time,
          completion_notes: detailedData.completion_notes,
          notes: detailedData.notes, // Main request-level notes
          created_at: detailedData.created_at,
          updated_at: detailedData.updated_at,
          // Timeline specific timestamps (from backend)
          driverAssignedAt: detailedData.driverAssignedAt,
          inTransitAt: detailedData.inTransitAt,
          completedAt: detailedData.completedAt,
        };
        
        setSelectedWorker(updatedWorker);
      }
    } catch (error: any) {
      showFlash({
        message: 'Failed to load detailed information',
        description: error?.message || 'Something went wrong',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <StockContext.Provider
      value={{
        selectedFilter,
        workerRequests,
        filteredRequests,
        selectedWorker,
        modalVisible,
        loading,
        isDriver: isDriverRole,
        statusOptions,
        setSelectedFilter,
        updateRequestStatus,
        setSelectedWorker,
        openModal,
        closeModal,
        loadStockRequests,
        loadAllStockRequests,
        filterRequestsByCreatorRole,
        // Pagination info
        currentPage,
        totalPages,
        totalRequests,
        hasMorePages,
      }}>
      {children}
    </StockContext.Provider>
  );
};
