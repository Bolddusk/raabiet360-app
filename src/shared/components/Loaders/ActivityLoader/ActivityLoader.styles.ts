import { StyleSheet } from 'react-native';

import { commonStyles } from '@styles/theme';

export const styles = ({ THEME_COLOR }) =>
  StyleSheet.create({
    fullScreenContainer: {
      ...commonStyles.fullView,
      ...commonStyles.center,
    },
  });
