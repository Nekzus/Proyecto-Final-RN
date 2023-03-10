import { CATEGORY, ROUTES } from '../../constants';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@rneui/themed';
import { useTheme } from '@react-navigation/native';

const PublishScreen = ({ navigation }) => {
  const { colors, fonts } = useTheme();

  const handlePublish = (option = {}) => {
    navigation.navigate(ROUTES.NEW_PUBLISH, option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePublish({ title: 'Mascota Perdida', type: CATEGORY.LOST })}>
        <Card containerStyle={{ ...styles.card, backgroundColor: colors.primary }}>
          <Card.Title style={{ ...styles.textButton, color: colors.text, fontFamily: fonts.title }}>
            Mascota Perdida
          </Card.Title>
          <Card.Divider />
          <Text style={{ ...styles.bodyText, color: colors.text, fontFamily: fonts.content }}>
            Si tu mascota se ha perdido o escapado.
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePublish({ title: 'Mascota Encontrada', type: CATEGORY.FOUND })}>
        <Card containerStyle={{ ...styles.card, backgroundColor: colors.primary }}>
          <Card.Title style={{ ...styles.textButton, color: colors.text, fontFamily: fonts.title }}>
            Mascota Encontrada
          </Card.Title>
          <Card.Divider />
          <Text style={{ ...styles.bodyText, color: colors.text, fontFamily: fonts.content }}>
            Si has visto o encontrado a una mascota perdida.
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePublish({ title: 'Mascota en Adopción', type: CATEGORY.ADOPTION })}>
        <Card containerStyle={{ ...styles.card, backgroundColor: colors.primary }}>
          <Card.Title style={{ ...styles.textButton, color: colors.text, fontFamily: fonts.title }}>
            Mascota en Adopción
          </Card.Title>
          <Card.Divider />
          <Text style={{ ...styles.bodyText, color: colors.text, fontFamily: fonts.content }}>
            Si quieres dar en adopción a tu mascota.
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
  },
  bodyText: {
    fontSize: 16,
  },
  card: {
    borderRadius: 15,
    marginVertical: 20,
    height: 125,
    width: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default PublishScreen;
