import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAuth, useTheme } from '@providers';
import {
  FullScreenWrapper,
  Header,
  SafeAreaViewWrapper,
  ScreenWrapper,
} from '@shared/components';
import { InfoCard } from '../../components/components';
import { useHome } from '../../hooks/useHome';
import { styles } from './HomeContainer.styles';

const HomeContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { quickAccessData, quickDashboardData, handleItemPress } = useHome();
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  const renderItem = ({ item }: any) => {
    const hasCount = !!item.count;
    const variant = hasCount ? 'count' : 'icon';
    const labelKey = 'Label.' + item?.label?.replace(/[\s-]/g, '');

    return (
      <View style={Styles.quickAccessItem}>
        <InfoCard
          variant={variant}
          label={t(labelKey) || item.label}
          count={hasCount ? item.count : undefined}
          Icon={!hasCount ? item.Icon : undefined}
          onPress={() => handleItemPress(item)}
        />
      </View>
    );
  };

  const renderListHeader = useCallback(
    () => (
      <>
        <Text style={Styles.sectionTitle}>{t('Label.QuickAccess')}</Text>
        <FlatList
          data={quickAccessData}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={Styles.columnWrapper}
          ItemSeparatorComponent={() => <View style={Styles.separator} />}
        />
        <View style={Styles.spacer} />
        <Text style={Styles.sectionTitle}>{t('Label.Dashboard')}</Text>
      </>
    ),
    [t, quickAccessData],
  );

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header variant="home" t={t} userName={userInfo?.first_name} />
        <ScreenWrapper>
          <FlatList
            data={quickDashboardData}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={Styles.columnWrapper}
            contentContainerStyle={Styles.listContainer}
            ListHeaderComponent={renderListHeader}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={Styles.separator} />}
          />
        </ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default HomeContainer;
