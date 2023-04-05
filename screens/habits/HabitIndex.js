import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HabitScreen from "./HabitScreen";
import AddHabit from "./AddHabit";
import HabitTimer from "./HabitTimer";

const Stack = createNativeStackNavigator();

const HabitIndex = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HabitScreen}
          options={{ title: "Lista de Habitos" }}
        />
        <Stack.Screen
          name="AddHabit"
          component={AddHabit}
          options={{ title: "Agregar habito" }}
        />
        <Stack.Screen
          name="HabitTimer"
          component={HabitTimer}
          options={{ title: "Timer!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HabitIndex;
