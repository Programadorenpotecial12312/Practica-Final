import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { AuthContext } from "../context/AuthContext";

export default function MapaReportesScreen({ navigation }) {
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
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 18.7357,
        longitude: -70.1627,
        latitudeDelta: 3,
        longitudeDelta: 3,
      }}
    >
      {reportes.map((rep, index) => {
        if (!rep.lat || !rep.lng) return null;
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(rep.lat),
              longitude: parseFloat(rep.lng),
            }}
            pinColor="#d32f2f"
          >
            <Callout
              onPress={() =>
                navigation.navigate("ReporteDetalle", { reporte: rep })
              }
            >
              <View style={styles.callout}>
                <Text style={styles.title}>{rep.titulo}</Text>
                <Text style={styles.subtitle}>{rep.fecha}</Text>
                <Text style={styles.more}>Toca aquí para ver detalles</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  callout: { width: 200, padding: 5 },
  title: { fontWeight: "bold", fontSize: 16, color: "#1b5e20" },
  subtitle: { fontSize: 14, color: "#555" },
  more: { fontSize: 12, color: "#2e7d32", marginTop: 5 },
});
