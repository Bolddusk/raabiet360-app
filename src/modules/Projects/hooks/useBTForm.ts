import { useState } from 'react';
import { API_ENDPOINT, getData, BASE_URL } from '@api';

export const useBTForm = () => {
  const [loading, setLoading] = useState(false);
  const [btFormData, setBtFormData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBTFormData = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINT.PROJECT_BT_FORM_NO_PRICING(projectId);
      console.log('🔧 BT Form API Call:', {
        projectId,
        endpoint,
        fullUrl: `${BASE_URL}${endpoint}`
      });
      
      const response = await getData(endpoint);

      if (response.success) {
        setBtFormData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch BT form data');
      }
    } catch (err: any) {
      console.error('Error fetching BT form data:', err);
      
      // Handle different error types with user-friendly messages
      if (err?.response?.status === 404) {
        setError('BT Form not found for this project. Please create a BT Form first.');
      } else if (err?.response?.status === 403) {
        setError('You are not assigned to this project. Access denied.');
      } else if (err?.response?.status === 401) {
        setError('Authentication required. Please log in again.');
      } else {
        setError(err?.message || 'Failed to fetch BT form data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    btFormData,
    error,
    fetchBTFormData,
  };
};
