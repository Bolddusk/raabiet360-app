import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { useStock, useTheme } from '@providers';
import {
  FilterCard,
  FullScreenWrapper,
  Header,
  RequestCard,
  SafeAreaViewWrapper,
  ScreenWrapper,
  WorkRequestModal,
} from '@shared/components';
import { styles } from './DriverStockContainer.styles';

const DriverStockContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const {
    selectedFilter,
    filteredRequests,
    modalVisible,
    selectedWorker,
    loading,
    isDriver,
    statusOptions,
    setSelectedFilter,
    updateRequestStatus,
    openModal,
    closeModal,
    loadStockRequests,
    loadAllStockRequests,
    filterRequestsByCreatorRole,
  } = useStock();

  // Load stock requests when component mounts
  useEffect(() => {
    loadAllStockRequests();
  }, []);
  const { t } = useTranslation();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.DriverStockRequests')}
        />
        <ScreenWrapper>
          <View style={Styles.container}>
            <View style={Styles.filterCardContainer}>
              <FilterCard
                statusOptions={statusOptions}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </View>
            <FlatList
              data={filterRequestsByCreatorRole(filteredRequests, [])}
              renderItem={({ item }) => (
        <RequestCard
          request={item}
          onStatusUpdate={updateRequestStatus}
          type="stock"
          onPressDetail={async (request) => await openModal(request)}
        />
              )}
              ItemSeparatorComponent={() => (
                <View style={Styles.itemSeparator} />
              )}
              keyExtractor={(item) => {
                // Use request_id for stock requests, replenishment_id for replenishments
                if (item.item === 'replenishment') {
                  return `replenishment-${item.replenishment_id || item.id}`;
                } else {
                  return `stock-${item.request_id || item.id}`;
                }
              }}
              contentContainerStyle={Styles.listContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={loadStockRequests}
                  colors={[THEME_COLOR.primary]}
                  tintColor={THEME_COLOR.primary}
                />
              }
              ListEmptyComponent={
                loading ? (
                  <View style={Styles.loadingContainer}>
                    <ActivityIndicator size="large" color={THEME_COLOR.primary} />
                  </View>
                ) : (
                  <View style={Styles.emptyContainer}>
                    <Text style={Styles.emptyText}>
                      No assigned stock requests found
                    </Text>
                  </View>
                )
              }
            />
          </View>
        </ScreenWrapper>
      </FullScreenWrapper>
      {modalVisible && selectedWorker && (
        <WorkRequestModal
          key={`${selectedWorker.id}-${selectedWorker.notes || 'no-notes'}`}
          visible={modalVisible}
          workerInfo={selectedWorker}
          type="stock"
          onClose={closeModal}
          onPrimaryAction={() => {}}
          onStatusUpdate={updateRequestStatus}
        />
      )}
    </SafeAreaViewWrapper>
  );
};

export default DriverStockContainer;
