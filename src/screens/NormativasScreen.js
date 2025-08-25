import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function NormativasScreen() {
  const { user } = useContext(AuthContext);
  const [normativas, setNormativas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNormativas = async () => {
      try {
        const response = await fetch("https://adamix.net/medioambiente/normativas", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setNormativas(data);
        }
      } catch (error) {
        console.error("Error cargando normativas:", error);
      }
      setLoading(false);
    };

    cargarNormativas();
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
        data={normativas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.text}>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#f1f8e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#2e7d32", marginBottom: 5 },
  text: { fontSize: 14, color: "#333" },
});
