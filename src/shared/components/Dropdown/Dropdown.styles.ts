import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {},
    label: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black,
    },
    labelSpacing: {
      marginBottom: SIZES.hp_1,
    },
    dropdownContainer: {
      // width: 400,
      borderWidth: 1,
      borderRadius: SIZES.inputRadius,
      borderColor: THEME_COLOR.gray,
      backgroundColor: THEME_COLOR.white,
      ...commonStyles.horizontalView,
      // paddingVertical: SIZES.hp_1,
      height: SIZES.hp_6,
      paddingHorizontal: SIZES.wp_4,
    },
    multiSelectDropdownContainer: {
      backgroundColor: THEME_COLOR.white,
      ...commonStyles.horizontalView,
      height: SIZES.hp_6,
      paddingHorizontal: SIZES.wp_4,
    },
    dropdownButton: {
      minHeight: 35,
    },
    dropdownCompleted: {
      backgroundColor: THEME_COLOR.green,
    },
    dropdownInProgress: {
      backgroundColor: THEME_COLOR.yellow100,
    },
    dropdownText: {
      color: THEME_COLOR.black,
      ...TEXT_STYLE.paragraphSmall,
    },
    dropdownPlaceholder: {
      color: THEME_COLOR.gray,
      ...TEXT_STYLE.paragraphSmall,
    },
    itemTextStyle: {
      color: THEME_COLOR.black,
      ...TEXT_STYLE.input,
    },
  });
