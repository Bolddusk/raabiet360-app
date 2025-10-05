import { StyleSheet, Platform, Dimensions } from 'react-native';
import { commonStyles, SIZES, TEXT_STYLE } from '@styles/theme';
import { ColorPalette } from '@types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'ios' ? 44 : 24;

export const styles = ({ THEME_COLOR }: { THEME_COLOR: ColorPalette }) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: screenWidth,
      height: screenHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    drawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: {
        width: 2,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingTop: 0,
      paddingHorizontal: SIZES.wp_4,
      paddingBottom: SIZES.hp_1,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
      backgroundColor: '#FFFFFF',
    },
    headerTop: {
      ...commonStyles.horizontalView,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SIZES.hp_1,
    },
    headerTitle: {
      fontSize: 20,
      color: '#000000',
      fontWeight: '700',
    },
    closeButton: {
      width: Platform.OS === 'ios' ? 35 : 40,
      height: Platform.OS === 'ios' ? 35 : 40,
      ...commonStyles.center,
      borderRadius: Platform.OS === 'ios' ? 17.5 : 20,
      backgroundColor: '#8085EF',
      borderWidth: 2,
      borderColor: '#FFFFFF',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    closeButtonText: {
      fontSize: 20,
      color: THEME_COLOR.white,
      fontWeight: 'bold',
    },
    headerActions: {
      ...commonStyles.horizontalView,
      justifyContent: 'space-between',
      marginTop: SIZES.hp_1,
      marginBottom: SIZES.hp_2,
      paddingHorizontal: SIZES.wp_1,
    },
    actionButton: {
      paddingVertical: SIZES.hp_1,
      paddingHorizontal: SIZES.wp_2,
      borderRadius: Platform.OS === 'ios' ? 8 : 6,
      backgroundColor: '#8085EF',
      borderWidth: 1,
      borderColor: '#8085EF',
      minHeight: Platform.OS === 'ios' ? 36 : 40,
      flex: 1,
      marginHorizontal: SIZES.wp_1,
      ...commonStyles.center,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    refreshButton: {
      paddingVertical: SIZES.hp_1,
      paddingHorizontal: SIZES.wp_2,
      borderRadius: Platform.OS === 'ios' ? 8 : 6,
      backgroundColor: '#8085EF',
      borderWidth: 1,
      borderColor: '#8085EF',
      minHeight: Platform.OS === 'ios' ? 36 : 40,
      width: 50,
      marginHorizontal: SIZES.wp_1,
      ...commonStyles.center,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    actionButtonText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontWeight: '600',
      textAlign: 'center',
    },
    disabledActionButton: {
      backgroundColor: THEME_COLOR.lightGray,
      borderColor: THEME_COLOR.lightGray,
    },
    disabledActionButtonText: {
      color: THEME_COLOR.gray,
    },
    listContainer: {
      flexGrow: 1,
      paddingTop: SIZES.hp_2,
      paddingBottom: SIZES.hp_2,
    },
    notificationItem: {
      paddingHorizontal: SIZES.wp_4,
      paddingVertical: SIZES.hp_2,
      position: 'relative',
      backgroundColor: '#FFFFFF',
      minHeight: 80,
      ...commonStyles.horizontalView,
      alignItems: 'flex-start',
      marginHorizontal: SIZES.wp_3,
      marginVertical: SIZES.hp_1,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    unreadNotification: {
      backgroundColor: '#F8FAFC',
      borderLeftWidth: 4,
      borderLeftColor: THEME_COLOR.primary || '#8085EF',
    },
    notificationContent: {
      flex: 1,
      marginRight: SIZES.wp_3,
    },
    notificationStatusContainer: {
      ...commonStyles.center,
      marginTop: SIZES.hp_0_5,
    },
    notificationHeader: {
      ...commonStyles.horizontalView,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: SIZES.hp_1,
    },
    notificationTitle: {
      ...TEXT_STYLE.paragraph,
      color: '#1F2937',
      fontWeight: '700',
      flex: 1,
      fontSize: 16,
      lineHeight: 22,
    },
    notificationTime: {
      ...TEXT_STYLE.paragraphSmall,
      color: '#9CA3AF',
      fontWeight: '500',
      fontSize: 12,
    },
    notificationMessage: {
      ...TEXT_STYLE.paragraphSmall,
      color: '#4B5563',
      lineHeight: 20,
      fontWeight: '400',
      marginBottom: SIZES.hp_1,
      fontSize: 14,
    },
    notificationDataContainer: {
      marginTop: SIZES.hp_1,
      paddingTop: SIZES.hp_1,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    dataRow: {
      ...commonStyles.horizontalView,
      alignItems: 'center',
      marginBottom: SIZES.hp_0_5,
    },
    notificationDataText: {
      ...TEXT_STYLE.paragraphSmall,
      color: '#6B7280',
      fontSize: 12,
      marginLeft: SIZES.wp_2,
      flex: 1,
    },
    unreadDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: THEME_COLOR.primary || '#8085EF',
    },
    readIndicator: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#F0FDF4',
      ...commonStyles.center,
    },
    emptyState: {
      flex: 1,
      ...commonStyles.center,
      paddingHorizontal: SIZES.wp_4,
      paddingVertical: SIZES.hp_10,
    },
    emptyStateText: {
      fontSize: 18,
      color: '#666666',
      textAlign: 'center',
      fontWeight: '600',
      lineHeight: 24,
    },
    loadingContainer: {
      flex: 1,
      ...commonStyles.center,
    },
  });
