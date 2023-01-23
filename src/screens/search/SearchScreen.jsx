import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getPublicationById, getPublications } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@rneui/themed';
import { ErrorAlert } from '../../components';
import { FlatList } from 'react-native';
import { LoadingScreen } from '../auth/LoadingScreen';
import { ROUTES } from '../../constants';
import { RefreshControl } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { publications } = useSelector((state) => state.publish);
  const { loading } = useSelector((state) => state.errors);
  const { colors } = useTheme();

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = () => {
    dispatch(getPublications());
  };

  const renderItem = ({ item }) => {
    const onHandlePress = () => {
      dispatch(getPublicationById(item._id));
      navigation.navigate(ROUTES.PUBLISH_DETAIL);
    };
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onHandlePress}>
        <Card containerStyle={{ ...styles.card, backgroundColor: colors.card }}>
          <Card.Image
            resizeMode="cover"
            source={item.img ? { uri: item.img } : require('../../../assets/icon.png')}
          />
          <Card.Divider />
          <Card.Title style={{ color: colors.text }}>{item.title}</Card.Title>
          <Card.Divider />
          <Text style={{ color: colors.text }}>{item.categoria.nombre}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <ErrorAlert msg="Error" />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        data={publications}
        renderItem={renderItem}
        keyExtractor={(publication) => publication._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadPublications} />}
        ListEmptyComponent={<Text style={{ color: colors.text }}>No hay publicaciones</Text>}
        numColumns={2}
      />
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    width: 150, // TODO: responsive
    height: 260, // TODO: responsive
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
});
