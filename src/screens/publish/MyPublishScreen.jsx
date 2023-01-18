import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';

const MyPublishScreen = ({ navigation }) => {
  const { colors } = useTheme();
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>My Publish Screen</Text>
    </View>
  );
};

export default MyPublishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
