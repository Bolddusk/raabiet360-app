import { useTheme } from '@providers';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS } from '@assets/svg';
import { USER_ROLE } from '@constant';
import { ACTIVE_OPACITY, iconSize } from '@styles/theme';
import { isDriver } from '@utils/roleUtils';
import { DriverDetailsProps } from '@types';
import { styles } from './DriverDetailsCard.styles';

const IconSize = iconSize(0.04);

const DriverDetailsCard = ({
  name,
  phone,
  email,
  role,
  designation,
  onEdit,
}: DriverDetailsProps) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  const isDriverRole = isDriver({ role_name: role });

  return (
    <View style={Styles.card}>
      <View style={Styles.cardHeader}>
        <Text style={Styles.cardTitle}>
          {isDriverRole ? t('Label.DriverDetails') : t('Label.WorkerDetails')}
        </Text>
        <TouchableOpacity onPress={onEdit} activeOpacity={ACTIVE_OPACITY}>
          <ICONS.EDIT.default
            width={IconSize}
            height={IconSize}
            color={THEME_COLOR.gray}
          />
        </TouchableOpacity>
      </View>

      <View style={Styles.detailsContainer}>
        <View style={Styles.namePhoneRow}>
          <View style={Styles.detailColumn}>
            <Text style={Styles.detailLabel}>{t('Label.Name')}:</Text>
            <Text style={Styles.detailValue}>{name}</Text>
          </View>
          <View style={Styles.detailColumnRight}>
            <Text style={Styles.detailLabel}>{t('Label.Number')}:</Text>
            <Text style={Styles.detailValue}>{phone}</Text>
          </View>
        </View>

        <View style={Styles.namePhoneRow}>
          <View style={Styles.detailColumn}>
            <Text style={Styles.detailLabel}>{t('Label.Email')}:</Text>
            <Text style={Styles.detailValue}>{email}</Text>
          </View>
          {!isDriverRole && (
            <View style={Styles.detailColumnRight}>
              <Text style={Styles.detailLabel}>{t('Label.Designation')}:</Text>
              <Text style={Styles.detailValue}>{designation}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DriverDetailsCard;
