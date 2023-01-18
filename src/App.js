import { persistor, store } from './store';

import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { init } from './db';
import { primaryTheme } from './constants';

init()
  .then(() => console.log('DB initialized'))
  .catch((err) => {
    console.log('DB fail connect');
    console.log(err.message);
  });

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={primaryTheme}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
