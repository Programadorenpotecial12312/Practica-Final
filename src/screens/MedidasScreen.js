import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";

export default function MedidasScreen({ navigation }) {
  const [medidas, setMedidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarMedidas = async () => {
      const data = await fetchData("medidas");
      if (Array.isArray(data)) {
        setMedidas(data);
      }
      setLoading(false);
    };
    cargarMedidas();
  }, []);

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
        data={medidas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MedidaDetalle", { medida: item })}
          >
            <Text style={styles.title}>{item.titulo}</Text>
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
});
