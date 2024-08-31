import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import AppNetworkProvider from './network/NetworkProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AppNavigator } from './navigation/AppNavigator';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {typeof window !== 'undefined' ? (
        <PersistGate loading={null} persistor={persistor}>
          <AppNetworkProvider>
            <AppNavigator />
          </AppNetworkProvider>
        </PersistGate>
      ) : (
        <AppNetworkProvider>
          <AppNavigator />
        </AppNetworkProvider>
      )}
    </Provider>
  );
}