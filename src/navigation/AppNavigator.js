import { NavigationContainer, useTheme } from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import TabNavigator from './TabNavigator';
import { primaryTheme } from '../constants';

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#006400" />
      <NavigationContainer theme={primaryTheme}>
        {true ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
