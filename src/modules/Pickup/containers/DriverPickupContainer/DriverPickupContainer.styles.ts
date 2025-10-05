import { StyleSheet } from 'react-native';

import { SIZES } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME_COLOR.gray100,
      paddingTop: SIZES.hp_2,
    },
    filterCardContainer: {
      marginBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    itemSeparator: {
      height: SIZES.hp_1,
    },
    listContent: {
      paddingBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_4,
    },
    loadingText: {
      marginTop: SIZES.hp_2,
      fontSize: SIZES.fs_16,
      color: THEME_COLOR.gray600,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_4,
    },
    emptyText: {
      fontSize: SIZES.fs_16,
      color: THEME_COLOR.gray600,
      textAlign: 'center',
    },
  });
