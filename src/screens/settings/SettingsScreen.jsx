import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
