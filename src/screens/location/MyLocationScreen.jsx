import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Map } from '../../components';
import { ROUTES } from '../../constants';
import { geoCodingLocation } from '../../store';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';

const MyLocationScreen = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const dispatch = useDispatch();
  const { locationStatus } = useSelector((state) => state.permissions);
  const { address, coords } = useSelector((state) => state.locations);

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
    dispatch(geoCodingLocation());
  }, [coords]);

  return (
    <View style={styles.container}>
      {locationStatus !== 'granted' ? (
        <View style={styles.preview}>
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontFamily: fonts.content,
              textAlign: 'center',
            }}>
            Location Status: {locationStatus} debe habilitar permiso de ubicacion
          </Text>
        </View>
      ) : (
        <>
          <Map location={coords} style={styles.preview} />
          <Text
            style={{
              color: colors.text,
              fontSize: 15,
              fontFamily: fonts.content,
              textAlign: 'center',
            }}>
            {address}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...styles.locationBtn, backgroundColor: colors.notification }}
            onPress={() => navigation.navigate(ROUTES.MAP)}>
            <Icon name="google-maps" size={24} color={colors.text} />
            <Text
              style={{
                ...styles.locationBtnText,
                color: colors.text,
                fontFamily: fonts.title,
              }}>
              Elegir ubicación
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MyLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: '95%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
  locationBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    width: '45%',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  locationBtnText: {
    marginLeft: 10,
  },
});
