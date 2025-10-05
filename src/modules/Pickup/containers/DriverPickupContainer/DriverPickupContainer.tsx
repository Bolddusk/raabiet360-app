import { FlatList, View, Text, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';

import { usePickup, useTheme, useAuth } from '@providers';
import {
  ActivityLoader,
  FilterCard,
  FullScreenWrapper,
  Header,
  RequestCard,
  SafeAreaViewWrapper,
  ScreenWrapper,
  WorkRequestModal,
} from '@shared/components';
import { styles } from './DriverPickupContainer.styles';

const DriverPickupContainer = () => {
  const { THEME_COLOR } = useTheme();
  const { userInfo } = useAuth();
  const Styles = styles({ THEME_COLOR });

  const {
    selectedFilter,
    filteredRequests,
    modalVisible,
    selectedWorker,
    loading,
    setSelectedFilter,
    updateRequestStatus,
    openModal,
    closeModal,
    loadPickupRequests,
  } = usePickup();
  const { t } = useTranslation();


  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.WorkerPickup')}
        />
        <ScreenWrapper>
          <View style={Styles.container}>
            <View style={Styles.filterCardContainer}>
              <FilterCard
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </View>
            {loading ? (
              <View style={Styles.loadingContainer}>
                <ActivityLoader />
                <Text style={Styles.loadingText}>Loading pickup requests...</Text>
              </View>
            ) : filteredRequests.length > 0 ? (
              <FlatList
                data={filteredRequests}
                renderItem={({ item }) => (
                  <RequestCard
                    request={item}
                    onStatusUpdate={updateRequestStatus}
                    type="pickup"
                    onPressDetail={openModal}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={Styles.itemSeparator} />
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={Styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={loadPickupRequests}
                    colors={[THEME_COLOR.primary]}
                    tintColor={THEME_COLOR.primary}
                  />
                }
              />
            ) : (
              <View style={Styles.emptyContainer}>
                <Text style={[Styles.emptyText, { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }]}>
                  No Pickup Requests Found
                </Text>
                <Text style={Styles.emptyText}>
                  You don't have any pickup requests assigned to you yet.
                </Text>
                <Text style={[Styles.emptyText, { marginTop: 20, fontSize: 14 }]}>
                  Driver ID: {userInfo?.id} | Filter: {selectedFilter}
                </Text>
              </View>
            )}
          </View>
        </ScreenWrapper>
      </FullScreenWrapper>
      {modalVisible && selectedWorker && (
        <WorkRequestModal
          key={`${selectedWorker.id}-${selectedWorker.notes || 'no-notes'}`}
          visible={modalVisible}
          workerInfo={selectedWorker}
          onClose={closeModal}
          onPrimaryAction={closeModal}
          onStatusUpdate={updateRequestStatus}
          type="pickup"
        />
      )}
    </SafeAreaViewWrapper>
  );
};

export default DriverPickupContainer;
