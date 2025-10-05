import { Dimensions, StyleSheet } from 'react-native';

import { SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

const screenWidth = Dimensions.get('window').width;
const totalHorizontalSpacing = SIZES.screenSpacingHorizontal * 2;
const cardSpacing = SIZES.hp_2;
const cardWidth = (screenWidth - totalHorizontalSpacing - cardSpacing * 2) / 3;

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    listContainer: {
      flexGrow: 1,
      paddingVertical: SIZES.hp_4,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    sectionTitle: {
      ...TEXT_STYLE.h3,
      marginBottom: SIZES.hp_2,
      color:THEME_COLOR.black
    },
    columnWrapper: {
      justifyContent: 'flex-start',
    },
    quickAccessItem: {
      width: cardWidth,
      marginRight: cardSpacing,
    },
    spacer: {
      marginTop: SIZES.hp_3,
    },
    separator: {
      height: SIZES.hp_2,
    },
  });
