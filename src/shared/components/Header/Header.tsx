import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ICONS } from '@assets/svg';
import { DATA } from '@constant';
import { useLocalization, useTheme, useNotifications } from '@providers';
import { ACTIVE_OPACITY, iconSize } from '@styles/theme';
import { HeaderProps, LanguageCode } from '@types';
import { NotificationDrawer } from '@shared/components';
import { styles } from './Header.styles';

const IconSize = iconSize(0.05);

const Header = (props: HeaderProps) => {
  const {
    LeftIcon,
    showLeftContainer,
    showMiddleContainer,
    showRightContainer,
    leftIconSize,
    leftIconColor,
    headerContainerStyle,
    middleText,
    rightText,
    variant,
    userName,
    t,
    onPressLeft,
  } = props;

  const { goBack } = useNavigation<any>();
  const { THEME_COLOR } = useTheme();
  const { changeLanguage, currentLanguage } = useLocalization();
  const { unreadCount } = useNotifications();
  const Styles = styles({ THEME_COLOR });
  
  const [isNotificationDrawerVisible, setIsNotificationDrawerVisible] = useState(false);

  const langIndex = currentLanguage === 'fr_CA' ? 1 : 0;
  const pillAnim = useRef(new Animated.Value(langIndex)).current;

  useEffect(() => {
    Animated.timing(pillAnim, {
      toValue: langIndex,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [currentLanguage]);

  const handleLanguageSelect = async (code: LanguageCode) => {
    if (currentLanguage !== code) {
      await changeLanguage(code);
    }
  };

  const handleNotificationPress = () => {
    setIsNotificationDrawerVisible(true);
  };

  const handleCloseNotificationDrawer = () => {
    setIsNotificationDrawerVisible(false);
  };


  return (
    <View style={[Styles.headerContainer, headerContainerStyle]}>
      {variant === 'simple' ? (
        <>
          {showLeftContainer && (
            <View style={Styles.startContainer}>
              <TouchableOpacity
                onPress={onPressLeft ?? goBack}
                activeOpacity={ACTIVE_OPACITY}>
                {LeftIcon ? (
                  <LeftIcon
                    width={leftIconSize ?? IconSize}
                    height={leftIconSize ?? IconSize}
                    color={leftIconColor ?? THEME_COLOR.white}
                  />
                ) : (
                  <View style={Styles.backIconContainer}>
                    <ICONS.CHEVRONLEFT.default
                      width={IconSize}
                      height={IconSize}
                      color={leftIconColor ?? THEME_COLOR.primary}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
          <View style={Styles.middleContainer}>
            {showMiddleContainer && middleText && (
              <Text style={Styles.middleText} numberOfLines={1}>
                {middleText}
              </Text>
            )}
          </View>
          {/*           {showRightContainer && rightText && ( */}
          {showRightContainer && (
            <View style={Styles.endContainer}>
              <Text style={Styles.rightText} numberOfLines={1}>
                {rightText}
              </Text>
            </View>
          )}
        </>
      ) : variant === 'home' ? (
        <>
          <View style={Styles.greetingContainer}>
            <View style={Styles.greetingTextContainer}>
              <Text style={Styles.userNameText} numberOfLines={1}>
                Hi, {userName ?? 'John'}
              </Text>
              <Text style={Styles.greetingText} numberOfLines={1}>
                {t('Label.WelcomeBack')}
              </Text>
            </View>
            <TouchableOpacity
              style={Styles.notificationButton}
              onPress={handleNotificationPress}
              activeOpacity={ACTIVE_OPACITY}>
              <ICONS.BELL.default
                width={IconSize}
                height={IconSize}
                color={THEME_COLOR.white}
              />
              {unreadCount > 0 && (
                <View style={Styles.notificationBadge}>
                  <Text style={Styles.notificationBadgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={Styles.actionsContainer}>
            <View style={Styles.toggleWrapper}>
              <Animated.View
                style={[
                  Styles.pill,
                  {
                    left: pillAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '50%'],
                    }),
                  },
                ]}
              />
              {DATA.languageOptions.map(({ label, code }, idx) => (
                <TouchableOpacity
                  key={code}
                  style={Styles.segment}
                  activeOpacity={currentLanguage === code ? 1 : ACTIVE_OPACITY}
                  disabled={currentLanguage === code}
                  onPress={() => handleLanguageSelect(code)}>
                  <Text
                    style={[
                      Styles.label,
                      currentLanguage === code && Styles.labelActive,
                    ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      ) : null}
      
      <NotificationDrawer
        isVisible={isNotificationDrawerVisible}
        onClose={handleCloseNotificationDrawer}
      />
    </View>
  );
};

export default Header;
