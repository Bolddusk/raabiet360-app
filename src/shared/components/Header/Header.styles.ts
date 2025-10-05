import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    headerContainer: {
      paddingVertical: SIZES.hp_2,
      paddingBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.wp_3,
      ...commonStyles.horizontalView,
    },
    startContainer: {
      flex: 0.2,
      // paddingVertical: SIZES.hp_p05,
    },
    backIconContainer: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 100,
      alignSelf: 'baseline',
      padding: SIZES.wp_2,
    },
    middleContainer: {
      flex: 1,
      // ...commonStyles.rowCenter,
    },
    endContainer: {
      alignItems: 'flex-end',
      flex: 0.2,
    },
    middleText: {
      color: THEME_COLOR.white,
      textAlign: 'center',
      ...TEXT_STYLE.h2,
    },
    rightText: {
      color: THEME_COLOR.white,
      ...TEXT_STYLE.bodyLink1,
    },
    greetingContainer: {
      flex: 1,
      paddingRight: SIZES.wp_1,
    },
    userNameText: {
      ...TEXT_STYLE.h2,
      color: THEME_COLOR.white,
      marginBottom: SIZES.hp_p05,
    },
    greetingText: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.white,
    },
    actionsContainer: {
      width: '40%',
      borderColor: THEME_COLOR.white,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: SIZES.wp_1,
    },
    toggleWrapper: {
      width: '100%',
      flexDirection: 'row',
      overflow: 'hidden',
      marginVertical: 4,
    },
    pill: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '50%',
      backgroundColor: THEME_COLOR.white,
      borderRadius: 100,
    },
    segment: {
      flex: 1,
      ...commonStyles.center,
      paddingVertical: 2,
    },
    label: {
      color: THEME_COLOR.white,
      ...TEXT_STYLE.paragraphSmall,
    },
    labelActive: {
      color: THEME_COLOR.black,
      ...TEXT_STYLE.paragraphSmall,
    },
  });
