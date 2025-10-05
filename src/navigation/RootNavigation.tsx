import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@providers';
import { Splash } from '@screens';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const RootNavigation = () => {
  const { isLoggedIn } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <Splash />;
  }

  let StackToRender = <AuthStack />;

  if (isLoggedIn) {
    StackToRender = <AppStack />;
  }

  return <NavigationContainer>{StackToRender}</NavigationContainer>;
};

export default RootNavigation;
