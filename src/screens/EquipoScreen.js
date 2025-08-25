import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";

export default function EquipoScreen() {
  const [equipo, setEquipo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEquipo = async () => {
      const data = await fetchData("equipo");
      if (Array.isArray(data)) {
        setEquipo(data);
      }
      setLoading(false);
    };
    cargarEquipo();
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
        data={equipo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.foto ? (
              <Image source={{ uri: item.foto }} style={styles.image} />
            ) : null}
            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.cargo}>{item.cargo}</Text>
            </View>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f8e9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: "#2e7d32" },
  cargo: { fontSize: 14, color: "#555" },
});
