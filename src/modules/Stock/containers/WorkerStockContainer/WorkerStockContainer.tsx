import { FlatList, View, Text, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS } from '@assets/svg';
import { DATA, TOP_TABS_REQUESTS } from '@constant';
import { useTheme } from '@providers';
import {
  DateTimeSelector,
  Dropdown,
  FullScreenWrapper,
  Header,
  KeyboardAwareScrollWrapper,
  PrimaryButton,
  RequestCard,
  SafeAreaViewWrapper,
  ScreenWrapper,
  TabBar,
  TextField,
  WorkerRequestCard,
  WorkRequestModal,
} from '@shared/components';
import { ItemQuantityTable } from '../../components/components';
import { useWorkerStock } from '../../hooks/hooks';
import { styles } from './WorkerStockContainer.styles';

const WorkerStockContainer = () => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  const {
    activeTab,
    filteredRequests,
    formData,
    isFormValid,
    isDatePickerVisible,
    setActiveTab,
    handleFieldChange,
    showDatePicker,
    handleDateConfirm,
    hideDatePicker,
    handleCreateRequest,
    selectedItems,
    availableItems,
    handleUpdateQty,
    handleMultiSelectChange,
    assignedProjects,
    selectedProject,
    loadingProjects,
    loadingItems,
    loading,
    loadingRequests,
    resetForm,
    modalVisible,
    selectedRequest,
    openModal,
    closeModal,
    loadStockRequests,
  } = useWorkerStock();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.StockRequests')}
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
            <>
              {loadingRequests ? (
                <View style={Styles.emptyContainer}>
                  <Text style={Styles.emptyText}>Loading stock requests...</Text>
                </View>
              ) : filteredRequests?.length > 0 ? (
                <FlatList
                  data={filteredRequests}
                  keyExtractor={item => item.id?.toString() || item.request_id?.toString() || Math.random().toString()}
                  renderItem={({ item }) => (
                    <RequestCard
                      request={item}
                      type="stock"
                      onPressDetail={async (request) => await openModal(request)}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={Styles.itemSeparator} />
                  )}
                  contentContainerStyle={Styles.listContainer}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={loadingRequests}
                      onRefresh={loadStockRequests}
                      colors={[THEME_COLOR.primary]}
                      tintColor={THEME_COLOR.primary}
                    />
                  }
                />
              ) : (
                <View style={Styles.emptyContainer}>
                  <Text style={Styles.emptyText}>No stock requests found</Text>
                </View>
              )}
            </>
          )}

          {activeTab === TOP_TABS_REQUESTS.CREATE && (
            <KeyboardAwareScrollWrapper applyHorizontalPadding>
              <Dropdown
                showLabel
                label={t('Label.Project')}
                placeholder={loadingProjects ? 'Loading projects...' : t('Label.SelectProject')}
                data={[
                  { label: t('Label.SelectProject'), value: '' },
                  ...assignedProjects.map(project => ({
                    label: `${project.project_id} - ${project.customer || project.name || 'Unknown Project'}`,
                    value: project.id.toString(),
                  }))
                ]}
                value={formData.project}
                onChange={item => handleFieldChange('project', item.value)}
                iconColor={THEME_COLOR.gray}
                disabled={loadingProjects}
              />

              {/* Show project assignment info */}
              {selectedProject && (
                <View style={Styles.fieldSpacing}>
                  <View style={Styles.assignmentInfo}>
                    <Text style={Styles.assignmentText}>
                      Warehouse: {selectedProject.warehouse_name || 'N/A'}
                    </Text>
                    <Text style={Styles.assignmentText}>
                      Driver: {selectedProject.driver_name || selectedProject.driver || 'N/A'}
                    </Text>
                  </View>
                </View>
              )}

              <View style={Styles.fieldSpacing} />
              <Dropdown
                showLabel
                multiSelect
                label={t('Label.ItemName')}
                placeholder={loadingItems ? 'Loading items...' : `Select items (${(availableItems || []).length} available)`}
                data={(availableItems || []).map(item => ({
                  label: item.item_name || item.name,
                  value: item.item_code || item.code,
                }))}
                value={selectedItems.map(item => item.code)}
                onChange={handleMultiSelectChange}
                iconColor={THEME_COLOR.gray}
                RightIcon={ICONS.PLUS.default}
                disabled={loadingItems || !selectedProject}
                searchable={true}
                maxHeight={250}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                  showsVerticalScrollIndicator: true,
                }}
              />
              {selectedItems.length > 0 && (
                <ItemQuantityTable
                  items={selectedItems}
                  handleUpdateQty={handleUpdateQty}
                />
              )}

              <View style={Styles.rowContainer}>
                <View style={Styles.halfWidth}>
                  <Dropdown
                    showLabel
                    label={'Priority'}
                    placeholder="Select Priority"
                    data={[
                      { label: 'Low', value: 'low' },
                      { label: 'Normal', value: 'normal' },
                      { label: 'High', value: 'high' },
                      { label: 'Urgent', value: 'urgent' },
                    ]}
                    value={formData.urgency}
                    onChange={item => handleFieldChange('urgency', item.value)}
                    iconColor={THEME_COLOR.gray}
                  />
                </View>

                <View style={Styles.halfWidth}>
                  <TextField
                    showLabel
                    label="Request Date & Time"
                    placeholder="Enter Date & Time"
                    value={formData.requestDateTime}
                    onChangeText={text =>
                      handleFieldChange('requestDateTime', text)
                    }
                    inputContainerStyle={Styles.textContainer}
                    showRightIcon
                    showRightCustomIcon
                    rightIconColor={THEME_COLOR.gray}
                    RightIcon={ICONS.CALENDAR.default}
                    editable={false}
                    pointerEvents="none"
                    onPressInput={() => showDatePicker()}
                  />
                </View>
              </View>

              <View style={Styles.buttonSpacing}>
                <PrimaryButton
                  text="Create Request"
                  containerStyle={Styles.buttonContainer}
                  disabled={!isFormValid}
                  onPress={() => handleCreateRequest()}
                />
                
                {(selectedItems.length > 0 || formData.project || formData.urgency) && (
                  <PrimaryButton
                    text="Clear Form"
                    containerStyle={[Styles.buttonContainer, Styles.clearButton]}
                    textStyle={Styles.clearButtonText}
                    disabled={loading}
                    onPress={resetForm}
                  />
                )}
              </View>
            </KeyboardAwareScrollWrapper>
          )}
        </ScreenWrapper>
      </FullScreenWrapper>
      <DateTimeSelector
        isVisible={isDatePickerVisible}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <WorkRequestModal
        visible={modalVisible}
        workerInfo={selectedRequest}
        type="stock"
        onClose={closeModal}
        onPrimaryAction={() => {
          // Handle primary action if needed
          console.log('Primary action pressed');
        }}
        onStatusUpdate={(status) => {
          // Handle status update if needed
          console.log('Status update:', status);
        }}
      />
    </SafeAreaViewWrapper>
  );
};

export default WorkerStockContainer;
