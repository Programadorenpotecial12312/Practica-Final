import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

// Importamos las pantallas
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

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#2e7d32" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#2e7d32",
      }}
    >
      {/* Publicos */}
      <Drawer.Screen name="Inicio" component={InicioScreen} />
      <Drawer.Screen name="Sobre Nosotros" component={SobreNosotrosScreen} />
      <Drawer.Screen name="Servicios" component={ServiciosScreen} />
      <Drawer.Screen name="Noticias" component={NoticiasScreen} />
      <Drawer.Screen name="Videos" component={VideosScreen} />
      <Drawer.Screen name="Áreas Protegidas" component={AreasScreen} />
      <Drawer.Screen name="Mapa de Áreas" component={MapaAreasScreen} />
      <Drawer.Screen name="Medidas" component={MedidasScreen} />
      <Drawer.Screen name="Equipo" component={EquipoScreen} />
      <Drawer.Screen name="Voluntariado" component={VoluntariadoScreen} />
      <Drawer.Screen name="Acerca De" component={AcercaDeScreen} />


      {/* Privados */}
      {user && (
        <>
      <Drawer.Screen name="Normativas" component={NormativasScreen} />
      <Drawer.Screen name="Reportar Daño" component={ReportarScreen} />
      <Drawer.Screen name="Mis Reportes" component={MisReportesScreen} />
      <Drawer.Screen name="Mapa Reportes" component={MapaReportesScreen} />
      <Drawer.Screen name="Cambiar Clave" component={CambiarClaveScreen} />     
        </>
      )}
    </Drawer.Navigator>
  );
}