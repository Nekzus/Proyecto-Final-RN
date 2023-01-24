import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const PickerInput = ({ label, error, array, onFocus = () => {}, ...props }) => {
  const { colors, fonts } = useTheme();
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
        ]}>
        <Picker
          style={{ color: colors.text, fontFamily: fonts.title, flex: 1 }}
          {...props}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}>
          {array.map((c) => (
            <Picker.Item color="black" label={c.name} value={c.id} key={c.id} />
          ))}
        </Picker>
      </View>
      {error && (
        <Text style={{ fontFamily: fonts.title, marginTop: 7, color: COLORS.red, fontSize: 13 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default PickerInput;

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
