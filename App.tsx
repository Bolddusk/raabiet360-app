import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation } from '@navigation';
import {
  AuthProvider,
  LocalizationProvider,
  NotificationProvider,
  PickupProvider,
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
              <PickupProvider>
                <StockProvider>
                  <RootNavigation />
                  <FlashMessage position={'bottom'} />
                </StockProvider>
              </PickupProvider>
            </NotificationProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;