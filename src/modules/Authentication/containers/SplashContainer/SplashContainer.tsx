import React from 'react';
import { Image, View } from 'react-native';

import { ICONS } from '@assets/svg';
import { useTheme } from '@providers';
import { FullScreenWrapper } from '@shared/components';
import { styles } from './SplashContainer.styles';

const SplashContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  return (
    <FullScreenWrapper>
      <View style={Styles.container}>
        <Image source={ICONS.LOGO} resizeMode="contain" style={Styles.logo} />
      </View>
    </FullScreenWrapper>
  );
};

export default SplashContainer;
