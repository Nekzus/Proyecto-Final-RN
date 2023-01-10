import { LoginScreen, RegisterScreen } from '../screens';

import { ROUTES } from '../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
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
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
