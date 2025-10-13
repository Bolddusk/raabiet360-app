import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    label: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black100,
    },
    errorLabelContainer: {
      ...commonStyles.horizontalView,
      gap: SIZES.wp_p15,
    },
    labelSpacing: {
      marginBottom: SIZES.hp_1,
    },
    fieldContainer: {
      borderWidth: 1,
      borderRadius: SIZES.inputRadius,
      borderColor: THEME_COLOR.gray,
      backgroundColor: THEME_COLOR.white,
      paddingHorizontal: SIZES.wp_3,
      ...commonStyles.horizontalView,
    },
    errorFieldContainer: {
      borderWidth: 1,
      borderColor: THEME_COLOR.red,
    },
    input: {
      flex: 1,
      color: THEME_COLOR.black100,
      height: SIZES.hp_6,
      ...TEXT_STYLE.input,
    },
    leftIconContainer: {
      paddingRight: SIZES.wp_2,
    },
    rightIconContainer: {
      paddingLeft: SIZES.wp_2,
    },
    errorInfo: {
      marginTop: SIZES.hp_p05,
      color: THEME_COLOR.red,
      ...TEXT_STYLE.caption,
    },
  });
