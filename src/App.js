import { persistor, store } from './store';

import AppNavigator from './navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { init } from './db';

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
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
