import AuthNavigator from './AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import TabNavigator from './TabNavigator';
import { useTheme } from '@react-navigation/native';

const AppNavigator = () => {
  const { colors } = useTheme();
  console.log({ colors });
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.card} />
      {true ? <TabNavigator /> : <AuthNavigator />}
    </SafeAreaProvider>
  );
};

export default AppNavigator;
