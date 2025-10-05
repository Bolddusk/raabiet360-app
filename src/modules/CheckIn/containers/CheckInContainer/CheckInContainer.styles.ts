import { StyleSheet } from 'react-native';

import { SIZES } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    screenWrapper: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    tabWrapper: {
      marginVertical: SIZES.screenSpacingHorizontal,
    },
    itemSeparator: {
      height: SIZES.hp_p15,
    },
    listContainer: {
      paddingHorizontal: SIZES.screenSpacingHorizontal,
      paddingBottom: SIZES.hp_3,
    },
  });
