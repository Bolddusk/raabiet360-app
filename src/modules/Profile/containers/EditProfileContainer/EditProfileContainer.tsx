import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import {
  FullScreenWrapper,
  Header,
  KeyboardAwareScrollWrapper,
  PrimaryButton,
  SafeAreaViewWrapper,
  ScreenWrapper,
  TextField,
} from '@shared/components';
import { useEditProfile } from '../../hooks/hooks';
import { styles } from './EditProfileContainer.styles';

const EditProfileContainer = () => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  const {
    infoData,
    passwordData,
    infoErrors,
    passwordErrors,
    passwordVisibility,
    isInfoChanged,
    isInfoUpdating,
    isPasswordUpdating,
    handleInfoChange,
    handlePasswordChange,
    togglePasswordVisibility,
    isInfoValid,
    isPasswordValid,
    handleUpdateInfo,
    handleUpdatePassword,
  } = useEditProfile();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.EditProfile')}
          showLeftContainer
          showRightContainer
        />
        <ScreenWrapper style={Styles.wrapperContainer}>
          <KeyboardAwareScrollWrapper
            applyVerticalPadding
            applyHorizontalPadding>
            <View style={Styles.container}>
              <Text style={Styles.title}>{t('Label.PersonalDetails')}</Text>
              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.FirstName')}
                value={infoData?.firstName}
                keyboardType="default"
                onChangeText={value => handleInfoChange('firstName', value)}
                showError={!!infoErrors.firstName}
                error={infoErrors.firstName}
              />

              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.LastName')}
                value={infoData?.lastName}
                keyboardType="default"
                onChangeText={value => handleInfoChange('lastName', value)}
                showError={!!infoErrors.lastName}
                error={infoErrors.lastName}
              />

              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.PhoneNumber')}
                value={infoData?.phoneNumber}
                keyboardType="phone-pad"
                onChangeText={value => handleInfoChange('lastName', value)}
                showError={!!infoErrors.phoneNumber}
                error={infoErrors.phoneNumber}
              />
              {/* <PhoneNumberInput
                showLabel
                value={formData.phoneNumber}
                phoneInput={phoneInput}
                maxLength={15}
                countryCode={formData.countryCode}
                onChangeText={handlePhoneChange}
                onChangeFormattedText={handleFormattedPhoneChange}
                onChangeCountryCode={handleCountryChange}
                error={errors.phoneNumber}
              /> */}

              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.Email')}
                value={infoData?.email}
                keyboardType="email-address"
                onChangeText={value => handleInfoChange('email', value)}
                showError={!!infoErrors.email}
                error={infoErrors.email}
              />

              <PrimaryButton
                text={t('Button.Label.Update')}
                onPress={handleUpdateInfo}
                disabled={
                  !isInfoValid() ||
                  !isInfoChanged ||
                  isInfoUpdating ||
                  isPasswordUpdating
                }
                loading={isInfoUpdating}
                containerStyle={Styles.buttonContainer}
              />

              <View style={Styles.fieldSpacing} />
              <Text style={Styles.title}>{t('Label.Password')}</Text>

              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.CurrentPassword')}
                value={passwordData?.currentPassword}
                showRightIcon
                showRightCustomIcon
                secureTextEntry={!passwordVisibility.currentPassword}
                secureEye
                onChangeText={value =>
                  handlePasswordChange('currentPassword', value)
                }
                onRightIconClick={() =>
                  togglePasswordVisibility('currentPassword')
                }
                showError={!!passwordErrors.currentPassword}
                error={passwordErrors.currentPassword}
              />

              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.NewPassword')}
                value={passwordData?.newPassword}
                showRightIcon
                showRightCustomIcon
                secureTextEntry={!passwordVisibility.newPassword}
                secureEye
                onChangeText={value =>
                  handlePasswordChange('newPassword', value)
                }
                onRightIconClick={() => togglePasswordVisibility('newPassword')}
                showError={!!passwordErrors.newPassword}
                error={passwordErrors.newPassword}
              />

              <View style={Styles.fieldSpacing} />
              <TextField
                showLabel
                label={t('Label.ConfirmNewPassword')}
                value={passwordData?.confirmPassword}
                showRightIcon
                showRightCustomIcon
                secureTextEntry={!passwordVisibility.confirmPassword}
                secureEye
                onChangeText={value =>
                  handlePasswordChange('confirmPassword', value)
                }
                onRightIconClick={() =>
                  togglePasswordVisibility('confirmPassword')
                }
                showError={!!passwordErrors.confirmPassword}
                error={passwordErrors.confirmPassword}
              />

              <PrimaryButton
                text={t('Button.Label.Update')}
                onPress={handleUpdatePassword}
                disabled={!isPasswordValid() || isInfoUpdating}
                loading={isPasswordUpdating}
                containerStyle={Styles.buttonContainer}
              />
            </View>
          </KeyboardAwareScrollWrapper>
        </ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default EditProfileContainer;
