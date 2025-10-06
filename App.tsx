import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation } from '@navigation';
import {
  AuthProvider,
  LocalizationProvider,
  NotificationProvider,
  PickupProvider,
  PushNotificationProvider,
  StockProvider,
  ThemeProvider,
} from '@providers';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <AuthProvider>
            <NotificationProvider>
              <PushNotificationProvider>
                <PickupProvider>
                  <StockProvider>
                    <RootNavigation />
                    <FlashMessage 
                      position={'bottom'} 
                      duration={3000}
                      style={{ zIndex: 9999, elevation: 9999 }}
                    />
                  </StockProvider>
                </PickupProvider>
              </PushNotificationProvider>
            </NotificationProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
