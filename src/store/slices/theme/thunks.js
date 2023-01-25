import { setTheme } from './themeSlice';

export const selectTheme = (state) => {
  return (dispatch) => {
    dispatch(setTheme(state));
  };
};
