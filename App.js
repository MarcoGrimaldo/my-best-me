import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import AddIncomeScreen from "./screens/AddIncomeScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Mi Cuenta" }}
        />
        <Stack.Screen
          name="AddIncome"
          component={AddIncomeScreen}
          options={{ title: "Agregar Ingreso" }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{ title: "Agregar Gasto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
