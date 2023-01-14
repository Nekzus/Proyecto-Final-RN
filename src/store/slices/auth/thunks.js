import { addError, logOff, notAuthenticated, removeError, signIn, signUp } from './authSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import petQuestApi from '../../../api/petQuestApi';

export const checkToken = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return dispatch(notAuthenticated());
      }
      const resp = await petQuestApi.get('/auth');
      if (resp.status !== 200) {
        await AsyncStorage.removeItem('token');
        dispatch(notAuthenticated());
      }
      await AsyncStorage.setItem('token', resp.data.token);
      dispatch(
        signUp({
          token: resp.data.token,
          user: resp.data.usuario,
        })
      );
    } catch (error) {
      dispatch(addError(error.response.data.msg || 'Error en token'));
    }
  };
};

export const errorClear = () => {
  return (dispatch) => {
    dispatch(removeError());
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await petQuestApi.post('/auth/login', {
        email,
        password,
      });
      dispatch(
        signIn({
          token: data.token,
          user: data.usuario,
        })
      );
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      if (!error.response) return;
      dispatch(addError(error.response.data.msg || 'Revisar información'));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(logOff());
    } catch (error) {
      dispatch(addError(error.response.data.msg || 'Error en logout'));
    }
  };
};

export const register = ({ nombre, email, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await petQuestApi.post('/usuarios', {
        nombre,
        email,
        password,
      });
      await AsyncStorage.setItem('token', data.token);
      dispatch(
        signUp({
          token: data.token,
          user: data.usuario,
        })
      );
    } catch (error) {
      if (!error.response) return;
      dispatch(addError(error.response.data.msg || 'Revisar información'));
    }
  };
};
