import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

export default function SobreNosotrosScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ministerio de Medio Ambiente</Text>

      <Text style={styles.sectionTitle}>Historia</Text>
      <Text style={styles.text}>
        El Ministerio de Medio Ambiente y Recursos Naturales de la República Dominicana
        fue creado con el propósito de garantizar la protección, conservación y manejo
        sostenible de los recursos naturales del país.
      </Text>

      <Text style={styles.sectionTitle}>Misión</Text>
      <Text style={styles.text}>
        Proteger el medio ambiente y los recursos naturales mediante políticas,
        regulaciones y programas que promuevan el desarrollo sostenible.
      </Text>

      <Text style={styles.sectionTitle}>Visión</Text>
      <Text style={styles.text}>
        Ser una institución líder en la conservación y gestión sostenible del medio
        ambiente, reconocida nacional e internacionalmente.
      </Text>

      <Text style={styles.sectionTitle}>Video Institucional</Text>
      <Video
        source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay={false}
        useNativeControls
        style={styles.video}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#1b5e20",
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "justify",
  },
  video: {
    width: width - 30,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
  },
});
