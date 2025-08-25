import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from "react-native";

export default function AcercaDeScreen() {
  const desarrolladores = [
    {
      nombre: "Cesar Martinez",
      matricula: "",
      telefono: "",
      telegram: "",
    },
    {
      nombre: "Hansel Ogando",
      matricula: "2019-7621",
      telefono: "809-529-1920",
      telegram: "",
      foto: require("../../assets/mi.png"),
    },
  ];

  const llamar = (telefono) => {
    Linking.openURL(`tel:${telefono}`);
  };

  const abrirTelegram = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Equipo de Desarrollo</Text>

      {desarrolladores.map((dev, index) => (
        <View key={index} style={styles.card}>
          <Image source={dev.foto} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{dev.nombre}</Text>
            <Text style={styles.text}>Matrícula: {dev.matricula}</Text>

            <TouchableOpacity onPress={() => llamar(dev.telefono)}>
              <Text style={styles.link}>📞 {dev.telefono}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => abrirTelegram(dev.telegram)}>
              <Text style={styles.link}>💬 Telegram</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f1f8e9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 40, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold", color: "#1b5e20" },
  text: { fontSize: 14, color: "#333", marginTop: 4 },
  link: { fontSize: 15, color: "#2e7d32", marginTop: 6, fontWeight: "600" },
});
