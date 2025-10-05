import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '@providers';
import { isIOS } from '@shared/utils/helpers';
import { ACTIVE_OPACITY, SIZES } from '@styles/theme';
import { ButtonTypes } from '@types';
import { styles } from './PrimaryButton.styles';

const PrimaryButton = ({
  onPress,
  text,
  disabled,
  loading,
  borderColor,
  backgroundColor,
  textColor,
  alignSelf,
  containerStyle,
  textStyle,
  activeOpacity,
}: ButtonTypes) => {
  const { THEME_COLOR } = useTheme();

  const Styles = styles({ THEME_COLOR });

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        disabled && { opacity: 0.4 },
        Styles.container,
        containerStyle,
        backgroundColor ? { backgroundColor: backgroundColor } : {},
        alignSelf ? { alignSelf } : {},
        borderColor ? { borderColor } : {},
        loading && !isIOS() ? { paddingVertical: SIZES.hp_p175 } : {},
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity ?? ACTIVE_OPACITY}>
      {loading ? (
        <ActivityIndicator size="small" color={THEME_COLOR.white} />
      ) : (
        <Text
          style={[
            Styles.text,
            textStyle,
            textColor ? { color: textColor } : {},
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
