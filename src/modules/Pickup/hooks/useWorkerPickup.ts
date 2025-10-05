import { useEffect, useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { DATA, TOP_TABS_REQUESTS } from '@constant';
import { getWorkerPickupRequests, createPickupRequest, CreatePickupRequestDto, ProjectApi } from '@api';
import { useAuth } from '@providers';
import { showFlash } from '@shared/utils/helpers';
import { PickupRequest, WorkerRequest, Project } from '@types';
export const useWorkerPickup = () => {
  const { params } = useRoute<any>();
  const { activeTab: selectedTab } = params || {};
  const { userInfo } = useAuth();

  const [activeTab, setActiveTab] = useState<TOP_TABS_REQUESTS>(
    TOP_TABS_REQUESTS.RECENT,
  );

  const [formData, setFormData] = useState({
    project: '',
    destination: '',
    pickupDateTime: '',
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeDateField, setActiveDateField] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  const [isPickupDetailsModalVisible, setPickupDetailsModalVisible] =
    useState(false);
  const [selectedPickupRequest, setSelectedPickupRequest] = useState<any>(null);

  const isFormValid = Object.values(formData).every(
    value => value.trim() !== '',
  );

  // Load worker pickup requests
  const loadWorkerPickupRequests = async () => {
    if (!userInfo?.id) return;
    
    try {
      setLoading(true);
      const response = await getWorkerPickupRequests(1, 50);
      if (response.success) {
        setPickupRequests(response.data.requests);
      }
    } catch (error) {
      console.error('Error loading worker pickup requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load user's assigned projects
  const loadUserProjects = async () => {
    if (!userInfo?.id) return;
    
    try {
      setProjectsLoading(true);
      const projects = await ProjectApi.getMyProjects();
      setUserProjects(projects);
    } catch (error) {
      console.error('Error loading user projects:', error);
      // Fallback to static data if API fails
      setUserProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  };

  const filteredRequests = useMemo(() => {
    switch (activeTab) {
      case TOP_TABS_REQUESTS.RECENT:
        // Convert pickup requests to WorkerRequest format for UI compatibility
        return pickupRequests.map((req: PickupRequest) => ({
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
      case TOP_TABS_REQUESTS.CREATE:
        return [];
      default:
        return [];
    }
  }, [activeTab, pickupRequests]);

  useEffect(() => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (activeTab === TOP_TABS_REQUESTS.RECENT) {
      loadWorkerPickupRequests();
    } else if (activeTab === 'create') {
      loadUserProjects();
    }
  }, [activeTab, userInfo?.id]);

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === 'project') {
      const selectedProject = userProjects.find(p => p.id.toString() === value);
      setFormData(prev => ({
        ...prev,
        project: value,
        destination: selectedProject?.address || '',
      }));
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  const showDatePickerForField = (field: string) => {
    setActiveDateField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    setActiveDateField(null);
  };

  const handleDateConfirm = (date: Date) => {
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const dateStr = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formatted = `${time} | ${dateStr}`;
    if (activeDateField) {
      handleFieldChange(activeDateField, formatted);
    }
    hideDatePicker();
  };

  const handleCreateRequest = async () => {
    if (!isFormValid) return;
    
    try {
      setLoading(true);
      
      // Parse the datetime string to separate time and date
      const [timePart, datePart] = formData.pickupDateTime.split(' | ');
      const time = timePart.trim();
      const date = datePart.trim();
      
      // Find the project from the selected project ID
      const selectedProject = userProjects.find(p => p.id.toString() === formData.project);
      if (!selectedProject) {
        showFlash('error', 'Please select a valid project');
        return;
      }
      
      const projectId = selectedProject.id;
      
      const createData: CreatePickupRequestDto = {
        project_id: projectId,
        pickup_time: time,
        pickup_date: date,
        destination: formData.destination,
        description: `Pickup request for ${selectedProject.label}`,
      };
      
      const response = await createPickupRequest(createData);
      if (response.success) {
        showFlash('success', 'Pickup request created successfully');
        setShowConfirmationModal(true);
        // Reload requests
        await loadWorkerPickupRequests();
      } else {
        showFlash('error', 'Failed to create pickup request');
      }
    } catch (error: any) {
      console.error('Error creating pickup request:', error);
      showFlash('error', error.message || 'Failed to create pickup request');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setShowConfirmationModal(false);
    setFormData({
      project: '',
      destination: '',
      pickupDateTime: '',
    });
    setActiveTab(TOP_TABS_REQUESTS.RECENT);
  };

  const handleShowPickupDetails = (request: any) => {
    setSelectedPickupRequest(request);
    setPickupDetailsModalVisible(true);
  };

  const handleClosePickupDetails = () => {
    setPickupDetailsModalVisible(false);
    setSelectedPickupRequest(null);
  };

  // Convert user projects to dropdown format
  const projectOptions = useMemo(() => {
    return userProjects.map(project => ({
      label: project.customer || project.name || `Project ${project.project_id}`,
      value: project.id.toString(),
    }));
  }, [userProjects]);

  return {
    activeTab,
    filteredRequests,
    formData,
    isFormValid,
    showConfirmationModal,
    isDatePickerVisible,
    isPickupDetailsModalVisible,
    selectedPickupRequest,
    loading,
    projectsLoading,
    projectOptions,
    setActiveTab,
    handleFieldChange,
    showDatePickerForField,
    handleDateConfirm,
    hideDatePicker,
    handleCreateRequest,
    handleFinish,
    handleShowPickupDetails,
    handleClosePickupDetails,
  };
};
