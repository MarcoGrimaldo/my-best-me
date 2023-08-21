import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Abstinence from "./Abstinence";
import AbstinenceScreen from "./AbstinenceScreen";

const Stack = createNativeStackNavigator();

const HabitIndex = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="AbstinenceScreen"
          component={AbstinenceScreen}
          options={{ title: "Lista de AbstinenceScreen" }}
        />
        <Stack.Screen
          name="Abstinence"
          component={Abstinence}
          options={{ title: "Agregar Abstinence" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HabitIndex;
