import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Card } from '@rneui/themed';
import { ROUTES } from '../../constants';
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
        onPress={() => handlePublish({ title: 'Mascota Perdida', type: 'lost' })}>
        <Card
          containerStyle={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            marginVertical: 20,
            height: 125,
          }}>
          <Card.Title style={{ ...styles.textButton, color: colors.text }}>
            Mascota Perdida
          </Card.Title>
          <Card.Divider />
          <Text style={{ ...styles.bodyText, color: colors.text }}>
            Si tu mascota se ha perdido o escapado.
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePublish({ title: 'Mascota Encontrada', type: 'found' })}>
        <Card
          containerStyle={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            marginVertical: 20,
            height: 125,
          }}>
          <Card.Title style={{ ...styles.textButton, color: colors.text }}>
            Mascota Encontrada
          </Card.Title>
          <Card.Divider />
          <Text style={{ ...styles.bodyText, color: colors.text }}>
            Si has visto o encontrado a una mascota perdida.
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePublish({ title: 'Mascota en Adopción', type: 'adoption' })}>
        <Card
          containerStyle={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            marginVertical: 20,
            height: 125,
          }}>
          <Card.Title style={{ ...styles.textButton, color: colors.text }}>
            Mascota en Adopción
          </Card.Title>
          <Card.Divider />
          <Text style={{ ...styles.bodyText, color: colors.text }}>
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
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 15,
  },
});

export default PublishScreen;
