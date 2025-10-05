import { StyleSheet } from 'react-native';

import { commonStyles, SIZES } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: THEME_COLOR.blackTransparent,
      ...commonStyles.center,
      paddingHorizontal: SIZES.wp_4,
      paddingVertical: SIZES.hp_3,
    },
    modalContainer: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 16,
      width: '100%',
      maxHeight: '90%',
      overflow: 'hidden',
    },
  });
