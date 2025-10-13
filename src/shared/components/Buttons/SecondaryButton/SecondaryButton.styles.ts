import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      borderRadius: SIZES.buttonRadius,
      paddingHorizontal: SIZES.wp_6,
      paddingVertical: SIZES.hp_2,
      borderWidth: 1,
      borderColor: THEME_COLOR.gray,
      backgroundColor: THEME_COLOR.white,
      ...commonStyles.rowCenter,
    },
    text: {
      color: THEME_COLOR.black100,
      ...TEXT_STYLE.buttonPrimary,
      textAlign: 'center',
    },
  });
