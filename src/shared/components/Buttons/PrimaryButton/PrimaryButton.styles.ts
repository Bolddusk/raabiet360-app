import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      // borderWidth: 1,
      // borderColor: THEME_COLOR.primary100,
      borderRadius: SIZES.buttonRadius,
      backgroundColor: THEME_COLOR.primary,
      paddingHorizontal: SIZES.wp_6,
      paddingVertical: SIZES.hp_p15,
      ...commonStyles.center,
    },
    text: {
      textAlign: 'center',
      color: THEME_COLOR.white,
      ...TEXT_STYLE.buttonPrimary,
    },
  });
