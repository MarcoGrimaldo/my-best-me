import React from "react";
import { View, Text, Button } from "react-native";

const Habit = ({ name, description, time, navigation }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>Descripción: {description}</Text>
      <Text>Tiempo estimado: {time}</Text>
      <Button
        title="Empezar"
        onPress={() =>
          navigation.navigate("HabitTimer", { name, stopValue: time })
        }
      />
    </View>
  );
};

export default Habit;
