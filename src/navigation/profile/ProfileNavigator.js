import {
  EditProfileScreen,
  MyLocationScreen,
  MyPublishScreen,
  ProfileScreen,
  SettingsScreen,
  UpdatePublishScreen,
} from '../../screens';

import { ROUTES } from '../../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  const { colors, fonts } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE_LIST}
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
        name={ROUTES.PROFILE_LIST}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={ROUTES.MY_LOCATION}
        component={MyLocationScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={ROUTES.MY_PUBLISH}
        component={MyPublishScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={ROUTES.UPDATE_PUBLISH}
        component={UpdatePublishScreen}
        options={({ route }) => ({
          title: `${route.params.title}`,
          headerShown: true,
        })}
      />
      <Stack.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
