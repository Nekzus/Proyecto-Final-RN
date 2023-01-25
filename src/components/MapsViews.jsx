import MapView, { Marker } from 'react-native-maps';

import Loading from './Loading';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocation } from '../hooks/useLocation';

const MapsViews = ({ marker, selectedLocation }) => {
  const { hasLocation, initialPosition } = useLocation();
  const initialRegion = {
    latitude: initialPosition?.lat,
    longitude: initialPosition?.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
        onPress={marker}>
        {selectedLocation && (
          <Marker
            title="Lugar seleccionado"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
    </>
  );
};

export default MapsViews;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
