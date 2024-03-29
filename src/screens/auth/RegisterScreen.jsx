import { ErrorAlert, Logo } from '../../components';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AuthStyles } from './AuthStyles';
import Input from '../../components/Input';
import { ROUTES } from '../../constants';
import React from 'react';
import { register } from '../../store';
import { useDispatch } from 'react-redux';
import { useFormValidator } from '../../hooks';
import { useTheme } from '@react-navigation/native';

const RegisterScreen = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const dispatch = useDispatch();
  const { email, password, name, onChange, errors, onValidate, onReset } = useFormValidator({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    const isValid = onValidate();
    Keyboard.dismiss();
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
          <Text style={{ ...AuthStyles.title, fontFamily: fonts.title, textAlign: 'center' }}>
            Registro
          </Text>
          <Input
            label="Nombre"
            iconName="account-outline"
            error={errors.name}
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            selectionColor={colors.notification}
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={() => onReset('name')}
          />

          <Input
            label="Email"
            iconName="email-outline"
            error={errors.email}
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
            selectionColor={colors.notification}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => onReset('email')}
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
            onSubmitEditing={onRegister}
            selectionColor={colors.notification}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => onReset('password')}
          />
          <View style={AuthStyles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} style={AuthStyles.button} onPress={onRegister}>
              <Text style={{ ...AuthStyles.buttonText, fontFamily: fonts.title }}>
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace(ROUTES.LOGIN)}
            style={AuthStyles.buttonReturn}>
            <Text style={{ ...AuthStyles.buttonText, fontFamily: fonts.title }}>
              Tienes cuenta? Ingresa
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;
