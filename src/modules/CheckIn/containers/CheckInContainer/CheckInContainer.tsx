import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';

import { DATA, SCREEN, TOP_TABS_CHECKIN } from '@constant';
import { useTheme } from '@providers';
import {
  ConfirmationModal,
  FullScreenWrapper,
  Header,
  SafeAreaViewWrapper,
  ScreenWrapper,
  TabBar,
} from '@shared/components';
import { CheckInCard } from '../../components/components';
import { useCheckIn } from '../../hooks/useCheckIn';
import { styles } from './CheckInContainer.styles';

type ModalIconType = 'success' | 'error' | 'custom';

const CheckInContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const navigation = useNavigation();
  const {
    activeTab,
    filteredProjects,
    modalVisible,
    modalType,
    loading,
    buttonLoading,
    refreshing,
    hideModal,
    setActiveTab,
    handleCheckIn,
    handleConfirmation,
    onRefresh,
    errorMessage,
  } = useCheckIn();
  const { t } = useTranslation();

  const handleReportIssue = () => {
    hideModal();
    navigation.navigate(SCREEN.REPORT_CHECKIN as never);
  };

  const getModalProps = () => {
    switch (modalType) {
      case 'checkin-success':
        return {
          title: t('Modal.CheckInSuccess'),
          subtitle: t('Modal.CheckInSuccessMessage'),
          iconType: 'success' as ModalIconType,
          onPrimaryAction: handleConfirmation,
          primaryButtonLabel: t('Modal.OK'),
        };
      case 'checkin-failed':
        return {
          title: t('Modal.CheckInFailed'),
          subtitle: errorMessage || t('Modal.CheckInFailedMessage'),
          iconType: 'error' as ModalIconType,
          onPrimaryAction: hideModal,
          primaryButtonLabel: t('Modal.OK'),
          onSecondaryAction: handleReportIssue,
          secondaryButtonLabel: t('Modal.ReportIssue'),
        };
      case 'checkout-confirmation':
        return {
          title: t('Modal.CheckOutSuccess'),
          subtitle: t('Modal.CheckOutSuccessMessage'),
          iconType: 'success' as ModalIconType,
          onPrimaryAction: handleConfirmation,
          primaryButtonLabel: t('Modal.OK'),
        };
      default:
        return {
          title: '',
          subtitle: '',
          iconType: 'success' as ModalIconType,
          onPrimaryAction: hideModal,
          primaryButtonLabel: t('Modal.OK'),
        };
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <CheckInCard
        title={item.title}
        location={item.location}
        status={item.status}
        checkInTime={item.checkInTime}
        checkOutTime={item.checkOutTime}
        onCheckIn={() => handleCheckIn(item)}
        loading={buttonLoading === item.id}
      />
    ),
    [handleCheckIn, buttonLoading],
  );

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.CheckIn')}
          showLeftContainer
          showRightContainer
        />
        <ScreenWrapper style={Styles.screenWrapper}>
          <View style={Styles.tabWrapper}>
            <TabBar
              tabs={DATA.projectTabs}
              activeTab={activeTab}
              onTabPress={id => setActiveTab(id as TOP_TABS_CHECKIN)}
            />
          </View>
          <FlatList
            data={filteredProjects}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={Styles.itemSeparator} />}
            contentContainerStyle={Styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </ScreenWrapper>
      </FullScreenWrapper>
      {modalVisible && (
        <ConfirmationModal visible={modalVisible} {...getModalProps()} />
      )}
    </SafeAreaViewWrapper>
  );
};

export default CheckInContainer;
