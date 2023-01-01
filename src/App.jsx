import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import React from "react";
import { init } from "./db";
import { store } from "./store";
import { useTheme } from "@react-navigation/native";

init()
  .then(() => console.log("DB initialized"))
  .catch((err) => {
    console.log("DB fail connect");
    console.log(err.message);
  });

const App = () => {
  const { colors } = useTheme();
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>
          Open up App.js to start working on your app!
        </Text>
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
