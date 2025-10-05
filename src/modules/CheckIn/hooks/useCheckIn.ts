import { useMemo, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { DATA, NAVIGATORS, TOP_TABS_CHECKIN } from '@constant';
import { isIOS, getCurrentLocation } from '@shared/utils/helpers';
import { ProjectApi, Project } from '../../../api/ProjectApi';
import { AttendanceApi, AttendanceRecord, TodayStatusResponse } from '../../../api/AttendanceApi';

type ModalType = 'checkin-success' | 'checkin-failed' | 'checkout-confirmation' | 'location-input';

export const useCheckIn = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TOP_TABS_CHECKIN>(
    TOP_TABS_CHECKIN.RECENT,
  );
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [todayStatus, setTodayStatus] = useState<TodayStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState<number | null>(null); // Track which button is loading
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [cachedLocation, setCachedLocation] = useState<any>(null); // Pre-cached location
  const [errorMessage, setErrorMessage] = useState<string>(''); // Store backend error message

  const modalVisible = modalType !== null;

  // Helper function to clean up address display
  const getCleanAddress = (address: string | null | undefined): string => {
    if (!address) return 'Location not available';
    
    // If it looks like coordinates (lat, lng format), return a generic message
    if (address.match(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/)) {
      return 'Location recorded';
    }
    
    return address;
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
    preFetchLocation(); // Start getting location in background
  }, []);

  // Pre-fetch location when user enters the page
  const preFetchLocation = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setCachedLocation(location);
      }
    } catch (error) {
      // Background location fetch failed, will use fallback when needed
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Load all data in parallel
      const [fetchedProjects, attendanceResponse, todayStatusResponse] = await Promise.all([
        ProjectApi.getMyProjects(),
        AttendanceApi.getMyAttendance({ 
          date: today,
          sort_by: 'check_in_time',
          sort_order: 'DESC'
        }),
        AttendanceApi.getTodayStatus()
          ]);

          setProjects(fetchedProjects);
      setAttendanceRecords(attendanceResponse.data);
      setTodayStatus(todayStatusResponse);
      
    } catch (error) {
      // Don't use fallback data - show empty state instead
      setProjects([]);
      setAttendanceRecords([]);
      setTodayStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    if (!projects.length) {
      return [];
    }

    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case TOP_TABS_CHECKIN.RECENT:
        // Projects with no check-in today
        const checkedInProjectIds = attendanceRecords
          .filter(record => record.check_in_time)
          .map(record => record.project?.id)
          .filter(Boolean);
        
        const recentProjects = projects
          .filter(project => !checkedInProjectIds.includes(project.id))
          .map(project => ({
            id: project.id,
            title: project.customer,
            location: project.address,
            status: 'recent' as const,
            project,
          }));
        
        return recentProjects;

      case TOP_TABS_CHECKIN.ONGOING:
        // Projects with check-in but no check-out today
        return attendanceRecords
          .filter(record => 
            record.check_in_time && 
            !record.check_out_time &&
            record.project
          )
          .map(record => {
            // Find the full project data from the main projects array
            const fullProject = projects.find(p => p.id === record.project?.id);
            return {
              id: record.id,
              title: record.project!.name,
              location: getCleanAddress(fullProject?.address || record.project?.address || record.check_in_address),
              status: 'ongoing' as const,
              checkInTime: record.check_in_time,
              project: record.project,
              attendanceRecord: record,
            };
          });

      case TOP_TABS_CHECKIN.COMPLETED:
        // Projects with both check-in and check-out today
        return attendanceRecords
          .filter(record => 
            record.check_in_time && 
            record.check_out_time &&
            record.project
          )
          .map(record => {
            // Find the full project data from the main projects array
            const fullProject = projects.find(p => p.id === record.project?.id);
            return {
              id: record.id,
              title: record.project!.name,
              location: getCleanAddress(fullProject?.address || record.project?.address || record.check_in_address),
              status: 'completed' as const,
              checkInTime: record.check_in_time,
              checkOutTime: record.check_out_time,
              project: record.project,
              attendanceRecord: record,
            };
          });

      default:
        return [];
    }
  }, [projects, attendanceRecords, activeTab]);

  const showModal = (type: ModalType) => {
    setModalType(type);
  };

  const hideModal = () => {
    setModalType(null);
    setErrorMessage(''); // Clear error message when modal is closed
  };

  const handleCheckIn = async (item: any) => {
    try {
      setButtonLoading(item.id); // Set this specific button as loading
      
      // Use cached location if available, otherwise get fresh location
      let location = cachedLocation;
      
      if (!location) {
        try {
          const locationPromise = getCurrentLocation();
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Location timeout')), 2000)
          );
          location = await Promise.race([locationPromise, timeoutPromise]);
          // Cache the fresh location for next time
          setCachedLocation(location);
        } catch (error) {
          throw new Error('Failed to get location');
        }
      } else {
      }
      
      if (activeTab === TOP_TABS_CHECKIN.RECENT) {
        // Check-in to project
        const payload = {
          project_id: item.project.id,
          latitude: location?.latitude,
          longitude: location?.longitude,
          address: location?.address,
          notes: `Check-in to ${item.project.customer || item.title}`,
        };

        const response = await AttendanceApi.checkIn(payload);
        
        showModal('checkin-success');
      } else if (activeTab === TOP_TABS_CHECKIN.ONGOING) {
        // Check-out from project
        const payload = {
          latitude: location?.latitude,
          longitude: location?.longitude,
          address: location?.address,
          notes: `Check-out from ${item.project?.name || item.title}`,
        };

        const response = await AttendanceApi.checkOut(payload);
        
        showModal('checkout-confirmation');
      }
    } catch (error: any) {
      // Extract error message from backend response
      const backendErrorMessage = error?.message || 'Failed to check in. Please try again.';
      setErrorMessage(backendErrorMessage);
      showModal('checkin-failed');
    } finally {
      setButtonLoading(null); // Clear button loading state
    }
  };


  const handleConfirmation = async () => {
    try {
      // Reload data after successful check-in/out
      await loadData();
    } catch (error) {
      // Failed to reload data
    } finally {
      hideModal();
      // Don't navigate - stay on the check-in page
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData();
    } catch (error) {
      // Failed to refresh data
    } finally {
      setRefreshing(false);
    }
  };

  return {
    activeTab,
    filteredProjects,
    modalType,
    modalVisible,
    loading,
    buttonLoading,
    refreshing,
    cachedLocation,
    setActiveTab,
    showModal,
    hideModal,
    handleCheckIn,
    handleConfirmation,
    onRefresh,
    errorMessage,
  };
};
