import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Ionicons as Icon } from '@expo/vector-icons';
import { Switch } from '@rneui/themed';
import { selectTheme } from '../../store';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.theme);

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

  const setChecked = () => {
    dispatch(selectTheme(!dark));
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.settings, backgroundColor: colors.notification }}>
        {dark ? (
          <Text style={{ color: colors.text, fontFamily: fonts.title }}>
            Desactivar modo oscuro
          </Text>
        ) : (
          <Text style={{ color: colors.text, fontFamily: fonts.title }}>Activar modo oscuro</Text>
        )}
        <View style={styles.switch}>
          {dark ? (
            <Icon name="sunny-outline" size={24} color={colors.text} />
          ) : (
            <Icon name="moon-outline" size={24} color={colors.text} />
          )}
          <Switch value={dark} onValueChange={setChecked} />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settings: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    justifyContent: 'space-around',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  switch: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
