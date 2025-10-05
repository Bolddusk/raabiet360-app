import { StyleSheet } from 'react-native';

import { SIZES } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: SIZES.hp_2,
    },
    screenWrapper: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    filterCardContainer: {
      marginBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    itemSeparator: {
      height: SIZES.hp_1,
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
  });
