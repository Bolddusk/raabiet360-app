import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { commonStyles, SIZES } from '@styles/theme';
import { WrapperProps } from '@types';

const KeyboardAwareScrollWrapper = (props: WrapperProps) => {
  const {
    children,
    style,
    contentContainerStyle,
    applyHorizontalPadding,
    applyVerticalPadding,
    scrollEnabled = true,
    paddingHorizontal = SIZES.screenSpacingHorizontal,
    paddingVertical = SIZES.hp_2,
    keyboardShouldPersistTaps = 'never',
    bgColor,
  } = props;

  return (
    <KeyboardAwareScrollView
      style={[
        commonStyles.fullView,
        style,
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
      contentContainerStyle={[
        commonStyles.flexGrow,
        applyVerticalPadding && { paddingVertical },
        applyHorizontalPadding && { paddingHorizontal },
        contentContainerStyle,
      ]}
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      scrollEnabled={scrollEnabled}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareScrollWrapper;
