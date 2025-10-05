import { useEffect, useState } from 'react';

import { API_ENDPOINT, getData } from '@api';
import { useAuth } from '@providers';

export interface StatusOption {
  name: string;
  color: string;
}

export interface ProjectFilterOptions {
  statuses: (StatusOption | string)[]; // Support both object and string formats
  urgencies: string[];
  companies: string[];
  modules: string[];
  customers: string[];
}

export const useProjectFilters = () => {
  const { authData } = useAuth();
  const [filterOptions, setFilterOptions] = useState<ProjectFilterOptions>({
    statuses: [],
    urgencies: [],
    companies: [],
    modules: [],
    customers: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = API_ENDPOINT.PROJECT_FILTERS;
      const response = await getData(endpoint, authData?.accessToken);
      
      if (response?.data) {
        const { statuses, urgencies, companies, modules, customers } = response.data;
        
        
        setFilterOptions({
          statuses: statuses || [],
          urgencies: urgencies || [],
          companies: companies || [],
          modules: modules || [],
          customers: customers || [],
        });
      }
    } catch (error: any) {
      console.error('Error fetching project filter options:', error);
      setError(error?.message || 'Failed to fetch filter options');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authData?.accessToken) {
      fetchFilterOptions();
    }
  }, [authData?.accessToken]);

  return {
    filterOptions,
    loading,
    error,
    refetch: fetchFilterOptions,
  };
};
