import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorAlert } from '../../components';
import { LoadingScreen } from '../auth/LoadingScreen';
import { deletePublication } from '../../store';
import { useTheme } from '@react-navigation/native';

const PublishDetailScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { publication } = useSelector((state) => state.publish);
  const { loading } = useSelector((state) => state.errors);
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

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <ErrorAlert msg="Error" />
      <Text style={{ color: colors.text }}>{JSON.stringify(publication) || 'Publish Detail'}</Text>
      <View style={{ backgroundColor: colors.card, padding: 10, borderRadius: 10 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{ color: colors.text }}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PublishDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
