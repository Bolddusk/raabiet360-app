import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import { ACTIVE_OPACITY } from '@styles/theme';
import { TabBarProps } from '@types';
import { styles } from './TabBar.styles';

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  containerStyle,
  tabStyle,
  textStyle,
  onTabPress,
}) => {
  const { THEME_COLOR } = useTheme();
  const { t } = useTranslation();
  const Styles = styles({ THEME_COLOR });

  return (
    <View style={[Styles.container, containerStyle]}>
      <View style={Styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              Styles.tab,
              tabStyle,
              activeTab === tab.id && Styles.activeTab,
            ]}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={ACTIVE_OPACITY}>
            <Text
              style={[
                Styles.tabText,
                textStyle,
                activeTab === tab.id && Styles.activeTabText,
              ]}>
              {t(tab.label)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TabBar;
