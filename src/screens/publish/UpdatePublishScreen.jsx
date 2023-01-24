import * as ImagePicker from 'expo-image-picker';

import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CATEGORIES, IDENTIFICATION, SEX, TYPE_ANIMAL } from '../../constants';
import { ErrorAlert, Loading, PickerInput } from '../../components';
import React, { useEffect, useState } from 'react';
import { askPermissionCamera, loadingState } from '../../store';
import { deletePublication, putPublication } from '../../store/slices/publish/thunks';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'react-native';
import { Avatar } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Input from '../../components/Input';
import moment from 'moment';
import { uploadImage } from '../../helpers/uploadImage';
import { useFormValidator } from '../../hooks/useFormValidator';
import { useTheme } from '@react-navigation/native';

const UpdatePublishScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { categories, publication } = useSelector((state) => state.publish);
  const { loading } = useSelector((state) => state.errors);
  const [tempUri, setTempUri] = useState(null);
  const { id = '', type } = route.params;
  const { colors, fonts } = useTheme();
  const newDate = new Date();
  const [dateTime, setDateTime] = useState(newDate);
  const [showPicker, setShowPicker] = useState(false);

  const onShowPicker = () => {
    setShowPicker(true);
  };

  const onHandleChange = (event, selectedDate) => {
    setDateTime(selectedDate);
    setShowPicker(false);
  };

  const typeTemp = categories.find((category) => category.nombre === type.toUpperCase());

  const typeIde = typeTemp ? typeTemp._id : '';

  const validateExcluded = {
    _id,
    image,
    typeAnimal,
    race,
    sex,
    identification,
    date,
    zone,
    description,
    phone,
  };

  const {
    _id,
    date,
    description,
    errors,
    identification,
    image,
    title,
    phone,
    race,
    reset,
    sex,
    typeAnimal,
    typeId,
    zone,
    onChange,
    onReset,
    onValidate,
    setFormValue,
    form,
  } = useFormValidator({
    _id: id,
    date: '',
    description: '',
    identification: true,
    image: '',
    title: '',
    phone: '',
    race: '',
    sex: 'macho',
    typeAnimal: 'perro',
    zone: { lat: 0, lng: 0 },
    typeId: typeIde,
  });

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
    loadPublication();
  }, [id, publication, dateTime]);

  const loadPublication = async () => {
    if (id.length === 0 || publication === null) return;
    await setFormValue({
      _id: publication._id,
      description: publication.description,
      date: dateTime.toLocaleString(),
      identification: publication.identification,
      image: publication.img,
      title: publication.title,
      phone: publication.phone,
      race: publication.race,
      sex: publication.sex,
      typeAnimal: publication.typeanimal,
      zone: publication.location,
      typeId: publication.categoria._id,
    });
  };

  const onUpdate = async () => {
    const isValid = onValidate(validateExcluded);
    if (!isValid) {
      Alert.alert('Completar campos', 'Completar los campos requeridos.');
      return;
    }
    dispatch(putPublication(form));
    if (tempUri) {
      try {
        dispatch(loadingState(true));
        await uploadImage('productos', tempUri, publication._id);
        dispatch(loadingState(false));
      } catch (error) {
        Alert.alert('Error al subir imagen', error.message);
        console.log(error);
      }
    }

    Alert.alert(' Actualización exitosa', 'Tu publicación ha sido cargada con éxito.', [
      {
        text: 'ok',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
    reset();
  };

  const onDelete = () => {
    Alert.alert('Eliminar publicación', '¿Estás seguro de eliminar esta publicación?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: () => {
          dispatch(deletePublication(_id));
          navigation.goBack();
        },
      },
    ]);
    reset();
  };

  const selectImage = async () => {
    dispatch(askPermissionCamera());
    Alert.alert('Cargar imagen de mascota', 'Seleccionar origen', [
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

  if (loading) return <Loading />;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <ErrorAlert msg="Publicación fallida" />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{ color: colors.text, fontFamily: fonts.title, marginVertical: 5 }}>
            Actualizar foto:
          </Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={selectImage}>
              <Avatar
                size={100}
                containerStyle={styles.avatar}
                icon={{ name: 'add', type: 'material' }}
                source={
                  tempUri !== null
                    ? { uri: tempUri[0].uri }
                    : publication.img
                    ? { uri: publication.img }
                    : null
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.title}
            label="Título:"
            onChangeText={(value) => onChange(value, 'title')}
            onFocus={() => onReset('title')}
            placeholder="Ingresa un título para tu publicación"
            onSubmitEditing={onUpdate}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={title}
          />
        </View>
        <View style={styles.subContainer}>
          <PickerInput
            error={errors.typeId}
            label="Tipo publicación:"
            selectedValue={typeId}
            onFocus={() => onReset('typeId')}
            onValueChange={(value) => onChange(value, 'typeId')}
            array={CATEGORIES}
          />
        </View>
        <View style={styles.subContainer}>
          <PickerInput
            error={errors.typeAnimal}
            label="Tipo de animal:"
            selectedValue={typeAnimal}
            onFocus={() => onReset('typeAnimal')}
            onValueChange={(value) => onChange(value, 'typeAnimal')}
            array={TYPE_ANIMAL}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.race}
            label="Raza:"
            onChangeText={(value) => onChange(value, 'race')}
            onFocus={() => onReset('race')}
            placeholder="Ingresa la raza del animal"
            onSubmitEditing={onUpdate}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={race}
          />
        </View>
        <View style={styles.subContainer}>
          <PickerInput
            error={errors.sex}
            label="Sexo:"
            selectedValue={sex}
            onFocus={() => onReset('sex')}
            onValueChange={(value) => onChange(value, 'sex')}
            array={SEX}
          />
        </View>
        <View style={styles.subContainer}>
          <PickerInput
            error={errors.identification}
            label="Identificación:"
            selectedValue={identification}
            onFocus={() => onReset('identification')}
            onValueChange={(value) => onChange(value, 'identification')}
            array={IDENTIFICATION}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.date}
            label="¿Cuando sucedio? :"
            onChangeText={(value) => onChange(value, 'date')}
            onFocus={() => onReset('date')}
            placeholder="Ingresa la fecha en la que el animal se perdió"
            onSubmitEditing={onUpdate}
            editable={false}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={moment(dateTime).format('DD/MM/YYYY')}
          />
          <View style={styles.inputContainer}>
            {Platform.OS === 'android' ? (
              <>
                <Button title="Elegir fecha" onPress={onShowPicker} color={colors.primary} />
                {showPicker && (
                  <DateTimePicker
                    value={dateTime}
                    mode="date"
                    is24Hour={true}
                    onChange={onHandleChange}
                    style={{ width: '80%' }}
                  />
                )}
              </>
            ) : (
              <DateTimePicker
                value={dateTime}
                mode="date"
                is24Hour={true}
                onChange={(event, selectedDate) => setDate(selectedDate)}
                style={{ width: '80%' }}
              />
            )}
          </View>
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.zone}
            label="¿En qué zona se ha perdido? :"
            onChangeText={(value) => onChange(value, 'zone')}
            onFocus={() => onReset('zone')}
            placeholder="Ingresa la zona en la que el animal se perdió"
            onSubmitEditing={onUpdate}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={zone}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.description}
            label="Añade una descripción:"
            multiline={true}
            onChangeText={(value) => onChange(value, 'description')}
            onFocus={() => onReset('description')}
            onSubmitEditing={onUpdate}
            placeholder="Ingresa una descripción detallada del animal y las circunstancias de su pérdida"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={description}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.phone}
            keyboardType="phone-pad"
            label="Teléfono de contacto:"
            onChangeText={(value) => onChange(value, 'phone')}
            onFocus={() => onReset('phone')}
            onSubmitEditing={onUpdate}
            placeholder="Ingresa tu teléfono para que te podamos contactar"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={phone}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...styles.updateBtn, backgroundColor: colors.primary }}
            onPress={onDelete}>
            <Icon name="trash-can-outline" size={24} color={colors.text} />
            <Text style={{ ...styles.updateBtnText, fontFamily: fonts.title, color: colors.text }}>
              Borrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...styles.updateBtn, backgroundColor: colors.notification }}
            onPress={onUpdate}>
            <Icon name="update" size={24} color={colors.text} />
            <Text style={{ ...styles.updateBtnText, fontFamily: fonts.title, color: colors.text }}>
              Actualizar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdatePublishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  addImageBtn: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageBtnText: {
    fontSize: 30,
    color: '#ccc',
  },
  updateBtn: {
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
  updateBtnText: {
    marginLeft: 10,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
