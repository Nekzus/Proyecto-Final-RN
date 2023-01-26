import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Image } from 'react-native';
import { Loading } from '../../components';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

const PublishDetailScreen = ({ navigation, route }) => {
  const { colors, fonts } = useTheme();
  const { publication } = useSelector((state) => state.publish);
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

  if (loading) return <Loading />;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image
          source={publication.img ? { uri: publication.img } : require('../../../assets/icon.png')}
          style={styles.image}
        />
        <View style={{ ...styles.infoContainer, backgroundColor: colors.notification }}>
          <View style={styles.titleContainer}>
            <Text style={{ ...styles.title, color: colors.text, fontFamily: fonts.title }}>
              {publication.title}
            </Text>
          </View>
          <Text style={{ ...styles.category, color: colors.text, fontFamily: fonts.title }}>
            {publication.categoria.nombre}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {publication.description}
          </Text>
          <Text style={{ ...styles.subtitle, color: colors.text, fontFamily: fonts.title }}>
            DETALLES
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Tipo: ${publication.typeanimal}`}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Raza: ${publication.race === null ? 'No especificada' : publication.race}`}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Sexo: ${publication.sex}`}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Collar: ${publication.identification}`}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Tel. Contacto: ${publication.phone}`}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Fecha: ${moment(publication.date).format('DD/MM/YYYY')}`}
          </Text>
          <Text style={{ ...styles.fields, color: colors.text, fontFamily: fonts.content }}>
            {`Zona: ${publication.addss}`}
          </Text>
          <View style={styles.publicateBy}>
            <Text style={{ ...styles.publicateName, color: colors.text, fontFamily: fonts.title }}>
              {`Publicado por: ${publication.user.nombre}`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PublishDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  infoContainer: {
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  titleContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  fields: {
    fontSize: 15,
    marginVertical: 8,
  },
  publicateBy: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});
