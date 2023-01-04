import { DetailScreen, FilterScreen, SearchScreen } from '../../screens';

import { ROUTES } from '../../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const SearchNavigator = () => {
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SEARCH_LIST}
      screenOptions={{
        presentation: 'card',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: colors.card,
        },
        // headerTitleStyle: {
        //   fontFamily: fonts.title,
        // },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ROUTES.SEARCH_LIST}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.DETAIL}
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FILTER}
        component={FilterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
