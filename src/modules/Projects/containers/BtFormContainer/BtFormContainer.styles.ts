import { StyleSheet } from 'react-native';

export const styles = ({ THEME_COLOR }: any) =>
  StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
      flex: 1,
    },
    container: {
      padding: 15,
      backgroundColor: THEME_COLOR.background || '#f9f9f9',
    },
    // Header styles matching PDF
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottomWidth: 2,
      borderBottomColor: '#000',
      paddingBottom: 10,
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: THEME_COLOR.black100,
    },
    companyDetails: {
      fontSize: 10,
      color: THEME_COLOR.black100,
      marginBottom: 2,
    },
    pageNumber: {
      fontSize: 12,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
    },
    documentTitle: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginVertical: 15,
      color: THEME_COLOR.black100,
    },
    workOrderNumber: {
      textAlign: 'right',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 20,
      color: THEME_COLOR.black100,
    },
    // General Info Grid
    generalInfo: {
      borderWidth: 1,
      borderColor: THEME_COLOR.border || '#000',
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      backgroundColor: THEME_COLOR.background || '#f9f9f9',
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 12,
      textTransform: 'uppercase',
      borderBottomWidth: 1,
      borderBottomColor: THEME_COLOR.border || '#000',
      paddingBottom: 5,
      marginBottom: 10,
      color: THEME_COLOR.black100,
    },
    infoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    infoItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      width: '50%',
      marginBottom: 4,
    },
    infoLabel: {
      fontWeight: 'bold',
      minWidth: 50,
      fontSize: 8,
      color: THEME_COLOR.black100,
    },
    infoValue: {
      textAlign: 'right',
      maxWidth: 60,
      fontSize: 9,
      color: THEME_COLOR.black100,
    },
    // Extracted Info Grid
    extractedInfo: {
      borderWidth: 1,
      borderColor: THEME_COLOR.border || '#000',
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      backgroundColor: THEME_COLOR.background || '#f9f9f9',
    },
    extractedGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    extractedItem: {
      alignItems: 'center',
      padding: 5,
      borderWidth: 1,
      borderColor: THEME_COLOR.border || '#ccc',
      backgroundColor: THEME_COLOR.white || '#fff',
      width: '33.33%',
      marginBottom: 10,
    },
    extractedLabel: {
      fontSize: 9,
      fontWeight: 'bold',
      marginBottom: 2,
      color: THEME_COLOR.black100,
    },
    extractedValue: {
      fontSize: 11,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
    },
    // Objectives Grid
    objectives: {
      borderWidth: 1,
      borderColor: THEME_COLOR.border || '#000',
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      backgroundColor: THEME_COLOR.background || '#f9f9f9',
    },
    objectivesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    objectiveItem: {
      alignItems: 'center',
      padding: 5,
      borderWidth: 1,
      borderColor: THEME_COLOR.border || '#ccc',
      backgroundColor: THEME_COLOR.white || '#fff',
      width: '33.33%',
      marginBottom: 10,
    },
    objectiveLabel: {
      fontSize: 9,
      fontWeight: 'bold',
      marginBottom: 2,
      color: THEME_COLOR.black100,
    },
    objectiveValue: {
      fontSize: 11,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
    },
    // Items Table
    itemsTable: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: THEME_COLOR.border || '#ccc',
      borderRadius: 8,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: THEME_COLOR.primary,
      paddingVertical: 6,
      paddingHorizontal: 3,
    },
    tableHeaderText: {
      flex: 1,
      color: THEME_COLOR.white || '#fff',
      fontSize: 9,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableHeaderTextFirst: {
      flex: 2,
      color: THEME_COLOR.white || '#fff',
      fontSize: 9,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableHeaderTextOther: {
      flex: 0.8,
      color: THEME_COLOR.white || '#fff',
      fontSize: 9,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: THEME_COLOR.border || '#ccc',
      paddingVertical: 4,
      paddingHorizontal: 3,
      backgroundColor: THEME_COLOR.white || '#fff',
    },
    tableCell: {
      flex: 0.8,
      fontSize: 9,
      color: THEME_COLOR.black100,
      textAlign: 'center',
    },
    codeDescriptionCell: {
      flex: 2,
      paddingHorizontal: 2,
    },
    codeText: {
      fontSize: 9,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
      textAlign: 'left',
      marginBottom: 2,
    },
    descriptionText: {
      fontSize: 8,
      color: THEME_COLOR.black100,
      textAlign: 'left',
      lineHeight: 10,
    },
    // Footer
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    editDate: {
      fontSize: 10,
      color: THEME_COLOR.black100,
    },
    signatureSection: {
      alignItems: 'center',
    },
    signatureLine: {
      borderTopWidth: 1,
      borderTopColor: '#000',
      width: 120,
      marginVertical: 15,
    },
    signatureLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      color: THEME_COLOR.black100,
    },
    originalNote: {
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: THEME_COLOR.black100,
    },
    // Error styles
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
      color: THEME_COLOR.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    errorText: {
      fontSize: 16,
      color: THEME_COLOR.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
  });

