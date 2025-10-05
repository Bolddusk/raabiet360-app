import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { HUMAN_RESOURCE_ROLE } from '@constant';
import { useTheme } from '@providers';
import { ACTIVE_OPACITY } from '@styles/theme';
import { styles } from './SiteInfoCard.styles';

const SiteInfoCard = ({ project, onPress }) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const dutyStaff = project?.resource_allocation?.human_resources?.find(
    a => a?.role === HUMAN_RESOURCE_ROLE.DutyStaff,
  );

  const managerName = dutyStaff?.name ?? '-';

  return (
    <TouchableOpacity
      style={Styles.card}
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}>
      {/* <Image
        source={project?.image ? { uri: project?.image } : ICONS.DEFAULT_AVATAR}
        style={Styles.image}
        resizeMode="cover"
      /> */}
      <View style={Styles.info}>
        <Text style={Styles.title} numberOfLines={2}>
          {project?.project_id}
        </Text>

        <Text style={Styles.sub}>Location:</Text>
        <Text style={Styles.text} numberOfLines={1}>
          {project?.location_address || '-'}
        </Text>

        <Text style={Styles.sub}>Site Manager:</Text>
        <Text style={Styles.text} numberOfLines={1}>
          {managerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SiteInfoCard;