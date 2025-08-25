import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "../components/Slider";

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      <Slider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
