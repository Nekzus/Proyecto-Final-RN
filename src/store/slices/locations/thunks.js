import * as Location from 'expo-location';

import {
  addressLocation,
  coordsLocation,
  errorLocations,
  historyLocations,
  loadingLocations,
} from './locationsSlice';
import { fetchAddress, insertAddress } from '../../../db';

import { URL_GEOCODING } from '../../../constants/maps';

export const currentLocation = () => {
  return async (dispatch, getState) => {
    const {
      permissions: { locationStatus },
    } = getState();
    if (locationStatus !== 'granted') {
      return;
    }
    dispatch(loadingLocations(true));
    try {
      let location = await Location.getCurrentPositionAsync({
        timeInterval: 1000,
        distanceInterval: 50,
      });
      if (!location || !location.coords) {
        location = await Location.getLastKnownPositionAsync();
      }
      if (location && location.coords) {
        const { latitude, longitude } = location.coords;
        await dispatch(
          coordsLocation({
            lat: latitude,
            lng: longitude,
          })
        );
        await dispatch(
          insertAddress({
            lat: latitude,
            lng: longitude,
          })
        );
      } else {
        throw new Error('Location not available');
      }
    } catch (err) {
      console.log('Error in currentLocation', err);
      dispatch(errorLocations(err));
    } finally {
      dispatch(loadingLocations(false));
    }
  };
};

export const geoCodingLocation = () => {
  return async (dispatch, getState) => {
    const {
      locations: { coords },
    } = getState();
    if (coords?.lat && coords?.lng) {
      dispatch(loadingLocations(true));
      try {
        const resp = await fetch(URL_GEOCODING(coords?.lat, coords?.lng));
        if (!resp.ok) {
          throw new Error('No se ha podido conectar al servicio');
        }
        const data = await resp.json();
        if (data.status === 'ZERO_RESULTS') {
          throw new Error('No se ha podido encontrar la dirección');
        }
        const address = data.results[0]?.formatted_address;
        dispatch(addressLocation(address));
        dispatch(loadingLocations(false));
      } catch (error) {
        console.log({ error });
        dispatch(errorLocations(error));
        dispatch(loadingLocations(false));
      }
    }
  };
};

export const loadAddress = () => {
  return async (dispatch) => {
    dispatch(loadingLocations(true));
    try {
      const {
        rows: { _array },
      } = await fetchAddress();
      dispatch(historyLocations(_array));
      dispatch(loadingLocations(false));
    } catch (err) {
      console.log(err);
      dispatch(errorLocations(err));
      dispatch(loadingLocations(false));
    }
  };
};
