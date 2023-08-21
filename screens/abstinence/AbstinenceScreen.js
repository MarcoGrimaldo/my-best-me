import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";

const AbstinenceScreen = ({ navigation }) => {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    // Obtener la lista de notas del local storage
    AsyncStorage.getItem("abstinences")
      .then((notes) => JSON.parse(notes))
      .then((parsedNotes) => setNoteList(parsedNotes || []));
  }, []);

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{item.text}</Text>
      <Text style={styles.noteDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={noteList}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.date.toString()}
      />
      <Button
        title="Agregar gasto"
        onPress={() =>
          navigation.navigate("Abstinence", { name: "Abstinence" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  noteItem: {
    marginBottom: 10,
  },
  noteText: {
    fontSize: 18,
  },
  noteDate: {
    fontSize: 12,
    color: "#777",
  },
});

export default AbstinenceScreen;
