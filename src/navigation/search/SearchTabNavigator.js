import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchMapScreen, SearchScreen } from '../../screens';

import { ROUTES } from '../../constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  const { colors, fonts } = useTheme();
  return (
    <TopTab.Navigator
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
      initialRouteName={ROUTES.SEARCH_LIST}>
      <TopTab.Screen
        name={ROUTES.SEARCH_LIST}
        component={SearchScreen}
        options={{
          title: `${ROUTES.SEARCH_LIST}`,
        }}
      />
      <TopTab.Screen
        name={ROUTES.SEARCH_MAP}
        component={SearchMapScreen}
        options={{
          title: `${ROUTES.SEARCH_MAP}`,
        }}
      />
    </TopTab.Navigator>
  );
};

export default SearchTabNavigator;
