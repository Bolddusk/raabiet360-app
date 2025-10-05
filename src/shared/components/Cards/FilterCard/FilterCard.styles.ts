import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      ...commonStyles.justifyView,
    },
    filterRow: {
      flexDirection: 'row',
      gap: SIZES.wp_3,
    },
    filterItem: {
      flex: 1,
    },
    filterLabel: {
      ...TEXT_STYLE.body1,
      color: THEME_COLOR.black,
      marginBottom: SIZES.hp_1,
    },
    allRequestsText: {
      ...TEXT_STYLE.body1,
      color: THEME_COLOR.black,
    },
    dropdownWrapper: {
      width: '100%',
    },
    dropdownContainer: {
      backgroundColor: THEME_COLOR.gray100,
      borderColor: THEME_COLOR.primary,
      borderWidth: 1,
      borderRadius: 8,
      height: SIZES.hp_4,
      paddingHorizontal: SIZES.wp_2,
    },
    dropdownText: {
      ...TEXT_STYLE.body2,
    },
  });
