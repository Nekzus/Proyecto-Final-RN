import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useTheme } from '@react-navigation/native';

const FilterScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Filter Screen</Text>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
