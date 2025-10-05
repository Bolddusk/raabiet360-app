import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({THEME_COLOR}:{THEME_COLOR:ColorPalette}) =>
  StyleSheet.create({
    loadingModalContainer: {
      flex: 1,
      backgroundColor: THEME_COLOR.blackTransparent,
      justifyContent:'center',
    },
    loadingContentContainer: {
      backgroundColor: THEME_COLOR.white,
      padding: SIZES.wp_2,
      alignSelf:'center',
      ...commonStyles.center,
    },
    loadingText: {
      paddingLeft: SIZES.wp_5,
      color: THEME_COLOR.black,
      ...TEXT_STYLE.paragraph,
    },
    rowWrapper: {
      ...commonStyles.horizontalView,
      marginVertical: SIZES.hp_p15,
      paddingHorizontal: SIZES.wp_8,
    },
  });
