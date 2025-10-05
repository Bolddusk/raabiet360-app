import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ICONS } from '@assets/svg';
import { useTheme } from '@providers';
import { ACTIVE_OPACITY, iconSize } from '@styles/theme';
import { TextFieldProps } from '@types';
import { styles } from './TextField.styles';

const IconSize = iconSize(0.06);

const TextField = (props: TextFieldProps) => {
  const {
    showLabel,
    label,
    placeholder,
    multiline,
    showLeftIcon,
    showRightIcon,
    showLeftCustomIcon,
    showRightCustomIcon,
    leftIconColor,
    rightIconColor,
    leftIconSize,
    rightIconSize,
    loading = false,
    maxLength,

    value,
    keyboardType,
    secureTextEntry,
    secureEye,
    pointerEvents,
    editable,
    inputContainerStyle,
    inputStyle,
    textAlignVertical,
    btnDisabled,
    error,
    showError,
    LeftIcon,
    RightIcon,
    onChangeText,
    onPressInput,
    onRightIconClick,
  } = props;

  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });

  const selectionColor = THEME_COLOR.primary;

  return (
    <View>
      {showLabel && (
        <>
          <View style={Styles.errorLabelContainer}>
            <Text style={Styles.label}>{label}</Text>
          </View>
          <View style={Styles.labelSpacing} />
        </>
      )}
      <TouchableOpacity
        disabled={!Boolean(pointerEvents)}
        onPress={onPressInput}
        activeOpacity={ACTIVE_OPACITY}
        style={[
          Styles.fieldContainer,
          inputContainerStyle,
          !!error && Styles.errorFieldContainer,
        ]}>
        {showLeftIcon ? (
          <View style={Styles.leftIconContainer}>
            {showLeftCustomIcon && LeftIcon ? (
              <LeftIcon
                width={leftIconSize ?? IconSize}
                height={leftIconSize ?? IconSize}
                color={leftIconColor ?? THEME_COLOR.primary}
              />
            ) : null}
          </View>
        ) : null}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={THEME_COLOR.gray}
          maxLength={maxLength}
          style={[Styles.input, inputStyle]}
          textAlignVertical={textAlignVertical ?? 'auto'}
          multiline={multiline}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          pointerEvents={pointerEvents ?? 'auto'}
          editable={editable ?? true}
          selectionColor={selectionColor}
        />

        {showRightIcon ? (
          <TouchableOpacity
            onPress={onRightIconClick}
            disabled={btnDisabled || loading}
            style={Styles.rightIconContainer}
            activeOpacity={ACTIVE_OPACITY}>
            {showRightCustomIcon && RightIcon ? (
              <RightIcon
                width={rightIconSize ?? IconSize}
                height={rightIconSize ?? IconSize}
                color={rightIconColor ?? THEME_COLOR.gray}
              />
            ) : secureEye ? (
              <ICONS.EYE_OPEN.default
                width={rightIconSize ?? IconSize}
                height={rightIconSize ?? IconSize}
                color={rightIconColor ?? THEME_COLOR.gray}
              />
            ) : (
              <ICONS.EYE_HIDE.default
                width={rightIconSize ?? IconSize}
                height={rightIconSize ?? IconSize}
                color={rightIconColor ?? THEME_COLOR.gray}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>

      {!!error && showError && <Text style={Styles.errorInfo}>{error}</Text>}
    </View>
  );
};

export default TextField;
