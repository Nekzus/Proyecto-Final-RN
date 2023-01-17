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
import Input from '../../components/Input';
import { login } from '../../store';
import { useDispatch } from 'react-redux';
import { useFormValidator } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
      <ErrorAlert msg="Autentificación fallida" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={AuthStyles.formContainer}>
          <Logo />
          <Text style={AuthStyles.title}>Login</Text>
          <Input
            label="Email"
            iconName="email-outline"
            error={errors.email}
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            selectionColor={colors.notification}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => onReset(null, 'email')}
          />
          <Input
            label="Contraseña"
            iconName="lock-outline"
            error={errors.password}
            password
            placeholder="Ingrese su contraseña"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            selectionColor={colors.notification}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => onReset(null, 'password')}
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
    </ScrollView>
  );
};

export default LoginScreen;
