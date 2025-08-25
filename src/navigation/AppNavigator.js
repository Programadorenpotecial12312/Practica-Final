import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen"; // ✅ ahora existe
import AreaDetalleScreen from "../screens/AreaDetalleScreen";
import MedidaDetalleScreen from "../screens/MedidaDetalleScreen"
import { AuthContext } from "../context/AuthContext";
import ReporteDetalleScreen from "../screens/ReporteDetalleScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  const { user } = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={DrawerNavigator} />

      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />

      )}
      <Stack.Screen name="AreaDetalle" component={AreaDetalleScreen} />
      <Stack.Screen name="MedidaDetalle" component={MedidaDetalleScreen} />
      <Stack.Screen name="ReporteDetalle" component={ReporteDetalleScreen} />

    </Stack.Navigator>
  );
}

