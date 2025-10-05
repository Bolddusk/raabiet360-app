import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { API_ENDPOINT, getData } from '@api';
import { SCREEN } from '@constant';
import { useAuth } from '@providers';
import { showFlash } from '@shared/utils/helpers';
import { useProjectFilters } from './useProjectFilters';

export const useProjects = () => {
  const navigation = useNavigation<any>();
  const { authData } = useAuth();
  const { filterOptions } = useProjectFilters();

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async (status?: string, pageNumber: number = 1) => {
    try {
      setLoading(true);

      let apiStatus: string | undefined = status && status !== 'All' ? status : undefined;
      if (apiStatus === 'In-Progress') {
        apiStatus = 'In Progress';
      }

      const endpoint = API_ENDPOINT.PROJECTS(apiStatus, pageNumber, 10);
      const response = await getData(endpoint, authData?.accessToken);

      if (pageNumber === 1) {
        setProjects(response?.data?.projects ?? []);
      } else {
        setProjects(prev => [...prev, ...(response?.data?.projects ?? [])]);
      }

      setTotalPages(response?.data?.total_pages ?? 1);
    } catch (error: any) {
      showFlash({
        message: error?.message || 'Failed to fetch projects. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProjects(selectedFilter, 1);
  }, [selectedFilter]);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(selectedFilter, nextPage);
    }
  };

  const handleBTFormPress = (id: string) => {
    navigation.navigate(SCREEN.BT_FORM);
  };

  const handleQFormPress = (id: string) => {
  };

  // Create dynamic filter options from API data
  const getFilterOptions = () => {
    const options = [
      { label: 'All', value: 'All' },
      ...filterOptions.statuses.map(status => {
        // Handle both string format (legacy) and object format (new)
        if (typeof status === 'string') {
          return {
            label: status,
            value: status,
            color: '#757575', // Default gray color for legacy format
          };
        } else {
          return {
            label: status.name,
            value: status.name,
            color: status.color,
          };
        }
      }),
    ];
    return options;
  };

  return {
    projects,
    selectedFilter,
    loading,
    page,
    setSelectedFilter,
    handleBTFormPress,
    handleQFormPress,
    loadMore,
    filterOptions: {
      statuses: getFilterOptions(),
      urgencies: filterOptions.urgencies,
      companies: filterOptions.companies,
      customers: filterOptions.customers,
    },
    statusOptions: filterOptions.statuses, // Original status options for ProjectCard
  };
};
