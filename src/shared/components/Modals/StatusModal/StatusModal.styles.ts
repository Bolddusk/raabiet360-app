import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: THEME_COLOR.blackTransparent,
      ...commonStyles.center,
      paddingHorizontal: SIZES.wp_4,
    },
    modalContent: {
      backgroundColor: THEME_COLOR.white,
      borderWidth: 10,
      borderColor: THEME_COLOR.primaryLight,
      borderRadius: 16,
      padding: SIZES.wp_5,
      width: '100%',
    },
    workerHeader: {
      ...commonStyles.horizontalView,
      marginBottom: SIZES.hp_3,
    },
    userAvatar: {
      width: SIZES.wp_20,
      height: SIZES.wp_20,
      borderRadius: 100,
      marginRight: SIZES.wp_5,
    },
    userName: {
      ...TEXT_STYLE.h3,
      color: THEME_COLOR.black,
      marginBottom: 4,
    },
    userPhone: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
    },
    borderLine: {
      borderWidth: 0.5,
      borderColor: THEME_COLOR.gray,
      marginBottom: SIZES.hp_1,
    },
    detailRow: {
      ...commonStyles.justifyView,
      paddingVertical: SIZES.hp_1,
    },
    detailLabel: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black,
    },
    detailValue: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      textAlign: 'right',
      flex: 1,
      marginLeft: SIZES.wp_3,
    },
    timeDateRow: {
      ...commonStyles.justifyView,
    },
    timeDateItem: {
      flex: 0.4,
    },
    statusContainer: {
      width: SIZES.wp_35,
    },
    statusDropdown: {
      backgroundColor: THEME_COLOR.white,
      borderColor: THEME_COLOR.gray100,
      borderWidth: 1,
      borderRadius: 6,
      marginTop: 5,
    },
    dropdownButton: {
      backgroundColor: THEME_COLOR.primary,
      paddingHorizontal: SIZES.wp_4,
      paddingVertical: SIZES.hp_1,
      borderRadius: 5,
      minHeight: 35,
    },
    dropdownText: {
      color: THEME_COLOR.white,
      ...TEXT_STYLE.paragraph1,
    },
    dropdownCompleted: {
      backgroundColor: THEME_COLOR.green,
    },
    dropdownInProgress: {
      backgroundColor: THEME_COLOR.yellow100,
    },
    buttonsWrapper: {
      alignSelf: 'flex-end',
      gap: SIZES.wp_5,
      marginTop: SIZES.hp_3,
      ...commonStyles.justifyRowView,
    },
    buttonContainer: {
      paddingVertical: SIZES.hp_1,
      paddingHorizontal: SIZES.wp_8,
      borderRadius: 10,
    },
  });
