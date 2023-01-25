import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { COLORS } from '../constants';
import Map from './Map';
import React from 'react';
import { askPermissionLocation } from '../store';
import { useDispatch } from 'react-redux';

const MapBox = ({ label, coords, route, address, ...props }) => {
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();
  const dispatch = useDispatch();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ ...styles.label, color: colors.text, fontFamily: fonts.title }}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(askPermissionLocation());
          navigation.navigate(route);
        }}>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: COLORS.light,
              alignItems: 'center',
            },
            { ...props },
          ]}>
          <Map location={coords} style={styles.preview} />
        </View>
      </TouchableOpacity>
      <Text
        style={{
          color: colors.text,
          fontSize: 15,
          fontFamily: fonts.content,
          textAlign: 'center',
        }}>
        {address}
      </Text>
    </View>
  );
};

export default MapBox;

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  inputContainer: {
    height: 150,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  preview: {
    width: '110%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
});
