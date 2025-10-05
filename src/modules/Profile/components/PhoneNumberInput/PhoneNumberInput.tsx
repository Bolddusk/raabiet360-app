import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import { PhoneInputTypes } from '@types';
import { styles } from './PhoneNumberInput.styles';

const PhoneNumberInput = ({
  showLabel,
  value,
  maxLength,
  countryCode,
  error,
  phoneInput,
  onChangeText,
  onChangeFormattedText,
  onChangeCountryCode,
}: PhoneInputTypes) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <>
      {showLabel && (
        <>
          <Text style={Styles.label}>{t('Label.PhoneNumber')}</Text>
          <View style={Styles.labelSpacing} />
        </>
      )}
      <View style={[
        Styles.containerStyle,
        !!error && { ...Styles.errorFieldContainer },
      ]}>
        <TextInput
          ref={phoneInput}
          value={value}
          placeholder="Phone number"
          onChangeText={onChangeText}
          maxLength={maxLength}
          style={Styles.textInputProps}
        />
      </View>
      {!!error && <Text style={Styles.errorInfo}>{error}</Text>}
    </>
  );
};

export default PhoneNumberInput;
