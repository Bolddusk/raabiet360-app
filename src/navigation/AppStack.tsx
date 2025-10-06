import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATORS, SCREEN } from '@constant';
import { useAuth } from '@providers';
import {
  BTForm,
  CheckIn,
  EditProfile,
  Locator,
  ManagerStock,
  Projects,
  QForm,
  ReportCheckIn,
} from '@screens';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;
const screenOptionStyle = { headerShown: false };

const AppStack = () => {
  const { userInfo } = useAuth();

  // const initialScreen =
  //   userInfo?.role === USER_ROLE.WORKER
  //     ? SCREEN.CHECKIN
  //     : NAVIGATORS.BOTTOM_TAB;
  const initialScreen = NAVIGATORS.BOTTOM_TAB;

  return (
    <Navigator
      screenOptions={screenOptionStyle}
      initialRouteName={initialScreen}>
      <Screen name={NAVIGATORS.BOTTOM_TAB} component={BottomTabs} />
      <Screen name={SCREEN.CHECKIN} component={CheckIn} />
      <Screen name={SCREEN.REPORT_CHECKIN} component={ReportCheckIn} />
      <Screen name={SCREEN.EDIT_PROFILE} component={EditProfile} />
      <Screen name={SCREEN.MANAGER_STOCK} component={ManagerStock} />
      <Screen name={SCREEN.PROJECTS} component={Projects} />
      <Screen name={SCREEN.BT_FORM} component={BTForm} />
      <Screen name={SCREEN.Q_FORM} component={QForm} />
      <Screen name={SCREEN.LOCATAR} component={Locator} />
    </Navigator>
  );
};

export default AppStack;
