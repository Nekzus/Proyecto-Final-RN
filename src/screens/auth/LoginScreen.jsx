import { ErrorAlert, Logo } from '../../components';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { AuthStyles } from './AuthStyles';
import { ROUTES } from '../../constants';
import React from 'react';
import { login } from '../../store';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    Keyboard.dismiss();
    dispatch(login({ email, password }));
  };
  return (
    <>
      <ErrorAlert msg="Login incorrecto" />
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
              onPress={() => navigation.replace(ROUTES.REGISTER)}>
              <Text style={AuthStyles.buttonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
