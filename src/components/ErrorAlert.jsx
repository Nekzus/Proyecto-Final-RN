import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'react-native';
import { errorClear } from '../store';

const ErrorAlert = ({ msg }) => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);
  const errorMsg = () => dispatch(errorClear());
  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert(msg, errorMessage, [
      {
        text: 'ok',
        onPress: errorMsg,
      },
    ]);
  }, [errorMessage, errorMsg]);
  return <></>;
};

export default ErrorAlert;
