import { COLORS, ROUTES } from '../../constants';
import { ErrorAlert, Logo } from '../../components';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { AuthStyles } from './AuthStyles';
import { login } from '../../store';
import { useDispatch } from 'react-redux';
import { useFormValidator } from '../../hooks';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, password, onChange, errors, isValid, validate, onReset } = useFormValidator({
    email: '',
    password: '',
  });

  const onLogin = () => {
    Keyboard.dismiss();
    validate();
    if (isValid) {
      dispatch(login({ email, password }));
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <ErrorAlert msg="Login incorrecto" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={AuthStyles.formContainer}>
          <Logo />
          <Text style={AuthStyles.title}>Login</Text>
          <View>
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
              onFocus={() => onReset(null, 'email')}
            />
            {errors.email && (
              <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{errors.email}</Text>
            )}
          </View>
          <View>
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
              onFocus={() => onReset(null, 'password')}
            />
            {errors.password && (
              <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
                {errors.password}
              </Text>
            )}
          </View>
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
    </ScrollView>
  );
};

export default LoginScreen;
