import { SafeAreaView as RNSafeAreaView, StatusBar, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useTheme } from '@providers';
import { SIZES } from '@styles/theme';
import { WrapperProps } from '@types';
import { styles } from './SafeAreaViewWrapper.styles';

const SafeAreaView = (props: WrapperProps) => {
  const {
    children,
    bgColor,
    style,
    applyHorizontalPadding,
    applyVerticalPadding,
    paddingHorizontal = SIZES.screenSpacingHorizontal,
    paddingVertical = SIZES.hp_2,
    statusBarColor,
  } = props;

  const { currentTheme, THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View
        style={{
          height: insets.top,
          backgroundColor: statusBarColor ?? THEME_COLOR.primary,
        }}>
        <StatusBar
          animated={true}
          // backgroundColor={THEME_COLOR.white}
          backgroundColor={statusBarColor ?? THEME_COLOR.primary}
          barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
        />
      </View>
      <RNSafeAreaView
        style={[
          Styles.container,
          style,
          applyHorizontalPadding && { paddingHorizontal },
          applyVerticalPadding && { paddingVertical },
          bgColor ? { backgroundColor: bgColor } : {},
        ]}>
        {children}
      </RNSafeAreaView>
    </SafeAreaProvider>
  );
};

export default SafeAreaView;
