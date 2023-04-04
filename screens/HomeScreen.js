import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  const loadTotal = async () => {
    try {
      const storedTotal = await AsyncStorage.getItem("total");
      const parsedTotal = storedTotal ? parseFloat(storedTotal).toFixed(2) : 0;

      setTotal(parsedTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const loadIncomes = async () => {
    try {
      const storedIncomes = await AsyncStorage.getItem("incomes");
      const parsedIncomes = storedIncomes ? JSON.parse(storedIncomes) : [];

      setIncomes(parsedIncomes);
    } catch (error) {
      console.log(error);
    }
  };

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      setExpenses(parsedExpenses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTotal = async () => {
    try {
      await AsyncStorage.setItem("total", total);

      console.log(`Total almacenado: ${total}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadTotal();
      loadIncomes();
      loadExpenses();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Balance total: ${total}</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Editar</Text>
        </Pressable>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          style={styles.modal}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Tu total:</Text>
              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={total}
                onChangeText={(value) => setTotal(value)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleSaveTotal();
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Text style={styles.title}>Ingresos:</Text>
      <FlatList
        data={incomes}
        keyExtractor={(item, index) => `income-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemAmount}>{item.amount}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Gastos:</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => `expense-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemAmount}>{item.amount}</Text>
          </View>
        )}
      />
      <View>
        <Button
          title="Agregar ingreso"
          onPress={() =>
            navigation.navigate("AddIncome", { name: "AddIncome" })
          }
        />
        <Button
          title="Agregar gasto"
          onPress={() =>
            navigation.navigate("AddExpense", { name: "AddExpense" })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
  },
  itemDescription: {
    flex: 1,
    marginRight: 16,
  },
  itemAmount: {
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modal: {
    top: "40%",
    position: "fixed",
  },
});

export default HomeScreen;

/* 
        <Button
            title="Agregar ingreso"
            onPress={() =>
                navigation.navigate('AddIncome', {name: 'AddIncome'})
            }
        />
        <Button
            title="Agregar gasto"
            onPress={() =>
                navigation.navigate('AddExpense', {name: 'AddExpense'})
            }
        />
*/
