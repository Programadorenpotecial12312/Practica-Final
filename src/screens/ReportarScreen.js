import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { AuthContext } from "../context/AuthContext";

export default function ReportarScreen() {
  const { user } = useContext(AuthContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);

  const seleccionarFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].base64);
    }
  };

  const obtenerUbicacion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la ubicación");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setUbicacion({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    Alert.alert("Ubicación obtenida", `Lat: ${loc.coords.latitude}, Lng: ${loc.coords.longitude}`);
  };

  const enviarReporte = async () => {
    if (!titulo || !descripcion || !foto || !ubicacion) {
      Alert.alert("Error", "Complete todos los campos");
      return;
    }

    // validar coordenadas
    const lat = Number(ubicacion.lat);
    const lng = Number(ubicacion.lng);
    if (!isFinite(lat) || !isFinite(lng)) {
      Alert.alert("Error", "Latitud y longitud inválidas");
      return;
    }

    console.log("Enviar reporte - user:", user);
    try {
      const payload = {
        titulo,
        descripcion,
        foto,
        lat,
        lng,
        latitud: lat,
        longitud: lng,
      };

      const headers = { "Content-Type": "application/json" };
      if (user?.token) headers.Authorization = `Bearer ${user.token}`;

      console.log("Request payload:", payload);

      const response = await fetch("https://adamix.net/medioambiente/reportes", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      console.log("HTTP status:", response.status);
      const data = await response.json().catch(() => null);
      console.log("Response body:", data);

      if (response.ok && data && data.exito) {
        Alert.alert("Éxito", "Reporte enviado correctamente");
        setTitulo("");
        setDescripcion("");
        setFoto(null);
        setUbicacion(null);
        return;
      }

      const serverMsg = data?.mensaje || data?.error || "No se pudo enviar el reporte";
      Alert.alert("Error", serverMsg);
    } catch (error) {
      console.error("Fetch error enviarReporte:", error);
      Alert.alert("Error", "Problema de conexión con el servidor");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reportar Daño Ambiental</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Button title="Seleccionar Foto" onPress={seleccionarFoto} color="#2e7d32" />
      {foto && <Image source={{ uri: "data:image/jpeg;base64," + foto }} style={styles.image} />}

      <View style={{ marginVertical: 10 }}>
        <Button title="Obtener Ubicación" onPress={obtenerUbicacion} color="#388e3c" />
      </View>

      <Button title="Enviar Reporte" onPress={enviarReporte} color="#1b5e20" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#2e7d32", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
