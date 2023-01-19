import * as ImagePicker from 'expo-image-picker';

import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { loadingState, updateProfile } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@rneui/themed';
import Input from '../../components/Input';
import { LoadingScreen } from '../auth/LoadingScreen';
import { uploadImage } from '../../helpers/uploadImage';
import { useFormValidator } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [tempUri, setTempUri] = useState();
  const [tempName, setTempName] = useState();

  const { name, onChange } = useFormValidator({
    name: '',
  });

  const {
    user: { nombre, img, uid },
    loading,
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
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      setTempUri(result.assets);
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
      setTempUri(result.assets);
    }
  };

  const onEditProfile = async () => {
    Keyboard.dismiss();
    if (!tempUri && !name) {
      Alert.alert('Perfil sin cambios', 'No hay cambios para actualizar');
      return;
    }

    if (tempUri && !name) {
      try {
        dispatch(loadingState(true));
        await uploadImage('usuarios', tempUri, uid);
        dispatch(loadingState(false));
      } catch (error) {
        Alert.alert('Error al subir imagen', error.message);
      }
      setTempName(tempName);
      dispatch(updateProfile({ name: tempName, uid }));
      navigation.goBack();
      return;
    }

    if (!tempUri && name) {
      setTempName(name);
      dispatch(updateProfile({ name, uid }));
      navigation.goBack();
      return;
    }

    if (tempUri && name) {
      try {
        dispatch(loadingState(true));
        await uploadImage('usuarios', tempUri, uid);
        dispatch(loadingState(false));
      } catch (error) {
        Alert.alert('Error al subir imagen', error.message);
      }
      setTempName(name);
      dispatch(updateProfile({ name, uid }));
      navigation.goBack();
      return;
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={{ ...styles.userContainer, backgroundColor: colors.notification }}>
          <View style={styles.imageContainer}>
            <Avatar
              size="xlarge"
              rounded
              containerStyle={styles.avatar}
              icon={{ name: 'person', type: 'material' }}
              source={tempUri !== undefined ? { uri: tempUri[0].uri } : img ? { uri: img } : null}>
              <Avatar.Accessory size={24} onPress={changeAvatar} />
            </Avatar>
          </View>
          <View style={styles.dataContainer}>
            <Input
              label="Nombre"
              iconName="account-outline"
              placeholder={nombre}
              placeholderTextColor={colors.text}
              onChangeText={(value) => onChange(value, 'name')}
              value={name}
              onSubmitEditing={onEditProfile}
              selectionColor={colors.background}
              autoCapitalize="words"
              autoCorrect={false}
            />
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
    </ScrollView>
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
    marginVertical: 10,
    alignItems: 'center',
  },
  dataContainer: {
    marginVertical: 10,
    marginHorizontal: 75,
    justifyContent: 'center',
    alignSelf: 'stretch',
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
