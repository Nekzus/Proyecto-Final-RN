import { useDispatch, useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import { LoadingScreen } from '../screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import TabNavigator from './TabNavigator';
import { checkToken } from '../store';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';

const AppNavigator = () => {
  const { colors } = useTheme();
  const {status} = useSelector( state => state.auth );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken());
  }, [status]);
  if (status === 'checking') return <LoadingScreen />;
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.card} />
      {(status !== 'authenticated') 
      ? 
      (<AuthNavigator />)
      :( <TabNavigator />) }
    </SafeAreaProvider>
  );
};

export default AppNavigator;
