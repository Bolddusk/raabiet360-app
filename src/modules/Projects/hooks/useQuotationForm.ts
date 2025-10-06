import { useState } from 'react';
import { API_ENDPOINT, getData, BASE_URL } from '@api';

export const useQuotationForm = () => {
  const [loading, setLoading] = useState(false);
  const [quotationData, setQuotationData] = useState(null);
  const [error, setError] = useState(null);

  const fetchQuotationData = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINT.PROJECT_QUOTATION_NO_PRICING(projectId);
      console.log('🔧 Quotation Form API Call:', {
        projectId,
        endpoint,
        fullUrl: `${BASE_URL}${endpoint}`
      });
      
      const response = await getData(endpoint);

      if (response.success) {
        setQuotationData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch quotation data');
      }
    } catch (err: any) {
      console.error('Error fetching quotation data:', err);
      
      // Handle different error types with user-friendly messages
      if (err?.response?.status === 404) {
        setError('Quotation not found for this project. Please create a quotation first.');
      } else if (err?.response?.status === 403) {
        setError('You are not assigned to this project. Access denied.');
      } else if (err?.response?.status === 401) {
        setError('Authentication required. Please log in again.');
      } else {
        setError(err?.message || 'Failed to fetch quotation data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    quotationData,
    error,
    fetchQuotationData,
  };
};
