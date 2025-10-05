import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    card: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 15,
      paddingHorizontal: SIZES.wp_3,
      paddingVertical: SIZES.wp_2,
      ...commonStyles.shadow_2,
      flexDirection: 'row',
      flex: 1,
    },
    cardContent: {
      flex: 1,
      marginRight: SIZES.wp_2,
    },
    module: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.primary,
      fontWeight: '600',
      marginBottom: SIZES.hp_p05,
    },
    title: {
      ...TEXT_STYLE.body1,
      color: THEME_COLOR.black,
      fontWeight: '700',
      marginBottom: SIZES.hp_p05,
      fontSize: 16,
    },
    subtitle: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      marginBottom: SIZES.hp_p05,
      lineHeight: 18,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SIZES.hp_p05,
      marginBottom: SIZES.hp_p05,
    },
    statusLabel: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      fontWeight: '500',
      marginRight: SIZES.wp_1,
    },
    statusText: {
      ...TEXT_STYLE.paragraphSmall,
      fontWeight: '700',
      paddingHorizontal: SIZES.wp_2,
      paddingVertical: SIZES.hp_p02,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.05)',
      overflow: 'hidden',
    },
    driverInfo: {
      ...commonStyles.justifyRowView,
      marginTop: SIZES.hp_p05,
    },
    managerInfo: {
      marginTop: SIZES.hp_p05,
      backgroundColor: 'rgba(0,0,0,0.02)',
      paddingHorizontal: SIZES.wp_2,
      paddingVertical: SIZES.hp_p05,
      borderRadius: 8,
    },
    shiftContainer: {
      flex: 1,
    },
    shift: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
    },
    managerLabel: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.primary,
      fontWeight: '600',
      marginBottom: SIZES.hp_p02,
    },
    shiftText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
    },
    managerContainer: {
      flex: 1,
    },
    managerText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      fontWeight: '500',
    },
    workerInfo: {},
    actions: {
      flex: 0.6,
      justifyContent: 'space-evenly',
      gap: SIZES.hp_p05,
      paddingLeft: SIZES.wp_2,
    },
    button: {
      paddingVertical: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_2,
      borderRadius: 6,
    },
  });
