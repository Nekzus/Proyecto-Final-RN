import * as ImagePicker from 'expo-image-picker';

import { Alert, Button, Image, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { askPermissionCamera, askPermissionLocation, logout, updateProfile } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { AuthStyles } from '../auth/AuthStyles';
import { Avatar } from '@rneui/themed';
import { uploadImage } from '../../helpers/uploadImage';
import { useForm } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [tempUri, setTempUri] = useState();
  const [tempName, setTempName] = useState();

  const { email, password, name, onChange } = useForm({
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

  const changeAvatar = async () => {
    Alert.alert('Cambiar foto de perfil', 'Seleccionar origen', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Galería',
        onPress: () => pickImage(),
      },
      {
        text: 'Cámara',
        onPress: () => takePhoto(),
      },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTempUri(result.assets[0].uri);
      await uploadImage('usuarios', result.assets, uid);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTempUri(result.assets[0].uri);
      await uploadImage('usuarios', result.assets, uid);
    }
  };

  const onRegister = () => {
    Keyboard.dismiss();
    setTempName(name);
    dispatch(updateProfile({ name, uid }));
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.userContainer, backgroundColor: colors.notification }}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.avatar}
          icon={{ name: 'person', type: 'material' }}
          source={img ? { uri: img.length > 0 && !tempUri ? img : tempUri } : null}>
          <Avatar.Accessory size={24} onPress={changeAvatar} />
        </Avatar>
        <View style={styles.dataUser}>
          <Text style={{ color: colors.text, fontSize: 18 }}>
            {nombre && !tempName ? nombre : tempName}
          </Text>
          <View style={styles.button}>
            <Button title="Cerrar sesión" onPress={() => dispatch(logout())} />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={AuthStyles.label}>Nombre:</Text>
        <TextInput
          placeholder="Ingrese su nombre"
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
          onChangeText={(value) => onChange(value, 'name')}
          value={name}
          onSubmitEditing={onRegister}
          selectionColor="white"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <Button title="Guardar cambios" onPress={onRegister} />
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
