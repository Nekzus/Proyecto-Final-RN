import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getPublicationById, getPublications } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@rneui/themed';
import { ErrorAlert } from '../../components';
import { FlatList } from 'react-native';
import { LoadingScreen } from '../auth/LoadingScreen';
import { ROUTES } from '../../constants';
import { useTheme } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { publications } = useSelector((state) => state.publish);
  const { loading } = useSelector((state) => state.errors);
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(getPublications());
  }, []);

  const renderItem = ({ item }) => {
    const onHandlePress = () => {
      dispatch(getPublicationById(item._id));
      navigation.navigate(ROUTES.PUBLISH_DETAIL);
    };
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onHandlePress}>
        <Card containerStyle={{ backgroundColor: colors.card, padding: 10, margin: 10 }}>
          <Card.Image source={require('../../../assets/icon.png')} />
          <Card.Divider />
          <Card.Title style={{ color: colors.text }}>{item.nombre}</Card.Title>
          <Card.Divider />
          <Text style={{ color: colors.text }}>{item.categoria.nombre}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <ErrorAlert msg="Error" />
      {publications.length === 0 ? (
        <Text style={{ color: colors.text }}>No hay publicaciones</Text>
      ) : (
        <FlatList data={publications} renderItem={renderItem} keyExtractor={(item, key) => key} />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
