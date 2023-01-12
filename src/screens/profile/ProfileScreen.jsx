import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { askPermissionLocation, checkPermissionCamera, logout } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    user: { nombre, img },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkPermissionCamera());
  }, []);

  useEffect(() => {
    dispatch(askPermissionLocation());
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.userContainer, backgroundColor: colors.notification }}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ name: 'person', type: 'material' }}
          source={img ? { uri: img } : null}>
          <Avatar.Accessory size={24} onPress={() => console.log('Cambiar Avatar')} />
        </Avatar>
        <View style={styles.dataUser}>
          <Text style={{ color: colors.text, fontSize: 18 }}>{nombre}</Text>
          <View style={styles.button}>
            <Button title="Cerrar sesión" onPress={() => dispatch(logout())} />
          </View>
        </View>
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 30,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: '#BDBDBD',
    marginLeft: 20,
  },
  dataUser: {
    alignItems: 'center',
  },
});
