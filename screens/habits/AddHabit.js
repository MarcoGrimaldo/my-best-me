import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const AddHabit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  const isFocused = useIsFocused();

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  };

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

  const addTask = () => {
    const newTask = { name, description, time: parseInt(time) };
    const updatedTasks = [...tasks, newTask];
    console.log(updatedTasks);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setName("");
    setDescription("");
    setTime("");
  };

  useEffect(() => {
    if (isFocused) loadTasks();
  }, [isFocused]);

  return (
    <View>
      <Text>Mi lista de tareas</Text>
      <TextInput
        placeholder="Nombre de la tarea"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Descripción de la tarea"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Tiempo estimado (minutos)"
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />
      <Button title="Agregar tarea" onPress={addTask} />
    </View>
  );
};

export default AddHabit;
