import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Abstinence = ({ note, onDelete, onUpdate }) => {
  const [text, setText] = useState("");
  const handleNoteDeletion = () => {
    // Obtener la lista actual de notas del local storage
    AsyncStorage.getItem("abstinences")
      .then((notes) => JSON.parse(notes))
      .then((parsedNotes) => {
        // Filtrar la nota actual y crear una lista de notas sin la nota que se quiere eliminar
        const updatedNotes = parsedNotes.filter((n) => n.date !== note.date);
        // Guardar la lista actualizada de notas en el local storage
        AsyncStorage.setItem("abstinences", JSON.stringify(updatedNotes));
        // Llamar a la función onDelete para actualizar la lista de notas en la pantalla principal
        onDelete();
      })
      .catch((error) => console.log(error));
  };

  const handleNoteUpdate = () => {
    // Obtener la lista actual de notas del local storage
    AsyncStorage.getItem("abstinences")
      .then((notes) => JSON.parse(notes))
      .then((parsedNotes) => {
        // Encontrar la nota actual en la lista de notas
        const noteIndex = parsedNotes.findIndex((n) => n.date === note.date);
        // Pedir al usuario que ingrese el nuevo texto de la nota
        const newText = prompt("Ingresa el nuevo texto de la nota:", note.text);
        // Si el usuario ingresó un nuevo texto, actualizar la nota en la lista de notas y guardarla en el local storage
        if (newText) {
          parsedNotes[noteIndex].text = newText;
          AsyncStorage.setItem("abstinences", JSON.stringify(parsedNotes));
          // Llamar a la función onUpdate para actualizar la lista de notas en la pantalla principal
          onUpdate();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleNoteSave = () => {
    // Crear un objeto de nota con el texto y la fecha
    const newNote = {
      text: text,
      date: new Date().getTime(),
    };
    // Obtener la lista actual de notas del local storage
    AsyncStorage.getItem("abstinences")
      .then((notes) => JSON.parse(notes))
      .then((parsedNotes) => {
        // Agregar la nueva nota a la lista de notas
        const updatedNotes = parsedNotes
          ? [...parsedNotes, newNote]
          : [newNote];
        // Guardar la lista actualizada de notas en el local storage
        AsyncStorage.setItem("abstinences", JSON.stringify(updatedNotes));
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={text} onChangeText={setText} />
      {note && (
        <Text style={styles.noteDate}>
          {new Date(note.date).toLocaleDateString()}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNoteDeletion}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNoteUpdate}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNoteSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 18,
  },
  noteDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Abstinence;
