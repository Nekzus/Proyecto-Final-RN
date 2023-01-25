import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { askPermissionLocation, getPublications } from '../../store';

import { MapsMarkers } from '../../components';
import { useDispatch } from 'react-redux';

const SearchMapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(askPermissionLocation());
  }, []);

  return (
    <View style={styles.container}>
      <MapsMarkers />
    </View>
  );
};

export default SearchMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
});
