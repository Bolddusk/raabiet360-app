import { StyleSheet } from 'react-native';

import { commonStyles } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      ...commonStyles.center,
    },
    logo: {
      width: '40%',
      height: '40%',
    },
  });
