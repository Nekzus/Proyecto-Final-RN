import { AlertsScreen, InfoAlertsScreen, MyLocationScreen } from '../../screens';

import { ROUTES } from '../../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AlertsNavigator = () => {
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ALERTS_LIST}
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
        name={ROUTES.ALERTS_LIST}
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ALERTS_INFO}
        component={InfoAlertsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.MY_LOCATION}
        component={MyLocationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AlertsNavigator;
