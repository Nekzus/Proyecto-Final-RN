import {ActivityIndicator, View} from 'react-native';

import React from 'react';
import { useTheme } from '@react-navigation/native';

export const LoadingScreen = () => {
    const {colors}=useTheme()
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
      <ActivityIndicator size={50} color={colors.text} />
    </View>
  );
};