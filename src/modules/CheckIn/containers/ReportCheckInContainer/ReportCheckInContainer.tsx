import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  const { 
    formData, 
    isFormValid, 
    handleFieldChange, 
    handleFinish, 
    projects, 
    issueTypes, 
    loading 
  } = useReportCheckIn();

  const handleCancel = () => {
    navigation.navigate(NAVIGATORS.BOTTOM_TAB as never);
  };

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText="Report Check-In Issue"
        />
        <ScreenWrapper>
          <KeyboardAwareScrollWrapper
            applyHorizontalPadding
            applyVerticalPadding>
            <View style={Styles.fieldSpacing} />
            <Dropdown
              showLabel
              label={'Project'}
              placeholder="Select Project"
              data={projects}
              value={formData.project}
              onChange={item => handleFieldChange('project', item.value)}
            />

            <View style={Styles.fieldSpacing} />
            <TextField
              showLabel
              label="Location"
              placeholder="Select destination"
              value={formData.destination}
              onChangeText={text => handleFieldChange('destination', text)}
              inputContainerStyle={Styles.textContainer}
            />

            <View style={Styles.fieldSpacing} />
            <Dropdown
              showLabel
              label={'Issue Type'}
              placeholder="Select issue type"
              data={issueTypes}
              value={formData.issue}
              onChange={item => handleFieldChange('issue', item.value)}
            />

            <View style={Styles.fieldSpacing} />
            <TextField
              showLabel
              label="Description"
              placeholder="Message"
              value={formData.description}
              onChangeText={text => handleFieldChange('description', text)}
              multiline
              textAlignVertical="bottom"
              inputContainerStyle={Styles.multiLineTextContainer}
            />

            <View style={Styles.buttonWrapper}>
            <View style={Styles.buttonContainerWrapper}>
                <SecondaryButton
                  text="Cancel"
                  containerStyle={Styles.buttonContainer}
                  onPress={handleCancel}
                />
              </View>
              <View style={Styles.buttonContainerWrapper}>
                <PrimaryButton
                  text="Submit"
                  containerStyle={Styles.buttonContainer}
                  disabled={!isFormValid}
                  borderColor={THEME_COLOR.primary}
                  onPress={() => handleFinish()}
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
