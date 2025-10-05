import { StyleSheet } from 'react-native';

import { commonStyles, SIZES } from '@styles/theme';

export const styles = ({ THEME_COLOR }: any) =>
  StyleSheet.create({
    fieldSpacing: {
      marginTop: SIZES.hp_3,
    },
    textContainer: {
      backgroundColor: THEME_COLOR.white,
    },
    multiLineTextContainer: {
      backgroundColor: THEME_COLOR.white,
      height: SIZES.hp_10,
    },
    buttonWrapper: {
      marginTop: SIZES.hp_4,
      ...commonStyles.justifyView
    },
    buttonContainerWrapper: {
      flex: 0.45,
    },
    buttonContainer: {
      borderRadius: 10,
      paddingVertical: SIZES.hp_p15,
    },
  });
