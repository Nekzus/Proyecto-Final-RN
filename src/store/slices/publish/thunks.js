import { errorState, loadingState } from '../error-load';
import {
  loadPublicationById,
  loadPublications,
  setCategories,
  updatePublication,
} from './publishSlice';

import petQuestApi from '../../../api/petQuestApi';

export const postPublication = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      await petQuestApi.post('/productos', {
        nombre: data.label, // TODO: Revisar en el backend restriccion duplicacion de nombre
        categoria: data.typeId,
        precio: data.phone,
      });
      dispatch(getPublications());
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      const resp = await petQuestApi.get('/categorias');
      const {
        data: { categorias },
      } = resp;
      dispatch(setCategories(categorias));
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const deletePublication = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      await petQuestApi.delete(`/productos/${id}`);
      dispatch(getPublications());
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const getPublications = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      const resp = await petQuestApi.get('/productos?limite=50');
      const {
        data: { productos },
      } = resp;
      dispatch(loadPublications(productos));
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const putPublication = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      const resp = await petQuestApi.put(`/productos/${id}`, {
        nombre: data.label,
        categoria: data.type,
        precio: data,
      });
      const {
        data: { publication },
      } = resp;
      dispatch(updatePublication(publication));
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};

export const getPublicationById = (id) => {
  return async (dispatch) => {
    try {
      console.log('getPublicationById', id);
      dispatch(loadingState(true));
      const { data } = await petQuestApi.get(`/productos/${id}`);
      dispatch(loadPublicationById(data));
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};
