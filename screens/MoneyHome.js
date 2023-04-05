import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MoneyScreen from "./MoneyScreen";
import AddIncomeScreen from "./AddIncomeScreen";
import AddExpenseScreen from "./AddExpenseScreen";

const Stack = createNativeStackNavigator();

const MoneyHome = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MoneyScreen}
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
};

export default MoneyHome;
