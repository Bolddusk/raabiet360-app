import { StyleSheet } from 'react-native';

import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME_COLOR.gray100,
      borderRadius: 40,
      overflow: 'hidden',
    },
  });
