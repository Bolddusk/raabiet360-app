import { StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    contentWrapper: {
      flex: 0.8,
      justifyContent: 'center',
    },
    iconWrapper: {
      alignItems: 'center',
      marginBottom: SIZES.hp_6,
    },
    title: {
      ...TEXT_STYLE.h2,
      color: THEME_COLOR.black100,
      marginBottom: SIZES.hp_2,
    },
    spacing: {
      marginTop: SIZES.hp_2,
    },
    inputContainer: {
      backgroundColor: THEME_COLOR.gray100,
    },
    forgotPasswordText: {
      alignSelf: 'flex-end',
      color: THEME_COLOR.primary,
      marginTop: SIZES.hp_2,
      ...TEXT_STYLE.paragraph1,
    },
    buttonWrapper: {
      flex: 0.2,
      paddingTop: SIZES.hp_7,
      paddingBottom: SIZES.hp_1,
    },
  });
