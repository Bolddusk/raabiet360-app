import React from 'react';
import { Modal, Text, View } from 'react-native';

import { ICONS } from '@assets/svg';
import { useTheme } from '@providers';
import { PrimaryButton, SecondaryButton } from '@shared/components';
import { commonStyles, iconSize } from '@styles/theme';
import { ConfirmationModalProps } from '@types';
import { styles } from './ConfirmationModal.styles';

const IconSize = iconSize(0.1);
const IconSize1 = iconSize(0.13);

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  iconType,
  title,
  subtitle,
  primaryButtonLabel,
  secondaryButtonLabel,
  containerStyle,
  Icon,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const renderIcon = () => {
    const iconColor = THEME_COLOR.white;
    if (iconType === 'success') {
      return (
        <ICONS.TICK.default
          width={IconSize1}
          height={IconSize1}
          color={iconColor}
        />
      );
    } else if (iconType === 'error') {
      return (
        <ICONS.CROSS.default
          width={IconSize}
          height={IconSize}
          color={iconColor}
        />
      );
    } else if (iconType === 'custom' && Icon) {
      return <Icon width={IconSize} height={IconSize} color={iconColor} />;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={Styles.overlay}>
        <View style={[Styles.modalContainer, containerStyle]}>
          <View style={Styles.iconWrapper}>{renderIcon()}</View>

          <Text style={Styles.title}>{title}</Text>
          <Text style={Styles.subtitle}>{subtitle}</Text>

          <View style={Styles.buttonWrapper}>
            {onSecondaryAction && secondaryButtonLabel && (
              <View style={commonStyles.fullView}>
                <SecondaryButton
                  text={secondaryButtonLabel}
                  onPress={onSecondaryAction}
                  containerStyle={Styles.buttonContainer}
                  borderColor={THEME_COLOR.primary}
                />
              </View>
            )}
            <View
              style={[
                commonStyles.fullView,
                !secondaryButtonLabel && { flex: 0.7 },
              ]}>
              <PrimaryButton
                text={primaryButtonLabel}
                onPress={onPrimaryAction}
                containerStyle={Styles.buttonContainer}
                borderColor={THEME_COLOR.primary}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
