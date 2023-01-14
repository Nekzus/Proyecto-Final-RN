import * as Camera from 'expo-image-picker';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

import {
  akPermissionCamera,
  akPermissionLocation,
  ckPermissionCamera,
  ckPermissionLocation,
} from './permissionsSlice';

import { Alert } from 'react-native';

export const askPermissionLocation = () => {
  return async (dispatch) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      dispatch(akPermissionLocation(status));
      if (status !== 'granted') {
        Alert.alert('Permiso insuficiente', 'Necesitamos permisos para usar la localizacion', [
          {
            text: 'Ok',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
      }
      console.log('askPermissionLocation', status);
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkPermissionLocation = () => {
  return async (dispatch) => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      dispatch(ckPermissionLocation(status));
      console.log('checkPermissionLocation', status);
    } catch (error) {
      console.log(error);
    }
  };
};

export const askPermissionCamera = () => {
  return async (dispatch) => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      dispatch(akPermissionCamera(status));
      if (status !== 'granted') {
        Alert.alert('Permiso insuficiente', 'Necesitamos permisos para usar la camara', [
          {
            text: 'Ok',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
      }
      console.log('askPermissionCamera', status);
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkPermissionCamera = () => {
  return async (dispatch) => {
    try {
      const { status } = await Camera.getCameraPermissionsAsync();
      dispatch(ckPermissionCamera(status));
      console.log('checkPermissionCamera', status);
    } catch (error) {
      console.log(error);
    }
  };
};
