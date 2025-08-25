import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  const handleLogin = async () => {
  if (!correo || !clave) {
    Alert.alert("Error", "Por favor complete todos los campos");
    return;
  }

  const email = correo.trim().toLowerCase();
  const password = clave; 

  try {
    const url = "https://adamix.net/medioambiente/auth/login";
    const body = { correo: email, password }; 

    console.log("Request:", url, body);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log("HTTP status:", res.status);

    const data = await res.json().catch(() => null);
    console.log("Response body:", data);

    if (!res.ok) {
      const msg = data?.mensaje || data?.error || `Status ${res.status}`;
      Alert.alert("Error", msg);
      return;
    }

    if (data && (data.exito === true || data.ok === true || data.token)) {
      
      login && login(data);
      return;
    }

    const serverMsg = data?.mensaje || data?.error || "Credenciales inválidas";
    Alert.alert("Error", serverMsg);
  } catch (error) {
    console.log("Fetch error:", error);
    Alert.alert("Error", "No se pudo conectar al servidor");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />

      <Button title="Entrar" onPress={handleLogin} color="#2e7d32" />

      <Text
        style={styles.link}
        onPress={() => Alert.alert("Recuperar", "Aquí pondremos recuperación de contraseña")}
      >
        ¿Olvidaste tu contraseña?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2e7d32" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  link: {
    marginTop: 15,
    color: "#1e88e5",
    textAlign: "center",
    fontSize: 14,
  },
});
