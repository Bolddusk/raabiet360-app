import { StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    profileSection: {
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: SIZES.hp_2,
      // marginTop: isIOS() ? SIZES.hp_2 : SIZES.hp_3,
      // position: 'absolute',
      // zIndex: 1,
    },
    profileImage: {
      width: SIZES.wp_30,
      height: SIZES.wp_30,
      borderRadius: 100,
      marginBottom: SIZES.hp_p15,
    },
    profileName: {
      ...TEXT_STYLE.h3,
      color: THEME_COLOR.black100,
      marginBottom: SIZES.hp_p05,
    },
    profileRole: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
    },
  });
