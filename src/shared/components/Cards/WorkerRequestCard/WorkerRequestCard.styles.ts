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
    infoContainer: {
      flex: 1,
      marginHorizontal: SIZES.wp_1,
      justifyContent: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SIZES.hp_p05,
    },
    requestId: {
      ...TEXT_STYLE.caption,
      color: THEME_COLOR.gray600,
      fontWeight: '600',
    },
    requestType: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black100,
      fontWeight: '600',
      marginBottom: SIZES.hp_1,
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SIZES.hp_1,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SIZES.hp_p05,
    },
    infoIcon: {
      fontSize: 14,
      marginRight: SIZES.wp_2,
      width: 20,
    },
    infoText: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
      flex: 1,
      marginLeft: SIZES.wp_1,
    },
    name: {
      ...TEXT_STYLE.paragraph1,
      color: THEME_COLOR.black100,
    },
    address: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
    },
    quantity: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.gray,
    },
    metaContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: SIZES.wp_25,
    },
    timeContainer: {
      alignItems: 'center',
      marginBottom: SIZES.hp_1,
    },
    timeLabel: {
      ...TEXT_STYLE.caption,
      color: THEME_COLOR.gray600,
      marginRight: SIZES.wp_2,
    },
    timeValue: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
      fontWeight: '500',
    },
    requestTime: {
      ...TEXT_STYLE.paragraphSmall,
      color: THEME_COLOR.black100,
      marginBottom: SIZES.hp_1,
    },
    statusContainer: {
      alignItems: 'center',
      width: '100%',
    },
    buttonContainer: {
      paddingHorizontal: SIZES.wp_2,
      paddingVertical: SIZES.hp_1,
      borderRadius: 5,
      opacity: 1,
    },
    smallButton: {
      paddingHorizontal: SIZES.wp_3,
      paddingVertical: SIZES.hp_p05,
      borderRadius: 12,
      minWidth: 80,
    },
    completeButton: {
      backgroundColor: '#10B981', // Emerald green - more vibrant
    },
    inProgressButton: {
      backgroundColor: '#F59E0B', // Amber orange - more vibrant
    },
    pendingButton: {
      backgroundColor: '#2563EB', // Blue - more vibrant
    },
    rejectedButton: {
      backgroundColor: '#EF4444', // Red - more vibrant
    },
    buttonText: {
      ...TEXT_STYLE.body2,
    },
    smallButtonText: {
      ...TEXT_STYLE.caption,
      fontWeight: '600',
      color: '#FFFFFF', // Bright white text
    },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: SIZES.wp_3,
      paddingVertical: SIZES.hp_p05,
      borderRadius: 12,
      marginBottom: SIZES.hp_1,
    },
    statusText: {
      ...TEXT_STYLE.caption,
      fontWeight: '600',
      color: THEME_COLOR.white,
    },
    statusCompleted: {
      backgroundColor: '#22C55E', // Bright green
    },
    statusIn_progress: {
      backgroundColor: '#F97316', // Bright orange
    },
    statusPending: {
      backgroundColor: '#3B82F6', // Bright blue
    },
    statusRejected: {
      backgroundColor: '#DC2626', // Bright red
    },
  });
