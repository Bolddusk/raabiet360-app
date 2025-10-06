import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, Text, View } from 'react-native';

import { useAuth, useTheme } from '@providers';
import { PrimaryButton, SecondaryButton, TextField } from '@shared/components';
import { WorkerRequest, WorkRequestModalProps } from '@types';
import { isDriver } from '@utils/roleUtils';
import { styles } from './WorkRequestModal.styles';

const DetailRow = ({
  label,
  value,
  Styles,
}: {
  label: string;
  value: string;
  Styles: any;
}) => (
  <View style={Styles.detailRow}>
    <Text style={Styles.detailLabel}>{label}</Text>
    <Text style={Styles.detailValue}>{value}</Text>
  </View>
);

const ItemTable = ({
  items,
  Styles,
}: {
  items: { name: string; qty: number }[];
  Styles: any;
}) => {
  const { t } = useTranslation();
  return (
    <View style={Styles.tableContainer}>
      <View style={Styles.tableRow}>
        <Text style={[Styles.tableHeaderCell, Styles.tableHeaderCellName]}>
          {t('Label.ItemName')}
        </Text>
        <View style={Styles.verticalDivider} />
        <Text style={Styles.tableHeaderCell}>{t('Label.Quantity')}</Text>
      </View>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View
            key={index}
            style={[Styles.tableRow, isLast && { borderBottomWidth: 0 }]}>
            <Text style={[Styles.tableCell, Styles.tableHeaderCellName]}>
              {item.name}
            </Text>
            <View style={Styles.verticalDivider} />
            <Text style={Styles.tableCell}>
              {item.qty.toString().padStart(2, '0')}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const TimelineItem = ({
  title,
  status,
  user,
  role,
  timestamp,
  notes,
  color,
  Styles,
}: {
  title: string;
  status: string;
  user: string;
  role: string;
  timestamp: string | null;
  notes?: string;
  color: string;
  Styles: any;
}) => (
  <View style={[Styles.timelineItem, { backgroundColor: `${color}20` }]}>
    <View style={[Styles.timelineDot, { backgroundColor: color }]} />
    <View style={Styles.timelineContent}>
      <View style={Styles.timelineHeader}>
        <Text style={[Styles.timelineTitle, { color: `${color}CC` }]}>
          {title}
        </Text>
        <View style={[Styles.statusBadge, { backgroundColor: `${color}30` }]}>
          <Text style={[Styles.statusBadgeText, { color: `${color}CC` }]}>
            {status}
          </Text>
        </View>
      </View>
      <Text style={[Styles.timelineUser, { color: `${color}CC` }]}>
        <Text style={Styles.timelineUserBold}>{user}</Text> ({role})
      </Text>
      {timestamp && (
        <Text style={[Styles.timelineTime, { color: `${color}99` }]}>
          {timestamp}
        </Text>
      )}
    </View>
  </View>
);

const WorkRequestModal: React.FC<WorkRequestModalProps> = ({
  visible,
  workerInfo,
  type,
  onClose,
  onPrimaryAction,
  onStatusUpdate,
}) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusNotes, setStatusNotes] = useState('');

  if (!workerInfo) {
    return null;
  }

  // Use actual items data from the request
  const items = workerInfo.items?.map(item => ({
    name: item.item_name,
    qty: item.quantity_requested,
  })) || [{ name: 'No items available', qty: 0 }];

  const getStatusText = (status: string) => {
    // Function to map API status values to translation keys
    const getStatusTranslationKey = (status: string): string => {
      const statusMap: Record<string, string> = {
        'pending': 'Button.Label.Pending',
        'in_progress': 'Button.Label.InProgress',
        'completed': 'Button.Label.Completed',
        'rejected': 'Button.Label.Rejected',
        'picked_up': 'Button.Label.PickedUp',
        'in_transit': 'Button.Label.InTransit',
        'delivered': 'Button.Label.Delivered',
        'received': 'Button.Label.Received',
        // Fallback for any other status values
        'Pending': 'Button.Label.Pending',
        'In-Progress': 'Button.Label.InProgress',
        'Completed': 'Button.Label.Completed',
        'Rejected': 'Button.Label.Rejected',
      };
      
      return statusMap[status] || 'Button.Label.Pending';
    };

    return t(getStatusTranslationKey(status));
  };

  const isReplenishment = workerInfo.item === 'replenishment';
  const isPickupRequest = workerInfo.item === 'pickup_request';
  const requestTypeLabel = isReplenishment
    ? 'Stock Replenishment'
    : isPickupRequest
    ? 'Pickup Request'
    : 'Stock Request';

  // Helper function to format timestamp - only show if timestamp exists
  const formatTimestamp = (timestamp: string | undefined) => {
    if (!timestamp) return null;
    try {
      const date = new Date(timestamp);
      return `${date.toLocaleTimeString()} | ${date.toLocaleDateString()}`;
    } catch {
      return null;
    }
  };

  // Timeline based on actual data fields (like web frontend)
  const getTimelineData = () => {
    const timeline = [];

    // Always show: Request Created (has createdAt)
    if (workerInfo.created_at) {
      timeline.push({
        title: `${requestTypeLabel} Created`,
        status: getStatusText('pending'),
        user: workerInfo.name || 'Unknown Creator',
        role: 'Staff Member',
        timestamp: formatTimestamp(workerInfo.created_at),
        color: '#3B82F6',
      });
    }

    // Show if driver is assigned (has driverId) - like web frontend (no timestamp)
    if (workerInfo.driver_id) {
      timeline.push({
        title: 'Driver Assigned',
        status: getStatusText('in_progress'),
        user: workerInfo.driver_name || 'Driver',
        role: 'Driver',
        timestamp: null, // No timestamp like web frontend
        color: '#10B981',
      });
    }

    // Show pickup status based on actual status field
    if (isPickupRequest) {
      // For pickup requests: show in_progress status
      if (workerInfo.status === 'in_progress' || workerInfo.status === 'completed') {
        timeline.push({
          title: 'Pickup Started',
          status: getStatusText('in_progress'),
          user: workerInfo.driver_name || 'Driver',
          role: 'Driver',
          timestamp: formatTimestamp(workerInfo.updated_at),
          notes: workerInfo.pickup_notes,
          color: '#8B5CF6',
        });
      }
      
      // Show completed status
      if (workerInfo.status === 'completed') {
        timeline.push({
          title: 'Pickup Completed',
          status: getStatusText('completed'),
          user: workerInfo.driver_name || 'Driver',
          role: 'Driver',
          timestamp: formatTimestamp(workerInfo.updated_at),
          notes: workerInfo.completion_notes,
          color: '#10B981',
        });
      }
    } else {
      // For stock requests: show picked_up status
      if (workerInfo.status === 'picked_up' || workerInfo.driver_pickup_confirmation) {
        timeline.push({
          title: 'Items Picked Up',
          status: getStatusText('picked_up'),
          user: workerInfo.driver_name || 'Driver',
          role: 'Driver',
          timestamp: formatTimestamp(workerInfo.pickup_date_time),
          notes: workerInfo.pickup_notes,
          color: '#8B5CF6',
        });
      }

      // Show if in transit (status is in_transit) - like web frontend
      if (workerInfo.status === 'in_transit' || workerInfo.in_transit_notes) {
        timeline.push({
          title: 'In Transit',
          status: getStatusText('in_transit'),
          user: workerInfo.driver_name || 'Driver',
          role: 'Driver',
          timestamp: formatTimestamp(workerInfo.in_transit_date_time || workerInfo.inTransitAt),
          notes: workerInfo.in_transit_notes,
          color: '#F97316',
        });
      }
    }

    // Show delivery status based on actual status field
    if (workerInfo.status === 'delivered' || workerInfo.driver_delivery_confirmation) {
      timeline.push({
        title: isPickupRequest ? 'Drop-off Completed' : 'Items Delivered',
        status: getStatusText('delivered'),
        user: workerInfo.driver_name || 'Driver',
        role: 'Driver',
        timestamp: formatTimestamp(workerInfo.delivery_date_time),
        notes: workerInfo.delivery_notes,
        color: '#F59E0B',
      });
    }

    // Show if workflow is completed (has workerConfirmation or status is completed/received) - like web frontend
    if (workerInfo.worker_confirmation || workerInfo.status === 'completed' || workerInfo.status === 'received') {
      timeline.push({
        title: `${requestTypeLabel} Complete`,
        status: getStatusText(workerInfo.status === 'received' ? 'received' : 'completed'),
        user: workerInfo.name || 'Staff Member',
        role: isReplenishment ? 'Warehouse Staff' : isPickupRequest ? 'Worker' : 'Worker',
        timestamp: formatTimestamp(workerInfo.completedAt),
        notes: workerInfo.completion_notes,
        color: '#059669',
      });
    }

    return timeline;
  };

  const timelineData = getTimelineData();

  // Status update button logic - matching web frontend
  const canConfirmPickup = (request: WorkerRequest) => {
    if (isPickupRequest) {
      // For pickup requests: pending -> in_progress
      return request.status === 'pending';
    } else {
      // For stock requests: pending/approved -> picked_up
      return (
        (request.status === 'pending' || request.status === 'approved') &&
        !request.driver_pickup_confirmation
      );
    }
  };

  const canConfirmInTransit = (request: WorkerRequest) => {
    if (isPickupRequest) {
      // For pickup requests: in_progress -> completed
      return request.status === 'in_progress';
    } else {
      // For stock requests: picked_up -> in_transit
      return (
        request.status === 'picked_up' && 
        !request.driver_delivery_confirmation &&
        !request.worker_confirmation
      );
    }
  };

  const canConfirmDelivery = (request: WorkerRequest) => {
    if (isPickupRequest) {
      // For pickup requests: no delivery step, skip this button
      return false;
    } else {
      // For stock requests: in_transit -> delivered
      return (
        request.status === 'in_transit' && 
        !request.driver_delivery_confirmation &&
        !request.worker_confirmation
      );
    }
  };

  const canConfirmReceipt = (request: WorkerRequest) => {
    if (isReplenishment) {
      // For replenishment, the final status is 'received' (mapped from 'completed')
      return request.status === 'delivered' && !request.worker_confirmation;
    } else if (isPickupRequest) {
      // For pickup requests: no receipt step, skip this button
      return false;
    } else {
      // For regular stock requests
      return request.status === 'delivered' && !request.worker_confirmation;
    }
  };

  // Check if request is completed/confirmed - no status update buttons should show
  const isRequestCompleted = (request: WorkerRequest) => {
    if (isReplenishment) {
      // For replenishment, completed status is 'received'
      return (
        request.status === 'received' ||
        request.status === 'Completed' ||
        request.status === 'completed' ||
        request.status === 'confirmed' ||
        request.worker_confirmation === true
      );
    } else if (isPickupRequest) {
      // For pickup requests, completed status is 'completed'
      return (
        request.status === 'completed' ||
        request.status === 'Completed' ||
        request.status === 'confirmed' ||
        request.worker_confirmation === true
      );
    } else {
      // For regular stock requests
      return (
        request.status === 'Completed' ||
        request.status === 'completed' ||
        request.status === 'confirmed' ||
        request.worker_confirmation === true
      );
    }
  };

  // Check if status update section should be shown (only for drivers)
  const shouldShowStatusUpdate = (request: WorkerRequest) => {
    const userIsDriver = isDriver(userInfo?.role); // Check if user role contains 'driver'
    const typeCheck = (type === 'stock' || type === 'pickup');
    const notCompleted = !isRequestCompleted(request);
    const statusCheck = (request.status === 'pending' || 
       request.status === 'approved' || 
       request.status === 'picked_up' || 
       request.status === 'in_transit' ||
       request.status === 'in_progress' || // Added for pickup requests
       request.status === 'delivered');
    
    return userIsDriver && typeCheck && notCompleted && statusCheck;
  };

  const Styles = styles({ THEME_COLOR });


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={Styles.overlay}>
        <View style={Styles.modalContainer}>
          <ScrollView
            style={Styles.scrollView}
            contentContainerStyle={Styles.scrollContent}
            showsVerticalScrollIndicator={true}
            bounces={false}
            overScrollMode="never"
            keyboardShouldPersistTaps="handled">
            {/* Request Information Section */}
            <View style={Styles.sectionContainer}>
              <Text style={Styles.sectionTitle}>
                {requestTypeLabel} Information
              </Text>

              <View style={Styles.detailsGrid}>
                <DetailRow
                  label={`${requestTypeLabel} ID`}
                  value={
                    isReplenishment
                      ? workerInfo.replenishment_id || 'N/A'
                      : workerInfo.request_id || 'N/A'
                  }
                  Styles={Styles}
                />
                <DetailRow
                  label="Current Status"
                  value={getStatusText(workerInfo.status)}
                  Styles={Styles}
                />
                <DetailRow
                  label={t('Label.RequestedBy')}
                  value={workerInfo.name}
                  Styles={Styles}
                />
                {isPickupRequest ? (
                  <>
                    <DetailRow
                      label="Project"
                      value={workerInfo.project || 'Not specified'}
                      Styles={Styles}
                    />
                    <DetailRow
                      label="Drop-off Location"
                      value={workerInfo.address || 'Not specified'}
                      Styles={Styles}
                    />
                    <DetailRow
                      label="Assigned Driver"
                      value={workerInfo.driver_name || 'No driver assigned'}
                      Styles={Styles}
                    />
                    {workerInfo.vehicle_number && (
                      <DetailRow
                        label="Vehicle"
                        value={`${workerInfo.vehicle_number} ${workerInfo.vehicle_color ? `(${workerInfo.vehicle_color})` : ''}`}
                        Styles={Styles}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <DetailRow
                      label={isReplenishment ? 'Destination' : t('Label.Project')}
                      value={workerInfo.project}
                      Styles={Styles}
                    />
                    <DetailRow
                      label={t('Label.Warehouse')}
                      value={workerInfo.address}
                      Styles={Styles}
                    />
                  </>
                )}
              </View>
            </View>


            {/* Items Management Section */}
            {isPickupRequest ? (
              <View style={Styles.sectionContainer}>
                <Text style={Styles.sectionTitle}>Pickup Schedule</Text>
                <DetailRow
                  label="Pickup Time"
                  value={workerInfo.pickup_date_time || 'Not scheduled'}
                  Styles={Styles}
                />
                <DetailRow
                  label="Drop-off Time"
                  value={workerInfo.delivery_date_time || 'Not scheduled'}
                  Styles={Styles}
                />
              </View>
            ) : (
              items.length > 0 && (
                <View style={Styles.sectionContainer}>
                  <Text style={Styles.sectionTitle}>
                    Items Management ({items.length} items)
                  </Text>
                  <ItemTable items={items} Styles={Styles} />
                </View>
              )
            )}

            {/* Status Update Section */}
            {shouldShowStatusUpdate(workerInfo) && (
              <View style={Styles.sectionContainer}>
                <Text style={Styles.sectionTitle}>Status Update</Text>
                <View style={Styles.statusUpdateContainer}>
                  {/* Status Notes Input - Only for stock requests */}
                  {type === 'stock' && (
                    <View style={Styles.notesInputContainer}>
                      <TextField
                        showLabel={true}
                        label="Status Notes (Optional)"
                        placeholder="Add any notes about this status update..."
                        value={statusNotes}
                        onChangeText={setStatusNotes}
                        multiline={true}
                        inputStyle={Styles.notesInput}
                      />
                    </View>
                  )}
                  <View style={Styles.statusButtonsContainer}>
                    {canConfirmPickup(workerInfo) && (
                      <PrimaryButton
                        text={isUpdating ? 'Updating...' : (isPickupRequest ? 'Start Pickup' : t('Button.Label.ConfirmPickup'))}
                        onPress={async () => {
                          setIsUpdating(true);
                          try {
                            await onStatusUpdate(
                              workerInfo.id,
                              isPickupRequest ? 'in_progress' : 'picked_up',
                            );
                          } finally {
                            setIsUpdating(false);
                          }
                        }}
                        containerStyle={Styles.statusButton}
                        textStyle={Styles.statusButtonText}
                        disabled={isUpdating}
                      />
                    )}
                    {canConfirmInTransit(workerInfo) && (
                      <PrimaryButton
                        text={isUpdating ? 'Updating...' : (isPickupRequest ? 'Complete Pickup' : t('Button.Label.in_transit'))}
                        onPress={async () => {
                          setIsUpdating(true);
                          try {
                            await onStatusUpdate(
                              workerInfo.id,
                              isPickupRequest ? 'completed' : 'in_transit',
                            );
                          } finally {
                            setIsUpdating(false);
                          }
                        }}
                        containerStyle={Styles.statusButton}
                        textStyle={Styles.statusButtonText}
                        disabled={isUpdating}
                      />
                    )}
                    {canConfirmDelivery(workerInfo) && (
                      <PrimaryButton
                        text={isUpdating ? 'Updating...' : t('Button.Label.ConfirmDelivery')}
                        onPress={async () => {
                          setIsUpdating(true);
                          try {
                            await onStatusUpdate(
                              workerInfo.id,
                              'delivered',
                              type === 'stock' ? statusNotes : undefined,
                            );
                            if (type === 'stock') setStatusNotes('');
                          } finally {
                            setIsUpdating(false);
                          }
                        }}
                        containerStyle={Styles.statusButton}
                        textStyle={Styles.statusButtonText}
                        disabled={isUpdating}
                      />
                    )}
                    {canConfirmReceipt(workerInfo) && (
                      <PrimaryButton
                        text={isUpdating ? 'Updating...' : t('Button.Label.Complete')}
                        onPress={async () => {
                          setIsUpdating(true);
                          try {
                            await onStatusUpdate(
                              workerInfo.id,
                              isReplenishment ? 'received' : 'completed',
                              type === 'stock' ? statusNotes : undefined,
                            );
                            if (type === 'stock') setStatusNotes('');
                          } finally {
                            setIsUpdating(false);
                          }
                        }}
                        containerStyle={Styles.statusButton}
                        textStyle={Styles.statusButtonText}
                        disabled={isUpdating}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}

            {/* Timeline Section */}
            <View style={Styles.sectionContainer}>
              <Text style={Styles.sectionTitle}>Timeline</Text>
              <View style={Styles.timelineContainer}>
                {timelineData.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    status={item.status}
                    user={item.user}
                    role={item.role}
                    timestamp={item.timestamp}
                    notes={item.notes}
                    color={item.color}
                    Styles={Styles}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons - Close button on the left */}
          <View style={Styles.buttonsWrapper}>
            <SecondaryButton
              text={t('Button.Label.Close')}
              onPress={onClose}
              containerStyle={Styles.closeButtonContainer}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WorkRequestModal;
