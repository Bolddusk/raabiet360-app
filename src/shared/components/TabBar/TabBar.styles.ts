import { StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      borderWidth: 0.5,
      borderColor: THEME_COLOR.primary,
      backgroundColor: THEME_COLOR.white,
      marginHorizontal: SIZES.screenSpacingHorizontal,
      borderRadius: 15,
    },
    tabContainer: {
      flexDirection: 'row',
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: SIZES.hp_p05,
      alignItems: 'center',
      borderRadius: 20,
    },
    activeTab: {
      backgroundColor: THEME_COLOR.primary,
    },
    tabText: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black,
    },
    activeTabText: {
      color: THEME_COLOR.white,
    },
  });
