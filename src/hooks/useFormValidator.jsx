import { useState } from 'react';

export const useFormValidator = (initialState) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const onValidate = (excluded) => {
    let newErrors = {};
    let newIsValid = true;
    let excludedField = {};

    excluded = excluded || {};
    excludedField = Object.keys(excluded).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    console.log({ excludedField });

    const validations = {
      name: {
        minLength: {
          message: 'El nombre debe tener al menos 3 caracteres',
          test: (value) => value.trim().length < 3,
        },
      },
      email: {
        pattern: {
          message: 'El email no es válido',
          test: (value) => !/\S+@\S+\.\S+/.test(value),
        },
      },
      password: {
        minLength: {
          message: 'La contraseña debe tener al menos 6 caracteres',
          test: (value) => value.trim().length < 6,
        },
      },
    };
    Object.entries(state).forEach(([field, value]) => {
      if (excludedField[field]) {
        return;
      }
      if (validations[field]) {
        Object.entries(validations[field]).forEach(([key, { message, test }]) => {
          if (test(value)) {
            if (value.trim().length === 0) {
              newErrors[field] = 'El campo es obligatorio';
              newIsValid = false;
              return;
            }
            newErrors[field] = message;
            newIsValid = false;
          } else {
            newErrors[field] = '';
          }
        });
      } else {
        if (value.trim().length === 0) {
          newErrors[field] = 'El campo es obligatorio';
          newIsValid = false;
          return;
        }
        newErrors[field] = '';
      }
    });

    setErrors(newErrors);
    setIsValid(newIsValid);
    return newIsValid;
  };

  const onChange = (value, field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onReset = (field) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: null,
    }));
  };

  const reset = () => {
    setState(initialState);
    setErrors({});
    setIsValid(false);
  };

  const setFormValue = (form) => {
    setState(form);
  };

  return {
    ...state,
    form: state,
    onChange,
    setFormValue,
    errors,
    isValid,
    onValidate,
    onReset,
    reset,
  };
};
