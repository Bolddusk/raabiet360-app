import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS, IMAGES } from '@assets/svg';
import { useTheme } from '@providers';
import {
  KeyboardAwareScrollWrapper,
  PrimaryButton,
  SafeAreaViewWrapper,
  TextField,
} from '@shared/components';
import { commonStyles, iconSize } from '@styles/theme';
import { useLogin } from '../../hooks/hooks';
import { styles } from './LoginContainer.styles';

const IconSize = iconSize(0.65);

const LoginContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();

  const {
    formValues,
    formErrors,
    showPassword,
    isSubmitting,
    handleChange,
    goToForgotPassword,
    handleSignIn,
    togglePasswordVisibility,
  } = useLogin();

  const isValid =
    formValues.email.trim().length > 0 && formValues.password.trim().length > 0;

  return (
    <SafeAreaViewWrapper statusBarColor={THEME_COLOR.white}>
      <KeyboardAwareScrollWrapper
        applyHorizontalPadding
        keyboardShouldPersistTaps="handled">
        <View style={commonStyles.fullView}>
          <View style={Styles.contentWrapper}>
            <View style={Styles.iconWrapper}>
              <IMAGES.LOGIN.default width={IconSize} height={IconSize} />
            </View>

            <Text style={Styles.title}>{t('SignIn')}</Text>
            <View style={Styles.spacing} />

            <TextField
              value={formValues?.email}
              onChangeText={text => handleChange('email', text)}
              placeholder={t('EnterEmail')}
              showLabel
              label={t('Email')}
              keyboardType="email-address"
              showLeftIcon
              showLeftCustomIcon
              LeftIcon={ICONS.EMAIL.default}
              showError
              error={formErrors?.email}
              inputContainerStyle={Styles.inputContainer}
            />
            <View style={Styles.spacing} />
            <TextField
              value={formValues.password}
              onChangeText={text => handleChange('password', text)}
              placeholder={t('EnterPassword')}
              showLabel
              label={t('Password')}
              secureTextEntry={!showPassword}
              showRightIcon
              showRightCustomIcon
              secureEye={showPassword}
              onRightIconClick={togglePasswordVisibility}
              showError
              error={formErrors?.password}
              inputContainerStyle={Styles.inputContainer}
            />
            <Text
              style={Styles.forgotPasswordText}
              onPress={() => {
                goToForgotPassword();
              }}>
              {t('ForgotPassword?')}
            </Text>
          </View>

          <View style={Styles.buttonWrapper}>
            <PrimaryButton
              text={t('SignIn')}
              disabled={!isValid || isSubmitting}
              onPress={() => handleSignIn()}
              loading={isSubmitting}
            />
          </View>
        </View>
      </KeyboardAwareScrollWrapper>
    </SafeAreaViewWrapper>
  );
};

export default LoginContainer;
