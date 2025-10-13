import { StyleSheet } from 'react-native';

export const styles = ({ THEME_COLOR }: any) =>
  StyleSheet.create({
    screenWrapper: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    container: {
      padding: 20,
      backgroundColor: THEME_COLOR.white,
    },
    
    // Header Section
    header: {
      alignItems: 'center',
      marginBottom: 30,
      borderBottomWidth: 2,
      borderBottomColor: THEME_COLOR.primary,
      paddingBottom: 15,
    },
    companyName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: THEME_COLOR.primary,
      marginBottom: 5,
    },
    formTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: THEME_COLOR.primary,
      marginBottom: 5,
    },
    formSubtitle: {
      fontSize: 12,
      color: THEME_COLOR.black100,
    },

    // Quotation Information Grid
    quotationInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 5,
      width: '50%',
      marginBottom: 8,
    },
    infoLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
      minWidth: 80,
      flexShrink: 0,
    },
    infoValue: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'right',
      maxWidth: 120,
      flex: 1,
    },

    // Client Information Grid
    clientInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    clientRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 5,
      width: '50%',
      // marginBottom: 8,
    },
    clientLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
      minWidth: 80,
      flexShrink: 0,
    },
    clientValue: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'right',
      maxWidth: 120,
      flex: 1,
    },
    addressRow: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: 2,
      paddingHorizontal: 5,
      marginBottom: 8,
    },
    addressValue: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'left',
      lineHeight: 13,
      marginTop: 2,
    },

    // Items Table
    itemsTable: {
      marginVertical: 15,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: THEME_COLOR.border,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: THEME_COLOR.primary,
      paddingVertical: 8,
      paddingHorizontal: 6,
    },
    headerCell: {
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.white,
      textAlign: 'left',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    // Column widths: CATÉGORIE/DESCRIPTION(2.5), UNITÉ(0.8), QUANTITÉ(0.8), TU(0.6), MO(0.6), HEURES(0.6)
    headerCellCategoryDescription: {
      flex: 2.5,
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.white,
      textAlign: 'left',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    headerCellUnit: {
      flex: 0.8,
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.white,
      textAlign: 'left',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    headerCellQuantity: {
      flex: 0.8,
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.white,
      textAlign: 'left',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    headerCellNumeric: {
      flex: 0.6,
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.white,
      textAlign: 'left',
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: THEME_COLOR.border,
    },
    tableRowEven: {
      backgroundColor: THEME_COLOR.background,
    },
    tableCell: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'left',
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderRightWidth: 1,
      borderRightColor: THEME_COLOR.border,
    },
    tableCellLeft: {
      textAlign: 'left',
    },
    // Column widths matching headers
    tableCellCategoryDescription: {
      flex: 2.5,
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'left',
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderRightWidth: 1,
      borderRightColor: THEME_COLOR.border,
    },
    categoryText: {
      fontSize: 9,
      color: THEME_COLOR.black100,
      fontWeight: '600',
      marginBottom: 2,
    },
    descriptionText: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      lineHeight: 13,
    },
    tableCellUnit: {
      flex: 0.8,
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'center',
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderRightWidth: 1,
      borderRightColor: THEME_COLOR.border,
    },
    tableCellQuantity: {
      flex: 0.8,
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'center',
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderRightWidth: 1,
      borderRightColor: THEME_COLOR.border,
    },
    tableCellNumeric: {
      flex: 0.6,
      fontSize: 10,
      color: THEME_COLOR.black100,
      textAlign: 'center',
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderRightWidth: 1,
      borderRightColor: THEME_COLOR.border,
    },

    // Terms Section
    termsSection: {
      marginVertical: 20,
    },
    termsLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
      marginBottom: 8,
    },
    termsContent: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: THEME_COLOR.border,
      padding: 10,
      minHeight: 60,
      backgroundColor: THEME_COLOR.background,
    },
    termsText: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      lineHeight: 15,
    },

    // Footer
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
    },
    footerLeft: {
      flex: 1,
    },
    footerRight: {
      flex: 1,
      alignItems: 'flex-end',
    },
    footerText: {
      fontSize: 9,
      color: THEME_COLOR.black100,
      marginBottom: 2,
    },

    // Error Styles
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
      textAlign: 'center',
      marginBottom: 12,
    },
    errorText: {
      fontSize: 16,
      color: THEME_COLOR.black100,
      textAlign: 'center',
      lineHeight: 24,
    },
  });
