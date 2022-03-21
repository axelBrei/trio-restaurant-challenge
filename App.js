import React from 'react';
import {QueryProvider} from 'components/context/QueryProvider';
import Documenu from 'documenu';
import {ThemeProvider} from 'components/context/ThemeProvider';
import Restaurants from 'components/features/Restaurants';
import {NavigationContainer} from '@react-navigation/native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// In a real app scenario this key will probably be on a .env
// file which is loaded with react-native-config
// https://github.com/luggit/react-native-config
Documenu.configure('a46b51875c1477d5f0b2c22d38120cd2');

const App: () => Node = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Restaurants />
          {__DEV__ && <FlipperAsyncStorage />}
        </NavigationContainer>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
