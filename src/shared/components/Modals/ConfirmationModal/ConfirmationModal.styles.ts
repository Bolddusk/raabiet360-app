import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: THEME_COLOR.blackTransparent,
      ...commonStyles.center,
    },
    modalContainer: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 10,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
      width: '90%',
      alignItems: 'center',
    },
    iconWrapper: {
      marginTop: -SIZES.wp_12,
      backgroundColor: THEME_COLOR.primary,
      width: SIZES.wp_25,
      height: SIZES.wp_25,
      borderRadius: SIZES.wp_25,
      ...commonStyles.center,
    },
    title: {
      ...TEXT_STYLE.h2,
      color: THEME_COLOR.black,
      marginTop: SIZES.hp_2,
      marginBottom: SIZES.hp_1,
      textAlign: 'center',
    },
    subtitle: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      textAlign: 'center',
      marginBottom: SIZES.hp_4,
      paddingHorizontal: SIZES.wp_5,
    },
    buttonWrapper: {
      gap: SIZES.wp_5,
      paddingBottom: SIZES.hp_2,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    buttonContainer: {
      borderRadius: 5,
      paddingVertical: SIZES.hp_1,
      paddingHorizontal: SIZES.wp_1,
    },
  });
