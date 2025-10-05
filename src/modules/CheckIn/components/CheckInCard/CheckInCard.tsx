import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import { PrimaryButton } from '@shared/components';
import { CheckInCardProps } from '@types';
import { styles } from './CheckInCard.styles';

const CheckInCard: React.FC<CheckInCardProps> = ({
  title,
  location,
  status,
  checkInTime,
  checkOutTime,
  onCheckIn,
  loading = false,
}) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <View style={Styles.card}>
      <View style={Styles.content}>
        <View style={Styles.textContainer}>
          <Text style={Styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={Styles.location} numberOfLines={2}>
            {location}
          </Text>
          
          {/* Show check-in/out times below name and address */}
          {(status === 'ongoing' || status === 'completed') && (
            <View style={Styles.timeContainer}>
              {checkInTime && (
                <View style={Styles.timeRow}>
                  <Text style={Styles.timeLabel}>{t('CheckIn.In')}</Text>
                  <Text style={Styles.timeText}>
                    {new Date(checkInTime).toLocaleString()}
                  </Text>
                </View>
              )}
              {checkOutTime && (
                <View style={Styles.timeRow}>
                  <Text style={Styles.timeLabel}>{t('CheckIn.Out')}</Text>
                  <Text style={Styles.timeText}>
                    {new Date(checkOutTime).toLocaleString()}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {status === 'recent' || status === 'ongoing' ? (
          <View style={Styles.rightContainer}>
            <PrimaryButton
              text={status === 'recent' ? t('CheckIn.CheckIn') : t('CheckIn.CheckOut')}
              onPress={() => onCheckIn()}
              containerStyle={Styles.checkInButton}
              disabled={loading}
              loading={loading}
            />
          </View>
        ) : (
          <View style={Styles.rightCompletedContainer}>
            <Text style={Styles.completedText}>{t('CheckIn.Completed')}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckInCard;
