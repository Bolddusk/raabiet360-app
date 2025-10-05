import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    tableContainer: {
      borderWidth: 1,
      borderColor: THEME_COLOR.gray,
      borderRadius: 10,
      overflow: 'hidden',
      padding: SIZES.wp_2,
      marginTop: SIZES.hp_1,
      backgroundColor: THEME_COLOR.white,
    },
    tableRow: {
      ...commonStyles.horizontalView,
      borderBottomWidth: 0.5,
      borderBottomColor: THEME_COLOR.gray,
      alignItems: 'center',
    },
    verticalDivider: {
      width: 0.5,
      height: '100%',
      backgroundColor: THEME_COLOR.gray,
    },
    tableHeaderCell: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
      paddingBottom: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_1,
    },
    tableCell: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      paddingVertical: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_1,
    },
    quantityInput: {
      height: SIZES.hp_4,
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      paddingVertical: 0,
      paddingHorizontal: SIZES.wp_1,
    },
    headerName: { width: '50%' },
    headerCode: { width: '30%' },
    headerQty: { width: '20%' },
    cellName: { width: '50%' },
    cellCode: { width: '30%' },
    cellQty: { width: '20%' },
  });
