import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function MisReportesScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarReportes = async () => {
      try {
        const response = await fetch("https://adamix.net/medioambiente/reportes", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setReportes(data);
        }
      } catch (error) {
        console.error("Error cargando reportes:", error);
      }
      setLoading(false);
    };

    cargarReportes();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reportes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ReporteDetalle", { reporte: item })}
          >
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.text}>📅 {item.fecha}</Text>
            <Text style={styles.text}>Estado: {item.estado}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#2e7d32" },
  text: { fontSize: 14, color: "#333" },
});
