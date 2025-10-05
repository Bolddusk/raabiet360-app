import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '@providers';
import { ACTIVE_OPACITY } from '@styles/theme';
import { ButtonTypes } from '@types';
import { styles } from './SecondaryButton.styles';

const SecondaryButton = (props: ButtonTypes) => {
  const {
    onPress,
    text,
    disabled,
    loading,
    backgroundColor,
    textColor,
    alignSelf,
    containerStyle,
    textStyle,
  } = props;

  const { THEME_COLOR } = useTheme();

  const Styles = styles({ THEME_COLOR });

  return (
    <TouchableOpacity
      style={[
        Styles.container,
        containerStyle,
        disabled && { opacity: 0.4 },
        backgroundColor ? { backgroundColor: backgroundColor } : {},
        alignSelf ? { alignSelf } : {},
      ]}
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color={THEME_COLOR.black} />
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

export default SecondaryButton;
