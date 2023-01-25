import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect } from 'react';
import { getPublicationById, getPublications } from '../store';
import { useDispatch, useSelector } from 'react-redux';

import Loading from './Loading';
import { ROUTES } from '../constants';
import { StyleSheet } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { useNavigation } from '@react-navigation/native';

const MapsMarkers = () => {
  const dispatch = useDispatch();
  const { hasLocation, initialPosition } = useLocation();
  const navigation = useNavigation();
  const { publications } = useSelector((state) => state.publish);
  const initialRegion = {
    latitude: initialPosition?.lat,
    longitude: initialPosition?.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onHandlePress = (pub) => {
    dispatch(getPublicationById(pub._id));
    navigation.navigate(ROUTES.PUBLISH_DETAIL, { title: pub.categoria.nombre });
  };

  if (!hasLocation) {
    return <Loading />;
  }

  return (
    <>
      <MapView
        showsUserLocation
        initialRegion={initialRegion}
        style={styles.mapView}
        mapType="standard"
        provider={PROVIDER_GOOGLE}>
        {publications &&
          publications.map((pub) => (
            <Marker
              key={pub._id}
              title={pub.categoria.nombre}
              description={pub.title}
              onPress={() => onHandlePress(pub)}
              coordinate={{
                latitude: pub.location.lat,
                longitude: pub.location.lng,
              }}
            />
          ))}
      </MapView>
    </>
  );
};

export default MapsMarkers;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
