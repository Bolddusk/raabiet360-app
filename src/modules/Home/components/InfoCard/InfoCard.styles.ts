import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    primaryCard: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 15,
      height: SIZES.hp_12,
      ...commonStyles.center,
      ...commonStyles.shadow_1,
    },
    secondaryCard: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: SIZES.wp_2,
      paddingVertical: SIZES.hp_1,
      borderWidth: 0.5,
      borderColor: THEME_COLOR.primary,
      width: SIZES.wp_28,
    },
    leftOffset: {
      left: 4,
      borderLeftWidth: 4,
      borderLeftColor: THEME_COLOR.primary,
    },
    count: {
      ...TEXT_STYLE.h2,
      color: THEME_COLOR.black100,
    },
    primaryLabel: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black100,
      marginHorizontal: SIZES.wp_3,
      marginTop: SIZES.hp_p05,
      textAlign: 'center',
    },
    secondaryLabel: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black100,
      // marginTop: SIZES.hp_1,
      maxWidth: SIZES.wp_25,
    },
  });
