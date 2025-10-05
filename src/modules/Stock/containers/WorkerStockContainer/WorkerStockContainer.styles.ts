import { StyleSheet } from 'react-native';

import { commonStyles, SIZES } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
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
    rowContainer: {
      ...commonStyles.justifyView,
      marginTop: SIZES.hp_3,
    },
    halfWidth: {
      flex: 0.47,
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
    assignmentInfo: {
      backgroundColor: THEME_COLOR.lightGray || '#f5f5f5',
      padding: SIZES.wp_3,
      borderRadius: SIZES.wp_2,
      borderLeftWidth: 3,
      borderLeftColor: THEME_COLOR.primary,
    },
  assignmentText: {
    fontSize: SIZES.font_14,
    color: THEME_COLOR.black,
    marginBottom: SIZES.hp_p05,
    fontWeight: '500',
  },
  clearButton: {
    backgroundColor: THEME_COLOR.lightGray || '#f5f5f5',
    borderWidth: 1,
    borderColor: THEME_COLOR.gray || '#ccc',
    marginTop: SIZES.hp_1,
  },
  clearButtonText: {
    color: THEME_COLOR.gray || '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.screenSpacingHorizontal,
    paddingVertical: SIZES.hp_4,
  },
  emptyText: {
    fontSize: SIZES.font_16,
    color: THEME_COLOR.gray || '#666',
    textAlign: 'center',
  },
  });
