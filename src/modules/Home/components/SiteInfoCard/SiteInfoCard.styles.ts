import { Dimensions, StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

const { width } = Dimensions.get('screen');
const _cardWidth = width * 0.85;

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    card: {
      backgroundColor: THEME_COLOR.white,
      width: _cardWidth,
      borderRadius: 16,
      flexDirection: 'row',
      paddingHorizontal: SIZES.wp_5,
      paddingVertical: SIZES.hp_p15,
      overflow: 'hidden',
      ...commonStyles.shadow_2,
    },
    image: {
      width: 100,
      height: '100%',
      borderRadius: 20,
      marginRight: SIZES.wp_2,
    },
    info: {
      flex: 1,
    },
    title: {
      ...TEXT_STYLE.body1,
      color: THEME_COLOR.black,
    },
    sub: {
      marginTop: SIZES.hp_1,
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
    },
    text: {
      marginTop: SIZES.hp_p05,
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
    },
  });