import React from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { ICONS } from '@assets/svg';
import { DATA } from '@constant';
import { useTheme } from '@providers';
import { PrimaryButton, SecondaryButton } from '@shared/components/Buttons';
import { iconSize } from '@styles/theme';
import { StatusModalProps, Worker } from '@types';
import { styles } from './StatusModal.styles';

const IconSize = iconSize(0.03);

const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  workerInfo,
  type,
  onClose,
  onStatusUpdate,
}) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  if (!workerInfo) return null;

  const getStatusButtonStyle = (status: Worker['status']) => {
    const baseStyle = Styles.dropdownButton;
    if (status === 'Completed') return [baseStyle, Styles.dropdownCompleted];
    if (status === 'In-Progress') return [baseStyle, Styles.dropdownInProgress];
    return baseStyle;
  };

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={Styles.detailRow}>
      <Text style={Styles.detailLabel}>{label}</Text>
      <Text style={Styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={Styles.modalOverlay}>
        <View style={Styles.modalContent}>
          <View style={Styles.workerHeader}>
            <Image
              source={{ uri: workerInfo.avatar }}
              style={Styles.userAvatar}
            />
            <View>
              <Text style={Styles.userName}>{workerInfo.name}</Text>
              <Text style={Styles.userPhone}>{workerInfo.phone}</Text>
            </View>
          </View>
          <View style={Styles.borderLine} />
          {type === 'worker' ? (
            <>
              <DetailRow label="Pickup Time:" value={workerInfo.time} />
              <DetailRow label="Date:" value={workerInfo.date} />
              <DetailRow label="Destination:" value="Jinnah Avenue." />
              <DetailRow label="Project:" value={workerInfo.project} />
            </>
          ) : (
            <>
              <View style={Styles.timeDateRow}>
                <View style={Styles.timeDateItem}>
                  <DetailRow label="Time:" value={workerInfo.time} />
                </View>
                <View style={Styles.timeDateItem}>
                  <DetailRow label="Date:" value={workerInfo.date} />
                </View>
              </View>
              <DetailRow label="Item:" value={workerInfo?.item} />
              <DetailRow label="Quantity:" value={workerInfo?.quantity} />
              <DetailRow
                label="Delivery Location:"
                value={workerInfo?.address}
              />
              <DetailRow label="Project:" value={workerInfo?.project} />
              <DetailRow label="Decision By:" value={workerInfo?.decisionBy} />
              <DetailRow
                label="Decision Time:"
                value={workerInfo?.decisionTime}
              />
            </>
          )}

          <View style={Styles.detailRow}>
            <Text style={Styles.detailLabel}>Request Status:</Text>
            <View style={Styles.statusContainer}>
              <Dropdown
                style={getStatusButtonStyle(workerInfo?.status)}
                placeholderStyle={Styles.dropdownText}
                selectedTextStyle={Styles.dropdownText}
                containerStyle={Styles.statusDropdown}
                data={DATA.orderStatus}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={workerInfo?.status}
                value={workerInfo?.status}
                onChange={item => {
                  onStatusUpdate(workerInfo?.id, item?.value);
                }}
                renderRightIcon={() => (
                  <ICONS.CHEVRON_DOWN.default
                    color={THEME_COLOR.white}
                    width={IconSize}
                    height={IconSize}
                  />
                )}
              />
            </View>
          </View>

          <View style={Styles.buttonsWrapper}>
            <SecondaryButton
              text="Cancel"
              onPress={() => {
                onClose();
              }}
              containerStyle={Styles.buttonContainer}
            />
            <PrimaryButton
              text="Update"
              onPress={() => {}}
              containerStyle={Styles.buttonContainer}
              borderColor={THEME_COLOR.primary}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;
