import { ErrorAlert, Loading } from '../../components';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getPublicationById, getPublications } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@rneui/themed';
import { FlatList } from 'react-native';
import { ROUTES } from '../../constants';
import { RefreshControl } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { publications } = useSelector((state) => state.publish);
  const { loading } = useSelector((state) => state.errors);
  const { colors, fonts } = useTheme();

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = () => {
    dispatch(getPublications());
  };

  const renderItem = ({ item }) => {
    const onHandlePress = () => {
      dispatch(getPublicationById(item._id));
      navigation.navigate(ROUTES.PUBLISH_DETAIL, { title: item.categoria.nombre });
    };
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onHandlePress}>
        <Card containerStyle={{ ...styles.card, backgroundColor: colors.card }}>
          <Card.Image
            resizeMode="cover"
            containerStyle={{ borderRadius: 10, marginBottom: 10 }}
            source={item.img ? { uri: item.img } : require('../../../assets/icon.png')}
          />
          <Card.Divider />
          <Card.Title style={{ color: colors.text, fontFamily: fonts.title }}>
            {item.title}
          </Card.Title>
          <Card.Divider />
          <Text style={{ color: colors.text, fontFamily: fonts.title }}>
            {item.categoria.nombre}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) return <Loading />;

  return (
    <>
      <ErrorAlert msg="Error" />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
        data={publications}
        renderItem={renderItem}
        keyExtractor={(publication) => publication._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadPublications} />}
        ListEmptyComponent={
          <Text style={{ color: colors.text, fontFamily: fonts.title, fontSize: 18 }}>
            No hay publicaciones
          </Text>
        }
        numColumns={2}
      />
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    width: 160, // TODO: responsive
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
