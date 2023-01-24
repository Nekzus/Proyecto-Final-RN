import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import { Loading } from '../components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import TabNavigator from './TabNavigator';
import { checkToken } from '../store';
import { useTheme } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const fetchFonts = async () => {
  await Font.loadAsync({
    'Lato-Light': require('../../assets/fonts/Lato-Light.ttf'),
    'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
  });
};

const AppNavigator = () => {
  const { colors } = useTheme();
  const { status } = useSelector((state) => state.auth);
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const prepare = async () => {
      try {
        await fetchFonts();
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (status === 'checking') return <Loading />;
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar backgroundColor={colors.card} />
      {status !== 'authenticated' ? <AuthNavigator /> : <TabNavigator />}
    </SafeAreaProvider>
  );
};

export default AppNavigator;
