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
    cardTitle: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black,
      marginBottom: SIZES.hp_p15,
    },
    contentWrapper: {
      ...commonStyles.justifyRowView,
      gap: SIZES.wp_4,
    },
    textSection: {
      flex: 1,
      justifyContent: 'center',
      gap: SIZES.hp_2,
    },
    inlineRow: {
      ...commonStyles.justifyRowView,
      gap: SIZES.wp_3,
    },
    halfWidth: {
      gap: 4,
    },
    thirdWidth: {
      gap: 4,
    },
    detailLabel: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
    },
    detailValue: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
    },
    vehicleImageContainer: {
      width: SIZES.wp_30,
      height: SIZES.hp_12,
      borderRadius: 10,
      overflow: 'hidden',
    },
    vehicleImage: {
      width: '100%',
      height: '100%',
    },
  });
