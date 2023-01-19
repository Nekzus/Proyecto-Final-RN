import AlertsNavigator from './alert/AlertsNavigator';
import { Ionicons as Icon } from '@expo/vector-icons';
import ProfileNavigator from './profile/ProfileNavigator';
import PublishNavigator from './publish/PublishNavigator';
import { ROUTES } from '../constants';
import SearchNavigator from './search/SearchNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors, fonts } = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarLabelStyle: {
          height: 22,
          padding: 1,
          //   fontFamily: fonts.content,
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
        name={ROUTES.ALERTS}
        component={AlertsNavigator}
        options={{
          title: `${ROUTES.ALERTS}`,
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'alert-circle' : 'alert-circle-outline'}
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
          headerShown: false,
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
