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
import { useDispatch, useSelector } from 'react-redux';

import { AuthStyles } from '../auth/AuthStyles';
import { Avatar } from '@rneui/themed';
import { COLORS } from '../../constants';
import { updateProfile } from '../../store';
import { uploadImage } from '../../helpers/uploadImage';
import { useFormValidator } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [tempUri, setTempUri] = useState();
  const [tempName, setTempName] = useState();

  const { name, onChange, isValid, onReset, errors, validate } = useFormValidator({
    name: '',
  });

  const {
    user: { nombre, img, uid },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
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

  const onEditProfile = () => {
    Keyboard.dismiss();
    validate();
    if (isValid) {
      setTempName(name);
      dispatch(updateProfile({ name, uid }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.userContainer, backgroundColor: colors.notification }}>
        <View style={styles.imageContainer}>
          <Avatar
            size="xlarge"
            rounded
            containerStyle={styles.avatar}
            icon={{ name: 'person', type: 'material' }}
            source={img ? { uri: img.length > 0 && !tempUri ? img : tempUri } : null}>
            <Avatar.Accessory size={24} onPress={changeAvatar} />
          </Avatar>
        </View>
        <View style={styles.dataContainer}>
          {/* <Text style={{ color: colors.text, fontSize: 18 }}>
            {nombre && !tempName ? nombre : tempName}
          </Text> */}
          <TextInput
            placeholder={nombre && !tempName ? nombre : tempName}
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onEditProfile}
            selectionColor="white"
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={() => onReset(null, 'name')}
          />
          <View>
            {errors.name && (
              <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{errors.name}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ ...styles.button, backgroundColor: colors.primary }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: colors.text, fontSize: 18 }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.button, backgroundColor: colors.primary }}>
          <TouchableOpacity onPress={onEditProfile}>
            <Text style={{ color: colors.text, fontSize: 18 }}>Actualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  dataContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  avatar: {
    backgroundColor: '#BDBDBD',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
