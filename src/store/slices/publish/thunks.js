import { errorState, loadingState } from '../error-load';
import {
  loadMyPublications,
  loadPublicationById,
  loadPublications,
  setCategories,
  setNewId,
} from './publishSlice';

import petQuestApi from '../../../api/petQuestApi';

export const postPublication = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      const resp = await petQuestApi.post('/productos', {
        title: data.title,
        categoria: data.typeId,
        img: data.image,
        typeanimal: data.typeAnimal,
        race: data.race,
        sex: data.sex,
        location: data.zone,
        identification: data.identification,
        description: data.description,
        phone: data.phone,
        date: data.date,
        addss: data._address,
      });
      dispatch(setNewId(resp.data._id));
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
  return async (dispatch, getState) => {
    try {
      const {
        user: { uid },
      } = getState().auth;
      dispatch(loadingState(true));
      await petQuestApi.delete(`/productos/${id}`);
      dispatch(getPublications());
      dispatch(getMyPublications(uid));
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
      const resp = await petQuestApi.get('/productos');
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

export const putPublication = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingState(true));
      const {
        user: { uid },
      } = getState().auth;
      await petQuestApi.put(`/productos/${data._id}`, {
        title: data.title,
        categoria: data.typeId,
        img: data.image,
        typeanimal: data.typeAnimal,
        race: data.race,
        sex: data.sex,
        location: data.zone,
        identification: data.identification,
        description: data.description,
        phone: data.phone,
        date: data.date,
        addss: data._address,
      });
      dispatch(getPublications());
      dispatch(getMyPublications(uid));
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

export const getMyPublications = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingState(true));
      const resp = await petQuestApi.get(`/productos`);
      const {
        data: { productos },
      } = resp;
      const myPublications = productos.filter((publication) => publication.user.uid === userId);
      dispatch(loadMyPublications(myPublications));
      dispatch(loadingState(false));
    } catch (error) {
      if (!error.response) return;
      dispatch(errorState(error.response.data.msg || error.response.data.errors[0].msg));
    }
  };
};
