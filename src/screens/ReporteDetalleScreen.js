import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function ReporteDetalleScreen({ route }) {
  const { reporte } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{reporte.titulo}</Text>
      <Text style={styles.label}>Código:</Text>
      <Text style={styles.text}>{reporte.codigo}</Text>

      <Text style={styles.label}>Fecha:</Text>
      <Text style={styles.text}>{reporte.fecha}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{reporte.descripcion}</Text>

      <Text style={styles.label}>Estado:</Text>
      <Text style={styles.text}>{reporte.estado}</Text>

      <Text style={styles.label}>Comentario del Ministerio:</Text>
      <Text style={styles.text}>{reporte.comentario || "Sin comentarios"}</Text>

      {reporte.foto ? (
        <Image source={{ uri: reporte.foto }} style={styles.image} />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", color: "#1b5e20", marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#2e7d32" },
  text: { fontSize: 15, lineHeight: 22, textAlign: "justify" },
  image: { width: "100%", height: 200, marginTop: 15, borderRadius: 10 },
});
