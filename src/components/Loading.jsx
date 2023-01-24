import { ActivityIndicator, View } from 'react-native';

import React from 'react';
import { useTheme } from '@react-navigation/native';

const Loading = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator size="large" color={colors.text} />
    </View>
  );
};

export default Loading;
