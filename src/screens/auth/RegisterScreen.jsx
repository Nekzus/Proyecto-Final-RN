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

import { AuthStyles } from './AuthStyles';
import React from 'react';
import { register } from '../../store';
import { useDispatch } from 'react-redux';
import { useFormValidator } from '../../hooks';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, password, name, onChange, errors, validate, isValid, onReset } = useFormValidator({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    Keyboard.dismiss();
    validate();
    if (isValid) {
      dispatch(register({ nombre: name, email, password }));
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <ErrorAlert msg="Registro incorrecto" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={AuthStyles.formContainer}>
          <Logo />
          <Text style={AuthStyles.title}>Registro</Text>

          <Text style={AuthStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            selectionColor="white"
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={() => onReset(null, 'name')}
          />
          {errors.name && (
            <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{errors.name}</Text>
          )}

          <Text style={AuthStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => onReset(null, 'email')}
          />
          {errors.email && (
            <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{errors.email}</Text>
          )}

          <Text style={AuthStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[AuthStyles.inputField, Platform.OS === 'ios' && AuthStyles.inputFieldIOS]}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => onReset(null, 'password')}
          />
          {errors.password && (
            <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{errors.password}</Text>
          )}
          <View style={AuthStyles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={AuthStyles.button} onPress={onRegister}>
              <Text style={AuthStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace(ROUTES.LOGIN)}
            style={AuthStyles.buttonReturn}>
            <Text style={AuthStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;
