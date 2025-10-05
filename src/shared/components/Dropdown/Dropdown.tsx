import React from 'react';
import { Text, View } from 'react-native';
import {
  MultiSelect,
  Dropdown as RNDropdown,
} from 'react-native-element-dropdown';

import { ICONS } from '@assets/svg';
import { useTheme } from '@providers';
import { iconSize } from '@styles/theme';
import { DropdownProps } from '@types';
import { styles } from './Dropdown.styles';

const IconSize = iconSize(0.04);

const Dropdown: React.FC<DropdownProps> = ({
  showLabel = false,
  label,
  placeholder,
  data,
  value,
  iconColor,
  dContainerStyle,
  dTextStyle,
  multiSelect = false,
  RightIcon,
  onChange,
  getStatusButtonStyle,
}) => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const multiValue = Array.isArray(value) ? value : [];
  const singleValue = typeof value === 'string' ? value : '';

  const commonProps = {
    style: [Styles.dropdownContainer, dContainerStyle],
    placeholderStyle: Styles.dropdownPlaceholder,
    selectedTextStyle: [Styles.dropdownText, dTextStyle],
    containerStyle: Styles.dropdownButton,
    data,
    maxHeight: Math.min(400, Math.max(200, data.length * 50)), // Dynamic height based on items
    labelField: 'label',
    valueField: 'value',
    placeholder: placeholder ?? 'Select Status',
    itemTextStyle: Styles.itemTextStyle,
    showsVerticalScrollIndicator: true,
    renderRightIcon: () =>
      RightIcon ? (
        <RightIcon
          color={iconColor ?? THEME_COLOR.black}
          width={IconSize}
          height={IconSize}
        />
      ) : (
        <ICONS.CHEVRON_DOWN.default
          color={iconColor ?? THEME_COLOR.black}
          width={IconSize}
          height={IconSize}
        />
      ),
  };

  return (
    <View style={Styles.container}>
      {showLabel && (
        <>
          <Text style={Styles.label}>{label}</Text>
          <View style={Styles.labelSpacing} />
        </>
      )}
      {multiSelect ? (
        <MultiSelect
          {...commonProps}
          value={multiValue}
          onChange={onChange}
          renderSelectedItem={() => <></>}
          renderItem={(item, selected) => (
            <View
              style={{
                ...Styles.multiSelectDropdownContainer,
                backgroundColor: selected
                  ? THEME_COLOR.gray100
                  : THEME_COLOR.white,
              }}>
              <Text style={Styles.itemTextStyle}>{item.label}</Text>
            </View>
          )}
        />
      ) : (
        <RNDropdown {...commonProps} value={singleValue} onChange={onChange} />
      )}
    </View>
  );
};

export default Dropdown;
