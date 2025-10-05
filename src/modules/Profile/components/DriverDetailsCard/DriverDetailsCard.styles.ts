import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    card: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 15,
      padding: SIZES.wp_3,
      marginTop: SIZES.hp_2,
      ...commonStyles.shadow_3,
    },
    cardHeader: {
      ...commonStyles.horizontalView,
      marginBottom: SIZES.hp_1,
    },
    cardTitle: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
      marginRight: SIZES.wp_2,
    },
    detailsContainer: {
      gap: SIZES.hp_p15,
    },
    namePhoneRow: {
      flexDirection: 'row',
    },
    detailColumn: {
      flex: 1,
    },
    detailColumnRight: {
      flex: 1,
    },
    detailLabel: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      marginBottom: 4,
    },
    detailValue: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
    },
  });
