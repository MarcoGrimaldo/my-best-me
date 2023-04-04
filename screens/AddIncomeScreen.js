import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddIncomeScreen = ({ navigation }) => {
  const [income, setIncome] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveIncome = async () => {
    try {
      const newIncome = {
        amount: income,
        description: description,
      };

      const storedIncomes = await AsyncStorage.getItem("incomes");
      const parsedIncomes = storedIncomes ? JSON.parse(storedIncomes) : [];

      const updatedIncomes = [...parsedIncomes, newIncome];

      await AsyncStorage.setItem("incomes", JSON.stringify(updatedIncomes));

      const storedTotal = await AsyncStorage.getItem("total");
      const parsedTotal = storedTotal ? parseFloat(storedTotal) : 0;

      await AsyncStorage.setItem(
        "total",
        (parsedTotal + parseFloat(income)).toString()
      );

      console.log(`Ingreso almacenado: ${JSON.stringify(newIncome)}`);

      setIncome("");
      setDescription("");
      navigation.navigate("Home", { name: "Home" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Agregar Ingreso</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={income}
          onChangeText={(value) => setIncome(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción (opcional)"
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveIncome}>
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

export default AddIncomeScreen;
