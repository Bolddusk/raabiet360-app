import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { WorkerStatus } from '@constant';
import { useTheme } from '@providers';
import { PrimaryButton } from '@shared/components';
import { ACTIVE_OPACITY } from '@styles/theme';
import { WorkerRequestCardProps } from '@types';
import { styles } from './WorkerRequestCard.styles';

// Function to map API status values to translation keys
const getStatusTranslationKey = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'Button.Label.Pending',
    'in_progress': 'Button.Label.InProgress',
    'completed': 'Button.Label.Completed',
    'rejected': 'Button.Label.Rejected',
    // Fallback for any other status values
    'Pending': 'Button.Label.Pending',
    'In-Progress': 'Button.Label.InProgress',
    'Completed': 'Button.Label.Completed',
    'Rejected': 'Button.Label.Rejected',
  };
  
  return statusMap[status] || 'Button.Label.Pending';
};

const WorkerRequestCard: React.FC<WorkerRequestCardProps> = ({
  request,
  type,
  onPressDetail,
}) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <TouchableOpacity
      style={Styles.container}
      activeOpacity={ACTIVE_OPACITY}
      onPress={() => onPressDetail?.(request)}
      disabled={!onPressDetail}>
      <View style={Styles.infoContainer}>
        {type === 'pickup' ? (
          <>
            {/* Header with Request ID and Status Badge */}
            <View style={Styles.headerRow}>
              <Text style={Styles.requestId}>#{request.request_id || 'N/A'}</Text>
              <PrimaryButton
                text={t(getStatusTranslationKey(request.status))}
                containerStyle={[
                  Styles.smallButton,
                  request.status === 'completed' &&
                    Styles.completeButton,
                  request.status === 'in_progress' &&
                    Styles.inProgressButton,
                  request.status === 'pending' &&
                    Styles.pendingButton,
                  request.status === 'rejected' &&
                    Styles.rejectedButton,
                ]}
                textStyle={Styles.smallButtonText}
              />
            </View>
            
            <Text style={Styles.requestType}>Pickup Request</Text>
            
            {/* Pickup Time */}
            <View style={Styles.timeRow}>
              <Text style={Styles.timeLabel}>Pickup Time:</Text>
              <Text style={Styles.timeValue}>
                {request.time} | {request.date}
              </Text>
            </View>
            
            {/* Location */}
            <View style={Styles.infoRow}>
              <Text style={Styles.infoIcon}>📍</Text>
              <Text style={Styles.infoText} numberOfLines={2}>
                {request.address || 'Test Location'}
              </Text>
            </View>
            
            {/* Driver Info */}
            <View style={Styles.infoRow}>
              <Text style={Styles.infoIcon}>👤</Text>
              <Text style={Styles.infoText} numberOfLines={1}>
                {request.driver_name || 'Test Driver'}
              </Text>
            </View>
            
            {/* Vehicle Info */}
            <View style={Styles.infoRow}>
              <Text style={Styles.infoIcon}>🚗</Text>
              <Text style={Styles.infoText} numberOfLines={1}>
                {request.vehicle_number ? `${request.vehicle_number} ${request.vehicle_color ? `(${request.vehicle_color})` : ''}` : 'Test Vehicle'}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={Styles.name} numberOfLines={2}>
              {request?.item ?? request.name}
            </Text>
            <Text style={Styles.address} numberOfLines={2}>
              {request.address}
            </Text>
            {request?.quantity && (
              <Text style={Styles.quantity} numberOfLines={1}>
                {t('Label.Quantity')}: {request.quantity}
              </Text>
            )}
          </>
        )}
      </View>

      {type !== 'pickup' && (
        <View style={Styles.metaContainer}>
          {(type === 'stock') && (
            <View style={Styles.timeContainer}>
              <Text style={Styles.timeLabel}>Request Time</Text>
              <Text style={Styles.timeValue}>
                {request.time} | {request.date}
              </Text>
            </View>
          )}

          <View style={Styles.statusContainer}>
            <PrimaryButton
              text={t(getStatusTranslationKey(request.status))}
              containerStyle={[
                Styles.buttonContainer,
                Styles.smallButton,
                request.status === 'completed' &&
                  Styles.completeButton,
                request.status === 'in_progress' &&
                  Styles.inProgressButton,
                request.status === 'pending' &&
                  Styles.pendingButton,
                request.status === 'rejected' &&
                  Styles.rejectedButton,
              ]}
              textStyle={Styles.smallButtonText}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default WorkerRequestCard;
