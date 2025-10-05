import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ICONS } from '@assets/svg';
import { SCREEN, USER_ROLE } from '@constant';
import { useAuth, useTheme } from '@providers';
import { isDriver } from '@utils/roleUtils';
import {
  DriverPickup,
  DriverStock,
  Home,
  Profile,
  WorkerPickup,
  WorkerStock,
} from '@screens';
import { isIOS } from '@shared/utils/helpers';
import { commonStyles, iconSize, SIZES, TEXT_STYLE } from '@styles/theme';
import { TabBarIconProps, TabBarLabelProps } from '@types';

const Tab = createBottomTabNavigator();

const IconSize = iconSize(0.08);
const IconSizeMiddle = iconSize(0.14);

const TabBarLabel = ({ label, focused, themeColor }: TabBarLabelProps) => (
  <Text
    style={[
      focused
        ? styles({ themeColor }).activeTabLabel
        : styles({ themeColor }).inActiveTabLabel,
    ]}>
    {label}
  </Text>
);

const TabBarIcon = ({
  Icon,
  focused,
  isMiddle = false,
  themeColor,
}: TabBarIconProps) => (
  <View style={styles({ themeColor }).iconContainer}>
    <Icon
      width={isMiddle ? IconSizeMiddle : IconSize}
      height={isMiddle ? IconSizeMiddle : IconSize}
      color={focused ? themeColor.white : themeColor.white100}
    />
  </View>
);

const BottomTabs = () => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const { userInfo } = useAuth();

  const Styles = useMemo(
    () => styles({ themeColor: THEME_COLOR }),
    [THEME_COLOR],
  );

  const tabScreens =
    isDriver(userInfo?.role)
      ? [
          {
            name: SCREEN.HOME,
            component: Home,
            label: t('Home'),
            icon: ICONS.HOME.default,
          },
          {
            name: SCREEN.DRIVER_PICKUP,
            component: DriverPickup,
            label: t('Pickup'),
            icon: ICONS.PICK_UP.default,
          },
          {
            name: SCREEN.DRIVER_STOCK,
            component: DriverStock,
            label: t('Stock'),
            icon: ICONS.PICK_UP_ONE.default,
          },
          {
            name: SCREEN.PROFILE,
            component: Profile,
            label: t('Profile'),
            icon: ICONS.PROFILE.default,
          },
        ]
      : [
          {
            name: SCREEN.HOME,
            component: Home,
            label: t('Home'),
            icon: ICONS.HOME.default,
          },
          {
            name: SCREEN.WORKER_PICKUP,
            component: WorkerPickup,
            label: t('Pickup'),
            icon: ICONS.PICK_UP.default,
          },
          {
            name: SCREEN.WORKER_STOCK,
            component: WorkerStock,
            label: t('Stock'),
            icon: ICONS.PICK_UP_ONE.default,
          },
          {
            name: SCREEN.PROFILE,
            component: Profile,
            label: t('Profile'),
            icon: ICONS.PROFILE.default,
          },
        ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: Styles.tabBarStyle,
      }}>
      {tabScreens.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: ({ focused }) => (
              <TabBarLabel
                label={tab.label}
                focused={focused}
                themeColor={THEME_COLOR}
              />
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                Icon={tab.icon}
                focused={focused}
                themeColor={THEME_COLOR}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = ({ themeColor }: any) =>
  StyleSheet.create({
    tabBarStyle: {
      paddingTop: SIZES.hp_1,
      backgroundColor: themeColor.primary,
      height: isIOS() ? SIZES.hp_12 : SIZES.hp_10,
      borderTopWidth: 0,
      elevation: 0,
    },
    activeTabLabel: {
      ...TEXT_STYLE.paragraph,
      color: themeColor.white,
      marginTop: SIZES.hp_1,
    },
    inActiveTabLabel: {
      ...TEXT_STYLE.paragraph,
      color: themeColor.white100,
      marginTop: SIZES.hp_1,
    },
    iconContainer: {
      ...commonStyles.center,
      height: '100%',
    },
  });

export default BottomTabs;
