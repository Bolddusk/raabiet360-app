import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';

import { useTheme } from '@providers';
import {
  FullScreenWrapper,
  Header,
  SafeAreaViewWrapper,
  ScreenWrapper,
  ActivityLoader,
} from '@shared/components';
import { styles } from './BtFormContainer.styles';
import { useBTForm } from '../../hooks/useBTForm';

const BtFormContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  
  const { projectId } = route.params || {};
  const { loading, btFormData, error, fetchBTFormData } = useBTForm();

  useEffect(() => {
    if (projectId) {
      fetchBTFormData(projectId);
    }
  }, [projectId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaViewWrapper>
        <FullScreenWrapper bgColor={THEME_COLOR.primary}>
          <Header
            variant="simple"
            showMiddleContainer
            middleText={t('Label.BTForm')}
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
            middleText={t('Label.BTForm')}
            showLeftContainer
            onLeftPress={handleBackPress}
            showRightContainer
          />
          <ScreenWrapper style={Styles.screenWrapper}>
            <View style={Styles.errorContainer}>
              <Text style={Styles.errorIcon}>⚠️</Text>
              <Text style={Styles.errorTitle}>Unable to Load BT Form</Text>
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
          middleText={t('Label.BTForm')}
          showLeftContainer
          onLeftPress={handleBackPress}
          showRightContainer
        />
        <ScreenWrapper style={Styles.screenWrapper}>
          <ScrollView style={Styles.scrollView} showsVerticalScrollIndicator={false}>
            {btFormData && (
              <View style={Styles.container}>
                {/* Header - Company Info */}
                <View style={Styles.header}>
                  <View style={Styles.companyInfo}>
                    <Text style={Styles.companyName}>{btFormData.bailleur || ''}</Text>
                    {/* <Text style={Styles.companyDetails}>Agence Centre-Est</Text>
                    <Text style={Styles.companyDetails}>13 PLACE DE LISIEUX</Text>
                    <Text style={Styles.companyDetails}>51100 REIMS</Text> */}
                  </View>
                  <Text style={Styles.pageNumber}>PAGE N° 1</Text>
                </View>

                {/* Document Title */}
                <Text style={Styles.documentTitle}>BON DE TRAVAUX</Text>
                <Text style={Styles.workOrderNumber}>N° {btFormData.job_id || '-'}</Text>

                {/* General Information Grid */}
                <View style={Styles.generalInfo}>
                  <Text style={Styles.sectionTitle}>INFORMATIONS GÉNÉRALES</Text>
                  <View style={Styles.infoGrid}>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Bailleur:</Text>
                      <Text style={Styles.infoValue}>{btFormData.bailleur || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Prestataire:</Text>
                      <Text style={Styles.infoValue}>{btFormData.prestataire || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>N° Module:</Text>
                      <Text style={Styles.infoValue}>{btFormData.n_module || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>N° BT:</Text>
                      <Text style={Styles.infoValue}>{btFormData.job_id || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Adresse:</Text>
                      <Text style={Styles.infoValue}>{btFormData.address || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Tranche:</Text>
                      <Text style={Styles.infoValue}>{btFormData.tranche || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Ensemble:</Text>
                      <Text style={Styles.infoValue}>{btFormData.ensemble || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Escalier:</Text>
                      <Text style={Styles.infoValue}>{btFormData.escalier || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Étage:</Text>
                      <Text style={Styles.infoValue}>{btFormData.etage || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>N° Appartement:</Text>
                      <Text style={Styles.infoValue}>{btFormData.apartment_no || btFormData.n_appartement || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Dans Reims:</Text>
                      <Text style={Styles.infoValue}>{btFormData.dans_reims || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Émetteur:</Text>
                      <Text style={Styles.infoValue}>{btFormData.emetteur || '-'}</Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Date réception:</Text>
                      <Text style={Styles.infoValue}>
                        {btFormData.date_received ? new Date(btFormData.date_received).toLocaleDateString('fr-FR') : '-'}
                      </Text>
                    </View>
                    <View style={Styles.infoItem}>
                      <Text style={Styles.infoLabel}>Date fin:</Text>
                      <Text style={Styles.infoValue}>
                        {btFormData.end_date ? new Date(btFormData.end_date).toLocaleDateString('fr-FR') : '-'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Extracted Information Grid */}
                <View style={Styles.extractedInfo}>
                  <Text style={Styles.sectionTitle}>INFORMATION EXTRACTED FROM ARTICLES</Text>
                  <View style={Styles.extractedGrid}>
                    <View style={Styles.extractedItem}>
                      <Text style={Styles.extractedLabel}>AMIANTE</Text>
                      <Text style={Styles.extractedValue}>{btFormData.amiante || '-'}</Text>
                    </View>
                    <View style={Styles.extractedItem}>
                      <Text style={Styles.extractedLabel}>PEINTURE</Text>
                      <Text style={Styles.extractedValue}>{btFormData.peinture || '-'}</Text>
                    </View>
                    <View style={Styles.extractedItem}>
                      <Text style={Styles.extractedLabel}>SOLS/M²</Text>
                      <Text style={Styles.extractedValue}>{btFormData.sols_m2 || '-'}</Text>
                    </View>
                    <View style={Styles.extractedItem}>
                      <Text style={Styles.extractedLabel}>PAPIER PEINT/M²</Text>
                      <Text style={Styles.extractedValue}>{btFormData.papier_peint_m2 || '-'}</Text>
                    </View>
                    <View style={Styles.extractedItem}>
                      <Text style={Styles.extractedLabel}>DÉTAIL SOLIER</Text>
                      <Text style={Styles.extractedValue}>{btFormData.detail_soller || '-'}</Text>
                    </View>
                    <View style={Styles.extractedItem}>
                      <Text style={Styles.extractedLabel}>MÉNAGE</Text>
                      <Text style={Styles.extractedValue}>{btFormData.menage || '-'}</Text>
                    </View>
                  </View>
                </View>

                {/* Objectives Grid */}
                <View style={Styles.objectives}>
                  <Text style={Styles.sectionTitle}>OBJECTIFS</Text>
                  <View style={Styles.objectivesGrid}>
                    <View style={Styles.objectiveItem}>
                      <Text style={Styles.objectiveLabel}>OBJECTIF 1</Text>
                      <Text style={Styles.objectiveValue}>{btFormData.objective1 || '-'}</Text>
                    </View>
                    <View style={Styles.objectiveItem}>
                      <Text style={Styles.objectiveLabel}>OBJECTIF 2 HEURES</Text>
                      <Text style={Styles.objectiveValue}>{btFormData.objective2_hours || '-'}</Text>
                    </View>
                    <View style={Styles.objectiveItem}>
                      <Text style={Styles.objectiveLabel}>OBJECTIF 2 JOURS</Text>
                      <Text style={Styles.objectiveValue}>{btFormData.objective2_days || '-'}</Text>
                    </View>
                  </View>
                </View>

                {/* Items Table */}
                {btFormData.items && btFormData.items.length > 0 && (
                  <View style={Styles.itemsTable}>
                    <View style={Styles.tableHeader}>
                      <Text style={Styles.tableHeaderTextFirst}>CODE/DESCRIPTION</Text>
                      <Text style={Styles.tableHeaderTextOther}>UNITÉ</Text>
                      <Text style={Styles.tableHeaderTextOther}>QUANTITÉ</Text>
                    </View>
                    {btFormData.items.map((item, index) => (
                      <View key={item.id || index} style={Styles.tableRow}>
                        <View style={Styles.codeDescriptionCell}>
                          <Text style={Styles.codeText}>{item.category || '-'}</Text>
                          <Text style={Styles.descriptionText}>{item.description || '-'}</Text>
                        </View>
                        <Text style={Styles.tableCell}>{item.unit || '-'}</Text>
                        <Text style={Styles.tableCell}>{item.quantity || '-'}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Footer */}
                <View style={Styles.footer}>
                  <Text style={Styles.editDate}>Édité le: {new Date().toLocaleDateString('fr-FR')}</Text>
                  <View style={Styles.signatureSection}>
                    <View style={Styles.signatureLine} />
                    <Text style={Styles.signatureLabel}>Le Service Émetteur</Text>
                  </View>
                  <Text style={Styles.originalNote}>
                    ORIGINAL À CONSERVER{'\n'}PAR LE DESTINATAIRE
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default BtFormContainer;
