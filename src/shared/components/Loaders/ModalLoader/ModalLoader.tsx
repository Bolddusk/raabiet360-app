import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

import { useTheme } from '@providers';
import { LoaderProps } from '@types';
import { styles } from './ModalLoader.styles';

const ModalLoader = (props: LoaderProps) => {
  const {
    isVisible,
    title,
    showTitle,
    size,
    loaderColor,
    contentContainerStyle,
    onClose,
  } = props;

  const { THEME_COLOR } = useTheme();

  const Styles = styles({ THEME_COLOR });

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={Styles.loadingModalContainer}>
        <View style={[Styles.loadingContentContainer, contentContainerStyle]}>
          <View style={Styles.rowWrapper}>
            <ActivityIndicator
              size={size || 'small'}
              color={loaderColor ?? THEME_COLOR.black}
            />
            {showTitle && (
              <Text style={Styles.loadingText}>{title ?? 'Loading...'}</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoader;
