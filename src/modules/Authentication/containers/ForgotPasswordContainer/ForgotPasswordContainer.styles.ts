import { StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    contentWrapper: {
      justifyContent: 'center',
    },
    iconWrapper: {
      alignItems: 'center',
      marginBottom: SIZES.hp_5,
    },
    title: {
      color: THEME_COLOR.black100,
      ...TEXT_STYLE.h2,
    },
    spacing: {
      marginTop: SIZES.hp_3,
    },
    loginText: {
      alignSelf: 'flex-end',
      color: THEME_COLOR.primary,
      marginTop: SIZES.hp_2,
      ...TEXT_STYLE.body1,
    },
    buttonWrapper: {
      marginTop: SIZES.hp_4,
      marginBottom: SIZES.hp_1,
    },
  });
