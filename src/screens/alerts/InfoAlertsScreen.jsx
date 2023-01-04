import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useTheme } from '@react-navigation/native';

const InfoAlertsScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Info Alerts Screen</Text>
    </View>
  );
};

export default InfoAlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
