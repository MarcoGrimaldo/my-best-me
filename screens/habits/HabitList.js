import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Habit from "./Habit";
import { useIsFocused } from "@react-navigation/native";

const HabitList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
      console.log(JSON.parse(savedTasks));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isFocused) loadTasks();
  }, [isFocused]);

  return (
    <View>
      <Text>Mi lista de tareas</Text>
      {tasks.length > 0 &&
        tasks.map((task, index) => (
          <View key={index}>
            <Habit
              name={task.name}
              description={task.description}
              time={task.time}
              navigation={navigation}
            />
          </View>
        ))}
      <Button
        title="Agregar habito"
        onPress={() => navigation.navigate("AddHabit", { name: "AddHabit" })}
      />
    </View>
  );
};

export default HabitList;
