import { Dimensions, StyleSheet } from 'react-native';

import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

const { height: screenHeight } = Dimensions.get('window');

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SIZES.wp_4,
    },
    modalContainer: {
      backgroundColor: THEME_COLOR.white,
      borderRadius: 16,
      width: '100%',
      height: screenHeight * 0.65, // 65% of actual screen height
      maxHeight: screenHeight * 0.65,
      overflow: 'hidden',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: SIZES.wp_4,
      paddingBottom: 120, // Space for buttons
      flexGrow: 1,
    },
    sectionContainer: {
      marginBottom: SIZES.hp_2,
    },
    sectionTitle: {
      ...TEXT_STYLE.h4,
      color: THEME_COLOR.black100,
      marginBottom: SIZES.hp_1,
      borderBottomWidth: 1,
      borderBottomColor: THEME_COLOR.gray,
      paddingBottom: SIZES.hp_p05,
    },
    detailsGrid: {
      gap: SIZES.hp_p05,
    },
    detailRow: {
      ...commonStyles.justifyView,
      paddingVertical: SIZES.hp_p05,
    },
    detailLabel: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black100,
      fontWeight: '600',
    },
    detailValue: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.gray600,
      textAlign: 'right',
      flex: 1,
      marginLeft: SIZES.wp_2,
    },
    notesText: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.gray600,
      fontStyle: 'italic',
    },
    tableContainer: {
      borderWidth: 1,
      borderColor: THEME_COLOR.gray,
      borderRadius: 10,
      overflow: 'hidden',
      marginVertical: SIZES.hp_1,
    },
    tableRow: {
      ...commonStyles.horizontalView,
      borderBottomWidth: 0.5,
      borderBottomColor: THEME_COLOR.gray,
      paddingVertical: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_2,
    },
    tableHeaderCell: {
      flex: 1,
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black100,
      fontWeight: '600',
    },
    tableHeaderCellName: {
      flex: 2,
    },
    tableCell: {
      flex: 1,
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.gray600,
    },
    verticalDivider: {
      width: 0.5,
      height: '100%',
      backgroundColor: THEME_COLOR.gray,
      marginHorizontal: SIZES.wp_2,
    },
    timelineContainer: {
      gap: SIZES.hp_1,
    },
    timelineItem: {
      flexDirection: 'row',
      padding: SIZES.wp_3,
      borderRadius: 10,
      gap: SIZES.wp_3,
    },
    timelineDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginTop: 4,
    },
    timelineContent: {
      flex: 1,
    },
    timelineHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SIZES.hp_p05,
    },
    timelineTitle: {
      ...TEXT_STYLE.paragraph,
      fontWeight: '600',
      flex: 1,
      color: THEME_COLOR.black100,
    },
    statusBadge: {
      paddingHorizontal: SIZES.wp_2,
      paddingVertical: SIZES.hp_p02,
      borderRadius: 12,
    },
    statusBadgeText: {
      ...TEXT_STYLE.caption,
      fontWeight: '600',
      color: THEME_COLOR.black100,
    },
    timelineUser: {
      ...TEXT_STYLE.paragraph,
      marginBottom: SIZES.hp_p02,
      color: THEME_COLOR.black100,
    },
    timelineUserBold: {
      fontWeight: '600',
      color: THEME_COLOR.black100,
    },
    timelineTime: {
      ...TEXT_STYLE.caption,
      marginBottom: SIZES.hp_p05,
      color: THEME_COLOR.black100,
    },
    buttonsWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: THEME_COLOR.white,
      padding: SIZES.wp_4,
      borderTopWidth: 1,
      borderTopColor: THEME_COLOR.gray,
      flexDirection: 'row',
      justifyContent: 'flex-start', // Align to left
    },
    buttonContainer: {
      paddingVertical: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_4,
      borderRadius: 10,
    },
    cancelButtonContainer: {
      paddingVertical: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_4,
      borderRadius: 10,
    },
    closeButtonContainer: {
      paddingVertical: SIZES.hp_p05,
      paddingHorizontal: SIZES.wp_4,
      borderRadius: 10,
    },
    statusUpdateContainer: {
      marginTop: SIZES.hp_p05, // Reduced from hp_1
    },
    statusUpdateLabel: {
      ...TEXT_STYLE.paragraph,
      color: THEME_COLOR.black100,
      marginBottom: 2, // Further reduced - minimal space
      fontWeight: '500',
    },
    notesInputContainer: {
      marginBottom: SIZES.hp_3, // Further increased for more space
    },
    notesInput: {
      minHeight: 60,
      textAlignVertical: 'top',
    },
    statusButtonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      justifyContent: 'flex-end', // Move buttons to the right
      marginTop: 4,
    },
    statusButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 10,
      minWidth: 100,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    statusButtonText: {
      fontSize: 12,
      fontWeight: '600',
    },
  });