import { StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    label: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.gray600,
    },
    labelSpacing: {
      marginBottom: SIZES.hp_1,
    },
    containerStyle: {
      width: '100%',
      height: SIZES.hp_p65,
      borderColor: THEME_COLOR.gray,
      borderWidth: 1,
      borderRadius: SIZES.inputRadius,
      backgroundColor: THEME_COLOR.white,
    },
    textContainerStyle: {
      borderRadius: 12,
      backgroundColor: THEME_COLOR.white,
    },
    errorFieldContainer: {
      borderWidth: 1,
      borderColor: THEME_COLOR.red,
    },
    errorInfo: {
      marginTop: SIZES.hp_p05,
      color: THEME_COLOR.red,
      ...TEXT_STYLE.caption,
    },
    codeTextStyle: {
      ...TEXT_STYLE.input,
      color: THEME_COLOR.black,
    },
    textInputProps: {
      flex: 1,
      ...TEXT_STYLE.input,
      color: THEME_COLOR.black,
    },
  });
