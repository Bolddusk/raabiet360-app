import { useTheme } from '@providers';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { VehicleDetailsProps } from '@types';
import { styles } from './VehicleDetailsCard.styles';

const VehicleDetailsCard = ({
  vehicleName,
  vehicleNumber,
  status,
  color,
  model,
  vehicleImage,
}: VehicleDetailsProps) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <View style={Styles.card}>
      <Text style={Styles.cardTitle}>{t('Label.VehicleDetails')}</Text>

      <View style={Styles.contentWrapper}>
        <View style={Styles.textSection}>
          <View style={Styles.inlineRow}>
            <View style={Styles.halfWidth}>
              <Text style={Styles.detailLabel}>{t('Label.Name')}:</Text>
              <Text style={Styles.detailValue}>{vehicleName}</Text>
            </View>
            <View style={Styles.halfWidth}>
              <Text style={Styles.detailLabel}>{t('Label.Status')}:</Text>
              <Text style={Styles.detailValue}>{status}</Text>
            </View>
          </View>

          <View style={Styles.inlineRow}>
            <View style={Styles.thirdWidth}>
              <Text style={Styles.detailLabel}>{t('Label.Color')}:</Text>
              <Text style={Styles.detailValue}>{color}</Text>
            </View>
            <View style={Styles.thirdWidth}>
              <Text style={Styles.detailLabel}>{t('Label.Model')}:</Text>
              <Text style={Styles.detailValue}>{model}</Text>
            </View>
            <View style={Styles.thirdWidth}>
              <Text style={Styles.detailLabel}>{t('Label.Number')}:</Text>
              <Text style={Styles.detailValue}>{vehicleNumber}</Text>
            </View>
          </View>
        </View>

        <View style={Styles.vehicleImageContainer}>
          <Image
            source={vehicleImage}
            style={Styles.vehicleImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
};

export default VehicleDetailsCard;
