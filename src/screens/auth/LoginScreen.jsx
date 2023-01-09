import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { errorClear, signIn } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { AuthStyles } from './AuthStyles';
import { Logo } from '../../components';
import { useForm } from '../../hooks';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'ok',
        onPress: dispatch(errorClear()),
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    console.log({ email, password });
    Keyboard.dismiss();
    dispatch(signIn({ email, password }));
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={AuthStyles.formContainer}>
          <Logo />
          <Text style={AuthStyles.title}>Login</Text>
          <Text style={AuthStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={AuthStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={AuthStyles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={AuthStyles.button} onPress={onLogin}>
              <Text style={AuthStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={AuthStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={AuthStyles.buttonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
