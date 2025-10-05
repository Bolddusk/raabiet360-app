import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';

export const styles = ({ THEME_COLOR }) =>
  StyleSheet.create({
    listContainer: {
      flex: 1,
      ...commonStyles.center,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    listText: {
      textAlign: 'center',
      ...TEXT_STYLE.body1,
      color: THEME_COLOR.neutral500,
    },
    btnText: {
      ...TEXT_STYLE.body2,
      marginTop: SIZES.hp_2,
      color: THEME_COLOR.brandPrimary,
    },
  });
