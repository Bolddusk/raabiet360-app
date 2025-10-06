import type React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ICONS } from '@assets/svg';
import { WorkerStatus } from '@constant';
import { useTheme } from '@providers';
import { PrimaryButton } from '@shared/components';
import { ACTIVE_OPACITY, iconSize, TEXT_STYLE } from '@styles/theme';
import { RequestCardProps, Worker } from '@types';
import { styles } from './RequestCard.styles';

const IconSize = iconSize(0.04);
const IconSize1 = iconSize(0.05);

const RequestCard: React.FC<RequestCardProps> = ({
  request,
  type,
  onPressDetail,
  onViewDetails,
}) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });


  const getStatusColor = (status: Worker['status']) => {
    switch (status) {
      case WorkerStatus.IN_PROGRESS:
        return THEME_COLOR.primary;
      case WorkerStatus.COMPLETED:
        return THEME_COLOR.green;
      case WorkerStatus.PENDING:
        return '#FF915F';
      default:
        return THEME_COLOR.black;
    }
  };

  const getStatusIcon = (status: Worker['status']) => {
    switch (status) {
      case WorkerStatus.IN_PROGRESS:
        return ICONS.STATUS_PROGRESS;
      case WorkerStatus.COMPLETED:
        return ICONS.STATUS_COMPLETE;
      case WorkerStatus.PENDING:
        return ICONS.STATUS_REJECT;
      default:
        return ICONS.STATUS_PROGRESS;
    }
  };

  const getStatusText = (status: Worker['status']) => {
    // Simple function to format status: capitalize and replace underscores with spaces
    const formatStatus = (status: string): string => {
      return status
        .replace(/_/g, ' ')  // Replace underscores with spaces
        .split(' ')          // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' ');          // Join back with spaces
    };

    return formatStatus(status);
  };

  const getRequestTypeLabel = (requestType: string) => {
    switch (requestType) {
      case 'stock_request':
        return 'Stock Request';
      case 'replenishment':
        return 'Stock Replenishment';
      case 'pickup_request':
        return 'Pickup Request';
      default:
        return 'Stock Request';
    }
  };


  const getRequestTypeColor = (requestType: string) => {
    switch (requestType) {
      case 'stock_request':
        return '#3B82F6'; // Blue
      case 'replenishment':
        return '#10B981'; // Green
      case 'pickup_request':
        return '#F59E0B'; // Orange
      default:
        return '#3B82F6'; // Blue
    }
  };

  return (
    <TouchableOpacity 
      style={Styles.container} 
      activeOpacity={0.7}
      onPress={() => onPressDetail && onPressDetail(request)}
    >
      <View style={Styles.infoContainer}>
        {/* Header row with creator name and status */}
        <View style={Styles.headerRow}>
          <Text style={Styles.name} numberOfLines={2}>
            {request.name || 'Unknown Creator'}
          </Text>
          <Text style={[Styles.statusText, { color: getStatusColor(request.status) }]}>
            {getStatusText(request.status)}
          </Text>
        </View>
        
        {/* Request type below creator name */}
        <View style={Styles.typeRow}>
          <View style={[Styles.typeTag, { backgroundColor: getRequestTypeColor(request.item || 'stock_request') }]}>
            <Text style={Styles.typeText}>
              {getRequestTypeLabel(request.item || 'stock_request')}
            </Text>
          </View>
        </View>
        
        {/* Request/Replenishment ID */}
        <Text style={Styles.idText} numberOfLines={1}>
          ID: {request.item === 'replenishment' ? (request.replenishment_id || 'N/A') : (request.request_id || 'N/A')}
        </Text>
        
        {/* Show different content based on request type */}
        {request.item === 'pickup_request' ? (
          <>
            <Text style={Styles.address} numberOfLines={2}>
              📍 {request.address || 'Unknown Drop-off Location'}
            </Text>
            <Text style={Styles.warehouse} numberOfLines={2}>
              🚗 {request.driver_name || 'No Driver Assigned'}
            </Text>
            {request.vehicle_number && (
              <Text style={Styles.warehouse} numberOfLines={1}>
                🚙 {request.vehicle_number} {request.vehicle_color ? `(${request.vehicle_color})` : ''}
              </Text>
            )}
          </>
        ) : (
          <>
            <Text style={Styles.address} numberOfLines={2}>
              {request.project || 'Unknown Project'}
            </Text>
            <Text style={Styles.warehouse} numberOfLines={2}>
              📍 {request.address || 'Unknown Warehouse'}
            </Text>
          </>
        )}
        {/* Show different content based on request type */}
        {request.item === 'pickup_request' ? (
          <View style={Styles.quantityRow}>
            <View style={Styles.quantityLeft}>
              <ICONS.DOC_TIMER.default
                color={THEME_COLOR.gray600}
                width={IconSize}
                height={IconSize}
              />
              <Text style={Styles.quantity} numberOfLines={1}>
                Pickup Request
              </Text>
            </View>
            {/* Time on the right side of the same row */}
            <Text style={Styles.timeText}>
              {request.time} | {request.date}
            </Text>
          </View>
        ) : (
          request.quantity && request.quantity !== '0' && (
            <View style={Styles.quantityRow}>
              <View style={Styles.quantityLeft}>
                <ICONS.DOC_TIMER.default
                  color={THEME_COLOR.gray600}
                  width={IconSize}
                  height={IconSize}
                />
                <Text style={Styles.quantity} numberOfLines={1}>
                  {request.quantity} items
                </Text>
              </View>
              {/* Time on the right side of the same row */}
              <Text style={Styles.timeText}>
                {request.time} | {request.date}
              </Text>
            </View>
          )
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
