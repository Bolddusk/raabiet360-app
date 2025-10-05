import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@providers';
import { ACTIVE_OPACITY } from '@styles/theme';
import { SelectionToggleProps } from '@types';
import { styles } from './SelectionToggle.styles';

const SelectionToggle = ({
  label,
  options,
  selectedValue,
  onToggle,
}: SelectionToggleProps) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  return (
    <View style={Styles.container}>
      <Text style={Styles.label}>{label}</Text>
      <View style={Styles.toggleContainer}>
        {options.map(option => {
          const isActive = selectedValue === option?.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[Styles.toggleButton, isActive && Styles.activeToggle]}
              onPress={() => onToggle(option?.value)}
              disabled={isActive}
              activeOpacity={isActive ? 1 : ACTIVE_OPACITY}>
              <Text
                style={[
                  Styles.toggleText,
                  isActive && Styles.activeToggleText,
                ]}>
                {option?.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SelectionToggle;
