import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS, IMAGES } from '@assets/svg';
import { useTheme } from '@providers';
import {
  Header,
  KeyboardAwareScrollWrapper,
  PrimaryButton,
  SafeAreaViewWrapper,
  TextField,
} from '@shared/components';
import { iconSize } from '@styles/theme';
import { useLogin } from '../../hooks/hooks';
import { styles } from './ForgotPasswordContainer.styles';

const IconSize = iconSize(0.8);

const ForgotPasswordContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();
  const {
    formValues,
    formErrors,
    handleChange,
    goToLogin,
    handleForgotContinue,
  } = useLogin();

  return (
    <SafeAreaViewWrapper statusBarColor={THEME_COLOR.white}>
      <Header showLeftContainer variant="simple" />
      <KeyboardAwareScrollWrapper
        applyHorizontalPadding
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.contentWrapper}>
        <View style={Styles.iconWrapper}>
          <IMAGES.FORGOT_PASSWORD.default width={IconSize} height={IconSize} />
        </View>

        <Text style={Styles.title}>{t('ForgotPassword?')}</Text>
        <View style={Styles.spacing} />

        <TextField
          value={formValues?.email}
          onChangeText={text => handleChange('email', text)}
          placeholder={t('Email')}
          showLabel
          label={t('Email')}
          keyboardType="email-address"
          showLeftIcon
          showLeftCustomIcon
          LeftIcon={ICONS.EMAIL.default}
          showError
          error={formErrors?.email}
        />
        <Text
          style={Styles.loginText}
          onPress={() => {
            goToLogin();
          }}>
          {t('Login')}
        </Text>
        <View style={Styles.buttonWrapper}>
          <PrimaryButton
            text={t('Continue')}
            disabled={formValues?.email.trim().length === 0}
            onPress={() => handleForgotContinue()}
          />
        </View>
      </KeyboardAwareScrollWrapper>
    </SafeAreaViewWrapper>
  );
};

export default ForgotPasswordContainer;
