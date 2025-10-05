import { StyleSheet } from 'react-native';

import { SIZES } from '@styles/theme';

export const styles = ({ THEME_COLOR }: any) =>
  StyleSheet.create({
    topSpacer: {
      height: '12%',
    },
    absoluteOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      paddingTop: SIZES.hp_3,
    },
    logoutButton: {
      marginTop: SIZES.hp_3,
      paddingVertical: SIZES.hp_1,
      borderRadius: 15,
    },
  });
