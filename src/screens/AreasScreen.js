import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";

export default function AreasScreen({ navigation }) {
  const [areas, setAreas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarAreas = async () => {
      const data = await fetchData("areas_protegidas");
      if (Array.isArray(data)) {
        setAreas(data);
        setFiltered(data);
      }
      setLoading(false);
    };
    cargarAreas();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    if (text === "") {
      setFiltered(areas);
    } else {
      setFiltered(
        areas.filter((item) =>
          item.nombre.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar área protegida..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("AreaDetalle", { area: item })}
          >
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.text}>{item.provincia}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#e0f2f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#004d40" },
  text: { fontSize: 14, color: "#333" },
});
