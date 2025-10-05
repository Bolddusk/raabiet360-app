import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@providers';
import { WrapperProps } from '@types';
import { styles } from './ScreenWrapper.styles';

const ScreenWrapper: React.FC<WrapperProps> = ({ children, style }) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  return <View style={[Styles.container, style]}>{children}</View>;
};

export default ScreenWrapper;
