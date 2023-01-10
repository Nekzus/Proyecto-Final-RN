import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { logout } from '../../store';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    user: { nombre },
  } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>{`Bienvenid@ ${nombre}`}</Text>
      <View style={styles.button}>
        <Button title="Cerrar sesión" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
});
