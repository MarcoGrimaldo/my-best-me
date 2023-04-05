import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HabitTimer = ({ route }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { name, stopValue } = route.params;
  let i = 0;

  const startTimer = () => {
    setBtnDisabled(true);
    let intervalId = setInterval(() => {
      if (i < stopValue * 60) {
        i++;
        setElapsedTime(i);
        console.log(elapsedTime);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  useEffect(() => {
    if (elapsedTime === stopValue * 60) {
      alert("Listo lo lograste!");
    }
  }, [elapsedTime]);

  return (
    <View style={styles.task}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{name}</Text>
        <Text style={styles.taskTime}>
          {Math.floor(elapsedTime / 60)}:
          {(elapsedTime % 60).toString().padStart(2, "0")} / {stopValue}:00
        </Text>
        <Button title="Iniciar" onPress={startTimer} disabled={btnDisabled} />
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

export default HabitTimer;
