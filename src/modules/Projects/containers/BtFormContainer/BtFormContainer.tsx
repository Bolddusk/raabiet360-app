import React from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@providers';
import {
  FullScreenWrapper,
  Header,
  SafeAreaViewWrapper,
  ScreenWrapper,
} from '@shared/components';
import { styles } from './BtFormContainer.styles';

const BtFormContainer = () => {
  const { THEME_COLOR } = useTheme();
  const Styles = styles({ THEME_COLOR });
  const { t } = useTranslation();

  return (
    <SafeAreaViewWrapper>
      <FullScreenWrapper bgColor={THEME_COLOR.primary}>
        <Header
          variant="simple"
          showMiddleContainer
          middleText={t('Label.BTForm')}
          showLeftContainer
          showRightContainer
        />
        <ScreenWrapper style={Styles.screenWrapper}></ScreenWrapper>
      </FullScreenWrapper>
    </SafeAreaViewWrapper>
  );
};

export default BtFormContainer;
