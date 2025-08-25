import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";

export default function VoluntariadoScreen() {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async () => {
    if (!cedula || !nombre || !correo || !clave || !telefono) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("https://adamix.net/medioambiente/voluntarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cedula,
          nombre,
          correo,
          clave,
          telefono,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (data.exito) {
        Alert.alert("Éxito", "Solicitud enviada correctamente");
        setCedula("");
        setNombre("");
        setCorreo("");
        setClave("");
        setTelefono("");
      } else {
        Alert.alert("Error", data.mensaje || "No se pudo enviar la solicitud");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la conexión");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Programa de Voluntariado</Text>
      <Text style={styles.subtitle}>
        Llena el formulario para ser parte del voluntariado del Ministerio de Medio Ambiente.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre y Apellido"
        value={nombre}
        onChangeText={setNombre}
      />
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
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <Button title="Enviar Solicitud" onPress={handleSubmit} color="#2e7d32" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2e7d32", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 15, color: "#555", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
});
