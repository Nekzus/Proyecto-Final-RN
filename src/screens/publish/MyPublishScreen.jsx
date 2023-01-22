import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { getMyPublications, getPublicationById } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useNavigationState, useTheme } from '@react-navigation/native';

import { Card } from '@rneui/base';
import { ErrorAlert } from '../../components';
import { LoadingScreen } from '../auth/LoadingScreen';
import { ROUTES } from '../../constants';
import { RefreshControl } from 'react-native';

const MyPublishScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myPublications } = useSelector((state) => state.publish);
  const { loading } = useSelector((state) => state.errors);
  const routes = useNavigationState((state) => state.routes.length);

  useEffect(() => {
    console.log({ navigation });
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
  }, [routes]);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = () => {
    dispatch(getMyPublications(user.uid));
  };

  const renderItem = ({ item }) => {
    const onHandlePress = () => {
      dispatch(getPublicationById(item._id));
      navigation.navigate(ROUTES.UPDATE_PUBLISH, {
        id: item._id,
        type: item.categoria.nombre,
        title: 'Editar publicación',
      });
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onHandlePress}>
        <Card
          containerStyle={{
            backgroundColor: colors.card,
            padding: 10,
            margin: 10,
            width: 150, // TODO: responsive
            height: 260, // TODO: responsive
            borderRadius: 10,
          }}>
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
        data={myPublications}
        renderItem={renderItem}
        keyExtractor={(publication) => publication._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadPublications} />}
        ListEmptyComponent={<Text style={{ color: colors.text }}>No hay publicaciones</Text>}
        numColumns={2}
      />
    </>
  );
};

export default MyPublishScreen;

const styles = StyleSheet.create({
  //TODO: styles
});
