import { StyleSheet } from 'react-native';

import { isIOS } from '@shared/utils/helpers';
import { SIZES } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerWrapper: {
      position: 'absolute',
      top: 0,
      zIndex: 10,
      width: '100%',
      ...(isIOS() && { paddingTop: SIZES.hp_5 }),
    },
    cardContainer: {
      position: 'absolute',
      bottom: 40,
      paddingVertical: SIZES.hp_2,
    },
    customMarker: {
      position: 'absolute',
    },
    markerIcon: {
      width: 24,
      height: 24,
    },
  });
