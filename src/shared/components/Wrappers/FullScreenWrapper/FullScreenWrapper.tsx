import { View } from 'react-native';

import { useTheme } from '@providers';
import { SIZES } from '@styles/theme';
import { WrapperProps } from '@types';
import { styles } from './FullScreenWrapper.styles';

const FullScreenWrapper = (props: WrapperProps) => {
  const {
    children,
    bgColor,
    style,
    applyHorizontalPadding,
    applyVerticalPadding,
    paddingHorizontal = SIZES.screenSpacingHorizontal,
    paddingVertical = SIZES.hp_2,
  } = props;

  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  return (
    <View
      style={[
        Styles.container,
        style,
        applyHorizontalPadding && { paddingHorizontal },
        applyVerticalPadding && { paddingVertical },
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      {children}
    </View>
  );
};

export default FullScreenWrapper;
