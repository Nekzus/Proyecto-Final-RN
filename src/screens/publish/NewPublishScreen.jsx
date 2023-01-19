import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';

const NewPublishScreen = ({ navigation, route }) => {
  const { title, type } = route.params;
  const { colors } = useTheme();

  console.log({ title, type });
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none' },
      headerShown: false,
    });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: { display: 'flex' },
        headerShown: true,
      });
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>New Publish Screen</Text>
    </View>
  );
};

export default NewPublishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
