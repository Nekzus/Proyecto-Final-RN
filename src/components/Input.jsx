import { StyleSheet, Text, TextInput, View } from 'react-native';

import { COLORS } from '../constants';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const Input = ({ label, iconName, error, password, big, onFocus = () => {}, ...props }) => {
  const { colors, fonts } = useTheme();
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ ...styles.label, color: colors.text, fontFamily: fonts.title }}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? COLORS.red : isFocused ? COLORS.light : COLORS.grey,
            alignItems: 'center',
          },
          big && { height: 110, alignItems: 'flex-start', justifyContent: 'flex-start' },
        ]}>
        <Icon name={iconName} style={{ color: colors.text, fontSize: 22, marginRight: 10 }} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: colors.text, fontFamily: fonts.title, flex: 1 }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: colors.text, fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ fontFamily: fonts.title, marginTop: 7, color: COLORS.red, fontSize: 13 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
  },
  inputContainer: {
    height: 55,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
