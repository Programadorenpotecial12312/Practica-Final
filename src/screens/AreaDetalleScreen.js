import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AreaDetalleScreen({ route }) {
  const { area } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{area.nombre}</Text>
      <Text style={styles.label}>Provincia:</Text>
      <Text style={styles.text}>{area.ubicacion}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{area.descripcion}</Text>

      <Text style={styles.label}>Latitud:</Text>
      <Text style={styles.text}>{area.latitud}</Text>

      <Text style={styles.label}>Longitud:</Text>
      <Text style={styles.text}>{area.longitud}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1b5e20", marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#2e7d32" },
  text: { fontSize: 15, lineHeight: 22, textAlign: "justify" },
});
