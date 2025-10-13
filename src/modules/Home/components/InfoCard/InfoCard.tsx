import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@providers';
import { isIOS } from '@shared/utils/helpers';
import { ACTIVE_OPACITY, commonStyles, iconSize } from '@styles/theme';
import { InfoCardProps } from '@types';
import { styles } from './InfoCard.styles';

const IconSize = iconSize(0.08);

const InfoCard: React.FC<InfoCardProps> = ({
  variant,
  label,
  count,
  Icon,
  containerStyle,
  onPress = () => {},
}) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const renderContent = () => {
    if (variant === 'icon') {
      return (
        <View style={commonStyles.center}>
          {Icon && (
            <Icon
              width={IconSize}
              height={IconSize}
              color={THEME_COLOR.black100}
            />
          )}
          <Text style={Styles.primaryLabel}>{label}</Text>
        </View>
      );
    }
    if (variant === 'count') {
      return (
        <View>
          <Text style={Styles.count}>{count}</Text>
          <Text style={Styles.secondaryLabel}>{label}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isIOS() ? ACTIVE_OPACITY : 0.95}>
      <View
        style={[
          Styles.primaryCard,
          containerStyle,
          variant === 'count' && Styles.secondaryCard,
          variant != 'count' && Styles.leftOffset,
        ]}>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

export default InfoCard;
