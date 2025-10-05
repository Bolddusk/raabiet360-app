import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS } from '@assets/svg';
import { USER_ROLE } from '@constant';
import { useAuth, useTheme } from '@providers';
import { isDriver } from '@utils/roleUtils';
import {
  ConfirmationModal,
  FullScreenWrapper,
  KeyboardAwareScrollWrapper,
  ModalLoader,
  PrimaryButton,
  SafeAreaViewWrapper,
  ScreenWrapper,
} from '@shared/components';
import { LanguageCode } from '@types';
import {
  DriverDetailsCard,
  ProfileInfo,
  SelectionToggle,
  VehicleDetailsCard,
} from '../../components/components';
import { useEditProfile } from '../../hooks/hooks';
import { styles } from './ProfileContainer.styles';

const ProfileContainer = () => {
  const { THEME_COLOR, currentTheme, toggleTheme } = useTheme();
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  const {
    isLogoutModalVisible,
    currentLanguage,
    isLoggingOut,
    handleEditProfile,
    handleLanguageChange,
    handleLogoutPress,
    handleCancelLogout,
    handleConfirmLogout,
  } = useEditProfile();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <View style={Styles.topSpacer} />
        <ScreenWrapper />
        <View style={Styles.absoluteOverlay}>
          <KeyboardAwareScrollWrapper
            applyHorizontalPadding
            applyVerticalPadding>
            <ProfileInfo
              name={userInfo?.first_name + ' ' + userInfo?.last_name}
              role={userInfo?.role?.role_name}
              startTime={userInfo?.start_time}
              endTime={userInfo?.end_time}
              profileImage={userInfo?.profileImage}
            />

            <DriverDetailsCard
              name={userInfo?.first_name + ' ' + userInfo?.last_name}
              phone={userInfo?.mobile}
              email={userInfo?.email}
              role={userInfo?.role?.role_name?.toLowerCase()}
              designation={userInfo?.role?.role_name}
              onEdit={() => handleEditProfile()}
            />

            {isDriver(userInfo?.role) && (
              <VehicleDetailsCard
                vehicleName={userInfo?.vehicle_name}
                vehicleNumber={userInfo?.vehicle_number}
                status={userInfo?.vehicle_status}
                color={userInfo?.vehicle_color}
                model={userInfo?.vehicle_model}
                vehicleImage={userInfo?.vehicle_image}
              />
            )}

            <SelectionToggle
              label={t('Label.Theme')}
              options={[
                { label: t('Button.Label.Light'), value: 'light' },
                { label: t('Button.Label.Dark'), value: 'dark' },
              ]}
              selectedValue={currentTheme}
              onToggle={() => toggleTheme()}
            />

            <SelectionToggle
              label={t('Label.Language')}
              options={[
                { label: 'English', value: 'en_US' },
                { label: 'French', value: 'fr_CA' },
              ]}
              selectedValue={currentLanguage}
              onToggle={(value: string) =>
                handleLanguageChange(value as LanguageCode)
              }
            />

            <PrimaryButton
              text={t('Button.Label.Logout')}
              containerStyle={Styles.logoutButton}
              onPress={handleLogoutPress}
            />
          </KeyboardAwareScrollWrapper>
        </View>
        {isLogoutModalVisible && (
          <ConfirmationModal
            iconType="custom"
            Icon={ICONS.LOGOUT.default}
            visible={isLogoutModalVisible}
            title={t('Message.Confirmation.LogoutTitle')}
            subtitle={t('Message.Confirmation.LogoutSubtitle')}
            onPrimaryAction={handleConfirmLogout}
            primaryButtonLabel={t('Button.Label.Logout')}
            onSecondaryAction={handleCancelLogout}
            secondaryButtonLabel={t('Button.Label.Cancel')}
          />
        )}

        {isLoggingOut && (
          <ModalLoader
            isVisible={isLoggingOut}
            showTitle
            title={t('Message.LoggingOut')}
          />
        )}
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default ProfileContainer;
