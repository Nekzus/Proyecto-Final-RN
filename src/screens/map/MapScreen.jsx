import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { coordsLocation, markcoordsLocation } from '../../store';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MapsViews } from '../../components';
import { insertAddress } from '../../db';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';

const MapScreen = ({ navigation, route }) => {
  const { isLocation = false } = route.params;
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState();

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

  const onHandlePicklocation = (e) => {
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    });
  };

  const onHandleSaveLocation = async () => {
    if (!selectedLocation) return;
    if (isLocation) {
      dispatch(coordsLocation(selectedLocation));
    } else {
      dispatch(markcoordsLocation(selectedLocation));
    }
    const { lat, lng } = selectedLocation;
    await insertAddress(lat, lng);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onHandleSaveLocation}>
          <Ionicons name="md-save-sharp" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [onHandlePicklocation]);
  return (
    <View style={styles.container}>
      <MapsViews selectedLocation={selectedLocation} marker={onHandlePicklocation} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
});
