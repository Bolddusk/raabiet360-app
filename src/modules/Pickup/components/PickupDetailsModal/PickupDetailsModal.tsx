import React from 'react';
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import { PickupDetailsModalProps } from '@types';
import { styles } from './PickupDetailsModal.styles';

const PickupDetailsModal = ({
  visible,
  data,
  onClose,
}: PickupDetailsModalProps) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={Styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={Styles.card}>
              <Text style={Styles.title}>{data.projectName}</Text>
              
              {/* Status Badge */}
              {data.status && (
                <View style={[Styles.statusBadge, Styles[`status${data.status.charAt(0).toUpperCase() + data.status.slice(1)}`]]}>
                  <Text style={Styles.statusText}>
                    {data.status === 'completed' ? 'Completed' : 
                     data.status === 'in_progress' ? 'In Progress' : 
                     data.status === 'pending' ? 'Pending' : 
                     data.status === 'rejected' ? 'Rejected' : data.status}
                  </Text>
                </View>
              )}
              
              <Text style={Styles.pickupTime}>
                {t('Pickup')}: {data.pickupTime}
              </Text>
              <View style={Styles.separator} />
              <DetailRow
                label={t('Label.DropOffTime') + ':'}
                value={data.dropOffTime}
              />
              <DetailRow
                label={t('Label.DriverName') + ':'}
                value={data.driverName}
              />
              <DetailRow
                label={t('Label.VehicleNo') + ':'}
                value={data.vehicleNo}
              />
              <DetailRow
                label={t('Label.VehicleColor') + ':'}
                value={data.vehicleColor}
              />
              
              {/* Created At */}
              <DetailRow
                label="Request Created:"
                value={data.createdAt}
              />
              
              {/* Completion Information */}
              {data.status === 'completed' && data.completedAt && (
                <>
                  <View style={Styles.separator} />
                  <DetailRow
                    label="Completed At:"
                    value={data.completedAt}
                  />
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  return (
    <View style={Styles.row}>
      <Text style={Styles.label}>{label}</Text>
      <Text style={Styles.value}>{value}</Text>
    </View>
  );
};

export default PickupDetailsModal;
