import {
  askPermissionCamera,
  askPermissionLocation,
  checkPermissionLocation,
  currentLocation,
  getCategories,
  loadAddress,
} from '../store';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import ProfileNavigator from './profile/ProfileNavigator';
import PublishNavigator from './publish/PublishNavigator';
import { ROUTES } from '../constants';
import SearchNavigator from './search/SearchNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors, fonts } = useTheme();
  const dispatch = useDispatch();
  const { coords } = useSelector((state) => state.locations);
  const { locationStatus } = useSelector((state) => state.permissions);

  useEffect(() => {
    const subs = AppState.addEventListener('change', (state) => {
      if (state !== 'active') return;
      dispatch(checkPermissionLocation());
    });
    return () => {
      subs.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(askPermissionLocation());
  }, []);

  useEffect(() => {
    dispatch(askPermissionCamera());
  }, []);

  useEffect(() => {
    dispatch(currentLocation());
  }, [locationStatus]);

  useEffect(() => {
    dispatch(loadAddress());
  }, [coords]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          height: 22,
          padding: 1,
          fontFamily: fonts.title,
          fontSize: 12,
        },
        headerTitleAlign: 'center',
        tabBarActiveBackgroundColor: colors.notification,
        tabBarActiveTintColor: colors.text,
      }}
      initialRouteName={ROUTES.SEARCH}>
      <BottomTab.Screen
        name={ROUTES.SEARCH}
        component={SearchNavigator}
        options={{
          title: `${ROUTES.SEARCH}`,
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'search' : 'search-outline'} size={22} color={colors.text} />
          ),
        }}
      />
      <BottomTab.Screen
        name={ROUTES.PUBLISH}
        component={PublishNavigator}
        options={{
          title: `${ROUTES.PUBLISH}`,
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={22}
              color={colors.text}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={ROUTES.PROFILE}
        component={ProfileNavigator}
        options={{
          title: `${ROUTES.PROFILE}`,
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={22} color={colors.text} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigator;
