import { MapScreen, NewPublishScreen, PublishScreen } from '../../screens';

import { ROUTES } from '../../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const PublishNavigator = () => {
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PUBLISH_LIST}
      screenOptions={{
        presentation: 'card',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ROUTES.PUBLISH_LIST}
        component={PublishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.NEW_PUBLISH}
        component={NewPublishScreen}
        options={({ route }) => ({
          title: `${route.params.title}`,
          headerShown: true,
        })}
      />
      <Stack.Screen name={ROUTES.MAP} component={MapScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default PublishNavigator;
