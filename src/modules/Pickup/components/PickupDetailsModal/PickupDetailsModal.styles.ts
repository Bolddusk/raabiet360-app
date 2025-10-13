import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: THEME_COLOR.blackTransparent,
      paddingHorizontal: SIZES.wp_4,
      ...commonStyles.center,
    },
    card: {
      backgroundColor: THEME_COLOR.white,
      borderWidth: 10,
      borderColor: THEME_COLOR.primaryLight,
      borderRadius: 16,
      padding: SIZES.wp_5,
      width: '100%',
    },
    title: {
      ...TEXT_STYLE.h3,
      color: THEME_COLOR.black100,
      marginBottom: 4,
    },
    pickupTime: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
    },
    separator: {
      height: 1,
      backgroundColor: THEME_COLOR.gray,
      marginVertical: SIZES.hp_1,
    },
    row: {
      ...commonStyles.justifyRowView,
      paddingVertical: 4,
    },
    label: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
    },
    value: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
    },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: SIZES.wp_3,
      paddingVertical: SIZES.hp_p05,
      borderRadius: 12,
      marginBottom: SIZES.hp_1,
    },
    statusText: {
      ...TEXT_STYLE.caption,
      fontWeight: '600',
      color: THEME_COLOR.white,
    },
    statusCompleted: {
      backgroundColor: '#22C55E', // Bright green
    },
    statusIn_progress: {
      backgroundColor: '#F97316', // Bright orange
    },
    statusPending: {
      backgroundColor: '#3B82F6', // Bright blue
    },
    statusRejected: {
      backgroundColor: '#DC2626', // Bright red
    },
  });
