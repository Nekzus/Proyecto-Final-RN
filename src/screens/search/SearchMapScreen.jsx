import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useTheme } from '@react-navigation/native';

const SearchMapScreen = () => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text, fontFamily: fonts.title, fontSize: 18 }}>
        Search Map Screen
      </Text>
    </View>
  );
};

export default SearchMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
