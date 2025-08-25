import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function MedidaDetalleScreen({ route }) {
  const { medida } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{medida.titulo}</Text>
      <Text style={styles.text}>{medida.descripcion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", color: "#1b5e20", marginBottom: 10 },
  text: { fontSize: 15, lineHeight: 22, textAlign: "justify" },
});
