import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

import { useTheme } from '@providers';
import { commonStyles } from '@styles/theme';
import { BaseModalProps } from '@types';
import { styles } from './BaseModal.styles';

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  containerStyle,
  overlayStyle,
  closeOnOverlayPress = true,
}) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const handleOverlayPress = () => {
    if (closeOnOverlayPress && onClose) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={[Styles.overlay, overlayStyle]}>
          <TouchableWithoutFeedback>
            <View style={[Styles.modalContainer, containerStyle]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BaseModal;
