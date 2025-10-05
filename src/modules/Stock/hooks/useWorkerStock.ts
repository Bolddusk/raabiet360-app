import { useEffect, useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { DATA, TOP_TABS_REQUESTS } from '@constant';
import { ProjectApi, Project } from '../../../api/ProjectApi';
import { StockApi } from '../../../api/StockApi';
import { useAuth } from '@providers';
import { showFlash } from '../../../shared/utils/helpers';

export const useWorkerStock = () => {
  const { params } = useRoute<any>();
  const { activeTab: selectedTab } = params || {};
  const { userInfo, authData } = useAuth();

  const [activeTab, setActiveTab] = useState<TOP_TABS_REQUESTS>(
    TOP_TABS_REQUESTS.RECENT,
  );
  const [formData, setFormData] = useState({
    project: '',
    urgency: '',
    requestDateTime: '',
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [assignedProjects, setAssignedProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [warehouseItems, setWarehouseItems] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [stockRequests, setStockRequests] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const isFormValid =
    Object.values(formData).every(value => value.trim() !== '') &&
    selectedItems.length > 0 &&
    selectedItems.every(
      item =>
        item.quantity &&
        !isNaN(item.quantity) &&
        Number(item.quantity) > 0
    );

  const filteredRequests = useMemo(() => {
    switch (activeTab) {
      case TOP_TABS_REQUESTS.RECENT:
        return stockRequests;
      case TOP_TABS_REQUESTS.CREATE:
        return [];
      default:
        return stockRequests;
    }
  }, [activeTab, stockRequests]);

  const availableItems = useMemo(() => {
    console.log('🔄 availableItems memo - warehouseItems:', warehouseItems);
    console.log('🔄 availableItems memo - warehouseItems type:', typeof warehouseItems);
    console.log('🔄 availableItems memo - warehouseItems is array:', Array.isArray(warehouseItems));
    return warehouseItems || []; // Ensure it's always an array
  }, [warehouseItems]);

  useEffect(() => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  // Load stock requests when component mounts or when switching to RECENT tab
  useEffect(() => {
    if (activeTab === TOP_TABS_REQUESTS.RECENT && userInfo?.id && authData?.accessToken) {
      loadStockRequests();
    }
  }, [activeTab, userInfo?.id, authData?.accessToken]);

  // Load assigned projects when component mounts or when CREATE tab is active
  useEffect(() => {
    if (activeTab === TOP_TABS_REQUESTS.CREATE) {
      // Only load projects if we don't have any yet
      if (assignedProjects.length === 0) {
        loadAssignedProjects();
      }
    }
  }, [activeTab]);

  const loadAssignedProjects = async () => {
    if (!userInfo?.id) {
      console.log('❌ No userInfo.id available:', userInfo);
      return;
    }
    
    console.log('🔄 Loading assigned projects for user:', userInfo.id);
    setLoadingProjects(true);
    try {
      console.log('🔄 Calling ProjectApi.getMyProjects()...');
      const response = await ProjectApi.getMyProjects();
      console.log('📊 Raw projects response:', response);
      console.log('📊 Projects count:', response.length);
      console.log('📊 Response type:', typeof response);
      console.log('📊 Is array:', Array.isArray(response));
      
      // Log each project to see their structure
      response.forEach((project, index) => {
        console.log(`Project ${index + 1}:`, {
          id: project.id,
          customer: project.customer, // This is the project name from backend
          name: project.name, // Check if name field exists
          project_id: project.project_id,
          warehouse_id: project.warehouse_id,
          driver_id: project.driver_id,
          warehouse_name: project.warehouse_name,
          driver_name: project.driver_name,
          // Log all available fields
          allFields: Object.keys(project),
        });
      });
      
      // Show ALL assigned projects first (don't filter by warehouse/driver yet)
      console.log('✅ All assigned projects:', response.length);
      console.log('✅ All assigned projects details:', response);
      
      setAssignedProjects(response);
      
      if (response.length === 0) {
        showFlash({
          message: 'No Assigned Projects',
          description: 'You have no projects assigned to you',
          type: 'warning',
        });
      } else {
        showFlash({
          message: 'Projects Loaded',
          description: `Found ${response.length} assigned project(s)`,
          type: 'success',
        });
      }
    } catch (error) {
      console.error('❌ Failed to load projects:', error);
      showFlash({
        message: 'Failed to Load Projects',
        description: 'Could not load your assigned projects',
        type: 'danger',
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Handle project selection
    if (fieldName === 'project') {
      handleProjectChange(value);
    }
  };

  // Transform API data to match WorkerRequestCard expectations
  const transformStockRequestData = (apiRequest: any) => {
    const createdDate = new Date(apiRequest.created_at);
    const requestDateTime = new Date(apiRequest.request_date_time);
    
    // Map status to match translation keys in en_US.json
    const mapStatus = (status: string) => {
      switch (status.toLowerCase()) {
        case 'pending':
          return 'Pending';
        case 'in_progress':
        case 'in-progress':
          return 'InProgress';
        case 'completed':
          return 'Completed';
        case 'cancelled':
        case 'canceled':
          return 'Cancelled';
        default:
          // Capitalize first letter for other statuses
          return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      }
    };
    
    return {
      id: apiRequest.id.toString(),
      request_id: apiRequest.request_id,
      name: apiRequest.creator?.first_name && apiRequest.creator?.last_name 
        ? `${apiRequest.creator.first_name} ${apiRequest.creator.last_name}`
        : apiRequest.creator?.username || 'Unknown User',
      address: apiRequest.warehouse_name || 'Unknown Warehouse',
      project: apiRequest.project_name || 'Unknown Project',
      time: createdDate.toLocaleTimeString(),
      date: createdDate.toLocaleDateString(),
      status: mapStatus(apiRequest.status),
      quantity: apiRequest.items?.length?.toString() || '0',
      item: 'stock_request',
      // Include items directly for modal display
      items: apiRequest.items || [],
      // Include all other fields needed for modal
      created_at: apiRequest.created_at,
      updated_at: apiRequest.updated_at,
      notes: apiRequest.notes,
      driver_id: apiRequest.driver_id,
      driver_name: apiRequest.driver_name,
      warehouse_id: apiRequest.warehouse_id,
      warehouse_name: apiRequest.warehouse_name,
      project_id: apiRequest.project_id,
      project_name: apiRequest.project_name,
      request_date_time: apiRequest.request_date_time,
      pickup_date_time: apiRequest.pickup_date_time,
      delivery_date_time: apiRequest.delivery_date_time,
      in_transit_date_time: apiRequest.in_transit_date_time,
      driver_pickup_confirmation: apiRequest.driver_pickup_confirmation,
      driver_delivery_confirmation: apiRequest.driver_delivery_confirmation,
      worker_confirmation: apiRequest.worker_confirmation,
      pickup_notes: apiRequest.pickup_notes,
      delivery_notes: apiRequest.delivery_notes,
      in_transit_notes: apiRequest.in_transit_notes,
      completion_notes: apiRequest.completion_notes,
      // Keep original data for detailed view
      originalData: apiRequest,
    };
  };

  const loadStockRequests = async () => {
    if (!userInfo?.id || !authData?.accessToken) {
      console.log('❌ Cannot load stock requests: missing user ID or access token');
      return;
    }

    setLoadingRequests(true);
    try {
      console.log('📋 Loading stock requests created by user:', userInfo.id);
      
      // Use the creator-specific endpoint for efficiency
      const response = await StockApi.getCreatorStockRequests(userInfo.id, authData.accessToken);
      
      if (response.success) {
        console.log('📋 Creator stock requests loaded:', response.data);
        console.log('📋 Creator requests structure:', response.data.requests);
        console.log('📋 Creator requests count:', response.data.requests?.length);
        
        
        // Transform the data to match WorkerRequestCard expectations
        const transformedRequests = (response.data.requests || []).map(transformStockRequestData);
        console.log('📋 Transformed requests:', transformedRequests);
        
        setStockRequests(transformedRequests);
      } else {
        throw new Error(response.message || 'Failed to load stock requests');
      }
    } catch (error) {
      console.error('❌ Failed to load stock requests:', error);
      showFlash({
        message: 'Failed to Load Requests',
        description: 'Could not load your stock requests',
        type: 'danger',
      });
      setStockRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  // Modal functions
  const openModal = async (request: any) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRequest(null);
  };

  const handleProjectChange = async (projectId: string) => {
    // Handle empty selection (when "Select Project" is chosen)
    if (!projectId || projectId === '') {
      setSelectedProject(null);
      setWarehouseItems([]);
      console.log('🔄 Project selection cleared');
      return;
    }

    const project = assignedProjects.find(p => p.id.toString() === projectId);
    if (!project) return;

    setSelectedProject(project);
    console.log('🔄 Project selected:', project);

    // Check warehouse and driver assignments
    const hasWarehouse = project.warehouse_id && project.warehouse_id > 0;
    const hasDriver = project.driver_id && project.driver_id > 0;
    
    // Also check if driver name exists (alternative way to detect driver assignment)
    const hasDriverName = project.driver_name && project.driver_name.trim() !== '';
    const hasDriverField = project.driver && project.driver.trim() !== '';

    console.log('📊 Project assignment check:', {
      projectId: project.id,
      projectName: project.customer, // This is the project name
      hasWarehouse,
      hasDriver,
      hasDriverName,
      hasDriverField,
      warehouse_id: project.warehouse_id,
      driver_id: project.driver_id,
      warehouse_name: project.warehouse_name,
      driver_name: project.driver_name,
      driver: project.driver,
      // Log all project fields to see what's available
      allProjectFields: Object.keys(project),
    });

    // More flexible driver detection - check multiple ways
    const actuallyHasDriver = hasDriver || hasDriverName || hasDriverField;
    
    console.log('📊 Final driver check:', {
      hasDriver,
      hasDriverName, 
      hasDriverField,
      actuallyHasDriver,
    });

    // Show appropriate messages based on assignments
    if (!hasWarehouse && !actuallyHasDriver) {
      showFlash({
        message: 'Missing Assignments',
        description: 'This project has no assigned warehouse and driver. Please contact your manager.',
        type: 'danger',
      });
      return;
    } else if (!hasWarehouse) {
      showFlash({
        message: 'No Warehouse Assigned',
        description: 'This project has no assigned warehouse. Please contact your manager.',
        type: 'danger',
      });
      return;
    } else if (!actuallyHasDriver) {
      showFlash({
        message: 'No Driver Assigned',
        description: 'This project has no assigned driver. Please contact your manager.',
        type: 'danger',
      });
      return;
    }

    // Both warehouse and driver are assigned - proceed
    const displayDriverName = project.driver_name || project.driver || 'Assigned Driver';
    showFlash({
      message: 'Project Selected',
      description: `Warehouse: ${project.warehouse_name || 'N/A'}, Driver: ${displayDriverName}`,
      type: 'success',
    });

    // Load warehouse items
    await loadWarehouseItems(project.warehouse_id);
  };

  const loadWarehouseItems = async (warehouseId: number) => {
    if (!authData.accessToken) {
      console.error('❌ No access token available for loading warehouse items');
      return;
    }
    
    console.log('🔄 Loading warehouse items for warehouse ID:', warehouseId);
    setLoadingItems(true);
    try {
      const response = await StockApi.getStockItemsByWarehouse(warehouseId, authData.accessToken);
      console.log('📊 Warehouse items response:', response);
      
      if (response.success) {
        // The API returns data in response.data.stockItems, not directly in response.data
        const rawItems = response.data.stockItems || response.data || [];
        console.log('📊 Raw items from API:', rawItems);
        console.log('📊 Items type:', typeof rawItems);
        console.log('📊 Items is array:', Array.isArray(rawItems));
        console.log('📊 Items length:', rawItems.length);
        
        // Filter items to only include those from the selected warehouse
        const warehouseItems = rawItems.filter(item => 
          item.warehouse_id === warehouseId
        );
        
        console.log('📊 After warehouse filtering - items for warehouse', warehouseId, ':', warehouseItems.length);
        console.log('📊 Warehouse items:', warehouseItems.map(item => ({ 
          code: item.item_code, 
          name: item.item_name, 
          warehouse_id: item.warehouse_id 
        })));
        
        // Remove duplicates based on item_code (in case there are still duplicates)
        const uniqueItems = warehouseItems.filter((item, index, self) => 
          index === self.findIndex(t => 
            (t.item_code || t.code) === (item.item_code || item.code)
          )
        );
        
        console.log('📊 After deduplication - unique items:', uniqueItems.length);
        console.log('📊 Total items filtered out:', rawItems.length - uniqueItems.length);
        
        setWarehouseItems(uniqueItems);
        console.log('✅ Warehouse items set in state:', uniqueItems.length);
        console.log('📊 Items structure:', uniqueItems);
      } else {
        throw new Error(response.message || 'Failed to load items');
      }
    } catch (error) {
      console.error('❌ Failed to load warehouse items:', error);
      
      // Check if it's a 403 error
      if (error.response?.status === 403) {
        showFlash({
          message: 'Access Denied',
          description: 'You do not have permission to view warehouse items. Please contact your manager.',
          type: 'danger',
        });
      } else {
        showFlash({
          message: 'Failed to Load Items',
          description: 'Could not load items from warehouse',
          type: 'danger',
        });
      }
      
      // Don't use fallback data - keep warehouseItems empty
      setWarehouseItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleUpdateQty = (code: string, qty: string) => {
    setSelectedItems(prev =>
      prev.map(item =>
        item.code === code ? { ...item, quantity: qty } : item,
      ),
    );
  };

  const handleMultiSelectChange = (selectedCodes: string[]) => {
    // Get currently selected codes
    const currentSelectedCodes = selectedItems.map(item => item.code);
    
    // Find items that were just selected (added to the list)
    const newlySelectedCodes = selectedCodes.filter(code => !currentSelectedCodes.includes(code));
    
    // Find items that were just deselected (removed from the list)
    const newlyDeselectedCodes = currentSelectedCodes.filter(code => !selectedCodes.includes(code));
    
    console.log('🔄 Multi-select change:', {
      selectedCodes,
      currentSelectedCodes,
      newlySelectedCodes,
      newlyDeselectedCodes,
    });
    
    // Remove deselected items
    let updatedSelectedItems = selectedItems.filter(item => !newlyDeselectedCodes.includes(item.code));
    
    // Add newly selected items
    const newItems = (availableItems || [])
      .filter(item => newlySelectedCodes.includes(item.item_code || item.code))
      .map(item => ({
        id: item.id,
        name: item.item_name || item.name,
        code: item.item_code || item.code,
        availableQty: item.quantity || item.current_stock || 0,
        quantity: '',
        category: item.category,
      }));
    
    console.log('🔍 [DEBUG] availableItems:', availableItems);
    console.log('🔍 [DEBUG] newlySelectedCodes:', newlySelectedCodes);
    console.log('🔍 [DEBUG] newItems being added:', newItems);
    
    updatedSelectedItems = [...updatedSelectedItems, ...newItems];
    
    console.log('🔍 [DEBUG] updatedSelectedItems:', updatedSelectedItems);
    setSelectedItems(updatedSelectedItems);
  };

  const resetForm = () => {
    setFormData({
      project: '',
      urgency: '',
      requestDateTime: '',
    });
    setSelectedItems([]);
    setSelectedProject(null);
    setWarehouseItems([]);
    console.log('🔄 Form reset manually by user');
  };

  // Auto-reset only when user successfully creates a request
  const resetFormAfterSuccess = () => {
    resetForm();
    console.log('🔄 Form reset after successful request creation');
    
    // Reload stock requests to show the new one
    if (userInfo?.id && authData?.accessToken) {
      loadStockRequests();
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (date: Date) => {
    handleFieldChange('requestDateTime', date.toLocaleString());
    setDatePickerVisible(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleCreateRequest = async () => {
    if (!selectedProject) {
      showFlash({
        message: 'No Project Selected',
        description: 'Please select a project first',
        type: 'danger',
      });
      return;
    }

    if (selectedItems.length === 0) {
      showFlash({
        message: 'No Items Selected',
        description: 'Please add at least one item to the request',
        type: 'danger',
      });
      return;
    }

    // Validate all items have quantity > 0
    const invalidItems = selectedItems.filter(item => 
      !item.quantity || isNaN(Number(item.quantity)) || Number(item.quantity) <= 0
    );

    if (invalidItems.length > 0) {
      showFlash({
        message: 'Invalid Quantities',
        description: 'All items must have quantity greater than 0',
        type: 'danger',
      });
      return;
    }

    // Validate driver assignment
    if (!selectedProject.driver_id) {
      showFlash({
        message: 'Missing Driver ID',
        description: 'This project has no valid driver ID assigned. Please contact your manager.',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
    try {
      // Debug: Check what's in selectedItems
      console.log('🔍 [DEBUG] selectedItems before mapping:', selectedItems);
      console.log('🔍 [DEBUG] selectedItems structure:', selectedItems.map(item => ({
        id: item.id,
        code: item.code,
        name: item.name,
        quantity: item.quantity
      })));

      // Create stock request with auto-assigned driver
      const requestData = {
        project_id: selectedProject.id,
        project_name: selectedProject.customer || selectedProject.name || 'Unknown Project',
        warehouse_id: selectedProject.warehouse_id,
        warehouse_name: selectedProject.warehouse_name || 'Unknown Warehouse',
        driver_id: selectedProject.driver_id, // Auto-assigned from project
        driver_name: selectedProject.driver_name || selectedProject.driver || 'Unknown Driver',
        request_date_time: new Date().toISOString(),
        status: 'pending',
        priority: formData.urgency || 'normal',
        notes: '',
        items: selectedItems.map(item => ({
          item_id: item.id,
          item_code: item.code,
          item_name: item.name,
          category: item.category || 'General',
          quantity: Number(item.quantity),
        })),
      };

      if (!authData.accessToken) {
        throw new Error('No access token available');
      }
      const response = await StockApi.createStockRequest(requestData, authData.accessToken);
      
      if (response.success) {
        showFlash({
          message: 'Request Created',
          description: `Stock request created successfully! Request ID: ${response.data.request_id}`,
          type: 'success',
        });
        
        // Reset form after successful creation
        resetFormAfterSuccess();
        
        // Navigate to recent tab to show the new request
        setActiveTab(TOP_TABS_REQUESTS.RECENT);
      } else {
        throw new Error(response.message || 'Failed to create request');
      }
    } catch (error) {
      console.error('Failed to create request:', error);
      showFlash({
        message: 'Failed to Create Request',
        description: 'Could not create stock request',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    filteredRequests,
    formData,
    isFormValid,
    isDatePickerVisible,
    setActiveTab,
    handleFieldChange,
    showDatePicker,
    handleDateConfirm,
    hideDatePicker,
    handleCreateRequest,
    selectedItems,
    availableItems,
    handleUpdateQty,
    handleMultiSelectChange,
    assignedProjects,
    selectedProject,
    loadingProjects,
    loadingItems,
    loading,
    loadingRequests,
    resetForm,
    loadStockRequests,
    modalVisible,
    selectedRequest,
    openModal,
    closeModal,
  };
};
