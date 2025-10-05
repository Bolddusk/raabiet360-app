import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { USER_ROLE } from '@constant';
import { useTheme } from '@providers';
import { isDriver } from '@utils/roleUtils';
import { PrimaryButton } from '@shared/components';
import { ProjectCardTypes } from '@types';
import { getStatusColor, getTextColor } from '../../../../utils/statusUtils';
import { styles } from './ProjectCard.styles';

const ProjectCard = ({
  moduleId,
  name,
  location,
  role,
  managerName,
  status,
  statusOptions = [],
  onBTFormPress,
  onQFormPress,
}: ProjectCardTypes) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();


  return (
    <View style={Styles.card}>
      <View style={Styles.cardContent}>
        {/* Module ID */}
        <Text style={Styles.module}>
          {t('Label.Module')}#{moduleId || 'N/A'}
        </Text>

        {/* Project Name */}
        <Text style={Styles.title} numberOfLines={2}>
          {name || 'No Project Name'}
        </Text>

        {/* Status */}
        {status && status !== 'undefined' && (
          <View style={Styles.statusContainer}>
            <Text style={[Styles.statusText, { 
              backgroundColor: getStatusColor(status, statusOptions),
              color: getTextColor(getStatusColor(status, statusOptions))
            }]}>
              {status}
            </Text>
          </View>
        )}

        {/* Location */}
        {location && (
          <Text style={Styles.subtitle} numberOfLines={2}>
            📍 {location}
          </Text>
        )}

        {/* Manager Section */}
        {managerName && managerName !== '-' && (
          <View style={Styles.managerInfo}>
            <Text style={Styles.managerLabel}>{t('Label.SiteManager')}</Text>
            <Text style={Styles.managerText} numberOfLines={1}>
              {managerName}
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      {!isDriver({ role_name: role }) && (
        <View style={Styles.actions}>
          <PrimaryButton
            text={t('Label.BTForm')}
            onPress={onBTFormPress}
            containerStyle={Styles.button}
          />
          <PrimaryButton
            text={t('Label.QForm')}
            onPress={onQFormPress}
            containerStyle={Styles.button}
          />
        </View>
      )}
    </View>
  );
};

export default ProjectCard;
