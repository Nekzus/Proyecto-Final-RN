import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { init } from './db';
import { persistStore } from 'redux-persist';
import { primaryTheme } from './constants';
import { store } from './store';

const persistor = persistStore(store);

init()
  .then(() => console.log('DB initialized'))
  .catch((err) => {
    console.log('DB fail connect');
    console.log(err.message);
  });

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer theme={primaryTheme}>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
};

export default App;
