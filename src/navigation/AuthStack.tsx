import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREEN } from '../constant/routes';
import { ForgotPassword, Login } from '../screens/screens';

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;
const screenOptionStyle = { headerShown: false };

const AuthStack = () => {

  const initialScreen = SCREEN.LOGIN;

  return (
    <Navigator
      screenOptions={screenOptionStyle}
      initialRouteName={initialScreen}>
      <Screen name={SCREEN.LOGIN} component={Login} />
      <Screen name={SCREEN.FORGOT_PASSWORD} component={ForgotPassword} />
    </Navigator>
  );
};

export default AuthStack;
