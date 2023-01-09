import AuthNavigator from './AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import TabNavigator from './TabNavigator';
import { checkToken } from '../store';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';

const AppNavigator = () => {
  const { colors } = useTheme();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.card} />
      {false ? <TabNavigator /> : <AuthNavigator />}
    </SafeAreaProvider>
  );
};

export default AppNavigator;
