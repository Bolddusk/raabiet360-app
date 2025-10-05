import { StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: SIZES.wp_3,
      backgroundColor: THEME_COLOR.white,
      borderRadius: 15,
      marginBottom: SIZES.hp_1,
      paddingHorizontal: SIZES.wp_2,
      ...commonStyles.shadow_2,
    },
    avatar: {
      width: SIZES.wp_13,
      height: SIZES.wp_13,
      borderRadius: 100,
      alignSelf: 'center',
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    name: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black,
      flex: 1,
      marginRight: 8,
    },
    typeRow: {
      marginBottom: 4,
      alignSelf: 'flex-start',
    },
    statusText: {
      ...TEXT_STYLE.paragraphSmall,
      fontWeight: '600',
      fontSize: 12,
    },
    timeText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray600,
      fontSize: 11,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 2,
    },
    quantityLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    typeTag: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    typeText: {
      fontSize: 10,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center',
    },
    idText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      fontSize: 11,
      fontWeight: '600',
      marginTop: 2,
    },
    address: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      fontWeight: '600',
    },
    warehouse: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray600,
      fontSize: 12,
    },
    quantity: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray600,
      fontSize: 12,
      fontWeight: '500',
      marginLeft: 4,
    },
    metaContainer: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      minWidth: SIZES.wp_30,
    },
    metaContainerPickup: {
      ...commonStyles.center,
    },
    requestTime: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black,
      marginBottom: SIZES.hp_1,
    },
    statusContainer: {
      alignSelf: 'flex-end',
      flexDirection: 'row',
      gap: SIZES.wp_4,
    },
    rejectButton: {
      borderRadius: 5,
      backgroundColor: '#FF0000',
      paddingHorizontal: SIZES.wp_5,
      paddingVertical: SIZES.hp_p05,
      ...commonStyles.center,
    },
    acceptButton: {
      borderRadius: 5,
      backgroundColor: THEME_COLOR.primary,
      paddingHorizontal: SIZES.wp_5,
      paddingVertical: SIZES.hp_p05,
      ...commonStyles.center,
    },
    statusInfoContainer: {
      flexDirection: 'row',
      gap: SIZES.wp_p15,
      alignSelf: 'flex-end',
      ...commonStyles.center,
    },
    icon: {
      width: SIZES.wp_4,
      height: SIZES.wp_4,
    },
    viewDetailsButton: {
      paddingHorizontal: SIZES.wp_3,
      paddingVertical: SIZES.hp_p05,
      borderRadius: 5,
    },
    buttonText: {
      ...TEXT_STYLE.body2,
    },
  });
