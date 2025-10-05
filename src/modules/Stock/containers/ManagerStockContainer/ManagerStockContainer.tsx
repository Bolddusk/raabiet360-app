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
import { styles } from './ManagerStockContainer.styles';

const ManagerStockContainer = () => {
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

  // Debug: Check for duplicate keys
  useEffect(() => {
    if (filteredRequests.length > 0) {
      const keys = filteredRequests.map(item => {
        if (item.item === 'replenishment') {
          return `replenishment-${item.replenishment_id || item.id}`;
        } else {
          return `stock-${item.request_id || item.id}`;
        }
      });
      const uniqueKeys = [...new Set(keys)];
      if (keys.length !== uniqueKeys.length) {
        console.log('🚨 Duplicate keys found:', keys.filter((key, index) => keys.indexOf(key) !== index));
      }
    }
  }, [filteredRequests]);
  const { t } = useTranslation();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.ManagersStockRequests')}
          showLeftContainer
          showRightContainer
        />
        <ScreenWrapper style={Styles.screenWrapper}>
          <View style={Styles.container}>
            <View style={Styles.filterCardContainer}>
              <FilterCard
                statusOptions={statusOptions}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </View>
            <FlatList
              data={filterRequestsByCreatorRole(filteredRequests, ['manager', 'admin'])}
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
                  <View key="loading" style={Styles.loadingContainer}>
                    <ActivityIndicator size="large" color={THEME_COLOR.primary} />
                  </View>
                ) : (
                  <View key="empty" style={Styles.emptyContainer}>
                    <Text style={Styles.emptyText}>
                      {filteredRequests.length === 0 
                        ? 'No stock requests found' 
                        : 'No requests from managers or admins found'
                      }
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

export default ManagerStockContainer;
