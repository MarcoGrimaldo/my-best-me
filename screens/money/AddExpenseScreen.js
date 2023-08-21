import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddExpenseScreen = ({ navigation }) => {
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveExpense = async () => {
    try {
      const newExpense = {
        amount: expense,
        description: description,
      };

      const storedExpenses = await AsyncStorage.getItem("expenses");
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      const updatedExpenses = [...parsedExpenses, newExpense];

      await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      const storedTotal = await AsyncStorage.getItem("total");
      const parsedTotal = storedTotal ? parseFloat(storedTotal) : 0;

      await AsyncStorage.setItem(
        "total",
        (parsedTotal - parseFloat(expense)).toString()
      );

      console.log(`Gasto almacenado: ${JSON.stringify(newExpense)}`);

      setExpense("");
      setDescription("");
      navigation.navigate("Home", { name: "Home" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Agregar Gasto</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={expense}
          onChangeText={(value) => setExpense(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción (opcional)"
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveExpense}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddExpenseScreen;
