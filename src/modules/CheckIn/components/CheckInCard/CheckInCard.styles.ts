import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    card: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 15,
      padding: SIZES.wp_3,
      ...commonStyles.shadow_2,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    textContainer: {
      flex: 1,
      paddingRight: SIZES.wp_3,
      justifyContent: 'space-between',
    },
    title: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
    },
    location: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
    },
    shiftingHours: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      marginTop: SIZES.hp_p05,
    },
    hours: {
      color: THEME_COLOR.gray,
    },
    dateTime: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      marginBottom: SIZES.hp_1,
    },
    checkInButton: {
      alignSelf: 'flex-end',
      paddingVertical: SIZES.hp_p03, // Reduced from hp_p05
      paddingHorizontal: SIZES.wp_3, // Reduced from wp_4
      borderRadius: 4, // Reduced from 5
      borderColor: THEME_COLOR.primary,
      marginTop: SIZES.hp_p05, // Reduced from hp_1
      minWidth: 70, // Reduced from 80
    },
    rightContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    rightCompletedContainer: {
      justifyContent: 'space-between',
    },
    checkLabel: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
    },
    checkTime: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
    },
    timeContainer: {
      marginTop: SIZES.hp_1,
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SIZES.hp_p05,
    },
    timeLabel: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      fontSize: 12,
      fontWeight: '600',
      marginRight: SIZES.wp_2,
      minWidth: 25,
    },
    timeText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
      fontSize: 12,
    },
    completedText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.primary,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
