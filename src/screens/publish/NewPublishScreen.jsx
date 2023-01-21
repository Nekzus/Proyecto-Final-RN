import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'react-native';
import { ErrorAlert } from '../../components';
import { Image } from 'react-native';
import Input from '../../components/Input';
import { postPublication } from '../../store/slices/publish/thunks';
import { useFormValidator } from '../../hooks/useFormValidator';
import { useTheme } from '@react-navigation/native';

const NewPublishScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.publish);
  const { errorMessage } = useSelector((state) => state.errors);
  const [tempUri, setTempUri] = useState();
  const { id = '', title, type } = route.params;
  const { colors } = useTheme();

  const typeTemp = categories.find((category) => category.nombre === type.toUpperCase());

  const typeId = typeTemp ? typeTemp._id : '';

  const validateExcluded = {
    _id,
    image,
    typeAnimals,
    race,
    sex,
    appearance,
    identification,
    date,
    zone,
    description,
    phone,
  };

  const {
    _id,
    appearance,
    date,
    description,
    errors,
    identification,
    image,
    label,
    phone,
    race,
    reset,
    sex,
    typeAnimals,
    zone,
    onChange,
    onReset,
    onValidate,
    setFormValue,
  } = useFormValidator({
    _id: id,
    appearance: '',
    date: '',
    description: '',
    identification: '',
    image: '',
    label: '',
    phone: '',
    race: '',
    sex: '',
    typeAnimals: '',
    zone: '',
  });

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none' },
      headerShown: false,
    });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: { display: 'flex' },
        headerShown: true,
      });
    };
  }, []);

  // useEffect(() => {
  //   loadPublication();
  // }, []);

  // const loadPublication = async () => {
  //   if (id.length === 0) return;
  //   const product = await loadProductById(id);
  //   setFormValue({
  //     _id: id,
  //     type: product.categoria._id,
  //     image: product.img || '',
  //     nombre,
  //   });
  // };

  console.log({ categories });

  const [images, setImage] = useState([]);

  // const seleccionarFotos = async () => {
  //   const fotosPermitidas = await ImagePicker.requestCameraRollPermissionsAsync();
  //   if (fotosPermitidas.granted) {
  //     const fotosSeleccionadas = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsMultipleSelection: true,
  //       quality: 0.5,
  //     });
  //     if (!fotosSeleccionadas.cancelled) {
  //       setFotos([...fotos, ...fotosSeleccionadas.uri]);
  //     }
  //   } else {
  //     Alert.alert(
  //       'Permiso denegado',
  //       'Es necesario permitir el acceso a la librería de imágenes para seleccionar fotos.'
  //     );
  //   }
  // };

  const onPublish = () => {
    const isValid = onValidate(validateExcluded);

    if (!isValid) {
      Alert.alert('Completar campos', 'Completar los campos requeridos.');
      return;
    }

    dispatch(postPublication({ label, typeId, phone }));

    console.log({
      label,
      typeAnimals,
      race,
      type,
      sex,
      appearance,
      identification,
      date,
      zone,
      description,
      phone,
    });

    // Aquí iría la lógica para enviar la información al servidor.
    // Puedes utilizar una librería como axios para hacer las peticiones HTTP.

    Alert.alert('Publicación exitosa', 'Tu publicación ha sido cargada con éxito.', [
      {
        text: 'ok',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
    reset();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <ErrorAlert msg="Publicación fallida" />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{ color: colors.text, marginVertical: 5 }}>Añadir fotos:</Text>
          <View style={styles.fotosContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.foto} />
            ))}
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.agregarFotoBtn}>
                <Text style={styles.agregarFotoBtnText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.label}
            label="Título:"
            onChangeText={(value) => onChange(value, 'label')}
            onFocus={() => onReset('label')}
            placeholder="Ingresa un título para tu publicación"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={label}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.typeAnimals}
            label="Tipo de animal:"
            onChangeText={(value) => onChange(value, 'typeAnimals')}
            onFocus={() => onReset('typeAnimals')}
            placeholder="Ingresa el tipo de animal"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={typeAnimals}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.race}
            label="Raza:"
            onChangeText={(value) => onChange(value, 'race')}
            onFocus={() => onReset('race')}
            placeholder="Ingresa la raza del animal"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={race}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.sex}
            label="Sexo:"
            onChangeText={(value) => onChange(value, 'sex')}
            onFocus={() => onReset('sex')}
            placeholder="Ingresa el sexo del animal"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={sex}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.appearance}
            label="Apariencia:"
            onChangeText={(value) => onChange(value, 'appearance')}
            onFocus={() => onReset('appearance')}
            placeholder="Ingresa una descripción de la apariencia del animal"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={appearance}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.identification}
            label="Identificación:"
            onChangeText={(value) => onChange(value, 'identification')}
            onFocus={() => onReset('identification')}
            placeholder="Ingresa algún tipo de identificación del animal"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={identification}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.date}
            label="¿Cuando sucedio? :"
            onChangeText={(value) => onChange(value, 'date')}
            onFocus={() => onReset('date')}
            placeholder="Ingresa la fecha en la que el animal se perdió"
            onSubmitEditing={onPublish}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={date}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.zone}
            label="¿En qué zona se ha perdido? :"
            onChangeText={(value) => onChange(value, 'zone')}
            onFocus={() => onReset('zone')}
            placeholder="Ingresa la zona en la que el animal se perdió"
            onSubmitEditing={onPublish}
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
            onSubmitEditing={onPublish}
            placeholder="Ingresa una descripción detallada del animal y las circunstancias de su pérdida"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={description}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            error={errors.phone}
            keyboardType="numeric"
            label="Teléfono de contacto:"
            onChangeText={(value) => onChange(value, 'phone')}
            onFocus={() => onReset('phone')}
            onSubmitEditing={onPublish}
            placeholder="Ingresa tu teléfono para que te podamos contactar"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={phone}
          />
        </View>
        <TouchableOpacity style={styles.publicarBtn} onPress={onPublish}>
          <Text style={styles.publicarBtnText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewPublishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  fotosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foto: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  agregarFotoBtn: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agregarFotoBtnText: {
    fontSize: 30,
    color: '#ccc',
  },
  publicarBtn: {
    backgroundColor: '#0099ff',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  publicarBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
