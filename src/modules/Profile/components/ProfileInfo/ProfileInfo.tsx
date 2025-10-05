import { useTheme } from '@providers';
import { Image, Text, View } from 'react-native';
import moment from 'moment';

import { ICONS } from '@assets/svg';
import { ProfileInfoProps } from '@types';
import { styles } from './ProfileInfo.styles';

const ProfileInfo = ({
  name,
  role,
  startTime,
  endTime,
  profileImage,
}: ProfileInfoProps) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const formattedStartTime = startTime
    ? moment(startTime, 'HH:mm:ss').format('hh:mmA')
    : '';
  const formattedEndTime = endTime
    ? moment(endTime, 'HH:mm:ss').format('hh:mmA')
    : '';

  const shiftTime =
    formattedStartTime && formattedEndTime
      ? `${formattedStartTime} - ${formattedEndTime}`
      : '';

  return (
    <View style={Styles.profileSection}>
      <Image
        source={profileImage ? { uri: profileImage } : ICONS.DEFAULT_AVATAR}
        style={Styles.profileImage}
        resizeMode="cover"
      />
      <Text style={Styles.profileName} numberOfLines={1}>
        {name}
      </Text>

      <Text style={Styles.profileRole} numberOfLines={1}>
        {role} {shiftTime ? `| ${shiftTime}` : ''}
      </Text>
    </View>
  );
};

export default ProfileInfo;
