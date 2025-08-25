import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { fetchData } from "../api/api";

export default function MapaAreasScreen({ navigation }) {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarAreas = async () => {
      const data = await fetchData("areas_protegidas");
      if (Array.isArray(data)) {
        setAreas(data);
      }
      setLoading(false);
    };
    cargarAreas();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
  <View style={{flex: 1}}>
    <MapView
      style={ styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 18.7357,
        longitude: -70.1627,
        latitudeDelta: 3,
        longitudeDelta: 3,
      }}
    >{/*
      {areas.map((area, index) => {
        
        const lat = parseFloat(area.lat || area.latitud);
        const lng = parseFloat(area.lng || area.longitud);
        console.log(lat);
        console.log(lng);
        if (!area.lat || !area.lng) return null;
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            pinColor="#2e7d32"
          >
            <Callout
              onPress={() =>
                navigation.navigate("AreaDetalle", { area })
              }
            >
              <View style={styles.callout}>
                <Text style={styles.title}>{area.nombre}</Text>
                <Text style={styles.subtitle}>{area.provincia}</Text>
                <Text style={styles.more}>Toca aquí para ver más</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}*/}
    </MapView>
  </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callout: {
    width: 200,
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1b5e20",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  more: {
    fontSize: 12,
    color: "#2e7d32",
    marginTop: 5,
  },
});
