import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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

  console.log({ coords, address });

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
              fontSize: 20,
              fontFamily: fonts.content,
              textAlign: 'center',
            }}>
            {address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.MAP);
            }}>
            <View style={{ ...styles.button, backgroundColor: colors.notification }}>
              <Text style={{ ...styles.buttonText, color: colors.text, fontFamily: fonts.title }}>
                Seleccionar ubicación
              </Text>
            </View>
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
  button: {
    width: '75%',
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
  buttonText: {
    fontSize: 17,
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 10,
  },
});
