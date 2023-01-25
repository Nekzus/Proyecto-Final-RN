import * as Location from 'expo-location';

import { addressLocation, coordsLocation, historyLocations } from './locationsSlice';
import { errorState, loadingState } from '../error-load';
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
    dispatch(loadingState(true));
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
    } catch (error) {
      console.log('Error in currentLocation', error);
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    } finally {
      dispatch(loadingState(false));
    }
  };
};

export const geoCodingLocation = () => {
  return async (dispatch, getState) => {
    const {
      locations: { coords },
    } = getState();
    if (coords?.lat && coords?.lng) {
      dispatch(loadingState(true));
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
        dispatch(loadingState(false));
      } catch (error) {
        console.log({ error });
        if (!error.response) return;
        dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
        dispatch(loadingState(false));
      }
    }
  };
};

export const loadAddress = () => {
  return async (dispatch) => {
    dispatch(loadingState(true));
    try {
      const {
        rows: { _array },
      } = await fetchAddress();
      dispatch(historyLocations(_array));
      dispatch(loadingState(false));
    } catch (error) {
      console.log(error);
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
      dispatch(loadingState(false));
    }
  };
};
