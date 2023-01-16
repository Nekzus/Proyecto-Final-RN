import { useState } from 'react';

export const useFormValidator = (initialState) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const entries = Object.entries(state);

  const validate = () => {
    setIsValid(true);
    entries.forEach(([key, value]) => {
      if (key === 'name') {
        if (value.trim().length === 0) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'El campo es obligatorio',
          }));
          setIsValid(false);
        } else if (value.trim().length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'El nombre debe tener al menos 3 caracteres',
          }));
          setIsValid(false);
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [key]: null,
          }));
        }
      }

      if (key === 'email') {
        if (value.trim().length === 0) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'El campo es obligatorio',
          }));
          setIsValid(false);
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'El email no es válido',
          }));
          setIsValid(false);
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [key]: null,
          }));
        }
      }

      if (key === 'password') {
        if (value.trim().length === 0) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'El campo es obligatorio',
          }));
          setIsValid(false);
        } else if (value.trim().length < 6) {
          setErrors((prevState) => ({
            ...prevState,
            [key]: 'La contraseña debe tener al menos 6 caracteres',
          }));
          setIsValid(false);
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [key]: null,
          }));
        }
      }
    });
  };

  const onChange = (value, field) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const setFormValue = (form) => {
    setState(form);
  };

  const onReset = (value, field) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const reset = () => {
    setErrors(initialState);
  };

  return {
    ...state,
    form: state,
    onChange,
    setFormValue,
    errors,
    isValid,
    validate,
    onReset,
    reset,
  };
};
