import { StyleSheet } from 'react-native';

import { SIZES } from '@styles/theme';

export const styles = ({ THEME_COLOR }: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: SIZES.hp_2,
    },
    filterCardContainer: {
      marginBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    itemSeparator: {
      height: SIZES.hp_1,
    },
    listContent: {
      paddingBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.screenSpacingHorizontal,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_5,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SIZES.hp_5,
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
  });
