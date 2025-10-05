import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { DATA, NAVIGATORS } from '@constant';
import { useTheme } from '@providers';
import {
  Dropdown,
  FullScreenWrapper,
  Header,
  KeyboardAwareScrollWrapper,
  PrimaryButton,
  SafeAreaViewWrapper,
  ScreenWrapper,
  SecondaryButton,
  TextField,
} from '@shared/components';
import { useReportCheckIn } from '../../hooks/useReportCheckIn';
import { styles } from './ReportCheckInContainer.styles';

const ReportCheckInContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { 
    formData, 
    isFormValid, 
    handleFieldChange, 
    handleFinish, 
    projects, 
    issueTypes, 
    loading,
    submitting 
  } = useReportCheckIn();

  const handleCancel = () => {
    navigation.navigate(NAVIGATORS.BOTTOM_TAB as never);
  };

  const handleSubmit = async () => {
    const result = await handleFinish();
    
    if (result?.success) {
      Alert.alert(
        `✅ ${t('ReportCheckIn.SuccessTitle')}`,
        `${t('ReportCheckIn.SuccessMessage')}\n\nIssue ID: ${result.data?.issueId}\nProject: ${result.data?.project?.name}\nIssue Type: ${result.data?.issueType}\n\n${t('ReportCheckIn.SuccessDetails')}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(NAVIGATORS.BOTTOM_TAB as never),
          },
        ]
      );
    } else {
      Alert.alert(
        `❌ ${t('ReportCheckIn.ErrorTitle')}`,
        result?.error || t('ReportCheckIn.ErrorMessage'),
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('ReportCheckIn.Title')}
        />
        <ScreenWrapper>
          <KeyboardAwareScrollWrapper
            applyHorizontalPadding
            applyVerticalPadding>
            <View style={Styles.fieldSpacing} />
            <Dropdown
              showLabel
              label={t('ReportCheckIn.Project')}
              placeholder={t('ReportCheckIn.SelectProject')}
              data={projects}
              value={formData.project}
              onChange={item => handleFieldChange('project', item.value)}
            />

            <View style={Styles.fieldSpacing} />
            <Dropdown
              showLabel
              label={t('ReportCheckIn.IssueType')}
              placeholder={t('ReportCheckIn.SelectIssueType')}
              data={issueTypes}
              value={formData.issue}
              onChange={item => handleFieldChange('issue', item.value)}
              scrollable={true}
              maxHeight={200}
            />

            <View style={Styles.fieldSpacing} />
            <TextField
              showLabel
              label={t('ReportCheckIn.Description')}
              placeholder={t('ReportCheckIn.DescriptionPlaceholder')}
              value={formData.description}
              onChangeText={text => handleFieldChange('description', text)}
              multiline
              textAlignVertical="bottom"
              inputContainerStyle={Styles.multiLineTextContainer}
              maxLength={250}
              error={formData.description.trim().length > 0 && (formData.description.trim().length < 20 || formData.description.trim().length > 250) ? 
                `${t('ReportCheckIn.DescriptionError')} (${formData.description.trim().length}/250)` : 
                undefined
              }
            />

            <View style={Styles.buttonWrapper}>
            <View style={Styles.buttonContainerWrapper}>
                <SecondaryButton
                  text={t('ReportCheckIn.Cancel')}
                  containerStyle={Styles.buttonContainer}
                  onPress={handleCancel}
                />
              </View>
              <View style={Styles.buttonContainerWrapper}>
                <PrimaryButton
                  text={submitting ? t('ReportCheckIn.Submitting') : t('ReportCheckIn.Submit')}
                  containerStyle={Styles.buttonContainer}
                  disabled={!isFormValid || submitting}
                  borderColor={THEME_COLOR.primary}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </KeyboardAwareScrollWrapper>
        </ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default ReportCheckInContainer;
