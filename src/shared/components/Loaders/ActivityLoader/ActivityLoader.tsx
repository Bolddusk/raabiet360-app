import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@providers';
import { LoaderProps } from '@types';
import { styles } from './ActivityLoader.styles';

const ActivityLoader = (props: LoaderProps) => {
  const { size, color, fullscreen = false, showOverlayBackgroundColor } = props;
  const { THEME_COLOR } = useTheme();

  const Styles = styles({ THEME_COLOR });

  return fullscreen ? (
    <View
      style={[
        Styles.fullScreenContainer,
        showOverlayBackgroundColor && { backgroundColor: THEME_COLOR.blackTransparent },
      ]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || THEME_COLOR.black}
      />
    </View>
  ) : (
    <ActivityIndicator
      size={size || 'small'}
      color={color || THEME_COLOR.black}
    />
  );
};

export default ActivityLoader;
