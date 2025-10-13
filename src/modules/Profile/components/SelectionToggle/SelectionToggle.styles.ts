import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      ...commonStyles.justifyView,
      backgroundColor: THEME_COLOR.white,
      borderRadius: 15,
      padding: SIZES.wp_3,
      marginTop: SIZES.hp_2,
      ...commonStyles.shadow_3,
    },
    label: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black100,
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: THEME_COLOR.black,
      borderRadius: 100,
      padding: 4,
    },
    toggleButton: {
      paddingHorizontal: SIZES.wp_5,
      paddingVertical: SIZES.wp_1,
      borderRadius: 20,
    },
    activeToggle: {
      backgroundColor: THEME_COLOR.white,
    },
    toggleText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.white100,
    },
    activeToggleText: {
      color: THEME_COLOR.primary,
    },
  });
