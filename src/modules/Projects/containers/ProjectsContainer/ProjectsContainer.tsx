import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { USER_ROLE } from '@constant';
import { useAuth, useTheme } from '@providers';
import {
  ActivityLoader,
  EmptyList,
  FilterCard,
  FullScreenWrapper,
  Header,
  SafeAreaViewWrapper,
  ScreenWrapper,
} from '@shared/components';
import { SIZES } from '@styles/theme';
import { ProjectCard } from '../../components/components';
import { useProjects } from '../../hooks/hooks';
import { styles } from './ProjectsContainer.styles';

const ProjectsContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  const {
    loading,
    page,
    projects,
    selectedFilter,
    setSelectedFilter,
    handleBTFormPress,
    handleQFormPress,
    loadMore,
    filterOptions,
    statusOptions,
  } = useProjects();

  const renderItem = ({ item }) => {
    const managerName = item?.manager || item?.duty_staff || '-';

    return (
        <ProjectCard
          moduleId={item.key_code || item.module_id || item.module_number}
          name={item.customer || item.name}
          location={item?.address || item?.location_address}
          onBTFormPress={() => handleBTFormPress(item.id)}
          onQFormPress={() => handleQFormPress(item.id)}
          role={userInfo?.role?.role_name?.toLowerCase()}
          managerName={managerName}
          status={item.status}
          statusOptions={statusOptions}
        />
    );
  };

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.Projects')}
          showLeftContainer
          showRightContainer
        />
        <ScreenWrapper style={Styles.screenWrapper}>
          <View style={Styles.container}>
            <View style={Styles.filterCardContainer}>
              <FilterCard
                filterData={filterOptions.statuses}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </View>

            {loading && page === 1 ? (
              <ActivityLoader fullscreen />
            ) : (
              <FlatList
                data={projects}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                  <View style={Styles.itemSeparator} />
                )}
                keyExtractor={item => item?.id?.toString()}
                contentContainerStyle={Styles.listContent}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                // onEndReachedThreshold={0.5}
                ListEmptyComponent={() => (
                  <EmptyList text={t('Label.NoProjectsFound')} />
                )}
                ListFooterComponent={
                  loading && page > 1 ? (
                    <View style={{ marginVertical: SIZES.hp_2 }}>
                      <ActivityLoader size="large" />
                    </View>
                  ) : null
                }
              />
            )}
          </View>
        </ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default ProjectsContainer;
