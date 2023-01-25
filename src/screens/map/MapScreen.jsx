import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MapsViews } from '../../components';
import { coordsLocation } from '../../store';
import { insertAddress } from '../../db';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';

const MapScreen = ({ navigation }) => {
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
    dispatch(coordsLocation(selectedLocation));
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
