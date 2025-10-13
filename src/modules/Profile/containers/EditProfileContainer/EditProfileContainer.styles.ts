import { StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperContainer: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    title: {
      ...TEXT_STYLE.h3,
      color: THEME_COLOR.black100,
    },
    fieldSpacing: {
      marginTop: SIZES.hp_2,
    },
    buttonContainer: {
      marginTop: SIZES.hp_4,
    },
  });
