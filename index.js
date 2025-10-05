/**
 * @format
 */

import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Disable font scaling for all text components
if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

// Disable font scaling for TextInput
if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    if (remoteMessage) {
      // console.log('setBackgroundMessageHandler', remoteMessage);
    }
  });
  
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    try {
      if (!detail?.notification?.data) {
        return;
      }
  
      switch (type) {
        case EventType.PRESS:
          break;
  
        case EventType.DISMISSED:

          break;
  
        default:
          break;
      }
    } catch (error) {
    }
  });

AppRegistry.registerComponent(appName, () => App);
