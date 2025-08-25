import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

import InicioScreen from "../screens/InicioScreen";
import SobreNosotrosScreen from "../screens/SobreNosotrosScreen";
import ServiciosScreen from "../screens/ServiciosScreen";
import NoticiasScreen from "../screens/NoticiasScreen";
import VideosScreen from "../screens/VideosScreen";
import AreasScreen from "../screens/AreasScreen";
import MapaAreasScreen from "../screens/MapaAreasScreen";
import MedidasScreen from "../screens/MedidasScreen";
import EquipoScreen from "../screens/EquipoScreen";
import VoluntariadoScreen from "../screens/VoluntariadoScreen";
import AcercaDeScreen from "../screens/AcercaDeScreen";
import NormativasScreen from "../screens/NormativasScreen";
import ReportarScreen from "../screens/ReportarScreen";
import MisReportesScreen from "../screens/MisReportesScreen";
import MapaReportesScreen from "../screens/MapaReportesScreen";
import CambiarClaveScreen from "../screens/CambiarClaveScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2e7d32",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Inicio":
              iconName = "home";
              break;
            case "Sobre Nosotros":
              iconName = "information-circle";
              break;
            case "Servicios":
              iconName = "list";
              break;
            case "Noticias":
              iconName = "newspaper";
              break;
            case "Videos":
              iconName = "videocam";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Sobre Nosotros" component={SobreNosotrosScreen} />
      <Tab.Screen name="Servicios" component={ServiciosScreen} />
      <Tab.Screen name="Noticias" component={NoticiasScreen} />
      <Tab.Screen name="Videos" component={VideosScreen} />
      <Tab.Screen name="Area" component={AreasScreen} />
      <Tab.Screen name="Mapa Áreas" component={MapaAreasScreen} />
      <Tab.Screen name="Medidas" component={MedidasScreen} />
      <Tab.Screen name="Equipo" component={EquipoScreen} />
      <Tab.Screen name="Voluntariado" component={VoluntariadoScreen} />
      <Tab.Screen name="Acerca De" component={AcercaDeScreen} />
      {user && (
        <Tab.Screen name="Normativas" component={NormativasScreen} />
      )}
      {user && (
        <Tab.Screen name="Reportar" component={ReportarScreen} />
      )}
      {user && (
        <Tab.Screen name="Mis Reportes" component={MisReportesScreen} />
      )}
      {user && (
        <Tab.Screen name="Mapa Reportes" component={MapaReportesScreen} />
      )}
      {user && (
        <Tab.Screen name="Cambiar Clave" component={CambiarClaveScreen} />
      )}

      
      
      
    </Tab.Navigator>
  );
}
