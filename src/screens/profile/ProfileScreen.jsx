import * as ImagePicker from 'expo-image-picker';

import {
  Alert,
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { askPermissionCamera, askPermissionLocation, logout, updateProfile } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ROUTES } from '../../constants';
import { useFormValidator } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [tempUri, setTempUri] = useState();
  const [tempName, setTempName] = useState();

  const { email, password, name, onChange } = useFormValidator({
    name: '',
    email: '',
    password: '',
  });

  const {
    user: { nombre, img, uid },
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
            source={img ? { uri: img.length > 0 && !tempUri ? img : tempUri } : null}></Avatar>
        </View>
        <View style={styles.dataContainer}>
          <Text style={{ color: colors.text, fontSize: 18 }}>
            {nombre && !tempName ? nombre : tempName}
          </Text>
          <View style={styles.button}>
            <Button title="Cerrar sesión" onPress={() => dispatch(logout())} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
            <MaterialCommunityIcons name="account-edit" size={25} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}></View>
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
});
