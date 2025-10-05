import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { API_ENDPOINT, getData } from '@api';
import { useAuth } from '@providers';
import { showFlash } from '@shared/utils/helpers';

const { width } = Dimensions.get('screen');
const _cardWidth = width * 0.85;
const _spacing = 12;

export const useLocator = () => {
  const { authData } = useAuth();

  const flatListRef = useRef<FlatList<any>>(null);
  const mapRef = useRef<any>(null);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    fetchProjects(1, false);
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  const fetchProjects = async (pageNumber: number = 1, append = false) => {
    try {
      setLoading(true);
      const endpoint = API_ENDPOINT.PROJECTS(undefined, pageNumber, 100);
      const response = await getData(endpoint, authData?.accessToken);

      const newProjects = response?.data?.projects ?? [];
      setTotalPages(response?.data?.totalPages ?? 1);

      if (append) {
        setProjects(prev => [...prev, ...newProjects]);
      } else {
        setProjects(newProjects);
      }
    } catch (error: any) {
      console.log('Error fetching locator projects:', error);
      showFlash({
        message:
          error?.message || 'Failed to fetch projects. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(nextPage, true);
    }
  };

  const handleScrollToIndex = (index: number) => {
    const offset = index * (_cardWidth + _spacing);
    flatListRef.current?.scrollToOffset({
      offset,
      animated: true,
    });
  };

  const handleCardPress = (item: any, index: number) => {
    setSelectedProject(item);
    handleScrollToIndex(index);
    if (
      item?.location_coordinates?.latitude &&
      item?.location_coordinates?.longitude
    ) {
      mapRef.current?.animateToRegion(
        {
          latitude: parseFloat(item?.location_coordinates?.latitude),
          longitude: parseFloat(item?.location_coordinates?.longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000,
      );
    }
  };

  return {
    projects,
    loading,
    page,
    selectedProject,
    mapRef,
    flatListRef,
    loadMore,
    handleCardPress,
  };
};
