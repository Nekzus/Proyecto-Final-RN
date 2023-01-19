import { COLORS, ROUTES } from '../../constants';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { askPermissionCamera, askPermissionLocation, logout, updateProfile } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@rneui/themed';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const {
    user: { nombre, email, img },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(askPermissionLocation());
  }, []);

  useEffect(() => {
    dispatch(askPermissionCamera());
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.userContainer, backgroundColor: colors.notification }}>
        <View style={styles.imageContainer}>
          <Avatar
            size="large"
            rounded
            containerStyle={styles.avatar}
            icon={{ name: 'person', type: 'material' }}
            source={img ? { uri: img } : null}></Avatar>
        </View>
        <View style={styles.dataContainer}>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: 'bold' }}>{nombre}</Text>
          <Text style={{ color: colors.text, fontSize: 17 }}>{email}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
            <Icon name="account-edit" size={25} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(ROUTES.MY_LOCATION);
          }}
          style={styles.option}>
          <Icon name="map" size={24} color={colors.text} />
          <Text style={{ ...styles.optionText, color: colors.text }}>Mi ubicación</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(ROUTES.MY_PUBLISH);
          }}
          style={styles.option}>
          <Icon name="note-multiple" size={24} color={colors.text} />
          <Text style={{ ...styles.optionText, color: colors.text }}>Mis publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(ROUTES.SETTINGS);
          }}
          style={styles.option}>
          <Icon name="cog" size={24} color={colors.text} />
          <Text style={{ ...styles.optionText, color: colors.text }}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(logout())}
          style={styles.option}>
          <Icon name="exit-run" size={24} color={colors.text} />
          <Text style={{ ...styles.optionText, color: colors.text }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 30,
  },
  imageContainer: {
    flex: 2,

    alignItems: 'center',
  },
  dataContainer: {
    flex: 5,
    alignItems: 'flex-start',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  avatar: {
    backgroundColor: '#BDBDBD',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionsContainer: {
    alignItems: 'flex-start',
  },
  option: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  optionText: {
    marginLeft: 30,
    fontSize: 18,
  },
});
