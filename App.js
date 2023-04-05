import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen";
import HabitIndex from "./screens/habits/HabitIndex";
import MoneyHome from "./screens/MoneyHome";
import AbstinenceScreen from "./screens/AbstinenceScreen";
import NotesScreen from "./screens/NotesScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Dinero"
          component={MoneyHome}
          options={{ title: "Dinero" }}
        />
        <Tab.Screen
          name="Habitos"
          component={HabitIndex}
          options={{ title: "Habitos" }}
        />
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="Abstinencia"
          component={AbstinenceScreen}
          options={{ title: "Abstinencia" }}
        />
        <Tab.Screen
          name="Notas"
          component={NotesScreen}
          options={{ title: "Notas" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
