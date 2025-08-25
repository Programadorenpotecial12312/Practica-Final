import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";

export default function NoticiasScreen() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNoticias = async () => {
      const data = await fetchData("noticias");
      if (Array.isArray(data)) {
        setNoticias(data);
      }
      setLoading(false);
    };
    cargarNoticias();
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
        data={noticias}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagen ? (
              <Image source={{ uri: item.imagen }} style={styles.image} />
            ) : null}
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.date}>🗓 {item.fecha}</Text>
            <Text style={styles.text}>{item.resumen}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9fbe7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 5,
  },
  date: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: "#333",
    textAlign: "justify",
  },
});
