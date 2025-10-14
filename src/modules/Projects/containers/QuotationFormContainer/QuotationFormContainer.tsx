import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { useTheme } from '@providers';
import {
  ActivityLoader,
  FullScreenWrapper,
  Header,
  SafeAreaViewWrapper,
  ScreenWrapper,
} from '@shared/components';
import { useQuotationForm } from '../../hooks/useQuotationForm';
import { styles } from './QuotationFormContainer.styles';
import useScreenProtection from '@shared/hooks/useScreenProtection';

const QuotationFormContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  
  const { projectId } = route.params || {};
  useScreenProtection();
  const { loading, quotationData, error, fetchQuotationData } = useQuotationForm();

  useEffect(() => {
    if (projectId) {
      fetchQuotationData(projectId);
    }
  }, [projectId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <SafeAreaViewWrapper>
        <FullScreenWrapper bgColor={THEME_COLOR.primary}>
          <Header
            variant="simple"
            showMiddleContainer
            middleText={t('Label.QForm')}
            showLeftContainer
            onLeftPress={handleBackPress}
            showRightContainer
          />
          <ScreenWrapper style={Styles.screenWrapper}>
            <ActivityLoader fullscreen />
          </ScreenWrapper>
        </FullScreenWrapper>
      </SafeAreaViewWrapper>
    );
  }

  if (error) {
    return (
      <SafeAreaViewWrapper>
        <FullScreenWrapper bgColor={THEME_COLOR.primary}>
          <Header
            variant="simple"
            showMiddleContainer
            middleText={t('Label.QForm')}
            showLeftContainer
            onLeftPress={handleBackPress}
            showRightContainer
          />
          <ScreenWrapper style={Styles.screenWrapper}>
            <View style={Styles.errorContainer}>
              <Text style={Styles.errorIcon}>⚠️</Text>
              <Text style={Styles.errorTitle}>Unable to Load Quotation</Text>
              <Text style={Styles.errorText}>{error}</Text>
            </View>
          </ScreenWrapper>
        </FullScreenWrapper>
      </SafeAreaViewWrapper>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.QForm')}
          showLeftContainer
          onLeftPress={handleBackPress}
          showRightContainer
        />
        <ScreenWrapper style={Styles.screenWrapper}>
          <ScrollView style={Styles.scrollView} showsVerticalScrollIndicator={false}>
            {quotationData && (
              <View style={Styles.container}>
                {/* Quotation Information Grid */}
                <View style={Styles.quotationInfo}>
                  <View style={Styles.infoRow}>
                    <Text style={Styles.infoLabel}>N° Devis:</Text>
                    <Text style={Styles.infoValue}>{quotationData.quotation_number || '-'}</Text>
                  </View>
                  <View style={Styles.infoRow}>
                    <Text style={Styles.infoLabel}>Date:</Text>
                    <Text style={Styles.infoValue}>{formatDate(quotationData.quotation_date)}</Text>
                  </View>
                  <View style={Styles.infoRow}>
                    <Text style={Styles.infoLabel}>Valide jusqu'au:</Text>
                    <Text style={Styles.infoValue}>{formatDate(quotationData.valid_until)}</Text>
                  </View>
                  <View style={Styles.infoRow}>
                    <Text style={Styles.infoLabel}>N° Projet:</Text>
                    <Text style={Styles.infoValue}>{quotationData.project?.project_id || '-'}</Text>
                  </View>
                </View>

                {/* Client Information Grid */}
                <View style={Styles.clientInfo}>
                  <View style={Styles.clientRow}>
                    <Text style={Styles.clientLabel}>Client:</Text>
                    <Text style={Styles.clientValue}>{quotationData.customer_name || '-'}</Text>
                  </View>
                  <View style={Styles.clientRow}>
                    <Text style={Styles.clientLabel}>Email:</Text>
                    <Text style={Styles.clientValue}>{quotationData.customer_email || '-'}</Text>
                  </View>
                  <View style={Styles.clientRow}>
                    <Text style={Styles.clientLabel}>Téléphone:</Text>
                    <Text style={Styles.clientValue}>{quotationData.customer_phone || '-'}</Text>
                  </View>
                  <View style={Styles.addressRow}>
                    <Text style={Styles.clientLabel}>Adresse du Projet:</Text>
                    <Text style={Styles.addressValue}>{quotationData.project_address || '-'}</Text>
                  </View>
                </View>

                {/* Items Table */}
                {quotationData.items && quotationData.items.length > 0 && (
                  <View style={Styles.itemsTable}>
                    <View style={Styles.tableHeader}>
                      <Text style={Styles.headerCellCategoryDescription}>ARTICLE</Text>
                      <Text style={Styles.headerCellUnit}>U</Text>
                      <Text style={Styles.headerCellQuantity}>QTY</Text>
                      <Text style={Styles.headerCellNumeric}>TU</Text>
                      <Text style={Styles.headerCellNumeric}>MO</Text>
                      <Text style={Styles.headerCellNumeric}>H</Text>
                    </View>
                    {quotationData.items.map((item, index) => (
                      <View key={item.id || index} style={[Styles.tableRow, index % 2 === 1 && Styles.tableRowEven]}>
                        <View style={Styles.tableCellCategoryDescription}>
                          <Text style={Styles.categoryText}>{item.category || '-'}</Text>
                          <Text style={Styles.descriptionText}>{item.description || '-'}</Text>
                        </View>
                        <Text style={Styles.tableCellUnit}>{item.unit || '-'}</Text>
                        <Text style={Styles.tableCellQuantity}>{item.quantity || '-'}</Text>
                        <Text style={Styles.tableCellNumeric}>{item.tu || '-'}</Text>
                        <Text style={Styles.tableCellNumeric}>{item.mo || '-'}</Text>
                        <Text style={Styles.tableCellNumeric}>{item.hours || '-'}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Terms and Conditions */}
                {quotationData.terms_conditions || (
                  <View style={Styles.termsSection}>
                    <Text style={Styles.termsLabel}>Conditions Générales:</Text>
                    <View style={Styles.termsContent}>
                      <Text style={Styles.termsText}>{quotationData.terms_conditions}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default QuotationFormContainer;
