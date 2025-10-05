import { FlatList, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS } from '@assets/svg';
import { DATA, TOP_TABS_REQUESTS } from '@constant';
import { useTheme } from '@providers';
import {
  ActivityLoader,
  ConfirmationModal,
  DateTimeSelector,
  Dropdown,
  FullScreenWrapper,
  Header,
  KeyboardAwareScrollWrapper,
  PrimaryButton,
  SafeAreaViewWrapper,
  ScreenWrapper,
  TabBar,
  TextField,
  WorkerRequestCard,
} from '@shared/components';
import { PickupDetailsModal } from '../../components/components';
import { useWorkerPickup } from '../../hooks/hooks';
import { styles } from './WorkerPickupContainer.styles';

const WorkerPickupContainer = () => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  const {
    activeTab,
    filteredRequests,
    formData,
    isFormValid,
    showConfirmationModal,
    isDatePickerVisible,
    isPickupDetailsModalVisible,
    selectedPickupRequest,
    loading,
    projectsLoading,
    projectOptions,
    setActiveTab,
    handleFieldChange,
    showDatePickerForField,
    handleDateConfirm,
    hideDatePicker,
    handleCreateRequest,
    handleFinish,
    handleShowPickupDetails,
    handleClosePickupDetails,
  } = useWorkerPickup();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.PickupRequests')}
        />
        <ScreenWrapper>
          <View style={Styles.tabWrapper}>
            <TabBar
              tabs={DATA.workerPickupTabs}
              activeTab={activeTab}
              onTabPress={tabId => setActiveTab(tabId as TOP_TABS_REQUESTS)}
            />
          </View>

          {activeTab === TOP_TABS_REQUESTS.RECENT && (
            loading ? (
              <View style={Styles.loadingContainer}>
                <ActivityLoader />
                <Text style={Styles.loadingText}>Loading pickup requests...</Text>
              </View>
            ) : filteredRequests.length > 0 ? (
              <FlatList
                data={filteredRequests}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <WorkerRequestCard
                    request={item}
                    onPressDetail={() => handleShowPickupDetails(item)}
                    type="pickup"
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={Styles.itemSeparator} />
                )}
                contentContainerStyle={Styles.listContainer}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={Styles.emptyContainer}>
                <Text style={Styles.emptyText}>No pickup requests found</Text>
              </View>
            )
          )}

          {activeTab === 'create' && (
            <KeyboardAwareScrollWrapper applyHorizontalPadding>
              {projectsLoading ? (
                <View style={Styles.formLoadingContainer}>
                  <ActivityLoader />
                  <Text style={Styles.formLoadingText}>Loading projects...</Text>
                </View>
              ) : projectOptions.length > 0 ? (
                <Dropdown
                  showLabel
                  label={t('Label.Project')}
                  placeholder={t('Label.SelectProject')}
                  data={projectOptions}
                  value={formData.project}
                  onChange={item => handleFieldChange('project', item.value)}
                />
              ) : (
                <View style={Styles.formEmptyContainer}>
                  <Text style={Styles.formEmptyText}>No projects assigned to you</Text>
                </View>
              )}
              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.Destination')}
                placeholder={t('Label.SelectLocation')}
                value={formData.destination}
                onChangeText={text => handleFieldChange('destination', text)}
                inputContainerStyle={Styles.textContainer}
                editable={false}
              />
              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.PickupDateTime')}
                placeholder={t('Label.SelectDateTime')}
                value={formData.pickupDateTime}
                inputContainerStyle={Styles.textContainer}
                showRightIcon
                showRightCustomIcon
                rightIconColor={THEME_COLOR.gray}
                RightIcon={ICONS.CALENDAR.default}
                editable={false}
                pointerEvents="none"
                onPressInput={() => showDatePickerForField('pickupDateTime')}
              />
              <View style={Styles.buttonSpacing}>
                <PrimaryButton
                  text={loading ? 'Creating...' : t('Button.Label.CreateRequest')}
                  containerStyle={Styles.buttonContainer}
                  disabled={!isFormValid || loading || projectsLoading || projectOptions.length === 0}
                  onPress={handleCreateRequest}
                />
              </View>
            </KeyboardAwareScrollWrapper>
          )}
        </ScreenWrapper>
      </FullScreenWrapper>

      {showConfirmationModal && (
        <ConfirmationModal
          visible={showConfirmationModal}
          iconType="success"
          title={t('Message.RequestSubmittedTitle')}
          subtitle={t('Message.RequestSubmittedSubtitle')}
          primaryButtonLabel={t('Button.Label.Finish')}
          onPrimaryAction={handleFinish}
        />
      )}

      {selectedPickupRequest && (
        <PickupDetailsModal
          visible={isPickupDetailsModalVisible}
          onClose={handleClosePickupDetails}
          data={{
            projectName: selectedPickupRequest.project || 'Unknown Project',
            status: selectedPickupRequest.status,
            pickupTime: `${selectedPickupRequest.time} | ${selectedPickupRequest.date}`,
            // Fixed: "Drop-off Time" should show drop_off_time (which may be empty)
            dropOffTime: selectedPickupRequest.drop_off_time 
              ? `${selectedPickupRequest.drop_off_time} | ${selectedPickupRequest.date}`
              : 'Not delivered yet',
            driverName: selectedPickupRequest.driver_name || 'No driver assigned',
            vehicleNo: selectedPickupRequest.vehicle_number || 'Not assigned',
            vehicleColor: selectedPickupRequest.vehicle_color || 'Not specified',
            createdAt: selectedPickupRequest.created_at 
              ? new Date(selectedPickupRequest.created_at).toLocaleString()
              : 'Unknown',
            completedAt: selectedPickupRequest.status === 'completed' 
              ? selectedPickupRequest.updated_at 
                ? new Date(selectedPickupRequest.updated_at).toLocaleString()
                : 'Recently completed'
              : undefined,
          }}
        />
      )}

      <DateTimeSelector
        isVisible={isDatePickerVisible}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaViewWrapper>
  );
};

export default WorkerPickupContainer;
