import { StyleSheet, Text, View } from 'react-native';
import { fonts, useTheme } from '@react-navigation/native';

import React from 'react';

const FilterScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text, fontFamily: fonts.title }}>Filter Screen</Text>
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
