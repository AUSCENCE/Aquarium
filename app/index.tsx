import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import HomeScreen from "./screens/HomeScreen";
import ClientsScreen from "./screens/clients/ClientsScreen";
import SettingsScreen from "./screens/setting/SettingsScreen";
import { DemandeScreen } from "./screens/demande/DemandeScreen";
import { ListDemande } from "./screens/demande/ListScreen";

export type RootDrawerParamList = {
  Accueil: undefined;
  Clients: undefined;
  Demandes: undefined;
  ListDemandes: undefined;
  Paramètres: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      screenOptions={{
        drawerActiveTintColor: "#1876B4FF",
        drawerInactiveTintColor: "gray",
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Clients"
        component={ClientsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

        <Drawer.Screen
            name="Demandes"
            component={DemandeScreen}
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="list-circle" color={color} size={size} />
                ),
            }}
        />
        
        <Drawer.Screen
            name="ListDemandes"
            component={ListDemande}
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="list-circle" color={color} size={size} />
                ),
            }}
        />
        
      <Drawer.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
