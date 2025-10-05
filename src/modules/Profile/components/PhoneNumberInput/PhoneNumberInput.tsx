import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
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

  const [key, setKey] = useState<number>(0);

  const handleCountryChange = (country: any) => {
    setKey(prevKey => prevKey + 1);
    if (onChangeCountryCode) {
      onChangeCountryCode(country);
    }
  };

  return (
    <>
      {showLabel && (
        <>
          <Text style={Styles.label}>{t('Label.PhoneNumber')}</Text>
          <View style={Styles.labelSpacing} />
        </>
      )}
      <PhoneInput
        key={key}
        defaultValue={value}
        onChangeCountry={handleCountryChange}
        ref={phoneInput}
        // value={value}
        placeholder="Phone number"
        defaultCode={countryCode ? countryCode : 'US'}
        layout="second"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        // onChangeCountry={onChangeCountryCode}
        containerStyle={[
          Styles.containerStyle,
          !!error && { ...Styles.errorFieldContainer },
        ]}
        textContainerStyle={Styles.textContainerStyle}
        textInputProps={{
          maxLength: maxLength,
          style: Styles.textInputProps,
        }}
        codeTextStyle={Styles.codeTextStyle}
      />
      {!!error && <Text style={Styles.errorInfo}>{error}</Text>}
    </>
  );
};

export default PhoneNumberInput;
