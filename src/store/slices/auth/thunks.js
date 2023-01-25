import { errorClear, errorState } from '../error-load';
import { logOff, notAuthenticated, signIn, signUp, updateUser } from './authSlice';

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
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
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
      dispatch(errorClear());
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch(logOff());
      dispatch(errorClear());
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
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
      dispatch(errorClear());
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const updateProfile = ({ name, uid }) => {
  return async (dispatch) => {
    try {
      const { data } = await petQuestApi.put(`/usuarios/${uid}`, {
        nombre: name,
      });
      dispatch(updateUser(data));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};
