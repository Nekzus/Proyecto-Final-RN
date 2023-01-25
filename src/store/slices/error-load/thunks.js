import { addError, loadingData, removeError } from './errorloadSlice';

export const errorClear = () => {
  return (dispatch) => {
    dispatch(removeError());
  };
};

export const errorState = (state) => {
  return (dispatch) => {
    dispatch(addError(state));
  };
};

export const loadingState = (state) => {
  return (dispatch) => {
    dispatch(loadingData(state));
  };
};
