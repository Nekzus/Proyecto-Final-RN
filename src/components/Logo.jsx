import { Image, View } from 'react-native';

import React from 'react';

const Logo = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200 }} />
    </View>
  );
};

export default Logo;
