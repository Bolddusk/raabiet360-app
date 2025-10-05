import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation } from '@navigation';
import {
  AuthProvider,
  LocalizationProvider,
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
            <PickupProvider>
              <StockProvider>
                <RootNavigation />
                <FlashMessage position={'bottom'} />
              </StockProvider>
            </PickupProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;