import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function CambiarClaveScreen() {
  const { user, logout } = useContext(AuthContext);
  const [claveActual, setClaveActual] = useState("");
  const [claveNueva, setClaveNueva] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");

  const handleChangePassword = async () => {
    if (!claveActual || !claveNueva || !confirmarClave) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    if (claveNueva !== confirmarClave) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      console.log("CambiarClave - user:", user);

      const token = user?.token || user?.access_token;
      if (token) {
        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
        const body = { clave: claveActual, new_password: claveNueva };

        console.log("Intento con token, body:", body);
        let response = await fetch("https://adamix.net/medioambiente/auth/reset", {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });

        console.log("Status (token intento):", response.status);
        let data = await response.json().catch(() => null);
        console.log("Response (token intento):", data);

        if (response.ok && data?.exito) {
          Alert.alert("Éxito", "Contraseña cambiada. Vuelva a iniciar sesión.");
          logout && logout();
          return;
        }

        const headersForm = { Authorization: `Bearer ${token}`, "Content-Type": "application/x-www-form-urlencoded" };
        const params = new URLSearchParams();
        params.append("password", claveActual);
        params.append("new_password", claveNueva);

        console.log("Intento con token + form-urlencoded");
        response = await fetch("https://adamix.net/medioambiente/auth/reset", {
          method: "POST",
          headers: headersForm,
          body: params.toString(),
        });

        console.log("Status (token intento form):", response.status);
        data = await response.json().catch(() => null);
        console.log("Response (token intento form):", data);

        if (response.ok && data?.exito) {
          Alert.alert("Éxito", "Contraseña cambiada. Vuelva a iniciar sesión.");
          logout && logout();
          return;
        }

        console.warn("Intentos con token fallaron, haciendo fallback a envío con correo si está disponible.");
      }

      const correo = user?.correo || user?.email || "";
      if (!correo) {
        Alert.alert("Error", "No se encontró el correo del usuario. Vuelva a iniciar sesión.");
        return;
      }

      const headersFallback = { "Content-Type": "application/x-www-form-urlencoded" };
      if (token) headersFallback.Authorization = `Bearer ${token}`;

      const paramsFallback = new URLSearchParams();
      paramsFallback.append("correo", correo);
      paramsFallback.append("codigo", claveActual);
      paramsFallback.append("nueva_password", claveNueva);

      console.log("Intento fallback con correo:", paramsFallback.toString());
      const respFallback = await fetch("https://adamix.net/medioambiente/auth/reset", {
        method: "POST",
        headers: headersFallback,
        body: paramsFallback.toString(),
      });

      console.log("Status (fallback):", respFallback.status);
      const dataFallback = await respFallback.json().catch(() => null);
      console.log("Response (fallback):", dataFallback);

      if (respFallback.ok && dataFallback?.exito) {
        Alert.alert("Éxito", "Contraseña cambiada. Vuelva a iniciar sesión.");
        logout && logout();
        return;
      }

      const msg = dataFallback?.mensaje || dataFallback?.error || "No se pudo cambiar la contraseña";
      Alert.alert("Error", msg);
    } catch (error) {
      console.error("Error cambiar contraseña:", error);
      Alert.alert("Error", "Problema de conexión con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Contraseña actual"
        secureTextEntry
        value={claveActual}
        onChangeText={setClaveActual}
      />

      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={claveNueva}
        onChangeText={setClaveNueva}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        value={confirmarClave}
        onChangeText={setConfirmarClave}
      />

      <Button title="Cambiar Contraseña" onPress={handleChangePassword} color="#2e7d32" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#2e7d32", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
