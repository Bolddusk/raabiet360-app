import { StyleSheet } from 'react-native';

import { SIZES } from '@styles/theme';

export const styles = ({ THEME_COLOR }: any) =>
  StyleSheet.create({
    tabWrapper: {
      marginVertical: SIZES.screenSpacingHorizontal,
    },
    itemSeparator: {
      height: SIZES.hp_1,
    },
    listContainer: {
      paddingHorizontal: SIZES.screenSpacingHorizontal,
      paddingBottom: SIZES.hp_3,
    },
    fieldSpacing: {
      marginTop: SIZES.hp_3,
    },
    textContainer: {
      backgroundColor: THEME_COLOR.white,
    },
    buttonSpacing: {
      marginTop: SIZES.hp_4,
      paddingBottom: SIZES.hp_3,
    },
    buttonContainer: {
      borderColor: THEME_COLOR.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_4,
    },
    loadingText: {
      marginTop: SIZES.hp_2,
      fontSize: SIZES.fs_16,
      color: THEME_COLOR.gray600,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_4,
    },
    emptyText: {
      fontSize: SIZES.fs_16,
      color: THEME_COLOR.gray600,
      textAlign: 'center',
    },
    formLoadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_2,
    },
    formLoadingText: {
      marginTop: SIZES.hp_1,
      fontSize: SIZES.fs_14,
      color: THEME_COLOR.gray600,
      textAlign: 'center',
    },
    formEmptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_2,
    },
    formEmptyText: {
      fontSize: SIZES.fs_14,
      color: THEME_COLOR.gray600,
      textAlign: 'center',
    },
  });
