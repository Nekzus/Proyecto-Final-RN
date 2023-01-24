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
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Input from '../../components/Input';
import { Loading } from '../../components';
import { uploadImage } from '../../helpers/uploadImage';
import { useFormValidator } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const EditProfileScreen = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const dispatch = useDispatch();
  const [tempUri, setTempUri] = useState();
  const [tempName, setTempName] = useState();

  const { name, onChange, setFormValue } = useFormValidator({
    name: '',
  });
  const {
    user: { nombre, img, uid },
  } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.errors);

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

  useEffect(() => {
    setFormValue({ name: nombre });
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
    if (!tempUri && name === nombre) {
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

  if (loading) return <Loading />;

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
              placeholder="Nombre"
              placeholderTextColor="rgba(255,255,255,0.4)"
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
          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.profileBtn, backgroundColor: colors.primary }}
              onPress={() => navigation.goBack()}>
              <Icon name="keyboard-return" size={24} color={colors.text} />
              <Text
                style={{ ...styles.profileBtnText, color: colors.text, fontFamily: fonts.title }}>
                Volver
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.profileBtn, backgroundColor: colors.notification }}
              onPress={onEditProfile}>
              <Icon name="publish" size={24} color={colors.text} />
              <Text
                style={{ ...styles.profileBtnText, color: colors.text, fontFamily: fonts.title }}>
                Actualizar
              </Text>
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  profileBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    width: '45%',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  profileBtnText: {
    marginLeft: 10,
  },
});
